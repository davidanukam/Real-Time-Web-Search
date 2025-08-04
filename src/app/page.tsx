"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Search,
  ExternalLink,
  Clock,
  Globe,
  Video,
  MessageSquare,
} from "lucide-react";

interface OrganicResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
  displayed_link: string;
  position: number;
  rank: number;
  answers_count?: string;
  top_answer?: string;
  video_preview_url?: string;
  video_duration?: string;
}

interface SearchData {
  total_organic_results: number;
  organic_results: OrganicResult[];
  has_ai_overviews: boolean;
}

interface SearchResult {
  status: string;
  request_id?: string;
  parameters?: {
    q: string;
    gl: string;
    hl: string;
  };
  data?: SearchData;
  error?: {
    message: string;
  };
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);

  async function handleSearch() {
    if (!query.trim()) return;

    if (!apiKey.trim()) {
      alert("Please enter your RapidAPI key first");
      setShowApiKeyInput(true);
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const res = await fetch("/api/search?q=" + encodeURIComponent(query), {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
      });
      const json: SearchResult = await res.json();
      setResults(json);

      if (json.status !== "OK") {
        console.error("Search failed:", json.error?.message);
      }
    } catch (err) {
      console.error("Search error:", err);
      setResults({
        status: "ERROR",
        error: { message: "Failed to fetch search results. Please try again." },
      });
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-6 mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Search className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Real-Time Web Search
          </h1>
        </div>

        {/* API Key Section */}
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  RapidAPI Configuration
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className="text-xs"
              >
                {showApiKeyInput ? "Hide" : "Configure API Key"}
              </Button>
            </div>

            {showApiKeyInput && (
              <div className="space-y-3">
                <div className="text-left">
                  <label
                    htmlFor="apiKey"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your RapidAPI Key
                  </label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Enter your RapidAPI key here..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="text-xs text-gray-600 text-left">
                  <p className="mb-1">
                    <strong>How to get your API key:</strong>
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>
                      Visit{" "}
                      <a
                        href="https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-web-search"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        RapidAPI Real-Time Web Search
                      </a>
                    </li>
                    <li>Sign up/Login and subscribe to the API</li>
                    <li>Copy your API key from the dashboard</li>
                    <li>Paste it above and start searching!</li>
                  </ol>
                </div>
              </div>
            )}

            {!showApiKeyInput && !apiKey && (
              <p className="text-sm text-gray-600">
                Click "Configure API Key" to add your RapidAPI key and start
                searching
              </p>
            )}

            {!showApiKeyInput && apiKey && (
              <div className="flex items-center gap-2 text-sm text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>API Key configured (•••••{apiKey.slice(-4)})</span>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-2 max-w-2xl mx-auto">
          <Input
            placeholder="Search for anything... (e.g., 'how to build a website')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="text-lg h-12 border-2 focus:border-blue-500"
            disabled={!apiKey.trim()}
          />
          <Button
            onClick={handleSearch}
            disabled={loading || !query.trim() || !apiKey.trim()}
            className="h-12 px-6 bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Searching...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="max-w-5xl mx-auto space-y-6">
          {results.status === "ERROR" ? (
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6 text-center">
                <div className="text-red-600 text-lg font-medium">
                  {results.error?.message ||
                    "An error occurred while searching"}
                </div>
              </CardContent>
            </Card>
          ) : (
            results.data && (
              <div className="space-y-6">
                {/* Search Stats */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>
                          About{" "}
                          {formatNumber(results.data.total_organic_results)}{" "}
                          results for "{results.parameters?.q}"
                        </span>
                      </div>
                      {results.request_id && (
                        <Badge variant="outline" className="text-xs">
                          {results.request_id.slice(0, 8)}...
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Search Results */}
                <div className="space-y-4">
                  {results.data.organic_results.map((result, idx) => (
                    <Card
                      key={idx}
                      className="bg-white shadow-sm hover:shadow-md transition-all duration-200 group"
                    >
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          {/* Header with source and rank */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                #{result.rank}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {result.source}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {result.video_duration && (
                                <Badge
                                  variant="outline"
                                  className="text-xs flex items-center gap-1"
                                >
                                  <Video className="h-3 w-3" />
                                  {result.video_duration}
                                </Badge>
                              )}
                              {result.answers_count && (
                                <Badge
                                  variant="outline"
                                  className="text-xs flex items-center gap-1"
                                >
                                  <MessageSquare className="h-3 w-3" />
                                  {result.answers_count}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Title and Link */}
                          <div>
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block group-hover:text-blue-600 transition-colors"
                            >
                              <h3 className="text-xl font-semibold text-blue-700 hover:text-blue-800 line-clamp-2 mb-1">
                                {result.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-green-700 mb-2">
                                <ExternalLink className="h-3 w-3" />
                                <span className="truncate">
                                  {result.displayed_link}
                                </span>
                              </div>
                            </a>
                          </div>

                          {/* Video Thumbnail */}
                          {result.video_preview_url && (
                            <div className="relative w-32 h-18 rounded-lg overflow-hidden bg-gray-100 mb-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={result.video_preview_url}
                                alt={`Video thumbnail for ${result.title}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.parentElement?.remove();
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black bg-opacity-60 rounded-full p-2">
                                  <Video className="h-4 w-4 text-white" />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Snippet */}
                          <p className="text-gray-700 leading-relaxed line-clamp-3">
                            {result.snippet}
                          </p>

                          {/* Top Answer (for forum/discussion results) */}
                          {result.top_answer && (
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                              <p className="text-sm font-medium text-blue-800 mb-1">
                                Top Answer:
                              </p>
                              <p className="text-sm text-blue-700 line-clamp-2">
                                {result.top_answer}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Footer */}
                {results.data.organic_results.length > 0 && (
                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-600">
                        Showing {results.data.organic_results.length} of{" "}
                        {formatNumber(results.data.total_organic_results)}{" "}
                        results
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
}
