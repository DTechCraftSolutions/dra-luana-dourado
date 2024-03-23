"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getDayOfWeek } from "@/utils/day-week";

interface DatePickerProps {
  date?: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  fromDate?: Date;
  setDayWeek: React.Dispatch<React.SetStateAction<string>>;
}

export function DatePickerDemo({
  date,
  setDate,
  fromDate,
  setDayWeek,
}: DatePickerProps) {
  const [openPopover, setOpenPopover] = React.useState(false);

  React.useEffect(() => {
    if (date) {
      setDayWeek(getDayOfWeek(date));
    }
  }, [date]);

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          fromDate={fromDate}
          locale={ptBR}
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            setOpenPopover(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
