export const getStudyList = async ({ offset = 0, limit = 6 }) => {
  const response = await fetch(
    `http://localhost:3000/api/studies?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) throw new Error("스터디 목록 불러오기 실패");
  const data = await response.json();
  return data;
};

export const getStudyItem = async (studyId) => {
  const response = await fetch(
    `http://localhost:3000/api/studies/${studyId}?populateHabits=true`
  );
<<<<<<< HEAD
=======

>>>>>>> sg-fixed
  if (!response.ok) throw new Error("개별 스터디 상세보기 실패");
  const data = await response.json();
  return data;
};

export const checkStudyPassword = async (studyId, password) => {
  const res = await fetch(
    `http://localhost:3000/api/studies/${studyId}/check-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    }
  );

  if (!res.ok) {
    let message = "비밀번호 확인 실패";
    throw new Error(message);
  }

  return await res.json();
};

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> sg-fixed
export const getStudyHabits = async (studyId) => {
  const response = await fetch(
    `http://localhost:3000/api/studies/${studyId}?populateHabits=true`
  );
  if (!response.ok) throw new Error("스터디 습관 불러오기 실패");

  const data = await response.json();

  return data.habits.map((habit) => habit.title);
<<<<<<< HEAD
=======
=======
};

>>>>>>> sg-fixed
export const getRecentStudies = async (ids) => {
  const res = await fetch("http://localhost:3000/api/studies/recent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  return res.json();
>>>>>>> 7f00dffdfc71b4a005a89a4219e34c2bc4fe7b52
};
