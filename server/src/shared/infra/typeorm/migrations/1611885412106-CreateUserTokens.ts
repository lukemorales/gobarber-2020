import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { idColumn, timestampColumns } from '../utils';
import { USERS_TABLE_NAME } from './1600391794490-CreateUsers';

export const USER_TOKENS_TABLE_NAME = 'user_tokens';

const USER_TABLE_FOREIGN_KEY_NAME = 'UserToken';

export class CreateUserTokens1611885412106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: USER_TOKENS_TABLE_NAME,
        columns: [
          idColumn,
          { ...idColumn, name: 'token', isPrimary: false },
          {
            name: 'user_id',
            type: idColumn.type,
            generationStrategy: idColumn.generationStrategy,
          },
          ...timestampColumns,
        ],
        foreignKeys: [
          {
            name: USER_TABLE_FOREIGN_KEY_NAME,
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: USERS_TABLE_NAME,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(USER_TOKENS_TABLE_NAME);
  }
}
