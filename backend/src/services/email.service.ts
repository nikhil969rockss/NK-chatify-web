import nodemailer from "nodemailer";
import {
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  REFRESH_TOKEN,
  USER_EMAIL_ID,
} from "../config/env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: USER_EMAIL_ID,
    clientId: GMAIL_CLIENT_ID,
    clientSecret: GMAIL_CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
  },
});

//verify connection
transporter.verify((err, success) => {
  if (err) {
    console.log(`Error connecting to email service: ${err}`);
  } else {
    console.log(`Email service is ready to send`);
  }
});

export const sendEmail = async ({ subject, to, text, html }: ISendEmail) => {
  try {
    const info = await transporter.sendMail({
      from: `Chatify <${USER_EMAIL_ID}>`,
      subject,
      to,
      text,
      html,
    });
    console.log(`Email Sent to $${to}`, info.messageId);
  } catch (error) {
    console.log("Error sending Email", error);
  }
};

export const sendRegistrationEmail = async (to: string, username: string) => {
  const subject = "Welcome to Chatify 🚀";

  const text = `
  Hey ${username},
  
  Welcome to Chatify 🎉
  
  Your account has been successfully created.
  
  You can now start chatting, connecting, and exploring everything Chatify has to offer.
  
  If you didn’t create this account, please ignore this email.
  
  – Team Chatify
  `;

  const html = `
    <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
      <table align="center" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:auto;padding:20px;">
        <tr>
          <td style="background:#ffffff;border-radius:12px;padding:30px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            
            <h1 style="color:#4f46e5;margin-bottom:10px;">Chatify 🚀</h1>
            
            <h2 style="color:#111827;margin-bottom:20px;">
              Welcome, ${username}!
            </h2>
            
            <p style="color:#6b7280;font-size:16px;line-height:1.5;">
              Your account has been successfully created. You're now ready to start chatting,
              connecting, and building conversations that actually matter.
            </p>
  
            <div style="margin:30px 0;">
              <a href="#" 
                style="background:#4f46e5;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;display:inline-block;">
                Start Chatting
              </a>
            </div>
  
            <p style="color:#9ca3af;font-size:14px;">
              If you didn’t create this account, you can safely ignore this email.
            </p>
  
            <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />
  
            <p style="color:#9ca3af;font-size:12px;">
              © ${new Date().getFullYear()} Chatify. All rights reserved.
            </p>
  
          </td>
        </tr>
      </table>
    </div>
    `;

  await sendEmail({
    to,
    subject,
    text,
    html,
  });
};
