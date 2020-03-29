import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserDAO } from "./domain/user.dao";
import { RoleDAO } from "./domain/role.dao";
import { CategoryDAO } from "./domain/category.dao";
import { SymptomDAO } from "./domain/symptom.dao";
import { MedicationDAO } from "./domain/medication";
import { SymptomsMedicationsDAO } from "./domain/symptoms-medications.dao";

@Module({
    imports: [TypeOrmModule.forFeature([
        UserDAO,
        RoleDAO,
        CategoryDAO,
        SymptomDAO,
        MedicationDAO,
        SymptomsMedicationsDAO,
    ])],
    exports: [TypeOrmModule]
})
export class DbModule {}
