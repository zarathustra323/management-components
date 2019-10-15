import query from '../../../../graphql/scheduling/queries/load-email-newsletter-sections';
import mapNodes from '../../../../utils/map-nodes';
import mapSections from './map-sections';

export default async (apollo) => {
  const { data } = await apollo.query({ query });
  const newsletters = mapNodes(data.emailNewsletters);
  return newsletters.map((newsletter) => {
    const children = mapSections({ sections: newsletter.sections });
    return {
      id: newsletter.id,
      label: newsletter.name,
      model: newsletter,
      isDisabled: true,
      isNewsletter: true,
      ...(children.length && { children }),
    };
  });
};
