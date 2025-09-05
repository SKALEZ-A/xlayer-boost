'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'ethers/lib/utils';
import Image from 'next/image';

const FACTORY_ADDRESS = '0x0000000000000000000000000000000000000000'; // Will be updated after deployment
const CREATION_FEE = '1.0'; // 1 OKB

export default function TokenCreation() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const handleCreateToken = async () => {
    if (!tokenName || !tokenSymbol) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // This would call the factory contract to create a new token
      // For now, we'll show a placeholder
      alert(`Token "${tokenName}" (${tokenSymbol}) would be created!\n\nThis feature will be implemented once contracts are deployed.`);

      // Reset form
      setTokenName('');
      setTokenSymbol('');
    } catch (error) {
      console.error('Error creating token:', error);
      alert('Error creating token. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Image
          src="/logo.png"
          alt="XLAYER BOOST Logo"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <h2 className="text-2xl font-bold text-white">Create New Token</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Token Name
          </label>
          <input
            type="text"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            placeholder="e.g., DogeCoin"
            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Token Symbol
          </label>
          <input
            type="text"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            placeholder="e.g., DOGE"
            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-blue-300">Creation Fee:</span>
          <span className="text-white font-semibold">{CREATION_FEE} OKB</span>
        </div>
      </div>

      <button
        onClick={handleCreateToken}
        disabled={isLoading || isConfirming}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:cursor-not-allowed"
      >
        {isLoading || isConfirming ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            {isConfirming ? 'Confirming...' : 'Creating Token...'}
          </div>
        ) : (
          'Create Token 🚀'
        )}
      </button>

      <div className="mt-4 text-sm text-gray-400 text-center">
        <p>✨ Your token will use bonding curve pricing</p>
        <p>💰 Automatic liquidity provision at 80 OKB</p>
        <p>🔒 Time-locked liquidity for security</p>
      </div>
    </div>
  );
}
