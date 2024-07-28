const apiUrl = process.env.REACT_APP_API_URL;

const api = {
	people: {
		get: () => apiUrl + '/people',
		getByPage: (page: number) => apiUrl + '/people/?page=' + page,
	},
};

export default api;