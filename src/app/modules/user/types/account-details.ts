import {Role} from "../../role/types/role";
import {MenuItem} from "primeng/api";

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
  items?: MenuItem[];
}
