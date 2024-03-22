import React, { useEffect, useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface ProcedureCardProps {
  id: string;
  procedure: string;
  time: string;
  professionalId: string;
  color: string;
  price: number;
  setEdit: (value: boolean) => void;
  onEditProcedure: (id: string) => any;
  onDeleteProcedure: (id: string) => any;
  getNameProfessional: (id: string) => Promise<string>;
}

export function ProcedureCard({
  id,
  procedure,
  time,
  professionalId,
  color,
  price,
  getNameProfessional,
  onEditProcedure,
  onDeleteProcedure,
  setEdit,
}: ProcedureCardProps) {
  const [professionalName, setProfessionalName] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    const fetchProfessionalName = async () => {
      try {
        const name = await getNameProfessional(professionalId);
        setProfessionalName(name);
      } catch (error) {
        console.error("Error fetching professional name:", error);
      }
    };

    fetchProfessionalName();
  }, [professionalId, getNameProfessional]);

  function onEdit() {
    setEdit(true);
    onEditProcedure(id);
  }

  return (
    <div className="w-72 h-36 shadow-md rounded-3xl p-4 bg-white">
      <div className="flex items-center mb-5 justify-between">
        <h2 className="font-bold text-primary">{procedure}</h2>
        <div
          style={{ backgroundColor: color }}
          className="w-20 h-5 rounded-t-lg rounded-tl-none"
        />
      </div>
      <div className="flex justify-between items-end">
        <div>
          <p>
            <span className="font-semibold mr-1">Profissional:</span>
            {professionalName}
          </p>
          <p>
            <span className="font-semibold mr-1">Tempo estimado:</span>
            {time} min
          </p>
          <p>
            <span className="font-semibold mr-1">Preço:</span> R$
            {String(price.toFixed(2)).replace(".", ",")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit()}
            className="flex items-center gap-2 text-primary hover:bg-primary hover:text-white hover:duration-500 hover:ease-in-out hover:transform hover:rounded"
          >
            <IoPencil />
          </button>
          <button
            onClick={() => setDeleteModal(true)}
            className="flex items-center gap-2 text-red-500 hover:bg-red-500 hover:text-white hover:duration-500 hover:ease-in-out hover:transform hover:rounded"
          >
            <IoTrash />
          </button>
        </div>
      </div>
      <Dialog open={deleteModal} onOpenChange={setDeleteModal} modal>
        <DialogContent>

          <p className="text-center text-sm ">
            Tem certeza que deseja deletar este procedimento?
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <Button
            className="rounded-full"
              onClick={() => onDeleteProcedure(id)}
             variant={"destructive"}
            >
              Deletar
            </Button>
            <Button
            className="rounded-full"
              variant={"outline"}
              onClick={() => setDeleteModal(false)}
            >
              Cancelar
            </Button>
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
}
