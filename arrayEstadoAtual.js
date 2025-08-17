const estadoAtual = [{ // A array com o único objeto de estado dentro dela
    imagens: {
        'img1': { src: 'armario.jpg' },
        'img2': { src: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=B' },
        'img3': { src: 'https://via.placeholder.com/150/008000/FFFFFF?text=C' },
        'img4': { src: 'https://via.placeholder.com/150/FFFF00/000000?text=D' }
    },
    zonas: {
        'galeria': ['img1', 'img2', 'img3', 'img4'],
        'favoritos': []
    },
    imagemSendoArrastada: null, // ID da imagem em trânsito
    zonaEmHover: null // ID da zona que está com o mouse por cima
}]
// Recebe o estado e retorna uma string HTML. Não modifica nada fora dela.
const renderizar = (estado) => {
    // Aqui usamos Object.keys() para pegar ['galeria', 'favoritos'] e com o .map, executamos algumas tarefas
    return Object.keys(estado.zonas).map(zonaId => {
        return `
            <div 
                class="drop-zone ${
                /*es*/
                (estado.zonaEmHover === zonaId) ? 'drag-over' : ''}" 
                id="${zonaId}"
            >
                <h2>${zonaId.charAt(0).toUpperCase() + zonaId.slice(1)}</h2>
                
                ${ /* Inicia a lógica para gerar as imagens */
                   estado.zonas[zonaId].map(imgId => {
                        const imagem = estado.imagens[imgId];
                        return `
                            <img 
                                src="${imagem.src}" 
                                id="${imgId}" 
                                class="imagem-arrastavel ${(estado.imagemSendoArrastada === imgId) ? 'arrastando' : ''}" 
                                draggable="true"
                            >`;
                   }).join('')
                }
            </div>
        `;
    }).join('');
    // .join é usado para unir a array em uma única string

// Funções que recebem o estado antigo e retornam um NOVO estado.

const iniciarArrastar = (estado, idDaImagem) => {
    return { ...estado, imagemSendoArrastada: idDaImagem };
}

const finalizarArrastar = (estado) => {
    return { ...estado, imagemSendoArrastada: null, zonaEmHover: null };
}

const atualizarZonaEmHover = (estado, idDaZona) => {
    return { ...estado, zonaEmHover: idDaZona };
}

const moverImagem = (estado, idDaZonaDestino) => {
    const idDaImagem = estado.imagemSendoArrastada;
    if (!idDaImagem) return estado; // Não faz nada se nenhuma imagem estiver sendo arrastada

    // Cria um novo objeto de zonas para não modificar o original
    const novasZonas = { ...estado.zonas };
    
    // Remove a imagem de todas as zonas (a forma mais fácil de garantir que ela saia da original)
    for (const zonaId in novasZonas) {
        novasZonas[zonaId] = novasZonas[zonaId].filter(id => id !== idDaImagem);
    }
    
    // Adiciona a imagem à zona de destino
    novasZonas[idDaZonaDestino] = [...novasZonas[idDaZonaDestino], idDaImagem];

    // Retorna o novo estado completo
    return { ...estado, zonas: novasZonas };
}

// =======================================================
// 4. GERENCIADOR DE EVENTOS (CAMADA IMPURA)
// =======================================================

const appContainer = document.getElementById('app');

function atualizarTela() {
    appContainer.innerHTML = renderizar(estadoAtual);
    adicionarEventListeners();
}

function adicionarEventListeners() {
    document.querySelectorAll('.imagem-arrastavel').forEach(imagem => {
        imagem.addEventListener('dragstart', (e) => {
            const novoEstado = iniciarArrastar(estadoAtual, e.target.id);
            estadoAtual = novoEstado;
            setTimeout(atualizarTela, 0); 
        });
        imagem.addEventListener('dragend', () => {
            estadoAtual = finalizarArrastar(estadoAtual);
            atualizarTela();
        });
    });

    document.querySelectorAll('.drop-zone').forEach(zona => {-
        // O dragover apenas previne o comportamento padrão e adiciona a classe
        // diretamente, sem redesenhar a tela inteira.
        zona.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.currentTarget.classList.add('drag-over');
        });

        // O dragleave apenas remove a classe diretamente.
        zona.addEventListener('dragleave', (e) => {
            e.currentTarget.classList.remove('drag-over');
        });

        // O drop precisa remover a classe 'drag-over'.
        zona.addEventListener('drop', (e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('drag-over'); // Limpa o hover

            // A lógica funcional de atualização de estado permanece a mesma!
            const estadoAposMover = moverImagem(estadoAtual, e.currentTarget.id);
            estadoAtual = finalizarArrastar(estadoAposMover);
            
            // A tela só é redesenhada uma vez, no final da operação.
            atualizarTela();
        });
    });
}
        
// Inicia a aplicação pela primeira vez
atualizarTela();

