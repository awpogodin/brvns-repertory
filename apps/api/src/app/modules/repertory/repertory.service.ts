import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryDAO } from "../db/domain/category.dao";
import { MedicationDAO } from "../db/domain/medication";
import { SymptomDAO } from "../db/domain/symptom.dao";

@Injectable()
export class RepertoryService {
    constructor(
        @InjectRepository(CategoryDAO)
        private categoryRepository: Repository<CategoryDAO>,
        @InjectRepository(MedicationDAO)
        private medicationRepository: Repository<MedicationDAO>,
        @InjectRepository(SymptomDAO)
        private symptomRepository: Repository<SymptomDAO>,
    ) {}

    getCategoriesAll(): Promise<CategoryDAO[]> {
        return this.categoryRepository.find();
    }

    getCategoryById(id: number): Promise<CategoryDAO> {
        return this.categoryRepository.findOne(id)
    }

    getMedicationsAll(): Promise<MedicationDAO[]> {
        return this.medicationRepository.find();
    }

    getMedicationById(id: number): Promise<MedicationDAO> {
        return this.medicationRepository.findOne(id)
    }

    getSymptomsAll(): Promise<SymptomDAO[]> {
        return this.symptomRepository.find();
    }

    getSymptomById(id: number): Promise<SymptomDAO> {
        return this.symptomRepository.findOne(id)
    }
}
