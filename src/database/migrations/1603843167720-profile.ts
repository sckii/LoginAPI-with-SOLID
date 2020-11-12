import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class profile1603843167720 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'profiles',
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
          name: 'description',
          type: 'text'
        }
      ]
    }))    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profiles')
  }

}
