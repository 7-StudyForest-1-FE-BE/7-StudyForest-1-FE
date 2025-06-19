export const getStudyList = async ({ offset = 0, limit = 6 }) => {
  const response = await fetch(
    `http://localhost:3000/api/studies?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) throw new Error("스터디 목록 불러오기 실패");
  const data = await response.json();
  return data;
};
