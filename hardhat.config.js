require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "wallaby",
  networks: {
    wallaby: {
      url: "https://wallaby.node.glif.io/rpc/v0",
      accounts: [PRIVATE_KEY],
    }
  },
  paths: {
    sources: "./chain/FEVM-Hardhat-Kit/contracts",
    tests: "./chain/FEVM-Hardhat-Kit/test",
    cache: "./chain/FEVM-Hardhat-Kit/cache",
    artifacts: "./chain/FEVM-Hardhat-Kit/artifacts"
  },
};