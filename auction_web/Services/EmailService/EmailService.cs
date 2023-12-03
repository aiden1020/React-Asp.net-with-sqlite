using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using auction_web.Models;

namespace auction_web.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public void SendEmail(EmailDto request)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
            email.To.Add(MailboxAddress.Parse(request.To));
            email.Subject = $"恭喜成功得標{request.ProductName}";
            var builder = new BodyBuilder();
            builder.HtmlBody = $@"
                <html>
                    <body style='font-family: Arial, sans-serif;'>
                        <p>尊敬的 {request.BidUserFirstName} 先生/女士，</p>
                        <p>感謝您參與我們的競標活動。</p>
                        <p>我們高興地通知您，您已成功得標以下商品：</p>
                        <ul>
                            <li><strong>商品名稱：</strong> {request.ProductName}</li>
                            <li><strong>得標價格：</strong> {request.Price}</li>
                        </ul>
                        <p>我們將安排專人在三個工作日內與您聯絡，以協助您完成交收事宜。</p>
                        <p>謝謝您的參與，如果您有任何疑問，請隨時與我們聯絡。</p>
                        <p>敬祝順利，</p>
                        <p>BidHUB</p>
                    </body>
                </html>";
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
