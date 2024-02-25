import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

const patientSchema = z
  .object({
    nome: z.string().min(1, { message: "Informe o Nome" }),
    sexo: z.enum(["male", "female"]),
    cpf: z.string().min(11, { message: "Informe o CPF" }),
    rg: z.string().min(1, { message: "Informe o RG" }),
    telefone: z.string().min(1, { message: "Informe o Telefone" }),
    observacao: z.string().optional(),
    plano: z.string().min(1, { message: "Selecione o Plano" }),
    numero_cateirinha: z.string().optional(),
    cep: z.string().min(8, { message: "CEP Inválido" }),
    rua: z.string().min(1, { message: "Informe a Rua" }),
    bairro: z.string().min(1, { message: "Informe o Bairro" }),
    cidade: z.string().min(1, { message: "Informe a Cidade" }),
    estado: z.string().min(1, { message: "Informe o Estado" }),
    numero: z.string().min(1, { message: "Informe o Número" }),
    complemento: z.string().optional(),
    nome_responsavel: z.string().optional(),
    cpf_responsavel: z.string().optional(),
    rg_responsavel: z.string().optional(),
    data_nascimento_responsavel: z.string().optional(),
    telefone_responsavel: z.string().optional(),
    observacao_responsavel: z.string().optional(),
    data_nascimento: z
      .string()
      .min(1, { message: "Informe a Data de Nascimento" }),
  })
  .superRefine((data, ctx) => {
    if (data.plano == "particular" && !data.numero_cateirinha) {
      ctx.addIssue({
        code: "custom",
        message: "O Plano Particular requer o Número da Cateirinha",
        path: ["numero_cateirinha"],
      });
    } else if (!validarCpf(data.cpf)) {
      ctx.addIssue({
        code: "custom",
        message: "Informe um CPF válido",
        path: ["cpf"],
      });
    } else if (data.telefone && !validatePhoneNumber(data.telefone)) {
      ctx.addIssue({
        code: "custom",
        message: "Informe um telefone válido. Ex: (11) 91234-5678",
        path: ["telefone"],
      });
    } else if (data.data_nascimento) {
      const dateJustNumbers = removeSpecialChars(data.data_nascimento);
      const responsibleBirthJustNumbers = removeSpecialChars(
        data.data_nascimento_responsavel
      );
      const responsiblePhoneJustNumbers = removeSpecialChars(
        data.telefone_responsavel
      );
      let isBirthDateResponsibleValid = true;

      if (dateJustNumbers.length === 8) {
        const dateParsedToISOString = convertToISOString(data.data_nascimento);

        if (!dateParsedToISOString) {
          ctx.addIssue({
            code: "custom",
            message: "Data de Nascimento Inválida",
            path: ["data_nascimento"],
          });
          return;
        }

        const triggerDateValidation = !isOver18(dateParsedToISOString);

        //custom validation for the Data Nascimento Responsavel
        if (triggerDateValidation) {
          if (
            responsibleBirthJustNumbers.length === 8 &&
            data.data_nascimento_responsavel
          ) {
            const responsibleBirthParsedToISOString = convertToISOString(
              data.data_nascimento_responsavel
            );

            if (!responsibleBirthParsedToISOString)
              isBirthDateResponsibleValid = false;
          } else {
            isBirthDateResponsibleValid = false;
          }
        }

        if (triggerDateValidation && !data.nome_responsavel) {
          ctx.addIssue({
            code: "custom",
            message: "Informe o Nome do Responsável",
            path: ["nome_responsavel"],
          });
        } else if (triggerDateValidation && !data.cpf_responsavel) {
          ctx.addIssue({
            code: "custom",
            message: "Informe o CPF do Responsável",
            path: ["cpf_responsavel"],
          });
        } else if (
          triggerDateValidation &&
          data.cpf_responsavel &&
          !validarCpf(data.cpf_responsavel)
        ) {
          ctx.addIssue({
            code: "custom",
            message: "CPF do Responsável Inválido",
            path: ["cpf_responsavel"],
          });
        } else if (triggerDateValidation && !data.rg_responsavel) {
          ctx.addIssue({
            code: "custom",
            message: "Informe o RG do Responsável",
            path: ["rg_responsavel"],
          });
        } else if (
          (triggerDateValidation && !responsibleBirthJustNumbers) ||
          !responsibleBirthJustNumbers.length
        ) {
          ctx.addIssue({
            code: "custom",
            message: "Informe a Data de Nascimento do Responsável",
            path: ["data_nascimento_responsavel"],
          });
        } else if (
          triggerDateValidation &&
          data.data_nascimento_responsavel &&
          !isBirthDateResponsibleValid
        ) {
          ctx.addIssue({
            code: "custom",
            message: "Data de nascimento Inválida",
            path: ["data_nascimento_responsavel"],
          });
        } else if (
          (triggerDateValidation && !responsiblePhoneJustNumbers) ||
          !responsiblePhoneJustNumbers.length
        ) {
          ctx.addIssue({
            code: "custom",
            message: "Informe o Telefone do Responsável",
            path: ["telefone_responsavel"],
          });
        } else if (triggerDateValidation && data.telefone_responsavel) {
          if (!validatePhoneNumber(data.telefone_responsavel)) {
            ctx.addIssue({
              code: "custom",
              message: "Informe um telefone válido. Ex: (11) 91234-5678",
              path: ["telefone_responsavel"],
            });
          }
        }

        //TODO: add data nascimento responsavel validation
        //TODO: add cpf responsavel validation based on cpf custom function validation
        //TODO: add telefone responsavel validation based on phone custom function validation
      }
    }
  });

/**
 * Parse a date string in dd/mm/yyyy format to ISO 8601 format
 * @param dateString "dd/mm/yyyy"
 * @returns "yyyy-mm-dd"
 */
function convertToISOString(dateString: string) {
  const parts = dateString.split("/");
  const [day, month, year] = parts.map(Number);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return false; // Invalid date format
  }

  const maxDaysInMonth = new Date(year, month, 0).getDate();

  if (day < 1 || day > maxDaysInMonth) {
    return false; // Invalid day of the month
  }

  const formattedDate = new Date(`${year}-${month}-${day}`);

  if (isNaN(formattedDate.getTime())) {
    return null;
  }

  return formattedDate.toISOString();
}

/**
 * Check if a date is older than 18 years
 * @param dateString "ISO 8601 format"
 * @returns true if the date is older than 18 years
 */
function isOver18(dateString: any) {
  const date = new Date(dateString);
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  return date <= eighteenYearsAgo;
}

type PatientSchema = z.infer<typeof patientSchema>;

export function PatientCreate() {
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
    defaultValues: {
      sexo: "male",
      cpf: "",
      nome: "",
      rg: "",
      telefone: "",
      observacao: "",
      plano: "",
      numero_cateirinha: "",
      cep: "",
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
      numero: "",
      complemento: "",
      nome_responsavel: "",
      cpf_responsavel: "",
      rg_responsavel: "",
      data_nascimento_responsavel: "",
      telefone_responsavel: "",
      observacao_responsavel: "",
      data_nascimento: '',
    },
  });

  const [cep, data_nascimento] = watch(["cep", "data_nascimento"]);

  const [openDialog, setOpenDialog] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [displayResponsibleFields, setDisplayResponsibleFields] =
    useState(false);

  //TODO: implement handleCreatePatient
  async function handleCreatePatient(data: PatientSchema) {
    console.log(data);
    // setOpenDialog(false);
  }

  async function fetchCep() {
    try {
      const cepJustNumbers = removeSpecialChars(cep);

      if (cepJustNumbers.length === 8) {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cepJustNumbers}/json/`
        );
        const data = response.data;
        if (data.erro) {
          //TODO: display error
          console.log(data);
          return;
        }

        setValue("rua", data.logradouro);
        setValue("bairro", data.bairro);
        // TODO: set value cidade
        setValue("complemento", data.complemento);
        setValue("estado", data.uf);

        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCep();
  }, [cep]);

  useEffect(() => {
    const dateJustNumbers = removeSpecialChars(data_nascimento);

    if (dateJustNumbers.length === 8) {
      const dateParsedToISOString = convertToISOString(data_nascimento);

      if (!dateParsedToISOString) {
        setError("data_nascimento", { message: "Data inválida" });
        return;
      }

      clearErrors("data_nascimento");

      if (data_nascimento)
        setDisplayResponsibleFields(!isOver18(dateParsedToISOString));
    }
  }, [data_nascimento]);

  return (
    <div className="w-full flex mt-4 mb-4" onClick={() => {}}>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="mt-4 md:mt-0 px-14 py-2 bg-green-600 rounded-full flex items-center gap-2 text-white font-semibold hover:opacity-90 transition-opacity duration-300">
         <IoAdd className="w-5 h-5" />
          Cadastrar novo
        </DialogTrigger>
        <DialogContent className="min-w-[80%] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="mx-auto text-primary">
              Cadastar novo paciente
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <form onSubmit={handleSubmit(handleCreatePatient)}>
              {/* first row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Controller
                  name="nome"
                  control={control}
                  render={({ field, formState }) => (
                    <InputText
                      label="Nome completo"
                      {...field}
                      error={formState.errors?.nome?.message}
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
                  name="data_nascimento"
                  control={control}
                  render={({ field, formState }) => (
                    <InputMask
                      mask="date"
                      label="Data de Nascimento"
                      {...field}
                      error={formState.errors?.data_nascimento?.message}
                    />
                  )}
                ></Controller>

                <Controller
                  name="telefone"
                  control={control}
                  render={({ field, formState }) => (
                    <InputMask
                      mask="telefone"
                      label="Telefone"
                      {...field}
                      error={formState.errors?.telefone?.message}
                    />
                  )}
                />

                <Controller
                  name="observacao"
                  control={control}
                  render={({ field, formState }) => (
                    <InputText
                      label="Obsevação"
                      {...field}
                      error={formState.errors?.observacao?.message}
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

              {displayResponsibleFields && (
                <div className="my-14">
                  {/* responsible first row */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5">
                    <div className="sm:col-span-6">
                      <Controller
                        name="nome_responsavel"
                        control={control}
                        render={({ field, formState }) => (
                          <InputText
                            label="Número completo do responsável"
                            {...field}
                            error={formState.errors?.nome_responsavel?.message}
                          />
                        )}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <Controller
                        name="cpf_responsavel"
                        control={control}
                        render={({ field, formState }) => (
                          <InputMask
                            mask="cpf"
                            label="CPF do responsável"
                            {...field}
                            error={formState.errors?.cpf_responsavel?.message}
                          />
                        )}
                      />
                    </div>

                    <div className="sm:col-span-3 ">
                      <Controller
                        name="rg_responsavel"
                        control={control}
                        render={({ field, formState }) => (
                          <InputText
                            label="RG do responsável"
                            {...field}
                            error={formState.errors?.rg_responsavel?.message}
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* responsible second row */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5">
                    <div className="sm:col-span-4">
                      <Controller
                        name="data_nascimento_responsavel"
                        control={control}
                        render={({ field, formState }) => (
                          <InputMask
                            mask="date"
                            label="Data de Nascimento"
                            {...field}
                            error={
                              formState.errors?.data_nascimento_responsavel
                                ?.message
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="sm:col-span-4 ">
                      <Controller
                        name="telefone_responsavel"
                        control={control}
                        render={({ field, formState }) => (
                          <InputMask
                            mask="telefone"
                            label="Telefone"
                            {...field}
                            error={
                              formState.errors?.telefone_responsavel?.message
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="sm:col-span-4 ">
                      <Controller
                        name="observacao_responsavel"
                        control={control}
                        render={({ field, formState }) => (
                          <InputText
                            label="Observação"
                            {...field}
                            error={
                              formState.errors?.observacao_responsavel?.message
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
                    name="plano"
                    control={control}
                    render={({ field, formState }) => (
                      <SelectInput
                        field={field}
                        options={[
                          { value: "particular", label: "Particular" },
                          { value: "outros", label: "Outros" },
                        ]}
                        label="Plano"
                        error={formState.errors?.plano?.message}
                      />
                    )}
                  />
                </div>

                <div className="sm:col-span-6">
                  <Controller
                    name="numero_cateirinha"
                    control={control}
                    render={({ field, formState }) => (
                      <InputText
                        label="Número da cateirinha"
                        {...field}
                        error={formState.errors?.numero_cateirinha?.message}
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
                    name="rua"
                    control={control}
                    render={({ field, formState }) => (
                      <InputText
                        label="Rua"
                        {...field}
                        error={formState.errors?.rua?.message}
                      />
                    )}
                  />
                </div>
              </div>

              {/* sixth row */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-5">
                <Controller
                  name="bairro"
                  control={control}
                  render={({ field, formState }) => (
                    <InputText
                      label="Bairro"
                      {...field}
                      error={formState.errors?.bairro?.message}
                    />
                  )}
                />
                <Controller
                  name="cidade"
                  control={control}
                  render={({ field, formState }) => (
                    <SelectInput
                      field={field}
                      options={[
                        { value: "cidade", label: "Eu sou uma cidade" },
                      ]}
                      label="Cidade"
                      error={formState.errors?.cidade?.message}
                    />
                  )}
                />
                <Controller
                  name="estado"
                  control={control}
                  render={({ field, formState, fieldState }) => (
                    <SelectInput
                      field={field}
                      options={brazilianStates}
                      label="Estado"
                      error={formState.errors?.estado?.message}
                    />
                  )}
                />
                <Controller
                  name="numero"
                  control={control}
                  render={({ field, formState }) => (
                    <InputText
                      label="Número"
                      {...field}
                      error={formState.errors?.numero?.message}
                      type="number"
                    />
                  )}
                />
              </div>

              {/* seventh row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <Controller
                  name="complemento"
                  control={control}
                  render={({ field, formState }) => (
                    <InputText
                      label="Complemento"
                      {...field}
                      error={formState.errors?.complemento?.message}
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
