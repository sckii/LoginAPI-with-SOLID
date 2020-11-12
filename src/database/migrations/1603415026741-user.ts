import {MigrationInterface, QueryRunner, Table, Timestamp} from "typeorm";

export class user1603415026741 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'currentTime',
          type: 'timestamp',
          default: "CURRENT_TIMESTAMP",
        },
        {
          name: 'username',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'email'
        },
        {
          name: 'password',
          type: 'varchar',
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }

}
