// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var sgSend = function(from, text) {

    const msg = {
      to: "lemarcelo87@gmail.com",
      from: from,
      subject: "Contato do site",
      text: text,
      html: text,
    };

    try {
        sgMail.send(msg);
    }
    catch(e) {console.log("error sendgrid")};
}
module.exports = sgSend;
