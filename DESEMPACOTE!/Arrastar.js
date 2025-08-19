// A função organizador retorna uma lista com a quantidade de imagens encaixáveis em cada espaço
const organizador = (fase, jogador) => {
    return fase.filter((tamanho, indice) => {
        if (tamanho == 'G') {
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
//Cria uma função que calcula a porcentagem de acerto do jogador, isto é, mede o quão próximo o jogador chegou de acertar a posição dos objetos.
//Essa função será implementada na função comparador
const porcentagem = (fase, jogador) => (jogador/fase)*100

// listaNivel armazena o tamanho máximo das imagens que cada drop zone pode armazenar
const listaNivel = ['M','M','M','M','G','P','MG','P','P','P','P','M'] 

// Cria uma função responsável por analisar se o tamanho da lista da fase é igual ao tamanho da lista filtrada pela função 
// organizadora, e então retorna se sim ou não.
const comparador = (fase, jogador) => (a, ...b) => {
    jogador = [a,...b]
    const resultadoOrganizador = organizador(fase,jogador)
    resultadoPorcentagem= porcentagem(fase.length, resultadoOrganizador.length)
    if (resultadoOrganizador.length === fase.length){
        return "Parabéns, você completou a  fase!"
    }
    else {return `Tente Novamente! Você está ${resultadoPorcentagem.toFixed(0)}% correto` }
}
// A array com o único objeto de estado dentro dela

//estadoAtual armazena os dados atuais da fase, ou seja, onde cada imagem está e quais as características de cada imagem
const estadoAtual = [{
    //"imagens" armaazena os dados das imagens
    imagens: {
        'img1': { src: 'armário.jpg', alt: 'ArmárioGrande', tamanho: 'G' },
        'img2': { src: 'https://png.pngtree.com/png-clipart/20230914/original/pngtree-water-jug-vector-png-image_11243534.png', alt: 'Jarro 2D', tamanho: 'MG'},
        'img3': { src: 'tênis.png', alt: 'Tênis 2D', tamanho: 'P' },
        'img4': { src: 'roupas.png', alt: 'Roupas', tamanho: 'M' },
        'img5': { src: 'https://via.placeholder.com/90/FF6347/FFFFFF?text=E', alt: 'Caixa Laranja', tamanho: 'P' },
        'img6': { src: 'https://via.placeholder.com/70/8A2BE2/FFFFFF?text=F', alt: 'Caixa Roxa', tamanho: 'P' }
    },
    //"zonas" armazena os dados das  zonas (os IDs das imagens que estão em cada zona)
    // Adicionei a propriedade 'tamanho' para cada dropzone, além disso, a propriedade 'imagens' agora é uma lista
    zonas: {
        'galeria': {imagens: ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'], tamanho: 'G'}, // Galeria tem um tamanho 'G' para aceitar tudo
        
        // Coluna 1 (mais à esquerda - 2 dropzones)
        'col1-dz1': {imagens: [], tamanho: 'M'}, 'col1-dz2': {imagens: [], tamanho: 'M'},

        // Coluna 2 (2 dropzones)
        'col2-dz1': {imagens: [], tamanho: 'M'}, 'col2-dz2': {imagens: [], tamanho: 'M'},

        // Coluna 3 (central - 2 dropzones)
        'col3-dz1': {imagens: [], tamanho: 'G'}, 'col3-dz2': {imagens: [], tamanho: 'M'},

        // Coluna 4 (2 dropzones)
        'col4-dz1': {imagens: [], tamanho: 'P'}, 'col4-dz2': {imagens: [], tamanho: 'MG'},
        
        // Coluna 5 (mais à direita - 5 dropzones)
        'col5-dz1': {imagens: [], tamanho: 'P'}, 'col5-dz2': {imagens: [], tamanho: 'P'}, 'col5-dz3': {imagens: [], tamanho: 'P'}, 'col5-dz4': {imagens: [], tamanho: 'P'}, 'col5-dz5': {imagens: [], tamanho: 'M'}
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
    'G': 4
};

// obterTamanhosAtuais mapeia o estadoAtual para saber qual o tamanho de cada imagem colocada sobre cada drop zone do armário
const obterTamanhosAtuais = (estado) => {
    // Define a ordem correta das drop zones para a comparação
    const ordemDasZonas = [
        'col1-dz1', 'col1-dz2',
        'col2-dz1', 'col2-dz2', 
        'col3-dz1', 
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

// "renderizar" transforma os dados do estadoAtual em um objeto com strings para ser usada no HTML
const renderizar = (estado) => {
    
    //"dropzoneHtmls" separa as imagens pertencentes a cada drop zone e organiza um objeto com as strings HTMLs corretas
    const dropzoneHtmls = Object.keys(estado.zonas).reduce((acc, zonaId) => {
        // Se a zona analisada pelo reduce for a galeria, ele segue um caminho distinto, para organizar corretamente o resuultado final
        if (zonaId === 'galeria') {
            // htmlDasImagens mapeia cada imagem da galeria pelo seu ID
            const htmlDasImagensGaleria = estado.zonas[zonaId].imagens.map(imgId => { // Acessa o array de imagens **
                // imagem armazena os dados da imagem que está sendo mapeada pelo ID
                const imagem = estado.imagens[imgId];
                // "classeArrastando" verifica se a imagem que está sendo arrastada é a imagem que está sendo mapeada, e retorna a string 'arrastando' ou uma string
                // vazia para ser usada como classe CSS
                const classeArrastando = (estado.imagemSendoArrastada === imgId) ? 'arrastando' : '';
                // retorna a string HTML para uma imagem.
                return `<img src="${imagem.src}" alt="${imagem.alt}" id="${imgId}" class="imagem-arrastavel ${classeArrastando}" draggable="true">`;
            }).join('');
            // ".join()" pega o array de strings retornado pelo .map() e o transforma em uma string única
            // a acumuladora armazena os dados completos da galeria e das imagens como uma string HTML e faz alguns ajustes de texto para
            // o nome da zona (Primeira Letra em Maiúsculo) com charAt(0).toUpperCase e zonaId.slice(1).replace(/-/g, ' ')
            acc[zonaId] = `<div class="drop-zone" id="${zonaId}"><h2>${zonaId.charAt(0).toUpperCase() + zonaId.slice(1).replace(/-/g, ' ')}</h2>${htmlDasImagensGaleria}</div>`;
            // retorna o objeto completo, com todas a galeria processada
            return acc;
        }

        // htmlDasImagens mapeia para cada drop zone, as suas respectivas imagens pelo ID
        const htmlDasImagens = estado.zonas[zonaId].imagens.map(imgId => { 
            // imagem armazena os dados da imagem que está sendo mapeada pelo ID
            const imagem = estado.imagens[imgId];
            // "classeArrastando" verifica se a imagem atual é a que está sendo arrastada e retorna a string 'arrastando' ou uma string
            // vazia para ser usada como classe CSS
            const classeArrastando = (estado.imagemSendoArrastada === imgId) ? 'arrastando' : '';
             // retorna a string HTML para uma imagem.
            return `<img src="${imagem.src}" alt="${imagem.alt}" id="${imgId}" class="imagem-arrastavel ${classeArrastando}" draggable="true">`;
        }).join('');
        // ".join()" pega o array de strings retornado pelo .map() e o transforma em uma string única
        // a acumuladora armazena os dados completos das imagens como uma string HTML e faz alguns 
        // ajustes de texto (Primeira Letra em Maiúsculo) para o nome da zona com charAt(0).toUpperCase e zonaId.slice(1).replace(/-/g, ' ')
        acc[zonaId] = `<div class="drop-zone" id="${zonaId}"><h2>${zonaId.charAt(0).toUpperCase() + zonaId.slice(1).replace(/-/g, ' ')}</h2>${htmlDasImagens}</div>`;
        // retorna o objeto completo, com todas as zonas processadas
        return acc;
    }, {});
    // a função retorna, no final, um registro de cada zona principal, galeria e armário, e no armário, divide corretamente cada 
    // dado de cada drop zone em seu conteiner/coluna 
    return {
        galeria: dropzoneHtmls.galeria,
        armario: `
            <div class="col-container" id="col1-container">${dropzoneHtmls['col1-dz1'] || ''}${dropzoneHtmls['col1-dz2'] || ''}</div>
            <div class="col-container" id="col2-container">${dropzoneHtmls['col2-dz1'] || ''}${dropzoneHtmls['col2-dz2'] || ''}</div>
            <div class="col-container" id="col3-container">${dropzoneHtmls['col3-dz1'] || ''}${dropzoneHtmls['col3-dz2'] || ''}</div>
            <div class="col-container" id="col4-container">${dropzoneHtmls['col4-dz1'] || ''}${dropzoneHtmls['col4-dz2'] || ''}</div>
            <div class="col-container" id="col5-container">${dropzoneHtmls['col5-dz1'] || ''}${dropzoneHtmls['col5-dz2'] || ''}${dropzoneHtmls['col5-dz3'] || ''}${dropzoneHtmls['col5-dz4'] || ''}${dropzoneHtmls['col5-dz5'] || ''}</div>`
    };
};

// Funções que fazem as alterações de estado na fase
const iniciarArrastar = (estado, idDaImagem, idZonaOrigem) => ({ ...estado, imagemSendoArrastada: idDaImagem, zonaDeOrigem: idZonaOrigem }); // Uso da Zona de origem
// "finalizarArrastar" limpa o estado de arraste
const finalizarArrastar = (estado) => ({ ...estado, imagemSendoArrastada: null, zonaEmHover: null, zonaDeOrigem: null }); //
// "moverImagem" move a imagem de uma zona para outra, atualizando o estado
const moverImagem = (estado, idDaZonaDestino) => {
    // Coleta o ID da imagem que está sendo arrastada
    const idDaImagem = estado.imagemSendoArrastada;
    // Verifica se há uma imagem sendo arrastada (se o valor não é nulo)
    if (!idDaImagem) return estado;
    // Armazena as chaves das zonas do estadoAtual
    const chavesDasZonas = Object.keys(estado.zonas);
    // Atualiza as zonas para que, após a transferência de uma imagem para uma zona diferente, seus dados sumam da anterior e apareçam na nova
    const zonasAtualizadas = chavesDasZonas.reduce((acc, zonaId) => {
        // Para a 'zonaId' atual, cria um novo array 'imagensNaZona' contendo todos os IDs, exceto o da imagem que está sendo arrastada.
        const imagensNaZona = estado.zonas[zonaId].imagens.filter(id => id !== idDaImagem); // Usa filter também no array de imagens
        // Verifica se a zona em análise é a zona de destino
        if (zonaId === idDaZonaDestino) {
            // Lógica para impedir que um item seja solto em uma zona já ocupada (a 'galeria' é a exceção)
            // Note: Esta validação foi movida para `validarEncaixe` para melhor controle do fluxo.
            // Aqui, apenas movemos a imagem, assumindo que a validação já ocorreu.
            acc[zonaId] = { ...estado.zonas[zonaId], imagens: [...imagensNaZona, idDaImagem] }; // Atualiza o objeto da zona e o array de imagens 
        } else {
            acc[zonaId] = { ...estado.zonas[zonaId], imagens: imagensNaZona }; // Atualiza o objeto da zona e o array de imagens 
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

    const imagemArrastada = estado.imagens[idDaImagem];
    const zonaDestino = estado.zonas[idDaZonaDestino];

    // Se a zona de destino for a galeria, sempre permite o encaixe
    if (idDaZonaDestino === 'galeria') {
        return true;
    }

    // Se a dropzone for um contêiner, não permite encaixe direto de itens
    if (idDaZonaDestino.includes('-container')) {
        return false;
    }

    // Se a dropzone já estiver ocupada (e não for a galeria), não permite
    if (zonaDestino.imagens.length > 0) { // Acessa o array de imagens da zona de destino
        return false;
    }

    // Lógica de tamanho: Imagem deve caber na dropzone (tamanho da zona >= tamanho da imagem)
    const tamanhoImagem = hierarquiaTamanhos[imagemArrastada.tamanho];
    const tamanhoZona = hierarquiaTamanhos[zonaDestino.tamanho]; 

    return tamanhoZona >= tamanhoImagem; // Zona é igual ou maior que a imagem
};


//_______________________________________________________________________________________
//Parte Impura do Código!!!
//_______________________________________________________________________________________

//galeriaContainer armazena os dados do container da galeria
const galeriaContainer = document.getElementById('app-galeria');

//armarioDropzonesGrid armazena os dados dos grids do container das dropzones
const armarioDropzonesGrid = document.getElementById('armario-dropzones-grid');

//atualizarTela atualiza os dados do arquivo HTML de acordo com o estadoAtual
const atualizarTela = () => {
    const htmlPorZona = renderizar(estadoAtual[0]);

    //atualiza os dados do container da galeria
    if (galeriaContainer) galeriaContainer.innerHTML = htmlPorZona.galeria;

    //atualiza os dados dos grids do container do armário
    if (armarioDropzonesGrid) armarioDropzonesGrid.innerHTML = htmlPorZona.armario;

    //ativa a função adicionarEventListeners
    adicionarEventListeners(); 
};
//adicionarEventListeners cria uma função que atualiza o estado atual com eventListeners(método que ativa uma função assim que um evento
// for acionado na tela)
const adicionarEventListeners = () => {
    
    // Pega o ID do novo elemento de texto do resultado produzido pela função comparador (lá do começo do código)
    const resultadoTexto = document.getElementById('resultado-texto');

    // Para cada imagem arrastável, verifica se acontece algum dos eventos abaixo e ativa a função necessária
    document.querySelectorAll('.imagem-arrastavel').forEach(imagem => {
        
        //'dragstart'= início do arraste
        imagem.addEventListener('dragstart', (e) => {
            // Esconde a mensagem de resultado anterior assim que um novo arraste começa
            if (resultadoTexto) {
                resultadoTexto.classList.add('hidden');
            }
            
            // Armazena a zona de origem para utilizar posteriormente
            const idZonaOrigem = e.target.closest('.drop-zone').id; // Encontra o ID da drop-zone de origem
            estadoAtual[0] = iniciarArrastar(estadoAtual[0], e.target.id, idZonaOrigem); // Passa a idZonaOrigem
            // Assim que possível, adiciona a classe 'arrastando' à imagem clicada
            setTimeout(() => e.target.classList.add('arrastando'), 0); 
        });

        //'dragend' = fim do arraste
        imagem.addEventListener('dragend', (e) => {
            // Remove a classe arrastando da imagem clicada
            e.target.classList.remove('arrastando');
        });
    });

    // Para cada drop zone, verifica se acontece algum dos eventos abaixo e ativa a função necessária
    document.querySelectorAll('.drop-zone').forEach(zona => {

        //'dragover' = cursor segurando uma imagem sobre determinada zona
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

        //'dragleave' = cursor segurando uma imagem sai de determinada zona
        zona.addEventListener('dragleave', (e) => {
            e.currentTarget.classList.remove('drag-over');
        });

        //'drop' = cursor solta uma imagem sobre determinada zona
        zona.addEventListener('drop', (e) => {

            // evita que a imagem não seja colocada
            e.preventDefault();
            e.currentTarget.classList.remove('drag-over');

            const idZonaDestino = e.currentTarget.id;
            const idZonaOrigem = estadoAtual[0].zonaDeOrigem; // Pega a zona de origem do estado

            // Agora, as imagens só são colocadas na dropzone se o validarEncaixe permitir
            if (validarEncaixe(estadoAtual[0], idZonaDestino)) {
                // Se o encaixe for válido, move a imagem
                const estadoAposMover = moverImagem(estadoAtual[0], idZonaDestino);
                estadoAtual[0] = finalizarArrastar(estadoAposMover);
            } else {
                // Se o encaixe não for válido, devolve a imagem para a zona de origem (guardada anteriormente)
                // moverImagem é utilizada para levar a imagem de volta para a origem.
                const estadoAposDevolver = moverImagem(estadoAtual[0], idZonaOrigem); // Move de volta para a origem
                estadoAtual[0] = finalizarArrastar(estadoAposDevolver); // Limpa o estado de arrastar
            }
            // A tela é atualizada para mostrar o que aconteceu
            atualizarTela(); 
        });
    });

    // Lógica do botão "Verificar"

    //Pega o elemento verificar pelo ID
    const botaoVerificar = document.getElementById('verificar-btn');

    // Verifica se o botão foi clicado e ativa a função comparador, para depois imprimir o resultado na tela
    if (botaoVerificar) {
        botaoVerificar.addEventListener('click', () => {
            const listaJogador = obterTamanhosAtuais(estadoAtual[0]);
            const resultado = comparador(listaNivel, [])(...listaJogador);
            if (resultadoTexto) {
                resultadoTexto.textContent = resultado;
                resultadoTexto.classList.remove('hidden');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', atualizarTela);
