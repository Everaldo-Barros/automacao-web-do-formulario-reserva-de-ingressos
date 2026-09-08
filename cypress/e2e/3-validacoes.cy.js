describe('Validações de Campos', () => {
  beforeEach(() => {
    cy.visit('/formulario.html')
  })

  it('deve exibir erro com e-mail em formato inválido', () => {
    cy.get('#nome').type('João')
    cy.get('#sobrenome').type('Silva')
    cy.get('#email').type('joao.email')
    cy.get('#jogo').select('Flamengo x Santos')
    cy.get('#setor').select('Arquibancada')
    cy.get('#quantidade').type('1')
    cy.get('input[name="pagamento"]').check('boleto')
    cy.get('#concorda').check()
    cy.get('#enviar').click()

    cy.get('.mensagem.erro').should('be.visible')
  })

  it('deve aceitar telefone vazio', () => {
    cy.get('#nome').type('Maria')
    cy.get('#sobrenome').type('Santos')
    cy.get('#email').type('maria@email.com')
    cy.get('#jogo').select('Cruzeiro x Vasco')
    cy.get('#setor').select('Setor VIP')
    cy.get('#quantidade').type('3')
    cy.get('input[name="pagamento"]').check('cartao')
    cy.get('#concorda').check()
    cy.get('#enviar').click()

    cy.get('.mensagem.sucesso').should('be.visible')
  })

  it('deve aceitar quantidade entre 1 e 10', () => {
    cy.get('#quantidade').type('10').should('have.value', 10)
    cy.get('#quantidade').clear().type('1').should('have.value', 1)
  })

  it('não deve enviar sem concordar com os termos', () => {
    cy.get('#nome').type('Teste')
    cy.get('#sobrenome').type('SemAcordo')
    cy.get('#email').type('teste@email.com')
    cy.get('#jogo').select('Corinthians x Bahia')
    cy.get('#setor').select('Arquibancada Superior')
    cy.get('#quantidade').type('1')
    cy.get('input[name="pagamento"]').check('pix')
    cy.get('#enviar').click()

    cy.get('.mensagem.sucesso').should('not.exist')
  })

  it('deve alternar entre as formas de pagamento', () => {
    cy.get('input[name="pagamento"]').check('pix').should('be.checked')
    cy.get('input[name="pagamento"]').check('cartao').should('be.checked')
    cy.get('input[name="pagamento"]').check('boleto').should('be.checked')
  })
})