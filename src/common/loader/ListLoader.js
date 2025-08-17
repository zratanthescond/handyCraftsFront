import { Container } from "react-bootstrap";
import ContentLoader from "react-content-loader";


export default function FullListLoader({colNumber}) {
    return (

        <Container className="d-flex flex-md-row flex-column justify-content-center">
        
      {
         Array.from({length: colNumber}).map( _ => (

          <ContentLoader
          key={Math.random()} 
          speed={2}
          width={250}
          height={460}
          viewBox="0 0 400 460"
          backgroundColor="#ccc"
          foregroundColor="#ecebeb"
        >
          <rect x="58" y="18" rx="2" ry="2" width="140" height="10" /> 
          <rect x="-4" y="312" rx="2" ry="2" width="247" height="18" /> 
          <rect x="0" y="60" rx="2" ry="2" width="244" height="244" /> 
          <rect x="-1" y="339" rx="2" ry="2" width="247" height="18" /> 
          <rect x="0" y="366" rx="2" ry="2" width="247" height="18" />
        </ContentLoader>
     ))
      }

      </Container>
    )
}