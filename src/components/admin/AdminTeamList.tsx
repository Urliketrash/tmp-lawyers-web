"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "./ConfirmDialog";
import ActionLoader from "./ActionLoader";

// Fallback static data
import { lawyersData, type Lawyer } from "@/data/lawyersData";

export default function AdminTeamList() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionLoader, setActionLoader] = useState({
    isLoading: false,
    status: 'loading' as 'loading' | 'success' | 'error',
    message: ''
  });

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("lawyers")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const mappedLawyers: Lawyer[] = data.map((item) => ({
          id: item.id,
          name: item.name,
          role: item.role,
          image: item.image || "",
          shortDesc: item.short_desc || "",
          italicDesc: item.italic_desc || "",
          biography: item.biography || undefined,
          email: item.email || undefined,
          instagram: item.instagram || undefined,
          education: item.education || undefined,
          experience: item.experience || undefined,
          skills: item.skills || undefined,
        }));
        setLawyers(mappedLawyers);
      } else {
        console.log("No lawyers in database, showing static data");
        setLawyers(lawyersData);
      }
    } catch (error) {
      console.error("Error fetching lawyers:", error);
      setLawyers(lawyersData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    setIsConfirmOpen(false);
    setActionLoader({ isLoading: true, status: 'loading', message: 'Deleting Profile...' });

    try {
      const { error } = await supabase
        .from("lawyers")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      setLawyers(lawyers.filter(item => item.id !== deleteId));
      setActionLoader({ isLoading: true, status: 'success', message: 'Profile Deleted Successfully!' });
      setTimeout(() => setActionLoader(prev => ({ ...prev, isLoading: false })), 1500);
    } catch (error) {
      console.error("Error deleting document: ", error);
      setActionLoader({ isLoading: true, status: 'error', message: 'Failed to delete profile.' });
      setTimeout(() => setActionLoader(prev => ({ ...prev, isLoading: false })), 3000);
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading team...</div>;

  return (
    <div className="bg-tmp-black border border-white/10 rounded-lg overflow-hidden">
        <ActionLoader 
            isLoading={actionLoader.isLoading} 
            status={actionLoader.status} 
            message={actionLoader.message} 
        />
        
        <ConfirmDialog
            isOpen={isConfirmOpen}
            title="Delete Profile?"
            message="Are you sure you want to delete this team member? This action cannot be undone."
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsConfirmOpen(false)}
            confirmLabel="Delete"
            isDestructive={true}
        />

        <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-white font-bold text-sm">Team Members</h3>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Profile</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {lawyers.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                <Image src={item.image || "/assets/logo.png"} alt={item.name} fill className="object-cover" />
                            </div>
                        </TableCell>
                        <TableCell className="text-white font-medium">{item.name}</TableCell>
                        <TableCell>
                            <span className="bg-white/10 text-white px-2 py-1 rounded text-[10px] uppercase font-bold">
                                {item.role}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">
                            <Link href={`/admin/team/edit/${item.id}`} className="text-tmp-gold hover:text-white mr-4 transition-colors font-bold text-xs uppercase tracking-widest">
                                Edit
                            </Link>
                            <Button 
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteClick(item.id)}
                                className="text-red-500 hover:text-red-400 hover:bg-red-500/10 font-bold"
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                {lawyers.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500 py-8">No team members found.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
  );
}
