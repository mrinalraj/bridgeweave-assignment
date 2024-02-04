export interface ResponseEntity<T> {
  data: T | null;
  error: string | null;
  message: string | null;
  statusCode: number;
  success: boolean;
}
