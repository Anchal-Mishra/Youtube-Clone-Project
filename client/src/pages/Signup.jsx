import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { setAuthError } from "../redux/slices/authSlice";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast"; 
import { PropagateLoader } from "react-spinners";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signup, loading, error } = useAuth();

  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(
        /^[a-z0-9]*$/,
        "Username must contain only lowercase letters and numbers"
      )
      .required("Username is required"),
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must not exceed 16 characters")
      .matches(
        /^(?=.*[a-z0-9])(?=.*[!@#$%^&*])/,
        "Password must contain a letter, a number, or a special character"
      )
      .required("Password is required"),
    avatar: Yup.string(),
  });

  const handleSubmit = async (values) => {
    try {
      await signup(values);
      toast.success("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch {
      toast.error(error || "Signup failed");
      dispatch(setAuthError(error || "Signup failed"));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        <PropagateLoader color="#36D7B7" size={15} />
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        username: "",
        fullName: "",
        email: "",
        password: "",
        avatar: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="h-[85vh] w-full flex flex-col items-center justify-center px-10">
        <h2 className="text-zinc-700 uppercase text-2xl font-semibold mb-2">
          Signup Form
        </h2>
        <p className="mb-5 text-sm text-zinc-400">
          Enter all required fields and click the Signup button to create an
          account
        </p>

        <div className="flex flex-col w-[80vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw]">
          <label htmlFor="username" className="text-zinc-600 mb-2 text-xl">
            Enter your Username
          </label>
          <Field
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="outline-none border-b border-zinc-300 px-2 py-1 mb-3"
          />
          <ErrorMessage
            name="username"
            component="div"
            className="text-red-500"
          />
        </div>

        <div className="flex flex-col w-[80vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw]">
          <label htmlFor="fullName" className="text-zinc-600 mb-2 text-xl">
            Enter your Full Name
          </label>
          <Field
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full Name"
            className="outline-none mb-3 border-b border-zinc-300 px-2 py-1"
          />
          <ErrorMessage
            name="fullName"
            component="div"
            className="text-red-500"
          />
        </div>

        <div className="flex flex-col w-[80vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw]">
          <label htmlFor="email" className="text-zinc-600 mb-2 text-xl">
            Enter your Email
          </label>
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="outline-none  border-b border-zinc-300 px-2 py-1 mb-3"
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>

        <div className="flex flex-col w-[80vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw]">
          <label htmlFor="password" className="text-zinc-600 mb-2 text-xl">
            Enter your Password
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="outline-none  border-b border-zinc-300 px-2 py-1"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white w-[80vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw] mt-5 rounded-lg text-lg hover:opacity-80 transition-all ease-linear duration-300"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </Form>
    </Formik>
  );
};

export default Signup;
