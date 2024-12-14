import axios from "axios";
import { toast } from "sonner";
import * as z from "zod";
import { ApiError } from "./api-error";

class HttpRequest {
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor(baseUrl: string, headers: Record<string, string> = {}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    async request<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        endpoint: string,
        data?: any,
        params?: Record<string, string | number>,
        responseSchema?: z.Schema<T>,
        requestSchema?: z.Schema<any>
    ): Promise<T | { error: any }> {
        try {

            if (requestSchema && data) {
                const parsedData = requestSchema.parse(data);
                data = parsedData;
            }

            const response = await axios.request({
                method,
                url: `${this.baseUrl}${endpoint}`,
                data,
                params,
                headers: this.headers,
            });

            if (response.status >= 400) {
                toast.error("Ошибка получения данных", response.data);
                return { error: response.data };
            }

            if (responseSchema) {
                try {
                  const parsedData = responseSchema.parse(response.data);
                  return parsedData;
                } catch (error: any) {
                    toast.error("Ошибка валидации ответа", error);
                    return { error };
                }
            }

            return response.data;
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

export const httpRequest = new HttpRequest("http://localhost:9091/api");
