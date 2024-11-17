import * as S from "@effect/schema/Schema";
export const StateId = S.UUID.pipe(
  S.annotations({ identifier: "StateId" }),
).pipe(S.annotations({ identifier: "StateId" }));

enum StateStatusEnum {
  ACTIVE = "ACTIVE",
  ERROR = "ERROR",
  DONE = "DONE",
}

const ShapeOfContext = S.Struct({
  inputs: S.Any,
  inputSockets: S.Record({
    key: S.NonEmptyString,
    value: S.Any,
  }),
  settings: S.Any,
  outputs: S.Any,
  outputSockets: S.Record({
    key: S.NonEmptyString,
    value: S.Any,
  }),
}).pipe(
  S.annotations({
    identifier: "ShapeOfContext",
  }),
);
type ShapeOfContext = S.Schema.Type<typeof ShapeOfContext>;
const StateValue = S.Union(
  S.String,
  S.Record({
    key: S.String,
    value: S.Union(S.Record({ key: S.String, value: S.String }), S.String),
  }),
).pipe(
  S.annotations({
    identifier: "StateValue",
  }),
);

type StateValue = S.Schema.Type<typeof StateValue>;

const NonEmptyString = S.NonEmptyString;
type NonEmptyString = S.Schema.Type<typeof NonEmptyString>;

export class State extends S.Class<IStateEncoded>("State")({
  stateId: StateId,
  state: S.NonEmptyString,
  value: StateValue,
  status: S.Enums(StateStatusEnum),
  context: ShapeOfContext,
  children: S.Record({
    key: S.NonEmptyString,
    value: S.Struct({
      snapshot: S.suspend((): S.Schema<IStateEncoded> => State),
      src: S.NonEmptyString,
      syncSnapshot: S.Boolean,
    }),
  }),
}).pipe(
  S.annotations({
    identifier: "State",
  }),
) {}

export interface IStateEncoded {
  readonly stateId: NonEmptyString;
  readonly state: NonEmptyString;
  readonly value: StateValue;
  readonly status: StateStatusEnum;
  readonly context: ShapeOfContext;
  readonly children: Readonly<
    Record<
      NonEmptyString,
      {
        snapshot: IStateEncoded;
        src: NonEmptyString;
        syncSnapshot: S.Schema.Type<typeof S.Boolean>;
      }
    >
  >;
}
