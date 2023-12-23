import {Role} from "./role";

export interface AccountDetails {
  uuid?: string;
  email?: string;
  firstName?: string,
  lastName?: string;
  phoneNumber?: string;
  birthDate?: Date;
  fullName?: string;
  role?: Role;
  age?: number;
  isActivated?: boolean;
}
