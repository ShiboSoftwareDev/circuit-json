import { test, expect } from "bun:test"
import { pcb_fiducial } from "../src/pcb/pcb_fiducial"
import { any_circuit_element } from "../src/any_circuit_element"

test("pcb_fiducial parses", () => {
  const fiducial = pcb_fiducial.parse({
    type: "pcb_fiducial",
    center: { x: 0, y: 0 },
    pad_diameter: "1mm",
    layer: "top",
  })
  expect(fiducial.type).toBe("pcb_fiducial")
  expect(fiducial.pad_diameter).toBe(1)
  expect(fiducial.soldermask_pullback).toBeUndefined()
})

test("pcb_fiducial with soldermask_pullback", () => {
  const fiducial = pcb_fiducial.parse({
    type: "pcb_fiducial",
    center: { x: 1, y: 1 },
    pad_diameter: "1.2mm",
    soldermask_pullback: "0.1mm",
    layer: "bottom",
  })
  expect(fiducial.pad_diameter).toBe(1.2)
  expect(fiducial.soldermask_pullback).toBe(0.1)
})

test("any_circuit_element includes pcb_fiducial", () => {
  const parsed = any_circuit_element.parse({
    type: "pcb_fiducial",
    center: { x: 1, y: 1 },
    pad_diameter: "1.2mm",
    layer: "bottom",
  })
  expect(parsed.type).toBe("pcb_fiducial")
})
