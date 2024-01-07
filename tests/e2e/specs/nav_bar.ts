describe("Metamask Extension tests", () => {
  // Add a new network to Metamask using the `cy.addMetamaskNetwork()` command
  it("checks if all options for logged users are available and working", () => {
    cy.addMetamaskNetwork({
      networkName: "sepolia",
      rpcUrl: "https://rpc.sepolia.org",
      chainId: 11155111,
      symbol: "ETH",
      blockExplorer: "https://sepolia.etherscan.io",
      isTestnet: true,
    })
    cy.visit("http://localhost:3000/game/22509")
    cy.get('[data-testid="test-connect-button"]').click()
    cy.acceptMetamaskAccess()

    cy.get('[data-testid="top-listing-buy-button-22509"]')
      .should("be.visible")
      .click()
    cy.confirmMetamaskTransactionAndWaitForMining()
    cy.switchToCypressWindow()
    cy.visit("http://localhost:3000/profile")

    //   //navbar dropdown options are being loaded
    //   cy.get("[data-testid='navbardropdown']").click()
    //   cy.get("[data-testid='list-game-modal-btn']").should("be.visible")
    //   cy.get("[data-testid='profile-nav-link-btn']").should("be.visible")
    //   cy.get("[data-testid='disconnect-nav-btn']").should("be.visible")

    //   //redirects to profile page correctly on click in dropdown menu
    //   cy.get("[data-testid='navbardropdown']").click()
    //   cy.get("[data-testid='profile-nav-link-btn']").click()
    //   cy.url().should("include", "/profile")

    //   //correctly displays a modal for adding new game and closes it
    //   cy.get("[data-testid='navbardropdown']").click()
    //   cy.get("[data-testid='list-game-modal-btn']").click()
    //   cy.get("[data-testid='add-game-modal']").should("be.visible")
    //   cy.get("[data-testid='close-modal-btn']").click()
    //   cy.get("[data-testid='add-game-modal']").should("not.be.visible")

    //   //disconnects wallet from website correctly
    //   cy.get("[data-testid='navbardropdown']").click()
    //   cy.get("[data-testid='disconnect-nav-btn']").click()
    //   cy.get("[data-testid='navbardropdown']").should("not.exist")
    // })

    // it("loads the navigation bar", () => {
    //   cy.visit("/")
    //   const navigationBar = cy.get('[data-testid="navigation-bar-component"]')
    //   navigationBar.should("exist")
    // })

    // it("loads the main page when the logo is clicked", () => {
    //   cy.visit("/categories")
    //   cy.get('[data-testid="logo-nav-link"]').click()
    //   cy.url().should("include", "/")
    // })

    // it("loads the home page when the home option is clicked", () => {
    //   cy.visit("/categories")
    //   cy.get('[data-testid="home-nav-link"]').click()
    //   cy.url().should("include", "/")
    // })

    // it("loads the categories page when the categories option is clicked", () => {
    //   cy.visit("/")
    //   cy.get("body").should("be.visible")
    //   const categoriesLink = cy.get('[data-testid="categories-nav-link"]')
    //   categoriesLink.click()
    //   cy.url().should("include", "/categories")
    // })

    // it("highlights home option when the home page is loaded", () => {
    //   cy.visit("/")
    //   cy.get('[data-testid="home-nav-link"]')
    //     .find("p")
    //     .should("have.class", "text-primary")
    // })

    // it("highlights categories option when the categories page is loaded", () => {
    //   cy.visit("/categories")
    //   cy.get('[data-testid="categories-nav-link"]')
    //     .find("p")
    //     .should("have.class", "text-primary")
    // })

    // it("loads the currency selector and contains all the currencies", () => {
    //   cy.visit("/")
    //   const currencySelector = cy.get(
    //     '[data-testid="currency-selector-component"]',
    //   )
    //   currencySelector.should("exist")
    //   const currencyOptions = cy.get(
    //     '[data-testid="currency-selector-component-option"]',
    //   )
    //   currencyOptions.should("exist")
    //   currencyOptions.should("have.length", 7)
    // })

    // it("loads the wallet modal when the wallet button is clicked", () => {
    //   cy.visit("/")
    //   cy.get('[data-testid="w3m-connect-button"]').click()
    //   cy.get("w3m-modal").should("exist")
  })
})
