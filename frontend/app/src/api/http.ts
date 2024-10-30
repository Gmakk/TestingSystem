import axios from 'axios';
import { toast, Toaster } from 'sonner';

class HttpRequest {
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor(baseUrl: string, headers: Record<string, string> = {}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    async request<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        endpoint: string,
        data?: any,
        params?: Record<string, string | number>,
        dtoClass?: new (...args: any[]) => T
    ): Promise<T | { error: any }> {
        try {
            const response = await axios.request({
                method,
                url: `${this.baseUrl}${endpoint}`,
                data,
                params,
                headers: this.headers,
            });

            if (response.status >= 400) {
                toast.error("Ошибка получения данных", response.data)
                return { error: response.data };
            }

            if (dtoClass) {
                return new dtoClass(response.data);
            }

            return response.data;
        } catch (error: any) {
            return { error };
        }
    }
}
