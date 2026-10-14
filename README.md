# Sistema de Cálculo de Comissões

Aplicação fullstack que lê registros de vendas de um time comercial a partir de um arquivo JSON e calcula a comissão de cada vendedor com base em regras progressivas por faixa de valor.

## Regras de Comissão

Para cada venda, aplica-se a seguinte regra:

| Faixa de Valor | Alíquota |
|---------------|----------|
| Abaixo de R$ 100,00 | 0% (sem comissão) |
| Abaixo de R$ 500,00 (R$ 100,00 a R$ 499,99) | 1% |
| A partir de R$ 500,00 | 5% |

## Confirmação dos Cálculos

Os dados são lidos de `src/main/resources/vendas.json` e o cálculo é feito individualmente por venda. Abaixo, o resultado conferido manualmente:

### João Silva (10 vendas)

| Venda | Valor (R$) | Faixa | Comissão (R$) |
|-------|-----------|-------|---------------|
| 1 | 1.200,50 | 5% | 60,025 |
| 2 | 950,75 | 5% | 47,5375 |
| 3 | 1.800,00 | 5% | 90,00 |
| 4 | 1.400,30 | 5% | 70,015 |
| 5 | 1.100,90 | 5% | 55,045 |
| 6 | 1.550,00 | 5% | 77,50 |
| 7 | 1.700,80 | 5% | 85,04 |
| 8 | 250,30 | 1% | 2,503 |
| 9 | 480,75 | 1% | 4,8075 |
| 10 | 320,40 | 1% | 3,204 |

- **Volume total:** R$ 10.754,70
- **Comissão total:** R$ 495,677

### Maria Souza (9 vendas)

| Venda | Valor (R$) | Faixa | Comissão (R$) |
|-------|-----------|-------|---------------|
| 1 | 2.100,40 | 5% | 105,02 |
| 2 | 1.350,60 | 5% | 67,53 |
| 3 | 950,20 | 5% | 47,51 |
| 4 | 1.600,75 | 5% | 80,0375 |
| 5 | 1.750,00 | 5% | 87,50 |
| 6 | 1.450,90 | 5% | 72,545 |
| 7 | 400,50 | 1% | 4,005 |
| 8 | 180,20 | 1% | 1,802 |
| 9 | 90,75 | 0% | 0,00 |

- **Volume total:** R$ 9.874,30
- **Comissão total:** R$ 465,9495

### Carlos Oliveira (8 vendas)

| Venda | Valor (R$) | Faixa | Comissão (R$) |
|-------|-----------|-------|---------------|
| 1 | 800,50 | 5% | 40,025 |
| 2 | 1.200,00 | 5% | 60,00 |
| 3 | 1.950,30 | 5% | 97,515 |
| 4 | 1.750,80 | 5% | 87,54 |
| 5 | 1.300,60 | 5% | 65,03 |
| 6 | 300,40 | 1% | 3,004 |
| 7 | 500,00 | 5% | 25,00 |
| 8 | 125,75 | 1% | 1,2575 |

- **Volume total:** R$ 7.928,35
- **Comissão total:** R$ 379,3715

### Ana Lima (9 vendas)

| Venda | Valor (R$) | Faixa | Comissão (R$) |
|-------|-----------|-------|---------------|
| 1 | 1.000,00 | 5% | 50,00 |
| 2 | 1.100,50 | 5% | 55,025 |
| 3 | 1.250,75 | 5% | 62,5375 |
| 4 | 1.400,20 | 5% | 70,01 |
| 5 | 1.550,90 | 5% | 77,545 |
| 6 | 1.650,00 | 5% | 82,50 |
| 7 | 75,30 | 0% | 0,00 |
| 8 | 420,90 | 1% | 4,209 |
| 9 | 315,40 | 1% | 3,154 |

- **Volume total:** R$ 8.763,95
- **Comissão total:** R$ 404,9805

### Resumo Final

| Vendedor | Vendas | Volume (R$) | Comissão (R$) |
|----------|--------|-------------|---------------|
| João Silva | 10 | 10.754,70 | 495,68 |
| Maria Souza | 9 | 9.874,30 | 465,95 |
| Carlos Oliveira | 8 | 7.928,35 | 379,37 |
| Ana Lima | 9 | 8.763,95 | 404,98 |
| **Total Geral** | **36** | **37.321,30** | **1.745,98** |

> ✅ Os cálculos estão corretos e seguem rigorosamente a regra do JSON.

## Arquitetura

```
Sistema_ComissaoDeVendas/
├── BackEnd/                 # API Spring Boot
│   ├── src/main/java/BackEnd/demo/
│   │   ├── controller/      # ComissaoController (endpoints REST)
│   │   ├── dto/             # ComissaoVendedorDTO
│   │   ├── model/           # Venda
│   │   ├── service/         # ComissaoService (lógica de cálculo + leitura JSON)
│   │   └── DemoApplication.java
│   ├── src/main/resources/
│   │   ├── vendas.json      # Fonte de dados
│   │   └── application.properties
│   └── build.gradle
└── FrontEnd/                # UI React + Vite
    ├── src/
    │   ├── App.jsx          # Dashboard com ranking e estatísticas
    │   ├── App.css          # Estilos Glassmorphism
    │   └── main.jsx
    └── package.json
```

### Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/comissoes` | Retorna comissão por vendedor (ordenado por nome) |
| GET | `/api/comissoes/vendas` | Retorna todas as vendas lidas do JSON |

## Tecnologias Utilizadas

### Backend
- **Java 26**
- **Spring Boot 4.1.1** (Web MVC, Validation, DevTools)
- **Jackson 3.x** (`tools.jackson.databind`) — parsing do JSON
- **Lombok** — redução de boilerplate
- **Gradle** (wrapper 9.7.1)

### Frontend
- **React 19**
- **Vite 8**
- **CSS puro** com efeito Glassmorphism e fonte Inter
- **`Intl.NumberFormat`** para formatação monetária (pt-BR / BRL)

## Como Rodar o Projeto

### Pré-requisitos
- Java 26+
- Node.js 20+ (recomendado 24.x)
- npm 10+

### 1. Backend (Spring Boot)

Abra um terminal na pasta `BackEnd` e execute:

**Windows:**
```bash
cd BackEnd
.\gradlew.bat bootRun
```

**Linux/macOS:**
```bash
cd BackEnd
./gradlew bootRun
```

O backend ficará disponível em **http://localhost:8080**.

Teste direto pela API:
```bash
curl http://localhost:8080/api/comissoes
```

### 2. Frontend (React + Vite)

Abra **outro terminal** na pasta `FrontEnd`, instale as dependências e inicie o dev server:

```bash
cd FrontEnd
npm install
npm run dev
```

O Vite informará a URL local (geralmente **http://localhost:5173** — ou a próxima porta disponível, como 5174).

Abra o navegador nessa URL para visualizar o dashboard de comissões.

### Ordem de execução
O frontend faz `fetch` em `http://localhost:8080/api/comissoes`, portanto **inicie o backend primeiro** e depois o frontend.

## Dados de Entrada

O arquivo de dados reside em `BackEnd/src/main/resources/vendas.json` com a estrutura:

```json
{
  "vendas": [
    { "vendedor": "Nome do Vendedor", "valor": 1200.50 }
  ]
}
```

O serviço `ComissaoService` carrega esse arquivo automaticamente no startup da aplicação (`@PostConstruct`), sem necessidade de banco de dados.
