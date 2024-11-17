import { drizzle } from "drizzle-orm/node-postgres";

import { Pool } from "pg";
import schema from "./schema";

const connectionString = process.env.POSTGRES_URL;

const pool = new Pool({ connectionString: connectionString });

export const db = drizzle(pool, {
  schema,
  logger: false,
});
export * from "drizzle-orm";

export { alias } from "drizzle-orm/pg-core";

// export function authDB<T>(
//   session: Session,
//   cb: (sql: NodePgDatabase) => T | Promise<T>,
// ): Promise<T> {
//   // You can add a validation here for the accessToken - we rely on supabase for now
//   const jwtClaim = jose.decodeJwt(session.access_token);
//   const role = jwtClaim.role as string;
//
//   return db.transaction(async (tx) => {
//     // Set JWT to enable RLS. supabase adds the role and the userId (sub) to the jwt claims
//     await tx.execute(
//       sql`SELECT set_config('request.jwt.claims', '${sql.raw(
//         JSON.stringify(jwtClaim),
//       )}', TRUE)`,
//     );
//
//     // do not use postgres because it will bypass the RLS, set role to authenticated
//     await tx.execute(sql`set role '${sql.raw(role)}'`);
//
//     return cb(tx as any);
//   }) as Promise<T>;
// }