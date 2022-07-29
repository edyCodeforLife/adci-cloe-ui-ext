
import { EP_LOGIN_TOKEN } from '@utility/Endpoints';
import { EP_UPDATE_PASSWORD } from '../../../utility/Endpoints';
import { DataService } from '../config';

export class AuthServiceData {
	Login(req) {
		return DataService.post(EP_LOGIN_TOKEN, req);
	}

	UpdatePassword(req) {
		return DataService.post(EP_UPDATE_PASSWORD, req);
	}
}