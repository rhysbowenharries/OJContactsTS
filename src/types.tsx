export interface Employee {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
}

export type ContactList = Array<Employee>;
