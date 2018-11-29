import { memo, useCallback, useMemo, useState } from 'react'
import Layout from './Layout'
import Peg from './Peg'
import Palette from './Palette'

export enum Color {
  None = 'null',
  Green = 'green',
  Orange = 'orange'
}
type PegData = {
  pegId: number
  x: number
  y: number
  voronoiPath: string
  color: Color
}
type BoardRowData = Array<PegData>
type BoardData = Array<BoardRowData>

export type SetPegFunction = (pegId: number) => void
export type SetColorFunction = (color: Color) => void

function useLayout() {
  return useMemo(
    () =>
      new Layout({ pegsWide: 79, pegsTall: 39, pegSpacing: 30, pegMargin: 30 }),
    []
  )
}

function useBoardState(
  layout: Layout
): [BoardData, SetPegFunction, Color, SetColorFunction] {
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
          color: Color.None
        })
      }
      initialBoard.push(boardRowData)
    }
    return initialBoard
  })
  const [color, setColor] = useState<Color>(Color.Green)
  const setPeg: SetPegFunction = useCallback(
    (pegId: number) => {
      setBoard(prevBoard => {
        const [row, col] = layout.rowColFromIndex(pegId)
        const nextBoard = Array.from(prevBoard)
        nextBoard[row] = Array.from(nextBoard[row])
        nextBoard[row][col].color = color
        return nextBoard
      })
    },
    [setBoard, layout, color]
  )
  return [board, setPeg, color, setColor]
}

export default function Board() {
  const layout = useLayout()
  const [board, setPeg, color, setColor] = useBoardState(layout)

  return (
    <>
      <Palette currentColor={color} setColor={setColor} />
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
  setPeg: SetPegFunction
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
