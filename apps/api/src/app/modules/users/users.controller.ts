import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDTO } from "common/dto/user.dto";

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get("users")
    async getAll(): Promise<UserDTO[]> {
        const users = await this.usersService.getUsersAll();
        return users.map((user) => ({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
        }));
    }
}
