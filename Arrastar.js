// A array com o único objeto de estado dentro dela
const estadoAtual = [{/* As informações iniciais do estado, incluindo imagens e zonas,
                           são mantidas aqui. */
    imagens: {
        'img1': { src: 'armário.jpg', alt: 'ArmárioGrande' }, // Corrigi o src para 'armário.jpg' para o exemplo
        'img2': { src: 'https://png.pngtree.com/png-clipart/20230914/original/pngtree-water-jug-vector-png-image_11243534.png', alt: 'Jarro 2D' },
        'img3': { src: 'https://via.placeholder.com/150/008000/FFFFFF?text=C' },
        'img4': { src: 'https://via.placeholder.com/150/FFFF00/000000?text=D' },
        'img5': { src: 'https://via.placeholder.com/90/FF6347/FFFFFF?text=E', alt: 'Caixa Laranja' },
        'img6': { src: 'https://via.placeholder.com/70/8A2BE2/FFFFFF?text=F', alt: 'Caixa Roxa' }
    },
    // Definindo as zonas para a nova estrutura de 5 colunas
    // A numeração das colunas no estado (col1, col2, col3, col4, col5) é da ESQUERDA para a DIREITA
    // e corresponde DIRETAMENTE às colunas do grid CSS.
    // Coluna 1 (Esquerda): 2 dropzones
    // Coluna 2: 2 dropzones
    // Coluna 3 (Central): 2 dropzones
    // Coluna 4: 2 dropzones
    // Coluna 5 (Direita): 5 dropzones

    zonas: {
        'galeria': ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'], // Galeria de itens arrastáveis
        
        // Coluna 1 (mais à esquerda - 2 dropzones)
        'col1-dz1': [], 'col1-dz2': [],

        // Coluna 2 (2 dropzones)
        'col2-dz1': [], 'col2-dz2': [],

        // Coluna 3 (central - 2 dropzone)
        'col3-dz1': [], 'col3-dz2': [],

        // Coluna 4 (2 dropzones)
        'col4-dz1': [], 'col4-dz2': [],
        
        // Coluna 5 (mais à direita - 5 dropzones)
        'col5-dz1': [], 'col5-dz2': [], 'col5-dz3': [], 'col5-dz4': [], 'col5-dz5': []
    },
    imagemSendoArrastada: null,
    zonaEmHover: null
}];

//-------------------------------------------------------------------------------------------------------------------------------------
// Função renderizar: recebe o estado e retorna uma string HTML. Não modifica nada fora dela.
//-------------------------------------------------------------------------------------------------------------------------------------

const renderizar = (estado) => {
    // Primeiro, gere o HTML de todas as dropzones individuais
    const dropzoneHtmls = Object.keys(estado.zonas).reduce((acc, zonaId) => {
        // A zona 'galeria' é tratada separadamente, então não a incluímos no HTML do armário.
        if (zonaId === 'galeria') {
            const htmlDasImagensGaleria = estado.zonas[zonaId].map(imgId => {
                const imagem = estado.imagens[imgId];
                const classeArrastando = (estado.imagemSendoArrastada === imgId) ? 'arrastando' : '';
                return `<img src="${imagem.src}" alt="${imagem.alt}" id="${imgId}" class="imagem-arrastavel ${classeArrastando}" draggable="true">`;
            }).join('');
            acc[zonaId] = `
                <div class="drop-zone" id="${zonaId}">
                    <h2>${zonaId.charAt(0).toUpperCase() + zonaId.slice(1).replace(/-/g, ' ')}</h2>
                    ${htmlDasImagensGaleria}
                </div>`;
            return acc;
        }

        // Para as dropzones do armário, geramos o HTML básico
        const htmlDasImagens = estado.zonas[zonaId].map(imgId => {
            const imagem = estado.imagens[imgId];
            const classeArrastando = (estado.imagemSendoArrastada === imgId) ? 'arrastando' : '';
            return `<img src="${imagem.src}" alt="${imagem.alt}" id="${imgId}" class="imagem-arrastavel ${classeArrastando}" draggable="true">`;
        }).join('');

        acc[zonaId] = `
            <div class="drop-zone" id="${zonaId}">
                <h2>${zonaId.charAt(0).toUpperCase() + zonaId.slice(1).replace(/-/g, ' ')}</h2>
                ${htmlDasImagens}
            </div>`;
        return acc;
    }, {});

    // Monta o HTML final para cada contêiner principal (galeria e armário)
    return {
        galeria: dropzoneHtmls.galeria, // HTML para a galeria (fora do armário)
        armario: `
            <div class="col-container" id="col1-container">
                ${dropzoneHtmls['col1-dz1'] || ''}
                ${dropzoneHtmls['col1-dz2'] || ''}
            </div>

            <div class="col-container" id="col2-container">
                ${dropzoneHtmls['col2-dz1'] || ''}
                ${dropzoneHtmls['col2-dz2'] || ''}
            </div>

            <div class="col-container" id="col3-container">
                ${dropzoneHtmls['col3-dz1'] || ''}
            </div>

            <div class="col-container" id="col4-container">
                ${dropzoneHtmls['col4-dz1'] || ''}
                ${dropzoneHtmls['col4-dz2'] || ''}
            </div>
            
            <div class="col-container" id="col5-container">
                ${dropzoneHtmls['col5-dz1'] || ''}
                ${dropzoneHtmls['col5-dz2'] || ''}
                ${dropzoneHtmls['col5-dz3'] || ''}
                ${dropzoneHtmls['col5-dz4'] || ''}
                ${dropzoneHtmls['col5-dz5'] || ''}
            </div>
        `
    };
};

//-------------------------------------------------------------------------------------------------------------------------------------
// As funções abaixo recebem o estado antigo e retornam, em conjunto, um novo estado atualizado
//-------------------------------------------------------------------------------------------------------------------------------------

const iniciarArrastar = (estado, idDaImagem) => {
    return { ...estado, imagemSendoArrastada: idDaImagem };
};

const finalizarArrastar = (estado) => {
    return { ...estado, imagemSendoArrastada: null, zonaEmHover: null };
};

const moverImagem = (estado, idDaZonaDestino) => {
    // Salva o ID da imagem que está sendo arrastada para um uso posterior
    const idDaImagem = estado.imagemSendoArrastada;

    // Se não houver uma imagem sendo arrastada, retorna o estado atual sem modificação
    if (!idDaImagem) return estado;

    // Pega as chaves do objeto de zonas original
    const chavesDasZonas = Object.keys(estado.zonas);

    // zonasAtualizadas usa chavesDasZonas.reduce() para construir um novo objeto de zonas do zero
    const zonasAtualizadas = chavesDasZonas.reduce((acc, zonaId) => {
        // 'acc' é a nossa 'variável acumuladora'
        // 'zonaId' é a chave atual (ex: 'galeria', 'col1-dz1')

        // 1. Remove a imagem da zona atual (se ela estiver lá)
        const imagensNaZona = estado.zonas[zonaId].filter(id => id !== idDaImagem);

        // 2. Adiciona a imagem se a zona de destino for a correta
        if (zonaId === idDaZonaDestino) {
            // ** Lógica de "apenas um item por drop-zone" **
            // A zona 'galeria' é uma EXCEÇÃO: ela aceita múltiplos itens.
            // Contêineres de coluna (`colX-container`) não devem aceitar itens diretos.
            if (zonaId.includes('-container') || (zonaId !== 'galeria' && imagensNaZona.length > 0)) {
                console.warn(`Zona '${zonaId}' já está ocupada ou é um contêiner. Não é possível mover '${idDaImagem}'.`);
                // Retorna o acumulador sem adicionar a imagem a esta zona
                acc[zonaId] = imagensNaZona; 
            } else {
                acc[zonaId] = [...imagensNaZona, idDaImagem];
            }
        } else {
            acc[zonaId] = imagensNaZona;
        }

        // 3. Retorna o objeto acumulador para a próxima iteração
        return acc;
    }, {}); // O {} no final é o valor inicial do nosso acumulador (um objeto vazio)

    // Retorna o novo estado completo com o objeto de zonas totalmente novo
    return { ...estado, zonas: zonasAtualizadas };
};

//----------------------------------------------------------------------------------------------------------------------------------
// Parte não funcional, necessária para o funcionamento do arraste
//----------------------------------------------------------------------------------------------------------------------------------

// galeriaContainer armazena o elemento HTML para a galeria (fora do armário)
const galeriaContainer = document.getElementById('app-galeria');
// armarioDropzonesGrid armazena o elemento HTML que será o grid mestre para as dropzones do armário
const armarioDropzonesGrid = document.getElementById('armario-dropzones-grid');
 
// atualizarTela é a responsável por atualizar as informações presentes na tela após qualquer mudança
const atualizarTela = () => {

    // htmlPorZona armazena a string gerada pela função renderizar, para todas as zonas
    const htmlPorZona = renderizar(estadoAtual[0]);
    
    // Atualiza a galeria (parte fora do armário)
    if (galeriaContainer) {
        galeriaContainer.innerHTML = htmlPorZona.galeria;
    }

    // Atualiza o grid do armário com todas as dropzones geradas para o armário
    if (armarioDropzonesGrid) {
        armarioDropzonesGrid.innerHTML = htmlPorZona.armario;
    }
    
    // A chamada para adicionar os eventos PRECISA estar DENTRO da função
    // que redesenha a tela, para ser executada toda vez.
    adicionarEventListeners(); 
};

// adicionarEventListeners 'computa' todas as mudanças que o usuário for fazer na tela
const adicionarEventListeners = () => {
    // querySelectorAll seleciona todas as imagens arrastáveis e, para cada uma, adiciona os eventListeners necessários
    document.querySelectorAll('.imagem-arrastavel').forEach(imagem => {
        imagem.addEventListener('dragstart', (e) => {
            // Atualiza o estado da imagem clicada para imagemSendoArrastada
            const novoEstado = iniciarArrastar(estadoAtual[0], e.target.id);
            // Atualiza o estado atual
            estadoAtual[0] = novoEstado;
            // setTimeout pede para que a função seja retornada o mais rápido possível, contanto que o navegador já tenha terminado
            // suas tarefas antecedentes, garante que a aparência do elemento original só seja alterada depois que o navegador já 
            // tenha preparado a imagem de arraste
            setTimeout(() => e.target.classList.add('arrastando'), 0); 
        });
        // Indica a finalização do arraste
        imagem.addEventListener('dragend', (e) => {
            estadoAtual[0] = finalizarArrastar(estadoAtual[0]);
            e.target.classList.remove('arrastando'); // Remove a classe 'arrastando' diretamente
            atualizarTela(); // A tela será redesenhada para refletir a nova posição se houver drop
        });
    });

    // querySelectorAll() faz, para cada zona, as tarefas abaixo
    document.querySelectorAll('.drop-zone').forEach(zona => {
        // dragover significa que a imagem que está sendo arrastada está sobre essa zona em específico
        zona.addEventListener('dragover', (e) => {
            // preventDefault previne que apareça um sinal de bloqueado no cursor quando a imagem estiver sobre uma drop zone
            e.preventDefault();
            
            // ** Validação para feedback visual: só adiciona drag-over se a zona for 'galeria' ou não estiver ocupada **
            // E não permite drag-over em contêineres de coluna (.col-container), pois eles não são zonas de drop para itens.
            if (zona.id === 'galeria' || estadoAtual[0].zonas[e.currentTarget.id].length === 0) { 
                if (!zona.id.includes('-container')) { // Certifica que não é um container de coluna
                    e.currentTarget.classList.add('drag-over');
                    e.dataTransfer.dropEffect = 'move'; // Indica que é um local válido para soltar
                } else {
                    e.dataTransfer.dropEffect = 'none'; // Contêineres não aceitam drop direto de itens
                }
            } else {
                e.dataTransfer.dropEffect = 'none'; // Indica que NÃO é um local válido para soltar
            }
        });
        
        // dragleave significa que o cursor saiu da drop zone
        zona.addEventListener('dragleave', (e) => {
            e.currentTarget.classList.remove('drag-over');
        });

        // drop significa que o objeto foi solto em uma drop zone
        zona.addEventListener('drop', (e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('drag-over'); // Limpa o hover

            // ** Validação final de drop: move se for 'galeria' ou se a zona não estiver ocupada **
            // E não permite drop em zonas que são apenas contêineres de colunas.
            if (zona.id === 'galeria' || (!zona.id.includes('-container') && estadoAtual[0].zonas[e.currentTarget.id].length === 0)) { 
                // estadoAposMover atualiza o 'estadoAtual' para o estado atual
                const estadoAposMover = moverImagem(estadoAtual[0], e.currentTarget.id);
                estadoAtual[0] = finalizarArrastar(estadoAposMover);
            } 
            else {
                console.warn(`Tentou mover para a zona '${e.currentTarget.id}', mas ela já está ocupada ou é um contêiner.`);
                // Poderia adicionar um feedback visual (ex: uma mensagem de erro temporária) aqui
                estadoAtual[0] = finalizarArrastar(estadoAtual[0]); // Limpa o estado de arrasto
            }
            
            atualizarTela(); // Sempre redesenha para refletir qualquer mudança (ou falta dela)
        });
    });
};

// atualizarTela() é usado aqui para fazer o primeiro movimento do código
document.addEventListener('DOMContentLoaded', atualizarTela);