## Para rodar o projeto

versões:
Node v18.16.1

Baixar dependencias:

```bash
npm install
# or
yarn 
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## Estrutura de pastas

- Estrutura de pastas:
- public: assets estáticos como imagens, a logo por exemplo
- src:arquivos principais da aplicação
- src/@types: todas as tipagens da aplicação
- src/components: todos os componentes usados na aplicação
- src/components/Auth: componentes voltados a autenticação formulário e componente que só devem ser renderizado para permissões de gestor
- src/components/Frames: componentes que compoem os layouts das páginas (cada página tem uma pasta aqui)
- src/components/Layout: componentes principais de uma página (cada página tem um)
- src/components/ModalContents: componentes de de renderização interna dos modais (cada modal tem um)
- src/components/UI: componentes de interface que se repetem pela aplicação
- src/config: configurações para inicialização de libs etc, aqui se inicializa o firebase
- src/context: todos os meus arquivos de contextAPI aqui existem algumas das funções mais importantes (para ler, escrever, atualizar e deletar do banco de dados do firebase, por exemplo)
- src/hooks: customs hooks a maioria deles está sendo usado para facilitar o acesso do contextAPI com excesão do useAnalytics e do useModal onde é realizado o tratamento de dados para os gráficos do dashboard e o gerenciamento de renderização do conteúdo dos modais
- src/layout: componente de SEO com os metadados da aplicação
- src/pages: rotas da aplicação
- src/services: funções que não são usadas para renderização e podem ser usadas em muito lugares da aplicação, usada principalmente para validação e formatação de dados
- src/styles: os arquivos de estilo da aplicação usando tailwind e css puro
- src/templates: arquivos que vão renderizar em todas as paginas como um cabeçalho e um rodapé
- src/utils: usado principalmente para armazenar constantes

## Colaborar

 Nesse projeto foi usado o husky para garantir commits semanticos, as principais regras são que o commit precisa ter até no máximo 100 caracteres e precisa começar com algum prefix semantico segue os prefixos:

- build: Alterações que afetam o sistema de construção ou dependências externas (escopos de exemplo: gulp, broccoli, npm),
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs);
- docs: referem-se a inclusão ou alteração somente de arquivos de documentação;
- feat: Tratam adições de novas funcionalidades ou de quaisquer outras novas implantações ao código;
- fix: Essencialmente definem o tratamento de correções de bugs;
- perf: Uma alteração de código que melhora o desempenho;
- refactor: Tipo utilizado em quaisquer mudanças que sejam executados no código, porém não alterem a funcionalidade final da tarefa impactada;
- style: Alterações referentes a formatações na apresentação do código que não afetam o significado do código, como por exemplo: espaço em branco, formatação, ponto e vírgula ausente etc.;
- test: Adicionando testes ausentes ou corrigindo testes existentes nos processos de testes automatizados (TDD);
- chore: Atualização de tarefas que não ocasionam alteração no código de produção, mas mudanças de ferramentas, mudanças de configuração e bibliotecas que realmente não entram em produção;
- env: basicamente utilizado na descrição de modificações ou adições em arquivos de configuração em processos e métodos de integração contínua (CI), como parâmetros em arquivos de configuração de containers.


## Variaveis de Ambiente

Para o projeto rodar localmente é necessário algumas variaveis de ambiente para configuração do firebase:

```bash
# Todas podem ser encontradas no console do seu app Firebase

APIKEY=
AUTHDOMAIN=
PROJECTID=
STORAGEBUCKET=
MESSAGINGSENDERID=
APPID=
```
