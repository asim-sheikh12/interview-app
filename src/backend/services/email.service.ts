import nodemailer from 'nodemailer';

import { jwtService } from './jwt.service';

interface IDetails {
  firstName: string;
  lastName: string;
  email: string;
  data?: any;
}

export const sendEmail = ({ firstName, lastName, email, data }: IDetails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'asim.thoughtwin@gmail.com',
      pass: 'ppwqdxvyyhlcxczk',
    },
  });
  const result = jwtService.createCandidateToken(data);
  const mailOptions = {
    from: 'asim.thoughtwin@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    html: `<p><b>Dear</b> ${firstName} ${lastName},</p>
    <span>Thank you for reaching out to us. After reviewing your application, we are excited to move forward with the interview process.<br/>We would like you to fill your details <a href=http://localhost:3000/candidate/register/${result.token}>here</a>.

    <p><b>Note</b>: The above link will be expired in 24 hrs.</p>

    <b>Best Regards,</b>
    <p>HR Manager | ThoughtWin IT Solutions </p>

 </span>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return error;
    }
    console.log(`Email sent: ${info.response}`);
    return info;
  });
};
