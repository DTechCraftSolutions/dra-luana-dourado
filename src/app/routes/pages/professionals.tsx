import { RegisteredProfessionals } from "@/components/registered-professionals";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Toaster, toast } from "sonner";

interface ProfessionalProps {
  name: string;
  email: string;
  office: string;
  CRO: string;
}
export function Professionals() {
  const [office, setOffice] = useState("");
  const [CRO, setCRO] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [professionals, setProfessionals] = useState<ProfessionalProps[]>([]);

  async function registerProfessional() {
    try {
      const response = await fetch(
        "http://localhost:3333/register-professionals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            office,
            CRO: CRO === "" ? undefined : CRO,
            password,
          }),
        }
      );
      toast.success("Profissional registrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao registrar o profissional");
      console.error("Error registering professional:", error);
    } finally {
      setName("");
      setEmail("");
      setOffice("");
      setCRO("");
      setPassword("");
      getProfessionals();
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
  useEffect(() => {
    getProfessionals();
  }, []);
  return (
    <div className="w-full px-4 mt-2">
      <Toaster position="bottom-right" richColors />
      <h2 className="text-primary font-bold text-xl">Profissionais</h2>
      <Dialog>
        <DialogTrigger className="mt-4 md:mt-10 px-14 py-2 bg-green-600 flex items-center gap-2 rounded-full  text-white font-semibold hover:opacity-90 transition-opacity duration-300">
          <IoMdAdd />
          Cadastrar novo
        </DialogTrigger>
        <DialogContent className="max-w-[700px] flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="mx-auto text-primary">
              Novo Profissional
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label htmlFor="">Nome do profissional</label>
              <input
                className="w-56 h-10 rounded-full px-4 border border-primary"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Cargo</label>
              <Select onValueChange={setOffice}>
                <SelectTrigger className="w-56 h-10 rounded-full px-4 border border-primary">
                  <SelectValue placeholder="Escolha a ocupação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SECRETARY">Secretaria</SelectItem>
                  <SelectItem value="DENTIST">Dentista</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {office === "DENTIST" && (
              <div className="flex flex-col">
                <label htmlFor="">CRO</label>
                <input
                  className="w-56 h-10 rounded-full px-4 border border-primary"
                  type="text"
                  onChange={(e) => setCRO(e.target.value)}
                />
              </div>
            )}
            <div className="flex flex-col">
              <label htmlFor="">E-mail</label>
              <input
                className="w-56 h-10 rounded-full px-4 border border-primary"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Senha</label>
              <input
                className="w-56 h-10 rounded-full px-4 border border-primary"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose>
              <button className="mt-4 md:mt-10 px-14 py-2 bg-secondary border border-primary flex items-center gap-2 rounded-full  text-primary font-semibold hover:opacity-90 transition-opacity duration-300">
                Cancelar
              </button>
            </DialogClose>
            <DialogClose>
              <button
                onClick={registerProfessional}
                className="mt-4 md:mt-10 px-14 py-2 bg-primary flex items-center gap-2 rounded-full  text-white font-semibold hover:opacity-90 transition-opacity duration-300"
              >
                Cadastrar
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h2 className="text-primary text-xl mt-4">Profissionais cadastrados</h2>
      <p className="mt-4">Selecione um para mais detalhes</p>
      <div className="flex flex-col gap-2 mt-4">
        {professionals &&
          professionals.map((professional, index) => (
            <RegisteredProfessionals
              key={index}
              name={professional.name}
              job={
                professional.office === "DENTIST" ? "Dentista" : "Secretaria"
              }
            />
          ))}
      </div>
    </div>
  );
}
