import { useContext } from "react";
import JobsContext from "../context/jobs";

function useJobContext() {
  return useContext(JobsContext);
}

export default useJobContext;
