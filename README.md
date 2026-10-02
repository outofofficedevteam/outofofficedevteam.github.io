# Site da Out Of Office Dev Team

Site estático, sem scripts, sem cookies e sem pedidos a serviços de terceiros.

## Publicar no GitHub Pages
1. Cria uma organização gratuita no GitHub chamada `outofficedevteam` (ou o nome que preferires).
2. Cria nela um repositório **público** chamado `outofficedevteam.github.io`.
3. Carrega todos os ficheiros desta pasta para a raiz do repositório (inclui `.nojekyll`).
4. Em Settings > Pages, escolhe «Deploy from a branch», ramo `main`, pasta `/ (root)`.
5. Passados 1 a 2 minutos o site fica no endereço que o GitHub indicar em Settings > Pages. Os caminhos do site são relativos, por isso funciona tanto no endereço curto (`https://outofficedevteam.github.io/`) como no longo (com o nome do repositório no fim).

## Antes de publicar a política de privacidade
- Preenche os campos assinalados a amarelo em `privacidade.html` e `en/privacy.html` (data, fornecedores, prazos, transferências).
- Faz rever o texto por quem perceba de proteção de dados.
- Confirma que o que está escrito corresponde ao que o jogo faz.

## Capturas de ecrã
Coloca as imagens em `assets/img/` e, em `index.html` e `en/index.html`, troca cada `<div class="shot">…</div>` por
`<div class="shot"><img src="assets/img/nome.jpg" alt="Descrição da captura" /></div>` (nas páginas dentro de `en/`, `../assets/img/nome.jpg`).

## app-ads.txt
Preenche-o quando a conta AdMob existir. O endereço do site tem de ser o mesmo que indicares como site do programador nas lojas.

## Endereço
O endereço `outofficedevteam.github.io` serve para começar. Mais tarde um domínio próprio dá um ar mais profissional.
