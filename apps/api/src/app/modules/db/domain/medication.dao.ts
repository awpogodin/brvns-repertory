import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MedicationDAO {
    @PrimaryGeneratedColumn()
    medication_id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}
