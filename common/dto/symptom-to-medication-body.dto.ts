import { IsNotEmpty } from "class-validator";

export class SymptomToMedicationBodyDTO {
    @IsNotEmpty()
    symptoms: number[];

    @IsNotEmpty()
    medication_id: number;
}
