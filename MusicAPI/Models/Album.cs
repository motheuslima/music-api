namespace MusicAPI.Models
{
    public class Album
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public Genre Genre { get; set; }
        public Artist Artist { get; set; }
    }
}
