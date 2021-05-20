import { IsNull, MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1596234472629 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'login',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'registry',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
            comment: 'if the user is a student this will be his registry in the school'
          },
          {
            name: 'status',
            type: 'smallint',
            default: 1,
            comment: '1 - active / 0- inactive',
          },
          {
            name: 'type',
            type: 'smallint',
            default: 1,
            comment: '1 - admin / 2 - student / 3 - coordinator / 4 - employee',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
