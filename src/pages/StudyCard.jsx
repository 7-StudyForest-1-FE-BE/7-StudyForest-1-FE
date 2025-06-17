function StudyCard({ study, onDelete, onUpdate }) {
  return (
    <div
      style={{
        background: study.theme ? (study.theme.type === 'color' ? study.theme.value : `url(${study.theme.value})`) : '#fff',
        padding: 12,
        margin: 6,
        color: study.theme ? study.theme.textColor : '#222',
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.5 }}>ID: {study.id}</div>
      <h3>{study.title}</h3>
      <div>{study.description}</div>
      <button onClick={() => onDelete(study.id)}>삭제</button>
      <button onClick={() => onUpdate({ ...study, title: '수정됨' })}>수정</button>
    </div>
  );
}
export default StudyCard;
