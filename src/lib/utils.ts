import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  // Use pure clsx to avoid tailwind-merge vendor chunk issues in server runtime
  return clsx(inputs);
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatCurrency(amount: number | null | undefined) {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculateConversionRate(leads: number, applications: number) {
  if (leads === 0) return 0;
  return Math.round((applications / leads) * 100 * 10) / 10;
}

export function getUrlParam(param: string): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get(param);
}

export function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown';
  const userAgent = navigator.userAgent;
  if (/Android/i.test(userAgent)) return 'mobile';
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'mobile';
  if (/Windows/i.test(userAgent)) return 'desktop';
  if (/Mac/i.test(userAgent)) return 'desktop';
  if (/Linux/i.test(userAgent)) return 'desktop';
  return 'unknown';
}

export function getBrowser(): string {
  if (typeof window === 'undefined') return 'unknown';
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Other';
}

export async function getClientIP(): Promise<string | null> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return null;
  }
} 