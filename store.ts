
import { create } from 'zustand';
import { BusinessState, Language, MarkupTier, Expenses, Capacity, Service } from './types';

interface AppStore extends BusinessState {
  setLanguage: (lang: Language) => void;
  setStep: (step: number | ((prev: number) => number)) => void;
  setBusinessInfo: (name: string, niche: string) => void;
  setExpenses: (expenses: Expenses) => void;
  setCapacity: (capacity: Capacity) => void;
  setSelectedTier: (tier: MarkupTier) => void;
  addService: (service: Service) => void;
  removeService: (id: string) => void;
  togglePro: () => void;
  reset: () => void;
}

const initialExpenses: Expenses = {
  financial: { bank_fees: 0, card_processing: 0, merchant: 0, loans: 0 },
  admin: { rent: 0, utilities: 0, internet: 0, property_tax: 0, home_office: 0 },
  payroll: { self_employment_tax: 0, health_insurance: 0, workers_comp: 0, salary: 0 },
  services: { bookkeeping: 0, lawyer: 0, saas: 0 },
  marketing: { ads: 0, website: 0 },
  investments: { equipment: 0, training: 0 },
};

const initialCapacity: Capacity = {
  people: 0,
  daily_hours: 0,
  monthly_days: 0,
  productivity: 0,
};

export const useStore = create<AppStore>((set) => ({
  language: 'en',
  step: 0,
  isPro: false,
  businessName: '',
  niche: '',
  expenses: initialExpenses,
  capacity: initialCapacity,
  services: [],
  selectedTier: MarkupTier.BASIC,

  setLanguage: (language) => set({ language }),
  setStep: (step) => set((state) => ({ 
    step: typeof step === 'function' ? step(state.step) : step 
  })),
  setBusinessInfo: (businessName, niche) => set({ businessName, niche }),
  setExpenses: (expenses) => set({ expenses }),
  setCapacity: (capacity) => set({ capacity }),
  setSelectedTier: (selectedTier) => set({ selectedTier }),
  addService: (service) => set((state) => ({ services: [...state.services, service] })),
  removeService: (id) => set((state) => ({ services: state.services.filter(s => s.id !== id) })),
  togglePro: () => set((state) => ({ isPro: !state.isPro })),
  reset: () => set({
    step: 0,
    businessName: '',
    niche: '',
    expenses: initialExpenses,
    capacity: initialCapacity,
    services: [],
    selectedTier: MarkupTier.BASIC
  }),
}));
