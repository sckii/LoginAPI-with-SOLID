import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class logged1603837602173 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'logged',
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
          name: 'userId',
          type: 'integer'
        },
        {
          name: 'profileId',
          type: 'integer'
        },
        {
          name: 'token',
          type: 'varchar'
        }
      ]
    }))    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('logged')
  }

}
