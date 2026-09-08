describe('Mensagens de Retorno', () => {
  beforeEach(() => {
    cy.visit('/formulario.html')
  })

  it('deve exibir mensagem de sucesso em verde', () => {
    cy.get('#nome').type('Sucesso')
    cy.get('#sobrenome').type('Teste')
    cy.get('#email').type('sucesso@email.com')
    cy.get('#jogo').select('Palmeiras x Grêmio')
    cy.get('#setor').select('Cadeira Coberta')
    cy.get('#quantidade').type('1')
    cy.get('input[name="pagamento"]').check('pix')
    cy.get('#concorda').check()
    cy.get('#enviar').click()

    cy.get('.mensagem.sucesso')
      .should('be.visible')
      .and('contain', 'Compra realizada com sucesso')
  })

  it('deve exibir mensagem de erro em vermelho', () => {
    cy.get('#enviar').click()

    cy.get('.mensagem.erro')
      .should('be.visible')
      .and('contain', 'Verifique os campos obrigatórios')
  })

  it('deve limpar o formulário após envio com sucesso', () => {
    cy.get('#nome').type('Limpeza')
    cy.get('#sobrenome').type('Teste')
    cy.get('#email').type('limpeza@email.com')
    cy.get('#jogo').select('Flamengo x Santos')
    cy.get('#setor').select('Arquibancada')
    cy.get('#quantidade').type('1')
    cy.get('input[name="pagamento"]').check('pix')
    cy.get('#concorda').check()
    cy.get('#enviar').click()

    cy.get('#nome').should('have.value', '')
    cy.get('#sobrenome').should('have.value', '')
    cy.get('#email').should('have.value', '')
  })
})