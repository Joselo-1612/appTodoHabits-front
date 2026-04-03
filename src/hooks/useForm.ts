import { useState,ChangeEvent } from "react";
import { getDayDate, getFormatDateTime } from "../utils/date";

export const useForm = <T extends object>(initialValue: T) => {

  const [form, setForm] = useState<T>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleAddMultiCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const currentFilters: string[] = form[name as keyof typeof form] as string[];
    const updatedFilters = checked ? [...currentFilters, value] : currentFilters.filter(item => item !== value);
    setForm({
      ...form,
      [name]: updatedFilters
    });
  };

  const handleAddOnlyCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const currentFilters: string[] = form[name as keyof typeof form] as string[];
    const updatedFilters = checked ? [value] : currentFilters.filter(item => item !== value);
    setForm({
      ...form,
      [name]: updatedFilters
    });
  };

  const handleAddSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm({
      ...form,
      [name]: checked ? 1 : 0
    });
  };

  const handleAddDate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    let dateFinal;

    if (type === "date") {
      dateFinal = [getDayDate(value)];
    }

    if (type === "time") {
      dateFinal = getFormatDateTime(value);
    }

    setForm({
      ...form,
      [name]: dateFinal
    });
  };

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
    handleAddOnlyCheckbox,
    handleAddMultiCheckbox,
    handleAddSwitch,
    handleAddDate
  };
};