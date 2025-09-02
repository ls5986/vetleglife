'use client';

interface MilitaryStatusStepProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MilitaryStatusStep({ value, onChange }: MilitaryStatusStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Military Status</h2>
        <p className="text-gray-600">Tell us about your military service to unlock exclusive benefits.</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => onChange('Active Duty')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              value === 'Active Duty'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">Active Duty</div>
            <div className="text-sm opacity-75">Currently serving in the military</div>
          </button>
          <button
            onClick={() => onChange('Veteran')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              value === 'Veteran'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">Veteran</div>
            <div className="text-sm opacity-75">Honorably discharged from military service</div>
          </button>
          <button
            onClick={() => onChange('Reserve/Guard')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              value === 'Reserve/Guard'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">Reserve/National Guard</div>
            <div className="text-sm opacity-75">Currently serving in reserves or guard</div>
          </button>
          <button
            onClick={() => onChange('Spouse')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              value === 'Spouse'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">Military Spouse</div>
            <div className="text-sm opacity-75">Spouse of active duty or veteran</div>
          </button>
        </div>
      </div>
    </div>
  );
} 