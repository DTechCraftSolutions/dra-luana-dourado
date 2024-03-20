// components/ui/PlanCard.tsx
import React from "react";
import { Button } from "./ui/button";
import { IoPencil, IoTrash } from "react-icons/io5";

interface PlanCardProps {
    name: string;
    onEdit: () => void;
    onDelete: () => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ name, onEdit, onDelete }) => {
    return (
        <div className="border rounded-xl shadow-md w-[90%] bg-white p-4 mb-4 flex justify-between items-center">
            <div className="text-lg font-semibold">{name}</div>
            <div className="flex gap-4">
                {/* Botão de editar com ícone */}
                <Button variant="outline" onClick={onEdit}>
                    <IoPencil />
                </Button>
                {/* Botão de deletar com ícone */}
                <Button className="" onClick={onDelete}>
                    <IoTrash />
                </Button>
            </div>
        </div>
    );
};
