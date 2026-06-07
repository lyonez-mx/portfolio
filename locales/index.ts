import type { Locale } from "@/hooks/useOSStore"
import { en } from "./en"
import { es } from "./es"

export type TranslationKey = keyof typeof en
type Dict = Record<TranslationKey, string>

const dictionaries: Record<Locale, Dict> = { en, es }

export function t(locale: Locale, key: TranslationKey): string {
  return dictionaries[locale][key] ?? key
}
