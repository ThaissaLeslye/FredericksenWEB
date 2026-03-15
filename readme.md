# Fredericksen

Aplicação front-end desenvolvida em Angular para gestão de rotinas familiares. O projeto demonstra a aplicação de boas práticas de engenharia de software, integração contínua e testes automatizados.

## Visão Geral
**Objetivo:** Centralizar ferramentas de utilidade diária de forma responsiva.
**Escopo:** Módulos integrados de livro de receitas, calendário e tábua de marés.
**Ganhos:** Praticidade na rotina e validação de arquitetura front-end segura.

## Arquitetura e Tecnologias
* **Framework:** Angular (utilização de Signals e RxJS).
* **Autenticação:** Integração direta com Google Identity Services (GIS) e Firebase Auth.
* **Segurança:** Proteção de chaves públicas via restrição de HTTP Referrers no Google Cloud.
* **Qualidade:** Cobertura de testes unitários com Jasmine/Karma (Services, Guards e fluxos de erro).
* **CI/CD:** Pipeline no GitHub Actions para validação de PRs e *deploy* automatizado no Firebase Hosting.

## Como Executar
1. Clone o repositório: `git clone <url-do-repositorio>`
2. Instale as dependências rigorosamente: `npm ci`
3. Valide a integridade com os testes: `npm run test`
4. Inicie o servidor local: `npm run start`