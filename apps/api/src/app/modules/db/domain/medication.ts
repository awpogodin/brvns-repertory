import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { SymptomDAO } from "./symptom.dao";

@Entity()
export class MedicationDAO {
    @PrimaryGeneratedColumn()
    medication_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(type => SymptomDAO, { nullable: true, cascade: true, onDelete: "CASCADE" })
    @JoinTable()
    symptoms: SymptomDAO[];
}
