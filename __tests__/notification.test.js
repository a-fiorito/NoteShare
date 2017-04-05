import sendNotifications from '../server/email';
import sinon from 'sinon';
import nodemailer from 'nodemailer';

describe('Sending Notfications', () => {
    var stub = sinon.stub(nodemailer, 'createTransport').callsFake(() => {
        return {
            sendMail: function () { }
        };
    });

    it('Successfully calls email service', () => {
        sendNotifications('fioritoanthony@outlook.com', test);
        expect(stub.called).toBe(true);
    });
});