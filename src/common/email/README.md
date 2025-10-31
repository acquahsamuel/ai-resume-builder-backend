# Email Service

This service provides email functionality using Nodemailer for the CleanSheet AI application.

## Features

- Send verification emails for user registration
- Send password reset emails
- HTML email templates with styled content
- Configurable SMTP settings via environment variables
- Automatic connection verification on startup

## Setup

### 1. Environment Variables

Add the following variables to your `.env` file:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@cleansheet.ai
```

### 2. Gmail Configuration

If using Gmail, follow these steps:

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other" (or your device)
   - Copy the generated 16-character password
   - Use this as your `EMAIL_PASSWORD`

### 3. Other Email Providers

For other SMTP providers (SendGrid, Mailgun, etc.), update the `EMAIL_HOST` and `EMAIL_PORT` accordingly.

## Usage

### In Auth Service

The email service is automatically injected and can be used:

```typescript
constructor(
  private emailService: EmailService,
) {}

// Send verification email
await this.emailService.sendVerificationEmail(user.email, verificationLink);

// Send password reset email
await this.emailService.sendResetPasswordEmail(user.email, resetLink);

// Send custom email
await this.emailService.sendEmail(to, subject, text, html);
```

## Email Methods

### `sendVerificationEmail(to, verificationLink)`
Sends a styled verification email with a verification button and link.

### `sendResetPasswordEmail(to, resetLink)`
Sends a styled password reset email with a reset button and link.

### `sendEmail(to, subject, text, html?)`
Generic method to send any email with optional HTML content.

## Email Templates

The service includes pre-built HTML email templates with:
- Responsive design
- Styled buttons and links
- Clear expiration notices
- Professional branding colors (#2c3e50, #3498db)

