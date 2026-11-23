# NutriPro — Plataforma Web de Nutrição e Bem-Estar

Aplicação web desenvolvida para a disciplina de Design de Interação, focada em usabilidade, acessibilidade e identidade visual consistente. O sistema simula um portal de consultoria nutricional com autenticação local e painel interativo.

---

## Tecnologias Utilizadas
* **HTML5:** Estruturação semântica das páginas de login e painel principal.
* **CSS3:** Estilização responsiva, variáveis de cores para temas (Claro/Escuro) e layout baseado em Flexbox/Grid.
* **JavaScript (ES6+):** Manipulação do DOM, armazenamento de sessão (`localStorage`), controle do carrossel e recursos de acessibilidade.

---

## Passo a Passo da Construção

1. **Estruturação Base e Identidade Visual (Commits Iniciais):**
   * Definição da paleta de cores centrada no verde-esmeralda (`#00B87C` / `#10B981`) combinada a tons neutros claros para transmitir saúde e equilíbrio.
   * Criação da estrutura básica das duas telas principais: autenticação e página inicial, mantendo cantos arredondados e tipografia limpa em todos os componentes.

2. **Tela de Autenticação (`index.html`):**
   * Desenvolvimento do cartão centralizado com alternância entre as abas **Entrar** e **Criar conta**.
   * Implementação da lógica em JavaScript para salvar contas e manter o usuário conectado localmente no navegador (modo demonstração), além de botão para exibir/ocultar a senha.

3. **Construção do Painel Principal (`home.html`):**
   * **Cabeçalho (Navbar):** Inclusão do logotipo `NutriPro`, barra de pesquisa (`Pesquisar saúde..`), identificação do usuário logado e botão de saída.
   * **Carrossel de Destaques:** Criação de slides dinâmicos com navegação por setas e indicadores circulares (*"Transforme seu Corpo e Mente"*, *"Nutrição com Ciência"*).
   * **Prova Social e Serviços:** Adição dos indicadores de credibilidade (`+2500 pacientes`, `12 anos de experiência`, `98% de satisfação`) e da grade de cartões (`Reeducação Alimentar`, `Nutrição Esportiva` e `Receitas Saudáveis`).

4. **Implementação de Acessibilidade (WCAG) e Heurísticas:**
   * Adição dos controles `A+` e `A-` no cabeçalho para redimensionamento dinâmico das fontes sem quebrar o layout.
   * Criação do seletor de contraste para alternar entre **Modo Claro** e **Modo Escuro**, preservando a cor primária da marca para manter o reconhecimento visual.

---

## Como Executar o Projeto
1. Clone o repositório:
   ```bash
   git clone [https://github.com/matheusmxf/ProjetoFinalDI.git](https://github.com/matheusmxf/ProjetoFinalDI.git)
