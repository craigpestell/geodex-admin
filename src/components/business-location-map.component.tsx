import { useEffect, useRef, ReactElement } from "react";
import { Status } from "@googlemaps/react-wrapper";

const render = (status: Status): ReactElement | null => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

export function LocationMap({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    }
  });

  return <div ref={ref} id="map" />;
}

/* function App() {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  return (
    <Wrapper apiKey="AIzaSyCgpJyff1IszQa2T2QSXztIt1c7r0aW0Vw" render={render}>
      <LocationMap center={center} zoom={zoom} />
    </Wrapper>
  );
}*/