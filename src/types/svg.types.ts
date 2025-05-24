export type SvgElement = {
  type: 'path' | 'circle' | 'rect';
  d?: string;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  opacity?: number;
  transform?: string;
  cx?: number;
  cy?: number;
  r?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rx?: number;
  strokeDasharray?: string;
};