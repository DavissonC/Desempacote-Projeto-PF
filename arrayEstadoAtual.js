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
