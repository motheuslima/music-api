namespace MusicAPI.Models
{
    public class Discography
    {
        public Artist Artist { get; set; }
        public List<DiscographyAlbum> Albums { get; set; }
    }
}
