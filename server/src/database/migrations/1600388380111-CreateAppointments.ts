import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { idColumn, timestampColumns } from '../utils';

export const APPOINTMENTS_TABLE_NAME = 'appointments';

export default class CreateAppointments1600388380111
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: APPOINTMENTS_TABLE_NAME,
        columns: [
          idColumn,
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          ...timestampColumns,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(APPOINTMENTS_TABLE_NAME);
  }
}
