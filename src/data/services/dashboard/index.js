import { MerchantDashboardData } from "../../business/dashboard";
import { HandleError } from "../error/error";

export class MerchantDashboardService {
	constructor() {
		this._service = new MerchantDashboardData();
	}

	async getCustomerDashboardData(userId, handler) {
		try {
			const response = await this._service.GetCustomerDashboardData(userId);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
}