import { HandleError } from "../../services/error/error";
import { UploadFileServiceData } from "../../services/upload/upload";

export class UploadService {
	constructor() {
		this._service = new UploadFileServiceData();
	}

	async PostUploadFIle(formData, handler) {
		try {
			const response = await this._service.PostUploadFIle(formData, handler);
			return await handler.Success?.(response?.data);
		}
		catch (e) {			
			return HandleError(e, handler);
		}
	}
}