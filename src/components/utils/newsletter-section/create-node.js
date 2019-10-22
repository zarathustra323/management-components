export default (section, { withNewsletterName = true } = {}) => {
  if (!section) return null;
  const { newsletter } = section;
  const title = withNewsletterName ? `${newsletter.name}: ${section.name}` : section.name;
  return {
    id: section.id,
    label: section.name,
    title,
    model: section,
  };
};
