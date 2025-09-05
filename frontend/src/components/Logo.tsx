import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export default function Logo({ size = 40, className = '', showText = false }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src="/logo.png"
        alt="XLAYER BOOST Logo"
        width={size}
        height={size}
        className="rounded-lg"
      />
      {showText && (
        <span className="text-white font-bold text-lg">XLAYER BOOST</span>
      )}
    </div>
  );
}
