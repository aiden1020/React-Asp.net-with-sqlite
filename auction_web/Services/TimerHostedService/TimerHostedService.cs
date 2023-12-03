using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading;
using System.Threading.Tasks;
using auction_web.Models;
using auction_web.Services.EmailService;
using Microsoft.EntityFrameworkCore;
public class TimerHostedService : IHostedService, IDisposable
{
    private Timer _timer;
    private readonly IServiceProvider _serviceProvider;

    public TimerHostedService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        Console.WriteLine("TimerHostedService is starting.");

        // 使用 Timer，每分鐘執行一次 LogCurrentTime 方法
        _timer = new Timer(LogCurrentTime, null, TimeSpan.Zero, TimeSpan.FromMinutes(1));

        return Task.CompletedTask;
    }

    private void LogCurrentTime(object state)
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<AuctionDb>();
            var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();

            // 在這裡檢查拍賣時間是否到達，如果到達則發送郵件
            var auctionsToEnd = dbContext.Products
                .Where(a => a.EndDate <= DateTime.Now && !a.IsSentEmail)
                .Include(a => a.BidUser)
                .ToList();
            Console.WriteLine($"Checked: {auctionsToEnd.Count}");

            foreach (var auction in auctionsToEnd)
            {
                if (auction.BidUser != null)
                {
                    var emailDto = new EmailDto
                    {
                        To = auction.BidUser.Email,
                        BidUserFirstName = auction.BidUser.FirstName,
                        ProductName = auction.ProductName,
                        Price = auction.HighestBidPrice
                    };

                    emailService.SendEmail(emailDto);

                    // 將拍賣標記為已結束
                    auction.IsSentEmail = true;
                    Console.WriteLine($"Email is Sent  to  {auction.BidUser.Email} successfully !  ");
                }
            }


            dbContext.SaveChanges();
        }

        Console.WriteLine($"Current time: {DateTime.Now}");
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        Console.WriteLine("TimerHostedService is stopping.");

        // 停止 Timer
        _timer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }
}