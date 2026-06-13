import slugify from 'slugify';

export const generateSlug = (name: string) => {
  return slugify(name, {
    lower: true,
    strict: true, // strip special characters
    trim: true,
  });
};
