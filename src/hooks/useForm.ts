import { useState,ChangeEvent } from "react";

export const useForm = <T extends object>(initialValue: T) => {

  const [form, setForm] = useState<T>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

//   const handleFilter = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       filters: {
//         ...form.filters,
//         [name]: [value]
//       }
//     });
//   };

//   const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value, checked } = e.target;
//     const currentFilters: string[] = form.filters[name] || [];
//     const updatedFilters = checked ? [...currentFilters, value] : currentFilters.filter(item => item !== value);
//     setForm({
//       ...form,
//       filters: {
//         ...form.filters,
//         [name]: updatedFilters
//       }
//     });
//   };

  const handlePagination = (pageNumber: number) => {
    setForm({
      ...form,
      currentPage: pageNumber
    });
  };

  return {
    form,
    setForm,
    handleChange,
    handlePagination,
    // handleFilter,
    // handleCheckbox
  };
};