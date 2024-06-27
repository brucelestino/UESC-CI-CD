describe('Automação da UESC', () => {
    beforeEach(() => {
      // Limpar cookies antes de cada teste
      cy.clearCookies();
      // Limpar localStorage antes de cada teste
      cy.clearLocalStorage();
      // Antes de cada teste, visita a página inicial do UESC
      cy.visit('http://www.uesc.br/');
      // Ignora erros não capturados na aplicação
      Cypress.on('uncaught:exception', (err, runnable) => {
        // Retorne false para evitar que o Cypress falhe no teste
        return false;
      });
    });

  it('001-Valida a presença de todos os campos no menu principal', () => {
    // valida a presença das categorias principais criadas no menu 
    cy.get('#chromemenu > ul > :nth-child(1) > a').should('have.text', 'A UESC');
    cy.get('#chromemenu > ul > :nth-child(2) > a').should('have.text', 'Estrutura Organizacional');
    cy.get('#chromemenu > ul > :nth-child(3) > a').should('have.text', 'Serviços');
    cy.get('#chromemenu > ul > :nth-child(4) > a').should('have.text', 'Destaques');
    cy.get('#chromemenu > ul > :nth-child(5) > a').should('have.text', 'Graduação');
    cy.get('#chromemenu > ul > :nth-child(6) > a').should('have.text', 'Pós-Graduação');
    cy.get('#chromemenu > ul > :nth-child(7) > a').should('have.text', 'Extensão');
    cy.get('#chromemenu > ul > :nth-child(8) > a').should('have.text', 'Servidores');
    cy.get('#chromemenu > ul > :nth-child(9) > a').should('have.text', 'Fale Conosco');
  });
  it('002-Valida a presença de todos os campos no Menu lateral e dos links esperados', () => {
    // Mapeia os itens do menu lateral
    cy.get('#navegacao-local-meio > ul > li > a').each(($item) => {
      // Valida a presença do link em cada item
      cy.wrap($item).should('exist');

      // Obtem o texto do link e o atributo 'href'
      cy.wrap($item).invoke('text').then((text) => {
        const linkText = text.trim();

        cy.wrap($item).should('have.attr', 'href').then((href) => {
          // Adapte as verificações conforme necessário
          // Verifica se o texto do link contém o nome do menu associado ao link correto
          switch (linkText) {
            case 'Centros e Grupos de Pesquisa':
              expect(href).to.equal('centros');
              break;
            case 'Internacional':
              expect(href).to.equal('arint');
              break;
            case 'Laboratórios':
              expect(href).to.equal('laboratorios');
              break;
            case 'Mapa da Uesc':
              expect(href).to.equal('mapa/');
              break;
            case 'Núcleos':
              expect(href).to.equal('nucleos');
              break;
            case 'Projetos':
              expect(href).to.equal('projetos');
              break;
            case 'PROTOCOLO DIGITAL':
              expect(href).to.equal('http://www.uesc.br/proad/index.php?item=conteudo_gera_requerimento_academico.php');
              break;
        }
        });
      });
    });
  });

  it('003-Valida a presença dos subcomponentes', () => {
    cy.get(':nth-child(1) > h2').should('have.text','Notícias');
    cy.get('#navegacao-local-meio').should('exist');
    cy.get('.calendar').should('exist');

  });

 it('004-Validação da exibição do Calendario Academico',() => {

    // Verificar se o elemento com a classe .calendar está visível
    cy.get('.calendar').should('be.visible');
    //selecionar o botão
    cy.get('#botao-calendar').click();
    // Verificar se a URL atual é a esperada
    cy.url().should('eq', 'http://www.uesc.br/a_uesc/calendario-academico.php');
    // Verificar se o elemento h2 contém o texto "calendário acadêmico"
    cy.get('h2').should('have.text','Calendário Acadêmico');


  });

  it('005-Validação das paginas de Contato',() => {
    // Verificar se o elemento do menu está visível
    cy.get('#chromemenu > ul > :nth-child(9) > a').should('be.visible');
    // Clicar no link
    cy.get('#chromemenu > ul > :nth-child(9) > a').click({ force: true });
    // Verificar se a URL atual é a esperada
    cy.url().should('eq', 'http://www.uesc.br/fale_conosco/');
    // Verificar se o elemento h2 contém o texto "calendário acadêmico"
    cy.get('h2').should('include.text', 'Fale Conosco');
  });

  it('006-Acessar a biblioteca virtual',() => {
        // Verificar se o elemento #outrosSites_biblioteca existe
        cy.get('#outrosSites').should('exist')
        cy.get('#outrosSites_biblioteca').should('exist')
        cy.get('#outrosSites_biblioteca').click();
        cy.url().should('eq', 'http://www.uesc.br/biblioteca/');
        // Verificar se o elemento h2 contém o texto "calendário acadêmico"
        cy.get('h2').should('include.text', 'Biblioteca Central');
        cy.get('#conteudo-interno').should('include.text', 'Acesso a Biblioteca Virtual da Uesc/Tutoriais Atualizados').click();


  });

  it('007-Acessar o formulário do protocolo Digital',() => {

    cy.get('#navegacao-local-meio').should('exist')
    cy.get('#navegacao-local-meio > :nth-child(1)').should('exist')
    cy.get('#navegacao-local-meio > :nth-child(1) > :nth-child(7) > a').should('exist')
    cy.get('#navegacao-local-meio > :nth-child(1) > :nth-child(7) > a').should('include.text', 'PROTOCOLO DIGITAL');
    cy.get('#navegacao-local-meio > :nth-child(1) > :nth-child(7) > a').should('include.text', 'PROTOCOLO DIGITAL').click();

    cy.get('h2').should('include.text', 'Requerimento acadêmico/administrativo');
    cy.get('h3').should('include.text', 'Formulário');
     // Preenchendo os campos do formulário
     cy.get('#nome').type('João da Silva');
     cy.get('#nome_social').type('João');
     cy.get('#curso').type('Engenharia de Software');
     cy.get('#matricula').type('201810651', { force: true });
     cy.get('#modalidades').type('Presencial regular');
     cy.get('#cep').type('45604882', { force: true }).blur(); // Blur para acionar a função getEndereco()
     cy.get('#email').type('joao.silva@example.com');
     cy.get('#tel_celular').type('11987654321', { force: true });
     cy.get('#assunto').type('Assunto de Exemplo', { force: true });
     cy.get('#requisicao').type('Esta é uma requisição de exemplo para testar o formulário.', { force: true });
 
     // Clicando no botão de enviar
     //cy.get('#enviar').click();



  });

  it('008-Acessar ao SEI',() => {
  // Abrir o menu dropdown
  cy.get('#chromemenu > ul > :nth-child(3) > a').click({ force: true });

  // Selecionar a opção "Peticionamento Eletrônico do SEI" pelo texto
  cy.contains('a', 'Peticionamento Eletrônico do SEI').click({ force: true });

  });

  it('009-Acessar a página de um curso',() => {
    //clicar no menu
    cy.get('#chromemenu > ul > :nth-child(5) > a').click({ force: true });
    //verificar o nome
    cy.get('#CollapsiblePanel1 > :nth-child(1)').should('include.text', 'Bacharelado');
    //clicar no drop
    cy.get('#CollapsiblePanel1 > :nth-child(1)').click({ force: true });
    // verificar o nome 
    cy.get('[style="display: block; visibility: visible; height: 344px;"]').should('include.text', ' \n\n  Administração\n  Agronomia\n  Biomedicina\n  Ciências Biológicas\n  Ciências Contábeis  \n  Ciência da Computação\n  Ciências Econômicas\n  Comunicação Social\n  Direito\n  Enfermagem\n  Engenharia Civil\n  Engenharia de Produção\n  Engenharia Elétrica\n  Engenharia Mecânica\n  Engenharia Química\n  Física\n  Geografia\n  Línguas Estrangeiras Aplicadas às Negociações Internacionais\n  Medicina\n  Medicina Veterinária\n  Matemática\n  Química\n\n        \n');
    // clicar no curso de engenharia mec
    cy.contains('a', 'Engenharia Mecânica').click({ force: true });
    // verificar se a pag está correta
    cy.get('h2 > strong').should('include.text', 'Engenharia Mecânica');


  });

  it('010-Acessar ao PROEX',() => {
     //clicar no menu
    cy.get('#chromemenu > ul > :nth-child(7) > a').click({ force: true });

  });
  it('011-Acessar a pagina de noticias',() => {
    cy.get('#conteudo-index-esquerda > :nth-child(1)').should('be.visible');
    // Selecionar e clicar no botão "MAIS NOTÍCIAS"
    cy.get('a.bnt15[href="http://www2.uesc.br/noticias/"]').click();

  
  });
  it('012-Acessar a pagina dos departamentos da uesc',() => {
    cy.get('#chromemenu > ul > :nth-child(2) > a').click({ force: true });

    cy.contains('Departamentos').click();

    cy.get('h2 > strong').should('include.text', 'Departamentos');



  });
  it('013-Acessar a pagina de editais',() => {
    cy.get('#conteudo-index-esquerda > :nth-child(3)').should('be.visible');

    cy.get('a.bnt15[href="https://www2.uesc.br/publicacoes/editais"]').click({ force: true });



  });
  it('014-Visualizar os cursos de graduação.',() => {
 //clicar no menu
    cy.get('#chromemenu > ul > :nth-child(5) > a').click({ force: true });
 //verificar o nome
    cy.get('#CollapsiblePanel1 > :nth-child(1)').should('include.text', 'Bacharelado');
 //clicar no drop
    cy.get('#CollapsiblePanel1 > :nth-child(1)').click({ force: true });
 // verificar o nome 
    cy.get('[style="display: block; visibility: visible; height: 344px;"]').should('include.text', ' \n\n  Administração\n  Agronomia\n  Biomedicina\n  Ciências Biológicas\n  Ciências Contábeis  \n  Ciência da Computação\n  Ciências Econômicas\n  Comunicação Social\n  Direito\n  Enfermagem\n  Engenharia Civil\n  Engenharia de Produção\n  Engenharia Elétrica\n  Engenharia Mecânica\n  Engenharia Química\n  Física\n  Geografia\n  Línguas Estrangeiras Aplicadas às Negociações Internacionais\n  Medicina\n  Medicina Veterinária\n  Matemática\n  Química\n\n        \n');
 // clicar no curso de engenharia mec
    cy.get('#CollapsiblePanel2 > .CollapsiblePanelTab').should('include.text', 'Licenciatura');
    // clicar no drop
    cy.get('#CollapsiblePanel2 > .CollapsiblePanelTab').click({ force: true });
    //verificar nome 
    cy.get('#CollapsiblePanel2 > .CollapsiblePanelContent').should('include.text', '\n\n  Ciências Biológicas\n  Ciências Sociais\n  Educação Física \n  Filosofia\n  Física\n  Geografia\n  História\n  Letras Português e Espanhol\n  \n  Letras Português e Inglês\n  Matemática\n  Pedagogia\n  Química\n\n          \n         ');
    //verificar os ead
    cy.get('#CollapsiblePanel3 > .CollapsiblePanelTab').should('include.text', 'EAD -  Educação à Distância da UESC');
    // clicar no drop
    cy.get('#CollapsiblePanel3 > .CollapsiblePanelTab').click({ force: true });
    //verificar nome 
    cy.get('#CollapsiblePanel3 > .CollapsiblePanelContent').should('include.text', '\n            \n  Licenciatura em Biologia\n      Licenciatura em Física\n      Licenciatura em Letras Vernáculas\n      Licenciatura em Matemática\n      Licenciatura em Pedagogia\n\n          \n          ');
  });
  it('015-Acessar as redes socias',() => {
    // verificar se está disponivel 
    cy.get('#navegacao').should('be.visible');
    //verificar o insta
    cy.get(':nth-child(3) > #fb > img').should('be.visible');
    //clicar
    cy.get(':nth-child(3) > #fb > img').click({ force: true });
  });


});