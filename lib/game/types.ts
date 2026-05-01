export type Size = 'S' | 'M' | 'L';
export type Ability = 'Normal' | 'Jump' | 'Break';
export type UnitType = `${Size}_${Ability}`;

export type SupportedUnitType =
  | 'S_Normal'
  | 'M_Normal'
  | 'M_Jump'
  | 'M_Break'
  | 'L_Normal';

export type Cell = {
  isBlocked: boolean;
  isNearBlocked: boolean;
  distance: number;
};

export type GridPoint = { x: number; y: number };
