import { Module } from "@nestjs/common";
import { RepertoryService } from "./repertory.service";
import { DbModule } from "../db/db.module";
import { RepertoryController } from "./repertory.controller";
import { UsersService } from "../users/users.service";

@Module({
    imports: [DbModule],
    providers: [RepertoryService, UsersService],
    controllers: [RepertoryController],
})
export class RepertoryModule {}
