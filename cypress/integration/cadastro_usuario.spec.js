import {usuarioPage} from "../fixtures/utils"

var cpfEsperado = Cypress.env("cpf").slice(0,3)+"."+
Cypress.env("cpf").slice(3,6)+"."+
Cypress.env("cpf").slice(6,9)+"-"+
Cypress.env("cpf").slice(9,11)
describe("Quando acessar a tela de criação de usuário,", () => {
    beforeEach(() => {
      cy.geraMassaDadosInicial(Cypress.env("usuario"),Cypress.env("senha"),Cypress.env("cpf"),"0cruz_teste2")
     
      cy.acessaConfigFincanceira(Cypress.env("usuario"),Cypress.env("senha"))
      cy.acessaListaUsuarios()
    });

    it("Devo conseguir criar um usuário com sucesso", () => {
        
    cy.criaUsuario(Cypress.env("cpf"),cpfEsperado,Cypress.env("email"),Cypress.env("nome"),Cypress.env("sobrenome"),"0cruz_teste2")
    cy.validaNomeUsuario(Cypress.env("nome"),Cypress.env("sobrenome"))
    cy.visit("/user")
    cy.pesquisaUsuario(Cypress.env("cpf"),0)
    cy.usuarioEncontrado(cpfEsperado)
    cy.cancelaPesquisa()

    })
    it("Devo conseguir atualizar um usuário com sucesso", () => {
    cy.criaUsuario(Cypress.env("cpf"),cpfEsperado,Cypress.env("email"),Cypress.env("nome"),Cypress.env("sobrenome"),"0cruz_teste2")
 
    cy.visit("/user")
    cy.pesquisaUsuario(Cypress.env("cpf"),0)
    cy.acessaUsuario(cpfEsperado,Cypress.env("nome"),Cypress.env("sobrenome"))
    cy.checkPermissao(usuarioPage.permissaoListarUsuarios,"Pode visualizar usuários").click()
    cy.confirma(0)
    cy.reload()
    cy.validaCheckPermissao(usuarioPage.checkPermissaoListarPerfis,"have.attr")
    cy.validaCheckPermissao(usuarioPage.checkPermissaoListarUsuarios,"not.have.attr")
    })

    it("Devo conseguir excluir um usuário com sucesso", () => {
    
    cy.criaUsuario(Cypress.env("cpf"),cpfEsperado,Cypress.env("email"),Cypress.env("nome"),Cypress.env("sobrenome"),"0cruz_teste2")
    
    cy.visit("/user")
    cy.pesquisaUsuario(Cypress.env("cpf"),0)
    cy.acessaUsuario(cpfEsperado,Cypress.env("nome"),Cypress.env("sobrenome"))
    cy.excluiUsuario()
    cy.pesquisaUsuario(Cypress.env("cpf"),1)
    cy.listaVazia()
    })


    it("Não devo conseguir criar um usuário com email já cadastrado", () => {
    cy.acessaCriacaoUsuario()
    cy.mockEmailJaCadastrado()
    cy.preencheInfosCriacaoUsuarioNovo(Cypress.env("cpf"),cpfEsperado,Cypress.env("email"),Cypress.env("nome"),Cypress.env("sobrenome"),"0cruz_teste2")
    
    cy.validaErroCampo(0,`Email já cadastrado para outro cpf`)
    })
    
  });
  