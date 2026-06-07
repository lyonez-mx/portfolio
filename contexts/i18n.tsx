"use client"

import { createContext, useContext, useCallback } from "react"
import { useOSStore, type Locale } from "@/hooks/useOSStore"
import { t as translate, type TranslationKey } from "@/locales"

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useOSStore((s) => s.locale)
  const setLocale = useOSStore((s) => s.setLocale)

  const tFn = useCallback((key: TranslationKey) => translate(locale, key), [locale])

  return <I18nContext.Provider value={{ locale, setLocale, t: tFn }}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useTranslation must be used inside I18nProvider")
  return ctx
}
