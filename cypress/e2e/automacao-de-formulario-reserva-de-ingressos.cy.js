describe('Testes E2E do sistema de reserva', () => {
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

  it('deve exibir todos os campos do formulário', () => {
    cy.visit('/formulario.html')
    cy.get('#nome').should('be.visible')
    cy.get('#sobrenome').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#jogo').should('be.visible')
    cy.get('#setor').should('be.visible')
    cy.get('#quantidade').should('be.visible')
    cy.get('#enviar').should('be.visible')
  })

  it('deve enviar formulário com dados válidos com sucesso', () => {
    cy.visit('/formulario.html')
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
    cy.visit('/formulario.html')
    cy.get('#enviar').click()
    cy.get('.mensagem.erro').should('be.visible')
  })

  it('deve exibir erro com e-mail em formato inválido', () => {
    cy.visit('/formulario.html')
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
    cy.visit('/formulario.html')
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
    cy.visit('/formulario.html')
    cy.get('#quantidade').type('10').should('have.value', 10)
    cy.get('#quantidade').clear().type('1').should('have.value', 1)
  })

  it('não deve enviar sem concordar com os termos', () => {
    cy.visit('/formulario.html')
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
    cy.visit('/formulario.html')
    cy.get('input[name="pagamento"]').check('pix').should('be.checked')
    cy.get('input[name="pagamento"]').check('cartao').should('be.checked')
    cy.get('input[name="pagamento"]').check('boleto').should('be.checked')
  })

  it('deve exibir mensagem de sucesso em verde', () => {
    cy.visit('/formulario.html')
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
    cy.visit('/formulario.html')
    cy.get('#enviar').click()

    cy.get('.mensagem.erro')
      .should('be.visible')
      .and('contain', 'Verifique os campos obrigatórios')
  })

  it('deve limpar o formulário após envio com sucesso', () => {
    cy.visit('/formulario.html')
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