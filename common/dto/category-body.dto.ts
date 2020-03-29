import { IsNotEmpty } from "class-validator";

export class CategoryBodyDTO {
    @IsNotEmpty()
    title: string;

    description: string;
}
