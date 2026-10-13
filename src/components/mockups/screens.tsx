/**
 * Illustrative app screens for the Ride Together interface concept.
 * All names, codes and states here are sample content, not live data.
 */

const mono = { fontFamily: "var(--font-mono)" } as const;
const display = { fontFamily: "var(--font-display)" } as const;

/* Reused map backdrop: faint grid + a few roads */
function MapBackdrop({ y = 0, h = 600 }: { y?: number; h?: number }) {
  return (
    <g>
      <rect y={y} width="280" height={h} className="fill-charcoal" />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`v${i}`} x1={i * 40} x2={i * 40} y1={y} y2={y + h} className="stroke-bone/5" />
      ))}
      {Array.from({ length: Math.ceil(h / 40) }, (_, i) => (
        <line key={`h${i}`} y1={y + i * 40} y2={y + i * 40} x1="0" x2="280" className="stroke-bone/5" />
      ))}
      <path d="M-10 420 C 60 380, 90 300, 160 290 S 250 200, 300 150" className="stroke-steel" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M40 620 C 70 520, 130 470, 150 400 S 130 300, 170 220" className="stroke-steel" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M-10 250 C 70 260, 120 230, 160 120" className="stroke-steel/70" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  );
}

/* ---------- 1. Join with a ride code ---------- */
export function JoinScreen() {
  const code = ["7", "K", "4", "Q", "", ""];
  return (
    <g>
      <text x="20" y="60" className="fill-mute" fontSize="9" letterSpacing="2.4" style={mono}>
        RIDE TOGETHER
      </text>
      <text x="20" y="116" className="fill-bone" fontSize="40" fontWeight="600" style={display}>
        JOIN A RIDE
      </text>
      <text x="20" y="144" className="fill-mute" fontSize="11.5">
        Enter the ride code your
      </text>
      <text x="20" y="160" className="fill-mute" fontSize="11.5">
        Leader shared with the group.
      </text>

      {code.map((c, i) => {
        const x = 20 + i * 41;
        const active = i === 4;
        return (
          <g key={i}>
            <rect
              x={x}
              y="200"
              width="34"
              height="48"
              rx="8"
              className={active ? "fill-graphite stroke-amber" : "fill-graphite stroke-bone/15"}
              strokeWidth={active ? 1.5 : 1}
            />
            {c && (
              <text x={x + 17} y="232" textAnchor="middle" className="fill-bone" fontSize="22" fontWeight="500" style={mono}>
                {c}
              </text>
            )}
            {active && <rect x={x + 16} y="214" width="2" height="20" className="fill-amber" />}
          </g>
        );
      })}
      <text x="20" y="272" className="fill-dim" fontSize="9" letterSpacing="1.5" style={mono}>
        SAMPLE CODE
      </text>

      <rect x="20" y="304" width="240" height="46" rx="23" className="fill-amber" />
      <text x="140" y="332" textAnchor="middle" className="fill-ink" fontSize="13" fontWeight="600">
        Join ride
      </text>

      <line x1="20" x2="118" y1="384" y2="384" className="stroke-bone/12" />
      <text x="140" y="388" textAnchor="middle" className="fill-dim" fontSize="10" style={mono}>
        OR
      </text>
      <line x1="162" x2="260" y1="384" y2="384" className="stroke-bone/12" />

      <rect x="20.5" y="408.5" width="239" height="45" rx="22.5" fill="none" className="stroke-bone/25" />
      <text x="140" y="436" textAnchor="middle" className="fill-bone" fontSize="13" fontWeight="500">
        Create a ride
      </text>
    </g>
  );
}

/* ---------- 2. Group map with riders + highlighted route ---------- */
export function MapScreen() {
  return (
    <g>
      <MapBackdrop />
      {/* Route: travelled (solid) and ahead (dashed) */}
      <path d="M40 520 C 70 440, 120 420, 140 360 S 150 300, 175 260" fill="none" className="stroke-amber" strokeWidth="4" strokeLinecap="round" />
      <path d="M175 260 C 205 215, 240 190, 262 120" fill="none" className="stroke-amber/60" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
      {/* Destination */}
      <circle cx="262" cy="120" r="7" fill="none" className="stroke-bone" strokeWidth="2" />
      <circle cx="262" cy="120" r="2.5" className="fill-bone" />

      {/* Riders */}
      {[
        { x: 176, y: 262, t: "L", lead: true },
        { x: 160, y: 296, t: "C" },
        { x: 142, y: 346, t: "R" },
        { x: 116, y: 404, t: "R" },
        { x: 70, y: 466, t: "R" },
      ].map((r, i) => (
        <g key={i}>
          {r.lead && <circle cx={r.x} cy={r.y} r="17" className="fill-amber/20" />}
          <circle cx={r.x} cy={r.y} r="11" className={r.lead ? "fill-amber" : "fill-bone"} />
          <text x={r.x} y={r.y + 3.6} textAnchor="middle" className="fill-ink" fontSize="10" fontWeight="700">
            {r.t}
          </text>
        </g>
      ))}

      {/* Top turn card */}
      <rect x="16" y="46" width="248" height="58" rx="16" className="fill-ink/90 stroke-bone/12" />
      <rect x="28" y="58" width="34" height="34" rx="10" className="fill-amber" />
      <path d="M45 83 V70 M45 70 L39 76 M45 70 L51 76" className="stroke-ink" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="74" y="73" className="fill-mute" fontSize="9" letterSpacing="1.6" style={mono}>
        NEXT
      </text>
      <text x="74" y="91" className="fill-bone" fontSize="13" fontWeight="600">
        Keep left at the fork
      </text>

      {/* Bottom sheet */}
      <rect x="0" y="470" width="280" height="130" rx="22" className="fill-ink/95 stroke-bone/10" />
      <rect x="120" y="480" width="40" height="3.5" rx="2" className="fill-bone/25" />
      <text x="20" y="512" className="fill-bone" fontSize="14" fontWeight="600">
        Ride group
      </text>
      <text x="260" y="512" textAnchor="end" className="fill-mute" fontSize="9" letterSpacing="1.5" style={mono}>
        ON ROUTE
      </text>
      <rect x="20" y="526" width="240" height="4" rx="2" className="fill-bone/12" />
      <rect x="20" y="526" width="132" height="4" rx="2" className="fill-amber" />
      {["L", "C", "R", "R", "R"].map((t, i) => (
        <g key={i}>
          <circle cx={36 + i * 34} cy="558" r="14" className={i === 0 ? "fill-amber" : "fill-steel"} />
          <text x={36 + i * 34} y="562" textAnchor="middle" className={i === 0 ? "fill-ink" : "fill-bone"} fontSize="11" fontWeight="600">
            {t}
          </text>
        </g>
      ))}
    </g>
  );
}

/* ---------- 3. Group chat + coordination ---------- */
export function ChatScreen() {
  const bubble = (y: number, w: number, text: string, mine = false, who = "") => (
    <g>
      {who && (
        <text x="20" y={y - 6} className="fill-dim" fontSize="9" letterSpacing="1.2" style={mono}>
          {who}
        </text>
      )}
      <rect
        x={mine ? 260 - w : 20}
        y={y}
        width={w}
        height="34"
        rx="14"
        className={mine ? "fill-amber" : "fill-graphite"}
      />
      <text x={(mine ? 260 - w : 20) + 14} y={y + 21} className={mine ? "fill-ink" : "fill-bone"} fontSize="12" fontWeight={mine ? 600 : 400}>
        {text}
      </text>
    </g>
  );
  return (
    <g>
      <text x="20" y="60" className="fill-bone" fontSize="22" fontWeight="600" style={display}>
        RIDE CHAT
      </text>
      <line x1="0" x2="280" y1="76" y2="76" className="stroke-bone/10" />

      {/* Pinned coordination note */}
      <rect x="16" y="90" width="248" height="52" rx="12" className="fill-graphite" />
      <rect x="16" y="90" width="3" height="52" rx="1.5" className="fill-amber" />
      <text x="32" y="109" className="fill-amber" fontSize="9" letterSpacing="1.6" style={mono}>
        PINNED BY LEADER
      </text>
      <text x="32" y="128" className="fill-bone" fontSize="12.5" fontWeight="500">
        Regroup at the next stop
      </text>

      {bubble(176, 152, "Fuel stop soon?", false, "RIDER")}
      {bubble(236, 196, "Yes, 10 minutes ahead.", false, "CO-LEADER")}
      {bubble(296, 112, "Copy that.", true)}
      {bubble(346, 176, "Everyone in sight?", false, "LEADER")}

      {/* Quick replies */}
      {["Regroup", "Fuel stop", "Break"].map((t, i) => (
        <g key={t}>
          <rect x={20 + i * 82} y="500" width="74" height="30" rx="15" fill="none" className="stroke-bone/25" />
          <text x={57 + i * 82} y="519" textAnchor="middle" className="fill-bone" fontSize="11" fontWeight="500">
            {t}
          </text>
        </g>
      ))}
      <rect x="16" y="540" width="248" height="40" rx="20" className="fill-graphite" />
      <text x="34" y="565" className="fill-dim" fontSize="12">
        Message the group
      </text>
      <circle cx="244" cy="560" r="12" className="fill-amber" />
      <path d="M239 560 H249 M245 556 L249 560 L245 564" className="stroke-ink" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/* ---------- 4. Ride command / rider overview ---------- */
export function CommandScreen() {
  const rows = [
    { n: "Rider 1", r: "LEADER", s: "Riding", on: true, lead: true },
    { n: "Rider 2", r: "CO-LEADER", s: "Riding", on: true },
    { n: "Rider 3", r: "RIDER", s: "Riding", on: true },
    { n: "Rider 4", r: "RIDER", s: "Stopped", on: false },
    { n: "Rider 5", r: "RIDER", s: "Riding", on: true },
  ];
  return (
    <g>
      <text x="20" y="60" className="fill-mute" fontSize="9" letterSpacing="2.4" style={mono}>
        RIDE COMMAND
      </text>
      <text x="20" y="102" className="fill-bone" fontSize="34" fontWeight="600" style={display}>
        YOUR CREW
      </text>

      {/* Ride code chip */}
      <rect x="20" y="120" width="240" height="44" rx="12" className="fill-graphite" />
      <text x="34" y="139" className="fill-dim" fontSize="8.5" letterSpacing="1.6" style={mono}>
        RIDE CODE
      </text>
      <text x="34" y="156" className="fill-bone" fontSize="15" fontWeight="500" letterSpacing="3" style={mono}>
        7K4Q2M
      </text>
      <rect x="196" y="130" width="54" height="24" rx="12" fill="none" className="stroke-amber" />
      <text x="223" y="146" textAnchor="middle" className="fill-amber" fontSize="10" fontWeight="600">
        Share
      </text>

      {rows.map((row, i) => {
        const y = 186 + i * 62;
        return (
          <g key={row.n}>
            <rect x="20" y={y} width="240" height="54" rx="14" className="fill-graphite" />
            <circle cx="46" cy={y + 27} r="14" className={row.lead ? "fill-amber" : "fill-steel"} />
            <text x="46" y={y + 31} textAnchor="middle" className={row.lead ? "fill-ink" : "fill-bone"} fontSize="11" fontWeight="700">
              {i + 1}
            </text>
            <text x="72" y={y + 24} className="fill-bone" fontSize="12.5" fontWeight="600">
              {row.n}
            </text>
            <text x="72" y={y + 40} className={row.lead ? "fill-amber" : "fill-mute"} fontSize="8.5" letterSpacing="1.4" style={mono}>
              {row.r}
            </text>
            <circle cx="206" cy={y + 27} r="3.5" className={row.on ? "fill-amber" : "fill-dim"} />
            <text x="216" y={y + 31} className="fill-mute" fontSize="10">
              {row.s}
            </text>
          </g>
        );
      })}
    </g>
  );
}
