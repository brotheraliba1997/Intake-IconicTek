"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import logo from "@/public/img/logo.png";
import { MdOutlineSecurity } from "react-icons/md";
import { useForm } from "react-hook-form";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Address is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "" },
  });

  console.log(watch(), "watch")

  const onSubmit = async (data: FormData) => {
    console.log("Submitted Data:", data);
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((res: SignInResponse | undefined) => {
        setIsLoading(false);

        if (res?.ok) {
          toast.success("Login successfully");
          router.push("/dashboard");
        } else {
          toast.error(res?.error || "An unknown error occurred");
        }
      })
      .catch((err: { error?: string }) => {
        setIsLoading(false);

        console.error("Login error:", err);
        toast.error(err.error || "An unknown error occurred");
      });
  };

  console.log(isLoading , "isLoadingMissing")

  return (
    <div className="newloginbg">
      <div className="login-section">
        <div className="container">
          <div
            className="row  align-items-center justify-content-around"
            style={{ height: "100vh" }}
          >
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="login-card">
                <div className="loginlogo mb-3">
                  <Image
                    src={logo}
                    alt="Logo"
                    width={100}
                    height={100}
                    objectFit="contain"
                  />
                </div>
                <form action="" autoComplete="off" className="row p-4 pt-0" onSubmit={handleSubmit(onSubmit)}>
                  <div className="col-md-12">
                    <label htmlFor="#" className="form-label">
                      Username/Email
                    </label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text rounded-1"
                          id="basic-addon1"
                        >
                          <IoPersonCircle style={{ fontSize: "26.5px" }} />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control rounded-1"
                        placeholder=""
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        {...register("email")}
                      />
                    </div>

                    <div className="text-danger text-center p-0 m-0 mb-2">
                      {errors.email?.message}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="#" className="form-label">
                      Password
                    </label>
                    <div className="form-group mb-3">
                      <div className="input-group" id="show_hide_password">
                        <div className="input-group-prepend ">
                          <span
                            className="input-group-text rounded-1"
                            id="basic-addon2"
                          >
                            <i className="fa fa-lock m-1" />
                          </span>
                        </div>
                        <input
                          className="form-control border-end-0"
                          type="password"
                          {...register("password")}
                        />
                        <div className="input-group-text border-end border-start-0 ">
                          <a href="">
                            <i className="fa fa-eye-slash" aria-hidden="true" />
                          </a>
                        </div>
                        <div className="text-danger text-center p-0 m-0 mb-2">
                          {errors.password?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="#" className="form-label">
                      Agency Code
                    </label>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text rounded-1"
                          id="basic-addon1"
                        >
                          <MdOutlineSecurity style={{ fontSize: "26.5px" }} />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control rounded-1"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="text-end">
                      <a href="#" className="fs-6">
                        Forget Password
                      </a>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="d-grid mb-3">
                      <button id="sendlogin" className="btn btn-dark rounded-1">
                        Login
                      </button>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="sinuptext text-center">
                      <p className="mb-1">
                        Don’t have a Account? <a href="#">Sign Up</a>
                      </p>
                      <p className="fw-light">
                        By logging in, you agree to our
                        <br />{" "}
                        <a href="#" className="text-dark">
                          Terms and Conditions
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
