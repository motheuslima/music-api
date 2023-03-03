using Microsoft.EntityFrameworkCore;
using MusicAPI.Models;

namespace MusicAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Genre> Genres { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Music> Musics { get; set; }
    }
}
