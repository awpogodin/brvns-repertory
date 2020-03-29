import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryDAO } from "../db/domain/category.dao";
import { MedicationDAO } from "../db/domain/medication";
import { SymptomDAO } from "../db/domain/symptom.dao";
import { SymptomsMedicationsDAO } from "../db/domain/symptoms-medications.dao";
import {CategoryBodyDTO} from "../../../../../../common/dto/category-body.dto";
import {MedicationBodyDTO} from "../../../../../../common/dto/medication-body.dto";
import {SymptomBodyDTO} from "../../../../../../common/dto/symptom-body.dto";

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
        private symptomsMedicationsRepository: Repository<SymptomsMedicationsDAO>,
    ) {}

    getCategoriesAll(): Promise<CategoryDAO[]> {
        return this.categoryRepository.find();
    }

    getCategoryById(id: number): Promise<CategoryDAO> {
        return this.categoryRepository.findOne(id)
    }

    createCategory(category: CategoryBodyDTO): Promise<CategoryDAO> {
        return this.categoryRepository.save(category)
    }

    getMedicationsAll(): Promise<MedicationDAO[]> {
        return this.medicationRepository.find();
    }

    getMedicationById(id: number): Promise<MedicationDAO> {
        return this.medicationRepository.findOne(id)
    }

    createMedication(medication: MedicationBodyDTO): Promise<MedicationDAO> {
        return this.medicationRepository.save(medication);
    }

    getSymptomsAll(): Promise<SymptomDAO[]> {
        return this.symptomRepository.find();
    }

    getSymptomById(id: number): Promise<SymptomDAO> {
        return this.symptomRepository.findOne(id)
    }

    getSymptomsByCategoryId(id: number): Promise<SymptomDAO[]> {
        return this.symptomRepository.find({
            where: {
                category_id: id
            }
        })
    }

    createSymptom(symptom: SymptomBodyDTO): Promise<SymptomDAO> {
        return this.symptomRepository.save(symptom);
    }

    getMedicationsBySymptomId(id: number): Promise<SymptomsMedicationsDAO[]> {
        return this.symptomsMedicationsRepository.find({
            where: {
                symptom_id: id
            }
        })
    }

    addSymptomToMedication(
        symptom_id: number,
        medication_id: number,
        user_id?: number
    ): Promise<SymptomsMedicationsDAO> {
        return this.symptomsMedicationsRepository.save({
            symptom_id,
            medication_id,
            user_id,
        })
    }
}
