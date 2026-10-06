import type { CSSProperties, ReactNode } from "react";
import { interpolate, useCurrentFrame } from "remotion";

const colors = {
  ink: "#101c1b",
  inkSoft: "#182a27",
  paper: "#f2ecd9",
  muted: "#b5c2b7",
  lime: "#c9e27b",
  orange: "#ed8056",
  blue: "#80c4c0",
  moon: "#eee5c9",
};

const pageStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  padding: "82px 112px",
  boxSizing: "border-box",
  color: colors.paper,
  backgroundColor: colors.ink,
  backgroundImage:
    "repeating-linear-gradient(0deg, transparent 0px, transparent 53px, rgba(201, 226, 123, 0.035) 54px), repeating-linear-gradient(90deg, transparent 0px, transparent 53px, rgba(201, 226, 123, 0.035) 54px)",
  fontFamily: "'DejaVu Sans', Arial, sans-serif",
};

const displayFont = "Georgia, 'Times New Roman', serif";

const Page = ({ children }: { children: ReactNode }) => (
  <div style={pageStyle}>{children}</div>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      color: colors.lime,
      fontSize: 23,
      lineHeight: 1.3,
      fontWeight: 700,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const Entrance = ({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...style,
        opacity: interpolate(frame, [delay, delay + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: `0px ${interpolate(frame, [delay, delay + 20], [24, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}px`,
      }}
    >
      {children}
    </div>
  );
};

type MoonPhase = "new" | "quarter" | "full" | "waning";

const MoonGlyph = ({
  phase,
  size,
  active = false,
}: {
  phase: MoonPhase;
  size: number;
  active?: boolean;
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      position: "relative",
      overflow: "hidden",
      backgroundColor: colors.inkSoft,
      border: `2px solid ${active ? colors.lime : "rgba(242, 236, 217, 0.62)"}`,
      boxShadow: active ? `0 0 0 12px rgba(201, 226, 123, 0.12)` : "none",
      scale: active ? 1.12 : 1,
    }}
  >
    {phase === "full" && (
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: colors.moon }} />
    )}
    {phase === "quarter" && (
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: colors.moon,
          clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
        }}
      />
    )}
    {phase === "waning" && (
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: colors.moon,
          clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
        }}
      />
    )}
    <div
      style={{
        position: "absolute",
        inset: "13%",
        borderRadius: "50%",
        border: "1px solid rgba(16, 28, 27, 0.18)",
        opacity: phase === "new" ? 0 : 0.5,
      }}
    />
  </div>
);

const Footer = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      position: "absolute",
      left: 112,
      right: 112,
      bottom: 48,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: colors.muted,
      fontSize: 20,
    }}
  >
    <span>100 DIAGRAMAS QUE CAMBIARON EL MUNDO</span>
    <span>{children}</span>
  </div>
);

export const OpeningScene = () => {
  const frame = useCurrentFrame();
  return (
    <Page>
      <div style={{ position: "absolute", top: 86, left: 112 }}>
        <Eyebrow>Una imagen para pensar el universo</Eyebrow>
      </div>
      <div style={{ position: "absolute", left: 112, top: 280, width: 1000 }}>
        <Entrance>
          <h1
            style={{
              margin: 0,
              fontFamily: displayFont,
              fontWeight: 400,
              fontSize: 130,
              lineHeight: 0.98,
            }}
          >
            Leer la Luna
            <br />
            con geometría.
          </h1>
        </Entrance>
        <Entrance delay={14} style={{ marginTop: 40, fontSize: 34, color: colors.muted }}>
          Abu Rayhan al-Biruni <span style={{ color: colors.orange }}>·</span> c. 1019
        </Entrance>
      </div>
      <div
        style={{
          position: "absolute",
          right: 170,
          top: 270,
          width: 510,
          height: 510,
          borderRadius: "50%",
          border: "1px solid rgba(242, 236, 217, 0.28)",
          rotate: `${interpolate(frame, [0, 150], [-8, 8], { extrapolateRight: "clamp" })}deg`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 76,
            borderRadius: "50%",
            border: `2px dashed ${colors.blue}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 196,
            left: 196,
            width: 118,
            height: 118,
            borderRadius: "50%",
            background: "radial-gradient(circle at 34% 30%, #a5d9c9, #528982 62%, #315e5a)",
            border: `3px solid ${colors.paper}`,
          }}
        />
        <div style={{ position: "absolute", top: 68, left: 320 }}>
          <MoonGlyph phase="quarter" size={54} />
        </div>
        <div
          style={{
            position: "absolute",
            top: 34,
            left: 53,
            width: 34,
            height: 34,
            borderRadius: "50%",
            backgroundColor: colors.orange,
          }}
        />
      </div>
      <Footer>ASTRONOMÍA · SIGLO XI</Footer>
    </Page>
  );
};

export const ContextScene = () => (
  <Page>
    <div style={{ position: "absolute", top: 86, left: 112 }}>
      <Eyebrow>01 / El observador</Eyebrow>
    </div>
    <div style={{ position: "absolute", top: 250, left: 112, width: 880 }}>
      <Entrance>
        <h2
          style={{
            margin: 0,
            fontFamily: displayFont,
            fontWeight: 400,
            fontSize: 112,
            lineHeight: 1.02,
          }}
        >
          Abu Rayhan
          <br />
          al-Biruni
        </h2>
      </Entrance>
      <Entrance delay={12} style={{ marginTop: 36, maxWidth: 780, fontSize: 34, lineHeight: 1.5, color: colors.muted }}>
        Científico, matemático y astrónomo persa. Vivió aproximadamente entre 973 y 1048.
      </Entrance>
    </div>
    <div
      style={{
        position: "absolute",
        right: 126,
        top: 286,
        width: 670,
        minHeight: 470,
        borderLeft: `2px solid ${colors.orange}`,
        paddingLeft: 52,
      }}
    >
      <Entrance delay={10}>
        <div style={{ color: colors.orange, fontSize: 25, fontWeight: 700 }}>KITAB AL-TAFHIM</div>
        <div style={{ marginTop: 30, fontFamily: displayFont, fontSize: 55, lineHeight: 1.17 }}>
          Un esquema de posiciones y fases lunares.
        </div>
        <div style={{ marginTop: 42, color: colors.muted, fontSize: 28, lineHeight: 1.5 }}>
          La geometría ayuda a hacer visibles relaciones que no se observan de una sola vez.
        </div>
      </Entrance>
    </div>
    <div style={{ position: "absolute", left: 116, bottom: 170, color: colors.lime, fontSize: 28 }}>
      973 <span style={{ color: colors.muted }}>—</span> 1048
    </div>
    <Footer>CONTEXTO HISTÓRICO</Footer>
  </Page>
);

const SunMark = () => (
  <div
    style={{
      position: "absolute",
      left: 205,
      top: 480,
      width: 116,
      height: 116,
      borderRadius: "50%",
      backgroundColor: colors.orange,
      boxShadow: `0 0 0 18px rgba(237, 128, 86, 0.12)`,
      zIndex: 3,
    }}
  >
    <div style={{ position: "absolute", width: 156, height: 2, top: 57, left: -20, backgroundColor: colors.paper }} />
    <div style={{ position: "absolute", width: 156, height: 2, top: 57, left: -20, backgroundColor: colors.paper, rotate: "45deg" }} />
    <div style={{ position: "absolute", width: 156, height: 2, top: 57, left: -20, backgroundColor: colors.paper, rotate: "-45deg" }} />
  </div>
);

const EarthMark = () => (
  <div
    style={{
      position: "absolute",
      left: 935,
      top: 463,
      width: 150,
      height: 150,
      borderRadius: "50%",
      background: "radial-gradient(circle at 34% 28%, #a5d9c9, #528982 63%, #315e5a)",
      border: `4px solid ${colors.paper}`,
      boxSizing: "border-box",
      zIndex: 4,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: "17% 28%",
        borderRadius: "50%",
        borderLeft: "2px solid rgba(16, 28, 27, 0.48)",
        borderRight: "2px solid rgba(16, 28, 27, 0.48)",
      }}
    />
  </div>
);

const OrbitalMoon = ({
  x,
  y,
  phase,
  label,
  active,
  labelStyle,
}: {
  x: number;
  y: number;
  phase: MoonPhase;
  label: string;
  active: boolean;
  labelStyle: CSSProperties;
}) => (
  <>
    <div style={{ position: "absolute", left: x - 39, top: y - 39, zIndex: 5 }}>
      <MoonGlyph phase={phase} size={78} active={active} />
    </div>
    <div
      style={{
        position: "absolute",
        color: active ? colors.lime : colors.muted,
        fontSize: 22,
        fontWeight: active ? 700 : 400,
        zIndex: 6,
        ...labelStyle,
      }}
    >
      {label}
    </div>
  </>
);

export const OrbitalScene = () => {
  const frame = useCurrentFrame();
  const activePhase = Math.min(3, Math.floor(frame / 83));
  return (
    <Page>
      <div style={{ position: "absolute", top: 78, left: 112, zIndex: 8 }}>
        <Eyebrow>02 / Una relación geométrica</Eyebrow>
        <div style={{ marginTop: 14, fontFamily: displayFont, fontSize: 54 }}>
          Del Sol a las fases
        </div>
      </div>
      <div style={{ position: "absolute", left: 290, top: 534, width: 1430, height: 2, backgroundColor: "rgba(237, 128, 86, 0.58)", zIndex: 1 }} />
      <div style={{ position: "absolute", left: 290, top: 430, width: 1430, height: 1, backgroundColor: "rgba(237, 128, 86, 0.25)", zIndex: 1 }} />
      <div style={{ position: "absolute", left: 290, top: 638, width: 1430, height: 1, backgroundColor: "rgba(237, 128, 86, 0.25)", zIndex: 1 }} />
      <div
        style={{
          position: "absolute",
          left: 710,
          top: 280,
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: `2px dashed rgba(242, 236, 217, 0.55)`,
          zIndex: 2,
        }}
      />
      <SunMark />
      <EarthMark />
      <div style={{ position: "absolute", left: 970, top: 626, width: 90, textAlign: "center", color: colors.paper, fontSize: 22, zIndex: 6 }}>Tierra</div>
      <OrbitalMoon x={1010} y={280} phase="quarter" label="Cuarto" active={activePhase === 0} labelStyle={{ left: 1055, top: 248 }} />
      <OrbitalMoon x={1310} y={580} phase="full" label="Llena" active={activePhase === 1} labelStyle={{ left: 1370, top: 566 }} />
      <OrbitalMoon x={1010} y={880} phase="waning" label="Cuarto" active={activePhase === 2} labelStyle={{ left: 1055, top: 916 }} />
      <OrbitalMoon x={710} y={580} phase="new" label="Nueva" active={activePhase === 3} labelStyle={{ left: 600, top: 566 }} />
      <div style={{ position: "absolute", top: 894, left: 112, color: colors.muted, fontSize: 22 }}>
        Esquema explicativo, no una reconstrucción a escala.
      </div>
      <Footer>POSICIÓN · LUZ · PERSPECTIVA</Footer>
    </Page>
  );
};

export const PhasesScene = () => {
  const frame = useCurrentFrame();
  const activePhase = Math.min(3, Math.floor(frame / 83));
  const phases: { name: string; phase: MoonPhase }[] = [
    { name: "Nueva", phase: "new" },
    { name: "Creciente", phase: "quarter" },
    { name: "Llena", phase: "full" },
    { name: "Menguante", phase: "waning" },
  ];
  return (
    <Page>
      <div style={{ position: "absolute", top: 84, left: 112 }}>
        <Eyebrow>03 / Lo que vemos desde la Tierra</Eyebrow>
        <h2 style={{ margin: "20px 0 0", fontFamily: displayFont, fontWeight: 400, fontSize: 72 }}>
          Una Luna, distintas iluminaciones
        </h2>
      </div>
      <div
        style={{
          position: "absolute",
          left: 220,
          right: 220,
          top: 380,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {phases.map((item, index) => (
          <div key={item.name} style={{ width: 250, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
            <Entrance delay={index * 8}>
              <MoonGlyph phase={item.phase} size={154} active={activePhase === index} />
            </Entrance>
            <div style={{ color: activePhase === index ? colors.lime : colors.paper, fontSize: 28, fontWeight: 700 }}>
              {item.name}
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 260, right: 260, bottom: 190, textAlign: "center", color: colors.muted, fontSize: 30, lineHeight: 1.5 }}>
        La fase depende de la posición relativa entre el Sol, la Luna y quien observa.
      </div>
      <Footer>UNA FORMA DE HACER VISIBLE EL MOVIMIENTO</Footer>
    </Page>
  );
};

export const ClosingScene = () => (
  <Page>
    <div style={{ position: "absolute", top: 86, left: 112 }}>
      <Eyebrow>04 / La idea principal</Eyebrow>
    </div>
    <div style={{ position: "absolute", left: 150, right: 150, top: 260, textAlign: "center" }}>
      <Entrance>
        <div style={{ fontFamily: displayFont, fontSize: 80, lineHeight: 1.18 }}>
          Una imagen puede ser más que una ilustración:
          <br />
          <span style={{ color: colors.lime }}>puede explicar relaciones.</span>
        </div>
      </Entrance>
    </div>
    <div style={{ position: "absolute", bottom: 180, left: 112, right: 112, display: "flex", justifyContent: "space-between", alignItems: "end", gap: 48 }}>
      <div style={{ maxWidth: 680, color: colors.muted, fontSize: 26, lineHeight: 1.55 }}>
        Diagrama lunar atribuido a Abu Rayhan al-Biruni, relacionado con <i>Kitab al-Tafhim</i>.
      </div>
      <div style={{ maxWidth: 760, textAlign: "right", color: colors.paper, fontSize: 24, lineHeight: 1.5 }}>
        Fuente: Scott Christianson, <i>100 Diagrams That Changed the World</i>.
      </div>
    </div>
    <Footer>FIN</Footer>
  </Page>
);