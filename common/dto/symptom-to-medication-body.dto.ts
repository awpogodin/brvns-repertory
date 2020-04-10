import { IsNotEmpty, Length } from "class-validator";

export class SymptomToMedicationBodyDTO {
    @IsNotEmpty()
    symptoms: number[];

    @Length(2, 25)
    medication_name: string;
}
