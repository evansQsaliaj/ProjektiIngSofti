import { useState, useEffect } from "react";
import useJobContext from "../hooks/use-job";
import { MdDeleteOutline } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import JobDetails from "./JobDetails";
import { useDraggable } from "@dnd-kit/core";

export default function Job({ job, accounts }) {
  const { deleteJob } = useJobContext();

  const [jobDetails, setJobDetails] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: job.id,
  });

  const handleToggleJob = (e) => {
    setJobDetails(true);
  };

  const handleDeleteJob = (e, id) => {
    deleteJob(id);
  };

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px) `,
      }
    : undefined;

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-100 p-3 rounded-md shadow-sm border border-gray-200 flex justify-between items-center mb-4 cursor-pointer"
      >
        <p className="text-sm mb-2" {...listeners} {...attributes}>
          {job.title}
        </p>

        <div className="flex">
          <div
            onClick={handleToggleJob}
            className="text-gray-600 hover:text-gray-800 p-2"
          >
            <CiCircleInfo style={{ fontSize: "20px", cursor: "pointer" }} />
          </div>

          <div
            onClick={(e) => handleDeleteJob(e, job.id)}
            className="text-red-600 hover:text-red-800 p-2"
          >
            <MdDeleteOutline style={{ fontSize: "20px", cursor: "pointer" }} />
          </div>
        </div>
      </div>

      {jobDetails && (
        <JobDetails
          job={job}
          jobDetails={jobDetails}
          setJobDetails={setJobDetails}
          accounts={accounts}
        />
      )}
    </div>
  );
}
