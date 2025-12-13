import { test, expect } from "bun:test"
import { source_simple_fiducial } from "../src/source/source_simple_fiducial"
import { any_circuit_element } from "../src/any_circuit_element"

test("source_simple_fiducial parses", () => {
  const fiducial = source_simple_fiducial.parse({
    type: "source_component",
    ftype: "simple_fiducial",
    source_component_id: "fiducial1",
    name: "F1",
  })
  expect(fiducial.ftype).toBe("simple_fiducial")
  expect(fiducial.pad_diameter).toBeUndefined()
})

test("any_circuit_element includes source_simple_fiducial", () => {
  const parsed = any_circuit_element.parse({
    type: "source_component",
    ftype: "simple_fiducial",
    source_component_id: "fiducial1",
    name: "F1",
    pad_diameter: "1mm",
    soldermask_pullback: "0.1mm",
  })
  if ("ftype" in parsed && parsed.ftype === "simple_fiducial") {
    expect(parsed.ftype).toBe("simple_fiducial")
    expect(parsed.pad_diameter).toBe(1)
    expect(parsed.soldermask_pullback).toBe(0.1)
  } else {
    throw new Error("Parsed element not a source_simple_fiducial")
  }
})
