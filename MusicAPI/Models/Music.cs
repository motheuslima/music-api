namespace MusicAPI.Models
{
    public class Music
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public Album Album { get; set; }
    }
}
