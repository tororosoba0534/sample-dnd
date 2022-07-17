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
    <div className="w-full h-full">
      <div className=" w-full flex flex-col items-center gap-2 p-10">
        <button
          className="mb-10 rounded-xl text-2xl bg-blue-600 px-2 hover:bg-blue-500 text-white"
          onClick={() => {
            setRawBlocks(genRawBlocks(BLOCKS_NUM));
          }}
        >
          RESET ALL ITEMS
        </button>
        {rawBlocks.map((rblock, i) => {
          if (!rblock) return;
          return (
            <DndItem
              key={rblock.key}
              rblock={rblock}
              setRawBlocks={setRawBlocks}
              index={i}
              dndInfo={dndInfo}
              isSelected={rblock.isSelected}
            />
          );
        })}
      </div>
    </div>
  );
};
