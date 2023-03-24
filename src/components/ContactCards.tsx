import Avatar from "react-nice-avatar";
import { ContactList } from "../types";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

type Props = {
  contactList: ContactList;
};
const ContactCards = ({ contactList }: Props) => {
  return (
    <>
      {contactList?.map((contact, index) => (
        <figure
          className="bg-white text-white h-80 rounded-lg shadow-md"
          key={index}
        >
          {/* Using Avatar generator to make it look nice, clearly not for production */}
          <div className="flex">
            <Avatar className="w-32 h-32 rounded-full mx-auto mt-7" />
            <div className="flex flex-col justify-between py-7 pr-3 text-xl">
              <AiFillDelete className="float-right mr-5 mt-5 text-red-500 hover:text-red-800" />
              <AiFillEdit className="float-right mr-5 mt-5 text-blue-500 hover:text-blue-800" />
            </div>
          </div>
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
        </figure>
      ))}
    </>
  );
};

export default ContactCards;
