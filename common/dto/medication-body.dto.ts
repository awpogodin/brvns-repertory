import { Length } from "class-validator";

export class MedicationBodyDTO {
    @Length(2, 25)
    name: string;

    @Length(2, 50)
    description: string;
}
