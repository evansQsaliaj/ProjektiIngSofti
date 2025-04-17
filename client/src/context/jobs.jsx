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

  const [accounts, setAccounts] = useState([]);
  const [login, setLogin] = useState(getInitialData);
  const [currentAccount, setCurrentAccount] = useState(getInitialAccount);
  const [isActive, setIsActive] = useState(false);

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

  const valueToShare = {
    navigation,
    currentPath,

    /////////////////
    accounts,
    setAccounts,
    fetchAccounts,
    createAccounts,
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
