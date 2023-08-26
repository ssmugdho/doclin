import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Todo } from "./Todo";
import { Project } from "./Project";
import { Thread } from "./Thread";
import { Reply } from "./Reply";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  name: string;

  @Column("text", { unique: true })
  githubId: string;

  @OneToMany(() => Todo, (t) => t.creator)
  todos: Promise<Todo[]>;

  @OneToMany(() => Project, (t) => t.userId)
  projects: Promise<Project[]>;

  @OneToMany(() => Thread, (t) => t.userId)
  threads: Promise<Thread[]>;

  @OneToMany(() => Reply, (t) => t.userId)
  replies: Promise<Reply[]>;
}
