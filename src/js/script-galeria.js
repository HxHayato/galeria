//Ao carregar, vai ver se já tem sessão. Se não tiver, será redirecionado
if(!sessionStorage.getItem('usuario') && !sessionStorage.getItem('email')){
    try {
        location.replace('./index.html')
    } catch (error) {
        console.log(`Erro ao redirecionar: ${error}`)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Loading
    const body = document.querySelector('body');
    const image = document.querySelectorAll('.imagem');
    var imagesLoaded = 0;

    image.forEach(img => {
        //Criar nova imagem
        const novaImagem = new Image();

        novaImagem.addEventListener('load', () => {
            imagesLoaded++;

            if(imagesLoaded === image.length){
                //Permite que tenha scrollbar no body e remove a tela de loading
                if(body.classList.contains('load')){
                    body.classList.remove('load');
                }
                document.getElementById('loading').style.display = 'none';
            }
        });

        // Adicione um ouvinte de evento de erro, se necessário
        novaImagem.addEventListener('error', () => {
            console.error('Erro ao carregar uma imagem.');
        });

        //Define o src para começar o carregamento
        novaImagem.src = img.src;
    });
});

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
        location.replace('./index.html')
    } catch (error) {
        console.log(`Erro ao redirecionar: ${error}`)
    }
})

//Pegar item clicado(imagem) para ver ela inteira
const imagens = document.querySelectorAll('.image-container')

imagens.forEach(imagem => {
    imagem.addEventListener('click', e => {
        criarModal(e)

        //Fechar modal quando clicar no X
        adicionarOuvinteButton()

        //Fechar o modal quando clicar fora do modal
        adicionarOuvinteContainerModal()
    })
})

function adicionarOuvinteContainerModal() {
    const containerModal = document.querySelector('.container-modal')
    const modal = document.querySelector('.modal')

    containerModal.addEventListener('click', (e) => {
        if (!modal.contains(e.target)) {
            fecharModal()
        }
    })
}

function adicionarOuvinteButton() {
    const btnFecharModal = document.querySelector('.fechar-modal')

    btnFecharModal.addEventListener('click', () => {
        fecharModal()
    })
}

function fecharModal() {
    const containerModal = document.querySelector('.container-modal')
    const divModal = document.querySelector('.modal')

    containerModal.classList.remove('aberto')
    containerModal.classList.add('fechado')

    setTimeout(() => {
        containerModal.classList.remove('fechado')
        containerModal.removeChild(divModal)
    }, 450)
}

function criarModal(e) {
    const elemento = e.currentTarget
    const imgElemento = elemento.querySelector('.imagem')

    //Criando o Modal
    const containerModal = document.querySelector('.container-modal')

    const modal = document.createElement('div')
    modal.classList.add('modal')
    containerModal.appendChild(modal)

    const modalImagem = document.createElement('div')
    modalImagem.classList.add('imagem-modal-container')
    modal.appendChild(modalImagem)

    const imgModal = document.createElement('img')
    imgModal.classList.add('imagem-modal')
    imgModal.setAttribute('src', imgElemento.src)
    imgModal.setAttribute('alt', imgElemento.alt)
    modalImagem.appendChild(imgModal)

    const buttonFecharModal = document.createElement('button')
    buttonFecharModal.classList.add('fechar-modal')
    buttonFecharModal.setAttribute('aria-label', 'Fechar Modal')
    modalImagem.appendChild(buttonFecharModal)

    const icone = document.createElement('i')
    icone.classList.add('bx')
    icone.classList.add('bx-x')
    buttonFecharModal.appendChild(icone)

    containerModal.classList.add('aberto')
}