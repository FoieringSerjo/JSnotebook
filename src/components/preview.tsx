import './preview.css';
import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

//debug: Inject script into html file, may cause to problems with long code
// const html = `
//   <script>
//     ${code}
//   </script>
//   `;
const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
    window.addEventListener('message', (event) => {
      try {
        eval(event.data);
      } catch (error) {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
        throw error;
      }
      
    }, false)
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
    </div>
  );
};

export default Preview;
