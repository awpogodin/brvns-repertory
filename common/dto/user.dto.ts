import {RoleDTO} from "./role.dto";

export interface UserDTO {
    id: number;
    name: string;
    surname: string;
    email: string;
    role_id?: RoleDTO | number;
}
