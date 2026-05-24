import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { AvailabilitySlot } from "@shared/schema";

interface BookingCalendarProps {
  onDateSelect?: (date: Date) => void;
  onTimeSelect?: (time: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

const DEFAULT_TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

function formatTimeDisplay(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export function BookingCalendar({
  onDateSelect,
  onTimeSelect,
  selectedDate,
  selectedTime,
}: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [time, setTime] = useState<string | undefined>(selectedTime);

  const dateString = date ? date.toISOString().split("T")[0] : undefined;

  const { data: availableSlots, isLoading } = useQuery<AvailabilitySlot[]>({
    queryKey: ["/api/availability", dateString],
    enabled: !!dateString,
  });

  const availableTimes = availableSlots?.length
    ? availableSlots.map((slot) => slot.time)
    : DEFAULT_TIMES;

  useEffect(() => {
    if (date && time && availableSlots?.length && !availableSlots.some(s => s.time === time)) {
      setTime(undefined);
    }
  }, [availableSlots, date, time]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setTime(undefined);
    if (newDate) {
      onDateSelect?.(newDate);
    }
  };

  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime);
    onTimeSelect?.(selectedTime);
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Time</CardTitle>
          {date && (
            <Badge variant="secondary" className="w-fit">
              {date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          {date ? (
            isLoading ? (
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {availableTimes.map((slot) => (
                  <Button
                    key={slot}
                    type="button"
                    variant={time === slot ? "default" : "outline"}
                    onClick={() => handleTimeSelect(slot)}
                    className="w-full"
                    data-testid={`button-time-${slot.replace(/:/g, "-")}`}
                  >
                    {formatTimeDisplay(slot)}
                  </Button>
                ))}
              </div>
            )
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Please select a date first
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
