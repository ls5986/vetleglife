'use client';

interface CompanyStageStepProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CompanyStageStep({ value, onChange }: CompanyStageStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Stage</h2>
        <p className="text-gray-600">Help us understand your startup's current phase.</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => onChange('Idea Stage')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              value === 'Idea Stage'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">Idea Stage</div>
            <div className="text-sm opacity-75">Conceptualizing and planning</div>
          </button>
          <button
            onClick={() => onChange('Seed Stage')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              value === 'Seed Stage'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">Seed Stage</div>
            <div className="text-sm opacity-75">Initial funding and development</div>
          </button>
          <button
            onClick={() => onChange('Series A')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              value === 'Series A'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">Series A</div>
            <div className="text-sm opacity-75">Product-market fit and growth</div>
          </button>
          <button
            onClick={() => onChange('Series B+')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              value === 'Series B+'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">Series B+</div>
            <div className="text-sm opacity-75">Scaling and expansion</div>
          </button>
        </div>
      </div>
    </div>
  );
} 