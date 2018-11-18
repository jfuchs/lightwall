import { useState } from 'react'

type BoardColumn = Array<boolean>
type Board = Array<BoardColumn>

const pegsWide = 16
const pegsTall = 9
const pegSpacing = 70
const pegMargin = 40
const pegRadius = 20

const emptyBoard = (): Board => {
  const result: Board = []
  for (let i = 0; i < pegsWide * 2 - 1; i++) {
    result[i] = []
    const pegCount = i % 2 === 0 ? pegsTall : pegsTall - 1
    for (let j = 0; j < pegCount; j++) {
      result[i][j] = Boolean(Math.round(Math.random()))
    }
  }
  return result
}

type PegProps = {
  isOn: boolean
  onClick: () => void
}

const Peg = function Peg({ isOn, onClick }: PegProps) {
  return (
    <circle
      r={pegRadius}
      onClick={onClick}
      style={{
        fill: isOn ? '#0f0' : '#000',
        cursor: 'pointer'
      }}
    />
  )
}

export default function Board() {
  const [board, setBoard] = useState<Board>(emptyBoard())

  function setBoardPeg(i: number, j: number, value: boolean) {
    let newBoard = Array.from(board)
    newBoard[i] = Array.from(newBoard[i])
    newBoard[i][j] = value
    setBoard(newBoard)
  }

  return (
    <>
      <svg
        style={{ background: '#222' }}
        height={pegSpacing * (pegsTall - 1) + pegMargin * 2}
        width={pegSpacing * (pegsWide - 1) + pegMargin * 2}
      >
        {board.map((boardColumn, i) => {
          return boardColumn.map((isOn, j) => {
            const x = pegSpacing * i * 0.5 + pegMargin
            const y =
              pegSpacing * j + pegMargin + (i % 2 === 0 ? 0 : pegSpacing / 2)
            return (
              <g key={`${i},${j}`} transform={`translate(${x}, ${y})`}>
                <Peg
                  isOn={isOn}
                  onClick={setBoardPeg.bind(null, i, j, !isOn)}
                />
              </g>
            )
          })
        })}
      </svg>
    </>
  )
}
