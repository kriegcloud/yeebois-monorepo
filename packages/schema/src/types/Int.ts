import * as S from "@effect/schema/Schema";

/**
 * @since 0.1.0
 */
export const PosInt = S.Number.pipe(S.int(), S.positive());

/**
 * @since 0.1.0
 */
export const PosIntOrNull = S.NullOr(PosInt);

/**
 * @since 0.1.0
 */
export const PosIntOrUndefined = S.UndefinedOr(PosInt);

/**
 * @since 0.1.0
 */
export const PosIntOrNullish = S.NullishOr(PosInt);

/**
 * @since 0.1.0
 * @description Create a number schema that has a minimum value
 * @param min
 */

/**
 * @since 0.1.0
 * @description Create a number schema that has a default value
 * @param v
 */
export const createDefaultPosInt = (v: number) =>
  PosInt.pipe(
    S.propertySignature,
    S.withConstructorDefault(() => v),
  );
