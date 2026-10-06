import { Series, useVideoConfig } from "remotion";
import {
  ClosingScene,
  ContextScene,
  OpeningScene,
  OrbitalScene,
  PhasesScene,
} from "./Scenes";

export const LunarExplainer: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Series>
      <Series.Sequence name="Apertura" durationInFrames={150} premountFor={fps}>
        <OpeningScene />
      </Series.Sequence>
      <Series.Sequence name="Al-Biruni" durationInFrames={150} premountFor={fps}>
        <ContextScene />
      </Series.Sequence>
      <Series.Sequence name="El esquema orbital" durationInFrames={180} premountFor={fps}>
        <OrbitalScene />
      </Series.Sequence>
      <Series.Sequence name="Las fases" durationInFrames={150} premountFor={fps}>
        <PhasesScene />
      </Series.Sequence>
      <Series.Sequence name="Idea y fuente" durationInFrames={150} premountFor={fps}>
        <ClosingScene />
      </Series.Sequence>
    </Series>
  );
};
