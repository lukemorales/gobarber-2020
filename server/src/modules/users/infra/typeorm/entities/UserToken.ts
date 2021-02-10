import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

import { USER_TOKENS_TABLE_NAME } from '@shared/infra/typeorm/migrations/1611885412106-CreateUserTokens';

@Entity(USER_TOKENS_TABLE_NAME)
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  user_id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
