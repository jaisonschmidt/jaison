# Jaison's Blog

Um blog simples e moderno construído com Markdown, Node.js e Tailwind CSS.

## 🚀 Características

- ✅ Posts escritos em Markdown
- ✅ Build automático que atualiza a página home
- ✅ Lista de posts ordenados por data (mais recentes primeiro)
- ✅ URLs amigáveis para SEO
- ✅ Design responsivo com Tailwind CSS
- ✅ Templates HTML customizáveis
- ✅ Suporte a metadados nos posts (front-matter)

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## 🔨 Como usar

### Criar um novo post

1. Crie um arquivo `.md` na pasta `posts/` com o seguinte formato:

```markdown
---
title: "Título do Post"
date: "2024-01-20"
author: "Seu Nome"
excerpt: "Breve descrição do post que aparecerá na home."
---

# Título do Post

Conteúdo do post em Markdown...
```

### Build do projeto

```bash
npm run build
```

Este comando irá:
- Processar todos os arquivos Markdown da pasta `posts/`
- Gerar páginas HTML individuais para cada post
- Atualizar a página home com a lista de posts
- Compilar o CSS com Tailwind

### Desenvolvimento

Para desenvolvimento local com live server:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o blog.

## 📁 Estrutura do projeto

```
jaison-blog/
├── posts/              # Arquivos Markdown dos posts
├── templates/          # Templates HTML
│   ├── layout.html     # Layout principal
│   ├── home.html       # Template da página home
│   └── post.html       # Template de post individual
├── src/               # Arquivos de estilo
│   └── styles.css     # Estilos CSS com Tailwind
├── public/            # Arquivos gerados (HTML e CSS)
├── build.js           # Script de build
├── package.json       # Dependências e scripts
└── tailwind.config.js # Configuração do Tailwind
```

## 🎨 Personalização

### Estilos

Edite `src/styles.css` para personalizar os estilos do blog. O arquivo já inclui classes customizadas para o conteúdo dos posts.

### Templates

Os templates HTML estão na pasta `templates/` e podem ser customizados:
- `layout.html`: Layout principal com header e footer
- `home.html`: Template da página inicial
- `post.html`: Template de post individual

## 📝 Scripts disponíveis

- `npm run build`: Gera o site estático
- `npm run dev`: Build + servidor de desenvolvimento
- `npm run clean`: Limpa os arquivos gerados

## 🔧 Tecnologias utilizadas

- **Node.js**: Runtime JavaScript
- **Marked**: Conversão de Markdown para HTML
- **Front-matter**: Processamento de metadados
- **Slugify**: Geração de URLs amigáveis
- **Tailwind CSS**: Framework CSS utilitário
- **PostCSS**: Processamento de CSS