import { useState } from "react";
import { ContactFormData } from "./typesAndConstants";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const useContactForm = (initialFormData: ContactFormData) => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const formReset = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    handleInputChange,
    formReset,
    setFormData,
  };
};

export const useFetchPosts = () => {
  const [employeeData, setEmployeeData] = useState<any>([]);
  const fetchPost = async () => {
    await getDocs(collection(db, "employees")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmployeeData(newData);
    });
  };

  return {
    employeeData,
    fetchPost,
  };
};
