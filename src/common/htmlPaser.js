import ReactHtmlParser from 'react-html-parser';

export default function HtmlPaser({html}) {

  const node = ReactHtmlParser(html);

   return <div>{node}</div>
} 