import {
  Button,
  Title1,
  Card,
  CardHeader,
  Title3,
  Body1
} from '@fluentui/react-components'
import { useAuthStore } from '../stores/auth.store'

interface Props {
  onCheckHealth: () => Promise<void>
  apiResponse: string
}

export default function HomePage({ onCheckHealth, apiResponse }: Props) {
  const user = useAuthStore((s) => s.user)

  return (
    <div>
      <Title1 as="h1" style={{ marginBottom: '24px' }}>
        Hoş Geldin, {user?.firstName || user?.username}!
      </Title1>
      <Card>
        <CardHeader header={<Title3 as="h3">Sistem Durumu</Title3>} />
        <div style={{ padding: '16px' }}>
          <Body1 style={{ marginBottom: '16px' }}>
            Backend servisinin durumunu kontrol etmek için butona tıklayın.
          </Body1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button appearance="primary" onClick={onCheckHealth}>
              Backend Durumunu Kontrol Et
            </Button>
            <Body1>{apiResponse}</Body1>
          </div>
        </div>
      </Card>
    </div>
  )
}
