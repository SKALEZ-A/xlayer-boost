'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Mock data for demonstration
const mockTokens = [
  {
    id: '1',
    name: 'DogeCoin',
    symbol: 'DOGE',
    creator: '0x1234...5678',
    price: '0.0012',
    marketCap: '24,000',
    volume24h: '8,500',
    okbReserve: '45.2',
    tokenReserve: '850,000',
    progress: 56.5, // percentage to 80 OKB
  },
  {
    id: '2',
    name: 'CatCoin',
    symbol: 'CAT',
    creator: '0xabcd...efgh',
    price: '0.0008',
    marketCap: '16,000',
    volume24h: '5,200',
    okbReserve: '32.1',
    tokenReserve: '920,000',
    progress: 40.1,
  },
  {
    id: '3',
    name: 'MoonToken',
    symbol: 'MOON',
    creator: '0x9876...1234',
    price: '0.0021',
    marketCap: '42,000',
    volume24h: '12,800',
    okbReserve: '67.8',
    tokenReserve: '680,000',
    progress: 84.8,
  },
];

export default function TokenList() {
  const [tokens, setTokens] = useState(mockTokens);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Image
          src="/logo.png"
          alt="XLAYER BOOST Logo"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <h2 className="text-2xl font-bold text-white">Active Tokens</h2>
      </div>

      <div className="space-y-4">
        {tokens.map((token) => (
          <div key={token.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {token.name} ({token.symbol})
                </h3>
                <p className="text-sm text-gray-400">
                  Creator: {token.creator}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-400">
                  {token.price} OKB
                </p>
                <p className="text-sm text-gray-400">
                  MC: ${token.marketCap}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-500/20 rounded p-3">
                <p className="text-xs text-blue-300">OKB Reserve</p>
                <p className="text-lg font-semibold text-white">{token.okbReserve} OKB</p>
              </div>
              <div className="bg-purple-500/20 rounded p-3">
                <p className="text-xs text-purple-300">Token Reserve</p>
                <p className="text-lg font-semibold text-white">{token.tokenReserve}</p>
              </div>
              <div className="bg-green-500/20 rounded p-3">
                <p className="text-xs text-green-300">24h Volume</p>
                <p className="text-lg font-semibold text-white">${token.volume24h}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">DEX Migration Progress</span>
                <span className="text-white">{token.progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(token.progress, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {token.progress >= 80 ? 'Ready for DEX migration!' : `${(80 - token.okbReserve).toFixed(1)} OKB to go`}
              </p>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
                Buy 💰
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
                Sell 📈
              </button>
              {token.progress >= 80 && (
                <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
                  Migrate to DEX 🚀
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {tokens.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-white mb-2">No tokens yet</h3>
          <p className="text-gray-400">Be the first to create a meme token on X Layer!</p>
        </div>
      )}
    </div>
  );
}
