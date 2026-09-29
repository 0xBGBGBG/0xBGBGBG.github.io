# hacktheborges.github.io

Portfólio de segurança ofensiva de **Artur Borges** — currículo, certificações,
laboratórios e writeups.

**No ar em:** https://hacktheborges.github.io

---

## Como funciona

Página única com coluna de navegação à esquerda e painel de conteúdo à direita.
Cada item da coluna é uma rota por hash (`#oscp`, `#pg-practice`, `#htb-academy`),
então qualquer seção pode ser compartilhada por link direto.

Site estático puro — sem Jekyll, sem build, sem dependência além da fonte.
O `.nojekyll` desliga o processamento do GitHub Pages, então o que está no
repositório é exatamente o que é servido.

| Caminho | O que é |
|---|---|
| `index.html` | Todo o conteúdo, uma seção `.view` por item da navegação |
| `assets/css/cv.css` | Tokens de cor no `:root`, tema claro e escuro, layout de duas colunas |
| `assets/js/cv.js` | Roteamento por hash, troca de idioma, contador do exame, gaveta no mobile |
| `writeups/TEMPLATE.md` | Modelo de writeup no formato de relatório de pentest |
| `.well-known/security.txt` | Canal de contato para relato de vulnerabilidade (RFC 9116) |

Bilíngue PT/EN: o português fica no conteúdo do elemento, o inglês no atributo
`data-en`. O botão no rodapé da coluna troca os dois.

---

## Manutenção

**Data do exame:** `EXAM_DATE`, no topo de `assets/js/cv.js`.

**Nova seção:** um `<a href="#slug">` na coluna e uma
`<section class="view" id="v-slug" hidden>` no `<main>`.

**Novo writeup:** copie `writeups/TEMPLATE.md` e ligue a partir da seção da plataforma
correspondente (Proving Grounds Play, Practice ou HTB Máquinas).

Todo push na branch `main` republica o site.

---

## Política de publicação

Writeups são publicados **apenas de máquinas e laboratórios aposentados**,
conforme as regras de divulgação da Hack The Box, da OffSec e da TryHackMe.
Nada aqui descreve sistemas, achados ou dados de qualquer empregador, cliente ou
ambiente de produção.

Todo o conteúdo é destinado exclusivamente a fins educacionais e a ambientes
autorizados.
