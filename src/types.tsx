export interface Employee {
  name: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  id: string;
}

export type ContactList = Array<Employee>;

export interface ContactFormData {
  name: string;
  email: string;
  jobTitle: string;
  phoneNumber: string;
}
