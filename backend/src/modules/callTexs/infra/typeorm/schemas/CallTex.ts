import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('call_texs')
class CallTex {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CallTex;
