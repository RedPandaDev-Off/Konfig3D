import { create } from 'zustand'

const useFurnitureStore = create((set) => ({
  boxWidth: 1,
  setBoxWidth: (value) => set({ boxWidth: value }),

  boxDepth:1,
  setBoxDepth: (value) => set({ boxDepth: value }),

  boxHeight:1,
  setBoxHeight: (value) => set({boxHeight:value}),

color:'0xffffff',
setColor: (value) => set ({color :value}),

furnitureType: 'cube',
setFurnitureType: (value) => set({ furnitureType: value }),

textureIndex: 0,
setTextureIndex: (value) => set({ textureIndex: value }),
}))

export default useFurnitureStore