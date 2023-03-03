using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicAPI.Dtos;
using MusicAPI.Models;

namespace MusicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly DataContext _context;

        public AlbumController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Album>>> GetAllAlbums()
        {
            return Ok(await _context.Albums
                .Include(a => a.Genre)
                .Include(a => a.Artist)
                .ToListAsync<Album>());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Album>> GetAlbum(int id)
        {
            var album = await _context.Albums.Where(a => a.Id == id)
                .Select(a => new Album()
                {
                    Id = a.Id,
                    Name = a.Name,
                    Genre = a.Genre,
                    Artist = a.Artist
                }).FirstOrDefaultAsync();

            if (album == null)
                return BadRequest("Album not found.");

            return Ok(album);
        }

        [HttpGet("artist/{id}")]
        public async Task<ActionResult<List<Album>>> GetAlbumsFromArtist(int id)
        {
            var artist = await _context.Artists.Where(a => a.Id == id).FirstOrDefaultAsync();

            if (artist == null)
                return BadRequest("Artist not found.");

            var albums = await _context.Albums.Where(a => a.Artist.Id == id)
                .Select(a => new Album()
                {
                    Id = a.Id,
                    Name = a.Name,
                    Genre = a.Genre,
                    Artist = a.Artist
                }).ToListAsync();

            return Ok(albums);
        }

        [HttpPost]
        public async Task<ActionResult<Album>> AddAlbum([FromBody] AlbumDto newAlbum)
        {
            var genre = await _context.Genres.Where(g => g.Id == newAlbum.GenreId).FirstOrDefaultAsync();

            if (genre == null)
                return BadRequest("Genre not found.");

            var artist = await _context.Artists.Where(a => a.Id == newAlbum.ArtistId).FirstOrDefaultAsync();

            if (artist == null)
                return BadRequest("Artist not found.");

            var album = new Album { Name = newAlbum.Name, Genre = genre, Artist = artist };

            foreach (var newMusic in newAlbum.Musics)
            {
                var music = new Music { Name = newMusic.Name, Album = album };
                _context.Musics.Add(music);
            }

            _context.Albums.Add(album);
            await _context.SaveChangesAsync();

            return Accepted(album);
        }

        [HttpPut]
        public async Task<ActionResult<Album>> EditAlbum([FromBody] AlbumDto newAlbum)
        {
            var album = await _context.Albums.FindAsync(newAlbum.Id);

            if (album == null)
                return BadRequest("Album not found.");

            album.Name = newAlbum.Name;

            var currentMusics = _context.Musics.Where(m => m.Album.Id == newAlbum.Id);
            _context.Musics.RemoveRange(currentMusics);

            foreach (var newMusic in newAlbum.Musics)
            {
                var music = new Music { Name = newMusic.Name, Album = album };
                _context.Musics.Add(music);
            }

            await _context.SaveChangesAsync();

            return Accepted(album);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Album>>> DeleteAlbum(int id)
        {
            var album = await _context.Albums.FindAsync(id);

            if (album == null)
                return BadRequest("Album not found.");

            _context.Albums.Remove(album);
            await _context.SaveChangesAsync();

            return Ok(true);
        }
    }
}
