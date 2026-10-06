import { Composition, Folder } from "remotion";
import { LunarExplainer } from "./Composition";
import {
  ClosingScene,
  ContextScene,
  OpeningScene,
  OrbitalScene,
  PhasesScene,
} from "./Scenes";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Escenas">
        <Composition id="Apertura" component={OpeningScene} durationInFrames={150} fps={30} width={1920} height={1080} />
        <Composition id="AlBiruni" component={ContextScene} durationInFrames={150} fps={30} width={1920} height={1080} />
        <Composition id="EsquemaOrbital" component={OrbitalScene} durationInFrames={180} fps={30} width={1920} height={1080} />
        <Composition id="FasesLunares" component={PhasesScene} durationInFrames={150} fps={30} width={1920} height={1080} />
        <Composition id="IdeaYFuente" component={ClosingScene} durationInFrames={150} fps={30} width={1920} height={1080} />
      </Folder>
      <Composition
        id="DiagramaLunarDeAlBiruni"
        component={LunarExplainer}
        durationInFrames={1665}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
