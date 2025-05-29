// --- Constantes de API ---
const API_BASE_URL = '/api'; // Caminhos relativos para deploy na Vercel
// AUTH_API_URL não é mais estritamente necessária se todas as rotas de auth usam API_BASE_URL
const API_URL_PAGAMENTOS = `${API_BASE_URL}/chamados_pagamento`;
const API_URL_FORNECEDORES = `${API_BASE_URL}/fornecedores`;
const API_URL_DIVERSOS = `${API_BASE_URL}/chamados_diversos`;
const API_URL_ADMIN_USERS = `${API_BASE_URL}/admin/users`;

// Rotas de autenticação
const API_URL_REGISTER = `${API_BASE_URL}/register`;
const API_URL_LOGIN = `${API_BASE_URL}/login`;
const API_URL_LOGOUT = `${API_BASE_URL}/logout`;
const API_URL_CHECK_AUTH = `${API_BASE_URL}/check_auth_status`;

// --- Seletores Globais ---
const currentYearSpan = document.getElementById('currentYear');
const navLinks = document.querySelectorAll('nav ul li a');
const contentSections = document.querySelectorAll('.content-section');
const toastContainer = document.getElementById('toast-container');
const loadingIndicator = document.getElementById('loading-indicator');
const mainAppContentDiv = document.getElementById('main-app-content');
const authStatusDiv = document.getElementById('auth-status');
const authSectionPlaceholder = document.getElementById('auth-section-placeholder');

// Modais e Forms de Autenticação
const modalLogin = document.getElementById('modal-login');
const formLogin = document.getElementById('form-login');
const btnCloseLoginModal = document.getElementById('close-login-modal');
const btnCancelLoginModal = document.getElementById('btn-cancel-login-modal');
const loginErrorMessage = document.getElementById('login-error-message');

const modalRegister = document.getElementById('modal-register');
const formRegister = document.getElementById('form-register');
const btnCloseRegisterModal = document.getElementById('close-register-modal');
const btnCancelRegisterModal = document.getElementById('btn-cancel-register-modal');
const registerErrorMessage = document.getElementById('register-error-message');

// Aba Admin Usuários
const navAdminUsersLink = document.getElementById('nav-admin-users');
const corpoTabelaAdminUsers = document.getElementById('corpo-tabela-admin-users');
const modalEditUserRole = document.getElementById('modal-edit-user-role');
const formEditUserRole = document.getElementById('form-edit-user-role');
const btnCloseModalEditUserRole = document.getElementById('close-modal-edit-user-role');
const btnCancelEditUserRole = document.getElementById('btn-cancel-edit-user-role');
const editUserIdInput = document.getElementById('edit-user-id');
const editUserUsernameDisplay = document.getElementById('edit-user-username-display');
const editUserRoleSelect = document.getElementById('edit-user-role-select');
const editUserRoleErrorMessage = document.getElementById('edit-user-role-error-message');
const paginationAdminUsersDiv = document.getElementById('pagination-admin-users'); 

// Chamado Pagamento
const listaChamadosPagamentoDiv = document.getElementById('lista-chamados-pagamento');
const btnAtualizarChamadosPag = document.getElementById('btn-atualizar-chamados-pag');
const modalRegistrarEditarChamadoPag = document.getElementById('modal-registrar-editar-chamado-pag');
const formRegistrarEditarChamadoPag = document.getElementById('form-registrar-editar-chamado-pag');
const modalChamadoPagTitulo = document.getElementById('modal-chamado-pag-titulo');
const modalChamadoPagErrorMessage = document.getElementById('modal-chamado-pag-error-message');
const btnAbrirModalRegistrarChamadoPag = document.getElementById('btn-abrir-modal-registrar-chamado-pag');
const btnCloseModalRegistrarEditarChamadoPag = document.getElementById('close-modal-registrar-editar-chamado-pag');
const btnCancelarModalChamadoPag = document.getElementById('btn-cancelar-modal-chamado-pag');
const inputNomeFornecedorChamadoPag = document.getElementById('nome_fornecedor_input_pag');
const datalistFornecedores = document.getElementById('fornecedores-datalist');
const inputHiddenFornecedorIdChamadoPag = document.getElementById('fornecedor_id_hidden_pag');
const inputNumIdFornecedorChamadoPag = document.getElementById('numero_identificacao_fornecedor_input_pag');
const inputChamadoPagIdEdicao = document.getElementById('chamado_pag_id_edicao');
const sortChamadoPagSelect = document.getElementById('sort-chamado-pag');
const paginationChamadosPagDiv = document.getElementById('pagination-chamados-pag');

// Modal Acompanhamentos Chamado Pagamento
const modalAcompanhamentosChamadoPag = document.getElementById('modal-acompanhamentos-chamado-pag');
const acompanhamentosChamadoPagTitulo = document.getElementById('acompanhamentos-chamado-pag-titulo');
const acompanhamentosChamadoPagInfo = document.getElementById('acompanhamentos-chamado-pag-info');
const acompanhamentosChamadoPagLista = document.getElementById('acompanhamentos-chamado-pag-lista');
const formNovoAcompanhamentoPag = document.getElementById('form-novo-acompanhamento-pag');
const acompanhamentoChamadoPagIdInput = document.getElementById('acompanhamento_chamado_pag_id');
const btnCloseModalAcompanhamentosChamadoPag = document.getElementById('close-modal-acompanhamentos-chamado-pag');

// Fornecedores
const btnAbrirModalNovoFornecedor = document.getElementById('btn-abrir-modal-novo-fornecedor');
const corpoTabelaFornecedores = document.getElementById('corpo-tabela-fornecedores');
const tabelaFornecedores = document.getElementById('tabela-fornecedores');
const modalNovoEditarFornecedor = document.getElementById('modal-novo-editar-fornecedor');
const modalFornecedorTitulo = document.getElementById('modal-fornecedor-titulo');
const formNovoEditarFornecedor = document.getElementById('form-novo-editar-fornecedor');
const inputFornecedorIdEdicao = document.getElementById('fornecedor-id-edicao');
const inputFornecedorNomeForm = document.getElementById('fornecedor-nome');
const inputFornecedorNumIdForm = document.getElementById('fornecedor-num-id');
const btnCloseModalFornecedor = document.getElementById('close-modal-novo-editar-fornecedor');
const btnCancelarModalFornecedor = document.getElementById('btn-cancelar-modal-fornecedor');
const modalFornecedorErrorMessage = document.getElementById('modal-fornecedor-error-message');
const tabelaFornecedoresHeaders = document.querySelectorAll('#tabela-fornecedores th[data-sortkey]');
const paginationFornecedoresDiv = document.getElementById('pagination-fornecedores');

// Chamados Diversos
const listaChamadosDiversosDiv = document.getElementById('lista-chamados-diversos');
const btnAtualizarChamadosDiv = document.getElementById('btn-atualizar-chamados-div');
const btnAbrirModalRegistrarChamadoDiv = document.getElementById('btn-abrir-modal-registrar-chamado-div');
const modalRegistrarEditarChamadoDiv = document.getElementById('modal-registrar-editar-chamado-div');
const formRegistrarEditarChamadoDiv = document.getElementById('form-registrar-editar-chamado-div');
const modalChamadoDivTitulo = document.getElementById('modal-chamado-div-titulo');
const modalChamadoDivErrorMessage = document.getElementById('modal-chamado-div-error-message');
const btnCloseModalRegistrarEditarChamadoDiv = document.getElementById('close-modal-registrar-editar-chamado-div');
const btnCancelarModalChamadoDiv = document.getElementById('btn-cancelar-modal-chamado-div');
const inputNomeFornecedorChamadoDiv = document.getElementById('nome_fornecedor_input_div');
const datalistFornecedoresDiv = document.getElementById('fornecedores-datalist-div');
const inputHiddenFornecedorIdChamadoDiv = document.getElementById('fornecedor_id_hidden_div');
const inputNumIdFornecedorChamadoDiv = document.getElementById('numero_identificacao_fornecedor_input_div');
const inputChamadoDivIdEdicao = document.getElementById('chamado_div_id_edicao');
const sortChamadoDivSelect = document.getElementById('sort-chamado-div');
const paginationChamadosDiv = document.getElementById('pagination-chamados-div');

// Modal Acompanhamentos Chamado Diverso
const modalAcompanhamentosChamadoDiv = document.getElementById('modal-acompanhamentos-chamado-div');
const acompanhamentosChamadoDivTitulo = document.getElementById('acompanhamentos-chamado-div-titulo');
const acompanhamentosChamadoDivInfo = document.getElementById('acompanhamentos-chamado-div-info');
const acompanhamentosChamadoDivLista = document.getElementById('acompanhamentos-chamado-div-lista');
const formNovoAcompanhamentoDiv = document.getElementById('form-novo-acompanhamento-div');
const acompanhamentoChamadoDivIdInput = document.getElementById('acompanhamento_chamado_div_id');
const btnCloseModalAcompanhamentosChamadoDiv = document.getElementById('close-modal-acompanhamentos-chamado-div');

// Estado da Aplicação
let currentUser = null;
let chamadoPagAtualParaEdicaoId = null;
let chamadoDivAtualParaEdicaoId = null;
let fornecedorAtualParaEdicaoId = null;
let adminEditUserId = null;

let todosFornecedoresCache = [];
let todosChamadosPagCache = [];
let todosChamadosDivCache = [];
let todosUsuariosCache = []; 

const ITEMS_PER_PAGE_CARDS = 6;
const ITEMS_PER_PAGE_TABLE = 10;

let currentPagePag = 1, currentPageDiv = 1, currentPageForn = 1, currentPageAdminUsers = 1;
let currentSortPag = 'data_criacao_registro_desc', currentSortDiv = 'data_criacao_registro_desc';
let currentSortForn = { key: 'nome_fornecedor', direction: 'asc' };
let currentSortAdminUsers = { key: 'username', direction: 'asc' };
let currentFiltersPag = {}, currentFiltersDiv = {}, currentFiltersForn = {}, currentFiltersAdminUsers = {};


// --- Funções Auxiliares ---
function showToast(message, type = 'info') {
    if (!toastContainer) { console.warn("Toast container não encontrado"); return; }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => { toast.classList.add('show'); }, 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 500);
    }, 3000 + (type === 'error' ? 2000 : 0));
}

function showLoading(show = true) {
    if (loadingIndicator) {
        loadingIndicator.style.display = show ? 'flex' : 'none';
    }
}
function hideLoading() { 
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none'; 
    }
}

function setListMessage(listDivOrId, message) {
    const listElement = typeof listDivOrId === 'string' ? document.getElementById(listDivOrId) : listDivOrId;
    if (listElement) {
        listElement.innerHTML = `<p class="empty-state-message">${message}</p>`;
    }
}

function formatarStatusParaClasse(status) { return status ? status.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]+/g, '') : 'desconhecido'; }
const formatDateForDisplay = (dateString) => { if (!dateString) return 'N/A'; const date = new Date(dateString.includes('T') ? dateString : dateString + 'T00:00:00Z'); return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' }); };
const formatDateForInput = (dateString) => { if (!dateString) return ''; const date = new Date(dateString.includes('T') ? dateString : dateString + 'T00:00:00Z'); return date.toISOString().split('T')[0]; };

// --- Autenticação ---
async function checkAuthStatus() {
    showLoading();
    try {
        const response = await fetch(API_URL_CHECK_AUTH, { credentials: 'include' });
        if (!response.ok) { 
            if (response.status === 401) { 
                 currentUser = null; updateAuthUI(false); return; 
            }
            const errorText = await response.text().catch(() => `Erro HTTP ${response.status}`);
            throw new Error(`Falha ao verificar status: ${errorText.substring(0,150)}`);
        }
        const data = await response.json();
        if (data.logged_in) { currentUser = data.user; updateAuthUI(true); } 
        else { currentUser = null; updateAuthUI(false); }
    } catch (error) { 
        console.error("Erro CRÍTICO em checkAuthStatus:", error);
        currentUser = null; updateAuthUI(false); 
        showToast(`Falha na autenticação inicial. Verifique sua conexão e se o backend está rodando.`, "error");
    }
}

function updateAuthUI(isLoggedIn) {
    hideLoading(); 
    if (isLoggedIn && currentUser) {
        if (mainAppContentDiv) mainAppContentDiv.style.display = 'block';
        if (authSectionPlaceholder) authSectionPlaceholder.style.display = 'none';
        if (authStatusDiv) {
            authStatusDiv.innerHTML = `<span>Bem-vindo, ${currentUser.username}! <span class="user-role">(${currentUser.role})</span></span> <button id="btn-logout" class="btn btn-danger btn-sm">Logout</button>`;
            const btnLogout = document.getElementById('btn-logout');
            if (btnLogout) btnLogout.addEventListener('click', handleLogout);
        }
        
        document.querySelectorAll('.master-only-filter').forEach(el => {el.style.display = currentUser.role === 'master' ? 'inline-block' : 'none';});
        document.querySelectorAll('.owner-column').forEach(el => { el.style.display = currentUser.role === 'master' ? '' : 'none'; });
        if(navAdminUsersLink) navAdminUsersLink.style.display = currentUser.role === 'master' ? 'list-item' : 'none';

        const activeLink = document.querySelector('nav ul li a.active');
        if (activeLink) {
            const targetId = activeLink.getAttribute('data-target');
            if (targetId === 'chamados-pagamento-section' && typeof buscarChamadosPagamento === 'function') buscarChamadosPagamento();
            else if (targetId === 'fornecedores-section' && typeof carregarErenderizarFornecedores === 'function') carregarErenderizarFornecedores();
            else if (targetId === 'chamados-diversos-section' && typeof buscarChamadosDiversos === 'function') buscarChamadosDiversos();
            else if (targetId === 'admin-users-section' && currentUser.role === 'master' && typeof carregarErenderizarAdminUsers === 'function') carregarErenderizarAdminUsers();
        } else { 
            const firstTabLink = document.querySelector('nav ul li a[data-target="chamados-pagamento-section"]');
            if (firstTabLink) { firstTabLink.click(); }
            else if (typeof buscarChamadosPagamento === 'function') { buscarChamadosPagamento();}
        }
        if (typeof carregarFornecedoresGlobais === 'function') carregarFornecedoresGlobais(); 
        if (typeof setupFilterListeners === 'function') setupFilterListeners(); 
        if (typeof setupSortListeners === 'function') setupSortListeners(); 
    } else {
        if (mainAppContentDiv) mainAppContentDiv.style.display = 'none';
        if (authSectionPlaceholder) authSectionPlaceholder.style.display = 'block';
        if(navAdminUsersLink) navAdminUsersLink.style.display = 'none';
        if (authStatusDiv) {
            authStatusDiv.innerHTML = `<button id="btn-show-login-modal-main" class="btn btn-secondary btn-sm">Login</button> <button id="btn-show-register-modal-main" class="btn btn-primary btn-sm">Registrar</button>`;
            const btnShowLogin = document.getElementById('btn-show-login-modal-main');
            const btnShowRegister = document.getElementById('btn-show-register-modal-main');
            if (btnShowLogin && modalLogin) btnShowLogin.addEventListener('click', () => { modalLogin.style.display = 'block'; if (formLogin) formLogin.reset(); if(loginErrorMessage) loginErrorMessage.style.display = 'none'; });
            if (btnShowRegister && modalRegister) btnShowRegister.addEventListener('click', () => { modalRegister.style.display = 'block'; if (formRegister) formRegister.reset(); if(registerErrorMessage) registerErrorMessage.style.display = 'none'; });
        }
    }
}

async function handleLogin(event) {
    event.preventDefault(); if (loginErrorMessage) loginErrorMessage.style.display = 'none';
    const usernameInput = document.getElementById('login-username'); const passwordInput = document.getElementById('login-password');
    if (!usernameInput || !passwordInput) return;
    const username = usernameInput.value; const password = passwordInput.value;
    showLoading();
    try {
        const response = await fetch(API_URL_LOGIN, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }), credentials: 'include' });
        const data = await response.json(); 
        if (response.ok) { currentUser = data.user; if (modalLogin) modalLogin.style.display = 'none'; if (formLogin) formLogin.reset(); updateAuthUI(true); showToast(data.message, 'success'); }
        else { throw new Error(data.message || "Erro no login."); }
    } catch (error) { console.error("Erro login:", error); if (loginErrorMessage) { loginErrorMessage.textContent = error.message; loginErrorMessage.style.display = 'block'; } showToast(`Erro login: ${error.message}`, 'error'); 
    } finally { hideLoading(); }
}

async function handleRegister(event) {
    event.preventDefault(); if (registerErrorMessage) registerErrorMessage.style.display = 'none';
    const usernameInput = document.getElementById('register-username'); const emailInput = document.getElementById('register-email');
    const passwordInput = document.getElementById('register-password'); const confirmPasswordInput = document.getElementById('register-confirm-password');
    if(!usernameInput || !emailInput || !passwordInput || !confirmPasswordInput) return;
    const username = usernameInput.value; const email = emailInput.value;
    const password = passwordInput.value; const confirmPassword = confirmPasswordInput.value;
    if (password !== confirmPassword) { if (registerErrorMessage) { registerErrorMessage.textContent = "As senhas não coincidem."; registerErrorMessage.style.display = 'block'; } showToast("As senhas não coincidem.", "error"); return; }
    showLoading();
    try {
        const response = await fetch(API_URL_REGISTER, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, email, password }) });
        const data = await response.json(); 
        if (response.ok) { if (modalRegister) modalRegister.style.display = 'none'; if (formRegister) formRegister.reset(); showToast(data.message + " Por favor, faça o login.", 'success'); if (modalLogin) modalLogin.style.display = 'block'; }
        else { throw new Error(data.message || "Erro no registro."); }
    } catch (error) { console.error("Erro registro:", error); if (registerErrorMessage) { registerErrorMessage.textContent = error.message; registerErrorMessage.style.display = 'block'; } showToast(`Erro registro: ${error.message}`, 'error'); 
    } finally { hideLoading(); }
}

async function handleLogout() {
    showLoading();
    try {
        const response = await fetch(API_URL_LOGOUT, { method: 'POST', credentials: 'include' });
        const data = await response.json(); 
        if (response.ok) { currentUser = null; todosFornecedoresCache = []; todosChamadosPagCache = []; todosChamadosDivCache = []; updateAuthUI(false); showToast(data.message, 'success'); }
        else { throw new Error(data.message || "Erro no logout."); }
    } catch (error) { console.error("Erro logout:", error); showToast(`Erro logout: ${error.message}`, 'error'); currentUser = null; updateAuthUI(false); 
    } finally { hideLoading(); }
}

// --- Carregar Fornecedores Globais ---
async function carregarFornecedoresGlobais() {
    if(!currentUser) return; 
    try {
        const response = await fetch(API_URL_FORNECEDORES, {credentials: 'include'});
        if (!response.ok) { 
            const errorText = await response.text().catch(() => `Erro HTTP ${response.status}`);
            console.warn('Não foi possível carregar fornecedores para datalist:', errorText);
            todosFornecedoresCache = [];
        } else {
            todosFornecedoresCache = await response.json();
        }
        const popularDatalist = (datalistElem) => {
            if (datalistElem) {
                datalistElem.innerHTML = '';
                todosFornecedoresCache.forEach(f => {
                    const option = document.createElement('option');
                    option.value = f.nome_fornecedor;
                    option.dataset.id = f.id;
                    option.dataset.numId = f.numero_identificacao_fornecedor || '';
                    datalistElem.appendChild(option);
                });
            }
        };
        popularDatalist(datalistFornecedores); 
        popularDatalist(datalistFornecedoresDiv);
    } catch (error) { console.error("Erro em carregarFornecedoresGlobais:", error); todosFornecedoresCache = []; showToast(`Erro ao carregar fornecedores para seleção: ${error.message}`, 'error'); }
}

// --- Lógica do campo Fornecedor ---
function setupFornecedorInput(inputNomeElem, inputHiddenIdElem, inputNumIdElem, datalistElem) {
    if (inputNomeElem && inputHiddenIdElem && inputNumIdElem && datalistElem) {
        inputNomeElem.addEventListener('input', function () {
            const nomeDigitado = this.value.trim().toLowerCase(); 
            let fornecedorEncontrado = null;
            const option = Array.from(datalistElem.options).find(opt => opt.value.toLowerCase() === nomeDigitado);
            if (option) { fornecedorEncontrado = { id: option.dataset.id, nome_fornecedor: option.value, numero_identificacao_fornecedor: option.dataset.numId }; }
            if (!fornecedorEncontrado && nomeDigitado) { 
                 fornecedorEncontrado = todosFornecedoresCache.find(f => f.nome_fornecedor.toLowerCase() === nomeDigitado);
            }
            if (fornecedorEncontrado) {
                inputHiddenIdElem.value = fornecedorEncontrado.id;
                inputNumIdElem.value = fornecedorEncontrado.numero_identificacao_fornecedor || '';
                inputNumIdElem.readOnly = true; 
            } else {
                inputHiddenIdElem.value = ''; 
                inputNumIdElem.readOnly = false; 
            }
        });
         inputNomeElem.addEventListener('blur', function() {
            if (this.value.trim() === '' && inputHiddenIdElem.value === '') {
                if(inputNumIdElem) inputNumIdElem.value = '';
                inputNumIdElem.readOnly = false;
            }
        });
    }
}

// --- MODAL E CRUD: FORNECEDORES ---
function abrirModalNovoFornecedor() {
    fornecedorAtualParaEdicaoId = null;
    if (modalFornecedorTitulo) modalFornecedorTitulo.textContent = 'Novo Fornecedor';
    if (formNovoEditarFornecedor) formNovoEditarFornecedor.reset();
    if (inputFornecedorIdEdicao) inputFornecedorIdEdicao.value = '';
    if (modalFornecedorErrorMessage) modalFornecedorErrorMessage.style.display = 'none';
    if (modalNovoEditarFornecedor) modalNovoEditarFornecedor.style.display = 'block';
}

async function abrirModalEditarFornecedor(id) {
    fornecedorAtualParaEdicaoId = id;
    if (modalFornecedorErrorMessage) modalFornecedorErrorMessage.style.display = 'none';
    showLoading();
    try {
        const response = await fetch(`${API_URL_FORNECEDORES}/${id}`, { credentials: 'include' });
        hideLoading();
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `Erro HTTP ${response.status}` }));
            throw new Error(errorData.message || 'Erro ao buscar dados do fornecedor para edição.');
        }
        const fornecedor = await response.json();
        if (modalFornecedorTitulo) modalFornecedorTitulo.textContent = 'Editar Fornecedor';
        if (inputFornecedorIdEdicao) inputFornecedorIdEdicao.value = fornecedor.id;
        if (inputFornecedorNomeForm) inputFornecedorNomeForm.value = fornecedor.nome_fornecedor || '';
        if (inputFornecedorNumIdForm) inputFornecedorNumIdForm.value = fornecedor.numero_identificacao_fornecedor || '';
        if (modalNovoEditarFornecedor) modalNovoEditarFornecedor.style.display = 'block';
    } catch (e) {
        hideLoading();
        console.error("Erro ao abrir modal de edição de fornecedor:", e);
        showToast(`Erro ao carregar dados do fornecedor: ${e.message}`, 'error');
    }
}

function fecharModalNovoEditarFornecedor() {
    if (modalNovoEditarFornecedor) modalNovoEditarFornecedor.style.display = 'none';
    fornecedorAtualParaEdicaoId = null;
}

async function carregarErenderizarFornecedores(page = 1, sortConfig = currentSortForn, filters = currentFiltersForn) {
    if (!corpoTabelaFornecedores || !currentUser) {
        if(corpoTabelaFornecedores) setListMessage(corpoTabelaFornecedores, "<tr><td colspan=\"5\">Faça login para ver os fornecedores.</td></tr>");
        return;
    }
    showLoading('corpo-tabela-fornecedores'); 
    currentSortForn = sortConfig; currentPageForn = page; currentFiltersForn = filters;

    if (tabelaFornecedoresHeaders) {
        tabelaFornecedoresHeaders.forEach(th => {
            const arrow = th.querySelector('.sort-arrow');
            if (arrow) arrow.textContent = ''; 
            th.classList.remove('sort-asc', 'sort-desc');
        });
        const activeTh = document.querySelector(`#tabela-fornecedores th[data-sortkey="${currentSortForn.key}"]`);
        if (activeTh) {
            const arrowSpan = activeTh.querySelector('.sort-arrow');
            if (arrowSpan) arrowSpan.textContent = currentSortForn.direction === 'asc' ? ' ▲' : ' ▼';
            activeTh.classList.add(currentSortForn.direction === 'asc' ? 'sort-asc' : 'sort-desc');
        }
    }

    try {
        const response = await fetch(API_URL_FORNECEDORES, { credentials: 'include' });
        hideLoading();
        if (!response.ok) throw new Error('Erro ao buscar fornecedores.');
        let fornecedoresDaApi = await response.json();
        todosFornecedoresCache = fornecedoresDaApi; 
        
        let itemsParaFiltrarEOrdenar = [...todosFornecedoresCache]; 
        itemsParaFiltrarEOrdenar = aplicarFiltros(itemsParaFiltrarEOrdenar, currentFiltersForn, 'fornecedor');
        itemsParaFiltrarEOrdenar = aplicarOrdenacao(itemsParaFiltrarEOrdenar, currentSortForn.key ? `${currentSortForn.key}_${currentSortForn.direction}` : currentSortForn);
        
        renderizarTabelaFornecedores(itemsParaFiltrarEOrdenar, currentPageForn);
    } catch (e) {
        hideLoading();
        console.error("Erro ao carregar e renderizar fornecedores:", e);
        if (corpoTabelaFornecedores) setListMessage(corpoTabelaFornecedores, `<tr><td colspan="5" class="error-message">Erro ao carregar fornecedores: ${e.message}</td></tr>`);
        showToast(`Erro ao carregar fornecedores: ${e.message}`, 'error');
    }
}

function renderizarTabelaFornecedores(fornecedores, page = 1) {
    if (!corpoTabelaFornecedores) return;
    corpoTabelaFornecedores.innerHTML = '';
    const start = (page - 1) * ITEMS_PER_PAGE_TABLE;
    const end = start + ITEMS_PER_PAGE_TABLE;
    const paginatedItems = fornecedores.slice(start, end);
    
    // Determina o número de colunas baseado se a coluna de owner está visível
    let colspanCount = 4; // Colunas base: ID, Nome, N° ID, Ações
    const ownerColumnHeader = document.querySelector('#tabela-fornecedores .owner-column');
    if (currentUser && currentUser.role === 'master' && ownerColumnHeader && ownerColumnHeader.style.display !== 'none') {
        colspanCount = 5;
    }


    if (paginatedItems.length === 0) {
        setListMessage(corpoTabelaFornecedores, `<tr><td colspan="${colspanCount}">Nenhum fornecedor encontrado ${Object.keys(currentFiltersForn).length > 0 ? 'para os filtros aplicados' : ''}.</td></tr>`);
    } else {
        paginatedItems.forEach(f => {
            const tr = document.createElement('tr');
            let ownerColumnHtml = '';
            if (currentUser && currentUser.role === 'master') {
                // A coluna HTML só é adicionada se o header dela estiver visível
                if (ownerColumnHeader && ownerColumnHeader.style.display !== 'none') {
                    ownerColumnHtml = `<td data-label="Usuário" class="owner-column-data">${f.owner_username || 'N/A'}</td>`;
                }
            }
            tr.innerHTML = `
                <td data-label="ID">${f.id}</td>
                <td data-label="Nome"><a href="#" class="supplier-name-link" data-supplier-id="${f.id}" data-supplier-name="${f.nome_fornecedor}">${f.nome_fornecedor}</a></td>
                <td data-label="N° ID">${f.numero_identificacao_fornecedor || 'N/A'}</td>
                ${ownerColumnHtml}
                <td class="actions-fornecedor">
                    <button class="btn btn-sm btn-warning btn-editar-fornecedor" data-id="${f.id}" title="Editar Fornecedor">Editar</button>
                    <button class="btn btn-sm btn-danger btn-excluir-fornecedor" data-id="${f.id}" title="Excluir Fornecedor">Excluir</button>
                </td>`;
            corpoTabelaFornecedores.appendChild(tr);
        });
    }
    setupPagination(fornecedores.length, ITEMS_PER_PAGE_TABLE, page, 'pagination-fornecedores', 
        (newPage) => carregarErenderizarFornecedores(newPage, currentSortForn, currentFiltersForn)
    );
}

if (formNovoEditarFornecedor) {
    formNovoEditarFornecedor.addEventListener('submit', async function (event) {
        event.preventDefault();
        if (modalFornecedorErrorMessage) modalFornecedorErrorMessage.style.display = 'none';
        const fornecedorData = {
            nome_fornecedor: inputFornecedorNomeForm.value,
            numero_identificacao_fornecedor: inputFornecedorNumIdForm.value || null
        };
        let url = API_URL_FORNECEDORES;
        let method = 'POST';
        if (fornecedorAtualParaEdicaoId) {
            url = `${API_URL_FORNECEDORES}/${fornecedorAtualParaEdicaoId}`;
            method = 'PUT';
        }
        showLoading();
        try {
            const response = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fornecedorData), credentials: 'include' });
            hideLoading();
            const responseData = await response.json();
            if (!response.ok) { throw new Error(responseData.message || `HTTP Error: ${response.status}`); }
            fecharModalNovoEditarFornecedor();
            const targetPage = method === 'POST' ? 1 : currentPageForn;
            currentFiltersForn = {}; 
            document.querySelectorAll('.filter-input[data-list="corpo-tabela-fornecedores"]').forEach(fi => fi.value = '');
            carregarErenderizarFornecedores(targetPage, currentSortForn, currentFiltersForn);
            carregarFornecedoresGlobais(); 
            showToast(`Fornecedor ${fornecedorAtualParaEdicaoId ? 'atualizado' : 'criado'} com sucesso!`, 'success');
        } catch (error) {
            hideLoading();
            console.error(`Falha ao ${fornecedorAtualParaEdicaoId ? 'atualizar' : 'criar'} fornecedor:`, error);
            if (modalFornecedorErrorMessage) { modalFornecedorErrorMessage.textContent = `Erro: ${error.message}`; modalFornecedorErrorMessage.style.display = 'block'; }
            showToast(`Erro: ${error.message}`, 'error');
        }
    });
}

if (corpoTabelaFornecedores) {
    corpoTabelaFornecedores.addEventListener('click', async (event) => {
        const targetButton = event.target.closest('button');
        const targetLink = event.target.closest('a.supplier-name-link');

        if (targetButton) {
            event.preventDefault(); 
            const fornecedorId = targetButton.dataset.id;
            if (!fornecedorId) return;

            if (targetButton.classList.contains('btn-editar-fornecedor')) {
                abrirModalEditarFornecedor(fornecedorId);
            } else if (targetButton.classList.contains('btn-excluir-fornecedor')) {
                if (confirm(`Tem certeza que deseja excluir o fornecedor ID ${fornecedorId}? Se houver chamados associados, a exclusão pode falhar.`)) {
                    showLoading();
                    try {
                        const response = await fetch(`${API_URL_FORNECEDORES}/${fornecedorId}`, { method: 'DELETE', credentials: 'include' });
                        hideLoading();
                        const data = await response.json();
                        if (!response.ok) { throw new Error(data.message || `Erro ao excluir fornecedor: ${response.status}`); }
                        showToast('Fornecedor excluído com sucesso!', 'success');
                        
                        // Tenta manter a página atual ou ir para a anterior se a atual ficar vazia
                        let itemsNaPaginaAtual = Array.from(corpoTabelaFornecedores.querySelectorAll('tr')).filter(tr => !tr.querySelector('td[colspan]')).length;
                        let paginaAlvo = currentPageForn;
                        if(itemsNaPaginaAtual === 1 && currentPageForn > 1) { // Era o último item da página > 1
                            paginaAlvo = currentPageForn - 1;
                        }
                        carregarErenderizarFornecedores(paginaAlvo, currentSortForn, currentFiltersForn);
                        carregarFornecedoresGlobais();
                    } catch (error) {
                        hideLoading();
                        console.error("Erro ao excluir fornecedor:", error);
                        showToast(`Falha ao excluir fornecedor: ${error.message}`, 'error');
                    }
                }
            }
        } else if (targetLink) {
            event.preventDefault();
            const supplierName = targetLink.dataset.supplierName;
            
            const pagTabLink = document.querySelector('nav ul li a[data-target="chamados-pagamento-section"]');
            if (pagTabLink) {
                if (!pagTabLink.classList.contains('active')) {
                     pagTabLink.click(); 
                }
                setTimeout(() => { 
                    const filtroFornPag = document.getElementById('filtro-fornecedor-chamado-pag');
                    if (filtroFornPag) {
                        filtroFornPag.value = supplierName;
                        filtroFornPag.dispatchEvent(new Event('input', { bubbles: true })); 
                    }
                }, 250); 
            }
            showToast(`Filtrando chamados de pagamento por: ${supplierName}`, 'info');
        }
    });
}

// --- MODAL E CRUD: CHAMADO DE PAGAMENTO ---
function abrirModalRegistrarChamadoPag() {
    chamadoPagAtualParaEdicaoId = null;
    if (modalChamadoPagTitulo) modalChamadoPagTitulo.textContent = 'Registrar Chamado de Pagamento';
    if (formRegistrarEditarChamadoPag) formRegistrarEditarChamadoPag.reset();
    if (inputChamadoPagIdEdicao) inputChamadoPagIdEdicao.value = '';
    if (inputHiddenFornecedorIdChamadoPag) inputHiddenFornecedorIdChamadoPag.value = '';
    if (inputNumIdFornecedorChamadoPag) {
        inputNumIdFornecedorChamadoPag.value = '';
        inputNumIdFornecedorChamadoPag.readOnly = false;
    }
    if (inputNomeFornecedorChamadoPag) inputNomeFornecedorChamadoPag.value = '';
    if (modalChamadoPagErrorMessage) modalChamadoPagErrorMessage.style.display = 'none';
    
    // carregarFornecedoresGlobais() é chamado na init e após CRUD de fornecedor
    
    if (modalRegistrarEditarChamadoPag) modalRegistrarEditarChamadoPag.style.display = 'block';
}

async function abrirModalEditarChamadoPag(chamadoId) {
    chamadoPagAtualParaEdicaoId = chamadoId;
    if (modalChamadoPagErrorMessage) modalChamadoPagErrorMessage.style.display = 'none';
    showLoading();
    try {
        const response = await fetch(`${API_URL_PAGAMENTOS}/${chamadoId}`, { credentials: 'include' });
        hideLoading();
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: "Erro ao buscar dados do chamado."}));
            throw new Error(errorData.message || `Erro HTTP ${response.status}`);
        }
        const chamado = await response.json();

        if (modalChamadoPagTitulo) modalChamadoPagTitulo.textContent = 'Editar Registro de Chamado de Pagamento';
        if (inputChamadoPagIdEdicao) inputChamadoPagIdEdicao.value = chamado.id;

        // await carregarFornecedoresGlobais(); // Pode ser redundante

        if (inputNomeFornecedorChamadoPag) inputNomeFornecedorChamadoPag.value = chamado.nome_fornecedor || '';
        if (inputHiddenFornecedorIdChamadoPag) inputHiddenFornecedorIdChamadoPag.value = chamado.fornecedor_id || '';
        if (inputNumIdFornecedorChamadoPag) {
            inputNumIdFornecedorChamadoPag.value = chamado.numero_identificacao_fornecedor || '';
            inputNumIdFornecedorChamadoPag.readOnly = !!chamado.fornecedor_id; 
        }
        
        const form = formRegistrarEditarChamadoPag; 
        if(form) {
            // Acessando elementos pelo ID específico do formulário _pag
            const numeroChamadoOrigemPag = form.querySelector('#numero_chamado_origem_pag');
            const numeroFaturaPag = form.querySelector('#numero_fatura_pag');
            const lancamentoPag = form.querySelector('#lancamento_pag');
            const valorPag = form.querySelector('#valor_pag');
            const dataEscrituracaoPag = form.querySelector('#data_escrituracao_pag');
            const prazoMaximoEscrituracaoPag = form.querySelector('#prazo_maximo_escrituracao_pag');
            const dataVencimentoPag = form.querySelector('#data_vencimento_pag');
            const situacaoPag = form.querySelector('#situacao_pag');
            const observacoesGeraisPag = form.querySelector('#observacoes_gerais_pag');

            if(numeroChamadoOrigemPag) numeroChamadoOrigemPag.value = chamado.numero_chamado_origem || '';
            if(numeroFaturaPag) numeroFaturaPag.value = chamado.numero_fatura || '';
            if(lancamentoPag) lancamentoPag.value = chamado.lancamento || '';
            if(valorPag) valorPag.value = chamado.valor || '';
            if(dataEscrituracaoPag) dataEscrituracaoPag.value = formatDateForInput(chamado.data_escrituracao);
            if(prazoMaximoEscrituracaoPag) prazoMaximoEscrituracaoPag.value = formatDateForInput(chamado.prazo_maximo_escrituracao);
            if(dataVencimentoPag) dataVencimentoPag.value = formatDateForInput(chamado.data_vencimento);
            if(situacaoPag) situacaoPag.value = chamado.situacao || 'Pendente';
            if(observacoesGeraisPag) observacoesGeraisPag.value = chamado.observacoes_gerais || '';
        }

        if (modalRegistrarEditarChamadoPag) modalRegistrarEditarChamadoPag.style.display = 'block';
    } catch (e) {
        hideLoading();
        console.error("Erro ao abrir modal de edição (Pag):", e);
        showToast(`Erro ao carregar dados para edição: ${e.message}`, 'error');
    }
}

function fecharModalRegistrarEditarChamadoPag() {
    if (modalRegistrarEditarChamadoPag) modalRegistrarEditarChamadoPag.style.display = 'none';
    chamadoPagAtualParaEdicaoId = null;
}

if (formRegistrarEditarChamadoPag) {
    formRegistrarEditarChamadoPag.addEventListener('submit', async function (event) {
        event.preventDefault();
        if (modalChamadoPagErrorMessage) modalChamadoPagErrorMessage.style.display = 'none';
        
        const form = formRegistrarEditarChamadoPag; 
        const chamadoData = {
            numero_chamado_origem: form.elements['numero_chamado_origem_pag'].value, 
            numero_fatura: form.elements['numero_fatura_pag'].value,
            fornecedor_id: inputHiddenFornecedorIdChamadoPag.value ? parseInt(inputHiddenFornecedorIdChamadoPag.value) : null,
            nome_fornecedor_input: inputNomeFornecedorChamadoPag.value, 
            numero_identificacao_fornecedor_input: inputNumIdFornecedorChamadoPag.value, 
            lancamento: form.elements['lancamento_pag'].value,
            valor: parseFloat(form.elements['valor_pag'].value),
            data_escrituracao: form.elements['data_escrituracao_pag'].value || null,
            prazo_maximo_escrituracao: form.elements['prazo_maximo_escrituracao_pag'].value || null,
            data_vencimento: form.elements['data_vencimento_pag'].value,
            situacao: form.elements['situacao_pag'].value,
            observacoes_gerais: form.elements['observacoes_gerais_pag'].value
        };

        let url = API_URL_PAGAMENTOS;
        let method = 'POST';
        if (chamadoPagAtualParaEdicaoId) {
            url = `${API_URL_PAGAMENTOS}/${chamadoPagAtualParaEdicaoId}`;
            method = 'PUT';
        }

        showLoading();
        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(chamadoData),
                credentials: 'include'
            });
            hideLoading();
            const responseData = await response.json(); 
            if (!response.ok) {
                throw new Error(responseData.message || `HTTP Error: ${response.status}`);
            }
            fecharModalRegistrarEditarChamadoPag();
            const targetPage = method === 'POST' ? 1 : currentPagePag;
            buscarChamadosPagamento(targetPage, currentSortPag, currentFiltersPag);
            if (method === 'POST' && !chamadoData.fornecedor_id && chamadoData.nome_fornecedor_input) {
                carregarFornecedoresGlobais();
            }
            showToast(`Chamado de Pagamento ${chamadoPagAtualParaEdicaoId ? 'atualizado' : 'registrado'} com sucesso!`, 'success');
        } catch (error) {
            hideLoading();
            console.error(`Falha ao ${chamadoPagAtualParaEdicaoId ? 'atualizar' : 'registrar'} chamado (Pag):`, error);
            if (modalChamadoPagErrorMessage) {
                modalChamadoPagErrorMessage.textContent = `Erro: ${error.message}`;
                modalChamadoPagErrorMessage.style.display = 'block';
            }
            showToast(`Erro: ${error.message}`, 'error');
        }
    });
}

// --- MODAL ACOMPANHAMENTOS CHAMADO PAGAMENTO ---
function fecharModalAcompanhamentosChamadoPag() {
    if (modalAcompanhamentosChamadoPag) modalAcompanhamentosChamadoPag.style.display = 'none';
}

async function abrirModalAcompanhamentosChamadoPag(chamadoId) {
    if (!modalAcompanhamentosChamadoPag || !acompanhamentosChamadoPagInfo || !acompanhamentosChamadoPagLista || !acompanhamentosChamadoPagTitulo || !acompanhamentoChamadoPagIdInput) {
        console.error("Elementos do modal de acompanhamento de pagamento não encontrados.");
        return;
    }
    acompanhamentosChamadoPagInfo.innerHTML = '<p>Carregando informações do chamado...</p>';
    acompanhamentosChamadoPagLista.innerHTML = '<p>Carregando acompanhamentos...</p>';
    acompanhamentosChamadoPagTitulo.textContent = 'Acompanhamentos do Chamado';
    showLoading();
    try {
        const response = await fetch(`${API_URL_PAGAMENTOS}/${chamadoId}`, { credentials: 'include' });
        hideLoading();
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao buscar detalhes do chamado: ${response.status} - ${errorText}`);
        }
        const chamado = await response.json();

        acompanhamentosChamadoPagTitulo.textContent = `Acompanhamentos: ${chamado.numero_chamado_origem || 'N/A'}`;
        let ownerInfoHtml = '';
        if (chamado.owner_username) { // Ajuste para mostrar quem registrou o chamado
            ownerInfoHtml = `<p><strong>Registrado por (Chamado Original):</strong> ${chamado.owner_username}</p>`;
        }
        acompanhamentosChamadoPagInfo.innerHTML = `
            <p><strong>ID do Chamado:</strong> ${chamado.id}</p>
            ${ownerInfoHtml} 
            <p><strong>N° Chamado Externo:</strong> ${chamado.numero_chamado_origem || 'N/A'}</p>
            <p><strong>N° Fatura:</strong> ${chamado.numero_fatura || 'N/A'}</p>
            <p><strong>Fornecedor:</strong> ${chamado.nome_fornecedor || 'N/A'} (ID: ${chamado.fornecedor_id})</p>
            <p><strong>N° ID Fornecedor:</strong> ${chamado.numero_identificacao_fornecedor || 'N/A'}</p>
            <p><strong>Valor:</strong> R$ ${chamado.valor ? chamado.valor.toFixed(2).replace('.', ',') : '0,00'}</p>
            <p><strong>Data de Vencimento:</strong> ${formatDateForDisplay(chamado.data_vencimento)}</p>
            <p><strong>Situação:</strong> <span class="situacao ${formatarStatusParaClasse(chamado.situacao)}">${chamado.situacao || 'N/A'}</span></p>
            <p><strong>Observações Gerais:</strong> ${chamado.observacoes_gerais || 'Nenhuma'}</p>
        `;

        acompanhamentoChamadoPagIdInput.value = chamado.id;
        if (formNovoAcompanhamentoPag) formNovoAcompanhamentoPag.reset(); 
        // Preenche o campo "Registrado por" do acompanhamento com o usuário logado
        const usuarioAcompanhamentoInput = document.getElementById('acompanhamento-pag-usuario');
        if (usuarioAcompanhamentoInput && currentUser) {
            usuarioAcompanhamentoInput.value = currentUser.username;
        }
        
        acompanhamentosChamadoPagLista.innerHTML = '';
        if (chamado.acompanhamentos && chamado.acompanhamentos.length > 0) {
            chamado.acompanhamentos.forEach(h => {
                const item = document.createElement('div');
                item.classList.add('historico-item');
                item.innerHTML = `
                    <p>${h.descricao}</p>
                    <p class="meta">Por: ${h.usuario || 'N/A'} em ${formatDateForDisplay(h.data_entrada)}</p>
                `;
                acompanhamentosChamadoPagLista.appendChild(item);
            });
        } else {
            acompanhamentosChamadoPagLista.innerHTML = '<p class="empty-state-message">Nenhum acompanhamento registrado para este chamado.</p>';
        }
        modalAcompanhamentosChamadoPag.style.display = 'block';
    } catch (error) {
        hideLoading();
        console.error("Erro ao abrir acompanhamentos (Pag):", error);
        acompanhamentosChamadoPagInfo.innerHTML = `<p class="error-message">Não foi possível carregar os detalhes do chamado: ${error.message}</p>`;
        showToast(`Erro ao carregar acompanhamentos: ${error.message}`, 'error');
    }
}

if (formNovoAcompanhamentoPag) {
    formNovoAcompanhamentoPag.addEventListener('submit', async function (event) {
        event.preventDefault();
        const chamadoId = acompanhamentoChamadoPagIdInput.value;
        const descricaoInput = document.getElementById('acompanhamento-pag-descricao');
        const usuarioInput = document.getElementById('acompanhamento-pag-usuario');
        
        const descricao = descricaoInput.value;
        let usuario = usuarioInput.value.trim(); // Pega o valor do input
        if(!usuario && currentUser) { // Se o input estiver vazio, usa o nome do usuário logado
            usuario = currentUser.username;
        }

        if (!descricao.trim()) {
            showToast("A descrição do acompanhamento não pode ser vazia.", "error");
            return;
        }
        showLoading();
        try {
            const response = await fetch(`${API_URL_PAGAMENTOS}/${chamadoId}/acompanhamentos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ descricao: descricao, usuario: usuario }), // Envia o usuário determinado
                credentials: 'include'
            });
            hideLoading();
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || `Erro ao adicionar acompanhamento: ${response.status}`);
            }
            abrirModalAcompanhamentosChamadoPag(chamadoId); 
            showToast('Acompanhamento adicionado com sucesso!', 'success');
        } catch (error) {
            hideLoading();
            console.error("Erro ao adicionar acompanhamento (Pag):", error);
            showToast(`Falha ao adicionar acompanhamento: ${error.message}`, 'error');
        }
    });
}

// --- BUSCAR E RENDERIZAR CHAMADOS DE PAGAMENTO ---
async function buscarChamadosPagamento(page = 1, sortOption = currentSortPag, filters = currentFiltersPag) {
    if (!listaChamadosPagamentoDiv || !currentUser) return;
    showLoading('lista-chamados-pagamento');
    currentSortPag = sortOption; currentPagePag = page; currentFiltersPag = filters;
    try {
        const response = await fetch(API_URL_PAGAMENTOS, { credentials: 'include' });
        hideLoading();
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        todosChamadosPagCache = await response.json();
        
        let itemsToRender = aplicarFiltros(todosChamadosPagCache, currentFiltersPag, 'chamado');
        itemsToRender = aplicarOrdenacao(itemsToRender, currentSortPag);
        
        renderizarListaChamados(itemsToRender, listaChamadosPagamentoDiv, 'pag', currentPagePag);
    } catch (e) {
        hideLoading();
        console.error('Falha ao buscar chamados de pagamento:', e);
        if (listaChamadosPagamentoDiv) setListMessage(listaChamadosPagamentoDiv, `Erro ao carregar chamados: ${e.message}`);
        showToast(`Erro ao buscar chamados de pagamento: ${e.message}`, 'error');
    }
}

// --- MODAL E CRUD: CHAMADO DIVERSO ---
function abrirModalRegistrarChamadoDiv() {
    chamadoDivAtualParaEdicaoId = null;
    if (modalChamadoDivTitulo) modalChamadoDivTitulo.textContent = 'Registrar Chamado Diverso';
    if (formRegistrarEditarChamadoDiv) formRegistrarEditarChamadoDiv.reset();
    if (inputChamadoDivIdEdicao) inputChamadoDivIdEdicao.value = '';
    if (inputHiddenFornecedorIdChamadoDiv) inputHiddenFornecedorIdChamadoDiv.value = '';
    if (inputNumIdFornecedorChamadoDiv) {
        inputNumIdFornecedorChamadoDiv.value = '';
        inputNumIdFornecedorChamadoDiv.readOnly = false;
    }
    if(inputNomeFornecedorChamadoDiv) inputNomeFornecedorChamadoDiv.value = '';
    if (modalChamadoDivErrorMessage) modalChamadoDivErrorMessage.style.display = 'none';
    // carregarFornecedoresGlobais() é chamado na init e após CRUD de fornecedor
    if (modalRegistrarEditarChamadoDiv) modalRegistrarEditarChamadoDiv.style.display = 'block';
}

async function abrirModalEditarChamadoDiv(chamadoId) {
    chamadoDivAtualParaEdicaoId = chamadoId;
    if (modalChamadoDivErrorMessage) modalChamadoDivErrorMessage.style.display = 'none';
    showLoading();
    try {
        const response = await fetch(`${API_URL_DIVERSOS}/${chamadoId}`, { credentials: 'include' });
        hideLoading();
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: "Erro ao buscar dados do chamado diverso."}));
            throw new Error(errorData.message || `Erro HTTP ${response.status}`);
        }
        const chamado = await response.json();

        if (modalChamadoDivTitulo) modalChamadoDivTitulo.textContent = 'Editar Registro de Chamado Diverso';
        if (inputChamadoDivIdEdicao) inputChamadoDivIdEdicao.value = chamado.id;

        // await carregarFornecedoresGlobais(); // Pode ser redundante se o cache estiver atualizado

        if (inputNomeFornecedorChamadoDiv) inputNomeFornecedorChamadoDiv.value = chamado.nome_fornecedor || '';
        if (inputHiddenFornecedorIdChamadoDiv) inputHiddenFornecedorIdChamadoDiv.value = chamado.fornecedor_id || '';
        if (inputNumIdFornecedorChamadoDiv) {
            inputNumIdFornecedorChamadoDiv.value = chamado.numero_identificacao_fornecedor || '';
            inputNumIdFornecedorChamadoDiv.readOnly = !!chamado.fornecedor_id;
        }
        
        const form = formRegistrarEditarChamadoDiv; // Garante que está se referindo ao formulário correto
        if(form){
            // Acessando elementos pelo ID específico do formulário _div
            const numeroChamadoOrigemDiv = form.querySelector('#numero_chamado_origem_div');
            const valorDiv = form.querySelector('#valor_div');
            const dataEscrituracaoDiv = form.querySelector('#data_escrituracao_div');
            const situacaoDiv = form.querySelector('#situacao_div');
            const observacoesDiv = form.querySelector('#observacoes_div');

            if(numeroChamadoOrigemDiv) numeroChamadoOrigemDiv.value = chamado.numero_chamado_origem || '';
            if(valorDiv) valorDiv.value = chamado.valor !== null ? chamado.valor : ''; 
            if(dataEscrituracaoDiv) dataEscrituracaoDiv.value = formatDateForInput(chamado.data_escrituracao);
            if(situacaoDiv) situacaoDiv.value = chamado.situacao || 'Aberto';
            if(observacoesDiv) observacoesDiv.value = chamado.observacoes || '';
        }

        if (modalRegistrarEditarChamadoDiv) modalRegistrarEditarChamadoDiv.style.display = 'block';
    } catch (e) {
        hideLoading();
        console.error("Erro ao abrir modal de edição (Div):", e);
        showToast(`Erro ao carregar dados para edição: ${e.message}`, 'error');
    }
}

function fecharModalRegistrarEditarChamadoDiv() {
    if (modalRegistrarEditarChamadoDiv) modalRegistrarEditarChamadoDiv.style.display = 'none';
    chamadoDivAtualParaEdicaoId = null;
}

if (formRegistrarEditarChamadoDiv) {
    formRegistrarEditarChamadoDiv.addEventListener('submit', async function (event) {
        event.preventDefault();
        if (modalChamadoDivErrorMessage) modalChamadoDivErrorMessage.style.display = 'none';
        
        const form = formRegistrarEditarChamadoDiv;
        const chamadoData = {
            numero_chamado_origem: form.elements['numero_chamado_origem_div'].value,
            fornecedor_id: inputHiddenFornecedorIdChamadoDiv.value ? parseInt(inputHiddenFornecedorIdChamadoDiv.value) : null,
            nome_fornecedor_input: inputNomeFornecedorChamadoDiv.value,
            numero_identificacao_fornecedor_input: inputNumIdFornecedorChamadoDiv.value,
            valor: form.elements['valor_div'].value ? parseFloat(form.elements['valor_div'].value) : null,
            data_escrituracao: form.elements['data_escrituracao_div'].value,
            situacao: form.elements['situacao_div'].value,
            observacoes: form.elements['observacoes_div'].value
        };

        let url = API_URL_DIVERSOS;
        let method = 'POST';
        if (chamadoDivAtualParaEdicaoId) {
            url = `${API_URL_DIVERSOS}/${chamadoDivAtualParaEdicaoId}`;
            method = 'PUT';
        }

        showLoading();
        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(chamadoData),
                credentials: 'include'
            });
            hideLoading();
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || `HTTP Error: ${response.status}`);
            }
            fecharModalRegistrarEditarChamadoDiv();
            const targetPage = method === 'POST' ? 1 : currentPageDiv;
            buscarChamadosDiversos(targetPage, currentSortDiv, currentFiltersDiv);
            if (method === 'POST' && !chamadoData.fornecedor_id && chamadoData.nome_fornecedor_input) {
                carregarFornecedoresGlobais();
            }
            showToast(`Chamado Diverso ${chamadoDivAtualParaEdicaoId ? 'atualizado' : 'registrado'} com sucesso!`, 'success');
        } catch (error) {
            hideLoading();
            console.error(`Falha ao ${chamadoDivAtualParaEdicaoId ? 'atualizar' : 'registrar'} chamado (Div):`, error);
            if (modalChamadoDivErrorMessage) {
                modalChamadoDivErrorMessage.textContent = `Erro: ${error.message}`;
                modalChamadoDivErrorMessage.style.display = 'block';
            }
            showToast(`Erro: ${error.message}`, 'error');
        }
    });
}

// --- MODAL ACOMPANHAMENTOS CHAMADO DIVERSO ---
function fecharModalAcompanhamentosChamadoDiv() {
    if (modalAcompanhamentosChamadoDiv) modalAcompanhamentosChamadoDiv.style.display = 'none';
}

async function abrirModalAcompanhamentosChamadoDiv(chamadoId) {
    if (!modalAcompanhamentosChamadoDiv || !acompanhamentosChamadoDivInfo || !acompanhamentosChamadoDivLista || !acompanhamentosChamadoDivTitulo || !acompanhamentoChamadoDivIdInput) {
         console.error("Elementos do modal de acompanhamento diverso não encontrados.");
        return;
    }
    acompanhamentosChamadoDivInfo.innerHTML = '<p>Carregando informações do chamado...</p>';
    acompanhamentosChamadoDivLista.innerHTML = '<p>Carregando acompanhamentos...</p>';
    acompanhamentosChamadoDivTitulo.textContent = 'Acompanhamentos do Chamado';
    showLoading();
    try {
        const response = await fetch(`${API_URL_DIVERSOS}/${chamadoId}`, { credentials: 'include' });
        hideLoading();
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao buscar detalhes do chamado diverso: ${response.status} - ${errorText}`);
        }
        const chamado = await response.json();

        acompanhamentosChamadoDivTitulo.textContent = `Acompanhamentos: ${chamado.numero_chamado_origem || 'N/A'}`;
        let fornecedorInfoHtml = '';
        if (chamado.fornecedor_id) { 
            fornecedorInfoHtml = `<p><strong>Fornecedor:</strong> ${chamado.nome_fornecedor || 'N/A'} (ID: ${chamado.fornecedor_id})</p>
                                  <p><strong>N° ID Fornecedor:</strong> ${chamado.numero_identificacao_fornecedor || 'N/A'}</p>`;
        }
        let valorInfoHtml = '';
        if (chamado.valor !== null && chamado.valor !== undefined) { 
            valorInfoHtml = `<p><strong>Valor:</strong> R$ ${chamado.valor.toFixed(2).replace('.', ',')}</p>`;
        }
        let ownerInfoHtml = ''; // Para mostrar quem registrou o chamado original
        if (chamado.owner_username) {
            ownerInfoHtml = `<p><strong>Registrado por (Chamado Original):</strong> ${chamado.owner_username}</p>`;
        }
        acompanhamentosChamadoDivInfo.innerHTML = `
            <p><strong>ID do Chamado:</strong> ${chamado.id}</p>
            ${ownerInfoHtml}
            <p><strong>N° Chamado Externo:</strong> ${chamado.numero_chamado_origem || 'N/A'}</p>
            ${fornecedorInfoHtml}
            ${valorInfoHtml}
            <p><strong>Data de Ocorrência/Criação:</strong> ${formatDateForDisplay(chamado.data_escrituracao)}</p>
            <p><strong>Situação:</strong> <span class="situacao ${formatarStatusParaClasse(chamado.situacao)}">${chamado.situacao || 'N/A'}</span></p>
            <p><strong>Observações Iniciais:</strong> ${chamado.observacoes || 'Nenhuma'}</p>
        `;

        acompanhamentoChamadoDivIdInput.value = chamado.id;
        if(formNovoAcompanhamentoDiv) formNovoAcompanhamentoDiv.reset();
        const usuarioAcompanhamentoDiv = document.getElementById('acompanhamento-div-usuario');
        if(usuarioAcompanhamentoDiv && currentUser) usuarioAcompanhamentoDiv.value = currentUser.username; // Preenche com usuário logado
        
        acompanhamentosChamadoDivLista.innerHTML = '';
        if (chamado.acompanhamentos && chamado.acompanhamentos.length > 0) {
            chamado.acompanhamentos.forEach(h => {
                const item = document.createElement('div');
                item.classList.add('historico-item');
                item.innerHTML = `
                    <p>${h.descricao}</p>
                    <p class="meta">Por: ${h.usuario || 'N/A'} em ${formatDateForDisplay(h.data_entrada)}</p>
                `;
                acompanhamentosChamadoDivLista.appendChild(item);
            });
        } else {
            acompanhamentosChamadoDivLista.innerHTML = '<p class="empty-state-message">Nenhum acompanhamento registrado para este chamado.</p>';
        }
        modalAcompanhamentosChamadoDiv.style.display = 'block';
    } catch (error) {
        hideLoading();
        console.error("Erro ao abrir acompanhamentos (Div):", error);
        acompanhamentosChamadoDivInfo.innerHTML = `<p class="error-message">Não foi possível carregar os detalhes do chamado: ${error.message}</p>`;
        showToast(`Erro ao carregar acompanhamentos: ${error.message}`, 'error');
    }
}

if (formNovoAcompanhamentoDiv) {
    formNovoAcompanhamentoDiv.addEventListener('submit', async function (event) {
        event.preventDefault();
        const chamadoId = acompanhamentoChamadoDivIdInput.value;
        const descricaoInput = document.getElementById('acompanhamento-div-descricao');
        const usuarioInput = document.getElementById('acompanhamento-div-usuario');
        
        const descricao = descricaoInput.value;
        let usuario = usuarioInput.value.trim();
        if(!usuario && currentUser) { 
            usuario = currentUser.username;
        }

        if (!descricao.trim()) {
            showToast("A descrição do acompanhamento não pode ser vazia.", "error");
            return;
        }
        showLoading();
        try {
            const response = await fetch(`${API_URL_DIVERSOS}/${chamadoId}/acompanhamentos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ descricao: descricao, usuario: usuario }), // Envia o usuário determinado
                credentials: 'include'
            });
            hideLoading();
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || `Erro ao adicionar acompanhamento: ${response.status}`);
            }
            abrirModalAcompanhamentosChamadoDiv(chamadoId); 
            showToast('Acompanhamento adicionado com sucesso!', 'success');
        } catch (error) {
            hideLoading();
            console.error("Erro ao adicionar acompanhamento (Div):", error);
            showToast(`Falha ao adicionar acompanhamento: ${error.message}`, 'error');
        }
    });
}

// --- BUSCAR E RENDERIZAR CHAMADOS DIVERSOS ---
async function buscarChamadosDiversos(page = 1, sortOption = currentSortDiv, filters = currentFiltersDiv) {
    if (!listaChamadosDiversosDiv || !currentUser) return;
    showLoading('lista-chamados-diversos');
    currentSortDiv = sortOption; currentPageDiv = page; currentFiltersDiv = filters;
    try {
        const response = await fetch(API_URL_DIVERSOS, { credentials: 'include' });
        hideLoading();
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        todosChamadosDivCache = await response.json();
        
        let itemsToRender = aplicarFiltros(todosChamadosDivCache, currentFiltersDiv, 'chamado');
        itemsToRender = aplicarOrdenacao(itemsToRender, currentSortDiv);
        
        renderizarListaChamados(itemsToRender, listaChamadosDiversosDiv, 'div', currentPageDiv);
    } catch (e) {
        hideLoading();
        console.error('Falha ao buscar chamados diversos:', e);
        if (listaChamadosDiversosDiv) setListMessage(listaChamadosDiversosDiv, `Erro ao carregar chamados: ${e.message}`);
        showToast(`Erro ao buscar chamados diversos: ${e.message}`, 'error');
    }
}

// --- RENDERIZADOR GENÉRICO DE LISTA DE CHAMADOS (CARDS) ---
function renderizarListaChamados(chamados, containerElement, tipoChamadoSlug, currentPage = 1) {
    if (!containerElement) {
        console.error("Elemento container não encontrado para renderizar lista de chamados:", containerElement);
        return;
    }
    containerElement.innerHTML = ''; // Limpa conteúdo anterior
    const itemsPerPage = ITEMS_PER_PAGE_CARDS;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = chamados.slice(start, end);

    if (paginatedItems.length === 0) {
        let currentFilters = tipoChamadoSlug === 'pag' ? currentFiltersPag : currentFiltersDiv;
        let temFiltroAtivo = Object.keys(currentFilters).length > 0;
        setListMessage(containerElement, `Nenhum chamado ${tipoChamadoSlug === 'pag' ? 'de pagamento' : 'diverso'} encontrado ${temFiltroAtivo ? 'para os filtros aplicados' : ''}.`);
    } else {
        paginatedItems.forEach(chamado => {
            const card = document.createElement('div');
            card.classList.add('chamado-card');

            let fornecedorHTML = '';
            if (chamado.nome_fornecedor || chamado.fornecedor_id) {
                fornecedorHTML = `<p><strong>Fornecedor:</strong> <a href="#" class="supplier-name-link" data-supplier-id="${chamado.fornecedor_id}" data-supplier-name="${chamado.nome_fornecedor || ''}">${chamado.nome_fornecedor || 'N/A'}</a> (ID: ${chamado.fornecedor_id || 'N/A'})</p>`;
            } else if (tipoChamadoSlug === 'pag') { 
                 fornecedorHTML = `<p><strong>Fornecedor:</strong> N/A</p>`;
            }


            let valorHTML = '';
            if (chamado.valor !== null && chamado.valor !== undefined) {
                 valorHTML = `<p><strong>Valor:</strong> R$ ${chamado.valor ? chamado.valor.toFixed(2).replace('.', ',') : '0,00'}</p>`;
            }

            let extraFieldsHTML = '';
            if (tipoChamadoSlug === 'pag') {
                extraFieldsHTML = `
                    <p><strong>Fatura:</strong> ${chamado.numero_fatura || 'N/A'}</p>
                    <p><strong>Vencimento:</strong> ${formatDateForDisplay(chamado.data_vencimento)}</p>`;
            } else { // 'div'
                extraFieldsHTML = `
                    <p><strong>Data Ocorr.:</strong> ${formatDateForDisplay(chamado.data_escrituracao)}</p>
                    <p><strong>Observações:</strong> ${(chamado.observacoes || 'N/A').substring(0, 50)}${(chamado.observacoes && chamado.observacoes.length > 50) ? '...' : ''}</p>`;
            }
            
            let ownerHTML = '';
            if (currentUser && currentUser.role === 'master' && chamado.owner_username) {
                ownerHTML = `<p><small><strong>Usuário:</strong> ${chamado.owner_username}</small></p>`;
            }

            card.innerHTML = `
                <h3>${chamado.numero_chamado_origem || 'N/A'}</h3>
                ${fornecedorHTML}
                ${valorHTML}
                ${extraFieldsHTML}
                <p><strong>Situação:</strong> <span class="situacao ${formatarStatusParaClasse(chamado.situacao)}">${chamado.situacao || 'N/A'}</span></p>
                ${ownerHTML}
                <div class="chamado-actions">
                    <button class="btn btn-sm btn-info btn-acompanhamentos" data-id="${chamado.id}" data-tipo="${tipoChamadoSlug}" title="Ver/Adicionar Acompanhamentos">Acompanhar</button>
                    <button class="btn btn-sm btn-warning btn-editar" data-id="${chamado.id}" data-tipo="${tipoChamadoSlug}" title="Editar Chamado">Editar</button>
                    <button class="btn btn-sm btn-danger btn-excluir" data-id="${chamado.id}" data-tipo="${tipoChamadoSlug}" title="Excluir Chamado">Excluir</button>
                </div>
            `;
            containerElement.appendChild(card);
        });
    }

    const paginationContainerId = tipoChamadoSlug === 'pag' ? 'pagination-chamados-pag' : 'pagination-chamados-div';
    
    const paginationCallback = (newPage) => {
        if (tipoChamadoSlug === 'pag') {
            buscarChamadosPagamento(newPage, currentSortPag, currentFiltersPag);
        } else { 
            buscarChamadosDiversos(newPage, currentSortDiv, currentFiltersDiv);
        }
    };
    setupPagination(chamados.length, itemsPerPage, currentPage, paginationContainerId, paginationCallback);
}


// --- DELEGAÇÃO DE EVENTOS PARA CARDS (GENÉRICO) ---
document.querySelectorAll('.chamados-grid').forEach(grid => {
    grid.addEventListener('click', async (event) => {
        const targetButton = event.target.closest('button');
        const targetLink = event.target.closest('a.supplier-name-link'); 

        if (targetButton) {
            const chamadoId = targetButton.dataset.id;
            const tipoChamado = targetButton.dataset.tipo; 
            if (!chamadoId || !tipoChamado) return;

            const API_URL_CURRENT = tipoChamado === 'pag' ? API_URL_PAGAMENTOS : API_URL_DIVERSOS;
            const fnAbrirModalEditar = tipoChamado === 'pag' ? abrirModalEditarChamadoPag : abrirModalEditarChamadoDiv;
            const fnBuscarChamados = tipoChamado === 'pag' ? buscarChamadosPagamento : buscarChamadosDiversos;
            const fnAbrirModalAcompanhamentos = tipoChamado === 'pag' ? abrirModalAcompanhamentosChamadoPag : abrirModalAcompanhamentosChamadoDiv;
            const curPage = tipoChamado === 'pag' ? currentPagePag : currentPageDiv;
            const curSort = tipoChamado === 'pag' ? currentSortPag : currentSortDiv;
            const curFilters = tipoChamado === 'pag' ? currentFiltersPag : currentFiltersDiv;

            if (targetButton.classList.contains('btn-acompanhamentos')) {
                fnAbrirModalAcompanhamentos(chamadoId);
            } else if (targetButton.classList.contains('btn-editar')) {
                fnAbrirModalEditar(chamadoId);
            } else if (targetButton.classList.contains('btn-excluir')) {
                if (confirm(`Tem certeza que deseja excluir o chamado ID ${chamadoId}? Esta ação não pode ser desfeita.`)) {
                    showLoading();
                    try {
                        const response = await fetch(`${API_URL_CURRENT}/${chamadoId}`, { method: 'DELETE', credentials: 'include' });
                        hideLoading();
                        const data = await response.json();
                        if (!response.ok) { throw new Error(data.message || `Erro ao excluir: ${response.status}`); }
                        showToast('Chamado excluído com sucesso!', 'success');
                        fnBuscarChamados(curPage, curSort, curFilters); 
                    } catch (error) {
                        hideLoading();
                        console.error("Erro ao excluir chamado:", error);
                        showToast(`Falha ao excluir chamado: ${error.message}`, 'error');
                    }
                }
            }
        } else if (targetLink && targetLink.classList.contains('supplier-name-link')) {
             event.preventDefault();
            const supplierName = targetLink.dataset.supplierName;
            const pagTabLink = document.querySelector('nav ul li a[data-target="chamados-pagamento-section"]');
            if (pagTabLink) {
                if (!pagTabLink.classList.contains('active')) {
                     pagTabLink.click();
                }
                setTimeout(() => { 
                    const filtroFornPag = document.getElementById('filtro-fornecedor-chamado-pag');
                    if (filtroFornPag) {
                        filtroFornPag.value = supplierName;
                        filtroFornPag.dispatchEvent(new Event('input', { bubbles: true })); 
                    }
                }, 200); 
            }
            showToast(`Filtrando chamados de pagamento por: ${supplierName}`, 'info');
        }
    });
});


// --- LÓGICA DE FILTROS ---
function setupFilterListeners() {
    document.querySelectorAll('.filter-input').forEach(input => {
        input.addEventListener('input', () => { 
            const listId = input.dataset.list;
            const filters = collectFiltersForList(listId);
            if (listId === 'lista-chamados-pagamento') { currentPagePag = 1; buscarChamadosPagamento(1, currentSortPag, filters); }
            else if (listId === 'lista-chamados-diversos') { currentPageDiv = 1; buscarChamadosDiversos(1, currentSortDiv, filters); }
            else if (listId === 'corpo-tabela-fornecedores') { currentPageForn = 1; carregarErenderizarFornecedores(1, currentSortForn, filters); }
            else if (listId === 'corpo-tabela-admin-users') { currentPageAdminUsers = 1; carregarErenderizarAdminUsers(1, currentSortAdminUsers, filters); }
        });
    });
}

function collectFiltersForList(listId) {
    const filters = {};
    document.querySelectorAll(`.filter-input[data-list="${listId}"]`).forEach(filterElem => {
        if (filterElem.value && filterElem.value.trim() !== '') { 
            filters[filterElem.dataset.fieldkey] = filterElem.value.toLowerCase().trim();
        }
    });
    if (listId === 'lista-chamados-pagamento') currentFiltersPag = filters;
    else if (listId === 'lista-chamados-diversos') currentFiltersDiv = filters;
    else if (listId === 'corpo-tabela-fornecedores') currentFiltersForn = filters;
    else if (listId === 'corpo-tabela-admin-users') currentFiltersAdminUsers = filters;
    return filters;
}

function aplicarFiltros(items, filters, itemType) { 
    if (!items) return [];
    if (Object.keys(filters).length === 0) return items;
    return items.filter(item => {
        for (const fieldKey in filters) {
            const filterVal = filters[fieldKey];
            let itemVal = '';

            if (fieldKey === 'nome_fornecedor' && item.nome_fornecedor) { 
                itemVal = String(item.nome_fornecedor).toLowerCase().trim();
            } else if (fieldKey === 'numero_identificacao_fornecedor' && item.numero_identificacao_fornecedor) {
                 itemVal = String(item.numero_identificacao_fornecedor).toLowerCase().trim();
            } else if (fieldKey === 'owner_username' && item.owner_username) { 
                itemVal = String(item.owner_username).toLowerCase().trim();
            } else if (itemType === 'user_admin' && (fieldKey === 'username' || fieldKey === 'email' || fieldKey === 'role')) { 
                itemVal = item[fieldKey] ? String(item[fieldKey]).toLowerCase().trim() : '';
            } else if (item[fieldKey]) { 
                itemVal = String(item[fieldKey]).toLowerCase().trim();
            }
            
            if (!itemVal.includes(filterVal)) return false;
        }
        return true;
    });
}

// --- LÓGICA DE ORDENAÇÃO ---
function aplicarOrdenacao(items, sortOption) {
    if (!sortOption || !items || items.length === 0) return items;
    
    let key, direction;
    if (typeof sortOption === 'object' && sortOption.key && sortOption.direction) { 
        key = sortOption.key;
        direction = sortOption.direction;
    } else if (typeof sortOption === 'string' && sortOption.includes('_')) { 
        const parts = sortOption.split('_');
        direction = parts.pop(); 
        key = parts.join('_');   
    } else if (typeof sortOption === 'string') { 
        key = sortOption;
        direction = 'asc'; 
    } else {
        return items; 
    }
    
    const isAsc = direction === 'asc';

    return [...items].sort((a, b) => {
        let valA = a[key];
        let valB = b[key];

        // Tratamento para campos que podem ser de objetos aninhados (ex: nome_fornecedor em chamados)
        if(key === 'nome_fornecedor' && a.nome_fornecedor) valA = a.nome_fornecedor; 
        if(key === 'nome_fornecedor' && b.nome_fornecedor) valB = b.nome_fornecedor;
        if(key === 'owner_username' && a.owner_username) valA = a.owner_username; 
        if(key === 'owner_username' && b.owner_username) valB = b.owner_username;


        if (key && key.startsWith('data_') && valA && valB) {
            valA = new Date(valA);
            valB = new Date(valB);
        } else if (typeof valA === 'number' && typeof valB === 'number') {
            // Já são números
        } else { 
            valA = String(valA === null || valA === undefined ? '' : valA).toLowerCase();
            valB = String(valB === null || valB === undefined ? '' : valB).toLowerCase();
        }

        if (valA < valB) return isAsc ? -1 : 1;
        if (valA > valB) return isAsc ? 1 : -1;
        return 0;
    });
}

function setupSortListeners() {
    if (sortChamadoPagSelect) sortChamadoPagSelect.addEventListener('change', (e) => {
        currentSortPag = e.target.value;
        buscarChamadosPagamento(1, currentSortPag, currentFiltersPag);
    });
    if (sortChamadoDivSelect) sortChamadoDivSelect.addEventListener('change', (e) => {
        currentSortDiv = e.target.value;
        buscarChamadosDiversos(1, currentSortDiv, currentFiltersDiv);
    });
    
    const configureTableSort = (headers, sortStateVarRef, fetchFn, filtersVarRef, pageVarName) => {
        if(headers) {
            headers.forEach(th => {
                const sortKey = th.dataset.sortkey; if (!sortKey) return; 

                th.addEventListener('click', () => {
                    const newDirection = (sortStateVarRef.key === sortKey && sortStateVarRef.direction === 'asc') ? 'desc' : 'asc';
                    sortStateVarRef.key = sortKey;
                    sortStateVarRef.direction = newDirection;
                    
                    headers.forEach(h => { const arrow = h.querySelector('.sort-arrow'); if (arrow) arrow.textContent = ''; h.classList.remove('sort-asc', 'sort-desc');});
                    const arrowSpan = th.querySelector('.sort-arrow'); if (arrowSpan) arrowSpan.textContent = newDirection === 'asc' ? ' ▲' : ' ▼';
                    th.classList.add(newDirection === 'asc' ? 'sort-asc' : 'sort-desc');
                    
                    if (pageVarName === 'currentPageForn') currentPageForn = 1;
                    else if (pageVarName === 'currentPageAdminUsers') currentPageAdminUsers = 1;
                    
                    fetchFn(1, sortStateVarRef, filtersVarRef);
                });
            });
        }
    };
    configureTableSort(tabelaFornecedoresHeaders, currentSortForn, carregarErenderizarFornecedores, currentFiltersForn, 'currentPageForn');
    const adminUsersTableHeaders = document.querySelectorAll('#tabela-admin-users th[data-sortkey]');
    if (adminUsersTableHeaders.length > 0) configureTableSort(adminUsersTableHeaders, currentSortAdminUsers, carregarErenderizarAdminUsers, currentFiltersAdminUsers, 'currentPageAdminUsers');
}

// --- LÓGICA DE PAGINAÇÃO ---
function setupPagination(totalItems, itemsPerPage, currentPage, paginationContainerId, fetchFunctionWithPage) {
    const paginationContainer = document.getElementById(paginationContainerId);
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return;

    const createPageButton = (pageNumber, text, isDisabled = false, isActive = false) => {
        const button = document.createElement('button');
        button.textContent = text || pageNumber;
        button.className = 'btn btn-sm';
        button.classList.add(isActive ? 'btn-primary' : 'btn-secondary');
        button.disabled = isDisabled;
        if (!isDisabled) { 
             button.addEventListener('click', () => fetchFunctionWithPage(pageNumber));
        }
        return button;
    };

    paginationContainer.appendChild(createPageButton(currentPage - 1, 'Anterior', currentPage === 1));

    let startPage = Math.max(1, currentPage - 1); 
    let endPage = Math.min(totalPages, currentPage + 1);

    if(totalPages > 3) { 
        if (currentPage <= 2) { 
            startPage = 1;
            endPage = Math.min(3, totalPages);
        } else if (currentPage >= totalPages - 1) { 
            startPage = Math.max(1, totalPages - 2);
            endPage = totalPages;
        }
    } else { 
        startPage = 1;
        endPage = totalPages;
    }
    
    if (startPage > 1) {
        paginationContainer.appendChild(createPageButton(1, '1'));
        if (startPage > 2) { 
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.margin = "0 5px";
            paginationContainer.appendChild(dots);
        }
    }
    for (let i = startPage; i <= endPage; i++) {
        paginationContainer.appendChild(createPageButton(i, i, false, i === currentPage));
    }
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.margin = "0 5px";
            paginationContainer.appendChild(dots);
        }
        paginationContainer.appendChild(createPageButton(totalPages, totalPages));
    }
    paginationContainer.appendChild(createPageButton(currentPage + 1, 'Próxima', currentPage === totalPages));
}


// --- NAVEGAÇÃO POR ABAS ---
if (navLinks && contentSections) {
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            if (!currentUser && targetId !== 'auth-section-placeholder') { 
                 if(targetId !== 'modal-login' && targetId !== 'modal-register') { 
                    showToast("Por favor, faça login para acessar esta área.", "error"); 
                    return;
                 }
            }
            if (targetId === 'admin-users-section' && (!currentUser || currentUser.role !== 'master')) {
                 showToast("Acesso restrito a administradores.", "error"); return;
            }

            contentSections.forEach(section => section.style.display = 'none');
            navLinks.forEach(navLink => navLink.classList.remove('active'));

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                link.classList.add('active');

                currentPagePag = 1; currentPageDiv = 1; currentPageForn = 1; currentPageAdminUsers = 1;
                currentFiltersPag = {}; currentFiltersDiv = {}; currentFiltersForn = {}; currentFiltersAdminUsers = {};
                document.querySelectorAll('.filter-input').forEach(fi => fi.value = ''); 
                if(sortChamadoPagSelect) sortChamadoPagSelect.value = 'data_criacao_registro_desc'; currentSortPag = 'data_criacao_registro_desc';
                if(sortChamadoDivSelect) sortChamadoDivSelect.value = 'data_criacao_registro_desc'; currentSortDiv = 'data_criacao_registro_desc';
                currentSortForn = {key:'nome_fornecedor', direction:'asc'};
                currentSortAdminUsers = {key:'username', direction:'asc'};
                if(tabelaFornecedoresHeaders) tabelaFornecedoresHeaders.forEach(h => {const arrow = h.querySelector('.sort-arrow'); if(arrow) arrow.textContent = ''; h.classList.remove('sort-asc','sort-desc');});
                const adminUsersTableHeaders = document.querySelectorAll('#tabela-admin-users th[data-sortkey]');
                if(adminUsersTableHeaders) adminUsersTableHeaders.forEach(h => {const arrow = h.querySelector('.sort-arrow'); if(arrow) arrow.textContent = ''; h.classList.remove('sort-asc','sort-desc');});

                if (targetId === 'chamados-pagamento-section') buscarChamadosPagamento();
                else if (targetId === 'fornecedores-section') carregarErenderizarFornecedores();
                else if (targetId === 'chamados-diversos-section') buscarChamadosDiversos();
                else if (targetId === 'admin-users-section' && currentUser && currentUser.role === 'master') carregarErenderizarAdminUsers();
            }
        });
    });
}

// --- EVENT LISTENERS GLOBAIS E INICIALIZAÇÃO ---
function setupGlobalEventListeners() {
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
        const closeButton = modal.querySelector('.close-button');
        if (closeButton) closeButton.addEventListener('click', () => modal.style.display = 'none');
    });
    window.addEventListener('click', function (event) { allModals.forEach(modal => { if (event.target == modal) modal.style.display = 'none'; }); });
    window.addEventListener('keydown', function (event) { if (event.key === "Escape") { allModals.forEach(modal => modal.style.display = 'none'); } });

    if(btnCancelLoginModal && modalLogin) btnCancelLoginModal.addEventListener('click', () => modalLogin.style.display = 'none');
    if(btnCancelRegisterModal && modalRegister) btnCancelRegisterModal.addEventListener('click', () => modalRegister.style.display = 'none');
    if(formLogin) formLogin.addEventListener('submit', handleLogin);
    if(formRegister) formRegister.addEventListener('submit', handleRegister);

    if (btnAbrirModalRegistrarChamadoPag) btnAbrirModalRegistrarChamadoPag.addEventListener('click', abrirModalRegistrarChamadoPag);
    if (btnCloseModalRegistrarEditarChamadoPag) btnCloseModalRegistrarEditarChamadoPag.addEventListener('click', fecharModalRegistrarEditarChamadoPag);
    if (btnCancelarModalChamadoPag) btnCancelarModalChamadoPag.addEventListener('click', fecharModalRegistrarEditarChamadoPag);
    if (btnCloseModalAcompanhamentosChamadoPag) btnCloseModalAcompanhamentosChamadoPag.addEventListener('click', fecharModalAcompanhamentosChamadoPag);
    if (btnAtualizarChamadosPag) btnAtualizarChamadosPag.addEventListener('click', () => buscarChamadosPagamento(currentPagePag, currentSortPag, currentFiltersPag));

    if (btnAbrirModalRegistrarChamadoDiv) btnAbrirModalRegistrarChamadoDiv.addEventListener('click', abrirModalRegistrarChamadoDiv);
    if (btnCloseModalRegistrarEditarChamadoDiv) btnCloseModalRegistrarEditarChamadoDiv.addEventListener('click', fecharModalRegistrarEditarChamadoDiv);
    if (btnCancelarModalChamadoDiv) btnCancelarModalChamadoDiv.addEventListener('click', fecharModalRegistrarEditarChamadoDiv);
    if (btnCloseModalAcompanhamentosChamadoDiv) btnCloseModalAcompanhamentosChamadoDiv.addEventListener('click', fecharModalAcompanhamentosChamadoDiv);
    if (btnAtualizarChamadosDiv) btnAtualizarChamadosDiv.addEventListener('click', () => buscarChamadosDiversos(currentPageDiv, currentSortDiv, currentFiltersDiv));
    
    if (btnAbrirModalNovoFornecedor) btnAbrirModalNovoFornecedor.addEventListener('click', abrirModalNovoFornecedor);
    if (btnCloseModalFornecedor) btnCloseModalFornecedor.addEventListener('click', fecharModalNovoEditarFornecedor);
    if (btnCancelarModalFornecedor) btnCancelarModalFornecedor.addEventListener('click', fecharModalNovoEditarFornecedor);

    if(formEditUserRole) formEditUserRole.addEventListener('submit', handleEditUserRoleSubmit);
    if(btnCloseModalEditUserRole) btnCloseModalEditUserRole.addEventListener('click', () => {if(modalEditUserRole) modalEditUserRole.style.display = 'none'; adminEditUserId = null;});
    if(btnCancelEditUserRole) btnCancelEditUserRole.addEventListener('click', () => {if(modalEditUserRole) modalEditUserRole.style.display = 'none'; adminEditUserId = null;});

    // Link da Logo
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (event) => {
            event.preventDefault();
            if (currentUser) { 
                const firstTabLink = document.querySelector('nav ul li a[data-target="chamados-pagamento-section"]');
                if (firstTabLink) {
                    firstTabLink.click(); 
                }
            } else { 
                // Se não logado, poderia apenas recarregar a página ou mostrar o modal de login
                if (modalLogin && modalLogin.style.display !== 'block') {
                     modalLogin.style.display = 'block';
                     if(formLogin) formLogin.reset();
                     if(loginErrorMessage) loginErrorMessage.style.display = 'none';
                } else if (!modalLogin) {
                    window.location.reload(); // Fallback
                }
            }
        });
    }
}

function init() {
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
    checkAuthStatus(); 
    setupGlobalEventListeners(); 
    setupFornecedorInput(inputNomeFornecedorChamadoPag, inputHiddenFornecedorIdChamadoPag, inputNumIdFornecedorChamadoPag, datalistFornecedores);
    setupFornecedorInput(inputNomeFornecedorChamadoDiv, inputHiddenFornecedorIdChamadoDiv, inputNumIdFornecedorChamadoDiv, datalistFornecedoresDiv);
}

document.addEventListener('DOMContentLoaded', init);

// --- ADMIN USER MANAGEMENT ---
async function carregarErenderizarAdminUsers(page = 1, sortConfig = currentSortAdminUsers, filters = currentFiltersAdminUsers ) {
    if (!corpoTabelaAdminUsers || !currentUser || currentUser.role !== 'master') return;
    showLoading('corpo-tabela-admin-users');
    currentPageAdminUsers = page; currentSortAdminUsers = sortConfig; currentFiltersAdminUsers = filters;

    const adminUsersTableHeaders = document.querySelectorAll('#tabela-admin-users th[data-sortkey]');
    if (adminUsersTableHeaders) {
        adminUsersTableHeaders.forEach(th => {
            const arrow = th.querySelector('.sort-arrow'); if (arrow) arrow.textContent = ''; 
            th.classList.remove('sort-asc', 'sort-desc');
        });
        const activeTh = document.querySelector(`#tabela-admin-users th[data-sortkey="${currentSortAdminUsers.key}"]`);
        if (activeTh) { const arrowSpan = activeTh.querySelector('.sort-arrow'); if (arrowSpan) arrowSpan.textContent = currentSortAdminUsers.direction === 'asc' ? ' ▲' : ' ▼';
            activeTh.classList.add(currentSortAdminUsers.direction === 'asc' ? 'sort-asc' : 'sort-desc');
        }
    }

    try {
        const response = await fetch(API_URL_ADMIN_USERS, {credentials: 'include'});
        hideLoading();
        if (!response.ok) throw new Error('Erro ao buscar usuários.');
        todosUsuariosCache = await response.json();
        
        let itemsToRender = aplicarFiltros(todosUsuariosCache, currentFiltersAdminUsers, 'user_admin'); 
        itemsToRender = aplicarOrdenacao(itemsToRender, currentSortAdminUsers.key ? `${currentSortAdminUsers.key}_${currentSortAdminUsers.direction}` : currentSortAdminUsers);
        
        renderizarTabelaAdminUsers(itemsToRender, currentPageAdminUsers);
    } catch(e) {
        hideLoading(); console.error("Erro ao carregar usuários admin:", e);
        setListMessage(corpoTabelaAdminUsers, `<tr><td colspan="5">Erro ao carregar usuários: ${e.message}</td></tr>`);
        showToast(`Erro ao carregar usuários: ${e.message}`, 'error');
    }
}

function renderizarTabelaAdminUsers(users, page = 1) {
    if (!corpoTabelaAdminUsers) return;
    corpoTabelaAdminUsers.innerHTML = '';
    const start = (page - 1) * ITEMS_PER_PAGE_TABLE;
    const end = start + ITEMS_PER_PAGE_TABLE;
    const paginatedItems = users.slice(start, end);

    if (paginatedItems.length === 0) {
        setListMessage(corpoTabelaAdminUsers, `<tr><td colspan="5">Nenhum usuário encontrado.</td></tr>`);
    } else {
        paginatedItems.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td data-label="ID">${user.id}</td>
                <td data-label="Username">${user.username}</td>
                <td data-label="Email">${user.email}</td>
                <td data-label="Papel">${user.role}</td>
                <td class="actions-user">
                    ${user.id !== currentUser.id && user.username !== 'aslima' ?  // Protege "aslima" também
                    `<button class="btn btn-sm btn-warning btn-edit-user-role" data-id="${user.id}" data-username="${user.username}" data-role="${user.role}" title="Editar Papel">Editar Papel</button>
                     <button class="btn btn-sm btn-danger btn-delete-user" data-id="${user.id}" data-username="${user.username}" title="Deletar Usuário">Deletar</button>`
                    : (user.id === currentUser.id ? 'N/A (Você Mesmo)' : 'N/A (Admin Principal)')}
                </td>
            `;
            corpoTabelaAdminUsers.appendChild(tr);
        });
    }
    
    const paginationContainerForAdmin = document.getElementById('pagination-admin-users'); 
    if (paginationContainerForAdmin) { 
         setupPagination(users.length, ITEMS_PER_PAGE_TABLE, page, 'pagination-admin-users', 
            (newPage) => carregarErenderizarAdminUsers(newPage, currentSortAdminUsers, currentFiltersAdminUsers)
        ); 
    } else if (users.length > ITEMS_PER_PAGE_TABLE) { 
        console.warn("Container de paginação 'pagination-admin-users' não encontrado no HTML para a tabela de admin.");
    }
}

if (corpoTabelaAdminUsers) {
    corpoTabelaAdminUsers.addEventListener('click', async (event) => {
        const targetButton = event.target.closest('button');
        if (!targetButton) return;
        const userId = targetButton.dataset.id;
        const username = targetButton.dataset.username;

        if (targetButton.classList.contains('btn-edit-user-role')) {
            adminEditUserId = userId; 
            if (editUserIdInput) editUserIdInput.value = userId;
            if (editUserUsernameDisplay) editUserUsernameDisplay.textContent = username;
            if (editUserRoleSelect) editUserRoleSelect.value = targetButton.dataset.role;
            if (modalEditUserRoleErrorMessage) modalEditUserRoleErrorMessage.style.display = 'none';
            if (modalEditUserRole) modalEditUserRole.style.display = 'block';
        } else if (targetButton.classList.contains('btn-delete-user')) {
            if (confirm(`Tem certeza que deseja deletar o usuário ${username} (ID: ${userId})? Todos os seus dados associados (chamados, fornecedores) serão perdidos.`)) {
                showLoading();
                try {
                    const response = await fetch(`${API_URL_ADMIN_USERS}/${userId}`, { method: 'DELETE', credentials: 'include' });
                    hideLoading();
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.message || `Erro ao deletar usuário: ${response.status}`);
                    showToast(data.message, 'success');
                    carregarErenderizarAdminUsers(currentPageAdminUsers, currentSortAdminUsers, currentFiltersAdminUsers); 
                } catch (error) {
                    hideLoading(); console.error("Erro ao deletar usuário:", error);
                    showToast(`Falha ao deletar usuário: ${error.message}`, 'error');
                }
            }
        }
    });
}

async function handleEditUserRoleSubmit(event) {
    event.preventDefault();
    if (!adminEditUserId || !editUserRoleSelect || !editUserRoleErrorMessage) {
         showToast("Erro: Não foi possível identificar o usuário para edição de papel.", "error");
        return;
    }
    const newRole = editUserRoleSelect.value;
    if (!newRole) { showToast("Papel inválido.", "error"); return; }

    showLoading();
    try {
        const response = await fetch(`${API_URL_ADMIN_USERS}/${adminEditUserId}/role`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: newRole }), credentials: 'include'
        });
        hideLoading();
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || `Erro ao alterar papel: ${response.status}`);
        showToast(data.message, 'success');
        if(modalEditUserRole) modalEditUserRole.style.display = 'none';
        adminEditUserId = null; 
        carregarErenderizarAdminUsers(currentPageAdminUsers, currentSortAdminUsers, currentFiltersAdminUsers);
    } catch (error) {
        hideLoading(); console.error("Erro ao alterar papel:", error);
        if(editUserRoleErrorMessage) {editUserRoleErrorMessage.textContent = `Erro: ${error.message}`; editUserRoleErrorMessage.style.display = 'block';}
        showToast(`Falha ao alterar papel: ${error.message}`, 'error');
    }
}