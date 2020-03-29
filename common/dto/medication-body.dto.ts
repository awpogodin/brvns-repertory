import { IsNotEmpty } from "class-validator";

export class MedicationBodyDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}
