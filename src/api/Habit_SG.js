const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// 습관 조회
export async function getTodayHabits(studyId, password) {
  try {
    const response = await fetch(`${API_URL}/api/habits/today`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studyId, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "습관 조회 실패");
    }

    const data = await response.json();
    return data.habits;
  } catch (error) {
    throw error;
  }
}

// 습관 저장
export async function saveTodayHabits(studyId, newTitles) {
  try {
    const response = await fetch(
      `${API_URL}/api/habits/study/${studyId}/habits`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habits: newTitles }),
      }
    );

    if (!response.ok) {
      throw new Error("습관 저장 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 습관 목록 불러오기
export async function getStudyHabits(studyId) {
  try {
    const response = await fetch(`${API_URL}/api/habits/study/${studyId}`);
    if (!response.ok) {
      throw new Error("습관 정보를 가져오는 데 실패했습니다.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
