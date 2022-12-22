/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Music Center App', () => {
  beforeEach(() => {
    cy.intercept('GET', /(playlistItems)/g, {
      fixture: 'playList.json'
    });
    cy.visit('/');
    cy.viewport(1000, 660);
  });

  it('renders', () => {
    cy.findAllByText('Music Center').should('exist');
  });

  it('the page moves when navigation cliked', () => {
    cy.findAllByTestId('navi').eq(1).click();
    cy.window().its('scrollY').should('equal', 660);

    cy.findAllByTestId('navi').eq(2).click();
    cy.window().its('scrollY').should('equal', 1320);

    cy.findAllByTestId('navi').eq(3).click();
    cy.window().its('scrollY').should('equal', 1980);

    cy.findAllByTestId('navi').eq(0).click();
    cy.window().its('scrollY').should('equal', 0);
  });

  it('move Main Page to Updated Music Page when button clicked', () => {
    cy.findByTestId('goToMusic').click();
    cy.window().its('scrollY').should('equal', 660);
  });

  describe('the page moves when keyboard event and wheel event operated', () => {
    it('on the first page does not change when press arrow up on the keyboard or move the mouse wheel up', () => {
      cy.findAllByTestId('page').eq(0).trigger('keyup', { code: 'ArrowUp' });
      cy.findAllByTestId('page').eq(0).trigger('wheel', {
        deltaY: -10
      });
      cy.findAllByText('Music Center').should('exist');
    });

    it('change pages when Press the arrow keyboard or move the mouse wheel ', () => {
      cy.findAllByTestId('page').eq(0).trigger('wheel', {
        deltaY: 10
      });
      cy.window().its('scrollY').should('equal', 660);

      cy.findAllByTestId('page').eq(1).trigger('keyup', { code: 'ArrowDown' });
      cy.window().its('scrollY').should('equal', 1320);

      cy.findAllByTestId('page').eq(2).trigger('wheel', {
        deltaY: 10
      });
      cy.window().its('scrollY').should('equal', 1980);

      cy.findAllByTestId('page').eq(2).trigger('wheel', {
        deltaY: -10
      });
      cy.window().its('scrollY').should('equal', 1320);

      cy.findAllByTestId('page').eq(1).trigger('keyup', { code: 'ArrowUp' });
      cy.window().its('scrollY').should('equal', 660);
    });

    it('on the last page does not change  when press arrow up on the keyboard or move the mouse wheel up', () => {
      cy.findAllByTestId('navi').eq(3).click();
      cy.findAllByTestId('page').eq(3).trigger('wheel', {
        deltaY: 10
      });
      cy.findAllByTestId('page').eq(3).trigger('keyup', { code: 'ArrowDown' });
      cy.window().its('scrollY').should('equal', 1980);
    });
  });

  describe('updated Music', () => {
    beforeEach(() => {
      cy.findAllByTestId('navi').eq(1).click();
    });

    it('The number of videos displayed on the screen depending on the resolution', () => {
      cy.findAllByTestId('page')
        .eq(1)
        .find('[data-testid="video"]')
        .should('have.length', 3);

      cy.viewport(700, 660);
      cy.findAllByTestId('page')
        .eq(1)
        .find('[data-testid="video"]')
        .eq(2)
        .should('not.be.visible');
    });

    it('display video detail when video item cliked', () => {
      cy.findAllByTestId('page')
        .eq(1)
        .find('[data-testid="video"]')
        .eq(0)
        .click();
      cy.findByTestId('detail_video').should('exist');
    });
  });

  describe('Music List', () => {
    it('render slider', () => {
      onDisplayItem(3, 1);
      cy.findAllByTestId('arrow').should('have.length', 2);
      cy.findAllByTestId('dot').should('have.length', 2);
    });

    it('display video detail when video item cliked', () => {
      cy.findAllByTestId('page')
        .eq(2)
        .find('[data-testid="video"]')
        .eq(0)
        .click();
      cy.findByTestId('detail_video').should('have.text', 'video1');
    });

    it('display pages when arrow clicked', () => {
      cy.findAllByTestId('arrow').eq(1).click();
      onDisplayItem(3, 4);

      cy.findAllByTestId('arrow').eq(0).click();
      onDisplayItem(3, 1);
    });

    it('display pages when dot clicked', () => {
      cy.findAllByTestId('dot').eq(1).click();
      onDisplayItem(3, 4);
    });

    it('render slider with viewport(700, 600)', () => {
      cy.viewport(700, 600);
      cy.findAllByTestId('page')
        .eq(2)
        .find('[data-testid="video"]:visible')
        .should('have.length', 2);
      cy.findAllByTestId('arrow').should('have.length', 2);
      cy.findAllByTestId('dot').should('have.length', 0);
    });

    function onDisplayItem(length: number, index: number) {
      cy.findAllByTestId('page')
        .eq(2)
        .find('[data-testid="video"]:visible')
        .should('have.length', length)
        .each((video, number) => {
          cy.wrap(video).should('have.text', `video${number + index}`);
        });
    }
  });

  describe('Music Request', () => {
    describe('BoardForm', () => {
      it('add and remove post item', () => {
        cy.findByTestId('option');
        cy.findByTestId('id').type('user1');
        cy.findByTestId('psw').type('123');
        cy.findByTestId('content').type('test01');
        cy.findByTestId('confirm').click();
        cy.contains('test01');
        cy.findAllByTestId('post_item')
          .eq(0)
          .find('[data-testid="elipsis"]')
          .click();
        cy.window().then((win) => {
          cy.stub(win, 'prompt').returns('123');
        });
        cy.findAllByTestId('post_item')
          .eq(0)
          .find('[data-testid="deleteBtn"]')
          .click();
      });

      it('add and delete notice Item', () => {
        cy.findByTestId('option').select('Notice');
        cy.findByTestId('id').type('admin');
        cy.findByTestId('psw').type('135790');
        cy.findByTestId('content').type('notice01');
        cy.findByTestId('confirm').click();
        cy.contains('notice01');
        cy.findAllByTestId('notice_item')
          .eq(0)
          .find('[data-testid="elipsis"]')
          .click();
        cy.window().then((win) => {
          cy.stub(win, 'prompt').returns('135790');
        });
        cy.findAllByTestId('notice_item')
          .eq(0)
          .find('[data-testid="deleteBtn"]')
          .click();
      });

      describe('form validation', () => {
        it('empty name', () => {
          cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
          });
          cy.findByTestId('confirm').click();
          cy.get('@alert').should(
            'have.been.calledOnceWith',
            '작성자를 입력하세요.'
          );
        });

        it('empty password', () => {
          cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
          });
          cy.findByTestId('id').type('admin');
          cy.findByTestId('confirm').click();
          cy.get('@alert').should(
            'have.been.calledOnceWith',
            '비밀번호를 입력하세요.'
          );
        });

        it('empty content', () => {
          cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
          });
          cy.findByTestId('id').type('admin');
          cy.findByTestId('psw').type('1234');
          cy.findByTestId('confirm').click();
          cy.get('@alert').should(
            'have.been.calledOnceWith',
            '내용을 입력하세요.'
          );
        });

        it('incorrect admin password', () => {
          cy.findByTestId('option').select('Notice');
          cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
          });
          cy.findByTestId('id').type('admin');
          cy.findByTestId('psw').type('1234');
          cy.findByTestId('content').type('notice01');
          cy.findByTestId('confirm').click();
          cy.get('@alert').should(
            'have.been.calledOnceWith',
            '접근권한이 없습니다.'
          );
        });
      });
    });
  });

  it('display mobile navagation when menu item clicked at screen width <= 991px', () => {
    cy.viewport(991, 600);
    cy.findByTestId('mui').click();
    cy.findAllByTestId('navi').eq(0).should('have.text', 'Home');
    cy.findAllByTestId('navi').eq(1).should('have.text', 'New');
    cy.findAllByTestId('navi').eq(2).should('have.text', 'List');
    cy.findAllByTestId('navi').eq(3).should('have.text', 'Comment');
  });
});
