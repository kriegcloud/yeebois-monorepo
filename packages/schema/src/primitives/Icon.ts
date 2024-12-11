import * as S from "@effect/schema/Schema";
/**
 * @since 0.1.0
 */
export enum IconEnum {
  faArrowDownToBracket = "faArrowDownToBracket",
  faArrowDownToSquare = "faArrowDownToSquare",
  faArrowLeft = "faArrowLeft",
  faArrowRight = "faArrowRight",
  faCamera = "faCamera",
  faCancel = "faCancel",
  faCheck = "faCheck",
  faChevronRight = "faChevronRight",
  faImageLandscape = "faImageLandscape",
  faKeyboard = "faKeyboard",
  faLock = "faLock",
  faPencil = "faPencil",
  faPlus = "faPlus",
  faScannerTouchscreen = "faScannerTouchscreen",
  faSearch = "faSearch",
  faTrash = "faTrash",
}

/**
 * @since 0.1.0
 */
export const Icon = S.Enums(IconEnum).annotations({
  identifier: "IconTypeSchema",
});
export type Icon = S.Schema.Type<typeof Icon>;
