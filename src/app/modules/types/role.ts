import {RoleType} from "./role-type";
import {Permission} from "./permission";

export interface Role {
  uuid?: string;
  name: string;
  type: RoleType;
  permissions: Permission[];
  isSystemRole?: boolean;
}
