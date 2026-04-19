import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CabanaModal from "../components/CabanaModal/CabanaModal";
import * as api from "../api";

vi.mock("../api");

describe("CabanaModal", () => {
  const defaultProps = {
    id:        "5-3",
    isBooked:  false,
    onClose:   vi.fn(),
    onSuccess: vi.fn(),
  };

  beforeEach(() => vi.clearAllMocks());

  it("shows form for an available cabana", () => {
    render(<CabanaModal {...defaultProps} />);
    expect(screen.getByPlaceholderText("Room number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Guest name")).toBeInTheDocument();
  });

  it("shows message for a booked cabana", () => {
    render(<CabanaModal {...defaultProps} isBooked />);
    expect(screen.getByText("Not available")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Room number")).not.toBeInTheDocument();
  });

  it("shows error if fields are empty", async () => {
    render(<CabanaModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Reserve"));
    expect(await screen.findByText(/fill in both fields/i)).toBeInTheDocument();
  });

  it("shows API error for invalid data", async () => {
    vi.mocked(api.bookCabana).mockResolvedValue({ error: "Invalid room number or guest name" });

    render(<CabanaModal {...defaultProps} />);
    fireEvent.change(screen.getByPlaceholderText("Room number"), { target: { value: "999" } });
    fireEvent.change(screen.getByPlaceholderText("Guest name"),  { target: { value: "Nobody" } });
    fireEvent.click(screen.getByText("Reserve"));

    expect(await screen.findByText(/invalid room/i)).toBeInTheDocument();
  });

  it("shows success screen after booking", async () => {
    vi.mocked(api.bookCabana).mockResolvedValue({ success: true });

    render(<CabanaModal {...defaultProps} />);
    fireEvent.change(screen.getByPlaceholderText("Room number"), { target: { value: "101" } });
    fireEvent.change(screen.getByPlaceholderText("Guest name"),  { target: { value: "Alice Smith" } });
    fireEvent.click(screen.getByText("Reserve"));

    await waitFor(() => expect(screen.getByText("Enjoy your stay!")).toBeInTheDocument());
  });

  it("closes modal on overlay click", () => {
    render(<CabanaModal {...defaultProps} />);
    fireEvent.mouseDown(document.querySelector(".modal-overlay")!);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});