
import { EP_CUSTOMER_APPROVE_OFFERING_LOAN_LIMIT_LETTER, EP_CUSTOMER_REJECT_OFFERING_LOAN_LIMIT_LETTER, EP_CUSTOMER_SUBMIT_LOAN_LIMIT_REQ } from '../../../utility/Endpoints';
import { DataService } from '../config';

export class MyLoanServiceData {

	SubmitLoanLimitRequest(payload) {
		return DataService.post(EP_CUSTOMER_SUBMIT_LOAN_LIMIT_REQ, payload);
	}

	ApproveLoanLimitReqLetter(payload)
	{
		return DataService.post(EP_CUSTOMER_APPROVE_OFFERING_LOAN_LIMIT_LETTER, payload);
	}

	RejectLoanLimitReqLetter(payload)
	{
		return DataService.post(EP_CUSTOMER_REJECT_OFFERING_LOAN_LIMIT_LETTER, payload);
	}
}