import { DataService } from './data/services/config';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

class AppSingletonClass {

	constructor() { }

	get isInitialize() {
		return this.appInitialize;
	}

	get isMasterDataInitialize() {
		return this.masterDataInitialize;
	}

	static getInstance() {
		if (!AppSingletonClass.instance) {
			AppSingletonClass.instance = new AppSingletonClass();
		}
		return AppSingletonClass.instance;
	}

	setInitialize() {
		this.appInitialize = true;
	}

	setMasterDataInitialize() {
		this.masterDataInitialize = true;
	}
}

const appSingletonInstance = AppSingletonClass.getInstance();

// axios interceptors
let quiting = false;
// console.log(quiting);

if (!appSingletonInstance.isInitialize) {

	DataService.interceptors.request.use(
		function (config) {
			const token = sessionStorage.getItem("access_token");

			// if (token) {
			// 	config.headers = { Authorization: `Bearer ${token}` }
			// }
			return config;
		},
		function (error) {
			console.log('interceptor error cuy');
			return Promise.reject(error);
		}
	);

	DataService.interceptors.response.use(
		function (response) {
			return response
		},
		error => {
			const refreshToken = localStorage.getItem("refresh_token");
			// Do something with response error
			if (error.response.status === 401) {
				// let errObj = JSON.parse(JSON.stringify(error));
				// if ((errObj as any).response.status === 401) {
				// handle this
				console.log('Quiting application as token is expired');

				sessionStorage.setItem("access_token", refreshToken);


				// if (!quiting) {
				// 	quiting = true;
				// 	// window.location.href = window.location.pathname;
				// 	if (history) {
				// 		//prevents browser from storing history with each change:
				// 		quiting = false;
				// 		if (window.location.pathname !== "/cloe/login") {
				// 			history.replace("/cloe/login");
				// 			window.location.reload();
				// 		}
				// 	}
				// }
			}
			return Promise.reject(error);
		}
	);
	appSingletonInstance.setInitialize();
}

