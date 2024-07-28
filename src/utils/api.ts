const apiUrl = process.env.REACT_APP_API_URL;

const api = {
	people: {
		get: () => apiUrl + '/people',
		getByPage: (page: number) => apiUrl + '/people/?page=' + page,
		getById: (id: number) => apiUrl + '/people/' + id,
	},
	films: {
		getByCharacterId: (id: number) => apiUrl + '/films/?characters=' + id,
	},
	starships: {
		getByCharacterId: (id: number) => apiUrl + '/starships/?pilots=' + id,
	}
};

export default api;