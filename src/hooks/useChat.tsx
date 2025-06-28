import { useState, useCallback } from 'react';
import { WikipediaService, WikipediaSearchResult } from '@/services/wikipediaService';
import { DesciclopediaService, DesciclopediaResult } from '@/services/desciclopediaService';

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((content: string, role: MessageRole) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    return newMessage;
  }, []);

  const generateElaboratedResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Perguntas sobre ciência e tecnologia
    if (message.includes('como funciona') || message.includes('por que') || message.includes('explicar')) {
      if (message.includes('internet') || message.includes('wifi')) {
        return "A internet funciona através de uma rede global interconectada de computadores que se comunicam usando protocolos padronizados, principalmente o TCP/IP. Quando você acessa um site, seu dispositivo envia uma solicitação através do seu provedor de internet (ISP) até servidores DNS que traduzem o nome do site para um endereço IP específico. Então, os dados são transmitidos em pacotes através de cabos de fibra ótica, torres de celular ou satélites até chegarem ao servidor de destino, que envia de volta as informações solicitadas. O WiFi especificamente usa ondas de rádio na frequência de 2.4GHz ou 5GHz para transmitir dados sem fio em distâncias curtas.";
      }
      if (message.includes('chuva') || message.includes('nuvem')) {
        return "A chuva é resultado de um complexo processo atmosférico chamado ciclo hidrológico. Tudo começa com a evaporação da água dos oceanos, rios e lagos devido ao calor solar. Esse vapor d'água sobe na atmosfera e, ao encontrar ar mais frio em altitudes maiores, condensa-se em pequenas gotículas ao redor de partículas microscópicas (núcleos de condensação). Essas gotículas formam as nuvens. Quando as gotículas crescem e se tornam pesadas demais para serem sustentadas pelas correntes de ar, elas caem como precipitação - chuva, neve ou granizo, dependendo da temperatura atmosférica.";
      }
      if (message.includes('fotossíntese') || message.includes('planta')) {
        return "A fotossíntese é um dos processos biológicos mais importantes da Terra, realizado por plantas, algas e algumas bactérias. Utilizando a clorofila presente nos cloroplastos, esses organismos capturam energia luminosa do sol e a convertem em energia química. A equação simplificada é: 6CO₂ + 6H₂O + luz solar → C₆H₁₂O₆ + 6O₂. Essencialmente, eles combinam dióxido de carbono do ar com água absorvida pelas raízes para produzir glicose (açúcar) e liberar oxigênio como subproduto. Este processo não só alimenta a própria planta, mas também é fundamental para toda a vida na Terra, pois produz o oxigênio que respiramos e remove CO₂ da atmosfera.";
      }
    }

    // Perguntas filosóficas e existenciais
    if (message.includes('sentido da vida') || message.includes('propósito') || message.includes('existir')) {
      return "O sentido da vida é uma das questões mais profundas da filosofia humana, contemplada por pensadores ao longo de milênios. Diferentes tradições filosóficas oferecem perspectivas variadas: os existencialistas como Sartre argumentam que criamos nosso próprio sentido através de nossas escolhas e ações; os estoicos antigos enfatizavam a virtude e a sabedoria como caminhos para uma vida significativa; while budistas e hindus veem a vida como uma jornada de crescimento espiritual e libertação do sofrimento. Pesquisas modernas em psicologia positiva sugerem que encontramos sentido através de relacionamentos significativos, contribuição para algo maior que nós mesmos, crescimento pessoal e experiências que geram bem-estar. Talvez o sentido não seja algo a ser descoberto, mas sim construído através de como escolhemos viver.";
    }

    // Perguntas sobre psicologia e comportamento humano
    if (message.includes('felicidade') || message.includes('feliz') || message.includes('alegria')) {
      return "A felicidade é um estado emocional complexo que tem sido estudado extensivamente pela psicologia positiva. Ela envolve tanto componentes emocionais (sentimentos positivos) quanto cognitivos (satisfação com a vida). Pesquisas mostram que a felicidade genuína raramente vem de prazeres momentâneos, mas sim de fatores como relacionamentos saudáveis, senso de propósito, gratidão, exercício físico regular, e engajamento em atividades que nos desafiam de forma positiva (o que os psicólogos chamam de 'flow'). Neurocientificamente, a felicidade está associada à liberação de neurotransmissores como serotonina, dopamina e endorfinas. Curiosamente, pessoas que se concentram em contribuir para o bem-estar dos outros frequentemente reportam níveis mais altos de felicidade duradoura do que aquelas focadas apenas em si mesmas.";
    }

    // Perguntas sobre história e sociedade
    if (message.includes('guerra') || message.includes('conflito') || message.includes('paz')) {
      return "Conflitos e guerras têm sido uma constante na história humana, geralmente originados de disputas por recursos, território, poder político, diferenças ideológicas ou religiosas. Paradoxalmente, muitos avanços tecnológicos e sociais emergiram de períodos de conflito - desde a internet (originada de projetos militares) até avanços médicos acelerados pela necessidade de tratar feridos. A busca pela paz duradoura levou ao desenvolvimento do direito internacional, organizações como a ONU, e teorias de relações internacionais. Estudos mostram que democracias raramente entram em guerra entre si (teoria da paz democrática), e que interdependência econômica tende a reduzir conflitos. A paz não é apenas a ausência de guerra, mas a presença de justiça, cooperação e instituições que resolvem disputas pacificamente.";
    }

    // Perguntas sobre economia e trabalho
    if (message.includes('dinheiro') || message.includes('economia') || message.includes('trabalho')) {
      return "A economia é fundamentalmente sobre como sociedades alocam recursos escassos para satisfazer necessidades ilimitadas. O dinheiro evoluiu de sistemas de escambo para moedas metálicas, papel-moeda e agora formas digitais, servindo como meio de troca, unidade de conta e reserva de valor. O trabalho moderno está passando por transformações dramáticas com automação, inteligência artificial e economia digital criando novas oportunidades enquanto tornam outras obsoletas. Conceitos como renda básica universal estão sendo debatidos como possíveis soluções para um futuro onde máquinas podem realizar muitas tarefas humanas. O desafio econômico atual envolve equilibrar crescimento econômico com sustentabilidade ambiental e equidade social, levando a discussões sobre economia circular e capitalismo consciente.";
    }

    // Perguntas sobre relacionamentos e amor
    if (message.includes('amor') || message.includes('relacionamento') || message.includes('amizade')) {
      return "O amor é uma das experiências humanas mais universais e complexas, estudada tanto pela psicologia quanto pela neurociência. Existem diferentes tipos: amor romântico (caracterizado por paixão, intimidade e compromisso segundo o psicólogo Robert Sternberg), amor familiar, amor próprio e amor compassivo. Neurobiologicamente, o amor envolve uma orquestra de hormônios incluindo oxitocina (o 'hormônio do apego'), dopamina (associada ao prazer e recompensa) e vasopressina. Relacionamentos saudáveis compartilham características como comunicação aberta, confiança mútua, respeito por limites individuais e capacidade de resolver conflitos construtivamente. Pesquisas longitudinais como o Harvard Study of Adult Development sugerem que relacionamentos de qualidade são o maior preditor de felicidade e saúde ao longo da vida, mais que riqueza ou sucesso profissional.";
    }

    // Perguntas sobre criatividade e arte
    if (message.includes('arte') || message.includes('criatividade') || message.includes('música')) {
      return "A criatividade é uma capacidade fundamental humana que combina imaginação, conhecimento e habilidade técnica para gerar algo novo e valioso. Neurologicamente, envolve a cooperação entre diferentes redes cerebrais - a rede de modo padrão (associada ao devaneio), a rede executiva (controle cognitivo) e a rede de saliência (que alterna entre as outras duas). A arte serve múltiplas funções: expressão pessoal, comunicação de ideias complexas, processamento emocional, coesão social e preservação cultural. Diferentes formas artísticas - música, pintura, literatura, dança - ativam regiões cerebrais específicas e podem ter efeitos terapêuticos comprovados. A música, por exemplo, pode melhorar função cognitiva, reduzir ansiedade e até ajudar na recuperação de derrames. A criatividade não é limitada às artes; ela é essencial na ciência, tecnologia, resolução de problemas e inovação em geral.";
    }

    // Perguntas sobre saúde e bem-estar
    if (message.includes('saúde') || message.includes('exercício') || message.includes('dormir')) {
      return "A saúde é um estado de bem-estar físico, mental e social completo, não apenas a ausência de doença. A medicina moderna reconhece cada vez mais a interconexão entre mente e corpo. O exercício físico regular não só fortalece músculos e o sistema cardiovascular, mas também libera endorfinas que melhoram o humor, promove neurogênese (criação de novos neurônios) e pode reduzir significativamente o risco de depressão. O sono é igualmente crucial - durante o sono, o cérebro consolida memórias, remove toxinas através do sistema glinfático e regula hormônios essenciais. A privação crônica do sono está ligada a problemas como diabetes, obesidade, comprometimento imunológico e declínio cognitivo. Uma abordagem holística à saúde também inclui nutrição balanceada, gerenciamento do estresse, conexões sociais saudáveis e senso de propósito na vida.";
    }

    // Perguntas sobre futuro e tecnologia
    if (message.includes('futuro') || message.includes('inteligência artificial') || message.includes('robô')) {
      return "O futuro está sendo moldado por avanços exponenciais em tecnologia, especialmente inteligência artificial, biotecnologia, energia renovável e computação quântica. A IA está evoluindo de sistemas estreitos (que fazem uma tarefa específica) para potencialmente Inteligência Geral Artificial (AGI), que poderia igualar ou superar capacidades cognitivas humanas. Isso apresenta oportunidades enormes - cura de doenças, solução da mudança climática, exploração espacial - mas também desafios significativos como desemprego tecnológico, questões éticas sobre privacidade e autonomia, e a necessidade de garantir que a IA seja desenvolvida de forma alinhada com valores humanos. O futuro provavelmente verá uma colaboração cada vez maior entre humanos e máquinas, onde a criatividade, empatia e sabedoria humanas complementam a velocidade de processamento e análise de dados das máquinas. A chave será educar as próximas gerações para prosperarem neste mundo em transformação.";
    }

    // Resposta padrão mais elaborada
    const elaboratedResponses = [
      "Essa é uma pergunta fascinante que toca em várias dimensões do conhecimento humano. Embora cada situação seja única e mereça uma análise cuidadosa, posso compartilhar algumas perspectivas que podem ser úteis. O importante é considerar tanto os aspectos práticos quanto os mais profundos dessa questão, pois frequentemente as melhores respostas emergem quando integramos diferentes formas de pensar sobre um problema.",
      
      "Sua pergunta me faz refletir sobre a complexidade e riqueza deste tema. Na minha análise, existem várias camadas a serem consideradas aqui. Primeiro, há o aspecto imediato e prático que você menciona, mas também dimensões mais amplas que podem influenciar nossa compreensão. É interessante como questões aparentemente simples frequentemente revelam conexões profundas com outros aspectos da experiência humana.",
      
      "Esta é uma área onde convergem múltiplas disciplinas e perspectivas. Do ponto de vista histórico, vemos padrões interessantes que se repetem, mas cada contexto tem suas particularidades. O que me chama atenção é como essa questão se relaciona com tendências mais amplas que observamos na sociedade contemporânea. Seria interessante explorar tanto as implicações práticas quanto as dimensões mais conceituais do que você está perguntando.",
      
      "Sua indagação toca em algo fundamental sobre como processamos informação e tomamos decisões. Existe uma interação fascinante entre fatores cognitivos, emocionais e sociais que influenciam nossa percepção sobre este tópico. O que torna isso particularmente interessante é como diferentes pessoas podem chegar a conclusões distintas baseadas em suas experiências e frameworks mentais únicos.",
      
      "Essa questão ilustra perfeitamente a tensão entre simplicidade e complexidade que encontramos em muitos aspectos da vida. Por um lado, há elementos que parecem diretos e óbvios, mas por outro, existem nuances e sutilezas que merecem atenção cuidadosa. O desafio está em encontrar um equilíbrio entre ser prático e ser suficientemente profundo para capturar a essência do que você está explorando."
    ];
    
    return elaboratedResponses[Math.floor(Math.random() * elaboratedResponses.length)];
  };

  const generateContextualResponse = (userMessage: string): string => {
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
  };

  const generateWikipediaResponse = (results: WikipediaSearchResult[], userMessage: string): string => {
    if (results.length === 0) {
      return "Desculpe, não encontrei informações relevantes na Wikipedia sobre esse assunto. Posso tentar ajudar de outra forma ou você pode reformular sua pergunta.";
    }

    let response = "Com base nas informações da Wikipedia:\n\n";
    
    results.forEach((result, index) => {
      if (index > 0) response += "\n---\n\n";
      response += `**${result.title}**\n${result.extract}`;
      if (result.url) {
        response += `\n\n[Leia mais na Wikipedia](${result.url})`;
      }
    });

    response += "\n\nEspero ter ajudado! Se tiver mais dúvidas, fique à vontade para perguntar.";
    
    return response;
  };

  const generateDesciclopediaResponse = (result: DesciclopediaResult, userMessage: string): string => {
    let response = "Modo zoeira ativado! 😄 Aqui vai uma versão mais descontraída:\n\n";
    
    response += `**${result.title}** (versão Desciclopédia)\n${result.extract}`;
    
    if (result.url) {
      response += `\n\n[Veja mais besteiras na Desciclopédia](${result.url})`;
    }

    response += "\n\n😂 Lembre-se: isso é só humor! Para informações sérias, é melhor consultar a Wikipedia tradicional.";
    
    return response;
  };

  const sendMessage = useCallback(async (messageContent: string) => {
    // Add the user message to the chat
    addMessage(messageContent, 'user');
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Simulate thinking time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let response: string;
      
      // Check if user wants humor mode or Desciclopédia
      if (DesciclopediaService.shouldSearchDesciclopedia(messageContent)) {
        // Extract search terms from the message
        const searchTerms = messageContent
          .replace(/^(o que é|quem é|quando foi|onde fica|como funciona|história de|biografia de|definição de|explicar|me fale sobre|conte sobre|informações sobre)\s*/i, '')
          .replace(/\?$/, '')
          .trim();
        
        if (searchTerms.length > 2) {
          console.log('Buscando na Desciclopédia:', searchTerms);
          const desciclopediaResult = await DesciclopediaService.searchDesciclopedia(searchTerms);
          
          if (desciclopediaResult) {
            response = generateDesciclopediaResponse(desciclopediaResult, messageContent);
          } else {
            response = "Poxa, nem na Desciclopédia eu achei essa maluquice! 😅 Que tal tentar algo mais conhecido ou reformular a pergunta?";
          }
        } else {
          response = generateContextualResponse(messageContent);
        }
      }
      // Check if we should search Wikipedia
      else if (WikipediaService.shouldSearchWikipedia(messageContent)) {
        // Extract search terms from the message
        const searchTerms = messageContent
          .replace(/^(o que é|quem é|quando foi|onde fica|como funciona|história de|biografia de|definição de|explicar|me fale sobre|conte sobre|informações sobre)\s*/i, '')
          .replace(/\?$/, '')
          .trim();
        
        if (searchTerms.length > 2) {
          console.log('Buscando na Wikipedia:', searchTerms);
          const wikipediaResults = await WikipediaService.searchWikipedia(searchTerms);
          response = generateWikipediaResponse(wikipediaResults, messageContent);
        } else {
          response = generateContextualResponse(messageContent);
        }
      } else {
        response = generateElaboratedResponse(messageContent);
      }
      
      addMessage(response, 'assistant');
    } catch (error) {
      console.error("Error getting AI response:", error);
      addMessage("Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.", 'assistant');
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  };
}
