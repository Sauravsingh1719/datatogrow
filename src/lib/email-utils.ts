import fs from 'fs';
import path from 'path';
import NewsletterModel from '@/models/NewsLetter';
import dbConnect from '@/lib/dbConnect';

export async function compileTemplate(templateName: string, data: any): Promise<string> {
  try {
    // In development, use absolute path
    const templatePath = path.join(process.cwd(), 'emails', `${templateName}.html`);
    
    if (!fs.existsSync(templatePath)) {
      console.error(`Template file not found: ${templatePath}`);
      return fallbackTemplate(templateName, data);
    }
    
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Simple template variable replacement
    Object.keys(data).forEach(key => {
      const placeholder = `{{${key}}}`;
      template = template.replace(new RegExp(placeholder, 'g'), data[key]);
    });
    
    return template;
  } catch (error) {
    console.error(`Error compiling template ${templateName}:`, error);
    return fallbackTemplate(templateName, data);
  }
}

function fallbackTemplate(templateName: string, data: any): string {
  if (templateName === 'newsletter-welcome') {
    return `
<!DOCTYPE html>
<html>
<body>
  <h2>Welcome to DataToGrow, ${data.name}!</h2>
  <p>Thank you for subscribing to our newsletter. You'll receive weekly data insights and updates.</p>
  <p>Best regards,<br>Vikram - DataToGrow Analytics</p>
</body>
</html>
    `;
  }
  
  return `
<!DOCTYPE html>
<html>
<body>
  <h2>New Newsletter Subscriber</h2>
  <p>Email: ${data.email}</p>
  <p>Source: ${data.source}</p>
</body>
</html>
  `;
}

export async function getNewsletterStats() {
  await dbConnect();
  
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const [
    totalSubscribers,
    activeSubscribers,
    thisMonthSubscribers,
    lastMonthSubscribers
  ] = await Promise.all([
    NewsletterModel.countDocuments(),
    NewsletterModel.countDocuments({ active: true }),
    NewsletterModel.countDocuments({ 
      subscribedAt: { $gte: startOfMonth },
      active: true 
    }),
    NewsletterModel.countDocuments({ 
      subscribedAt: { 
        $gte: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        $lt: startOfMonth
      },
      active: true 
    })
  ]);
  
  const growthRate = lastMonthSubscribers > 0 
    ? Math.round(((thisMonthSubscribers - lastMonthSubscribers) / lastMonthSubscribers) * 100)
    : 100;
  
  return {
    totalSubscribers,
    activeSubscribers,
    thisMonthSubscribers,
    growthRate,
  };
}