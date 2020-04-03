import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToMany,
} from "typeorm";
import { CategoryDAO } from "./category.dao";
import { MedicationDAO } from "./medication.dao";

@Entity()
export class SymptomDAO {
    @PrimaryGeneratedColumn()
    symptom_id: number;

    @Column()
    name: string;

    @ManyToOne(() => SymptomDAO, {
        nullable: true,
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "parent_id" })
    parent: SymptomDAO;

    @ManyToOne(() => CategoryDAO, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "category_id" })
    category: CategoryDAO;

    @ManyToMany(() => MedicationDAO, {
        nullable: true,
        cascade: true,
        onDelete: "CASCADE",
    })
    // @JoinTable()
    medications: MedicationDAO[];
}
