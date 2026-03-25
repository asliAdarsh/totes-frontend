import axios from 'axios';

const API_URL = "https://totes-backend-app-service-epddbyg7hmagfvc4.centralindia-01.azurewebsites.net";


export const api = axios.create({
    baseURL: API_URL,
});

export const getTodos = () => api.get('/todos').then(res => res.data);
export const createTodo = (todo) => api.post('/todos', todo).then(res => res.data);
export const updateTodo = (id, todo) => api.put(`/todos/${id}`, todo).then(res => res.data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`).then(res => res.data);

// Notes API
export const getNotes = () => api.get('/notes').then(res => res.data);
export const createNote = (note) => api.post('/notes', note).then(res => res.data);
export const updateNote = (id, note) => api.put(`/notes/${id}`, note).then(res => res.data);
export const deleteNote = (id) => api.delete(`/notes/${id}`).then(res => res.data);
