import Phaser from 'phaser';
import { GridMap } from './grid';
import { computeFlowField, nextStepByDistance } from './flowField';

export class HelloMazeScene extends Phaser.Scene {
  private readonly grid = new GridMap(30, 18, 24);
  private enemy!: Phaser.GameObjects.Arc;
  private goal = { x: 27, y: 9 };
  private enemyCell = { x: 2, y: 9 };

  constructor() {
    super('HelloMazeScene');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0e1526');

    this.grid.setBlockedCircle(10, 9, 3);
    this.grid.setBlockedCircle(17, 9, 2);
    computeFlowField(this.grid, [this.goal]);

    this.drawGrid();
    this.enemy = this.add.circle(this.toPx(this.enemyCell.x), this.toPx(this.enemyCell.y), 8, 0x73f0a6);
    this.add.circle(this.toPx(this.goal.x), this.toPx(this.goal.y), 7, 0xffd166);

    this.time.addEvent({
      loop: true,
      delay: 180,
      callback: () => {
        this.enemyCell = nextStepByDistance(this.grid, this.enemyCell);
        this.tweens.add({
          targets: this.enemy,
          x: this.toPx(this.enemyCell.x),
          y: this.toPx(this.enemyCell.y),
          duration: 140,
          ease: 'Sine.Out',
        });
      },
    });
  }

  private toPx(cell: number): number {
    return cell * this.grid.cellSize + this.grid.cellSize / 2;
  }

  private drawGrid(): void {
    const g = this.add.graphics();
    for (let y = 0; y < this.grid.height; y++) {
      for (let x = 0; x < this.grid.width; x++) {
        const cell = this.grid.cells[y][x];
        const px = x * this.grid.cellSize;
        const py = y * this.grid.cellSize;
        if (cell.isBlocked) {
          g.fillStyle(0x394867, 1);
          g.fillRect(px, py, this.grid.cellSize, this.grid.cellSize);
        }
        g.lineStyle(1, 0x1a253d, 0.7);
        g.strokeRect(px, py, this.grid.cellSize, this.grid.cellSize);
      }
    }
  }
}
