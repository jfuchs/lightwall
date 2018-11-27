import { memo, useState, useCallback, useMemo } from 'react'
import Peg from './Peg'
import Layout from './Layout'

type PegData = {
  pegId: number
  x: number
  y: number
  voronoiPath: string
  color: boolean
}
type BoardRowData = Array<PegData>
type BoardData = Array<BoardRowData>

function useLayout() {
  return useMemo(
    () =>
      new Layout({ pegsWide: 19, pegsTall: 19, pegSpacing: 30, pegMargin: 30 }),
    []
  )
}

type SetPegFunction = (pegId: number, color: boolean) => void

function useBoardState(layout: Layout): [BoardData, SetPegFunction] {
  const [board, setBoard] = useState<BoardData>(() => {
    const initialBoard: BoardData = []
    for (const row of layout.rowIndicies()) {
      const boardRowData: BoardRowData = []
      for (const [col, index] of layout.colIndicies(row)) {
        const [x, y] = layout.pointForRowCol(row, col)
        boardRowData.push({
          pegId: index,
          x,
          y,
          voronoiPath: layout.voronoi.renderCell(index),
          color: false
        })
      }
      initialBoard.push(boardRowData)
    }
    return initialBoard
  })
  const setPeg: SetPegFunction = useCallback(
    (pegId: number, color: boolean) => {
      setBoard(prevBoard => {
        const [row, col] = layout.rowColFromIndex(pegId)
        const nextBoard = Array.from(prevBoard)
        nextBoard[row] = Array.from(nextBoard[row])
        nextBoard[row][col].color = color
        return nextBoard
      })
    },
    [setBoard, layout]
  )
  return [board, setPeg]
}

export default function Board() {
  const layout = useLayout()
  const [board, setPeg] = useBoardState(layout)

  return (
    <>
      <svg
        style={{ background: '#222' }}
        height={layout.height}
        width={layout.width}
      >
        {board.map((boardRow, rowIndex) => {
          return (
            <BoardRow
              key={rowIndex}
              rowIndex={rowIndex}
              boardRow={boardRow}
              setPeg={setPeg}
            />
          )
        })}
      </svg>
    </>
  )
}

type BoardRowProps = {
  rowIndex: number
  boardRow: BoardRowData
  setPeg: (pegId: number, color: boolean) => void
}

const BoardRow = memo(function BoardRow({ boardRow, setPeg }: BoardRowProps) {
  return (
    <>
      {boardRow.map(({ x, y, pegId, color, voronoiPath }, colIndex) => {
        return (
          <Peg
            key={colIndex}
            pegId={pegId}
            x={x}
            y={y}
            color={color}
            voronoiPath={voronoiPath}
            setPeg={setPeg}
          />
        )
      })}
    </>
  )
})
