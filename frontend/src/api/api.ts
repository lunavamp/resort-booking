const API = "/api";

export const getMap = async () => {
  const res = await fetch(`${API}/map`);
  return res.json();
};


export const bookCabana = async (data: any) => {
  const res = await fetch(`${API}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};