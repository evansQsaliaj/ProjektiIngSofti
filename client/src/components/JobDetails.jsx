import { useState } from "react";
import useJobContext from "../hooks/use-job";
import Dropdown from "./Dropdown";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoMdClose } from "react-icons/io";

export default function JobDetails({
  job,
  jobDetails,
  setJobDetails,
  accounts,
}) {
  const { createJob, navigation } = useJobContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleJobCreate = (e) => {
    e.preventDefault();
    createJob(title, description, listId);
    setJobDetails(false);
    navigation("/board");
  };

  const handleCloseModal = () => {
    setJobDetails(false);
  };

  return (
    <Dialog open={jobDetails} onClose={setJobDetails} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <IoMdClose
              className="absolute top-8 left-11/12 cursor-pointer"
              onClick={handleCloseModal}
            />
            <div className="bg-white w-5xl p-10">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle className="font-semibold text-gray-900 text-lg">
                    {job.title}
                  </DialogTitle>

                  <div className="mt-10">
                    <p className="text-right w-full">{job.description}</p>
                  </div>

                  <div className="mt-10 z-50">
                    <Dropdown accounts={accounts} />
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
