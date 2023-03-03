using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicAPI.Dtos;
using MusicAPI.Models;

namespace MusicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly DataContext _context;

        public ArtistController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Artist>>> GetAllArtists()
        {
            return Ok(await _context.Artists.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Artist>> GetArtist(int id)
        {
            var artist = await _context.Artists.FindAsync(id);

            if (artist == null)
                return BadRequest("Artist not found.");

            return Ok(artist);
        }

        [HttpPost]
        public async Task<ActionResult<Artist>> AddArtist([FromBody] ArtistDto newArtist)
        {
            var artist = new Artist { Name = newArtist.Name };

            _context.Artists.Add(artist);
            await _context.SaveChangesAsync();

            return Accepted(artist);
        }

        [HttpPut]
        public async Task<ActionResult<Artist>> EditArtist([FromBody] ArtistDto newArtist)
        {
            var artist = await _context.Artists.FindAsync(newArtist.Id);

            if (artist == null)
                return BadRequest("Artist not found.");

            artist.Name = newArtist.Name;

            await _context.SaveChangesAsync();

            return Accepted(artist);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Artist>>> DeleteArtist(int id)
        {
            var artist = await _context.Artists.FindAsync(id);

            if (artist == null)
                return BadRequest("Artist not found.");

            _context.Artists.Remove(artist);
            await _context.SaveChangesAsync();

            return Ok(true);
        }
    }
}
