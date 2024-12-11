import * as S from "@effect/schema/Schema";

/**
 * @since 0.1.0
 */
export const NonEmptyStr = S.NonEmptyString;
export type NonEmptyStr = S.Schema.Type<typeof NonEmptyStr>;
/**
 * @since 0.1.0
 */
export const NonEmptyStrOrNull = S.NullOr(S.NonEmptyString).pipe(
  S.propertySignature,
  S.withConstructorDefault(() => null),
);
export type NonEmptyStrOrNull = S.Schema.Type<typeof NonEmptyStrOrNull>;

/**
 * @since 0.1.0
 */
export const NonEmptyStrOrUndefined = S.UndefinedOr(S.NonEmptyString).pipe(
  S.propertySignature,
  S.withConstructorDefault(() => undefined),
);
export type NonEmptyStrOrUndefined = S.Schema.Type<typeof NonEmptyStrOrUndefined>;

/**
 * @since 0.1.0
 */
export const NonEmptyStrOrNullish = S.NullishOr(S.NonEmptyString);
export type NonEmptyStrOrNullish = S.Schema.Type<typeof NonEmptyStrOrNullish>;
/**
 * @since 0.1.0
 * @description Create a string schema that has a minimum length
 * @param min
 */
export const createMinStr = (min: number) =>
  NonEmptyStr.pipe(S.filter((s) => s.length >= min));

/**
 * @since 0.1.0
 * @description Create a string schema that has a maximum length
 * @param max
 */
export const createMaxStr = (max: number) =>
  NonEmptyStr.pipe(S.filter((s) => s.length <= max));

/**
 * @since 0.1.0
 * @description Create a string schema that has a minimum and maximum length
 * @param min
 * @param max
 */
export const createMinMaxStr = (min: number, max: number) =>
  NonEmptyStr.pipe(S.filter((s) => s.length >= min && s.length <= max));

/**
 * @since 0.1.0
 */
export const createFileNameSchema = <TExtensions extends Array<string>>(
  extensions: TExtensions,
) =>
  S.NonEmptyString.pipe(
    S.pattern(/(?:\.([^.]+))?$/),
    S.filter((s) => extensions.includes(s) || "Invalid file extension"),
  );

/**
 * @since 0.1.0
 */
export const URL = S.NonEmptyString.pipe(S.pattern(/^https?:\/\//));
export type URL = S.Schema.Type<typeof URL>;
/**
 * @since 0.1.0
 */
export const Email = S.NonEmptyString.pipe(
  S.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  S.annotations({
    title: "Email",
    identifier: "Email",
    description: "The email address",
    jsonSchema: { type: "string" },
  }),
);
export type Email = S.Schema.Type<typeof Email>;

/**
 * @since 0.1.0
 */
export const UUID = S.UUID.pipe(
  S.propertySignature,
  S.withConstructorDefault(() => crypto.randomUUID()),
);
export type UUID = S.Schema.Type<typeof UUID>;

export const UUIDWithDefault = S.optional(S.UUID).pipe(
  S.withDefaults({
    constructor: () => crypto.randomUUID(),
    decoding: () => crypto.randomUUID(),
  }),
);
export type UUIDWithDefault = S.Schema.Type<typeof UUIDWithDefault>;