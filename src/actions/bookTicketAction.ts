"use server";

import { bookingFormServerSchema } from "@/lib/validations/booking";

export type BookingActionState =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    }
  | null;

export async function bookTicketAction(
  _prevState: BookingActionState,
  formData: FormData
): Promise<BookingActionState> {
  // Extract form data
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    mobile: formData.get("mobile"),
    date: formData.get("date"),
    eventId: formData.get("eventId"),
    eventSlug: formData.get("eventSlug"),
  };

  // Validate with Zod
  const result = bookingFormServerSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: result.error.message,
    };
  }

  const validatedData = result.data;

  // console.log("validated data", validatedData);

  try {
    // Convert Date to ISO string for API
    const apiData = {
      ...validatedData,
      date: validatedData.date.toISOString(),
    };

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to book ticket");
    }

    // const data = await response.json();

    // console.log("data from api", data);

    return { success: true, message: "Ticket booked successfully" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while booking your ticket",
    };
  }
}
