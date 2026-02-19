//export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const BASE_URL = "http://localhost:8080/api/v1.0";

export const API_ENDPOINTS = {
    LOGIN : "/login",
    REGISTER : "/register",
    GET_ALL_CATEGORIES : "/categories",
    ADD_CATEGORY: "/categories",
    EDIT_CATEGORY: (categoryId)=> `/categories/${categoryId}`,
    CATEGORY_BY_TYPE: (type)=>`/categories/${type}`,
    GET_INCOMES: "/incomes",
    ADD_INCOME:"/incomes",
    GET_USER_INFO : "/profile",
};