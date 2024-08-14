import { create } from "zustand";

const useModal = create((set) => ({
  isOpen: false,
  setIsOpen: (arg: boolean) => set(() => ({ isOpen: arg })),
}));

// to update or delete
const useInvoiceData = create((set) => ({
  invoiceData: [],
  setInvoiceData: (data: any) => set(() => ({ invoiceData: data })),
}));

export { useInvoiceData, useModal };
