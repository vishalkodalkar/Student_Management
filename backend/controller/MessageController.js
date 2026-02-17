import Message from "../models/Message.js";
import nodemailer from "nodemailer";

/* ================= PUBLIC: SEND MESSAGE ================= */
export const sendMessage = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const newMessage = await Message.create({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message" });
  }
};

/* ================= ADMIN: GET ALL MESSAGES ================= */
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

/* ================= ADMIN: REPLY TO MESSAGE ================= */
export const replyToMessage = async (req, res) => {
  try {
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ message: "Reply message is required" });
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      {
        adminReply: reply,
        status: "replied",
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // ✅ Send reply email to guest
    await sendReplyEmail(message);

    res.status(200).json({
      message: "Reply sent successfully",
      data: message,
    });
  } catch (error) {
    console.error("Reply failed:", error);
    res.status(500).json({ message: "Reply failed" });
  }
};

/* ================= EMAIL TO GUEST ================= */
const sendReplyEmail = async (message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: message.email, // ✅ guest email from Message
      subject: "Reply from Student Management System",
      html: `
        <p>Hello ${message.name || "Guest"},</p>

        <p>Thank you for contacting us. Below is the response to your message:</p>

        <p><strong>Your Message:</strong></p>
        <blockquote>${message.message}</blockquote>

        <p><strong>Admin Reply:</strong></p>
        <blockquote>${message.adminReply}</blockquote>

        <p>If you have further questions, feel free to contact us again.</p>

        <p>Regards,<br/>
        Student Management Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Reply email sent to guest successfully");
  } catch (error) {
    console.error("Error sending reply email:", error.message);
  }
};