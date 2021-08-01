import * as nodemailer from 'nodemailer'
const mail = nodemailer.createTransport({
    service: "gmail",
      auth: {
        user: 'hezijack32@gmail.com',
        pass: 'zack34@gq',
      },
  });

  const sendMailService = (emails: string[]) => {
    const mailOptions = {
        from: process.env.GMAIL_NAME,
        to: emails,
        subject: 'Sending Email via Node.js',
        text: 'That was easy!'
      };
      return mail.sendMail(mailOptions)
  }

  export default sendMailService