import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, vi, beforeEach } from "vitest";
import Contact from "@/components/sections/Contact";

// Mock ScrollReveal because Framer Motion animations require environment support
vi.mock("@/components/ScrollReveal", () => ({
  default: ({ children, className }: any) => <div className={className}>{children}</div>,
}));

global.fetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

test("renders contact form and handles successful submission", async () => {
  const mockResponse = {
    ok: true,
    json: async () => ({ success: true }),
  };
  (global.fetch as any).mockResolvedValue(mockResponse);

  render(<Contact />);

  // Verify elements are present
  expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/how can we help/i)).toBeInTheDocument();

  // Fill in form inputs
  fireEvent.change(screen.getByPlaceholderText(/full name/i), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText(/email address/i), {
    target: { value: "john@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/how can we help/i), {
    target: { value: "Hello, I need corporate law assistance." },
  });

  // Submit the form
  const submitButton = screen.getByRole("button", { name: /kirimkan/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          message: "Hello, I need corporate law assistance.",
        }),
      })
    );
  });
});
