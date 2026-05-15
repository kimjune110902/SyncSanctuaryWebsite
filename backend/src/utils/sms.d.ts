/**
 * Sends an SMS. Routes to Coolsms if country code is +82, else Twilio.
 */
export declare function sendSMS(to: string, text: string): Promise<boolean>;
//# sourceMappingURL=sms.d.ts.map