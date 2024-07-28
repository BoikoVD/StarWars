const apiUrl = process.env.REACT_APP_API_URL;

export const api = {
	people: {
		get: apiUrl + '/people',
	},
};