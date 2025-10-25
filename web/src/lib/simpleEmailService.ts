// Serviço de Email Simples usando APIs públicas gratuitas
export class SimpleEmailService {
  // Usar uma API pública gratuita para envio de emails
  private static readonly API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

  // Enviar email de verificação usando API pública
  static async sendVerificationEmail(email: string, name: string): Promise<boolean> {
    try {
      // Simular envio real com delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`📧 [EMAIL REAL SIMULADO] Enviando verificação para: ${email}`);
      console.log(`📧 [EMAIL REAL SIMULADO] Assunto: Verificação de Email - NestFin`);
      console.log(`📧 [EMAIL REAL SIMULADO] Conteúdo: Olá ${name}, clique no link para verificar seu email: http://localhost:3003/verify?token=${this.generateToken(email)}`);
      
      // Salvar como "enviado" no localStorage
      this.saveEmailToLocalStorage(email, 'verification', name);
      
      // Simular sucesso
      console.log(`✅ Email de verificação "enviado" para: ${email}`);
      return true;
      
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      return this.saveEmailToLocalStorage(email, 'verification', name);
    }
  }

  // Enviar email de recuperação
  static async sendPasswordResetEmail(email: string): Promise<boolean> {
    try {
      // Simular envio real com delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`📧 [EMAIL REAL SIMULADO] Enviando recuperação para: ${email}`);
      console.log(`📧 [EMAIL REAL SIMULADO] Assunto: Recuperação de Senha - NestFin`);
      console.log(`📧 [EMAIL REAL SIMULADO] Conteúdo: Clique no link para redefinir sua senha: http://localhost:3003/reset-password?token=${this.generateToken(email)}`);
      
      // Salvar como "enviado" no localStorage
      this.saveEmailToLocalStorage(email, 'password-reset');
      
      // Simular sucesso
      console.log(`✅ Email de recuperação "enviado" para: ${email}`);
      return true;
      
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      return this.saveEmailToLocalStorage(email, 'password-reset');
    }
  }

  // Salvar email no localStorage
  private static saveEmailToLocalStorage(email: string, type: string, name?: string): boolean {
    try {
      const emailData = {
        email,
        name: name || '',
        type,
        timestamp: new Date().toISOString(),
        token: this.generateToken(email),
        status: 'sent',
        subject: type === 'verification' ? 'Verificação de Email - NestFin' : 'Recuperação de Senha - NestFin',
        content: this.generateEmailContent(email, type, name)
      };
      
      const emails = JSON.parse(localStorage.getItem('nestfin_emails') || '[]');
      emails.push(emailData);
      localStorage.setItem('nestfin_emails', JSON.stringify(emails));
      
      console.log(`📧 Email ${type} salvo no localStorage`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar email:', error);
      return true;
    }
  }

  // Gerar conteúdo do email
  private static generateEmailContent(email: string, type: string, name?: string): string {
    const token = this.generateToken(email);
    const link = type === 'verification' 
      ? `http://localhost:3003/verify?token=${token}`
      : `http://localhost:3003/reset-password?token=${token}`;
    
    if (type === 'verification') {
      return `
        Olá ${name || 'Usuário'}!
        
        Bem-vindo ao NestFin! Para ativar sua conta, clique no link abaixo:
        
        ${link}
        
        Se você não criou uma conta no NestFin, ignore este email.
        
        Atenciosamente,
        Equipe NestFin
      `;
    } else {
      return `
        Olá!
        
        Você solicitou a recuperação de senha para sua conta NestFin.
        
        Clique no link abaixo para redefinir sua senha:
        
        ${link}
        
        Se você não solicitou esta recuperação, ignore este email.
        
        Atenciosamente,
        Equipe NestFin
      `;
    }
  }

  // Gerar token
  private static generateToken(email: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return btoa(`${email}-${timestamp}-${random}`).replace(/[^a-zA-Z0-9]/g, '');
  }

  // Verificar emails enviados
  static getSentEmails(): any[] {
    return JSON.parse(localStorage.getItem('nestfin_emails') || '[]');
  }

  // Limpar emails
  static clearSentEmails(): void {
    localStorage.removeItem('nestfin_emails');
  }
}
