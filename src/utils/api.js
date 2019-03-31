import axios from 'axios';
axios.defaults.baseURL = 'http://demo1124891.mockable.io';

export const client = axios;
export const endpoints = {
	accounts: '/accounts',
	categories: '/categories',
	transactions: '/transactions'
};