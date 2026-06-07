import { gunzipSync } from "zlib"

const CONAGUA_URL = "https://smn.conagua.gob.mx/tools/GUI/webservices/?method=1"

const STATE_NAMES: Record<string, string> = {
  "1": "Aguascalientes", "2": "Baja California", "3": "Baja California Sur",
  "4": "Campeche", "5": "Coahuila", "6": "Colima", "7": "Chiapas",
  "8": "Chihuahua", "9": "Ciudad de México", "10": "Durango",
  "11": "Guanajuato", "12": "Guerrero", "13": "Hidalgo",
  "14": "Jalisco", "15": "Estado de México", "16": "Michoacán",
  "17": "Morelos", "18": "Nayarit", "19": "Nuevo León", "20": "Oaxaca",
  "21": "Puebla", "22": "Querétaro", "23": "Quintana Roo",
  "24": "San Luis Potosí", "25": "Sinaloa", "26": "Sonora",
  "27": "Tabasco", "28": "Tamaulipas", "29": "Tlaxcala",
  "30": "Veracruz", "31": "Yucatán", "32": "Zacatecas",
}

interface Municipio {
  ides: string
  idmun: string
  nes: string
  nmun: string
  dloc: string
  ndia: string
  tmax: string
  tmin: string
  desciel: string
  probprec: string
  prec: string
  velvien: string
  dirvienc: string
  dirvieng: string
  cc: string
  raf: string
  lat: string
  lon: string
  dh: string
}

interface StateSummary {
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

let cache: { data: Municipio[]; ts: number } | null = null

async function fetchAll(): Promise<Municipio[]> {
  if (cache && Date.now() - cache.ts < 15 * 60 * 1000) return cache.data

  const res = await fetch(CONAGUA_URL, {
    headers: { "Accept-Encoding": "gzip" },
    next: { revalidate: 900 },
  })

  if (!res.ok) throw new Error(`CONAGUA responded ${res.status}`)

  const buf = Buffer.from(await res.arrayBuffer())
  const isGzip = buf[0] === 0x1f && buf[1] === 0x8b
  const raw = isGzip ? gunzipSync(buf).toString("utf-8") : buf.toString("utf-8")
  const data: Municipio[] = JSON.parse(raw)
  cache = { data, ts: Date.now() }
  return data
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ides = searchParams.get("ides")

  try {
    const all = await fetchAll()

    let filtered = all
    if (ides) {
      filtered = all.filter((m) => m.ides === ides)
    }

    if (ides && filtered.length === 0) {
      return Response.json({ error: "State not found" }, { status: 404 })
    }

    // Aggregate by state
    const grouped: Record<string, Municipio[]> = {}
    for (const m of filtered) {
      if (!grouped[m.ides]) grouped[m.ides] = []
      grouped[m.ides].push(m)
    }

    const states: StateSummary[] = Object.entries(grouped).map(([id, municipios]) => {
      const tmaxVals = municipios.map((m) => Number(m.tmax)).filter((v) => !isNaN(v))
      const tminVals = municipios.map((m) => Number(m.tmin)).filter((v) => !isNaN(v))
      return {
        ides: id,
        nes: municipios[0].nes,
        tmax: tmaxVals.length ? Math.max(...tmaxVals).toFixed(1) : "N/A",
        tmin: tminVals.length ? Math.min(...tminVals).toFixed(1) : "N/A",
        desciel: municipios[0].desciel,
        probprec: municipios[0].probprec,
        prec: municipios[0].prec,
        velvien: municipios[0].velvien,
        dirvienc: municipios[0].dirvienc,
        cc: municipios[0].cc,
        raf: municipios[0].raf,
        lat: municipios[0].lat,
        lon: municipios[0].lon,
        municipios: municipios.length,
      }
    })

    return Response.json(
      ides ? states[0] : { states, names: STATE_NAMES },
      {
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=300",
          "Access-Control-Allow-Origin": "*",
        },
      },
    )
  } catch (err) {
    console.error("Weather API error:", err)
    return Response.json({ error: "Failed to fetch weather data" }, { status: 502 })
  }
}
