import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoleDAO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({default: false})
  is_admin: boolean;
}
