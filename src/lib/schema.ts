import { Person, WebSite, WithContext } from 'schema-dts';

export function getPersonSchema(): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Enzo Sylvestrin',
    alternateName: 'Enzo Pavani Sylvestrin',
    jobTitle: 'Full Stack Software Engineer',
    description: 'Full-stack & Mobile Software Engineer specialized in TypeScript, React, and Nest.js. Passionate about building high-quality web applications.',
    url: 'https://enzopavani.dev',
    image: 'https://enzopavani.dev/opengraph-image.png',
    sameAs: [
      'https://github.com/EnzoSylvestrin',
      'https://www.linkedin.com/in/enzo-sylvestrin-336b71221/',
    ],
    knowsAbout: [
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'Nest.js',
      'Node.js',
      'Full Stack Development',
      'Web Development',
      'Mobile Development',
      'Software Engineering',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'FATEC Jundiaí',
    },
  };
}

export function getWebSiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Enzo Sylvestrin - Portfolio',
    description: 'Portfolio of Enzo Sylvestrin, Full Stack Software Engineer',
    url: 'https://enzopavani.dev',
    author: {
      '@type': 'Person',
      name: 'Enzo Sylvestrin',
    },
    inLanguage: ['pt-BR', 'en-US'],
  };
}
