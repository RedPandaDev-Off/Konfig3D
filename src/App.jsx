import Viewer3D from './Viewer3D'
import DimensionPanel from './panels/DimensionPanel'

function App() {
  return (
    <div className="flex h-svh flex-col bg-background text-foreground">
      <header className="flex h-14 shrink-0 items-center border-b border-border px-6">
        <span className="text-base font-semibold tracking-tight">
          Configurateur
        </span>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="w-80 shrink-0 overflow-y-auto border-r border-border p-6">
          <DimensionPanel />
        </aside>

        <main className="relative min-w-0 flex-1 bg-muted/20">
          <Viewer3D />
        </main>
      </div>
    </div>
  )
}

export default App
