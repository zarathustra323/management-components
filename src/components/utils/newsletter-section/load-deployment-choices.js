import query from '../../../graphql/common/queries/newsletter-section-choices';
import mapNodes from '../map-nodes';
import createNode from './create-node';

export default async (apollo, { selectedNewsletterId, withNewsletterName } = {}) => {
  const { data } = await apollo.query({ query });
  const newsletters = mapNodes(data.emailNewsletters);
  return newsletters.map((newsletter) => {
    const isActiveNewsletter = selectedNewsletterId === newsletter.id;
    const children = mapNodes(newsletter.sections)
      .map(section => createNode(section, { withNewsletterName }));
    return {
      id: newsletter.id,
      label: newsletter.name,
      model: newsletter,
      isDisabled: true,
      isNewsletter: true,
      ...(isActiveNewsletter && { isDefaultExpanded: true }),
      ...(children.length && { children }),
    };
  });
};
