// import { Category } from "@/payload-types";
// import { CategoryDropdown } from "./category-dropdown";

// interface Props {
//   data: any[];
// }

// export const Categories = ({ data }: Props) => {
//   const docs: Category[] = Array.isArray(data?.docs)
//     ? data.docs
//     : Array.isArray(data)
//       ? data
//       : [];

//   console.log({ data }, "test");
//   return (
//     <div>
//       {docs.map((category) => (
//         <div key={category.id}>
//           <CategoryDropdown
//             category={category}
//             isActive={false}
//             isNavigationHovered={false}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

import { Category } from "@/payload-types";
import { CategoryDropdown } from "./category-dropdown";

interface CategoriesResponse {
  docs: Category[];
}

interface Props {
  data: CategoriesResponse;
}

// interface Props {
//   data: any;
// }

export const Categories = ({ data }: Props) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {data.docs.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
