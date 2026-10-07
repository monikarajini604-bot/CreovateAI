import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

/**
 * CREOVATE AI - Real Account Verification Email Service
 * 
 * Supports:
 * 1. Production SMTP (configured via SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM)
 * 2. Ethereal Email test transporter (automatic real inbox for development/testing)
 * 3. Never logs or leaks verification tokens into frontend or public consoles
 */

let transporter = null;
let testAccount = null;

// Initialize mail transporter
async function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_USER, EMAIL_PASS } = process.env;

  // 1. Check custom SMTP credentials
  if (SMTP_HOST && (SMTP_USER || EMAIL_USER)) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER || EMAIL_USER,
        pass: SMTP_PASS || EMAIL_PASS
      }
    });
    return transporter;
  }

  // 2. Check Gmail or well-known service
  if (EMAIL_USER && EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });
    return transporter;
  }

  // 3. Fallback to automated Ethereal Test Transporter (real test inbox for dev)
  try {
    testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    return transporter;
  } catch (err) {
    // 4. Fallback to json transport if completely offline
    transporter = nodemailer.createTransport({
      jsonTransport: true
    });
    return transporter;
  }
}

/**
 * Send Real Account Verification Link Email
 * 
 * @param {Object} options
 * @param {string} options.toEmail Registered recipient email
 * @param {string} options.toName Recipient name
 * @param {string} options.verificationLink Secure unique verification link
 * @param {string} options.role 'creator' | 'brand'
 * @returns {Promise<Object>} delivery result
 */
export async function sendVerificationEmail({ toEmail, toName = 'Creator', verificationLink, role = 'creator' }) {
  try {
    const mailClient = await getTransporter();
    const fromAddress = process.env.EMAIL_FROM || '"CREOVATE AI Security" <security@creovate.ai>';

    const roleTitle = role === 'brand' ? 'Brand / Agency Partner' : 'AI Content Creator';

    const mailOptions = {
      from: fromAddress,
      to: toEmail,
      subject: `Verify Your Creovate AI Account`,
      text: `Hello ${toName},\n\nPlease click the following link to verify your email address and activate your Creovate AI account:\n\n${verificationLink}\n\nThis verification link expires in 24 hours.\n\nIf you did not create an account with Creovate AI, please ignore this email.\n\nCreovate AI Team\nCreate. Innovate. Elevate with AI.`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Creovate AI Account</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #080d19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #080d19; padding: 30px 15px;">
            <tr>
              <td align="center">
                <table width="100%" max-width="560px" style="max-width: 560px; background-color: #0c1222; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 32px 36px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background: linear-gradient(135deg, rgba(147, 51, 234, 0.15), rgba(79, 70, 229, 0.15));">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <span style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">CREOVATE <span style="color: #c084fc;">AI</span></span>
                            <div style="font-size: 11px; color: rgba(216, 180, 254, 0.8); margin-top: 2px;">Create. Innovate. Elevate with AI.</div>
                          </td>
                          <td align="right">
                            <span style="display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 10px; font-weight: 700; background-color: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">
                              Account Security
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 36px 36px 28px;">
                      <h1 style="font-size: 20px; font-weight: 700; color: #ffffff; margin: 0 0 12px 0;">Verify Your Email Address</h1>
                      <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; margin: 0 0 24px 0;">
                        Hello <strong style="color: #f1f5f9;">${toName}</strong> (${roleTitle}),<br/>
                        Welcome to Creovate AI! Please click the verification button below to verify your email address and activate your account.
                      </p>

                      <!-- Action CTA Button -->
                      <div style="text-align: center; margin: 32px 0;">
                        <a href="${verificationLink}" style="display: inline-block; padding: 14px 36px; background: linear-gradient(135deg, #9333ea, #6366f1); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; border-radius: 14px; box-shadow: 0 10px 25px -5px rgba(147, 51, 234, 0.5); letter-spacing: 0.3px;">
                          Verify Email Address
                        </a>
                      </div>

                      <p style="font-size: 12px; line-height: 1.5; color: #64748b; margin: 24px 0 8px 0;">
                        If the button above does not work, copy and paste this verification link into your browser:
                      </p>
                      <div style="padding: 12px 14px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; word-break: break-all; font-size: 11px; color: #c084fc; font-family: monospace;">
                        <a href="${verificationLink}" style="color: #c084fc; text-decoration: underline;">${verificationLink}</a>
                      </div>

                      <div style="font-size: 11px; color: #94a3b8; margin-top: 20px;">
                        ⏱️ This verification link expires in <strong>24 hours</strong>.
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 36px; border-top: 1px solid rgba(255, 255, 255, 0.08); background-color: #090e1c; font-size: 11px; color: #64748b; text-align: center;">
                      If you did not register for Creovate AI, please disregard this email or contact support at security@creovate.ai.<br/>
                      © 2026 Creovate AI. All rights reserved.
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };

    const info = await mailClient.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
      previewUrl: testAccount ? nodemailer.getTestMessageUrl(info) : null
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}
