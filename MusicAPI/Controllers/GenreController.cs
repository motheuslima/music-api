using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicAPI.Dtos;
using MusicAPI.Models;

namespace MusicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly DataContext _context;

        public GenreController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Genre>>> GetAllGenres()
        {
            return Ok(await _context.Genres.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Genre>> GetGenre(int id)
        {
            var genre = await _context.Genres.FindAsync(id);

            if (genre == null)
                return BadRequest("Genre not found.");

            return Ok(genre);
        }

        [HttpPost]
        public async Task<ActionResult<Genre>> AddGenre([FromBody] GenreDto newGenre)
        {
            var genre = new Genre { Name = newGenre.Name };

            _context.Genres.Add(genre);
            await _context.SaveChangesAsync();

            return Accepted(newGenre);
        }

        [HttpPut]
        public async Task<ActionResult<Genre>> EditGenre([FromBody] GenreDto newGenre)
        {
            var genre = await _context.Genres.FindAsync(newGenre.Id);

            if (genre == null)
                return BadRequest("Genre not found.");

            genre.Name = newGenre.Name;

            await _context.SaveChangesAsync();

            return Accepted(genre);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Genre>>> DeleteGenre(int id)
        {
            var genre = await _context.Genres.FindAsync(id);

            if (genre == null)
                return BadRequest("Genre not found.");

            _context.Genres.Remove(genre);
            await _context.SaveChangesAsync();

            return Ok(true);
        }
    }
}
