import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "./role.enum";

@Entity()
export class UserDAO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: RoleEnum,
        default: RoleEnum.USER,
    })
    role: RoleEnum;
}
