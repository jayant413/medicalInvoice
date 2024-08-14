"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useInvoiceData, useModal } from "@/hooks/invoice";
import { Button } from "../ui/button";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { api } from "@/lib/server";

const DeleteDialog = () => {
  const { isOpen, setIsOpen }: any = useModal();
  const { invoiceData }: any = useInvoiceData();
  const router = useRouter();

  const handleDelete = () => {
    try {
      const response = axios.delete(`${api}/invoices/${invoiceData._id}`);
      toast.success("Invoice deleted successfully");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm to delete</DialogTitle>
            <DialogDescription className="flex flex-col text-black font-medium justify-start ">
              <span className="w-full flex justify-center 2xl:justify-start ">
                <span className="w-[40%] 2xl:w-[30%] text-start">
                  Invoice Id :
                </span>{" "}
                {invoiceData.invoice}
              </span>
              <span className="w-full flex justify-center 2xl:justify-start">
                <span className="w-[40%] 2xl:w-[30%] text-start">
                  Taxable Amount :
                </span>{" "}
                {invoiceData.taxable}
              </span>
              <span className="w-full flex justify-center 2xl:justify-start">
                <span className="w-[40%] 2xl:w-[30%] text-start">
                  Gross Total :
                </span>{" "}
                {invoiceData.gross}
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 flex-row justify-center">
            <Button
              variant="default"
              onClick={() => setIsOpen(false)}
              className="w-[8em] "
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="w-[8em] "
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
