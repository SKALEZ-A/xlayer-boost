// Script to generate frontend contract configuration
// Run this after manual deployment with your deployed addresses

const fs = require('fs');

function generateContractConfig(addresses) {
  const config = `// frontend/lib/contracts.ts
export const CONTRACT_ADDRESSES = {
  FACTORY: "${addresses.FACTORY || '0x0000000000000000000000000000000000000000'}",
  ROUTER: "${addresses.ROUTER || '0x0000000000000000000000000000000000000000'}",
  FEE_DISTRIBUTOR: "${addresses.FEE_DISTRIBUTOR || '0x0000000000000000000000000000000000000000'}",
  LIQUIDITY_LOCKER: "${addresses.LIQUIDITY_LOCKER || '0x0000000000000000000000000000000000000000'}",
} as const;

export const NETWORK_CONFIG = {
  chainId: 195,
  name: 'X Layer Testnet',
  rpcUrl: 'https://xlayertestrpc.okx.com/terigon',
  blockExplorer: 'https://www.oklink.com/xlayer-test',
} as const;
`;

  fs.writeFileSync('./frontend/lib/contracts.ts', config);
  console.log('✅ Contract configuration generated!');
  console.log('📄 File: frontend/lib/contracts.ts');
}

// Example usage - replace with your actual deployed addresses
const exampleAddresses = {
  FACTORY: "0x1234567890123456789012345678901234567890",
  ROUTER: "0x0987654321098765432109876543210987654321",
  FEE_DISTRIBUTOR: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  LIQUIDITY_LOCKER: "0xfedcba0987654321fedcba0987654321fedcba09",
};

console.log('📋 Replace the example addresses with your deployed contract addresses:');
console.log(JSON.stringify(exampleAddresses, null, 2));
console.log('\n💡 Then run: node scripts/generateConfig.js');

// Uncomment to generate config with actual addresses
// generateContractConfig(yourActualAddresses);
