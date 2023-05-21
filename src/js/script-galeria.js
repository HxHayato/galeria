//Ao carregar, vai ver se já tem sessão. Se não tiver, será redirecionado
if(!sessionStorage.getItem('usuario') && !sessionStorage.getItem('email')){
    try {
        location.replace('../../index.html')
    } catch (error) {
        console.log(`Erro ao redirecionar: ${error}`);
    }
}

//Nome do usuário no menu
const p = document.querySelector('.usuario')
const usuario  = sessionStorage.getItem('usuario')

p.textContent = usuario

//Botao logout
const btnLogout = document.querySelector('.logout')

btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('usuario')
    sessionStorage.removeItem('email')

    try {
        location.replace('../../index.html')
    } catch (error) {
        console.log(`Erro ao redirecionar: ${error}`);
    }
})

//Pegar item clicado(imagem) para ver ela inteira
const body = document.querySelector('body')
let scrollPosition = 0
const imagens = document.querySelectorAll('.image-container')

imagens.forEach(imagem => {
    imagem.addEventListener('click', e => {
        criarModal(e);

        //Fechar modal quando clicar no X
        fecharModal();

        //Travar a mobilidade quando o modal estiver aberto
        travarMobilidade()
    })
})

function fecharModal() {
    const btnFecharModal = document.querySelector('.fechar-modal');

    btnFecharModal.addEventListener('click', () => {
        const containerModal = document.querySelector('.container-modal');
        const divModal = document.querySelector('.modal');

        containerModal.classList.remove('aberto');
        containerModal.classList.add('fechado');
        destravarMobilidade()

        setTimeout(() => {
            containerModal.classList.remove('fechado');
            containerModal.removeChild(divModal);
        }, 450);
    });
}

function criarModal(e) {
    const elemento = e.currentTarget;
    const imgElemento = elemento.querySelector('.imagem');

    //Criando o Modal
    const containerModal = document.querySelector('.container-modal');

    const modal = document.createElement('div');
    modal.classList.add('modal');
    containerModal.appendChild(modal);

    const modalImagem = document.createElement('div');
    modalImagem.classList.add('imagem-modal-container');
    modal.appendChild(modalImagem);

    const imgModal = document.createElement('img');
    imgModal.classList.add('imagem-modal');
    imgModal.setAttribute('src', imgElemento.src)
    imgModal.setAttribute('alt', imgElemento.alt)
    modalImagem.appendChild(imgModal)

    const buttonFecharModal = document.createElement('button');
    buttonFecharModal.classList.add('fechar-modal');
    buttonFecharModal.setAttribute('aria-label', 'Fechar Modal');
    modalImagem.appendChild(buttonFecharModal);

    const icone = document.createElement('i');
    icone.classList.add('bx');
    icone.classList.add('bx-x');
    buttonFecharModal.appendChild(icone);

    containerModal.classList.add('aberto');
}

function travarMobilidade() {
    //Adiciona a classe que esconde o scroll padrão
    body.classList.add('modal-open')
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop
    body.style.top = `-${scrollPosition}px`

    //Cancela o evento de rolagem no corpo
    body.addEventListener('scroll', cancelarRolagem)
    body.addEventListener('touchmove', cancelarRolagem);
}

function cancelarRolagem(event) {
    event.preventDefault();
    event.stopPropagation();
}

function destravarMobilidade () {
    //Remove a classe que esconde o scroll padrão
    body.classList.remove('modal-open');
    body.style.top = '';
    window.scrollTo(0, scrollPosition);

    //Remove o tratador de eventos de rolagem
    body.removeEventListener('scroll', cancelarRolagem);
    body.removeEventListener('touchmove', cancelarRolagem);
}