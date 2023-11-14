"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1699654552457 = void 0;
class Default1699654552457 {
    constructor() {
        this.name = 'Default1699654552457';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD "email" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD "email" integer NOT NULL`);
    }
}
exports.Default1699654552457 = Default1699654552457;
