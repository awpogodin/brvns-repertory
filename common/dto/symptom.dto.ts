import { CategoryDTO } from "./category.dto";

export interface SymptomDTO {
    symptom_id: number;
    name: string;
    parent?: SymptomDTO;
    category: CategoryDTO;
}
