import { personalInfo, siteMetadata } from '@/lib/constants';
import { skills, experience } from '@/lib/data';

// One @graph holds all site-level structured data. ProfilePage points at the Person
// by @id so the person is declared once. Only facts that are visible on the site appear here.
export default function JsonLd() {
  const allSkills = Object.values(skills).flat();
  const [city, country] = personalInfo.location.split(',').map((part) => part.trim());

  const personId = `${siteMetadata.url}/#person`;
  const websiteId = `${siteMetadata.url}/#website`;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: personalInfo.name,
        url: siteMetadata.url,
        image: `${siteMetadata.url}/images/profile.jpeg`,
        jobTitle: personalInfo.title,
        description: siteMetadata.description,
        email: personalInfo.email,
        sameAs: [personalInfo.linkedin, personalInfo.github],
        address: {
          '@type': 'PostalAddress',
          addressLocality: city,
          addressCountry: country,
        },
        knowsAbout: allSkills,
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Virtual University of Pakistan',
        },
        worksFor: {
          '@type': 'Organization',
          name: experience[0].company,
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: personalInfo.name,
        url: siteMetadata.url,
        description: siteMetadata.description,
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteMetadata.url}/#profile`,
        url: siteMetadata.url,
        name: siteMetadata.title,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
