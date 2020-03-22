import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDAO } from "../db/domain/user.dao";
import { Repository } from "typeorm";
import { RegisterRequestDTO } from "common/dto/register-request.dto";
import { RoleDAO } from '../db/domain/role.dao';
import { RoleDTO } from 'common/dto/role.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserDAO)
        private usersRepository: Repository<UserDAO>,
        @InjectRepository(RoleDAO)
        private rolesRepository: Repository<RoleDAO>
    ) {}

    getUsersAll(): Promise<UserDAO[]> {
        return this.usersRepository.find({ relations: ["role_id"] });
    }

    findUserByEmail(email: string): Promise<UserDAO> {
        return this.usersRepository.findOne({
            where: {
                email: email
            }
        });
    }

    findUserByName(name: string): Promise<UserDAO> {
        return this.usersRepository.findOne({
            where: {
                name: name
            }
        });
    }

    findUserById(id: number): Promise<UserDAO> {
        return this.usersRepository.findOne(id);
    }

    async createUser(user: RegisterRequestDTO): Promise<UserDAO> {
        const role = await this.getRoleBySlug("USER");
        return await this.usersRepository.save({
            ...user,
            role_id: role.role_id
        });
    }

    getRolesAll(): Promise<RoleDAO[]> {
      return this.rolesRepository.find();
    }

    getRoleBySlug(slug: string): Promise<RoleDAO> {
        return this.rolesRepository.findOne({
            where: {
                slug: slug
            }
        });
    }

    getRoleById(id: number): Promise<RoleDAO> {
        return this.rolesRepository.findOne(id);
    }

    async createRole(role: RoleDTO): Promise<RoleDAO> {
        return await this.rolesRepository.save(role);
    }
}
