'use client'
import { useState, useRef } from "react";

const players = [
  { name: "Michael Jordan", gp: 1072, ppg: 30.1, rpg: 6.2, apg: 5.3, bpg: 0.8, spg: 2.3, per: 27.91, ts: 56.9, playoffPPG: 33.4, rings: 6, estimatedBPG: null, notes: "Highest career PER ever. Best SPG of any player on this list. Playoff PPG exceeds regular season — got BETTER under pressure." },
  { name: "Wilt Chamberlain", gp: 1045, ppg: 30.1, rpg: 22.9, apg: 4.4, bpg: null, spg: 2.2, per: 26.13, ts: 57.0, playoffPPG: 22.9, rings: 2, estimatedBPG: 8.15, notes: "BPG confirmed 8.15 avg across 180 documented games (Basketball Reference, April 2026). SPG 2.2 via film breakdown. 30.1 PPG + 22.9 RPG + 8.15 BPG + 2.2 SPG is the most dominant all-around profile in NBA history." },
  { name: "LeBron James", gp: 1622, ppg: 26.8, rpg: 7.5, apg: 7.4, bpg: 0.7, spg: 1.6, per: 27.49, ts: 58.7, playoffPPG: 28.6, rings: 4, estimatedBPG: null, notes: "Only player elite in PPG, RPG & APG simultaneously. All-time scoring leader. Most games played of any top-5 player." },
  { name: "Bill Russell", gp: 963, ppg: 15.1, rpg: 22.5, apg: 4.3, bpg: null, spg: null, per: 21.9, ts: 51.0, playoffPPG: 16.2, rings: 11, estimatedBPG: 8.6, notes: "Estimated 8.6 BPG + 22.5 RPG = greatest defensive statistical profile ever. 11 rings. Low PPG is his only weakness on a stats list." },
  { name: "Kareem Abdul-Jabbar", gp: 1560, ppg: 24.6, rpg: 11.2, apg: 3.6, bpg: 2.57, spg: 0.9, per: 24.58, ts: 57.0, playoffPPG: 24.3, rings: 6, estimatedBPG: null, notes: "Elite across PPG, RPG & BPG over 1,560 games. Led league in PER 9 times. 6 rings. Skyhook literally unguardable." },
  { name: "Hakeem Olajuwon", gp: 1238, ppg: 21.8, rpg: 11.1, apg: 2.5, bpg: 3.09, spg: 1.75, per: 23.59, ts: 55.1, playoffPPG: 25.9, rings: 2, estimatedBPG: null, notes: "Highest official BPG on list. 1.75 SPG insane for a center. Playoff PPG higher than regular season. Best verified two-way big ever on paper." },
  { name: "Magic Johnson", gp: 906, ppg: 19.5, rpg: 7.2, apg: 11.2, bpg: 0.4, spg: 1.9, per: 24.11, ts: 56.8, playoffPPG: 19.5, rings: 5, estimatedBPG: null, notes: "Highest career APG ever at 11.2. 1.9 SPG elite for a point guard. Revolutionized the position at 6'9\". Retired early — numbers could be higher." },
  { name: "Oscar Robertson", gp: 1040, ppg: 25.7, rpg: 7.5, apg: 9.5, bpg: 0.2, spg: null, per: 24.08, ts: 53.4, playoffPPG: 22.2, rings: 1, estimatedBPG: null, notes: "Averaged a triple-double for an ENTIRE season (1961-62). Elite PPG + APG combo. SPG not tracked in his era." },
  { name: "Shaquille O'Neal", gp: 1207, ppg: 23.7, rpg: 10.9, apg: 2.5, bpg: 2.26, spg: 0.6, per: 26.43, ts: 58.4, playoffPPG: 24.3, rings: 4, estimatedBPG: null, notes: "4th highest career PER ever. Shot 58.2% FG — most efficient high-volume scorer on this list. 3 consecutive Finals MVPs." },
  { name: "Kevin Durant", gp: 1100, ppg: 27.3, rpg: 6.6, apg: 3.4, bpg: 1.1, spg: 1.1, per: 25.91, ts: 61.9, playoffPPG: 28.4, rings: 2, estimatedBPG: null, notes: "2nd highest TS% on this list at 61.9%. Best BPG of any wing player here. Playoff PPG higher than regular season." },
  { name: "Tim Duncan", gp: 1392, ppg: 19.0, rpg: 10.8, apg: 3.0, bpg: 2.17, spg: 0.7, per: 23.44, ts: 55.3, playoffPPG: 20.6, rings: 5, estimatedBPG: null, notes: "2.17 BPG over 1,392 games is extraordinary. Most consistent two-way big of modern era. Playoff PPG always higher than reg season." },
  { name: "Karl Malone", gp: 1476, ppg: 25.0, rpg: 10.1, apg: 3.6, bpg: 0.8, spg: 1.4, per: 23.90, ts: 54.1, playoffPPG: 23.8, rings: 0, estimatedBPG: null, notes: "36,928 career points (3rd all time). 1,476 games of elite production. Volume and durability unmatched among forwards. 0 rings." },
  { name: "Jerry West", gp: 932, ppg: 27.0, rpg: 5.8, apg: 6.7, bpg: 0.6, spg: null, per: 22.88, ts: 54.0, playoffPPG: 29.1, rings: 1, estimatedBPG: null, notes: "Playoff PPG of 29.1 — nearly matches Jordan's playoff average. SPG not tracked in era. Only player to win Finals MVP on the losing team." },
  { name: "Stephen Curry", gp: 1000, ppg: 24.8, rpg: 4.8, apg: 6.6, bpg: 0.2, spg: 1.7, per: 23.51, ts: 62.6, playoffPPG: 26.5, rings: 4, estimatedBPG: null, notes: "Highest TS% on this entire list at 62.6%. All-time 3PT record. Literally changed how basketball is played." },
  { name: "Larry Bird", gp: 897, ppg: 24.3, rpg: 10.0, apg: 6.3, bpg: 0.8, spg: 1.8, per: 23.50, ts: 53.6, playoffPPG: 23.8, rings: 3, estimatedBPG: null, notes: "Elite across PPG, RPG, APG & SPG. 3 consecutive MVPs. Career cut short by injuries — peak efficiency was among the best ever." },
  { name: "Kobe Bryant", gp: 1346, ppg: 25.0, rpg: 5.2, apg: 4.7, bpg: 0.5, spg: 1.4, per: 22.90, ts: 55.0, playoffPPG: 25.6, rings: 5, estimatedBPG: null, notes: "5 rings over 20 seasons. Elite scorer with strong playoff numbers. Consistency across a massive sample size." },
  { name: "Giannis Antetokounmpo", gp: 820, ppg: 28.3, rpg: 11.4, apg: 5.8, bpg: 1.3, spg: 1.2, per: 26.50, ts: 61.0, playoffPPG: 27.8, rings: 1, estimatedBPG: null, notes: "2 MVPs, 1 Finals MVP, 1 DPOY. Elite across PPG, RPG & BPG. Still active — resume still building but numbers already elite." },
  { name: "Charles Barkley", gp: 1073, ppg: 22.1, rpg: 11.7, apg: 3.9, bpg: 0.8, spg: 1.5, per: 24.63, ts: 57.2, playoffPPG: 23.0, rings: 0, estimatedBPG: null, notes: "1 MVP. Exceptional rebounder for his size. High PER and TS% but 0 rings and lower PPG limits ceiling." },
  { name: "Kevin Garnett", gp: 1462, ppg: 17.8, rpg: 10.0, apg: 3.7, bpg: 1.4, spg: 1.3, per: 22.35, ts: 53.3, playoffPPG: 18.4, rings: 1, estimatedBPG: null, notes: "Elite two-way player. 1 MVP, 1 ring. Strong BPG and SPG but lower PPG caps his score on offense-weighted lists." },
  { name: "Julius Erving", gp: 836, ppg: 22.0, rpg: 6.7, apg: 3.9, bpg: 1.7, spg: 2.0, per: 22.50, ts: 54.0, playoffPPG: 21.9, rings: 1, estimatedBPG: null, notes: "NBA stats only. Add ABA (28.7 PPG) and his case is significantly stronger. Pioneer who defined the position." },
  { name: "Dirk Nowitzki", gp: 1522, ppg: 20.7, rpg: 7.5, apg: 2.4, bpg: 0.8, spg: 0.8, per: 23.00, ts: 58.7, playoffPPG: 22.0, rings: 1, estimatedBPG: null, notes: "1 MVP, 1 ring. Played 21 seasons. Revolutionized the power forward position. High TS% reflects elite efficiency." },
  { name: "Nikola Jokic", gp: 810, ppg: 22.2, rpg: 11.1, apg: 7.5, bpg: 0.8, spg: 1.4, per: 29.17, ts: 64.1, playoffPPG: 24.5, rings: 1, estimatedBPG: null, notes: "Highest TS% (64.1%) and highest career playoff PER (29.17) on this entire list. Only player to average a triple-double as a center. 3 MVPs, still active." },
  { name: "David Robinson", gp: 987, ppg: 21.1, rpg: 10.6, apg: 2.5, bpg: 3.0, spg: 1.7, per: 26.18, ts: 57.9, playoffPPG: 20.9, rings: 2, estimatedBPG: null, notes: "5th highest career PER ever at 26.18. 3.0 BPG and 1.7 SPG are elite two-way numbers. 1 MVP, 2 rings, 10 All-Star selections. Criminally underrated." },
];

const statKeys = ["ppg","rpg","apg","bpg","spg","per","ts","playoffPPG","rings"];
const statLabels = { ppg:"PPG", rpg:"RPG", apg:"APG", bpg:"BPG*", spg:"SPG*", per:"PER", ts:"TS%", playoffPPG:"Playoff PPG", rings:"🏆 Rings" };
const defaultWeights = { ppg:20, rpg:15, apg:15, bpg:15, spg:10, per:10, ts:5, playoffPPG:10, rings:10 };

function normalize(all, key) {
  const vals = all.map(p => {
    if (key === "bpg") return p.estimatedBPG ?? p.bpg;
    return p[key];
  });
  const valid = vals.filter(v => v != null);
  const min = Math.min(...valid), max = Math.max(...valid);
  return vals.map(v => v == null ? 0.5 : max === min ? 1 : (v - min) / (max - min));
}

function computeScores(all, w) {
  const norms = {};
  statKeys.forEach(k => { norms[k] = normalize(all, k); });
  return all.map((p, i) => {
    let score = 0, total = 0;
    statKeys.forEach(k => { score += norms[k][i] * w[k]; total += w[k]; });
    return { ...p, score: parseFloat((score / total * 100).toFixed(1)) };
  }).sort((a, b) => b.score - a.score);
}

const RANK_COLORS = ["#FFD700","#C0C0C0","#CD7F32","#4e9af1","#4e9af1","#4e9af1","#6dbf67","#6dbf67","#6dbf67","#f4845f","#f4845f","#f4845f","#b57bee","#b57bee","#b57bee"];

function StatCard({ label, val }) {
  return (
    <div style={{ background:"#0f1923", borderRadius:8, padding:"8px 10px" }}>
      <div style={{ fontSize:10, color:"#8899aa", marginBottom:2 }}>{label}</div>
      <div style={{ fontWeight:700, fontSize:14 }}>{val}</div>
    </div>
  );
}

function PlayerRow({ p, rank, color, selected, onSelect, isBubble }) {
  const bpg = p.estimatedBPG ? `${p.estimatedBPG}†` : p.bpg != null ? `${p.bpg}` : "N/A";
  const spg = p.spg != null ? `${p.spg}` : "N/A";
  return (
    <div onClick={onSelect} style={{ background: selected ? (isBubble?"#1a2a3a":"#1e3050") : (isBubble?"#131e2d":"#1a2535"), border:`1px solid ${selected?"#FFD700":isBubble?"#1e2c3d":"#2a3545"}`, borderRadius:10, padding:"11px 15px", cursor:"pointer", transition:"all 0.15s" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:34, height:34, borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:14, color:isBubble?"#8899aa":"#0f1923", flexShrink:0 }}>{rank}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontWeight:700, fontSize:15, color:isBubble?"#ccd6e0":"#e8eaf0" }}>{p.name}</div>
          <div style={{ fontSize:11, color:"#8899aa", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            {p.ppg} PPG · {p.rpg} RPG · {p.apg} APG · {bpg} BPG · {spg} SPG · {p.rings}🏆
          </div>
        </div>
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <div style={{ fontSize:21, fontWeight:800, color:isBubble?"#8899aa":"#FFD700" }}>{p.score}</div>
          <div style={{ fontSize:10, color:"#556677" }}>SCORE</div>
        </div>
      </div>
      <div style={{ marginTop:7, background:"#0f1923", borderRadius:4, height:5 }}>
        <div style={{ width:`${p.score}%`, height:"100%", background:color, borderRadius:4, transition:"width 0.4s" }} />
      </div>
      {selected && (
        <div style={{ marginTop:13, borderTop:"1px solid #2a3545", paddingTop:11 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(110px, 1fr))", gap:7, marginBottom:11 }}>
            <StatCard label="PPG" val={p.ppg} />
            <StatCard label="RPG" val={p.rpg} />
            <StatCard label="APG" val={p.apg} />
            <StatCard label="BPG" val={bpg} />
            <StatCard label="SPG" val={spg} />
            <StatCard label="PER" val={p.per} />
            <StatCard label="TS%" val={p.ts+"%"} />
            <StatCard label="Playoff PPG" val={p.playoffPPG} />
            <StatCard label="Games" val={p.gp} />
            <StatCard label="Rings" val={p.rings+" 🏆"} />
          </div>
          <p style={{ fontSize:13, color:"#aab8cc", margin:0, lineHeight:1.6 }}>💡 {p.notes}</p>
        </div>
      )}
    </div>
  );
}

function Slider({ label, value, isRings, onChange }) {
  return (
    <div style={{ background: isRings ? "#1a2f1a" : "#0f1923", borderRadius:8, padding:"10px 12px", border:`1px solid ${isRings?"#3a6a3a":"#1e2c3d"}` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
        <span style={{ fontSize:13, fontWeight:600, color: isRings ? "#6dbf67" : "#ccd6e0" }}>{label}</span>
        <span style={{ fontSize:16, fontWeight:800, color:"#FFD700", minWidth:28, textAlign:"right" }}>{value}</span>
      </div>
      <input
        type="range" min={0} max={40} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width:"100%", accentColor: isRings ? "#6dbf67" : "#FFD700", cursor:"pointer" }}
      />
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#445566", marginTop:2 }}>
        <span>0</span><span>20</span><span>40</span>
      </div>
    </div>
  );
}

export default function App() {
  const [w, setW] = useState({ ...defaultWeights });
  const [selected, setSelected] = useState(null);
  const [showBubble, setShowBubble] = useState(false);
  const [showWeights, setShowWeights] = useState(true);
  const [showTextBox, setShowTextBox] = useState(false);
  const textareaRef = useRef(null);

  const ranked = computeScores(players, w);
  const top15 = ranked.slice(0, 15);
  const bubble = ranked.slice(15);
  const listText = top15.map((p, i) => `${i + 1}. ${p.name}`).join("\n");

  function updateWeight(k, val) {
    setW(prev => ({ ...prev, [k]: val }));
    setSelected(null);
    setShowTextBox(false);
  }

  function handleShowText() {
    setShowTextBox(true);
    setTimeout(() => { if (textareaRef.current) { textareaRef.current.focus(); textareaRef.current.select(); } }, 50);
  }

  return (
    <div style={{ fontFamily:"'Segoe UI', sans-serif", background:"#0f1923", minHeight:"100vh", color:"#e8eaf0", padding:"20px 14px" }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>

        <h1 style={{ textAlign:"center", fontSize:24, fontWeight:800, color:"#FFD700", marginBottom:4 }}>🏀 NBA GOAT Rankings</h1>
        <p style={{ textAlign:"center", color:"#8899aa", fontSize:13, marginBottom:6 }}>23 players compete — only the top 15 earn a spot. Adjust weights to build YOUR list.</p>
        <p style={{ textAlign:"center", color:"#445566", fontSize:11, marginBottom:20 }}>† BPG for Wilt (8.15) confirmed Apr 2026 · Russell BPG estimated (8.6) · SPG not tracked pre-1974 for some players</p>

        {/* Weights Panel */}
        <div style={{ background:"#1a2535", borderRadius:12, marginBottom:20, overflow:"hidden" }}>
          <button onClick={() => setShowWeights(v => !v)} style={{ width:"100%", background:"none", border:"none", padding:"13px 16px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:13, color:"#aab8cc", fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>⚖️ Stat Weights</span>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:11, color:"#556677" }}>Total: {Object.values(w).reduce((a,b)=>a+b,0)}</span>
              <span style={{ color:"#FFD700" }}>{showWeights ? "▲" : "▼"}</span>
            </div>
          </button>

          {showWeights && (
            <div style={{ padding:"4px 14px 16px" }}>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {statKeys.map(k => (
                  <Slider
                    key={k}
                    label={statLabels[k]}
                    value={w[k]}
                    isRings={k === "rings"}
                    onChange={val => updateWeight(k, val)}
                  />
                ))}
              </div>
              <button onClick={() => { setW({...defaultWeights}); setSelected(null); }} style={{ marginTop:12, width:"100%", background:"#2a3545", border:"none", color:"#aab8cc", fontSize:12, padding:"9px", borderRadius:8, cursor:"pointer" }}>
                Reset to Defaults
              </button>
            </div>
          )}
        </div>

        {/* Share Button */}
        <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:12 }}>
          <button onClick={handleShowText} style={{ display:"flex", alignItems:"center", gap:8, background:"#1a3050", border:"1px solid #4e9af1", color:"#4e9af1", fontSize:13, fontWeight:600, padding:"8px 16px", borderRadius:8, cursor:"pointer" }}>
            📋 Share My Top 15
          </button>
        </div>

        {/* Text Box */}
        {showTextBox && (
          <div style={{ background:"#1a2535", border:"1px solid #4e9af1", borderRadius:12, padding:16, marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <span style={{ fontSize:13, fontWeight:600, color:"#4e9af1" }}>📱 Tap the list to select, then copy</span>
              <button onClick={() => setShowTextBox(false)} style={{ background:"none", border:"none", color:"#8899aa", fontSize:18, cursor:"pointer" }}>✕</button>
            </div>
            <textarea ref={textareaRef} readOnly value={listText} onClick={e => e.target.select()}
              style={{ width:"100%", boxSizing:"border-box", background:"#0f1923", color:"#e8eaf0", border:"1px solid #2a3545", borderRadius:8, padding:"12px 14px", fontSize:15, lineHeight:1.9, fontFamily:"'Segoe UI', sans-serif", resize:"none", outline:"none", height:`${top15.length * 32 + 16}px` }} />
            <p style={{ fontSize:11, color:"#556677", margin:"8px 0 0", textAlign:"center" }}>Tap text to select all, then copy &amp; paste into your message</p>
          </div>
        )}

        {/* Top 15 */}
        <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:18 }}>
          {top15.map((p, i) => (
            <PlayerRow key={p.name} p={p} rank={i+1} color={RANK_COLORS[i]}
              selected={selected===p.name} onSelect={() => setSelected(selected===p.name?null:p.name)} isBubble={false} />
          ))}
        </div>

        {/* Bubble */}
        <div style={{ background:"#1a2535", borderRadius:12, overflow:"hidden" }}>
          <button onClick={() => setShowBubble(v => !v)} style={{ width:"100%", background:"none", border:"none", padding:"13px 16px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <span style={{ color:"#aab8cc", fontSize:13, fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>Just Missed the Cut</span>
              <span style={{ color:"#556677", fontSize:12, marginLeft:8 }}>({bubble.length} players)</span>
            </div>
            <span style={{ color:"#FFD700" }}>{showBubble?"▲":"▼"}</span>
          </button>
          {showBubble && (
            <div style={{ padding:"0 12px 12px", display:"flex", flexDirection:"column", gap:6 }}>
              {bubble.map((p, i) => (
                <PlayerRow key={p.name} p={p} rank={i+16} color="#2a3545"
                  selected={selected===p.name} onSelect={() => setSelected(selected===p.name?null:p.name)} isBubble={true} />
              ))}
            </div>
          )}
        </div>

        <p style={{ textAlign:"center", fontSize:11, color:"#334455", marginTop:14 }}>
          Set any weight to 0 to remove that stat. Adjust 🏆 Rings to see Russell dominate.
        </p>
      </div>
    </div>
  );
}
