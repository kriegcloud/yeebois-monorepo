import * as S from "@effect/schema/Schema";

/**
 * @since 0.1.0
 */
export const DateOrNull = S.NullOr(S.Date);

/**
 * @since 0.1.0
 */
export const DateOrUndefined = S.UndefinedOr(S.Date);

/**
 * @since 0.1.0
 */
export const DateOrNullish = S.NullishOr(S.Date);
