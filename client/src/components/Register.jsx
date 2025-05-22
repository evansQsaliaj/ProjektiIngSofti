import { useState, useEffect } from "react";
import useJobContext from "../hooks/use-job";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { createAccounts, fetchAccounts, navigation, setIsActive, setLogin } =
    useJobContext();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleSignup = (event) => {
    event.preventDefault();

    if (password.length >= 6) {
      createAccounts(name, email, password, title);
      navigation("/login");
    } else {
      setErrorMessage("Password needs to be at least 6 characters");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create your new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900 float-start"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="name"
                value={name}
                onChange={handleNameChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900 float-start"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900 float-start"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm/6 font-medium text-gray-900 float-start"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="title"
                value={title}
                onChange={handleTitleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSignup}
            >
              Register
            </button>
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already a member?{" "}
          <a
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Click here to Login
          </a>
        </p>
      </div>
    </div>
  );
}
