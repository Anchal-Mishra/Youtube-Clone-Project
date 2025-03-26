import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useEffect } from "react";
import { useChannel } from "../hooks/useChannel";

const CreateChannelPage = () => {
  const { createChannel, userChannel, error } = useChannel();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (userChannel?.id) {
      navigate(`/channel/${userChannel.id}`);
    }
  }, [user, userChannel, navigate]);

  const initialValues = {
    channelName: "",
    description: "",
  };

  const validationSchema = Yup.object({
    channelName: Yup.string().required("Channel name is required"),
    description: Yup.string().max(200, "Description is too long"),
  });

  const handleSubmit = async (values) => {
    try {
      const createdChannel = await createChannel(values);
      if (createdChannel?.id) {
        navigate(`/channel/${createdChannel.id}`);
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className=" h-[85vh] w-full flex flex-col items-center justify-center px-10">
          <h2 className="text-zinc-700 uppercase text-2xl font-semibold mb-2">
            Create Your Channel
          </h2>
          <p className="mb-5 text-sm text-zinc-400">
            Enter all the required fields to create your own channel and upload
            videos.
          </p>
          <div className="flex flex-col w-[80vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw]">
            <label htmlFor="channelName" className="text-zinc-600 mb-2 text-xl">
              Enter your Channel Name
            </label>
            <Field
              type="text"
              id="channelName"
              name="channelName"
              placeholder="Enter your channel name"
              className="outline-none border-b border-zinc-300 px-2 py-1 mb-3"
            />
            <ErrorMessage
              name="channelName"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col w-[80vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw]">
            <label htmlFor="description" className="text-zinc-600 mb-2 text-xl">
              Enter your description
            </label>
            <Field
              type="text"
              id="description"
              name="description"
              placeholder="Enter your description"
              className="outline-none border-b border-zinc-300 px-2 py-1 mb-3"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white w-[80vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw] mt-5 rounded-lg text-lg hover:opacity-80 transition-all ease-linear duration-300"
          >
            Create Channel
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </Form>
      </Formik>
    </div>
  );
};

export default CreateChannelPage;
