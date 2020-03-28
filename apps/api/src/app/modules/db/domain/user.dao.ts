import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {RoleDAO} from "./role.dao";

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

    @ManyToOne(type => RoleDAO)
    @Column()
    role_id: number;
}
