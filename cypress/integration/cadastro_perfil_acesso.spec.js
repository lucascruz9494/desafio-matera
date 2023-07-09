import {usuarioPage} from "../fixtures/utils"

describe("Quando acessar a tela de criação de perfis,", () => {
    beforeEach(() => {
      cy.deletaPerfil(Cypress.env("usuario"),Cypress.env("senha"),"0cruz_teste3")
      cy.acessaConfigFincanceira(Cypress.env("usuario"),Cypress.env("senha"))
      cy.acessaListagemPerfis()
      cy.confirma(0)

    });
    it("Devo conseguir criar um perfil com permissões", () => {
        
    cy.preencheNomePerfil("0cruz_teste3")
    cy.clicaBtnFuncionalidades()
    cy.checkPermissao(usuarioPage.permissaoListarUsuarios,"Pode visualizar usuários").click()
    cy.checkPermissao(usuarioPage.permissaoListarPerfis,"Pode listar perfis de permissões para usuários").click()
    cy.confirma(0)
    cy.validaPerfilCriado(Cypress.env("usuario"),Cypress.env("senha"),"0cruz_teste3")
    
    })
    it("Não devo conseguir criar um perfil sem permissões", () => {
    cy.preencheNomePerfil("0cruz_teste3")
    cy.clicaBtnFuncionalidades()
    cy.confirma(0)
    cy.validaAlerta("É necessário selecionar ao menos uma permissão para cadastrar o perfil")
    
    })
    
  });
  