/*
 * Copyright 2021 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';
import { useParams } from 'react-router-dom';

import BusinessDataService from "../services/business.service";

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";

import { LocatorSidebar } from './locator-sidebar';
const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const Business: React.FC = (props) => {
  const params = useParams();
  const [message, setMessage] = React.useState<string>("");
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const [currentBusiness, setCurrentBusiness] = React.useState({
    id: null,
    title: "",
    description: "",
    address: "",
    published: false
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    console.log(e);
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  React.useEffect(() => {
    getBusiness(params.id);
  });

  const onChangeAddress = (e) => {
    const address = "new adddress";
    setCurrentBusiness({ ...currentBusiness, address });
  }


  const onChangeTitle = (e) => {
    const title = e.target.value;
    setCurrentBusiness({ ...currentBusiness, title });
  }

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentBusiness({ ...currentBusiness, description });
  }

  const getBusiness = (id) => {
    BusinessDataService.get(id)
      .then(response => {
        //setCurrentBusiness(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const updatePublished = (status) => {
    const data = {
      id: currentBusiness.id,
      title: currentBusiness.title,
      description: currentBusiness.description,
      published: status
    };

    BusinessDataService.update(currentBusiness.id, data)
      .then(response => {
        setCurrentBusiness({
          ...currentBusiness,
          published: status
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const updateBusiness = () => {
    BusinessDataService.update(
      currentBusiness.id,
      currentBusiness
    )
      .then(response => {
        console.log(response.data);
        setMessage("The business was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  }

  const deleteBusiness = () => {
    /*BusinessDataService.delete(this.state.currentBusiness.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/businesses');
      })
      .catch(e => {
        console.log(e);
      });*/
  }
  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
      <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  );

  return (
    <div>
      {currentBusiness ? (
        <div className="edit-form">
          <h4>Business</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentBusiness.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentBusiness.description}
                onChange={onChangeDescription}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={currentBusiness.address}
                onChange={onChangeAddress}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBusiness.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentBusiness.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button
            className="badge badge-danger mr-2"
            onClick={deleteBusiness}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBusiness}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Business...</p>
        </div>
      )}
      <Wrapper apiKey="AIzaSyCgpJyff1IszQa2T2QSXztIt1c7r0aW0Vw" render={render} libraries={["places","geometry"]}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "600px" }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>

      {form}
    </div>
  );
};

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      <LocatorSidebar/>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export { Business };
