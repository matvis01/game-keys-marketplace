// Define the test suite "Metamask Extension tests"
describe("Metamask Extension tests", () => {
  // Define the test case "connect to DApp with Metamask extension example"
  it("connect to DApp with Metamask extension example", () => {
    // Add a new network to Metamask using the `cy.addMetamaskNetwork()` command
    cy.addMetamaskNetwork({
      networkName: "sepolia",
      rpcUrl: "https://rpc.sepolia.org",
      chainId: 11155111,
      symbol: "ETH",
      blockExplorer: "https://sepolia.etherscan.io",
      isTestnet: true,
    })

    cy.visit("http://localhost:3000")
    cy.get('[data-testid="connectBtn"]').click()

    cy.acceptMetamaskAccess().should("be.true")
    cy.get("[data-testid='navbardropdown']").should("be.visible")
  })

  //   // Visit the root URL of the DApp
  //   cy.visit("/");

  //   // Click the "Connect" button on the DApp
  //   cy.get("#connectButton").click();

  //   // Accept the Metamask access request by clicking the "Connect" button in the Metamask popup
  //   cy.acceptMetamaskAccess().should("be.true");

  //   // Assert that the "Connect" button on the DApp shows the text "Connected"
  //   cy.get("#connectButton").should("have.text", "Connected");
  // });
})
