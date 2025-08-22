// Constante que armazena as propriedades estáticas de cada tipo de imagem.
// Esta é uma "tabela" de dados que não muda.
const imageProperties = {
  'manipulavel1.png': { size: 'clamp(40px, 9vw, 120px)', rotation: -3, speed: 1.0 },
  'manipulavel2.png': { size: 'clamp(30px, 10vw, 50px)', rotation: 5, speed: 1.0 },
  'manipulavel3.png': { size: 'clamp(45px, 10vw, 80px)', rotation: -7, speed: 1.0 },
};

/**
 * Função pura que retorna um objeto com propriedades aleatórias para uma nova imagem.
 * Ela não interage com o DOM.
 * @param {string[]} images - Array com os nomes dos arquivos de imagem disponíveis.
 * @returns {object} - Um objeto contendo a src, tamanho, rotação, opacidade e velocidade de queda.
 */
const createRandomImageProps = (images) => {
  // Escolhe uma imagem aleatória do array `images`.
  const randomImageSrc = images[Math.floor(Math.random() * images.length)];
  // Pega as propriedades pré-definidas para a imagem escolhida.
  const props = imageProperties[randomImageSrc];

  // Retorna um novo objeto com propriedades geradas aleatoriamente para a nova imagem.
  return {
    src: randomImageSrc,
    size: props.size,
    rotation: props.rotation,
    opacity: Math.random() * 0.4 + 0.6, // Opacidade aleatória para dar um efeito de profundidade.
    fallSpeed: props.speed * (Math.random() * 0.5 + 0.75) // Velocidade de queda levemente aleatória.
  };
};
// Constantes que pegam referências para os elementos HTML na página.
const playBtn = document.getElementById('playBtn');
const creditsBtn = document.getElementById('creditsBtn');
const creditsDlg = document.getElementById('credits');
const closeCredits = document.getElementById('closeCredits');
const fallingContainer = document.querySelector('.falling-container');
const images = ['manipulavel1.png', 'manipulavel2.png', 'manipulavel3.png'];

// Constantes de configuração do jogo.
const maxImages = 15;

// Variáveis de estado do jogo.
// fallingImages: armazena uma lista de referências para as imagens que estão caindo.
// draggedImage: armazena a referência para a imagem que está sendo arrastada no momento.
const fallingImages = [];
let draggedImage = null;

/**
 * Inicia a animação de queda de um elemento usando requestAnimationFrame.
 * @param {HTMLElement} element - O elemento do DOM que irá cair.
 */
const startFall = (element) => {
  // A função `fallLoop` é chamada repetidamente para criar a animação.
  const fallLoop = () => {
    // Obtém a posição atual do topo do elemento e sua velocidade de queda.
    const currentTop = parseFloat(element.style.top);
    const fallSpeed = parseFloat(element.dataset.fallSpeed);
    // Calcula a nova posição.
    const newTop = currentTop + fallSpeed;
    // Atualiza a posição do elemento no DOM.
    element.style.top = `${newTop}px`;

    // Continua a animação se a referência da animação ainda existir.
    if (element.dataset.animationId) {
      requestAnimationFrame(fallLoop);
    }
  };
  // Armazena o ID da animação para poder pará-la depois.
  element.dataset.animationId = requestAnimationFrame(fallLoop);
};

/**
 * Para a animação de queda de um elemento.
 * @param {HTMLElement} element - O elemento cuja animação será interrompida.
 */
const stopFall = (element) => {
  if (element.dataset.animationId) {
    cancelAnimationFrame(element.dataset.animationId);
    element.dataset.animationId = '';
  }
};

/**
 * Cria e adiciona um novo elemento <img> ao DOM com base nas propriedades passadas.
 * @param {object} props - Propriedades da imagem a ser criada.
 * @returns {HTMLImageElement} - O elemento <img> criado.
 */
const createAndAppendImage = (props) => {
  const img = document.createElement('img');
  img.src = props.src;
  img.className = 'falling-image draggable';
  img.style.width = props.size;
  img.style.height = 'auto';
  img.style.left = `${Math.random() * 100}vw`; // Posição horizontal aleatória.
  img.style.top = '-150px'; // Inicia a imagem acima da tela.
  img.style.transform = `rotate(${props.rotation}deg)`;
  img.style.opacity = props.opacity;
  img.dataset.fallSpeed = props.fallSpeed;
  return img;
};

/**
 * Recicla uma imagem que saiu da tela, dando a ela novas propriedades e a reposicionando.
 * @param {HTMLImageElement} imgToRecycle - A imagem a ser reciclada.
 */
const recycleImage = (imgToRecycle) => {
  stopFall(imgToRecycle); // Para a animação atual.
  const newProps = createRandomImageProps(images); // Obtém novas propriedades para a imagem.
  // Atualiza as propriedades de estilo e atributos da imagem existente.
  imgToRecycle.src = newProps.src;
  imgToRecycle.style.width = newProps.size;
  imgToRecycle.style.opacity = newProps.opacity;
  imgToRecycle.style.left = `${Math.random() * 100}vw`;
  imgToRecycle.style.top = '-150px';
  imgToRecycle.style.transform = `rotate(${newProps.rotation}deg)`;
  imgToRecycle.dataset.fallSpeed = newProps.fallSpeed;
  startFall(imgToRecycle); // Reinicia a animação de queda com as novas propriedades.
};

/**
 * Função que lida com o início do arrasto de uma imagem.
 * @param {MouseEvent} e - O objeto do evento de clique do mouse.
 */
const onMouseDownOnImage = (e) => {
  draggedImage = e.currentTarget; // Define a imagem que está sendo arrastada.
  draggedImage.style.cursor = 'grabbing'; // Muda o cursor para indicar que a imagem pode ser movida.
  stopFall(draggedImage); // Para a animação de queda enquanto a imagem é arrastada.
  draggedImage.style.zIndex = '100'; // Eleva a imagem para que ela fique acima de outras.

  const rect = draggedImage.getBoundingClientRect();
  // Calcula o offset (diferença) entre a posição do mouse e o canto da imagem.
  const offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };

  // Funções internas para o movimento e soltura da imagem.
  const onMouseMove = (e) => {
    // Se há uma imagem sendo arrastada, atualiza sua posição com base no movimento do mouse.
    if (draggedImage) {
      const parentRect = fallingContainer.getBoundingClientRect();
      const newX = e.clientX - parentRect.left - offset.x;
      const newY = e.clientY - parentRect.top - offset.y;
      draggedImage.style.left = `${newX}px`;
      draggedImage.style.top = `${newY}px`;
    }
  };

  const onMouseUp = () => {
    // Ao soltar o mouse, reseta os estilos e reinicia a queda.
    if (draggedImage) {
      draggedImage.style.cursor = 'grab';
      draggedImage.style.zIndex = '';
      startFall(draggedImage);
      draggedImage = null;
      // Remove os event listeners de movimento e soltura para evitar bugs.
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
  };

  // Adiciona os listeners para o movimento e soltura do mouse.
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

// ===============================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ===============================================

// Loop inicial para popular a tela com 5 imagens.
for (let i = 0; i < 5; i++) {
  const props = createRandomImageProps(images);
  const newImage = createAndAppendImage(props);
  // Adiciona o listener para arrastar e soltar.
  newImage.addEventListener('mousedown', onMouseDownOnImage);
  fallingContainer.appendChild(newImage);
  fallingImages.push(newImage);
  startFall(newImage);
}

// Loop principal que controla o fluxo de imagens.
// Ele é executado a cada 2 segundos.
setInterval(() => {
  // Encontra a primeira imagem que saiu da tela.
  const imageToRecycle = fallingImages.find(img => img.getBoundingClientRect().top > window.innerHeight);
  if (imageToRecycle) {
    // Se encontrou, recicla essa imagem.
    recycleImage(imageToRecycle);
  } else if (fallingImages.length < maxImages) {
    // Se não encontrou uma para reciclar e o limite não foi atingido, cria uma nova.
    const props = createRandomImageProps(images);
    const newImage = createAndAppendImage(props);
    newImage.addEventListener('mousedown', onMouseDownOnImage);
    fallingContainer.appendChild(newImage);
    fallingImages.push(newImage);
    startFall(newImage);
  }
}, 2000); // Intervalo de 2 segundos.

// ===============================================
// LISTENERS PARA A INTERFACE (BOTÕES E MODAL)
// ===============================================

// Listener para o botão "Jogar".
//Agora, o jogador será redirecionado para o espaço de jogo
playBtn.addEventListener('click', () => {
  window.location.href = 'https://raw.githubusercontent.com/DavissonC/Desempacote-Projeto-PF/refs/heads/main/DESEMPACOTE!/Arrastar.html';
});

// Listener para o botão "Créditos" que abre o modal.
creditsBtn.addEventListener('click', () => creditsDlg.showModal());

// Listener para o botão "Fechar" que fecha o modal.
closeCredits.addEventListener('click', () => creditsDlg.close());

// Listener para eventos de teclado (Enter para jogar, Esc para fechar o modal).
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !creditsDlg.open) playBtn.click();
  if (e.key === 'Escape' && creditsDlg.open) creditsDlg.close();
});

// Listener para fechar o modal ao clicar fora dele.
creditsDlg.addEventListener('click', (e) => {
  const rect = creditsDlg.getBoundingClientRect();
  const inDialog =
    e.clientX >= rect.left && e.clientX <= rect.right &&
    e.clientY >= rect.top && e.clientY <= rect.bottom;
  if (!inDialog) creditsDlg.close();
});
