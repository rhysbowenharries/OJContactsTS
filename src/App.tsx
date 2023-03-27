import ContactCards from "./components/ContactCards";
import { useEffect, useState } from "react";
import { ContactList, Employee } from "./typesAndConstants";
import ContactForm from "./components/ContactForm";

import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { useFetchPosts } from "./utils";

const App = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactList, setContactList] = useState<
    ContactList | Array<undefined>
  >([]);
  const [filterQuery, setFilterQuery] = useState<string | number | undefined>();

  const { employeeData, fetchPost } = useFetchPosts();

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    if (!filterQuery) {
      setContactList(employeeData);
    } else {
      const queryString = filterQuery.toString().toLowerCase();
      const filteredData = employeeData?.filter((contact: Employee) => {
        const target =
          contact.name + contact.email + contact.jobTitle + contact.phoneNumber;

        return target.toLowerCase().includes(queryString);
      });
      setContactList(filteredData);
    }
  }, [employeeData, filterQuery]);

  return (
    <div className={"bg-gray-100"}>
      <section className="flex justify-between mb-16">
        <form>
          <input
            type={"text"}
            placeholder={"type here to filter..."}
            onChange={(event) => setFilterQuery(event.target.value)}
            className={"ml-20 mt-6 rounded-md p-2"}
          />
        </form>
        <button
          onClick={() => setShowContactForm(!showContactForm)}
          className="text-3xl mt-6 mr-16 md:mr-20"
        >
          {showContactForm ? (
            <AiFillMinusCircle className="text-cyan-500 hover:text-cyan-600 " />
          ) : (
            <AiFillPlusCircle className="text-cyan-500 hover:text-cyan-600 " />
          )}
        </button>
      </section>
      {showContactForm && (
        <section>
          <ContactForm
            cancelHandler={() => setShowContactForm(false)}
            fetchPost={() => fetchPost()}
          />
        </section>
      )}
      {contactList !== undefined && contactList.length ? (
        <section
          className={
            "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20 px-20"
          }
        >
          {contactList?.length < 1 && <h1>No data matches your search</h1>}

          <ContactCards
            fetchPost={() => fetchPost()}
            contactList={contactList as ContactList}
          />
        </section>
      ) : (
        <section className={"gap-6 p-20"}>
          <h1>No data available, please try again later</h1>
        </section>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
