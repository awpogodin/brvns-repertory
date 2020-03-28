import { Controller, Get, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDTO } from "common/dto/user.dto";
import { RoleDTO } from "common/dto/role.dto";
import { RoleDAO } from "../db/domain/role.dao";

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get("users")
    async getAll(): Promise<UserDTO[]> {
        const users = await this.usersService.getUsersAll();
        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id
        }));
    }

    @Get("roles")
    getAllRoles(): Promise<RoleDAO[]> {
        return this.usersService.getRolesAll()
    }

    @Post("roles")
    createRole(@Body() role: RoleDTO): Promise<RoleDAO> {
        return this.usersService.createRole(role)
    }
}
