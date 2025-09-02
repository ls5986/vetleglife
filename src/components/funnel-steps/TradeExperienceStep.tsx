'use client';

interface TradeExperienceStepProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TradeExperienceStep({ value, onChange }: TradeExperienceStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Years of Trade Experience</h2>
        <p className="text-gray-600">Your experience helps us find the best coverage for your trade.</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => onChange('0-2 years')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              value === '0-2 years'
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">0-2 years</div>
            <div className="text-sm opacity-75">Just starting in the trade</div>
          </button>
          <button
            onClick={() => onChange('3-5 years')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              value === '3-5 years'
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">3-5 years</div>
            <div className="text-sm opacity-75">Building skills and reputation</div>
          </button>
          <button
            onClick={() => onChange('6-10 years')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              value === '6-10 years'
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">6-10 years</div>
            <div className="text-sm opacity-75">Experienced professional</div>
          </button>
          <button
            onClick={() => onChange('10+ years')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              value === '10+ years'
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">10+ years</div>
            <div className="text-sm opacity-75">Master of your trade</div>
          </button>
        </div>
      </div>
    </div>
  );
} 