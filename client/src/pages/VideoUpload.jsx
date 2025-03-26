import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useVideo } from "../hooks/useVideo";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const categories = ["Gaming", "Study", "Anime", "Funny", "Tech", "Sports", "Travel"];

const VideoUpload = () => {
  const { uploadVideo, uploadProgress, error } = useVideo();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    thumbnailUrl: Yup.string()
      .url("Invalid URL format")
      .required("Thumbnail URL is required"),
    category: Yup.string().required("Category is required"),
  });

  const handleSubmit = async (values) => {
    if (!videoFile) {
      alert("Please upload a video file");
      return;
    }

    try {
      const responseData = await uploadVideo({ ...values, videoFile });
      alert("Video uploaded successfully!");
      navigate(`/channel/${responseData.channelId}`);
      setVideoFile(null);
    } catch {
      alert(error || "Failed to upload video");
      setVideoFile(null);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setVideoFile(file);
  };

  const handleThumbnailChange = (e) => {
    setThumbnailPreview(e.target.value);
  };

  return (
    <div className="p-3">
      <h2 className="text-xl sm:text-3xl font-bold text-center">Upload New Video</h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
          thumbnailUrl: "",
          category: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col items-center justify-center gap-4 my-4">
            <img
              src={
                thumbnailPreview ||
                values.thumbnailUrl ||
                "https://dummyimage.com/600x400/d4d4d4/fff.jpg&text=No+Thumbnail"
              }
              alt="thumbnail preview"
              className="w-[300px] h-[25vh] rounded-lg object-cover"
            />

            {uploadProgress > 0 && <ProgressBar completed={uploadProgress} maxCompleted={100} />}

            <div className="flex flex-col w-full sm:w-[50%]">
              <label className="font-semibold">Thumbnail URL</label>
              <Field
                type="text"
                name="thumbnailUrl"
                className="rounded-lg border outline-none px-3 py-1 mt-1 w-full"
                onChange={(e) => {
                  handleThumbnailChange(e);
                  setFieldValue("thumbnailUrl", e.target.value);
                }}
              />
              <ErrorMessage name="thumbnailUrl" component="div" className="text-red-500" />
            </div>

            <div className="flex flex-col w-full sm:w-[50%]">
              <label className="font-semibold">Video File</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="rounded-lg border outline-none px-3 py-1 mt-1 w-full"
                required
              />
            </div>

            <div className="flex flex-col w-full sm:w-[50%]">
              <label className="font-semibold">Title</label>
              <Field type="text" name="title" className="rounded-lg border outline-none px-3 py-1 mt-1 w-full" />
              <ErrorMessage name="title" component="div" className="text-red-500" />
            </div>

            <div className="flex flex-col w-full sm:w-[50%]">
              <label className="font-semibold">Description</label>
              <Field as="textarea" name="description" className="rounded-lg border outline-none px-3 py-1 mt-1 w-full" />
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>

            <div className="flex flex-col w-full sm:w-[50%]">
              <label className="font-semibold">Category</label>
              <Field as="select" name="category" className="rounded-lg border outline-none px-3 py-1 mt-1 w-full">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500" />
            </div>

            <button
              type="submit"
              className="w-full sm:w-[50%] py-2 px-4 bg-black text-white font-semibold mt-2 rounded-lg hover:opacity-80 transition-all"
            >
              Upload Video
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VideoUpload;
