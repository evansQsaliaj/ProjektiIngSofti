import { useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import useJobContext from "../../hooks/use-job";
import EditList from "./EditList";
import AddJob from "../Job/AddJob";
import { useDroppable } from "@dnd-kit/core";
import Job from "../Job/Job";

export default function List({ list, accounts }) {
  const { deleteList, jobs } = useJobContext();

  const [editId, setEditId] = useState(-1);
  const [addJobListId, setAddJobListId] = useState(null);
  const [listModal, setListModal] = useState(false);

  const { setNodeRef } = useDroppable({
    id: list.id,
  });

  const handleDeleteList = (id) => {
    deleteList(id);
  };

  const handleEditList = (list) => {
    setEditId(list.id);
  };

  const handleAddJob = (id) => {
    setListModal((prevState) => !prevState);
    setAddJobListId(id);
  };

  const handleEditDone = () => {
    setEditId(-1);
  };

  const filteredJobs = jobs.filter((job) => job.listId === list.id);

  if (editId === list.id) {
    return (
      <div key={list.id}>
        <EditList list={list} onEditDone={handleEditDone} />
      </div>
    );
  } else {
    return (
      <div>
        <div className="bg-white text-black p-4 rounded-lg w-64 border border-gray-300 shadow-sm mx-5">
          <div
            ref={setNodeRef}
            className="flex justify-between items-center mb-4"
          >
            <h2 className="font-medium">{list.title}</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleAddJob(list.id)}
                className="text-gray-600 hover:text-gray-800"
              >
                <IoMdAdd style={{ fontSize: "20px", cursor: "pointer" }} />
              </button>
              <button
                type="button"
                onClick={() => handleEditList(list)}
                className="text-gray-600 hover:text-gray-800"
              >
                <MdOutlineEdit
                  style={{ fontSize: "20px", cursor: "pointer" }}
                />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteList(list.id)}
                className="text-red-600 hover:text-red-800"
              >
                <MdDeleteOutline
                  style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
                />
              </button>
            </div>
          </div>

          {addJobListId === list.id && listModal && (
            <AddJob
              listId={list.id}
              listModal={listModal}
              setListModal={setListModal}
            />
          )}

          <div className="space-y-2">
            {filteredJobs.map((job) => (
              <div key={job.id}>
                <Job job={job} accounts={accounts} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
