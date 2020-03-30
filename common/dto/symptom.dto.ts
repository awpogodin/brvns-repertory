import { CategoryDTO } from "./category.dto";

export interface SymptomDTO {
    symptom_id: number;
    name: string;
    parent_id?: number|SymptomDTO;
    category_id: number|CategoryDTO;
}
