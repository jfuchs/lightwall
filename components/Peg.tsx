import { memo, useCallback, useState } from 'react'

const pegRadius = 5

type PegProps = {
  pegId: number
  x: number
  y: number
  color: boolean
  voronoiPath: string
  setPeg: (id: number, color: boolean) => void
}

const Peg = memo(function Peg({
  pegId,
  x,
  y,
  color,
  voronoiPath,
  setPeg
}: PegProps) {
  const onClick = useCallback(
    () => {
      setPeg(pegId, !color)
    },
    [pegId, color, setPeg]
  )
  const [isHover, setIsHover] = useState<boolean>(false)

  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={isHover ? pegRadius * 2 : pegRadius}
        style={{
          fill: color ? '#0f0' : '#555'
        }}
      />
      <path
        d={voronoiPath}
        fillOpacity="0"
        onClick={onClick}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          cursor: 'crosshair'
        }}
      />
    </>
  )
})
export default Peg
