import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { IoAdd } from "react-icons/io5";
import { TreatmentItem } from "@/components/treatment-item";
import { PlanCard } from "@/components/plan-card";

interface OrthodonticPlanProps {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ProcedureProps {
  id: string;
  name: string;
  description: string;
  recurrence: string;
  price: number;
  professionalId: string;
  duration: string;
  active: string;
  color: string;
}
export function Plans() {
  const [planRegistredId, setPlanRegistredId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [active, setActive] = useState("N");
  const [actualizedProcedure, setActualizedProcedure] = useState<any>({
    price: 0,
    name: "",
    active: "",
  });
  const [durationMonths, setDurationMonths] = useState(0);
  const [plans, setPlans] = useState<any>([]);
  const [procedures, setProcedures] = useState<ProcedureProps[]>([]);
  const [proceduresByPlan, setProceduresByPlan] = useState<
    ProcedureProps[] | any
  >([
    {
      name: "",
      description: "",
      recurrence: "",
      price: 0,
      professionalId: "",
      duration: "",
      active: "",
      color: "",
    },
  ]);
  const [openRegister, setOpenRegister] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentPlanSelected, setCurrentPlanSelected] = useState<any>({});
  const [search, setSearch] = useState("");
  const [openTreatmentModal, setOpenTreatmentModal] = useState(false);

  async function getAllPlans() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-all-plans`
      );
      const data = await response.json();
      setPlans(data.plans);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllProcedures() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-all-procedures`
      );
      const data = await response.json();
      setProcedures(data.procedures);
    } catch (error) {
      console.error(error);
    }
  }

  function clearFields() {
    setName("");
    setDurationMonths(0);
    setProcedures([]);
    setEdit(false);
  }

  async function registerPlan() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register-plan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            duration: durationMonths,
          }),
        }
      );
      toast.success("Plano ortodôntico registrado com sucesso");
      const data = await response.json();
      setPlanRegistredId(data.id);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao registrar o plano ortodôntico");
    } finally {
      getAllPlans();
      setOpenRegister(false);
    }
  }

  async function registerProcedurePlan() {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register-procedure-plan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            procedures: proceduresByPlan,
          }),
        }
      );
      toast.success("Procedimento do plano registrado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao registrar o procedimento do plano");
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

  useEffect(() => {
    getAllProcedures();
    getAllPlans();
  }, []);

  useEffect(() => {
    if (procedures.length > 0) {
      const updatedProcedures = procedures.map(({ id, ...rest }) => ({
        ...rest,
        active: "N",
        planId: planRegistredId,
      }));
      setProceduresByPlan(updatedProcedures);
    }
  }, [procedures, planRegistredId]);

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
          disabled={plans.length === 0 ? true : false}
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
            {edit
              ? "Editar plano ortodôntico"
              : "Cadastrar novo plano ortodôntico"}
          </DialogHeader>
          <DialogDescription className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-primary"
              >
                Nome
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-full px-4 text-black  border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium leading-6 text-primary"
              >
                Duração (meses)
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-full px-4 text-black  border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  type="number"
                  id="duration"
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(Number(e.target.value))}
                />
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
              }}
            >
              Cancelar
            </Button>
            <Button
              className="rounded-full"
              onClick={() => {
                if (edit) {
                  updatePlan(currentPlanSelected);
                } else {
                  setOpenTreatmentModal(true);
                  registerPlan();
                }
              }}
            >
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
              {procedures.map((procedure, index) => {
                const priceProcedure = procedure.price;
                return (
                  <TreatmentItem
                    isActive={active}
                    setActive={setActive}
                    setProcedureUpdate={setActualizedProcedure as any}
                    updateProcedure={actualizedProcedure}
                    key={index}
                    name={procedure.name}
                    price={price}
                    priceProcedure={priceProcedure}
                    procedureByPlan={proceduresByPlan}
                    setProcedureByPlan={setProceduresByPlan}
                    setPrice={setPrice}
                  />
                );
              })}
            </div>
          </DialogDescription>
          <div className="flex gap-4 w-full justify-center">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                setOpenTreatmentModal(false);
                setOpenRegister(false);
              }}
            >
              Fechar
            </Button>
            <Button
              className="rounded-full"
              onClick={() => {
                setOpenTreatmentModal(false);
                setOpenRegister(false);
                registerProcedurePlan();
              }}
            >
              Cadastrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-4 mt-4 w-full">
        {plans.length === 0 ? (
          <div className=" text-primary">Nenhum plano disponível.</div>
        ) : (
          plans
            .filter((plan: any) => {
              const planNameMatch =
                search === "" ||
                plan.name.toLowerCase().includes(search.toLowerCase());
              return planNameMatch;
            })
            .map((plan: any) => (
              <PlanCard
                key={plan.id}
                name={plan.name}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))
        )}
        {plans.filter((plan: any) => {
          const planNameMatch =
            search === "" ||
            plan.name.toLowerCase().includes(search.toLowerCase());
          return planNameMatch;
        }).length === 0 &&
          search !== "" && (
            <div className=" text-primary">
              Nenhum plano encontrado para "{search}".
            </div>
          )}
      </div>
    </div>
  );
}
