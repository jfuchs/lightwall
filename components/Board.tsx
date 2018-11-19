import { memo, useState, useCallback } from 'react'
import Peg from './Peg'

type BoardColumnData = Array<boolean>
type Board = Array<BoardColumnData>

const pegsWide = 32
const pegsTall = 32
const pegSpacing = 70
const pegMargin = 40

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

export default function Board() {
  const [board, setBoard] = useState<Board>(emptyBoard())
  const setBoardPeg = useCallback(
    (i: number, j: number, value: boolean) => {
      setBoard(prevBoard => {
        let nextBoard = Array.from(prevBoard)
        nextBoard[i] = Array.from(nextBoard[i])
        nextBoard[i][j] = value
        return nextBoard
      })
    },
    [setBoard]
  )

  return (
    <>
      <svg
        style={{ background: '#222' }}
        height={pegSpacing * (pegsTall - 1) + pegMargin * 2}
        width={pegSpacing * (pegsWide - 1) + pegMargin * 2}
      >
        {board.map((boardColumn, i) => {
          return (
            <BoardColumn
              key={i}
              i={i}
              boardColumn={boardColumn}
              setBoardPeg={setBoardPeg}
            />
          )
        })}
      </svg>
    </>
  )
}

type BoardColumnProps = {
  i: number
  boardColumn: BoardColumnData
  setBoardPeg: (i: number, j: number, value: boolean) => void
}

const BoardColumn = memo(function BoardColumn({
  i,
  boardColumn,
  setBoardPeg
}: BoardColumnProps) {
  return (
    <>
      {boardColumn.map((isOn, j) => {
        return <Peg key={j} i={i} j={j} isOn={isOn} setBoardPeg={setBoardPeg} />
      })}
    </>
  )
})
