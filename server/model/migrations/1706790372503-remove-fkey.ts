import { MigrationInterface, QueryRunner } from "typeorm";

export class Workspaces1706790372502 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    ALTER TABLE public.endpoint DROP CONSTRAINT "FK_e197baa1e08f5c75e7e34688040";
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
