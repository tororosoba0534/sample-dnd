import { DndProps } from "../DndItem";

export const onMouseUp = (
  e: MouseEvent,
  props: DndProps,
  handlingBtnElm: React.RefObject<HTMLButtonElement>
) => {
  if (handlingBtnElm.current) {
    const btn = handlingBtnElm.current;
    btn.style.cursor = "grab";
  }
  props.dndInfo.current.onMouseUp();
};
