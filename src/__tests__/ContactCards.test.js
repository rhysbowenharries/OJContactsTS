import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactCards from "../components/ContactCards";

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

const mockContactList = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phoneNumber: "555-1234",
    jobTitle: "Software Engineer",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phoneNumber: "555-5678",
    jobTitle: "Product Manager",
  },
];

describe("ContactCards", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render a card for each contact in the list", () => {
    render(<ContactCards contactList={mockContactList} fetchPost={() => {}} />);
    const contactCards = screen.getAllByRole("figure");
    expect(contactCards.length).toEqual(mockContactList.length);
  });

  it("should show the delete confirmation modal when delete button is clicked", async () => {
    render(<ContactCards contactList={mockContactList} fetchPost={() => {}} />);
    const deleteButton = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButton[0]);
    await waitFor(() =>
      expect(screen.getByText("Confirm Deletion")).toBeInTheDocument()
    );
  });

  it("should delete a contact when confirmation modal is confirmed", async () => {
    const mockFetchPost = jest.fn();
    render(
      <ContactCards contactList={mockContactList} fetchPost={mockFetchPost} />
    );

    const deleteButton = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButton[0]);

    const confirmButton = screen.getByTestId("confirm-delete-button");
    fireEvent.click(confirmButton);

    // TODO: Figure out how to test toast message
  });

  it("should update a contact when update button is clicked and form is submitted", () => {
    const mockFetchPost = jest.fn();
    const { getByText } = render(
      <ContactCards contactList={mockContactList} fetchPost={mockFetchPost} />
    );
    const updateButton = screen.getAllByTestId("update-button");
    fireEvent.click(updateButton[0]);
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const phoneNumberInput = screen.getByLabelText("Phone Number");
    const jobTitleInput = screen.getByLabelText("Job Title");
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });
    fireEvent.change(emailInput, {
      target: { value: "updated.email@example.com" },
    });
    fireEvent.change(phoneNumberInput, { target: { value: "555-4321" } });
    fireEvent.change(jobTitleInput, { target: { value: "Updated Job Title" } });
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    // TODO: Figure out how to test toast message
    // expect(
    //   screen.getByText("Your contact has been updated!")
    // ).toBeInTheDocument();
  });
});
