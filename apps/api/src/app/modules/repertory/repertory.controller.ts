import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Request,
    Param,
    Query,
    HttpException,
    HttpStatus,
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
    @Post("/medications/bulkCreate")
    async bulkCreateMedications(
        @Body() medications: MedicationBodyDTO[]
    ): Promise<void> {
        for (const medication of medications) {
            await this.repertoryService.createMedication(medication);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get("/symptoms")
    async getSymptoms(@Query() query): Promise<SymptomDTO[]> {
        if (query.parent_id) {
            const parent = await this.repertoryService.getSymptomById(
                query.parent_id
            );
            if (!parent) {
                throw new HttpException(
                    "symptoms/parentDontExist",
                    HttpStatus.BAD_REQUEST
                );
            }
            const childs = await this.repertoryService.getChildSymptomsByParentId(
                parent.symptom_id
            );
            return childs.map((symptom) => ({
                ...symptom,
                name: `${parent.name}: ${symptom.name}`,
            }));
        }
        if (query.category_id) {
            const arrOfCategories = query.category_id.split(",");
            const result = [];
            for (const category_id of arrOfCategories) {
                const category = await this.repertoryService.getCategoryById(
                    category_id
                );
                if (!category) {
                    throw new HttpException(
                        "symptoms/categoryDontExist",
                        HttpStatus.BAD_REQUEST
                    );
                }
                const symptoms = await this.repertoryService.getParentSymptomsByCategoryId(
                    category.category_id
                );
                result.push(
                    ...symptoms.map((symptom) => ({
                        ...symptom,
                        name: `${category.title}: ${symptom.name}`,
                    }))
                );
            }
            return result;
        }
        return this.repertoryService.getSymptomsAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get("/symptoms/:id")
    getSymptomsById(@Param() { id }): Promise<SymptomDTO> {
        return this.repertoryService.getSymptomById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/symptoms")
    async createSymptom(@Body() symptom: SymptomBodyDTO): Promise<void> {
        await this.repertoryService.createSymptom(symptom);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/symptoms/bulkCreate")
    async bulkCreateSymptoms(@Body() body: any[]): Promise<void> {
        const bulkCreate = async (
            symptoms,
            parent_id: number = null
        ): Promise<void> => {
            if (parent_id) {
                const parent = await this.repertoryService.getSymptomById(
                    parent_id
                );
                if (!parent) {
                    throw new HttpException(
                        "symptoms/parentDontExist",
                        HttpStatus.BAD_REQUEST
                    );
                }
                for (const symptom of symptoms) {
                    const category = await this.repertoryService.getCategoryById(
                        symptom.category_id
                    );
                    if (!category) {
                        throw new HttpException(
                            "symptoms/categoryDontExist",
                            HttpStatus.BAD_REQUEST
                        );
                    }
                    const newSymptom = await this.repertoryService.createSymptom(
                        {
                            ...symptom,
                            parent_id: parent,
                            category_id: category.category_id,
                        }
                    );
                    if (symptom.childs) {
                        await bulkCreate(symptom.childs, newSymptom.symptom_id);
                    }
                }
            } else {
                for (const symptom of symptoms) {
                    const category = await this.repertoryService.getCategoryById(
                        symptom.category_id
                    );
                    if (!category) {
                        throw new HttpException(
                            "symptoms/categoryDontExist",
                            HttpStatus.BAD_REQUEST
                        );
                    }
                    const newSymptom = await this.repertoryService.createSymptom(
                        {
                            ...symptom,
                            category_id: category.category_id,
                        }
                    );
                    if (symptom.childs) {
                        await bulkCreate(symptom.childs, newSymptom.symptom_id);
                    }
                }
            }
        };
        await bulkCreate(body);
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
