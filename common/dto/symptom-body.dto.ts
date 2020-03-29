import { IsNotEmpty } from "class-validator";

export class SymptomBodyDTO {
    @IsNotEmpty()
    name: string;

    parent_id: number;

    @IsNotEmpty()
    category_id: number;
}
