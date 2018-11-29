import { memo, useCallback, useState } from 'react'

import { Color, SetPegFunction } from './Board'

const pegRadius = 5

type PegProps = {
  pegId: number
  x: number
  y: number
  color: Color
  voronoiPath: string
  setPeg: SetPegFunction
}

const Peg = memo(function Peg({
  pegId,
  x,
  y,
  color,
  voronoiPath,
  setPeg
}: PegProps) {
  const set = useCallback(
    () => {
      setPeg(pegId)
    },
    [pegId, color, setPeg]
  )
  const [isHover, setIsHover] = useState<boolean>(false)

  const colorCode =
    color === Color.Green ? '#0f0' : color === Color.Orange ? '#fa0' : '#555'
  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={isHover ? pegRadius * 2 : pegRadius}
        style={{
          fill: colorCode
        }}
      />
      <path
        d={voronoiPath}
        fillOpacity="0"
        onMouseDown={set}
        onMouseEnter={e => {
          setIsHover(true)
          if (e.buttons === 1) {
            set()
          }
        }}
        onMouseLeave={() => setIsHover(false)}
        style={{
          cursor: 'crosshair'
        }}
      />
    </>
  )
})
export default Peg
