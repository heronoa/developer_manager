import { FormProvider, useForm } from "react-hook-form";
import {
  firebaseAuthErrorsHandler,
  formErrorsHandler,
} from "@/services/errorHandler";
import { IFormFieldType, IFormRegisterType } from "@/@types";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { capitalize } from "@/services/format";

interface Props {
  className?: string;
  handleOnSubmit: (data: IFormRegisterType) => Promise<void>;
  submitBtn: () => React.ReactNode | string;
  formFields: IFormFieldType;
}

const AuthForm = ({
  className = "",
  handleOnSubmit,
  submitBtn,
  formFields,
}: Props) => {
  const methods = useForm<IFormRegisterType>({ mode: "onBlur" });
  const [error, setError] = useState<string | null>(null);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  }, [error]);

  const onSubmit = async (data: IFormRegisterType) => {
    const formError = formErrorsHandler(data.email, data.password);
    if (!formError) {
      try {
        await handleOnSubmit(data);
      } catch (error: any) {
        setError(firebaseAuthErrorsHandler(error.errors[0].message));
      }
    } else {
      setError(formError);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        action=""
        className={`${className} w-full mx-auto px-4`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && (
          <div>
            <small className="form-error absolute">{error}</small>
          </div>
        )}
        {Object.entries(formFields).map(([formName, formOptions], index) => (
          <div key={index} className={`${formOptions.divClassName}  mt-8`}>
            <div className="flex items-center justify-between">
              <label
                htmlFor=""
                className={
                  formOptions?.labelClassName +
                  " block mb-3 font-sans text-blue-900 dark:text-white"
                }
              >
                {formOptions?.fieldLabel || capitalize(formName)}
              </label>
            </div>

            <div className="relative">
              {hidePassword ? (
                formOptions.fieldType === "textarea" ? (
                  <textarea
                    {...register(formName, formOptions)}
                    className={
                      formOptions?.inputClassName +
                      ` border border-solid bg-white rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`
                    }
                    defaultValue={formOptions.defaultValue}
                    placeholder={formOptions.placeholder}
                  />
                ) : (
                  <input
                    type={formOptions.fieldType}
                    {...register(formName, formOptions)}
                    className={
                      formOptions?.inputClassName +
                      ` border border-solid bg-white rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`
                    }
                    defaultValue={formOptions.defaultValue}
                    placeholder={formOptions.placeholder}
                  />
                )
              ) : (
                <input
                  type="text"
                  {...register(formName, formOptions)}
                  className={
                    formOptions?.inputClassName +
                    ` border border-solid bg-white rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`
                  }
                />
              )}
              {formOptions.fieldType === "password" && (
                <div
                  className="absolute top-2 right-2"
                  onClick={() => setHidePassword(prevState => !prevState)}
                >
                  {hidePassword ? (
                    <AiFillEye className="w-9 h-9 text-blue-900 dark:text-white" />
                  ) : (
                    <AiFillEyeInvisible className="w-9 h-9 text-blue-900 dark:text-white" />
                  )}
                </div>
              )}
            </div>
            {errors?.[formName] && (
              <p
                className={
                  formOptions?.errorClassName +
                  " text-red-400 absolute transition-all"
                }
              >
                {errors?.[formName]?.message}
              </p>
            )}
          </div>
        ))}
        <div className="flex justify-center pt-8 col-span-full first-letter:">
          <button type="submit" className={`btn`}>
            <div className="capitalize text-white font-normal">
              {submitBtn()}
            </div>
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AuthForm;
