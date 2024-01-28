import React, { useState } from 'react';
import { IoAdd, IoClose } from 'react-icons/io5';

interface Interval {
    start: string;
    end: string;
}

interface Availability {
    [day: string]: Interval[];
}

export function AvailabilityManagement() {
    const [availability, setAvailability] = useState<Availability>({
        Segunda: [],
        Terça: [],
        Quarta: [],
        Quinta: [],
        Sexta: [],
        Sábado: [],
        Domingo: []
    });
    const handleAddInterval = (day: string) => {
        const newInterval: Interval = { start: '', end: '' };
        setAvailability(prevAvailability => ({
            ...prevAvailability,
            [day]: [...prevAvailability[day], newInterval]
        }));
    };
    const handleRemoveInterval = (day: string, index: number) => {
        const updatedAvailability = { ...availability };
        updatedAvailability[day].splice(index, 1);
        setAvailability(updatedAvailability);
    };
    return (
        <div className="w-full px-4 mt-2">
            <h2 className="text-primary font-bold text-xl mb-4">Gerenciar Disponibilidade de Horários</h2>
            <div className="grid grid-cols-1 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Dias da Semana</h3>
                    {Object.entries(availability).map(([day, intervals], index) => (
                        <div key={index} className="border border-gray-200 p-4 rounded-lg mb-4">
                            <h4 className="text-md font-semibold mb-2">{day}</h4>
                            <div className="flex flex-col gap-2">
                                {intervals.map((interval, intervalIndex) => (
                                    <div key={intervalIndex} className="flex items-center gap-4">
                                        <input
                                            type="time"
                                            value={interval.start}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const updatedAvailability = { ...availability };
                                                updatedAvailability[day][intervalIndex].start = e.target.value;
                                                setAvailability(updatedAvailability);
                                            }}
                                            className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:border-primary"
                                        />
                                        <span className="text-gray-600">-</span>
                                        <input
                                            type="time"
                                            value={interval.end}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const updatedAvailability = { ...availability };
                                                updatedAvailability[day][intervalIndex].end = e.target.value;
                                                setAvailability(updatedAvailability);
                                            }}
                                            className="border border-gray-300 rounded-full p-2 px-4  focus:outline-none focus:border-primary"
                                        />
                                    <button
                                        onClick={() => handleRemoveInterval(day, intervalIndex)}
                                        className="text-red-500"
                                        aria-label="Remover Intervalo"
                                    >
                                        <IoClose />
                                    </button>                                    </div>
                                ))}
                                <button onClick={() => handleAddInterval(day)} className="bg-primary text-white px-2 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center w-40 gap-2"><IoAdd /> Adicionar</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
