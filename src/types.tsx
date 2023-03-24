export interface Employee {
  name: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
}

export type ContactList = Array<Employee>;
