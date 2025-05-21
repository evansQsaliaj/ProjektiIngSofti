import { useEffect, useState } from "react";
import useJobContext from "../hooks/use-job";
import List from "./List/List";
import AddList from "./List/AddList";
import { DndContext } from "@dnd-kit/core";

export default function Board({ accounts }) {
  const { lists, handleDragEnd } = useJobContext();
  const [showAddList, setShowAddList] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [userColors, setUserColors] = useState({});

  useEffect(() => {
    const colors = {};
    accounts.forEach((acc) => {
      colors[acc.id] = colorGenerator();
    });
    setUserColors(colors);
  }, [accounts]);

  function colorGenerator() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  const handleAddList = () => {
    setShowAddList((prevState) => !prevState);
  };

  const handleUserName = (userId) => {
    setActiveUser(userId === activeUser ? null : userId);
  };

  return (
    <div className="flex h-screen">
      <div className="w-16 bg-gray-800 p-2 flex flex-col items-center">
        <div className="flex flex-col gap-4 mt-4">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium cursor-pointer relative"
              style={{ backgroundColor: userColors[acc.id] }}
              onClick={() => handleUserName(acc.id)}
            >
              {acc.name[0]}
              {activeUser === acc.id && (
                <div className="absolute left-12 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                  {acc.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full ml-20">
        <button
          className="m-10  rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          onClick={handleAddList}
        >
          Add List
        </button>

        {showAddList && (
          <div>
            <AddList
              showAddList={showAddList}
              setShowAddList={setShowAddList}
            />
          </div>
        )}

        <div className="grid grid-cols-4 gap-y-20 ">
          <DndContext onDragEnd={handleDragEnd}>
            {lists.map((list) => (
              <div key={list.id}>
                <List list={list} accounts={accounts} />
              </div>
            ))}
          </DndContext>
        </div>
      </div>
    </div>
  );
}
