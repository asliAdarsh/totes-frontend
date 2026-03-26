import axios from 'axios';

// Vite looks for variables starting with VITE_
// In Azure App Service (Frontend), add VITE_API_URL in Environment Variables
const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_URL,
});

// Helper for cleaning responses
const responseBody = (res) => res.data;

export const getTodos = () => api.get('/todos').then(responseBody);
export const createTodo = (todo) => api.post('/todos', todo).then(responseBody);
export const updateTodo = (id, todo) => api.put(`/todos/${id}`, todo).then(responseBody);
export const deleteTodo = (id) => api.delete(`/todos/${id}`).then(responseBody);

export const getNotes = () => api.get('/notes').then(responseBody);
export const createNote = (note) => api.post('/notes', note).then(responseBody);
export const updateNote = (id, note) => api.put(`/notes/${id}`, note).then(responseBody);
export const deleteNote = (id) => api.delete(`/notes/${id}`).then(responseBody);