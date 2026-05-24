import { BookingCalendar } from "../BookingCalendar";

export default function BookingCalendarExample() {
  return (
    <div className="p-6 max-w-4xl">
      <BookingCalendar
        onDateSelect={(date) => console.log("Date selected:", date)}
        onTimeSelect={(time) => console.log("Time selected:", time)}
      />
    </div>
  );
}
