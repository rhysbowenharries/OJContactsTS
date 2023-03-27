import { useState, useEffect } from "react";
import Modal from "react-modal";
import Avatar from "react-nice-avatar";
import { toast } from "react-toastify";
import { ContactList, INITIAL_FORM_DATA } from "../typesAndConstants";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./../firebase.js";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { useContactForm } from "../utils";
import { ContactFormInput } from "./ContactFormInput";

type Props = {
  contactList: ContactList;
  fetchPost: () => void;
};

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ContactCards = ({ contactList, fetchPost }: Props) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { formData, handleInputChange, setFormData } =
    useContactForm(INITIAL_FORM_DATA);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await deleteDoc(doc(db, "employees", deleteId));
        toastDeleteSuccess();
        fetchPost();
      } catch (error: any) {
        setErrorMessage(error);
        toastError();
      } finally {
        setDeleteId(null);
        setIsDeleteModalOpen(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (deleteId) {
      setIsDeleteModalOpen(true);
    }
  }, [deleteId]);

  const handleUpdate = (id: string) => {
    const employee = contactList.find((employee) => employee.id === id);
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        jobTitle: employee.jobTitle,
      });
      setUpdateId(id);
      setIsUpdateModalOpen(true);
    }
  };

  const handleConfirmUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (updateId) {
      try {
        await updateDoc(doc(db, "employees", updateId), { ...formData });
        toastUpdateSuccess();
        fetchPost();
      } catch (error: any) {
        setErrorMessage(error);
        toastError();
      } finally {
        setUpdateId(null);
        setIsUpdateModalOpen(false);
      }
    }
  };

  const handleCancelUpdate = () => {
    setFormData(INITIAL_FORM_DATA);
    setIsUpdateModalOpen(false);
  };

  useEffect(() => {
    if (updateId) {
      setIsUpdateModalOpen(true);
    }
  }, [updateId]);

  const toastDeleteSuccess = () =>
    toast.success("Your contact has been deleted!");
  const toastUpdateSuccess = () =>
    toast.success("Your contact has been updated!");
  const toastError = () =>
    toast.error(`Error updating document: ${errorMessage} `);

  return (
    <>
      {contactList?.map((contact) => (
        <figure
          className="bg-white text-white h-80 rounded-lg shadow-md overflow-clip group relative flex "
          key={contact.id}
        >
          {/* Using Avatar generator to make it look nice, clearly not for production */}
          <div className="w-full transition duration-300 ease-in-out">
            <Avatar className="w-32 h-32 rounded-full mx-auto mt-7" />
            <figcaption className="text-center mt-5">
              <p className="text-gray-700 font-semibold text-xl mb-2">
                {contact.name}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">email: </span>
                {contact.email}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">phone: </span>
                {contact.phoneNumber}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">Job Title: </span>
                {contact.jobTitle}
              </p>
            </figcaption>
          </div>
          <div className="absolute right-2 flex flex-col justify-between py-7 pr-3 text-xl opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out group-hover:bg-white z-0">
            <button onClick={() => handleDelete(contact.id)}>
              <AiFillDelete
                data-testid="delete-button"
                className=" mt-5 text-red-500 hover:text-red-800"
              />
            </button>
            <button
              data-testid="update-button"
              onClick={() => handleUpdate(contact.id)}
            >
              <AiFillEdit className=" mt-5 text-blue-500 hover:text-blue-800" />
            </button>
          </div>
        </figure>
      ))}
      <Modal
        data-testid="delete-modal"
        isOpen={isDeleteModalOpen}
        onRequestClose={handleCancelDelete}
        className="absolute bg-zinc-200 p-4 rounded-lg drop-shadow-lg	"
        style={modalStyles}
      >
        <ConfirmDeleteModal
          data-testid="confirm-delete-modal"
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
        />
      </Modal>
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={handleCancelUpdate}
        className="absolute bg-zinc-200 p-4 rounded-lg drop-shadow-lg	"
        style={modalStyles}
      >
        <ContactFormInput
          formData={formData}
          handleSubmit={handleConfirmUpdate}
          handleInputChange={handleInputChange}
          handleFormClose={handleCancelUpdate}
        />
      </Modal>
    </>
  );
};

export default ContactCards;
