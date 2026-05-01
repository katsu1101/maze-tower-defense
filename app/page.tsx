'use client';

import { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';
import { HelloMazeScene } from '@/lib/game/scene';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 720,
      height: 432,
      parent: containerRef.current,
      scene: [HelloMazeScene],
      physics: { default: 'arcade' },
      backgroundColor: '#0e1526',
    });

    return () => game.destroy(true);
  }, []);

  return (
    <main>
      <div>
        <h1>Maze Tower Defense</h1>
        <p>Next.js + TypeScript + Phaser Prototype</p>
        <div ref={containerRef} />
      </div>
    </main>
  );
}
