import { memo, useCallback } from 'react'

const pegRadius = 20
const pegSpacing = 70
const pegMargin = 40

type PegProps = {
  i: number
  j: number
  isOn: boolean
  setBoardPeg: (i: number, j: number, value: boolean) => void
}

const Peg = memo(function Peg({ i, j, isOn, setBoardPeg }: PegProps) {
  const onClick = useCallback(
    () => {
      console.info(`Setting (${i}, ${j}) to ${!isOn}`)
      setBoardPeg(i, j, !isOn)
    },
    [i, j, isOn, setBoardPeg]
  )

  const x = pegSpacing * i * 0.5 + pegMargin
  const y = pegSpacing * j + pegMargin + (i % 2 === 0 ? 0 : pegSpacing / 2)

  return (
    <circle
      cx={x}
      cy={y}
      r={pegRadius}
      onClick={onClick}
      style={{
        fill: isOn ? '#0f0' : '#000',
        cursor: 'pointer'
      }}
    />
  )
})
export default Peg
