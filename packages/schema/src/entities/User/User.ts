import * as S from "@effect/schema/Schema";
import { Str, Bool } from "../../types";
/**
 * @since 0.1.0
 */
export const UserTypeId: unique symbol = Symbol.for(
  "@dank/schema/entities/UserTypeId",
);

/**
 * @since 0.1.0
 */
export type UserTypeId = typeof UserTypeId;

/**
 * @since 0.1.0
 */
export const UserId = Str.NonEmptyStr.pipe(S.brand(UserTypeId));

/**
 * @since 0.1.0
 */
export type UserId = S.Schema.Type<typeof UserId>;

/**
 * @since 0.1.0
 */
export const UserDefinition = S.Struct({
  id: UserId,
  firstName: Str.NonEmptyStr,
  lastName: Str.NonEmptyStr,
  email: Str.Email,
  emailVerified: S.Boolean,
  image: Str.URL,
}).annotations({
  identifier: "UserSchema",
});

/**
 * @since 0.1.0
 */
export type UserDefinition = S.Schema.Type<typeof UserDefinition>;

/**
 * @since 0.1.0
 */
export class User extends S.Class<UserDefinition>("User")(UserDefinition) {
  /**
   * @since 0.1.0
   */
  // static create = (props: S.Schem<UserDefinition>) => new User(props);
}

