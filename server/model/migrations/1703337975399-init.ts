import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1703337975399 implements MigrationInterface {
  name = "Init1703337975399";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "response" DROP CONSTRAINT "FK_1c748a494957a52728cc1e10265"`,
    );
    await queryRunner.query(
      `ALTER TABLE "test" DROP CONSTRAINT "FK_28efcc0598e0494eaffca41307e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" DROP CONSTRAINT "FK_95fd1b40aa4b174f37a6b60248c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "endpoint" DROP CONSTRAINT "FK_566219de4f54b2202f8647c34d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mock" DROP CONSTRAINT "FK_cf5508816813ee9af33cbdc45d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "test" DROP CONSTRAINT "FK_974ef79391b20d3ed23a2326fb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_suite" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_suite" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_execution" DROP CONSTRAINT "FK_282d02b96a99f3f3dde6c03460b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "test" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "test" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" DROP CONSTRAINT "FK_5f075534a839daa55850022acd3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" DROP CONSTRAINT "FK_026b8f03ccaa4e5d3121cb5ba40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_execution" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_execution" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" DROP CONSTRAINT "FK_0799adb0ae11661f7afb4a75496"`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" DROP CONSTRAINT "FK_3a3d93f532a056b0d89d09cdd21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" DROP CONSTRAINT "FK_d7b3bac8b410b0c640b8f15b16f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "method" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "url" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "headers" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "body" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "sniffer_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "endpoint_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "endpoint" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "endpoint" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "mock" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "mock" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_workspaces" DROP CONSTRAINT "FK_c75d70032374c5edef8ca466bc5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" DROP CONSTRAINT "FK_6a0830f03e537b239a53269b27d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "key" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "status" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sniffer" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "sniffer" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_flow" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_flow" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_flow_edge" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_flow_edge" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_flow_node" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_flow_node" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" ADD CONSTRAINT "FK_0799adb0ae11661f7afb4a75496" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" ADD CONSTRAINT "FK_026b8f03ccaa4e5d3121cb5ba40" FOREIGN KEY ("test_execution_id") REFERENCES "test_execution"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "test" ADD CONSTRAINT "FK_974ef79391b20d3ed23a2326fb1" FOREIGN KEY ("test_suite_id") REFERENCES "test_suite"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_execution" ADD CONSTRAINT "FK_282d02b96a99f3f3dde6c03460b" FOREIGN KEY ("test_id") REFERENCES "test"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_d7b3bac8b410b0c640b8f15b16f" FOREIGN KEY ("endpoint_id") REFERENCES "endpoint"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_5f075534a839daa55850022acd3" FOREIGN KEY ("test_execution_id") REFERENCES "test_execution"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_3a3d93f532a056b0d89d09cdd21" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ADD CONSTRAINT "FK_6a0830f03e537b239a53269b27d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_workspaces" ADD CONSTRAINT "FK_c75d70032374c5edef8ca466bc5" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_workspaces" DROP CONSTRAINT "FK_c75d70032374c5edef8ca466bc5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" DROP CONSTRAINT "FK_6a0830f03e537b239a53269b27d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" DROP CONSTRAINT "FK_3a3d93f532a056b0d89d09cdd21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" DROP CONSTRAINT "FK_5f075534a839daa55850022acd3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" DROP CONSTRAINT "FK_d7b3bac8b410b0c640b8f15b16f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_execution" DROP CONSTRAINT "FK_282d02b96a99f3f3dde6c03460b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "test" DROP CONSTRAINT "FK_974ef79391b20d3ed23a2326fb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" DROP CONSTRAINT "FK_026b8f03ccaa4e5d3121cb5ba40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" DROP CONSTRAINT "FK_0799adb0ae11661f7afb4a75496"`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_flow_node" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_flow_node" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_flow_edge" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_flow_edge" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_flow" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_flow" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "sniffer" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "sniffer" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "status" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "key" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ADD CONSTRAINT "FK_6a0830f03e537b239a53269b27d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_workspaces" ADD CONSTRAINT "FK_c75d70032374c5edef8ca466bc5" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "mock" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "mock" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "endpoint" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "endpoint" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "endpoint_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "sniffer_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "body" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "headers" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "url" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "method" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_d7b3bac8b410b0c640b8f15b16f" FOREIGN KEY ("endpoint_id") REFERENCES "endpoint"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_3a3d93f532a056b0d89d09cdd21" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" ADD CONSTRAINT "FK_0799adb0ae11661f7afb4a75496" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_execution" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_execution" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" ADD CONSTRAINT "FK_026b8f03ccaa4e5d3121cb5ba40" FOREIGN KEY ("test_execution_id") REFERENCES "test_execution"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_5f075534a839daa55850022acd3" FOREIGN KEY ("test_execution_id") REFERENCES "test_execution"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "test" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "test" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_execution" ADD CONSTRAINT "FK_282d02b96a99f3f3dde6c03460b" FOREIGN KEY ("test_id") REFERENCES "test"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_suite" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_suite" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "test" ADD CONSTRAINT "FK_974ef79391b20d3ed23a2326fb1" FOREIGN KEY ("test_suite_id") REFERENCES "test_suite"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "mock" ADD CONSTRAINT "FK_cf5508816813ee9af33cbdc45d3" FOREIGN KEY ("sniffer_id") REFERENCES "sniffer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "endpoint" ADD CONSTRAINT "FK_566219de4f54b2202f8647c34d4" FOREIGN KEY ("sniffer_id") REFERENCES "sniffer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_95fd1b40aa4b174f37a6b60248c" FOREIGN KEY ("sniffer_id") REFERENCES "sniffer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "test" ADD CONSTRAINT "FK_28efcc0598e0494eaffca41307e" FOREIGN KEY ("sniffer_id") REFERENCES "sniffer"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "response" ADD CONSTRAINT "FK_1c748a494957a52728cc1e10265" FOREIGN KEY ("sniffer_id") REFERENCES "sniffer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
