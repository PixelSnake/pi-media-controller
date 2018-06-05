import { Vector } from './vector'

export interface GestureInformation {
  startPos: Vector
  endPos: Vector
  section: number
  magnitude: number
}
