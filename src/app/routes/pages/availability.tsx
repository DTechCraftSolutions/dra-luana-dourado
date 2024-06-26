import React, { useEffect, useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Interval {
  start: string;
  end: string;
}

interface Availability {
  [day: string]: Interval[];
}

interface AvailableProps {
  id: string;
  day_of_week: string;
  label: string;
  professionalId: string;
  initial_time: string;
  end_time: string;
}

export function AvailabilityManagement() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const [availableTimes, setAvailableTimes] = useState<AvailableProps[]>([]);
  const [data, setData] = useState<any>([]);
  const [dayOfWeekforCheck, setDayOfWeekforCheck] = useState("");
  const [newIntervalCheck, setNewIntervalCheck] = useState({
    start: "",
    end: "",
  });
  const [added, setAdded] = useState(false);
  const [professionalId, setProfessionalId] = useState("");
  const [availability, setAvailability] = useState<Availability>({
    Segunda: [],
    Terça: [],
    Quarta: [],
    Quinta: [],
    Sexta: [],
    Sábado: [],
    Domingo: [],
  });

  const handleAddInterval = (day: string) => {
    const newInterval: Interval = { start: "", end: "" };
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: [...prevAvailability[day], newInterval],
    }));
    setNewIntervalCheck(newInterval);
    setDayOfWeekforCheck(daysToWeeks[day]);
    setAdded((prev) => !prev);
  };

  const handleRemoveInterval = (day: string, index: number) => {
    const updatedAvailability = { ...availability };
    updatedAvailability[day].splice(index, 1);
    setAvailability(updatedAvailability);
  };

  const daysToWeeks: { [key: string]: string } = {
    Segunda: "segunda-feira",
    Terça: "terça-feira",
    Quarta: "quarta-feira",
    Quinta: "quinta-feira",
    Sexta: "sexta-feira",
    Sábado: "sábado",
    Domingo: "domingo",
  };

  const dateFormat = () => {
    const date: any = [];
    Object.entries(availability).forEach(([day, intervals]) => {
      const daysOfWeek = daysToWeeks[day as keyof typeof daysToWeeks];
      intervals.forEach((interval) => {
        const { start, end } = interval;
        const intervalFormatted = {
          initial_time: start,
          end_time: end,
          day_of_week: daysOfWeek,
          professionalId: professionalId,
        };
        date.push(intervalFormatted);
      });
    });
    return date;
  };

  async function removeAvailability(day: string, index: number) {
    const initialTimesSet = new Set(
      availableTimes
        .filter((item) => item.day_of_week === daysToWeeks[day])
        .map((item) => item.initial_time)
    );

    const endTimesSet = new Set(
      availableTimes
        .filter((item) => item.day_of_week === daysToWeeks[day])
        .map((item) => item.end_time)
    );

    const initialTimes = Array.from(initialTimesSet);
    const endTimes = Array.from(endTimesSet);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-available-times`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day_of_week: daysToWeeks[day],
          initial_time: initialTimes[index],
          end_time: endTimes[index],
        }),
      });

      toast.success("Disponibilidade removida com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao remover disponibilidade");
    } finally {
      handleRemoveInterval(day, index);
      setAdded(false);
    }
  }
  async function getIdProfessional() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile-professionals`,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch professional profile");
      }
      const data = await response.json();
      setProfessionalId(data.professionals.id);
    } catch (error) {
      console.error("Error fetching professional profile:", error);
    }
  }
  function checkAvailabilityConflicts(
    newAvailability: any,
    existingAvailabilities: any[]
  ): boolean {
    const dayOfWeek = dayOfWeekforCheck;
    const professionalId = newAvailability.professionalId;

    const existingAvailabilitiesForDayAndProfessional =
      existingAvailabilities.filter(
        (avail) =>
          avail.day_of_week === dayOfWeek &&
          avail.professionalId === professionalId
      );

    const newStartTime = convertToMinutes(newIntervalCheck.start);
    const newEndTime = convertToMinutes(newIntervalCheck.end);

    for (const existingAvailability of existingAvailabilitiesForDayAndProfessional) {
      const existingStartTime = convertToMinutes(
        existingAvailability.initial_time
      );
      const existingEndTime = convertToMinutes(existingAvailability.end_time);

      if (
        (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
        (newEndTime > existingStartTime && newEndTime <= existingEndTime) ||
        (existingStartTime >= newStartTime && existingStartTime < newEndTime) ||
        (existingEndTime > newStartTime && existingEndTime <= newEndTime)
      ) {
        return true;
      }
    }

    return false;
  }

  function convertToMinutes(time: any) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function handleAddAvailability() {
    try {
      if (data.length > 0) {
        const conflicts = data.some((newAvailability: any) =>
          checkAvailabilityConflicts(newAvailability, availableTimes)
        );

        if (conflicts) {
          toast.warning(
            "Os horários conflitam com os já existentes. Por favor, ajuste."
          );
          return;
        }
        if (
          data.some(
            (item: any) => item.initial_time === "" || item.end_time === ""
          )
        ) {
          toast.warning("Adicone pelo menos um horário");
          return;
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/register-available-times`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            availableTimes: data,
          }),
        }).then(() => {
          findAllAvailability();
          toast.success("Disponibilidade registrada com sucesso");
          setAdded((prev) => !prev);
        });
      }
    } catch (error) {
      toast.error("Erro ao registrar disponibilidade");
      console.error(error);
      setAdded((prev) => !prev);
    } finally {
      setData([]);
    }
  }

  async function findAllAvailability() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-all-available-times`
      );
      const data = await response.json();
      setAvailableTimes(data.availableTimes);
    } catch (error) {
      console.error(error);
    }
  }

  function handleAvailabilityDates(WeekDay: string) {
    if (availableTimes.length > 0) {
      const uniqueTimes: any = [];
      const seen = new Set();

      availableTimes.forEach((timeSlot) => {
        if (timeSlot.day_of_week === daysToWeeks[WeekDay]) {
          const formattedTime = {
            start:
              timeSlot.initial_time.slice(0, -2).toString() +
              timeSlot.initial_time.slice(-2).toString(),
            end:
              timeSlot.end_time.slice(0, -2).toString() +
              timeSlot.end_time.slice(-2).toString(),
          };

          const timeString = JSON.stringify(formattedTime);

          if (!seen.has(timeString)) {
            uniqueTimes.push(formattedTime);
            seen.add(timeString);
          }
        }
      });

      setAvailability((prevAvailability) => ({
        ...prevAvailability,
        [WeekDay]: uniqueTimes,
      }));
    }
  }

  useEffect(() => {
    getIdProfessional();
    findAllAvailability();
  }, []);

  useEffect(() => {
    const data = dateFormat();
    setData(data);
    console.log("dados:", data);
  }, [availability]);

  useEffect(() => {
    const weekDays = Object.keys(availability);
    weekDays.forEach((day) => {
      handleAvailabilityDates(day);
    });
  }, [availableTimes]);

  return (
    <>
      <div className="absolute">
        <Toaster richColors position="bottom-right" />
      </div>
      <div className="w-full px-4 mt-2">
        <h2 className="text-primary font-bold text-xl mb-4">
          Gerenciar Disponibilidade de Horários
        </h2>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <div className="flex justify-between items-center pb-5">
              <h3 className="text-lg font-semibold mb-2">Dias da Semana</h3>
              <button
                onClick={handleAddAvailability}
                className="bg-primary text-white py-2 px-4 rounded-lg
            hover:bg-primary/80 transition-colors duration-300"
              >
                salvar disponibilidade
              </button>
            </div>
            {Object.entries(availability).map(([day, intervals], index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 rounded-lg mb-4"
              >
                <h4 className="text-md font-semibold mb-2">{day}</h4>
                <div className="flex flex-col gap-2">
                  {intervals.map((interval, intervalIndex) => (
                    <div
                      key={intervalIndex}
                      className="flex items-center gap-4"
                    >
                      <input
                        type="time"
                        value={interval.start}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const updatedAvailability = { ...availability };
                          updatedAvailability[day][intervalIndex].start =
                            e.target.value;
                          setAvailability(updatedAvailability);
                        }}
                        className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:border-primary"
                      />
                      <span className="text-gray-600">-</span>
                      <input
                        type="time"
                        value={interval.end}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const updatedAvailability = { ...availability };
                          updatedAvailability[day][intervalIndex].end =
                            e.target.value;
                          setAvailability(updatedAvailability);
                        }}
                        className="border border-gray-300 rounded-full p-2 px-4  focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => removeAvailability(day, intervalIndex)}
                        className="text-red-500"
                        aria-label="Remover Intervalo"
                      >
                        <IoClose />
                      </button>
                    </div>
                  ))}
                  <button
                    disabled={added}
                    onClick={() => handleAddInterval(day)}
                    className={`${
                      added === true
                        ? "bg-primary/50 cursor-not-allowed"
                        : "bg-primary"
                    } bg-primary text-white px-2 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center w-40 gap-2`}
                  >
                    <IoAdd /> Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
