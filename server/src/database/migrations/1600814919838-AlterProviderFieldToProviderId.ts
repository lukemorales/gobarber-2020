import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { appointmentsTableName } from './1600388380111-CreateAppointments';
import { usersTableName } from './1600391794490-CreateUsers';

const appointmentTableForeignKeyName = 'AppointmentProvider';

export class AlterProviderFieldToProviderId1600814919838
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      appointmentsTableName,
      'provider',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      appointmentsTableName,
      new TableForeignKey({
        name: appointmentTableForeignKeyName,
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: usersTableName,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      appointmentsTableName,
      appointmentTableForeignKeyName,
    );

    await queryRunner.changeColumn(
      appointmentsTableName,
      'provider_id',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
