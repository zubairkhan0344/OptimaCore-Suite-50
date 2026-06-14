import { UTILITIES } from '../data';
import { generateSlug } from './slug';
import { MicroUtility } from '../types';

export interface RouteMetadata {
  title: string;
  description: string;
  ogTitle: string;
}

export interface DictionaryEntry {
  utility: MicroUtility;
  meta: RouteMetadata;
}

// Create a configuration object (dictionary) that maps semantic URL slugs to specific calculator logic/data
export const SLUG_DICTIONARY: Record<string, DictionaryEntry> = {};

UTILITIES.forEach(util => {
  const slug = generateSlug(util.name);
  
  let title = `${util.name} | OptimaCore`;
  let ogTitle = util.name;
  let description = util.aeo.schemaMarkup?.description || util.purpose || util.context;

  if (slug === 'fractional-executive-cost-modeler') {
    title = "Fractional Executive Cost Modeler & ROI Calculator | OptimaCore";
    ogTitle = "Fractional Executive Cost Modeler & ROI Calculator";
    description = "Evaluate the cost ROI of fractional leadership versus full-time executive hiring. Use interactive parameters to simulate base salary, benefits, and tax burdens.";
  }

  SLUG_DICTIONARY[slug] = {
    utility: util,
    meta: {
      title,
      description,
      ogTitle
    }
  };
});
