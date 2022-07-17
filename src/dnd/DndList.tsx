import { useRef, useState } from "react";
import { DndItem } from "./DndItem";
import { RawBlock, genRawBlocks, DnDInfo } from "./utils";

const BLOCKS_NUM = 10;

export const DndList = () => {
  const [rawBlocks, setRawBlocks] = useState<(RawBlock | null)[]>(
    genRawBlocks(BLOCKS_NUM)
  );
  const dndInfo = useRef<DnDInfo>(new DnDInfo());
  return (
    <div className=" w-full flex flex-col gap-5 p-10">
      {rawBlocks.map((rblock, i) => {
        if (!rblock) return;
        return (
          <DndItem
            key={rblock.key}
            rblock={rblock}
            setRawBlocks={setRawBlocks}
            index={i}
            dndInfo={dndInfo}
          />
        );
      })}
    </div>
  );
};
