export default function TokenChart() {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden">
      <iframe 
        src="https://www.birdeye.so/widget/chart?chain=solana&address=9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump&theme=dark&chartType=2"
        className="w-full h-full border-0"
        title="Token Price Chart"
      />
    </div>
  );
}
