import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { mainConfig } from "./config/main.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { RepertoryModule } from "./modules/repertory/repertory.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [mainConfig],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                url: configService.get("dbUrl"),
                synchronize: true,
                autoLoadEntities: true,
            }),
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "../../../repertory-app"),
            exclude: ["/api/.*"],
        }),
        AuthModule,
        UsersModule,
        RepertoryModule,
    ],
})
export class AppModule {}
