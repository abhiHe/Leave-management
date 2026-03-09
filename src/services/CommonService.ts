import axios from "axios";
import { localUrl } from "./AppSettings";

const CommonService = {
  async postData(parameters: any, apiname: any) {
    try {
      const url = `${localUrl}/api/${apiname}`;

      const response = await axios.post(url, parameters);

      return response.data;
    } catch (error: any) {
      // ✅ Handle backend errors safely
      if (error.response) {
        // Server responded with status other than 2xx
        return error.response.data;
      } else {
        // Network error
        return {
          success: false,
          message: "Network error. Please try again.",
        };
      }
    }
  },
};

export default CommonService;