import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDTO } from "../../../../../../common/dto/user.dto";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getAll(): Promise<UserDTO[]> {
        const users = await this.usersService.getAll();
        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email || ""
        }));
    }
}
