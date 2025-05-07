import { useState, useEffect } from "react";
import useJobContext from "../hooks/use-job";
import List from "./List";
import AddList from "./AddList";

export default function Board({ accounts }) {
  const { lists } = useJobContext();
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

  const handleUserClick = (userId) => {
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
              onClick={() => handleUserClick(acc.id)}
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

      <button class="rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Add List
      </button>
      <div className="flex gap-4 overflow-x-auto">
        {lists.map((list) => (
          <div key={list.id} className="w-72">
            <List list={list} />
          </div>
        ))}
      </div>
      {showAddList && (
        <div className="w-72">
          <AddList showAddList={showAddList} setShowAddList={setShowAddList} />
        </div>
      )}
    </div>
  );
}
