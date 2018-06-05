import { Component, OnInit } from '@angular/core'
import { Vector } from '../../../shared/types/vector'
import { GestureInformation } from '../../../shared/types/gestureInformation'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  static readonly minMagnitude = 100
  static readonly sectionTilt = 45
  static readonly sections = 4

  start: Vector
  lastPosition: Vector
  currentGesture: GestureInformation

  finishedGesture: GestureInformation
  gestureConfirmationTimeout: any

  constructor() {
  }

  ngOnInit() {
  }

  onTouchStart(e: TouchEvent) {
    this.started(new Vector(e.touches[0].clientX, e.touches[0].clientY))
  }

  onTouchMove(e: TouchEvent) {
    this.moved(new Vector(e.touches[0].clientX, e.touches[0].clientY))
  }

  onTouchEnd(e: TouchEvent) {
    this.ended(this.lastPosition)
  }

  onMouseDown(e: MouseEvent) {
    this.started(new Vector(e.clientX, e.clientY))
  }

  onMouseMove(e: MouseEvent) {
    this.moved(new Vector(e.clientX, e.clientY))
  }

  onMouseUp(e: MouseEvent) {
    this.ended(new Vector(e.clientX, e.clientY))
  }

  private started(vec: Vector) {
    this.start = vec
  }

  private moved(vec: Vector) {
    if (!this.start) return
    this.lastPosition = vec

    this.currentGesture = this.getGestureInformation(vec)
  }

  private ended(vec: Vector) {
    const ab = vec.minus(this.start)
    if (ab.magnitude() < HomeComponent.minMagnitude) {
      this.start = null
      return
    }

    const gesture = this.getGestureInformation(vec)
    if (gesture.magnitude > HomeComponent.minMagnitude) {
      this.finishGesture(gesture)
    }

    this.start = null
    this.currentGesture = null
  }

  private getGestureInformation(vec: Vector): GestureInformation {
    const ab = vec.minus(this.start)

    let angle = ab.angle(Vector.down) * Vector.rad2deg + HomeComponent.sectionTilt
    if (angle < 0) {
      angle += 360
    }

    let section
    const step = 360 / HomeComponent.sections
    for (let i = 0; i < HomeComponent.sections; ++i) {
      const lowerBound = i * step
      const upperBound = lowerBound + step

      if (angle > lowerBound && angle <= upperBound) {
        section = i
        break
      }
    }

    return {
      startPos: this.start,
      endPos: vec,
      magnitude: ab.magnitude(),
      section: section
    }
  }

  finishGesture(gesture: GestureInformation) {
    this.finishedGesture = gesture
    if (this.gestureConfirmationTimeout) {
      clearTimeout(this.gestureConfirmationTimeout)
    }
    this.gestureConfirmationTimeout = setTimeout(() => this.finishedGesture = null, 2000)
  }

  getGestureDescription(gesture: GestureInformation): string {
    const descriptions = {
      0: 'Previous',
      1: 'Pause',
      2: 'Next',
      3: 'Continue'
    }
    return descriptions[gesture.section]
  }

  getGestureIcon(gesture: GestureInformation): string {
    const descriptions = {
      0: 'backward',
      1: 'pause',
      2: 'forward',
      3: 'play'
    }
    return descriptions[gesture.section]
  }
}