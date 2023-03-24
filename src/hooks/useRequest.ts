import { config } from "../helpers/config";

interface RequestOptions {
  data?: object;
  auth?: boolean;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

interface BaseResponse<T = never> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, Array<string>>;
}

export default function useRequest(prefix: string, url = config.apiUrl) {
  async function request<T>(
    endpoint: string | number,
    options: RequestOptions = {}
  ): Promise<BaseResponse<T>> {
    try {
      const { data, auth = false, method = "GET" } = options;
      const isGet = method === "GET";

      const queryParams = "";
      const authHeader = auth ? "{falta o token}" : "";
      const body = !isGet && data ? JSON.stringify(data) : undefined;
      const sep = endpoint ? "/" : "";

      const resp = await fetch(`${url}${prefix}${sep}${endpoint}`, {
        body,
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      if (!resp.ok) console.log(resp);

      return await resp.json();
    } catch {
      return { success: false };
    }
  }

  function get<T>(endpoint: string | number, data?: object) {
    return request<T>(endpoint);
  }

  function post<T>(endpoint: string | number, data?: object) {
    return request<T>(endpoint, { data, method: "POST" });
  }

  function put<T>(endpoint: string | number, data?: object) {
    return request<T>(endpoint, { data, method: "PUT" });
  }

  function del<T>(endpoint: string | number, data?: object) {
    return request<T>(endpoint, { data, method: "DELETE" });
  }

  return { get, post, put, del };
}
