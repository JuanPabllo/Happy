import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanages1602600219338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orphanages",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true, //sempre vai ser um numero positivo
            isPrimary: true, //chave identificadora
            isGenerated: true, // vai ser gerada automaticamente
            generationStrategy: "increment", // vai ser gerada automaticamante usando uma lógica incremental ex: 1, 2, 3, 4, 5...
          },
          {
            name: "name",
            type: "varchar", //string curto
          },
          {
            name: "latitude",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "longitude",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "about",
            type: "text",
          },
          {
            name: "instructions",
            type: "text",
          },
          {
            name: "opening_hours",
            type: "varchar",
          },
          {
            name: "open_on_weekends",
            type: "boolean",
            default: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orphanages");
  }
}
