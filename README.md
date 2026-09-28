# 0xBGBGBG.github.io

Portfólio de segurança ofensiva de **Artur Borges** — currículo, notas de estudo,
ferramentas e writeups de laboratório.

**No ar em:** https://0xbgbgbg.github.io

---

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | Currículo (página única, bilíngue PT/EN, sem dependências além da fonte) |
| `assets/css/cv.css` | Estilos do currículo — tokens de cor no `:root`, tema claro e escuro |
| `assets/js/cv.js` | Contador do exame, troca de idioma, botão de copiar |
| `writeups.md` | Índice de writeups (tema Just the Docs) |
| `writeups/` | Um arquivo por máquina, a partir de `TEMPLATE.md` |
| `notes.md` | Notas de estudo |
| `tools.md` | Ferramentas e scripts |
| `about.md` | Sobre |
| `.well-known/security.txt` | Canal de contato para relato de vulnerabilidade (RFC 9116) |

O site roda em Jekyll no GitHub Pages. A home usa front matter vazio para não
receber o layout do tema; as demais páginas usam o Just the Docs.

---

## Como atualizar

**Números do currículo** — edite `index.html`.
**Data do exame** — `EXAM_DATE`, no topo de `assets/js/cv.js`.
**Novo writeup** — copie `writeups/TEMPLATE.md`, renomeie, ajuste o `permalink`
do front matter e escreva.

Todo push na branch `main` republica o site sozinho.

---

## Política de publicação

Writeups são publicados **apenas de máquinas e laboratórios aposentados**,
conforme as regras de divulgação da Hack The Box, da OffSec e da TryHackMe.
Nada aqui descreve sistemas, achados ou dados de qualquer empregador, cliente ou
ambiente de produção.

Todo o conteúdo é destinado exclusivamente a fins educacionais e a ambientes
autorizados.
