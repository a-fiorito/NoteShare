import sendNotifications from '../server/email';
import sinon from 'sinon';
import nodemailer from 'nodemailer';

/**
 * UNIT TEST FOR US-06: New Document Notifications (#7)
 * https://github.com/a-fiorito/NoteShare/issues/7
 */
describe('US-06: New Document Notifications', () => {
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