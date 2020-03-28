import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoryDAO {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;
}
