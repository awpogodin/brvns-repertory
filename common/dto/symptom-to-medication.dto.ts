import { SymptomDTO } from "./symptom.dto";
import { MedicationDTO } from "./medication.dto";

export interface SymptomToMedicationDTO {
    id: number;
    symptom_id: number|SymptomDTO;
    medication_id: number|MedicationDTO;
    isCustom: boolean;
}
