import { create } from 'zustand'

const useFurnitureStore = create((set) => ({
  boxWidth: 1,
  setBoxWidth: (value) => set({ boxWidth: value }),

  boxDepth:1,
  setBoxDepth: (value) => set({ boxDepth: value }),

  boxHeight:1,
  setboxHeight: (value) => set({boxHeight:value}),

}))

export default useFurnitureStore