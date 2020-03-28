import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MedicationDAO } from "./medication";

@Entity()
export class SymptomDAO {
    @PrimaryGeneratedColumn()
    symptom_id: number;

    @Column()
    name: string;

    @ManyToOne(type => SymptomDAO, parent => parent.childs, { nullable: true })
    parent: string;

    @OneToMany(type => SymptomDAO, child => child.parent, { nullable: true })
    childs: SymptomDAO[];

    @ManyToMany(type => MedicationDAO, medication => medication.symptoms)
    medications: MedicationDAO[];
}
