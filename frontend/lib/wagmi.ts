import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { xLayer, xLayerTestnet } from 'viem/chains';

export const config = getDefaultConfig({
  appName: 'XLAYER BOOST',
  projectId: 'xlayer-boost',
  chains: [
    {
      id: 1952,
      name: 'X Layer testnet',
      network: 'xLayerTestnet',
      nativeCurrency: {
        decimals: 18,
        name: 'OKB',
        symbol: 'OKB',
      },
      rpcUrls: {
        default: { http: ['https://testrpc.xlayer.tech/terigon'] },
        public: { http: ['https://testrpc.xlayer.tech/terigon'] },
      },
      blockExplorers: {
        default: { name: 'X Layer Testnet Explorer', url: 'https://www.okx.com/web3/explorer/xlayer-test' },
      },
      testnet: true,
    },
    xLayer,
    xLayerTestnet,
    {
      id: 197,
      name: 'X Layer',
      network: 'xLayer',
      nativeCurrency: {
        decimals: 18,
        name: 'OKB',
        symbol: 'OKB',
      },
      rpcUrls: {
        default: { http: ['https://rpc.xlayer.tech/mainnet'] },
        public: { http: ['https://rpc.xlayer.tech/mainnet'] },
      },
      blockExplorers: {
        default: { name: 'X Layer Explorer', url: 'https://www.oklink.com/xlayer' },
      },
      testnet: false,
    },
  ],
  transports: {
    [1952]: http('https://testrpc.xlayer.tech/terigon'),
    [xLayer.id]: http(),
    [xLayerTestnet.id]: http(),
    [197]: http('https://rpc.xlayer.tech/mainnet'),
  },
});
