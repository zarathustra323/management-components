export default ({ site, section, useSiteInTitle = true } = {}) => {
  if (!useSiteInTitle) return section.fullName;
  return `${site.shortName || site.name}: ${section.fullName}`;
};
