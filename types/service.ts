export interface ServiceData {
  id: string;
  name: string;
  parentId?: string | null;
  setupFee: number;
  monthlyFee: number;
  description: string;
}
