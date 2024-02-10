import {PermissionType} from "./permission-type";

export interface Permission {
  uuid: string;
  type: PermissionType;
  name?: string;
}
