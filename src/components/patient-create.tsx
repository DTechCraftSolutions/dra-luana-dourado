import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import React, { FormEvent, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "./input-mask";
import { InputText } from "./input-text";
import { SelectInput } from "./input-select";
import {
  brazilianStates,
  removeSpecialChars,
  validarCpf,
  validatePhoneNumber,
} from "@/lib/utils";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toaster, toast } from "sonner";

// Interface Patient definida anteriormente
interface Patient {
  birth_date: string;
  cep: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  road: string;
  role: string;
  state: string;
  telephone: string;
  card_number: string;
  comments: string;
  cpf: string;
  full_name: string;
  rg: string;
  sex: string;

  // Adicione as propriedades extras
  responsible_name: string;
  responsible_cpf: string;
  responsible_rg: string;
  birth_date_responsible: string;
  telphone_responsible: string;
  comments_responsible: string;
}

interface PatientProps {
  setCreatedPatient: any;
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  editPayload: Patient | null | any;
  setEditPayload: any;
}

// Schema do paciente utilizando Zod
const patientSchema = z.object({
  birth_date: z.string().min(1, { message: "Informe a Data de Nascimento" }),
  cep: z.string().min(8, { message: "CEP Inválido" }),
  city: z.string().min(1, { message: "Informe a Cidade" }),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, { message: "Informe o Bairro" }),
  number: z.string().min(1, { message: "Informe o Número" }),
  road: z.string().min(1, { message: "Informe a Rua" }),
  role: z.string().min(1, { message: "Informe o Papel" }),
  state: z.string().min(1, { message: "Informe o Estado" }),
  telephone: z.string().min(1, { message: "Informe o Telefone" }),
  card_number: z.string().optional(),
  comments: z.string().optional(),
  cpf: z.string().min(11, { message: "Informe o CPF" }),
  full_name: z.string().min(1, { message: "Informe o Nome Completo" }),
  rg: z.string().min(1, { message: "Informe o RG" }),
  sex: z.string().min(1, { message: "Informe o Sexo" }),
  responsible_name: z.string().optional(),
  responsible_cpf: z.string().optional(),
  responsible_rg: z.string().optional(),
  birth_date_responsible: z.string().optional(),
  telphone_responsible: z.string().optional(),
  comments_responsible: z.string().optional(),
});

type PatientSchema = z.infer<typeof patientSchema>;

export function PatientCreate({
  setCreatedPatient,
  openDialog,
  setOpenDialog,
  editPayload = {},
  setEditPayload,
}: PatientProps) {
  const {
    handleSubmit,
    formState,
    control,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
  } = useForm<PatientSchema>({
    resolver: zodResolver(patientSchema),
    defaultValues: editPayload || {
      birth_date: "",
      cep: "",
      city: "",
      complement: "",
      neighborhood: "",
      number: "",
      road: "",
      role: "",
      state: "",
      telephone: "",
      card_number: "",
      comments: "",
      cpf: "",
      full_name: "",
      rg: "",
      sex: "",
      responsible_name: "",
      responsible_cpf: "",
      responsible_rg: "",
      birth_date_responsible: "",
    },
  }
  );
  useEffect(() => {
    if (editPayload) {
      setValue("birth_date", editPayload.birth_date);
      setValue("cep", editPayload.cep);
      setValue("city", editPayload.city);
      setValue("complement", editPayload.complement);
      setValue("neighborhood", editPayload.neighborhood);
      setValue("number", editPayload.number);
      setValue("road", editPayload.road);
      setValue("role", editPayload.role);
      setValue("state", editPayload.state);
      setValue("telephone", editPayload.telephone);
      setValue("card_number", editPayload.card_number);
      setValue("comments", editPayload.comments);
      setValue("cpf", editPayload.cpf);
      setValue("full_name", editPayload.full_name);
      setValue("rg", editPayload.rg);
      setValue("sex", editPayload.sex);
      setValue("responsible_name", editPayload.responsible_name);
      setValue("responsible_cpf", editPayload.responsible_cpf);
      setValue("responsible_rg", editPayload.responsible_rg);
      setValue("birth_date_responsible", editPayload.birth_date_responsible);
      setValue("telphone_responsible", editPayload.telphone_responsible);
      setValue("comments_responsible", editPayload.comments_responsible);
    }
  }, [editPayload]);
  var { ...patient }: any = watch()
  const [cep, birth_date] = watch(["cep", "birth_date"]);
  const [displayResponsibleFields, setDisplayResponsibleFields] =
    useState(false);
  async function handleCreatePatient(data: PatientSchema) {
    try {
      await fetch("http://localhost:3333/register-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Paciente criado com sucesso");
      setCreatedPatient(true);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar paciente");
    } finally {
      reset();
      setOpenDialog(false);
    }
  }

  async function onEditPatient() {
    try {
      for (const key in patient) {
        if(patient[key] === editPayload[key]) {
          delete patient[key];
        }
      }
      await fetch("http://localhost:3333/update-patient", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient), // Envia apenas os campos editados
      });
      toast.success("Paciente editado com sucesso");
      console.log("edit:", patient);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar paciente");
    } finally {
      setOpenDialog(false);
      setCreatedPatient(true);
      setEditPayload(null);
    }
  }
  useEffect(() => {
    const birthDateParts = birth_date.split("/");
    const birthDate = new Date(
      parseInt(birthDateParts[2], 10),
      parseInt(birthDateParts[1], 10) - 1,
      parseInt(birthDateParts[0], 10)
    );
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 18) {
      setDisplayResponsibleFields(true);
    } else {
      setDisplayResponsibleFields(false);
    }
  }, [birth_date]);

  return (
    <div className="w-full flex mt-4 mb-4">
      <Toaster position="bottom-right" richColors />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="mt-4 md:mt-0 px-14 py-2 bg-green-600 rounded-full flex items-center gap-2 text-white font-semibold hover:opacity-90 transition-opacity duration-300">
          <IoAdd className="w-5 h-5" />
          Cadastrar novo
        </DialogTrigger>
        <DialogContent className="min-w-[80%] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="mx-auto text-primary">
              {editPayload ? "Editar Paciente" : "Cadastrar Paciente"}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <form
              onSubmit={
                editPayload
                  ? handleSubmit(onEditPatient)
                  : handleSubmit(handleCreatePatient)
              }
            >
              {/* first row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Controller
                  name="full_name"
                  control={control}
                  render={({ field, formState }) => (
                    <InputText
                      label="Nome completo"
                      {...field}
                      error={formState.errors?.full_name?.message}
                    />
                  )}
                />
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field, formState }) => (
                    <InputMask
                      mask="cpf"
                      label="CPF"
                      {...field}
                      error={formState.errors?.cpf?.message}
                    />
                  )}
                />

                <Controller
                  name="rg"
                  control={control}
                  render={({ field, formState }) => (
                    <InputText
                      label="RG"
                      {...field}
                      error={formState.errors?.rg?.message}
                    />
                  )}
                />
              </div>

              {/* second row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                <Controller
                  name="birth_date"
                  control={control}
                  render={({ field, formState }) => (
                    <InputMask
                      mask="date"
                      label="Data de Nascimento"
                      {...field}
                      error={formState.errors?.birth_date?.message}
                    />
                  )}
                ></Controller>

                <Controller
                  name="telephone"
                  control={control}
                  render={({ field, formState }) => (
                    <InputMask
                      mask="telefone"
                      label="Telefone"
                      {...field}
                      error={formState.errors?.telephone?.message}
                    />
                  )}
                />

                <Controller
                  name="comments"
                  control={control}
                  render={({ field, formState }) => (
                    <InputText
                      label="Obsevação"
                      {...field}
                      error={formState.errors?.comments?.message}
                    />
                  )}
                />
              </div>

              {/* third row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                <div>
                  <label className="text-primary font-bold ml-2" htmlFor="sexo">
                    Sexo
                  </label>
                  <Controller
                    name="sex"
                    control={control}
                    defaultValue="male"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={(value: string) => field.onChange(value)}
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
                    {formState.errors.sex?.message}
                  </p>
                </div>
              </div>

              {displayResponsibleFields && (
                <div className="my-14">
                  {/* responsible first row */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5">
                    <div className="sm:col-span-6">
                      <Controller
                        name="responsible_name"
                        control={control}
                        render={({ field, formState }) => (
                          <InputText
                            label="Número completo do responsável"
                            {...field}
                            error={formState.errors?.responsible_name?.message}
                          />
                        )}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <Controller
                        name="responsible_cpf"
                        control={control}
                        render={({ field, formState }) => (
                          <InputMask
                            mask="cpf"
                            label="CPF do responsável"
                            {...field}
                            error={formState.errors?.responsible_cpf?.message}
                          />
                        )}
                      />
                    </div>

                    <div className="sm:col-span-3 ">
                      <Controller
                        name="responsible_rg"
                        control={control}
                        render={({ field, formState }) => (
                          <InputText
                            label="RG do responsável"
                            {...field}
                            error={formState.errors?.responsible_rg?.message}
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* responsible second row */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5">
                    <div className="sm:col-span-4">
                      <Controller
                        name="birth_date_responsible"
                        control={control}
                        render={({ field, formState }) => (
                          <InputMask
                            mask="date"
                            label="Data de Nascimento"
                            {...field}
                            error={
                              formState.errors?.birth_date_responsible?.message
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="sm:col-span-4 ">
                      <Controller
                        name="telphone_responsible"
                        control={control}
                        render={({ field, formState }) => (
                          <InputMask
                            mask="telefone"
                            label="Telefone"
                            {...field}
                            error={
                              formState.errors?.telphone_responsible?.message
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="sm:col-span-4 ">
                      <Controller
                        name="comments_responsible"
                        control={control}
                        render={({ field, formState }) => (
                          <InputText
                            label="Observação"
                            {...field}
                            error={
                              formState.errors?.comments_responsible?.message
                            }
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* fourth row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5">
                <div className="sm:col-span-4">
                  <Controller
                    name="role"
                    control={control}
                    render={({ field, formState }) => (
                      <SelectInput
                        field={field}
                        options={[
                          { value: "particular", label: "Particular" },
                          { value: "outros", label: "Outros" },
                        ]}
                        label="Plano"
                        error={formState.errors?.role?.message}
                      />
                    )}
                  />
                </div>

                <div className="sm:col-span-6">
                  <Controller
                    name="card_number"
                    control={control}
                    render={({ field, formState }) => (
                      <InputText
                        label="Número da cateirinha"
                        {...field}
                        error={formState.errors?.card_number?.message}
                        type="number"
                      />
                    )}
                  />
                </div>
              </div>

              {/* fifth row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5">
                <div className="sm:col-span-3">
                  <Controller
                    name="cep"
                    control={control}
                    render={({ field, formState }) => (
                      <InputMask
                        mask="cep"
                        label="CEP"
                        {...field}
                        error={formState.errors?.cep?.message}
                      />
                    )}
                  />
                </div>

                <div className="sm:col-span-9">
                  <Controller
                    name="road"
                    control={control}
                    render={({ field, formState }) => (
                      <InputText
                        label="Rua"
                        {...field}
                        error={formState.errors?.road?.message}
                      />
                    )}
                  />
                </div>
              </div>

              {/* sixth row */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-5">
                <Controller
                  name="neighborhood"
                  control={control}
                  render={({ field, formState }) => (
                    <InputText
                      label="Bairro"
                      {...field}
                      error={formState.errors?.neighborhood?.message}
                    />
                  )}
                />
                <Controller
                  name="city"
                  control={control}
                  render={({ field, formState }) => (
                    <SelectInput
                      field={field}
                      options={[{ value: "cidade", label: "Cidade" }]}
                      label="Cidade"
                      error={formState.errors?.city?.message}
                    />
                  )}
                />
                <Controller
                  name="state"
                  control={control}
                  render={({ field, formState, fieldState }) => (
                    <SelectInput
                      field={field}
                      options={brazilianStates}
                      label="Estado"
                      error={formState.errors?.state?.message}
                    />
                  )}
                />
                <Controller
                  name="number"
                  control={control}
                  render={({ field, formState }) => (
                    <InputText
                      label="Número"
                      {...field}
                      error={formState.errors?.number?.message}
                      type="number"
                    />
                  )}
                />
              </div>

              {/* seventh row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <Controller
                  name="complement"
                  control={control}
                  render={({ field, formState }) => (
                    <InputText
                      label="Complemento"
                      {...field}
                      error={formState.errors?.complement?.message}
                    />
                  )}
                />
              </div>

              <div className="w-full flex justify-center gap-5 mt-10">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setOpenDialog(false);
                  }}
                  className="bg-gray-300 text-primary px-2 py-2 rounded-full hover:bg-gray-400 transition-colors w-40 gap-2"
                >
                  Cancelar
                </button>

                {!editPayload ? (
                  <button
                    type="submit"
                    className="bg-primary text-white px-2 py-2 rounded-full hover:bg-primary/80 transition-colors w-40 gap-2"
                  >
                    Cadastrar
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onEditPatient();
                    }}
                    className="bg-primary text-white px-2 py-2 rounded-full hover:bg-primary/80 transition-colors w-40 gap-2"
                  >
                    Atualizar
                  </button>
                )}
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
