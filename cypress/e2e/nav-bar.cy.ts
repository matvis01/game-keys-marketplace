describe("navigation bar", () => {
  it("loads the navigation bar", () => {
    cy.visit("/")
    const navigationBar = cy.get('[data-testid="navigation-bar-component"]')
    navigationBar.should("exist")
  })

  it("loads the main page when the logo is clicked", () => {
    cy.visit("/categories")
    cy.get('[data-testid="logo-nav-link"]').click()
    cy.url().should("include", "/")
  })

  it("loads the home page when the home option is clicked", () => {
    cy.visit("/categories")
    cy.get('[data-testid="home-nav-link"]').click()
    cy.url().should("include", "/")
  })

  it("loads the categories page when the categories option is clicked", () => {
    cy.visit("/")
    cy.get("body").should("be.visible")
    const categoriesLink = cy.get('[data-testid="categories-nav-link"]')
    categoriesLink.click()
    cy.url().should("include", "/categories")
  })

  it("highlights home option when the home page is loaded", () => {
    cy.visit("/")
    cy.get('[data-testid="home-nav-link"]')
      .find("p")
      .should("have.class", "text-primary")
  })

  it("highlights categories option when the categories page is loaded", () => {
    cy.visit("/categories")
    cy.get('[data-testid="categories-nav-link"]')
      .find("p")
      .should("have.class", "text-primary")
  })

  it("loads the currency selector and contains all the currencies", () => {
    cy.visit("/")
    const currencySelector = cy.get(
      '[data-testid="currency-selector-component"]',
    )
    currencySelector.should("exist")
    const currencyOptions = cy.get(
      '[data-testid="currency-selector-component-option"]',
    )
    currencyOptions.should("exist")
    currencyOptions.should("have.length", 7)
  })

  it("loads the wallet modal when the wallet button is clicked", () => {
    cy.visit("/")
    cy.get('[data-testid="w3m-connect-button"]').click()
    cy.get("w3m-modal").should("exist")
  })
})
