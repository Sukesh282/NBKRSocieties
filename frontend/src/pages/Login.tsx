import { GlobeAltIcon } from "@heroicons/react/24/solid";
import Button from "../components/Button";

const Login = () => {
  return (
    <div className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-gray-100 px-4">
      <div className="flex w-sm flex-col items-center rounded-lg bg-white p-6 shadow-md">
        <h1>Login to your account</h1>
        <div className="socialmedia mt-5">
          <div className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 p-2 hover:bg-gray-100">
            <GlobeAltIcon className="text-primary h-5 w-5" />
            <span className="text-sm text-gray-700">Continue with Google</span>
          </div>
        </div>
        <div className="divider my-4 w-full border-t border-gray-300"></div>
        <form className="flex w-full flex-col gap-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="peer w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>
            <div className="relative">
              <input
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
          <Button variant="primary" className="py-3 text-sm font-medium">
            Log In
          </Button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-accent hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
