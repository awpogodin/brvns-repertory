import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserDAO } from "./domain/user.dao";
import { RoleDAO } from "./domain/role.dao";

@Module({
    imports: [TypeOrmModule.forFeature([UserDAO, RoleDAO])],
    exports: [TypeOrmModule]
})
export class DbModule {}
