import * as S from "@effect/schema/Schema";


/**
 * @since 0.1.0
 */
export const PosNum = S.Number.pipe(S.positive());

/**
 * @since 0.1.0
 */
export const PosNumOrNull = S.NullOr(PosNum);

/**
 * @since 0.1.0
 */
export const PosNumOrUndefined = S.UndefinedOr(PosNum);

/**
 * @since 0.1.0
 */
export const PosNumOrNullish = S.NullishOr(PosNum);


export const createMinNum = (min: number) =>
  S.Number.pipe(S.filter((n) => n >= min));

/**
 * @since 0.1.0
 * @description Create a number schema that has a maximum value
 * @param max
 */
export const createMaxNum = (max: number) =>
  S.Number.pipe(S.filter((n) => n <= max));

/**
 * @since 0.1.0
 * @description Create a number schema that has a minimum and maximum value
 * @param min
 * @param max
 */
export const createMinMaxNum = (min: number, max: number) =>
  S.Number.pipe(S.filter((n) => n >= min && n <= max));

