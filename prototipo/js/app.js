// ===== Dados (sem back-end: tudo fica no navegador) =====
const USUARIO_TESTE = { email: 'admin@teste.com', senha: '123456' };

function lerLivros() {
  return JSON.parse(localStorage.getItem('livros') || '[]');
}

function salvarLivros(livros) {
  localStorage.setItem('livros', JSON.stringify(livros));
}

function mostrarMensagem(texto, tipo) {
  const msg = document.getElementById('mensagem');
  msg.textContent = texto;
  msg.className = 'mensagem ' + tipo; // "erro" ou "sucesso"
}

// ===== Página de login (index.html) =====
const formLogin = document.getElementById('form-login');
if (formLogin) {
  formLogin.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    if (email === '' || senha === '') {
      mostrarMensagem('Preencha e-mail e senha.', 'erro');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      mostrarMensagem('Informe um e-mail válido.', 'erro');
      return;
    }
    if (senha.length < 6) {
      mostrarMensagem('A senha deve ter no mínimo 6 caracteres.', 'erro');
      return;
    }
    if (email !== USUARIO_TESTE.email || senha !== USUARIO_TESTE.senha) {
      mostrarMensagem('E-mail ou senha incorretos.', 'erro');
      return;
    }

    mostrarMensagem('Login realizado com sucesso!', 'sucesso');
    sessionStorage.setItem('logado', email);
    setTimeout(function () { window.location.href = 'lista.html'; }, 800);
  });
}

// ===== Página de listagem (lista.html) =====
const tabela = document.getElementById('tabela-livros');
if (tabela) {
  if (!sessionStorage.getItem('logado')) {
    window.location.href = 'index.html'; // protege a página
  }

  const livros = lerLivros();
  document.getElementById('lista-vazia').style.display = livros.length ? 'none' : 'block';
  livros.forEach(function (livro) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td></td><td></td><td></td>';
    tr.children[0].textContent = livro.titulo;
    tr.children[1].textContent = livro.autor;
    tr.children[2].textContent = livro.ano;
    tabela.appendChild(tr);
  });

  document.getElementById('btn-sair').addEventListener('click', function () {
    sessionStorage.removeItem('logado');
    window.location.href = 'index.html';
  });
}

// ===== Página de cadastro (cadastro.html) =====
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
  if (!sessionStorage.getItem('logado')) {
    window.location.href = 'index.html';
  }

  formCadastro.addEventListener('submit', function (e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const ano = document.getElementById('ano').value;
    const anoAtual = new Date().getFullYear();

    if (titulo === '' || autor === '' || ano === '') {
      mostrarMensagem('Preencha todos os campos.', 'erro');
      return;
    }
    if (Number(ano) < 1000 || Number(ano) > anoAtual) {
      mostrarMensagem('Ano inválido.', 'erro');
      return;
    }

    const livros = lerLivros();
    livros.push({ titulo: titulo, autor: autor, ano: ano });
    salvarLivros(livros);

    mostrarMensagem('Livro cadastrado com sucesso!', 'sucesso');
    formCadastro.reset();
  });
}
