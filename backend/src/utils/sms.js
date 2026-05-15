import twilio from 'twilio';
import coolsms from 'coolsms-node-sdk';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const COOLSMS_API_KEY = process.env.COOLSMS_API_KEY;
const COOLSMS_API_SECRET = process.env.COOLSMS_API_SECRET;
const twilioClient = (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN)
    ? twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    : null;
// CoolSMS typically needs api key and secret, but library instantiation depends on actual version
// Here assuming standard v2/v4 usage based on keys
const coolsmsClient = (COOLSMS_API_KEY && COOLSMS_API_SECRET)
    // @ts-ignore
    ? new coolsms(COOLSMS_API_KEY, COOLSMS_API_SECRET)
    : null;
/**
 * Sends an SMS. Routes to Coolsms if country code is +82, else Twilio.
 */
export async function sendSMS(to, text) {
    try {
        if (to.startsWith('+82')) {
            if (!coolsmsClient)
                throw new Error("Coolsms is not configured");
            // Korean number -> use coolsms
            // The exact method depends on coolsms-node-sdk version, typical structure:
            await coolsmsClient.message.send({
                to: to.replace('+82', '0'), // Coolsms often expects local format for +82
                from: process.env.COOLSMS_FROM_NUMBER || '01000000000',
                text,
            });
            return true;
        }
        else {
            if (!twilioClient)
                throw new Error("Twilio is not configured");
            // Other country -> use Twilio
            await twilioClient.messages.create({
                body: text,
                from: TWILIO_PHONE_NUMBER,
                to,
            });
            return true;
        }
    }
    catch (error) {
        console.error("SMS Send Error:", error);
        return false;
    }
}
//# sourceMappingURL=sms.js.map