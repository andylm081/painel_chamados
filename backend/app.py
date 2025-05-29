# --- BLOCO 1: Importações Essenciais ---
# Estas são as bibliotecas que seu projeto precisa.
# Se o VS Code/Pylance mostrar erro aqui, é porque o ambiente virtual
# não está ativo OU as bibliotecas não foram instaladas nele.
import os
from datetime import datetime, date
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from email_validator import validate_email, EmailNotValidError # Para validação de e-mail
from dotenv import load_dotenv # Para carregar variáveis de ambiente de um arquivo .env

# --- BLOCO 2: Carregar Variáveis de Ambiente ---
# Esta linha TENTA carregar variáveis de um arquivo chamado .env na mesma pasta (backend/)
# É útil para desenvolvimento local (incluindo Codespaces)
load_dotenv() 

# --- BLOCO 3: Configuração Base do Aplicativo Flask ---
base_dir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)

# --- BLOCO 4: Configuração CORS (Cross-Origin Resource Sharing) ---
# Permite que seu frontend (rodando em uma porta diferente) acesse sua API backend.
# Adicione a URL da sua Vercel à lista 'origins' quando ela estiver no ar.
CORS(app, 
     supports_credentials=True, # Essencial para Flask-Login/sessões funcionarem com CORS
     origins=[
         "http://127.0.0.1:5500",    # Porta comum do Live Server VS Code
         "http://localhost:5500",
         "http://127.0.0.1:5501",    # Outra porta comum do Live Server
         "http://localhost:5501",
         "http://127.0.0.1:5173",    # Porta padrão do Vite (se usar Vue/React com Vite no futuro)
         "http://localhost:5173",
         "https://painel-chamados.vercel.app/", # Sua URL Vercel informada
         # Se o Codespaces encaminhar sua porta do Live Server para uma URL pública, adicione-a aqui também.
         # Ex: "https://SEU-CODESPACE-NAME-5500.preview.app.github.dev"
     ]
)

# --- BLOCO 5: Configuração de Chaves Secretas e Banco de Dados ---
# Chave Secreta: Usada pelo Flask para segurança de sessões.
# Em produção (Vercel), esta variável DEVE ser configurada no painel da Vercel.
# O valor que você me passou: "46bab50c28fbb3cc127a08e4855f75d9d754646731267166"
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY', '46bab50c28fbb3cc127a08e4855f75d9d754646731267166')

# Configuração do Banco de Dados:
# Prioriza a DATABASE_URL_PROD (para Neon/produção, lida do .env localmente ou das variáveis da Vercel).
# Se não encontrar, usa um banco SQLite local como fallback (para desenvolvimento inicial fácil).
DATABASE_URL_FROM_ENV = os.environ.get('DATABASE_URL_PROD')
SQLITE_FALLBACK_URI = 'sqlite:///' + os.path.join(base_dir, 'gestao_chamados_local_fallback.db')

if DATABASE_URL_FROM_ENV:
    db_uri_to_use = DATABASE_URL_FROM_ENV
    # SQLAlchemy espera 'postgresql://', alguns provedores (não o Neon geralmente) dão 'postgres://'
    if db_uri_to_use.startswith("postgres://"):
        db_uri_to_use = db_uri_to_use.replace("postgres://", "postgresql://", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri_to_use
    print(f"--- CONECTANDO AO BANCO DE DADOS EXTERNO (NEON/PRODUÇÃO) ---")
    if '@' in db_uri_to_use: # Para não logar usuário e senha da URI
        print(f"    Host: {db_uri_to_use.split('@')[-1].split('/')[0]}") 
    else:
        print(f"    URI: {db_uri_to_use}") # Caso seja uma URI sem user/pass (ex: SQLite via env var)
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLITE_FALLBACK_URI
    print(f"--- USANDO BANCO DE DADOS SQLite LOCAL: {SQLITE_FALLBACK_URI} ---")

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Desativa warnings desnecessários

# --- BLOCO 6: Inicialização de Extensões Flask ---
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = "strong" # Proteção de sessão mais forte


# --- BLOCO 7: Modelos do Banco de Dados ---
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), default='user', nullable=False) # 'user' ou 'master'
    
    fornecedores = db.relationship('Fornecedor', backref='owner', lazy='dynamic', cascade="all, delete-orphan")
    chamados_pagamento = db.relationship('ChamadoPagamento', backref='owner', lazy='dynamic', cascade="all, delete-orphan")
    chamados_diversos = db.relationship('ChamadoDiverso', backref='owner', lazy='dynamic', cascade="all, delete-orphan")

    def set_password(self, password): self.password_hash = generate_password_hash(password)
    def check_password(self, password): return check_password_hash(self.password_hash, password)
    def to_dict(self): return {"id": self.id, "username": self.username, "email": self.email, "role": self.role}

class Fornecedor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    numero_identificacao_fornecedor = db.Column(db.String(50), nullable=True)
    nome_fornecedor = db.Column(db.String(150), nullable=False)
    db.UniqueConstraint('user_id', 'nome_fornecedor', name='uq_user_nome_fornecedor')

    chamados_pagamento = db.relationship('ChamadoPagamento', backref='fornecedor_obj', lazy='dynamic')
    chamados_diversos = db.relationship('ChamadoDiverso', backref='fornecedor_obj', lazy='dynamic')
    
    def to_dict(self): 
        data = {"id": self.id, "user_id": self.user_id, "numero_identificacao_fornecedor": self.numero_identificacao_fornecedor, "nome_fornecedor": self.nome_fornecedor}
        # Adiciona o nome do proprietário se o objeto 'owner' (User) existir na instância
        if hasattr(self, 'owner') and self.owner: 
            data['owner_username'] = self.owner.username
        return data

class ChamadoPagamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    numero_chamado_origem = db.Column(db.String(50), nullable=False)
    numero_fatura = db.Column(db.String(50), nullable=True) # Pode ser nulo/vazio
    lancamento = db.Column(db.String(100), nullable=True)
    fornecedor_id = db.Column(db.Integer, db.ForeignKey('fornecedor.id'), nullable=False)
    valor = db.Column(db.Float, nullable=False)
    data_escrituracao = db.Column(db.Date, nullable=True)
    prazo_maximo_escrituracao = db.Column(db.Date, nullable=True)
    data_vencimento = db.Column(db.Date, nullable=False)
    situacao = db.Column(db.String(50), nullable=False)
    observacoes_gerais = db.Column(db.Text, nullable=True)
    data_criacao_registro = db.Column(db.DateTime, default=datetime.utcnow)
    data_ultima_atualizacao_chamado = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    acompanhamentos = db.relationship('AcompanhamentoChamadoPagamento', backref='chamado_pagamento_obj', lazy='dynamic', cascade="all, delete-orphan")

    def to_dict(self, include_acompanhamentos=False, include_fornecedor=False):
        data = {
            "id": self.id,"user_id":self.user_id,"numero_chamado_origem": self.numero_chamado_origem,
            "numero_fatura": self.numero_fatura,"lancamento": self.lancamento,
            "fornecedor_id": self.fornecedor_id,"valor": self.valor,
            "data_escrituracao": self.data_escrituracao.isoformat() if self.data_escrituracao else None,
            "prazo_maximo_escrituracao": self.prazo_maximo_escrituracao.isoformat() if self.prazo_maximo_escrituracao else None,
            "data_vencimento": self.data_vencimento.isoformat() if self.data_vencimento else None,
            "situacao": self.situacao,"observacoes_gerais": self.observacoes_gerais,
            "data_criacao_registro": self.data_criacao_registro.isoformat(),
            "data_ultima_atualizacao_chamado": self.data_ultima_atualizacao_chamado.isoformat()
        }
        if include_fornecedor and self.fornecedor_obj: 
            data['nome_fornecedor'] = self.fornecedor_obj.nome_fornecedor
            data['numero_identificacao_fornecedor'] = self.fornecedor_obj.numero_identificacao_fornecedor
        if include_acompanhamentos and self.acompanhamentos: 
            # Adicionado .all() pois acompanhamentos é lazy='dynamic'
            data['acompanhamentos'] = sorted([a.to_dict() for a in self.acompanhamentos.all()], key=lambda x: x['data_entrada'], reverse=True)
        if hasattr(self, 'owner') and self.owner: 
            data['owner_username'] = self.owner.username
        return data

class AcompanhamentoChamadoPagamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chamado_pagamento_id = db.Column(db.Integer, db.ForeignKey('chamado_pagamento.id'), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    usuario = db.Column(db.String(100), nullable=True, default="Usuário")
    data_entrada = db.Column(db.DateTime, default=datetime.utcnow)
    def to_dict(self): return {"id": self.id, "chamado_pagamento_id": self.chamado_pagamento_id, "descricao": self.descricao, "usuario": self.usuario, "data_entrada": self.data_entrada.isoformat()}

class ChamadoDiverso(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    numero_chamado_origem = db.Column(db.String(50), nullable=False)
    fornecedor_id = db.Column(db.Integer, db.ForeignKey('fornecedor.id'), nullable=True)
    valor = db.Column(db.Float, nullable=True)
    data_escrituracao = db.Column(db.Date, nullable=False)
    situacao = db.Column(db.String(50), nullable=False)
    observacoes = db.Column(db.Text, nullable=True)
    data_criacao_registro = db.Column(db.DateTime, default=datetime.utcnow)
    data_ultima_atualizacao_chamado = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    acompanhamentos = db.relationship('AcompanhamentoChamadoDiverso', backref='chamado_diverso_obj', lazy='dynamic', cascade="all, delete-orphan")
    def to_dict(self, include_acompanhamentos=False, include_fornecedor=False):
        data = {"id": self.id,"user_id":self.user_id,"numero_chamado_origem": self.numero_chamado_origem,"fornecedor_id": self.fornecedor_id,"valor": self.valor,"data_escrituracao": self.data_escrituracao.isoformat() if self.data_escrituracao else None,"situacao": self.situacao,"observacoes": self.observacoes,"data_criacao_registro": self.data_criacao_registro.isoformat(),"data_ultima_atualizacao_chamado": self.data_ultima_atualizacao_chamado.isoformat()}
        if include_fornecedor and self.fornecedor_obj: 
            data['nome_fornecedor'] = self.fornecedor_obj.nome_fornecedor
            data['numero_identificacao_fornecedor'] = self.fornecedor_obj.numero_identificacao_fornecedor
        if include_acompanhamentos and self.acompanhamentos: 
            # Adicionado .all() pois acompanhamentos é lazy='dynamic'
            data['acompanhamentos'] = sorted([a.to_dict() for a in self.acompanhamentos.all()], key=lambda x: x['data_entrada'], reverse=True)
        if hasattr(self, 'owner') and self.owner: 
            data['owner_username'] = self.owner.username
        return data

class AcompanhamentoChamadoDiverso(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chamado_diverso_id = db.Column(db.Integer, db.ForeignKey('chamado_diverso.id'), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    usuario = db.Column(db.String(100), nullable=True, default="Usuário")
    data_entrada = db.Column(db.DateTime, default=datetime.utcnow)
    def to_dict(self): return {"id": self.id, "chamado_diverso_id": self.chamado_diverso_id, "descricao": self.descricao, "usuario": self.usuario, "data_entrada": self.data_entrada.isoformat()}

# --- BLOCO 8: Configuração do Flask-Login ---
@login_manager.user_loader
def load_user(user_id): 
    return User.query.get(int(user_id))

# --- BLOCO 9: Funções Auxiliares Python ---
def parse_date_or_none(date_str):
    if not date_str: return None
    try: return datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError: return None

def obter_ou_criar_fornecedor(data_fornecedor, user_id_atual):
    fornecedor_id = data_fornecedor.get('fornecedor_id')
    nome_fornecedor_input = data_fornecedor.get('nome_fornecedor_input', '').strip()
    num_id_fornecedor_input = data_fornecedor.get('numero_identificacao_fornecedor_input', '').strip() or None
    
    if fornecedor_id:
        forn = Fornecedor.query.filter_by(id=fornecedor_id, user_id=user_id_atual).first()
        if not forn: raise ValueError(f"Fornecedor ID {fornecedor_id} não encontrado ou não pertence a você.")
        return forn.id
    elif nome_fornecedor_input:
        forn = Fornecedor.query.filter(Fornecedor.nome_fornecedor.ilike(nome_fornecedor_input), Fornecedor.user_id == user_id_atual).first()
        if forn: return forn.id
        else:
            if num_id_fornecedor_input and Fornecedor.query.filter_by(numero_identificacao_fornecedor=num_id_fornecedor_input, user_id=user_id_atual).first():
                raise ValueError(f"N° ID de fornecedor '{num_id_fornecedor_input}' já existe para você.")
            # Re-checa nome (case-insensitive) para evitar erro de constraint antes de tentar criar
            if Fornecedor.query.filter(Fornecedor.nome_fornecedor.ilike(nome_fornecedor_input), Fornecedor.user_id == user_id_atual).first():
                 raise ValueError(f"Fornecedor com nome '{nome_fornecedor_input}' já existe para você. Selecione-o da lista.")
            
            novo_fornecedor = Fornecedor(nome_fornecedor=nome_fornecedor_input, numero_identificacao_fornecedor=num_id_fornecedor_input, user_id=user_id_atual)
            db.session.add(novo_fornecedor)
            db.session.commit()
            return novo_fornecedor.id
    return None # Se fornecedor for opcional e nenhum dado foi fornecido

# --- BLOCO 10: Rotas da Aplicação ---
@app.route('/')
def index_route(): 
    return jsonify({"message": "API de Acompanhamento de Chamados Online!"})

@app.route('/api/create_db', methods=['GET'])
def create_db_route():
    try:
        with app.app_context(): 
            db.create_all()
        return jsonify({"message": "Banco de dados e tabelas criados com sucesso!"}), 200
    except Exception as e: 
        return jsonify({"message": "Erro ao criar banco de dados", "error": str(e)}), 500

# --- Rotas de Autenticação ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json(); username = data.get('username','').strip(); email = data.get('email','').strip(); password = data.get('password')
    if not username or not email or not password: return jsonify({"message": "Todos os campos são obrigatórios!"}), 400
    if len(password) < 6: return jsonify({"message": "Senha deve ter pelo menos 6 caracteres."}), 400
    try: validate_email(email)
    except EmailNotValidError as e: return jsonify({"message": str(e)}), 400
    if User.query.filter_by(username=username).first(): return jsonify({"message": "Nome de usuário já existe."}), 409
    if User.query.filter_by(email=email).first(): return jsonify({"message": "E-mail já registrado."}), 409
    new_user = User(username=username, email=email, role='user'); new_user.set_password(password)
    db.session.add(new_user); db.session.commit(); return jsonify({"message": "Usuário registrado com sucesso!"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json(); username = data.get('username'); password = data.get('password')
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password): 
        login_user(user, remember=True)
        return jsonify({"message": "Login bem-sucedido!", "user": user.to_dict()}), 200
    return jsonify({"message": "Nome de usuário ou senha inválidos."}), 401

@app.route('/api/logout', methods=['POST'])
@login_required # Este decorador deve estar em sua própria linha
def logout():
    logout_user()
    return jsonify({"message": "Logout bem-sucedido."}), 200

@app.route('/api/check_auth_status', methods=['GET'])
def check_auth_status():
    if current_user.is_authenticated: 
        return jsonify({"logged_in": True, "user": current_user.to_dict()}), 200
    return jsonify({"logged_in": False}), 401

# --- Rotas CRUD para Fornecedores ---
@app.route('/api/fornecedores', methods=['GET', 'POST'])
@login_required
def handle_fornecedores():
    if request.method == 'POST':
        data = request.get_json(); nome_f = data.get('nome_fornecedor','').strip(); num_id_f = data.get('numero_identificacao_fornecedor','').strip() or None
        if not nome_f: return jsonify({"message": "Nome do fornecedor obrigatório"}), 400
        if Fornecedor.query.filter(Fornecedor.nome_fornecedor.ilike(nome_f), Fornecedor.user_id==current_user.id).first(): return jsonify({"message": f"Fornecedor '{nome_f}' já existe para você."}), 409
        if num_id_f and Fornecedor.query.filter_by(numero_identificacao_fornecedor=num_id_f, user_id=current_user.id).first(): return jsonify({"message": f"N° ID '{num_id_f}' já existe para você."}), 409
        novo = Fornecedor(nome_fornecedor=nome_f, numero_identificacao_fornecedor=num_id_f, user_id=current_user.id)
        db.session.add(novo); db.session.commit(); return jsonify(novo.to_dict()), 201
    
    query = Fornecedor.query if current_user.role == 'master' else Fornecedor.query.filter_by(user_id=current_user.id)
    fornecedores = query.order_by(Fornecedor.nome_fornecedor).all()
    return jsonify([f.to_dict() for f in fornecedores]), 200

@app.route('/api/fornecedores/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def handle_fornecedor_id(id):
    fornecedor = Fornecedor.query.get_or_404(id)
    if current_user.role != 'master' and fornecedor.user_id != current_user.id: return jsonify({"message": "Acesso não autorizado."}), 403
    
    if request.method == 'GET': return jsonify(fornecedor.to_dict())
    
    # Master só edita/deleta os seus próprios fornecedores (para esta versão)
    if fornecedor.user_id != current_user.id : return jsonify({"message": "Você só pode modificar/deletar seus próprios fornecedores."}), 403

    if request.method == 'PUT':
        data = request.get_json(); nome_f = data.get('nome_fornecedor','').strip(); num_id_f = data.get('numero_identificacao_fornecedor','').strip() or None
        if not nome_f: return jsonify({"message": "Nome do fornecedor obrigatório"}), 400
        if Fornecedor.query.filter(Fornecedor.nome_fornecedor.ilike(nome_f), Fornecedor.id != id, Fornecedor.user_id==current_user.id).first(): return jsonify({"message": f"Outro fornecedor seu com nome '{nome_f}' já existe."}), 409
        if num_id_f and Fornecedor.query.filter_by(numero_identificacao_fornecedor=num_id_f, user_id=current_user.id).filter(Fornecedor.id != id).first(): return jsonify({"message": f"Outro fornecedor seu com N° ID '{num_id_f}' já existe."}), 409
        fornecedor.nome_fornecedor=nome_f; fornecedor.numero_identificacao_fornecedor=num_id_f; db.session.commit(); return jsonify(fornecedor.to_dict()), 200
    
    if request.method == 'DELETE':
        if fornecedor.chamados_pagamento.first() or fornecedor.chamados_diversos.first(): return jsonify({"message": "Não é possível excluir. Este fornecedor possui chamados associados."}), 400
        db.session.delete(fornecedor); db.session.commit(); return jsonify({"message": "Fornecedor deletado com sucesso"}), 200

# --- Rotas Chamados de Pagamento ---
@app.route('/api/chamados_pagamento', methods=['GET', 'POST'])
@login_required
def handle_chamados_pagamento():
    if request.method == 'POST':
        data = request.get_json(); required = ['numero_chamado_origem', 'numero_fatura', 'valor', 'data_vencimento', 'situacao']
        for field in required: 
            if not data.get(field) or (isinstance(data[field],str) and not data[field].strip() and field != 'lancamento'): 
                if not (field == 'lancamento' and data.get(field) == ''): 
                    return jsonify({"message": f"Campo '{field}' obrigatório"}), 400
        try:
            forn_id = obter_ou_criar_fornecedor(data, current_user.id)
            if not forn_id: return jsonify({"message":"Fornecedor é obrigatório para Chamado de Pagamento."}), 400
        except ValueError as ve: return jsonify({"message": str(ve)}), 400
        except Exception as e: db.session.rollback(); return jsonify({"message":"Erro ao processar fornecedor","error":str(e)}),500
        
        novo_chamado = ChamadoPagamento(user_id=current_user.id, numero_chamado_origem=data['numero_chamado_origem'],numero_fatura=data.get('numero_fatura'),lancamento=data.get('lancamento'),fornecedor_id=forn_id,valor=float(data['valor']),data_escrituracao=parse_date_or_none(data.get('data_escrituracao')),prazo_maximo_escrituracao=parse_date_or_none(data.get('prazo_maximo_escrituracao')),data_vencimento=parse_date_or_none(data['data_vencimento']),situacao=data['situacao'],observacoes_gerais=data.get('observacoes_gerais')); 
        db.session.add(novo_chamado); db.session.commit(); return jsonify(novo_chamado.to_dict(include_fornecedor=True)),201
    
    query = ChamadoPagamento.query if current_user.role == 'master' else ChamadoPagamento.query.filter_by(user_id=current_user.id)
    chamados = query.order_by(ChamadoPagamento.data_vencimento.desc()).all()
    return jsonify([c.to_dict(include_fornecedor=True) for c in chamados]), 200

@app.route('/api/chamados_pagamento/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def handle_chamado_pagamento_id(id):
    chamado = ChamadoPagamento.query.get_or_404(id)
    if current_user.role != 'master' and chamado.user_id != current_user.id: return jsonify({"message": "Acesso não autorizado."}), 403
    if request.method == 'GET': return jsonify(chamado.to_dict(include_acompanhamentos=True, include_fornecedor=True))
    
    if chamado.user_id != current_user.id : return jsonify({"message": "Você só pode modificar/deletar seus próprios chamados."}), 403

    if request.method == 'PUT':
        data=request.get_json()
        if data.get('fornecedor_id'):
            forn = Fornecedor.query.filter_by(id=data['fornecedor_id'], user_id=current_user.id).first() 
            if not forn: return jsonify({"message":f"Fornecedor ID {data['fornecedor_id']} não encontrado ou não pertence a você."}), 404
            chamado.fornecedor_id = int(data['fornecedor_id'])
        
        chamado.numero_chamado_origem=data.get('numero_chamado_origem', chamado.numero_chamado_origem)
        chamado.numero_fatura=data.get('numero_fatura',chamado.numero_fatura)
        chamado.lancamento=data.get('lancamento',chamado.lancamento)
        chamado.valor=float(data.get('valor',chamado.valor))
        chamado.data_escrituracao=parse_date_or_none(data.get('data_escrituracao')) if data.get('data_escrituracao') is not None else chamado.data_escrituracao
        chamado.prazo_maximo_escrituracao=parse_date_or_none(data.get('prazo_maximo_escrituracao')) if data.get('prazo_maximo_escrituracao') is not None else chamado.prazo_maximo_escrituracao
        chamado.data_vencimento=parse_date_or_none(data.get('data_vencimento')) if data.get('data_vencimento') is not None else chamado.data_vencimento
        chamado.situacao=data.get('situacao',chamado.situacao)
        chamado.observacoes_gerais=data.get('observacoes_gerais',chamado.observacoes_gerais)
        db.session.commit(); return jsonify(chamado.to_dict(include_fornecedor=True))
    
    if request.method == 'DELETE': 
        db.session.delete(chamado); db.session.commit(); return jsonify({"message": "Chamado de pagamento deletado"}), 200

@app.route('/api/chamados_pagamento/<int:chamado_pag_id>/acompanhamentos', methods=['POST'])
@login_required
def add_acompanhamento_chamado_pagamento(chamado_pag_id):
    chamado = ChamadoPagamento.query.get_or_404(chamado_pag_id)
    # Permite que o dono do chamado ou um master adicione acompanhamento
    if chamado.user_id != current_user.id and current_user.role != 'master': 
        return jsonify({"message": "Acesso não autorizado para adicionar acompanhamento."}), 403
    data = request.get_json()
    if not data or not data.get('descricao') or not data.get('descricao').strip(): return jsonify({"message": "Descrição obrigatória"}), 400
    novo = AcompanhamentoChamadoPagamento(chamado_pagamento_id=chamado_pag_id, descricao=data['descricao'], usuario=data.get('usuario', current_user.username) or current_user.username)
    db.session.add(novo); db.session.commit(); return jsonify(novo.to_dict()), 201

# --- Rotas CRUD para Chamados Diversos ---
@app.route('/api/chamados_diversos', methods=['GET', 'POST'])
@login_required
def handle_chamados_diversos():
    if request.method == 'POST':
        data = request.get_json(); required = ['numero_chamado_origem', 'data_escrituracao', 'situacao']
        for f_required in required: 
            if not data.get(f_required) or (isinstance(data[f_required],str) and not data[f_required].strip()): return jsonify({"message": f"Campo '{f_required}' obrigatório"}), 400
        forn_id = None
        if data.get('nome_fornecedor_input', '').strip() or data.get('fornecedor_id'): # Se algum dado de fornecedor foi passado
            try: forn_id = obter_ou_criar_fornecedor(data, current_user.id)
            except ValueError as ve: return jsonify({"message": str(ve)}), 400
            except Exception as e: db.session.rollback(); return jsonify({"message":"Erro ao processar fornecedor","error":str(e)}),500
        
        valor_str = data.get('valor')
        valor_float = float(valor_str) if valor_str and valor_str.strip() != '' else None

        novo = ChamadoDiverso(user_id=current_user.id, numero_chamado_origem=data['numero_chamado_origem'],fornecedor_id=forn_id,valor=valor_float,data_escrituracao=parse_date_or_none(data['data_escrituracao']),situacao=data['situacao'],observacoes=data.get('observacoes')); 
        db.session.add(novo); db.session.commit(); return jsonify(novo.to_dict(include_fornecedor=True)),201
    
    query = ChamadoDiverso.query if current_user.role == 'master' else ChamadoDiverso.query.filter_by(user_id=current_user.id)
    chamados = query.order_by(ChamadoDiverso.data_escrituracao.desc()).all()
    return jsonify([c.to_dict(include_fornecedor=True) for c in chamados]), 200

@app.route('/api/chamados_diversos/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def handle_chamado_diverso_id(id):
    chamado = ChamadoDiverso.query.get_or_404(id)
    if current_user.role != 'master' and chamado.user_id != current_user.id: return jsonify({"message": "Acesso não autorizado."}), 403
    if request.method == 'GET': return jsonify(chamado.to_dict(include_acompanhamentos=True, include_fornecedor=True))
    
    if chamado.user_id != current_user.id : return jsonify({"message": "Você só pode modificar/deletar seus próprios chamados."}), 403

    if request.method == 'PUT':
        data=request.get_json()
        if 'fornecedor_id' in data : # Permite definir/alterar/remover fornecedor
             if data.get('fornecedor_id'): # Se um ID foi fornecido e não é string vazia
                forn = Fornecedor.query.filter_by(id=data['fornecedor_id'], user_id=current_user.id).first() 
                if not forn: return jsonify({"message":f"Fornecedor ID {data['fornecedor_id']} não encontrado ou não pertence a você."}), 404
                chamado.fornecedor_id = int(data['fornecedor_id'])
             else: # Enviou fornecedor_id explicitamente como null ou string vazia para desassociar
                chamado.fornecedor_id = None
        
        chamado.numero_chamado_origem=data.get('numero_chamado_origem',chamado.numero_chamado_origem)
        chamado.valor=float(data['valor']) if data.get('valor') is not None and data.get('valor') != '' else None
        chamado.data_escrituracao=parse_date_or_none(data.get('data_escrituracao')) if data.get('data_escrituracao') is not None else chamado.data_escrituracao
        chamado.situacao=data.get('situacao',chamado.situacao)
        chamado.observacoes=data.get('observacoes',chamado.observacoes)
        db.session.commit(); return jsonify(chamado.to_dict(include_fornecedor=True))
    
    if request.method == 'DELETE': 
        db.session.delete(chamado); db.session.commit(); return jsonify({"message": "Chamado diverso deletado"}), 200

@app.route('/api/chamados_diversos/<int:chamado_div_id>/acompanhamentos', methods=['POST'])
@login_required
def add_acompanhamento_chamado_diverso(chamado_div_id):
    chamado = ChamadoDiverso.query.get_or_404(chamado_div_id)
    if chamado.user_id != current_user.id and current_user.role != 'master': return jsonify({"message": "Acesso não autorizado."}), 403
    data = request.get_json()
    if not data or not data.get('descricao') or not data.get('descricao').strip(): return jsonify({"message": "Descrição obrigatória"}), 400
    novo = AcompanhamentoChamadoDiverso(chamado_diverso_id=chamado_div_id, descricao=data['descricao'], usuario=data.get('usuario', current_user.username) or current_user.username)
    db.session.add(novo); db.session.commit(); return jsonify(novo.to_dict()), 201

# --- ROTAS ADMINISTRATIVAS (MASTER ONLY) ---
@app.route('/api/admin/users', methods=['GET'])
@login_required
def admin_get_users():
    if current_user.role != 'master': return jsonify({"message": "Acesso não autorizado."}), 403
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@app.route('/api/admin/users/<int:user_id_to_change>/role', methods=['PUT'])
@login_required
def admin_change_user_role(user_id_to_change):
    if current_user.role != 'master': return jsonify({"message": "Acesso não autorizado."}), 403
    user_to_change = User.query.get_or_404(user_id_to_change)
    if user_to_change.id == current_user.id: return jsonify({"message": "Usuário mestre não pode alterar o próprio papel."}), 400
    data = request.get_json(); new_role = data.get('role')
    if new_role not in ['user', 'master']: return jsonify({"message": "Papel inválido. Use 'user' ou 'master'."}), 400
    user_to_change.role = new_role; db.session.commit()
    return jsonify({"message": f"Papel do usuário {user_to_change.username} alterado para {new_role}."}), 200

@app.route('/api/admin/users/<int:user_id_to_delete>', methods=['DELETE'])
@login_required
def admin_delete_user(user_id_to_delete):
    if current_user.role != 'master': return jsonify({"message": "Acesso não autorizado."}), 403
    if user_id_to_delete == current_user.id: return jsonify({"message": "Usuário mestre não pode se auto-deletar."}), 400
    user_to_delete = User.query.get_or_404(user_id_to_delete)
    # A exclusão em cascata definida nos modelos User cuidará dos dados associados.
    db.session.delete(user_to_delete); db.session.commit()
    return jsonify({"message": f"Usuário {user_to_delete.username} deletado com sucesso."}), 200

# --- Comando CLI para criar usuário master ---
@app.cli.command("create-master")
def create_master_user():
    """Cria um usuário master inicial."""
    username = input("Digite o nome de usuário para o master: ")
    email = input("Digite o email para o master: ")
    password = input("Digite a senha para o master: ")
    if User.query.filter((User.username == username) | (User.email == email)).first():
        print("Usuário ou email já existe.")
        return
    try: validate_email(email)
    except EmailNotValidError as e: print(f"Email inválido: {e}"); return
    master_user = User(username=username, email=email, role='master')
    master_user.set_password(password)
    db.session.add(master_user); db.session.commit()
    print(f"Usuário master '{username}' criado com sucesso!")

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # Cria tabelas se não existirem
    app.run(debug=True, port=5000)