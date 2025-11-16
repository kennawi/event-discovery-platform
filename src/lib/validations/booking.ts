import { z } from "zod";

export const bookingFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  mobile: z
    .string()
    .min(8, { message: "Mobile number must be at least 8 characters" })
    .max(15, { message: "Mobile number is too long" }),
  date: z.date().refine((date) => date >= new Date(), {
    message: "Date cannot be in the past",
  }),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Schema for server action (date as string from FormData)
export const bookingFormServerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  mobile: z
    .string()
    .min(8, { message: "Mobile number must be at least 8 characters" })
    .max(15, { message: "Mobile number is too long" }),
  date: z.coerce.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    {
      message: "Date cannot be in the past",
    }
  ),
  eventId: z.string().min(1, { message: "Event ID is required" }),
  eventSlug: z.string().min(1, { message: "Event slug is required" }),
});

export type BookingFormServerValues = z.infer<typeof bookingFormServerSchema>;
