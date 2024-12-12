import nodemailer from 'nodemailer';
import type { EmailConfig, EmailTemplate, EmailActivity } from '../types/communication';

class EmailService {
  private static instance: EmailService;
  private transporter: nodemailer.Transporter | null = null;
  private emailQueue: Array<{
    to: string;
    subject: string;
    html: string;
    templateId?: string;
  }> = [];
  private processing = false;

  private constructor() {}

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async configure(config: EmailConfig) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass
      }
    });

    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email configuration error:', error);
      return false;
    }
  }

  async sendEmail(to: string, subject: string, html: string, templateId?: string) {
    this.emailQueue.push({ to, subject, html, templateId });
    
    if (!this.processing) {
      this.processQueue();
    }
  }

  private async processQueue() {
    if (!this.transporter || this.emailQueue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const email = this.emailQueue.shift();

    if (email) {
      try {
        await this.transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: email.to,
          subject: email.subject,
          html: email.html,
          headers: {
            'X-Template-ID': email.templateId || 'custom'
          }
        });
      } catch (error) {
        console.error('Failed to send email:', error);
        // Requeue failed emails with exponential backoff
        setTimeout(() => {
          this.emailQueue.push(email);
        }, 5000);
      }
    }

    if (this.emailQueue.length > 0) {
      setTimeout(() => this.processQueue(), 1000); // Rate limiting
    } else {
      this.processing = false;
    }
  }
}

export const emailService = EmailService.getInstance();