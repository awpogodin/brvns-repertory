import {RoleDTO} from "./role.dto";

export interface UserDTO {
    id: number;
    name: string;
    email: string;
    role_id?: RoleDTO | number;
}
