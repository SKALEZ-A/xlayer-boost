'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import TokenCreation from '../components/TokenCreation';
import TokenList from '../components/TokenList';
import Header from '../components/Header';
import Image from 'next/image';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="text-center py-20">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <Image
                src="/logo.png"
                alt="XLAYER BOOST Logo"
                width={80}
                height={80}
                className="rounded-xl"
              />
              <h1 className="text-6xl font-bold text-white">
                XLAYER BOOST
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              The ultimate meme token launchpad on X Layer with revolutionary
              bonding curves, automatic liquidity, and anti-rug protection
            </p>
            <div className="mb-8">
              <ConnectButton />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-2">🚀 Revolutionary Launch</h3>
                <p className="text-gray-300">No pre-allocations, pure community-driven token launches</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-2">⚡ Smart Liquidity</h3>
                <p className="text-gray-300">Automatic DEX migration at 80 OKB with permanent locks</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-2">🛡️ Anti-Rug Shield</h3>
                <p className="text-gray-300">Time-locked liquidity and transparent fee distribution</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome to XLAYER BOOST
              </h1>
              <p className="text-gray-300">
                Launch your revolutionary meme token or explore the ecosystem
              </p>
            </div>

            <TokenCreation />
            <TokenList />
          </div>
        )}
      </main>

      <footer className="bg-black/20 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center space-x-3 text-gray-400">
            <Image
              src="/logo.png"
              alt="XLAYER BOOST Logo"
              width={24}
              height={24}
              className="rounded"
            />
            <p>Powered by XLAYER BOOST & OKB</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
