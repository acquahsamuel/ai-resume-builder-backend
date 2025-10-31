import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.createTransporter();
  }

  private createTransporter() {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST', 'smtp.gmail.com'),
      port: this.configService.get<number>('EMAIL_PORT', 587),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        this.logger.error('Email transporter configuration error:', error);
      } else {
        this.logger.log('Email transporter is ready to send messages');
      }
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    try {
      const mailOptions = {
        from: this.configService.get<string>('EMAIL_FROM', 'noreply@cleansheet.ai'),
        to,
        subject,
        text,
        html: html || text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully to ${to}. Message ID: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }

  async sendResetPasswordEmail(to: string, resetLink: string): Promise<void> {
    const subject = 'Reset Your Password';
    const text = `Please click the following link to reset your password: ${resetLink}`;
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2c3e50;">Reset Your Password</h2>
            <p>Hello,</p>
            <p>You have requested to reset your password. Please click the button below to proceed:</p>
            <div style="margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background-color: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="color: #7f8c8d; word-break: break-all;">${resetLink}</p>
            <p style="color: #7f8c8d; font-size: 14px;">
              This link will expire in 1 hour.
            </p>
            <p style="color: #7f8c8d; font-size: 14px;">
              If you didn't request a password reset, please ignore this email.
            </p>
          </div>
        </body>
      </html>
    `;
    await this.sendEmail(to, subject, text, html);
  }

  async sendVerificationEmail(to: string, verificationLink: string): Promise<void> {
    const subject = 'Verify Your Email Address';
    const text = `Please click the following link to verify your email address: ${verificationLink}`;
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2c3e50;">Verify Your Email Address</h2>
            <p>Hello,</p>
            <p>Thank you for registering with CleanSheet AI. Please click the button below to verify your email address:</p>
            <div style="margin: 30px 0;">
              <a href="${verificationLink}" 
                 style="background-color: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verify Email
              </a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="color: #7f8c8d; word-break: break-all;">${verificationLink}</p>
            <p style="color: #7f8c8d; font-size: 14px;">
              This link will expire in 1 hour.
            </p>
            <p style="color: #7f8c8d; font-size: 14px;">
              If you didn't create an account, please ignore this email.
            </p>
          </div>
        </body>
      </html>
    `;
    await this.sendEmail(to, subject, text, html);
  }
}

