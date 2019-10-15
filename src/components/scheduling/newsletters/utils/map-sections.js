import mapNodes from '../../../../utils/map-nodes';
import createSectionNode from './create-section-node';

export default ({ sections, withNewsletterName = true } = {}) => mapNodes(sections)
  .map(section => createSectionNode(section, { withNewsletterName }));
