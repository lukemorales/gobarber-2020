import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

import { APPOINTMENTS_TABLE_NAME } from './1600388380111-CreateAppointments';
import { USERS_TABLE_NAME } from './1600391794490-CreateUsers';

const APPOINTMENT_TABLE_FOREIGN_KEY_NAME = 'AppointmentProvider';

export default class AlterProviderFieldToProviderId1600814919838
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      APPOINTMENTS_TABLE_NAME,
      'provider',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      APPOINTMENTS_TABLE_NAME,
      new TableForeignKey({
        name: APPOINTMENT_TABLE_FOREIGN_KEY_NAME,
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: USERS_TABLE_NAME,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      APPOINTMENTS_TABLE_NAME,
      APPOINTMENT_TABLE_FOREIGN_KEY_NAME,
    );

    await queryRunner.changeColumn(
      APPOINTMENTS_TABLE_NAME,
      'provider_id',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
