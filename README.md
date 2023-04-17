# Easyhost

Easyhost is a simple backend, smart contract that enables people to build decentralized accommodation marketplaces. This is a work in progress, and is not yet ready for production use.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

To run this project, you'll need:

* Node.js (v14.x or higher)
* Yarn (optional, you can use npm instead)
* MetaMask browser extension
* Ganache or another Ethereum development network
* MongoDB Atlas account (optional, you can use a local MongoDB instance instead)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/xdaluca/easyhost.git
```

2. Install the dependencies:

```bash
cd easyhost
yarn install # or "npm install"
```

3. Compile and deploy the smart contract:

Replace the `bookingAddress` variable in `bookingOnChain.js` with your contract address.

4. Set up your local Ethereum network:

Start Ganache or another Ethereum development network and connect MetaMask to it.

5. Set up the database:

Connect your MongoDB instance to the backend server. You can use a local MongoDB instance or MongoDB Atlas.

7. Start Ganache or another Ethereum development network and connect MetaMask to it.

```bash
ganache-cli
```

8. Start the backend server:

```bash
cd backend
node app.js
```

You can now test the API endpoints using Postman or another API testing tool.

## Project Architecture

As this is a work in progress, the architecture is subject to change, I would like to change the db to a more decentralized solution, but for the sake of setting it up, it is using MongoDB.

```mermaid
graph LR
A[Backend] --> B[Node.js]
A --> C[Express.js]
A --> D[MongoDB<br>(replace with IPFS?)]
E[Smart Contracts] --> F[Ethereum]
E --> G[Solidity]
E --> H[Web3.js]
E --> I[Truffle]
E --> J[Ganache<br>(for development)]
```

## Contributing

If anyone is interested in contributing to this please reach out, It would be great to review the architecture and see if there are any foundational improvements that can be made before doing more implementation work.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

Happy Hosting.