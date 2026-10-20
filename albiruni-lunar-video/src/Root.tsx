import { Composition, Folder } from "remotion";
import { LunarExplainer } from "./Composition";
import {
  ManuscriptClosing,
  ManuscriptContext,
  ManuscriptOpening,
  ManuscriptOrbital,
  ManuscriptPhases,
} from "./ManuscriptScenes";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Escenas">
        <Composition id="Apertura" component={ManuscriptOpening} durationInFrames={150} fps={30} width={1080} height={1920} />
        <Composition id="AlBiruni" component={ManuscriptContext} durationInFrames={150} fps={30} width={1080} height={1920} />
        <Composition id="EsquemaOrbital" component={ManuscriptOrbital} durationInFrames={180} fps={30} width={1080} height={1920} />
        <Composition id="FasesLunares" component={ManuscriptPhases} durationInFrames={150} fps={30} width={1080} height={1920} />
        <Composition id="IdeaYFuente" component={ManuscriptClosing} durationInFrames={150} fps={30} width={1080} height={1920} />
      </Folder>
      <Composition
        id="DiagramaLunarDeAlBiruni"
        component={LunarExplainer}
        durationInFrames={1665}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
