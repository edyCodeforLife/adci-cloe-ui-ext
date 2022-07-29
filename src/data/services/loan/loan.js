
import { EP_DATA_LOAN_LIMIT_REQ } from '@utility/Endpoints';
import { EP_CUSTOMER_UPLOAD_CREDIT_SIGN_AGGREMENT, EP_DATA_BG_FILE, EP_DATA_STRUCTURE, 
	EP_GET_BACKGROUND_FILE, EP_GET_COMPANY_FIXED_INFO, EP_GET_COMPANY_TYPE, EP_GET_INCOMPLETE_LLR_BY_CUSTOMER_ID, EP_GET_MERCHANT_DATA_BY_LLR_ID, EP_GET_MERCHANT_DOCUMENT, EP_GET_MERCHANT_INFO,
	 EP_GET_STRUCTURE,
	 EP_GET_SUBMITTED_LOAN_LIMIT_REQ_BY_CUSTOMER_ID,
	 EP_SAVE_MERCHANT_DOCUMENT, EP_SAVE_MERCHANT_INFO, EP_UPLOAD_FILE } from '../../../utility/Endpoints';
import { DataService } from '../config';

export class LoanServiceData {

	SaveLoanLimit(payload, config) {
		return DataService.post(EP_DATA_LOAN_LIMIT_REQ, payload, config);
	}

	SaveMerchantBackgroundFile(payload){
		return DataService.post(EP_DATA_BG_FILE, payload);
	}

	GetMerchantBackgroundFile(params){
		return DataService.get(EP_GET_BACKGROUND_FILE, {params});
	}

	SaveMerchantStructure(payload){
		return DataService.post(EP_DATA_STRUCTURE, payload);
	}

	GetStructureByLoanLimitID(params){
		return DataService.get(EP_GET_STRUCTURE, {params});
	}

	GetCompanyFixedInfo(){
		return DataService.get(EP_GET_COMPANY_FIXED_INFO);
	}

	SaveMerchantInfo(payload){
		return DataService.post(EP_SAVE_MERCHANT_INFO, payload);
	}

	GetCompanyType(params){
		return DataService.get(EP_GET_COMPANY_TYPE, {params});
	}

	GetMerchantInfo(params){
		return DataService.get(EP_GET_MERCHANT_INFO, {params});
	}

	SaveMerchantDocument(payload){
		return DataService.post(EP_SAVE_MERCHANT_DOCUMENT, payload);
	}

	GetMerchantDocument(params){
		return DataService.get(EP_GET_MERCHANT_DOCUMENT, {params});
	}

	GetSubmittedLoanLimitReqByCustomerID(params)
	{
		return DataService.get(EP_GET_SUBMITTED_LOAN_LIMIT_REQ_BY_CUSTOMER_ID, {params})
	}

	GetMerchantDataByLoanLimitRequest(params)
	{
		return DataService.get(EP_GET_MERCHANT_DATA_BY_LLR_ID, {params})
	}

	GetIncompleteLoanLimitRequestByCustomerID(params)
	{
		return DataService.get(EP_GET_INCOMPLETE_LLR_BY_CUSTOMER_ID, {params})
	}

	SaveUploadCreditSignAggrement(params)
	{
		return DataService.post(EP_CUSTOMER_UPLOAD_CREDIT_SIGN_AGGREMENT, params)
	}
}