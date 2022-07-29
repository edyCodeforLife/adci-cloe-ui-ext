
import { HandleError } from '../../services/error/error';
import { MyLoanServiceData } from '../../services/loan/myLoan';

export class MyLoanService {
	constructor() {
		this._service = new MyLoanServiceData();
	}

	async SubmitLoanLimitRequest(req, handler) {
		try {
			const response = await this._service.SubmitLoanLimitRequest(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async approveLoanLimitReqLetter(req, handler) {
		try {
			const response = await this._service.ApproveLoanLimitReqLetter(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
	
	async rejectLoanLimitReqLetter(req, handler) {
		try {
			const response = await this._service.RejectLoanLimitReqLetter(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
}