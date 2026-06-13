import { UTILITIES } from '../data';
import { generateSlug } from './slug';
import { MicroUtility } from '../types';

// Create a configuration object (dictionary) that maps semantic URL slugs to specific calculator logic/data
export const SLUG_DICTIONARY: Record<string, MicroUtility> = {};

UTILITIES.forEach(util => {
  const slug = generateSlug(util.name);
  SLUG_DICTIONARY[slug] = util;
});
