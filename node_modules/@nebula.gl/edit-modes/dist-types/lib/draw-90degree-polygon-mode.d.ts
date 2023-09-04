import { ClickEvent, PointerMoveEvent, ModeProps, GuideFeatureCollection } from '../types';
import { Position, FeatureCollection } from '../geojson-types';
import { GeoJsonEditMode } from './geojson-edit-mode';
export declare class Draw90DegreePolygonMode extends GeoJsonEditMode {
    getGuides(props: ModeProps<FeatureCollection>): GuideFeatureCollection;
    handlePointerMove({ mapCoords }: PointerMoveEvent, props: ModeProps<FeatureCollection>): void;
    handleClick(event: ClickEvent, props: ModeProps<FeatureCollection>): void;
    finalizedCoordinates(coords: Position[]): Position[][];
    getIntermediatePoint(coordinates: Position[]): any;
}
//# sourceMappingURL=draw-90degree-polygon-mode.d.ts.map