import { useAuth } from "@/contexts/useAuth";
import { Navigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit2Icon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Button from "@/components/Button";
import { useApi } from "@/hooks/api";
import { useError } from "../contexts/useError";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const { accessToken, user, isLoading } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [formValues, setFormValues] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const { callApi } = useApi();
  const { setError, setGood } = useError();

  const handleSendOtp = async () => {
    const response = await callApi("/api/users/sendmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ email: formValues.email }),
    });
    if (!response) {
      return;
    } else {
      setOtpSent(true);
      setGood(true);
      setError("OTP sent successfully to your email.");
    }
  };

  const verifyOtp = async () => {
    const response = await callApi("/api/users/verifyotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ otp, email: formValues.email }),
    });

    if (!response) {
      return;
    } else {
      setIsVerifying(false);
      setOtpSent(false);
      setOtp("");
      setGood(true);
      setError("Email verified successfully.");
    }
  };

  const cancelEmailVerification = () => {
    setIsVerifying(false);
    setFormValues((prevValues) => ({
      ...prevValues,
      email: user?.email || "",
    }));
  };

  const updateFormValue = (field: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  console.log("User in Profile:", user, "Loading:", isLoading);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">Profile</h1>
        <div className="space-y-4">
          <Skeleton className="bg-accent h-12 w-1/3" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="bg-accent h-12 w-2/3" />
        </div>
      </div>
    );
  }

  // Redirect if not authenticated after loading
  if (!user) {
    return <Navigate to="/auth?mode=login" />;
  }

  return (
    <div className="mt-5 flex flex-col items-center p-4">
      <h3 className="mb-4 text-2xl font-bold">Your profile</h3>
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-white p-6 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-full text-3xl font-semibold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <div className="flex gap-2">
              <p className="text-gray-600">@{user.username}</p>
              <Badge variant="outline">{user.role}</Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <h4 className="mb-2 font-semibold">Email:</h4>
            {isVerifying ? (
              <div className="flex flex-col gap-3">
                <div className="grid gap-2">
                  <Input
                    onChange={(e) => updateFormValue("email", e.target.value)}
                    value={formValues.email || user.email || ""}
                    id="email"
                    type="email"
                    required
                  />
                  <div className="flex w-full gap-3">
                    <Button
                      onClick={handleSendOtp}
                      variant="primary"
                      className="bg-accent-foreground flex h-9 items-center justify-center"
                      size="small"
                      width="full"
                    >
                      Send
                    </Button>
                    <Button
                      className="bg-destructive flex h-9 items-center justify-center"
                      variant="primary"
                      onClick={cancelEmailVerification}
                      size="small"
                      width="full"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
                {otpSent && (
                  <div className="grid gap-3">
                    <Input
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                      id="otp"
                      type="number"
                      required
                      placeholder="Enter OTP"
                    />
                    <Button
                      onClick={verifyOtp}
                      variant="primary"
                      className="bg-accent-foreground h-9"
                      size="small"
                    >
                      verify
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <p className="mb-0">{user.email || "Not provided"}</p>
                <Edit2Icon
                  className="ml-1 cursor-pointer text-gray-400 hover:text-gray-900"
                  height={15}
                  onClick={() => {
                    setIsVerifying(true);
                    updateFormValue("email", user.email || "");
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
