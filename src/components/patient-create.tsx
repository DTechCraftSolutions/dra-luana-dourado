import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import {
  Controller,
  FormState,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const patientSchema = z.object({
  nome: z.string().min(3, { message: "Informe o Nome" }).max(50),
  numero: z.string().min(1, { message: "Informe o Número" }),
  logradouro: z.string().min(3, { message: "Informe o Logradouro" }),
  sexo: z.enum(["male", "female"]),
});

type PatientSchema = z.infer<typeof patientSchema>;

export function PatientCreate() {
  const { register, handleSubmit, formState, control } = useForm<PatientSchema>(
    {
      resolver: zodResolver(patientSchema),
      defaultValues: {
        sexo: "male",
        nome: "kkkk",
      },
    }
  );

  const [openDialog, setOpenDialog] = useState(false);

  //TODO: implement handleCreatePatient
  async function handleCreatePatient(data: PatientSchema) {
    console.log(data);
    // setOpenDialog(false);
  }

  return (
    <div className="w-full flex mt-4 mb-4" onClick={() => {}}>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="mt-4 md:mt-0 px-14 py-2 bg-green-600 rounded-full text-white font-semibold hover:opacity-90 transition-opacity duration-300">
          Cadastrar novo
        </DialogTrigger>
        <DialogContent className="min-w-[80%]">
          <DialogHeader>
            <DialogTitle className="mx-auto text-primary">
              Cadastar novo paciente
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <form onSubmit={handleSubmit(handleCreatePatient)}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <PatientTextInput
                  name="nome"
                  label="Nome"
                  formState={formState}
                  register={register}
                />
                <PatientTextInput
                  name="numero"
                  label="Número"
                  formState={formState}
                  register={register}
                />
                <PatientTextInput
                  name="logradouro"
                  label="Rua"
                  formState={formState}
                  register={register}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                <div>
                  <label className="text-primary font-bold ml-2" htmlFor="sexo">
                    Sexo
                  </label>
                  <Controller
                    name="sexo"
                    control={control}
                    defaultValue="male"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        className="flex"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <label htmlFor="male">Masculino</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                        </div>
                        <label htmlFor="female">Feminino</label>
                      </RadioGroup>
                    )}
                  />
                  <p className="text-red-500 text-xs ml-2">
                    {formState.errors.sexo?.message}
                  </p>
                </div>
              </div>

              <div className="w-full flex justify-center gap-5 mt-10">
                <button
                  onClick={() => {}}
                  className="bg-gray-300 text-primary px-2 py-2 rounded-full hover:bg-gray-400 transition-colors w-40 gap-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-2 py-2 rounded-full hover:bg-blue-600 transition-colors w-40 gap-2"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PatientTextInput({
  name,
  label,
  formState,
  register,
}: {
  name: keyof PatientSchema;
  label: string;
  formState: FormState<PatientSchema>;
  register: UseFormRegister<PatientSchema>;
}) {
  return (
    <div>
      <label className="text-primary font-bold ml-2" htmlFor={name}>
        {label}
      </label>
      <Input className="rounded-full border-primary" {...register(name)} />
      <p className="text-red-500 text-xs ml-2">
        {formState.errors[name]?.message}
      </p>
    </div>
  );
}
