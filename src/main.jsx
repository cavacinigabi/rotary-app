import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CadastrarBeneficiarios from './CadastrarBeneficiarios.jsx'
import Header from './componentes/formularios/Header.jsx'
import CadastrarMembros from './CadastrarMembros.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <CadastrarMembros></CadastrarMembros>
    
  </StrictMode>,
)
