import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./navigation/NavBar";
import useJobContext from "./hooks/use-job";
import Route from "./navigation/Route";
import HomePage from "./components/HomePage";
import DeleteAccount from "./components/DeleteAccount";

function App() {
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
        <DeleteAccount />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </div>
  );
}

export default App;
