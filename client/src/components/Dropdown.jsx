import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";
import axios from "axios";
import useJobContext from "../hooks/use-job";

export default function Dropdown({ accounts, job }) {
  const { selectedMember, setSelectedMember } = useJobContext();

  const handleSelect = async (member) => {
    setSelectedMember(member);

    await axios.patch(`http://localhost:3006/accounts/${member.id}`, {
      jobId: job.id,
    });
  };

  return (
    <Listbox value={selectedMember} onChange={handleSelect}>
      <Label className="block text-sm font-medium text-gray-900">
        Select Member
      </Label>
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">
              {selectedMember ? selectedMember.name : "Select a member..."}
            </span>
          </span>
          <HiChevronUpDown
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {accounts.map((acc) => (
            <ListboxOption
              key={acc.id}
              value={acc}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {acc.name}
                </span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
