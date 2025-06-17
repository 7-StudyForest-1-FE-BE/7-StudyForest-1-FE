import { useState } from 'react';
import mock from '../mock.json';
import StudyRegistrationPage from './StudyRegistrationPage';
import StudyCard from './StudyCard';

function StudyListPage() {
  const [studies, setStudies] = useState(mock);

  // Create (스터디 추가)
  const handleCreate = (newStudy) => setStudies([...studies, newStudy]);

  // Delete (스터디 삭제)
  const handleDelete = (studyId) => setStudies(studies.filter((s) => s.id !== studyId));

  // Update (스터디 수정)
  const handleUpdate = (updatedStudy) => setStudies(studies.map((s) => (s.id === updatedStudy.id ? updatedStudy : s)));

  return (
    <div>
      <StudyRegistrationPage onCreate={handleCreate} />
      <div>
        {studies.map((study) => (
          <StudyCard key={study.id} study={study} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  );
}
export default StudyListPage;
