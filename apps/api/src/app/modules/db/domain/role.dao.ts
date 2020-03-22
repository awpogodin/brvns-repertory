import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoleDAO {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column()
  name: string;

  @Column()
  slug: string;
}
