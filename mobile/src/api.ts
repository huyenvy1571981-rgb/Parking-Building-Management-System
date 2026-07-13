import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:8000";

export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(data.detail || "Không thể kết nối máy chủ", response.status);
  return data as T;
}

export const storeToken = (token: string) => AsyncStorage.setItem("token", token);
export const clearToken = () => AsyncStorage.removeItem("token");
export const hasToken = async () => Boolean(await AsyncStorage.getItem("token"));
