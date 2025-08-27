// A função organizador retorna uma lista de quais tipos de imagens são encaixáveis em cada espaço
const organizador = (fase, jogador) => {
    return fase.filter((tamanho, indice) => {
        if (tamanho == 'GG') {
            return jogador[indice] =='GG' || jogador[indice] == 'G' || jogador[indice]== 'MG' || jogador[indice] == 'M' || jogador[indice] == 'P'; 
        }
        else if (tamanho == 'G') {
            return jogador[indice] == 'G' || jogador[indice]== 'MG' || jogador[indice] == 'M' || jogador[indice] == 'P'; 
        }
        else if (tamanho=='MG') {
            return jogador[indice]== 'MG' || jogador[indice] == 'M' || jogador[indice] == 'P'; 
        }
        else if (tamanho == 'M') {
            return jogador[indice] == 'M' || jogador[indice] == 'P';
        }
        else {
            return jogador[indice] == 'P';
        }
    });
}
//Cria uma função que calcula a porcentagem de acerto do jogador, isto é, mede o quão próximo o jogador chegou de organizar seu armário.
//Essa função será implementada na função comparador
const porcentagem = (fase, jogador) => (jogador/fase)*100

// Cria uma função responsável por analisar se o tamanho da lista da fase é igual ao tamanho da lista filtrada pela função 
// organizadora, e então retorna se sim ou não.
const comparador = (fase, jogador) => (a, ...b) => {
    jogador = [a,...b]
    const resultadoOrganizador = organizador(fase,jogador)
    resultadoPorcentagem= porcentagem(fase.length, resultadoOrganizador.length)
    if (resultadoOrganizador.length === fase.length){
        return "Parabéns, você organizou o seu armário!"
    }
    else {return `Continue! Você está ${resultadoPorcentagem.toFixed(0)}% correto` }
}
// A array com o único objeto de estado dentro dela

//estadoAtual armazena os dados atuais da fase, ou seja, onde cada imagem está e quais as características de cada imagem
const estadoAtual = [{
    // "imagens" armazena os dados das imagens
    imagens: {
        'img1': { src: 'Pelúcias.png', alt: 'Pelúcias', tamanho: 'GG', peso: 2 },
        'img2': { src: 'Cosmético1.png', alt: 'Cosmético', tamanho: 'P', peso: 1 },
        'img3': { src: 'caixas.png', alt: 'Caixas', tamanho: 'G', peso: 3 },
        'img4': { src: 'roupas.png', alt: 'Roupas', tamanho: 'P', peso: 2 },
        'img5': { src: 'panos.png', alt: 'Panos', tamanho: 'M', peso: 2 },
        'img6': { src: 'FerroDePassar.png', alt: 'Ferro 2D', tamanho: 'P', peso: 4 },
        'img7': { src: 'Livros.png', alt: 'Livro', tamanho: 'P', peso: 3 },
        'img8': { src: 'bone-capivara.png', alt: 'Boné de capivara', tamanho: 'P', peso: 1 },
        'img9': { src: 'mochila.png', alt: 'Mochila', tamanho: 'MG', peso: 3 },
        'img10': { src: 'roupasdobradas.png', alt: 'Roupas dobradas', tamanho: 'MG', peso: 2 },
        'img11': { src: 'relogio.png', alt: 'Relógio', tamanho: 'P', peso: 1 },
        'img12': { src: 'carteira.png', alt: 'Carteira', tamanho: 'P', peso: 1 },
        'img13': { src: 'cueca.png', alt: 'Cueca', tamanho: 'P', peso: 1 },
        'img14': { src: 'espelho.png', alt: 'Espelho', tamanho: 'MG', peso: 3 },
        'img15': { src: 'fone.png', alt: 'Fone', tamanho: 'P', peso: 2 },
        'img16': { src: 'tenis.png', alt: 'Tenis', tamanho: 'P', peso: 2 },
        'img17': { src: 'roupas1.png', alt: 'Roupas', tamanho: 'P', peso: 2 },
        'img18': { src: 'cestoRoupas.png', alt: 'Roupas', tamanho: 'P', peso: 2 },
        'img19': { src: 'Peso.png', alt: 'Peso', tamanho: 'P', peso: 5 },
        'img20': { src: 'Halter.png', alt: 'Halter', tamanho: 'P', peso: 5 },
        'img21': { src: 'Pelúcias2.png', alt: 'Pelúcias', tamanho: 'GG', peso: 2 },
        'img22': { src: 'Pelúcias3.png', alt: 'Pelúcias', tamanho: 'M', peso: 2 },
        'img23': { src: 'mochila2.png', alt: 'Mochila', tamanho: 'MG', peso: 3 },
        'img24': { src: 'Cobertor.png', alt: 'Cobertor', tamanho: 'P', peso: 2 },
        'img25': { src: 'Cosmético2.png', alt: 'Cosmético', tamanho: 'P', peso: 1 },
        'img26': { src: 'Livros2.png', alt: 'Livro', tamanho: 'P', peso: 3 },
        'img27': { src: 'Bola.png', alt: 'Bola', tamanho: 'M', peso: 3 },
        'img28': { src: 'Bola2.png', alt: 'Bola', tamanho: 'M', peso: 3 },
        'img29': { src: 'tenis2.png', alt: 'Tênis', tamanho: 'P', peso: 2 },
        'img30': { src: 'tenis3.png', alt: 'Tênis', tamanho: 'P', peso: 2 },
        'img31': { src: 'troféu.png', alt: 'Troféu', tamanho: 'GG', peso: 5 },
    },
    // "zonas" armazena os dados das zonas (os IDs das imagens que estão em cada zona)
    zonas: {
        'galeria-esquerda': { imagens: ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8', 'img9', 'img10', 'img11', 'img12', 'img13', 'img14', 'img15', 'img16',], tamanho: 'GG' },
        'galeria-direita': { imagens: ['img17', 'img18', 'img19', 'img20', 'img21', 'img22', 'img23', 'img24', 'img25', 'img26', 'img27', 'img28', 'img29', 'img30', 'img31'], tamanho: 'GG' },

        // Coluna 1 (mais à esquerda - ideal para muito pesados)
        'col1-dz1': { imagens: [], tamanho: 'MG', pesoIdeal: 4 },
        'col1-dz2': { imagens: [], tamanho: 'MG', pesoIdeal: 5 },

        // Coluna 2 (ideal para pesados)
        'col2-dz1': { imagens: [], tamanho: 'MG', pesoIdeal: 4 },
        'col2-dz2': { imagens: [], tamanho: 'MG', pesoIdeal: 5 },

        // Coluna 3 (central - ideal para pesos variados/leves)
        'col3-dz1': { imagens: [], tamanho: 'GG', pesoIdeal: 4 },
        'col3-dz2': { imagens: [], tamanho: 'P', pesoIdeal: 1 },
        'col3-dz3': { imagens: [], tamanho: 'P', pesoIdeal: 1 },
        'col3-dz4': { imagens: [], tamanho: 'P', pesoIdeal: 1 },
        'col3-dz5': { imagens: [], tamanho: 'M', pesoIdeal: 3 },

        // Coluna 4 (ideal para leves)
        'col4-dz1': { imagens: [], tamanho: 'P', pesoIdeal: 3 },
        'col4-dz2': { imagens: [], tamanho: 'G', pesoIdeal: 5 },

        // Coluna 5 (mais à direita - ideal para muito leves)
        'col5-dz1': { imagens: [], tamanho: 'P', pesoIdeal: 3 },
        'col5-dz2': { imagens: [], tamanho: 'P', pesoIdeal: 2 },
        'col5-dz3': { imagens: [], tamanho: 'P', pesoIdeal: 2 },
        'col5-dz4': { imagens: [], tamanho: 'P', pesoIdeal: 2 },
        'col5-dz5': { imagens: [], tamanho: 'M', pesoIdeal: 5 }
    },
    // "imagemSendoArrastada" armazena o ID da imagem que o jogador está segurando
    imagemSendoArrastada: null,
    // "zonaEmHover" armazena o ID da zona em que o usuário está com o cursor sobre
    zonaEmHover: null,
    // Salva a zona de onde a imagem começou a ser arrastada (para devolver) **
    zonaDeOrigem: null
}];

// Adicionei a função hierarquiaTamanhos para facilitar a comparação
const hierarquiaTamanhos = {
    'P': 1,
    'M': 2,
    'MG': 3,
    'G': 4,
    'GG':5
};

// obterTamanhosAtuais mapeia o estadoAtual para saber qual o tamanho de cada imagem colocada sobre cada drop zone do armário
const obterTamanhosAtuais = (estado) => {
    // Define a ordem correta das drop zones para a comparação
    const ordemDasZonas = [
        'col1-dz1', 'col1-dz2',
        'col2-dz1', 'col2-dz2', 
        'col3-dz1', 'col3-dz2', 'col3-dz3', 'col3-dz4', 'col3-dz5',
        'col4-dz1', 'col4-dz2', 
        'col5-dz1', 'col5-dz2', 'col5-dz3', 'col5-dz4', 'col5-dz5'
    ];

    // Percorre a ordem definida e monta a lista de tamanhos
    const listaDeTamanhos = ordemDasZonas.map(zonaId => {
        // idDaImagem armazena o dado da imagem que está em determinada zona específica do mapeamento
        const idDaImagem = estado.zonas[zonaId]?.imagens[0]; // imagens é uma array, então seu conteúdo é acessado pelo índice
        // Se não tiver nenhuma imagem, retorna um valor nulo
        if (!idDaImagem) {
            return null;
        }
        // "imagem" armazena os dados da imagem colocada sobre a zona
        const imagem = estado.imagens[idDaImagem];
        // retorna o tamanho da imagem, se houver uma imagem
        return imagem ? imagem.tamanho : null;
    });

    return listaDeTamanhos;
};

// Quando for chamada, puxa do estado atual os dados 'peso' e 'pesoIdeal' para avaliar a pontuação do jogador
const pontuação = (estado) => {
    //puxa as zonas a serem avaliadas (todas do container do armário)
    const ordemDasZonas = [
        'col1-dz1', 'col1-dz2',
        'col2-dz1', 'col2-dz2', 
        'col3-dz1', 'col3-dz2', 'col3-dz3', 'col3-dz4', 'col3-dz5',
        'col4-dz1', 'col4-dz2', 
        'col5-dz1', 'col5-dz2', 'col5-dz3', 'col5-dz4', 'col5-dz5'
    ]

    // para cada imagem armazenada nessas zonas, armazena seu peso, se não houver imagem, armazena um valor nulo
    const pesoImagensZona = ordemDasZonas.map(zonaID => {
        const idDaImagem = estado.zonas[zonaID]?.imagens[0]
        if (!idDaImagem) {return null}
        const imagem = estado.imagens[idDaImagem]
        return imagem['peso']
    })

    // para cada zona, armazena o seu peso ideal
    const pesoIdealZonas = ordemDasZonas.map(zonaID => {
        return estado.zonas[zonaID].pesoIdeal
    })

    // função que calcula, acumulando de imagem a imagem, a pontuação obtida do jogador
    const resultado = (pesoImagensZona, pesoIdealZonas) => {
        if (pesoIdealZonas.length === 0) {
            return 0
        }
        const ultimoPesoImagem = pesoImagensZona[pesoIdealZonas.length - 1]
        const ultimoPesoIdeal = pesoIdealZonas[pesoIdealZonas.length - 1]
        const restoPesoImagens = pesoImagensZona.slice(0, pesoIdealZonas.length - 1)
        const restoPesoIdeal = pesoIdealZonas.slice(0, pesoIdealZonas.length - 1)
        if (ultimoPesoImagem === null) {
            return 0 + resultado(restoPesoImagens, restoPesoIdeal);
        }
        if (ultimoPesoImagem === ultimoPesoIdeal) {
            return 400 + resultado(restoPesoImagens, restoPesoIdeal)
        } else if (ultimoPesoImagem < ultimoPesoIdeal) {
            return 225 + resultado(restoPesoImagens, restoPesoIdeal)
        } else { // ultimoPesoImagem > ultimoPesoIdeal
            return 50 + resultado(restoPesoImagens, restoPesoIdeal)
        }

    }
    return resultado(pesoImagensZona, pesoIdealZonas)
}
// "renderizar" transforma os dados/informações do estadoAtual em um objeto com strings para serem usadas no HTML
const renderizar = (estado) => {
    
    // "dropzoneHtmls" cria uma lista com as chaves do container das zonas e aplica a função reduce nela
    // (cada chave é uma zona, seja da galeria ou do armário)
    // faz, no final, uma string para cada zona
    const dropzoneHtmls = Object.keys(estado.zonas).reduce((acc, zonaId) => {

        // htmlDasImagens armazena uma lista com strings HTML com os dados da/das imagens que estão em cada zona
        // (utiliza o ID da imagem para isso)
        const htmlDasImagens = estado.zonas[zonaId].imagens.map(imgId => { 

            // imagem armazena os dados da imagem que está sendo mapeada pelo ID
            const imagem = estado.imagens[imgId];

            // "classeArrastando" verifica se a imagem atual é a que está sendo arrastada ou não e retorna a string 
            // 'arrastando' ou uma string vazia 
            const classeArrastando = (estado.imagemSendoArrastada === imgId) ? 'arrastando' : '';
             
            // retorna a string HTML com todos os dados necessários de uma das imagems.
           return `<img src="${imagem.src}" alt="${imagem.alt}" id="${imgId}" class="imagem-arrastavel tamanho-${imagem.tamanho.toLowerCase()} ${classeArrastando}" draggable="true">`;
        }).join(''); // ".join()" pega o array de strings retornado pelo .map() e o transforma em uma string única

        // a acumuladora armazena os dados completos das imagens como uma string HTML e faz alguns 
        // ajustes (Primeira Letra em Maiúsculo) para o nome da zona com charAt(0).toUpperCase 
        // e zonaId.slice(1).replace(/-/g, ' '), por exemplo
        acc[zonaId] = `<div class="drop-zone" id="${zonaId}"><h2>${zonaId.charAt(0).toUpperCase() + zonaId.slice(1).replace(/-/g, ' ')}</h2>${htmlDasImagens}</div>`;
        // retorna o objeto completo, com todas as zonas processadas
        return acc;
    }, {});
    // a função retorna, no final, um registro de cada zona principal, galeria e armário, e no armário, divide corretamente cada 
    // dado de cada drop zone em seu conteiner/coluna 
    return {
        galeria: `
            <div class="galeria-coluna">${dropzoneHtmls['galeria-esquerda'] || ''}</div>
            <div class="galeria-coluna">${dropzoneHtmls['galeria-direita'] || ''}</div>`,
        armario: `
            <div class="col-container" id="col1-container">${dropzoneHtmls['col1-dz1'] || ''}${dropzoneHtmls['col1-dz2'] || ''}</div>
            <div class="col-container" id="col2-container">${dropzoneHtmls['col2-dz1'] || ''}${dropzoneHtmls['col2-dz2'] || ''}</div>
            <div class="col-container" id="col3-container">${dropzoneHtmls['col3-dz1'] || ''}${dropzoneHtmls['col3-dz2'] || ''}${dropzoneHtmls['col3-dz3'] || ''}${dropzoneHtmls['col3-dz4'] || ''}${dropzoneHtmls['col3-dz5'] || ''}</div>
            <div class="col-container" id="col4-container">${dropzoneHtmls['col4-dz1'] || ''}${dropzoneHtmls['col4-dz2'] || ''}</div>
            <div class="col-container" id="col5-container">${dropzoneHtmls['col5-dz1'] || ''}${dropzoneHtmls['col5-dz2'] || ''}${dropzoneHtmls['col5-dz3'] || ''}${dropzoneHtmls['col5-dz4'] || ''}${dropzoneHtmls['col5-dz5'] || ''}</div>`
    };
};

// Funções que fazem as alterações do estado atual na fase

// "iniciarArrastar" cria um novo estado, armazenando o ID da zona de origem e o ID da imagem que está sendo arrastada
const iniciarArrastar = (estado, idDaImagem, idZonaOrigem) => ({ ...estado, imagemSendoArrastada: idDaImagem, zonaDeOrigem: idZonaOrigem }); // Uso da Zona de origem
// "finalizarArrastar" cria um novo estado, agora sem imagens sendo arrastadas
const finalizarArrastar = (estado) => ({ ...estado, imagemSendoArrastada: null, zonaEmHover: null, zonaDeOrigem: null }); //
// "moverImagem" move a imagem de uma zona para outra, cria um novo estado com essa nova informação
const moverImagem = (estado, idDaZonaDestino) => {
    
    // Coleta o ID da imagem que está sendo arrastada
    const idDaImagem = estado.imagemSendoArrastada;
    
    // Verifica se há uma imagem sendo arrastada (se o valor não é nulo)
    if (!idDaImagem) return estado;
    
    // Armazena as chaves do container das zonas do estadoAtual (armazena todas as zonas(do armário e da galeria))
    const chavesDasZonas = Object.keys(estado.zonas);
    
    // Atualiza as zonas para que, após a transferência de uma imagem para uma zona diferente, seus dados sumam da anterior e apareçam na nova
    const zonasAtualizadas = chavesDasZonas.reduce((acc, zonaId) => {
    
        // Para a 'zonaId' atual, cria um novo array 'imagensNaZona' contendo todos os IDs, exceto o da imagem que está sendo arrastada.
        const imagensNaZona = estado.zonas[zonaId].imagens.filter(id => id !== idDaImagem); // Usa filter também no array de imagens
      
        // Verifica se a zona em análise é a zona de destino
        if (zonaId === idDaZonaDestino) {

            // Se for, atualiza o objeto da zona e o array de imagens, colocando o id da imagem na nova zona
            acc[zonaId] = { ...estado.zonas[zonaId], imagens: [...imagensNaZona, idDaImagem] }; 
        } else {

            // Se não for a zona de destino, a imagem não é movida
            acc[zonaId] = { ...estado.zonas[zonaId], imagens: imagensNaZona }; 
        }
        return acc;
    }, {});
    // A função retorna um novo objeto estadoAtual com as zonas atualizadas
    return { ...estado, zonas: zonasAtualizadas };
};

// Adicionei uma nova função que analisa se o objeto pode ou não ser colocado na dropzone, dependendo dos tamanhos de ambos
const validarEncaixe = (estado, idDaZonaDestino) => {
    const idDaImagem = estado.imagemSendoArrastada;
    if (!idDaImagem) return false;

    // Armazena o ID da imagem que está sendo arrastada
    const imagemArrastada = estado.imagens[idDaImagem];

    // Armazena o ID da zona de destino
    const zonaDestino = estado.zonas[idDaZonaDestino];

    // Se a zona de destino for a galeria, sempre permite o encaixe
     if (idDaZonaDestino.startsWith('galeria-')) {
        return true;
    }

    // Se a dropzone for um contêiner, não permite encaixe direto de itens (Só devem ser colocados nas dropzones, não no espaço entre elas)
    if (idDaZonaDestino.includes('-container')) {
        return false;
    }

    // Se a dropzone já estiver ocupada (e não for a galeria), não permite o encaixe
    if (zonaDestino.imagens.length > 0) { // Verifica se tem imagens na zona de destino
        return false;
    }

    // Lógica de tamanho: Se a imagem cabe na dropzone (tamanho da zona >= tamanho da imagem)
    const tamanhoImagem = hierarquiaTamanhos[imagemArrastada.tamanho];
    const tamanhoZona = hierarquiaTamanhos[zonaDestino.tamanho]; 

    return tamanhoZona >= tamanhoImagem; // Retorna se a imagem cabe na zona ou não (true/false)
};

//__________________________________________________________________________________________________________________
// Parte Impura do Código!!!
// Necessária para interagir com o HTML, responsável por atualizar a tela e processar as mudanças de estado
//__________________________________________________________________________________________________________________

//galeriaContainer armazena os dados do container da galeria
const galeriaContainer = document.getElementById('app-galeria');

//armarioDropzonesGrid armazena os dados das grids do container das dropzones
const armarioDropzonesGrid = document.getElementById('armario-dropzones-grid');

//atualizarTela atualiza os dados do arquivo HTML de acordo com o estado atual
const atualizarTela = () => {

    // htmlPorZona armazena a string gerada pela função de renderização
    const htmlPorZona = renderizar(estadoAtual[0]);

    // atualiza os dados do container da galeria no HTML
    if (galeriaContainer) galeriaContainer.innerHTML = htmlPorZona.galeria
    //atualiza os dados dos grids do container do armário no HTML
    if (armarioDropzonesGrid) armarioDropzonesGrid.innerHTML = htmlPorZona.armario;

    //ativa a função adicionarEventListeners
    adicionarEventListeners(); 
};

// Função para criar o efeito de brilho (perfumaria)
const criarEfeitoBrilho = (x, y, particulasRestantes) => {
    if (particulasRestantes <= 0) {
        return;
    }
    
    // Cria uma particula e adiciona a classe 'particula-brilho' à ela
    const particula = document.createElement('div');
    particula.classList.add('particula-brilho');

    // Define a posição inicial da partícula como sendo onde o mouse clicou (coordenadas 'x' e 'y')
    particula.style.left = `${x}px`;
    particula.style.top = `${y}px`;

    // Gera coordenadas aleatórias para o destino final da partícula
    const destX = (Math.random() - 0.5) * 200;
    const destY = (Math.random() - 0.5) * 200;

    // Define as variáveis CSS que a animação vai usar
    particula.style.setProperty('--x', `${destX}px`);
    particula.style.setProperty('--y', `${destY}px`);

    // Adiciona a partícula ao corpo do documento
    document.body.appendChild(particula);

    // Remove a partícula da tela após a animação terminar
    setTimeout(() => {
        particula.remove();
    }, 1000);

    // Chama a si mesma para criar a próxima partícula, decrementando o contador.
    criarEfeitoBrilho(x, y, particulasRestantes - 1);
};

// função que lança confetes na tela do usuário (perfumaria)
const lancarConfetes = (confetesRestantes) => {
    // Se não houver mais confetes a criar, a função para.
    if (confetesRestantes <= 0) {
        return;
    }

    // cores armazena as cores escolhidas para os confetes
    const cores = ['#FFD700', '#FF6347', '#8A2BE2', '#00BFFF', '#32CD32'];
    
    // confete cria uma div no HTML e depois, armazenamos a classe 'confete' nela
    const confete = document.createElement('div');
    confete.classList.add('confete');

    // Define uma cor aleatória da nossa lista de cores para o confete que está sendo criado
    confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
    
    // Define uma posição horizontal aleatória para o confete começar a cair
    confete.style.left = `${Math.random() * 100}vw`;

    // Adiciona um atraso aleatório para que os confetes não caiam todos de uma vez
    confete.style.animationDelay = `${Math.random() * 2}s`;

    // Adiciona o confete na tela
    document.body.appendChild(confete);

    // Remove o confete da tela após 15 segundos (duração da animação) para não sobrecarregar a tela
    setTimeout(() => {
        confete.remove();
    }, 15000);

    // Chama a si mesma para criar o próximo confete, decrementando o contador.
    lancarConfetes(confetesRestantes - 1);
};

// Função que anima a contagem da pontuação na tela (perfumaria)
const animarPontuacao = (scoreFinal, elementoTexto, mensagemVitoria) => {
    const incremento = 10; // 10ms
    const velocidade = 10; // 10ms

    const contar = (pontuacaoAtual) => {
        if (pontuacaoAtual >= scoreFinal) {
            // Garante que o valor exibido seja exatamente o final e encerra a execução.
            elementoTexto.textContent = `${mensagemVitoria} (PONTUAÇÂO FINAL: ${scoreFinal}pts!!!)`;
            return; 
        }
        // Atualiza o texto na tela com a pontuação atual
        elementoTexto.textContent = `${mensagemVitoria} (PONTUAÇÂO FINAL: ${pontuacaoAtual}pts!!!)`;
        
        // Agenda a próxima chamada da função 'contar' após um pequeno atraso,
        // passando a pontuação incrementada como o novo valor.
        setTimeout(() => {
            contar(pontuacaoAtual + incremento);
        }, velocidade);
    };

    // Inicia a recursão com a pontuação inicial de 0.
    contar(0);
};

// adicionarEventListeners cria uma função que atualiza o estado atual com eventListeners (método 
// que ativa uma função definida assim que um evento for acionado na tela (Como um observador))
const adicionarEventListeners = () => {
    
    // Pega o ID do elemento do HTML correspondente ao resultado produzido pela função comparador (lá do começo do código)
    const resultadoTexto = document.getElementById('resultado-texto');

    // Para cada imagem arrastável, verifica se acontece algum dos eventos abaixo e ativa a sua função correspondente
    document.querySelectorAll('.imagem-arrastavel').forEach(imagem => {
        
        //'dragstart'= início do arraste (quando o usuário clica na tela e segura a imagem)
        imagem.addEventListener('dragstart', (e) => {
            // Esconde a mensagem de resultado anterior (obtido pela função comparador, acionada pelo botão de verificação)
            // assim que um novo arraste começa
            if (resultadoTexto) {
                resultadoTexto.classList.add('hidden');
            }
            
            // Armazena a zona de origem pelo ID para utilizá-la posteriormente
            const idZonaOrigem = e.target.closest('.drop-zone').id;

            // Inicia o arraste, usa como parâmetros da função os dados do estado atual, o ID da imagem e o ID da zona de origem
            estadoAtual[0] = iniciarArrastar(estadoAtual[0], e.target.id, idZonaOrigem);

            // Assim que possível, adiciona a classe 'arrastando' à imagem clicada
            setTimeout(() => e.target.classList.add('arrastando'), 0); 
            document.getElementById('pegar').play()
        });

        //'dragend' = fim do arraste (quando o usuário solta a imagem clicada)
        imagem.addEventListener('dragend', (e) => {
            // Remove a classe arrastando da imagem clicada
            e.target.classList.remove('arrastando');
        });
    });

    // Para cada drop zone, verifica se acontece algum dos eventos abaixo e ativa a sua função correspondente
    document.querySelectorAll('.drop-zone').forEach(zona => {

        //'dragover' = quando o cursor está segurando uma imagem sobre alguma zona
        zona.addEventListener('dragover', (e) => {

            // Previne que apareça um sinal de bloqueado indesejado sobre a zona
            e.preventDefault();

            // validarEncaixe dá uma resposta visual sobre o arrastar de um objeto sobre uma zona
            if (validarEncaixe(estadoAtual[0], e.currentTarget.id)) {
                e.currentTarget.classList.add('drag-over');
                e.dataTransfer.dropEffect = 'move';
            } else {
                e.dataTransfer.dropEffect = 'none';
            }
        });

        //'dragleave' = quando o cursor, segurando uma imagem, sai de determinada zona
        zona.addEventListener('dragleave', (e) => {
            e.currentTarget.classList.remove('drag-over');
        });

        //'drop' = quando o cursor solta uma imagem sobre determinada zona
        zona.addEventListener('drop', (e) => {

            // evita que a imagem não seja colocada
            e.preventDefault();
            e.currentTarget.classList.remove('drag-over');

            const idZonaDestino = e.currentTarget.id;
            const idImagemArrastada = estadoAtual[0].imagemSendoArrastada;

            // As imagens só são colocadas na dropzone se o validarEncaixe permitir
            if (validarEncaixe(estadoAtual[0], idZonaDestino)) {
                // Se o encaixe for válido, move a imagem
                const estadoAposMover = moverImagem(estadoAtual[0], idZonaDestino);
                estadoAtual[0] = finalizarArrastar(estadoAposMover);
                document.getElementById('soltar').play()

                atualizarTela();

                const imagemElemento = document.getElementById(idImagemArrastada);
                if (imagemElemento) {
                    imagemElemento.classList.add('animate-drop');
                    criarEfeitoBrilho(e.clientX, e.clientY, 10); // Cria 10 partículas

                    //setTimeOut aciona a animação de pulo na imagem
                    setTimeout(() => {
                        imagemElemento.classList.remove('animate-drop');
                    }, 300);
                }
            } else {
                // Se o encaixe não for válido, devolve a imagem para a zona de origem (guardada anteriormente)
                const idZonaOrigem = estadoAtual[0].zonaDeOrigem; 
                const estadoAposDevolver = moverImagem(estadoAtual[0], idZonaOrigem);
                estadoAtual[0] = finalizarArrastar(estadoAposDevolver);
                
                atualizarTela();
            }
        });
    });

    // Lógica do botão "Verificar"

    //Pega o elemento verificar pelo ID
    const botaoVerificar = document.getElementById('verificar-btn');
    if (botaoVerificar) {
        botaoVerificar.addEventListener('click', () => {
            // Define a ordem das zonas para o cálculo
            const ordemDasZonas = [
                'col1-dz1', 'col1-dz2',
                'col2-dz1', 'col2-dz2', 
                'col3-dz1', 'col3-dz2', 'col3-dz3', 'col3-dz4', 'col3-dz5',
                'col4-dz1', 'col4-dz2', 
                'col5-dz1', 'col5-dz2', 'col5-dz3', 'col5-dz4', 'col5-dz5'
            ];
            
            const listaNivel = ordemDasZonas.map(zonaId => estadoAtual[0].zonas[zonaId].tamanho);
            const listaJogador = obterTamanhosAtuais(estadoAtual[0]);
            const resultadoTamanho = comparador(listaNivel, [])(...listaJogador);
            
            // Mostra o elemento de texto
            if (resultadoTexto) {
                resultadoTexto.classList.remove('hidden');
            }

            // Condição de vitória baseada no resultado de tamanho
            if (resultadoTamanho.includes("Parabéns")) {
                const scorePeso = pontuação(estadoAtual[0]);
                const mensagemVitoria = resultadoTamanho;

                // Inicia a animação de contagem da pontuação
                animarPontuacao(scorePeso, resultadoTexto, mensagemVitoria);
                
                lancarConfetes(100);
                document.getElementById('victory').play();
            } else {
                // Se não venceu, exibe apenas a mensagem de porcentagem
                resultadoTexto.textContent = resultadoTamanho;
                document.getElementById('defeat').play();
            }
        });
    }
};
document.addEventListener('DOMContentLoaded', atualizarTela);
document.addEventListener('DOMContentLoaded', () => {
    const musica = document.getElementById('trilha-sonora');
    
    // Define um volume inicial (0.3 = 30% do volume)
    musica.volume = 0.15;

    // Função que será chamada no primeiro clique
    const iniciarMusicaComInteracao = () => {
        // Verifica se a música já não está tocando
        if (musica.paused) {
            setTimeout (musica.play().catch(error => {
                // O .catch() é uma boa prática para lidar com possíveis erros de reprodução
                console.log("Erro ao tentar tocar a música:", error);
            }), 0);
        }
        
        // Remove o eventListener para que cliques futuros não tentem tocar a música novamente
        document.removeEventListener('click', iniciarMusicaComInteracao);
    };

    // Adiciona um eventListener que espera por um clique em qualquer lugar do documento
    document.addEventListener('click', iniciarMusicaComInteracao);
});
