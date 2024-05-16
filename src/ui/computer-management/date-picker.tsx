"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, startOfDay } from "date-fns";
import { useState } from "react";

type DatePickerProps = {
  defaultValue?: Date | null;
  onDateChange?: (newDate: string | null) => void;
  disabled?: boolean;
};

export function DatePicker({
  onDateChange,
  defaultValue,
  disabled,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | null | undefined>(defaultValue);

  const handleDateChange = (newDate: Date | null | undefined) => {
    setDate(newDate);

    const newDateString = newDate ? newDate.toISOString() : null;
    if (onDateChange) {
      onDateChange(newDateString);
    }
  };

  const dateFormat = "PPP";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, dateFormat) : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date ? startOfDay(date) : undefined}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
