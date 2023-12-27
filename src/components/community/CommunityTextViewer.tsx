/* 'use client'; */

import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CommunityTextViewer = ({ data }: any) => {
  const content = data.description;

  return <div>{content && <Viewer initialValue={content} />}</div>;
};

export default CommunityTextViewer;
