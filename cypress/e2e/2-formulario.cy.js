describe('Formulário de Reserva', () => {
  beforeEach(() => {
    cy.visit('/formulario.html')
  })

  it('deve exibir todos os campos do formulário', () => {
    cy.get('#nome').should('be.visible')
    cy.get('#sobrenome').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#jogo').should('be.visible')
    cy.get('#setor').should('be.visible')
    cy.get('#quantidade').should('be.visible')
    cy.get('#enviar').should('be.visible')
  })

  it('deve enviar formulário com dados válidos com sucesso', () => {
    cy.get('#nome').type('João')
    cy.get('#sobrenome').type('Silva')
    cy.get('#email').type('joao@email.com')
    cy.get('#telefone').type('49999991234')
    cy.get('#jogo').select('Palmeiras x Grêmio')
    cy.get('#setor').select('Cadeira Coberta')
    cy.get('#quantidade').type('2')
    cy.get('input[name="pagamento"]').check('pix')
    cy.get('#concorda').check()
    cy.get('#enviar').click()

    cy.get('.mensagem.sucesso').should('be.visible')
    cy.contains('Compra realizada com sucesso')
  })

  it('não deve enviar sem preencher campos obrigatórios', () => {
    cy.get('#enviar').click()
    cy.get('.mensagem.erro').should('be.visible')
  })
})