import { Delaunay, Voronoi } from 'd3-delaunay'

export default class Layout {
  pegsWide: number
  pegsTall: number
  pegSpacing: number
  pegMargin: number
  height: number
  width: number
  voronoi: Voronoi<any>

  constructor({
    pegsWide,
    pegsTall,
    pegMargin,
    pegSpacing
  }: {
    pegsWide: number
    pegsTall: number
    pegSpacing: number
    pegMargin: number
  }) {
    this.pegsWide = pegsWide
    this.pegsTall = pegsTall
    this.pegSpacing = pegSpacing
    this.pegMargin = pegMargin
    this.height = pegSpacing * (pegsTall - 1) + pegMargin * 2
    this.width = pegSpacing * (pegsWide - 1) + pegMargin * 2

    const points: [number, number][] = []
    for (const [rowIndex, colIndex] of this.rowColPoints()) {
      points.push(this.pointForRowCol(rowIndex, colIndex))
    }
    const delaunay = Delaunay.from(points)
    this.voronoi = delaunay.voronoi([0, 0, this.width, this.height])
  }

  pointForRowCol(rowIndex: number, colIndex: number): [number, number] {
    const x =
      this.pegSpacing * colIndex +
      this.pegMargin +
      (rowIndex % 2 === 0 ? 0 : this.pegSpacing / 2)
    const y = this.pegSpacing * rowIndex * 0.5 + this.pegMargin
    return [x, y]
  }

  rowColFromIndex(index: number): [number, number] {
    let row = Math.floor(index / (2 * this.pegsWide - 1)) * 2
    let col = index % (2 * this.pegsWide - 1)
    if (col >= this.pegsWide) {
      col -= this.pegsWide
      row++
    }
    return [row, col]
  }

  pegCount(): number {
    return (
      this.pegsWide * this.pegsTall + (this.pegsWide - 1) * (this.pegsTall - 1)
    )
  }

  rowCount(): number {
    return this.pegsTall * 2 - 1
  }

  *rowIndicies(): Iterable<number> {
    for (let rowIndex = 0; rowIndex < this.rowCount(); rowIndex++) {
      yield rowIndex
    }
  }

  *colIndicies(rowIndex: number): Iterable<[number, number]> {
    const baseIndex = rowIndex * this.pegsWide - Math.floor(rowIndex / 2)
    // some rows have {pegsWide} rows. Others have {pegsWide - 1}
    const pegCount = rowIndex % 2 === 0 ? this.pegsWide : this.pegsWide - 1
    for (let colIndex = 0; colIndex < pegCount; colIndex++) {
      yield [colIndex, baseIndex + colIndex]
    }
  }

  *rowColPoints(): Iterable<[number, number, number]> {
    for (const rowIndex of this.rowIndicies()) {
      for (const [colIndex, index] of this.colIndicies(rowIndex)) {
        yield [rowIndex, colIndex, index]
      }
    }
  }
}
