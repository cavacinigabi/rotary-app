import "./header.css"

function header() {
    return ( 
        <div className="prototype-container">
        <div className="header">
            <h1>🎡 RotaryAssist</h1>
            <p>Sistema de Gerenciamento de Equipamentos de Mobilidade</p>
        </div>

        <div className="nav-tabs">
            <button className="nav-tab active" onclick="">Login</button>
            <button className="nav-tab" onclick="">Dashboard</button>
            <button className="nav-tab" onclick="">Equipamentos</button>
            <button className="nav-tab" onclick="">Beneficiários</button>
            <button className="nav-tab" onclick="">Empréstimos</button>
            <button className="nav-tab" onclick="">Devoluções</button>
            <button className="nav-tab" onclick="">Relatórios</button>
            <button className="nav-tab" onclick="">Manutenção</button>
        </div>
        </div>
     );
}

export default header;