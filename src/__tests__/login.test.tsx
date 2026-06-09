import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, vi, beforeEach } from "vitest";
import LoginPage from "@/app/admin/login/page";
import { supabase } from "@/lib/supabase";

// Mock router
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock Supabase
vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

// Mock ScrollReveal
vi.mock("@/components/ScrollReveal", () => ({
  default: ({ children, className }: any) => <div className={className}>{children}</div>,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test("renders login form and handles successful admin log-in", async () => {
  const mockSignIn = vi.mocked(supabase.auth.signInWithPassword);
  mockSignIn.mockResolvedValue({
    data: { user: { id: "123" } } as any,
    error: null,
  });

  render(<LoginPage />);

  // Verify form renders
  expect(screen.getByPlaceholderText(/your email address/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/your password/i)).toBeInTheDocument();

  // Enter credentials
  fireEvent.change(screen.getByPlaceholderText(/your email address/i), {
    target: { value: "admin@tmplawyers.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/your password/i), {
    target: { value: "securepassword" },
  });

  // Submit form
  const submitButton = screen.getByRole("button", { name: /enter dashboard/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith({
      email: "admin@tmplawyers.com",
      password: "securepassword",
    });
    expect(mockPush).toHaveBeenCalledWith("/admin/dashboard");
  });
});
