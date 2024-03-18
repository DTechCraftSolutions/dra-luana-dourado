"use client";
import { ProcedureCard } from "@/components/procedure-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brush, Search } from "lucide-react";
import { IoAdd } from "react-icons/io5";
import { SketchPicker } from "react-color";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ProfessionalProps {
  id: string;
  name: string;
  email: string;
  office: string;
  CRO: string;
}

interface ProcedureProps {
  id: string;
  name: string;
  description: string;
  recurrence: string;
  price: number;
  professionalId: string;
  duration: string;
  color: string;
}

export function Procedures() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const [color, setColor] = useState("");
  const [currentProcedure, setCurrentProcedure] = useState("");
  const [timeToRegister, setTimeToRegister] = useState("");
  const [professionalToRegister, setProfessionalToRegister] = useState("");
  const [priceToRegister, setPriceToRegister] = useState(0);
  const [nameToRegister, setNameToRegister] = useState("");
  const [descriptionToRegister, setDescriptionToRegister] = useState("");
  const [openRegister, setOpenRegister] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentProcedureSelected, setCurrentProcedureSelected] = useState<any>(
    []
  );
  const [professionals, setProfessionals] = useState<ProfessionalProps[]>([]);
  const [procedures, setProcedures] = useState<ProcedureProps[]>([]);
  const [search, setSearch] = useState("");
  function onEditProcedure(procedure: ProcedureProps) {
    setNameToRegister(procedure.name);
    setDescriptionToRegister(procedure.description);
    setPriceToRegister(procedure.price);
    setProfessionalToRegister(procedure.professionalId);
    setTimeToRegister(procedure.duration);
    setCurrentProcedure(procedure.recurrence);
    setColor(procedure.color);
    setOpenRegister(true);
    setCurrentProcedureSelected(procedure);
  }
  async function updateProcedure(procedure: ProcedureProps) {
    try {
      await fetch("http://localhost:3333/update-procedure", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: procedure.id,
          name: nameToRegister,
          description: descriptionToRegister,
          recurrence: currentProcedure,
          price: priceToRegister,
          professionalId: professionalToRegister,
          duration: timeToRegister,
          color,
        }),
      });
      toast.success("Procedimento editado com sucesso");
    } catch (error) {
      toast.error("Erro ao editar o procedimento");
      console.error(error);
    } finally {
      getProcedures();
      getProfessionals();
      setOpenRegister(false);
    }
  }
  async function onDeleteProcedure(procedure: ProcedureProps) {
    try {
      await fetch("http://localhost:3333/delete-procedure", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: procedure.id,
        }),
      });
      toast.success("Procedimento excluido com sucesso");
    } catch (error) {
      toast.error("Erro ao excluir o procedimento");
      console.error(error);
    } finally {
      getProcedures();
      getProfessionals();
      setOpenRegister(false);
    }
  }

  function clearFields() {
    setNameToRegister("");
    setDescriptionToRegister("");
    setPriceToRegister(0);
    setProfessionalToRegister("");
    setTimeToRegister("");
    setColor("");
    setEdit(false);
  }
  async function registerProcedure() {
    clearFields();
    try {
      await fetch("http://localhost:3333/register-procedure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameToRegister,
          description: descriptionToRegister,
          recurrence: currentProcedure,
          price: priceToRegister,
          professionalId: professionalToRegister,
          duration: timeToRegister,
          color,
        }),
      });
      toast.success("Procedimento registrado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao registrar o procedimento");
    } finally {
      clearFields();
      window.location.reload();
    }
  }
  async function getProfessionals() {
    try {
      const response = await fetch(
        "http://localhost:3333/find-all-professionals"
      );
      const data = await response.json();
      setProfessionals(data.professionals);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  }

  async function getProcedures() {
    try {
      const response = await fetch("http://localhost:3333/find-all-procedures");
      const data = await response.json();
      setProcedures(data.procedures);
    } catch (error) {
      console.error(error);
    }
  }
  async function getNameProfessional(id: string) {
    try {
      const response = await fetch(
        "http://localhost:3333/find-by-name-professionals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );
      const data = await response.json();
      return data.professionals.name;
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  }
  useEffect(() => {
    getProfessionals();
    getProcedures();
  }, []);

  useEffect(() => {
    if (openRegister && edit === false) {
      clearFields();
    }
    if (openRegister == false) {
      clearFields();
    }
  }, [openRegister]);

  return (
    <div className="px-4 mt-2 w-full">
      <Toaster richColors position="bottom-right" />
      <h2 className="text-primary font-bold text-xl">Procedimentos</h2>
      <div className="flex w-96 mt-4  justify-end items-center">
        <input
          placeholder="Filtre por nome..."
          className=" rounded-full h-10 w-full border px-4"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="relative text-zinc-400  right-8" />
      </div>
      <Dialog open={openRegister} onOpenChange={setOpenRegister}>
        <DialogTrigger className="mt-4 md:mt-5 px-14 py-2 bg-green-600 flex items-center gap-2 rounded-full  text-white font-semibold hover:opacity-90 transition-opacity duration-300">
          <IoAdd />
          Cadastrar novo
        </DialogTrigger>
        <DialogContent className="max-w-[700px] flex flex-col items-center">
          <DialogHeader>
            {!edit ? (
              <DialogTitle className="mx-auto text-primary">
                Novo procedimento
              </DialogTitle>
            ) : (
              <DialogTitle className="mx-auto text-primary">
                Editar procedimento
              </DialogTitle>
            )}
          </DialogHeader>
          <DialogDescription className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <label className="text-primary font-bold">
                Nome do procedimento
              </label>
              <input
                onChange={(e) => setNameToRegister(e.target.value)}
                value={nameToRegister}
                type="text"
                placeholder="Nome do procedimento"
                className="w-full rounded-full border border-primary bg-transparent px-4 py-2 focus:outline-none "
              />
            </div>
            <div>
              <label className="text-primary font-bold">Valor</label>
              <input
                onChange={(e) => setPriceToRegister(Number(e.target.value))}
                value={priceToRegister}
                type="text"
                placeholder="Valor"
                className="w-full rounded-full border border-primary bg-transparent px-4 py-2 focus:outline-none "
              />
            </div>
            <div>
              <label className="text-primary font-bold">Duração</label>
              <input
                onChange={(e) => setTimeToRegister(e.target.value)}
                value={timeToRegister}
                type="text"
                placeholder="Duração em minutos"
                className="w-full rounded-full border border-primary bg-transparent px-4 py-2 focus:outline-none "
              />
            </div>
            <div>
              <label className="text-primary font-bold">Profissional</label>
              <Select
                onValueChange={(e) => setProfessionalToRegister(e)}
                value={professionalToRegister}
              >
                <SelectTrigger className="w-full bg-primary text-start text-white md:w-[180px] rounded-full">
                  <SelectValue placeholder="Escolha o profissional" />
                </SelectTrigger>
                <SelectContent>
                  {professionals.map((professional) => (
                    <SelectItem key={professional.id} value={professional.id}>
                      {professional.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-primary font-bold">Têm recorrência?</label>
              <Select
                onValueChange={(e) => setCurrentProcedure(e)}
                value={currentProcedure}
              >
                <SelectTrigger className="w-full bg-primary text-white md:w-[180px] rounded-full">
                  <SelectValue placeholder="Escolha a opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sim">Não</SelectItem>
                  <SelectItem value="não">Sim</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-primary font-bold">Cor</label>
              <Dialog>
                <DialogTrigger className="w-full h-10 flex justify-between items-center rounded-full border border-primary bg-transparent px-4 py-2 focus:outline-none ">
                  {color !== "" ? (
                    <span
                      style={{ backgroundColor: color }}
                      className="w-6 h-6"
                    />
                  ) : (
                    <p>Escolha uma cor</p>
                  )}
                  <Brush className="w-6 h-6" />
                </DialogTrigger>
                <DialogContent className="overflow-y-scroll">
                  <DialogHeader>
                    <DialogTitle className="mx-auto text-primary">
                      Selecione a cor
                    </DialogTitle>
                  </DialogHeader>
                  <SketchPicker
                    className="mx-auto"
                    color={color}
                    onChange={(color) => setColor(color.hex)}
                  />
                  <DialogClose className=" justify-center py-1 w-32 mx-auto bg-primary flex items-center gap-2 rounded-full  text-white hover:opacity-90 transition-opacity duration-300">
                    Confirmar
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
            <div className="col-span-2">
              <label className="text-primary font-bold">Descrição</label>
              <textarea
                onChange={(e) => setDescriptionToRegister(e.target.value)}
                value={descriptionToRegister}
                placeholder="Descreva o procedimento"
                className="w-full rounded-lg border text-black border-primary bg-transparent h-28 px-2 py-2 focus:outline-none "
              />
            </div>
          </DialogDescription>
          <DialogFooter className="flex gap-4">
            <DialogClose
              onClick={() => clearFields()}
              className=" justify-center py-1 w-32 mx-auto bg-zinc-300 flex items-center gap-2 rounded-full  text-primary hover:opacity-90 transition-opacity duration-300"
            >
              Cancelar
            </DialogClose>
            {!edit ? (
              <Button
                onClick={() => registerProcedure()}
                className=" justify-center py-1 w-32 mx-auto bg-primary flex items-center gap-2 rounded-full  text-white hover:opacity-90 transition-opacity duration-300"
              >
                Confirmar
              </Button>
            ) : (
              <Button
                onClick={() => updateProcedure(currentProcedureSelected)}
                className=" justify-center py-1 w-32 mx-auto bg-primary flex items-center gap-2 rounded-full  text-white hover:opacity-90 transition-opacity duration-300"
              >
                Editar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-4 mt-4 w-full">
        {procedures.length > 0 ? (
          procedures.filter((procedure) =>
            procedure.name.toLowerCase().includes(search.trim().toLowerCase())
          ).length > 0 ? (
            procedures
              .filter((procedure) =>
                procedure.name
                  .toLowerCase()
                  .includes(search.trim().toLowerCase())
              )
              .map((procedure) => (
                <ProcedureCard
                  setEdit={setEdit}
                  key={procedure.id}
                  id={procedure.id}
                  procedure={procedure.name}
                  color={procedure.color}
                  getNameProfessional={getNameProfessional}
                  price={procedure.price}
                  professionalId={procedure.professionalId}
                  time={procedure.duration}
                  onEditProcedure={() => onEditProcedure(procedure)}
                  onDeleteProcedure={() => onDeleteProcedure(procedure)}
                />
              ))
          ) : (
            <p className="text-primary">
              Nenhum resultado encontrado para "{search}"
            </p>
          )
        ) : (
          <p className="text-primary">
            Nenhum procedimento cadastrado no momento...
          </p>
        )}
      </div>
    </div>
  );
}
