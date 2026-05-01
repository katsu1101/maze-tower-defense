import type { Cell, GridPoint } from './types';

export class GridMap {
  readonly width: number;
  readonly height: number;
  readonly cellSize: number;
  readonly cells: Cell[][];

  constructor(width: number, height: number, cellSize = 20) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cells = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => ({
        isBlocked: false,
        isNearBlocked: false,
        distance: Number.POSITIVE_INFINITY,
      }))
    );
  }

  inBounds(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
  }

  neighbors4({ x, y }: GridPoint): GridPoint[] {
    const d = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ];
    return d.filter((p) => this.inBounds(p.x, p.y));
  }

  resetDistance(): void {
    for (const row of this.cells) {
      for (const c of row) c.distance = Number.POSITIVE_INFINITY;
    }
  }

  setBlockedCircle(cx: number, cy: number, radiusInCells: number): void {
    const r2 = radiusInCells * radiusInCells;
    for (let y = Math.max(0, cy - radiusInCells); y <= Math.min(this.height - 1, cy + radiusInCells); y++) {
      for (let x = Math.max(0, cx - radiusInCells); x <= Math.min(this.width - 1, cx + radiusInCells); x++) {
        const dx = x - cx;
        const dy = y - cy;
        if (dx * dx + dy * dy <= r2) this.cells[y][x].isBlocked = true;
      }
    }
  }
}
