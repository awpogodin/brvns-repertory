import { CategoryDTO } from "./category.dto";
import { MedicationDTO } from "./medication.dto";

export interface SymptomDTO {
    symptom_id: number;
    name: string;
    parent?: SymptomDTO;
    category: CategoryDTO;
    medications: MedicationDTO[];
}
