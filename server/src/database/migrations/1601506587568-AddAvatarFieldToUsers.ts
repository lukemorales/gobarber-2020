import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { usersTableName } from './1600391794490-CreateUsers';

export default class AddAvatarFieldToUsers1601506587568
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      usersTableName,
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(usersTableName, 'avatar');
  }
}
