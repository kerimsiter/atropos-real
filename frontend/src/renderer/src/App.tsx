import { useState } from 'react'
import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function App(): React.JSX.Element {
  const [apiResponse, setApiResponse] = useState('Henüz kontrol edilmedi.')
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
        <button onClick={handleCheckHealth} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          Backend Durumunu Kontrol Et
        </button>
        <p style={{ marginTop: 12 }}>{apiResponse}</p>
      </div>
      <div style={{ padding: 24, fontFamily: 'Inter, system-ui, Arial' }}>
        <h1>Atropos Desktop</h1>
        <button onClick={handleCheckHealth} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          Backend Durumunu Kontrol Et
        </button>
        <p style={{ marginTop: 12 }}>{apiResponse}</p>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
