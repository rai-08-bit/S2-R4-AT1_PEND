#!/usr/bin/env bash

# Path to the commit message file (provided by Git).
COMMIT_MSG_FILE=$1

# Read the commit message from the file.
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Permite emoji antes do tipo Conventional Commit:
# - formato shortcode: :bug:
# - formato unicode: 🐛
# Exemplos válidos:
# :bug: fix(api): corrige timeout
# 🐛 fix(api): corrige timeout
# :sparkles: feat(ui): adiciona novo card
#
# Obs.: usamos [[:space:]] em vez de \s para compatibilidade com regex ERE do shell.
EMOJI_PREFIX_REGEX='((:[a-zA-Z0-9_+-]+:)|([^[:alnum:][:space:]]+))[[:space:]]+'
OPTIONAL_EMOJI_PREFIX_REGEX="(${EMOJI_PREFIX_REGEX})?"
TYPE_REGEX='(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)'
SCOPE_REGEX='(\([a-zA-Z0-9_.-]+\))?'
BREAKING_REGEX='(!)?'
DESCRIPTION_REGEX=':[[:space:]].*$'
CONVENTIONAL_COMMIT_REGEX="^${OPTIONAL_EMOJI_PREFIX_REGEX}${TYPE_REGEX}${SCOPE_REGEX}${BREAKING_REGEX}${DESCRIPTION_REGEX}"

# Check if the commit message matches the regex
if ! [[ $COMMIT_MSG =~ $CONVENTIONAL_COMMIT_REGEX ]]; then
    echo "ERRO: A mensagem de commit não segue o formato do Conventional Commits."
    echo
    echo "O formato correto da mensagem de commit é obrigatório:"
    echo "  [:emoji: ]<tipo>(<escopo opcional>): <descrição>"
    echo
    echo "Os tipos válidos são:"
    echo "  feat:     Uma nova funcionalidade."
    echo "  fix:      Correção de um bug."
    echo "  docs:     Alterações na documentação."
    echo "  style:    Alterações de estilo de código (formatação, ponto-e-vírgula ausente, etc.)."
    echo "  refactor: Refatoração de código (nem corrige bug nem adiciona funcionalidade)."
    echo "  test:     Adicionar ou atualizar testes."
    echo "  chore:    Tarefas rotineiras como atualização de dependências ou ferramentas de build."
    echo "  build:    Alterações que afetam o sistema de build ou dependências externas."
    echo "  ci:       Alterações nos arquivos de configuração de CI ou scripts."
    echo "  perf:     Melhorias de desempenho."
    echo "  revert:   Reverter um commit anterior."
    echo
    echo "Exemplos:"
    echo "  feat(auth): adicionar funcionalidade de login"
    echo "  fix(api)!: resolver problema de timeout"
    echo "  docs(readme): atualizar instruções de instalação"
    echo "  :bug: fix(api): resolver problema de timeout"
    echo "  :sparkles: feat(ui): adicionar novos cards"
    echo
    exit 1
fi

exit 0
