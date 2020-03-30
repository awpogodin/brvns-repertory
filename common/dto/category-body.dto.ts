import { Length } from "class-validator";

export class CategoryBodyDTO {
    @Length(3, 25)
    title: string;
}
