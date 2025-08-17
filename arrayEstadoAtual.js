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
            // 
