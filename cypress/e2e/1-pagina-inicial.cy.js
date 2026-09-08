describe('Página Inicial', () => {
  describe('Acesso e Navegação', () => {
    it('deve carregar a página inicial com sucesso', () => {
      cy.visit('/')
      cy.contains('h1', 'Simulador de Reserva de Ingressos').should('be.visible')
      cy.contains('Acessar Formulário').should('be.visible')
    })

    it('deve navegar para o formulário ao clicar no botão', () => {
      cy.visit('/')
      cy.get('.botao-principal').click()
      cy.url().should('include', 'formulario.html')
      cy.contains('Simulador — Everaldo Barros').should('be.visible')
    })
  })
})