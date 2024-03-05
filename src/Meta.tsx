import { Helmet } from 'react-helmet-async';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  subject?: string;
  author?: string;
  copyright?: string;
  url?: string;
  image?: string;
}

const Meta = (props: MetaProps) => {
  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: props.url,
    headline: props.title,
    image: props.image,
    description: props.description,
    author: {
      '@type': 'Person',
      name: props.author,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.url,
    },
  };
  return (
    <Helmet>
      <title>{props.title}</title>

      <meta name="title" content={props.title} />
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
      <meta name="subject" content={props.subject} />
      <meta name="author" content={props.author} />
      <meta name="content-language" content="ko" />
      <meta name="copyright" content={props.copyright} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={props.url} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />

      <script type="application/ld+json">
        {JSON.stringify(schemaOrgWebPage)}
      </script>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'PokeHub :: 포켓몬과 사용자들을 연결합니다.',
  description:
    '포켓몬 도감, 토론, 커뮤니티, 카드제작 등 포케허브는 여러 컨텐츠를 이용하고 서로 공유할 수 있는 포켓몬 커뮤니티 사이트 입니다.',
  author: 'PokeHub_Team',
  subject: '포케허브: 포켓몬 커뮤니티, 도감, 카드제작 및 토론',
  copyright: 'PokeHub_Team',
  keywords:
    '포켓몬, 포켓몬 도감, 포켓몬 카드, 포켓몬 게임, 포켓몬 커뮤니티, 포켓몬 공략, 포켓몬 이벤트, 포켓몬 최신 뉴스, 포켓몬 교환, 포켓몬 카드 제작',
  url: window.location.href,
  image: 'https://ibb.co/VYgQdkw',
};

export default Meta;
