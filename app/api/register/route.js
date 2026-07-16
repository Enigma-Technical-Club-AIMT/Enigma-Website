import { NextResponse } from 'next/server'

// Simulates the event registration and ticketing pipeline.
// In production, this would use `resend` or `nodemailer` to dispatch an email
// containing a generated QR code (via `qrcode` package).
export async function POST(req) {
  try {
    const { eventId, studentName, studentEmail } = await req.json()

    if (!eventId || !studentName || !studentEmail) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Simulate database insertion and email dispatch delay (1.5s)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Generate a mock unique ticket ID
    const ticketId = `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    console.log(`[Event Registration] Generated Ticket ${ticketId} for ${studentName} (${studentEmail}). Email dispatched.`)

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Registration successful. A QR-coded ticket has been emailed to the student."
    })

  } catch (error) {
    console.error("Registration API Error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
