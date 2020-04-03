import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Request,
} from "@nestjs/common";
import { RepertoryService } from "./repertory.service";
import { CategoryDTO } from "../../../../../../common/dto/category.dto";
import { CategoryBodyDTO } from "../../../../../../common/dto/category-body.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { MedicationDTO } from "../../../../../../common/dto/medication.dto";
import { MedicationBodyDTO } from "../../../../../../common/dto/medication-body.dto";
import { SymptomDTO } from "../../../../../../common/dto/symptom.dto";
import { SymptomBodyDTO } from "../../../../../../common/dto/symptom-body.dto";
import { SymptomToMedicationBodyDTO } from "../../../../../../common/dto/symptom-to-medication-body.dto";

@Controller("repertory")
export class RepertoryController {
    constructor(private repertoryService: RepertoryService) {}

    @UseGuards(JwtAuthGuard)
    @Get("/categories")
    getCategoriesAll(): Promise<CategoryDTO[]> {
        return this.repertoryService.getCategoriesAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post("/categories")
    createCategory(@Body() category: CategoryBodyDTO): Promise<CategoryDTO> {
        return this.repertoryService.createCategory(category);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/medications")
    getMedicationsAll(): Promise<MedicationDTO[]> {
        return this.repertoryService.getMedicationsAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post("/medications")
    createMedication(
        @Body() medication: MedicationBodyDTO
    ): Promise<MedicationDTO> {
        return this.repertoryService.createMedication(medication);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/symptoms")
    getSymptomsAll(): Promise<SymptomDTO[]> {
        return this.repertoryService.getSymptomsAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post("/symptoms")
    createSymptom(@Body() symptom: SymptomBodyDTO): Promise<SymptomDTO> {
        return this.repertoryService.createSymptom(symptom);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/medications-by-symptoms")
    async getMedicationBySymptoms(
        @Body() arrOfSymptomsId: number[]
    ): Promise<any[]> {
        const result = [];
        for (const id of arrOfSymptomsId) {
            const meds = await this.repertoryService.getMedicationsBySymptomId(
                id
            );
            result.push({
                symptom_id: id,
                meds,
            });
        }
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Post("/symptom-to-medication")
    async addSymptomsToMedication(
        @Request() req,
        @Body() body: SymptomToMedicationBodyDTO
    ): Promise<any> {
        const { id } = req.user;
        return this.repertoryService.addSymptomToMedication(
            body.symptom_id,
            body.medication_id,
            id
        );
    }
}
