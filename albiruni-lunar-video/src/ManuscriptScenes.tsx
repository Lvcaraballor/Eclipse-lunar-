import type { CSSProperties, ReactNode } from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

const colors = {
  paper: "#e9ddbd",
  paperLight: "#f3e9d1",
  ink: "#35291b",
  inkSoft: "#725c3e",
  inkFaint: "rgba(53, 41, 27, 0.24)",
  gold: "#9b7a3e",
  rust: "#8a4c31",
  moon: "#d7c596",
};

const pageStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  boxSizing: "border-box",
  color: colors.ink,
  backgroundColor: colors.paper,
  backgroundImage:
    "radial-gradient(ellipse at 18% 12%, rgba(255, 250, 231, 0.72), transparent 42%), radial-gradient(ellipse at 82% 86%, rgba(137, 103, 55, 0.12), transparent 48%), repeating-linear-gradient(7deg, transparent 0px, transparent 8px, rgba(96, 71, 38, 0.025) 9px, transparent 10px)",
  fontFamily: "'DejaVu Serif', Georgia, serif",
};

const Page = ({ children, folio }: { children: ReactNode; folio: string }) => (
  <div style={pageStyle}>
    <div
      style={{
        position: "absolute",
        inset: 32,
        border: `1px solid ${colors.inkFaint}`,
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 43,
        border: `1px solid rgba(155, 122, 62, 0.3)`,
        pointerEvents: "none",
      }}
    />
    {children}
    <div
      style={{
        position: "absolute",
        left: 68,
        right: 68,
        bottom: 73,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: colors.inkSoft,
        fontSize: 19,
        letterSpacing: 0,
      }}
    >
      <span>AL-BIRUNI · DIAGRAMA LUNAR</span>
      <span>{folio}</span>
    </div>
  </div>
);

const Reveal = ({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        ...style,
        opacity: progress,
        transform: `translateY(${(1 - progress) * 14}px)`,
      }}
    >
      {children}
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      color: colors.rust,
      fontSize: 19,
      fontWeight: 700,
      lineHeight: 1.4,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const Divider = ({ style }: { style?: CSSProperties }) => (
  <div
    style={{
      width: 160,
      height: 1,
      backgroundColor: colors.gold,
      ...style,
    }}
  />
);

type MoonPhase = "new" | "quarter" | "crescent" | "full" | "waning";

const Moon = ({
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
      position: "relative",
      overflow: "hidden",
      borderRadius: "50%",
      backgroundColor: colors.ink,
      border: `2px solid ${active ? colors.rust : colors.gold}`,
      boxShadow: active ? `0 0 0 8px rgba(138, 76, 49, 0.12)` : "none",
    }}
  >
    {(phase === "full" ||
      phase === "quarter" ||
      phase === "crescent" ||
      phase === "waning") && (
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          backgroundColor: colors.moon,
          clipPath:
            phase === "full"
              ? "circle(50% at 50% 50%)"
              : phase === "quarter"
                ? "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)"
                : phase === "crescent"
                  ? "ellipse(48% 50% at 72% 50%)"
                  : "ellipse(48% 50% at 28% 50%)",
        }}
      />
    )}
    <div
      style={{
        position: "absolute",
        inset: "12%",
        borderRadius: "50%",
        border: `1px solid rgba(53, 41, 27, 0.34)`,
      }}
    />
  </div>
);

const Sun = ({ size = 112 }: { size?: number }) => (
  <div
    style={{
      position: "relative",
      width: size,
      height: size,
      border: `2px solid ${colors.rust}`,
      borderRadius: "50%",
      boxSizing: "border-box",
      backgroundColor: "rgba(155, 122, 62, 0.14)",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: "22%",
        border: `1px solid ${colors.rust}`,
        borderRadius: "50%",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: "42%",
        borderRadius: "50%",
        backgroundColor: colors.rust,
      }}
    />
    {[0, 45, 90, 135].map((angle) => (
      <div
        key={angle}
        style={{
          position: "absolute",
          width: size * 1.28,
          height: 1,
          top: "50%",
          left: "50%",
          backgroundColor: "rgba(138, 76, 49, 0.58)",
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        }}
      />
    ))}
  </div>
);

const Earth = ({ size = 136 }: { size?: number }) => (
  <div
    style={{
      position: "relative",
      width: size,
      height: size,
      borderRadius: "50%",
      boxSizing: "border-box",
      border: `3px solid ${colors.ink}`,
      backgroundColor: "rgba(114, 92, 62, 0.13)",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "-20%",
        bottom: "-20%",
        left: "34%",
        right: "34%",
        borderLeft: `1px solid ${colors.inkSoft}`,
        borderRight: `1px solid ${colors.inkSoft}`,
        borderRadius: "50%",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: "15%",
        right: "15%",
        top: "48%",
        borderTop: `1px solid ${colors.inkSoft}`,
      }}
    />
  </div>
);

const OrbitalDiagram = ({
  activePhase,
  compact = false,
}: {
  activePhase: number;
  compact?: boolean;
}) => {
  const frame = useCurrentFrame();
  const orbitSize = compact ? 480 : 540;
  const moonSize = compact ? 66 : 78;
  const earthSize = compact ? 118 : 142;
  const centerX = 500;
  const centerY = compact ? 380 : 455;
  const radius = orbitSize / 2;
  const phases: { phase: MoonPhase; name: string; x: number; y: number }[] = [
    { phase: "quarter", name: "CUARTO", x: centerX, y: centerY - radius },
    { phase: "full", name: "LLENA", x: centerX + radius, y: centerY },
    { phase: "quarter", name: "CUARTO", x: centerX, y: centerY + radius },
    { phase: "new", name: "NUEVA", x: centerX - radius, y: centerY },
  ];
  const slowTurn = interpolate(frame, [0, 333], [-1.5, 1.5], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: 924,
        height: compact ? 820 : 950,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 66,
          top: centerY + 3,
          width: 682,
          borderTop: `1px solid rgba(138, 76, 49, 0.58)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: centerX - radius,
          top: centerY - radius,
          width: orbitSize,
          height: orbitSize,
          border: `2px solid ${colors.inkSoft}`,
          borderRadius: "50%",
          boxSizing: "border-box",
          transform: `rotate(${slowTurn}deg)`,
        }}
      />
      <div style={{ position: "absolute", left: 16, top: centerY - 50 }}>
        <Sun size={100} />
      </div>
      <div
        style={{
          position: "absolute",
          left: centerX - earthSize / 2,
          top: centerY - earthSize / 2,
          zIndex: 3,
        }}
      >
        <Earth size={earthSize} />
      </div>
      <div
        style={{
          position: "absolute",
          left: centerX - 62,
          top: centerY + earthSize / 2 + 18,
          width: 124,
          textAlign: "center",
          zIndex: 4,
          color: colors.ink,
          fontSize: 20,
        }}
      >
        TIERRA
      </div>
      <div
        style={{
          position: "absolute",
          left: 10,
          top: centerY + 74,
          color: colors.rust,
          fontSize: 18,
          fontStyle: "italic",
        }}
      >
        luz solar
      </div>
      {phases.map((item, index) => (
        <div
          key={`${item.phase}-${item.name}`}
          style={{
            position: "absolute",
            left: item.x - moonSize / 2,
            top: item.y - moonSize / 2,
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Moon phase={item.phase} size={moonSize} active={activePhase === index} />
          <div
            style={{
              position: "absolute",
              top: moonSize + 7,
              whiteSpace: "nowrap",
              color: activePhase === index ? colors.rust : colors.inkSoft,
              fontSize: 16,
              fontWeight: activePhase === index ? 700 : 400,
            }}
          >
            {item.name}
          </div>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: centerX + 90,
          top: centerY + 82,
          color: colors.inkSoft,
          fontSize: 17,
          fontStyle: "italic",
        }}
      >
        órbita lunar
      </div>
    </div>
  );
};

const AstrolabeEtching = () => {
  const frame = useCurrentFrame();
  const pointerAngle = interpolate(frame, [0, 333], [-2, 2], {
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width="320"
      height="349"
      viewBox="0 0 560 610"
      role="img"
      aria-label="Recreación gráfica de un instrumento astronómico circular"
    >
      <g fill="none" stroke={colors.inkSoft} strokeWidth="2">
        <circle cx="280" cy="282" r="214" />
        <circle cx="280" cy="282" r="182" />
        <circle cx="280" cy="282" r="140" />
        <circle cx="280" cy="282" r="64" />
        <path d="M280 68v428M66 282h428M129 131l302 302M431 131 129 433" />
        <path d="M280 68 194 480M280 68l86 412M129 131l302 302M431 131 129 433" />
        <path d="M248 496h64l-32 60zM252 68h56" />
      </g>
      <g fill={colors.gold}>
        {Array.from({ length: 24 }, (_, index) => {
          const angle = (index * Math.PI * 2) / 24;
          return (
            <circle
              key={index}
              cx={280 + Math.cos(angle) * 198}
              cy={282 + Math.sin(angle) * 198}
              r={index % 2 === 0 ? 3 : 1.6}
            />
          );
        })}
      </g>
      <g
        transform={`rotate(${pointerAngle} 280 282)`}
        fill="none"
        stroke={colors.rust}
        strokeWidth="3"
      >
        <path d="m280 112 19 170-19 144-19-144z" />
        <circle cx="280" cy="282" r="18" fill={colors.paper} />
      </g>
    </svg>
  );
};

export const ManuscriptOpening = () => (
  <Page folio="FOL. I">
    <div style={{ position: "absolute", top: 138, left: 90, right: 90, textAlign: "center" }}>
      <Reveal>
        <Eyebrow>Una imagen para pensar el universo</Eyebrow>
        <h1
          style={{
            margin: "26px 0 14px",
            fontSize: 76,
            fontWeight: 400,
            lineHeight: 1.08,
          }}
        >
          El diagrama lunar
          <br />
          de al-Biruni
        </h1>
        <Divider style={{ margin: "28px auto" }} />
        <div style={{ color: colors.inkSoft, fontSize: 25, fontStyle: "italic" }}>
          Abu Rayhan al-Biruni · hacia 1019
        </div>
      </Reveal>
    </div>
    <div style={{ position: "absolute", top: 565, left: 75, right: 75 }}>
      <Reveal delay={10}>
        <OrbitalDiagram activePhase={0} compact />
      </Reveal>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 225,
        left: 145,
        right: 145,
        textAlign: "center",
        color: colors.inkSoft,
        fontSize: 21,
        fontStyle: "italic",
      }}
    >
      Esquema explicativo recreado; no es un facsímil del manuscrito.
    </div>
  </Page>
);

export const ManuscriptContext = () => (
  <Page folio="FOL. II">
    <div style={{ position: "absolute", top: 150, left: 84, right: 84 }}>
      <Reveal>
        <Eyebrow>01 · El observador</Eyebrow>
        <h2
          style={{
            maxWidth: 850,
            margin: "24px 0 22px",
            fontSize: 72,
            fontWeight: 400,
            lineHeight: 1.08,
          }}
        >
          Abu Rayhan
          <br />
          al-Biruni
        </h2>
        <Divider />
        <p
          style={{
            maxWidth: 850,
            margin: "28px 0 0",
            color: colors.inkSoft,
            fontSize: 29,
            lineHeight: 1.55,
          }}
        >
          Científico, matemático y astrónomo persa. Vivió aproximadamente entre
          973 y 1048.
        </p>
      </Reveal>
    </div>
    <div
      style={{
        position: "absolute",
        top: 680,
        left: 70,
        right: 70,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 28,
      }}
    >
      <Reveal delay={10} style={{ width: 590 }}>
        <Img
          src={staticFile("lunar-phases-al-biruni-reference.jpg")}
          alt="Diagrama de fases lunares reproducido de un manuscrito de Kitab al-Tafhim"
          style={{
            display: "block",
            width: "100%",
            height: 416,
            objectFit: "contain",
            border: `1px solid ${colors.gold}`,
            boxSizing: "border-box",
          }}
        />
        <div style={{ marginTop: 14, fontSize: 20, lineHeight: 1.4 }}>
          Diagrama de fases atribuido a al-Biruni
        </div>
        <div
          style={{
            marginTop: 5,
            color: colors.inkSoft,
            fontSize: 18,
            lineHeight: 1.4,
          }}
        >
          Manuscrito reproducido en Nasr, <i>Islamic Science</i> (1976); dominio público.
        </div>
      </Reveal>
      <Reveal delay={16} style={{ width: 320, textAlign: "center" }}>
        <AstrolabeEtching />
        <div style={{ marginTop: 8, fontSize: 18, lineHeight: 1.4 }}>
          Instrumento astronómico
        </div>
        <div
          style={{
            marginTop: 4,
            color: colors.inkSoft,
            fontSize: 18,
            lineHeight: 1.4,
          }}
        >
          Recreación gráfica, no un objeto original.
        </div>
      </Reveal>
    </div>
    <div
      style={{
        position: "absolute",
        left: 105,
        right: 105,
        bottom: 245,
        padding: "26px 28px",
        borderTop: `1px solid ${colors.gold}`,
        borderBottom: `1px solid ${colors.gold}`,
        textAlign: "center",
      }}
    >
      <Eyebrow>Kitab al-Tafhim</Eyebrow>
      <div style={{ marginTop: 12, fontSize: 25, lineHeight: 1.45 }}>
        Un esquema de posiciones y fases lunares.
      </div>
    </div>
  </Page>
);

export const ManuscriptOrbital = () => {
  const frame = useCurrentFrame();
  const activePhase = Math.min(3, Math.floor(frame / 83));

  return (
    <Page folio="FOL. III">
      <div style={{ position: "absolute", top: 148, left: 84, right: 84 }}>
        <Reveal>
          <Eyebrow>02 · Una relación geométrica</Eyebrow>
          <h2
            style={{
              margin: "18px 0 0",
              fontSize: 56,
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            Del Sol a las fases
          </h2>
        </Reveal>
      </div>
      <div style={{ position: "absolute", top: 440, left: 78, right: 78 }}>
        <Reveal delay={8}>
          <OrbitalDiagram activePhase={activePhase} />
        </Reveal>
      </div>
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          bottom: 205,
          color: colors.inkSoft,
          fontSize: 21,
          lineHeight: 1.5,
          textAlign: "center",
        }}
      >
        La geometría hace visibles relaciones que no se observan de una sola vez.
        <br />
        Esquema explicativo, no una reconstrucción ni un modelo a escala.
      </div>
    </Page>
  );
};

export const ManuscriptPhases = () => {
  const frame = useCurrentFrame();
  const activePhase = Math.min(3, Math.floor(frame / 83));
  const phases: { name: string; phase: MoonPhase }[] = [
    { name: "Luna nueva", phase: "new" },
    { name: "Creciente", phase: "crescent" },
    { name: "Luna llena", phase: "full" },
    { name: "Menguante", phase: "waning" },
  ];

  return (
    <Page folio="FOL. IV">
      <div style={{ position: "absolute", top: 148, left: 84, right: 84 }}>
        <Reveal>
          <Eyebrow>03 · Lo que vemos desde la Tierra</Eyebrow>
          <h2
            style={{
              maxWidth: 900,
              margin: "18px 0 0",
              fontSize: 54,
              fontWeight: 400,
              lineHeight: 1.16,
            }}
          >
            Una Luna, distintas iluminaciones
          </h2>
        </Reveal>
      </div>
      <div
        style={{
          position: "absolute",
          top: 490,
          left: 92,
          right: 92,
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
      >
        {phases.map((item, index) => (
          <Reveal key={item.name} delay={index * 7}>
            <div
              style={{
                minHeight: 220,
                display: "flex",
                alignItems: "center",
                gap: 38,
                padding: "24px 28px",
                boxSizing: "border-box",
                borderTop: `1px solid ${colors.inkFaint}`,
                borderBottom: `1px solid ${colors.inkFaint}`,
                backgroundColor:
                  activePhase === index ? "rgba(155, 122, 62, 0.11)" : "transparent",
              }}
            >
              <Moon phase={item.phase} size={132} active={activePhase === index} />
              <div style={{ fontSize: 31, lineHeight: 1.3 }}>{item.name}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          bottom: 194,
          color: colors.rust,
          fontSize: 22,
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        La fase depende de la posición relativa entre el Sol, la Luna y quien observa.
      </div>
    </Page>
  );
};

export const ManuscriptClosing = () => (
  <Page folio="FOL. V">
    <div style={{ position: "absolute", top: 175, left: 94, right: 94, textAlign: "center" }}>
      <Reveal>
        <Eyebrow>04 · La idea principal</Eyebrow>
        <h2
          style={{
            margin: "38px auto 28px",
            maxWidth: 850,
            fontSize: 62,
            fontWeight: 400,
            lineHeight: 1.25,
          }}
        >
          Una imagen puede ser más que una ilustración.
        </h2>
        <Divider style={{ margin: "0 auto" }} />
        <div
          style={{
            maxWidth: 820,
            margin: "28px auto 0",
            color: colors.rust,
            fontSize: 35,
            fontStyle: "italic",
            lineHeight: 1.35,
          }}
        >
          Puede ayudar a pensar, explicar y transmitir conocimiento.
        </div>
      </Reveal>
    </div>
    <div style={{ position: "absolute", top: 800, left: 110, right: 110 }}>
      <Reveal delay={12}>
        <Img
          src={staticFile("lunar-phases-al-biruni-reference.jpg")}
          alt="Diagrama manuscrito de las fases lunares atribuido a al-Biruni"
          style={{
            display: "block",
            width: 720,
            height: 507,
            maxWidth: "100%",
            objectFit: "contain",
            margin: "0 auto",
            border: `1px solid ${colors.gold}`,
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            marginTop: 10,
            color: colors.inkSoft,
            fontSize: 17,
            textAlign: "center",
          }}
        >
          Diagrama manuscrito de las fases lunares
        </div>
      </Reveal>
    </div>
    <div
      style={{
        position: "absolute",
        left: 104,
        right: 104,
        bottom: 210,
        paddingTop: 22,
        borderTop: `1px solid ${colors.gold}`,
        color: colors.inkSoft,
        fontSize: 19,
        lineHeight: 1.55,
        textAlign: "center",
      }}
    >
      Diagrama lunar atribuido a Abu Rayhan al-Biruni y relacionado con <i>Kitab al-Tafhim</i>.
      <br />
      Fuente: Scott Christianson, <i>100 Diagrams That Changed the World</i>. Imagen del manuscrito: Nasr,
      <i> Islamic Science</i> (1976), Wikimedia Commons, dominio público.
      <br />
      Diagramas e instrumento de esta pieza: recreaciones gráficas, no facsímiles.
    </div>
  </Page>
);