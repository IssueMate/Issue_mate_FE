export interface SmsSendRequest {
  phone: string;
}

export interface SmsVerifyRequest {
  phone: string;
  code: string;
}
