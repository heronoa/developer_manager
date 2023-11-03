import React from "react";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/Auth/AuthForm";
import { IFormFieldType, SignupType } from "@/@types";

const SignupPage = () => {
  const { signUp, loading: userLoading } = useAuth();

  const onSubmit = async (data: SignupType) => {
    await signUp(data.email, data.password);
  };

  const formFields: IFormFieldType = {
    email: { required: "Email is required", fieldType: "email" },
    password: { required: "Password is required", fieldType: "password" },
    password_confirm: { required: "Verify your password", fieldType: "password", fieldLabel: "Confirm Password" },
  };

  const submitBtn = () => {
    if (userLoading) {
      return (
        <div className="loading-circle !h-[30px] after:!h-[10px] !border-[6px]"></div>
      );
    }
    return "Submit";
  };

  return (
    <div className="sign-up-form container mx-auto w-96 mt-12 border-2 border-gray-400">
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">
        Sign Up
      </h2>
      <AuthForm
        handleOnSubmit={onSubmit}
        submitBtn={submitBtn}
        formFields={formFields}
      />
    </div>
  );
};

export default SignupPage;
