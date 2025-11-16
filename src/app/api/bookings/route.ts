import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, eventSlug, name, email, mobile, date } = body;

    // Validate required fields
    if (!eventId || !eventSlug || !name || !email || !mobile || !date) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate mobile format
    if (!/^[\d\s\-\+\(\)]+$/.test(mobile)) {
      return Response.json(
        { error: "Invalid mobile number format" },
        { status: 400 }
      );
    }

    // Validate date
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return Response.json(
        { error: "Date cannot be in the past" },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return success response
    return Response.json({
      success: true,
      message: "Ticket booked successfully",
      bookingId: `booking-${Date.now()}`,
    });
  } catch (error) {
    console.error("Failed to book ticket:", error);
    return Response.json(
      { error: "Failed to book ticket. Please try again later." },
      { status: 500 }
    );
  }
}
