import Background from "../../assets/login2.png";
import Victory from "../../assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/lib/constants";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };
  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same.");
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    try {
      if (validateLogin()) {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          if (response.data.user.profileSetup) navigate("/chat");
          else navigate("/profile");
        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    try {
      if (validateSignup()) {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        if (response.status === 201) {
          setUserInfo(response.data.user);
          navigate("/profile");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div className="w-full max-w-6xl bg-white bg-opacity-60 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl grid xl:grid-cols-2 overflow-hidden">
      <div className="flex flex-col gap-8 items-center justify-center p-10 xl:p-14">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-4xl font-extrabold text-gray-900 lg:text-5xl">Welcome</h1>
            <img src={Victory} alt="Victory Emoji" className="h-20 ml-3 lg:h-24" />
          </div>
          <p className="text-lg text-gray-700 font-medium">Fill in the details to get started with the best chat app!</p>
        </div>
        <div className="w-full">
          <Tabs className="w-full">
            <TabsList className="flex justify-between bg-gray-100 rounded-full p-2">
              <TabsTrigger value="login" className="w-1/2 text-center py-3 rounded-full text-gray-800 font-semibold transition-all duration-300 hover:bg-white hover:shadow-md data-[state=active]:bg-white data-[state=active]:shadow-md">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="w-1/2 text-center py-3 rounded-full text-gray-800 font-semibold transition-all duration-300 hover:bg-white hover:shadow-md data-[state=active]:bg-white data-[state=active]:shadow-md">
                Signup
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-10">
              <Input placeholder="Email" type="email" className="w-full rounded-full p-4 bg-white bg-opacity-80 border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 transition-all duration-300" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="Password" type="password" className="w-full rounded-full p-4 bg-white bg-opacity-80 border border-gray-300 shadow-sm mt-6 focus:ring-2 focus:ring-purple-500 transition-all duration-300" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button className="mt-10 w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300" onClick={handleLogin}>
                Login
              </Button>
            </TabsContent>
            <TabsContent value="signup" className="mt-10">
              <Input placeholder="Email" type="email" className="w-full rounded-full p-4 bg-white bg-opacity-80 border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 transition-all duration-300" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="Password" type="password" className="w-full rounded-full p-4 bg-white bg-opacity-80 border border-gray-300 shadow-sm mt-6 focus:ring-2 focus:ring-purple-500 transition-all duration-300" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Input placeholder="Confirm Password" type="password" className="w-full rounded-full p-4 bg-white bg-opacity-80 border border-gray-300 shadow-sm mt-6 focus:ring-2 focus:ring-purple-500 transition-all duration-300" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <Button className="mt-10 w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300" onClick={handleSignup}>
                Signup
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="hidden xl:flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-500 rounded-r-3xl">
        <img src={Background} alt="Background Login" className="h-auto max-h-full w-4/5 rounded-3xl shadow-xl" />
      </div>
    </div>
  </div>
  );
};

export default Auth;
