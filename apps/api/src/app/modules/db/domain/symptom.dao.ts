import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { MedicationDAO } from "./medication";
import {CategoryDAO} from "./category.dao";

@Entity()
export class SymptomDAO {
    @PrimaryGeneratedColumn()
    symptom_id: number;

    @Column()
    name: string;

    @ManyToOne(type => SymptomDAO, parent => parent.symptom_id, { nullable: true, cascade: true, onDelete: "CASCADE" })
    parent_id: number;

    @ManyToOne(type => CategoryDAO, category => category.category_id, { cascade: true, onDelete: "CASCADE" })
    category_id: number;

    // @ManyToMany(type => MedicationDAO)
    // @JoinTable()
    // medications: MedicationDAO[];
}
