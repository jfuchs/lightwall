import { Color, SetColorFunction } from './Board'
import { memo } from 'react'

type Props = {
  currentColor: Color
  setColor: SetColorFunction
}

const Palette = memo(function Palette({ currentColor, setColor }: Props) {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <button onClick={() => setColor(Color.None)}>
              {String(Color.None)}
            </button>
          </td>
          <td>
            <button onClick={() => setColor(Color.Green)}>
              {String(Color.Green)}
            </button>
          </td>
          <td>
            <button onClick={() => setColor(Color.Orange)}>
              {String(Color.Orange)}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
})

export default Palette
