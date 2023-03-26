import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConatctFormInput } from "./ConatctFormInput";
import { ContactFormData } from "../types";

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
    <ConatctFormInput
      formData={formData}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleFormClose={handleFormClose}
    />
  );
}

export default ContactForm;
