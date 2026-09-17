import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useFurnitureStore from '../store/useFurnitureStore'
import { TEXTURES } from '../furniture/textures'

function DimensionField({ id, label, value, onChange, min = 1, type = "number" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={type === "number" ? "pr-10" : ""}
        />
        {type === "number" && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
            mm
          </span>
        )}
      </div>
    </div>
  )
}

function DimensionPanel() {
  const boxWidth = useFurnitureStore((state) => state.boxWidth)
  const setBoxWidth = useFurnitureStore((state) => state.setBoxWidth)
  const boxDepth = useFurnitureStore((state) => state.boxDepth)
  const setBoxDepth = useFurnitureStore((state) => state.setBoxDepth)
  const boxHeight = useFurnitureStore((state) => state.boxHeight)
  const setBoxHeight = useFurnitureStore((state) => state.setBoxHeight)
  const color = useFurnitureStore((state) => state.color)
  const setColor=useFurnitureStore((state) => state.setColor)
  const furnitureType = useFurnitureStore((state) => state.furnitureType)
  const setFurnitureType = useFurnitureStore((state) => state.setFurnitureType)
  const textureIndex = useFurnitureStore((state) => state.textureIndex)
const setTextureIndex = useFurnitureStore((state) => state.setTextureIndex)
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="furnitureType" className="text-sm font-semibold text-foreground">
          Type de meuble
        </label>
        <select
          id="furnitureType"
          value={furnitureType}
          onChange={(e) => setFurnitureType(e.target.value)}
          className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
        >
          <option value="cube">Cube</option>
          <option value="sphere">Sphère</option>
        </select>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Dimensions</p>
        <p className="text-sm text-muted-foreground">
          Ajustez les mesures du meuble.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <DimensionField
          id="boxWidth"
          label="Largeur"
          value={boxWidth}
          onChange={setBoxWidth}
        />
        <DimensionField
          id="boxDepth"
          label="Profondeur"
          value={boxDepth}
          onChange={setBoxDepth}
        />
        <DimensionField
          id="boxHeight"
          label="Hauteur"
          value={boxHeight}
          onChange={setBoxHeight}
        />
      </div>
      <div className='flex flex-col gap-4'>

<div className="flex flex-col gap-1.5">
  <label htmlFor="texture" className="text-sm font-semibold text-foreground">
    Texture
  </label>
  <select
    id="texture"
    value={textureIndex}
    onChange={(e) => setTextureIndex(Number(e.target.value))}
    className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
  >
    {TEXTURES.map((tex, i) => (
      <option key={tex.id} value={i}>{tex.label}</option>
    ))}
  </select>
</div>
{/*<DimensionField
type="color"
  id="color"
  label="color"
  value={color}
  onChange={setColor}
/>
      </div>
      <div>
        */}
      </div>
    </div>
  )
}

export default DimensionPanel
