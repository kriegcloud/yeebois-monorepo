import * as S from "@effect/schema/Schema";
import { pipe } from "effect/Function";
import type * as Types from "effect/Types";

/**
 * @since 0.1.0
 */
export const createDefaultEnum = <TEnum extends S.EnumsDefinition>(
  enums: TEnum,
) =>
  pipe((defaultValue: () => Types.NoInfer<TEnum[keyof TEnum]>) =>
    S.Enums(enums).pipe(
      S.propertySignature,
      S.withConstructorDefault(defaultValue),
    ),
  );


