import { Button } from '@fluentui/react-components'

interface Props {
  onCheckHealth: () => Promise<void>
  apiResponse: string
  ipcHandle: () => void
  electronLogo: string
}

export default function HomePage({ onCheckHealth, apiResponse, ipcHandle, electronLogo }: Props) {
  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <div style={{ padding: 24, fontFamily: 'Inter, system-ui, Arial' }}>
        <h1>Atropos Desktop</h1>
        <Button appearance="primary" onClick={onCheckHealth}>
          Backend Durumunu Kontrol Et
        </Button>
        <p style={{ marginTop: 12 }}>{apiResponse}</p>
      </div>
    </>
  )
}
