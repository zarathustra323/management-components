export default ({ site, section, withSiteName = true } = {}) => {
  if (!withSiteName || !site) return section.fullName;
  return `${site.shortName || site.name}: ${section.fullName}`;
};
