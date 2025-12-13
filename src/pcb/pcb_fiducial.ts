import { z } from "zod"
import { point, type Point, getZodPrefixedIdWithDefault } from "src/common"
import { distance, type Distance } from "src/units"
import { layer_ref, type LayerRef } from "src/pcb/properties/layer_ref"
import { expectTypesMatch } from "src/utils/expect-types-match"

export const pcb_fiducial = z
  .object({
    type: z.literal("pcb_fiducial"),
    pcb_fiducial_id: getZodPrefixedIdWithDefault("pcb_fiducial"),
    pcb_component_id: z.string().optional(),
    source_component_id: z.string().optional(),
    pcb_group_id: z.string().optional(),
    subcircuit_id: z.string().optional(),
    center: point,
    pad_diameter: distance,
    soldermask_pullback: distance.optional(),
    layer: layer_ref,
  })
  .describe("Defines a fiducial on the PCB for alignment")

export type PcbFiducialInput = z.input<typeof pcb_fiducial>
type InferredPcbFiducial = z.infer<typeof pcb_fiducial>

/**
 * Defines a fiducial on the PCB for alignment
 */
export interface PcbFiducial {
  type: "pcb_fiducial"
  pcb_fiducial_id: string
  pcb_component_id?: string
  source_component_id?: string
  pcb_group_id?: string
  subcircuit_id?: string
  center: Point
  pad_diameter: Distance
  soldermask_pullback?: Distance
  layer: LayerRef
}

expectTypesMatch<PcbFiducial, InferredPcbFiducial>(true)
