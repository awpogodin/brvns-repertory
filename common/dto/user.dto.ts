import {RoleDTO} from "./role.dto";

export interface UserDTO {
    id: number;
    name: string;
    email: string;
    role?: RoleDTO | number;
}
