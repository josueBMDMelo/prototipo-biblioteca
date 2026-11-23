// Cole este script em https://try.playwright.tech (linguagem: JavaScript)
// Troque a URL abaixo pela do seu GitHub Pages.
const URL_BASE = 'https://SEU-USUARIO.github.io/SEU-REPOSITORIO/prototipo/';

const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  let falhas = 0;

  async function verificar(id, descricao, esperado, seletor) {
    await page.waitForFunction(
      (s) => document.querySelector(s) && document.querySelector(s).textContent.trim() !== '',
      seletor, { timeout: 3000 }
    ).catch(() => {});
    const obtido = (await page.textContent(seletor) || '').trim();
    const passou = obtido.includes(esperado);
    if (!passou) falhas++;
    console.log(`${passou ? 'PASSOU' : 'FALHOU'} | ${id} - ${descricao} | esperado: "${esperado}" | obtido: "${obtido}"`);
  }

  async function tentarLogin(email, senha) {
    await page.goto(URL_BASE + 'index.html');
    await page.fill('#email', email);
    await page.fill('#senha', senha);
    await page.click('#btn-entrar');
  }

  // CT01 - campos vazios
  await tentarLogin('', '');
  await verificar('CT01', 'Login com campos vazios', 'Preencha e-mail e senha', '#mensagem');

  // CT02 - e-mail inválido
  await tentarLogin('admin', '123456');
  await verificar('CT02', 'Login com e-mail inválido', 'e-mail válido', '#mensagem');

  // CT03 - senha curta
  await tentarLogin('admin@teste.com', '123');
  await verificar('CT03', 'Login com senha curta', 'mínimo 6 caracteres', '#mensagem');

  // CT04 - senha errada
  await tentarLogin('admin@teste.com', '999999');
  await verificar('CT04', 'Login com senha incorreta', 'incorretos', '#mensagem');

  // CT05 - login válido redireciona para a lista
  await tentarLogin('admin@teste.com', '123456');
  await verificar('CT05', 'Login válido mostra sucesso', 'sucesso', '#mensagem');
  await page.waitForURL('**/lista.html', { timeout: 5000 }).catch(() => {});
  const naLista = page.url().endsWith('lista.html');
  if (!naLista) falhas++;
  console.log(`${naLista ? 'PASSOU' : 'FALHOU'} | CT06 - Após login vai para lista.html | URL: ${page.url()}`);

  // CT07 - cadastro com campos vazios
  await page.click('#link-cadastro');
  await page.click('#btn-salvar');
  await verificar('CT07', 'Cadastro com campos vazios', 'Preencha todos os campos', '#mensagem');

  // CT08 - cadastro válido aparece na lista
  await page.fill('#titulo', 'Dom Casmurro');
  await page.fill('#autor', 'Machado de Assis');
  await page.fill('#ano', '1899');
  await page.click('#btn-salvar');
  await verificar('CT08', 'Cadastro válido', 'cadastrado com sucesso', '#mensagem');
  await page.click('#link-voltar');
  await verificar('CT09', 'Livro aparece na listagem', 'Dom Casmurro', '#tabela-livros');

  await page.screenshot({ path: 'lista-final.png' });
  console.log(falhas === 0 ? '\nTODOS OS TESTES PASSARAM' : `\n${falhas} TESTE(S) FALHARAM`);
  await browser.close();
})();
