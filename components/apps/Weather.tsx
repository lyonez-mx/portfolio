"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, MapPin, Thermometer, Droplets, Wind, Cloud, Sun, CloudRain, CloudSnow, Loader2 } from "lucide-react"
import { useTranslation } from "@/contexts/i18n"

interface WeatherProps {
  isDarkMode?: boolean
}

interface StateData {
  ides: string
  nes: string
  tmax: string
  tmin: string
  desciel: string
  probprec: string
  prec: string
  velvien: string
  dirvienc: string
  cc: string
  raf: string
  lat: string
  lon: string
  municipios: number
}

const STATES: { id: string; name: string }[] = [
  { id: "1", name: "Aguascalientes" }, { id: "2", name: "Baja California" },
  { id: "3", name: "Baja California Sur" }, { id: "4", name: "Campeche" },
  { id: "5", name: "Coahuila" }, { id: "6", name: "Colima" },
  { id: "7", name: "Chiapas" }, { id: "8", name: "Chihuahua" },
  { id: "9", name: "Ciudad de México" }, { id: "10", name: "Durango" },
  { id: "11", name: "Guanajuato" }, { id: "12", name: "Guerrero" },
  { id: "13", name: "Hidalgo" }, { id: "14", name: "Jalisco" },
  { id: "15", name: "Estado de México" }, { id: "16", name: "Michoacán" },
  { id: "17", name: "Morelos" }, { id: "18", name: "Nayarit" },
  { id: "19", name: "Nuevo León" }, { id: "20", name: "Oaxaca" },
  { id: "21", name: "Puebla" }, { id: "22", name: "Querétaro" },
  { id: "23", name: "Quintana Roo" }, { id: "24", name: "San Luis Potosí" },
  { id: "25", name: "Sinaloa" }, { id: "26", name: "Sonora" },
  { id: "27", name: "Tabasco" }, { id: "28", name: "Tamaulipas" },
  { id: "29", name: "Tlaxcala" }, { id: "30", name: "Veracruz" },
  { id: "31", name: "Yucatán" }, { id: "32", name: "Zacatecas" },
]

function getWeatherIcon(desciel: string) {
  const d = desciel.toLowerCase()
  if (d.includes("despejado") || d.includes("soleado")) return <Sun className="size-6 text-yellow-400" />
  if (d.includes("lluvia") || d.includes("tormenta")) return <CloudRain className="size-6 text-blue-400" />
  if (d.includes("nieve") || d.includes("granizo")) return <CloudSnow className="size-6 text-white/60" />
  if (d.includes("nublado") || d.includes("nubes")) return <Cloud className="size-6 text-white/60" />
  return <Cloud className="size-6 text-white/40" />
}

export default function Weather({ isDarkMode = true }: WeatherProps) {
  const { t } = useTranslation()
  const [stateId, setStateId] = useState("19")
  const [data, setData] = useState<StateData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const fetchWeather = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const res = await fetch(`/api/weather?ides=${id}`)
      if (!res.ok) throw new Error("Error al obtener datos")
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch weather al abrir la app
  useEffect(() => { fetchWeather(stateId) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const filteredStates = search
    ? STATES.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    : STATES

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const muted = isDarkMode ? "text-gray-400" : "text-gray-500"
  const bg = isDarkMode ? "bg-gray-900" : "bg-white"
  const card = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const border = isDarkMode ? "border-gray-700" : "border-gray-200"
  const inputBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"

  return (
    <div className={`flex h-full flex-col ${bg} ${text}`}>
      {/* Search / State selector */}
      <div className={`border-b ${border} p-4`}>
        <div className={`relative ${inputBg} rounded-lg`}>
          <Search className={`absolute left-3 top-1/2 size-4 -translate-y-1/2 ${muted}`} />
          <input
            type="text"
            placeholder={t("searchState")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full bg-transparent py-2 pl-10 pr-4 text-sm focus:outline-none ${text}`}
          />
        </div>
        <div className="mt-2 flex max-h-32 flex-wrap gap-1.5 overflow-y-auto">
          {filteredStates.map((s) => (
            <button
              key={s.id}
               onClick={() => { setStateId(s.id); setSearch(""); fetchWeather(s.id) }}
              className={`rounded-lg px-2.5 py-1 text-xs transition-colors ${
                stateId === s.id
                  ? "bg-blue-500 text-white"
                  : `${card} ${muted} hover:bg-white/10`
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className={`size-8 animate-spin ${muted}`} />
          </div>
        ) : error ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <p className={`text-sm ${muted}`}>{error}</p>
            <button
              onClick={() => fetchWeather(stateId)}
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            >
              {t("retry")}
            </button>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Current */}
            <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-blue-400" />
                  <h2 className="text-2xl font-bold">{data.nes}</h2>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-6xl font-light">{data.tmax}°</span>
                  <div>
                    <p className="text-lg">{data.desciel}</p>
                    <p className={`text-sm ${muted}`}>Mín: {data.tmin}°</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details grid */}
            <div className={`grid grid-cols-2 gap-3 rounded-lg p-4 ${card}`}>
              <div className="flex items-center gap-2">
                <Thermometer className="size-4 text-orange-400" />
                <div>
                  <p className={`text-xs ${muted}`}>{t("feelsLike")}</p>
                  <p className="font-medium">
                    {((Number(data.tmax) + Number(data.tmin)) / 2).toFixed(1)}°
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="size-4 text-blue-400" />
                <div>
                  <p className={`text-xs ${muted}`}>{t("rain")}</p>
                  <p className="font-medium">{data.probprec}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="size-4 text-blue-400" />
                <div>
                  <p className={`text-xs ${muted}`}>{t("wind")}</p>
                  <p className="font-medium">{data.velvien} km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="size-4 text-white/50" />
                <div>
                  <p className={`text-xs ${muted}`}>{t("clouds")}</p>
                  <p className="font-medium">{data.cc}%</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={`rounded-lg p-4 ${card}`}>
              <div className="mb-2 flex items-center gap-2">
                {getWeatherIcon(data.desciel)}
                <span className="font-medium">{data.desciel}</span>
              </div>
              <div className={`grid grid-cols-2 gap-2 text-sm ${muted}`}>
                <span>{t("precipitation")}: {data.prec} mm</span>
                <span>{t("gusts")}: {data.raf} km/h</span>
                <span>{t("direction")}: {data.dirvienc}</span>
                <span>{t("municipalities")}: {data.municipios}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
