describe("home page", () => {
  it("renders the home page and its components", () => {
    cy.visit("/")

    const quickAccessBarContainer = cy.get(
      '[data-testid="quick-access-bar-container"]',
    )
    const quickAccessBar = cy.get('[data-testid="quick-access-bar-component"]')
    quickAccessBarContainer.should("exist")
    quickAccessBar.should("exist")

    const featuredGamesContainer = cy.get(
      '[data-testid="featured-games-container"]',
    )
    const featuredGames = cy.get('[data-testid="featured-games-component"]')
    featuredGamesContainer.should("exist")
    featuredGames.should("exist")

    const bestsellersContainer = cy.get('[data-testid="bestsellers-container"]')
    const bestsellers = cy.get('[data-testid="bestsellers-component"]')
    bestsellersContainer.should("exist")
    bestsellers.should("exist")

    const topRatedContainer = cy.get('[data-testid="top-rated-container"]')
    const topRated = cy.get('[data-testid="top-rated-component"]')
    topRatedContainer.should("exist")
    topRated.should("exist")

    const newArrivalsContainer = cy.get(
      '[data-testid="new-arrivals-container"]',
    )
    const newArrivals = cy.get('[data-testid="new-arrivals-component"]')
    newArrivalsContainer.should("exist")
    newArrivals.should("exist")

    const categoriesContainer = cy.get('[data-testid="categories-container"]')
    const categories = cy.get('[data-testid="categories-component"]')
    categoriesContainer.should("exist")
    categories.should("exist")
  })

  it("redirects to categories page with the correct filters for the bestsellers section when the button is clicked", () => {
    cy.visit("/")
    cy.get('[data-testid="bestsellers-button"]').click()
    cy.url().should("include", "/categories")
    cy.url().should("include", "numOfSoldItems")
  })

  it("redirects to categories page with the correct filters for the top rated section when the button is clicked", () => {
    cy.visit("/")
    cy.get('[data-testid="top-rated-button"]').click()
    cy.url().should("include", "/categories")
    cy.url().should("include", "rating")
  })

  it("redirects to categories page with the correct filters for the new arrivals section when the button is clicked", () => {
    cy.visit("/")
    cy.get('[data-testid="new-arrivals-button"]').click()
    cy.url().should("include", "/categories")
    cy.url().should("include", "latestDate")
  })
})
