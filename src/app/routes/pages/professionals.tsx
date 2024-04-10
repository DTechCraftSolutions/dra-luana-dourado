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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCheck, FaTrash } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ProfessionalProps {
  name: string;
  email: string;
  office: string;
  CRO: string;
}
export function Professionals() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const [office, setOffice] = useState("");
  const [CRO, setCRO] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [professionals, setProfessionals] = useState<ProfessionalProps[]>([]);
  const [selectedProfessional, setSelectedProfessional] =
    useState<ProfessionalProps | null>(null);
  const [editing, setEditing] = useState(false);
  const [editingProfessionalCredentials, setEditingProfessionalCredentials] =
    useState<ProfessionalProps>({
      name: "",
      email: "",
      office: "",
      CRO: "",
    });

  async function registerProfessional() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register-professionals`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/find-all-professionals`
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
      {!selectedProfessional && (
        <>
          <h2 className="text-primary text-xl mt-4">
            Profissionais cadastrados
          </h2>
          <p className="mt-4">Selecione um para mais detalhes</p>
          <div className="flex flex-col gap-2 mt-4">
            {professionals &&
              professionals.map((professional, index) => (
                <button onClick={() => setSelectedProfessional(professional)}>
                  <RegisteredProfessionals
                    key={index}
                    name={professional.name}
                    job={
                      professional.office === "DENTIST"
                        ? "Dentista"
                        : "Secretaria"
                    }
                  />
                </button>
              ))}
          </div>
        </>
      )}
      {selectedProfessional && (
        <div>
          <div className="flex items-center mt-4 gap-2">
            <IoArrowBack
              onClick={() => {
                setSelectedProfessional(null);
                setEditing(false);
              }}
              className="text-primary text-2xl p-1 hover:bg-primary hover:rounded-full cursor-pointer hover:duration-500 hover:ease-in-out hover:transform hover:opacity-30 hover:text-white"
            />
            <h2 className="text-primary text-lg m font-semibold">
              {selectedProfessional.name}
            </h2>
          </div>
          <Table>
            <TableCaption>Informações do profissional</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Nome</TableHead>
                <TableHead>Profissão</TableHead>
                <TableHead>CRO</TableHead>
                <TableHead className="text-right pr-40">Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!editing && (
                <TableRow>
                  <TableCell className="">
                    {selectedProfessional.name}
                  </TableCell>
                  <TableCell>
                    {selectedProfessional.office === "DENTIST"
                      ? "Dentista"
                      : "Secretaria"}
                  </TableCell>
                  <TableCell>
                    {selectedProfessional.CRO || "Não consta"}
                  </TableCell>
                  <TableCell className="text-right ">
                    {selectedProfessional.email}
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Dialog>
                      <DialogTrigger>
                        <Button className="rounded-full text-red-500" variant={"outline"}>
                          <FaTrash />
                          Remover
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Tem certeza que deseja remover o profissional?
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center justify-center gap-2 mt-4">
                          <DialogClose>
                            <Button className="rounded-full" variant={"outline"}>Cancelar</Button>
                          </DialogClose>
                          <Button className="rounded-full" variant={"destructive"}
                          >
                            <FaTrash />
                            Remover
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <button
                      onClick={() => {
                        setEditing(true);
                        setEditingProfessionalCredentials({
                          name: selectedProfessional.name,
                          office: selectedProfessional.office,
                          CRO: selectedProfessional.CRO,
                          email: selectedProfessional.email,
                        });
                      }}
                      className="bg-primary px-5 flex items-center  text-white rounded-full py-1 jsutify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out"
                    >
                      <FaEdit />
                      Editar
                    </button>
                  </TableCell>
                </TableRow>
              )}
              {editing && (
                <TableRow>
                  <TableCell className="">
                    <input
                      type="text"
                      onChange={(e) =>
                        setEditingProfessionalCredentials({
                          ...editingProfessionalCredentials,
                          name: e.target.value,
                        })
                      }
                      value={editingProfessionalCredentials.name}
                      className="w-56 h-10 rounded-full px-4 border border-primary"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={editingProfessionalCredentials.office}
                      onValueChange={(e) =>
                        setEditingProfessionalCredentials({
                          ...editingProfessionalCredentials,
                          office: e,
                        })
                      }
                    >
                      <SelectTrigger className="w-56 h-10 rounded-full px-4 border border-primary">
                        <SelectValue
                          placeholder={editingProfessionalCredentials.office}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SECRETARY">Secretaria</SelectItem>
                        <SelectItem value="DENTIST">Dentista</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {editingProfessionalCredentials.office === "DENTIST" ? (
                      <input
                        type="text"
                        onChange={(e) =>
                          setEditingProfessionalCredentials({
                            ...editingProfessionalCredentials,
                            CRO: e.target.value,
                          })
                        }
                        value={editingProfessionalCredentials.CRO}
                        className="w-56 h-10 rounded-full px-4 border border-primary"
                      />
                    ) : (
                      "Não consta"
                    )}
                  </TableCell>
                  <TableCell className="text-right ">
                    <input
                      type="text"
                      onChange={(e) =>
                        setEditingProfessionalCredentials({
                          ...editingProfessionalCredentials,
                          email: e.target.value,
                        })
                      }
                      value={editingProfessionalCredentials.email}
                      className="w-56 h-10 rounded-full px-4 border border-primary"
                    />
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <button
                      onClick={() => {
                        setEditing(false);
                      }}
                      className="bg-zinc-300 px-5 mr-2  flex items-center  text-primary rounded-full py-2 jsutify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out"
                    >
                      <IoClose />
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                      }}
                      className="bg-primary px-5  flex items-center  text-white rounded-full py-2 jsutify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out"
                    >
                      <FaCheck />
                    </button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
