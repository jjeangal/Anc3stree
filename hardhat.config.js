require("dotenv").config()
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require("@nomicfoundation/hardhat-toolbox");
require("./chain/FEVM-Hardhat-Kit/tasks")

const PRIVATE_KEY = process.env.PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: true,
    }
  },
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