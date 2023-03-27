import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";

describe("ConfirmDeleteModal", () => {
  it("renders with the correct message", () => {
    const { getByText } = render(
      <ConfirmDeleteModal
        handleCancelDelete={() => {}}
        handleConfirmDelete={() => {}}
      />
    );
    expect(getByText("Confirm Deletion")).toBeInTheDocument();
    expect(
      getByText("Are you sure you want to delete this employee?")
    ).toBeInTheDocument();
  });

  it("calls the handleCancelDelete function when the cancel button is clicked", () => {
    const handleCancelDelete = jest.fn();
    const { getByText } = render(
      <ConfirmDeleteModal
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={() => {}}
      />
    );
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(handleCancelDelete).toHaveBeenCalled();
  });

  it("calls the handleConfirmDelete function when the delete button is clicked", () => {
    const handleConfirmDelete = jest.fn();
    const { getByTestId } = render(
      <ConfirmDeleteModal
        handleCancelDelete={() => {}}
        handleConfirmDelete={handleConfirmDelete}
      />
    );
    const confirmDeleteButton = getByTestId("confirm-delete-button");
    fireEvent.click(confirmDeleteButton);
    expect(handleConfirmDelete).toHaveBeenCalled();
  });
});
