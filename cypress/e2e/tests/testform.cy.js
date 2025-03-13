describe('Authorization Form Validation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200'); 
  });

  it('should display error for invalid email format', () => {
    // Ввод некорректного email
    cy.get('input[type="email"]').type('invalid-email').blur();

    // Проверка отображения ошибки
    cy.contains('Invalid email address.').should('be.visible');
  });

  it('should not display error for valid email format', () => {
    // Ввод корректного email
    cy.get('input[type="email"]').type('user@example.com').blur();

    // Проверка отсутствия ошибки
    cy.contains('Invalid email address.').should('not.exist');
  });

  it('should display error for invalid password', () => {
    // Ввод некорректного пароля
    cy.get('input[type="password"]').type('short').blur();

    // Проверка отображения ошибки
    cy.contains('The password must contain lowercase letter, uppercase letter, number and special character.').should('be.visible');
  });

  it('should not display error for valid password', () => {
    // Ввод корректного пароля
    cy.get('input[type="password"]').type('validPassword123').blur();

    // Проверка отсутствия ошибки
    cy.contains('Password must be at least 6 characters long.').should('not.exist');
  });
});
