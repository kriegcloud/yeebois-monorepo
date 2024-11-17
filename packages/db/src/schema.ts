import { init } from "@paralleldrive/cuid2";
import {
  timestamp,
  text,
  primaryKey,
  integer,
  unique,
  boolean,
  json,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { serial, varchar } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { pgTable } from "./_table";
import * as S from "@effect/schema/Schema";
import { createInsertSchema } from "drizzle-zod";
import type { State } from "./effect";
const createId = init({
  length: 10,
});

export const createIdWithPrefix = (prefix: string) => () =>
  `${prefix}_${createId()}`;

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({
      columns: [vt.identifier, vt.token]
    }),
  }),
);

export const post = pgTable("post", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  content: varchar("content", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const project = pgTable("project", {
  id: text("id").$defaultFn(createIdWithPrefix("project")).primaryKey(),
  name: text("name").notNull(),
  site: text("site").unique(),
  slug: text("slug").notNull().unique(),
  personal: boolean("personal").notNull().default(false),
  stripeAccountId: text("stripe_account_id"),
});

export const apiKey = pgTable(
  "project_api_key",
  {
    id: text("id").$defaultFn(createIdWithPrefix("key")).primaryKey(),
    project_id: text("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    key: text("key").notNull(),
  },
  (t) => ({
    key: unique().on(t.project_id, t.key),
  }),
);

export const variable = pgTable(
  "project_variable",
  {
    id: text("id").$defaultFn(createIdWithPrefix("variable")).primaryKey(),
    project_id: text("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    key: text("key").notNull(),
    refreshToken: text("refresh_token"),
    value: text("value"),
    provider: text("provider"),
    system: boolean("is_system").notNull().default(false),
    // Add the default boolean field
    default: boolean("default").default(false).notNull(),
  },
  (t) => ({
    key: unique().on(t.project_id, t.key),
  }),
);

export const workflow = pgTable(
  "workflow",
  {
    id: text("id").$defaultFn(createIdWithPrefix("workflow")).primaryKey(),
    projectSlug: text("project_slug").notNull(),
    projectId: text("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    public: boolean("public").notNull().default(false),
    layout: json("layout"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    publishedAt: timestamp("published_at"),
    featured: boolean("featured").notNull().default(false),
  },
  (p) => {
    return {
      slug: unique().on(p.projectId, p.slug),
    };
  },
);

export const workflowVersion = pgTable(
  "workflow_version",
  {
    id: text("id").$defaultFn(createIdWithPrefix("version")).primaryKey(),
    workflowId: text("workflow_id")
      .notNull()
      .references(() => workflow.id, { onDelete: "cascade" }),
    projectId: text("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    contextId: text("context_id").references((): AnyPgColumn => context.id, {
      onDelete: "cascade",
    }),
    previousVersionId: text("previous_workflow_version_id"),
    version: integer("version").notNull().default(0),
    publishedAt: timestamp("published_at"),
    changeLog: text("change_log").default("Workin in progress"),
  },
  (workflowVersion) => {
    return {
      unique: unique().on(workflowVersion.workflowId, workflowVersion.version),
    };
  },
);



/**
 * This table is used for store `latest` data for the nodes in the workflow;
 */
export const context = pgTable("context", {
  id: text("id").$defaultFn(createIdWithPrefix("context")).primaryKey(),
  project_id: text("project_id")
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
  workflow_id: text("workflow_id")
    .notNull()
    .references(() => workflow.id, {
      onDelete: "cascade",
    }),
  workflow_version_id: text("workflow_version_id")
    .notNull()
    .references(() => workflowVersion.id, { onDelete: "set null" }),
  parent_id: text("parent_id").references((): AnyPgColumn => context.id, {
    onDelete: "cascade",
  }),
  previousContextId: text("previous_context_id"),
  type: text("type").notNull(),
  state: json("state").$type<S.Schema.Type<typeof State>>(),
});

export const workflowEdge = pgTable(
  "workflow_edge",
  {
    workflowId: text("workflow_id")
      .notNull()
      .references(() => workflow.id, {
        onDelete: "cascade",
      }),
    workflowVersionId: text("workflow_version_id")
      .notNull()
      .references(() => workflowVersion.id, {
        onDelete: "cascade",
      }),
    source: text("source")
      .notNull()
      .references(() => workflowNode.id, { onDelete: "cascade" }),
    sourceOutput: text("source_output").notNull(),
    target: text("target")
      .notNull()
      .references(() => workflowNode.id, { onDelete: "cascade" }),
    targetInput: text("target_input").notNull(),
  },
  (edge) => {
    return {
      pk: primaryKey({
        columns: [
          edge.source,
          edge.target,
          edge.sourceOutput,
          edge.targetInput,
        ],
      }),
    };
  },
);

export const selectWorkflowEdgeSchema = createInsertSchema(workflowEdge);

export const workflowEdgeRelations = relations(workflowEdge, ({ one }) => ({
  source: one(workflowNode, {
    fields: [workflowEdge.source],
    references: [workflowNode.id],
  }),
  target: one(workflowNode, {
    fields: [workflowEdge.target],
    references: [workflowNode.id],
  }),
  workflow: one(workflow, {
    fields: [workflowEdge.workflowId],
    references: [workflow.id],
  }),
  workflowVersion: one(workflowVersion, {
    fields: [workflowEdge.workflowVersionId],
    references: [workflowVersion.id],
  }),
}));
type Position = {
  x: number;
  y: number;
};

export const workflowNode = pgTable("workflow_node", {
  id: text("id").$defaultFn(createIdWithPrefix("node")).primaryKey(),
  workflowId: text("workflow_id")
    .notNull()
    .references(() => workflow.id, {
      onDelete: "cascade",
    }),
  workflowVersionId: text("workflow_version_id")
    .notNull()
    .references(() => workflowVersion.id, {
      onDelete: "cascade",
    }),
  contextId: text("context_id")
    .notNull()
    .references(() => context.id, {
      onDelete: "cascade",
    }),
  projectId: text("project_id")
    .notNull()
    .references(() => project.id, {
      onDelete: "cascade",
    }),
  position: json("position").$type<Position>().notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  label: text("label").notNull(),
  description: text("description"),
  color: text("color").notNull(),
  type: text("type").notNull(),
});

export const workflowExecution = pgTable("workflow_execution", {
  id: text("id").$defaultFn(createIdWithPrefix("exec")).primaryKey(),
  workflowId: text("workflow_id")
    .notNull()
    .references(() => workflow.id, {
      onDelete: "cascade",
    }),
  workflowVersionId: text("workflow_version_id")
    .notNull()
    .references(() => workflowVersion.id, {
      onDelete: "cascade",
    }),
  status: text("status")
    .$type<"active" | "done" | "error" | "stopped">()
    .default("active")
    .notNull(),
  state: json("state").$type<S.Schema.Type<typeof State>>(),
  entryContextId: text("entry_context_id"),
  currentContextId: text("current_context_id"),
  startedAt: timestamp("timestamp").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  duration: integer("duration"),
});

export const workflowExecutionRelations = relations(
  workflowExecution,
  ({ one, many }) => ({
    workflow: one(workflow, {
      fields: [workflowExecution.workflowId],
      references: [workflow.id],
    }),
    workflowVersion: one(workflowVersion, {
      fields: [workflowExecution.workflowVersionId],
      references: [workflowVersion.id],
    }),
    steps: many(workflowExecutionEvent),
    executionData: many(nodeExecutionData),
  }),
);

export const workflowExecutionEvent = pgTable("workflow_execution_event", {
  id: text("id").$defaultFn(createIdWithPrefix("event")).primaryKey(),
  workflowExecutionId: text("workflow_execution_id")
    .notNull()
    .references(() => workflowExecution.id, { onDelete: "cascade" }),
  run_id: text("run_id"),
  source_context_id: text("source_context_id").references(() => context.id),
  type: text("type").notNull(),
  status: text("status").notNull().default("queued"),
  event: json("event"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const workflowExecutionEventRelations = relations(
  workflowExecutionEvent,
  ({ one }) => ({
    execution: one(workflowExecution, {
      fields: [workflowExecutionEvent.workflowExecutionId],
      references: [workflowExecution.id],
    }),
    // sourceNodeExecutionData: one(nodeExecutionData, {
    //   fields: [workflowExecutionEvent.source_node_execution_data_id],
    //   references: [nodeExecutionData.id],
    // }),
    // targetNodeExecutionData: one(nodeExecutionData, {
    //   fields: [workflowExecutionEvent.target_node_execution_data_id],
    //   references: [nodeExecutionData.id],
    // }),
  }),
);

/**
 * This is used for storing the execution data in the workflow
 */
export const nodeExecutionData = pgTable("node_execution_data", {
  id: text("id").$defaultFn(createIdWithPrefix("call_")).primaryKey(),
  workflowExecutionId: text("workflow_execution_id")
    .notNull()
    .references(() => workflowExecution.id, { onDelete: "cascade" }),
  contextId: text("context_id")
    .notNull()
    .references(() => context.id, { onDelete: "cascade" }),
  workflowId: text("workflow_id")
    .notNull()
    .references(() => workflow.id, { onDelete: "cascade" }),
  workflowVersionId: text("workflow_version_id")
    .notNull()
    .references(() => workflowVersion.id, { onDelete: "cascade" }),
  projectId: text("project_id")
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  state: json("state").$type<S.Schema.Type<typeof State>>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  duration: integer("duration"),
});

export const nodeExecutionDataRelations = relations(
  nodeExecutionData,
  ({ one }) => ({
    context: one(context, {
      fields: [nodeExecutionData.contextId],
      references: [context.id],
    }),
    workflow: one(workflow, {
      fields: [nodeExecutionData.workflowId],
      references: [workflow.id],
    }),
    workflowVersion: one(workflowVersion, {
      fields: [nodeExecutionData.workflowVersionId],
      references: [workflowVersion.id],
    }),
    workflowExecution: one(workflowExecution, {
      fields: [nodeExecutionData.workflowExecutionId],
      references: [workflowExecution.id],
    }),
  }),
);

export default {
  users,
  accounts,
  sessions,
  verificationTokens,
  post,
  project,
  apiKey,
  variable,
  workflow,
  workflowVersion,
  context,
  workflowEdge,
  workflowEdgeRelations,
  workflowNode,
  workflowExecution,
  workflowExecutionRelations,
  workflowExecutionEvent,
  workflowExecutionEventRelations,
  nodeExecutionData,
  nodeExecutionDataRelations
}