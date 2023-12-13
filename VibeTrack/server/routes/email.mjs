import nodemailer from 'nodemailer';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
export const sendEmail = (to, subject, text) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service
      auth: {
        user: 'vibetracktxt@gmail.com', // Replace with your email
        pass: 'hmcs yeju buty xujk', // Replace with your email password
      },
    });

    const mailOptions = {
      from: 'vibetracktxt@gmail.com',
      to,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(new Error('Email not sent'));
      } else {
        console.log('Email sent: ' + info.response);
        resolve('Email sent');
      }
    });
  });
};
