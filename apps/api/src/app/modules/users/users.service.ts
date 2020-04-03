import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDAO } from "../db/domain/user.dao";
import { Repository } from "typeorm";
import { RegisterRequestDTO } from "common/dto/register-request.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserDAO)
        private usersRepository: Repository<UserDAO>
    ) {}

    getUsersAll(): Promise<UserDAO[]> {
        return this.usersRepository.find({ relations: ["role"] });
    }

    findUserByEmail(email: string): Promise<UserDAO> {
        return this.usersRepository.findOne({
            where: {
                email: email,
            },
        });
    }

    findUserByName(name: string): Promise<UserDAO> {
        return this.usersRepository.findOne({
            where: {
                name: name,
            },
        });
    }

    findUserById(id: number): Promise<UserDAO> {
        return this.usersRepository.findOne(id);
    }

    createUser(user: RegisterRequestDTO): Promise<UserDAO> {
        return this.usersRepository.save(user);
    }
}
