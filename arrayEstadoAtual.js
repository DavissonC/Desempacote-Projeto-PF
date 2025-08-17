const estadoAtual = [{ // A array com o único objeto de estado dentro dela
    imagens: {
        'img1': { src: 'armário.jpg' , alt: 'ArmárioGrande'},
        'img2': { src: 'https://png.pngtree.com/png-clipart/20230914/original/pngtree-water-jug-vector-png-image_11243534.png', alt: 'Jarro 2D' },
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

    // Aqui usamos Object.keys() para pegar ['galeria', 'favoritos'] e com o .map, executamos algumas tarefas para gerar a string HTML
    return Object.keys(estado.zonas).map(zonaId => {
        return `<div 
                class="drop-zone ${

                /* Verifica se a zona em hover (em que o cursor está sobrevoando) é igual à 'zonaId' para aplicar 
                à string em html a classe'drag-over' ou '' */
                (estado.zonaEmHover === zonaId) ? 'drag-over' : ''}" 
                id="${zonaId}"
            >
                <h2>${
                
                /*Coloca a primeira letra do nome da zona em maiúsculo*/
                zonaId.charAt(0).toUpperCase() + zonaId.slice(1)}</h2>
                
                ${ /* Inicia a lógica para gerar as imagens */
                
                // Aqui, mapeamos as as imagens presentes em cada zona e executamos algumas tarefas  
                estado.zonas[zonaId].map(imgId => {    
                    const imagem = estado.imagens[imgId];
                        return `
                            <img 
                                src="${imagem.src}" 
                                alt="${imagem.alt}"
                                id="${imgId}" 
                                class="imagem-arrastavel ${(estado.imagemSendoArrastada === imgId) ? 'arrastando' : ''}" 
                                draggable="true"
                            >`;
                   }).join('')
                }
            </div>`;
    }).join('');
    // .join é usado para unir a array em uma única string
}
// as funções abaixo recebem o estado antigo e retornam um novo estado atualizado

const iniciarArrastar = (estado, idDaImagem) => {
    return { ...estado, imagemSendoArrastada: idDaImagem }
}

const finalizarArrastar = (estado) => {
    return { ...estado, imagemSendoArrastada: null, zonaEmHover: null }
}

const atualizarZonaEmHover = (estado, idDaZona) => {
    return { ...estado, zonaEmHover: idDaZona }
}

const moverImagem = (estado, idDaZonaDestino) => {

    // Salva o ID da imagem que está sendo arrastada para um uso posterior
    const idDaImagem = estado.imagemSendoArrastada;

    // Se não houver uma imagem sendo arrastada, retorna a string anterior
    if (!idDaImagem) return estado;

    else{
        // Pega as chaves do objeto de zonas original
        const chavesDasZonas = Object.keys(estado.zonas);

        // zonasAtualizadas usa chavesDasZonas.reduce() para construir um novo objeto de zonas do zero
        const zonasAtualizadas = chavesDasZonas.reduce((acc, zonaId) => {
            // 'acc' é a nossa 'variável acumuladora'
            // 'zonaId' é a chave atual ('galeria', depois 'favoritos')

            // 1. Remove a imagem da zona atual (se ela estiver lá)
            const imagensNaZona = estado.zonas[zonaId].filter(id => id !== idDaImagem);

            // 2. Adiciona a imagem se a zona de destino estiver correta
            if (zonaId === idDaZonaDestino) {
                acc[zonaId] = [...imagensNaZona, idDaImagem];
            } else {
                acc[zonaId] = imagensNaZona;
            }

            // 3. Retorna o objeto acumulador para a próxima iteração
            return acc;
        }, {}); // O {} no final é o valor inicial do nosso acumulador (um objeto vazio)

        // Retorna o novo estado completo com o objeto de zonas totalmente novo
        return { ...estado, zonas: zonasAtualizadas };
    }
};

// Parte não funcional, necessária para o funcionamento do arraste

// appContainer armazena o nosso elemento HTML
const appContainer = document.getElementById('app');

const atualizarTela = () => {
    // Passamos o objeto que está dentro do array para a função renderizar.
    appContainer.innerHTML = renderizar(estadoAtual[0]);
    adicionarEventListeners();
}

// adicionarEventListeners 'computa' todas as mudanças que o usuário for fazer na tela 
const adicionarEventListeners = () => {

    //querySelectorAll seleciona todas as imagens arrastáveis e, para cada uma, adiciona os eventListeners necessários
    document.querySelectorAll('.imagem-arrastavel').forEach(imagem => {
        imagem.addEventListener('dragstart', (e) => {
            
            // Atualiza o estado da imagem clicada para imagemSendoArrastada
            const novoEstado = iniciarArrastar(estadoAtual[0], e.target.id);
            // Atualiza o estado atual
            estadoAtual[0] = novoEstado;

            // setTimeout pede para que a função seja retornada o mais rápido possível, contanto que o navegador já tenha terminado
            // suas tarefas antecedentes, garante que a aparência do elemento original só seja alterada depois que o navegador já 
            // tenha preparado a imagem de arraste 
            setTimeout(atualizarTela, 0); 
        });
        // Indica a finalização do arraste
        imagem.addEventListener('dragend', () => {
            estadoAtual[0] = finalizarArrastar(estadoAtual[0]);
            atualizarTela();
        });
    });

    //querySelectorAll() faz, para cada zona, as tarefas abaixo
    document.querySelectorAll('.drop-zone').forEach(zona => {
        
        // dragover significa que a imagem que está sendo arrastada está sobre essa zona em específico
        zona.addEventListener('dragover', (e) => {
            // preventDefault previne que apareça um sinal de bloqueado no cursor quando a imagem estiver sobre uma drop zone
            e.preventDefault();
            e.currentTarget.classList.add('drag-over');
        });
        
        // dragleave significa que o cursor saiu da drop zone
        zona.addEventListener('dragleave', (e) => {
            e.currentTarget.classList.remove('drag-over');
        });

        // drop significa que o objeto foi solto em uma drop zone
        zona.addEventListener('drop', (e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('drag-over');

            // estadoAposMover atualiza o 'estadoAtual' para o estado atual
            const estadoAposMover = moverImagem(estadoAtual[0], e.currentTarget.id);
            estadoAtual[0] = finalizarArrastar(estadoAposMover);
            
            atualizarTela();
        });
    });
}
// atualizarTela() é usado para fazer o primeiro movimento do código        
atualizarTela();
