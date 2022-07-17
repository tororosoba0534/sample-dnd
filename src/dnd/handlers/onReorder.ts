import { dndConsts } from "../dndConsts";
import { DndProps } from "../DndItem";

export const onReorder = (elm: HTMLElement, props: DndProps) => {
  const dndInfo = props.dndInfo.current;
  const leadingBlock = dndInfo.leadingBlock;
  const gathereds = dndInfo.gathereds;
  const hovereds = dndInfo.hovereds;
  if (!leadingBlock) return;
  if (!gathereds) return;
  if (!hovereds) return;

  if (props.index !== leadingBlock.index) return;

  dndInfo.observing.reorderMux = false;
  setTimeout(() => {
    dndInfo.observing.reorderMux = true;
  }, dndConsts.MUX_REORDERING_MS);

  const { x: elmBeforeX, y: elmBeforeY } = leadingBlock.initElmPt;
  const { x: cursorBeforeX, y: cursorBeforeY } = leadingBlock.initMousePt;

  elm.style.transform = "";
  const { left: elmAfterX, top: elmAfterY } = elm.getBoundingClientRect();
  const cursorAfterX = cursorBeforeX + elmAfterX - elmBeforeX;
  const cursorAfterY = cursorBeforeY + elmAfterY - elmBeforeY;

  leadingBlock.initMousePt = { x: cursorAfterX, y: cursorAfterY };
  leadingBlock.initElmPt = { x: elmAfterX, y: elmAfterY };

  const DX = dndInfo.observing.currentCursorPt.x - cursorAfterX;
  const DY = dndInfo.observing.currentCursorPt.y - cursorAfterY;

  // elm.style.transform = `translate(${
  //   DX
  // }px,${DY}px)`;

  dndInfo.allBlocks.forEach((block, index) => {
    if (hovereds[block.key]) {
      const { xBefore, yBefore } = hovereds[block.key];
      const { left: xAfter, top: yAfter } = block.elm.getBoundingClientRect();
      block.elm.style.transition = "";
      block.elm.style.transform = `translate(${xBefore - xAfter}px,${
        yBefore - yAfter
      }px)`;
      requestAnimationFrame(() => {
        block.elm.style.transform = "";
        block.elm.style.transition = `all ${dndConsts.ANIMATION_MS}ms`;
      });
    } else if (
      index >= gathereds.movingTopIndex &&
      index <= gathereds.movingButtomIndex
    ) {
      block.elm.style.transform = `translate(${DX}px,${DY}px)`;
    }
  });
  return;
};
