import { SymptomDTO } from "./symptom.dto";

export interface MedicationDTO {
    medication_id: number;
    name: string;
    description: string;
    symptoms: SymptomDTO[] | any[];
}
