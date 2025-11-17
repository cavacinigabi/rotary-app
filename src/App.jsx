import "./App.css";

function App() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    form.classList.add("was-validated");
  };

  return (
    <div id="beneficiaries" className="prototype-screen active">
      <div className="screen-frame">
        <div className="screen-header">
          <h3>Cadastro de Beneficiários</h3>
        </div>
        <div className="screen-content">
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <h5 style={{ marginBottom: "20px", color: "#1e3c72" }}>
              Dados Pessoais
            </h5>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Nome Completo:</label>
                <input
                  type="text"
                  id="nome"
                  className="form-control"
                  placeholder="Nome completo do beneficiário"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe o nome completo.
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cpf">CPF:</label>
                <input
                  type="text"
                  id="cpf"
                  className="form-control"
                  placeholder="000.000.000-00"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe um CPF válido.
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rg">RG:</label>
                <input
                  type="text"
                  id="rg"
                  className="form-control"
                  placeholder="00.000.000-0"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe um RG válido.
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="data_nascimento">Data de Nascimento:</label>
                <input
                  type="date"
                  id="data_nascimento"
                  className="form-control"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe a data de nascimento.
                </div>
              </div>
            </div>

            <h5 style={{ margin: "30px 0 20px", color: "#1e3c72" }}>Contato</h5>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="telefone">Telefone:</label>
                <input
                  type="tel"
                  id="telefone"
                  className="form-control"
                  placeholder="(18) 9999-9999"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe um telefone válido.
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="beneficiario@email.com"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe um email válido.
                </div>
              </div>
            </div>

            <h5 style={{ margin: "30px 0 20px", color: "#1e3c72" }}>
              Endereço
            </h5>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="endereco">Endereço Completo:</label>
                <input
                  type="text"
                  id="endereco"
                  className="form-control"
                  placeholder="Rua, número, complemento"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe o endereço completo.
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bairro">Bairro:</label>
                <input
                  type="text"
                  id="bairro"
                  className="form-control"
                  placeholder="Nome do bairro"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe o bairro.
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cidade">Cidade:</label>
                <input
                  type="text"
                  id="cidade"
                  className="form-control"
                  placeholder="Nome da cidade"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe a cidade.
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cep">CEP:</label>
                <input
                  type="text"
                  id="cep"
                  className="form-control"
                  placeholder="00000-000"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe um CEP válido.
                </div>
              </div>
            </div>

            <h5 style={{ margin: "30px 0 20px", color: "#1e3c72" }}>
              Contato de Emergência
            </h5>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contato_emergencia">Nome:</label>
                <input
                  type="text"
                  id="contato_emergencia"
                  className="form-control"
                  placeholder="Nome do contato de emergência"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe o nome do contato de emergência.
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="telefone_emergencia">Telefone:</label>
                <input
                  type="tel"
                  id="telefone_emergencia"
                  className="form-control"
                  placeholder="(18) 9999-9999"
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe um telefone de emergência válido.
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="necessidade_especifica">
                Necessidade Específica:
              </label>
              <textarea
                id="necessidade_especifica"
                className="form-control"
                rows="3"
                placeholder="Descreva a necessidade específica do beneficiário..."
                required
              ></textarea>
              <div className="invalid-feedback">
                Por favor, descreva a necessidade específica do beneficiário.
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Salvar Beneficiário
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
