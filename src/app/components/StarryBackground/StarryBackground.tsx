'use client'
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import useColorSelect from "@/utils/hooks/useColorSelect";

import {
  type Container,
  type ISourceOptions,
} from "@tsparticles/engine";

function StarryBackground() {

  const [ init, setInit ] = useState(false);
  const { color } = useColorSelect();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
        setInit(true);
      });
  }, []);

  const options: ISourceOptions = useMemo (
    () => ({
    background: {},
    interactivity: {
      detect_on: "window",
      onhover: {
        enable: true,
        mode: "repulse"
      }
    },
    particles: {
    color: {
        value: color
      },
    number: {
      value: 10
    },
    shape: {
      type: "star",
    },
    move: {
      direction: "bottom",
      enable: true,
      outModes: {
        default: "out"
      },
      random: true,
      speed: 0.25,
      straight: false
    },
    opacity: {
      animation: {
        enable: true,
        speed: 0.8,
        sync: false
      },
      value: {
        min: 0.25,
        max: 1
      }
    },
    size: {
      value: {
        min: 1,
        max: 4
      }
    }
    },
    fullScreen: false
    }),[]
  )

  if (init) {
    return (
      <Particles options={options} id="tsparticles"></Particles>
    );
  };

  return <></>;
};

export default StarryBackground;
