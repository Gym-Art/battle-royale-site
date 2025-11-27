import { FAQCategory } from '@/data/faqData';
import { getColorClasses } from '@/utils/faq/getColorClasses';

interface FAQCategoryTabsProps {
  categories: FAQCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const FAQCategoryTabs: React.FC<FAQCategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-10 justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 border font-display text-sm tracking-wider transition-all duration-300 cursor-pointer ${getColorClasses(
            category.color,
            activeCategory === category.id
          )}`}
        >
          {category.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

