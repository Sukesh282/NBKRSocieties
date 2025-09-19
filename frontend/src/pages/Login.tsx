import { GlobeAltIcon } from "@heroicons/react/24/solid";
// import Button from "../components/Button";
import { Button } from "@/components/ui/button";

import { PageTitle } from "../components/PageTitle";
import { useEffect, useState } from "react";
import { BASE_URL } from "../hooks/env";
import { useNavigate } from "react-router-dom";
import { useError } from "../contexts/useError";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router-dom";

const Login = () => {
  const { setError, setGood } = useError();
  const [searchParams, _setSearchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") === "login");

  useEffect(() => {
    setIsLogin(searchParams.get("mode") === "login");
  }, [searchParams]);

  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    password: "",
  });

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
        credentials: "include",
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
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button onClick={toggleMenu} variant="link">
                {isLogin ? "Sign Up" : "Sign In"}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div
                  className={`grid gap-2 transition-all duration-300 ease-in-out ${isLogin ? "pointer-events-none max-h-0 opacity-0" : "max-h-20 opacity-100"}`}
                >
                  <Label htmlFor="name">Name</Label>
                  <Input
                    value={formValues.name}
                    onChange={(e) => updateFormValue("name", e.target.value)}
                    id="name"
                    type="text"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    onChange={(e) =>
                      updateFormValue("username", e.target.value)
                    }
                    value={formValues.username}
                    id="username"
                    type="text"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {isLogin && (
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    )}
                  </div>

                  <Input
                    onChange={(e) =>
                      updateFormValue("password", e.target.value)
                    }
                    value={formValues.password}
                    id="password"
                    type="password"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button onClick={handleSubmit} type="submit" className="w-full">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
            <Button variant="outline" className="w-full">
              <GlobeAltIcon />
              Continue with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;
