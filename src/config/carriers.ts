export type Carrier = {
  id: string;
  name: string;
  productType: 'IUL' | 'Term' | 'Whole' | 'Final Expense';
  productId?: number; // for APIs that require productId (e.g. Americo IUL)
  notes?: string;
};

export const CARRIERS: Carrier[] = [
  {
    id: 'americo',
    name: 'Americo',
    productType: 'IUL',
    productId: 437,
    notes: 'Americo IUL illustration API integration via /api/admin/iul-quote'
  },
];


