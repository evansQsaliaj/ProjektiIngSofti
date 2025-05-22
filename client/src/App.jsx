import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./navigation/NavBar";
import useJobContext from "./hooks/use-job";
import Route from "./navigation/Route";
import ConfirmDelete from "./components/ConfirmDelete";
import Board from "./components/Board";

import "./App.css";

export default function App() {
  const { accounts, fetchAccounts, fetchBoard, fetchLists, fetchJobs } =
    useJobContext();

  const [authAcc, setAuthAcc] = useState([]);

  useEffect(() => {
    fetchAccounts();
    fetchBoard();
    fetchLists();
    fetchJobs();
  }, []);

  return (
    <>
      <Navbar authAcc={authAcc} />
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login setAuthAcc={setAuthAcc} />
      </Route>
      <Route path="/board">
        <Board accounts={accounts} />
      </Route>
    </>
  );
}
