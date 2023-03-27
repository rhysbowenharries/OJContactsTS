import React, { useState } from "react";
import { toast } from "react-toastify";
import { ContactFormData } from "../typesAndConstants";

type Props = {
  formData: ContactFormData;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormClose: () => void;
};

export const ContactFormInput = ({
  formData,
  handleSubmit,
  handleInputChange,
  handleFormClose,
}: Props) => {
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  // simple validation, would imporve for production
  const validateForm = (): boolean => {
    const { name, email, jobTitle, phoneNumber } = formData;
    return (
      name.trim() === "" ||
      email.trim() === "" ||
      jobTitle.trim() === "" ||
      phoneNumber.trim() === ""
    );
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleInputChange(event);
    setIsFormInvalid(validateForm());
  };
  const toastError = () =>
    toast.error(
      `Please check you have completed the from correctly and try again`
    );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isFormInvalid) {
      toastError();
    } else {
      handleSubmit(event);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
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
            onChange={handleInput}
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
            onChange={handleInput}
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
            onChange={handleInput}
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
            onChange={handleInput}
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
            data-testid="submit-button"
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
