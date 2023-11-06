import {
  Column,
  DataSource,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
} from "typeorm";
import { useLog } from "../../lib/log";
import { InterceptedResponse } from "../response/response.model";

const log = useLog({
  dirname: __dirname,
  filename: __filename,
});

@Entity({ name: "invocation" })
export class Invocation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "sniffer_id" })
  snifferId: string;

  @Column({ name: "request_id" })
  requestId: string;

  @Column()
  url: string;

  @Column()
  method: string;

  @Column({ type: "varchar" })
  body: Record<string, any>;

  @Column({ type: "varchar" })
  headers: Record<string, any>;

  @OneToMany("InterceptedResponse", "invocation")
  @JoinColumn({ name: "id" })
  response: InterceptedResponse[];
}

export class InvocationRepository {
  repository: Repository<Invocation>;

  constructor(private readonly appDataSource: DataSource) {
    this.repository = appDataSource.manager.getRepository(Invocation);
  }
}
