import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { GestureInformation } from '../../types/gestureInformation'
import { Vector } from '../../types/vector'

@Component({
  selector: 'app-gesture-receiver',
  templateUrl: './gesture-receiver.component.html',
  styleUrls: ['./gesture-receiver.component.scss']
})
export class GestureReceiverComponent implements OnInit {
  static readonly minMagnitude = 100
  static readonly sectionTilt = 22.5
  static readonly sections = 8

  start: Vector
  lastPosition: Vector
  currentGesture: GestureInformation

  showGestureConfirmation = false
  finishedGesture: GestureInformation
  gestureConfirmationTimeout: any

  constructor(private apiService: ApiService) {
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
    if (ab.magnitude() < GestureReceiverComponent.minMagnitude) {
      this.start = null
      return
    }

    const gesture = this.getGestureInformation(vec)
    if (gesture.magnitude > GestureReceiverComponent.minMagnitude) {
      this.finishGesture(gesture)
    }

    this.start = null
    this.currentGesture = null
  }

  private getGestureInformation(vec: Vector): GestureInformation {
    const ab = vec.minus(this.start)

    let angle = ab.angle(Vector.down) * Vector.rad2deg + GestureReceiverComponent.sectionTilt
    if (angle < 0) {
      angle += 360
    }

    let section
    const step = 360 / GestureReceiverComponent.sections
    for (let i = 0; i < GestureReceiverComponent.sections; ++i) {
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
    this.apiService.postAction(
      this.getGestureType(gesture.section),
      this.getGesture(gesture.section),
      this.getGesturePayload(gesture.section)
    ).subscribe()

    this.showGestureConfirmation = true
    this.finishedGesture = gesture
    if (this.gestureConfirmationTimeout) {
      clearTimeout(this.gestureConfirmationTimeout)
    }
    this.gestureConfirmationTimeout = setTimeout(() => this.showGestureConfirmation = false, 2000)
  }

  getGestureType(section: number): string {
    const types = {
      0: 'key',
      1: 'command',
      3: 'command',
      4: 'key',
      6: 'key'
    }
    return types[section]
  }

  getGesturePayload(section: number): any {
    const payloads = {
      1: '1',
      3: '2'
    }
    return payloads[section]
  }

  getGesture(section: number): string {
    const gestures = {
      0: 'audio_next',
      1: 'endpointController',
      3: 'endpointController',
      4: 'audio_prev',
      6: 'audio_pause'
    }
    return gestures[section]
  }

  getGestureIcon(gesture: GestureInformation): string {
    const descriptions = {
      0: 'forward',
      1: 'headphones',
      3: 'volume-up',
      4: 'backward',
      6: 'play'
    }
    return descriptions[gesture.section]
  }
}
