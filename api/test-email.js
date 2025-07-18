const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });
};

// Serverless function handler for email testing
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const transporter = createTransporter();
        
        const testEmailOptions = {
            from: `"Aran Pony Trap Tours Test" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send test email to yourself
            subject: 'Test Email - Aran Pony Trap Website (Vercel)',
            html: `
                <h2>🧪 Email Configuration Test</h2>
                <p>If you're receiving this email, your email configuration on Vercel is working correctly!</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Platform:</strong> Vercel Serverless Function</p>
                <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
                <p><strong>Email User:</strong> ${process.env.EMAIL_USER || 'Not configured'}</p>
                <p><strong>Business Email:</strong> ${process.env.BUSINESS_EMAIL || 'Not configured'}</p>
            `
        };
        
        await transporter.sendMail(testEmailOptions);
        
        res.json({
            success: true,
            message: 'Test email sent successfully!',
            timestamp: new Date().toISOString(),
            emailUser: process.env.EMAIL_USER || 'Not configured'
        });
        
    } catch (error) {
        console.error('❌ Test email failed:', error);
        res.status(500).json({
            success: false,
            message: 'Test email failed',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
}