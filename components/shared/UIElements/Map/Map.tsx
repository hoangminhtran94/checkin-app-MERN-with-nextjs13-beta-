import React, { useRef, useEffect } from "react";
import classes from "./Map.module.css";

interface MapProps {
  className?: string;
  style?: { [key: string]: any };
  center?: any;
  zoom: number;
}

const Map: React.FC<MapProps> = (props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new (window as any).google.maps.Map(mapRef.current, {
      center: props.center,
      zoom: props.zoom,
    });
    new (window as any).google.maps.Marker({
      position: props.center,
      map: map,
    });
  }, [props.center, props.zoom]);

  return (
    <div
      ref={mapRef}
      className={`${classes["map"]} ${props.className}`}
      style={props.style}
    ></div>
  );
};
export default Map;
