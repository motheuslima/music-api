using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicAPI.Dtos;
using MusicAPI.Models;

namespace MusicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicController : ControllerBase
    {
        private readonly DataContext _context;

        public MusicController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Music>>> GetAllMusics()
        {
            return Ok(await _context.Musics
                .Select(m => new Music()
                {
                    Id = m.Id,
                    Name = m.Name,
                    Album = new Album()
                    {
                        Id = m.Album.Id,
                        Name = m.Album.Name,
                        Genre = m.Album.Genre,
                        Artist = m.Album.Artist
                    }
                })
                .ToListAsync<Music>());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Music>> GetMusic(int id)
        {
            var music = await _context.Musics.Where(m => m.Id == id)
                .Select(m => new Music()
                {
                    Id = m.Id,
                    Name = m.Name,
                    Album = new Album()
                    {
                        Id = m.Album.Id,
                        Name = m.Album.Name,
                        Genre = m.Album.Genre,
                        Artist = m.Album.Artist
                    }
                }).FirstOrDefaultAsync();

            if (music == null)
                return BadRequest("Music not found.");

            return Ok(music);
        }

        [HttpGet("album/{id}")]
        public async Task<ActionResult<List<Music>>> GetMusicFromAlbum(int id)
        {
            var album = await _context.Albums.FindAsync(id);

            if (album == null)
                return BadRequest("Album not found.");

            var musics = await _context.Musics.Where(m => m.Album.Id == id)
            .Select(m => new Music()
            {
                Id = m.Id,
                Name = m.Name,
                Album = new Album()
                {
                    Id = m.Album.Id,
                    Name = m.Album.Name,
                    Genre = m.Album.Genre,
                    Artist = m.Album.Artist
                }
            }).ToListAsync();

            return Ok(musics);

        }

        [HttpGet("artist/{id}")]
        public async Task<ActionResult<List<DiscographyAlbum>>> GetMusicFromArtist(int id)
        {
            var artist = await _context.Artists.FindAsync(id);

            if (artist == null)
                return BadRequest("Artist not found.");

            var albumMusicsDict = await _context.Musics.Where(m => m.Album.Artist.Id == id)
            .Select(m => new Music()
            {
                Id = m.Id,
                Name = m.Name,
                Album = new Album()
                {
                    Id = m.Album.Id,
                    Name = m.Album.Name,
                    Genre = m.Album.Genre,
                    Artist = m.Album.Artist
                }
            }).GroupBy(m => new { m.Album.Id, m.Album.Name })
            .ToDictionaryAsync(g => g.Key.Name);

            var discography = new List<DiscographyAlbum>();

            foreach (var album in albumMusicsDict)
            {
                discography.Add(new DiscographyAlbum()
                {
                    AlbumName = album.Key,
                    Musics = album.Value.ToList()
                });
            }

            return Ok(discography);

        }

        [HttpPost]
        public async Task<ActionResult<Music>> AddMusic([FromBody] MusicDto newMusic)
        {
            var album = await _context.Albums.FindAsync(newMusic.AlbumId);

            if (album == null)
                return BadRequest("Album not found.");

            var music = new Music { Name = newMusic.Name, Album = album };

            _context.Musics.Add(music);
            await _context.SaveChangesAsync();

            return Accepted(music);
        }

        [HttpPut]
        public async Task<ActionResult<Music>> EditMusic([FromBody] MusicDto newMusic)
        {
            var music = await _context.Musics.FindAsync(newMusic.Id);

            if (music == null)
                return BadRequest("Music not found.");

            music.Name = newMusic.Name;

            await _context.SaveChangesAsync();

            return Accepted(music);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Music>>> DeleteMusic(int id)
        {
            var music = await _context.Musics.FindAsync(id);

            if (music == null)
                return BadRequest("Music not found.");

            _context.Musics.Remove(music);
            await _context.SaveChangesAsync();

            return Ok(true);
        }
    }
}
