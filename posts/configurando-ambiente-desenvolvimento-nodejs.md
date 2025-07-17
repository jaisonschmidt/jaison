---
title: "Configurando o ambiente de desenvolvimento Node.js"
date: "2024-01-25"
author: "Jaison Schmidt"
excerpt: "Guia completo para configurar um ambiente de desenvolvimento Node.js produtivo, incluindo ferramentas essenciais e melhores práticas."
---

# Configurando o ambiente de desenvolvimento Node.js

Um ambiente de desenvolvimento bem configurado é fundamental para a produtividade. Neste post, vou mostrar como configurar um ambiente Node.js completo e produtivo.

## Instalação do Node.js

### Usando NVM (recomendado)

O **Node Version Manager** permite gerenciar múltiplas versões do Node.js:

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Instalar a versão LTS mais recente
nvm install --lts
nvm use --lts
```

### Verificação da instalação

```bash
node --version
npm --version
```

## Ferramentas essenciais

### 1. Editor de código

Recomendo o **Visual Studio Code** com as seguintes extensões:

- **ES6/JavaScript/TypeScript**: Suporte avançado a JavaScript
- **Prettier**: Formatação automática de código
- **ESLint**: Análise estática de código
- **GitLens**: Integração avançada com Git

### 2. Terminal aprimorado

Para um terminal mais produtivo:

- **Oh My Zsh** (macOS/Linux) ou **PowerShell** (Windows)
- **Starship**: Prompt customizável
- **fzf**: Busca fuzzy em arquivos

### 3. Gerenciadores de pacotes

Além do npm padrão, considere:

```bash
# Yarn - mais rápido e confiável
npm install -g yarn

# pnpm - ainda mais eficiente
npm install -g pnpm
```

## Configuração do projeto

### package.json básico

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "eslint": "^8.50.0",
    "prettier": "^3.0.0",
    "jest": "^29.7.0"
  }
}
```

### Configuração do ESLint

```javascript
// .eslintrc.js
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
  },
};
```

### Configuração do Prettier

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## Debugging

### VS Code Launch Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Program",
      "program": "${workspaceFolder}/index.js",
      "request": "launch",
      "skipFiles": ["<node_internals>/**"],
      "type": "node"
    }
  ]
}
```

### Debugging com Node.js

```bash
# Modo debug
node --inspect index.js

# Debug com breakpoint
node --inspect-brk index.js
```

## Automatização com scripts

### Husky para Git Hooks

```bash
# Instalar Husky
npm install --save-dev husky

# Configurar pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run test"
```

### Workflow completo

```json
{
  "scripts": {
    "dev": "nodemon --exec \"npm run lint && node\" index.js",
    "build": "npm run lint && npm run test",
    "deploy": "npm run build && git push origin main"
  }
}
```

## Conclusão

Um ambiente bem configurado economiza tempo e reduz erros. Invista tempo na configuração inicial para ser mais produtivo no longo prazo.

**Próximos passos:**
1. Configure as ferramentas mencionadas
2. Adapte as configurações às suas necessidades
3. Automatize processos repetitivos
4. Mantenha as ferramentas atualizadas

Happy coding! 🚀