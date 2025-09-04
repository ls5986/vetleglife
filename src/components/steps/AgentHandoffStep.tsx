"use client";
import React from 'react';
import { Button } from '../shared/Button';

export default function AgentHandoffStep({ onContinue, supportPhone }: { onContinue: () => void; supportPhone: string; }) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Congratulations!</h2>
      <p className="text-gray-700 max-w-md mb-4">
        We received your info. We can have a licensed agent call you shortly, or you can continue with the secure online application now.
      </p>
      <div className="space-y-2 w-full max-w-sm">
        <Button onClick={onContinue} className="w-full">Continue with Secure Online Application</Button>
        <a href={`tel:${supportPhone}`} className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-md py-2">Call a Licensed Agent Now</a>
      </div>
    </div>
  );
}


