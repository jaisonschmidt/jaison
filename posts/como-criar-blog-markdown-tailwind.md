---
title: "Como criar um blog com Markdown e Tailwind CSS"
date: "2024-01-20"
author: "Jaison Schmidt"
excerpt: "Tutorial completo sobre como construir um blog estático usando arquivos Markdown, Node.js e Tailwind CSS para estilização."
---

# Como criar um blog com Markdown e Tailwind CSS

Criar um blog moderno e eficiente não precisa ser complicado. Neste post, vou mostrar como construí este blog usando uma abordagem simples e poderosa.

## Por que Markdown?

O Markdown é uma linguagem de marcação leve que permite:

- **Escrita rápida**: Sintaxe simples e intuitiva
- **Portabilidade**: Arquivos de texto puro
- **Flexibilidade**: Fácil conversão para HTML
- **Versionamento**: Perfeito para Git

## Arquitetura do projeto

A estrutura do projeto é bem organizada:

```
jaison-blog/
├── posts/          # Arquivos markdown dos posts
├── templates/      # Templates HTML
├── src/           # Estilos CSS
├── public/        # Arquivos gerados
└── build.js       # Script de build
```

## Tecnologias utilizadas

### Node.js e dependências

- **marked**: Para converter Markdown em HTML
- **front-matter**: Para processar metadados dos posts
- **slugify**: Para gerar URLs amigáveis

### Tailwind CSS

O Tailwind CSS oferece:

1. **Utility-first**: Classes utilitárias para estilização rápida
2. **Responsivo**: Design mobile-first
3. **Customizável**: Configuração flexível
4. **Performance**: CSS otimizado

## Processo de build

O processo de build é automatizado:

1. Lê todos os arquivos `.md` da pasta `posts/`
2. Processa o front-matter (metadados)
3. Converte Markdown para HTML
4. Gera páginas individuais para cada post
5. Cria a página inicial com lista de posts
6. Compila o CSS com Tailwind

## Próximos passos

Algumas melhorias futuras incluem:

- [ ] Sistema de tags
- [ ] Busca por posts
- [ ] RSS feed
- [ ] Comentários
- [ ] Dark mode

Este é apenas o começo de uma jornada interessante no desenvolvimento web!