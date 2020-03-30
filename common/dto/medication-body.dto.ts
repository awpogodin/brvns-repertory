import { Length } from "class-validator";

export class MedicationBodyDTO {
    @Length(2, 25)
    name: string;

    @Length(0, 50)
    description: string;
}
