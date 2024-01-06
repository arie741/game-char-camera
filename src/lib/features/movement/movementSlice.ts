import { createSlice } from '@reduxjs/toolkit'

export enum Direction {
    Neutral = "neutral",
    Up = "up",
    Left = "left",
    Right = "right",
    Down = "down",
    DiagonalUpLeft = "diagonalUpLeft",
    DiagonalUpRight = "diagonalUpRight",
    DiagonalDownLeft = "diagonalDownLeft",
    DiagonalDownRight = "diagonalDownRight",
}

const movementSlice = createSlice({
  name: 'movement',
  initialState: {
    value: Direction.Neutral
  },
  reducers: {
    setCharMovement(state, action) {
        state.value = action.payload.direction
    },
  }
})

export const { setCharMovement } = movementSlice.actions
export default movementSlice.reducer