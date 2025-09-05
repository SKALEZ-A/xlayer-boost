// Template for frontend contract configuration
// Replace the placeholder addresses with your deployed contract addresses

export const CONTRACT_ADDRESSES = {
  FACTORY: "0x0000000000000000000000000000000000000000", // Replace with your PumpFactory address
  ROUTER: "0x0000000000000000000000000000000000000000",  // Replace with your PumpRouter address
  FEE_DISTRIBUTOR: "0x0000000000000000000000000000000000000000", // Replace with your FeeDistributor address
  LIQUIDITY_LOCKER: "0x0000000000000000000000000000000000000000", // Replace with your LiquidityLocker address
} as const;

export const NETWORK_CONFIG = {
  chainId: 1952,
  name: 'X Layer testnet',
  rpcUrl: 'https://testrpc.xlayer.tech/terigon',
  blockExplorer: 'https://www.okx.com/web3/explorer/xlayer-test',
} as const;

// Contract ABIs (will be auto-generated after compilation)
export const FACTORY_ABI = [
  // Add factory contract ABI here
];

export const ROUTER_ABI = [
  // Add router contract ABI here
];

export const PAIR_ABI = [
  // Add pair contract ABI here
];
