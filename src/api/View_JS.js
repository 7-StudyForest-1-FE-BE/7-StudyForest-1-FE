const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const deleteStudy = async (studyId) => {
  const res = await fetch(`${API_URL}/api/studies/${studyId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
      throw new Error(errorData.message || "삭제 실패");
    } catch (e) {
      throw new Error("삭제 실패");
    }
  }
  return res.json();
};
