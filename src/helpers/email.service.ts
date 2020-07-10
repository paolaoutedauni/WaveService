'use strict';
import { google } from 'googleapis';
import nodemailer = require('nodemailer');

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  '21535258339-mj0r6gkk3v1fs6vl1fo8v0dbi06j4ssr.apps.googleusercontent.com',
  'bgPi5McCb_QtYy1xFG9Yoydf', // Client Secret
  'https://developers.google.com/oauthplayground', // Redirect URL
);
oauth2Client.setCredentials({
  // eslint-disable-next-line @typescript-eslint/camelcase
  refresh_token:
    '1//04GxF6pRPNy71CgYIARAAGAQSNwF-L9Irbu3O4TbOS1iMqvWLFyQErIH-t96AVHiC9vhp2vt_iY2_a0WgGO3R_OvRXm5x22dnRZo',
});
// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (email: string, url: string) => {
  // Generate test SMTP service account from ethereal.email

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'wavemetrosoftware@gmail.com',
      clientId:
        '21535258339-mj0r6gkk3v1fs6vl1fo8v0dbi06j4ssr.apps.googleusercontent.com',
      clientSecret: 'bgPi5McCb_QtYy1xFG9Yoydf',
      refreshToken:
        '1//04GxF6pRPNy71CgYIARAAGAQSNwF-L9Irbu3O4TbOS1iMqvWLFyQErIH-t96AVHiC9vhp2vt_iY2_a0WgGO3R_OvRXm5x22dnRZo',
      accessToken:
        'ya29.a0AfH6SMAyuS71EIznJKOfzH4EmWZTT02k-Vev-zAsTBASYHGbt3MezGVcyTask1ARBr7TjwEp8AEhKrjUKSQWXEyJuH4i7shCfBZ2cNKf6een4rZyQuip5DnWBip7uRjvkdrxh7aegFAV7UAhBE1zkZymOJl3b5enlzw',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // create reusable transporter object using the default SMTP transport
  /* const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'wavemetrosoftware@gmail.com', // generated ethereal user
      pass: 'wavemetro123', // generated ethereal password
    },
  });*/
  /*
  const client = nodemailer.createTransport({
    service: 'Mailgun',
    port: 587,
    auth: {
      user: 'postmaster@sandbox5a5ea81d6af94fd98abeac4ae86f3f85.mailgun.org',
      pass: '7afb549ad28ca9f030a44addb50c9be8-87c34c41-c6887430',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
*/
  // send mail with defined transport object
  const info = await smtpTransport.sendMail({
    from: '"Wave App 👻" <wavemetrosoftware@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Reset Password ✔', // Subject line
    text: `Hello! You request a password's reset, Here is your link: ${url} `, // plain text body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
