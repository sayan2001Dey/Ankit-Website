/* eslint-disable padded-blocks */
/* eslint-disable max-len */

// Dependencies for callable functions.
import {
  onCall,
  HttpsError,
  CallableRequest,
} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as nodeMailer from "nodemailer";
// prettier-ignore
import {Request} from "./request.interface";
// prettier-ignore
import {config} from "./config/config";
// prettier-ignore
import {getEmailTemplate} from "./emailTamplate";

// Helper functions for validation

/**
 * Validates a given name based on its length.
 *
 * @param {string} name - The name to be validated
 * @return {boolean} True if the name is valid, False otherwise
 */
function validateName(name: string): boolean {
  if (name == null) return false;
  return name.length > 2 && name.length < 51;
}

/**
 * Validates an email address.
 *
 * @param {string} email - the email address to be validated
 * @return {boolean} true if the email is valid, false otherwise
 */
function validateEmail(email: string): boolean {
  if (email == null) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.length > 5 && email.length < 256 && emailRegex.test(email);
}

/**
 * Validates the subject of an email.
 *
 * @param {string} subject - The subject to be validated.
 * @return {boolean} Returns true if the subject is valid, otherwise returns false.
 */
function validateSubject(subject: string): boolean {
  if (subject == null) return false;
  return subject.length > 2 && subject.length < 51;
}

/**
 * Validates if the given message is not null and has a length greater than 10.
 *
 * @param {string} message - The message to be validated.
 * @return {boolean} Returns true if the message is not null and has a length greater than 10, otherwise returns false.
 */
function validateMessage(message: string): boolean {
  if (message == null) return false;
  return message.length > 10 && message.length < 5000;
}

/**
 * Sending email.
 * @param {Request} data Request data
 * @return {void} return true if the data is valid
 */
function sendEmail(data: Request): void {
  const transporter = nodeMailer.createTransport(config.smtpConfig);

  const msg = getEmailTemplate(data);

  const mailOptions = {
    from: `"Ankit India Email Bot" <${config.smtpConfig.auth.user}>`,
    to: config.destinations,

    subject:
      "New Contact Request - " + data.subject + " Ref." + Date.now().toString(),
    html: msg,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.info("Error sending email:", error);
    } else {
      logger.info("Email sent:", info.response);
    }
  });

  return;
}

exports.submitContactRequest = onCall<Request>(
  // {enforceAppCheck: true},
  (req: CallableRequest<Request>) => {
    try {
      const data = req.data;
      // Validate each field
      if (!validateName(data.name)) {
        throw new HttpsError(
          "invalid-argument",
          "Invalid name format. Please provide a first and last name."
        );
      }
      if (!validateEmail(data.email)) {
        throw new HttpsError(
          "invalid-argument",
          "Invalid email format. Please enter a valid email."
        );
      }
      if (!validateSubject(data.subject)) {
        throw new HttpsError(
          "invalid-argument",
          "Invalid subject format. Please provide a valid subject."
        );
      }
      if (!validateMessage(data.message)) {
        throw new HttpsError(
          "invalid-argument",
          "Message cannot be empty. Please provide a question or message."
        );
      }
      logger.info(
        `Callback request received: name: ${data.name}, email: ${data.email},
        subject: ${data.subject}, message: ${data.message}`
      );
      sendEmail(data);
      logger.info(
        `Callback request processed: name: ${data.name},
        email: ${data.email}, subject: ${data.subject},
        message: ${data.message}`
      );
      return {
        message: "Request submitted successfully!",
      };
    } catch (error) {
      logger.error("Error processing Callback request:", error);
      throw new HttpsError(
        "internal",
        "An error occurred. Please try again later."
      );
    }
  }
);
