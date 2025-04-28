import { createContext, useCallback, useState, useEffect } from "react";
import axios from "axios";

const JobsContext = createContext();

const getInitialData = () => {
  const login = localStorage.getItem("login");
  return login ? JSON.parse(login) : false;
};

const getInitialAccount = () => {
  const user = localStorage.getItem("login");
  return user ? JSON.parse(user) : [];
};

function Provider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const [login, setLogin] = useState(getInitialData);
  const [currentAccount, setCurrentAccount] = useState(getInitialAccount);
  const [isActive, setIsActive] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [lists, setLists] = useState([]);
  const [jobs, setJobs] = useState([]);

  /////NAVIGATION/////
  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handler);

    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []);

  const navigation = (to) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  };

  /////ACCOUNTS FUNCTIONS/////

  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(login));
    localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
  });

  const loginApp = () => {
    setLogin(true);
    setCurrentAccount(getInitialAccount);
  };

  const removeDataFromStorage = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("currentAccount");
    setLogin(false);
    setCurrentAccount([]);
  };

  const fetchAccounts = useCallback(async () => {
    const response = await axios.get("http://localhost:3006/accounts");
    setAccounts(response.data);
  }, []);

  const createAccounts = async (name, email, password, title) => {
    const response = await axios.post("http://localhost:3006/accounts", {
      name,
      email,
      password,
      title,
    });

    const updateAccounts = [...accounts, response.data];

    setAccounts(updateAccounts);
  };

  const deleteAccount = async (id) => {
    const response = await axios.delete(`http://localhost:3006/accounts/${id}`);

    const updateAccounts = [...accounts, response.data];

    setAccounts(updateAccounts);
  };

  /////LISTS FUNCTIONS/////

  const fetchLists = useCallback(async () => {
    const response = await axios.get("http://localhost:3006/lists");
    setLists(response.data);
  }, []);

  const createLists = async (title) => {
    const response = await axios.post("http://localhost:3006/lists", {
      title,
    });

    const updateLists = [...lists, response.data];

    setAccounts(updateLists);
  };

  const editList = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3006/lists/${id}`, {
      title: newTitle,
    });

    const updateLists = lists.map((list) => {
      if (list.id === id) {
        return { ...list, ...response.data };
      }

      return list;
    });

    setLists(updateLists);
  };

  const deleteList = async (id) => {
    await axios.delete(`http://localhost:3006/lists/${id}`);

    const jobsToDelete = jobs.filter((job) => job.listId === id);
    for (const job of jobsToDelete) {
      await axios.delete(`http://localhost:3006/jobs/${job.id}`);
    }

    const updateLists = lists.filter((list) => list.id !== id);
    setLists(updateLists);

    const updateJobs = jobs.filter((job) => job.listId !== id);
    setJobs(updateJobs);
  };

  /////JOBS FUNCTIONS/////

  const fetchJobs = useCallback(async () => {
    const response = await axios.get("http://localhost:3006/jobs");
    setJobs(response.data);
  }, []);

  const createJob = async (title, description, listId) => {
    const response = await axios.post("http://localhost:3006/jobs", {
      title,
      description,
      listId,
    });

    const updateJobs = [...jobs, response.data];

    setJobs(updateJobs);
  };

  const editJob = async (id, newTitle, newDescription) => {
    const response = await axios.put(`http://localhost:3006/jobs/${id}`, {
      title: newTitle,
      description: newDescription,
    });

    const updateJobs = jobs.map((job) => {
      if (job.id === id) {
        return { ...job, ...response.data };
      }

      return job;
    });

    setJobs(updateJobs);
  };

  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:3006/jobs/${id}`);

    const updateJobs = jobs.filter((job) => {
      return job.id !== id;
    });

    setJobs(updateJobs);
  };

  const valueToShare = {
    navigation,
    currentPath,

    /////////////////
    accounts,
    setAccounts,
    fetchAccounts,
    createAccounts,
    deleteAccount,

    /////////////////
    lists,
    setLists,
    fetchLists,
    createLists,
    editList,
    deleteList,

    /////////////////
    jobs,
    setJobs,
    fetchJobs,
    createJob,
    editJob,
    deleteJob,

    /////////////////
    login,
    setLogin,
    loginApp,
    currentAccount,
    setCurrentAccount,
    removeDataFromStorage,
    isActive,
    setIsActive,
  };

  return (
    <JobsContext.Provider value={valueToShare}>{children}</JobsContext.Provider>
  );
}

export { Provider };
export default JobsContext;
