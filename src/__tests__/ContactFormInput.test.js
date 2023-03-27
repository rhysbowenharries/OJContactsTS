import { render, fireEvent, screen } from "@testing-library/react";
import { ContactFormInput } from "../components/ContactFormInput";
import "@testing-library/jest-dom";

describe("ContactFormInput component", () => {
  const mockHandleSubmit = jest.fn();
  const mockHandleInputChange = jest.fn();
  const mockHandleFormClose = jest.fn();
  const formData = {
    name: "John Doe3",
    email: "john.doe@example.com",
    jobTitle: "Software Engineer",
    phoneNumber: "1234567890",
  };

  beforeEach(() => {
    render(
      <ContactFormInput
        formData={formData}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        handleFormClose={mockHandleFormClose}
      />
    );
  });

  it("renders all form inputs", () => {
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Job Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
  });

  it("calls handleInputChange when form inputs change", () => {
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Jane Doe" },
    });
    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  it("calls handleSubmit when form is submitted", () => {
    fireEvent.submit(screen.getByTestId("submit-button"));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("calls handleFormClose when cancel button is clicked", () => {
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockHandleFormClose).toHaveBeenCalled();
  });

  it("displays the correct values in form inputs", () => {
    expect(screen.getByLabelText("Name")).toHaveValue(formData.name);
    expect(screen.getByLabelText("Email")).toHaveValue(formData.email);
    expect(screen.getByLabelText("Job Title")).toHaveValue(formData.jobTitle);
    expect(screen.getByLabelText("Phone Number")).toHaveValue(
      formData.phoneNumber
    );
  });
});
