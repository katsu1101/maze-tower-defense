import { GridMap } from './grid';
import type { GridPoint } from './types';

export function computeFlowField(grid: GridMap, goals: GridPoint[]): void {
  grid.resetDistance();
  const queue: GridPoint[] = [];

  for (const goal of goals) {
    if (!grid.inBounds(goal.x, goal.y)) continue;
    grid.cells[goal.y][goal.x].distance = 0;
    queue.push(goal);
  }

  while (queue.length) {
    const current = queue.shift();
    if (!current) break;

    const dist = grid.cells[current.y][current.x].distance;
    for (const next of grid.neighbors4(current)) {
      const cell = grid.cells[next.y][next.x];
      if (cell.isBlocked || cell.isNearBlocked) continue;

      const cand = dist + 1;
      if (cand < cell.distance) {
        cell.distance = cand;
        queue.push(next);
      }
    }
  }
}

export function nextStepByDistance(grid: GridMap, p: GridPoint): GridPoint {
  const ns = grid.neighbors4(p);
  let best = p;
  let bestDist = grid.cells[p.y][p.x].distance;
  for (const n of ns) {
    const d = grid.cells[n.y][n.x].distance;
    if (d < bestDist) {
      bestDist = d;
      best = n;
    }
  }
  return best;
}
