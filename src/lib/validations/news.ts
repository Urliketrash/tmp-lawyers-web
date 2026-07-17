import { z } from 'zod';

/**
 * Validation schema for the Admin Login form.
 */
export const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Validation schema for the Public Contact form.
 */
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Validation schema for the News Create/Edit forms.
 */
export const newsSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi').max(200, 'Judul maksimal 200 karakter'),
  category: z.enum(['LITIGATION', 'CORPORATE', 'EVENT', 'REGULATION']),
  date: z.string().min(1, 'Tanggal wajib diisi'),
  summary: z.string().min(1, 'Ringkasan wajib diisi').max(500, 'Ringkasan maksimal 500 karakter'),
  content: z.string().min(1, 'Konten wajib diisi'),
  author: z.string().default('Admin Team'),
});

export type NewsInput = z.infer<typeof newsSchema>;

/**
 * Validation schema for the Team Profile Create/Edit forms.
 */
export const lawyerSchema = z.object({
  id: z.string().min(1, 'ID wajib diisi').regex(/^[a-z0-9-]+$/, 'ID hanya boleh huruf kecil, angka, dan strip'),
  name: z.string().min(1, 'Nama wajib diisi').max(100, 'Nama maksimal 100 karakter'),
  role: z.enum(['FOUNDER', 'MANAGING PARTNER', 'PARTNER', 'SENIOR PARTNER', 'ASSOCIATE', 'JUNIOR ASSOCIATE', 'PARALEGAL', 'INTERNSHIP']),
  shortDesc: z.string().min(1, 'Deskripsi singkat wajib diisi').max(500, 'Deskripsi singkat maksimal 500 karakter'),
  italicDesc: z.string().min(1, 'Deskripsi italic wajib diisi').max(300, 'Deskripsi italic maksimal 300 karakter'),
  biography: z.string().optional(),
  email: z.string().email('Format email tidak valid').optional().or(z.literal('')),
  instagram: z.string().optional(),
  education: z.string().optional(),
  experience: z.string().optional(),
  skills: z.string().optional(),
});

export type LawyerInput = z.infer<typeof lawyerSchema>;
