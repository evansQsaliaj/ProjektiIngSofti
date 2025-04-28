import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./navigation/NavBar";
import useJobContext from "./hooks/use-job";
import Route from "./navigation/Route";
import HomePage from "./components/HomePage";
import ConfirmDelete from "./components/ConfirmDelete";
import JobList from "./components/JobList";
import AddList from "./components/AddList";
import AddJob from "./components/AddJob";

export default function App() {
  const { currentAccount, setCurrentAccount } = useJobContext();

  return (
    <div>
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
      <Route path="/">
        <HomePage />
      </Route>
      <Route path="/job-list">
        <JobList />
      </Route>
      <Route path="/add-list">
        <AddList />
      </Route>
    </div>
  );
}
