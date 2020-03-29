import { Module } from "@nestjs/common";
import { RepertoryService } from "./repertory.service";
import { DbModule } from "../db/db.module";
import { RepertoryController } from "./repertory.controller";

@Module({
    imports: [DbModule],
    providers: [RepertoryService],
    controllers: [RepertoryController]
})
export class RepertoryModule {}
