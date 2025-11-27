interface AccordionProps {
  question: string;
  answer: string | React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-surface-muted bg-surface-card overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-start justify-between text-left hover:bg-surface-muted/30 transition-colors duration-200 gap-4"
      >
        <span className="text-text-primary font-medium">{question}</span>
        <span
          className={`text-neon-green text-xl flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 text-text-secondary">{answer}</div>
      </div>
    </div>
  );
};

