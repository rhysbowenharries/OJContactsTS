import ContactCards from "./ContactCards";
import employeeData from "./employeeData.json";
import { useEffect, useState } from "react";
import { ContactList } from "./types";

const App = () => {
  const [contactList, setContactList] = useState<
    ContactList | Array<undefined>
  >([]);
  const [filterQuery, setFilterQuery] = useState<string | number | undefined>();

  useEffect(() => {
    if (!filterQuery) {
      setContactList(employeeData);
    } else {
      const queryString = filterQuery.toString().toLowerCase();
      const filteredData = employeeData?.filter((contact) => {
        const target =
          contact.name + contact.email + contact.jobTitle + contact.phone;

        return target.toLowerCase().includes(queryString);
      });
      setContactList(filteredData);
    }
  }, [filterQuery]);

  return (
    <div className={"bg-gray-100"}>
      <section>
        <form>
          <input
            type={"text"}
            placeholder={"type here to filter..."}
            onChange={(event) => setFilterQuery(event.target.value)}
            className={"ml-20 mt-6 rounded-md p-2"}
          />
        </form>
      </section>
      {contactList !== undefined ? (
        <section className={"grid sm:grid-cols-2 md:grid-cols-4 gap-6 p-20"}>
          {contactList?.length < 1 && <h1>No data matches your search</h1>}
          <ContactCards contactList={contactList as ContactList} />
        </section>
      ) : (
        <section className={"grid sm:grid-cols-2 md:grid-cols-4 gap-6 p-20"}>
          <h1>No data available, please try again later</h1>
        </section>
      )}
    </div>
  );
};

export default App;
