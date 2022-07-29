
import { EP_LOOKUP_CUSTOMER_TYPE, EP_LOOKUP_FINANCING_SERVICE, EP_LOOKUP_ } from '@utility/Endpoints';
import { DataService } from '../config';

export class LookupServiceData {
	GetCustomerType() {
		return DataService.get(EP_LOOKUP_CUSTOMER_TYPE);
	}

	GetFinancingService() {
		return DataService.get(EP_LOOKUP_FINANCING_SERVICE);
	}

	//--------companyBackground
	GetLookupType(name)
	{
		return DataService.get(EP_LOOKUP_+name);
	}

}	