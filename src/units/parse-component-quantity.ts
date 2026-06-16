import { parseAndConvertSiUnit } from "src/utils/convert-si-unit-to-number"

const componentQuantitySuffixMultipliers: Record<string, number> = {
  f: 1e-15,
  p: 1e-12,
  n: 1e-9,
  u: 1e-6,
  µ: 1e-6,
  m: 1e-3,
  k: 1e3,
  K: 1e3,
  M: 1e6,
  meg: 1e6,
  Meg: 1e6,
  G: 1e9,
  T: 1e12,
}

export const parseComponentQuantity = (v: string | number): number => {
  if (typeof v === "number") return v

  const trimmedValue = v.trim()
  const componentQuantityShorthandMatch = trimmedValue.match(
    /^(-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)\s*(meg|Meg|[fpnuµmkKMGT])$/,
  )

  if (componentQuantityShorthandMatch) {
    const value = Number.parseFloat(componentQuantityShorthandMatch[1]!)
    const suffix = componentQuantityShorthandMatch[2]!

    return value * componentQuantitySuffixMultipliers[suffix]!
  }

  return parseAndConvertSiUnit(v).value!
}
