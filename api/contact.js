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

// Email templates
const generateCustomerEmailTemplate = (formData) => {
    const tourNames = {
        'classic': 'Classic Inis Mór Tour',
        'photography': 'Photography Adventure',
        'historical': 'Historical Journey',
        'family': 'Family Adventure',
        'private': 'Private Custom Tour',
        'sunset': 'Sunset Special'
    };

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #2c3e50; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2d5a3d; color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #fefefe; padding: 30px 20px; border: 1px solid #e0e0e0; }
                .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none; }
                .booking-details { background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .booking-details h3 { color: #2d5a3d; margin-top: 0; }
                .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
                .detail-label { font-weight: bold; }
                .contact-info { background: #d4a574; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🐴 Aran Pony Trap Tours</h1>
                    <p>Thank you for your booking inquiry!</p>
                </div>
                
                <div class="content">
                    <h2>Dear ${formData['first-name']},</h2>
                    
                    <p>Thank you for your interest in exploring beautiful Inis Mór with our traditional pony and trap tours! We've received your booking inquiry and are excited to help you plan your authentic Aran Islands adventure.</p>
                    
                    <div class="booking-details">
                        <h3>Your Booking Details</h3>
                        <div class="detail-row">
                            <span class="detail-label">Name:</span>
                            <span>${formData['first-name']} ${formData['last-name']}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Email:</span>
                            <span>${formData.email}</span>
                        </div>
                        ${formData.phone ? `
                        <div class="detail-row">
                            <span class="detail-label">Phone:</span>
                            <span>${formData.phone}</span>
                        </div>
                        ` : ''}
                        <div class="detail-row">
                            <span class="detail-label">Preferred Date:</span>
                            <span>${new Date(formData['preferred-date']).toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Group Size:</span>
                            <span>${formData['group-size']} ${formData['group-size'] === '1' ? 'person' : 'people'}</span>
                        </div>
                        ${formData['tour-preference'] ? `
                        <div class="detail-row">
                            <span class="detail-label">Preferred Tour:</span>
                            <span>${tourNames[formData['tour-preference']] || formData['tour-preference']}</span>
                        </div>
                        ` : ''}
                        ${formData['special-requirements'] ? `
                        <div class="detail-row">
                            <span class="detail-label">Special Requirements:</span>
                            <span>${formData['special-requirements']}</span>
                        </div>
                        ` : ''}
                    </div>
                    
                    <h3>What happens next?</h3>
                    <ul>
                        <li><strong>Within 24 hours:</strong> We'll confirm availability for your preferred date</li>
                        <li><strong>Booking confirmation:</strong> You'll receive detailed meeting point and timing information</li>
                        <li><strong>Weather updates:</strong> We'll contact you if weather conditions require rescheduling</li>
                        <li><strong>Final preparations:</strong> We'll send helpful tips for your island adventure</li>
                    </ul>
                    
                    <div class="contact-info">
                        <h3>Need to reach us immediately?</h3>
                        <p><strong>📞 Phone:</strong> +353 99 61234<br>
                        <strong>📧 Email:</strong> info@aranponytrap.com<br>
                        <strong>🕒 Hours:</strong> Daily 9:00 AM - 6:00 PM</p>
                    </div>
                    
                    <p>We look forward to sharing the magic of Inis Mór with you and creating memories that will last a lifetime!</p>
                    
                    <p>Slán go fóill (Goodbye for now),<br>
                    <strong>The Faherty Family</strong><br>
                    Aran Pony Trap Tours</p>
                </div>
                
                <div class="footer">
                    <p><strong>Aran Pony Trap Tours</strong><br>
                    Kilronan, Inis Mór, Aran Islands<br>
                    <a href="mailto:info@aranponytrap.com">info@aranponytrap.com</a> | +353 99 61234</p>
                    
                    <p style="font-size: 12px; color: #7f8c8d; margin-top: 20px;">
                        This email was sent because you submitted a booking inquiry on our website. 
                        If you didn't make this request, please contact us immediately.
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
};

const generateBusinessEmailTemplate = (formData) => {
    const tourNames = {
        'classic': 'Classic Inis Mór Tour',
        'photography': 'Photography Adventure',
        'historical': 'Historical Journey',
        'family': 'Family Adventure',
        'private': 'Private Custom Tour',
        'sunset': 'Sunset Special'
    };

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2d5a3d; color: white; padding: 20px; text-align: center; }
                .content { background: #fff; padding: 20px; border: 1px solid #ddd; }
                .booking-details { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
                .urgent { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0; }
                .detail-row { margin-bottom: 8px; }
                .label { font-weight: bold; display: inline-block; width: 150px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🐴 New Booking Inquiry</h1>
                    <p>Received: ${new Date().toLocaleString('en-IE')}</p>
                </div>
                
                <div class="content">
                    <div class="urgent">
                        <h3>⚡ Action Required</h3>
                        <p>A new booking inquiry has been submitted. Please respond within 24 hours to maintain customer satisfaction.</p>
                    </div>
                    
                    <div class="booking-details">
                        <h3>Customer Information</h3>
                        <div class="detail-row">
                            <span class="label">Name:</span>
                            ${formData['first-name']} ${formData['last-name']}
                        </div>
                        <div class="detail-row">
                            <span class="label">Email:</span>
                            <a href="mailto:${formData.email}">${formData.email}</a>
                        </div>
                        ${formData.phone ? `
                        <div class="detail-row">
                            <span class="label">Phone:</span>
                            <a href="tel:${formData.phone}">${formData.phone}</a>
                        </div>
                        ` : ''}
                        <div class="detail-row">
                            <span class="label">Preferred Date:</span>
                            ${new Date(formData['preferred-date']).toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div class="detail-row">
                            <span class="label">Group Size:</span>
                            ${formData['group-size']} ${formData['group-size'] === '1' ? 'person' : 'people'}
                        </div>
                        ${formData['tour-preference'] ? `
                        <div class="detail-row">
                            <span class="label">Preferred Tour:</span>
                            ${tourNames[formData['tour-preference']] || formData['tour-preference']}
                        </div>
                        ` : ''}
                        ${formData['special-requirements'] ? `
                        <div class="detail-row">
                            <span class="label">Special Requirements:</span>
                            ${formData['special-requirements']}
                        </div>
                        ` : ''}
                    </div>
                    
                    <h3>Next Steps</h3>
                    <ol>
                        <li>Check availability for ${new Date(formData['preferred-date']).toLocaleDateString('en-IE')}</li>
                        <li>Respond to customer at <a href="mailto:${formData.email}">${formData.email}</a></li>
                        ${formData.phone ? `<li>Call customer at <a href="tel:${formData.phone}">${formData.phone}</a> if needed</li>` : ''}
                        <li>Send booking confirmation with meeting details</li>
                        <li>Add to booking calendar</li>
                    </ol>
                </div>
            </div>
        </body>
        </html>
    `;
};

// Serverless function handler
module.exports = async function handler(req, res) {
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
        const formData = req.body;
        
        // Validate required fields
        const requiredFields = ['first-name', 'last-name', 'email', 'preferred-date', 'group-size'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                missingFields
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        
        // Validate date is in the future
        const selectedDate = new Date(formData['preferred-date']);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            return res.status(400).json({
                success: false,
                message: 'Selected date must be in the future'
            });
        }
        
        const transporter = createTransporter();
        
        // Email to customer
        const customerEmailOptions = {
            from: `"Aran Pony Trap Tours" <${process.env.EMAIL_USER}>`,
            to: formData.email,
            subject: `Booking Inquiry Received - ${formData['first-name']}, we're excited to host you!`,
            html: generateCustomerEmailTemplate(formData)
        };
        
        // Email to business
        const businessEmailOptions = {
            from: `"Website Bookings" <${process.env.EMAIL_USER}>`,
            to: process.env.BUSINESS_EMAIL || process.env.EMAIL_USER,
            subject: `🚨 New Booking Inquiry - ${formData['first-name']} ${formData['last-name']} for ${new Date(formData['preferred-date']).toLocaleDateString('en-IE')}`,
            html: generateBusinessEmailTemplate(formData)
        };
        
        // Send both emails
        await Promise.all([
            transporter.sendMail(customerEmailOptions),
            transporter.sendMail(businessEmailOptions)
        ]);
        
        console.log('📧 Emails sent successfully for booking inquiry:', {
            customer: formData.email,
            date: formData['preferred-date'],
            groupSize: formData['group-size']
        });
        
        res.json({
            success: true,
            message: 'Booking inquiry submitted successfully. Check your email for confirmation.'
        });
        
    } catch (error) {
        console.error('❌ Error processing contact form:', error);
        
        res.status(500).json({
            success: false,
            message: 'Sorry, there was an error processing your request. Please try again or contact us directly.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}