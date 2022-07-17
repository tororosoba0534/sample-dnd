import { useRef, useState } from "react";
import { DragHandeSvg } from "../DragHandleSvg";
import { onMouseDown } from "./handlers/onMouseDown";
import { onMouseMove } from "./handlers/onMouseMove";
import { onMouseUp } from "./handlers/onMouseUp";
import { onReorder } from "./handlers/onReorder";
import { Block, DnDInfo, RawBlock } from "./utils";

export type DndProps = {
  rblock: RawBlock;
  setRawBlocks: React.Dispatch<React.SetStateAction<(RawBlock | null)[]>>;
  index: number;
  isSelected: boolean;
  dndInfo: React.MutableRefObject<DnDInfo>;
};

export const DndItem = (props: DndProps) => {
  const [isSelectedInner, setIsSelectedInner] = useState(props.isSelected);
  const handlingBtnElm = useRef<HTMLButtonElement>(null);
  const callbackRef = (elm: HTMLElement | null) => {
    if (!elm) {
      return;
    }

    const leadingBlock = props.dndInfo.current.leadingBlock;
    if (!leadingBlock) {
      props.dndInfo.current.allBlocks[props.index] = new Block(
        {
          key: props.rblock.key,
          value: props.rblock.value,
          isSelected: isSelectedInner,
        },
        elm
      );
      return;
    }
    onReorder(elm, props);
  };

  const onMouseDownWrapper = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onMouseDown(e, props, handlingBtnElm);
    window.addEventListener("mousemove", onMouseMoveWrapper);
    window.addEventListener("mouseup", onMouseUpWrapper);
  };

  const onMouseMoveWrapper = (e: MouseEvent) => {
    onMouseMove(e, props);
  };
  const onMouseUpWrapper = (e: MouseEvent) => {
    onMouseUp(e, props, handlingBtnElm);
    window.removeEventListener("mousemove", onMouseMoveWrapper);
    window.removeEventListener("mouseup", onMouseUpWrapper);
  };

  return (
    <div
      className="w-52 h-10 p-2 flex items-center gap-3 text-gray-800"
      style={{
        backgroundColor: isSelectedInner ? "red" : "#bef264",
        zIndex: isSelectedInner ? 10 : 0,
      }}
      key={props.rblock.key}
      ref={callbackRef}
    >
      <button
        className="h-full w-24 text-center bg-lime-100 hover:bg-lime-50 rounded-lg px-2 text-gray-800"
        onClick={(e) => {
          e.stopPropagation();
          props.dndInfo.current.allBlocks[props.index]?.toggleSelect();
          setIsSelectedInner((prev) => !prev);
        }}
      >
        {isSelectedInner ? "DESELECT" : "SELECT"}
      </button>
      {props.rblock.value}
      <button
        ref={handlingBtnElm}
        className="h-full bg-lime-100 hover:bg-lime-50 rounded-lg px-2"
        onMouseDown={onMouseDownWrapper}
        style={{ cursor: "grab", display: isSelectedInner ? "block" : "none" }}
      >
        <div className="w-4 h-7">
          <DragHandeSvg />
        </div>
      </button>
    </div>
  );
};
