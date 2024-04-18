import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface TreatmentItemProps {
    name: string;
    id: string;
    price: number;
    isActive: string;
    setIsActive: () => void;
    setPrice: (e: number) => void;
}

export const TreatmentItem: React.FC<TreatmentItemProps> = ({ name, setPrice, price, isActive, setIsActive }) => {
    return (
        <div className="flex items-center justify-between mt-2">
            <div>{name}</div>
            <div className="flex items-center gap-4">
                <p>Ativo</p>
                <Switch value={isActive} onChange={() => {
                    setIsActive();
                }} />
                <div>
                    <label htmlFor="">R$</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        className="w-24 rounded-full focus:outline-primary focus:duration-500 focus:border-primary focus:border-1 focus:outline-0 focus:shadow-none h-10 border px-4"
                        placeholder="Valor"
                    />
                </div>
            </div>
        </div>
    );
};