using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace NestFin.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly ILogger<EmailController> _logger;

        public EmailController(ILogger<EmailController> logger)
        {
            _logger = logger;
        }

        [HttpPost("send-verification")]
        public async Task<IActionResult> SendVerificationEmail([FromBody] VerificationEmailRequest request)
        {
            try
            {
                _logger.LogInformation($"Enviando email de verificação para: {request.Email}");
                
                // Aqui você integraria com um serviço real de email como SendGrid, AWS SES, etc.
                // Por enquanto, vamos simular o envio
                await SimulateEmailSending(request.Email, "verification", request.VerificationLink);
                
                return Ok(new { success = true, message = "Email de verificação enviado com sucesso" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao enviar email de verificação");
                return BadRequest(new { success = false, message = "Erro ao enviar email" });
            }
        }

        [HttpPost("send-password-reset")]
        public async Task<IActionResult> SendPasswordResetEmail([FromBody] PasswordResetEmailRequest request)
        {
            try
            {
                _logger.LogInformation($"Enviando email de recuperação para: {request.Email}");
                
                // Aqui você integraria com um serviço real de email
                await SimulateEmailSending(request.Email, "password-reset", request.ResetLink);
                
                return Ok(new { success = true, message = "Email de recuperação enviado com sucesso" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao enviar email de recuperação");
                return BadRequest(new { success = false, message = "Erro ao enviar email" });
            }
        }

        private async Task SimulateEmailSending(string email, string type, string link)
        {
            // Simular delay de envio
            await Task.Delay(1000);
            
            // Log do email "enviado"
            _logger.LogInformation($"📧 Email {type} enviado para: {email}");
            _logger.LogInformation($"📧 Link: {link}");
            
            // Em produção, aqui você faria a integração real com o serviço de email
            // Exemplo com SendGrid:
            // var client = new SendGridClient(apiKey);
            // var msg = new SendGridMessage()
            // {
            //     From = new EmailAddress("noreply@nestfin.com", "NestFin"),
            //     Subject = type == "verification" ? "Verifique seu email" : "Recuperação de senha",
            //     PlainTextContent = $"Clique no link: {link}",
            //     HtmlContent = GenerateHtmlEmail(type, link)
            // };
            // msg.AddTo(new EmailAddress(email));
            // await client.SendEmailAsync(msg);
        }
    }

    public class VerificationEmailRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Template { get; set; } = string.Empty;
        public string VerificationLink { get; set; } = string.Empty;
    }

    public class PasswordResetEmailRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Template { get; set; } = string.Empty;
        public string ResetLink { get; set; } = string.Empty;
    }
}
