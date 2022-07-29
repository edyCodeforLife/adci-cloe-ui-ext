
import { HandleError } from '../../services/error/error';
import { LoanServiceData } from '../../services/loan/loan';

export class LoanService {
	constructor() {
		this._service = new LoanServiceData();
	}

	async SaveLoanLimit(req, handler, header) {
		try {
			const response = await this._service.SaveLoanLimit(req, header);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			// console.log("error " + JSON.stringify(e));
			return HandleError(e, handler);
		}
	}

	async SaveMerchantBackgroundFile(req, handler) {
		try {
			const response = await this._service.SaveMerchantBackgroundFile(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			// console.log("error " + JSON.stringify(e));
			return HandleError(e, handler);
		}
	}

	async getMerchantBackgroundFile(reqID, handler) {
		try {
			const response = await this._service.GetMerchantBackgroundFile(reqID);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			// console.log("error catch " + e);
			return HandleError(e, handler);
		}
	}

	async saveMerchantStructure(req, handler) {
		try {
			const response = await this._service.SaveMerchantStructure(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async getStructureByLoanLimitID(req, handler) {
		try {
			const response = await this._service.GetStructureByLoanLimitID(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}

	async getCompanyFixedInfo(handler) {
		try {
			const response = await this._service.GetCompanyFixedInfo();
			return await handler.Success?.(response?.data);
		}
		catch (e) {			
			return HandleError(e, handler);
		}
	}

	async saveMerchantInfo(req, handler) {
		try {
			const response = await this._service.SaveMerchantInfo(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {			
			return HandleError(e, handler);
		}
	}

	async getMerchantInfo(reqID, handler) {
		try {
			const response = await this._service.GetMerchantInfo(reqID);
			return await handler.Success?.(response?.data);
		}
		catch (e) {			
			return HandleError(e, handler);
		}
	}

	async getCompanyType(reqID, handler) {
		try {
			const response = await this._service.GetCompanyType(reqID);
			return await handler.Success?.(response?.data);
		}
		catch (e) {			
			return HandleError(e, handler);
		}
	}

	async saveMerchantDocument(req, handler) {
		try {
			const response = await this._service.SaveMerchantDocument(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {			
			return HandleError(e, handler);
		}
	}

	async getMerchantDocument(req, handler) {
		try {
			const response = await this._service.GetMerchantDocument(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {			
			return HandleError(e, handler);
		}
	}

	async getSubmittedLoanLimitReqByCustomerID(req, handler) {
		try {
			const response = await this._service.GetSubmittedLoanLimitReqByCustomerID(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {			
			return HandleError(e, handler);
		}
	}

	async getMerchantDataByLoanLimitRequest(req, handler) {
		try {
			const response = await this._service.GetMerchantDataByLoanLimitRequest(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {			
			return HandleError(e, handler);
		}
	}

	async getIncompleteLoanLimitRequestByCustomerID(req, handler) {
		try {
			const response = await this._service.GetIncompleteLoanLimitRequestByCustomerID(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {			
			return HandleError(e, handler);
		}
	}

	async saveUploadCreditSignAggrement(req, handler) {
		try {
			const response = await this._service.SaveUploadCreditSignAggrement(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {			
			return HandleError(e, handler);
		}
	}

}