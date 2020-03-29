import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { SymptomDAO } from './symptom.dao';
import {MedicationDAO} from "./medication";
import {UserDAO} from "./user.dao";

@Entity()
export class SymptomsMedicationsDAO {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => SymptomDAO, symptom => symptom.symptom_id, { cascade: true, onDelete: "CASCADE" })
    symptom_id: number;

    @ManyToOne(type => MedicationDAO, medication => medication.medication_id, { cascade: true, onDelete: "CASCADE" })
    medication_id: number;

    @ManyToOne(type => UserDAO, user => user.id, { nullable: true, cascade: true, onDelete: "SET NULL" })
    user_id: number;
}
