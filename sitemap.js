import * as fs from 'fs';
import { create } from 'xmlbuilder2';
import moment from 'moment';

const pages = ['/', '/community'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addPath = (root, path, freq) => {
  root
    .ele('url')
    .ele('loc')
    .txt(path)
    .up()
    .ele('lastmod')
    .txt(moment().format('YYYY-MM-DD'))
    .up()
    .ele('changefreq')
    .txt(freq ? freq : 'yearly')
    .up()
    .up();
};

const generateSitemapXml = () => {
  const root = create({ version: '1.0', encoding: 'UTF-8' }).ele('urlset', {
    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
  });
  const BASE = 'https://my-poke-hub.vercel.app';

  addPath(root, BASE + pages[0], 'weekly');

  pages.slice(1).forEach((page) => {
    addPath(root, BASE + page);
  });

  return root.end({ prettyPrint: true });
};

const sitemapXml = generateSitemapXml();
const filename = './public/sitemap.xml';
fs.writeFileSync(filename, sitemapXml);

console.log('사이트맵 생성 완료');
