import { IsNotEmpty } from "class-validator";

export class SymptomToMedicationBodyDTO {
    @IsNotEmpty()
    symptom_id: number;

    @IsNotEmpty()
    medication_id: number;
}
