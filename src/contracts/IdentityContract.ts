import { ClearanceLevel } from '../security';

export interface IdentityProfile {
  id: string;
  fullName: {
    en: string;
    ar: string;
    ku: string;
  };
  role: string;
  ministry: string;
  clearance: ClearanceLevel;
  biometricRegistered: boolean;
  hardwareKeyId: string;
}

export interface IdentityContract {
  getEmployeeProfile(id: string): IdentityProfile | undefined;
  listProfilesByClearance(level: ClearanceLevel): IdentityProfile[];
  validateIdentitySignature(id: string, signatureHex: string): boolean;
}
