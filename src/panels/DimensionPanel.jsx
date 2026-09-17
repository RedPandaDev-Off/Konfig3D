import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useFurnitureStore from '../store/useFurnitureStore'

function DimensionField({ id, label, value, onChange, min = 1 }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          min={min}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="pr-10"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
          mm
        </span>
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
  const setBoxHeight = useFurnitureStore((state) => state.setboxHeight)

  return (
    <div className="flex flex-col gap-6">
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
    </div>
  )
}

export default DimensionPanel
