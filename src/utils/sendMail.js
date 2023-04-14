const Mailjet = require('node-mailjet');

const sendMail = (to, subject, text) => {
  const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_PUBLIC_KEY,
    apiSecret: process.env.MAILJET_API_SECRET_KEY,
  });
  const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_FROM,
            Name: process.env.EMAIL_FROM_NAME,
          },
          To: [
            {
              Email: to,
            },
          ],
          Subject: subject,
          TextPart: text,
        },
      ],
    });
  request
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.statusCode);
    });
};

module.exports = sendMail;
