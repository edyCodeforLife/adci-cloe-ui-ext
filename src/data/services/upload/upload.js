import {
    EP_UPLOAD_FILE
} from '@utility/Endpoints';
import { DataService } from '../config';

export class UploadFileServiceData {

    PostUploadFIle(formData, handler) {
        const config = {
			onUploadProgress: function (progressEvent) {
				let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				if (handler && handler.PercentageTracker)
					handler.PercentageTracker(percentCompleted);
			}
		};
        return DataService.post(EP_UPLOAD_FILE, formData, config);
    }

}