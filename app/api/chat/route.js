import { NextResponse } from 'next/server'

// A mock AI response generator to simulate RAG (Retrieval-Augmented Generation) behavior.
// To use a real LLM, you would replace this with the @google/genai SDK or Vercel AI SDK.
export async function POST(req) {
  try {
    const body = await req.json()
    if (!body || !body.message || typeof body.message !== 'string') {
      return NextResponse.json({ success: false, response: "Invalid request payload." }, { status: 400 })
    }
    const { message } = body
    
    // Simulate network delay for AI thinking (1.5 - 2.5 seconds)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1500))

    const lowerMsg = message.toLowerCase()
    let responseText = ""

    // Simple keyword-based mock routing
    if (lowerMsg.includes('join') || lowerMsg.includes('member')) {
      responseText = "To join Enigma, you need to clear our annual recruitment drive! The next drive is scheduled for September. Keep an eye on the 'New Members' section and our Discord server for the registration link. Once selected, you'll go through a technical interview round."
    } else if (lowerMsg.includes('event') || lowerMsg.includes('hackathon')) {
      responseText = "We host several events throughout the year, including our flagship hackathon 'CodeFest' and regular weekly workshops on DSA and Web Dev. Check the 'Events' section on the homepage for the latest schedule!"
    } else if (lowerMsg.includes('resource') || lowerMsg.includes('learn') || lowerMsg.includes('placement')) {
      responseText = "We have a dedicated Resources page with curated roadmaps for DSA, Web Dev, and App Dev. It also contains previous year interview experiences and standard CS subjects notes. Head over to the /resources tab in the navigation bar!"
    } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi ')) {
      responseText = "Hello there! I'm the Enigma AI Assistant. How can I help you today? You can ask me about joining the club, upcoming events, or learning resources."
    } else {
      responseText = "I'm not entirely sure about that! As an AI assistant for the Enigma club, I'm best at answering questions regarding our events, recruitment process, and technical resources. Could you try rephrasing?"
    }

    return NextResponse.json({
      success: true,
      response: responseText
    })

  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ success: false, response: "I'm having trouble connecting right now." }, { status: 500 })
  }
}
