---
title: "Trabalhando com Git: dicas essenciais"
date: "2024-01-10"
author: "Jaison Schmidt"
excerpt: "Principais comandos e práticas recomendadas para trabalhar com Git no dia a dia do desenvolvedor."
---

# Trabalhando com Git: dicas essenciais

O Git é uma ferramenta fundamental para qualquer desenvolvedor. Neste post, compartilho algumas dicas essenciais que uso no meu dia a dia.

## Comandos básicos mais usados

### Configuração inicial

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Workflow básico

```bash
# Ver status dos arquivos
git status

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "Mensagem descritiva"

# Enviar para repositório remoto
git push origin main
```

## Boas práticas

### Mensagens de commit

- Use o imperativo: "Adiciona" ao invés de "Adicionou"
- Seja descritivo mas conciso
- Use prefixos quando apropriado: `feat:`, `fix:`, `docs:`

### Branching

```bash
# Criar e mudar para nova branch
git checkout -b feature/nova-funcionalidade

# Listar branches
git branch -a

# Deletar branch local
git branch -d nome-da-branch
```

## Comandos avançados úteis

### Desfazer alterações

```bash
# Desfazer alterações não commitadas
git checkout -- arquivo.txt

# Desfazer último commit (mantendo alterações)
git reset --soft HEAD~1

# Visualizar histórico
git log --oneline --graph
```

### Trabalhando com repositórios remotos

```bash
# Adicionar remoto
git remote add origin https://github.com/usuario/repo.git

# Buscar atualizações
git fetch origin

# Fazer merge
git merge origin/main
```

## Ferramentas visuais

Algumas ferramentas que facilitam o trabalho com Git:

- **GitHub Desktop**: Interface gráfica oficial do GitHub
- **GitKraken**: Ferramenta visual poderosa
- **VS Code**: Integração nativa excelente

## Conclusão

O Git pode parecer intimidador no início, mas com prática se torna natural. A chave é começar com o básico e ir evoluindo gradualmente.

> "A melhor maneira de aprender Git é usando Git!" - Desenvolvedor anônimo

Continue praticando e em breve você estará dominando esta ferramenta essencial!