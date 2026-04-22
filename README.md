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

## Variaveis de ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

Variaveis esperadas:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_ADMIN_ALLOWED_EMAILS`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Comportamento sem variaveis do Supabase

Se `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nao estiverem definidas:

- o input de upload de imagem fica desabilitado;
- o botao de publicar novo conteudo fica desabilitado;
- a interface exibe aviso de configuracao pendente do Supabase.

Isso evita criacao de publicacao nova sem imagem quando o Storage nao esta configurado.

## Build e deploy

```bash
npm run build
```

```bash
npm run deploy
```
