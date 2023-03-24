import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ContactFormData {
  name: string;
  email: string;
  jobTitle: string;
  phoneNumber: string;
}

type Props = {
  cancelHandler: () => void;
  fetchPost: () => void;
};

function ContactForm({ cancelHandler, fetchPost }: Props) {
  const [errorMessage, setErrorMessage] = useState();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    jobTitle: "",
    phoneNumber: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const formReset = () => {
    setFormData({
      name: "",
      email: "",
      jobTitle: "",
      phoneNumber: "",
    });
  };

  const handleFormClose = () => {
    cancelHandler();
    formReset();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "employees"), formData);
      toastSuccess();
    } catch (e: any) {
      setErrorMessage(e);
      toastError();
    }
    // Reset the form fields
    formReset();
    fetchPost();
    handleFormClose();
  };

  const toastSuccess = () =>
    toast.success("Your contact list has been updated!");
  const toastError = () =>
    toast.error(`Error adding document: ${errorMessage} `);

  return (
    <div className="pb-20">
      <form
        onSubmit={handleSubmit}
        className="p-6 max-w-3xl mx-10 md:m-auto bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="job-title"
            className="block text-gray-700 font-bold mb-2"
          >
            Job Title
          </label>
          <input
            type="text"
            id="job-title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone-number"
            className="block text-gray-700 font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone-number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>
        <div className="flex  justify-center md:justify-end">
          <button
            onClick={() => handleFormClose()}
            className="bg-gray-400 mr-5 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
