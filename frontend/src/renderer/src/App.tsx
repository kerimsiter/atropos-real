import { useState } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/auth.store'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { Button, Card, Title1 } from '@fluentui/react-components'

function Header() {
  const logout = useAuthStore((s) => s.logout)
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100
      }}
    >
      <Title1 as="h1" style={{ margin: 0, fontSize: '1.5rem' }}>
        Atropos Desktop
      </Title1>
      <Button appearance="primary" onClick={logout}>
        Çıkış Yap
      </Button>
    </header>
  )
}

function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        paddingTop: isAuthenticated ? '80px' : '0' // Header yüksekliği kadar boşluk
      }}
    >
      {isAuthenticated && <Header />}
      <main style={{ width: '100%', maxWidth: '1200px', padding: '2rem' }}>{children}</main>
    </div>
  )
}

function App(): React.JSX.Element {
  const [apiResponse, setApiResponse] = useState('Henüz kontrol edilmedi.')
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const handleCheckHealth = async (): Promise<void> => {
    try {
      const res = await fetch('http://localhost:3000/api/health')
      const data = await res.json()
      setApiResponse(`Durum: ${data.status}`)
    } catch (e) {
      setApiResponse("Hata: Backend'e ulaşılamadı.")
    }
  }

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/" replace />
    }
    return children
  }

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage onCheckHealth={handleCheckHealth} apiResponse={apiResponse} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}

export default App
