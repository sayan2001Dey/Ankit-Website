/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import {Request} from "./request.interface";

export const getEmailTemplate = (data: Request) :string => {
  const {name, phone, location, query} = data;
  const phoneWithGap = phone.slice(0, 5)+" "+phone.slice(5, 10);
  const date = new Date(Date.now() + (5.5 * 60 * 60 * 1000)); // Offset for kolkata

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `
  <!DOCTYPE html>
  <html lang="en-in">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    </head>

    <body style="margin: 0; font-family: 'Poppins', sans-serif; background-color: #ffe7ba;">
      <table class="parent-table" style="width: 100%;" width="100%">
        <tbody>
          <tr>
            <td align="center">
              <div class="main" style="max-width: 600px; margin: 1rem; padding: 10px; border-radius: 1.6rem; background-color: #fdfbe8;">
                <table>
                  <tbody>
                    <tr>
                      <td height="140">
                        <a href="http://friendshipcaterers.in/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://friendshipcaterers.in">
                          <img src="https://friendshipcaterers.in/assets/brand.png" alt="Friendship Caterers" title="Friendship Caterers" width="100" style="margin-left: 25px">
                        </a>
                      </td>
                      <td align="right" class="date" style="width: 100%; padding: 1rem; padding-left: 5.4rem;" width="100%">
                        ${days[date.getDay()]}, <span style="text-wrap: nowrap">${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}</span>
                        <br>
                        <span style="text-wrap: nowrap">${date.toLocaleString("en-in", {hour: "numeric", minute: "numeric", hour12: true})}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table class="card" style="background-color: white; border-radius: 1.25rem; padding: 0.5rem; min-width: 100%;" bgcolor="white">
                  <thead>
                    <tr>
                      <td align="center" class="calender" style="padding-top: 3rem; padding-bottom: 2rem;">
                        <img src="https://friendshipcaterers.in/assets/mail/calender.png" alt="Calender decoration">
                      </td>
                    </tr>
                    <tr>
                      <td align="center" class="heading" style="font-size: 36px; line-height: 42px; letter-spacing: 0.8px; padding-bottom: 3rem;">
                        <b>You have received <br>a callback request</b>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td align="center">
                        <table cellspacing="4px" cellpadding="0" class="inner-table" style="max-width: 424px; border: 1px solid #ffe7ba; padding: 15px 20px; border-radius: 10px; margin-bottom: 2rem;">
                          <tbody>
                            <tr>
                              <td valign="top" class="left-col" style="width: 100px;" width="100">
                                <span><b>Name:</b> </span>
                              </td>
                              <td align="right">
                                <span>${name}</span>
                              </td>
                            </tr>

                            <tr>
                              <td valign="top" class="left-col" style="width: 100px;" width="100">
                                <span><b>Phone:</b> </span>
                              </td>
                              <td align="right">
                                <span>+91 ${phoneWithGap}</span>
                              </td>
                            </tr>

                            <tr>
                              <td valign="top" class="left-col" style="width: 100px;" width="100">
                                <span><b>Location:</b> </span>
                              </td>
                              <td align="right">
                                <span>${location}</span>
                              </td>
                            </tr>

                            <tr>
                              <td colspan="2">
                                <table class="inner-inner-table" style="margin-top: 1rem; width: 100%; border: 1px solid #ffe7ba; padding: 15px 20px; border-radius: 10px;" width="100%">
                                  <thead>
                                    <tr>
                                      <td align="center">
                                        <span><b>Query</b></span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <hr color="#ffe7ba">
                                      </td>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    <tr>
                                      <td>
                                        <span>${query}</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td colspan="2">
                                <a href="tel:+91${phone}" style="text-decoration: none;">
                                  <button class="cta-btn" style="background-color: #fdfbe8; border: 1px solid #ffe7ba; border-radius: 2rem; margin-top: 0.5rem; padding: 0 2rem; font-size: 16px; line-height: 42px;">
                                    <img src="https://friendshipcaterers.in/assets/mail/call-alt.png" alt="Call icon" height="20px" align="center" style="margin-bottom: 6px">
                                    <span>Call now</span>
                                  </button>
                                </a>
                                <a href="https://wa.me/+91${phone}?text=Hi%20there%2C%0AThank%20you%20for%20contacting%20Friendship%20Caterers" style="text-decoration: none;">
                                  <button class="cta-btn" style="background-color: #fdfbe8; border: 1px solid #ffe7ba; border-radius: 2rem; margin-top: 0.5rem; padding: 0 2rem; font-size: 16px; line-height: 42px;">
                                    <img src="https://friendshipcaterers.in/assets/mail/whatsapp-alt.png" alt="WhatsApp icon" height="20px" align="center" style="margin-bottom: 3px">
                                    <span>WhatsApp now</span>
                                  </button>
                                </a>
                              </td>
                            </tr>

                            <tr>
                              <td colspan="2" style="color: grey; padding-top: 0.5rem">
                                <small style>Not supposed to get the email?</small>
                                <br>
                                <small>Contact us here:
                                  <a href="mailto:info@friendshipcaterers.com" style="text-decoration: none; color: orange">info@friendshipcaterers.com</a></small>
                                <br>
                                <small>This is an automated email. Please don't reply here.</small>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="inf" style="margin: 1rem 0; width: 100%; text-align: center; color: gray;">
                  <small>Powered by
                    <img src="https://stelleronix.com/logo.png" alt="Stelleronix" height="20px" align="center" style="margin-bottom: 5px">
                    <span style="color: orangered"> | </span>
                    <img src="https://stelleronix.com/softworks.png" alt="Softworks" height="20px" align="center" style="margin-bottom: 5px">
                    <span style="color: orangered">™</span>
                  </small>
                  <br>
                  <small> © 2024 Stelleronix LLP </small>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  `;
};

