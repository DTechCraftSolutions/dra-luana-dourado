"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { details } from "../../../details";
import { GetServerSideProps } from "next";
import { IoLogoWhatsapp } from "react-icons/io";



export default function Confirm({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const [showRescheduleOptions, setShowRescheduleOptions] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [activity, setActivity] = useState("");
    const { schedule_id, patient_id } = searchParams
    const handleReschedule = () => {
        setActivity("suggesitons")
        // Lógica para mostrar os horários fictícios e permitir o usuário reagendar
        setShowRescheduleOptions(true);
    };

    const handleRescheduleOption = (date: string) => {
        setActivity("reschedule confirmed")
        // Lógica para reagendar para a data selecionada
        setSelectedDate(date);
    };

    const handleConfirm = () => {
        setActivity("confirmed")
        // Lógica para confirmar o agendamento
        // Exibir mensagem de saudação
    };
    const fakeSchedule = [
        "25/01/2024 - 10:30 - 10:45",
        "25/01/2024 - 11:00 - 11:15",
        "26/01/2024 - 09:30 - 09:45",
        "26/01/2024 - 10:00 - 10:15",
        "26/01/2024 - 11:30 - 11:45",
    ];

    return (
        <div className="w-screen h-screen bg-secondary">
            <div className="w-full h-20 fixed flex justify-center items-center bg-white shadow">
                <Image src={details.image} alt="logo" width={150} height={100} />
            </div>
            <div className="w-full h-full flex items-center">
                {schedule_id && patient_id ? (
                    <div className="w-[95%] mx-auto rounded-xl shadow py-6 flex flex-col bg-white items-center justify-center">
                        {
                            activity === "" && (
                                <div className="flex items-center justify-center flex-col">
                                    <h2>Olá Deyvid,</h2>
                                    <p className="text-center">
                                        Podemos confirmar o seu agendamento para a data de 25/01/2024, 10:00 - 10:15?
                                    </p>
                                    <div className="flex items-center gap-2 mt-4">
                                        <Button variant="outline" onClick={handleReschedule}>
                                            Não
                                        </Button>
                                        <Button onClick={handleConfirm}>Sim</Button>
                                    </div>
                                </div>
                            )
                        }
                        {
                            activity === "confirmed" && (
                                <div className="w-full justify-center items-center">
                                    <p className="text-center">
                                        Obrigado por confirmar o seu agendamento para a data de 25/01/2024, 10:00 - 10:15
                                    </p>
                                    <Image src="/ilustration.jpg" alt="ilustration" quality={100} className="mx-auto" width={200} height={200} />
                                </div>
                            )
                        }
                        {showRescheduleOptions && activity === "suggesitons" && (
                            <div className="mt-4">
                                <p>Escolha uma nova data para reagendar:</p>
                                <div className="flex flex-col gap-2 mt-2">
                                    {/* Renderizar horários fictícios */}
                                    {fakeSchedule.map((date) => (
                                        <Button key={date} onClick={() => handleRescheduleOption(date)}>
                                            {date}
                                        </Button>
                                    ))}
                                    <Button onClick={() => {
                                         setShowRescheduleOptions(false)
                                         setActivity("canceled")
                                    }}>
                                        Nenhuma dessas
                                    </Button>
                                </div>
                            </div>
                        )}
                        {/* Mensagem de confirmação ou agradecimento */}
                        {selectedDate && (
                            <div className="w-full text-center">
                                <h3>Agendamento reagendado com sucesso para {selectedDate}</h3>
                                <Image src="/ilustration.jpg" alt="ilustration" quality={100} className="mx-auto" width={200} height={200} />
                            </div>
                        )}
                        {
                            activity === "canceled" && (
                                <div className="w-full justify-center items-center">    
                                    <p className="text-center">
                                        Entraremos em contato com você para agendar um horário à sua escolha
                                    </p>
                                    <Image src="/ilustration.jpg" alt="ilustration" quality={100} className="mx-auto" width={200} height={200} />
                                </div>
                            )
                        }
                    </div>
                ) :
                    <div className="w-[95%] mx-auto rounded-xl text-xl font-bold text-primary  shadow py-6 flex flex-col bg-white items-center justify-center">
                        <p className="text-center">Você não está autorizado a acessar esta página</p>
                        <a className="mt-4" target="_blank" rel="noreferrer" href="https://api.whatsapp.com/send?phone=558195253396">
                            <Button className="gap-2 flex items-center">
                                <IoLogoWhatsapp />
                                entre em contato
                            </Button>
                        </a>
                    </div>

                }
            </div>
        </div>
    );
}

