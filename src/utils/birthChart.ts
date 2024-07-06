import { julian, solar, planetposition, moonposition } from "astronomia";
import data from "astronomia/data";
import zodiacSigns from "@/lib/data/zodiacSigns";

export function getSigns(birthDate: string, birthTime: string) {
  const jd = toJulianDay(birthDate, birthTime);
  const planetaryPositions = calculatePlanetaryPositions(jd);

  const positions = {
    sun: planetaryPositions.sun,
    moon: planetaryPositions.moon
  }

  const zodiacSigns = calculateZodiacs(positions);
  return zodiacSigns;
};

function mapZodiac(radians: number) {
  const degreesValue = radians * (180 / Math.PI);
  const index = Math.floor(degreesValue / 30) % 12;
  return zodiacSigns[index];
};

function calculateZodiacs(positions: any) {
  const sunSign = mapZodiac(positions.sun.rightAscension);
  const moonSign = mapZodiac(positions.moon.rightAscension);

  return {
    sunSign,
    moonSign
  };
};

function toJulianDay(date: string, time: string) {
  const T = new Date(`${date}T${time}`);
  return julian.CalendarGregorianToJD(T.getFullYear(), T.getMonth() + 1, T.getDate(), T.getHours(), T.getMinutes(), T.getSeconds());
};

function calculatePlanetaryPositions(jd: number) {
  const earthEphemeris = new planetposition.Planet(data.vsop87Bearth);

  const sunCoords = solar.trueVSOP87(earthEphemeris, jd);
  const moonCoords = moonposition.position(jd);

  const sun = {
    rightAscension: sunCoords.ra,
    declination: sunCoords.dec,
    longitude: sunCoords.lon
  };
  const moon = {
    rightAscension: moonCoords.ra,
    declination: moonCoords.dec
  };

  return { sun, moon };
};
