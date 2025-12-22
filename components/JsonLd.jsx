import { personalInfo, siteMetadata } from '@/lib/constants';
import { skills, experience } from '@/lib/data';

export default function JsonLd() {
  const allSkills = Object.values(skills).flat();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    url: siteMetadata.url,
    image: `${siteMetadata.url}${siteMetadata.image}`,
    jobTitle: personalInfo.title,
    description: siteMetadata.description,
    email: personalInfo.email,
    sameAs: [
      personalInfo.linkedin,
      personalInfo.github,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: personalInfo.location.split(',')[0].trim(),
      addressCountry: personalInfo.location.split(',')[1]?.trim() || 'Pakistan',
    },
    knowsAbout: allSkills,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Virtual University of Pakistan',
    },
    worksFor: {
      '@type': 'Organization',
      name: experience[0]?.company || 'Sixlogics',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: personalInfo.name,
    url: siteMetadata.url,
    description: siteMetadata.description,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
