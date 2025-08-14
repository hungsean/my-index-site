import { useState } from 'react'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Vite + React + shadcn/ui</h1>
      <div className="space-y-2">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="destructive">Destructive Button</Button>
      </div>
      <p className="text-muted-foreground">
        shadcn/ui has been successfully installed!
      </p>
    </div>
  )
}

export default App
