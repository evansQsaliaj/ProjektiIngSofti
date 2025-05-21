import Dropdown from "../Dropdown";
import { IoMdClose } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

export default function JobDetails({ job, setJobDetails, accounts }) {
  const handleCloseModal = (e) => {
    e.preventDefault();
    setJobDetails(false);
  };

  const assignedMembers = accounts.filter((member) => member.jobId === job.id);

  const handleRemoveMember = async (memberId) => {
    await axios.patch(`http://localhost:3006/accounts/${memberId}`, {
      jobId: null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-500/75"
        onClick={handleCloseModal}
      />

      <div className="bg-white w-full max-w-md relative rounded-lg shadow-lg z-50">
        <button className="absolute right-4 top-4" onClick={handleCloseModal}>
          <IoMdClose />
        </button>

        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
          <p className="mt-5">{job.description}</p>

          <div className="mt-5">
            <h4 className="text-sm font-medium text-gray-700">
              Assigned Members:
            </h4>
            {assignedMembers.length > 0 ? (
              <div className="mt-2 space-y-2">
                {assignedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm"
                  >
                    <span className="text-sm text-gray-800">{member.name}</span>
                    <div
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <MdDeleteOutline
                        style={{ fontSize: "20px", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                No members assigned to this job.
              </p>
            )}
          </div>

          <div className="mt-8 relative z-50">
            <Dropdown accounts={accounts} job={job} />
          </div>
        </div>
      </div>
    </div>
  );
}
