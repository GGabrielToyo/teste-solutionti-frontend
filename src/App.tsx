import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from './contexts/AuthProvider'
import { AppRoutes } from './routes'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <div className="min-h-screen bg-background text-foreground">
                    <AppRoutes />
                </div>
            </AuthProvider>
        </ThemeProvider>
  )
}

export default App
