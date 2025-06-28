
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

    // === BANCOS DE DADOS ===
    
    // MySQL
    if (message.includes('mysql') || mainTerm.includes('mysql')) {
      if (message.includes('como funciona') || message.includes('como usar')) {
        return "MySQL é um SGBD relacional que usa SQL para consultas. Funciona com engine InnoDB por padrão, suporta transações ACID, índices B-tree, replicação master-slave/master-master. Instalação: MySQL Server → criação de database → tabelas com CREATE TABLE → inserção com INSERT → consultas com SELECT. Porta padrão: 3306.";
      } else if (message.includes('vantagens') || message.includes('benefícios')) {
        return "Vantagens do MySQL: alta performance em leitura, confiabilidade comprovada em produção, facilidade de configuração, ampla compatibilidade (PHP, Python, Java, Node.js), comunidade ativa, custo zero (GPL), opções comerciais disponíveis, boa documentação, suporte a clustering e particionamento.";
      } else if (message.includes('desvantagens') || message.includes('problemas')) {
        return "Desvantagens do MySQL: limitações em consultas complexas comparado ao PostgreSQL, menor conformidade com padrões SQL, funcionalidades avançadas limitadas na versão gratuita, performance inferior em escritas intensivas, suporte limitado a tipos de dados avançados.";
      } else {
        return "MySQL é um sistema de gerenciamento de banco de dados relacional (RDBMS) open source desenvolvido pela Oracle. Usado em 39% dos sites web, incluindo Facebook, Twitter, YouTube. Características: engine InnoDB, transações ACID, replicação, clustering, índices otimizados, compatibilidade multi-plataforma.";
      }
    }

    // PostgreSQL
    if (message.includes('postgresql') || message.includes('postgres') || mainTerm.includes('postgresql')) {
      if (message.includes('diferença') && message.includes('mysql')) {
        return "PostgreSQL vs MySQL: PostgreSQL tem melhor conformidade SQL, suporte superior a JSON/JSONB, tipos de dados avançados (arrays, hstore), extensões (PostGIS), consultas complexas otimizadas, MVCC nativo. MySQL é mais simples, melhor performance em leitura, maior adoção web. PostgreSQL para sistemas complexos; MySQL para aplicações web tradicionais.";
      } else if (message.includes('como funciona')) {
        return "PostgreSQL usa arquitetura multi-processo com shared memory. Principais componentes: Postmaster (processo principal), Backend processes (conexões), Background processes (checkpointer, WAL writer). MVCC para concorrência, WAL para durabilidade, otimizador baseado em custos, suporte a índices: B-tree, Hash, GiST, GIN.";
      } else if (message.includes('vantagens')) {
        return "Vantagens do PostgreSQL: conformidade SQL rigorosa, extensibilidade (PostGIS, pg_stat_statements), tipos de dados ricos (JSON, Arrays, UUID), performance superior em consultas complexas, ACID completo, replicação streaming, suporte a procedimentos em múltiplas linguagens (PL/pgSQL, Python, Perl).";
      } else {
        return "PostgreSQL é um sistema de banco de dados objeto-relacional open source, conhecido pela robustez e conformidade SQL. Usado por Instagram, Spotify, Reddit. Características: MVCC, extensões personalizáveis, JSON nativo, full-text search, replicação lógica, suporte a parallel queries.";
      }
    }

    // MongoDB
    if (message.includes('mongodb') || mainTerm.includes('mongodb')) {
      if (message.includes('como funciona')) {
        return "MongoDB armazena dados em documentos BSON (Binary JSON) em collections. Arquitetura: mongod (servidor), mongo shell (cliente), drivers de linguagem. Sharding automático, replica sets para alta disponibilidade, índices: single field, compound, multikey, text, geospatial. Consultas via find(), aggregate pipeline.";
      } else if (message.includes('vantagens')) {
        return "Vantagens do MongoDB: esquema flexível (schemaless), escalabilidade horizontal nativa, performance superior para leitura/escrita de documentos, consultas ricas com aggregation framework, índices geoespaciais, GridFS para arquivos grandes, integração natural com JavaScript/JSON.";
      } else if (message.includes('desvantagens')) {
        return "Desvantagens do MongoDB: consumo elevado de memória, ausência de transações ACID multi-documento (até v4.0), joins limitados ($lookup), consistência eventual por padrão, curva de aprendizado para modelagem NoSQL, tamanho maior dos documentos BSON.";
      } else {
        return "MongoDB é um banco NoSQL orientado a documentos, armazenando dados em formato BSON. Usado por Facebook, eBay, Cisco. Características: sharding automático, replica sets, aggregation pipeline, índices ricos, consultas ad-hoc, API consistente entre linguagens.";
      }
    }

    // Redis
    if (message.includes('redis') || mainTerm.includes('redis')) {
      if (message.includes('como funciona')) {
        return "Redis é um banco in-memory key-value com estruturas de dados: strings, hashes, lists, sets, sorted sets, bitmaps, HyperLogLogs. Single-threaded com event loop, persistência via RDB snapshots ou AOF (Append Only File). Suporta pub/sub, Lua scripting, clustering.";
      } else if (message.includes('vantagens')) {
        return "Vantagens do Redis: latência ultra-baixa (<1ms), alta throughput (100K+ ops/sec), estruturas de dados ricas, persistência configurável, replicação master-slave, clustering automático, pub/sub nativo, transações com MULTI/EXEC, expire automático de chaves.";
      } else if (message.includes('casos de uso')) {
        return "Casos de uso do Redis: cache de sessões web, cache de consultas de banco, filas de mensagens, leaderboards em tempo real, contadores/métricas, rate limiting, cache de objetos, sessões distribuídas, pub/sub para notificações.";
      } else {
        return "Redis é um banco de dados in-memory key-value, usado como cache, message broker e armazenamento de sessão. Usado por Twitter, GitHub, Instagram. Características: latência sub-milissegundo, estruturas de dados avançadas, persistência opcional, clustering, pub/sub.";
      }
    }

    // Elasticsearch
    if (message.includes('elasticsearch') || message.includes('elastic search') || mainTerm.includes('elasticsearch')) {
      if (message.includes('como funciona')) {
        return "Elasticsearch usa Apache Lucene para indexação full-text. Arquitetura distribuída: nodes, clusters, indices, shards, replicas. Documentos JSON armazenados em índices invertidos. API REST para todas as operações. Query DSL para buscas complexas, aggregations para analytics.";
      } else if (message.includes('vantagens')) {
        return "Vantagens do Elasticsearch: busca full-text extremamente rápida, análise de dados em tempo real, escalabilidade horizontal automática, API REST simples, agregações poderosas, tolerância a falhas, integração com Kibana para visualização, suporte a geolocalização.";
      } else if (message.includes('casos de uso')) {
        return "Casos de uso do Elasticsearch: busca em e-commerce, análise de logs (ELK stack), monitoramento de aplicações, business intelligence, busca em documentos, análise de métricas, detecção de anomalias, search-as-you-type.";
      } else {
        return "Elasticsearch é um mecanismo de busca e análise distribuído baseado em Lucene. Usado por Wikipedia, GitHub, Netflix. Características: busca full-text, análise em tempo real, API REST, agregações, geo-queries, machine learning integrado.";
      }
    }

    // Apache Cassandra
    if (message.includes('cassandra') || message.includes('apache cassandra') || mainTerm.includes('cassandra')) {
      if (message.includes('como funciona')) {
        return "Cassandra usa arquitetura masterless peer-to-peer com consistent hashing. Dados distribuídos em nodes via partition key. Replicação configurável por datacenter. Consistency levels ajustáveis (ONE, QUORUM, ALL). CQL (Cassandra Query Language) similar ao SQL.";
      } else if (message.includes('vantagens')) {
        return "Vantagens do Cassandra: alta disponibilidade (99.999%), escalabilidade linear, performance constante com crescimento, tolerância a falhas de datacenter, escritas otimizadas, replicação multi-datacenter, sem single point of failure.";
      } else if (message.includes('casos de uso')) {
        return "Casos de uso do Cassandra: IoT e séries temporais, sistemas de recomendação, logs de aplicações em larga escala, dados de sensores, mensageria, catálogos de produtos, analytics em tempo real, sistemas que precisam de 99.999% uptime.";
      } else {
        return "Apache Cassandra é um banco NoSQL distribuído projetado para alta disponibilidade sem single point of failure. Usado por Netflix, Facebook, Twitter. Características: arquitetura masterless, consistent hashing, replicação multi-datacenter, CQL.";
      }
    }

    // CouchDB
    if (message.includes('couchdb') || message.includes('couch') || message.includes('base de sofá')) {
      if (message.includes('como funciona')) {
        return "CouchDB armazena documentos JSON com _id e _rev únicos. Usa MVCC para concorrência. API RESTful completa (GET, POST, PUT, DELETE). Map/Reduce para views. Replicação bi-direcional eventual. Conflict resolution automático.";
      } else if (message.includes('vantagens')) {
        return "Vantagens do CouchDB: replicação offline-first, API REST simples, ACID ao nível do documento, conflict resolution automático, schema-free, views incrementais com Map/Reduce, replicação master-master, tolerância a partições de rede.";
      } else {
        return "CouchDB é um banco NoSQL orientado a documentos com foco em replicação e disponibilidade offline. Criado pela Apache Foundation. Características: documentos JSON, API REST, replicação bi-direcional, MVCC, views Map/Reduce.";
      }
    }

    // DynamoDB
    if (message.includes('dynamodb') || message.includes('dynamo') || mainTerm.includes('dynamodb')) {
      if (message.includes('como funciona')) {
        return "DynamoDB usa hash/range keys para distribuição. Partition key determina a partição; sort key ordena itens. Consistency: eventually consistent (padrão) ou strongly consistent. Auto-scaling baseado em RCU/WCU. Global tables para multi-região.";
      } else if (message.includes('vantagens')) {
        return "Vantagens do DynamoDB: performance previsível (<10ms), auto-scaling automático, backup automático, integração nativa AWS, zero administração, global tables, streams para triggers, encryption at rest, pay-per-use pricing.";
      } else if (message.includes('limitações')) {
        return "Limitações do DynamoDB: queries limitadas (apenas por keys), item máximo 400KB, sem joins nativos, vendor lock-in AWS, custos podem ser altos para workloads específicos, limited querying capabilities comparado a SQL.";
      } else {
        return "DynamoDB é um banco NoSQL totalmente gerenciado pela AWS, focado em performance e escala. Usado por Lyft, Samsung, Toyota. Características: latência de milissegundos, auto-scaling, backup automático, global tables, zero administration.";
      }
    }

    // Microsoft SQL Server
    if (message.includes('sql server') || message.includes('microsoft sql') || mainTerm.includes('sql server')) {
      if (message.includes('como funciona')) {
        return "SQL Server usa arquitetura multi-threaded com buffer pool para cache. Componentes: Database Engine, Analysis Services, Reporting Services, Integration Services. T-SQL como linguagem. Always On para alta disponibilidade. Columnstore indexes para analytics.";
      } else if (message.includes('vantagens')) {
        return "Vantagens do SQL Server: integração profunda com ecosistema Microsoft, ferramentas avançadas (SSMS, SSIS, SSRS), performance enterprise, Always On availability groups, in-memory OLTP, advanced analytics com R/Python, security robusta.";
      } else if (message.includes('edições') || message.includes('versões')) {
        return "Edições do SQL Server: Express (gratuita, 10GB), Standard (funcionalidades completas), Enterprise (recursos avançados), Developer (gratuita para dev/test). SQL Server on Linux disponível. Azure SQL como cloud option.";
      } else {
        return "Microsoft SQL Server é um RDBMS enterprise da Microsoft. Usado por Stack Overflow, Xerox, Honeywell. Características: T-SQL, Always On, columnstore indexes, in-memory OLTP, integration services, reporting services, analysis services.";
      }
    }

    // === PROGRAMAÇÃO ===
    
    if (message.includes('javascript') || message.includes('js')) {
      if (message.includes('como aprender') || message.includes('estudar')) {
        return "Roteiro para aprender JavaScript: 1) Sintaxe básica (variáveis, tipos, operadores), 2) Estruturas de controle (if, loops, switch), 3) Funções e escopo, 4) Arrays e objetos, 5) DOM manipulation, 6) Promises e async/await, 7) ES6+ features, 8) Node.js basics, 9) Framework (React/Vue), 10) Projetos práticos.";
      } else if (message.includes('frameworks') || message.includes('bibliotecas')) {
        return "Principais frameworks JavaScript: React (Facebook, component-based UI), Vue.js (progressive framework), Angular (Google, full framework), Node.js (server-side), Express.js (web server), Next.js (React full-stack), Nuxt.js (Vue full-stack), Svelte (compile-time optimization).";
      } else if (message.includes('es6') || message.includes('es2015')) {
        return "ES6/ES2015 principais features: arrow functions (=>), template literals (`${}`), destructuring assignment, let/const, classes, modules (import/export), promises, spread operator (...), default parameters, for...of loops, Map/Set collections.";
      } else {
        return "JavaScript é uma linguagem de programação dinâmica, interpretada, multi-paradigma. Criada em 1995 por Brendan Eich. Características: tipagem dinâmica, first-class functions, closures, prototype-based OOP, event-driven, single-threaded com event loop.";
      }
    }

    // === INTELIGÊNCIA ARTIFICIAL ===
    
    if (message.includes('inteligência artificial') || message.includes('ia') || message.includes('machine learning')) {
      if (message.includes('como funciona') || message.includes('funcionamento')) {
        return "IA funciona através de algoritmos que aprendem padrões em dados. Processo: 1) Coleta de dados, 2) Pré-processamento, 3) Escolha do algoritmo, 4) Treinamento do modelo, 5) Validação, 6) Deploy, 7) Monitoramento. Machine Learning usa estatística e otimização; Deep Learning usa redes neurais multicamadas.";
      } else if (message.includes('tipos') || message.includes('categorias')) {
        return "Tipos de IA: 1) Narrow AI (específica, atual), 2) General AI (AGI, hipotética), 3) Superintelligence (teórica). Por aprendizado: Supervised Learning, Unsupervised Learning, Reinforcement Learning. Aplicações: NLP, Computer Vision, Robotics, Expert Systems.";
      } else if (message.includes('algoritmos')) {
        return "Principais algoritmos de ML: Linear Regression, Logistic Regression, Decision Trees, Random Forest, SVM, K-Means, Neural Networks, Deep Learning (CNN, RNN, LSTM, Transformers), Gradient Boosting, Naive Bayes, K-NN.";
      } else {
        return "Inteligência Artificial é a simulação de inteligência humana em máquinas. Subcampos: Machine Learning, Deep Learning, NLP, Computer Vision, Robotics. Aplicações: assistentes virtuais, carros autônomos, diagnóstico médico, recomendações, tradução automática.";
      }
    }

    // === RESPOSTAS CONVERSACIONAIS ===
    
    if (message.includes('obrigado') || message.includes('obrigada') || message.includes('valeu')) {
      return "Por nada! Estou aqui para fornecer informações precisas e úteis. Se tiver mais dúvidas técnicas ou quiser aprofundar algum tópico, fique à vontade!";
    }
    
    if (message.includes('tchau') || message.includes('até logo') || message.includes('adeus')) {
      return "Até logo! Foi um prazer ajudar com informações técnicas. Volte sempre que precisar de esclarecimentos precisos sobre tecnologia, bancos de dados ou programação!";
    }

    // Resposta para perguntas não cobertas
    if (isQuestion) {
      return `Não tenho informações específicas sobre "${mainTerm}" em minha base de conhecimento atual. Posso ajudar com tópicos como bancos de dados (MySQL, PostgreSQL, MongoDB, Redis, etc.), programação JavaScript, ou inteligência artificial. Pode reformular sua pergunta ou escolher um desses temas?`;
    }

    return "Sou especializado em fornecer informações técnicas precisas sobre bancos de dados, programação e tecnologia. Em que posso ajudá-lo especificamente?";
  }
}
