import { ILoginType } from "@/@types";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  firebaseAuthErrorsHandler,
  formErrorsHandler,
} from "@/services/errorHandler";
import Image from "next/image";

const HomeLayout = () => {
  const methods = useForm<ILoginType>({ mode: "onBlur" });
  const router = useRouter();
  const { logIn, loading: userLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: ILoginType) => {
    const formError = formErrorsHandler(data.email, data.password);
    if (!formError) {
      try {
        await logIn(data.email, data.password);
        router.push("/dashboard");
      } catch (error: any) {
        setError(firebaseAuthErrorsHandler(error.errors[0].message));
      }
    } else {
      setError(formError);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  }, [error]);

  useEffect(() => {
    console.log({ userLoading });
  }, [userLoading]);
  const submitBtn = () => {
    if (userLoading) {
      return (
        <div className="loading-circle !h-[30px] after:!h-[10px] !border-[6px]"></div>
      );
    }
    return "Submit";
  };

  return (
    <div className="container mx-auto w-[300px] md:w-[380px] mt-12 border-2 border-gray-400">
      <div className="p-4">
        <Image
          className="m-auto"
          src={"/imgs/logo+text.png"}
          alt={"Logo da Encibra S/A"}
          width={337}
          height={56}
        />
      </div>
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">
        Log In
      </h2>
      <FormProvider {...methods}>
        <form
          action=""
          className="w-full mx-auto pb-12 px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {error && (
            <div>
              <small className="form-error absolute">{error}</small>
            </div>
          )}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Email
              </label>
            </div>

            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none bg-white border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.email && (
              <p className="text-red-400 absolute transition-all">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Password
              </label>
            </div>

            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`border border-solid bg-white rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password && (
              <p className="text-red-400 absolute transition-all">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
            >
              <div className="capitalize text-white font-normal">
                {submitBtn()}
              </div>
            </button>
          </div>
          <div className="flex justify-center items-center mt-4">
            <small className="text-center m-auto">
              Em caso de perda das credenciais entre em contato com um gestor
            </small>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default HomeLayout;
