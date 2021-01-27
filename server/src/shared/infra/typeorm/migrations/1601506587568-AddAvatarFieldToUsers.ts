import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { USERS_TABLE_NAME } from './1600391794490-CreateUsers';

export default class AddAvatarFieldToUsers1601506587568
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      USERS_TABLE_NAME,
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(USERS_TABLE_NAME, 'avatar');
  }
}
