namespace MusicAPI.Dtos
{
    public class AlbumDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public int ArtistId { get; set; }
        public int GenreId { get; set; }

        public IEnumerable<MusicDto> Musics { get; set; }
    }
}
