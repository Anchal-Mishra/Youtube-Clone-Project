import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter } from "../redux/slices/searchSlice";

const CategoryFilter = () => {
  const dispatch = useDispatch(); // Dispatch action from Redux
  const { selectedCategory } = useSelector((state) => state.search); // Selecting state from Redux

  // Defined categories
  const categories = [
    "All",
    "Gaming",
    "Study",
    "Anime",
    "Funny",
    "Tech",
    "Sports",
    "Travel",
  ];

  const handleCategorySelect = (category) => {
    dispatch(setCategoryFilter(category)); // Dispatched action
  };

  return (
    <div className="px-4 hidden lg:flex">
      <div className="flex gap-4 overflow-x-auto px-4 py-2 whitespace-nowrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-6 py-1 rounded-lg ${
              selectedCategory === category
                ? "bg-zinc-900 text-white"
                : "bg-zinc-200 text-gray-700"
            } transition-all`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
