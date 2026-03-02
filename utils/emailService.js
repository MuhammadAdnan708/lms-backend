const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mughalhouse592@gmail.com',
    pass: 'zdvi ydzb xdbs agav'
  }
});

const sendVerificationEmail = async (email, name, code) => {
  const mailOptions = {
    from: '"Learnix" <mughalhouse592@gmail.com>',
    to: email,
    subject: 'Verify Your Email - Learnix',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #162d59 0%, #1e3d6b 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
              <span style="color: #ff7f40;">LEARN</span>IX
            </h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 14px;">Learning Management System</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #162d59; margin: 0 0 20px 0; font-size: 24px;">Verify Your Email Address</h2>
            <p style="color: #666666; line-height: 1.6; margin: 0 0 30px 0;">
              Hi <strong>${name}</strong>,
              <br><br>
              Thank you for signing up for Learnix! To complete your registration, please use the verification code below:
            </p>
            
            <!-- Verification Code Box -->
            <div style="background-color: #f5f7fa; border: 2px dashed #162d59; border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
              <p style="color: #162d59; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
              <p style="color: #ff7f40; font-size: 36px; font-weight: 700; margin: 0; letter-spacing: 8px;">${code}</p>
            </div>
            
            <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0;">
              This code will expire in <strong>10 minutes</strong>. If you didn't create an account with Learnix, please ignore this email.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #162d59; padding: 20px 30px; text-align: center;">
            <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">
              © 2024 Learnix. All rights reserved.
            </p>
            <p style="color: rgba(255,255,255,0.4); margin: 5px 0 0 0; font-size: 11px;">
              This is an automated email. Please do not reply.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
};

const sendForgotPasswordEmail = async (email, name, code) => {
  const mailOptions = {
    from: '"Learnix" <mughalhouse592@gmail.com>',
    to: email,
    subject: 'Reset Your Password - Learnix',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #162d59 0%, #1e3d6b 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
              <span style="color: #ff7f40;">LEARN</span>IX
            </h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 14px;">Learning Management System</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #162d59; margin: 0 0 20px 0; font-size: 24px;">Reset Your Password</h2>
            <p style="color: #666666; line-height: 1.6; margin: 0 0 30px 0;">
              Hi <strong>${name}</strong>,
              <br><br>
              We received a request to reset your password. Use the verification code below to proceed:
            </p>
            
            <!-- Verification Code Box -->
            <div style="background-color: #f5f7fa; border: 2px dashed #162d59; border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
              <p style="color: #162d59; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Reset Code</p>
              <p style="color: #ff7f40; font-size: 36px; font-weight: 700; margin: 0; letter-spacing: 8px;">${code}</p>
            </div>
            
            <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0;">
              This code will expire in <strong>10 minutes</strong>. If you didn't request a password reset, please ignore this email.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #162d59; padding: 20px 30px; text-align: center;">
            <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">
              © 2024 Learnix. All rights reserved.
            </p>
            <p style="color: rgba(255,255,255,0.4); margin: 5px 0 0 0; font-size: 11px;">
              This is an automated email. Please do not reply.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
};

const sendContactForm = async ({ name, email, description, toEmail }) => {
  const mailOptions = {
    from: `"${name} (${email})" <mughalhouse592@gmail.com>`,
    replyTo: email,
    to: toEmail,
    subject: `New Contact Form Message from ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #162d59 0%, #2563eb 50%, #7c3aed 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
              <span style="color: #ff7f40;">New Contact</span> Message
            </h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #162d59; margin: 0 0 20px 0; font-size: 24px;">You have a new message from the contact form</h2>
            
            <div style="background-color: #f5f7fa; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #162d59;">Name:</strong> <span style="color: #333;">${name}</span></p>
              <p style="margin: 0 0 10px 0;"><strong style="color: #162d59;">Email:</strong> <span style="color: #333;">${email}</span></p>
              <p style="margin: 0;"><strong style="color: #162d59;">Message:</strong></p>
              <p style="margin: 10px 0 0 0; color: #333; line-height: 1.6;">${description}</p>
            </div>
            
            <div style="background: #dbeafe; border-radius: 8px; padding: 15px; margin-top: 20px; text-align: center;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                💡 <strong>Reply to:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #162d59; padding: 20px 30px; text-align: center;">
            <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">
              © 2024 Learnix. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendForgotPasswordEmail,
  sendContactForm
};
