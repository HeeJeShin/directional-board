// src/lib/utils.ts
export const toSearchParams = (obj: Record<string, unknown>): URLSearchParams => {
    const params = new URLSearchParams();
    Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            params.set(key, String(value));
        }
    });
    return params;
};