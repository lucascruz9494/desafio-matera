describe("Quando acessar a tela de login,", () => {
  beforeEach(() => {
    cy.acessaPaginaInicialESelecionaTipoAcesso()
    
  });
  
  it("Devo conseguir realizar o login com credenciais válidas", () => {
    cy.preencheInfoLogin(Cypress.env("usuario"),Cypress.env("senha"))
    cy.confirma(0)
    cy.configFinanceiraBtn()

  });
  it("Não devo conseguir realizar o login com credenciais incorretas", () => {
    cy.preencheInfoLogin(Cypress.env("usuarioInvalido"),Cypress.env("senhaInvalida"))
    cy.confirma(0)
    cy.validaErroCampo(0,"Usuário ou senha incorretos")
    cy.validaErroCampo(1,"Usuário ou senha incorretos")

  });
  
  it("Devo conseguir acessar a página de reset de senha", () => {
    cy.clicaEsqueceuSenha()
  });
  
});
