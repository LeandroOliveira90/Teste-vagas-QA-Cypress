/// Cypress busca como referencia os tipos (Para auxilio como autocomplete, verificação de assinatura, etc...)
/// <reference types="Cypress" />

/// Evitar que o próprio cypress apresente algum erro não referente a implementação
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Teste prático para vagas de QA', function() {
    // Definição de variavel faker requisitando a biblioteca da mesma para gerar dados aleatórios
    const faker = require('faker')
    it('Produto adicionado com sucesso ao carrinho em nossa loja virtual', function() {
        // Visitando home do portal web, validando acesso através do título e entrando na loja
        cy.visit('https://www.vr.com.br/');
        cy.title().should('eq', 'VR - Refeição, Transporte, Controle de Ponto e Soluções Financeiras')
        cy.get('#buttonCompreOnline').click()
      
        // Acessando a loja, fechando popup, acessando modalidade avulso
        cy.visit('https://loja.vr.com.br/');
        cy.get('.close-button').click()
        cy.get('#btn-selecionar-modalidade-avulso').click()

        // Inserindo quantidade aleatória e valor aleatório para produto auto, adicionando ao carrinho e validando mensagem de produto adicionado.
        const quantidade = faker.datatype.number({ min: 1, max: 99});
        cy.get('#produto-auto-quantidade').type(quantidade)
        const valor = faker.finance.amount()
        cy.get('#produto-auto-valor').type(valor)
        
        cy.get('#btn-adicionar-carrinho-auto').click()
        cy.contains('Produto adicionado!').should('be.visible')
    })
})