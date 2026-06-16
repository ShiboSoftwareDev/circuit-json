import { expect, test } from "bun:test"
import {
  capacitance,
  current,
  frequency,
  inductance,
  parseComponentQuantity,
  resistance,
  voltage,
} from "../src/units"
import { parseAndConvertSiUnit } from "../src/utils/convert-si-unit-to-number"

test("parseComponentQuantity parses bare SI suffixes for component values", () => {
  expect(parseComponentQuantity("10f")).toBeCloseTo(10e-15)
  expect(parseComponentQuantity("10p")).toBeCloseTo(10e-12)
  expect(parseComponentQuantity("10n")).toBeCloseTo(10e-9)
  expect(parseComponentQuantity("10u")).toBeCloseTo(10e-6)
  expect(parseComponentQuantity("10µ")).toBeCloseTo(10e-6)
  expect(parseComponentQuantity("10m")).toBeCloseTo(0.01)
  expect(parseComponentQuantity("10k")).toBeCloseTo(10000)
  expect(parseComponentQuantity("10K")).toBeCloseTo(10000)
  expect(parseComponentQuantity("10M")).toBeCloseTo(10000000)
  expect(parseComponentQuantity("10meg")).toBeCloseTo(10000000)
  expect(parseComponentQuantity("10G")).toBeCloseTo(10000000000)
  expect(parseComponentQuantity("10T")).toBeCloseTo(10000000000000)
})

test("electrical unit schemas share component quantity shorthand", () => {
  expect(resistance.parse("10m")).toBe(0.01)
  expect(capacitance.parse("10m")).toBe(0.01)
  expect(inductance.parse("10m")).toBe(0.01)
  expect(voltage.parse("10m")).toBe(0.01)
  expect(current.parse("10m")).toBe(0.01)
  expect(frequency.parse("10M")).toBe(10000000)
})

test("explicit units still parse through the generic SI unit parser", () => {
  expect(capacitance.parse("10mF")).toBe(0.01)
  expect(inductance.parse("10mH")).toBe(0.01)
  expect(voltage.parse("10mV")).toBe(0.01)
  expect(current.parse("10mA")).toBe(0.01)
  expect(frequency.parse("10MHz")).toBe(10000000)
})

test("bare m remains a length unit in the generic SI parser", () => {
  expect(parseAndConvertSiUnit("10m")).toEqual({
    parsedUnit: "m",
    unitOfValue: "mm",
    value: 10000,
  })
})
