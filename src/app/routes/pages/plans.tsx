import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { SketchPicker } from "react-color";
import { Brush, Search } from "lucide-react";
import { IoAdd } from "react-icons/io5";
import Cookies from "js-cookie";
import { TreatmentItem } from "@/components/treatment-item";
import { PlanCard } from "@/components/plan-card";
import { set } from "date-fns";

const list = [
    {
        id: "1",
        name: "Clareamento",
        description: "Descrição do clareamento",
        recurrence: "Recorrência do clareamento",
        price: 100.00,
        professionalId: "id_do_profissional",
        duration: "30",
        color: "#FFFFFF"
    },
    {
        id: "2",
        name: "Limpeza",
        description: "Descrição da limpeza",
        recurrence: "Recorrência da limpeza",
        price: 100.00,
        professionalId: "id_do_profissional",
        duration: "30",
        color: "#FFFFFF"
    },
    {
        id: "3",
        name: "Obturação",
        description: "Descrição da obturação",
        recurrence: "Recorrência da obturação",
        price: 100.00,
        professionalId: "id_do_profissional",
        duration: "30",
        color: "#FFFFFF"
    },
    {
        id: "4",
        name: "Cirurgia",
        description: "Descrição da cirurgia",
        recurrence: "Recorrência da cirurgia",
        price: 100.00,
        professionalId: "id_do_profissional",
        duration: "30",
        color: "#FFFFFF"
    },
    {
        id: "5",
        name: "Ortodontia",
        description: "Descrição da ortodontia",
        recurrence: "Recorrência da ortodontia",
        price: 100.00,
        professionalId: "id_do_profissional",
        duration: "30",
        color: "#FFFFFF"
    },
    {
        id: "6",
        name: "Extração",
        description: "Descrição da extração",
        recurrence: "Recorrência da extração",
        price: 100.00,
        professionalId: "id_do_profissional",
        duration: "30",
        color: "#FFFFFF"
    }
];

interface OrthodonticPlanProps {
    id: string;
    name: string;
    description: string;
    price: number;
}

export function Plans() {
    const router = useRouter();
    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
        }
    }, []);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [durationMonths, setDurationMonths] = useState(0);
    const [procedures, setProcedures] = useState<{
        id: string;
        name: string;
        description: string;
        recurrence: string;
        price: number;
        professionalId: string;
        duration: string;
        color: string;
    }[]>(list);
    const [proceduresByPlan, setProceduresByPlan] = useState<any[]>([]);
    const [openRegister, setOpenRegister] = useState(false);
    const [edit, setEdit] = useState(false);
    const [currentPlanSelected, setCurrentPlanSelected] = useState<any>({});
    const [orthodonticPlans, setOrthodonticPlans] = useState<OrthodonticPlanProps[]>([]);
    const [search, setSearch] = useState("");
    const [openTreatmentModal, setOpenTreatmentModal] = useState(false);

    const plans = [
        {
            id: "1",
            name: "unimed"
        },
        {
            id: "2",
            name: "Amil"
        },
        {
            id: "3",
            name: "Santander"
        }
    ]
    console.log({proceduresByPlan, procedures});

    function addIsActiveInProcudure(){
        procedures.map((procedure) => {
         return setProceduresByPlan([...proceduresByPlan, {...procedure, isActive: "S"}]);
        })
    }

    useEffect(() => {
        addIsActiveInProcudure()
    },[])

    function clearFields() {
        setName("");
        setDescription("");
        setPrice(0);
        setDurationMonths(0);
        setProcedures([]);
        setEdit(false);
    }

    async function registerPlan() {
        // Adicione aqui a lógica para validar os campos obrigatórios

        clearFields();
        try {
            // Lógica para registrar o plano ortodôntico
            toast.success("Plano ortodôntico registrado com sucesso");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao registrar o plano ortodôntico");
        } finally {
            clearFields();
            setOpenRegister(false);
            console.log(proceduresByPlan);
        }
    }

    async function updatePlan(plan: OrthodonticPlanProps) {
        // Adicione aqui a lógica para validar os campos obrigatórios

        try {
            // Lógica para atualizar o plano ortodôntico
            toast.success("Plano ortodôntico editado com sucesso");
        } catch (error) {
            toast.error("Erro ao editar o plano ortodôntico");
            console.error(error);
        } finally {
            setOpenRegister(false);
        }
    }

    async function deletePlan(plan: OrthodonticPlanProps) {
        try {

            toast.success("Plano ortodôntico excluído com sucesso");
        } catch (error) {
            toast.error("Erro ao excluir o plano ortodôntico");
            console.error(error);
        } finally {
            setOpenRegister(false);
        }
    }
    return (
        <div className="px-4 mt-2 w-full">
            <Toaster richColors position="bottom-right" />
            <h2 className="text-primary font-bold text-xl">Planos Ortodônticos</h2>
            {/* Input de pesquisa */}
            <div className="flex w-96 mt-4  justify-end items-center">
                <input
                    placeholder="Filtre por nome..."
                    className=" rounded-full h-10 w-full border px-4"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="relative text-zinc-400  right-8" />
            </div>
            {/* Diálogo para registro e edição de planos ortodônticos */}
            <Dialog open={openRegister} onOpenChange={setOpenRegister}>
                <DialogTrigger className="mt-4 md:mt-5 px-14 py-2 bg-green-400 flex items-center gap-2 rounded-full  text-white font-semibold hover:bg-green-600  duration-500">
                    <IoAdd />
                    Cadastrar novo
                </DialogTrigger>
                <DialogContent className="max-w-[700px] flex flex-col items-center">
                    <DialogHeader className="text-primary font-bold text-xl">
                        {edit ? "Editar plano ortodôntico" : "Cadastrar novo plano ortodôntico"}
                    </DialogHeader>
                    <DialogDescription className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-primary">
                                Nome
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-full px-4 text-black  border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium leading-6 text-primary">
                                Duração (meses)
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-full px-4 text-black  border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    type="number"
                                    id="duration"
                                    value={durationMonths}
                                    onChange={(e) => setDurationMonths(Number(e.target.value))} />
                            </div>
                        </div>

                    </DialogDescription>

                    <DialogFooter className="flex gap-4">
                        <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => {
                                clearFields();
                                setOpenRegister(false);
                            }}>
                            Cancelar
                        </Button>
                        <Button
                            className="rounded-full"
                            onClick={() => {
                                if (edit) {
                                    updatePlan(currentPlanSelected);
                                } else {
                                    setOpenTreatmentModal(true);
                                }
                            }}>
                            Cadastrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={openTreatmentModal} onOpenChange={setOpenTreatmentModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Lista de tratamentos para o plano</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="max-h-[500px]">
                        <div className="max-h-[400px] overflow-y-scroll ">
                            {list.map((procedure, index) => {
                                const active = proceduresByPlan.find((p) => p.id === procedure.id)?.isActive;
                                const selectedPrice = proceduresByPlan.find((p) => p.id === procedure.id)?.price;
                                return (
                                    <TreatmentItem
                                        isActive={active}
                                        key={index}
                                        name={procedure.name}
                                        id={procedure.id}
                                        setPrice={(e: number) => {
                                            const procedureSelected = proceduresByPlan.find((p) => p.id === procedure.id);
                                            if (procedureSelected) {
                                                setProceduresByPlan([...proceduresByPlan.filter((p) => p.id !== procedure.id), { ...procedureSelected, price: Number(e) }]);
                                            }
                                        }}
                                        price={selectedPrice}
                                        setIsActive={() => {
                                            const procedureSelected = proceduresByPlan.find((p) => p.id === procedure.id);
                                            if (procedureSelected) {
                                                setProceduresByPlan([...proceduresByPlan.filter((p) => p.id !== procedure.id), { ...procedureSelected, isActive: procedureSelected.isActive === "S" ? "N" : "S" }]);
                                            }
                                        }}
                                    />
                                )
                            })}
                        </div>
                    </DialogDescription>
                    <div className="flex gap-4 w-full justify-center">
                        <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => {
                                setOpenTreatmentModal(false);
                            }}>
                            Fechar
                        </Button>
                        <Button
                            className="rounded-full"
                            onClick={() => {
                                setOpenTreatmentModal(false);
                                setOpenRegister(false);
                                registerPlan();
                            }}
                        >
                            Cadastrar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="grid grid-cols-4 mt-4 w-full">
                {plans && plans.map((plan, index) => (
                    <PlanCard key={index} name={plan.name} onDelete={() => { }} onEdit={() => { }} />
                ))}
            </div>
        </div>
    );
}
