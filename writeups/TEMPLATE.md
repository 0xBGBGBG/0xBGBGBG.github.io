---
title: "Nome da Máquina"
parent: Writeups
nav_order: 1
nav_exclude: true
permalink: /writeups/nome-da-maquina/
---

# Nome da Máquina

| | |
|---|---|
| **Plataforma** | Hack The Box / Proving Grounds / TryHackMe |
| **Sistema** | Linux / Windows |
| **Dificuldade** | Easy / Medium / Hard |
| **Data** | AAAA-MM-DD |
| **Status** | Aposentada (só publique writeup de máquina aposentada) |

**Resumo em uma frase:** de onde você entrou e até onde chegou.

---

## 1. Enumeração

Comando, saída relevante (recortada, não cole 400 linhas de nmap), e a conclusão
que você tirou dela. O que importa aqui não é o comando: é por que você olhou
para aquela porta e não para as outras.

```console
$ nmap -sVC -p- -oA scans/alvo 10.10.10.10
```

**Superfície encontrada:**

- porta / serviço / versão — o que isso sugere

---

## 2. Acesso inicial

### Vetor

Qual vulnerabilidade, com nome e referência (CVE, CWE ou técnica ATT&CK).

| | |
|---|---|
| **Vetor** | ex.: upload irrestrito de arquivo |
| **CWE** | CWE-434 |
| **ATT&CK** | T1190 — Exploit Public-Facing Application |
| **CVSS v3.1** | 9.8 (CRÍTICO) — `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` |

### Exploração

Passo a passo reproduzível. Se você adaptou um exploit público, diga o que mudou
e por quê — essa é a parte que mostra que você entendeu, e é exatamente o que um
avaliador de OSCP procura.

### Prova

```console
www-data@alvo:/$ id
uid=33(www-data) gid=33(www-data)
```

---

## 3. Escalação de privilégios

Mesma estrutura: o que você enumerou, o que chamou atenção, por que funcionou.

### Prova

```console
root@alvo:~# cat /root/proof.txt
```

---

## 4. Remediação

O que o defensor deveria fazer, em ordem de prioridade. Esta seção é curta e
quase todo mundo pula — por isso ela te diferencia. Pentest sem recomendação é
só invasão documentada.

1. **Correção imediata:** …
2. **Correção estrutural:** …
3. **Detecção:** que log ou regra pegaria esse ataque

---

## 5. O que eu aprendi

Duas ou três linhas honestas, incluindo onde você travou e o que destravou.
Um recrutador de red team lê esta seção com mais atenção que as outras.

---

## Referências

- link
