import {
    EP_CUSTOMER_REPORT_GET_DASHBOARD
} from '@utility/Endpoints';
import { DataService } from '../../services/config';

export class MerchantDashboardData {
    GetCustomerDashboardData(userId) {
        return DataService.get(`${EP_CUSTOMER_REPORT_GET_DASHBOARD}?userLogin=${userId}`)
    }
}