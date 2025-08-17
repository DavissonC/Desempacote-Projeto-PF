// A array com o único objeto de estado dentro dela
const estadoAtual = [{
    imagens: {
        'img1': { src: 'armário.jpg', alt: 'ArmárioGrande' },
        'img2': { src: 'https://png.pngtree.com/png-clipart/20230914/original/pngtree-water-jug-vector-png-image_11243534.png', alt: 'Jarro 2D' },
        'img3': { src: 'https://via.placeholder.com/150/008000/FFFFFF?text=C' },
        'img4': { src: 'https://via.placeholder.com/150/FFFF00/000000?text=D' }
    },
    zonas: {
        'galeria': ['img1', 'img2', 'img3', 'img4'],
        'favoritos': [],
        'prateleira-do-meio': [],
        'prateleira-de-baixo': [],
        'p': [],
        'favoritos2': []
    },
    imagemSendoArrastada: null,
    zonaEmHover: null
}];

//-------------------------------------------------------------------------------------------------------------------------------------
// Função renderizar: recebe o estado e retorna uma string HTML. Não modifica nada fora dela.
//-------------------------------------------------------------------------------------------------------------------------------------

const renderizar = (estado) => {
    // Aqui usamos Object.keys() para pegar ['galeria', 'favoritos'] e com o .reduce, transformamos em um objeto final
    return Object.keys(estado.zonas).reduce((acc, zonaId) => {
        // 'acc' é a nossa 'variável acumuladora'
        // 'zonaId' é a chave atual ('galeria', depois 'favoritos')

        // Aqui, mapeamos as imagens presentes em cada zona e executamos algumas tarefas
        const htmlDasImagens = estado.zonas[zonaId].map(imgId => {

            // imagem armazena os dados de cada imagem, uma por vez
            const imagem = estado.imagens[imgId];
            
            // Verifica se essa imagem está sendo arrastada
            const classeArrastando = (estado.imagemSendoArrastada === imgId) ? 'arrastando' : '';
            return `<img 
                        src="${imagem.src}" 
                        alt="${imagem.alt}"
                        id="${imgId}" 
                        class="imagem-arrastavel ${classeArrastando}" 
                        draggable="true"
                    >`;
        }).join(''); // .join é usado para unir a array em uma única string

        //acc[zonaId]: Monta a string HTML com cada zona e suas atuais imagens correspondentes.
        acc[zonaId] = `
            <div class="drop-zone" id="${zonaId}">
                <h2>${
                    /*Coloca a primeira letra do nome da zona em maiúsculo*/
                    zonaId.charAt(0).toUpperCase() + zonaId.slice(1)
                }</h2>
                ${htmlDasImagens}
            </div>`;
        
        // Retorna o objeto acumulador para a próxima iteração
        return acc;
    }, {}); // O {} no final é o valor inicial do nosso acumulador (um objeto vazio)
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

    // Se não houver uma imagem sendo arrastada, retorna a string anterior
    if (!idDaImagem) return estado;

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
};

//----------------------------------------------------------------------------------------------------------------------------------
// Parte não funcional, necessária para o funcionamento do arraste
//----------------------------------------------------------------------------------------------------------------------------------

// appContainer armazena o nosso elemento HTML
const galeriaContainer = document.getElementById('app-galeria');
const favoritosContainer = document.getElementById('app-favoritos');
 
// atualizarTela é a responsável por atualizar as informações presentes na tela após qualquer mudança
const atualizarTela = () => {

    // htmlPorZona armazena a string gerada pela função renderizar
    const htmlPorZona = renderizar(estadoAtual[0]);
    
    // Atualiza a galeria (parte fora do armário)
    if (galeriaContainer) galeriaContainer.innerHTML = htmlPorZona.galeria;

    // Atualiza os favoritos (parte de dentro do armário)
    if (favoritosContainer) {
        const htmlFavoritos = Object.keys(htmlPorZona)
            //.filter seleciona todas as drop zones, menos a galeria
            .filter(zonaId => zonaId !== 'galeria')
            //.map reorganiza a lista de itens em cada zona dos favoritos
            .map(zonaId => htmlPorZona[zonaId])
            //.map junta tudo numa string html única
            .join('');
        
            // favoritosContainer é atualizado para conter os novos dados dos elementos do container
        favoritosContainer.innerHTML = htmlFavoritos;
    }
    
    // A chamada para adicionar os eventos PRECISA estar DENTRO da função
    // que redesenha a tela, para ser executada toda vez.
    adicionarEventListeners(); 
};

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
};

// atualizarTela() é usado aqui para fazer o primeiro movimento do código
atualizarTela();