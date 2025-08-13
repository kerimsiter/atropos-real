import { useState } from 'react'
import {
  Button,
  Input,
  Label,
  Title1,
  Card,
  CardHeader
} from '@fluentui/react-components'
import axios from 'axios'
import { useAuthStore } from '../stores/auth.store'
import { jwtDecode } from 'jwt-decode'

export default function LoginPage() {
  const login = useAuthStore((s) => s.login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      })
      const token: string = res.data?.access_token
      if (!token) throw new Error('Token alınamadı')
      const decoded: any = jwtDecode(token)
      const user = {
        id: decoded?.sub,
        username: decoded?.username,
        roles: decoded?.roles
      }
      login(token, user)
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Giriş başarısız (401)')
      } else {
        setError(err.message || 'Beklenmeyen bir hata oluştu')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: '400px', padding: '16px' }}>
        <CardHeader
          header={
            <Title1 as="h1" style={{ textAlign: 'center', width: '100%' }}>
              Giriş Yap
            </Title1>
          }
        />
        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '20px', marginTop: '16px' }}>
          <div style={{ display: 'grid', gap: '4px' }}>
            <Label htmlFor="username">Kullanıcı Adı</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
              required
            />
          </div>
          <div style={{ display: 'grid', gap: '4px' }}>
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
              required
            />
          </div>
          {error && (
            <div style={{ color: '#C53929', fontSize: 14, marginTop: '4px' }}>
              {Array.isArray(error) ? error.join(', ') : error}
            </div>
          )}
          <Button
            appearance="primary"
            type="submit"
            disabled={loading}
            style={{ marginTop: '16px' }}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
