import { ClickEvent, PointerMoveEvent, ModeProps, GuideFeatureCollection } from '../types';
import { FeatureCollection } from '../geojson-types';
import { GeoJsonEditMode } from './geojson-edit-mode';
export declare class DrawPolygonMode extends GeoJsonEditMode {
    getGuides(props: ModeProps<FeatureCollection>): GuideFeatureCollection;
    handleClick(event: ClickEvent, props: ModeProps<FeatureCollection>): void;
    handlePointerMove({ mapCoords }: PointerMoveEvent, props: ModeProps<FeatureCollection>): void;
}
//# sourceMappingURL=draw-polygon-mode.d.ts.map