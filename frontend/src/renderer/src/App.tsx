import { useState } from 'react'
import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/auth.store'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

function App(): React.JSX.Element {
  const [apiResponse, setApiResponse] = useState('Henüz kontrol edilmedi.')
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const handleCheckHealth = async (): Promise<void> => {
    try {
      const res = await fetch('http://localhost:3000/api/health')
      const data = await res.json()
      setApiResponse(`Durum: ${data.status}`)
    } catch (e) {
      setApiResponse("Hata: Backend'e ulaşılamadı.")
    }
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage onCheckHealth={handleCheckHealth} apiResponse={apiResponse} ipcHandle={ipcHandle} electronLogo={electronLogo} /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
      </Routes>
      <Versions></Versions>
    </HashRouter>
  )
}

export default App
