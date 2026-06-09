import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, vi, beforeEach } from "vitest";
import AdminNewsList from "@/components/admin/AdminNewsList";
import { supabase } from "@/lib/supabase";

// Mock Supabase
vi.mock("@/lib/supabase", () => {
  const mockFrom = vi.fn();
  return {
    supabase: {
      from: mockFrom,
    },
  };
});

const mockNewsData = [
  {
    id: "news-1",
    title: "Test Article Title 1",
    category: "LITIGATION",
    date: "2026-06-01",
    summary: "Summary of test article 1",
    content: "<p>Content of test article 1</p>",
    image_url: "https://example.com/image1.jpg",
    author: "Author 1",
  },
  {
    id: "news-2",
    title: "Test Article Title 2",
    category: "CORPORATE",
    date: "2026-06-02",
    summary: "Summary of test article 2",
    content: "<p>Content of test article 2</p>",
    image_url: "",
    author: "Author 2",
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

test("renders news articles list and handles deletion flow", async () => {
  // Mock select chain
  const mockOrder = vi.fn().mockResolvedValue({ data: mockNewsData, error: null });
  const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
  const mockDelete = vi.fn().mockReturnThis();
  const mockEq = vi.fn().mockResolvedValue({ error: null });

  const mockFrom = vi.mocked(supabase.from);
  mockFrom.mockImplementation((table: string) => {
    if (table === "news") {
      return {
        select: mockSelect,
        delete: mockDelete,
        eq: mockEq,
      } as any;
    }
    return {} as any;
  });

  render(<AdminNewsList />);

  // Wait for articles to load
  await waitFor(() => {
    expect(screen.getByText("Test Article Title 1")).toBeInTheDocument();
    expect(screen.getByText("Test Article Title 2")).toBeInTheDocument();
  });

  // Click delete on the first article
  const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
  fireEvent.click(deleteButtons[0]);

  // Verify confirm dialog opens
  expect(screen.getByText(/Are you sure you want to delete this article\?/i)).toBeInTheDocument();

  // Click confirm delete in dialog
  const confirmButton = screen.getAllByRole("button", { name: "Delete" }).find(
    (btn) => btn.className.includes("bg-red-600")
  )!;
  fireEvent.click(confirmButton);

  await waitFor(() => {
    // Expect delete query to have run
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockEq).toHaveBeenCalledWith("id", "news-1");
    // Article should be removed from view
    expect(screen.queryByText("Test Article Title 1")).not.toBeInTheDocument();
  });
});
