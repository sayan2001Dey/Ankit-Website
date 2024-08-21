/* eslint-disable padded-blocks */

// Dependencies for callable functions.
import {
  onCall,
  HttpsError,
  CallableRequest,
} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as nodeMailer from "nodemailer";

import {Request} from "./request.interface";

import {config} from "./config/config";
import {getEmailTemplate} from "./emailTamplate";

// Helper functions for validation

/**
 * Name validation.
 * @param {string} name Name
 * @return {boolean} return true if the data is valid
 */
function validateName(name: string): boolean {
  if (name == null) return false;
  return name.length>2 && name.length<31;
}

/**
 * Phone number validation.
 * @param {string} phone 10 digit Phone Number
 * @return {boolean} return true if the data is valid
*/
function validatePhone(phone: string): boolean {
  if (phone == null) return false;
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

/**
 * Location validation.
 * @param {string} location Location details
 * @return {boolean} return true if the data is valid
 */
function validateLocation(location: string): boolean {
  if (location == null) return false;
  return location.length>5 && location.length<71;
}

/**
 * Query validation.
 * @param {string} query Query details
 * @return {boolean} return true if the data is valid
 */
function validateQuery(query: string): boolean {
  if (query == null) return false;
  return query.length>19 && query.length<1001;
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
    from: "\"Friendship Caterers Bot\" <"+config.smtpConfig.auth.user+">",
    to: config.destinations,
    // eslint-disable-next-line max-len
    subject: "New Callback Request - Friendship Caterers Ref."+Date.now().toString(),
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
  (
    req: CallableRequest<Request>
  ) => {
    // try {
    //   const data = req.data;

    //   // Validate each field
    //   if (!validateName(data.name)) {
    //     throw new HttpsError(
    //       "invalid-argument",
    //       "Invalid name format. Please provide a first and last name."
    //     );
    //   }

    //   if (!validatePhone(data.phone)) {
    //     throw new HttpsError(
    //       "invalid-argument",
    //       "Invalid phone number format. Please enter a valid phone number."
    //     );
    //   }

    //   if (!validateLocation(data.location)) {
    //     throw new HttpsError(
    //       "invalid-argument",
    //       "Invalid location format. Please provide a valid location."
    //     );
    //   }

    //   if (!validateQuery(data.query)) {
    //     throw new HttpsError(
    //       "invalid-argument",
    //       "Query cannot be empty. Please provide a question or message."
    //     );
    //   }

    //   logger.info(
    //   // eslint-disable-next-line max-len
    //     `Callback request received: name: ${data.name}, phone: ${data.phone}, location: ${data.location}, query: ${data.query}`
    //   );

    //   sendEmail(data);

    //   logger.info(
    //   // eslint-disable-next-line max-len
    //     `Callback request processed: name: ${data.name}, phone: ${data.phone}, location: ${data.location}, query: ${data.query}`
    //   );

    //   return {message: "Request submitted successfully!"};

    // } catch (error) {
    //   logger.error("Error processing Callback request:", error);
    //   throw new HttpsError(
    //     "internal",
    //     "An error occurred. Please try again later."
    //   );
    // }
  });
