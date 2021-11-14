const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);


/**
 * Sends an email with the given parameters using SendGrid
 * @param emailContent object with email options (to, from, subject, text, html)
 */
export async function sendEmail(emailContent: { to?: string; from?: string; subject?: string; text?: string; html?: string }) {
  let body = {
    from: 'ishaanmehta4@gmail.com',
    subject: 'Converge',
  };

  try {
    await sendGridMail.send({ ...body, ...emailContent });
  } catch (error: any) {
    console.error('[sendEmail]');
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}
