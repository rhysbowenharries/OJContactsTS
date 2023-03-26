import React from "react";

type Props = {
  handleConfirmUpdate: () => void;
  handleCancelUpdate: () => void;
};

export const ConfirmUpdateModal = ({
  handleCancelUpdate,
  handleConfirmUpdate,
}: Props) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Confirm Deletion</h2>
      <p className="mb-4">Are you sure you want to Update this employee?</p>
      <div className="flex justify-end">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2"
          onClick={handleCancelUpdate}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={handleConfirmUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};
