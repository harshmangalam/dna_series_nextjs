import InputField from "../components/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthDispatch, useAuthState } from "../context/auth";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "../components/Footer";
import Head from "next/head";
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const router = useRouter();
  const authDispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  if (authenticated) router.push("/");

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    setErrors,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      setSubmitting(true);

      try {
        axios.defaults.headers["Authorization"] = "";
        localStorage.removeItem("token");
        const response = await axios.post("/auth/login", values);
        localStorage.setItem("token", response.data.data.token);
        authDispatch("LOGIN", response.data.data.user);
        setSubmitting(false);
        return router.push("/");
      } catch (error) {
        setErrors(error.response.data);
      }
    },
  });

  return (
    <div className="bg-primary-1 min-h-screen h-full flex flex-col items-center justify-center px-4">
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Login and subscribe to my newsletter"
        ></meta>
      </Head>
      <Link href="/">
        <a className="my-16 bg-pink-500 text-white p-4 rounded-full">Home</a>
      </Link>
      <div className=" max-w-xl border p-6 rounded-md">
        {errors.error && (
          <div className="text-red-500   p-2 my-4">{errors.error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <InputField
            placeholder="Email"
            value={values.email}
            name="email"
            handleChange={handleChange}
            error={errors.email}
          />
          <InputField
            placeholder="Password"
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            error={errors.password}
          />
          <button
          disabled={isSubmitting}
            type="submit"
            className="focus:outline-none bg-purple-600 text-white text-lg w-full py-3 rounded-md my-4"
          >
            {isSubmitting ? "Wait..." : "Login"}
          </button>
        </form>
        <div className="text-center text-white my-4 text-lg hover:text-yellow-400">
          <Link href="/register ">
            <a>Signup</a>
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
