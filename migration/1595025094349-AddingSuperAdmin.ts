import { MigrationInterface, QueryRunner } from 'typeorm';
import { userRole } from 'src/helpers/constants';

export class AddingSuperAdmin1595025094349 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user')
      .values({
        firstName: 'SuperAdministrator',
        lastName: 'Wave',
        userName: 'waveSuperAdmin',
        email: 'superadmin@wave.com',
        password: '8b959c05562f6b3f925b957b1984960049d35983',
        birthday: '1995-08-09 23:59:59',
        image: null,
        role: userRole.SUPER_ADMIN,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('No implementation needed');
  }
}
