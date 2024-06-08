"use client";
import { getAuthUser } from "@/api/AuthAPI";
import { useAuth } from "@/store/use-auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
interface UserAuthProps {
  children: React.ReactNode;
}
function UserAuth({ children }: UserAuthProps) {
  const {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setLoading,
    setUser,
  } = useAuth();
  const fetchUser = async () => {
    try {
      const user = await getAuthUser();
      if (!user) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setIsAuthenticated(true);
      setLoading(false);
      setUser(user);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      console.error(error);
    }
  };
  const router = useRouter();
  useEffect(() => {
    fetchUser();
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return <div>{children}</div>;
}

export default UserAuth;
