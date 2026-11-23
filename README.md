# Biblioteca Escolar — Protótipo Web (exemplo)

Protótipo de exemplo para a atividade "Protótipo Web e Testes Manuais": login, listagem e cadastro de livros, com dados no `localStorage` (sem back-end).

**Usuário de teste:** `admin@teste.com` / senha `123456`

## Estrutura
```
prototipo/
  index.html      (login)
  lista.html      (listagem)
  cadastro.html   (formulário)
  css/style.css
  js/app.js
testes/
  teste-try-playwright.js   (teste automatizado para o try.playwright.tech)
```

## Publicar no GitHub Pages
1. Crie um repositório **público** e envie todos os arquivos (mantendo as pastas).
2. Em **Settings → Pages**, em *Source* escolha **Deploy from a branch**, branch `main`, pasta `/ (root)` e clique em **Save**.
3. Aguarde de 1 a 2 minutos. O site ficará em:
   `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/prototipo/`

## Rodar o teste no Try Playwright
1. Abra https://try.playwright.tech e selecione **JavaScript**.
2. Cole o conteúdo de `testes/teste-try-playwright.js`.
3. Troque a constante `URL_BASE` pela URL do seu GitHub Pages (terminando em `/prototipo/`).
4. Clique em **Run**. O console mostra PASSOU/FALHOU para cada caso, e um print da lista aparece ao final.
