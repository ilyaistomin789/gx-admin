export enum ContactType {
  Email = 'email',
  Phone = 'phone',
}

export interface VerificationCode {
  id: string;
  contact: string;
  contactType: ContactType;
  code: string;
  expiredAt: Date;
  createdAt: Date;
}

/**
 * 5 min
 */
export const VERIFICATION_CODE_EXPIRES_IN_MS = 5 * 60 * 1000;

/**
 * 1 min
 */
export const VERIFICATION_CODE_RESEND_IN_MS = 1 * 60 * 1000;
