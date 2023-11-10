import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699654552457 implements MigrationInterface {
    name = 'Default1699654552457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD "email" integer NOT NULL`);
    }

}
