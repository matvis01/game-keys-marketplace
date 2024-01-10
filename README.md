![Logo](docs/logo_light.png)

## Overview

gameBit is a full-stack web application powered by blockchain technology and Next.js. It creates a platform where users can freely and securely sell or buy game keys using cryptocurrencies.

## Screenshots

![App Screenshot](docs/frontPage.png)

## Technologies

- Next.js
- React
- TypeScript
- daisyUI
- Axios
- Formik
- Yup
- Wagmi
- Web3.js
- Ethers.js

## Features

- **Cryptocurrency Wallet Integration** - Possibility to connect a diverse range of cryptocurrency wallets to allow secure transactions.
- **Game Key Marketplace** - Effortlessly list and purchase game keys.
- **Intuitive Search Functionality** - Easily discover available game listings through a user-friendly search interface.
- **Comprehensive Game Information** - Access detailed descriptions of each game.
- **Dynamic Sorting and Filtering** - Possibility to filter games based on genres, tags, and other relevant criteria.

## Prerequisites

Before setting up the project, make sure you have the following prerequisites installed:

- Node.js

## Development

### Backend

The smart contract has been deployed, and the database is established, allowing for potential modifications. To implement updates to the database or deploy a new smart contract, follow the outlined steps by cloning the designated repositories:

**Database**

https://github.com/matvis01/graph-game-keys-marketplace

**Smart Contract**

https://github.com/matvis01/hardhat-game-keys-marketplace-backend

### Frontend

1. Navigate to the root directory in a terminal:
   `cd frontend`

2. Install the frontend dependencies:
   `npm install`

3. In the `.env` file, fill the following environment variables:

```
NEXT_PUBLIC_WALLET_CONNECT_ID = <wallet connect key>
NEXT_PUBLIC_RAWG_KEY = <rawg game API private key>
NEXT_PUBLIC_ENCRYPT_KEY = <generated encryption key>
```

5. Start the frontend development server:
   `npm run dev`

The application should start at port 3000.

###

\_To alter the application's network, ensure to update the NEXT_PUBLIC_CHAIN_ID with the desired network's chain ID. Additionally, to switch to your own database, modify the NEXT_PUBLIC_GRAPH_URL to your preferred URL.\_

## License

gameBit is licensed under the [MIT License](LICENSE)

## Authors

- [@matvis01](https://github.com/matvis01)
- [@filus4](https://github.com/filus4)
