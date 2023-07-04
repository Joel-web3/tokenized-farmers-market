require("@nomiclabs/hardhat-waffle");
require("@celo/hardhat-celo");

module.exports = {
  solidity: "0.8.0",
  networks: {
	hardhat: {},
	celo: {
  	url: "https://forno.celo.org",
  	accounts: ["MNEMONIC_KEY"],
	},
  },
};