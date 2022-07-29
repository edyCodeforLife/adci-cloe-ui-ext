
import { HandleError } from '../../services/error/error';
import { LookupServiceData } from '../../services/lookup/lookup';

export class LookupService {
	constructor() {
		this._service = new LookupServiceData();
	}

	async GetCustomerType(handler) {
		try {
			const response = await this._service.GetCustomerType();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async GetFinancingService(handler) {
		try {
			const response = await this._service.GetFinancingService();
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	// companyBackground
	async GetLookupType(name, handler){
		try {
			const response = await this._service.GetLookupType(name);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
	
}