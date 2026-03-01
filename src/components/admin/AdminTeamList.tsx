"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

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
      const querySnapshot = await getDocs(collection(db, "lawyers"));
      const firebaseLawyers: Lawyer[] = [];
      querySnapshot.forEach((doc) => {
          firebaseLawyers.push({ id: doc.id, ...doc.data() } as Lawyer);
      });
      setLawyers(firebaseLawyers);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;

    try {
      await deleteDoc(doc(db, "lawyers", id));
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
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-black/50 text-tmp-gold text-[10px] uppercase tracking-widest font-bold">
                    <tr>
                        <th className="px-6 py-4">Profile</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {lawyers.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                            </td>
                            <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                            <td className="px-6 py-4">
                                <span className="bg-white/10 text-white px-2 py-1 rounded text-[10px] uppercase font-bold">
                                    {item.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link href={`/admin/team/edit/${item.id}`} className="text-tmp-gold hover:text-white mr-4 transition-colors">Edit</Link>
                                <button 
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-500 hover:text-red-400 transition-colors"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {lawyers.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No team members found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}
