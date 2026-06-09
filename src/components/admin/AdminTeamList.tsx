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

// Define strict type based on recent analysis
export type Lawyer = {
  id: string;
  name: string;
  role: string;
  image: string;
  shortDesc: string;
  italicDesc: string;
  biography?: string;
  email?: string;
  instagram?: string;
  education?: string[];
  experience?: string[];
  skills?: string[];
};

export default function AdminTeamList() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("lawyers")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      if (data) {
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
      }
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;

    try {
      const { error } = await supabase
        .from("lawyers")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setLawyers(lawyers.filter(item => item.id !== id));
      alert("Profile deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Failed to delete.");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading team...</div>;

  return (
    <div className="bg-tmp-black border border-white/10 rounded-lg overflow-hidden">
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
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
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
                                onClick={() => handleDelete(item.id)}
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
