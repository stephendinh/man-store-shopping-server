import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateQuestionTable1685443870776 implements MigrationInterface {
  name = 'UpdateQuestionTable1685443870776';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`variation_category\` DROP FOREIGN KEY \`FK_2254b0797e588de3df8b6a7c02e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`variation_category\` DROP FOREIGN KEY \`FK_f34f55e28e318adcf7f8dc582c1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_2254b0797e588de3df8b6a7c02\` ON \`variation_category\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f34f55e28e318adcf7f8dc582c\` ON \`variation_category\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`question\` CHANGE \`text\` \`text111\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`text111\``);
    await queryRunner.query(
      `ALTER TABLE \`question\` ADD \`text111\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_2254b0797e588de3df8b6a7c02\` ON \`variation_category\` (\`variation_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_f34f55e28e318adcf7f8dc582c\` ON \`variation_category\` (\`category_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`variation_category\` ADD CONSTRAINT \`FK_f34f55e28e318adcf7f8dc582c1\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`variation_category\` ADD CONSTRAINT \`FK_2254b0797e588de3df8b6a7c02e\` FOREIGN KEY (\`variation_id\`) REFERENCES \`variation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`variation_category\` DROP FOREIGN KEY \`FK_2254b0797e588de3df8b6a7c02e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`variation_category\` DROP FOREIGN KEY \`FK_f34f55e28e318adcf7f8dc582c1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f34f55e28e318adcf7f8dc582c\` ON \`variation_category\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_2254b0797e588de3df8b6a7c02\` ON \`variation_category\``,
    );
    await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`text111\``);
    await queryRunner.query(
      `ALTER TABLE \`question\` ADD \`text111\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`question\` CHANGE \`text111\` \`text\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_f34f55e28e318adcf7f8dc582c\` ON \`variation_category\` (\`category_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_2254b0797e588de3df8b6a7c02\` ON \`variation_category\` (\`variation_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`variation_category\` ADD CONSTRAINT \`FK_f34f55e28e318adcf7f8dc582c1\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`variation_category\` ADD CONSTRAINT \`FK_2254b0797e588de3df8b6a7c02e\` FOREIGN KEY (\`variation_id\`) REFERENCES \`variation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
