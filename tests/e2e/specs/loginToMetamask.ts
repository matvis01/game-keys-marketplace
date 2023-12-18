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

    cy.visit("http://localhost:3000")
    cy.get('[data-testid="test-connect-button"]').click()
    cy.acceptMetamaskAccess()

    it("navbar dropdown options are being loaded", () => {
      cy.get("[data-testid='navbardropdown']").click()
      cy.get("[data-testid='list-game-modal-btn']").should("be.visible")
      cy.get("[data-testid='profile-nav-link-btn']").should("be.visible")
      cy.get("[data-testid='disconnect-nav-btn']").should("be.visible")
    })

    it("redirects to profile page correctly on click in dropdown menu", () => {
      cy.get("[data-testid='navbardropdown']").click()
      cy.get("[data-testid='profile-nav-link-btn']").click()
      cy.url().should("include", "/profile")
    })

    it("correctly displays a modal for adding new game and closes it", () => {
      cy.get("[data-testid='navbardropdown']").click()
      cy.get("[data-testid='list-game-modal-btn']").click()
      cy.get("[data-testid='add-game-modal']").should("be.visible")
      cy.get("[data-testid='close-modal-btn']").click()
      cy.get("[data-testid='add-game-modal']").should("not.be.visible")
    })

    it("disconnects wallet from website correctly", () => {
      cy.get("[data-testid='navbardropdown']").click()
      cy.get("[data-testid='disconnect-nav-btn']").click()
      cy.get("[data-testid='navbardropdown']").should("not.exist")
    })
  })
})
