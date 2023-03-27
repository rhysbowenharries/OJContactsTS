import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContactFormInput } from "./ContactFormInput";
import { INITIAL_FORM_DATA } from "../typesAndConstants";
import { useContactForm } from "../utils";

type Props = {
  cancelHandler: () => void;
  fetchPost: () => void;
};

function ContactForm({ cancelHandler, fetchPost }: Props) {
  const [errorMessage, setErrorMessage] = useState();

  const { formData, handleInputChange, formReset } =
    useContactForm(INITIAL_FORM_DATA);

  const handleFormClose = () => {
    cancelHandler();
    formReset();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "employees"), formData);
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
    <ContactFormInput
      formData={formData}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleFormClose={handleFormClose}
    />
  );
}

export default ContactForm;
