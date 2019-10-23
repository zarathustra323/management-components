export default ({ fullName } = {}) => {
  if (!fullName) return null;
  return fullName.replace(/^[a-z]+?:\s/i, '').replace(/\s\([0-9]+?\)$/i, '');
};
