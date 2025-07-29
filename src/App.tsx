import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { AppRoutes } from './routes'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className=" bg-background text-foreground">
        <AppRoutes />
      </div>
    </ThemeProvider>
  )
}

export default App
