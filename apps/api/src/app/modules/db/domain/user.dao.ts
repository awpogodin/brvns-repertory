import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {RoleDAO} from "./role.dao";

@Entity()
export class UserDAO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @ManyToOne(type => RoleDAO)
    @Column()
    role_id: string;
}
