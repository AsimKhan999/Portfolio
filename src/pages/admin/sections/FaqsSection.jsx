import CrudManager from '../components/CrudManager';

const fields = [
  { name: 'question', label: 'Question', type: 'text' },
  { name: 'answer', label: 'Answer', type: 'textarea', rows: 4 },
];

function FaqsSection() {
  return (
    <CrudManager
      table="faqs"
      title="FAQs"
      icon="fas fa-question-circle"
      fields={fields}
      renderSummary={(item) => (
        <div>
          <div className="admin-row-title">{item.question}</div>
          <div className="admin-row-meta">{item.answer.slice(0, 90)}...</div>
        </div>
      )}
    />
  );
}

export default FaqsSection;
