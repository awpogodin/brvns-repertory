import { Controller, Get, Post, Body } from "@nestjs/common";
import { RepertoryService } from "./repertory.service";
import { UserDTO } from "common/dto/user.dto";
import { RoleDTO } from "common/dto/role.dto";
import { RoleDAO } from "../db/domain/role.dao";

@Controller("repertory")
export class RepertoryController {
    constructor(private repertoryService: RepertoryService) {}

    @Get("users")
    async getAll(): Promise<UserDTO[]> {
        const users = await this.repertoryService.getUsersAll();
        return users.map(user => ({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role_id: user.role_id
        }));
    }

    @Get("roles")
    getAllRoles(): Promise<RoleDAO[]> {
        return this.repertoryService.getRolesAll()
    }

    @Post("roles")
    createRole(@Body() role: RoleDTO): Promise<RoleDAO> {
        return this.repertoryService.createRole(role)
    }
}
