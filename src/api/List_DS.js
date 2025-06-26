const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const getStudyList = async ({
  offset = 0,
  limit = 6,
  keyword = "",
  sortKey = "latest",
}) => {
  try {
    const params = new URLSearchParams({
      offset,
      limit,
      keyword,
      sortKey,
    });

    const response = await fetch(`${API_URL}/api/studies?${params}`);

    if (!response.ok) {
      throw new Error(`스터디 목록 불러오기 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("🔥 getStudyList 에러:", error);
    return [];
  }
};

export const getStudyItem = async (studyId) => {
  const response = await fetch(
    `${API_URL}/api/studies/${studyId}?populateHabits=true`
  );
  if (!response.ok) throw new Error("개별 스터디 상세보기 실패");
  const data = await response.json();
  return data;
};

export const checkStudyPassword = async (studyId, password) => {
  const res = await fetch(`${API_URL}/api/studies/${studyId}/check-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    let message = "비밀번호 확인 실패";
    throw new Error(message);
  }

  return await res.json();
};

export const getRecentStudies = async (ids) => {
  const res = await fetch(`${API_URL}/api/studies/recent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  return res.json();
};

export const getStudyHabits = async (studyId) => {
  const response = await fetch(
    `${API_URL}/api/studies/${studyId}?populateHabits=true`
  );
  if (!response.ok) throw new Error("스터디 습관 불러오기 실패");

  const data = await response.json();

  return data.habits;
};

export const addEmojiReaction = async ({ studyId, emoji }) => {
  try {
    const res = await fetch(`${API_URL}/api/emojis/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studyId,
        emoji,
        action: "increase",
      }),
    });

    if (!res.ok) {
      throw new Error("이모지 추가 실패");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("addEmojiReaction 에러:", error);
    throw error;
  }
};

export const toggleEmojiReaction = async ({ studyId, emoji, action }) => {
  try {
    const res = await fetch(`${API_URL}/api/emojis/react`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studyId,
        emoji,
        action, // "increase" 또는 "decrease"
      }),
    });

    if (!res.ok) {
      throw new Error("이모지 반응 처리 실패");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("toggleEmojiReaction 에러:", error);
    throw error;
  }
};
