import {IsNotEmpty, Length} from "class-validator";

export class SymptomBodyDTO {
    @Length(2, 25)
    name: string;

    parent_id: number;

    @IsNotEmpty()
    category_id: number;
}
