import "@nomiclabs/hardhat-waffle";
import "dotenv/config";

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: "0.8.20",
  networks: {
    xlayer: {
      url: "https://testrpc.xlayer.tech/terigon",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1952,
    }
  }
};
