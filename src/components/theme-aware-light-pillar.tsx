"use client";

import { useEffect, useState } from "react";
import LightPillar from "./LightPillar";

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export const ThemeAwareLightPillar = () => {
  // Começa com o hue padrão (purple 290)
  const [colors, setColors] = useState({ top: "#a855f7", bottom: "#d8b4fe" });

  useEffect(() => {
    const updateColors = () => {
      // Tenta pegar do estilo inline do html primeiro (onde o color picker salva)
      const htmlStyle = document.documentElement.style.getPropertyValue("--theme-hue");

      // Se não tiver inline, tenta pegar do estilo computado (padrão do CSS)
      const computedStyle = getComputedStyle(document.documentElement).getPropertyValue("--theme-hue");

      const currentHue = parseInt(htmlStyle || computedStyle || "290", 10);

      if (!isNaN(currentHue)) {
        // Gera cores baseadas no hue para o pilar
        // Top: cor vibrante
        const top = hslToHex(currentHue, 90, 60);
        // Bottom: cor mais suave e levemente deslocada no espectro
        const bottom = hslToHex((currentHue + 30) % 360, 80, 70);

        setColors({ top, bottom });
      }
    };

    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none mix-blend-screen opacity-40 dark:opacity-30">
      <LightPillar
        topColor={colors.top}
        bottomColor={colors.bottom}
        intensity={0.6}
        pillarWidth={4}
        glowAmount={0.2}
        className="w-full h-full opacity-60"
      />
    </div>
  );
};
