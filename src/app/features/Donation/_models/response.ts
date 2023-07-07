export interface ApiResponse<T> {
    code: string | null;
    status: string | null;
    message: string | null;
    response: T | null;
}