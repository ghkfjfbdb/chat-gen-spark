export class ElaboratedResponseService {
  static generateElaboratedResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    // Análise mais específica da pergunta
    const questionWords = ['o que', 'como', 'por que', 'quando', 'onde', 'quem', 'qual', 'quanto'];
    const isQuestion = questionWords.some(word => message.includes(word)) || message.includes('?');
    
    // Extrai o termo principal da pergunta
    const extractMainTerm = (msg: string): string => {
      return msg
        .replace(/^(o que é|como funciona|por que|quando surgiu|onde fica|quem criou|qual é|quanto custa)\s*/i, '')
        .replace(/\?$/, '')
        .trim();
    };

    const mainTerm = isQuestion ? extractMainTerm(message) : message;

    // Bancos de dados - resposta específica baseada na pergunta
    if (message.includes('mysql') || mainTerm.includes('mysql')) {
      if (message.includes('como funciona') || message.includes('como usar')) {
        return "O MySQL funciona como um sistema de gerenciamento de banco de dados relacional que usa SQL para consultas. Ele armazena dados em tabelas organizadas em linhas e colunas, suporta transações ACID e oferece recursos como índices, replicação e clustering. Para usar: instale o servidor, crie um banco, defina tabelas com CREATE TABLE, insira dados com INSERT e consulte com SELECT.";
      } else if (message.includes('vantagens') || message.includes('benefícios')) {
        return "As principais vantagens do MySQL incluem: alta performance, confiabilidade comprovada, facilidade de uso, ampla compatibilidade, suporte robusto da comunidade, escalabilidade horizontal e vertical, segurança avançada, e custo-benefício excelente por ser open source com opções comerciais disponíveis.";
      } else {
        return "MySQL é um sistema de gerenciamento de banco de dados relacional (RDBMS) open source, desenvolvido pela Oracle. É amplamente utilizado em aplicações web devido à sua confiabilidade, performance e facilidade de uso. Suporta SQL padrão, transações ACID, replicação master-slave, e é compatível com diversas linguagens de programação.";
      }
    }

    if (message.includes('postgresql') || message.includes('postgres') || mainTerm.includes('postgresql')) {
      if (message.includes('diferença') && message.includes('mysql')) {
        return "PostgreSQL vs MySQL: PostgreSQL é mais robusto para aplicações complexas, oferece melhor suporte a JSON, tipos de dados avançados, consultas complexas e conformidade SQL mais estrita. MySQL é mais simples, rápido para operações básicas e tem maior adoção web. PostgreSQL é ideal para sistemas empresariais; MySQL para aplicações web tradicionais.";
      } else if (message.includes('como funciona')) {
        return "PostgreSQL funciona como um sistema objeto-relacional avançado. Usa arquitetura multi-processo, suporte MVCC para concorrência, WAL para durabilidade, e oferece recursos como stored procedures, triggers, views materializadas, full-text search, e extensões personalizáveis. Executa consultas através do otimizador de consultas baseado em custos.";
      } else {
        return "PostgreSQL é um sistema de banco de dados objeto-relacional open source, conhecido por sua robustez e conformidade com padrões SQL. Oferece recursos avançados como tipos de dados customizados, indexação sofisticada, suporte completo a transações ACID, replicação streaming e extensibilidade através de procedimentos armazenados em múltiplas linguagens.";
      }
    }

    // Outras respostas de banco de dados
    if (message.includes('mongodb') || mainTerm.includes('mongodb')) {
      if (message.includes('como funciona')) {
        return "MongoDB funciona como um banco de dados NoSQL orientado a documentos. Armazena dados em formato JSON-like (BSON), sem esquema fixo. Suporta indexação, agregação, replicação e sharding. É ideal para aplicações que precisam de flexibilidade e escalabilidade horizontal.";
      } else if (message.includes('vantagens')) {
        return "As vantagens do MongoDB incluem: flexibilidade do esquema, alta escalabilidade, facilidade de uso, suporte a grandes volumes de dados, replicação integrada e bom desempenho em leitura e escrita. É adequado para aplicações web, mobile e IoT.";
      } else {
        return "MongoDB é um banco de dados NoSQL orientado a documentos, projetado para alta escalabilidade e flexibilidade. É popular em aplicações modernas que precisam lidar com grandes volumes de dados não estruturados. Oferece recursos como indexação, agregação e replicação.";
      }
    }

    if (message.includes('redis') || mainTerm.includes('redis')) {
      if (message.includes('como funciona')) {
        return "Redis funciona como um banco de dados em memória que armazena dados em estruturas como strings, hashes, listas, sets e sorted sets. É usado como cache, message broker e gerenciador de sessões. Oferece alta performance e baixa latência.";
      } else if (message.includes('vantagens')) {
        return "As vantagens do Redis incluem: alta performance, baixa latência, suporte a diversas estruturas de dados, facilidade de uso, persistência opcional e suporte a pub/sub. É ideal para caching, filas de mensagens e contadores em tempo real.";
      } else {
        return "Redis é um banco de dados em memória de código aberto, usado como cache, message broker e gerenciador de sessões. É conhecido por sua alta performance e baixa latência. Suporta diversas estruturas de dados e oferece persistência opcional.";
      }
    }

    // Programação - respostas contextuais
    if (message.includes('javascript') || message.includes('js')) {
      if (message.includes('como aprender') || message.includes('estudar')) {
        return "Para aprender JavaScript: 1) Comece com fundamentos (variáveis, funções, loops), 2) Pratique no navegador com console.log, 3) Aprenda DOM manipulation, 4) Estude ES6+ features, 5) Pratique com projetos pequenos, 6) Explore Node.js para backend, 7) Use recursos como MDN, freeCodeCamp e JavaScript.info. A prática constante é fundamental!";
      } else if (message.includes('frameworks') || message.includes('bibliotecas')) {
        return "Principais frameworks/bibliotecas JavaScript: React (interfaces de usuário), Vue.js (progressivo e intuitivo), Angular (aplicações enterprise), Node.js (backend), Express.js (servidor web), Next.js (React full-stack), Svelte (compilação otimizada), jQuery (manipulação DOM legacy). Escolha baseado no projeto e experiência da equipe.";
      } else {
        return "JavaScript é uma linguagem de programação dinâmica, interpretada e multi-paradigma. Originalmente criada para web browsers, hoje roda em servidores (Node.js), mobile e desktop. Características: tipagem dinâmica, funções como objetos de primeira classe, closures, prototypes, event-driven, e ecossistema NPM extenso.";
      }
    }

    // Inteligência Artificial - respostas específicas
    if (message.includes('inteligência artificial') || message.includes('ia') || message.includes('machine learning')) {
      if (message.includes('como funciona') || message.includes('funcionamento')) {
        return "A IA funciona através de algoritmos que processam dados para identificar padrões e fazer previsões. Machine Learning usa dados históricos para treinar modelos matemáticos. Deep Learning emprega redes neurais artificiais com múltiplas camadas. O processo envolve: coleta de dados → pré-processamento → treinamento → validação → implementação → monitoramento contínuo.";
      } else if (message.includes('tipos') || message.includes('categorias')) {
        return "Tipos de IA: 1) IA Estreita (específica, como Siri), 2) IA Geral (hipotética, similar à humana), 3) Superinteligência (teórica, superior à humana). Por abordagem: Machine Learning, Deep Learning, NLP, Computer Vision, Robotics. Por aplicação: IA Conversacional, Preditiva, Generativa, e de Recomendação.";
      } else {
        return "Inteligência Artificial é a capacidade de máquinas realizarem tarefas que normalmente requerem inteligência humana. Inclui aprendizado, raciocínio, percepção e tomada de decisões. Aplicações: assistentes virtuais, carros autônomos, diagnósticos médicos, recomendações personalizadas, tradução automática e análise preditiva. Revoluciona diversos setores através da automação inteligente.";
      }
    }

    // Ciência - respostas contextuais
    if (message.includes('física quântica') || message.includes('quantum')) {
      if (message.includes('como funciona') || message.includes('princípios')) {
        return "A física quântica funciona com princípios fundamentais: 1) Dualidade onda-partícula (partículas se comportam como ondas), 2) Superposição (partículas em múltiplos estados simultaneamente), 3) Emaranhamento (partículas conectadas instantaneamente), 4) Princípio da Incerteza (impossível medir posição e velocidade precisamente). Estas propriedades só se manifestam em escalas atômicas e subatômicas.";
      } else if (message.includes('aplicações') || message.includes('uso')) {
        return "Aplicações da física quântica: computação quântica (processamento exponencialmente mais rápido), criptografia quântica (comunicação ultra-segura), sensores quânticos (medições extremamente precisas), medicina (ressonância magnética, radioterapia), eletrônicos (transistores, lasers), GPS (correção relativística) e energia (células solares, LEDs). Está revolucionando a tecnologia moderna.";
      } else {
        return "Física quântica é o ramo que estuda o comportamento da matéria e energia em escalas atômicas e subatômicas. Revela que partículas podem existir em superposição de estados, se emaranhar instantaneamente e apresentar probabilidades em vez de certezas. Fundamental para compreender a natureza da realidade e base de tecnologias revolucionárias como computadores quânticos.";
      }
    }

    // Filosofia - respostas específicas
    if (message.includes('sentido da vida') || message.includes('propósito')) {
      if (message.includes('filosofia') || message.includes('filósofos')) {
        return "Filósofos sobre o sentido da vida: Aristóteles propôs a 'eudaimonia' (florescimento humano), Sartre defendeu que 'existência precede essência' (criamos nosso próprio sentido), Camus explorou o absurdo da existência, Nietzsche falou sobre criar valores próprios, Viktor Frankl enfatizou encontrar significado mesmo no sofrimento. Cada tradição oferece perspectivas únicas sobre esta questão fundamental.";
      } else if (message.includes('como encontrar')) {
        return "Para encontrar sentido na vida: 1) Reflita sobre seus valores fundamentais, 2) Identifique atividades que geram satisfação genuína, 3) Cultive relacionamentos significativos, 4) Contribua para algo maior que você mesmo, 5) Pratique gratidão e mindfulness, 6) Aceite que o sentido pode evoluir, 7) Busque experiências autênticas. O sentido é frequentemente construído, não descoberto.";
      } else {
        return "O sentido da vida é uma questão fundamental que cada pessoa deve explorar individualmente. Pode incluir: relacionamentos profundos, contribuição para a sociedade, crescimento pessoal, criação de arte ou conhecimento, experiências transcendentais, ou simplesmente viver plenamente cada momento. Não há uma resposta universal, mas a busca em si pode ser profundamente significativa.";
      }
    }

    // Resposta contextual genérica baseada no tipo de pergunta
    if (isQuestion) {
      const responses = [
        `Sobre "${mainTerm}", essa é uma questão interessante que merece uma análise cuidadosa. Posso buscar informações mais específicas na Wikipedia para você, ou se preferir, posso tentar uma explicação mais detalhada. Poderia me dar mais contexto sobre o que especificamente você gostaria de saber?`,
        `"${mainTerm}" é um tópico que pode ser abordado de várias perspectivas. Para te dar uma resposta mais precisa e útil, seria interessante saber: você está buscando uma definição geral, aplicações práticas, ou tem algum aspecto específico em mente?`,
        `Entendo que você quer saber sobre "${mainTerm}". Este é um assunto que posso explicar de forma mais detalhada. Você gostaria de uma visão geral primeiro, ou tem alguma dúvida específica que posso esclarecer?`
      ];
      
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Respostas genéricas e de fallback
    if (message.includes('ajuda') || message.includes('socorro') || message.includes('não sei')) {
      return "Claro, estou aqui para ajudar! Pode me explicar melhor qual é sua dúvida ou problema? Vou fazer o meu melhor para encontrar uma solução.";
    }
    
    if (message.includes('obrigado') || message.includes('obrigada') || message.includes('valeu') || message.includes('muito obrigado')) {
      return "De nada! Fico feliz em poder ajudar. Se tiver mais alguma dúvida ou quiser conversar sobre outro assunto, estarei aqui!";
    }
    
    if (message.includes('tchau') || message.includes('até logo') || message.includes('adeus') || message.includes('bye')) {
      return "Até logo! Foi um prazer conversar com você. Volte sempre que precisar de ajuda ou quiser bater um papo!";
    }

    const responses = [
      "Interessante! Este é um assunto que permite diferentes abordagens. Posso elaborar mais sobre aspectos específicos se você quiser - que direção seria mais útil para você?",
      "Essa é uma questão que merece reflexão. Há várias facetas a considerar. Você gostaria que eu explore algum aspecto particular?",
      "Entendo o que você está perguntando. Para dar uma resposta mais direcionada, seria útil saber: você busca informações teóricas, aplicações práticas, ou tem algum contexto específico em mente?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
