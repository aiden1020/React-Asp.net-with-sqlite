namespace auction_web.Models
{
    public class EmailDto
    {
        public string To { get; set; } = string.Empty;

        public string BidUserFirstName { get; set; } = string.Empty;

        public string ProductName { get; set; } = string.Empty;
        public int? Price { get; set; } = 0;

    }
}
