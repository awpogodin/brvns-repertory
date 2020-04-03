import {
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
} from "typeorm";
import { SymptomDAO } from "./symptom.dao";
import { MedicationDAO } from "./medication.dao";

@Entity()
export class SymptomsMedicationsDAO {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SymptomDAO, (symptom) => symptom.symptom_id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    symptom: SymptomDAO;

    @ManyToOne(() => MedicationDAO, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    medication: MedicationDAO;

    @Column({ default: false })
    isCustom: boolean;
}
