# Arara Site

Site institucional do time AraraBots, com frontend em React + Vite.

## Stack e fluxo de dados

O projeto funciona com fluxo hibrido:

- Firebase: autenticacao e dados das publicacoes (Firestore).
- Supabase: upload e URL publica das imagens das publicacoes (Storage).

Resumo do fluxo na tela administrativa:

1. A imagem e enviada para o bucket no Supabase.
2. A URL publica retornada e salva no documento da publicacao no Firestore.
3. O restante dos dados continua no Firebase normalmente.

## Como rodar localmente

```bash
git clone https://github.com/DanielZubcov/AraraBotSite.git
cd AraraBotSite
npm install
npm run dev
```

## Build e deploy

```bash
npm run build
```

```bash
npm run deploy
```
