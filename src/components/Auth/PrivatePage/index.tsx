import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user.uid) {
      router.push("/");
    }
  }, [router, user]);
  return <div>{user.uid ? children : null}</div>;
};

export default ProtectedRoute;