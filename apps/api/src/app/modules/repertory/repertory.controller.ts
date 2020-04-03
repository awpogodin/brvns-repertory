import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Request,
    Param,
    Query,
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

function intersection(lists): any[] {
    const result = [];

    for (let i = 0; i < lists.length; i++) {
        const currentList = lists[i];
        for (let y = 0; y < currentList.length; y++) {
            const currentValue = currentList[y];
            if (!result.includes(currentValue)) {
                if (
                    lists.filter(function (obj) {
                        return obj.indexOf(currentValue) === -1;
                    }).length === 0
                ) {
                    result.push(currentValue);
                }
            }
        }
    }
    return result;
}

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
    async createCategory(@Body() category: CategoryBodyDTO): Promise<void> {
        await this.repertoryService.createCategory(category);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/medications")
    getMedicationsAll(): Promise<MedicationDTO[]> {
        return this.repertoryService.getMedicationsAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post("/medications")
    async createMedication(
        @Body() medication: MedicationBodyDTO
    ): Promise<void> {
        await this.repertoryService.createMedication(medication);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/symptoms")
    getSymptomsAll(): Promise<SymptomDTO[]> {
        return this.repertoryService.getSymptomsAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get("/symptoms/parents-by-category-id/:id")
    getParentSymptomsByCategoryId(@Param() { id }): Promise<SymptomDTO[]> {
        return this.repertoryService.getParentSymptomsByCategoryId(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/symptoms/childs-by-parent-id/")
    getChildSymptomsByParentId(
        @Param() params,
        @Query() query
    ): Promise<SymptomDTO[]> {
        return this.repertoryService.getChildSymptomsByParentId(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/symptoms")
    async createSymptom(@Body() symptom: SymptomBodyDTO): Promise<void> {
        await this.repertoryService.createSymptom(symptom);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/medications-by-symptoms")
    async getMedicationBySymptoms(
        @Body() arrOfSymptomsId: number[]
    ): Promise<MedicationDTO[]> {
        const arrayOfSymptomsMedications = [];
        const arrayOfMedications = [];
        for (const id of arrOfSymptomsId) {
            const symptomsMedications = await this.repertoryService.getMedicationsBySymptomId(
                id
            );
            arrayOfSymptomsMedications.push(
                symptomsMedications.map((m) => {
                    arrayOfMedications.push(m.medication);
                    return m.medication.medication_id;
                })
            );
        }
        const arrayOfMedicationsId = intersection(arrayOfSymptomsMedications);
        return arrayOfMedicationsId.map((id) =>
            arrayOfMedications.find((m) => m.medication_id === id)
        );
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
