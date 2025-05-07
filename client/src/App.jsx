import { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./navigation/NavBar";
import useJobContext from "./hooks/use-job";
import Route from "./navigation/Route";
import ConfirmDelete from "./components/ConfirmDelete";
import Board from "./components/Board";

import "./App.css";

export default function App() {
  const {
    accounts,
    fetchAccounts,
    fetchBoard,
    fetchLists,
    fetchJobs,
    currentAccount,
    setCurrentAccount,
  } = useJobContext();

  useEffect(() => {
    fetchAccounts();
    fetchBoard();
    fetchLists();
    fetchJobs();
  }, []);

  return (
    <>
      <Navbar currentAccount={currentAccount} />
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login setCurrentAccount={setCurrentAccount} />
      </Route>
      <Route path="/delete-account">
        <ConfirmDelete />
      </Route>
      <Route path="/board">
        <Board accounts={accounts} />
      </Route>
    </>
  );
}
