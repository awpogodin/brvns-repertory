import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToMany,
} from "typeorm";
import { CategoryDAO } from "./category.dao";
import { MedicationDAO } from "./medication";

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
    parent: Promise<SymptomDAO>;

    @ManyToOne(() => CategoryDAO, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "category_id" })
    category: Promise<CategoryDAO>;

    @ManyToMany(() => MedicationDAO, {
        nullable: true,
        cascade: true,
        onDelete: "CASCADE",
    })
    // @JoinTable()
    medications: Promise<MedicationDAO[]>;
}
