import { Length } from "class-validator";

export class CategoryBodyDTO {
    @Length(2, 25)
    title: string;
}
