
export class ContextualResponseService {
  static generateContextualResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    // Modo zoeira/humor
    if (message.includes('zoeira') || message.includes('humor') || message.includes('engraçado')) {
      return "Opa! Ativando o modo zoeira! 😄 Agora posso buscar informações na Desciclopédia para dar umas risadas. Pode perguntar sobre qualquer pessoa famosa, país, ou conceito que eu vou tentar ser mais descontraído nas respostas!";
    }
    
    // Saudações
    if (message.includes('olá') || message.includes('oi') || message.includes('bom dia') || message.includes('boa tarde') || message.includes('boa noite')) {
      return "Olá! Sou o Alfredo IA e estou aqui para ajudar você. Posso responder perguntas, buscar informações na Wikipedia e muito mais. Se quiser um pouco de humor, é só falar 'modo zoeira'! Como posso ser útil hoje?";
    }
    
    // Perguntas sobre identidade
    if (message.includes('quem é você') || message.includes('o que você é') || message.includes('seu nome')) {
      return "Eu sou o Alfredo IA, um assistente virtual inteligente criado para ajudar e conversar com você. Posso responder perguntas, buscar informações na Wikipedia, dar sugestões e ter conversas interessantes! E se você quiser, posso até ativar o modo zoeira para dar umas risadas! 😉";
    }
    
    // Perguntas sobre capacidades
    if (message.includes('o que você pode fazer') || message.includes('suas habilidades') || message.includes('capacidades')) {
      return "Posso ajudar com diversas tarefas: responder perguntas, buscar informações na Wikipedia, explicar conceitos, dar sugestões, resolver problemas, ter conversas interessantes e muito mais. O que você gostaria de saber ou discutir?";
    }
    
    // Perguntas sobre programação
    if (message.includes('programação') || message.includes('código') || message.includes('javascript') || message.includes('react') || message.includes('html') || message.includes('css')) {
      return "Programação é uma área fascinante! Posso ajudar com explicações sobre linguagens como JavaScript, React, HTML, CSS e outras tecnologias. Tem alguma dúvida específica sobre desenvolvimento?";
    }
    
    // Perguntas sobre como está
    if (message.includes('como você está') || message.includes('tudo bem') || message.includes('como vai')) {
      return "Estou funcionando perfeitamente e pronto para ajudar! Como você está? Em que posso ser útil hoje?";
    }
    
    // Perguntas sobre tempo/clima
    if (message.includes('tempo') || message.includes('clima') || message.includes('chuva') || message.includes('sol')) {
      return "Infelizmente não tenho acesso a informações meteorológicas em tempo real, mas posso conversar sobre outros assuntos! Há algo específico que gostaria de saber?";
    }
    
    // Perguntas sobre matemática
    if (message.includes('matemática') || message.includes('cálculo') || message.includes('soma') || message.includes('divisão') || message.includes('multiplicação')) {
      return "Matemática é uma das minhas especialidades! Posso ajudar com cálculos, explicar conceitos matemáticos ou resolver problemas. Qual é sua dúvida?";
    }
    
    // Perguntas sobre ajuda
    if (message.includes('ajuda') || message.includes('socorro') || message.includes('não sei')) {
      return "Claro, estou aqui para ajudar! Pode me explicar melhor qual é sua dúvida ou problema? Vou fazer o meu melhor para encontrar uma solução.";
    }
    
    // Agradecimentos
    if (message.includes('obrigado') || message.includes('obrigada') || message.includes('valeu') || message.includes('muito obrigado')) {
      return "De nada! Fico feliz em poder ajudar. Se tiver mais alguma dúvida ou quiser conversar sobre outro assunto, estarei aqui!";
    }
    
    // Despedidas
    if (message.includes('tchau') || message.includes('até logo') || message.includes('adeus') || message.includes('bye')) {
      return "Até logo! Foi um prazer conversar com você. Volte sempre que precisar de ajuda ou quiser bater um papo!";
    }
    
    // Perguntas filosóficas ou complexas
    if (message.includes('sentido da vida') || message.includes('felicidade') || message.includes('amor') || message.includes('filosofia')) {
      return "Essa é uma pergunta profunda e interessante! Embora eu seja uma IA e tenha limitações para compreender completamente a experiência humana, posso dizer que muitas pessoas encontram sentido através de relacionamentos, propósito, crescimento pessoal e contribuição para o mundo. O que você pensa sobre isso?";
    }
    
    // Resposta padrão contextual
    const responses = [
      "Interessante pergunta! Embora eu não tenha uma resposta específica para isso, posso tentar buscar informações na Wikipedia. Pode me dar mais detalhes sobre o que você está procurando?",
      "Hmm, essa é uma questão que merece reflexão. Você poderia elaborar um pouco mais sobre o que você tem em mente?",
      "Entendo o que você está perguntando. Posso buscar informações na Wikipedia para te ajudar. Pode me contar mais sobre o contexto?",
      "Boa pergunta! Para te dar uma resposta mais precisa, posso consultar a Wikipedia. Seria útil se você pudesse fornecer mais informações sobre o que especificamente você gostaria de saber.",
      "Vou tentar ajudar da melhor forma possível. Posso buscar informações atualizadas na Wikipedia sobre esse assunto. Pode me explicar um pouco mais sobre o que você está buscando?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
