//Ao carregar, vai ver se já tem sessão, se tiver, já redireciona
if(sessionStorage.getItem('usuario') && sessionStorage.getItem('email')){
    try {
        location.replace('./galeria.html')
    } catch (error) {
        console.log(`Erro ao redirecionar: ${error}`);
    }
}

//Sumindo com a tela do loading quando a imagem carregar
document.addEventListener('DOMContentLoaded', () => {
    loading.style.display = 'none';
})

const body = document.querySelector('body');
const loadingContainer = document.querySelector('.loading');


//Alterar entre Login e Cadastro
const formLogin = document.querySelector('.form-login')
const formCadastro = document.querySelector('.form-cadastro')
const btnAlterarLogCad = document.querySelectorAll('.alterarLoginCadastro')

btnAlterarLogCad.forEach(botao => {
    botao.addEventListener('click', () => {
        alternarLoginCadastro()
    })
})

function alternarLoginCadastro() {
    //Vê qual está sendo exibido na tela
    if(formLogin.classList.contains('aberto')) {
        //Se a tela de login estiver sendo exibida
        formLogin.classList.remove('aberto')
        formCadastro.classList.add('aberto')
    } else {
        //Se a tela de cadastro estiver sendo exibida
        formCadastro.classList.remove('aberto')
        formLogin.classList.add('aberto')
    }
}
//Efeito de floating label (rótulo flutuante)
const campoInput = document.querySelectorAll('.campo-input')

campoInput.forEach(campo => {
    //Quando tiver com o foco
    campo.addEventListener('focus', () => {
        campo.classList.add('filled')
    })

    //Quando perder o foco
    campo.addEventListener('blur', () => {
        if(campo.value == ''){
            campo.classList.remove('filled')
        }
    })
})

//O getElementsByTagName retorna uma coleção HTML que precisa ser convertida para array com Array.from() para poder usar o forEach

//Validando os dados
const forms = document.getElementsByTagName('form')
const botaoLogin = document.getElementById('btnLogin')
const botaoCadastro = document.getElementById('btnCadastro')

for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', function(e) {
        e.preventDefault(); 
    });
}

botaoLogin.addEventListener('click', e => {
    const campoEmail = document.getElementById('loginEmail')
    const campoSenha = document.getElementById('loginSenha')
    
    if(localStorage.getItem('usuarios.json')){
        const lista = JSON.parse(localStorage.getItem('usuarios.json'))

        const usuario = lista.filter(user => {
            if(user.email == campoEmail.value && user.senha == campoSenha.value){
                return user
            }
        })

        if(usuario != ''){
            //Caso esteja tudo certo
            sessionStorage.setItem('usuario', usuario[0].username)
            sessionStorage.setItem('email', usuario[0].email)

            try {
                location.replace('./galeria.html')
            } catch (error) {
                console.log(`Erro ao redirecionar: ${error}`);
            }
        } else {
            const avisoLogin = document.querySelector('.aviso-login')

            //Duas ou mais vezes que informa email inválido
            avisoLogin.style.display = 'flex'
            avisoLogin.classList.add('animar')

            setTimeout(() => {
                avisoLogin.classList.remove('animar')
            }, 1000);
        }
    }
})

//Validar o email em todos os casos

botaoCadastro.addEventListener('click', e => {
    const campoUsername = document.getElementById('cadastroUsername')
    const campoEmail = document.getElementById('cadastroEmail')
    const campoSenha = document.getElementById('cadastroSenha')
    const novoUsuario = new Usuario(campoUsername.value, campoEmail.value, campoSenha.value)

    //verifica o formato do email
    if(validarEmail(novoUsuario.email)){
        if (localStorage.getItem('usuarios.json')) {
            let lista = JSON.parse(localStorage.getItem('usuarios.json')) 
            //Verifica se a lista tem algum item que tenha o mesmo email desse novoUsuario
            const verificador = lista.filter(usuario => novoUsuario.email == usuario.email)
            if (verificador.length == 0) {
                lista.push(novoUsuario)
                localStorage.setItem('usuarios.json', JSON.stringify(lista))
    
                //Verificando se tem a mensagem de email já cadastrado na tela
                const avisoEmail = document.querySelector('.aviso-cadastro')
    
                if(avisoEmail.style.display = 'flex'){
                    avisoEmail.style.display = 'none'
                }
    
                //Criando as sessões e redirecionando
                sessionStorage.setItem('usuario', novoUsuario.username)
                sessionStorage.setItem('email', novoUsuario.email)
    
                //Cadastrado com sucesso
                const modal = document.querySelector('.modal')
    
                modal.classList.add('aberto')
    
                setTimeout(() => {
                    modal.classList.remove('aberto')
                    //Redirecionar para a galeria
                    try {
                        location.replace('./galeria.html')
                    } catch (error) {
                        console.log(`Erro ao redirecionar: ${error}`);
                    }
                }, 3800);
    
            } else {
                //Já tem esse email cadastrado
                const avisoEmail = document.querySelector('.aviso-cadastro')
    
                avisoEmail.style.display = 'flex'
                avisoEmail.classList.add('animar')
    
                setTimeout(() => {
                    avisoEmail.classList.remove('animar')
                }, 1000);
            }
        } else {
            //Não existe o cadastro
            lista = [novoUsuario]
            localStorage.setItem('usuarios.json', JSON.stringify(lista))
            
            //Cadastrado com sucesso
            const modal = document.querySelector('.modal')
    
            modal.classList.add('aberto')
    
            setTimeout(() => {
                modal.classList.remove('aberto')
                //Redirecionar para a galeria
                try {
                    location.replace('galeria.html')
                } catch (error) {
                    throw error
                }
            }, 5000);
        }
    } else {
        const avisoEmailInvalido = document.querySelector('.aviso-email-invalido')

        avisoEmailInvalido.style.display = 'flex'
        avisoEmailInvalido.classList.add('animar')
    
        setTimeout(() => {
            avisoEmailInvalido.classList.remove('animar')
        }, 1000);
    }
})

function validarEmail (email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+[^\s@]*$/;

    //Testa o email e vê se está regular
    if(regexEmail.test(email)){
        return true
    } else {
        return false
    }
}

class Usuario {
    constructor(username, email, senha){
        this.username = username
        this.email = email
        this.senha = senha
    }
}
