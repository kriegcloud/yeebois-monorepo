import * as S from "@effect/schema/Schema";

/**
 * @since 0.1.0
 */
export const BoolOrNull = S.NullOr(S.Boolean);
export type BoolOrNull = S.Schema.Type<typeof BoolOrNull>;
/**
 * @since 0.1.0
 */
export const BoolOrUndefined = S.UndefinedOr(S.Boolean);
export type BoolOrUndefined = S.Schema.Type<typeof BoolOrUndefined>;
/**
 * @since 0.1.0
 */
export const BoolOrNullish = S.NullishOr(S.Boolean);
export type BoolOrNullish = S.Schema.Type<typeof BoolOrNullish>;


/**
 * @since 0.1.0
 * @description Create a boolean with a default value
 * @param v
 */
export const createDefaultBool = (v: boolean) =>
  S.Boolean.pipe(
    S.annotations({ default: v }),
    S.propertySignature,
    S.withConstructorDefault(() => v),
  );
