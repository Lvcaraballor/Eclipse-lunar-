import { Audio } from "@remotion/media";
import { Series, staticFile, useVideoConfig } from "remotion";
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
    <>
      <Audio
        name="Locución"
        src={staticFile("locucion1.mp3")}
        premountFor={fps}
      />
      <Series>
        <Series.Sequence name="Apertura" durationInFrames={333} premountFor={fps}>
          <OpeningScene />
        </Series.Sequence>
        <Series.Sequence name="Al-Biruni" durationInFrames={333} premountFor={fps}>
          <ContextScene />
        </Series.Sequence>
        <Series.Sequence name="El esquema orbital" durationInFrames={333} premountFor={fps}>
          <OrbitalScene />
        </Series.Sequence>
        <Series.Sequence name="Las fases" durationInFrames={333} premountFor={fps}>
          <PhasesScene />
        </Series.Sequence>
        <Series.Sequence name="Idea y fuente" durationInFrames={333} premountFor={fps}>
          <ClosingScene />
        </Series.Sequence>
      </Series>
    </>
  );
};
