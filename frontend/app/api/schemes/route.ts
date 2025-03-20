import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const industry = searchParams.get("industry")

    if (!industry) {
      return NextResponse.json({ error: "Industry parameter is required" }, { status: 400 })
    }

    // Call the Python Flask API
    const response = await fetch(`http://localhost:5000/api/schemes?industry=${encodeURIComponent(industry)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in schemes API route:", error)
    return NextResponse.json({ error: "Failed to fetch government schemes" }, { status: 500 })
  }
}

