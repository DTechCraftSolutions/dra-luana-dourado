import React from "react";
import { IoPencil, IoTrash } from "react-icons/io5";

interface PlanCardProps {
    name: string;
    onEdit: () => void;
    onDelete: () => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ name, onEdit, onDelete }) => {
    return (
        <div className="border rounded-xl shadow-md w-[90%] bg-white p-4 mb-4 flex justify-between items-center">
            <p className="text-lg text-primary font-semibold">{name}</p>
            <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 text-primary hover:bg-primary hover:text-white hover:duration-500 hover:ease-in-out hover:transform hover:rounded"
          >
            <IoPencil />
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 text-red-500 hover:bg-red-500 hover:text-white hover:duration-500 hover:ease-in-out hover:transform hover:rounded"
          >
            <IoTrash />
          </button>
        </div>
        </div>
    );
};
