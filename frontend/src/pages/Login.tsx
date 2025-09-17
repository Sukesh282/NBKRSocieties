import { GlobeAltIcon } from "@heroicons/react/24/solid";
import Button from "../components/Button";
import { PageTitle } from "../components/PageTitle";
import { useState, useEffect } from "react";
import { BASE_URL } from "../hooks/env";
import { useNavigate } from "react-router-dom";
import { useError } from "../contexts/useError";

const Login = () => {
  const { setError, setGood } = useError();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      `${BASE_URL}/api/users/${isLogin ? "login" : "register"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      },
    );

    if (response.ok) {
      const mes = await response.json();
      setGood(true);
      setError(mes.message);
      if (isLogin) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } else {
      const err = await response.json();
      setGood(false);
      setError(err.message || "Something went wrong");
    }
  };

  const updateFormValue = (field: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const toggleMenu = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <PageTitle title="Login" />
      <div className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-gray-100 px-4">
        <div
          className={`flex min-h-fit w-sm flex-col items-center rounded-lg bg-white p-6 shadow-md transition-all duration-300 ease-linear ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
        >
          {isLogin ? (
            <h3>Login to your account</h3>
          ) : (
            <h3>Sign up to create an account</h3>
          )}

          <div className="socialmedia mt-5">
            <div className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 p-2 hover:bg-gray-100">
              <GlobeAltIcon className="text-primary h-5 w-5" />
              <span className="text-sm text-gray-700">
                Continue with Google
              </span>
            </div>
          </div>
          <div className="divider my-4 w-full border-t border-gray-300"></div>
          <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div
                className={`overflow-hidden transition-all duration-300 ease-linear ${
                  !isLogin
                    ? "max-h-20 translate-y-0 transform opacity-100"
                    : "max-h-0 -translate-y-2 transform opacity-0"
                }`}
              >
                <div className="relative pb-[0.3px]">
                  <input
                    onChange={(e) => updateFormValue("name", e.target.value)}
                    value={formValues.name}
                    type="text"
                    placeholder="Full Name"
                    className="peer w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>
              </div>
              <div className="relative">
                <input
                  onChange={(e) => updateFormValue("username", e.target.value)}
                  value={formValues.username}
                  type="username"
                  placeholder="Username"
                  className="peer w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
              <div className="relative">
                <input
                  onChange={(e) => updateFormValue("password", e.target.value)}
                  value={formValues.password}
                  type="password"
                  placeholder="Password"
                  className="peer w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>
              <a
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="py-3 text-sm font-medium transition-all duration-200"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleMenu} className="cursor-pointer underline">
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
