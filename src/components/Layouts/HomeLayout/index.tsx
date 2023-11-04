import { IFormFieldType, ILoginType } from "@/@types";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React from "react";
import AuthForm from "@/components/Auth/AuthForm";
import CompanyLogo from "@/components/UI/CompanyLogo";

const HomeLayout = () => {
  const router = useRouter();
  const { logIn, loading: userLoading } = useAuth();

  const onSubmit = async (data: ILoginType) => {
    try {
      await logIn(data.email, data.password);
    } catch (error) {
      console.error(error);
    }
    router.push("/dashboard");
  };

  const formFields: IFormFieldType = {
    email: { required: "Email is required", fieldType: "email" },
    password: { required: "Password is required", fieldType: "password" },
  };

  const submitBtn = () => {
    if (userLoading) {
      return (
        <div className="loading-circle !h-[30px] after:!h-[10px] !border-[6px] !border-white !border-t-[transparent] after:hidden"></div>
      );
    }
    return "Submit";
  };

  return (
    <div className="container mx-auto w-[300px] md:w-[380px] mt-12 border-2 border-gray-400">
      <CompanyLogo className="justify-center" />
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">
        Log In
      </h2>
      <AuthForm
        handleOnSubmit={onSubmit}
        submitBtn={submitBtn}
        formFields={formFields}
      />
    </div>
  );
};

export default HomeLayout;
