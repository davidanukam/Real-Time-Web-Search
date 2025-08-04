import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");
  const userApiKey = req.headers.get("x-api-key");

  if (!query) {
    return NextResponse.json(
      { status: "ERROR", error: { message: "Missing query" } },
      { status: 400 }
    );
  }

  if (!userApiKey) {
    return NextResponse.json(
      { status: "ERROR", error: { message: "API key is required" } },
      { status: 401 }
    );
  }

  try {
    const API_URL = "https://real-time-web-search.p.rapidapi.com/search";

    const response = await fetch(
      `${API_URL}?q=${encodeURIComponent(query)}&gl=us&hl=en`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": userApiKey,
          "x-rapidapi-host": "real-time-web-search.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Invalid API key. Please check your RapidAPI key and try again.");
      }
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Search API error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch search results. Please try again.";
    
    return NextResponse.json(
      {
        status: "ERROR",
        error: {
          message: errorMessage,
        },
      },
      { status: 500 }
    );
  }
}