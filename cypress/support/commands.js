import {genericElements,loginPage,usuarioPage,usuariosListagemPage,links} from "../fixtures/utils"

Cypress.Commands.add("acessaConfigFincanceira",(usuario,senha)=>{
    
    cy.acessaPaginaInicialESelecionaTipoAcesso()
    cy.preencheInfoLogin(usuario,senha)
    cy.confirma(0)
    cy.configFinanceiraBtn().click()
})

Cypress.Commands.add("validaTituloPagina",(titulo)=>{

    cy.get(genericElements.tituloPage).should("be.visible").should("have.text",titulo)
})

Cypress.Commands.add("acessaListagemPerfis",()=>{
    
    cy.get(links.listagemPerfis).should("be.visible").click()
    cy.validaTituloPagina("Perfis de acesso")
})

Cypress.Commands.add("validaPerfilCriado",(usuario,senha,perfil)=>{
    cy.obtemPerfil(usuario,senha,perfil).then((idPerfil)=>{
        cy.visit(`/profiles/${idPerfil}`)
        cy.get(usuarioPage.campoPerfil).should("be.visible").should("have.attr","value",perfil)
        
        cy.validaTituloPagina("Editar perfil de acesso")
      })
})


Cypress.Commands.add("clicaBtnFuncionalidades",()=>{
    
    cy.get(usuarioPage.btnFuncionalidades).eq(0).should("be.visible").click()
})

Cypress.Commands.add("validaAlerta",(textoAlerta)=>{
    
    cy.get(genericElements.alerta).should("be.visible").should("have.text",textoAlerta)
})

Cypress.Commands.add("preencheNomePerfil",(perfil)=>{

    cy.get(usuarioPage.campoPerfil).should("be.visible").should("not.have.text").type(perfil)
    cy.get(usuarioPage.campoPerfil).should("be.visible").should("have.attr","value",perfil)
})

Cypress.Commands.add("criaUsuario",(cpf,cpfEsperado,email,nome,sobrenome,perfil)=>{
    cy.acessaCriacaoUsuario()
    cy.preencheInfosCriacaoUsuarioNovo(cpf,cpfEsperado,email,nome,sobrenome,perfil)
   
})

Cypress.Commands.add("preencheInfoLogin",(usuario,senha)=>{
      
      cy.get(loginPage.usuario).should("be.visible").should("not.have.text").type(usuario)
      cy.get(loginPage.usuario).should("be.visible").should("have.attr","value",usuario)
      cy.get(loginPage.senha).should("be.visible").should("not.have.text").type(senha)
      cy.get(loginPage.senha).should("be.visible").should("have.attr","value",senha)
})

Cypress.Commands.add("clicaEsqueceuSenha",()=>{
    
    cy.get(links.esqueceuSenha).should("be.visible").should("have.text","Esqueceu a senha?").click()
    cy.get(usuarioPage.email).should("be.visible").should("not.have.text")
})

Cypress.Commands.add("preencheInfosCriacaoUsuarioNovo",(cpfInserido,cpfEsperado,email,nome,sobrenome,perfil)=>{
       
    cy.get(usuarioPage.cpf).should("be.visible").should("not.have.text").type(cpfInserido)
      
      
    cy.get(usuarioPage.cpf).should("be.visible").should("have.attr","value",cpfEsperado)
    cy.get(usuarioPage.email).should("be.visible").should("not.have.text").type(email)
    cy.get(usuarioPage.email).should("be.visible").should("have.attr","value",email)
    cy.get(usuarioPage.nome).should("be.visible").should("not.have.text").type(nome)
    cy.get(usuarioPage.nome).should("be.visible").should("have.attr","value",nome)
    cy.get(usuarioPage.sobrenome).should("be.visible").should("not.have.text").type(sobrenome)
    cy.get(usuarioPage.sobrenome).should("be.visible").should("have.attr","value",sobrenome)

    cy.get(usuarioPage.perfil).should("be.visible").select(perfil)
    cy.get(genericElements.confirmar).should("be.visible").should("be.enabled").click()
})


Cypress.Commands.add("pesquisaUsuario",(cpfInserido,posicaoCard)=>{
    
    cy.get(usuariosListagemPage.campoPesquisa).should("be.visible").should("not.have.text").type(cpfInserido)
    cy.get(usuariosListagemPage.pesquisar).should("be.visible").click()
    cy.get(usuariosListagemPage.card).eq(posicaoCard).should("not.exist")
})


Cypress.Commands.add("acessaListaUsuarios",()=>{
    
    cy.get(links.listagemUsuarios).should("be.visible").click()
    cy.validaTituloPagina("Usuários")
})

Cypress.Commands.add("checkPermissao",(permissaoElement,permissao)=>{
    
    cy.get(permissaoElement).should("be.visible").should("have.text",permissao)

})

Cypress.Commands.add("acessaPaginaInicialESelecionaTipoAcesso",()=>{
    
    cy.visit("/")
    cy.get(loginPage.selectTipoAcesso).should("be.visible").select("acesso_interno")
})

Cypress.Commands.add("validaErroCampo",(posicao,erroTexto)=>{

    cy.get(genericElements.erroCampo).eq(posicao).should("be.visible").should("have.text",erroTexto)
})

Cypress.Commands.add("acessaCriacaoUsuario",()=>{
    
    cy.get(links.criaUsuario).should("be.visible").click({force:true})
})

Cypress.Commands.add("cancelaPesquisa",()=>{
    
    cy.get(usuariosListagemPage.cancelarPesquisa).should("be.visible").click()
    cy.get(usuariosListagemPage.campoPesquisa).should("be.visible").should("not.have.text")
})

Cypress.Commands.add("excluiUsuario",()=>{
    
    cy.get(usuarioPage.excluirUsuario).should("be.visible").click()
    cy.get(usuarioPage.modal).find(genericElements.confirmar).should("be.visible").click()
    
})

Cypress.Commands.add("usuarioEncontrado",(cpfEsperado)=>{

    cy.get(usuariosListagemPage.card).find(usuariosListagemPage.cardCpf).eq(0).should("be.visible").should("have.text",cpfEsperado)
    
})

Cypress.Commands.add("validaNomeUsuario",(nome,sobrenome)=>{
    cy.get(usuarioPage.nomeCompleto).should("be.visible").should("have.text",`${nome} ${sobrenome}`)
  
})

Cypress.Commands.add("acessaUsuario",(cpfEsperado,nome,sobrenome)=>{
    cy.usuarioEncontrado(cpfEsperado).click()
    cy.validaNomeUsuario(nome,sobrenome)
    
})

Cypress.Commands.add("validaCheckPermissao",(checkElemento,possuiOuNaoAtributo)=>{
    
    cy.get(checkElemento).should(possuiOuNaoAtributo,"checked")
})

Cypress.Commands.add("listaVazia",()=>{
    
    cy.get(usuariosListagemPage.listaVazia).should("be.visible").should("have.text","Não foram encontrados usuários.")
})

Cypress.Commands.add("configFinanceiraBtn",()=>{
    
    cy.get(genericElements.configFincanceira).should("be.visible").should("have.text","Configuração da financeira")
})

Cypress.Commands.add("confirma",(posicaoBtn)=>{
    
    cy.get(genericElements.confirmar).eq(posicaoBtn).should("be.visible").should("be.enabled").click()
})

Cypress.Commands.add("criaPerfil",(usuario,senha,perfil)=>{
    
    cy.request({
        
        method:"POST",
        url:"https://api.qa.hmg.tec.br/api/v3/login/",
        body:{
            "tipo":"senha",
            "identificador":usuario,
            "segredo":senha
        }
      }).then((resp)=>{
        
        
        cy.request({
          method:"GET",
          url:"https://api.qa.hmg.tec.br/api/v3/me/funcoes",
          headers:{
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${resp.body.token_jwt}`
            
          }
             }).then((resp3)=>{
                cy.request({
                    method:"POST",
                    url:"https://api.qa.hmg.tec.br/api/v3/perfis/",
                    headers:{
                        Authorization:resp3.requestHeaders.Authorization,
                        "User-Funcao":resp3.body.results[0].id
                    },
                    body:{
                        "descricao":perfil,
                        "permissoes":["CRED_PERFIL_LIST", "CRED_USUARIOS_LIST"]
                    }
                    
                    
                  })

        })
    })  
})  

Cypress.Commands.add("deletaPerfil",(usuario,senha,perfil)=>{
      cy.request({
        
        method:"POST",
        url:"https://api.qa.hmg.tec.br/api/v3/login/",
        body:{
            "tipo":"senha",
            "identificador":usuario,
            "segredo":senha
        }
      }).then((resp)=>{
        
        
        cy.request({
          method:"GET",
          url:"https://api.qa.hmg.tec.br/api/v3/me/funcoes",
          headers:{
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${resp.body.token_jwt}`
            
          }
             }).then((resp3)=>{
            
          cy.request({
            method:"GET",
            url:`https://api.qa.hmg.tec.br/api/v3/perfis/?limit=30`,
            headers:{
                Authorization:resp3.requestHeaders.Authorization,
                "User-Funcao":resp3.body.results[0].id
            }
            
          }).then((resp4)=>{

            var perfilRecebido = resp4.body.results
            var cpfObtido = perfilRecebido.filter(item => item.descricao === perfil);
            let i
            for(i in cpfObtido){
                
            cy.request({
                method:"DELETE",
                failOnStatusCode:false,
                url:`https://api.qa.hmg.tec.br/api/v3/perfis/${cpfObtido[i].id}/`,
                headers:{
                    Authorization:resp4.requestHeaders.Authorization,
                    "User-Funcao":resp4.requestHeaders['User-Funcao']
                }
            })
            }
        
            
          })
        })
      })
})


Cypress.Commands.add("obtemPerfil",(usuario,senha,perfil)=>{
    cy.request({
        
        method:"POST",
        url:"https://api.qa.hmg.tec.br/api/v3/login/",
        body:{
            "tipo":"senha",
            "identificador":usuario,
            "segredo":senha
        }
      }).then((resp)=>{
        
        
        cy.request({
          method:"GET",
          url:"https://api.qa.hmg.tec.br/api/v3/me/funcoes",
          headers:{
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${resp.body.token_jwt}`
            
          }
             }).then((resp3)=>{
            
          cy.request({
            method:"GET",
            url:`https://api.qa.hmg.tec.br/api/v3/perfis/?limit=30`,
            headers:{
                Authorization:resp3.requestHeaders.Authorization,
                "User-Funcao":resp3.body.results[0].id
            }
            
          }).then((resp4)=>{

            var perfilRecebido = resp4.body.results
            var cpfObtido = perfilRecebido.filter(item => item.descricao === perfil);
            return cpfObtido[0].id
        })
    })
    })
})


Cypress.Commands.add("removeUsuario",(usuario,senha,cpf)=>{
    cy.request({
        
        method:"POST",
        url:"https://api.qa.hmg.tec.br/api/v3/login/",
        body:{
            "tipo":"senha",
            "identificador":usuario,
            "segredo":senha
        }
      }).then((resp)=>{
        
        
        cy.request({
          method:"GET",
          url:"https://api.qa.hmg.tec.br/api/v3/me/funcoes",
          headers:{
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${resp.body.token_jwt}`
            
          }
             }).then((resp3)=>{
            
    cy.request({
        method:"DELETE",
        failOnStatusCode: false,
        url:`https://api.qa.hmg.tec.br/api/v3/usuarios/${cpf}/`,
        headers:{
            Authorization:resp3.requestHeaders.Authorization,
            "User-Funcao":resp3.body.results[0].id
        }
    })
})
})
})

Cypress.Commands.add("criaUsuarioRequest",(usuario,senha,cpf,nome,sobrenome,email)=>{
    cy.request({
        
        method:"POST",
        url:"https://api.qa.hmg.tec.br/api/v3/login/",
        body:{
            "tipo":"senha",
            "identificador":usuario,
            "segredo":senha
        }
      }).then((resp)=>{
        
        
        cy.request({
          method:"GET",
          url:"https://api.qa.hmg.tec.br/api/v3/me/funcoes",
          headers:{
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${resp.body.token_jwt}`
            
          }
             }).then((resp3)=>{
            
    cy.request({
        method:"POST",
        failOnStatusCode: false,
        url:`https://api.qa.hmg.tec.br/api/v3/usuarios/`,
        headers:{
            Authorization:resp3.requestHeaders.Authorization,
            "User-Funcao":resp3.body.results[0].id
        },
        body:{
            cpf:cpf,
            email:email,
            nome:nome,
            sobrenome:sobrenome,
            permissoes:[
                "CRED_USUARIOS_LIST",
                "CRED_PERFIL_LIST"
            ]
        }
    })
})
})
})

Cypress.Commands.add("mockEmailJaCadastrado",()=>{
    
    cy.intercept("https://api.qa.hmg.tec.br/api/v3/usuarios/",{
        statusCode:400,
        body:{"email":["Email já cadastrado para outro cpf"]}
      })
})

Cypress.Commands.add("geraMassaDadosInicial",(usuario,senha,cpf,perfil)=>{
    
    cy.removeUsuario(usuario,senha,cpf)
    cy.deletaPerfil(usuario,senha,perfil)
    cy.criaPerfil(usuario,senha,perfil)
})