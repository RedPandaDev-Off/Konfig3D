import useFurnitureStore from '../store/useFurnitureStore'

function DimensionPanel() {
  const boxWidth = useFurnitureStore((state) => state.boxWidth)
  const setBoxWidth = useFurnitureStore((state) => state.setBoxWidth)
  const boxDepth = useFurnitureStore((state)=> state.boxDepth)
  const setboxDepth = useFurnitureStore((state) => state.setBoxDepth)
  const boxHeight = useFurnitureStore((state)=> state.boxHeight)
  const setboxHeight = useFurnitureStore((state)=> state.setboxHeight)

  return (
    <div>
        <label htmlFor='boxDepth'>Depth</label>
        <input
        id="boxDepth"
        type='slider'
        value={boxDepth}
        onChange={(e) => setboxDepth(Number(e.target.value))}
        />
                <label htmlFor='boxHeight'>boxHeight</label>
        <input
        id="boxHeight"
        type='slider'
        value={boxHeight}
        onChange={(e) => setboxHeight(Number(e.target.value))}
        />
      <label htmlFor="boxWidth">Largeur</label>
      <input
        id="boxWidth"
        type="number"
        value={boxWidth}
        onChange={(e) => setBoxWidth(Number(e.target.value))}
      />
    </div>
  )
}

export default DimensionPanel