const apiUrl = process.env.REACT_APP_API_URL;

const api = {
	people: {
		get: apiUrl + '/people',
	},
};

export default api;