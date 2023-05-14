import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';

@Injectable()
export class MailerService {
  async sendEmail(to: string, subject: string, text: string) {
    // Create a transporter using your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
      port: 465,
      host: 'smtp.gmail.com',
      secure: true, // false for TLS; true for SSL
      auth: {
        user: 'stephendinh.demo.project@gmail.com', // Your email address
        pass: 'fwtqjzlhsarzlsbh', // Your email password
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'man-store shopping',
      to,
      subject,
      text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  }
}
