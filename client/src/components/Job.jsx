import { useState } from "react";
import useJobContext from "../hooks/use-job";
import { MdDeleteOutline } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import JobDetails from "./JobDetails";

export default function Job({ job, accounts }) {
  const { deleteJob } = useJobContext();

  const [jobDetails, setJobDetails] = useState(false);

  const handleToggleJob = () => {
    setJobDetails((prevState) => !prevState);
  };

  const handleDeleteJob = (id) => {
    deleteJob(id);
  };

  return (
    <div>
      <div className="bg-gray-100 p-3 rounded-md shadow-sm border border-gray-200 flex justify-between items-center mb-4 cursor-pointer">
        <p className="text-sm mb-2">{job.title}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleToggleJob}
            className="text-gray-600 hover:text-gray-800"
          >
            <CiCircleInfo style={{ fontSize: "20px", cursor: "pointer" }} />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteJob(job.id)}
            className="text-red-600 hover:text-red-800"
          >
            <MdDeleteOutline style={{ fontSize: "20px", cursor: "pointer" }} />
          </button>
        </div>
      </div>

      {jobDetails && (
        <div>
          <JobDetails
            job={job}
            jobDetails={jobDetails}
            setJobDetails={setJobDetails}
            accounts={accounts}
          />
        </div>
      )}
    </div>
  );
}
