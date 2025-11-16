"use client";

import { useActionState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  bookTicketAction,
  type BookingActionState,
} from "@/actions/bookTicketAction";
import {
  BookingFormValues,
  bookingFormSchema,
} from "@/lib/validations/booking";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextField from "@/components/FormTextField";
import FormDateField from "@/components/FormDateField";
import { BookingDialogs } from "./BookingDialogs";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface BookingFormProps {
  eventId: string;
  eventSlug: string;
}

export function BookingForm({ eventId, eventSlug }: BookingFormProps) {
  const [actionState, formAction, isPending] = useActionState<
    BookingActionState | null,
    FormData
  >(bookTicketAction, null);

  const router = useRouter();
  const t = useTranslations("booking");

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      date: new Date(),
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("date", data.date.toISOString());
    formData.append("eventId", eventId);
    formData.append("eventSlug", eventSlug);

    startTransition(() => {
      formAction(formData);
    });
  };

  // Handle successful booking: reset form after successful submission

  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormTextField
              name="name"
              control={form.control}
              label={t("fullName")}
              description={t("fullNameDescription")}
              placeholder={t("fullNamePlaceholder")}
              autoComplete="name"
            />

            <FormTextField
              name="email"
              control={form.control}
              label={t("emailAddress")}
              description={t("emailDescription")}
              type="email"
              placeholder={t("emailPlaceholder")}
              autoComplete="email"
            />

            <FormTextField
              name="mobile"
              control={form.control}
              label={t("mobileNumber")}
              description={t("mobileDescription")}
              type="tel"
              placeholder={t("mobilePlaceholder")}
              autoComplete="tel"
            />

            <FormDateField
              name="date"
              control={form.control}
              label={t("eventDate")}
              description={t("dateDescription")}
              placeholder={t("datePlaceholder")}
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {t("processing")}
                </>
              ) : (
                t("bookTicket")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <BookingDialogs
        showSuccessDialog={actionState?.success === true}
        showErrorDialog={actionState?.success === false}
        errorMessage={actionState?.success === false ? actionState.message : ""}
        onSuccessClose={() => {
          router.push("/tickets?booking=success");
        }}
        onSuccessBackToEvent={() => {
          router.push(`/events/${eventSlug}`);
        }}
        onErrorClose={() => {
          router.push(`/events/${eventSlug}`);
        }}
      />
    </>
  );
}
