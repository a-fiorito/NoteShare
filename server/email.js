module.exports = function (emailList, text) {
    'use strict';
    const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noteshare.notifications@gmail.com',
            pass: 'notesharenotifications'
        }
    });
    let mailOptions = {
        from: '"Noteshare Notifier 📗" <noteshare.notifications@gmail.com>', // sender address
        to: emailList, // list of receivers
        subject: 'New Document Posted', // Subject line
        text: text, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};