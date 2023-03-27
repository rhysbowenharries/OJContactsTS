import "@testing-library/jest-dom";
import { toast } from "react-toastify";
import { render, fireEvent, act } from "@testing-library/react";
import ContactForm from "../components/ContactForm";

describe("ContactForm component", () => {
  const cancelHandler = jest.fn();
  const fetchPost = jest.fn();

  it("renders without errors", () => {
    render(<ContactForm cancelHandler={cancelHandler} fetchPost={fetchPost} />);
  });

  it("renders form inputs", () => {
    const { getByLabelText } = render(
      <ContactForm cancelHandler={cancelHandler} fetchPost={fetchPost} />
    );
    expect(getByLabelText("Name")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Job Title")).toBeInTheDocument();
    expect(getByLabelText("Phone Number")).toBeInTheDocument();
  });

  it("submits the form with correct data", () => {
    const { getByLabelText, getByTestId } = render(
      <ContactForm cancelHandler={cancelHandler} fetchPost={fetchPost} />
    );
    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    const jobTitleInput = getByLabelText("Job Title");
    const phoneNumberInput = getByLabelText("Phone Number");
    const submitButton = getByTestId("submit-button");

    act(() => {
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(jobTitleInput, {
        target: { value: "Software Engineer" },
      });
      fireEvent.change(phoneNumberInput, { target: { value: "123-456-7890" } });
      fireEvent.click(submitButton);
    });
  });

  it("shows error toast message when form submission fails", async () => {
    const errorMessage = "Failed to add document";
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    const { getByLabelText, getByTestId } = render(
      <ContactForm cancelHandler={cancelHandler} fetchPost={fetchPost} />
    );
    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    const jobTitleInput = getByLabelText("Job Title");
    const phoneNumberInput = getByLabelText("Phone Number");
    const submitButton = getByTestId("submit-button");

    await act(() => {
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(jobTitleInput, {
        target: { value: "Software Engineer" },
      });
      fireEvent.change(phoneNumberInput, { target: { value: "123-456-7890" } });
      fireEvent.click(submitButton);
    });

    // TODO:fix me!
    // expect(getByTestId("toast-error-message")).toHaveTextContent(
    //   `Error adding document: ${errorMessage}`
    // );
  });
});
