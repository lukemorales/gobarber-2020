import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { idColumn, timestampColumns } from '../utils';

export const usersTable = 'users';

export class CreateUsers1600391794490 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: usersTable,
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          ...timestampColumns,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(usersTable);
  }
}
