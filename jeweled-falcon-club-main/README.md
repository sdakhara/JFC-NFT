# Jeweled Falcon Club NFT Collection

## Usage

Install dependencies:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)

Clone the repository and install dependencies:

```
git clone https://github.com/jshstw/jeweled-falcon-club.git && cd jeweled-falcon-club/blockchain
yarn install
```

Set up the environment variables:

- Create an [Infura](https://infura.io/) account and create a new project.
- Rename "temp.env" to ".env".
- Fill .env file with the project ID from Infura and the private key from your MetaMask Ethereum wallet.

Deploy the contract the the mainnet:

```
yarn deploy
```