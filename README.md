# Expresso Diesel — Site institucional

Site institucional da **Expresso Diesel Manutenções Automotivas**, especializada
em manutenção de linha diesel leve e pesada com foco em atendimento empresarial
a transportadoras e frotas.

## Estrutura do projeto

```
expresso-diesel-site/
├── index.html              # Estrutura semântica e conteúdo
├── assets/
│   ├── css/
│   │   ├── base.css        # Design tokens (variáveis), reset, utilitários
│   │   ├── components.css  # Componentes reutilizáveis (botões, cards, campos)
│   │   └── layout.css      # Seções da página + responsividade
│   ├── js/
│   │   ├── config.js       # Dados da empresa (telefone, CNPJ, região)
│   │   ├── navegacao.js    # Menu mobile e acessibilidade
│   │   ├── formulario.js   # Validação e encaminhamento do formulário
│   │   └── main.js         # Ponto de entrada / orquestração
│   ├── img/                # Fotos reais (a incluir)
│   └── icons/              # Favicon e ícones de app
└── README.md
```

## Convenções adotadas

- **HTML semântico**: `header`, `nav`, `main`, `section`, `article`, `footer`,
  `address`, `figure`. Cada seção tem `aria-labelledby` apontando para seu título.
- **CSS em camadas**: tokens → componentes → layout. Nomenclatura **BEM**
  (`.bloco__elemento--modificador`), toda cor e espaçamento vindo de variáveis CSS.
- **JS em arquivos por responsabilidade**: namespace `window.ExpressoDiesel`,
  funções documentadas em JSDoc, sem dependências externas. Carregados com
  `defer` na ordem de dependência (`config` → módulos → `main`).
- **Acessibilidade**: skip link, foco visível, `aria-expanded` no menu,
  `role="alert"` nas mensagens de erro, suporte a `prefers-reduced-motion`.
- **SEO**: meta description, canonical, Open Graph e JSON-LD (`AutoRepair`).
- **Ícones**: sprite SVG único no topo do HTML, reutilizado via `<use>`.

## Como rodar localmente

Os scripts são clássicos (com `defer`), então **basta abrir o `index.html`
com duplo clique** no navegador. Não exige servidor.

Se quiser servir por HTTP de qualquer forma:

```bash
python3 -m http.server 8000
```

## Pendências antes de publicar

1. **Telefone real** — editar apenas `assets/js/config.js`
   (`numeroInternacional` e `numeroExibicao`).
2. **Fotos reais** — adicionar em `assets/img/` e substituir a moldura
   `.hero__midia` no `index.html` por uma tag `<img>` com `alt` descritivo.
3. **Favicon** — gerar e colocar em `assets/icons/`.
4. **Imagem Open Graph** — `assets/img/og-expresso-diesel.jpg` (1200×630).
5. **Domínio** — registrar `expressodiesel.com.br` no Registro.br.
6. **Hospedagem** — publicar e apontar o domínio.

## Próximas evoluções possíveis

- Página dedicada a planos de manutenção mensal para frotas
- Blog para SEO (captação orgânica de transportadoras)
- Back-end real para o formulário (hoje encaminha via WhatsApp)
- Área de cadastro para mecânicos parceiros
