import { useState, useEffect } from "react";
import "./App.css";
import FormButton from "./componentes/formularios/formButton.jsx";
import FormButtonSecondary from "./componentes/formularios/FormButtonSecondary.jsx";
import FormInput from "./componentes/formularios/FormInput.jsx";

function MembrosRotary() {
  const [membros, setMembros] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    data_ingresso: "",
    cargo: "",
    comissao: "",
    endereco: "",
    bairro: "",
    cidade: "",
    cep: "",
    data_nascimento: "",
    profissao: "",
    empresa: ""
  });

  const [filtro, setFiltro] = useState("");
  const [erros, setErros] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [membroExcluir, setMembroExcluir] = useState(null);

  useEffect(() => {
    const membrosSalvos = localStorage.getItem("membrosRotary");
    if (membrosSalvos) {
      setMembros(JSON.parse(membrosSalvos));
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

  /*Máscara Telefone*/
  const aplicarMascaraTelefone = (valor) => {
    valor = valor.replace(/\D/g, "").substring(0, 11);

    if (valor.length === 11) {
      return valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (valor.length === 10) {
      return valor.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return valor;
  };

  const handleTelefoneChange = (e) => {
    const telefoneFormatado = aplicarMascaraTelefone(e.target.value);
    setFormData({ ...formData, telefone: telefoneFormatado });
  };

  /*Máscara CEP*/
  const aplicarMascaraCEP = (valor) => {
    valor = valor.replace(/\D/g, "").substring(0, 8);

    if (valor.length === 8) {
      return valor.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
    return valor;
  };

  const handleCepChange = (e) => {
    const cepFormatado = aplicarMascaraCEP(e.target.value);
    setFormData({ ...formData, cep: cepFormatado });
  };

  const validarFormulario = () => {
    const novosErros = {};

    // Validar CPF
    if (!formData.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      novosErros.cpf = "CPF deve estar no formato 000.000.000-00";
    }

    // Verificar CPF duplicado
    if (membros.some((m) => m.cpf === formData.cpf)) {
      novosErros.cpf = "Este CPF já está cadastrado";
    }

    // Validar Email
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      novosErros.email = "Email deve estar em um formato válido";
    }

    // Validar Telefone
    if (!formData.telefone || !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(formData.telefone)) {
      novosErros.telefone = "Telefone deve estar no formato (00) 00000-0000";
    }

    // Validar CEP
    if (!formData.cep || !/^\d{5}-\d{3}$/.test(formData.cep)) {
      novosErros.cep = "CEP deve estar no formato 00000-000";
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

    const novoMembro = {
      id: Date.now(),
      ...formData
    };

    const novosMembros = [...membros, novoMembro];
    setMembros(novosMembros);
    localStorage.setItem('membrosRotary', JSON.stringify(novosMembros));

    setFormData({
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
      data_ingresso: "",
      cargo: "",
      comissao: "",
      endereco: "",
      bairro: "",
      cidade: "",
      cep: "",
      data_nascimento: "",
      profissao: "",
      empresa: ""
    });

    setErros({});
    alert('Membro Rotary cadastrado com sucesso!');
  };

  return (
    <div id="membros-rotary" className="prototype-screen active">
      <div className="screen-frame">
        <div className="screen-header">
          <h3>Cadastro de Membros Rotary</h3>
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
                  placeholder="Nome completo do membro"
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
                <label htmlFor="data_nascimento">Data de Nascimento:</label>
                <FormInput
                  type="date"
                  id="data_nascimento"
                  value={formData.data_nascimento}
                  onChange={(e) => handleInputChange('data_nascimento', e.target.value)}
                  invalidFeedback="Por favor, informe a data de nascimento."
                />
              </div>

              <div className="form-group">
                <label htmlFor="profissao">Profissão:</label>
                <FormInput
                  type="text"
                  id="profissao"
                  value={formData.profissao}
                  onChange={(e) => handleInputChange('profissao', e.target.value)}
                  placeholder="Profissão do membro"
                  invalidFeedback="Por favor, informe a profissão."
                />
              </div>
            </div>

            <h5>Informações Rotary</h5>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="data_ingresso">Data de Ingresso:</label>
                <FormInput
                  type="date"
                  id="data_ingresso"
                  value={formData.data_ingresso}
                  onChange={(e) => handleInputChange('data_ingresso', e.target.value)}
                  invalidFeedback="Por favor, informe a data de ingresso."
                />
              </div>

              <div className="form-group">
                <label htmlFor="cargo">Cargo:</label>
                <FormInput
                  type="text"
                  id="cargo"
                  value={formData.cargo}
                  onChange={(e) => handleInputChange('cargo', e.target.value)}
                  placeholder="Cargo no Rotary"
                  invalidFeedback="Por favor, informe o cargo."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="comissao">Comissão:</label>
                <FormInput
                  type="text"
                  id="comissao"
                  value={formData.comissao}
                  onChange={(e) => handleInputChange('comissao', e.target.value)}
                  placeholder="Comissão de atuação"
                  invalidFeedback="Por favor, informe a comissão."
                />
              </div>

              <div className="form-group">
                <label htmlFor="empresa">Empresa:</label>
                <FormInput
                  type="text"
                  id="empresa"
                  value={formData.empresa}
                  onChange={(e) => handleInputChange('empresa', e.target.value)}
                  placeholder="Empresa onde trabalha"
                  invalidFeedback="Por favor, informe a empresa."
                />
              </div>
            </div>

            <h5>Contato</h5>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <FormInput
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  isInvalid={!!erros.email}
                  placeholder="membro@email.com"
                  invalidFeedback={erros.email || "Por favor, informe um email válido."}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone:</label>
                <FormInput
                  type="tel"
                  id="telefone"
                  value={formData.telefone}
                  onChange={handleTelefoneChange}
                  isInvalid={!!erros.telefone}
                  placeholder="(18) 99999-9999"
                  invalidFeedback={erros.telefone || "Por favor, informe um telefone válido."}
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
                  onChange={handleCepChange}
                  isInvalid={!!erros.cep}
                  placeholder="00000-000"
                  invalidFeedback={erros.cep || "Por favor, informe um CEP válido."}
                />
              </div>
            </div>

            <div className="form-actions">
              <FormButtonSecondary placeholder="Cancelar"/>
              <FormButton placeholder="Cadastrar Membro"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MembrosRotary;