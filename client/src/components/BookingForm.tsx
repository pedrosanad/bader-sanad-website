import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookingCalendar } from "./BookingCalendar";
import { CheckCircle, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface BookingFormProps {
  preselectedCategory?: string;
  onSubmit?: (data: BookingData) => void;
}

interface BookingData {
  name: string;
  phone: string;
  sessionType: string;
  date: Date | null;
  time: string;
  message: string;
}

export function BookingForm({ preselectedCategory, onSubmit }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    phone: "",
    sessionType: preselectedCategory || "",
    date: null,
    time: "",
    message: "",
  });

  const sessionTypes = [
    { value: "portrait", label: t.bookingForm.sessionTypes.portrait },
    { value: "events", label: t.bookingForm.sessionTypes.events },
    { value: "commercial", label: t.bookingForm.sessionTypes.commercial },
    { value: "headshots", label: t.bookingForm.sessionTypes.headshots },
  ];

  const handleConfirmBooking = async () => {
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.sessionType) {
      toast({
        title: t.bookingForm.errors.missing,
        description: t.bookingForm.errors.missingDesc,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/bookings", {
        name: formData.name,
        phone: formData.phone,
        sessionType: formData.sessionType,
        date: formData.date?.toISOString().split("T")[0],
        time: formData.time,
        message: formData.message || null,
      });

      if (!response.ok) throw new Error("Failed to create booking");

      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/availability"] });
      setSubmitted(true);
      onSubmit?.(formData);
    } catch (error) {
      toast({
        title: t.bookingForm.errors.failed,
        description: t.bookingForm.errors.failedDesc,
        variant: "destructive",
      });
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateForm = (field: keyof BookingData, value: string | Date | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="font-serif text-3xl mb-4">{t.bookingForm.success.title}</h2>
          <p className="text-muted-foreground mb-6">{t.bookingForm.success.message}</p>
          <div className="bg-muted rounded-md p-6 text-start max-w-md mx-auto space-y-2">
            <p><span className="text-muted-foreground">{t.bookingForm.success.session}</span> {sessionTypes.find(s => s.value === formData.sessionType)?.label}</p>
            <p><span className="text-muted-foreground">{t.bookingForm.success.date}</span> {formData.date?.toLocaleDateString()}</p>
            <p><span className="text-muted-foreground">{t.bookingForm.success.time}</span> {formData.time}</p>
            <p><span className="text-muted-foreground">{t.bookingForm.success.name}</span> {formData.name}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center mb-8 gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 w-16 rounded-full ${s <= step ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>{t.bookingForm.step1.title}</CardTitle>
            <CardDescription>{t.bookingForm.step1.desc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessionTypes.map((type) => (
                <Button
                  key={type.value}
                  type="button"
                  variant={formData.sessionType === type.value ? "default" : "outline"}
                  className="h-auto py-6 flex flex-col gap-1"
                  onClick={() => updateForm("sessionType", type.value)}
                  data-testid={`button-session-${type.value}`}
                >
                  <span className="font-medium">{type.label}</span>
                </Button>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.sessionType}
                data-testid="button-next-step-1"
              >
                {t.bookingForm.buttons.continue}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>{t.bookingForm.step2.title}</CardTitle>
            <CardDescription>{t.bookingForm.step2.desc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <BookingCalendar
              selectedDate={formData.date || undefined}
              selectedTime={formData.time}
              onDateSelect={(date) => updateForm("date", date)}
              onTimeSelect={(time) => updateForm("time", time)}
            />
            <div className="flex justify-between gap-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                {t.bookingForm.buttons.back}
              </Button>
              <Button
                type="button"
                onClick={() => setStep(3)}
                disabled={!formData.date || !formData.time}
                data-testid="button-next-step-2"
              >
                {t.bookingForm.buttons.continue}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>{t.bookingForm.step3.title}</CardTitle>
            <CardDescription>{t.bookingForm.step3.desc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t.bookingForm.fields.name}</Label>
                <Input
                  id="name"
                  placeholder={t.bookingForm.fields.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  data-testid="input-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t.bookingForm.fields.phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t.bookingForm.fields.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  data-testid="input-phone"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session">{t.bookingForm.fields.session}</Label>
              <Select
                value={formData.sessionType}
                onValueChange={(value) => updateForm("sessionType", value)}
              >
                <SelectTrigger data-testid="select-session-type">
                  <SelectValue placeholder={t.bookingForm.fields.sessionPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t.bookingForm.fields.message}</Label>
              <Textarea
                id="message"
                placeholder={t.bookingForm.fields.messagePlaceholder}
                value={formData.message}
                onChange={(e) => updateForm("message", e.target.value)}
                rows={4}
                data-testid="textarea-message"
              />
            </div>
            <div className="flex justify-between gap-4">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                {t.bookingForm.buttons.back}
              </Button>
              <Button
                type="button"
                onClick={handleConfirmBooking}
                disabled={!formData.name || !formData.phone || isSubmitting}
                data-testid="button-submit-booking"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="me-2 h-4 w-4 animate-spin" />
                    {t.bookingForm.buttons.booking}
                  </>
                ) : (
                  t.bookingForm.buttons.confirm
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
