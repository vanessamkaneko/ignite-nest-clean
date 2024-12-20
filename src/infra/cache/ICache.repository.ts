export abstract class ICacheRepository {
  abstract get(key: string): Promise<string | null>;
  abstract delete(key: string): Promise<void>;
  abstract set(key: string, value: string): Promise<void>;
}