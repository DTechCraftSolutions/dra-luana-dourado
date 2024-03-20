import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface TreatmentItemProps {
    name: string;
}

export const TreatmentItem: React.FC<TreatmentItemProps> = ({ name }) => {
    const [isActive, setIsActive] = useState(true);
    const [value, setValue] = useState(0);

    return (
        <div className="flex items-center justify-between mt-2">
            <div>{name}</div>
            <div className="flex items-center gap-4">
                <p>Ativo</p>
                <Switch checked={isActive} onChange={() => setIsActive(!isActive)} />
                <div>
                    <label htmlFor="">R$</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(parseFloat(e.target.value))}
                        className="w-24 rounded-full focus:outline-primary focus:duration-500 focus:border-primary focus:border-1 focus:outline-0 focus:shadow-none h-10 border px-4"
                        placeholder="Valor"
                    />
                </div>
            </div>
        </div>
    );
};