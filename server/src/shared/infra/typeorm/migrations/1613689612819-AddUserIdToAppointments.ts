import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

import { APPOINTMENTS_TABLE_NAME } from './1600388380111-CreateAppointments';
import { USERS_TABLE_NAME } from './1600391794490-CreateUsers';

const USER_TABLE_FOREIGN_KEY_NAME = 'AppointmentCustomer';

export class AddUserIdToAppointments1613689612819
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      APPOINTMENTS_TABLE_NAME,
      new TableColumn({
        name: 'costumer_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      APPOINTMENTS_TABLE_NAME,
      new TableForeignKey({
        name: USER_TABLE_FOREIGN_KEY_NAME,
        columnNames: ['costumer_id'],
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
      USER_TABLE_FOREIGN_KEY_NAME,
    );

    await queryRunner.dropColumn(APPOINTMENTS_TABLE_NAME, 'costumer_id');
  }
}
