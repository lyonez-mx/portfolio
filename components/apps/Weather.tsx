"use client"

import { useState } from "react"
import { Search, MapPin, Droplets, Wind, Sunrise, Sunset } from "lucide-react"

interface WeatherProps {
  isDarkMode?: boolean
}

type City = keyof typeof weatherData

const weatherData = {
  "New York": { temp: 18, condition: "Partly Cloudy", humidity: 65, wind: 12, sunrise: "6:15 AM", sunset: "7:45 PM", feels: 17 },
  London: { temp: 14, condition: "Rainy", humidity: 80, wind: 18, sunrise: "5:45 AM", sunset: "8:30 PM", feels: 12 },
  Tokyo: { temp: 24, condition: "Sunny", humidity: 50, wind: 8, sunrise: "4:30 AM", sunset: "6:45 PM", feels: 25 },
  Sydney: { temp: 22, condition: "Sunny", humidity: 55, wind: 15, sunrise: "6:30 AM", sunset: "5:15 PM", feels: 23 },
  Paris: { temp: 16, condition: "Partly Cloudy", humidity: 60, wind: 10, sunrise: "6:00 AM", sunset: "8:15 PM", feels: 15 },
}

export default function Weather({ isDarkMode = true }: WeatherProps) {
  const [city, setCity] = useState<City>("New York")
  const [query, setQuery] = useState("")
  const w = weatherData[city]

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const muted = isDarkMode ? "text-gray-400" : "text-gray-500"
  const bg = isDarkMode ? "bg-gray-900" : "bg-white"
  const card = isDarkMode ? "bg-gray-800" : "bg-gray-100"

  function handleSearch() {
    const found = Object.keys(weatherData).find(
      (c) => c.toLowerCase().includes(query.toLowerCase()),
    )
    if (found) setCity(found as City)
    setQuery("")
  }

  return (
    <div className={`flex h-full flex-col ${bg} ${text} p-6`}>
      <div className="mb-4 flex gap-2">
        <div className={`flex flex-1 items-center gap-2 rounded-lg ${card} px-3 py-2`}>
          <Search className="size-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className={`w-full bg-transparent text-sm focus:outline-none ${text}`}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-blue-400" />
            <h2 className="text-2xl font-bold">{city}</h2>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-6xl font-light">{w.temp}°</span>
            <div>
              <p className="text-lg">{w.condition}</p>
              <p className={muted}>Feels like {w.feels}°</p>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-2 gap-3 rounded-lg p-4 ${card}`}>
          <div className="flex items-center gap-2">
            <Droplets className="size-4 text-blue-400" />
            <div>
              <p className={`text-xs ${muted}`}>Humidity</p>
              <p className="font-medium">{w.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="size-4 text-blue-400" />
            <div>
              <p className={`text-xs ${muted}`}>Wind</p>
              <p className="font-medium">{w.wind} km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sunrise className="size-4 text-orange-400" />
            <div>
              <p className={`text-xs ${muted}`}>Sunrise</p>
              <p className="font-medium">{w.sunrise}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sunset className="size-4 text-orange-400" />
            <div>
              <p className={`text-xs ${muted}`}>Sunset</p>
              <p className="font-medium">{w.sunset}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-2 font-medium">Cities</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(weatherData).map((c) => (
            <button
              key={c}
              onClick={() => setCity(c as City)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                city === c
                  ? "bg-blue-500 text-white"
                  : `${card} hover:bg-white/10`
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
