import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1686658776602 implements MigrationInterface {
    name = 'Initial1686658776602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "middleName" varchar, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "gender" varchar CHECK( "gender" IN ('M','F','O') ) NOT NULL, "phone" integer NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
