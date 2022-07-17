import { dndConsts } from "../dndConsts";
import { DndProps } from "../DndItem";
import { Block } from "../utils";

export const onMouseMove = (e: MouseEvent, props: DndProps) => {
  const dndInfo = props.dndInfo.current;
  const leadingBlock = dndInfo.leadingBlock;
  if (!leadingBlock) return;
  const allBlocks = dndInfo.allBlocks;
  dndInfo.observing.currentCursorPt = {
    x: e.clientX,
    y: e.clientY,
  };

  const dx = e.clientX - leadingBlock.initMousePt.x;
  const dy = e.clientY - leadingBlock.initMousePt.y;

  if (!dndInfo.gathereds) {
    if (dy < dndConsts.GATHER_VAL && dy > -dndConsts.GATHER_VAL) {
      leadingBlock.elm.style.transform = `translate(${dx}px,${dy}px)`;
      return;
    } else {
      const stayBefore: Block[] = [];
      const moveBefore: Block[] = [];
      const moveAfter: Block[] = [];
      const stayAfter: Block[] = [];
      allBlocks.forEach((block, index) => {
        if (index < leadingBlock.index) {
          if (block.isSelected) {
            moveBefore.push(block);
          } else {
            stayBefore.push(block);
          }
        } else if (index === leadingBlock.index) {
          return;
        } else {
          if (block.isSelected) {
            moveAfter.push(block);
          } else {
            stayAfter.push(block);
          }
        }
      });

      const newAllBlocks = [
        ...stayBefore,
        ...moveBefore,
        leadingBlock,
        ...moveAfter,
        ...stayAfter,
      ];
      dndInfo.gathereds = {
        movingTopIndex: stayBefore.length,
        movingButtomIndex: newAllBlocks.length - stayAfter.length - 1,
        movingTopElm: moveBefore[0]?.elm || leadingBlock.elm,
        movingButtomElm:
          moveAfter[moveAfter.length - 1]?.elm || leadingBlock.elm,
      };
      dndInfo.allBlocks = newAllBlocks;
      props.setRawBlocks(newAllBlocks);
      return;
    }
  }

  allBlocks.forEach((block) => {
    if (block.isSelected) {
      block.elm.style.transform = `translate(${dx}px,${dy}px)`;
    }
  });
};
