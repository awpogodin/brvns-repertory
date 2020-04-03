import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryDAO } from "../db/domain/category.dao";
import { MedicationDAO } from "../db/domain/medication";
import { SymptomDAO } from "../db/domain/symptom.dao";
import { SymptomsMedicationsDAO } from "../db/domain/symptoms-medications.dao";
import { CategoryBodyDTO } from "../../../../../../common/dto/category-body.dto";
import { MedicationBodyDTO } from "../../../../../../common/dto/medication-body.dto";
import { SymptomBodyDTO } from "../../../../../../common/dto/symptom-body.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class RepertoryService {
    constructor(
        @InjectRepository(CategoryDAO)
        private categoryRepository: Repository<CategoryDAO>,
        @InjectRepository(MedicationDAO)
        private medicationRepository: Repository<MedicationDAO>,
        @InjectRepository(SymptomDAO)
        private symptomRepository: Repository<SymptomDAO>,
        @InjectRepository(SymptomsMedicationsDAO)
        private symptomsMedicationsRepository: Repository<
            SymptomsMedicationsDAO
        >,
        private usersService: UsersService
    ) {}

    getCategoriesAll(): Promise<CategoryDAO[]> {
        return this.categoryRepository.find();
    }

    getCategoryById(id: number): Promise<CategoryDAO> {
        return this.categoryRepository.findOne(id);
    }

    createCategory(category: CategoryBodyDTO): Promise<CategoryDAO> {
        return this.categoryRepository.save(category);
    }

    getMedicationsAll(): Promise<MedicationDAO[]> {
        return this.medicationRepository.find();
    }

    getMedicationById(id: number): Promise<MedicationDAO> {
        return this.medicationRepository.findOne(id);
    }

    createMedication(medication: MedicationBodyDTO): Promise<MedicationDAO> {
        return this.medicationRepository.save(medication);
    }

    getSymptomsAll(): Promise<SymptomDAO[]> {
        return this.symptomRepository.find({
            relations: ["parent_id", "category_id"],
        });
    }

    getSymptomById(id: number): Promise<SymptomDAO> {
        return this.symptomRepository.findOne(id);
    }

    getSymptomsByCategoryId(id: number): Promise<SymptomDAO[]> {
        return this.symptomRepository.find({
            where: {
                category_id: id,
            },
        });
    }

    async createSymptom(symptom: SymptomBodyDTO): Promise<SymptomDAO> {
        const category = await this.getCategoryById(symptom.category_id);
        if (!category) {
            throw new HttpException(
                "category/dontExist",
                HttpStatus.BAD_REQUEST
            );
        }
        if (symptom.parent_id) {
            const parent = await this.getSymptomById(symptom.parent_id);
            if (!parent) {
                throw new HttpException(
                    "parent/dontExist",
                    HttpStatus.BAD_REQUEST
                );
            }
            return this.symptomRepository.save({
                ...symptom,
                category_id: category.category_id,
                parent_id: parent.symptom_id,
            });
        }
        return this.symptomRepository.save({
            ...symptom,
            category_id: category.category_id,
        });
    }

    getMedicationsBySymptomId(id: number): Promise<SymptomsMedicationsDAO[]> {
        return this.symptomsMedicationsRepository.find({
            where: {
                symptom_id: id,
            },
            relations: ["symptom_id", "medication_id"],
        });
    }

    async addSymptomToMedication(
        symptom_id: number,
        medication_id: number,
        user_id: number
    ): Promise<SymptomsMedicationsDAO> {
        const symptom = await this.getSymptomById(symptom_id);
        const medication = await this.getMedicationById(medication_id);
        const user = await this.usersService.findUserById(user_id);
        if (!symptom || !medication || !user) {
            throw new HttpException(
                "symptomToMedication/invalidData",
                HttpStatus.BAD_REQUEST
            );
        }
        let isCustom = false;
        const userRole = await this.usersService.getRoleById(user.role_id);
        if (userRole.slug !== "ADMIN") {
            isCustom = true;
        }
        return this.symptomsMedicationsRepository.save({
            symptom_id,
            medication_id,
            isCustom,
        });
    }
}
