import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
  timeout: 1000,
});

export const getCharacters = (page: number, name: string, status: string) =>
  instance.get(`character?page=${page}&name=${name}&status=${status}`);
