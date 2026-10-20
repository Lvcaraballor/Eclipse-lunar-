import { Audio } from "@remotion/media";
import { Series, staticFile, useVideoConfig } from "remotion";
import {
  ManuscriptClosing,
  ManuscriptContext,
  ManuscriptOpening,
  ManuscriptOrbital,
  ManuscriptPhases,
} from "./ManuscriptScenes";

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
        <Series.Sequence name="Apertura · manuscrito" durationInFrames={333} premountFor={fps}>
          <ManuscriptOpening />
        </Series.Sequence>
        <Series.Sequence name="Al-Biruni · contexto" durationInFrames={333} premountFor={fps}>
          <ManuscriptContext />
        </Series.Sequence>
        <Series.Sequence name="El esquema orbital" durationInFrames={333} premountFor={fps}>
          <ManuscriptOrbital />
        </Series.Sequence>
        <Series.Sequence name="Las fases" durationInFrames={333} premountFor={fps}>
          <ManuscriptPhases />
        </Series.Sequence>
        <Series.Sequence name="Idea y fuente" durationInFrames={333} premountFor={fps}>
          <ManuscriptClosing />
        </Series.Sequence>
      </Series>
    </>
  );
};
