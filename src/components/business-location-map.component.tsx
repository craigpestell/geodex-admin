import { useEffect, useRef, ReactElement } from "react";
import { Status } from "@googlemaps/react-wrapper";

const render = (status: Status): ReactElement | null => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

export function LocationMap({
  address,
  center,
  zoom,
}: {
  address: string,
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
      if(!address){
        return;
      }
      const geocoder = new google.maps.Geocoder();

      geocoder
        .geocode({ address })
        .then((response) => {
          console.log(response);
          const {address_components} = response.results[0];
          const {formatted_address} = response.results[0];
          address = formatted_address;
          const zoom = 12;
          map.setZoom(zoom);
          const position = response.results[0].geometry.location;
    
          map.setCenter(position);
          new google.maps.Marker({
            map,
            position,
          });
        })
        .catch((e) =>
          console.error(e)
          //window.alert("Geocode was not successful for the following reason: " + e)
        );
    
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