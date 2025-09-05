// Quick script to generate frontend contract configuration
// Run: node scripts/generateContracts.js

import fs from 'fs';

function generateContractsConfig(addresses) {
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

// Example addresses - replace with your actual deployed addresses
const deployedAddresses = {
  FACTORY: "PASTE_YOUR_FACTORY_ADDRESS_HERE",
  ROUTER: "PASTE_YOUR_ROUTER_ADDRESS_HERE",
  FEE_DISTRIBUTOR: "PASTE_YOUR_FEE_DISTRIBUTOR_ADDRESS_HERE",
  LIQUIDITY_LOCKER: "PASTE_YOUR_LIQUIDITY_LOCKER_ADDRESS_HERE",
};

console.log('📋 Replace the placeholder addresses with your deployed contract addresses:');
console.log(JSON.stringify(deployedAddresses, null, 2));
console.log('\n💡 Then update frontend/lib/contracts.ts manually or run this script with real addresses');
