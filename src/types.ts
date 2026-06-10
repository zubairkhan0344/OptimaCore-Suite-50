export type UtilityCategory = 'finance' | 'compliance' | 'data' | 'privacy' | 'real_estate';

export interface InputParameter {
  name: string;
  label: string;
  type: 'number' | 'text' | 'boolean' | 'select';
  defaultValue: any;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string }[];
  description: string;
}

export interface AeoSpec {
  intentQueries: string[];
  optimizedPrompt: string;
  schemaMarkup: Record<string, any>;
}

export interface MicroUtility {
  id: number;
  name: string;
  category: UtilityCategory;
  purpose: string;
  context: string;
  formulaDescription: string;
  inputs: InputParameter[];
  aeo: AeoSpec;
}
