# Aran Pony Trap Tours Website

A beautiful, responsive website for Aran Pony Trap Tours featuring a complete booking system with email functionality.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Contact Form**: Professional booking form with validation
- **Email Notifications**: Automatic emails to customers and business
- **Modern UI**: Smooth animations and professional styling
- **SEO Optimized**: Proper meta tags and semantic HTML

## Email Functionality

The website includes a complete email system that sends:

1. **Customer Confirmation Email**: Beautiful HTML email with booking details
2. **Business Notification Email**: Alert to business with all inquiry details

### Email Features

- ✅ HTML email templates with professional styling
- ✅ Automatic booking detail formatting
- ✅ Customer confirmation with next steps
- ✅ Business alert with action items
- ✅ Error handling and validation
- ✅ Support for multiple email providers

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your email settings:

```env
# For Gmail (recommended):
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password
BUSINESS_EMAIL=bookings@aranponytrap.com
```

### 3. Set Up Gmail App Password

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Enable 2-Factor Authentication
3. Go to "App passwords"
4. Generate a password for "Mail"
5. Use this 16-character password in `EMAIL_APP_PASSWORD`

### 4. Start the Server

```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

### 5. Test Email Configuration

```bash
# Test email functionality
npm run test-email
```

Visit `http://localhost:3000` to see your website!

## Email Configuration Options

### Gmail (Recommended)
```env
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password
```

### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

### Yahoo
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-app-password
```

### Custom SMTP
```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASSWORD=your-password
```

## API Endpoints

### POST `/api/contact`
Submit a booking inquiry

**Request Body:**
```json
{
  "first-name": "John",
  "last-name": "Doe",
  "email": "john@example.com",
  "phone": "+353123456789",
  "preferred-date": "2024-07-20",
  "group-size": "2",
  "tour-preference": "classic",
  "special-requirements": "Wheelchair accessible"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking inquiry submitted successfully. Check your email for confirmation."
}
```

### POST `/api/test-email`
Test email configuration (development only)

### GET `/api/health`
Health check endpoint

## Form Validation

The contact form includes comprehensive validation:

- **Required Fields**: Name, email, date, group size
- **Email Format**: Validates proper email structure
- **Date Validation**: Prevents booking in the past
- **Real-time Feedback**: Shows errors as you type
- **User-friendly Messages**: Clear error descriptions

## Email Templates

### Customer Email Features
- Professional HTML design matching website branding
- Complete booking details summary
- Clear next steps and expectations
- Contact information for urgent inquiries
- Mobile-responsive design

### Business Email Features
- Urgent notification styling
- Quick-action contact links (mailto/tel)
- Organized booking information
- Response checklist
- Quick reply template suggestion

## File Structure

```
aran-pony-trap-website/
├── index.html              # Main website
├── css/style.css           # Styles and responsive design
├── js/script.js            # Client-side JavaScript
├── server.js               # Node.js server with email
├── package.json            # Dependencies
├── .env.example            # Environment configuration template
├── .env                    # Your email settings (create this)
└── README.md               # This file
```

## Troubleshooting

### Email Not Sending

1. **Check Gmail Settings**: Ensure 2FA is enabled and app password is correct
2. **Verify Environment Variables**: Make sure `.env` file exists and has correct values
3. **Test Configuration**: Run `npm run test-email` to test settings
4. **Check Logs**: Look at server console for error messages

### Common Issues

- **"Invalid login"**: Usually means incorrect app password
- **"Less secure apps"**: Gmail requires app passwords, not regular passwords
- **"Connection timeout"**: Check your internet connection and firewall
- **"Invalid email format"**: Ensure EMAIL_USER is a valid email address

### Getting Help

If you need help with setup:

1. Check the server logs for specific error messages
2. Verify your email provider's SMTP settings
3. Test with a simple email first using the test endpoint
4. Make sure your .env file is properly configured

## Deployment

### Environment Variables for Production

Set these environment variables on your hosting platform:

```
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password
BUSINESS_EMAIL=bookings@aranponytrap.com
NODE_ENV=production
PORT=3000
```

### Popular Hosting Platforms

- **Heroku**: Add config vars in dashboard
- **Vercel**: Add environment variables in project settings
- **Netlify**: Add environment variables in site settings
- **DigitalOcean**: Set environment variables in app platform

## Security Notes

- Never commit `.env` files to version control
- Use app passwords, not regular passwords
- Keep your email credentials secure
- Consider using environment-specific email accounts for testing

## License

MIT License - feel free to customize for your business needs.

---

🐴 **Ready to start taking bookings?** Follow the setup guide above and you'll have a professional booking system running in minutes!