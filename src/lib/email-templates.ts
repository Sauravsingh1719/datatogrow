
const APP_URL = process.env.NEXT_PUBLIC_APP_URL; 
const LOGO_URL = `https://res.cloudinary.com/dodghmpuy/image/upload/v1765389876/icon_mbrnsw.png`;
const BRAND_COLOR = "#2563EB";
const ACCENT_COLOR = "#F3F4F6";

const styles = {
  body: `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${ACCENT_COLOR}; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;`,
  container: `max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);`,
  header: `background-color: #ffffff; padding: 20px; text-align: center; border-bottom: 1px solid #eaeaea;`,
  logo: `height: 40px; width: auto; display: block; margin: 0 auto;`,
  content: `padding: 30px 20px; color: #374151; line-height: 1.6; font-size: 16px;`,
  footer: `background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #eaeaea;`,
  button: `display: inline-block; background-color: ${BRAND_COLOR}; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px;`,
  highlightBox: `background-color: #eff6ff; border-left: 4px solid ${BRAND_COLOR}; padding: 15px; margin: 20px 0; border-radius: 4px;`,
  label: `font-weight: bold; color: #111827;`,
};

const wrapWithLayout = (content: string, previewText?: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; border-radius: 0 !important; }
      .content { padding: 20px !important; }
    }
  </style>
</head>
<body style="${styles.body}">
  <div style="display:none; font-size:1px; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
    ${previewText || 'Notification from Data to Grow'}
  </div>

  <div style="${styles.container}" class="container">
    <div style="${styles.header}">
      <a href="${APP_URL}" target="_blank">
        <img src="${LOGO_URL}" alt="Data to Grow Logo" style="${styles.logo}" />
      </a>
    </div>

    <div style="${styles.content}">
      ${content}
    </div>

    <div style="${styles.footer}">
      <p style="margin: 0 0 10px;"><strong>Vikram Kumar</strong> • Senior Data Analyst</p>
      <p style="margin: 0;">Helping businesses grow through data-driven insights.</p>
      <div style="margin-top: 15px;">
        <a href="${APP_URL}" style="color: ${BRAND_COLOR}; text-decoration: none;">Visit Website</a>
        <span style="margin: 0 10px;">|</span>
        <a href="mailto:vikram1840@gmail.com" style="color: ${BRAND_COLOR}; text-decoration: none;">Contact Support</a>
      </div>
      <p style="margin-top: 20px; color: #9ca3af;">&copy; ${new Date().getFullYear()} Data To Grow. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;


export const getOtpTemplate = (otp: string) => {
  const content = `
    <h2 style="color: #111827; margin-top: 0;">Verify Your Identity</h2>
    <p>Please use the following One-Time Password (OTP) to access your admin dashboard.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: ${BRAND_COLOR}; background: #eff6ff; padding: 10px 20px; border-radius: 8px; border: 1px dashed ${BRAND_COLOR};">
        ${otp}
      </span>
    </div>

    <p style="font-size: 14px; color: #6b7280;">This code will expire in 5 minutes. If you didn't request this, please ignore this email.</p>
  `;
  return wrapWithLayout(content, `Your OTP is ${otp}`);
};

export const getContactAdminTemplate = (data: any) => {
  const content = `
    <h2 style="color: #111827;">🚀 New Project Inquiry</h2>
    <p>You have received a new lead from your portfolio website.</p>
    
    <div style="${styles.highlightBox}">
      <div style="margin-bottom: 10px;">
        <div style="${styles.label}">Client Name:</div>
        <div>${data.name}</div>
      </div>
      <div style="margin-bottom: 10px;">
        <div style="${styles.label}">Email:</div>
        <div><a href="mailto:${data.email}" style="color: ${BRAND_COLOR};">${data.email}</a></div>
      </div>
      <div>
        <div style="${styles.label}">Message:</div>
        <div style="white-space: pre-wrap;">${data.message}</div>
      </div>
    </div>
    
    <div style="text-align: center;">
      <a href="mailto:${data.email}" style="${styles.button}">Reply to Client</a>
    </div>
  `;
  return wrapWithLayout(content, `New lead from ${data.name}`);
};

export const getContactUserTemplate = (data: any) => {
  const content = `
    <h2 style="color: #111827;">Thanks for reaching out!</h2>
    <p>Hi ${data.name.split(' ')[0]},</p>
    <p>I have received your message regarding <strong>"${data.subject || 'your project'}"</strong>.</p>
    <p>As a Data Analyst, I value precision and efficiency. I will review your requirements and get back to you personally within 24 hours.</p>
    
    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; font-style: italic; color: #555; margin-top: 20px;">
      "Your message: ${data.message.length > 50 ? data.message.substring(0, 50) + '...' : data.message}"
    </div>
  `;
  return wrapWithLayout(content, "I received your message!");
};

export const getNewsletterWelcomeTemplate = (data: any) => {
  const content = `
    <h2 style="color: #111827;">Welcome to the inner circle! 📊</h2>
    <p>Hi ${data.name},</p>
    <p>Thanks for subscribing to <strong>Data To Grow</strong>. You've joined a community of professionals interested in data analytics and insights.</p>
    <p>You can expect to receive updates about my latest case studies, blog posts, and data visualization tips.</p>
    
    <div style="margin-top: 30px; text-align: center;">
      <a href="${data.unsubscribeLink}" style="color: #9ca3af; font-size: 12px; text-decoration: underline;">Unsubscribe from this list</a>
    </div>
  `;
  return wrapWithLayout(content, "Welcome to Data To Grow");
};

export const getNewsletterAdminTemplate = (data: any) => {
  const content = `
    <h2 style="color: ${BRAND_COLOR};">📈 New Subscriber!</h2>
    <p>Your audience is growing.</p>
    
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eaeaea;"><strong>New Subscriber:</strong></td>
        <td style="padding: 10px; border-bottom: 1px solid #eaeaea;">${data.email}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eaeaea;"><strong>Total Active:</strong></td>
        <td style="padding: 10px; border-bottom: 1px solid #eaeaea;">${data.activeSubscribers}</td>
      </tr>
    </table>
  `;
  return wrapWithLayout(content, "New Newsletter Subscriber");
};

export const getBlogNotificationTemplate = (data: any) => {
  const imageHtml = data.blogImage 
    ? `<img src="${data.blogImage}" alt="${data.blogTitle}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px;" />` 
    : '';

  const content = `
    ${imageHtml}
    <h2 style="color: #111827; margin-top: 0;">${data.blogTitle}</h2>
    <p style="color: #6b7280; font-size: 14px;">Published on ${data.blogDate} by ${data.authorName}</p>
    
    <p style="margin: 20px 0;">${data.blogExcerpt}</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${data.blogUrl}" style="${styles.button}">Read Full Article</a>
    </div>

    <div style="border-top: 1px solid #eaeaea; margin-top: 30px; padding-top: 20px; text-align: center;">
      <a href="${data.unsubscribeUrl}" style="color: #9ca3af; font-size: 12px; text-decoration: underline;">Unsubscribe</a>
    </div>
  `;
  return wrapWithLayout(content, `New Post: ${data.blogTitle}`);
};