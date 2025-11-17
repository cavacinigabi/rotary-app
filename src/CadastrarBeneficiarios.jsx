import { useState, useEffect } from "react";
import "./App.css";
import FormButton from "./componentes/formularios/formButton.jsx";
import FormButtonSecondary from "./componentes/formularios/FormButtonSecondary.jsx";
import FormInput from "./componentes/formularios/FormInput.jsx";

function App() {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    data_nascimento: "",
    telefone: "",
    email: "",
    endereco: "",
    bairro: "",
    cidade: "",
    cep: "",
    contato_emergencia: "",
    telefone_emergencia: "",
    necessidade_especifica: "",
  });

  const [filtro, setFiltro] = useState("");
  const [erros, setErros] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [beneficiarioExcluir, setBeneficiarioExcluir] = useState(null);

  useEffect(() => {
    const beneficiariosSalvos = localStorage.getItem("beneficiarios");
    if (beneficiariosSalvos) {
      setBeneficiarios(JSON.parse(beneficiariosSalvos));
    }
  }, []);

  // Função genérica para atualizar qualquer campo
  const handleInputChange = (campo, valor) => {
    setFormData({ ...formData, [campo]: valor });
  };

  /*Máscara CPF*/
  const aplicarMascaraCPF = (valor) => {
    valor = valor.replace(/\D/g, "").substring(0, 11);

    if (valor.length === 11) {
      return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return valor;
  };

  const handleCpfChange = (e) => {
    const cpfFormatado = aplicarMascaraCPF(e.target.value);
    setFormData({ ...formData, cpf: cpfFormatado });
  };

  /*Máscara RG*/
  const aplicarMascaraRG = (valor) => {
    valor = valor.replace(/\D/g, "").substring(0, 9);

    if (valor.length === 9) {
      return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
    }
    return valor;
  };

  const handleRgChange = (e) => {
    const rgFormatado = aplicarMascaraRG(e.target.value);
    setFormData({ ...formData, rg: rgFormatado });
  };

  const validarFormulario = () => {
    const novosErros = {};

    // Validar CPF
    if (!formData.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      novosErros.cpf = "CPF deve estar no formato 000.000.000-00";
    }

    // Verificar CPF duplicado
    if (beneficiarios.some((b) => b.cpf === formData.cpf)) {
      novosErros.cpf = "Este CPF já está cadastrado";
    }

    // Validar RG
    if (!formData.rg || !/^\d{2}\.\d{3}\.\d{3}-\d{1}$/.test(formData.rg)) {
      novosErros.rg = "RG deve estar no formato 00.000.000-0";
    }

    // Verificar RG duplicado
    if (beneficiarios.some((b) => b.rg === formData.rg)) {
      novosErros.rg = "Este RG já está cadastrado";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      const form = e.target;
      form.classList.add("was-validated");
      return;
    }

    const novoBeneficiario = {
      id: Date.now(),
      ...formData
    };

    const novosBeneficiarios = [...beneficiarios, novoBeneficiario];
    setBeneficiarios(novosBeneficiarios);
    localStorage.setItem('beneficiarios', JSON.stringify(novosBeneficiarios));

    setFormData({
      nome: "",
      cpf: "",
      rg: "",
      data_nascimento: "",
      telefone: "",
      email: "",
      endereco: "",
      bairro: "",
      cidade: "",
      cep: "",
      contato_emergencia: "",
      telefone_emergencia: "",
      necessidade_especifica: "",
    });

    setErros({});
    alert('Beneficiário cadastrado com sucesso!');
  };

  return (
    <div id="beneficiaries" className="prototype-screen active">
      <div className="screen-frame">
        <div className="screen-header">
          <h3>Cadastro de Beneficiários</h3>
        </div>

        <div className="screen-content">
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <h5>Dados Pessoais</h5>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Nome Completo:</label>
                <FormInput
                  id="nome"
                  type="text"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Nome completo do beneficiário"
                  invalidFeedback="Por favor, informe o nome completo."
                />
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF:</label>
                <FormInput
                  type="text"
                  id="cpf"
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  isInvalid={!!erros.cpf}
                  placeholder="000.000.000-00"
                  invalidFeedback={erros.cpf || "Por favor, informe um CPF válido."}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rg">RG:</label>
                <FormInput
                  type="text"
                  id="rg"
                  value={formData.rg}
                  onChange={handleRgChange}
                  isInvalid={!!erros.rg}
                  placeholder="00.000.000-0"
                  invalidFeedback={erros.rg || "Por favor, informe um RG válido."}
                />
              </div>

              <div className="form-group">
                <label htmlFor="data_nascimento">Data de Nascimento:</label>
                <FormInput
                  type="date"
                  id="data_nascimento"
                  value={formData.data_nascimento}
                  onChange={(e) => handleInputChange('data_nascimento', e.target.value)}
                  invalidFeedback="Por favor, informe a data de nascimento."
                />
              </div>
            </div>

            <h5>Contato</h5>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="telefone">Telefone:</label>
                <FormInput
                  type="tel"
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  placeholder="(18) 9999-9999"
                  invalidFeedback="Por favor, informe um telefone válido."
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <FormInput
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="beneficiario@email.com"
                  invalidFeedback="Por favor, informe um email válido."
                />
              </div>
            </div>

            <h5>Endereço</h5>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="endereco">Endereço Completo:</label>
                <FormInput
                  type="text"
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  placeholder="Rua, número, complemento"
                  invalidFeedback="Por favor, informe o endereço completo."
                />
              </div>
              <div className="form-group">
                <label htmlFor="bairro">Bairro:</label>
                <FormInput
                  type="text"
                  id="bairro"
                  value={formData.bairro}
                  onChange={(e) => handleInputChange('bairro', e.target.value)}
                  placeholder="Nome do bairro"
                  invalidFeedback="Por favor, informe o bairro."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cidade">Cidade:</label>
                <FormInput
                  type="text"
                  id="cidade"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  placeholder="Nome da cidade"
                  invalidFeedback="Por favor, informe a cidade."
                />
              </div>
              <div className="form-group">
                <label htmlFor="cep">CEP:</label>
                <FormInput
                  type="text"
                  id="cep"
                  value={formData.cep}
                  onChange={(e) => handleInputChange('cep', e.target.value)}
                  placeholder="00000-000"
                  invalidFeedback="Por favor, informe um CEP válido."
                />
              </div>
            </div>

            <h5>Contato de Emergência</h5>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contato_emergencia">Nome:</label>
                <FormInput
                  type="text"
                  id="contato_emergencia"
                  value={formData.contato_emergencia}
                  onChange={(e) => handleInputChange('contato_emergencia', e.target.value)}
                  placeholder="Nome do contato de emergência"
                  invalidFeedback="Por favor, informe o nome do contato de emergência."
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefone_emergencia">Telefone:</label>
                <FormInput
                  type="tel"
                  id="telefone_emergencia"
                  value={formData.telefone_emergencia}
                  onChange={(e) => handleInputChange('telefone_emergencia', e.target.value)}
                  placeholder="(18) 9999-9999"
                  invalidFeedback="Por favor, informe um telefone de emergência válido."
                />
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
                value={formData.necessidade_especifica}
                onChange={(e) => handleInputChange('necessidade_especifica', e.target.value)}
                placeholder="Descreva a necessidade específica do beneficiário..."
                required
              />
              <div className="invalid-feedback">
                Por favor, descreva a necessidade específica do beneficiário.
              </div>
            </div>

            <div className="form-actions">
              <FormButtonSecondary placeholder="Cancelar"/>
              <FormButton placeholder="Cadastrar Beneficiário"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;