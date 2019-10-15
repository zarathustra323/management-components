export default (section) => {
  if (!section) return null;
  const { newsletter } = section;
  return {
    id: section.id,
    label: section.name,
    title: `${newsletter.name}: ${section.name}`,
    model: section,
  };
};
