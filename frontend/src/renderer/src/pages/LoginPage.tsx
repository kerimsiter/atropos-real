import { useState } from 'react'
import { Button, Input, Label } from '@fluentui/react-components'
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
      // Backend'de AuthController 'auth' yolunda. Global 'api' prefix yok.
      // Bu nedenle '/auth/login' kullanıyoruz.
      const res = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      })
      const token: string = res.data?.access_token
      if (!token) throw new Error('Token alınamadı')
      const decoded: any = jwtDecode(token)
      const user = {
        id: decoded?.sub,
        username: decoded?.username,
        roles: decoded?.roles,
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
    <div style={{ maxWidth: 360, margin: '64px auto', fontFamily: 'Inter, system-ui, Arial' }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin} style={{ display: 'grid', gap: 12 }}>
        <div>
          <Label htmlFor="username">Kullanıcı Adı</Label>
          <Input id="username" value={username} onChange={(e) => setUsername((e.target as HTMLInputElement).value)} required />
        </div>
        <div>
          <Label htmlFor="password">Şifre</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword((e.target as HTMLInputElement).value)} required />
        </div>
        {error && (
          <div style={{ color: 'crimson', fontSize: 12 }}>
            {Array.isArray(error) ? error.join(', ') : error}
          </div>
        )}
        <Button appearance="primary" type="submit" disabled={loading}>
          {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </Button>
      </form>
    </div>
  )
}
