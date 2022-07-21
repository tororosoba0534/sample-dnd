import { DndList } from "./dnd/DndList";

function App() {
  return (
    <div className="mx-20 my-10">
      <div className="w-full h-20 lg:h-10 relative">
        <a
          href="https://github.com/tororosoba0534/sample-dnd"
          target="_blank"
          className="absolute right-5 top-5  rounded bg-gray-500 hover:bg-gray-400 text-white font-semibold flex items-center justify-center p-2  cursor-pointer"
        >
          View source code
        </a>
      </div>
      <DndList />
    </div>
  );
}

export default App;
