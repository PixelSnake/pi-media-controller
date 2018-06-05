export class Vector {
  public static up = new Vector(0, 1)
  public static down = new Vector(0, -1)
  public static readonly rad2deg = 180 / Math.PI

  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  minus(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y)
  }

  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y
  }

  angle(v: Vector): number {
    return Math.atan2(v.y - this.y, v.x - this.x)
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
}
