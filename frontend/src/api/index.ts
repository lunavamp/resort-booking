export * from "./api";

const API = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

export const getMap = async () => {
  const res = await fetch(`${API}/map`);
  return res.json();
};

export const bookCabana = async (data: {
  roomNumber: string;
  guestName:  string;
  cabanaId:   string;
}) => {
  const res = await fetch(`${API}/book`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(data),
  });
  return res.json();
};