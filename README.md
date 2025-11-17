# StudyTimer Minimal (Expo + TypeScript)

Projeto mínimo com Expo + React Navigation + um componente temporizador de estudo (Temporizador).

## Como rodar

1. Tenha Node.js e npm instalados.
2. Instale o Expo CLI (opcional): `npm install -g expo-cli` (ou use `npx expo`).
3. No diretório do projeto, instale dependências:
   ```bash
   npm install
   ```
4. Rode o projeto:
   ```bash
   npm start
   ```
   Use Expo Go no celular (escaneie o QR) ou rode em emulador.

## Estrutura
- `App.tsx` – ponto de entrada, NavigationContainer
- `src/navigation/AppNavigator.tsx` – Stack navigator (Login / Register / Home)
- `src/screens/*` – telas básicas
- `src/components/Temporizador.tsx` – componente do temporizador (requisitos do seu pedido)

