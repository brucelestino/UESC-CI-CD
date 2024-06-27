describe('Automação do COLCIC', () => {
  beforeEach(() => {
    // Limpar cookies antes de cada teste
    cy.clearCookies();   
    // Limpar localStorage antes de cada teste
    cy.clearLocalStorage();
    // Antes de cada teste, visita a página inicial do UESC
    cy.visit('https://colcic.uesc.br/');
    // Ignora erros não capturados na aplicação
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Retorne false para evitar que o Cypress falhe no teste
      return false;
    });
  });


  it('001-Validação do header', () => {
      cy.get('.iconMenu > div').click();
      const menuLinks = [
          'Início',
          'Sobre o curso',
          'Apoio ao estudante',
          'Colegiado',
          'Diversos',
          'Contato'
      ];
      
      menuLinks.forEach(linkText => {
          cy.get('.navList').contains(linkText).should('be.visible').then($link => {
              // Verifica se o link possui o atributo 'href'
              const href = $link.attr('href');
              if (href) {
                  // Se o atributo 'href' existir, faz uma requisição HTTP e verifica se a resposta é 200
                  cy.request(href).its('status').should('eq', 200);
              } else {
                  // Se o atributo 'href' não existir, você pode adicionar outras verificações, se necessário
                  cy.log(`${linkText} não tem o atributo href.`);
              }
          });
      });
  });

  it('002-Validação e acesso de todos os links das redes sociais', () => {
      const urls = [
        'https://discord.gg/Hk8a3UGaEm',
        'https://www.facebook.com/colcic.uesc/',
        'https://www.instagram.com/colcic_uesc/'
        
      ];
  
      urls.forEach((url) => {
          // Verifica se o link existe na página
          cy.get(`a[href="${url}"]`).should('exist').and('have.attr', 'href', url);
    
          if (!url.includes('t.me')) { // Evita clicar em links que abrem aplicativos
            // Abre uma nova guia clicando no link com o atributo href específico
            cy.get(`[href="${url}"]`).invoke('removeAttr', 'target').click();
    
            // Espera até que a nova guia seja aberta
            cy.wait(1000); // Ajuste o tempo conforme necessário
    
            // Obtém as guias do navegador e fecha a janela aberta
            cy.window().then((win) => {
              if (win.top !== win) {
                win.close();
              }
            });
    
            // Retorna para a página principal
            cy.visit('https://colcic.uesc.br/');
          }
        });
  });

  it('003-Validação do texto na home', () => {
  
      // Seleciona o elemento .mainContent e verifica o texto
      cy.get('.mainContent')
        .should('contain.text', '\n\t\t\t\t\t\t\tBem vindo(a) à página do\n')
        .and('contain.text', '\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tColegiado de \n\t\t\t\t\t\t\t\tCiência da Computação\n')
        .and('contain.text', '\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tO Colegiado de Curso de Ciência da Computação é\n\t\t\t\t\t\t\t\tórgão da administração setorial de\n\t\t\t\t\t\t\t\tdeliberação\n\t\t\t\t\t\t\t\tcoletiva, supervisão e coordenação\n\t\t\t\t\t\t\t\tdidático-pedagógica do curso Ciência da\n\t\t\t\t\t\t\t\tComputação e integra a estrutura da Universidade\n\t\t\t\t\t\t\t\tEstadual de Santa Cruz.\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tSaiba mais\n\t\t\t\t\t\t');
      
      cy.get('.PrimaryButton').contains('Saiba mais');
    
  });

  it('004-Validação do footer', () => {
   
    // Seleciona o primeiro elemento e verifica o texto
  cy.get('footer .footerFloat > :nth-child(1)')
    .should('contain.text', '\n\t\t\t\t\t\t\tContato\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\tUESC, Pavilhão do DCET, 1º andar\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t colcic@uesc.br \n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t (73) 3680-5110 \n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t Facebook \n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t');
    
  const expectedTextSecondElement = '\n\t\t\t\t\t\t\tEndereço\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tUNIVERSIDADE ESTADUAL DE SANTA CRUZ - UESC\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tCampus Soane Nazaré de Andrade\n\t\t\t\t\t\t\t\tRodovia Jorge Amado, Km 16, Salobrinho\n\t\t\t\t\t\t\t\tCEP 45662-900. Ilhéus-Bahia\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t';
    // Seleciona o primeiro elemento e verifica o texto exato
  cy.get('footer .footerFloat > :nth-child(2)')
    .should('have.text', expectedTextSecondElement);
  });

  it('005-Acessar pagina de contato pelo botao na home', () => {
      cy.get('.SecondaryButton').contains('Entre em contato').should('be.visible').click();

          // URL esperada após o redirecionamento
      const expectedUrl = 'https://colcic.uesc.br/contato/'; // Substitua pela URL real esperada

          // Verifica se a URL atual é a esperada
      cy.url().should('eq', expectedUrl);
      

  });

  it('006-Preencher o formulario de contato', () => { 
    //selciona pelo menu lateral ate a pagina
    cy.get('.iconMenu > div').click();
    cy.get(':nth-child(1) > [href="./contato"]').click();

    //valida se apresenta o titulo na pag 
    cy.get('.mainContent > h1').should('contain.text', 'Fale com o COLCIC')

    //Preenche o formulario
    cy.get('form').within(() => {
      cy.get('[placeholder="Nome *"]').type('Seu Nome');
      cy.get('[type="email"]').type('seu@email.com');
      cy.get('[placeholder="Assunto"]').type('Assunto do Formulário');
      cy.get('#mensagem').type('Mensagem do Formulário');
      cy.get('.PrimaryButton').should('contain.text', 'Enviar');
    });
  });

  it('007-Validação das informações Gerais do Curso', () => {
    cy.get('.iconMenu > div').click();
    cy.visit('https://colcic.uesc.br/sobre/');

    // Aguarda a página carregar e valida o título
    cy.title().should('include', 'Sobre');

    // Valida o cabeçalho principal da página
    cy.get('h1').should('contain.text', '\n\t\t\t\t\t\t\t\tCurso de \n\t\t\t\t\t\t\t\tCiência da Computação\n\t\t\t\t\t\t\tContatoEndereço');

    // Verifica se o texto principal contém uma palavra-chave
    cy.get('body').should('contain.text', 'Ciência da Computação na UESC');

    // Verifica a presença e visibilidade de um parágrafo específico
    cy.get('p').should('be.visible').and('contain.text', '\n\t\t\t\t\t\t\t\tAutorizado em 1999 o curso de Ciência da\n\t\t\t\t\t\t\t\tComputação já formou\n\t\t\t\t\t\t\t\tmais de 350 bacharéis que hoje são\n\t\t\t\t\t\t\t\tprofessores e pesquisadores e também\n\t\t\t\t\t\t\t\tintegram times em grandes empresas.');

    // Valida o texto do título
    cy.get('.title > h2').should('have.text', 'Objetivo');

    // Valida o texto do objetivo
    cy.get('.objetivo > :nth-child(2) > p').should('have.text', '\n\t\t\t\t\t\t\t\tProporcionar o desenvolvimento humano,\n\t\t\t\t\t\t\t\tsocial e econômico, formar\n\t\t\t\t\t\t\t\tprofissionais capacitados para\n\t\t\t\t\t\t\t\tdesenvolver produtos, serviços e processos da\n\t\t\t\t\t\t\t\ttecnologia da informação e realizar\n\t\t\t\t\t\t\t\tpesquisas no campo da ciência e inovação.\n\t\t\t\t\t\t\t');


    cy.get('.egresso > h2').should('have.text', 'Perfil do Egresso');



  });


  it('008-Validar a visualização do horários dos semestres', () => {

    cy.get('.academicos > h1').should('have.text', 'Horários');
    cy.get('.academicos > :nth-child(2)').should('have.text', '\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tHorário 2024.2\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\tatualizado em 13/06/2024\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tHorário 2024.1\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tHorário 2023.2\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tHorário 2023.1\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t');
   // Seleciona o link e armazena a URL
    cy.get('[href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQx05YZWSMf9Vx6-sLc4C8ZvbCU8l2qfn67_0CSaJf4VGbmxa1Qs_Jc8wUJGYlyDaCPcuTqXHNtZMWR/pubhtml"]').then(($link) => {
    const url = $link.prop('href');

    // Verifica se a URL responde corretamente
    cy.request(url).then((response) => {
      // Verifica se a resposta é 200 (OK)
      expect(response.status).to.eq(200);

      // Visita a URL diretamente
      cy.visit(url);

    });
  });
});


  it('009-Acessar ao Portal do Aluno', ()=>{
    cy.get('.iconMenu > div').click();
    cy.visit('https://www.prograd.uesc.br/PortalSagres/Acesso.aspx');
    cy.window().then((win) => {
      if (win.top !== win) {
        win.close();
      }
    });

  });


  it('010-Acessar ao fluxograma do curso', ()=>{
    cy.get('.iconMenu > div').click();
     // URL do PDF
     const pdfUrl = 'https://colcic.uesc.br/files/comp_curriculares/matriz_cic_2012.pdf';
    
     // Faz uma solicitação HTTP para o PDF
     cy.request({
       url: pdfUrl,
       encoding: 'binary' // Necessário para lidar com conteúdo binário
     }).then((response) => {
       // Verifica se a solicitação foi bem-sucedida
       expect(response.status).to.eq(200);
 
       // Verifica o tipo de conteúdo para garantir que é um PDF
       expect(response.headers['content-type']).to.eq('application/pdf');

       cy.writeFile('cypress/downloads/matriz_cic_2012.pdf', response.body, 'binary');

     });
    



  });

  it('011-Acessar ao Programa das disciplinas',()=>{
    cy.get('.iconMenu > div').click();
    cy.visit('https://colcic.uesc.br/disciplinas/');
    cy.get('.mainContent > h1 ').should('have.text', '\n\t\t\t\t\t\t\t\tPrograma das \n\t\t\t\t\t\t\t\tDisciplinas\n\t\t\t\t\t\t\t');
    cy.get(':nth-child(2) > .MaxWidthWrapper > :nth-child(1) > :nth-child(1)').should('have.text', '\n\t\t\t\t\t\t\tClique em uma disciplina para ter acesso a sua\n\t\t\t\t\t\t\tementa.\n\t\t\t\t\t\t');
    cy.get('[style="transition-delay: 0ms;"] > h2').should('have.text','1º Semestre');
    cy.get('[style="transition-delay: 100ms;"] > h2').should('have.text','2º Semestre');
    cy.get('[style="transition-delay: 200ms;"] > h2').should('have.text','3º Semestre');
    cy.get('[style="transition-delay: 300ms;"] > h2').should('have.text','4º Semestre');
    cy.get('[style="transition-delay: 400ms;"] > h2').should('have.text','5º Semestre');
    cy.get('[style="transition-delay: 500ms;"] > h2').should('have.text','6º Semestre');
    cy.get('[style="transition-delay: 600ms;"] > h2').should('have.text','7º Semestre');
    cy.get('[style="transition-delay: 700ms;"] > h2').should('have.text','Optativas');


  });

  it('0012-Acessar ao repositório com email dos docentes',()=>{
    cy.get('.iconMenu > div').click();
    cy.visit('https://uesc.vercel.app/emails');
  });

  it('0013-Acessar a calculadora de prova final',()=>{
    cy.get('.iconMenu > div').click();
    cy.visit('https://uesc.vercel.app/calculadora');
  });

  it('0014-Visualizar a composição do colegiado.',()=>{
    cy.get('.iconMenu > div').click();
    cy.visit('https://colcic.uesc.br/colegiado/');
    cy.get('.mainContent > h1').should('have.text','\n\t\t\t\t\t\t\t\tSobre o \n\t\t\t\t\t\t\t\tColegiado\n\t\t\t\t\t\t\t');
    cy.get('.composicao > h2').should('have.text','Composição - Biênio 2020-2022');
  });
  it('0015-Visualizar o calendário das reuniões.',()=>{
    cy.get('.iconMenu > div').click();
    cy.visit('https://colcic.uesc.br/calendario/');
    cy.get('.mainContent > h1').should('have.text','\n\t\t\t\t\t\t\t\tCalendário de \n\t\t\t\t\t\t\t\tReuniões para 2022\n\t\t\t\t\t\t\t');
    cy.get('.composicao > h2').should('have.text','Calendário');
  });





});
