import { BookingForm } from "../BookingForm";

export default function BookingFormExample() {
  return (
    <div className="p-6">
      <BookingForm
        onSubmit={(data) => console.log("Booking submitted:", data)}
      />
    </div>
  );
}
