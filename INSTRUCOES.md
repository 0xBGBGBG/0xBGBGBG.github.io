# Como publicar

Esta pasta já é o conteúdo final do repositório `0xBGBGBG.github.io`.
O front matter das páginas já está aplicado, o `_config.yml` já está corrigido e
o `index.md` e o `_navigation.yml` antigos não existem mais aqui.

---

## Publicar

Abra o terminal nesta pasta e rode:

```bash
git init -b main
git remote add origin https://github.com/0xBGBGBG/0xBGBGBG.github.io.git
git fetch origin
git add -A
git commit -m "Adiciona currículo, corrige configuração do Jekyll"
git push --force origin main
```

O `--force` é intencional: esta pasta substitui o conteúdo do repositório, e é o
que remove o `index.md` e o `_navigation.yml` que estavam lá. O histórico antigo
continua acessível pelos commits anteriores no GitHub.

Se preferir preservar o histórico linearmente, faça o caminho inverso — clone o
repositório, apague `index.md` e `_navigation.yml`, copie estes arquivos por
cima com `cp -r ./. /caminho/do/clone/` e faça um commit normal.

Depois, em **Settings → Pages**, deixe *Source* em `Deploy from a branch`,
branch `main`, pasta `/ (root)`.

---

## Conferir

1. `https://0xbgbgbg.github.io/` — o currículo, com o contador do OSCP
2. `https://0xbgbgbg.github.io/writeups/` — agora com o tema aplicado
3. `https://0xbgbgbg.github.io/notes/`, `/tools/`, `/about/`
4. `https://0xbgbgbg.github.io/.well-known/security.txt`
5. O site em tema claro e escuro do sistema

---

## O que ainda falta preencher

No `index.html`, procure por `class="fill"` — são 8 marcadores, e eles aparecem
sublinhados em vermelho no navegador:

- **Seção 01** — quantos dos 6 conjuntos de Active Directory você concluiu
- **Seção 04** — uma linha sobre algo que você automatizou ou construiu no cargo
  atual, e o bloco inteiro do cargo anterior de TI (função, empresa, período)

Quando terminar, apague o `<div class="draft">…</div>` do `index.html`.

---

## Manutenção

- **Data do exame e do rodapé:** `EXAM_DATE` e `UPDATED`, no topo de `assets/js/cv.js`
- **Novo writeup:** copie `writeups/TEMPLATE.md`, renomeie, ajuste o `permalink`,
  troque `nav_exclude: true` por um `nav_order` e escreva
- **Estilo:** `assets/css/cv.css`. Não use `style="..."` direto no HTML — a CSP
  da página bloqueia estilo inline. Crie uma classe.

Apague este arquivo depois de aplicar tudo. Ele está no `exclude` do
`_config.yml`, então não vai para o site, mas fica visível no repositório.
