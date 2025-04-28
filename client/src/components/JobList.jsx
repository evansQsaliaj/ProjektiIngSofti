import { useEffect, useState } from "react";
import useJobContext from "../hooks/use-job";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import JobElement from "./JobElement";
import EditList from "./EditList";
import AddJob from "./AddJob";

export default function JobList() {
  const { fetchLists, deleteList, fetchJobs, navigation, lists, jobs } =
    useJobContext();

  const [editId, setEditId] = useState(-1);
  const [addJobListId, setAddJobListId] = useState(null);

  useEffect(() => {
    fetchLists();
    fetchJobs();
  }, []);

  const openNewListModal = (e) => {
    e.preventDefault();
    navigation("/add-list");
  };

  const handleDeleteList = (id) => {
    deleteList(id);
  };

  const handleEditList = (list) => {
    setEditId(list.id);
  };

  const handleAddJob = (id) => {
    setAddJobListId(id);
  };

  const renderLists = lists.map((list) => {
    if (editId === list.id) {
      return (
        <div key={list.id}>
          <EditList list={list} />
        </div>
      );
    } else {
      return (
        <div
          key={list.id}
          className="bg-white text-black p-4 rounded-lg w-64 border border-gray-300 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">{list.title}</h2>
            <div className="flex gap-2">
              <IoMdAdd
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => handleAddJob(list.id)}
              />
              <MdOutlineEdit
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => handleEditList(list)}
              />
              <MdDeleteOutline
                style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
                onClick={() => handleDeleteList(list.id)}
              />
            </div>
          </div>

          {addJobListId === list.id && <AddJob listId={list.id} />}

          <div className="space-y-2">
            {jobs
              .filter((job) => job.listId === list.id)
              .map((job) => (
                <JobElement
                  key={job.id}
                  title={job.title}
                  description={job.description}
                />
              ))}
          </div>
        </div>
      );
    }
  });

  return (
    <div className="ml-10">
      <button
        className="m-5 bg-indigo-600 rounded-xl py-2 px-4 text-white  cursor-pointer"
        onClick={openNewListModal}
      >
        Add List
      </button>
      <div className="flex gap-4">{renderLists}</div>
    </div>
  );
}
