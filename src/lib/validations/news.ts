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
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
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
