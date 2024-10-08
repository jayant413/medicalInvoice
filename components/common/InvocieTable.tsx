"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable } from "../invoiceDataTable/data-table";
import { invoiceColumns } from "../invoiceDataTable/columns";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/lib/server";
import DeleteDialog from "../dialogs/DeleteDialog";

const InvocieTable = () => {
  const { userId } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${api}/invoices?userId=${userId}`);
        setInvoices(response.data);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const formatDate = (isoString: any) => {
    const date = new Date(isoString);
    const options: any = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-IN", options);
  };
  return (
    <div className="xl:w-[80%] h-full w-[98%] justify-center flex flex-col">
      <DeleteDialog />
      <DataTable columns={invoiceColumns} data={invoices} />
    </div>
  );
};

export default InvocieTable;
