import {
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
} from "typeorm";
import { SymptomDAO } from "./symptom.dao";
import { MedicationDAO } from "./medication";

@Entity()
export class SymptomsMedicationsDAO {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SymptomDAO, (symptom) => symptom.symptom_id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    symptom_id: number;

    @ManyToOne(() => MedicationDAO, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    medication_id: number;

    @Column({ default: false })
    isCustom: boolean;
}
