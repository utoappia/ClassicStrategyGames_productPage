var Pp = Object.defineProperty;
var tv = (a, u, c) => u in a ? Pp(a, u, { enumerable: !0, configurable: !0, writable: !0, value: c }) : a[u] = c;
var hs = (a, u, c) => tv(a, typeof u != "symbol" ? u + "" : u, c);
var ys = { exports: {} }, Cu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fh;
function lv() {
  if (fh) return Cu;
  fh = 1;
  var a = Symbol.for("react.transitional.element"), u = Symbol.for("react.fragment");
  function c(f, r, d) {
    var m = null;
    if (d !== void 0 && (m = "" + d), r.key !== void 0 && (m = "" + r.key), "key" in r) {
      d = {};
      for (var p in r)
        p !== "key" && (d[p] = r[p]);
    } else d = r;
    return r = d.ref, {
      $$typeof: a,
      type: f,
      key: m,
      ref: r !== void 0 ? r : null,
      props: d
    };
  }
  return Cu.Fragment = u, Cu.jsx = c, Cu.jsxs = c, Cu;
}
var sh;
function ev() {
  return sh || (sh = 1, ys.exports = lv()), ys.exports;
}
var z = ev();
const $s = "ggr-piece-fade", ks = "ggr-piece-pop", gy = "ggr-piece-drop", wn = "ggr-board-cell", py = "ggr-piece-flip", Js = "ggr-piece-hop", rh = "ggr-board-animations", nv = `
@keyframes ${$s} {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes ${ks} {
  0%   { transform: scale(0); }
  72%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}
@keyframes ${gy} {
  0%   { transform: translateY(var(--ggr-drop, 0)); animation-timing-function: cubic-bezier(0.5, 0, 1, 1); }
  62%  { transform: translateY(0); animation-timing-function: ease-out; }
  79%  { transform: translateY(-9%); animation-timing-function: ease-in; }
  100% { transform: translateY(0); }
}
@keyframes ${wn} {
  from { opacity: 0; transform: scale(0.6); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes ${py} {
  from { transform: rotateY(0deg); }
  to   { transform: rotateY(180deg); }
}
@keyframes ${Js} {
  0%   { transform: translate(var(--hop-x, 0px), var(--hop-y, 0px)); }
  50%  { transform: translate(var(--hop-mx, 0px), var(--hop-my, 0px)); }
  100% { transform: translate(0px, 0px); }
}
`;
function av() {
  if (typeof document > "u" || document.getElementById(rh)) return;
  const a = document.createElement("style");
  a.id = rh, a.textContent = nv, document.head.appendChild(a);
}
const vy = /* @__PURE__ */ new Map();
function ql(a, u) {
  vy.set(a, u);
}
function uv(a) {
  return vy.get(a);
}
function iv(a) {
  let u = a >>> 0;
  return () => {
    u = u + 1831565813 | 0;
    let c = Math.imul(u ^ u >>> 15, 1 | u);
    return c = c + Math.imul(c ^ c >>> 7, 61 | c) ^ c, ((c ^ c >>> 14) >>> 0) / 4294967296;
  };
}
function Hn(a, u) {
  if (a.length === 0) throw new Error("pickRandom: empty array");
  return a[Math.floor(u() * a.length)];
}
function cv(a, u) {
  const c = [...a];
  for (let f = c.length - 1; f > 0; f--) {
    const r = Math.floor(u() * (f + 1));
    [c[f], c[r]] = [c[r], c[f]];
  }
  return c;
}
class ov {
  constructor() {
    hs(this, "games", /* @__PURE__ */ new Map());
  }
  /** Register a game. Throws on a duplicate id. */
  register(u) {
    if (this.games.has(u.id))
      throw new Error(`Game already registered: ${u.id}`);
    this.games.set(u.id, u);
  }
  get(u) {
    return this.games.get(u);
  }
  /** Like {@link get} but throws if the game is unknown. */
  require(u) {
    const c = this.games.get(u);
    if (!c) throw new Error(`Unknown game: ${u}`);
    return c;
  }
  has(u) {
    return this.games.has(u);
  }
  /** Descriptors for every registered game, for lobby/menu screens. */
  catalog() {
    return [...this.games.values()].map((u) => ({
      id: u.id,
      name: u.name,
      minPlayers: u.minPlayers,
      maxPlayers: u.maxPlayers
    }));
  }
}
const Zu = new ov(), fv = [
  "tic-tac-toe",
  "connect-four",
  "gomoku",
  "reversi",
  "chinese-checkers",
  "checkers",
  "chess",
  "xiangqi",
  "nine-mens-morris",
  "shogi",
  "go",
  "big-two"
], sv = 1, dh = 4, rv = Object.freeze({});
function dv(a) {
  return a <= 1 ? 0 : 32 - Math.clz32(a - 1);
}
class hv {
  constructor(u, c) {
    hs(this, "pos");
    this.bytes = u, this.pos = c * 8;
  }
  read(u) {
    let c = 0;
    for (let f = 0; f < u; f++) {
      const r = this.bytes[this.pos >> 3] ?? 0;
      c = c << 1 | r >> 7 - (this.pos & 7) & 1, this.pos++;
    }
    return c;
  }
}
function yv(a, u) {
  let c = 2166136261;
  for (let f = 0; f < u; f++)
    c ^= a[f] ?? 0, c = Math.imul(c, 16777619);
  return c >>> 0;
}
const hh = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
function mv(a) {
  const u = new Int16Array(128).fill(-1);
  for (let d = 0; d < hh.length; d++) u[hh.charCodeAt(d)] = d;
  const c = [];
  let f = 0, r = 0;
  for (let d = 0; d < a.length; d++) {
    const m = u[a.charCodeAt(d)] ?? -1;
    m < 0 || (f = f << 6 | m, r += 6, r >= 8 && (r -= 8, c.push(f >> r & 255)));
  }
  return Uint8Array.from(c);
}
function Sy(a) {
  let u = "";
  for (let c = 0; c < a.length; ) {
    const f = a[c++] ?? 0;
    let r;
    f < 128 ? r = f : f < 224 ? r = (f & 31) << 6 | (a[c++] ?? 0) & 63 : f < 240 ? r = (f & 15) << 12 | ((a[c++] ?? 0) & 63) << 6 | (a[c++] ?? 0) & 63 : r = (f & 7) << 18 | ((a[c++] ?? 0) & 63) << 12 | ((a[c++] ?? 0) & 63) << 6 | (a[c++] ?? 0) & 63, r > 65535 ? (r -= 65536, u += String.fromCharCode(55296 + (r >> 10), 56320 + (r & 1023))) : u += String.fromCharCode(r);
  }
  return u;
}
function gv(a, u, c) {
  return `#${(1 << 24 | a << 16 | u << 8 | c).toString(16).slice(1)}`;
}
function Cs(a) {
  if (a === null || typeof a != "object") return JSON.stringify(a) ?? "null";
  if (Array.isArray(a)) return `[${a.map(Cs).join(",")}]`;
  const u = a;
  return `{${Object.keys(u).sort().map((c) => `${c}:${Cs(u[c])}`).join(",")}}`;
}
function pv(a) {
  return a.map((u) => ({ move: u, key: Cs(u) })).sort((u, c) => u.key < c.key ? -1 : u.key > c.key ? 1 : 0).map((u) => u.move);
}
function vv(a) {
  if (!a) return {};
  let u;
  try {
    u = JSON.parse(a);
  } catch {
    throw new Error("Replay has a corrupt options section");
  }
  if (!u || typeof u != "object" || Array.isArray(u))
    throw new Error("Replay options section is not an object");
  return u;
}
function Sv(a, u, c) {
  const f = [];
  for (let m = 0; m < u; m++)
    f.push({ id: `p${m}`, name: `P${m + 1}`, kind: "human", seat: m });
  const r = typeof c?.seed == "number" ? c.seed : 0, d = { gameId: a, players: f, seed: r };
  return c && Object.keys(c).length > 0 && (d.options = { ...c }), d;
}
function bv(a, u, c) {
  let f = u;
  const r = [];
  for (let d = 0; d < c; d++) {
    const m = gv(a[f] ?? 0, a[f + 1] ?? 0, a[f + 2] ?? 0), p = a[f + 3] ?? 0;
    f += 4, r.push({ name: Sy(a.subarray(f, f + p)), color: m }), f += p;
  }
  return { players: r, pos: f };
}
function Du(a, u, c) {
  let f = 0;
  for (let r = 0; r < c; r++) f = f * 256 + (a[u + r] ?? 0);
  return f;
}
function Mv(a) {
  const u = Du(a, 0, 2);
  if (u !== sv) throw new Error(`Unsupported replay version ${u}`);
  const c = fv[Du(a, 2, 2)];
  if (!c) throw new Error("Replay names an unknown game");
  const f = Du(a, 4, 2), r = Du(a, 6, 4), d = Du(a, 10, 4), m = 14, p = vv(Sy(a.subarray(m, m + d))), { players: g, pos: y } = bv(a, m + d, f), v = Object.keys(p).length > 0 ? p : rv;
  return { meta: { gameId: c, playerCount: f, players: g, options: v }, moveCount: r, bodyAt: y };
}
function Ev(a) {
  if (a.length <= dh) throw new Error("Replay is truncated");
  const u = a.length - dh, c = ((a[u] ?? 0) << 24 | (a[u + 1] ?? 0) << 16 | (a[u + 2] ?? 0) << 8 | (a[u + 3] ?? 0)) >>> 0;
  if (yv(a, u) !== c)
    throw new Error("Replay failed its integrity check — the link is corrupted or incomplete");
}
function xv(a) {
  const u = mv(a);
  Ev(u);
  const { meta: c, moveCount: f, bodyAt: r } = Mv(u), d = Zu.get(c.gameId);
  if (!d) throw new Error(`Game not registered: ${c.gameId}`);
  const m = new hv(u, r), p = [];
  let g = d.createInitialState(
    Sv(c.gameId, c.playerCount, c.options)
  );
  for (let y = 0; y < f; y++) {
    const v = pv(d.getLegalMoves(g)), b = v[m.read(dv(v.length))];
    if (b === void 0) throw new Error("Corrupt replay: move index out of range");
    p.push(b), g = d.applyMove(g, b);
  }
  return {
    gameId: c.gameId,
    playerCount: c.playerCount,
    players: c.players,
    options: c.options,
    moves: p
  };
}
const Tv = {
  id: "random",
  label: "Random",
  async selectMove(a) {
    return Hn(a.legalMoves, a.rng);
  }
}, Vu = 1e6, an = Vu - 1e4, by = 40, My = () => new Promise((a) => setTimeout(a, 0)), Av = 8;
class Ey extends Error {
}
function zv(a, u) {
  return a > an ? a + u : a < -an ? a - u : a;
}
function _v(a, u) {
  return a > an ? a - u : a < -an ? a + u : a;
}
const Ov = 4095;
async function xy(a) {
  if (a.nodes++, (a.nodes & Ov) === 0) {
    const u = Date.now();
    if (u > a.deadline) throw new Ey();
    u - a.lastYield >= by && (await My(), a.deadline += Date.now() - u, a.lastYield = Date.now());
  }
}
function Ty(a, u) {
  const c = a.getCandidateMoves?.(u);
  return c && c.length > 0 ? c : a.getLegalMoves(u);
}
function Ay(a, u, c, f, r) {
  if (!a.ordered && f == null) return c;
  const { def: d } = a, m = f != null && d.moveKey != null ? d.moveKey(f) : null, p = a.killers[r], g = c.map((y) => {
    const v = d.moveKey != null ? d.moveKey(y) : null;
    let b = 0;
    return m != null && v === m ? b = 1e12 : (d.scoreMoveForOrdering != null && (b += d.scoreMoveForOrdering(u, y) * 1e3), p != null && v != null && (p[0] === v || p[1] === v) && (b += 900), a.history != null && v != null && (b += a.history.get(v) ?? 0)), { move: y, s: b };
  });
  return g.sort((y, v) => v.s - y.s), g.map((y) => y.move);
}
function Cv(a, u, c, f) {
  var m;
  if (a.def.moveKey == null) return;
  const r = a.def.moveKey(u), d = (m = a.killers)[c] ?? (m[c] = [null, null]);
  d[0] !== r && (d[1] = d[0], d[0] = r), a.history != null && a.history.set(r, (a.history.get(r) ?? 0) + f * f);
}
async function zy(a, u, c, f, r, d) {
  await xy(a);
  const m = a.def.getStatus(u);
  if (m.state === "win")
    return m.winners.includes(a.me) ? Vu - c : c - Vu;
  if (m.state === "draw") return 0;
  const p = a.def.evaluate ? a.def.evaluate(u, a.me) : 0, g = a.def.getCurrentSeat(u);
  if (g == null) return p;
  const y = g === a.me;
  let v = p;
  if (y) {
    if (v >= r) return v;
    v > f && (f = v);
  } else {
    if (v <= f) return v;
    v < r && (r = v);
  }
  if (d <= 0) return v;
  const b = a.def.getTacticalMoves(u);
  if (b.length === 0) return v;
  for (const R of Ay(a, u, b, null, c)) {
    const N = await zy(a, a.def.applyMove(u, R), c + 1, f, r, d - 1);
    if (y ? (N > v && (v = N), v > f && (f = v)) : (N < v && (v = N), v < r && (r = v)), f >= r) break;
  }
  return v;
}
async function _y(a, u, c, f, r, d) {
  await xy(a);
  const m = a.def.getStatus(u);
  if (m.state === "win")
    return m.winners.includes(a.me) ? Vu - f : f - Vu;
  if (m.state === "draw") return 0;
  if (c <= 0)
    return a.hitDepthLimit = !0, a.def.getTacticalMoves != null && a.def.evaluate != null ? zy(a, u, f, r, d, Av) : a.def.evaluate ? a.def.evaluate(u, a.me) : 0;
  const p = a.tt != null && a.def.hash != null ? a.def.hash(u) : null, g = r, y = d;
  let v = null;
  if (p != null && a.tt != null) {
    const w = a.tt.get(p);
    if (w != null && (v = w.bestMove, w.depth >= c)) {
      const X = _v(w.score, f);
      if (w.flag === "exact" || (w.flag === "lower" && X > r ? r = X : w.flag === "upper" && X < d && (d = X), r >= d)) return X;
    }
  }
  const b = a.def.getCurrentSeat(u);
  if (b == null) return 0;
  const R = b === a.me;
  let N = R ? -1 / 0 : 1 / 0, Q = null;
  const W = Ay(a, u, Ty(a.def, u), v, f);
  for (const w of W) {
    const X = await _y(a, a.def.applyMove(u, w), c - 1, f + 1, r, d);
    if (R ? (X > N && (N = X, Q = w), N > r && (r = N)) : (X < N && (N = X, Q = w), N < d && (d = N)), r >= d) {
      Cv(a, w, f, c);
      break;
    }
  }
  if (p != null && a.tt != null) {
    let w;
    R ? w = N >= y ? "lower" : N <= g ? "upper" : "exact" : w = N <= g ? "upper" : N >= y ? "lower" : "exact", a.tt.set(p, { score: zv(N, f), depth: c, flag: w, bestMove: Q });
  }
  return N;
}
function Dv(a, u, c) {
  let f = -1 / 0;
  for (const v of a) v.value > f && (f = v.value);
  if (f >= an) {
    const v = a.filter((b) => b.value >= an).map((b) => b.move);
    return Hn(v, c);
  }
  let r = a.filter((v) => v.value > -an);
  if (r.length === 0 && (r = [...a]), u <= 0) {
    const v = r.filter((b) => b.value === f).map((b) => b.move);
    return Hn(v, c);
  }
  let d = 1 / 0, m = -1 / 0;
  for (const v of r)
    v.value < d && (d = v.value), v.value > m && (m = v.value);
  const p = m - d;
  if (p === 0) return Hn(r.map((v) => v.move), c);
  let g = r[0].move, y = -1 / 0;
  for (const v of r) {
    const b = v.value + (c() * 2 - 1) * u * p;
    b > y && (y = b, g = v.move);
  }
  return g;
}
function Oy(a) {
  return {
    id: a.id,
    label: a.label,
    async selectMove(u) {
      const { definition: c, state: f, seat: r, rng: d } = u, m = Ty(c, f);
      if (m.length === 1) return m[0];
      if (a.blunderChance > 0 && d() < a.blunderChance)
        return Hn(m, d);
      const p = c.hash != null ? /* @__PURE__ */ new Map() : null, g = {
        def: c,
        me: r,
        deadline: Date.now() + a.timeBudgetMs,
        hitDepthLimit: !1,
        tt: p,
        killers: [],
        history: c.moveKey != null ? /* @__PURE__ */ new Map() : null,
        ordered: c.scoreMoveForOrdering != null || c.moveKey != null,
        nodes: 0,
        lastYield: Date.now()
      }, y = async () => {
        if (Date.now() - g.lastYield < by) return;
        const b = Date.now();
        await My(), g.deadline += Date.now() - b, g.lastYield = Date.now();
      };
      let v = m.map((b) => ({ move: b, value: 0 }));
      for (let b = 1; b <= a.maxDepth; b++) {
        g.hitDepthLimit = !1;
        let R = -1 / 0;
        const N = [];
        let Q = !1;
        const W = [...v].sort((w, X) => X.value - w.value).map((w) => w.move);
        try {
          for (const w of W) {
            const X = await _y(g, c.applyMove(f, w), b - 1, 1, -1 / 0, 1 / 0);
            N.push({ move: w, value: X }), X > R && (R = X), await y();
          }
        } catch (w) {
          if (w instanceof Ey) Q = !0;
          else throw w;
        }
        if (Q || (v = N, !g.hitDepthLimit) || Math.abs(R) >= an) break;
      }
      return Dv(v, a.variety, d);
    }
  };
}
Oy({
  id: "minimax",
  label: "Minimax",
  timeBudgetMs: 1e3,
  maxDepth: 64,
  blunderChance: 0,
  // Subtle: only varies between genuinely close moves, so tactics are intact.
  variety: 0.12
});
const Rv = Oy({
  id: "minimax-imperfect",
  label: "Minimax (imperfect)",
  timeBudgetMs: 150,
  maxDepth: 64,
  blunderChance: 0.3,
  // More willing to take a near-best alternative — livelier, still sensible.
  variety: 0.3
});
Array.from({ length: 64 }, (a, u) => 1n << BigInt(u));
const yh = [
  100,
  -20,
  10,
  5,
  5,
  10,
  -20,
  100,
  -20,
  -40,
  -5,
  -5,
  -5,
  -5,
  -40,
  -20,
  10,
  -5,
  15,
  3,
  3,
  15,
  -5,
  10,
  5,
  -5,
  3,
  3,
  3,
  3,
  -5,
  5,
  5,
  -5,
  3,
  3,
  3,
  3,
  -5,
  5,
  10,
  -5,
  15,
  3,
  3,
  15,
  -5,
  10,
  -20,
  -40,
  -5,
  -5,
  -5,
  -5,
  -40,
  -20,
  100,
  -20,
  10,
  5,
  5,
  10,
  -20,
  100
];
Array.from({ length: 64 }, (a, u) => u).sort(
  (a, u) => yh[u] - yh[a]
);
(() => {
  const a = Array.from({ length: 8 }, () => new Array(64));
  for (let u = 0; u < 64; u++) {
    const c = u >> 3, f = u & 7;
    a[0][u] = c * 8 + f, a[1][u] = c * 8 + (7 - f), a[2][u] = (7 - c) * 8 + f, a[3][u] = (7 - c) * 8 + (7 - f), a[4][u] = f * 8 + c, a[5][u] = (7 - f) * 8 + (7 - c), a[6][u] = f * 8 + (7 - c), a[7][u] = (7 - f) * 8 + c;
  }
  return a;
})();
Array.from({ length: 64 }, (a, u) => 1n << BigInt(u));
const Cy = 9, Dy = 10, Ha = Cy, za = Dy, jv = 120, Oa = (a) => Math.floor(a / Ha), Tc = (a) => a % Ha, kt = (a, u) => a * Ha + u, Ru = (a, u) => a >= 0 && a < za && u >= 0 && u < Ha, Hc = (a) => a === 0 ? 1 : 0, Nv = (a) => a === 0 ? -1 : 1;
function mh(a, u, c) {
  return c < 3 || c > 5 ? !1 : a === 0 ? u >= 7 && u <= 9 : u >= 0 && u <= 2;
}
function Ds(a, u) {
  return a === 0 ? u >= 5 : u <= 4;
}
const ms = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
], gh = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1]
], Uv = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1]
];
function Ry(a, u) {
  const c = a[u];
  if (!c) return [];
  const f = c.seat, r = Oa(u), d = Tc(u), m = [], p = (g, y) => {
    if (!Ru(g, y)) return;
    const v = a[kt(g, y)];
    (!v || v.seat !== f) && m.push({ from: u, to: kt(g, y) });
  };
  switch (c.type) {
    case "g":
      for (const [g, y] of ms)
        mh(f, r + g, d + y) && p(r + g, d + y);
      break;
    case "a":
      for (const [g, y] of gh)
        mh(f, r + g, d + y) && p(r + g, d + y);
      break;
    case "e":
      for (const [g, y] of gh)
        !(Ru(r + g, d + y) ? a[kt(r + g, d + y)] : c) && Ds(f, r + 2 * g) && p(r + 2 * g, d + 2 * y);
      break;
    case "h":
      for (const [g, y] of Uv) {
        const v = r + (Math.abs(g) === 2 ? g / 2 : 0), b = d + (Math.abs(y) === 2 ? y / 2 : 0);
        Ru(v, b) && a[kt(v, b)] == null && p(r + g, d + y);
      }
      break;
    case "r":
      for (const [g, y] of ms) {
        let v = r + g, b = d + y;
        for (; Ru(v, b); ) {
          const R = a[kt(v, b)];
          if (!R) m.push({ from: u, to: kt(v, b) });
          else {
            R.seat !== f && m.push({ from: u, to: kt(v, b) });
            break;
          }
          v += g, b += y;
        }
      }
      break;
    case "c":
      for (const [g, y] of ms) {
        let v = r + g, b = d + y, R = !1;
        for (; Ru(v, b); ) {
          const N = a[kt(v, b)];
          if (!R)
            N ? R = !0 : m.push({ from: u, to: kt(v, b) });
          else if (N) {
            N.seat !== f && m.push({ from: u, to: kt(v, b) });
            break;
          }
          v += g, b += y;
        }
      }
      break;
    case "s": {
      p(r + Nv(f), d), Ds(f, r) || (p(r, d - 1), p(r, d + 1));
      break;
    }
  }
  return m;
}
function ph(a, u) {
  for (let c = 0; c < a.length; c++) {
    const f = a[c];
    if (f && f.seat === u && f.type === "g") return c;
  }
  return -1;
}
function Hv(a, u) {
  const c = ph(a, u);
  if (c < 0) return !0;
  const f = ph(a, Hc(u));
  if (f >= 0 && Tc(c) === Tc(f)) {
    const r = Math.min(Oa(c), Oa(f)), d = Math.max(Oa(c), Oa(f));
    let m = !1;
    for (let p = r + 1; p < d; p++)
      if (a[kt(p, Tc(c))] != null) {
        m = !0;
        break;
      }
    if (!m) return !0;
  }
  for (let r = 0; r < a.length; r++)
    if (a[r]?.seat === Hc(u)) {
      for (const d of Ry(a, r))
        if (d.to === c) return !0;
    }
  return !1;
}
function Ws(a) {
  const u = [];
  for (let c = 0; c < a.board.length; c++)
    if (a.board[c]?.seat === a.currentSeat)
      for (const f of Ry(a.board, c)) {
        const r = [...a.board];
        r[f.to] = r[f.from], r[f.from] = null, Hv(r, a.currentSeat) || u.push(f);
      }
  return u;
}
function Ac(a) {
  return a.idlePlies >= jv ? { state: "draw" } : Ws(a).length === 0 ? { state: "win", winners: [Hc(a.currentSeat)] } : { state: "playing" };
}
function vh(a, u) {
  return Ac(a).state !== "playing" ? !1 : Ws(a).some((c) => c.from === u.from && c.to === u.to);
}
const Sh = ["r", "h", "e", "a", "g", "a", "e", "h", "r"], Bv = {
  g: 0,
  a: 2,
  e: 2,
  h: 4,
  r: 9,
  c: 4.5,
  s: 1
}, Lv = {
  id: "xiangqi",
  name: "Chinese Chess",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    const u = Array(Ha * za).fill(null);
    for (let c = 0; c < Ha; c++)
      u[kt(0, c)] = { seat: 1, type: Sh[c] }, u[kt(za - 1, c)] = { seat: 0, type: Sh[c] };
    u[kt(2, 1)] = { seat: 1, type: "c" }, u[kt(2, 7)] = { seat: 1, type: "c" }, u[kt(za - 3, 1)] = { seat: 0, type: "c" }, u[kt(za - 3, 7)] = { seat: 0, type: "c" };
    for (const c of [0, 2, 4, 6, 8])
      u[kt(3, c)] = { seat: 1, type: "s" }, u[kt(za - 4, c)] = { seat: 0, type: "s" };
    return { board: u, currentSeat: 0, idlePlies: 0, lastMove: null };
  },
  getStatus: Ac,
  getCurrentSeat(a) {
    return Ac(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return Ac(a).state === "playing" ? Ws(a) : [];
  },
  isLegalMove: vh,
  applyMove(a, u) {
    if (!vh(a, u))
      throw new Error(`Illegal Xiangqi move: ${u.from} -> ${u.to}`);
    const c = a.board[u.to] != null, f = [...a.board];
    return f[u.to] = f[u.from], f[u.from] = null, {
      board: f,
      currentSeat: Hc(a.currentSeat),
      idlePlies: c ? 0 : a.idlePlies + 1,
      lastMove: { from: u.from, to: u.to }
    };
  },
  evaluate(a, u) {
    let c = 0;
    for (let f = 0; f < a.board.length; f++) {
      const r = a.board[f];
      if (!r) continue;
      let d = Bv[r.type];
      r.type === "s" && !Ds(r.seat, Oa(f)) && (d += 1), c += r.seat === u ? d : -d;
    }
    return c;
  }
}, Yv = 9, wv = 10, Gv = ["g", "a", "e", "h", "r", "c", "s"], Fs = Yv * wv * 2 * Gv.length, qv = new Int32Array(Fs), Xv = new Int32Array(Fs);
(() => {
  let a = 2654435769;
  const u = () => {
    a = a + 1831565813 | 0;
    let c = Math.imul(a ^ a >>> 15, 1 | a);
    return c = c + Math.imul(c ^ c >>> 7, 61 | c) ^ c, c ^ c >>> 14 | 0;
  };
  for (let c = 0; c < Fs; c++)
    qv[c] = u(), Xv[c] = u();
  u(), u();
})();
function jy(a) {
  return {
    id: a.id,
    label: a.label,
    async selectMove(u) {
      u.state;
      const c = u.legalMoves;
      return c.length <= 1 ? c[0] ?? { from: -1, to: -1 } : u.rng() < a.blunder ? Hn(c, u.rng) : a.fallback(u);
    }
  };
}
jy({
  id: "xiangqi-medium",
  label: "Xiangqi engine (medium)",
  maxDepth: 6,
  budgetMs: 1200,
  blunder: 0.1,
  fallback: (a) => Rv.selectMove(a)
});
jy({
  id: "xiangqi-easy",
  label: "Xiangqi engine (easy)",
  maxDepth: 4,
  budgetMs: 600,
  blunder: 0.25,
  fallback: (a) => Tv.selectMove(a)
});
const Ny = 8, Kt = Ny, te = (a) => Math.floor(a / Kt), xe = (a) => a % Kt, it = (a, u) => a * Kt + u, Me = (a, u) => a >= 0 && a < Kt && u >= 0 && u < Kt, Ee = (a) => a === 0 ? 1 : 0, Uy = (a) => a === 0 ? -1 : 1, Hy = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1]
], Is = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1]
], Ps = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
], Rs = [...Is, ...Ps], bh = ["r", "n", "b", "q", "k", "b", "n", "r"];
function jn(a, u, c) {
  const f = te(u), r = xe(u), d = f - Uy(c);
  for (const p of [-1, 1])
    if (Me(d, r + p)) {
      const g = a[it(d, r + p)];
      if (g && g.seat === c && g.type === "p") return !0;
    }
  for (const [p, g] of Hy)
    if (Me(f + p, r + g)) {
      const y = a[it(f + p, r + g)];
      if (y && y.seat === c && y.type === "n") return !0;
    }
  for (const [p, g] of Rs)
    if (Me(f + p, r + g)) {
      const y = a[it(f + p, r + g)];
      if (y && y.seat === c && y.type === "k") return !0;
    }
  const m = [
    [Is, "b"],
    [Ps, "r"]
  ];
  for (const [p, g] of m)
    for (const [y, v] of p) {
      let b = f + y, R = r + v;
      for (; Me(b, R); ) {
        const N = a[it(b, R)];
        if (N) {
          if (N.seat === c && (N.type === g || N.type === "q")) return !0;
          break;
        }
        b += y, R += v;
      }
    }
  return !1;
}
function By(a, u) {
  for (let c = 0; c < a.length; c++) {
    const f = a[c];
    if (f && f.seat === u && f.type === "k") return c;
  }
  return -1;
}
function Qv(a, u) {
  const c = a.board, f = c[u];
  if (!f) return [];
  const r = f.seat, d = te(u), m = xe(u), p = [], g = (y) => {
    p.push({ from: u, to: y });
  };
  if (f.type === "p") {
    const y = Uy(r), v = r === 0 ? Kt - 2 : 1, b = r === 0 ? 0 : Kt - 1, R = it(d + y, m);
    Me(d + y, m) && c[R] == null && (d + y === b ? p.push({ from: u, to: R, promotion: "q" }) : p.push({ from: u, to: R }), d === v && c[it(d + 2 * y, m)] == null && g(it(d + 2 * y, m)));
    for (const N of [-1, 1]) {
      if (!Me(d + y, m + N)) continue;
      const Q = it(d + y, m + N), W = c[Q];
      (W && W.seat !== r || Q === a.enPassant) && (d + y === b ? p.push({ from: u, to: Q, promotion: "q" }) : p.push({ from: u, to: Q }));
    }
  } else if (f.type === "n")
    for (const [y, v] of Hy) {
      if (!Me(d + y, m + v)) continue;
      const b = c[it(d + y, m + v)];
      (!b || b.seat !== r) && g(it(d + y, m + v));
    }
  else if (f.type === "k") {
    for (const [v, b] of Rs) {
      if (!Me(d + v, m + b)) continue;
      const R = c[it(d + v, m + b)];
      (!R || R.seat !== r) && g(it(d + v, m + b));
    }
    const y = r === 0 ? Kt - 1 : 0;
    if (d === y && m === 4 && !jn(c, u, Ee(r))) {
      const v = r === 0 ? a.castling.s0k : a.castling.s1k, b = r === 0 ? a.castling.s0q : a.castling.s1q;
      v && c[it(y, 5)] == null && c[it(y, 6)] == null && c[it(y, 7)]?.type === "r" && !jn(c, it(y, 5), Ee(r)) && !jn(c, it(y, 6), Ee(r)) && g(it(y, 6)), b && c[it(y, 1)] == null && c[it(y, 2)] == null && c[it(y, 3)] == null && c[it(y, 0)]?.type === "r" && !jn(c, it(y, 3), Ee(r)) && !jn(c, it(y, 2), Ee(r)) && g(it(y, 2));
    }
  } else {
    const y = f.type === "b" ? Is : f.type === "r" ? Ps : Rs;
    for (const [v, b] of y) {
      let R = d + v, N = m + b;
      for (; Me(R, N); ) {
        const Q = c[it(R, N)];
        if (!Q) g(it(R, N));
        else {
          Q.seat !== r && g(it(R, N));
          break;
        }
        R += v, N += b;
      }
    }
  }
  return p;
}
function Ly(a, u) {
  const c = [...a.board], f = c[u.from];
  if (c[u.from] = null, f.type === "p" && u.to === a.enPassant && c[u.to] == null && (c[it(te(u.from), xe(u.to))] = null), c[u.to] = u.promotion ? { seat: f.seat, type: "q" } : f, f.type === "k" && Math.abs(xe(u.to) - xe(u.from)) === 2) {
    const r = te(u.from);
    xe(u.to) === 6 ? (c[it(r, 5)] = c[it(r, 7)], c[it(r, 7)] = null) : (c[it(r, 3)] = c[it(r, 0)], c[it(r, 0)] = null);
  }
  return c;
}
function Bc(a) {
  const u = a.currentSeat, c = [];
  for (let f = 0; f < a.board.length; f++)
    if (a.board[f]?.seat === u)
      for (const r of Qv(a, f)) {
        const d = Ly(a, r);
        jn(d, By(d, u), Ee(u)) || c.push(r);
      }
  return c;
}
function Lu(a) {
  if (a.halfmove >= 100) return { state: "draw" };
  if (Bc(a).length > 0) return { state: "playing" };
  const u = By(a.board, a.currentSeat);
  return jn(a.board, u, Ee(a.currentSeat)) ? { state: "win", winners: [Ee(a.currentSeat)] } : { state: "draw" };
}
function Mh(a, u) {
  return Lu(a).state !== "playing" ? !1 : Bc(a).some(
    (c) => c.from === u.from && c.to === u.to && c.promotion === u.promotion
  );
}
const Zv = { p: 1, n: 3, b: 3.2, r: 5, q: 9, k: 0 }, Eh = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 100 }, Zc = ["p", "n", "b", "r", "q", "k"], js = new Int32Array(Kt * Kt * 2 * Zc.length), Yy = new Int32Array(Kt * Kt * 2 * Zc.length);
let wy = 0, Gy = 0;
(() => {
  let a = 2654435769;
  const u = () => {
    a = a + 1831565813 | 0;
    let c = Math.imul(a ^ a >>> 15, 1 | a);
    return c = c + Math.imul(c ^ c >>> 7, 61 | c) ^ c, c ^ c >>> 14 | 0;
  };
  for (let c = 0; c < js.length; c++)
    js[c] = u(), Yy[c] = u();
  wy = u(), Gy = u();
})();
const Vv = (a, u, c) => (a * 2 + u) * Zc.length + c;
function Kv(a) {
  return (a.s0k ? 1 : 0) | (a.s0q ? 2 : 0) | (a.s1k ? 4 : 0) | (a.s1q ? 8 : 0);
}
const $v = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5, 5, 10, 25, 25, 10, 5, 5],
  [0, 0, 0, 20, 20, 0, 0, 0],
  [5, -5, -10, 0, 0, -10, -5, 5],
  [5, 10, 10, -20, -20, 10, 10, 5],
  [0, 0, 0, 0, 0, 0, 0, 0]
], kv = [
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20, 0, 0, 0, 0, -20, -40],
  [-30, 0, 10, 15, 15, 10, 0, -30],
  [-30, 5, 15, 20, 20, 15, 5, -30],
  [-30, 0, 15, 20, 20, 15, 0, -30],
  [-30, 5, 10, 15, 15, 10, 5, -30],
  [-40, -20, 0, 5, 5, 0, -20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50]
], Jv = [
  [-20, -10, -10, -10, -10, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 10, 10, 5, 0, -10],
  [-10, 5, 5, 10, 10, 5, 5, -10],
  [-10, 0, 10, 10, 10, 10, 0, -10],
  [-10, 10, 10, 10, 10, 10, 10, -10],
  [-10, 5, 0, 0, 0, 0, 5, -10],
  [-20, -10, -10, -10, -10, -10, -10, -20]
], Wv = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [5, 10, 10, 10, 10, 10, 10, 5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [0, 0, 0, 5, 5, 0, 0, 0]
], Fv = [
  [-20, -10, -10, -5, -5, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 5, 5, 5, 0, -10],
  [-5, 0, 5, 5, 5, 5, 0, -5],
  [0, 0, 5, 5, 5, 5, 0, -5],
  [-10, 5, 5, 5, 5, 5, 0, -10],
  [-10, 0, 5, 0, 0, 0, 0, -10],
  [-20, -10, -10, -5, -5, -10, -10, -20]
], Iv = [
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-20, -30, -30, -40, -40, -30, -30, -20],
  [-10, -20, -20, -20, -20, -20, -20, -10],
  [20, 20, 0, 0, 0, 0, 20, 20],
  [20, 30, 10, 0, 0, 10, 30, 20]
], Pv = {
  p: $v,
  n: kv,
  b: Jv,
  r: Wv,
  q: Fv,
  k: Iv
};
function t2(a, u, c, f) {
  const r = u === 0 ? c : Kt - 1 - c;
  return Pv[a][r][f] / 100;
}
function l2(a, u) {
  return a.board[u.to] != null || u.promotion != null ? !0 : a.board[u.from]?.type === "p" && u.to === a.enPassant;
}
function e2(a, u, c, f) {
  let { s0k: r, s0q: d, s1k: m, s1q: p } = a;
  f.type === "k" && (f.seat === 0 ? (r = !1, d = !1) : (m = !1, p = !1));
  for (const g of [u, c])
    g === it(Kt - 1, 7) && (r = !1), g === it(Kt - 1, 0) && (d = !1), g === it(0, 7) && (m = !1), g === it(0, 0) && (p = !1);
  return { s0k: r, s0q: d, s1k: m, s1q: p };
}
const n2 = {
  id: "chess",
  name: "Chess",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    const u = Array(Kt * Kt).fill(null);
    for (let c = 0; c < Kt; c++)
      u[it(0, c)] = { seat: 1, type: bh[c] }, u[it(1, c)] = { seat: 1, type: "p" }, u[it(Kt - 2, c)] = { seat: 0, type: "p" }, u[it(Kt - 1, c)] = { seat: 0, type: bh[c] };
    return {
      board: u,
      currentSeat: 0,
      castling: { s0k: !0, s0q: !0, s1k: !0, s1q: !0 },
      enPassant: null,
      halfmove: 0,
      lastMove: null
    };
  },
  getStatus: Lu,
  getCurrentSeat(a) {
    return Lu(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return Lu(a).state === "playing" ? Bc(a) : [];
  },
  isLegalMove: Mh,
  applyMove(a, u) {
    if (!Mh(a, u))
      throw new Error(`Illegal Chess move: ${u.from} -> ${u.to}`);
    const c = a.board[u.from], f = a.board[u.to] != null, r = c.type === "p", d = Ly(a, u), m = r && Math.abs(te(u.to) - te(u.from)) === 2 ? it((te(u.from) + te(u.to)) / 2, xe(u.from)) : null;
    return {
      board: d,
      currentSeat: Ee(a.currentSeat),
      castling: e2(a.castling, u.from, u.to, c),
      enPassant: m,
      halfmove: f || r ? 0 : a.halfmove + 1,
      lastMove: { from: u.from, to: u.to }
    };
  },
  /**
   * Heuristic score from `seat`'s view (higher = better). Material (the
   * dominant term) plus a piece-square-table positional refinement — each PST
   * value is in centipawns (÷100), small relative to a pawn so material still
   * drives the evaluation.
   */
  evaluate(a, u) {
    let c = 0;
    for (let f = 0; f < a.board.length; f++) {
      const r = a.board[f];
      if (!r) continue;
      const d = Zv[r.type] + t2(r.type, r.seat, te(f), xe(f));
      c += r.seat === u ? d : -d;
    }
    return c;
  },
  /** Zobrist key (two 32-bit halves) over pieces + side, plus castling/e.p. */
  hash(a) {
    let u = 0, c = 0;
    for (let f = 0; f < a.board.length; f++) {
      const r = a.board[f];
      if (!r) continue;
      const d = Vv(f, r.seat, Zc.indexOf(r.type));
      u ^= js[d], c ^= Yy[d];
    }
    return a.currentSeat === 1 && (u ^= wy, c ^= Gy), `${(u >>> 0).toString(36)}:${(c >>> 0).toString(36)}:${Kv(
      a.castling
    )}:${a.enPassant ?? "-"}`;
  },
  /**
   * Move-ordering score: captures first, ranked by most-valuable-victim /
   * least-valuable-attacker (MVV-LVA). Quiet moves score 0. Improves alpha-beta
   * cutoffs; never affects the position's value.
   */
  scoreMoveForOrdering(a, u) {
    const c = a.board[u.from];
    let f = a.board[u.to];
    return !f && c?.type === "p" && u.to === a.enPassant && (f = a.board[it(te(u.from), xe(u.to))]), f ? 10 * Eh[f.type] - (c ? Eh[c.type] : 0) : 0;
  },
  /**
   * Quiescence moves: captures (incl. en passant) and promotions. Captures
   * remove a piece and promotions exhaust a pawn's last rank, so the set shrinks
   * toward quiet and the search terminates. Excludes checks to keep it bounded.
   */
  getTacticalMoves(a) {
    return Lu(a).state !== "playing" ? [] : Bc(a).filter((u) => l2(a, u));
  },
  moveKey(a) {
    return `${a.from}-${a.to}-${a.promotion ?? ""}`;
  }
}, a2 = 1.414, u2 = 200, i2 = 16, c2 = 40, o2 = () => new Promise((a) => setTimeout(a, 0));
function Lc(a, u) {
  const c = a.getCandidateMoves?.(u);
  return c && c.length > 0 ? c : a.getLegalMoves(u);
}
function xh(a, u, c) {
  const f = a.getStatus(u).state !== "playing";
  return {
    state: u,
    seat: a.getCurrentSeat(u),
    move: c,
    untried: f ? [] : Lc(a, u),
    children: [],
    visits: 0,
    value: 0,
    terminal: f
  };
}
function qy(a, u, c) {
  const f = a.getStatus(u);
  return f.state === "win" ? f.winners.includes(c) ? 1 : 0 : 0.5;
}
function f2(a, u, c, f) {
  let r = u;
  for (let m = 0; m < u2; m++) {
    if (a.getStatus(r).state !== "playing") return qy(a, r, c);
    const p = Lc(a, r);
    if (p.length === 0) return 0.5;
    r = a.applyMove(r, p[Math.floor(f() * p.length)]);
  }
  if (!a.evaluate) return 0.5;
  const d = a.evaluate(r, c);
  return d > 0 ? 1 : d < 0 ? 0 : 0.5;
}
function Xy(a) {
  return {
    id: a.id,
    label: a.label,
    async selectMove(u) {
      const { definition: c, state: f, seat: r, rng: d } = u;
      if (Lc(c, f).length === 1) return Lc(c, f)[0];
      const m = xh(c, f, null);
      let p = a.timeBudgetMs, g = Date.now(), y = g;
      for (; p > 0 && !(Date.now() - g >= p); ) {
        for (let R = 0; R < i2; R++) {
          const N = [m];
          let Q = m;
          for (; !Q.terminal && Q.untried.length === 0 && Q.children.length > 0; ) {
            const w = Math.log(Q.visits);
            let X = Q.children[0], Z = -1 / 0;
            for (const V of Q.children) {
              const j = V.value / V.visits, T = (Q.seat === r ? j : 1 - j) + a2 * Math.sqrt(w / V.visits);
              T > Z && (Z = T, X = V);
            }
            Q = X, N.push(Q);
          }
          if (!Q.terminal && Q.untried.length > 0) {
            const w = Q.untried.splice(Math.floor(d() * Q.untried.length), 1)[0], X = xh(c, c.applyMove(Q.state, w), w);
            Q.children.push(X), N.push(X), Q = X;
          }
          const W = Q.terminal ? qy(c, Q.state, r) : f2(c, Q.state, r, d);
          for (const w of N)
            w.visits++, w.value += W;
        }
        const b = Date.now();
        b - y >= c2 && (p -= b - g, await o2(), g = Date.now(), y = g);
      }
      let v = null;
      for (const b of m.children)
        (v == null || b.visits > v.visits) && (v = b);
      return v != null && v.move != null ? v.move : Hn(u.legalMoves, d);
    }
  };
}
Xy({ id: "mcts", label: "MCTS", timeBudgetMs: 1e4 });
Xy({
  id: "mcts-lite",
  label: "MCTS (quick)",
  timeBudgetMs: 900
});
const s2 = 4, r2 = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"], d2 = ["♦", "♣", "♥", "♠"], Ie = (a) => a >> 2, Ns = (a) => a & 3;
function h2(a, u) {
  const c = [], f = [], r = (d) => {
    if (f.length === u) {
      c.push([...f]);
      return;
    }
    for (let m = d; m <= a.length - (u - f.length); m++)
      f.push(a[m]), r(m + 1), f.pop();
  };
  return u <= a.length && r(0), c;
}
function Yc(a) {
  const u = a.length;
  if (u === 1) return { cards: a, size: 1, type: "single", power: a[0] };
  if (u === 2)
    return Ie(a[0]) === Ie(a[1]) ? { cards: a, size: 2, type: "pair", power: a[1] } : null;
  if (u === 3)
    return Ie(a[0]) === Ie(a[1]) && Ie(a[1]) === Ie(a[2]) ? { cards: a, size: 3, type: "triple", power: a[2] } : null;
  if (u !== 5) return null;
  const c = a.map(Ie), f = /* @__PURE__ */ new Map();
  for (const p of c) f.set(p, (f.get(p) ?? 0) + 1);
  for (const [p, g] of f)
    if (g === 4) return { cards: a, size: 5, type: "quads", power: 192 + p };
  if (f.size === 2) {
    let p = -1;
    for (const [g, y] of f) y === 3 && (p = g);
    return p >= 0 ? { cards: a, size: 5, type: "fullhouse", power: 128 + p } : null;
  }
  if (f.size !== 5) return null;
  const r = a[4], d = a.every((p) => Ns(p) === Ns(a[0])), m = c[4] - c[0] === 4;
  return m && d ? { cards: a, size: 5, type: "straightflush", power: 256 + r } : d ? { cards: a, size: 5, type: "flush", power: 64 + r } : m ? { cards: a, size: 5, type: "straight", power: 0 + r } : null;
}
function y2(a) {
  const u = [];
  for (const c of a) u.push(Yc([c]));
  for (const c of [2, 3, 5])
    for (const f of h2(a, c)) {
      const r = Yc(f);
      r && u.push(r);
    }
  return u;
}
const m2 = (a, u) => a.length === u.length && a.every((c, f) => c === u[f]);
function Qy(a) {
  const u = a.hands[a.currentSeat] ?? [], c = y2(u);
  if (a.table == null) {
    if (a.plays === 0) {
      let d = 1 / 0;
      for (const p of a.hands) p.length > 0 && p[0] < d && (d = p[0]);
      return c.filter((p) => p.cards.includes(d)).map((p) => ({ cards: p.cards }));
    }
    return c.map((d) => ({ cards: d.cards }));
  }
  const f = a.table;
  return [...c.filter((d) => d.size === f.size && d.power > f.power).map((d) => ({ cards: d.cards })), { cards: [] }];
}
function zc(a) {
  for (let u = 0; u < a.hands.length; u++)
    if (a.hands[u].length === 0) return { state: "win", winners: [u] };
  return { state: "playing" };
}
function Th(a, u) {
  if (zc(a).state !== "playing") return !1;
  const c = [...u.cards].sort((f, r) => f - r);
  return Qy(a).some((f) => m2(f.cards, c));
}
const g2 = {
  id: "big-two",
  name: "Big Two",
  minPlayers: 2,
  maxPlayers: s2,
  createInitialState(a) {
    const u = iv(a.seed ?? 0), c = cv(
      Array.from({ length: 52 }, (p, g) => g),
      u
    ), f = a.players.length, r = [];
    for (let p = 0; p < f; p++)
      r.push(c.slice(p * 13, p * 13 + 13).sort((g, y) => g - y));
    let d = 0, m = 1 / 0;
    for (let p = 0; p < f; p++) {
      const g = r[p][0];
      g != null && g < m && (m = g, d = p);
    }
    return {
      hands: r,
      currentSeat: d,
      table: null,
      passes: 0,
      plays: 0,
      lastPlay: null
    };
  },
  getStatus: zc,
  getCurrentSeat(a) {
    return zc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return zc(a).state === "playing" ? Qy(a) : [];
  },
  isLegalMove: Th,
  applyMove(a, u) {
    if (!Th(a, u))
      throw new Error(`Illegal Big Two move: ${JSON.stringify(u)}`);
    const c = a.currentSeat, f = a.hands.length;
    if (u.cards.length === 0) {
      let m = a.passes + 1, p = a.table, g = (c + 1) % f;
      return p != null && m >= f - 1 && (g = p.seat, p = null, m = 0), { ...a, currentSeat: g, passes: m, table: p };
    }
    const r = [...u.cards].sort((m, p) => m - p), d = Yc(r);
    return {
      hands: a.hands.map((m, p) => p === c ? m.filter((g) => !r.includes(g)) : m),
      currentSeat: (c + 1) % f,
      table: { seat: c, cards: r, type: d.type, size: d.size, power: d.power },
      passes: 0,
      plays: a.plays + 1,
      lastPlay: { seat: c, cards: r }
    };
  },
  observe(a, u) {
    return {
      seat: u,
      hand: a.hands[u] ?? [],
      handSizes: a.hands.map((c) => c.length),
      currentSeat: a.currentSeat,
      table: a.table,
      passes: a.passes,
      plays: a.plays,
      lastPlay: a.lastPlay
    };
  }
}, Zy = 8, nl = Zy, p2 = 100, Vy = [
  [-1, -1],
  [-1, 1]
], Ky = [
  [1, -1],
  [1, 1]
], v2 = [...Vy, ...Ky], Pe = (a) => Math.floor(a / nl), Us = (a) => a % nl;
function Hs(a, u, c) {
  const f = Pe(a) + u[0] * c, r = Us(a) + u[1] * c;
  return f >= 0 && f < nl && r >= 0 && r < nl ? f * nl + r : -1;
}
function $y(a, u) {
  return u ? v2 : a === 0 ? Vy : Ky;
}
function Bs(a) {
  return a === 0 ? 0 : nl - 1;
}
function S2(a, u) {
  const c = a[u];
  if (!c) return [];
  const f = [], r = (d, m, p) => {
    let g = !1;
    for (const y of $y(c.seat, m)) {
      const v = Hs(d, y, 1), b = Hs(d, y, 2);
      if (v < 0 || b < 0) continue;
      const R = a[v];
      if (!R || R.seat === c.seat || p.includes(v) || a[b] && b !== u && !p.includes(b)) continue;
      g = !0;
      const Q = [...p, v];
      !m && Pe(b) === Bs(c.seat) ? f.push({ from: u, to: b, captures: Q }) : r(b, m, Q);
    }
    !g && p.length > 0 && f.push({ from: u, to: d, captures: p });
  };
  return r(u, c.king, []), f;
}
function b2(a, u) {
  const c = a[u];
  if (!c) return [];
  const f = [];
  for (const r of $y(c.seat, c.king)) {
    const d = Hs(u, r, 1);
    d >= 0 && a[d] == null && f.push({ from: u, to: d, captures: [] });
  }
  return f;
}
function wc(a) {
  const u = [];
  for (let f = 0; f < a.board.length; f++)
    a.board[f]?.seat === a.currentSeat && u.push(...S2(a.board, f));
  if (u.length > 0) return u;
  const c = [];
  for (let f = 0; f < a.board.length; f++)
    a.board[f]?.seat === a.currentSeat && c.push(...b2(a.board, f));
  return c;
}
function Yu(a) {
  if (a.idlePlies >= p2) return { state: "draw" };
  const u = a.currentSeat, c = u === 0 ? 1 : 0;
  return a.board.some((f) => f?.seat === u) ? wc(a).length === 0 ? { state: "win", winners: [c] } : { state: "playing" } : { state: "win", winners: [c] };
}
function M2(a, u) {
  return a.from === u.from && a.to === u.to && a.captures.length === u.captures.length && a.captures.every((c) => u.captures.includes(c));
}
function Ah(a, u) {
  return Yu(a).state === "playing" && wc(a).some((c) => M2(c, u));
}
const Ls = new Int32Array(nl * nl * 2 * 2), ky = new Int32Array(nl * nl * 2 * 2);
let Jy = 0, Wy = 0;
(() => {
  let a = 458671353;
  const u = () => {
    a = a + 1831565813 | 0;
    let c = Math.imul(a ^ a >>> 15, 1 | a);
    return c = c + Math.imul(c ^ c >>> 7, 61 | c) ^ c, c ^ c >>> 14 | 0;
  };
  for (let c = 0; c < Ls.length; c++)
    Ls[c] = u(), ky[c] = u();
  Jy = u(), Wy = u();
})();
const E2 = (a, u, c) => (a * 2 + u) * 2 + (c ? 1 : 0), x2 = (a) => a ? 3 : 1, T2 = (a, u) => a === 0 ? u === nl - 1 : u === 0, A2 = {
  id: "checkers",
  name: "Checkers",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    const u = Array(nl * nl).fill(null);
    for (let c = 0; c < nl * nl; c++)
      (Pe(c) + Us(c)) % 2 === 1 && (Pe(c) <= 2 ? u[c] = { seat: 1, king: !1 } : Pe(c) >= nl - 3 && (u[c] = { seat: 0, king: !1 }));
    return { board: u, currentSeat: 0, idlePlies: 0, lastMove: null };
  },
  getStatus: Yu,
  getCurrentSeat(a) {
    return Yu(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return Yu(a).state === "playing" ? wc(a) : [];
  },
  isLegalMove: Ah,
  applyMove(a, u) {
    if (!Ah(a, u))
      throw new Error(`Illegal Checkers move: ${u.from} -> ${u.to}`);
    const c = [...a.board], f = c[u.from];
    c[u.from] = null;
    for (const d of u.captures) c[d] = null;
    const r = f.king || Pe(u.to) === Bs(f.seat);
    return c[u.to] = { seat: f.seat, king: r }, {
      board: c,
      currentSeat: a.currentSeat === 0 ? 1 : 0,
      // Captures and man moves reset the draw counter; quiet king moves raise it.
      idlePlies: u.captures.length > 0 || !f.king ? 0 : a.idlePlies + 1,
      lastMove: u
    };
  },
  evaluate(a, u) {
    let c = 0;
    for (let f = 0; f < a.board.length; f++) {
      const r = a.board[f];
      if (!r) continue;
      const d = Pe(f), m = Us(f);
      let p;
      r.king ? p = 2.4 + 0.04 * (3.5 - Math.abs(3.5 - d) + (3.5 - Math.abs(3.5 - m))) : p = 1 + 0.1 * (r.seat === 0 ? nl - 1 - d : d) + (T2(r.seat, d) ? 0.3 : 0), c += r.seat === u ? p : -p;
    }
    return c;
  },
  /**
   * Zobrist key (two 32-bit halves) over every piece — by square, seat and
   * king flag — plus the side to move. Like Chess, the draw counter
   * (`idlePlies`) is intentionally left out: folding it in would change the key
   * almost every ply and gut the transposition table's hit rate, and its only
   * effect is the rare 100-ply draw, far beyond a single search's horizon.
   */
  hash(a) {
    let u = 0, c = 0;
    for (let f = 0; f < a.board.length; f++) {
      const r = a.board[f];
      if (!r) continue;
      const d = E2(f, r.seat, r.king);
      u ^= Ls[d], c ^= ky[d];
    }
    return a.currentSeat === 1 && (u ^= Jy, c ^= Wy), `${(u >>> 0).toString(36)}:${(c >>> 0).toString(36)}`;
  },
  /**
   * Move-ordering score: captures first, ranked by the material they remove
   * (kings count for more than men), with a bonus for a move that crowns a man.
   * Quiet moves score 0. Purely a search speed-up — never changes a position's
   * value or legality.
   */
  scoreMoveForOrdering(a, u) {
    let c = 0;
    for (const r of u.captures) {
      const d = a.board[r];
      d && (c += 10 * x2(d.king));
    }
    const f = a.board[u.from];
    return f && !f.king && Pe(u.to) === Bs(f.seat) && (c += 5), c;
  },
  /**
   * Quiescence moves: the capture sequences. Each jump removes material, so the
   * set strictly shrinks toward quiet and the search terminates. Because
   * captures are compulsory, whenever any exist `getLegalMoves` already returns
   * only captures — so this resolves exactly the pending exchanges that would
   * otherwise fool the material evaluation at the depth limit (horizon effect).
   */
  getTacticalMoves(a) {
    return Yu(a).state !== "playing" ? [] : wc(a).filter((u) => u.captures.length > 0);
  },
  /** Stable, collision-free key for killer/history ordering heuristics. */
  moveKey(a) {
    return `${a.from}-${a.to}-${[...a.captures].sort((u, c) => u - c).join(",")}`;
  }
}, Aa = 4, Fy = [
  { x: 1, y: -1, z: 0 },
  { x: 1, y: 0, z: -1 },
  { x: -1, y: 1, z: 0 },
  { x: -1, y: 0, z: 1 },
  { x: 0, y: 1, z: -1 },
  { x: 0, y: -1, z: 1 }
];
function z2(a, u, c) {
  return a >= -Aa && u >= -Aa && c >= -Aa || a <= Aa && u <= Aa && c <= Aa;
}
function _2() {
  const a = [];
  for (let u = -8; u <= 8; u++)
    for (let c = -8; c <= 8; c++) {
      const f = -u - c;
      f < -8 || f > 8 || z2(u, c, f) && a.push({ x: u, y: c, z: f });
    }
  return a.sort((u, c) => c.y - c.z - (u.y - u.z) || u.x - c.x), a;
}
const Gn = _2(), _c = Gn.length, Iy = /* @__PURE__ */ new Map();
Gn.forEach((a, u) => Iy.set(`${a.x},${a.y},${a.z}`, u));
function Ys(a, u, c) {
  return Iy.get(`${a},${u},${c}`) ?? -1;
}
function O2(a) {
  return a.x >= 5 ? 0 : a.z <= -5 ? 1 : a.y >= 5 ? 2 : a.x <= -5 ? 3 : a.z >= 5 ? 4 : a.y <= -5 ? 5 : -1;
}
const Py = (() => {
  const a = [[], [], [], [], [], []];
  return Gn.forEach((u, c) => {
    const f = O2(u);
    f >= 0 && a[f].push(c);
  }), a;
})();
function C2(a) {
  return (a + 3) % 6;
}
const D2 = Gn.map((a) => {
  const u = [];
  for (const c of Fy) {
    const f = Ys(a.x + c.x, a.y + c.y, a.z + c.z);
    f >= 0 && u.push(f);
  }
  return u;
}), R2 = Gn.map((a) => {
  const u = [];
  for (const c of Fy) {
    const f = Ys(a.x + c.x, a.y + c.y, a.z + c.z), r = Ys(a.x + 2 * c.x, a.y + 2 * c.y, a.z + 2 * c.z);
    f >= 0 && r >= 0 && u.push({ over: f, land: r });
  }
  return u;
});
function tm(a, u) {
  const c = /* @__PURE__ */ new Set();
  for (const d of D2[u])
    a[d] == null && c.add(d);
  const f = /* @__PURE__ */ new Set([u]), r = [u];
  for (; r.length > 0; ) {
    const d = r.pop();
    for (const { over: m, land: p } of R2[d])
      m !== u && a[m] != null && a[p] == null && !f.has(p) && (f.add(p), c.add(p), r.push(p));
  }
  return c.delete(u), [...c];
}
function ws(a) {
  switch (a) {
    case 3:
      return [0, 2, 4];
    case 4:
      return [0, 1, 3, 4];
    case 5:
      return [0, 1, 2, 3, 4];
    case 6:
      return [0, 1, 2, 3, 4, 5];
    default:
      return [0, 3];
  }
}
const j2 = [
  (a) => a.x,
  // corner 0 (+X) heads to −X
  (a) => -a.z,
  // corner 1 (−Z) heads to +Z
  (a) => a.y,
  // corner 2 (+Y) heads to −Y
  (a) => -a.x,
  // corner 3 (−X) heads to +X
  (a) => a.z,
  // corner 4 (+Z) heads to −Z
  (a) => -a.y
  // corner 5 (−Y) heads to +Y
], N2 = 3;
function Oc(a) {
  const u = ws(a.playerCount);
  for (let c = 0; c < a.playerCount; c++)
    if (Py[C2(u[c])].every((r) => a.board[r] === c))
      return { state: "win", winners: [c] };
  return { state: "playing" };
}
function zh(a, u) {
  return Oc(a).state !== "playing" || a.board[u.from] !== a.currentSeat || u.to < 0 || u.to >= _c || a.board[u.to] != null ? !1 : tm(a.board, u.from).includes(u.to);
}
const U2 = {
  id: "chinese-checkers",
  name: "Chinese Checkers",
  minPlayers: 2,
  maxPlayers: 6,
  createInitialState(a) {
    const u = a.players.length, c = ws(u), f = Array(_c).fill(null);
    for (let r = 0; r < u; r++)
      for (const d of Py[c[r]]) f[d] = r;
    return { board: f, currentSeat: 0, playerCount: u, lastMove: null };
  },
  getStatus: Oc,
  getCurrentSeat(a) {
    return Oc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    if (Oc(a).state !== "playing") return [];
    const u = [];
    for (let c = 0; c < _c; c++)
      if (a.board[c] === a.currentSeat)
        for (const f of tm(a.board, c))
          u.push({ from: c, to: f });
    return u;
  },
  isLegalMove: zh,
  applyMove(a, u) {
    if (!zh(a, u))
      throw new Error(`Illegal Chinese Checkers move: ${u.from} -> ${u.to}`);
    const c = [...a.board];
    return c[u.to] = a.currentSeat, c[u.from] = null, {
      board: c,
      currentSeat: (a.currentSeat + 1) % a.playerCount,
      playerCount: a.playerCount,
      lastMove: { from: u.from, to: u.to }
    };
  },
  evaluate(a, u) {
    const c = ws(a.playerCount)[u] ?? 0, f = j2[c];
    let r = 0, d = 0;
    for (let m = 0; m < _c; m++) {
      if (a.board[m] !== u) continue;
      const p = f(Gn[m]) + 8;
      r += p, p > d && (d = p);
    }
    return -(r + N2 * d);
  }
}, lm = 7, em = 6, un = lm, Nn = em, _h = un * Nn, H2 = Math.floor(un / 2);
function qt(a, u) {
  return a * un + u;
}
function B2() {
  const a = [];
  for (let u = 0; u < Nn; u++)
    for (let c = 0; c < un; c++)
      c + 3 < un && a.push([qt(u, c), qt(u, c + 1), qt(u, c + 2), qt(u, c + 3)]), u + 3 < Nn && a.push([qt(u, c), qt(u + 1, c), qt(u + 2, c), qt(u + 3, c)]), u + 3 < Nn && c + 3 < un && a.push([
        qt(u, c),
        qt(u + 1, c + 1),
        qt(u + 2, c + 2),
        qt(u + 3, c + 3)
      ]), u + 3 < Nn && c - 3 >= 0 && a.push([
        qt(u, c),
        qt(u + 1, c - 1),
        qt(u + 2, c - 2),
        qt(u + 3, c - 3)
      ]);
  return a;
}
const nm = B2();
function L2(a, u) {
  for (let c = Nn - 1; c >= 0; c--)
    if (a[qt(c, u)] == null) return c;
  return -1;
}
function Y2(a) {
  for (const [u, c, f, r] of nm) {
    const d = a[u];
    if (d != null && d === a[c] && d === a[f] && d === a[r]) return d;
  }
  return null;
}
function Cc(a) {
  const u = Y2(a.board);
  return u != null ? { state: "win", winners: [u] } : a.board.every((c) => c != null) ? { state: "draw" } : { state: "playing" };
}
function Oh(a, u) {
  return Number.isInteger(u.column) && u.column >= 0 && u.column < un && a.board[qt(0, u.column)] == null && // top cell free ⇒ column not full
  Cc(a).state === "playing";
}
const Ch = [0, 2, 8, 40], w2 = {
  id: "connect-four",
  name: "Four in a Row",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    return { board: Array(_h).fill(null), currentSeat: 0 };
  },
  getStatus: Cc,
  getCurrentSeat(a) {
    return Cc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    if (Cc(a).state !== "playing") return [];
    const u = [];
    for (let c = 0; c < un; c++)
      a.board[qt(0, c)] == null && u.push({ column: c });
    return u;
  },
  isLegalMove: Oh,
  applyMove(a, u) {
    if (!Oh(a, u))
      throw new Error(`Illegal Connect Four move: column ${u.column}`);
    const c = L2(a.board, u.column), f = [...a.board];
    return f[qt(c, u.column)] = a.currentSeat, { board: f, currentSeat: a.currentSeat === 0 ? 1 : 0 };
  },
  hash(a) {
    let u = "";
    for (let c = 0; c < _h; c++) {
      const f = a.board[c];
      u += f == null ? "." : f === 0 ? "0" : "1";
    }
    return u + a.currentSeat;
  },
  evaluate(a, u) {
    const c = a.board, f = u === 0 ? 1 : 0;
    let r = 0;
    for (const d of nm) {
      let m = 0, p = 0;
      for (const g of d) {
        const y = c[g];
        y === u ? m++ : y === f && p++;
      }
      m > 0 && p > 0 || (m > 0 ? r += Ch[m] ?? 0 : p > 0 && (r -= Ch[p] ?? 0));
    }
    for (let d = 0; d < Nn; d++) {
      const m = c[qt(d, H2)];
      m === u ? r += 3 : m === f && (r -= 3);
    }
    return r;
  }
}, G2 = [9, 13, 19], q2 = 19, X2 = 7.5, Gc = (a) => a === 0 ? 1 : 0;
function Q2(a) {
  const u = a.options?.boardSize;
  return typeof u == "number" && G2.includes(u) ? u : q2;
}
function Vc(a, u) {
  const c = Math.floor(a / u), f = a % u, r = [];
  return c > 0 && r.push(a - u), c < u - 1 && r.push(a + u), f > 0 && r.push(a - 1), f < u - 1 && r.push(a + 1), r;
}
function tr(a, u, c) {
  const f = a[u], r = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
  if (f == null) return { stones: r, liberties: d };
  const m = [u];
  for (r.add(u); m.length > 0; ) {
    const p = m.pop();
    for (const g of Vc(p, c))
      a[g] == null ? d.add(g) : a[g] === f && !r.has(g) && (r.add(g), m.push(g));
  }
  return { stones: r, liberties: d };
}
function am(a, u, c, f) {
  const r = [...a];
  r[u] = c;
  const d = Gc(c), m = [];
  for (const p of Vc(u, f)) {
    if (r[p] !== d) continue;
    const g = tr(r, p, f);
    if (g.liberties.size === 0)
      for (const y of g.stones)
        r[y] = null, m.push(y);
  }
  return { board: r, captured: m };
}
function lr(a, u) {
  if (u < 0 || u >= a.size * a.size || a.board[u] != null || u === a.ko) return !1;
  const { board: c } = am(a.board, u, a.currentSeat, a.size);
  return tr(c, u, a.size).liberties.size > 0;
}
function um(a, u) {
  let c = 0, f = 0;
  const r = Array(u * u).fill(!1);
  for (let d = 0; d < u * u; d++) {
    if (a[d] === 0) {
      c++;
      continue;
    }
    if (a[d] === 1) {
      f++;
      continue;
    }
    if (r[d]) continue;
    const m = [], p = /* @__PURE__ */ new Set(), g = [d];
    for (r[d] = !0; g.length > 0; ) {
      const y = g.pop();
      m.push(y);
      for (const v of Vc(y, u)) {
        const b = a[v];
        b == null ? r[v] || (r[v] = !0, g.push(v)) : p.add(b);
      }
    }
    p.size === 1 && (p.has(0) ? c += m.length : f += m.length);
  }
  return { black: c, white: f + X2 };
}
function Z2(a) {
  const u = [];
  for (let c = 0; c < a.size * a.size; c++)
    lr(a, c) && u.push({ point: c });
  return u.push({ point: null }), u;
}
function wu(a) {
  if (a.passes < 2) return { state: "playing" };
  const { black: u, white: c } = um(a.board, a.size);
  return { state: "win", winners: [u > c ? 0 : 1] };
}
function Dh(a, u) {
  return wu(a).state !== "playing" ? !1 : u.point == null ? !0 : lr(a, u.point);
}
function V2(a, u, c, f) {
  for (const v of Vc(u, f))
    if (a[v] !== c) return !1;
  const r = Math.floor(u / f), d = u % f;
  let m = 0, p = 0;
  const g = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
  ];
  for (const [v, b] of g) {
    const R = r + v, N = d + b;
    R < 0 || R >= f || N < 0 || N >= f || (m++, a[R * f + N] === Gc(c) && p++);
  }
  return m < 4 ? p === 0 : p <= 1;
}
function K2(a) {
  const u = a.size, c = u * u;
  if (!a.board.some((m) => m != null)) {
    const m = u >= 13 ? 3 : 2, p = [.../* @__PURE__ */ new Set([m, Math.floor(u / 2), u - 1 - m])], g = [];
    for (const y of p) for (const v of p) g.push({ point: y * u + v });
    return g.push({ point: null }), g;
  }
  const r = /* @__PURE__ */ new Set();
  for (let m = 0; m < c; m++) {
    if (a.board[m] == null) continue;
    const p = Math.floor(m / u), g = m % u;
    for (let y = -2; y <= 2; y++)
      for (let v = -2; v <= 2; v++) {
        const b = p + y, R = g + v;
        if (b < 0 || b >= u || R < 0 || R >= u) continue;
        const N = b * u + R;
        a.board[N] == null && r.add(N);
      }
  }
  const d = [];
  for (const m of r)
    lr(a, m) && (V2(a.board, m, a.currentSeat, u) || d.push({ point: m }));
  return d.push({ point: null }), d;
}
const $2 = {
  id: "go",
  name: "Go",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    const u = Q2(a);
    return {
      size: u,
      board: Array(u * u).fill(null),
      currentSeat: 0,
      ko: null,
      passes: 0,
      captures: [0, 0],
      lastMove: null
    };
  },
  getStatus: wu,
  getCurrentSeat(a) {
    return wu(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return wu(a).state === "playing" ? Z2(a) : [];
  },
  isLegalMove: Dh,
  applyMove(a, u) {
    if (!Dh(a, u))
      throw new Error(`Illegal Go move: ${JSON.stringify(u)}`);
    const c = a.currentSeat;
    if (u.point == null)
      return {
        size: a.size,
        board: a.board,
        currentSeat: Gc(c),
        ko: null,
        passes: a.passes + 1,
        captures: a.captures,
        lastMove: null
      };
    const { board: f, captured: r } = am(a.board, u.point, c, a.size);
    let d = null;
    if (r.length === 1) {
      const p = tr(f, u.point, a.size);
      p.stones.size === 1 && p.liberties.size === 1 && (d = r[0]);
    }
    const m = [...a.captures];
    return m[c] = m[c] + r.length, {
      size: a.size,
      board: f,
      currentSeat: Gc(c),
      ko: d,
      passes: 0,
      captures: m,
      lastMove: u.point
    };
  },
  evaluate(a, u) {
    const { black: c, white: f } = um(a.board, a.size), r = c - f;
    return u === 0 ? r : -r;
  },
  /** AI hint: a focused move set — see {@link candidateMoves}. */
  getCandidateMoves(a) {
    return wu(a).state === "playing" ? K2(a) : [];
  }
}, im = 15, k2 = 5, Ft = im, Dc = k2, Xu = Ft * Ft, J2 = Math.floor(Ft / 2) * Ft + Math.floor(Ft / 2), yc = 2, cm = [
  [0, 1],
  // horizontal
  [1, 0],
  // vertical
  [1, 1],
  // diagonal ↘
  [1, -1]
  // diagonal ↙
], om = (a) => Math.floor(a / Ft), fm = (a) => a % Ft;
function W2(a, u, c, f, r) {
  let d = 1;
  const m = om(u), p = fm(u);
  for (const g of [1, -1]) {
    let y = m + f * g, v = p + r * g;
    for (; y >= 0 && y < Ft && v >= 0 && v < Ft && a[y * Ft + v] === c; )
      d++, y += f * g, v += r * g;
  }
  return d;
}
function sm(a, u) {
  const c = a[u];
  if (c == null) return null;
  for (const [f, r] of cm)
    if (W2(a, u, c, f, r) >= Dc) return c;
  return null;
}
function F2(a) {
  for (let u = 0; u < Xu; u++) {
    if (a[u] == null) continue;
    const c = sm(a, u);
    if (c != null) return c;
  }
  return null;
}
function Gu(a) {
  const u = a.lastCell >= 0 ? sm(a.board, a.lastCell) : F2(a.board);
  return u != null ? { state: "win", winners: [u] } : a.board.every((c) => c != null) ? { state: "draw" } : { state: "playing" };
}
function Rh(a, u) {
  return Number.isInteger(u.cell) && u.cell >= 0 && u.cell < Xu && a.board[u.cell] == null && Gu(a).state === "playing";
}
function I2() {
  const a = [];
  for (let u = 0; u < Ft; u++)
    for (let c = 0; c < Ft; c++)
      for (const [f, r] of cm) {
        const d = u + f * (Dc - 1), m = c + r * (Dc - 1);
        if (d < 0 || d >= Ft || m < 0 || m >= Ft) continue;
        const p = [];
        for (let g = 0; g < Dc; g++) p.push((u + f * g) * Ft + (c + r * g));
        a.push(p);
      }
  return a;
}
const P2 = I2(), jh = [0, 1, 10, 60, 350], tS = {
  id: "gomoku",
  name: "Five in a Row (Gomoku)",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    return { board: Array(Xu).fill(null), currentSeat: 0, lastCell: -1 };
  },
  getStatus: Gu,
  getCurrentSeat(a) {
    return Gu(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    if (Gu(a).state !== "playing") return [];
    const u = [];
    for (let c = 0; c < Xu; c++)
      a.board[c] == null && u.push({ cell: c });
    return u;
  },
  isLegalMove: Rh,
  applyMove(a, u) {
    if (!Rh(a, u))
      throw new Error(`Illegal Gomoku move: cell ${u.cell}`);
    const c = [...a.board];
    return c[u.cell] = a.currentSeat, { board: c, currentSeat: a.currentSeat === 0 ? 1 : 0, lastCell: u.cell };
  },
  hash(a) {
    let u = "";
    for (let c = 0; c < a.board.length; c++) {
      const f = a.board[c];
      u += f == null ? "." : f === 0 ? "0" : "1";
    }
    return u + a.currentSeat;
  },
  evaluate(a, u) {
    const c = a.board, f = u === 0 ? 1 : 0;
    let r = 0;
    for (const d of P2) {
      let m = 0, p = 0, g = !1;
      for (const y of d) {
        const v = c[y];
        if (v === u) {
          if (m++, p > 0) {
            g = !0;
            break;
          }
        } else if (v === f && (p++, m > 0)) {
          g = !0;
          break;
        }
      }
      g || (m > 0 ? r += jh[m] ?? 0 : p > 0 && (r -= jh[p] ?? 0));
    }
    return r;
  },
  /**
   * AI hint: only empty cells within {@link CANDIDATE_RADIUS} of an existing
   * stone (the opening move goes to the centre). Searching all 225 cells would
   * make minimax unusably slow; relevant Gomoku moves are always near play.
   */
  getCandidateMoves(a) {
    if (Gu(a).state !== "playing") return [];
    const u = /* @__PURE__ */ new Set();
    let c = !1;
    for (let f = 0; f < Xu; f++) {
      if (a.board[f] == null) continue;
      c = !0;
      const r = om(f), d = fm(f);
      for (let m = -yc; m <= yc; m++)
        for (let p = -yc; p <= yc; p++) {
          const g = r + m, y = d + p;
          if (g < 0 || g >= Ft || y < 0 || y >= Ft) continue;
          const v = g * Ft + y;
          a.board[v] == null && u.add(v);
        }
    }
    return c ? [...u].map((f) => ({ cell: f })) : [{ cell: J2 }];
  }
}, Qu = 24, Nh = 9, lS = [
  [1, 9],
  // 0
  [0, 2, 4],
  // 1
  [1, 14],
  // 2
  [4, 10],
  // 3
  [1, 3, 5, 7],
  // 4
  [4, 13],
  // 5
  [7, 11],
  // 6
  [4, 6, 8],
  // 7
  [7, 12],
  // 8
  [0, 10, 21],
  // 9
  [3, 9, 11, 18],
  // 10
  [6, 10, 15],
  // 11
  [8, 13, 17],
  // 12
  [5, 12, 14, 20],
  // 13
  [2, 13, 23],
  // 14
  [11, 16],
  // 15
  [15, 17, 19],
  // 16
  [12, 16],
  // 17
  [10, 19],
  // 18
  [16, 18, 20, 22],
  // 19
  [13, 19],
  // 20
  [9, 22],
  // 21
  [19, 21, 23],
  // 22
  [14, 22]
  // 23
], rm = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
  [12, 13, 14],
  [15, 16, 17],
  [18, 19, 20],
  [21, 22, 23],
  [0, 9, 21],
  [3, 10, 18],
  [6, 11, 15],
  [1, 4, 7],
  [16, 19, 22],
  [8, 12, 17],
  [5, 13, 20],
  [2, 14, 23]
], eS = 60, Na = (a) => a === 0 ? 1 : 0;
function dm(a, u, c) {
  return rm.some((f) => f.includes(u) && f.every((r) => a[r] === c));
}
function nS(a, u) {
  const c = [];
  for (let r = 0; r < Qu; r++) a[r] === u && c.push(r);
  const f = c.filter((r) => !dm(a, r, u));
  return f.length > 0 ? f : c;
}
function gs(a, u, c, f) {
  const r = [...a];
  if (c != null && (r[c] = null), r[f] = u, !dm(r, f, u)) return [{ from: c, to: f, remove: null }];
  const d = nS(r, Na(u));
  return d.length === 0 ? [{ from: c, to: f, remove: null }] : d.map((m) => ({ from: c, to: f, remove: m }));
}
function er(a) {
  const u = a.currentSeat, c = a.board, f = [];
  if (a.toPlace[u] > 0) {
    for (let d = 0; d < Qu; d++)
      c[d] == null && f.push(...gs(c, u, null, d));
    return f;
  }
  const r = a.onBoard[u] === 3;
  for (let d = 0; d < Qu; d++)
    if (c[d] === u)
      if (r)
        for (let m = 0; m < Qu; m++)
          c[m] == null && f.push(...gs(c, u, d, m));
      else
        for (const m of lS[d])
          c[m] == null && f.push(...gs(c, u, d, m));
  return f;
}
function Rc(a) {
  for (const u of [0, 1])
    if (a.toPlace[u] === 0 && a.onBoard[u] < 3)
      return { state: "win", winners: [Na(u)] };
  return a.sinceCapture >= eS ? { state: "draw" } : er(a).length === 0 ? { state: "win", winners: [Na(a.currentSeat)] } : { state: "playing" };
}
function Uh(a, u) {
  return Rc(a).state !== "playing" ? !1 : er(a).some(
    (c) => c.from === u.from && c.to === u.to && c.remove === u.remove
  );
}
const aS = {
  id: "nine-mens-morris",
  name: "Nine Men's Morris",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    return {
      board: Array(Qu).fill(null),
      currentSeat: 0,
      toPlace: [Nh, Nh],
      onBoard: [0, 0],
      sinceCapture: 0,
      lastMove: null
    };
  },
  getStatus: Rc,
  getCurrentSeat(a) {
    return Rc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return Rc(a).state === "playing" ? er(a) : [];
  },
  isLegalMove: Uh,
  applyMove(a, u) {
    if (!Uh(a, u))
      throw new Error(`Illegal Nine Men's Morris move: ${JSON.stringify(u)}`);
    const c = a.currentSeat, f = [...a.board], r = [...a.toPlace], d = [...a.onBoard];
    if (u.from != null ? f[u.from] = null : (r[c] = r[c] - 1, d[c] = d[c] + 1), f[u.to] = c, u.remove != null) {
      f[u.remove] = null;
      const m = Na(c);
      d[m] = d[m] - 1;
    }
    return {
      board: f,
      currentSeat: Na(c),
      toPlace: r,
      onBoard: d,
      sinceCapture: u.remove != null ? 0 : a.sinceCapture + 1,
      lastMove: { from: u.from, to: u.to, remove: u.remove }
    };
  },
  evaluate(a, u) {
    const c = Na(u), f = (d) => a.onBoard[d] + a.toPlace[d];
    let r = (f(u) - f(c)) * 8;
    for (const d of rm)
      d.every((m) => a.board[m] === u) ? r += 3 : d.every((m) => a.board[m] === c) && (r -= 3);
    return r;
  }
}, hm = 8, ul = hm, uS = (a) => Math.floor(a / ul), iS = (a) => a % ul, Gs = (a) => a === 0 ? 1 : 0, cS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
], Hh = [
  100,
  -20,
  10,
  5,
  5,
  10,
  -20,
  100,
  -20,
  -40,
  -5,
  -5,
  -5,
  -5,
  -40,
  -20,
  10,
  -5,
  15,
  3,
  3,
  15,
  -5,
  10,
  5,
  -5,
  3,
  3,
  3,
  3,
  -5,
  5,
  5,
  -5,
  3,
  3,
  3,
  3,
  -5,
  5,
  10,
  -5,
  15,
  3,
  3,
  15,
  -5,
  10,
  -20,
  -40,
  -5,
  -5,
  -5,
  -5,
  -40,
  -20,
  100,
  -20,
  10,
  5,
  5,
  10,
  -20,
  100
];
function qs(a, u, c) {
  if (a[u] != null) return [];
  const f = Gs(c), r = [];
  for (const [d, m] of cS) {
    const p = [];
    let g = uS(u) + d, y = iS(u) + m;
    for (; g >= 0 && g < ul && y >= 0 && y < ul && a[g * ul + y] === f; )
      p.push(g * ul + y), g += d, y += m;
    p.length > 0 && g >= 0 && g < ul && y >= 0 && y < ul && a[g * ul + y] === c && r.push(...p);
  }
  return r;
}
function _a(a, u) {
  const c = [];
  for (let f = 0; f < a.length; f++)
    a[f] == null && qs(a, f, u).length > 0 && c.push({ cell: f });
  return c;
}
function mc(a) {
  if (_a(a.board, a.currentSeat).length > 0) return { state: "playing" };
  let u = 0, c = 0;
  for (const f of a.board)
    f === 0 ? u++ : f === 1 && c++;
  return u === c ? { state: "draw" } : { state: "win", winners: [u > c ? 0 : 1] };
}
const oS = {
  id: "reversi",
  name: "Reversi",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    const u = Array(ul * ul).fill(null), c = ul / 2;
    return u[(c - 1) * ul + (c - 1)] = 1, u[c * ul + c] = 1, u[(c - 1) * ul + c] = 0, u[c * ul + (c - 1)] = 0, { board: u, currentSeat: 0, lastMove: null };
  },
  getStatus: mc,
  getCurrentSeat(a) {
    return mc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return mc(a).state === "playing" ? _a(a.board, a.currentSeat) : [];
  },
  isLegalMove(a, u) {
    return mc(a).state === "playing" && a.board[u.cell] == null && qs(a.board, u.cell, a.currentSeat).length > 0;
  },
  applyMove(a, u) {
    const c = qs(a.board, u.cell, a.currentSeat);
    if (a.board[u.cell] != null || c.length === 0)
      throw new Error(`Illegal Reversi move: cell ${u.cell}`);
    const f = [...a.board];
    f[u.cell] = a.currentSeat;
    for (const m of c) f[m] = a.currentSeat;
    const r = Gs(a.currentSeat), d = _a(f, r).length > 0 ? r : _a(f, a.currentSeat).length > 0 ? a.currentSeat : r;
    return { board: f, currentSeat: d, lastMove: u.cell };
  },
  hash(a) {
    let u = "";
    for (let c = 0; c < a.board.length; c++) {
      const f = a.board[c];
      u += f == null ? "." : f === 0 ? "0" : "1";
    }
    return u + a.currentSeat;
  },
  evaluate(a, u) {
    const c = Gs(u);
    let f = 0;
    for (let d = 0; d < a.board.length; d++) {
      const m = a.board[d];
      m === u ? f += Hh[d] : m === c && (f -= Hh[d]);
    }
    const r = _a(a.board, u).length - _a(a.board, c).length;
    return f + r * 3;
  }
}, ym = 9, il = ym, fS = 400, qc = ["r", "b", "g", "s", "n", "l", "p"], Ku = (a) => Math.floor(a / il), mm = (a) => a % il, gl = (a, u) => a * il + u, Bh = (a, u) => a >= 0 && a < il && u >= 0 && u < il, nr = (a) => a === 0 ? 1 : 0, sS = (a) => a === 0 ? -1 : 1, Lh = () => ({ r: 0, b: 0, g: 0, s: 0, n: 0, l: 0, p: 0 });
function rS(a) {
  const u = sS(a.seat), c = [[u, 0], [-u, 0], [0, -1], [0, 1]], f = [[u, -1], [u, 1], [-u, -1], [-u, 1]], r = [[u, 0], [u, -1], [u, 1], [0, -1], [0, 1], [-u, 0]], d = a.type;
  return d === "k" ? { steps: [...c, ...f], slides: [], jumps: [] } : d === "g" ? { steps: r, slides: [], jumps: [] } : d === "r" ? { steps: a.promoted ? f : [], slides: c, jumps: [] } : d === "b" ? { steps: a.promoted ? c : [], slides: f, jumps: [] } : a.promoted ? { steps: r, slides: [], jumps: [] } : d === "s" ? { steps: [[u, 0], ...f], slides: [], jumps: [] } : d === "n" ? { steps: [], slides: [], jumps: [[2 * u, -1], [2 * u, 1]] } : d === "l" ? { steps: [], slides: [[u, 0]], jumps: [] } : { steps: [[u, 0]], slides: [], jumps: [] };
}
function gm(a, u) {
  const c = a[u];
  if (!c) return [];
  const { steps: f, slides: r, jumps: d } = rS(c), m = Ku(u), p = mm(u), g = [];
  for (const [y, v] of [...f, ...d]) {
    if (!Bh(m + y, p + v)) continue;
    const b = a[gl(m + y, p + v)];
    (!b || b.seat !== c.seat) && g.push(gl(m + y, p + v));
  }
  for (const [y, v] of r) {
    let b = m + y, R = p + v;
    for (; Bh(b, R); ) {
      const N = a[gl(b, R)];
      if (!N) g.push(gl(b, R));
      else {
        N.seat !== c.seat && g.push(gl(b, R));
        break;
      }
      b += y, R += v;
    }
  }
  return g;
}
function dS(a, u) {
  for (let c = 0; c < a.length; c++) {
    const f = a[c];
    if (f && f.seat === u && f.type === "k") return c;
  }
  return -1;
}
function hS(a, u, c) {
  for (let f = 0; f < a.length; f++) {
    const r = a[f];
    if (!(!r || r.seat !== c) && gm(a, f).includes(u))
      return !0;
  }
  return !1;
}
const Yh = (a, u) => a === 0 ? u <= 2 : u >= il - 3, Xs = (a, u) => a === 0 ? u === 0 : u === il - 1, pm = (a, u) => a === 0 ? u <= 1 : u >= il - 2, yS = ["r", "b", "s", "n", "l", "p"];
function mS(a, u, c) {
  return a.promoted || !yS.includes(a.type) ? !1 : Yh(a.seat, Ku(u)) || Yh(a.seat, Ku(c));
}
function gS(a, u) {
  const c = Ku(u);
  return a.type === "p" || a.type === "l" ? Xs(a.seat, c) : a.type === "n" ? pm(a.seat, c) : !1;
}
function pS(a, u, c, f) {
  const r = Ku(c);
  if (a === "l") return !Xs(u, r);
  if (a === "n") return !pm(u, r);
  if (a === "p") {
    if (Xs(u, r)) return !1;
    const d = mm(c);
    for (let m = 0; m < il; m++) {
      const p = f[gl(m, d)];
      if (p && p.seat === u && p.type === "p" && !p.promoted) return !1;
    }
    return !0;
  }
  return !0;
}
function vS(a, u, c) {
  const f = [...a];
  if (c.from == null)
    f[c.to] = { seat: u, type: c.drop, promoted: !1 };
  else {
    const r = f[c.from];
    f[c.from] = null, f[c.to] = {
      seat: u,
      type: r.type,
      promoted: c.promote ? !0 : r.promoted
    };
  }
  return f;
}
function ar(a) {
  const u = a.currentSeat, c = [], f = (r) => {
    const d = vS(a.board, u, r);
    return !hS(d, dS(d, u), nr(u));
  };
  for (let r = 0; r < a.board.length; r++) {
    const d = a.board[r];
    if (!(!d || d.seat !== u))
      for (const m of gm(a.board, r)) {
        const p = mS(d, r, m) ? gS(d, m) ? [!0] : [!1, !0] : [!1];
        for (const g of p) {
          const y = { from: r, to: m, drop: null, promote: g };
          f(y) && c.push(y);
        }
      }
  }
  for (const r of qc)
    if (!(a.hands[u][r] <= 0))
      for (let d = 0; d < a.board.length; d++) {
        if (a.board[d] != null || !pS(r, u, d, a.board)) continue;
        const m = { from: null, to: d, drop: r, promote: !1 };
        f(m) && c.push(m);
      }
  return c;
}
function jc(a) {
  return a.ply >= fS ? { state: "draw" } : ar(a).length === 0 ? { state: "win", winners: [nr(a.currentSeat)] } : { state: "playing" };
}
function wh(a, u) {
  return jc(a).state !== "playing" ? !1 : ar(a).some(
    (c) => c.from === u.from && c.to === u.to && c.drop === u.drop && c.promote === u.promote
  );
}
const Gh = { p: 1, l: 3, n: 4, s: 5, g: 6, b: 8, r: 11, k: 0 }, SS = {
  p: 6,
  l: 6,
  n: 6,
  s: 6,
  b: 10,
  r: 13,
  g: 6,
  k: 0
}, qh = ["l", "n", "s", "g", "k", "g", "s", "n", "l"], bS = {
  id: "shogi",
  name: "Shogi",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    const u = Array(il * il).fill(null);
    for (let c = 0; c < il; c++)
      u[gl(0, c)] = { seat: 1, type: qh[c], promoted: !1 }, u[gl(il - 1, c)] = { seat: 0, type: qh[c], promoted: !1 }, u[gl(2, c)] = { seat: 1, type: "p", promoted: !1 }, u[gl(il - 3, c)] = { seat: 0, type: "p", promoted: !1 };
    return u[gl(1, 1)] = { seat: 1, type: "r", promoted: !1 }, u[gl(1, 7)] = { seat: 1, type: "b", promoted: !1 }, u[gl(il - 2, 1)] = { seat: 0, type: "b", promoted: !1 }, u[gl(il - 2, 7)] = { seat: 0, type: "r", promoted: !1 }, {
      board: u,
      currentSeat: 0,
      hands: [Lh(), Lh()],
      ply: 0,
      lastMove: null
    };
  },
  getStatus: jc,
  getCurrentSeat(a) {
    return jc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return jc(a).state === "playing" ? ar(a) : [];
  },
  isLegalMove: wh,
  applyMove(a, u) {
    if (!wh(a, u))
      throw new Error(`Illegal Shogi move: ${JSON.stringify(u)}`);
    const c = a.currentSeat, f = [...a.board], r = [{ ...a.hands[0] }, { ...a.hands[1] }];
    if (u.from == null)
      f[u.to] = { seat: c, type: u.drop, promoted: !1 }, r[c][u.drop]--;
    else {
      const d = f[u.from], m = f[u.to];
      f[u.from] = null, f[u.to] = { seat: c, type: d.type, promoted: u.promote ? !0 : d.promoted }, m && m.type !== "k" && r[c][m.type]++;
    }
    return {
      board: f,
      currentSeat: nr(c),
      hands: r,
      ply: a.ply + 1,
      lastMove: { from: u.from, to: u.to }
    };
  },
  evaluate(a, u) {
    let c = 0;
    for (const f of a.board) {
      if (!f) continue;
      const r = f.promoted ? SS[f.type] : Gh[f.type];
      c += f.seat === u ? r : -r;
    }
    for (const f of [0, 1])
      for (const r of qc) {
        const d = a.hands[f][r] * Gh[r];
        c += f === u ? d : -d;
      }
    return c;
  }
}, MS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // columns
  [0, 4, 8],
  [2, 4, 6]
  // diagonals
];
function ES(a) {
  for (const [u, c, f] of MS) {
    const r = a[u];
    if (r != null && r === a[c] && r === a[f]) return r;
  }
  return null;
}
function Nc(a) {
  const u = ES(a.board);
  return u != null ? { state: "win", winners: [u] } : a.board.every((c) => c != null) ? { state: "draw" } : { state: "playing" };
}
function Xh(a, u) {
  return Number.isInteger(u.cell) && u.cell >= 0 && u.cell < 9 && a.board[u.cell] == null && Nc(a).state === "playing";
}
const xS = {
  id: "tic-tac-toe",
  name: "Tic-Tac-Toe",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    return { board: Array(9).fill(null), currentSeat: 0 };
  },
  getStatus: Nc,
  getCurrentSeat(a) {
    return Nc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    if (Nc(a).state !== "playing") return [];
    const u = [];
    return a.board.forEach((c, f) => {
      c == null && u.push({ cell: f });
    }), u;
  },
  isLegalMove: Xh,
  applyMove(a, u) {
    if (!Xh(a, u))
      throw new Error(`Illegal Tic-Tac-Toe move: cell ${u.cell}`);
    const c = [...a.board];
    return c[u.cell] = a.currentSeat, { board: c, currentSeat: a.currentSeat === 0 ? 1 : 0 };
  }
}, TS = [
  xS,
  w2,
  tS,
  oS,
  U2,
  A2,
  n2,
  Lv,
  aS,
  bS,
  $2,
  g2
];
for (const a of TS)
  Zu.has(a.id) || Zu.register(a);
var ps = { exports: {} }, ot = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qh;
function AS() {
  if (Qh) return ot;
  Qh = 1;
  var a = Symbol.for("react.transitional.element"), u = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), m = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), R = Symbol.iterator;
  function N(E) {
    return E === null || typeof E != "object" ? null : (E = R && E[R] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var Q = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, W = Object.assign, w = {};
  function X(E, Y, J) {
    this.props = E, this.context = Y, this.refs = w, this.updater = J || Q;
  }
  X.prototype.isReactComponent = {}, X.prototype.setState = function(E, Y) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, Y, "setState");
  }, X.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function Z() {
  }
  Z.prototype = X.prototype;
  function V(E, Y, J) {
    this.props = E, this.context = Y, this.refs = w, this.updater = J || Q;
  }
  var j = V.prototype = new Z();
  j.constructor = V, W(j, X.prototype), j.isPureReactComponent = !0;
  var x = Array.isArray;
  function T() {
  }
  var G = { H: null, A: null, T: null, S: null }, F = Object.prototype.hasOwnProperty;
  function k(E, Y, J) {
    var tt = J.ref;
    return {
      $$typeof: a,
      type: E,
      key: Y,
      ref: tt !== void 0 ? tt : null,
      props: J
    };
  }
  function q(E, Y) {
    return k(E.type, Y, E.props);
  }
  function K(E) {
    return typeof E == "object" && E !== null && E.$$typeof === a;
  }
  function at(E) {
    var Y = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(J) {
      return Y[J];
    });
  }
  var St = /\/+/g;
  function bt(E, Y) {
    return typeof E == "object" && E !== null && E.key != null ? at("" + E.key) : Y.toString(36);
  }
  function Mt(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(T, T) : (E.status = "pending", E.then(
          function(Y) {
            E.status === "pending" && (E.status = "fulfilled", E.value = Y);
          },
          function(Y) {
            E.status === "pending" && (E.status = "rejected", E.reason = Y);
          }
        )), E.status) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function U(E, Y, J, tt, ft) {
    var dt = typeof E;
    (dt === "undefined" || dt === "boolean") && (E = null);
    var zt = !1;
    if (E === null) zt = !0;
    else
      switch (dt) {
        case "bigint":
        case "string":
        case "number":
          zt = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case a:
            case u:
              zt = !0;
              break;
            case v:
              return zt = E._init, U(
                zt(E._payload),
                Y,
                J,
                tt,
                ft
              );
          }
      }
    if (zt)
      return ft = ft(E), zt = tt === "" ? "." + bt(E, 0) : tt, x(ft) ? (J = "", zt != null && (J = zt.replace(St, "$&/") + "/"), U(ft, Y, J, "", function(Ba) {
        return Ba;
      })) : ft != null && (K(ft) && (ft = q(
        ft,
        J + (ft.key == null || E && E.key === ft.key ? "" : ("" + ft.key).replace(
          St,
          "$&/"
        ) + "/") + zt
      )), Y.push(ft)), 1;
    zt = 0;
    var cl = tt === "" ? "." : tt + ":";
    if (x(E))
      for (var Yt = 0; Yt < E.length; Yt++)
        tt = E[Yt], dt = cl + bt(tt, Yt), zt += U(
          tt,
          Y,
          J,
          dt,
          ft
        );
    else if (Yt = N(E), typeof Yt == "function")
      for (E = Yt.call(E), Yt = 0; !(tt = E.next()).done; )
        tt = tt.value, dt = cl + bt(tt, Yt++), zt += U(
          tt,
          Y,
          J,
          dt,
          ft
        );
    else if (dt === "object") {
      if (typeof E.then == "function")
        return U(
          Mt(E),
          Y,
          J,
          tt,
          ft
        );
      throw Y = String(E), Error(
        "Objects are not valid as a React child (found: " + (Y === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : Y) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return zt;
  }
  function $(E, Y, J) {
    if (E == null) return E;
    var tt = [], ft = 0;
    return U(E, tt, "", "", function(dt) {
      return Y.call(J, dt, ft++);
    }), tt;
  }
  function et(E) {
    if (E._status === -1) {
      var Y = E._result;
      Y = Y(), Y.then(
        function(J) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = J);
        },
        function(J) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = J);
        }
      ), E._status === -1 && (E._status = 0, E._result = Y);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var pt = typeof reportError == "function" ? reportError : function(E) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Y = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
        error: E
      });
      if (!window.dispatchEvent(Y)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", E);
      return;
    }
    console.error(E);
  }, Tt = {
    map: $,
    forEach: function(E, Y, J) {
      $(
        E,
        function() {
          Y.apply(this, arguments);
        },
        J
      );
    },
    count: function(E) {
      var Y = 0;
      return $(E, function() {
        Y++;
      }), Y;
    },
    toArray: function(E) {
      return $(E, function(Y) {
        return Y;
      }) || [];
    },
    only: function(E) {
      if (!K(E))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return E;
    }
  };
  return ot.Activity = b, ot.Children = Tt, ot.Component = X, ot.Fragment = c, ot.Profiler = r, ot.PureComponent = V, ot.StrictMode = f, ot.Suspense = g, ot.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G, ot.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return G.H.useMemoCache(E);
    }
  }, ot.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, ot.cacheSignal = function() {
    return null;
  }, ot.cloneElement = function(E, Y, J) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var tt = W({}, E.props), ft = E.key;
    if (Y != null)
      for (dt in Y.key !== void 0 && (ft = "" + Y.key), Y)
        !F.call(Y, dt) || dt === "key" || dt === "__self" || dt === "__source" || dt === "ref" && Y.ref === void 0 || (tt[dt] = Y[dt]);
    var dt = arguments.length - 2;
    if (dt === 1) tt.children = J;
    else if (1 < dt) {
      for (var zt = Array(dt), cl = 0; cl < dt; cl++)
        zt[cl] = arguments[cl + 2];
      tt.children = zt;
    }
    return k(E.type, ft, tt);
  }, ot.createContext = function(E) {
    return E = {
      $$typeof: m,
      _currentValue: E,
      _currentValue2: E,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, E.Provider = E, E.Consumer = {
      $$typeof: d,
      _context: E
    }, E;
  }, ot.createElement = function(E, Y, J) {
    var tt, ft = {}, dt = null;
    if (Y != null)
      for (tt in Y.key !== void 0 && (dt = "" + Y.key), Y)
        F.call(Y, tt) && tt !== "key" && tt !== "__self" && tt !== "__source" && (ft[tt] = Y[tt]);
    var zt = arguments.length - 2;
    if (zt === 1) ft.children = J;
    else if (1 < zt) {
      for (var cl = Array(zt), Yt = 0; Yt < zt; Yt++)
        cl[Yt] = arguments[Yt + 2];
      ft.children = cl;
    }
    if (E && E.defaultProps)
      for (tt in zt = E.defaultProps, zt)
        ft[tt] === void 0 && (ft[tt] = zt[tt]);
    return k(E, dt, ft);
  }, ot.createRef = function() {
    return { current: null };
  }, ot.forwardRef = function(E) {
    return { $$typeof: p, render: E };
  }, ot.isValidElement = K, ot.lazy = function(E) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: E },
      _init: et
    };
  }, ot.memo = function(E, Y) {
    return {
      $$typeof: y,
      type: E,
      compare: Y === void 0 ? null : Y
    };
  }, ot.startTransition = function(E) {
    var Y = G.T, J = {};
    G.T = J;
    try {
      var tt = E(), ft = G.S;
      ft !== null && ft(J, tt), typeof tt == "object" && tt !== null && typeof tt.then == "function" && tt.then(T, pt);
    } catch (dt) {
      pt(dt);
    } finally {
      Y !== null && J.types !== null && (Y.types = J.types), G.T = Y;
    }
  }, ot.unstable_useCacheRefresh = function() {
    return G.H.useCacheRefresh();
  }, ot.use = function(E) {
    return G.H.use(E);
  }, ot.useActionState = function(E, Y, J) {
    return G.H.useActionState(E, Y, J);
  }, ot.useCallback = function(E, Y) {
    return G.H.useCallback(E, Y);
  }, ot.useContext = function(E) {
    return G.H.useContext(E);
  }, ot.useDebugValue = function() {
  }, ot.useDeferredValue = function(E, Y) {
    return G.H.useDeferredValue(E, Y);
  }, ot.useEffect = function(E, Y) {
    return G.H.useEffect(E, Y);
  }, ot.useEffectEvent = function(E) {
    return G.H.useEffectEvent(E);
  }, ot.useId = function() {
    return G.H.useId();
  }, ot.useImperativeHandle = function(E, Y, J) {
    return G.H.useImperativeHandle(E, Y, J);
  }, ot.useInsertionEffect = function(E, Y) {
    return G.H.useInsertionEffect(E, Y);
  }, ot.useLayoutEffect = function(E, Y) {
    return G.H.useLayoutEffect(E, Y);
  }, ot.useMemo = function(E, Y) {
    return G.H.useMemo(E, Y);
  }, ot.useOptimistic = function(E, Y) {
    return G.H.useOptimistic(E, Y);
  }, ot.useReducer = function(E, Y, J) {
    return G.H.useReducer(E, Y, J);
  }, ot.useRef = function(E) {
    return G.H.useRef(E);
  }, ot.useState = function(E) {
    return G.H.useState(E);
  }, ot.useSyncExternalStore = function(E, Y, J) {
    return G.H.useSyncExternalStore(
      E,
      Y,
      J
    );
  }, ot.useTransition = function() {
    return G.H.useTransition();
  }, ot.version = "19.2.0", ot;
}
var Zh;
function ur() {
  return Zh || (Zh = 1, ps.exports = AS()), ps.exports;
}
var ct = ur();
const I = {
  bg: "#1e1f2b",
  surface: "#2a2c3d",
  surfaceAlt: "#343750",
  border: "#3d4060",
  text: "#e8e9f3",
  textDim: "#9a9cb8",
  accent: "#6c8cff",
  accentText: "#ffffff",
  danger: "#ff5d5d"
}, zS = [
  "#ff6b9d",
  "#5ad1c9",
  "#ffd166",
  "#a0e85b",
  "#5b9bff",
  "#ff9b54"
], kl = {
  background: I.accent,
  color: I.accentText,
  border: "none",
  borderRadius: 8,
  padding: "10px 18px",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer"
}, Xc = {
  ...kl,
  background: I.surfaceAlt,
  color: I.text
}, Vh = {
  background: I.surface,
  border: `1px solid ${I.border}`,
  borderRadius: 12,
  padding: 20
}, _S = 44, Qs = 62, vs = {
  single: "Single",
  pair: "Pair",
  triple: "Triple",
  straight: "Straight",
  flush: "Flush",
  fullhouse: "Full house",
  quads: "Four of a kind",
  straightflush: "Straight flush"
}, OS = (a, u) => a.length === u.length && a.every((c, f) => c === u[f]);
function Kh({ card: a }) {
  const u = Ns(a), c = u === 0 || u === 2;
  return /* @__PURE__ */ z.jsxs(
    "div",
    {
      style: {
        width: _S,
        height: Qs,
        borderRadius: 6,
        background: "#fbfaf4",
        border: "1px solid #c7c2b0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: c ? "#c33027" : "#1b1b22",
        userSelect: "none"
      },
      children: [
        /* @__PURE__ */ z.jsx("span", { style: { fontSize: 17, fontWeight: 800, lineHeight: 1 }, children: r2[Ie(a)] ?? "?" }),
        /* @__PURE__ */ z.jsx("span", { style: { fontSize: 21, lineHeight: 1.1 }, children: d2[u] ?? "" })
      ]
    }
  );
}
function CS({ w: a, h: u }) {
  return /* @__PURE__ */ z.jsx(
    "div",
    {
      style: {
        width: a,
        height: u,
        borderRadius: 6,
        background: "repeating-linear-gradient(45deg,#3c4a78,#3c4a78 5px,#2d3860 5px,#2d3860 10px)",
        border: "1px solid #222a4a",
        boxShadow: "0 1px 2px rgba(0,0,0,0.4)"
      }
    }
  );
}
function DS(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, [m, p] = ct.useState(/* @__PURE__ */ new Set()), g = u.hand, y = [...m].filter((Z) => g.includes(Z)).sort((Z, V) => Z - V), v = r && c.some((Z) => Z.cards.length === 0), b = r && y.length > 0 && c.some((Z) => Z.cards.length > 0 && OS(Z.cards, y)), R = y.length > 0 ? Yc(y) : null;
  function N(Z) {
    r && p((V) => {
      const j = new Set(V);
      return j.has(Z) ? j.delete(Z) : j.add(Z), j;
    });
  }
  function Q() {
    b && (d({ cards: y }), p(/* @__PURE__ */ new Set()));
  }
  function W() {
    v && (d({ cards: [] }), p(/* @__PURE__ */ new Set()));
  }
  const w = Array.from({ length: u.handSizes.length }, (Z, V) => V).filter(
    (Z) => Z !== u.seat
  );
  let X = "Select cards to play";
  return y.length > 0 && (b && R ? X = `${vs[R.type]} ✓` : R ? X = `${vs[R.type]} — can't be played now` : X = "Not a valid combination"), /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: 480 }, children: [
    /* @__PURE__ */ z.jsx("div", { style: { display: "flex", gap: 26, justifyContent: "center" }, children: w.map((Z) => {
      const V = f === Z;
      return /* @__PURE__ */ z.jsxs(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            opacity: V ? 1 : 0.6
          },
          children: [
            /* @__PURE__ */ z.jsx("div", { style: { position: "relative", width: 46, height: 34 }, children: [0, 1, 2].map((j) => /* @__PURE__ */ z.jsx("div", { style: { position: "absolute", left: j * 8 }, children: /* @__PURE__ */ z.jsx(CS, { w: 30, h: 34 }) }, j)) }),
            /* @__PURE__ */ z.jsxs(
              "span",
              {
                style: {
                  fontSize: 12.5,
                  fontWeight: V ? 700 : 500,
                  color: V ? I.accent : I.textDim
                },
                children: [
                  "Player ",
                  Z + 1,
                  " · ",
                  u.handSizes[Z] ?? 0
                ]
              }
            )
          ]
        },
        Z
      );
    }) }),
    /* @__PURE__ */ z.jsx(
      "div",
      {
        style: {
          minHeight: Qs + 28,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "12px 0",
          borderRadius: 12,
          background: I.surfaceAlt,
          border: `1px solid ${I.border}`
        },
        children: u.table ? /* @__PURE__ */ z.jsxs(z.Fragment, { children: [
          /* @__PURE__ */ z.jsx("div", { style: { display: "flex", gap: 6 }, children: u.table.cards.map((Z) => /* @__PURE__ */ z.jsx(Kh, { card: Z }, Z)) }),
          /* @__PURE__ */ z.jsxs("span", { style: { fontSize: 13, color: I.textDim }, children: [
            "Player ",
            u.table.seat + 1,
            " played a ",
            vs[u.table.type].toLowerCase()
          ] })
        ] }) : /* @__PURE__ */ z.jsx("span", { style: { fontSize: 14, color: I.textDim }, children: f === u.seat ? "Your lead — play any combination" : `Player ${(f ?? 0) + 1} leads the round` })
      }
    ),
    /* @__PURE__ */ z.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "center",
          minHeight: Qs + 20,
          paddingLeft: 12
        },
        children: [
          g.length === 0 && /* @__PURE__ */ z.jsx("span", { style: { color: I.textDim, fontSize: 14 }, children: "— no cards —" }),
          g.map((Z, V) => {
            const j = y.includes(Z);
            return /* @__PURE__ */ z.jsx(
              "div",
              {
                onClick: () => N(Z),
                style: {
                  marginLeft: V === 0 ? 0 : -12,
                  position: "relative",
                  zIndex: j ? 100 + V : V,
                  cursor: r ? "pointer" : "default",
                  transform: j ? "translateY(-16px)" : "none",
                  transition: "transform 110ms ease",
                  borderRadius: 6,
                  outline: j ? `2px solid ${I.accent}` : "none"
                },
                children: /* @__PURE__ */ z.jsx(Kh, { card: Z })
              },
              Z
            );
          })
        ]
      }
    ),
    /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ z.jsx("span", { style: { fontSize: 13, color: b ? I.accent : I.textDim, minHeight: 16 }, children: r ? X : "" }),
      /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ z.jsx(
          "button",
          {
            onClick: Q,
            disabled: !b,
            style: {
              ...kl,
              padding: "9px 20px",
              visibility: r ? "visible" : "hidden",
              opacity: b ? 1 : 0.4,
              cursor: b ? "pointer" : "default"
            },
            children: "Play"
          }
        ),
        /* @__PURE__ */ z.jsx(
          "button",
          {
            onClick: W,
            disabled: !v,
            style: {
              ...Xc,
              padding: "9px 20px",
              visibility: r ? "visible" : "hidden",
              opacity: v ? 1 : 0.4,
              cursor: v ? "pointer" : "default"
            },
            children: "Pass"
          }
        )
      ] })
    ] })
  ] });
}
const RS = "miniboard.settings";
function jS() {
  return { confirmMove: !1, seatColors: [...zS] };
}
function NS() {
  const a = jS();
  if (typeof localStorage > "u") return a;
  try {
    const u = localStorage.getItem(RS);
    if (!u) return a;
    const c = JSON.parse(u), f = c.seatColors;
    return {
      confirmMove: typeof c.confirmMove == "boolean" ? c.confirmMove : a.confirmMove,
      seatColors: Array.isArray(f) && f.length === a.seatColors.length ? a.seatColors.map((r, d) => {
        const m = f[d];
        return typeof m == "string" ? m : r;
      }) : a.seatColors
    };
  } catch {
    return a;
  }
}
let US = NS();
const $h = /* @__PURE__ */ new Set();
function HS() {
  return US;
}
function Te() {
  return ct.useSyncExternalStore(
    (a) => ($h.add(a), () => $h.delete(a)),
    HS
  );
}
const Un = Zy, Vl = 52, We = Vl * 0.72, Ca = (a) => Math.floor(a / Un), Da = (a) => a % Un;
function BS(a) {
  const u = [a.from];
  let c = a.from;
  for (const f of a.captures)
    c = (2 * Ca(f) - Ca(c)) * Un + (2 * Da(f) - Da(c)), u.push(c);
  return u[u.length - 1] !== a.to && u.push(a.to), u;
}
function LS(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m, seatColors: p } = Te(), [g, y] = ct.useState(null), [v, b] = ct.useState(null), [R, N] = ct.useState(null), Q = ct.useRef(null), W = ct.useRef(null);
  ct.useEffect(() => {
    const k = u.lastMove;
    if (k != null && k !== W.current) {
      W.current = k;
      const q = u.board[k.to];
      q && N({ move: k, piece: q });
    }
  }, [u.lastMove, u.board]), ct.useEffect(() => {
    if (!R) return;
    const k = Q.current;
    if (!k) return;
    const q = BS(R.move), K = R.move.to, at = q.map((Mt) => ({
      transform: `translate(${(Da(Mt) - Da(K)) * Vl}px, ${(Ca(Mt) - Ca(K)) * Vl}px)`
    })), St = Math.max(1, q.length - 1), bt = k.animate(at, {
      duration: 160 + St * 150,
      easing: "ease-in-out",
      fill: "backwards"
    });
    return bt.onfinish = () => N(null), () => bt.cancel();
  }, [R]);
  const w = ct.useMemo(() => {
    const k = /* @__PURE__ */ new Map();
    for (const q of c) {
      const K = k.get(q.from);
      K ? K.push(q) : k.set(q.from, [q]);
    }
    return k;
  }, [c]), X = r && g != null && u.board[g]?.seat === f ? g : null, Z = X != null ? w.get(X) ?? [] : [], V = new Set(Z.map((k) => k.to)), j = (k) => c.some((q) => q.from === k.from && q.to === k.to), x = m && r && v != null && j(v) ? v : null, T = x != null ? u.board[x.from] : null;
  function G(k) {
    if (r) {
      if (x != null && k === x.to) {
        b(null);
        return;
      }
      if (X != null && V.has(k)) {
        const q = Z.find((K) => K.to === k);
        if (!q) return;
        m ? b(q) : (d(q), y(null));
      } else u.board[k]?.seat === f && w.has(k) ? (y((q) => q === k ? null : k), b(null)) : (y(null), b(null));
    }
  }
  function F() {
    x != null && (d(x), y(null), b(null));
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsxs(
      "div",
      {
        style: {
          position: "relative",
          display: "grid",
          gridTemplateColumns: `repeat(${Un}, ${Vl}px)`,
          gridTemplateRows: `repeat(${Un}, ${Vl}px)`,
          border: `3px solid ${I.border}`,
          borderRadius: 8,
          overflow: "hidden"
        },
        children: [
          Array.from({ length: Un * Un }, (k, q) => {
            const K = Ca(q), at = Da(q), St = (K + at) % 2 === 1, bt = u.board[q], Mt = X === q, U = V.has(q), $ = x != null && x.from === q, et = x != null && x.to === q, pt = R != null && R.move.to === q, Tt = u.lastMove != null && (u.lastMove.from === q || u.lastMove.to === q), E = r && (U || bt?.seat === f && w.has(q));
            return /* @__PURE__ */ z.jsxs(
              "div",
              {
                onClick: () => G(q),
                style: {
                  width: Vl,
                  height: Vl,
                  background: St ? "#3c3547" : "#5b5468",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: E ? "pointer" : "default",
                  boxShadow: $ || et || Tt ? `inset 0 0 0 3px ${I.accent}` : "none",
                  animation: `${wn} 220ms ease-out ${(K + at) * 26}ms backwards`
                },
                children: [
                  U && !et && /* @__PURE__ */ z.jsx(
                    "span",
                    {
                      style: { width: 16, height: 16, borderRadius: "50%", background: I.accent, opacity: 0.65 }
                    }
                  ),
                  et && T && // A faint disc previews where the staged move lands.
                  /* @__PURE__ */ z.jsx(
                    "span",
                    {
                      style: {
                        width: We,
                        height: We,
                        borderRadius: "50%",
                        background: p[T.seat],
                        opacity: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(0,0,0,0.55)",
                        fontSize: 22
                      },
                      children: T.king ? "♔" : ""
                    }
                  ),
                  bt && !et && !pt && /* @__PURE__ */ z.jsx(
                    "span",
                    {
                      style: {
                        width: We,
                        height: We,
                        borderRadius: "50%",
                        background: p[bt.seat],
                        boxShadow: Mt ? `0 0 0 3px ${I.text}` : "inset 0 -3px 7px rgba(0,0,0,0.4)",
                        // The staged piece dims while it waits on its from-square.
                        opacity: $ ? 0.4 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(0,0,0,0.55)",
                        fontSize: 22
                      },
                      children: bt.king ? "♔" : ""
                    }
                  )
                ]
              },
              q
            );
          }),
          R && /* @__PURE__ */ z.jsx(
            "div",
            {
              ref: Q,
              style: {
                position: "absolute",
                left: Da(R.move.to) * Vl + (Vl - We) / 2,
                top: Ca(R.move.to) * Vl + (Vl - We) / 2,
                width: We,
                height: We,
                borderRadius: "50%",
                background: p[R.piece.seat],
                boxShadow: "inset 0 -3px 7px rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(0,0,0,0.55)",
                fontSize: 22,
                pointerEvents: "none",
                zIndex: 5
              },
              children: R.piece.king ? "♔" : ""
            }
          )
        ]
      }
    ),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: F,
        disabled: x == null,
        style: {
          ...kl,
          // Stays in the layout (hidden) off-turn so the board never shifts.
          visibility: r ? "visible" : "hidden",
          opacity: x != null ? 1 : 0.4,
          cursor: x != null ? "pointer" : "default"
        },
        children: x != null ? "Confirm move" : X != null ? "Pick a square" : "Select a piece"
      }
    )
  ] });
}
const Pl = Ny, wl = 52, ju = (a) => Math.floor(a / Pl), _n = (a) => a % Pl, Ss = {
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟"
}, bs = ["#f3ecdc", "#2c2b34"], Ms = ["#2c2b34", "#d8d2c0"];
function YS(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m } = Te(), [p, g] = ct.useState(null), [y, v] = ct.useState(null), [b, R] = ct.useState(null), N = ct.useRef(null), Q = ct.useRef(null), W = ct.useRef(null);
  ct.useEffect(() => {
    const q = u.lastMove;
    if (q == null || q === W.current) return;
    W.current = q;
    const K = u.board[q.to];
    if (!K) return;
    let at;
    if (K.type === "k" && Math.abs(_n(q.to) - _n(q.from)) === 2) {
      const St = ju(q.from), [bt, Mt] = _n(q.to) === 6 ? [St * Pl + 7, St * Pl + 5] : [St * Pl, St * Pl + 3], U = u.board[Mt];
      U && (at = { from: bt, to: Mt, piece: U });
    }
    R({ move: q, piece: K, rook: at });
  }, [u.lastMove, u.board]), ct.useEffect(() => {
    if (!b) return;
    const q = (at, St, bt) => at.animate(
      [
        {
          transform: `translate(${(_n(St) - _n(bt)) * wl}px, ${(ju(St) - ju(bt)) * wl}px)`
        },
        { transform: "translate(0px, 0px)" }
      ],
      { duration: 280, easing: "ease-in-out", fill: "backwards" }
    ), K = [];
    if (N.current) {
      const at = q(N.current, b.move.from, b.move.to);
      at.onfinish = () => R(null), K.push(at);
    }
    return b.rook && Q.current && K.push(q(Q.current, b.rook.from, b.rook.to)), () => K.forEach((at) => at.cancel());
  }, [b]);
  const w = ct.useMemo(() => {
    const q = /* @__PURE__ */ new Map();
    for (const K of c) {
      const at = q.get(K.from);
      at ? at.push(K) : q.set(K.from, [K]);
    }
    return q;
  }, [c]), X = r && p != null && u.board[p]?.seat === f ? p : null, Z = X != null ? w.get(X) ?? [] : [], V = new Set(Z.map((q) => q.to)), j = (q) => c.some((K) => K.from === q.from && K.to === q.to), x = m && r && y != null && j(y) ? y : null, T = x != null ? u.board[x.from] : null;
  function G(q) {
    if (r) {
      if (x != null && q === x.to) {
        v(null);
        return;
      }
      if (X != null && V.has(q)) {
        const K = Z.find((at) => at.to === q);
        if (!K) return;
        m ? v(K) : (d(K), g(null));
      } else u.board[q]?.seat === f && w.has(q) ? (g((K) => K === q ? null : q), v(null)) : (g(null), v(null));
    }
  }
  function F() {
    x != null && (d(x), g(null), v(null));
  }
  const k = (q, K, at) => /* @__PURE__ */ z.jsx(
    "div",
    {
      ref: q,
      style: {
        position: "absolute",
        left: _n(K) * wl,
        top: ju(K) * wl,
        width: wl,
        height: wl,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 5
      },
      children: /* @__PURE__ */ z.jsx(
        "span",
        {
          style: {
            fontSize: 38,
            lineHeight: 1,
            color: bs[at.seat],
            WebkitTextStroke: `1.4px ${Ms[at.seat]}`
          },
          children: Ss[at.type]
        }
      )
    }
  );
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsxs(
      "div",
      {
        style: {
          position: "relative",
          display: "grid",
          gridTemplateColumns: `repeat(${Pl}, ${wl}px)`,
          gridTemplateRows: `repeat(${Pl}, ${wl}px)`,
          border: `3px solid ${I.border}`,
          borderRadius: 8,
          overflow: "hidden"
        },
        children: [
          Array.from({ length: Pl * Pl }, (q, K) => {
            const at = ju(K), St = _n(K), bt = (at + St) % 2 === 1, Mt = u.board[K], U = X === K, $ = V.has(K), et = x != null && x.from === K, pt = x != null && x.to === K, Tt = b != null && (b.move.to === K || b.rook != null && b.rook.to === K), E = u.lastMove != null && (u.lastMove.from === K || u.lastMove.to === K), Y = r && ($ || Mt?.seat === f && w.has(K));
            return /* @__PURE__ */ z.jsxs(
              "div",
              {
                onClick: () => G(K),
                style: {
                  width: wl,
                  height: wl,
                  background: bt ? "#6f6048" : "#b6a079",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  cursor: Y ? "pointer" : "default",
                  boxShadow: et || pt ? `inset 0 0 0 3px ${I.accent}` : U ? `inset 0 0 0 3px ${I.text}` : E ? `inset 0 0 0 3px ${I.accent}` : "none",
                  animation: `${wn} 220ms ease-out ${(at + St) * 26}ms backwards`
                },
                children: [
                  $ && !pt && /* @__PURE__ */ z.jsx(
                    "span",
                    {
                      style: {
                        position: "absolute",
                        width: Mt ? wl - 8 : 16,
                        height: Mt ? wl - 8 : 16,
                        borderRadius: "50%",
                        background: Mt ? "transparent" : I.accent,
                        border: Mt ? `3px solid ${I.accent}` : "none",
                        opacity: 0.7
                      }
                    }
                  ),
                  pt && T && // A faint glyph previews where the staged move lands.
                  /* @__PURE__ */ z.jsx(
                    "span",
                    {
                      style: {
                        fontSize: 38,
                        lineHeight: 1,
                        color: bs[T.seat],
                        WebkitTextStroke: `1.4px ${Ms[T.seat]}`,
                        opacity: 0.45
                      },
                      children: Ss[T.type]
                    }
                  ),
                  Mt && !pt && !Tt && /* @__PURE__ */ z.jsx(
                    "span",
                    {
                      style: {
                        fontSize: 38,
                        lineHeight: 1,
                        color: bs[Mt.seat],
                        WebkitTextStroke: `1.4px ${Ms[Mt.seat]}`,
                        // The staged piece dims while it waits on its from-square.
                        opacity: et ? 0.4 : 1
                      },
                      children: Ss[Mt.type]
                    }
                  )
                ]
              },
              K
            );
          }),
          b && k(N, b.move.to, b.piece),
          b?.rook && k(Q, b.rook.to, b.rook.piece)
        ]
      }
    ),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: F,
        disabled: x == null,
        style: {
          ...kl,
          // Stays in the layout (hidden) off-turn so the board never shifts.
          visibility: r ? "visible" : "hidden",
          opacity: x != null ? 1 : 0.4,
          cursor: x != null ? "pointer" : "default"
        },
        children: x != null ? "Confirm move" : X != null ? "Pick a square" : "Select a piece"
      }
    )
  ] });
}
const qu = Gn, kh = 16, wS = Math.sqrt(3) / 2, Jh = 8.5, Uc = 10.5, gc = Uc + 5, GS = ["#46303c", "#30463f", "#46432f", "#324a33", "#313a4e", "#4a3a2c"];
function qS(a) {
  return a.x >= 5 ? 0 : a.z <= -5 ? 1 : a.y >= 5 ? 2 : a.x <= -5 ? 3 : a.z >= 5 ? 4 : a.y <= -5 ? 5 : -1;
}
const Rn = (() => {
  const a = qu.map((g) => 1.5 * g.x * kh), u = qu.map((g) => wS * (g.y - g.z) * kh), c = Math.min(...a), f = Math.min(...u), r = Math.max(...a) - c + 2 * gc, d = Math.max(...u) - f + 2 * gc, m = qu.map((g, y) => ({ cx: a[y] - c + gc, cy: u[y] - f + gc })), p = qu.map((g) => Math.max(Math.abs(g.x), Math.abs(g.y), Math.abs(g.z)) * 26);
  return { width: r, height: d, centers: m, delays: p };
})();
function XS(a, u) {
  const c = Rn.centers[a], f = c.cx - u.cx, r = c.cy - u.cy, d = Math.hypot(f, r), m = 10 + Math.min(d, 220) * 0.07;
  return {
    animation: `${Js} ${Math.min(560, 260 + d * 0.9)}ms ease-in-out both`,
    "--hop-x": `${f}px`,
    "--hop-y": `${r}px`,
    "--hop-mx": `${f / 2}px`,
    "--hop-my": `${r / 2 - m}px`
  };
}
function QS(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m, seatColors: p } = Te(), [g, y] = ct.useState(null), [v, b] = ct.useState(null), R = ct.useMemo(() => {
    const j = /* @__PURE__ */ new Map();
    for (const x of c) {
      let T = j.get(x.from);
      T || j.set(x.from, T = /* @__PURE__ */ new Set()), T.add(x.to);
    }
    return j;
  }, [c]), N = r && g != null && u.board[g] === f ? g : null, Q = N != null ? R.get(N) : void 0, W = (j) => c.some((x) => x.from === j.from && x.to === j.to), w = m && r && v != null && W(v) ? v : null, X = w != null ? u.board[w.from] : null;
  function Z(j) {
    if (r) {
      if (w != null && j === w.to) {
        b(null);
        return;
      }
      if (N != null && Q?.has(j)) {
        const x = { from: N, to: j };
        m ? b(x) : (d(x), y(null));
      } else u.board[j] === f && R.has(j) ? (y((x) => x === j ? null : j), b(null)) : (y(null), b(null));
    }
  }
  function V() {
    w != null && (d(w), y(null), b(null));
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsx(
      "svg",
      {
        width: Rn.width,
        height: Rn.height,
        viewBox: `0 0 ${Rn.width} ${Rn.height}`,
        style: { display: "block" },
        children: qu.map((j, x) => {
          const T = Rn.centers[x], G = u.board[x], F = qS(j), k = N === x, q = Q?.has(x) ?? !1, K = w != null && w.from === x, at = w != null && w.to === x, St = u.lastMove != null && (u.lastMove.from === x || u.lastMove.to === x), bt = u.lastMove != null && u.lastMove.to === x ? u.lastMove.from : null, Mt = K || at || St, U = r && (G === f && R.has(x) || q);
          return /* @__PURE__ */ z.jsxs(
            "g",
            {
              onClick: () => Z(x),
              style: {
                cursor: U ? "pointer" : "default",
                animation: `${$s} 240ms ease-out ${Rn.delays[x]}ms backwards`
              },
              children: [
                /* @__PURE__ */ z.jsx(
                  "circle",
                  {
                    cx: T.cx,
                    cy: T.cy,
                    r: Jh,
                    fill: F >= 0 ? GS[F] : I.surfaceAlt,
                    stroke: Mt ? I.accent : I.border,
                    strokeWidth: Mt ? 2 : 1
                  }
                ),
                q && G == null && !at && /* @__PURE__ */ z.jsx("circle", { cx: T.cx, cy: T.cy, r: Jh - 2, fill: I.accent, opacity: 0.55 }),
                at && X != null && // A faint peg previews where the staged move lands.
                /* @__PURE__ */ z.jsx("circle", { cx: T.cx, cy: T.cy, r: Uc, fill: p[X], opacity: 0.45 }),
                G != null && !at && (bt != null ? (
                  // The peg that just moved slides and hops in from its old hole.
                  /* @__PURE__ */ z.jsx("g", { style: XS(bt, T), children: /* @__PURE__ */ z.jsx(
                    "circle",
                    {
                      cx: T.cx,
                      cy: T.cy,
                      r: Uc,
                      fill: p[G],
                      stroke: k ? I.text : "rgba(0,0,0,0.35)",
                      strokeWidth: k ? 3 : 1.5
                    }
                  ) })
                ) : /* @__PURE__ */ z.jsx(
                  "circle",
                  {
                    cx: T.cx,
                    cy: T.cy,
                    r: Uc,
                    fill: p[G],
                    stroke: k ? I.text : "rgba(0,0,0,0.35)",
                    strokeWidth: k ? 3 : 1.5,
                    opacity: K ? 0.4 : 1
                  }
                ))
              ]
            },
            x
          );
        })
      }
    ),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: V,
        disabled: w == null,
        style: {
          ...kl,
          // Stays in the layout (hidden) off-turn so the board never shifts.
          visibility: r ? "visible" : "hidden",
          opacity: w != null ? 1 : 0.4,
          cursor: w != null ? "pointer" : "default"
        },
        children: w != null ? "Confirm move" : N != null ? "Pick a destination" : "Select a peg"
      }
    )
  ] });
}
const Zs = lm, vm = em, Es = 54, pc = 8, ZS = "#6a4e9c";
function Wh(a, u) {
  for (let c = vm - 1; c >= 0; c--)
    if (a[c * Zs + u] == null) return c;
  return -1;
}
function VS(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m, seatColors: p } = Te(), [g, y] = ct.useState(null), [v, b] = ct.useState(null), R = new Set(c.map((X) => X.column)), N = m && r && v != null && R.has(v) ? v : null, Q = p[f ?? 0] ?? I.accent;
  function W(X) {
    m ? b((Z) => Z === X ? null : X) : d({ column: X });
  }
  function w() {
    N != null && (d({ column: N }), b(null));
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsx(
      "div",
      {
        style: {
          display: "flex",
          gap: 0,
          padding: pc,
          background: ZS,
          borderRadius: 16
        },
        children: Array.from({ length: Zs }, (X, Z) => {
          const V = r && R.has(Z), j = N === Z, x = V && g === Z ? Wh(u.board, Z) : -1, T = j ? Wh(u.board, Z) : -1;
          return /* @__PURE__ */ z.jsx(
            "button",
            {
              disabled: !V,
              onClick: () => {
                V && W(Z);
              },
              onMouseEnter: () => y(Z),
              onMouseLeave: () => y((G) => G === Z ? null : G),
              style: {
                display: "flex",
                flexDirection: "column",
                gap: pc,
                // Padding lets the column tint reach into the gaps between
                // columns; the board gap is 0 to keep cell spacing unchanged.
                padding: pc / 2,
                border: "none",
                borderRadius: 8,
                // The picked column is tinted faintly in the player's colour.
                background: j ? `${Q}33` : "transparent",
                cursor: V ? "pointer" : "default"
              },
              children: Array.from({ length: vm }, (G, F) => {
                const k = u.board[F * Zs + Z], q = k == null && F === T, K = k == null && F === x && !q;
                return /* @__PURE__ */ z.jsx(
                  "span",
                  {
                    style: {
                      width: Es,
                      height: Es,
                      borderRadius: "50%",
                      background: q || K ? Q : I.bg,
                      // A faint disc marks where a confirmed drop would land.
                      opacity: q ? 0.6 : K ? 0.3 : 1,
                      animation: `${wn} 240ms ease-out ${(F + Z) * 24}ms backwards`
                    },
                    children: k != null && /* @__PURE__ */ z.jsx(
                      "span",
                      {
                        style: {
                          display: "block",
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          background: p[k],
                          animation: `${gy} 440ms both`,
                          "--ggr-drop": `${-(F + 1) * (Es + pc)}px`
                        }
                      }
                    )
                  },
                  F
                );
              })
            },
            Z
          );
        })
      }
    ),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: w,
        disabled: N == null,
        style: {
          ...kl,
          // Stays in the layout (hidden) off-turn so the board never shifts.
          visibility: r ? "visible" : "hidden",
          opacity: N != null ? 1 : 0.4,
          cursor: N != null ? "pointer" : "default"
        },
        children: N != null ? "Confirm move" : "Pick a column"
      }
    )
  ] });
}
const Fh = ["#1c1c1c", "#f3efe2"], KS = ["#000000", "#b8b09a"], $S = "#dcb86a", Nu = "#3d2f17";
function kS(a) {
  return a === 9 ? [[2, 2], [2, 6], [6, 2], [6, 6], [4, 4]] : a === 13 ? [[3, 3], [3, 9], [9, 3], [9, 9], [6, 6]] : [
    [3, 3],
    [3, 9],
    [3, 15],
    [9, 3],
    [9, 9],
    [9, 15],
    [15, 3],
    [15, 9],
    [15, 15]
  ];
}
function JS(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, [m, p] = ct.useState(null), g = u.size, y = 500 / (g - 1), v = Math.min(y, 26), b = y * (g - 1) + v * 2, R = y * 0.46, N = new Set(c.map((V) => V.point).filter((V) => V != null)), Q = r && c.some((V) => V.point == null), W = (V) => v + V * y, w = (V) => W(V % g), X = (V) => W(Math.floor(V / g));
  function Z(V) {
    r && N.has(V) && d({ point: V });
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }, children: [
    /* @__PURE__ */ z.jsxs(
      "svg",
      {
        width: b,
        height: b,
        onMouseLeave: () => p(null),
        style: { background: $S, borderRadius: 8, border: `1px solid ${Nu}` },
        children: [
          Array.from({ length: g }, (V, j) => /* @__PURE__ */ z.jsxs("g", { children: [
            /* @__PURE__ */ z.jsx("line", { x1: W(0), y1: W(j), x2: W(g - 1), y2: W(j), stroke: Nu, strokeWidth: 1.3 }),
            /* @__PURE__ */ z.jsx("line", { x1: W(j), y1: W(0), x2: W(j), y2: W(g - 1), stroke: Nu, strokeWidth: 1.3 })
          ] }, j)),
          kS(g).map(([V, j], x) => /* @__PURE__ */ z.jsx("circle", { cx: W(j), cy: W(V), r: Math.max(2.6, R * 0.22), fill: Nu }, `s${x}`)),
          Array.from({ length: g * g }, (V, j) => {
            const x = w(j), T = X(j), G = u.board[j], F = r && N.has(j), k = m === j && F && G == null, q = u.lastMove === j, K = u.ko === j;
            return /* @__PURE__ */ z.jsxs(
              "g",
              {
                onClick: () => Z(j),
                onMouseEnter: () => p(j),
                style: { cursor: F ? "pointer" : "default" },
                children: [
                  G != null && /* @__PURE__ */ z.jsx(
                    "circle",
                    {
                      cx: x,
                      cy: T,
                      r: R,
                      fill: Fh[G] ?? "#888",
                      stroke: KS[G] ?? "#444",
                      strokeWidth: 1
                    }
                  ),
                  G != null && q && /* @__PURE__ */ z.jsx(
                    "circle",
                    {
                      cx: x,
                      cy: T,
                      r: R * 0.36,
                      fill: "none",
                      stroke: G === 0 ? "#fff" : "#000",
                      strokeWidth: 2
                    }
                  ),
                  K && G == null && /* @__PURE__ */ z.jsx(
                    "rect",
                    {
                      x: x - R * 0.4,
                      y: T - R * 0.4,
                      width: R * 0.8,
                      height: R * 0.8,
                      fill: "none",
                      stroke: Nu,
                      strokeWidth: 1.6
                    }
                  ),
                  k && /* @__PURE__ */ z.jsx("circle", { cx: x, cy: T, r: R, fill: Fh[f ?? 0], opacity: 0.4 }),
                  /* @__PURE__ */ z.jsx("rect", { x: x - y / 2, y: T - y / 2, width: y, height: y, fill: "transparent" })
                ]
              },
              j
            );
          })
        ]
      }
    ),
    /* @__PURE__ */ z.jsxs("div", { style: { fontSize: 13, color: I.textDim }, children: [
      g,
      "×",
      g,
      " · Captures — Black ",
      u.captures[0],
      " · White ",
      u.captures[1]
    ] }),
    f != null && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: () => d({ point: null }),
        disabled: !Q,
        style: {
          ...kl,
          padding: "9px 22px",
          visibility: r ? "visible" : "hidden"
        },
        children: "Pass"
      }
    )
  ] });
}
const vc = im, Sc = 28, bc = 22, WS = "#c89b6a", FS = "#6f5436";
function IS(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m, seatColors: p } = Te(), [g, y] = ct.useState(null), [v, b] = ct.useState(null), R = new Set(c.map((X) => X.cell)), N = m && r && v != null && R.has(v) ? v : null, Q = p[f ?? 0] ?? I.accent;
  function W(X) {
    m ? b((Z) => Z === X ? null : X) : d({ cell: X });
  }
  function w() {
    N != null && (d({ cell: N }), b(null));
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsx(
      "div",
      {
        onMouseLeave: () => y(null),
        style: {
          display: "grid",
          gridTemplateColumns: `repeat(${vc}, ${Sc}px)`,
          gridTemplateRows: `repeat(${vc}, ${Sc}px)`,
          gap: 1,
          padding: 1,
          background: FS,
          borderRadius: 8
        },
        children: u.board.map((X, Z) => {
          const V = r && X == null && R.has(Z), j = N === Z, x = V && g === Z && !j, T = Z === u.lastCell, G = (Z % vc + Math.floor(Z / vc)) * 12;
          return /* @__PURE__ */ z.jsxs(
            "button",
            {
              disabled: !V,
              onClick: () => {
                V && W(Z);
              },
              onMouseEnter: () => y(Z),
              style: {
                width: Sc,
                height: Sc,
                padding: 0,
                border: "none",
                background: WS,
                cursor: V ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // The picked spot is ringed in the player's colour.
                boxShadow: j ? `inset 0 0 0 2px ${Q}` : "none",
                animation: `${wn} 220ms ease-out ${G}ms backwards`
              },
              children: [
                X != null && /* @__PURE__ */ z.jsx(
                  "span",
                  {
                    style: {
                      width: bc,
                      height: bc,
                      borderRadius: "50%",
                      background: p[X],
                      // Ring the most recent stone — easy to lose on a busy board.
                      boxShadow: T ? `0 0 0 3px ${I.text}` : "none",
                      animation: `${ks} 240ms ease-out both`
                    }
                  }
                ),
                X == null && (j || x) && // A faint stone previews where a confirmed move would land.
                /* @__PURE__ */ z.jsx(
                  "span",
                  {
                    style: {
                      width: bc,
                      height: bc,
                      borderRadius: "50%",
                      background: Q,
                      opacity: j ? 0.6 : 0.32
                    }
                  }
                )
              ]
            },
            Z
          );
        })
      }
    ),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: w,
        disabled: N == null,
        style: {
          ...kl,
          // Stays in the layout (hidden) off-turn so the board never shifts.
          visibility: r ? "visible" : "hidden",
          opacity: N != null ? 1 : 0.4,
          cursor: N != null ? "pointer" : "default"
        },
        children: N != null ? "Confirm move" : "Pick a spot"
      }
    )
  ] });
}
const ir = 44, Sm = 36, Ih = ir * 6 + Sm * 2, PS = 15, cr = [
  [0, 0],
  [3, 0],
  [6, 0],
  [1, 1],
  [3, 1],
  [5, 1],
  [2, 2],
  [3, 2],
  [4, 2],
  [0, 3],
  [1, 3],
  [2, 3],
  [4, 3],
  [5, 3],
  [6, 3],
  [2, 4],
  [3, 4],
  [4, 4],
  [1, 5],
  [3, 5],
  [5, 5],
  [0, 6],
  [3, 6],
  [6, 6]
], bm = (a) => Sm + a * ir, On = (a) => bm(cr[a][0]), Cn = (a) => bm(cr[a][1]), tb = [
  [0, 2, 23, 21],
  [3, 5, 20, 18],
  [6, 8, 17, 15]
], lb = [
  [1, 7],
  [16, 22],
  [9, 11],
  [12, 14]
], eb = "#c89b6a", Uu = "#6f5436";
function nb(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { seatColors: m } = Te(), [p, g] = ct.useState(null), [y, v] = ct.useState(null), b = f ?? 0, R = u.toPlace[b] > 0, N = p != null && c.some((j) => j.from === p) ? p : null, Q = y != null && c.some((j) => j.from === y.from && j.to === y.to && j.remove != null) ? y : null, W = new Set(
    Q ? c.filter((j) => j.from === Q.from && j.to === Q.to && j.remove != null).map((j) => j.remove) : []
  );
  let w;
  Q ? w = W : R ? w = new Set(c.filter((j) => j.from === null).map((j) => j.to)) : N != null ? w = new Set(c.filter((j) => j.from === N).map((j) => j.to)) : w = /* @__PURE__ */ new Set();
  const X = !R && N == null && Q == null ? new Set(c.map((j) => j.from).filter((j) => j != null)) : /* @__PURE__ */ new Set();
  function Z(j) {
    d(j), g(null), v(null);
  }
  function V(j) {
    if (r) {
      if (Q) {
        const x = c.find(
          (T) => T.from === Q.from && T.to === Q.to && T.remove === j
        );
        x ? Z(x) : v(null);
        return;
      }
      if (R) {
        const x = c.filter((T) => T.from === null && T.to === j);
        if (x.length === 0) return;
        x.length === 1 && x[0].remove == null ? Z(x[0]) : v({ from: null, to: j });
        return;
      }
      if (N != null) {
        if (j === N) {
          g(null);
          return;
        }
        const x = c.filter((T) => T.from === N && T.to === j);
        x.length === 1 && x[0].remove == null ? Z(x[0]) : x.length > 0 ? v({ from: N, to: j }) : c.some((T) => T.from === j) ? g(j) : g(null);
      } else c.some((x) => x.from === j) && g(j);
    }
  }
  return /* @__PURE__ */ z.jsx("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: /* @__PURE__ */ z.jsxs(
    "svg",
    {
      width: Ih,
      height: Ih,
      style: { background: eb, borderRadius: 10, border: `1px solid ${Uu}` },
      children: [
        tb.map((j, x) => /* @__PURE__ */ z.jsx(
          "polygon",
          {
            points: j.map((T) => `${On(T)},${Cn(T)}`).join(" "),
            fill: "none",
            stroke: Uu,
            strokeWidth: 2.5
          },
          `sq${x}`
        )),
        lb.map(([j, x], T) => /* @__PURE__ */ z.jsx(
          "line",
          {
            x1: On(j),
            y1: Cn(j),
            x2: On(x),
            y2: Cn(x),
            stroke: Uu,
            strokeWidth: 2.5
          },
          `c${T}`
        )),
        cr.map((j, x) => {
          const T = u.board[x], G = r && w.has(x), F = r && X.has(x), k = x === N, q = W.has(x), K = u.lastMove != null && (u.lastMove.to === x || u.lastMove.from === x);
          return /* @__PURE__ */ z.jsxs(
            "g",
            {
              onClick: () => V(x),
              style: {
                cursor: r && (G || F || k) ? "pointer" : "default"
              },
              children: [
                /* @__PURE__ */ z.jsx("circle", { cx: On(x), cy: Cn(x), r: 4, fill: Uu }),
                T == null && G && /* @__PURE__ */ z.jsx("circle", { cx: On(x), cy: Cn(x), r: 7, fill: I.accent, opacity: 0.8 }),
                T != null && /* @__PURE__ */ z.jsx(
                  "circle",
                  {
                    cx: On(x),
                    cy: Cn(x),
                    r: PS,
                    fill: m[T] ?? "#888",
                    stroke: k ? I.text : q ? I.danger : K ? I.accent : Uu,
                    strokeWidth: k || q || K ? 3.5 : 1.5
                  }
                ),
                /* @__PURE__ */ z.jsx("circle", { cx: On(x), cy: Cn(x), r: ir / 2 - 2, fill: "transparent" })
              ]
            },
            x
          );
        })
      ]
    }
  ) });
}
const Kl = hm, Ra = 52, ja = Ra * 0.78, ab = Kl * Ra + 6, Dn = ["#1b1b22", "#efe8d6"], Mm = "inset 0 -3px 6px rgba(0,0,0,0.4)";
function ub(a, u) {
  return Math.max(
    Math.abs(a % Kl - u % Kl),
    Math.abs(Math.floor(a / Kl) - Math.floor(u / Kl))
  );
}
function ib({ from: a, to: u, delay: c }) {
  const f = {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    backfaceVisibility: "hidden",
    boxShadow: Mm
  };
  return /* @__PURE__ */ z.jsx("div", { style: { width: ja, height: ja, perspective: 700 }, children: /* @__PURE__ */ z.jsxs(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        transformStyle: "preserve-3d",
        animation: `${py} 460ms ease-in-out ${c}ms both`
      },
      children: [
        /* @__PURE__ */ z.jsx("div", { style: { ...f, background: a } }),
        /* @__PURE__ */ z.jsx("div", { style: { ...f, background: u, transform: "rotateY(180deg)" } })
      ]
    }
  ) });
}
function cb(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m } = Te(), [p, g] = ct.useState(null), y = ct.useRef(null), v = ct.useRef(null), b = ct.useRef(0);
  if (y.current !== u.board) {
    const x = y.current;
    if (y.current = u.board, x != null) {
      const T = /* @__PURE__ */ new Set();
      let G = -1;
      for (let F = 0; F < u.board.length; F++) {
        const k = x[F], q = u.board[F];
        k == null && q != null ? G = F : k != null && q != null && k !== q && T.add(F);
      }
      (T.size > 0 || G >= 0) && (b.current += 1, v.current = { flipped: T, placed: G, seed: b.current });
    }
  }
  const R = v.current, N = new Set(c.map((x) => x.cell));
  let Q = 0, W = 0;
  for (const x of u.board)
    x === 0 ? Q++ : x === 1 && W++;
  const w = [Q, W], X = m && r && p != null && N.has(p) ? p : null, Z = Dn[f ?? 0];
  function V(x) {
    m ? g((T) => T === x ? null : x) : d({ cell: x });
  }
  function j() {
    X != null && (d({ cell: X }), g(null));
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsx("div", { style: { display: "flex", gap: 10, width: ab }, children: [0, 1].map((x) => {
      const T = f === x;
      return /* @__PURE__ */ z.jsxs(
        "div",
        {
          style: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "8px 12px",
            borderRadius: 10,
            background: I.surface,
            border: `1px solid ${T ? I.accent : I.border}`,
            // Dim the side that isn't on the move (both lit once the game ends).
            opacity: f == null || T ? 1 : 0.55,
            transition: "opacity 160ms ease, border-color 160ms ease"
          },
          children: [
            /* @__PURE__ */ z.jsx(
              "span",
              {
                style: {
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: Dn[x],
                  boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.35)"
                }
              }
            ),
            /* @__PURE__ */ z.jsx("span", { style: { fontSize: 21, fontWeight: 800, lineHeight: 1 }, children: w[x] ?? 0 })
          ]
        },
        x
      );
    }) }),
    /* @__PURE__ */ z.jsx(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: `repeat(${Kl}, ${Ra}px)`,
          gridTemplateRows: `repeat(${Kl}, ${Ra}px)`,
          background: "#1f6b44",
          border: "3px solid #143f29",
          borderRadius: 8,
          overflow: "hidden"
        },
        children: Array.from({ length: Kl * Kl }, (x, T) => {
          const G = Math.floor(T / Kl), F = T % Kl, k = u.board[T], q = r && N.has(T), K = X === T, at = T === u.lastMove;
          let St = `${T}:s`, bt = "none";
          return R != null && (R.flipped.has(T) ? (St = `${T}:f${R.seed}`, bt = "flip") : R.placed === T && (St = `${T}:p${R.seed}`, bt = "pop")), /* @__PURE__ */ z.jsxs(
            "div",
            {
              onClick: () => {
                q && V(T);
              },
              style: {
                width: Ra,
                height: Ra,
                boxSizing: "border-box",
                background: "#2a8159",
                border: "1px solid #1f6b44",
                // The picked square is ringed to mark the pending move.
                boxShadow: K ? `inset 0 0 0 3px ${I.accent}` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: q ? "pointer" : "default",
                animation: `${wn} 220ms ease-out ${(G + F) * 26}ms backwards`
              },
              children: [
                k != null && (bt === "flip" ? /* @__PURE__ */ z.jsx(
                  ib,
                  {
                    from: k === 0 ? Dn[1] : Dn[0],
                    to: k === 0 ? Dn[0] : Dn[1],
                    delay: u.lastMove != null ? ub(T, u.lastMove) * 70 : 0
                  },
                  St
                ) : /* @__PURE__ */ z.jsx(
                  "span",
                  {
                    style: {
                      width: ja,
                      height: ja,
                      borderRadius: "50%",
                      background: Dn[k],
                      boxShadow: at ? `0 0 0 3px ${I.accent}` : Mm,
                      // A freshly placed disc pops in; settled discs are static.
                      animation: bt === "pop" ? `${ks} 220ms ease-out both` : "none"
                    }
                  },
                  St
                )),
                k == null && K && // A faint full-size disc previews where a confirmed move lands.
                /* @__PURE__ */ z.jsx(
                  "span",
                  {
                    style: {
                      width: ja,
                      height: ja,
                      borderRadius: "50%",
                      background: Z,
                      opacity: 0.55
                    }
                  }
                ),
                k == null && q && !K && // A small dot marks every legal square.
                /* @__PURE__ */ z.jsx(
                  "span",
                  {
                    style: {
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: Z,
                      opacity: 0.4
                    }
                  }
                )
              ]
            },
            T
          );
        })
      }
    ),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: j,
        disabled: X == null,
        style: {
          ...kl,
          // Stays in the layout (hidden) off-turn so the board never shifts.
          visibility: r ? "visible" : "hidden",
          opacity: X != null ? 1 : 0.4,
          cursor: X != null ? "pointer" : "default"
        },
        children: X != null ? "Confirm move" : "Pick a square"
      }
    )
  ] });
}
const Mc = ym, tn = 46, Ph = {
  k: "玉",
  r: "飛",
  b: "角",
  g: "金",
  s: "銀",
  n: "桂",
  l: "香",
  p: "歩"
}, ob = { r: "龍", b: "馬", s: "全", n: "圭", l: "杏", p: "と" }, fb = (a) => a.promoted ? ob[a.type] ?? Ph[a.type] : Ph[a.type], sb = "#e7c884", ty = "#806029", rb = "#f3dca6", db = "#b5853a", hb = "#b23b3b";
function ly({ piece: a, dim: u }) {
  return /* @__PURE__ */ z.jsx(
    "div",
    {
      style: {
        width: tn - 8,
        height: tn - 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px 5px 3px 3px",
        background: rb,
        border: `1.5px solid ${db}`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
        transform: a.seat === 1 ? "rotate(180deg)" : "none",
        opacity: u ? 0.45 : 1
      },
      children: /* @__PURE__ */ z.jsx(
        "span",
        {
          style: {
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1,
            color: a.promoted ? hb : "#2a1e0c"
          },
          children: fb(a)
        }
      )
    }
  );
}
function yb(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, [m, p] = ct.useState(null), [g, y] = ct.useState(null), [v, b] = ct.useState(null), R = () => {
    p(null), y(null), b(null);
  }, N = m != null && c.some((T) => T.from === m) ? m : null, Q = g != null && c.some((T) => T.from === null && T.drop === g) ? g : null, W = new Set(
    N != null ? c.filter((T) => T.from === N).map((T) => T.to) : Q != null ? c.filter((T) => T.from === null && T.drop === Q).map((T) => T.to) : []
  ), w = new Set(
    c.map((T) => T.from).filter((T) => T != null)
  );
  function X(T) {
    d(T), R();
  }
  function Z(T) {
    if (r) {
      if (v) {
        b(null);
        return;
      }
      if (Q != null) {
        W.has(T) ? X({ from: null, to: T, drop: Q, promote: !1 }) : y(null);
        return;
      }
      if (N != null) {
        if (T === N) {
          p(null);
          return;
        }
        if (W.has(T)) {
          const G = c.filter((F) => F.from === N && F.to === T);
          G.length === 1 ? X(G[0]) : b({ from: N, to: T });
          return;
        }
        w.has(T) ? p(T) : p(null);
        return;
      }
      w.has(T) && (p(T), y(null));
    }
  }
  function V(T, G) {
    !r || T !== f || c.some((F) => F.from === null && F.drop === G) && (p(null), b(null), y((F) => F === G ? null : G));
  }
  const j = (T) => /* @__PURE__ */ z.jsxs(
    "div",
    {
      style: {
        display: "flex",
        gap: 6,
        minHeight: 34,
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: "4px 8px"
      },
      children: [
        qc.filter((G) => u.hands[T][G] > 0).map((G) => {
          const F = Q === G && T === f, k = r && T === f && c.some((q) => q.drop === G);
          return /* @__PURE__ */ z.jsxs(
            "button",
            {
              onClick: () => V(T, G),
              disabled: !k,
              style: {
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "3px 7px 3px 3px",
                borderRadius: 6,
                border: `2px solid ${F ? I.accent : "transparent"}`,
                background: "transparent",
                cursor: k ? "pointer" : "default"
              },
              children: [
                /* @__PURE__ */ z.jsx(ly, { piece: { seat: T, type: G, promoted: !1 } }),
                /* @__PURE__ */ z.jsxs("span", { style: { fontSize: 14, fontWeight: 700, color: I.text }, children: [
                  "×",
                  u.hands[T][G]
                ] })
              ]
            },
            G
          );
        }),
        qc.every((G) => u.hands[T][G] === 0) && /* @__PURE__ */ z.jsx("span", { style: { fontSize: 12, color: I.textDim }, children: "— empty hand —" })
      ]
    }
  ), x = u.lastMove;
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    j(1),
    /* @__PURE__ */ z.jsx(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: `repeat(${Mc}, ${tn}px)`,
          gridTemplateRows: `repeat(${Mc}, ${tn}px)`,
          // The line colour shows through the 1px gaps as the board grid.
          background: ty,
          border: `3px solid ${ty}`,
          gap: 1,
          padding: 1
        },
        children: Array.from({ length: Mc * Mc }, (T, G) => {
          const F = u.board[G], k = G === N, q = r && W.has(G), K = x != null && (x.from === G || x.to === G), at = v != null && v.from === G, St = v != null && v.to === G, bt = r && (q || k || F != null && w.has(G));
          return /* @__PURE__ */ z.jsxs(
            "div",
            {
              onClick: () => Z(G),
              style: {
                width: tn,
                height: tn,
                background: sb,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: bt ? "pointer" : "default",
                boxShadow: k || at || St ? `inset 0 0 0 3px ${I.accent}` : K ? `inset 0 0 0 3px ${I.text}` : "none"
              },
              children: [
                q && /* @__PURE__ */ z.jsx(
                  "span",
                  {
                    style: {
                      position: "absolute",
                      width: F ? tn - 6 : 15,
                      height: F ? tn - 6 : 15,
                      borderRadius: F ? 7 : "50%",
                      background: F ? "transparent" : I.accent,
                      border: F ? `3px solid ${I.accent}` : "none",
                      opacity: 0.7
                    }
                  }
                ),
                F && /* @__PURE__ */ z.jsx(ly, { piece: F, dim: at })
              ]
            },
            G
          );
        })
      }
    ),
    j(0),
    v != null && r && /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
      /* @__PURE__ */ z.jsx("span", { style: { fontSize: 14, color: I.textDim }, children: "Promote?" }),
      /* @__PURE__ */ z.jsx(
        "button",
        {
          style: { ...kl, padding: "7px 16px" },
          onClick: () => X({ from: v.from, to: v.to, drop: null, promote: !0 }),
          children: "Promote"
        }
      ),
      /* @__PURE__ */ z.jsx(
        "button",
        {
          style: { ...Xc, padding: "7px 16px" },
          onClick: () => X({ from: v.from, to: v.to, drop: null, promote: !1 }),
          children: "Keep"
        }
      )
    ] })
  ] });
}
const mb = ["✕", "◯"];
function gb(a) {
  const { state: u, legalMoves: c, interactive: f, onMove: r } = a, { seatColors: d } = Te(), m = new Set(c.map((p) => p.cell));
  return /* @__PURE__ */ z.jsx(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 96px)",
        gridTemplateRows: "repeat(3, 96px)",
        gap: 8
      },
      children: u.board.map((p, g) => {
        const y = f && m.has(g), v = (g % 3 + Math.floor(g / 3)) * 48;
        return /* @__PURE__ */ z.jsx(
          "button",
          {
            disabled: !y,
            onClick: () => r({ cell: g }),
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1,
              background: y ? I.surfaceAlt : I.surface,
              border: `1px solid ${I.border}`,
              borderRadius: 12,
              cursor: y ? "pointer" : "default",
              transition: "background 120ms ease",
              animation: `${wn} 240ms ease-out ${v}ms backwards`
            },
            children: p != null && // The glyph span mounts when the cell is claimed, so the
            // fade-in plays exactly once — on the move that placed it.
            /* @__PURE__ */ z.jsx(
              "span",
              {
                style: {
                  color: d[p],
                  animation: `${$s} 260ms ease-out both`
                },
                children: mb[p] ?? "?"
              }
            )
          },
          g
        );
      })
    }
  );
}
const $u = Cy, Vs = Dy, Bn = 44, xs = 18, Kc = 24, Ec = ($u - 1) * Bn + 2 * Kc, xc = (Vs - 1) * Bn + 2 * Kc, Hu = "#5b3d1f", pb = "#f0d9a8", vb = [
  { g: "帥", a: "仕", e: "相", h: "馬", r: "車", c: "炮", s: "兵" },
  { g: "將", a: "士", e: "象", h: "馬", r: "車", c: "砲", s: "卒" }
], ey = ["#c0402c", "#2c2e36"], Sb = (a) => a % $u, bb = (a) => Math.floor(a / $u), _l = (a) => Kc + a * Bn, Ol = (a) => Kc + a * Bn, ln = (a) => _l(Sb(a)), en = (a) => Ol(bb(a));
function Mb(a, u) {
  const c = ln(a) - ln(u), f = en(a) - en(u);
  return {
    animation: `${Js} 300ms ease-in-out both`,
    "--hop-x": `${c}px`,
    "--hop-y": `${f}px`,
    "--hop-mx": `${c / 2}px`,
    "--hop-my": `${f / 2}px`
  };
}
function Eb(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m } = Te(), [p, g] = ct.useState(null), [y, v] = ct.useState(null), b = ct.useMemo(() => {
    const x = /* @__PURE__ */ new Map();
    for (const T of c) {
      const G = x.get(T.from);
      G ? G.push(T) : x.set(T.from, [T]);
    }
    return x;
  }, [c]), R = r && p != null && u.board[p]?.seat === f ? p : null, N = R != null ? b.get(R) ?? [] : [], Q = new Set(N.map((x) => x.to)), W = (x) => c.some((T) => T.from === x.from && T.to === x.to), w = m && r && y != null && W(y) ? y : null, X = w != null ? u.board[w.from] : null;
  function Z(x) {
    if (r) {
      if (w != null && x === w.to) {
        v(null);
        return;
      }
      if (R != null && Q.has(x)) {
        const T = N.find((G) => G.to === x);
        if (!T) return;
        m ? v(T) : (d(T), g(null));
      } else u.board[x]?.seat === f && b.has(x) ? (g((T) => T === x ? null : x), v(null)) : (g(null), v(null));
    }
  }
  function V() {
    w != null && (d(w), g(null), v(null));
  }
  function j(x, T, G, F) {
    const k = R === x, q = w != null && w.from === x, K = Q.has(x), at = u.lastMove != null && (u.lastMove.from === x || u.lastMove.to === x), St = k ? I.text : q ? I.accent : K ? I.danger : at ? I.accent : null;
    return /* @__PURE__ */ z.jsxs("g", { opacity: F ? 0.5 : q ? 0.4 : 1, children: [
      St != null && /* @__PURE__ */ z.jsx("circle", { cx: ln(x), cy: en(x), r: xs + 3, fill: "none", stroke: St, strokeWidth: 3 }),
      /* @__PURE__ */ z.jsx(
        "circle",
        {
          cx: ln(x),
          cy: en(x),
          r: xs,
          fill: pb,
          stroke: ey[T],
          strokeWidth: 2.5
        }
      ),
      /* @__PURE__ */ z.jsx(
        "text",
        {
          x: ln(x),
          y: en(x),
          textAnchor: "middle",
          dominantBaseline: "central",
          fontSize: 21,
          fontWeight: 700,
          fill: ey[T],
          children: vb[T]?.[G] ?? "?"
        }
      )
    ] });
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsxs("svg", { width: Ec, height: xc, viewBox: `0 0 ${Ec} ${xc}`, style: { display: "block" }, children: [
      /* @__PURE__ */ z.jsx("rect", { x: 0, y: 0, width: Ec, height: xc, rx: 8, fill: "#d9b277" }),
      /* @__PURE__ */ z.jsx(
        "rect",
        {
          x: 2,
          y: 2,
          width: Ec - 4,
          height: xc - 4,
          rx: 6,
          fill: "none",
          stroke: "#8a5a2e",
          strokeWidth: 3
        }
      ),
      Array.from({ length: Vs }, (x, T) => /* @__PURE__ */ z.jsx("line", { x1: _l(0), y1: Ol(T), x2: _l(8), y2: Ol(T), stroke: Hu, strokeWidth: 1 }, `h${T}`)),
      Array.from(
        { length: $u },
        (x, T) => T === 0 || T === 8 ? /* @__PURE__ */ z.jsx("line", { x1: _l(T), y1: Ol(0), x2: _l(T), y2: Ol(9), stroke: Hu, strokeWidth: 1 }, `v${T}`) : /* @__PURE__ */ z.jsxs("g", { children: [
          /* @__PURE__ */ z.jsx("line", { x1: _l(T), y1: Ol(0), x2: _l(T), y2: Ol(4), stroke: Hu, strokeWidth: 1 }),
          /* @__PURE__ */ z.jsx("line", { x1: _l(T), y1: Ol(5), x2: _l(T), y2: Ol(9), stroke: Hu, strokeWidth: 1 })
        ] }, `v${T}`)
      ),
      [
        { x1: 3, y1: 0, x2: 5, y2: 2 },
        { x1: 5, y1: 0, x2: 3, y2: 2 },
        { x1: 3, y1: 7, x2: 5, y2: 9 },
        { x1: 5, y1: 7, x2: 3, y2: 9 }
      ].map((x, T) => /* @__PURE__ */ z.jsx("line", { x1: _l(x.x1), y1: Ol(x.y1), x2: _l(x.x2), y2: Ol(x.y2), stroke: Hu, strokeWidth: 1 }, `p${T}`)),
      /* @__PURE__ */ z.jsx(
        "text",
        {
          x: _l(2),
          y: Ol(4) + Bn / 2,
          textAnchor: "middle",
          dominantBaseline: "central",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 8,
          fill: "rgba(91,61,31,0.72)",
          children: "楚河"
        }
      ),
      /* @__PURE__ */ z.jsx(
        "text",
        {
          x: _l(6),
          y: Ol(4) + Bn / 2,
          textAnchor: "middle",
          dominantBaseline: "central",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 8,
          fill: "rgba(91,61,31,0.72)",
          children: "漢界"
        }
      ),
      [...Q].map(
        (x) => u.board[x] == null && !(w != null && w.to === x) ? /* @__PURE__ */ z.jsx("circle", { cx: ln(x), cy: en(x), r: 7, fill: I.accent, opacity: 0.7 }, `d${x}`) : null
      ),
      u.board.map((x, T) => {
        if (x == null || w != null && w.to === T) return null;
        const G = j(T, x.seat, x.type, !1), F = u.lastMove;
        return F != null && F.to === T ? /* @__PURE__ */ z.jsx("g", { style: Mb(F.from, T), children: G }, `pc${T}`) : /* @__PURE__ */ z.jsx("g", { children: G }, `pc${T}`);
      }),
      w != null && X != null && /* @__PURE__ */ z.jsxs("g", { children: [
        /* @__PURE__ */ z.jsx(
          "circle",
          {
            cx: ln(w.to),
            cy: en(w.to),
            r: xs + 3,
            fill: "none",
            stroke: I.accent,
            strokeWidth: 3
          }
        ),
        j(w.to, X.seat, X.type, !0)
      ] }),
      Array.from({ length: $u * Vs }, (x, T) => {
        const G = u.board[T], F = r && (Q.has(T) || G?.seat === f && b.has(T));
        return /* @__PURE__ */ z.jsx(
          "circle",
          {
            cx: ln(T),
            cy: en(T),
            r: Bn * 0.46,
            fill: "transparent",
            pointerEvents: "all",
            style: { cursor: F ? "pointer" : "default" },
            onClick: () => Z(T)
          },
          `hit${T}`
        );
      })
    ] }),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: V,
        disabled: w == null,
        style: {
          ...kl,
          // Stays in the layout (hidden) off-turn so the board never shifts.
          visibility: r ? "visible" : "hidden",
          opacity: w != null ? 1 : 0.4,
          cursor: w != null ? "pointer" : "default"
        },
        children: w != null ? "Confirm move" : R != null ? "Pick a point" : "Select a piece"
      }
    )
  ] });
}
av();
ql("tic-tac-toe", gb);
ql("connect-four", VS);
ql("gomoku", IS);
ql("reversi", cb);
ql("chinese-checkers", QS);
ql("checkers", LS);
ql("chess", YS);
ql("xiangqi", Eb);
ql("nine-mens-morris", nb);
ql("shogi", yb);
ql("go", JS);
ql("big-two", DS);
const ny = "htp-demo-keyframes";
function xb() {
  if (typeof document > "u" || document.getElementById(ny)) return;
  const a = document.createElement("style");
  a.id = ny, a.textContent = "@keyframes htpDraw{from{opacity:0;transform:scale(.55)}to{opacity:1;transform:scale(1)}}@keyframes htpStrike{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes htpPulse{0%,100%{opacity:.2;transform:scale(.9)}50%{opacity:.7;transform:scale(1.05)}}@keyframes htpGlow{0%,100%{opacity:.12}50%{opacity:.34}}@keyframes htpDrop{from{transform:translateY(var(--htp-drop,-200px))}to{transform:translateY(0)}}@keyframes htpGrow{from{transform:scale(.12)}to{transform:scale(1)}}@keyframes htpFlip{from{transform:rotateY(0deg)}to{transform:rotateY(180deg)}}@keyframes htpSlide{from{transform:translate(var(--sx,0px),var(--sy,0px))}to{transform:translate(0px,0px)}}@keyframes htpHop{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}", document.head.appendChild(a);
}
xb();
function $l(a, u = []) {
  const c = Array(9).fill(null);
  for (const f of a) c[f] = 0;
  for (const f of u) c[f] = 1;
  return c;
}
$l([0, 1, 2]), $l([2, 4, 6]), $l([1, 4, 7]);
$l([]), $l([4]), $l([4], [2]), $l([4, 0], [2]), $l([4, 0], [2, 5]), $l([4, 0, 8], [2, 5]);
$l([0, 1, 2], [3, 4]), $l([0, 2, 3, 7, 8], [1, 4, 5, 6]);
const ay = 7, uy = 6;
function le(a) {
  const u = Array(ay * uy).fill(null);
  return a.forEach((c, f) => {
    c.forEach((r, d) => {
      u[(uy - 1 - d) * ay + f] = r;
    });
  }), u;
}
le([[1], [0], [0], [0], [0], [1], []]), le([[1], [0], [1], [0, 0, 0, 0], [1], [0], [1]]), le([[1], [0], [1, 0], [1, 1, 0], [1, 1, 1, 0], [1], [1]]);
le([[], [], [], [], [], [], []]), le([[], [], [], [0], [], [], []]), le([[], [], [], [0, 1], [], [], []]), le([[], [0], [], [0, 1], [], [], []]), le([[], [0], [], [0, 1, 1], [], [], []]);
le([[], [0, 1], [0, 1], [0, 1], [], [], []]), le([[], [0, 1], [0, 1], [0, 1], [0], [], []]);
const iy = 9;
function ee(a, u = []) {
  const c = Array(iy * iy).fill(null);
  for (const f of a) c[f] = 0;
  for (const f of u) c[f] = 1;
  return c;
}
ee([38, 39, 40, 41, 42], [30, 50, 25]), ee([22, 31, 40, 49, 58], [33, 47, 60]), ee([20, 30, 40, 50, 60], [24, 56, 42]);
ee([]), ee([40]), ee([40], [31]), ee([40, 41], [31]), ee([40, 41], [31, 49]);
ee([38, 39, 40, 41], [30, 49, 23, 47]), ee([38, 39, 40, 41, 42], [30, 49, 23, 47]);
const Qc = 8;
function Ln(a, u) {
  const c = Array(Qc * Qc).fill(null);
  for (const f of a) c[f] = 0;
  for (const f of u) c[f] = 1;
  return c;
}
function Tb(a) {
  const u = Array(Qc * Qc).fill(0);
  for (const c of a) u[c] = 1;
  return u;
}
Ln([], []), Tb([0, 1, 2, 8, 9, 10, 16, 17, 18, 11, 19, 27, 28, 35, 36, 43]);
Ln([], []), Ln([25], [26, 27, 28]), Ln([25, 26, 27, 28, 29], []);
Ln([], []), Ln([30, 24, 3, 51], [28, 29, 26, 25, 19, 11, 35, 43]), Ln([3, 11, 19, 24, 25, 26, 27, 28, 29, 30, 35, 43, 51], []);
const nn = (a, u, c) => ({ x: a, y: u, z: c });
function Ab() {
  const u = [];
  for (let c = -4; c <= 4; c++)
    for (let f = -4; f <= 4; f++) {
      const r = -c - f;
      Math.abs(r) > 4 || (c >= -2 && f >= -2 && r >= -2 || c <= 2 && f <= 2 && r <= 2) && u.push({ x: c, y: f, z: r });
    }
  return u;
}
const Em = Ab(), xm = (a, u) => a.x - u.x || a.z - u.z, cy = Em.filter((a) => a.y >= 3).sort(xm), oy = Em.filter((a) => a.y <= -3).sort(xm);
cy.map((a) => ({ at: a, seat: 0 })), oy.map((a, u) => ({ at: a, seat: 0, from: cy[u] }));
const Ts = [
  { at: nn(2, -2, 0), seat: 1 },
  { at: nn(-2, 2, 0), seat: 2 }
];
(() => {
  const a = [nn(1, -1, 0), nn(-1, 0, 1), nn(0, 1, -1)], u = [];
  let c = nn(0, 0, 0);
  for (const f of a)
    u.push({
      pegs: [{ at: c, seat: 0 }, ...Ts],
      rings: [f],
      caption: "Move a peg to any touching empty hole",
      hold: 1e3
    }), u.push({
      pegs: [{ at: f, seat: 0, from: c }, ...Ts],
      caption: "Move a peg to any touching empty hole",
      hold: 950
    }), u.push({
      pegs: [{ at: nn(0, 0, 0), seat: 0, from: f }, ...Ts],
      caption: "Move a peg to any touching empty hole",
      hold: 700
    }), c = nn(0, 0, 0);
  return u;
})();
const Yn = 8, Tm = (a) => Math.floor(a / Yn), Am = (a) => a % Yn, zm = (a, u) => a * Yn + u;
function Fe(a, u, c) {
  const f = [];
  let r = Tm(a) + u, d = Am(a) + c;
  for (; r >= 0 && r < Yn && d >= 0 && d < Yn; )
    f.push(zm(r, d)), r += u, d += c;
  return f;
}
const zb = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1]
], _b = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];
function fy(a, u) {
  const c = [];
  for (const [f, r] of u) {
    const d = Tm(a) + f, m = Am(a) + r;
    d >= 0 && d < Yn && m >= 0 && m < Yn && c.push(zm(d, m));
  }
  return c;
}
function Ob(a, u) {
  if (a === "n") return fy(u, zb);
  if (a === "k") return fy(u, _b);
  const c = [
    ...Fe(u, -1, -1),
    ...Fe(u, -1, 1),
    ...Fe(u, 1, -1),
    ...Fe(u, 1, 1)
  ], f = [
    ...Fe(u, -1, 0),
    ...Fe(u, 1, 0),
    ...Fe(u, 0, -1),
    ...Fe(u, 0, 1)
  ];
  return a === "b" ? c : a === "r" ? f : [...f, ...c];
}
function ku(a, u, c, f) {
  const r = Ob(a === "♞" ? "n" : a === "♚" ? "k" : a === "♝" ? "b" : a === "♜" ? "r" : "q", u), d = (p, g) => ({
    pieces: [{ cell: p, glyph: a, seat: 0, from: g }],
    dots: r,
    caption: f
  }), m = [{ ...d(u), hold: 1600 }];
  for (const p of c)
    m.push({ ...d(p, u), hold: 950 }), m.push({ ...d(u, p), hold: 800 });
  return m;
}
ku(
  "♞",
  35,
  [18, 45, 29],
  "The knight leaps in an L — the only piece that jumps over others"
);
ku(
  "♝",
  35,
  [7, 56, 8],
  "The bishop slides any distance along a diagonal"
);
ku(
  "♜",
  35,
  [3, 39, 32],
  "The rook slides any distance in a straight line"
);
ku(
  "♛",
  35,
  [7, 32, 3],
  "The queen moves any distance, straight or diagonal — rook and bishop in one"
);
ku(
  "♚",
  35,
  [27, 36, 43],
  "The king moves one square in any direction"
);
function Ju(a, u, c, f, r) {
  const d = (p, g) => ({
    pieces: [{ cell: p, char: a, seat: 0, from: g }],
    dots: c,
    caption: r
  }), m = [{ ...d(u), hold: 1600 }];
  for (const p of f)
    m.push({ ...d(p, u), hold: 950 }), m.push({ ...d(u, p), hold: 800 });
  return m;
}
Ju(
  "帥",
  76,
  [67, 75, 77, 85],
  [67, 75, 77],
  "The General moves one point up, down or sideways — never leaving the palace"
);
Ju(
  "仕",
  76,
  [66, 68, 84, 86],
  [66, 68, 84],
  "The Advisor moves one point diagonally, guarding the palace"
);
Ju(
  "相",
  65,
  [45, 49, 81, 85],
  [45, 49, 81],
  "The Elephant jumps two points diagonally — and never crosses the river"
);
Ju(
  "馬",
  58,
  [39, 41, 47, 51, 65, 69, 75, 77],
  [39, 51, 77],
  "The Horse moves in an L — a piece beside it can block the way"
);
Ju(
  "車",
  58,
  [49, 40, 31, 22, 13, 4, 67, 76, 85, 57, 56, 55, 54, 59, 60, 61, 62],
  [4, 54, 85],
  "The Chariot sweeps any distance in a straight line"
);
const Gl = (a, u) => a.map((c) => ({ point: c, seat: u }));
[...Gl([2, 7, 12, 17, 22], 0), ...Gl([3, 8, 13, 18, 23], 1)], [...Gl([2, 7, 12, 17, 22], 0), ...Gl([3, 8, 13, 18, 23], 1)], [
  ...Gl([0, 1, 5, 6, 10, 11, 15, 16, 20, 21], 0),
  ...Gl([4, 9, 14, 19, 24], 1)
];
[...Gl([1, 6, 11, 16, 21], 0), ...Gl([3, 8, 13, 18, 23], 1)], [...Gl([1, 6, 11, 16, 21], 0), ...Gl([3, 8, 13, 18, 23], 1)], [...Gl([0, 5, 10, 15, 20], 0), ...Gl([4, 9, 14, 19, 24], 1)];
const Cb = "miniboard.history";
function Db() {
  if (typeof localStorage > "u") return [];
  try {
    const a = localStorage.getItem(Cb), u = a ? JSON.parse(a) : null;
    return Array.isArray(u) ? u : [];
  } catch {
    return [];
  }
}
Db();
const Rb = 1100;
function jb(a, u, c) {
  const f = [];
  for (let m = 0; m < u; m++)
    f.push({ id: `p${m}`, name: `P${m + 1}`, kind: "human", seat: m });
  const r = typeof c.seed == "number" ? c.seed : 0, d = { gameId: a, players: f, seed: r };
  return Object.keys(c).length > 0 && (d.options = { ...c }), d;
}
function Nb(a) {
  try {
    const u = xv(a), c = Zu.require(u.gameId), f = [
      c.createInitialState(jb(u.gameId, u.playerCount, u.options))
    ];
    for (const r of u.moves)
      f.push(c.applyMove(f[f.length - 1], r));
    return { ...u, states: f };
  } catch {
    return null;
  }
}
function Ub({ encoded: a, onExit: u }) {
  const c = ct.useMemo(() => Nb(a), [a]), [f, r] = ct.useState(0), [d, m] = ct.useState(!1), p = ct.useRef(0), g = ct.useRef(0), y = c ? c.states.length - 1 : 0;
  f !== p.current && (f !== p.current + 1 && (g.current += 1), p.current = f), ct.useEffect(() => {
    if (!d || f >= y) {
      d && f >= y && m(!1);
      return;
    }
    const V = window.setTimeout(() => r((j) => Math.min(j + 1, y)), Rb);
    return () => window.clearTimeout(V);
  }, [d, f, y]);
  const v = /* @__PURE__ */ z.jsxs(
    "header",
    {
      style: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "12px 14px",
        borderBottom: `1px solid ${I.border}`
      },
      children: [
        /* @__PURE__ */ z.jsx(
          "button",
          {
            onClick: u,
            "aria-label": "Back",
            style: { ...Xc, padding: "6px 13px", fontSize: 18, lineHeight: 1 },
            children: "←"
          }
        ),
        /* @__PURE__ */ z.jsx(
          "div",
          {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: 18,
              fontWeight: 700,
              pointerEvents: "none"
            },
            children: "Replay"
          }
        )
      ]
    }
  );
  if (!c)
    return /* @__PURE__ */ z.jsxs("div", { style: { maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column" }, children: [
      v,
      /* @__PURE__ */ z.jsx("div", { style: { ...Vh, margin: 24, color: I.danger }, children: "This replay could not be read — the link may be incomplete or corrupted." })
    ] });
  const b = Zu.require(c.gameId), R = b.name, N = c.states[f], Q = b.getCurrentSeat(N), W = b.getStatus(N), w = uv(c.gameId), X = b.observe ? b.observe(N, Q ?? 0) : N, Z = (V, j, x, T = !1) => /* @__PURE__ */ z.jsx(
    "button",
    {
      onClick: x,
      disabled: !j,
      style: {
        ...Xc,
        padding: T ? "8px 18px" : "8px 13px",
        fontSize: 16,
        opacity: j ? 1 : 0.35,
        cursor: j ? "pointer" : "default"
      },
      children: V
    }
  );
  return /* @__PURE__ */ z.jsxs("div", { style: { maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column" }, children: [
    v,
    /* @__PURE__ */ z.jsx("div", { style: { textAlign: "center", padding: "14px 16px 2px", fontSize: 18, fontWeight: 700 }, children: R }),
    /* @__PURE__ */ z.jsx(
      "div",
      {
        style: {
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          padding: "8px 16px 0"
        },
        children: c.players.map((V, j) => {
          const x = W.state === "win" && W.winners.includes(j);
          return /* @__PURE__ */ z.jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 13px",
                borderRadius: 999,
                border: `1px solid ${x ? I.accent : I.border}`
              },
              children: [
                /* @__PURE__ */ z.jsx(
                  "span",
                  {
                    style: { width: 12, height: 12, borderRadius: "50%", background: V.color }
                  }
                ),
                /* @__PURE__ */ z.jsx("span", { style: { fontSize: 14, fontWeight: x ? 700 : 500 }, children: V.name || `Player ${j + 1}` })
              ]
            },
            j
          );
        })
      }
    ),
    /* @__PURE__ */ z.jsx(
      "div",
      {
        style: {
          textAlign: "center",
          padding: "12px 16px 4px",
          fontSize: 16,
          fontWeight: 600,
          color: I.textDim
        },
        children: f === y && W.state === "win" ? `${c.players[W.winners[0] ?? 0]?.name || "A player"} wins` : f === y && W.state === "draw" ? "It's a draw" : `Move ${f} of ${y}`
      }
    ),
    /* @__PURE__ */ z.jsx("div", { style: { display: "flex", justifyContent: "center", padding: "8px 16px" }, children: w ? /* @__PURE__ */ z.jsx(
      w,
      {
        state: X,
        legalMoves: [],
        currentSeat: Q,
        interactive: !1,
        onMove: () => {
        }
      },
      g.current
    ) : /* @__PURE__ */ z.jsxs("div", { style: { ...Vh, color: I.textDim }, children: [
      'No board UI for "',
      c.gameId,
      '".'
    ] }) }),
    /* @__PURE__ */ z.jsxs(
      "div",
      {
        style: {
          display: "flex",
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
          padding: "12px 16px 28px"
        },
        children: [
          Z("⏮", f > 0, () => {
            m(!1), r(0);
          }),
          Z("‹", f > 0, () => {
            m(!1), r((V) => Math.max(0, V - 1));
          }),
          Z(d ? "⏸ Pause" : "▶ Play", f < y || d, () => m((V) => !V), !0),
          Z("›", f < y, () => {
            m(!1), r((V) => Math.min(y, V + 1));
          }),
          Z("⏭", f < y, () => {
            m(!1), r(y);
          })
        ]
      }
    )
  ] });
}
var As = { exports: {} }, Bu = {}, zs = { exports: {} }, _s = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sy;
function Hb() {
  return sy || (sy = 1, (function(a) {
    function u(U, $) {
      var et = U.length;
      U.push($);
      t: for (; 0 < et; ) {
        var pt = et - 1 >>> 1, Tt = U[pt];
        if (0 < r(Tt, $))
          U[pt] = $, U[et] = Tt, et = pt;
        else break t;
      }
    }
    function c(U) {
      return U.length === 0 ? null : U[0];
    }
    function f(U) {
      if (U.length === 0) return null;
      var $ = U[0], et = U.pop();
      if (et !== $) {
        U[0] = et;
        t: for (var pt = 0, Tt = U.length, E = Tt >>> 1; pt < E; ) {
          var Y = 2 * (pt + 1) - 1, J = U[Y], tt = Y + 1, ft = U[tt];
          if (0 > r(J, et))
            tt < Tt && 0 > r(ft, J) ? (U[pt] = ft, U[tt] = et, pt = tt) : (U[pt] = J, U[Y] = et, pt = Y);
          else if (tt < Tt && 0 > r(ft, et))
            U[pt] = ft, U[tt] = et, pt = tt;
          else break t;
        }
      }
      return $;
    }
    function r(U, $) {
      var et = U.sortIndex - $.sortIndex;
      return et !== 0 ? et : U.id - $.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      a.unstable_now = function() {
        return d.now();
      };
    } else {
      var m = Date, p = m.now();
      a.unstable_now = function() {
        return m.now() - p;
      };
    }
    var g = [], y = [], v = 1, b = null, R = 3, N = !1, Q = !1, W = !1, w = !1, X = typeof setTimeout == "function" ? setTimeout : null, Z = typeof clearTimeout == "function" ? clearTimeout : null, V = typeof setImmediate < "u" ? setImmediate : null;
    function j(U) {
      for (var $ = c(y); $ !== null; ) {
        if ($.callback === null) f(y);
        else if ($.startTime <= U)
          f(y), $.sortIndex = $.expirationTime, u(g, $);
        else break;
        $ = c(y);
      }
    }
    function x(U) {
      if (W = !1, j(U), !Q)
        if (c(g) !== null)
          Q = !0, T || (T = !0, at());
        else {
          var $ = c(y);
          $ !== null && Mt(x, $.startTime - U);
        }
    }
    var T = !1, G = -1, F = 5, k = -1;
    function q() {
      return w ? !0 : !(a.unstable_now() - k < F);
    }
    function K() {
      if (w = !1, T) {
        var U = a.unstable_now();
        k = U;
        var $ = !0;
        try {
          t: {
            Q = !1, W && (W = !1, Z(G), G = -1), N = !0;
            var et = R;
            try {
              l: {
                for (j(U), b = c(g); b !== null && !(b.expirationTime > U && q()); ) {
                  var pt = b.callback;
                  if (typeof pt == "function") {
                    b.callback = null, R = b.priorityLevel;
                    var Tt = pt(
                      b.expirationTime <= U
                    );
                    if (U = a.unstable_now(), typeof Tt == "function") {
                      b.callback = Tt, j(U), $ = !0;
                      break l;
                    }
                    b === c(g) && f(g), j(U);
                  } else f(g);
                  b = c(g);
                }
                if (b !== null) $ = !0;
                else {
                  var E = c(y);
                  E !== null && Mt(
                    x,
                    E.startTime - U
                  ), $ = !1;
                }
              }
              break t;
            } finally {
              b = null, R = et, N = !1;
            }
            $ = void 0;
          }
        } finally {
          $ ? at() : T = !1;
        }
      }
    }
    var at;
    if (typeof V == "function")
      at = function() {
        V(K);
      };
    else if (typeof MessageChannel < "u") {
      var St = new MessageChannel(), bt = St.port2;
      St.port1.onmessage = K, at = function() {
        bt.postMessage(null);
      };
    } else
      at = function() {
        X(K, 0);
      };
    function Mt(U, $) {
      G = X(function() {
        U(a.unstable_now());
      }, $);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, a.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : F = 0 < U ? Math.floor(1e3 / U) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return R;
    }, a.unstable_next = function(U) {
      switch (R) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = R;
      }
      var et = R;
      R = $;
      try {
        return U();
      } finally {
        R = et;
      }
    }, a.unstable_requestPaint = function() {
      w = !0;
    }, a.unstable_runWithPriority = function(U, $) {
      switch (U) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          U = 3;
      }
      var et = R;
      R = U;
      try {
        return $();
      } finally {
        R = et;
      }
    }, a.unstable_scheduleCallback = function(U, $, et) {
      var pt = a.unstable_now();
      switch (typeof et == "object" && et !== null ? (et = et.delay, et = typeof et == "number" && 0 < et ? pt + et : pt) : et = pt, U) {
        case 1:
          var Tt = -1;
          break;
        case 2:
          Tt = 250;
          break;
        case 5:
          Tt = 1073741823;
          break;
        case 4:
          Tt = 1e4;
          break;
        default:
          Tt = 5e3;
      }
      return Tt = et + Tt, U = {
        id: v++,
        callback: $,
        priorityLevel: U,
        startTime: et,
        expirationTime: Tt,
        sortIndex: -1
      }, et > pt ? (U.sortIndex = et, u(y, U), c(g) === null && U === c(y) && (W ? (Z(G), G = -1) : W = !0, Mt(x, et - pt))) : (U.sortIndex = Tt, u(g, U), Q || N || (Q = !0, T || (T = !0, at()))), U;
    }, a.unstable_shouldYield = q, a.unstable_wrapCallback = function(U) {
      var $ = R;
      return function() {
        var et = R;
        R = $;
        try {
          return U.apply(this, arguments);
        } finally {
          R = et;
        }
      };
    };
  })(_s)), _s;
}
var ry;
function Bb() {
  return ry || (ry = 1, zs.exports = Hb()), zs.exports;
}
var Os = { exports: {} }, al = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dy;
function Lb() {
  if (dy) return al;
  dy = 1;
  var a = ur();
  function u(g) {
    var y = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        y += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return "Minified React error #" + g + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c() {
  }
  var f = {
    d: {
      f: c,
      r: function() {
        throw Error(u(522));
      },
      D: c,
      C: c,
      L: c,
      m: c,
      X: c,
      S: c,
      M: c
    },
    p: 0,
    findDOMNode: null
  }, r = Symbol.for("react.portal");
  function d(g, y, v) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: b == null ? null : "" + b,
      children: g,
      containerInfo: y,
      implementation: v
    };
  }
  var m = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, y) {
    if (g === "font") return "";
    if (typeof y == "string")
      return y === "use-credentials" ? y : "";
  }
  return al.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, al.createPortal = function(g, y) {
    var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
      throw Error(u(299));
    return d(g, y, null, v);
  }, al.flushSync = function(g) {
    var y = m.T, v = f.p;
    try {
      if (m.T = null, f.p = 2, g) return g();
    } finally {
      m.T = y, f.p = v, f.d.f();
    }
  }, al.preconnect = function(g, y) {
    typeof g == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, f.d.C(g, y));
  }, al.prefetchDNS = function(g) {
    typeof g == "string" && f.d.D(g);
  }, al.preinit = function(g, y) {
    if (typeof g == "string" && y && typeof y.as == "string") {
      var v = y.as, b = p(v, y.crossOrigin), R = typeof y.integrity == "string" ? y.integrity : void 0, N = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      v === "style" ? f.d.S(
        g,
        typeof y.precedence == "string" ? y.precedence : void 0,
        {
          crossOrigin: b,
          integrity: R,
          fetchPriority: N
        }
      ) : v === "script" && f.d.X(g, {
        crossOrigin: b,
        integrity: R,
        fetchPriority: N,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0
      });
    }
  }, al.preinitModule = function(g, y) {
    if (typeof g == "string")
      if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var v = p(
            y.as,
            y.crossOrigin
          );
          f.d.M(g, {
            crossOrigin: v,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0
          });
        }
      } else y == null && f.d.M(g);
  }, al.preload = function(g, y) {
    if (typeof g == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
      var v = y.as, b = p(v, y.crossOrigin);
      f.d.L(g, v, {
        crossOrigin: b,
        integrity: typeof y.integrity == "string" ? y.integrity : void 0,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0,
        type: typeof y.type == "string" ? y.type : void 0,
        fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
        referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
        imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
        imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
        media: typeof y.media == "string" ? y.media : void 0
      });
    }
  }, al.preloadModule = function(g, y) {
    if (typeof g == "string")
      if (y) {
        var v = p(y.as, y.crossOrigin);
        f.d.m(g, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: v,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0
        });
      } else f.d.m(g);
  }, al.requestFormReset = function(g) {
    f.d.r(g);
  }, al.unstable_batchedUpdates = function(g, y) {
    return g(y);
  }, al.useFormState = function(g, y, v) {
    return m.H.useFormState(g, y, v);
  }, al.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, al.version = "19.2.0", al;
}
var hy;
function Yb() {
  if (hy) return Os.exports;
  hy = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (u) {
        console.error(u);
      }
  }
  return a(), Os.exports = Lb(), Os.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yy;
function wb() {
  if (yy) return Bu;
  yy = 1;
  var a = Bb(), u = ur(), c = Yb();
  function f(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function d(t) {
    var l = t, e = t;
    if (t.alternate) for (; l.return; ) l = l.return;
    else {
      t = l;
      do
        l = t, (l.flags & 4098) !== 0 && (e = l.return), t = l.return;
      while (t);
    }
    return l.tag === 3 ? e : null;
  }
  function m(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (d(t) !== t)
      throw Error(f(188));
  }
  function y(t) {
    var l = t.alternate;
    if (!l) {
      if (l = d(t), l === null) throw Error(f(188));
      return l !== t ? null : t;
    }
    for (var e = t, n = l; ; ) {
      var i = e.return;
      if (i === null) break;
      var o = i.alternate;
      if (o === null) {
        if (n = i.return, n !== null) {
          e = n;
          continue;
        }
        break;
      }
      if (i.child === o.child) {
        for (o = i.child; o; ) {
          if (o === e) return g(i), t;
          if (o === n) return g(i), l;
          o = o.sibling;
        }
        throw Error(f(188));
      }
      if (e.return !== n.return) e = i, n = o;
      else {
        for (var s = !1, h = i.child; h; ) {
          if (h === e) {
            s = !0, e = i, n = o;
            break;
          }
          if (h === n) {
            s = !0, n = i, e = o;
            break;
          }
          h = h.sibling;
        }
        if (!s) {
          for (h = o.child; h; ) {
            if (h === e) {
              s = !0, e = o, n = i;
              break;
            }
            if (h === n) {
              s = !0, n = o, e = i;
              break;
            }
            h = h.sibling;
          }
          if (!s) throw Error(f(189));
        }
      }
      if (e.alternate !== n) throw Error(f(190));
    }
    if (e.tag !== 3) throw Error(f(188));
    return e.stateNode.current === e ? t : l;
  }
  function v(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = v(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var b = Object.assign, R = Symbol.for("react.element"), N = Symbol.for("react.transitional.element"), Q = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), X = Symbol.for("react.profiler"), Z = Symbol.for("react.consumer"), V = Symbol.for("react.context"), j = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), G = Symbol.for("react.memo"), F = Symbol.for("react.lazy"), k = Symbol.for("react.activity"), q = Symbol.for("react.memo_cache_sentinel"), K = Symbol.iterator;
  function at(t) {
    return t === null || typeof t != "object" ? null : (t = K && t[K] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var St = Symbol.for("react.client.reference");
  function bt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === St ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case W:
        return "Fragment";
      case X:
        return "Profiler";
      case w:
        return "StrictMode";
      case x:
        return "Suspense";
      case T:
        return "SuspenseList";
      case k:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Q:
          return "Portal";
        case V:
          return t.displayName || "Context";
        case Z:
          return (t._context.displayName || "Context") + ".Consumer";
        case j:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case G:
          return l = t.displayName || null, l !== null ? l : bt(t.type) || "Memo";
        case F:
          l = t._payload, t = t._init;
          try {
            return bt(t(l));
          } catch {
          }
      }
    return null;
  }
  var Mt = Array.isArray, U = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, et = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, pt = [], Tt = -1;
  function E(t) {
    return { current: t };
  }
  function Y(t) {
    0 > Tt || (t.current = pt[Tt], pt[Tt] = null, Tt--);
  }
  function J(t, l) {
    Tt++, pt[Tt] = t.current, t.current = l;
  }
  var tt = E(null), ft = E(null), dt = E(null), zt = E(null);
  function cl(t, l) {
    switch (J(dt, l), J(ft, t), J(tt, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? j1(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = j1(l), t = N1(l, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Y(tt), J(tt, t);
  }
  function Yt() {
    Y(tt), Y(ft), Y(dt);
  }
  function Ba(t) {
    t.memoizedState !== null && J(zt, t);
    var l = tt.current, e = N1(l, t.type);
    l !== e && (J(ft, t), J(tt, e));
  }
  function Wu(t) {
    ft.current === t && (Y(tt), Y(ft)), zt.current === t && (Y(zt), Au._currentValue = et);
  }
  var $c, or;
  function on(t) {
    if ($c === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        $c = l && l[1] || "", or = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + $c + t + or;
  }
  var kc = !1;
  function Jc(t, l) {
    if (!t || kc) return "";
    kc = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var L = function() {
                throw Error();
              };
              if (Object.defineProperty(L.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(L, []);
                } catch (D) {
                  var C = D;
                }
                Reflect.construct(t, [], L);
              } else {
                try {
                  L.call();
                } catch (D) {
                  C = D;
                }
                t.call(L.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (D) {
                C = D;
              }
              (L = t()) && typeof L.catch == "function" && L.catch(function() {
              });
            }
          } catch (D) {
            if (D && C && typeof D.stack == "string")
              return [D.stack, C.stack];
          }
          return [null, null];
        }
      };
      n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var i = Object.getOwnPropertyDescriptor(
        n.DetermineComponentFrameRoot,
        "name"
      );
      i && i.configurable && Object.defineProperty(
        n.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var o = n.DetermineComponentFrameRoot(), s = o[0], h = o[1];
      if (s && h) {
        var S = s.split(`
`), O = h.split(`
`);
        for (i = n = 0; n < S.length && !S[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; i < O.length && !O[i].includes(
          "DetermineComponentFrameRoot"
        ); )
          i++;
        if (n === S.length || i === O.length)
          for (n = S.length - 1, i = O.length - 1; 1 <= n && 0 <= i && S[n] !== O[i]; )
            i--;
        for (; 1 <= n && 0 <= i; n--, i--)
          if (S[n] !== O[i]) {
            if (n !== 1 || i !== 1)
              do
                if (n--, i--, 0 > i || S[n] !== O[i]) {
                  var H = `
` + S[n].replace(" at new ", " at ");
                  return t.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", t.displayName)), H;
                }
              while (1 <= n && 0 <= i);
            break;
          }
      }
    } finally {
      kc = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? on(e) : "";
  }
  function Dm(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return on(t.type);
      case 16:
        return on("Lazy");
      case 13:
        return t.child !== l && l !== null ? on("Suspense Fallback") : on("Suspense");
      case 19:
        return on("SuspenseList");
      case 0:
      case 15:
        return Jc(t.type, !1);
      case 11:
        return Jc(t.type.render, !1);
      case 1:
        return Jc(t.type, !0);
      case 31:
        return on("Activity");
      default:
        return "";
    }
  }
  function fr(t) {
    try {
      var l = "", e = null;
      do
        l += Dm(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var Wc = Object.prototype.hasOwnProperty, Fc = a.unstable_scheduleCallback, Ic = a.unstable_cancelCallback, Rm = a.unstable_shouldYield, jm = a.unstable_requestPaint, pl = a.unstable_now, Nm = a.unstable_getCurrentPriorityLevel, sr = a.unstable_ImmediatePriority, rr = a.unstable_UserBlockingPriority, Fu = a.unstable_NormalPriority, Um = a.unstable_LowPriority, dr = a.unstable_IdlePriority, Hm = a.log, Bm = a.unstable_setDisableYieldValue, La = null, vl = null;
  function Ae(t) {
    if (typeof Hm == "function" && Bm(t), vl && typeof vl.setStrictMode == "function")
      try {
        vl.setStrictMode(La, t);
      } catch {
      }
  }
  var Sl = Math.clz32 ? Math.clz32 : wm, Lm = Math.log, Ym = Math.LN2;
  function wm(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Lm(t) / Ym | 0) | 0;
  }
  var Iu = 256, Pu = 262144, ti = 4194304;
  function fn(t) {
    var l = t & 42;
    if (l !== 0) return l;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function li(t, l, e) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var i = 0, o = t.suspendedLanes, s = t.pingedLanes;
    t = t.warmLanes;
    var h = n & 134217727;
    return h !== 0 ? (n = h & ~o, n !== 0 ? i = fn(n) : (s &= h, s !== 0 ? i = fn(s) : e || (e = h & ~t, e !== 0 && (i = fn(e))))) : (h = n & ~o, h !== 0 ? i = fn(h) : s !== 0 ? i = fn(s) : e || (e = n & ~t, e !== 0 && (i = fn(e)))), i === 0 ? 0 : l !== 0 && l !== i && (l & o) === 0 && (o = i & -i, e = l & -l, o >= e || o === 32 && (e & 4194048) !== 0) ? l : i;
  }
  function Ya(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function Gm(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function hr() {
    var t = ti;
    return ti <<= 1, (ti & 62914560) === 0 && (ti = 4194304), t;
  }
  function Pc(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function wa(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function qm(t, l, e, n, i, o) {
    var s = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var h = t.entanglements, S = t.expirationTimes, O = t.hiddenUpdates;
    for (e = s & ~e; 0 < e; ) {
      var H = 31 - Sl(e), L = 1 << H;
      h[H] = 0, S[H] = -1;
      var C = O[H];
      if (C !== null)
        for (O[H] = null, H = 0; H < C.length; H++) {
          var D = C[H];
          D !== null && (D.lane &= -536870913);
        }
      e &= ~L;
    }
    n !== 0 && yr(t, n, 0), o !== 0 && i === 0 && t.tag !== 0 && (t.suspendedLanes |= o & ~(s & ~l));
  }
  function yr(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var n = 31 - Sl(l);
    t.entangledLanes |= l, t.entanglements[n] = t.entanglements[n] | 1073741824 | e & 261930;
  }
  function mr(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var n = 31 - Sl(e), i = 1 << n;
      i & l | t[n] & l && (t[n] |= l), e &= ~i;
    }
  }
  function gr(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : to(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function to(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function lo(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function pr() {
    var t = $.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : eh(t.type));
  }
  function vr(t, l) {
    var e = $.p;
    try {
      return $.p = t, l();
    } finally {
      $.p = e;
    }
  }
  var ze = Math.random().toString(36).slice(2), It = "__reactFiber$" + ze, fl = "__reactProps$" + ze, qn = "__reactContainer$" + ze, eo = "__reactEvents$" + ze, Xm = "__reactListeners$" + ze, Qm = "__reactHandles$" + ze, Sr = "__reactResources$" + ze, Ga = "__reactMarker$" + ze;
  function no(t) {
    delete t[It], delete t[fl], delete t[eo], delete t[Xm], delete t[Qm];
  }
  function Xn(t) {
    var l = t[It];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[qn] || e[It]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = G1(t); t !== null; ) {
            if (e = t[It]) return e;
            t = G1(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Qn(t) {
    if (t = t[It] || t[qn]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function qa(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(f(33));
  }
  function Zn(t) {
    var l = t[Sr];
    return l || (l = t[Sr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Jt(t) {
    t[Ga] = !0;
  }
  var br = /* @__PURE__ */ new Set(), Mr = {};
  function sn(t, l) {
    Vn(t, l), Vn(t + "Capture", l);
  }
  function Vn(t, l) {
    for (Mr[t] = l, t = 0; t < l.length; t++)
      br.add(l[t]);
  }
  var Zm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Er = {}, xr = {};
  function Vm(t) {
    return Wc.call(xr, t) ? !0 : Wc.call(Er, t) ? !1 : Zm.test(t) ? xr[t] = !0 : (Er[t] = !0, !1);
  }
  function ei(t, l, e) {
    if (Vm(l))
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var n = l.toLowerCase().slice(0, 5);
            if (n !== "data-" && n !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, "" + e);
      }
  }
  function ni(t, l, e) {
    if (e === null) t.removeAttribute(l);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, "" + e);
    }
  }
  function ne(t, l, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(l, e, "" + n);
    }
  }
  function Cl(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Tr(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Km(t, l, e) {
    var n = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var i = n.get, o = n.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return i.call(this);
        },
        set: function(s) {
          e = "" + s, o.call(this, s);
        }
      }), Object.defineProperty(t, l, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(s) {
          e = "" + s;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[l];
        }
      };
    }
  }
  function ao(t) {
    if (!t._valueTracker) {
      var l = Tr(t) ? "checked" : "value";
      t._valueTracker = Km(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function Ar(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), n = "";
    return t && (n = Tr(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== e ? (l.setValue(t), !0) : !1;
  }
  function ai(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var $m = /[\n"\\]/g;
  function Dl(t) {
    return t.replace(
      $m,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function uo(t, l, e, n, i, o, s, h) {
    t.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.type = s : t.removeAttribute("type"), l != null ? s === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + Cl(l)) : t.value !== "" + Cl(l) && (t.value = "" + Cl(l)) : s !== "submit" && s !== "reset" || t.removeAttribute("value"), l != null ? io(t, s, Cl(l)) : e != null ? io(t, s, Cl(e)) : n != null && t.removeAttribute("value"), i == null && o != null && (t.defaultChecked = !!o), i != null && (t.checked = i && typeof i != "function" && typeof i != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? t.name = "" + Cl(h) : t.removeAttribute("name");
  }
  function zr(t, l, e, n, i, o, s, h) {
    if (o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (t.type = o), l != null || e != null) {
      if (!(o !== "submit" && o !== "reset" || l != null)) {
        ao(t);
        return;
      }
      e = e != null ? "" + Cl(e) : "", l = l != null ? "" + Cl(l) : e, h || l === t.value || (t.value = l), t.defaultValue = l;
    }
    n = n ?? i, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = h ? t.checked : !!n, t.defaultChecked = !!n, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.name = s), ao(t);
  }
  function io(t, l, e) {
    l === "number" && ai(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function Kn(t, l, e, n) {
    if (t = t.options, l) {
      l = {};
      for (var i = 0; i < e.length; i++)
        l["$" + e[i]] = !0;
      for (e = 0; e < t.length; e++)
        i = l.hasOwnProperty("$" + t[e].value), t[e].selected !== i && (t[e].selected = i), i && n && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + Cl(e), l = null, i = 0; i < t.length; i++) {
        if (t[i].value === e) {
          t[i].selected = !0, n && (t[i].defaultSelected = !0);
          return;
        }
        l !== null || t[i].disabled || (l = t[i]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function _r(t, l, e) {
    if (l != null && (l = "" + Cl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + Cl(e) : "";
  }
  function Or(t, l, e, n) {
    if (l == null) {
      if (n != null) {
        if (e != null) throw Error(f(92));
        if (Mt(n)) {
          if (1 < n.length) throw Error(f(93));
          n = n[0];
        }
        e = n;
      }
      e == null && (e = ""), l = e;
    }
    e = Cl(l), t.defaultValue = e, n = t.textContent, n === e && n !== "" && n !== null && (t.value = n), ao(t);
  }
  function $n(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var km = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Cr(t, l, e) {
    var n = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? n ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : n ? t.setProperty(l, e) : typeof e != "number" || e === 0 || km.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function Dr(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(f(62));
    if (t = t.style, e != null) {
      for (var n in e)
        !e.hasOwnProperty(n) || l != null && l.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "");
      for (var i in l)
        n = l[i], l.hasOwnProperty(i) && e[i] !== n && Cr(t, i, n);
    } else
      for (var o in l)
        l.hasOwnProperty(o) && Cr(t, o, l[o]);
  }
  function co(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Jm = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Wm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ui(t) {
    return Wm.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function ae() {
  }
  var oo = null;
  function fo(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var kn = null, Jn = null;
  function Rr(t) {
    var l = Qn(t);
    if (l && (t = l.stateNode)) {
      var e = t[fl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (uo(
            t,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), l = e.name, e.type === "radio" && l != null) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + Dl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var n = e[l];
              if (n !== t && n.form === t.form) {
                var i = n[fl] || null;
                if (!i) throw Error(f(90));
                uo(
                  n,
                  i.value,
                  i.defaultValue,
                  i.defaultValue,
                  i.checked,
                  i.defaultChecked,
                  i.type,
                  i.name
                );
              }
            }
            for (l = 0; l < e.length; l++)
              n = e[l], n.form === t.form && Ar(n);
          }
          break t;
        case "textarea":
          _r(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && Kn(t, !!e.multiple, l, !1);
      }
    }
  }
  var so = !1;
  function jr(t, l, e) {
    if (so) return t(l, e);
    so = !0;
    try {
      var n = t(l);
      return n;
    } finally {
      if (so = !1, (kn !== null || Jn !== null) && (Ki(), kn && (l = kn, t = Jn, Jn = kn = null, Rr(l), t)))
        for (l = 0; l < t.length; l++) Rr(t[l]);
    }
  }
  function Xa(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var n = e[fl] || null;
    if (n === null) return null;
    e = n[l];
    t: switch (l) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (n = !n.disabled) || (t = t.type, n = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !n;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (e && typeof e != "function")
      throw Error(
        f(231, l, typeof e)
      );
    return e;
  }
  var ue = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ro = !1;
  if (ue)
    try {
      var Qa = {};
      Object.defineProperty(Qa, "passive", {
        get: function() {
          ro = !0;
        }
      }), window.addEventListener("test", Qa, Qa), window.removeEventListener("test", Qa, Qa);
    } catch {
      ro = !1;
    }
  var _e = null, ho = null, ii = null;
  function Nr() {
    if (ii) return ii;
    var t, l = ho, e = l.length, n, i = "value" in _e ? _e.value : _e.textContent, o = i.length;
    for (t = 0; t < e && l[t] === i[t]; t++) ;
    var s = e - t;
    for (n = 1; n <= s && l[e - n] === i[o - n]; n++) ;
    return ii = i.slice(t, 1 < n ? 1 - n : void 0);
  }
  function ci(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function oi() {
    return !0;
  }
  function Ur() {
    return !1;
  }
  function sl(t) {
    function l(e, n, i, o, s) {
      this._reactName = e, this._targetInst = i, this.type = n, this.nativeEvent = o, this.target = s, this.currentTarget = null;
      for (var h in t)
        t.hasOwnProperty(h) && (e = t[h], this[h] = e ? e(o) : o[h]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? oi : Ur, this.isPropagationStopped = Ur, this;
    }
    return b(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = oi);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = oi);
      },
      persist: function() {
      },
      isPersistent: oi
    }), l;
  }
  var rn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, fi = sl(rn), Za = b({}, rn, { view: 0, detail: 0 }), Fm = sl(Za), yo, mo, Va, si = b({}, Za, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: po,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Va && (Va && t.type === "mousemove" ? (yo = t.screenX - Va.screenX, mo = t.screenY - Va.screenY) : mo = yo = 0, Va = t), yo);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : mo;
    }
  }), Hr = sl(si), Im = b({}, si, { dataTransfer: 0 }), Pm = sl(Im), tg = b({}, Za, { relatedTarget: 0 }), go = sl(tg), lg = b({}, rn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), eg = sl(lg), ng = b({}, rn, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), ag = sl(ng), ug = b({}, rn, { data: 0 }), Br = sl(ug), ig = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, cg = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, og = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function fg(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = og[t]) ? !!l[t] : !1;
  }
  function po() {
    return fg;
  }
  var sg = b({}, Za, {
    key: function(t) {
      if (t.key) {
        var l = ig[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = ci(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? cg[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: po,
    charCode: function(t) {
      return t.type === "keypress" ? ci(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ci(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), rg = sl(sg), dg = b({}, si, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Lr = sl(dg), hg = b({}, Za, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: po
  }), yg = sl(hg), mg = b({}, rn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), gg = sl(mg), pg = b({}, si, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), vg = sl(pg), Sg = b({}, rn, {
    newState: 0,
    oldState: 0
  }), bg = sl(Sg), Mg = [9, 13, 27, 32], vo = ue && "CompositionEvent" in window, Ka = null;
  ue && "documentMode" in document && (Ka = document.documentMode);
  var Eg = ue && "TextEvent" in window && !Ka, Yr = ue && (!vo || Ka && 8 < Ka && 11 >= Ka), wr = " ", Gr = !1;
  function qr(t, l) {
    switch (t) {
      case "keyup":
        return Mg.indexOf(l.keyCode) !== -1;
      case "keydown":
        return l.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Xr(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Wn = !1;
  function xg(t, l) {
    switch (t) {
      case "compositionend":
        return Xr(l);
      case "keypress":
        return l.which !== 32 ? null : (Gr = !0, wr);
      case "textInput":
        return t = l.data, t === wr && Gr ? null : t;
      default:
        return null;
    }
  }
  function Tg(t, l) {
    if (Wn)
      return t === "compositionend" || !vo && qr(t, l) ? (t = Nr(), ii = ho = _e = null, Wn = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
          if (l.char && 1 < l.char.length)
            return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case "compositionend":
        return Yr && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var Ag = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Qr(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!Ag[t.type] : l === "textarea";
  }
  function Zr(t, l, e, n) {
    kn ? Jn ? Jn.push(n) : Jn = [n] : kn = n, l = Pi(l, "onChange"), 0 < l.length && (e = new fi(
      "onChange",
      "change",
      null,
      e,
      n
    ), t.push({ event: e, listeners: l }));
  }
  var $a = null, ka = null;
  function zg(t) {
    z1(t, 0);
  }
  function ri(t) {
    var l = qa(t);
    if (Ar(l)) return t;
  }
  function Vr(t, l) {
    if (t === "change") return l;
  }
  var Kr = !1;
  if (ue) {
    var So;
    if (ue) {
      var bo = "oninput" in document;
      if (!bo) {
        var $r = document.createElement("div");
        $r.setAttribute("oninput", "return;"), bo = typeof $r.oninput == "function";
      }
      So = bo;
    } else So = !1;
    Kr = So && (!document.documentMode || 9 < document.documentMode);
  }
  function kr() {
    $a && ($a.detachEvent("onpropertychange", Jr), ka = $a = null);
  }
  function Jr(t) {
    if (t.propertyName === "value" && ri(ka)) {
      var l = [];
      Zr(
        l,
        ka,
        t,
        fo(t)
      ), jr(zg, l);
    }
  }
  function _g(t, l, e) {
    t === "focusin" ? (kr(), $a = l, ka = e, $a.attachEvent("onpropertychange", Jr)) : t === "focusout" && kr();
  }
  function Og(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return ri(ka);
  }
  function Cg(t, l) {
    if (t === "click") return ri(l);
  }
  function Dg(t, l) {
    if (t === "input" || t === "change")
      return ri(l);
  }
  function Rg(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var bl = typeof Object.is == "function" ? Object.is : Rg;
  function Ja(t, l) {
    if (bl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), n = Object.keys(l);
    if (e.length !== n.length) return !1;
    for (n = 0; n < e.length; n++) {
      var i = e[n];
      if (!Wc.call(l, i) || !bl(t[i], l[i]))
        return !1;
    }
    return !0;
  }
  function Wr(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Fr(t, l) {
    var e = Wr(t);
    t = 0;
    for (var n; e; ) {
      if (e.nodeType === 3) {
        if (n = t + e.textContent.length, t <= l && n >= l)
          return { node: e, offset: l - t };
        t = n;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = Wr(e);
    }
  }
  function Ir(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? Ir(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function Pr(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = ai(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = ai(t.document);
    }
    return l;
  }
  function Mo(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var jg = ue && "documentMode" in document && 11 >= document.documentMode, Fn = null, Eo = null, Wa = null, xo = !1;
  function t0(t, l, e) {
    var n = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    xo || Fn == null || Fn !== ai(n) || (n = Fn, "selectionStart" in n && Mo(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), Wa && Ja(Wa, n) || (Wa = n, n = Pi(Eo, "onSelect"), 0 < n.length && (l = new fi(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: n }), l.target = Fn)));
  }
  function dn(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var In = {
    animationend: dn("Animation", "AnimationEnd"),
    animationiteration: dn("Animation", "AnimationIteration"),
    animationstart: dn("Animation", "AnimationStart"),
    transitionrun: dn("Transition", "TransitionRun"),
    transitionstart: dn("Transition", "TransitionStart"),
    transitioncancel: dn("Transition", "TransitionCancel"),
    transitionend: dn("Transition", "TransitionEnd")
  }, To = {}, l0 = {};
  ue && (l0 = document.createElement("div").style, "AnimationEvent" in window || (delete In.animationend.animation, delete In.animationiteration.animation, delete In.animationstart.animation), "TransitionEvent" in window || delete In.transitionend.transition);
  function hn(t) {
    if (To[t]) return To[t];
    if (!In[t]) return t;
    var l = In[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in l0)
        return To[t] = l[e];
    return t;
  }
  var e0 = hn("animationend"), n0 = hn("animationiteration"), a0 = hn("animationstart"), Ng = hn("transitionrun"), Ug = hn("transitionstart"), Hg = hn("transitioncancel"), u0 = hn("transitionend"), i0 = /* @__PURE__ */ new Map(), Ao = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ao.push("scrollEnd");
  function Xl(t, l) {
    i0.set(t, l), sn(l, [t]);
  }
  var di = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var l = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(l)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Rl = [], Pn = 0, zo = 0;
  function hi() {
    for (var t = Pn, l = zo = Pn = 0; l < t; ) {
      var e = Rl[l];
      Rl[l++] = null;
      var n = Rl[l];
      Rl[l++] = null;
      var i = Rl[l];
      Rl[l++] = null;
      var o = Rl[l];
      if (Rl[l++] = null, n !== null && i !== null) {
        var s = n.pending;
        s === null ? i.next = i : (i.next = s.next, s.next = i), n.pending = i;
      }
      o !== 0 && c0(e, i, o);
    }
  }
  function yi(t, l, e, n) {
    Rl[Pn++] = t, Rl[Pn++] = l, Rl[Pn++] = e, Rl[Pn++] = n, zo |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function _o(t, l, e, n) {
    return yi(t, l, e, n), mi(t);
  }
  function yn(t, l) {
    return yi(t, null, null, l), mi(t);
  }
  function c0(t, l, e) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e);
    for (var i = !1, o = t.return; o !== null; )
      o.childLanes |= e, n = o.alternate, n !== null && (n.childLanes |= e), o.tag === 22 && (t = o.stateNode, t === null || t._visibility & 1 || (i = !0)), t = o, o = o.return;
    return t.tag === 3 ? (o = t.stateNode, i && l !== null && (i = 31 - Sl(e), t = o.hiddenUpdates, n = t[i], n === null ? t[i] = [l] : n.push(l), l.lane = e | 536870912), o) : null;
  }
  function mi(t) {
    if (50 < vu)
      throw vu = 0, Lf = null, Error(f(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var ta = {};
  function Bg(t, l, e, n) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ml(t, l, e, n) {
    return new Bg(t, l, e, n);
  }
  function Oo(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function ie(t, l) {
    var e = t.alternate;
    return e === null ? (e = Ml(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function o0(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function gi(t, l, e, n, i, o) {
    var s = 0;
    if (n = t, typeof t == "function") Oo(t) && (s = 1);
    else if (typeof t == "string")
      s = qp(
        t,
        e,
        tt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case k:
          return t = Ml(31, e, l, i), t.elementType = k, t.lanes = o, t;
        case W:
          return mn(e.children, i, o, l);
        case w:
          s = 8, i |= 24;
          break;
        case X:
          return t = Ml(12, e, l, i | 2), t.elementType = X, t.lanes = o, t;
        case x:
          return t = Ml(13, e, l, i), t.elementType = x, t.lanes = o, t;
        case T:
          return t = Ml(19, e, l, i), t.elementType = T, t.lanes = o, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case V:
                s = 10;
                break t;
              case Z:
                s = 9;
                break t;
              case j:
                s = 11;
                break t;
              case G:
                s = 14;
                break t;
              case F:
                s = 16, n = null;
                break t;
            }
          s = 29, e = Error(
            f(130, t === null ? "null" : typeof t, "")
          ), n = null;
      }
    return l = Ml(s, e, l, i), l.elementType = t, l.type = n, l.lanes = o, l;
  }
  function mn(t, l, e, n) {
    return t = Ml(7, t, n, l), t.lanes = e, t;
  }
  function Co(t, l, e) {
    return t = Ml(6, t, null, l), t.lanes = e, t;
  }
  function f0(t) {
    var l = Ml(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Do(t, l, e) {
    return l = Ml(
      4,
      t.children !== null ? t.children : [],
      t.key,
      l
    ), l.lanes = e, l.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, l;
  }
  var s0 = /* @__PURE__ */ new WeakMap();
  function jl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = s0.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: fr(l)
      }, s0.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: fr(l)
    };
  }
  var la = [], ea = 0, pi = null, Fa = 0, Nl = [], Ul = 0, Oe = null, Jl = 1, Wl = "";
  function ce(t, l) {
    la[ea++] = Fa, la[ea++] = pi, pi = t, Fa = l;
  }
  function r0(t, l, e) {
    Nl[Ul++] = Jl, Nl[Ul++] = Wl, Nl[Ul++] = Oe, Oe = t;
    var n = Jl;
    t = Wl;
    var i = 32 - Sl(n) - 1;
    n &= ~(1 << i), e += 1;
    var o = 32 - Sl(l) + i;
    if (30 < o) {
      var s = i - i % 5;
      o = (n & (1 << s) - 1).toString(32), n >>= s, i -= s, Jl = 1 << 32 - Sl(l) + i | e << i | n, Wl = o + t;
    } else
      Jl = 1 << o | e << i | n, Wl = t;
  }
  function Ro(t) {
    t.return !== null && (ce(t, 1), r0(t, 1, 0));
  }
  function jo(t) {
    for (; t === pi; )
      pi = la[--ea], la[ea] = null, Fa = la[--ea], la[ea] = null;
    for (; t === Oe; )
      Oe = Nl[--Ul], Nl[Ul] = null, Wl = Nl[--Ul], Nl[Ul] = null, Jl = Nl[--Ul], Nl[Ul] = null;
  }
  function d0(t, l) {
    Nl[Ul++] = Jl, Nl[Ul++] = Wl, Nl[Ul++] = Oe, Jl = l.id, Wl = l.overflow, Oe = t;
  }
  var Pt = null, Nt = null, vt = !1, Ce = null, Hl = !1, No = Error(f(519));
  function De(t) {
    var l = Error(
      f(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ia(jl(l, t)), No;
  }
  function h0(t) {
    var l = t.stateNode, e = t.type, n = t.memoizedProps;
    switch (l[It] = t, l[fl] = n, e) {
      case "dialog":
        yt("cancel", l), yt("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        yt("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < bu.length; e++)
          yt(bu[e], l);
        break;
      case "source":
        yt("error", l);
        break;
      case "img":
      case "image":
      case "link":
        yt("error", l), yt("load", l);
        break;
      case "details":
        yt("toggle", l);
        break;
      case "input":
        yt("invalid", l), zr(
          l,
          n.value,
          n.defaultValue,
          n.checked,
          n.defaultChecked,
          n.type,
          n.name,
          !0
        );
        break;
      case "select":
        yt("invalid", l);
        break;
      case "textarea":
        yt("invalid", l), Or(l, n.value, n.defaultValue, n.children);
    }
    e = n.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || n.suppressHydrationWarning === !0 || D1(l.textContent, e) ? (n.popover != null && (yt("beforetoggle", l), yt("toggle", l)), n.onScroll != null && yt("scroll", l), n.onScrollEnd != null && yt("scrollend", l), n.onClick != null && (l.onclick = ae), l = !0) : l = !1, l || De(t, !0);
  }
  function y0(t) {
    for (Pt = t.return; Pt; )
      switch (Pt.tag) {
        case 5:
        case 31:
        case 13:
          Hl = !1;
          return;
        case 27:
        case 3:
          Hl = !0;
          return;
        default:
          Pt = Pt.return;
      }
  }
  function na(t) {
    if (t !== Pt) return !1;
    if (!vt) return y0(t), vt = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || If(t.type, t.memoizedProps)), e = !e), e && Nt && De(t), y0(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      Nt = w1(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      Nt = w1(t);
    } else
      l === 27 ? (l = Nt, Ze(t.type) ? (t = ns, ns = null, Nt = t) : Nt = l) : Nt = Pt ? Ll(t.stateNode.nextSibling) : null;
    return !0;
  }
  function gn() {
    Nt = Pt = null, vt = !1;
  }
  function Uo() {
    var t = Ce;
    return t !== null && (yl === null ? yl = t : yl.push.apply(
      yl,
      t
    ), Ce = null), t;
  }
  function Ia(t) {
    Ce === null ? Ce = [t] : Ce.push(t);
  }
  var Ho = E(null), pn = null, oe = null;
  function Re(t, l, e) {
    J(Ho, l._currentValue), l._currentValue = e;
  }
  function fe(t) {
    t._currentValue = Ho.current, Y(Ho);
  }
  function Bo(t, l, e) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, n !== null && (n.childLanes |= l)) : n !== null && (n.childLanes & l) !== l && (n.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function Lo(t, l, e, n) {
    var i = t.child;
    for (i !== null && (i.return = t); i !== null; ) {
      var o = i.dependencies;
      if (o !== null) {
        var s = i.child;
        o = o.firstContext;
        t: for (; o !== null; ) {
          var h = o;
          o = i;
          for (var S = 0; S < l.length; S++)
            if (h.context === l[S]) {
              o.lanes |= e, h = o.alternate, h !== null && (h.lanes |= e), Bo(
                o.return,
                e,
                t
              ), n || (s = null);
              break t;
            }
          o = h.next;
        }
      } else if (i.tag === 18) {
        if (s = i.return, s === null) throw Error(f(341));
        s.lanes |= e, o = s.alternate, o !== null && (o.lanes |= e), Bo(s, e, t), s = null;
      } else s = i.child;
      if (s !== null) s.return = i;
      else
        for (s = i; s !== null; ) {
          if (s === t) {
            s = null;
            break;
          }
          if (i = s.sibling, i !== null) {
            i.return = s.return, s = i;
            break;
          }
          s = s.return;
        }
      i = s;
    }
  }
  function aa(t, l, e, n) {
    t = null;
    for (var i = l, o = !1; i !== null; ) {
      if (!o) {
        if ((i.flags & 524288) !== 0) o = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var s = i.alternate;
        if (s === null) throw Error(f(387));
        if (s = s.memoizedProps, s !== null) {
          var h = i.type;
          bl(i.pendingProps.value, s.value) || (t !== null ? t.push(h) : t = [h]);
        }
      } else if (i === zt.current) {
        if (s = i.alternate, s === null) throw Error(f(387));
        s.memoizedState.memoizedState !== i.memoizedState.memoizedState && (t !== null ? t.push(Au) : t = [Au]);
      }
      i = i.return;
    }
    t !== null && Lo(
      l,
      t,
      e,
      n
    ), l.flags |= 262144;
  }
  function vi(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!bl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function vn(t) {
    pn = t, oe = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function tl(t) {
    return m0(pn, t);
  }
  function Si(t, l) {
    return pn === null && vn(t), m0(t, l);
  }
  function m0(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, oe === null) {
      if (t === null) throw Error(f(308));
      oe = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else oe = oe.next = l;
    return e;
  }
  var Lg = typeof AbortController < "u" ? AbortController : function() {
    var t = [], l = this.signal = {
      aborted: !1,
      addEventListener: function(e, n) {
        t.push(n);
      }
    };
    this.abort = function() {
      l.aborted = !0, t.forEach(function(e) {
        return e();
      });
    };
  }, Yg = a.unstable_scheduleCallback, wg = a.unstable_NormalPriority, Xt = {
    $$typeof: V,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Yo() {
    return {
      controller: new Lg(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Pa(t) {
    t.refCount--, t.refCount === 0 && Yg(wg, function() {
      t.controller.abort();
    });
  }
  var tu = null, wo = 0, ua = 0, ia = null;
  function Gg(t, l) {
    if (tu === null) {
      var e = tu = [];
      wo = 0, ua = Qf(), ia = {
        status: "pending",
        value: void 0,
        then: function(n) {
          e.push(n);
        }
      };
    }
    return wo++, l.then(g0, g0), l;
  }
  function g0() {
    if (--wo === 0 && tu !== null) {
      ia !== null && (ia.status = "fulfilled");
      var t = tu;
      tu = null, ua = 0, ia = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function qg(t, l) {
    var e = [], n = {
      status: "pending",
      value: null,
      reason: null,
      then: function(i) {
        e.push(i);
      }
    };
    return t.then(
      function() {
        n.status = "fulfilled", n.value = l;
        for (var i = 0; i < e.length; i++) (0, e[i])(l);
      },
      function(i) {
        for (n.status = "rejected", n.reason = i, i = 0; i < e.length; i++)
          (0, e[i])(void 0);
      }
    ), n;
  }
  var p0 = U.S;
  U.S = function(t, l) {
    t1 = pl(), typeof l == "object" && l !== null && typeof l.then == "function" && Gg(t, l), p0 !== null && p0(t, l);
  };
  var Sn = E(null);
  function Go() {
    var t = Sn.current;
    return t !== null ? t : jt.pooledCache;
  }
  function bi(t, l) {
    l === null ? J(Sn, Sn.current) : J(Sn, l.pool);
  }
  function v0() {
    var t = Go();
    return t === null ? null : { parent: Xt._currentValue, pool: t };
  }
  var ca = Error(f(460)), qo = Error(f(474)), Mi = Error(f(542)), Ei = { then: function() {
  } };
  function S0(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function b0(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(ae, ae), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, E0(t), t;
      default:
        if (typeof l.status == "string") l.then(ae, ae);
        else {
          if (t = jt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(f(482));
          t = l, t.status = "pending", t.then(
            function(n) {
              if (l.status === "pending") {
                var i = l;
                i.status = "fulfilled", i.value = n;
              }
            },
            function(n) {
              if (l.status === "pending") {
                var i = l;
                i.status = "rejected", i.reason = n;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, E0(t), t;
        }
        throw Mn = l, ca;
    }
  }
  function bn(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Mn = e, ca) : e;
    }
  }
  var Mn = null;
  function M0() {
    if (Mn === null) throw Error(f(459));
    var t = Mn;
    return Mn = null, t;
  }
  function E0(t) {
    if (t === ca || t === Mi)
      throw Error(f(483));
  }
  var oa = null, lu = 0;
  function xi(t) {
    var l = lu;
    return lu += 1, oa === null && (oa = []), b0(oa, t, l);
  }
  function eu(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function Ti(t, l) {
    throw l.$$typeof === R ? Error(f(525)) : (t = Object.prototype.toString.call(l), Error(
      f(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function x0(t) {
    function l(A, M) {
      if (t) {
        var _ = A.deletions;
        _ === null ? (A.deletions = [M], A.flags |= 16) : _.push(M);
      }
    }
    function e(A, M) {
      if (!t) return null;
      for (; M !== null; )
        l(A, M), M = M.sibling;
      return null;
    }
    function n(A) {
      for (var M = /* @__PURE__ */ new Map(); A !== null; )
        A.key !== null ? M.set(A.key, A) : M.set(A.index, A), A = A.sibling;
      return M;
    }
    function i(A, M) {
      return A = ie(A, M), A.index = 0, A.sibling = null, A;
    }
    function o(A, M, _) {
      return A.index = _, t ? (_ = A.alternate, _ !== null ? (_ = _.index, _ < M ? (A.flags |= 67108866, M) : _) : (A.flags |= 67108866, M)) : (A.flags |= 1048576, M);
    }
    function s(A) {
      return t && A.alternate === null && (A.flags |= 67108866), A;
    }
    function h(A, M, _, B) {
      return M === null || M.tag !== 6 ? (M = Co(_, A.mode, B), M.return = A, M) : (M = i(M, _), M.return = A, M);
    }
    function S(A, M, _, B) {
      var nt = _.type;
      return nt === W ? H(
        A,
        M,
        _.props.children,
        B,
        _.key
      ) : M !== null && (M.elementType === nt || typeof nt == "object" && nt !== null && nt.$$typeof === F && bn(nt) === M.type) ? (M = i(M, _.props), eu(M, _), M.return = A, M) : (M = gi(
        _.type,
        _.key,
        _.props,
        null,
        A.mode,
        B
      ), eu(M, _), M.return = A, M);
    }
    function O(A, M, _, B) {
      return M === null || M.tag !== 4 || M.stateNode.containerInfo !== _.containerInfo || M.stateNode.implementation !== _.implementation ? (M = Do(_, A.mode, B), M.return = A, M) : (M = i(M, _.children || []), M.return = A, M);
    }
    function H(A, M, _, B, nt) {
      return M === null || M.tag !== 7 ? (M = mn(
        _,
        A.mode,
        B,
        nt
      ), M.return = A, M) : (M = i(M, _), M.return = A, M);
    }
    function L(A, M, _) {
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return M = Co(
          "" + M,
          A.mode,
          _
        ), M.return = A, M;
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case N:
            return _ = gi(
              M.type,
              M.key,
              M.props,
              null,
              A.mode,
              _
            ), eu(_, M), _.return = A, _;
          case Q:
            return M = Do(
              M,
              A.mode,
              _
            ), M.return = A, M;
          case F:
            return M = bn(M), L(A, M, _);
        }
        if (Mt(M) || at(M))
          return M = mn(
            M,
            A.mode,
            _,
            null
          ), M.return = A, M;
        if (typeof M.then == "function")
          return L(A, xi(M), _);
        if (M.$$typeof === V)
          return L(
            A,
            Si(A, M),
            _
          );
        Ti(A, M);
      }
      return null;
    }
    function C(A, M, _, B) {
      var nt = M !== null ? M.key : null;
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint")
        return nt !== null ? null : h(A, M, "" + _, B);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case N:
            return _.key === nt ? S(A, M, _, B) : null;
          case Q:
            return _.key === nt ? O(A, M, _, B) : null;
          case F:
            return _ = bn(_), C(A, M, _, B);
        }
        if (Mt(_) || at(_))
          return nt !== null ? null : H(A, M, _, B, null);
        if (typeof _.then == "function")
          return C(
            A,
            M,
            xi(_),
            B
          );
        if (_.$$typeof === V)
          return C(
            A,
            M,
            Si(A, _),
            B
          );
        Ti(A, _);
      }
      return null;
    }
    function D(A, M, _, B, nt) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return A = A.get(_) || null, h(M, A, "" + B, nt);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case N:
            return A = A.get(
              B.key === null ? _ : B.key
            ) || null, S(M, A, B, nt);
          case Q:
            return A = A.get(
              B.key === null ? _ : B.key
            ) || null, O(M, A, B, nt);
          case F:
            return B = bn(B), D(
              A,
              M,
              _,
              B,
              nt
            );
        }
        if (Mt(B) || at(B))
          return A = A.get(_) || null, H(M, A, B, nt, null);
        if (typeof B.then == "function")
          return D(
            A,
            M,
            _,
            xi(B),
            nt
          );
        if (B.$$typeof === V)
          return D(
            A,
            M,
            _,
            Si(M, B),
            nt
          );
        Ti(M, B);
      }
      return null;
    }
    function P(A, M, _, B) {
      for (var nt = null, Et = null, lt = M, rt = M = 0, gt = null; lt !== null && rt < _.length; rt++) {
        lt.index > rt ? (gt = lt, lt = null) : gt = lt.sibling;
        var xt = C(
          A,
          lt,
          _[rt],
          B
        );
        if (xt === null) {
          lt === null && (lt = gt);
          break;
        }
        t && lt && xt.alternate === null && l(A, lt), M = o(xt, M, rt), Et === null ? nt = xt : Et.sibling = xt, Et = xt, lt = gt;
      }
      if (rt === _.length)
        return e(A, lt), vt && ce(A, rt), nt;
      if (lt === null) {
        for (; rt < _.length; rt++)
          lt = L(A, _[rt], B), lt !== null && (M = o(
            lt,
            M,
            rt
          ), Et === null ? nt = lt : Et.sibling = lt, Et = lt);
        return vt && ce(A, rt), nt;
      }
      for (lt = n(lt); rt < _.length; rt++)
        gt = D(
          lt,
          A,
          rt,
          _[rt],
          B
        ), gt !== null && (t && gt.alternate !== null && lt.delete(
          gt.key === null ? rt : gt.key
        ), M = o(
          gt,
          M,
          rt
        ), Et === null ? nt = gt : Et.sibling = gt, Et = gt);
      return t && lt.forEach(function(Je) {
        return l(A, Je);
      }), vt && ce(A, rt), nt;
    }
    function ut(A, M, _, B) {
      if (_ == null) throw Error(f(151));
      for (var nt = null, Et = null, lt = M, rt = M = 0, gt = null, xt = _.next(); lt !== null && !xt.done; rt++, xt = _.next()) {
        lt.index > rt ? (gt = lt, lt = null) : gt = lt.sibling;
        var Je = C(A, lt, xt.value, B);
        if (Je === null) {
          lt === null && (lt = gt);
          break;
        }
        t && lt && Je.alternate === null && l(A, lt), M = o(Je, M, rt), Et === null ? nt = Je : Et.sibling = Je, Et = Je, lt = gt;
      }
      if (xt.done)
        return e(A, lt), vt && ce(A, rt), nt;
      if (lt === null) {
        for (; !xt.done; rt++, xt = _.next())
          xt = L(A, xt.value, B), xt !== null && (M = o(xt, M, rt), Et === null ? nt = xt : Et.sibling = xt, Et = xt);
        return vt && ce(A, rt), nt;
      }
      for (lt = n(lt); !xt.done; rt++, xt = _.next())
        xt = D(lt, A, rt, xt.value, B), xt !== null && (t && xt.alternate !== null && lt.delete(xt.key === null ? rt : xt.key), M = o(xt, M, rt), Et === null ? nt = xt : Et.sibling = xt, Et = xt);
      return t && lt.forEach(function(Ip) {
        return l(A, Ip);
      }), vt && ce(A, rt), nt;
    }
    function Rt(A, M, _, B) {
      if (typeof _ == "object" && _ !== null && _.type === W && _.key === null && (_ = _.props.children), typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case N:
            t: {
              for (var nt = _.key; M !== null; ) {
                if (M.key === nt) {
                  if (nt = _.type, nt === W) {
                    if (M.tag === 7) {
                      e(
                        A,
                        M.sibling
                      ), B = i(
                        M,
                        _.props.children
                      ), B.return = A, A = B;
                      break t;
                    }
                  } else if (M.elementType === nt || typeof nt == "object" && nt !== null && nt.$$typeof === F && bn(nt) === M.type) {
                    e(
                      A,
                      M.sibling
                    ), B = i(M, _.props), eu(B, _), B.return = A, A = B;
                    break t;
                  }
                  e(A, M);
                  break;
                } else l(A, M);
                M = M.sibling;
              }
              _.type === W ? (B = mn(
                _.props.children,
                A.mode,
                B,
                _.key
              ), B.return = A, A = B) : (B = gi(
                _.type,
                _.key,
                _.props,
                null,
                A.mode,
                B
              ), eu(B, _), B.return = A, A = B);
            }
            return s(A);
          case Q:
            t: {
              for (nt = _.key; M !== null; ) {
                if (M.key === nt)
                  if (M.tag === 4 && M.stateNode.containerInfo === _.containerInfo && M.stateNode.implementation === _.implementation) {
                    e(
                      A,
                      M.sibling
                    ), B = i(M, _.children || []), B.return = A, A = B;
                    break t;
                  } else {
                    e(A, M);
                    break;
                  }
                else l(A, M);
                M = M.sibling;
              }
              B = Do(_, A.mode, B), B.return = A, A = B;
            }
            return s(A);
          case F:
            return _ = bn(_), Rt(
              A,
              M,
              _,
              B
            );
        }
        if (Mt(_))
          return P(
            A,
            M,
            _,
            B
          );
        if (at(_)) {
          if (nt = at(_), typeof nt != "function") throw Error(f(150));
          return _ = nt.call(_), ut(
            A,
            M,
            _,
            B
          );
        }
        if (typeof _.then == "function")
          return Rt(
            A,
            M,
            xi(_),
            B
          );
        if (_.$$typeof === V)
          return Rt(
            A,
            M,
            Si(A, _),
            B
          );
        Ti(A, _);
      }
      return typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint" ? (_ = "" + _, M !== null && M.tag === 6 ? (e(A, M.sibling), B = i(M, _), B.return = A, A = B) : (e(A, M), B = Co(_, A.mode, B), B.return = A, A = B), s(A)) : e(A, M);
    }
    return function(A, M, _, B) {
      try {
        lu = 0;
        var nt = Rt(
          A,
          M,
          _,
          B
        );
        return oa = null, nt;
      } catch (lt) {
        if (lt === ca || lt === Mi) throw lt;
        var Et = Ml(29, lt, null, A.mode);
        return Et.lanes = B, Et.return = A, Et;
      } finally {
      }
    };
  }
  var En = x0(!0), T0 = x0(!1), je = !1;
  function Xo(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Qo(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ne(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ue(t, l, e) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (At & 2) !== 0) {
      var i = n.pending;
      return i === null ? l.next = l : (l.next = i.next, i.next = l), n.pending = l, l = mi(t), c0(t, null, e), l;
    }
    return yi(t, n, l, e), mi(t);
  }
  function nu(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var n = l.lanes;
      n &= t.pendingLanes, e |= n, l.lanes = e, mr(t, e);
    }
  }
  function Zo(t, l) {
    var e = t.updateQueue, n = t.alternate;
    if (n !== null && (n = n.updateQueue, e === n)) {
      var i = null, o = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var s = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          o === null ? i = o = s : o = o.next = s, e = e.next;
        } while (e !== null);
        o === null ? i = o = l : o = o.next = l;
      } else i = o = l;
      e = {
        baseState: n.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: o,
        shared: n.shared,
        callbacks: n.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
  }
  var Vo = !1;
  function au() {
    if (Vo) {
      var t = ia;
      if (t !== null) throw t;
    }
  }
  function uu(t, l, e, n) {
    Vo = !1;
    var i = t.updateQueue;
    je = !1;
    var o = i.firstBaseUpdate, s = i.lastBaseUpdate, h = i.shared.pending;
    if (h !== null) {
      i.shared.pending = null;
      var S = h, O = S.next;
      S.next = null, s === null ? o = O : s.next = O, s = S;
      var H = t.alternate;
      H !== null && (H = H.updateQueue, h = H.lastBaseUpdate, h !== s && (h === null ? H.firstBaseUpdate = O : h.next = O, H.lastBaseUpdate = S));
    }
    if (o !== null) {
      var L = i.baseState;
      s = 0, H = O = S = null, h = o;
      do {
        var C = h.lane & -536870913, D = C !== h.lane;
        if (D ? (mt & C) === C : (n & C) === C) {
          C !== 0 && C === ua && (Vo = !0), H !== null && (H = H.next = {
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: null,
            next: null
          });
          t: {
            var P = t, ut = h;
            C = l;
            var Rt = e;
            switch (ut.tag) {
              case 1:
                if (P = ut.payload, typeof P == "function") {
                  L = P.call(Rt, L, C);
                  break t;
                }
                L = P;
                break t;
              case 3:
                P.flags = P.flags & -65537 | 128;
              case 0:
                if (P = ut.payload, C = typeof P == "function" ? P.call(Rt, L, C) : P, C == null) break t;
                L = b({}, L, C);
                break t;
              case 2:
                je = !0;
            }
          }
          C = h.callback, C !== null && (t.flags |= 64, D && (t.flags |= 8192), D = i.callbacks, D === null ? i.callbacks = [C] : D.push(C));
        } else
          D = {
            lane: C,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          }, H === null ? (O = H = D, S = L) : H = H.next = D, s |= C;
        if (h = h.next, h === null) {
          if (h = i.shared.pending, h === null)
            break;
          D = h, h = D.next, D.next = null, i.lastBaseUpdate = D, i.shared.pending = null;
        }
      } while (!0);
      H === null && (S = L), i.baseState = S, i.firstBaseUpdate = O, i.lastBaseUpdate = H, o === null && (i.shared.lanes = 0), we |= s, t.lanes = s, t.memoizedState = L;
    }
  }
  function A0(t, l) {
    if (typeof t != "function")
      throw Error(f(191, t));
    t.call(l);
  }
  function z0(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        A0(e[t], l);
  }
  var fa = E(null), Ai = E(0);
  function _0(t, l) {
    t = ve, J(Ai, t), J(fa, l), ve = t | l.baseLanes;
  }
  function Ko() {
    J(Ai, ve), J(fa, fa.current);
  }
  function $o() {
    ve = Ai.current, Y(fa), Y(Ai);
  }
  var El = E(null), Bl = null;
  function He(t) {
    var l = t.alternate;
    J(wt, wt.current & 1), J(El, t), Bl === null && (l === null || fa.current !== null || l.memoizedState !== null) && (Bl = t);
  }
  function ko(t) {
    J(wt, wt.current), J(El, t), Bl === null && (Bl = t);
  }
  function O0(t) {
    t.tag === 22 ? (J(wt, wt.current), J(El, t), Bl === null && (Bl = t)) : Be();
  }
  function Be() {
    J(wt, wt.current), J(El, El.current);
  }
  function xl(t) {
    Y(El), Bl === t && (Bl = null), Y(wt);
  }
  var wt = E(0);
  function zi(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || ls(e) || es(e)))
          return l;
      } else if (l.tag === 19 && (l.memoizedProps.revealOrder === "forwards" || l.memoizedProps.revealOrder === "backwards" || l.memoizedProps.revealOrder === "unstable_legacy-backwards" || l.memoizedProps.revealOrder === "together")) {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    return null;
  }
  var se = 0, st = null, Ct = null, Qt = null, _i = !1, sa = !1, xn = !1, Oi = 0, iu = 0, ra = null, Xg = 0;
  function Bt() {
    throw Error(f(321));
  }
  function Jo(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!bl(t[e], l[e])) return !1;
    return !0;
  }
  function Wo(t, l, e, n, i, o) {
    return se = o, st = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, U.H = t === null || t.memoizedState === null ? rd : df, xn = !1, o = e(n, i), xn = !1, sa && (o = D0(
      l,
      e,
      n,
      i
    )), C0(t), o;
  }
  function C0(t) {
    U.H = fu;
    var l = Ct !== null && Ct.next !== null;
    if (se = 0, Qt = Ct = st = null, _i = !1, iu = 0, ra = null, l) throw Error(f(300));
    t === null || Zt || (t = t.dependencies, t !== null && vi(t) && (Zt = !0));
  }
  function D0(t, l, e, n) {
    st = t;
    var i = 0;
    do {
      if (sa && (ra = null), iu = 0, sa = !1, 25 <= i) throw Error(f(301));
      if (i += 1, Qt = Ct = null, t.updateQueue != null) {
        var o = t.updateQueue;
        o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
      }
      U.H = dd, o = l(e, n);
    } while (sa);
    return o;
  }
  function Qg() {
    var t = U.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? cu(l) : l, t = t.useState()[0], (Ct !== null ? Ct.memoizedState : null) !== t && (st.flags |= 1024), l;
  }
  function Fo() {
    var t = Oi !== 0;
    return Oi = 0, t;
  }
  function Io(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function Po(t) {
    if (_i) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      _i = !1;
    }
    se = 0, Qt = Ct = st = null, sa = !1, iu = Oi = 0, ra = null;
  }
  function ol() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Qt === null ? st.memoizedState = Qt = t : Qt = Qt.next = t, Qt;
  }
  function Gt() {
    if (Ct === null) {
      var t = st.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ct.next;
    var l = Qt === null ? st.memoizedState : Qt.next;
    if (l !== null)
      Qt = l, Ct = t;
    else {
      if (t === null)
        throw st.alternate === null ? Error(f(467)) : Error(f(310));
      Ct = t, t = {
        memoizedState: Ct.memoizedState,
        baseState: Ct.baseState,
        baseQueue: Ct.baseQueue,
        queue: Ct.queue,
        next: null
      }, Qt === null ? st.memoizedState = Qt = t : Qt = Qt.next = t;
    }
    return Qt;
  }
  function Ci() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function cu(t) {
    var l = iu;
    return iu += 1, ra === null && (ra = []), t = b0(ra, t, l), l = st, (Qt === null ? l.memoizedState : Qt.next) === null && (l = l.alternate, U.H = l === null || l.memoizedState === null ? rd : df), t;
  }
  function Di(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return cu(t);
      if (t.$$typeof === V) return tl(t);
    }
    throw Error(f(438, String(t)));
  }
  function tf(t) {
    var l = null, e = st.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var n = st.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (l = {
        data: n.data.map(function(i) {
          return i.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = Ci(), st.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), n = 0; n < t; n++)
        e[n] = q;
    return l.index++, e;
  }
  function re(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function Ri(t) {
    var l = Gt();
    return lf(l, Ct, t);
  }
  function lf(t, l, e) {
    var n = t.queue;
    if (n === null) throw Error(f(311));
    n.lastRenderedReducer = e;
    var i = t.baseQueue, o = n.pending;
    if (o !== null) {
      if (i !== null) {
        var s = i.next;
        i.next = o.next, o.next = s;
      }
      l.baseQueue = i = o, n.pending = null;
    }
    if (o = t.baseState, i === null) t.memoizedState = o;
    else {
      l = i.next;
      var h = s = null, S = null, O = l, H = !1;
      do {
        var L = O.lane & -536870913;
        if (L !== O.lane ? (mt & L) === L : (se & L) === L) {
          var C = O.revertLane;
          if (C === 0)
            S !== null && (S = S.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }), L === ua && (H = !0);
          else if ((se & C) === C) {
            O = O.next, C === ua && (H = !0);
            continue;
          } else
            L = {
              lane: 0,
              revertLane: O.revertLane,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }, S === null ? (h = S = L, s = o) : S = S.next = L, st.lanes |= C, we |= C;
          L = O.action, xn && e(o, L), o = O.hasEagerState ? O.eagerState : e(o, L);
        } else
          C = {
            lane: L,
            revertLane: O.revertLane,
            gesture: O.gesture,
            action: O.action,
            hasEagerState: O.hasEagerState,
            eagerState: O.eagerState,
            next: null
          }, S === null ? (h = S = C, s = o) : S = S.next = C, st.lanes |= L, we |= L;
        O = O.next;
      } while (O !== null && O !== l);
      if (S === null ? s = o : S.next = h, !bl(o, t.memoizedState) && (Zt = !0, H && (e = ia, e !== null)))
        throw e;
      t.memoizedState = o, t.baseState = s, t.baseQueue = S, n.lastRenderedState = o;
    }
    return i === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function ef(t) {
    var l = Gt(), e = l.queue;
    if (e === null) throw Error(f(311));
    e.lastRenderedReducer = t;
    var n = e.dispatch, i = e.pending, o = l.memoizedState;
    if (i !== null) {
      e.pending = null;
      var s = i = i.next;
      do
        o = t(o, s.action), s = s.next;
      while (s !== i);
      bl(o, l.memoizedState) || (Zt = !0), l.memoizedState = o, l.baseQueue === null && (l.baseState = o), e.lastRenderedState = o;
    }
    return [o, n];
  }
  function R0(t, l, e) {
    var n = st, i = Gt(), o = vt;
    if (o) {
      if (e === void 0) throw Error(f(407));
      e = e();
    } else e = l();
    var s = !bl(
      (Ct || i).memoizedState,
      e
    );
    if (s && (i.memoizedState = e, Zt = !0), i = i.queue, uf(U0.bind(null, n, i, t), [
      t
    ]), i.getSnapshot !== l || s || Qt !== null && Qt.memoizedState.tag & 1) {
      if (n.flags |= 2048, da(
        9,
        { destroy: void 0 },
        N0.bind(
          null,
          n,
          i,
          e,
          l
        ),
        null
      ), jt === null) throw Error(f(349));
      o || (se & 127) !== 0 || j0(n, l, e);
    }
    return e;
  }
  function j0(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = st.updateQueue, l === null ? (l = Ci(), st.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function N0(t, l, e, n) {
    l.value = e, l.getSnapshot = n, H0(l) && B0(t);
  }
  function U0(t, l, e) {
    return e(function() {
      H0(l) && B0(t);
    });
  }
  function H0(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !bl(t, e);
    } catch {
      return !0;
    }
  }
  function B0(t) {
    var l = yn(t, 2);
    l !== null && ml(l, t, 2);
  }
  function nf(t) {
    var l = ol();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), xn) {
        Ae(!0);
        try {
          e();
        } finally {
          Ae(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: re,
      lastRenderedState: t
    }, l;
  }
  function L0(t, l, e, n) {
    return t.baseState = e, lf(
      t,
      Ct,
      typeof n == "function" ? n : re
    );
  }
  function Zg(t, l, e, n, i) {
    if (Ui(t)) throw Error(f(485));
    if (t = l.action, t !== null) {
      var o = {
        payload: i,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(s) {
          o.listeners.push(s);
        }
      };
      U.T !== null ? e(!0) : o.isTransition = !1, n(o), e = l.pending, e === null ? (o.next = l.pending = o, Y0(l, o)) : (o.next = e.next, l.pending = e.next = o);
    }
  }
  function Y0(t, l) {
    var e = l.action, n = l.payload, i = t.state;
    if (l.isTransition) {
      var o = U.T, s = {};
      U.T = s;
      try {
        var h = e(i, n), S = U.S;
        S !== null && S(s, h), w0(t, l, h);
      } catch (O) {
        af(t, l, O);
      } finally {
        o !== null && s.types !== null && (o.types = s.types), U.T = o;
      }
    } else
      try {
        o = e(i, n), w0(t, l, o);
      } catch (O) {
        af(t, l, O);
      }
  }
  function w0(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(n) {
        G0(t, l, n);
      },
      function(n) {
        return af(t, l, n);
      }
    ) : G0(t, l, e);
  }
  function G0(t, l, e) {
    l.status = "fulfilled", l.value = e, q0(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Y0(t, e)));
  }
  function af(t, l, e) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do
        l.status = "rejected", l.reason = e, q0(l), l = l.next;
      while (l !== n);
    }
    t.action = null;
  }
  function q0(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function X0(t, l) {
    return l;
  }
  function Q0(t, l) {
    if (vt) {
      var e = jt.formState;
      if (e !== null) {
        t: {
          var n = st;
          if (vt) {
            if (Nt) {
              l: {
                for (var i = Nt, o = Hl; i.nodeType !== 8; ) {
                  if (!o) {
                    i = null;
                    break l;
                  }
                  if (i = Ll(
                    i.nextSibling
                  ), i === null) {
                    i = null;
                    break l;
                  }
                }
                o = i.data, i = o === "F!" || o === "F" ? i : null;
              }
              if (i) {
                Nt = Ll(
                  i.nextSibling
                ), n = i.data === "F!";
                break t;
              }
            }
            De(n);
          }
          n = !1;
        }
        n && (l = e[0]);
      }
    }
    return e = ol(), e.memoizedState = e.baseState = l, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: X0,
      lastRenderedState: l
    }, e.queue = n, e = od.bind(
      null,
      st,
      n
    ), n.dispatch = e, n = nf(!1), o = rf.bind(
      null,
      st,
      !1,
      n.queue
    ), n = ol(), i = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = i, e = Zg.bind(
      null,
      st,
      i,
      o,
      e
    ), i.dispatch = e, n.memoizedState = t, [l, e, !1];
  }
  function Z0(t) {
    var l = Gt();
    return V0(l, Ct, t);
  }
  function V0(t, l, e) {
    if (l = lf(
      t,
      l,
      X0
    )[0], t = Ri(re)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var n = cu(l);
      } catch (s) {
        throw s === ca ? Mi : s;
      }
    else n = l;
    l = Gt();
    var i = l.queue, o = i.dispatch;
    return e !== l.memoizedState && (st.flags |= 2048, da(
      9,
      { destroy: void 0 },
      Vg.bind(null, i, e),
      null
    )), [n, o, t];
  }
  function Vg(t, l) {
    t.action = l;
  }
  function K0(t) {
    var l = Gt(), e = Ct;
    if (e !== null)
      return V0(l, e, t);
    Gt(), l = l.memoizedState, e = Gt();
    var n = e.queue.dispatch;
    return e.memoizedState = t, [l, n, !1];
  }
  function da(t, l, e, n) {
    return t = { tag: t, create: e, deps: n, inst: l, next: null }, l = st.updateQueue, l === null && (l = Ci(), st.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (n = e.next, e.next = t, t.next = n, l.lastEffect = t), t;
  }
  function $0() {
    return Gt().memoizedState;
  }
  function ji(t, l, e, n) {
    var i = ol();
    st.flags |= t, i.memoizedState = da(
      1 | l,
      { destroy: void 0 },
      e,
      n === void 0 ? null : n
    );
  }
  function Ni(t, l, e, n) {
    var i = Gt();
    n = n === void 0 ? null : n;
    var o = i.memoizedState.inst;
    Ct !== null && n !== null && Jo(n, Ct.memoizedState.deps) ? i.memoizedState = da(l, o, e, n) : (st.flags |= t, i.memoizedState = da(
      1 | l,
      o,
      e,
      n
    ));
  }
  function k0(t, l) {
    ji(8390656, 8, t, l);
  }
  function uf(t, l) {
    Ni(2048, 8, t, l);
  }
  function Kg(t) {
    st.flags |= 4;
    var l = st.updateQueue;
    if (l === null)
      l = Ci(), st.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function J0(t) {
    var l = Gt().memoizedState;
    return Kg({ ref: l, nextImpl: t }), function() {
      if ((At & 2) !== 0) throw Error(f(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function W0(t, l) {
    return Ni(4, 2, t, l);
  }
  function F0(t, l) {
    return Ni(4, 4, t, l);
  }
  function I0(t, l) {
    if (typeof l == "function") {
      t = t();
      var e = l(t);
      return function() {
        typeof e == "function" ? e() : l(null);
      };
    }
    if (l != null)
      return t = t(), l.current = t, function() {
        l.current = null;
      };
  }
  function P0(t, l, e) {
    e = e != null ? e.concat([t]) : null, Ni(4, 4, I0.bind(null, l, t), e);
  }
  function cf() {
  }
  function td(t, l) {
    var e = Gt();
    l = l === void 0 ? null : l;
    var n = e.memoizedState;
    return l !== null && Jo(l, n[1]) ? n[0] : (e.memoizedState = [t, l], t);
  }
  function ld(t, l) {
    var e = Gt();
    l = l === void 0 ? null : l;
    var n = e.memoizedState;
    if (l !== null && Jo(l, n[1]))
      return n[0];
    if (n = t(), xn) {
      Ae(!0);
      try {
        t();
      } finally {
        Ae(!1);
      }
    }
    return e.memoizedState = [n, l], n;
  }
  function of(t, l, e) {
    return e === void 0 || (se & 1073741824) !== 0 && (mt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = e1(), st.lanes |= t, we |= t, e);
  }
  function ed(t, l, e, n) {
    return bl(e, l) ? e : fa.current !== null ? (t = of(t, e, n), bl(t, l) || (Zt = !0), t) : (se & 42) === 0 || (se & 1073741824) !== 0 && (mt & 261930) === 0 ? (Zt = !0, t.memoizedState = e) : (t = e1(), st.lanes |= t, we |= t, l);
  }
  function nd(t, l, e, n, i) {
    var o = $.p;
    $.p = o !== 0 && 8 > o ? o : 8;
    var s = U.T, h = {};
    U.T = h, rf(t, !1, l, e);
    try {
      var S = i(), O = U.S;
      if (O !== null && O(h, S), S !== null && typeof S == "object" && typeof S.then == "function") {
        var H = qg(
          S,
          n
        );
        ou(
          t,
          l,
          H,
          zl(t)
        );
      } else
        ou(
          t,
          l,
          n,
          zl(t)
        );
    } catch (L) {
      ou(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: L },
        zl()
      );
    } finally {
      $.p = o, s !== null && h.types !== null && (s.types = h.types), U.T = s;
    }
  }
  function $g() {
  }
  function ff(t, l, e, n) {
    if (t.tag !== 5) throw Error(f(476));
    var i = ad(t).queue;
    nd(
      t,
      i,
      l,
      et,
      e === null ? $g : function() {
        return ud(t), e(n);
      }
    );
  }
  function ad(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: et,
      baseState: et,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: re,
        lastRenderedState: et
      },
      next: null
    };
    var e = {};
    return l.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: re,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function ud(t) {
    var l = ad(t);
    l.next === null && (l = t.alternate.memoizedState), ou(
      t,
      l.next.queue,
      {},
      zl()
    );
  }
  function sf() {
    return tl(Au);
  }
  function id() {
    return Gt().memoizedState;
  }
  function cd() {
    return Gt().memoizedState;
  }
  function kg(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = zl();
          t = Ne(e);
          var n = Ue(l, t, e);
          n !== null && (ml(n, l, e), nu(n, l, e)), l = { cache: Yo() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function Jg(t, l, e) {
    var n = zl();
    e = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ui(t) ? fd(l, e) : (e = _o(t, l, e, n), e !== null && (ml(e, t, n), sd(e, l, n)));
  }
  function od(t, l, e) {
    var n = zl();
    ou(t, l, e, n);
  }
  function ou(t, l, e, n) {
    var i = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ui(t)) fd(l, i);
    else {
      var o = t.alternate;
      if (t.lanes === 0 && (o === null || o.lanes === 0) && (o = l.lastRenderedReducer, o !== null))
        try {
          var s = l.lastRenderedState, h = o(s, e);
          if (i.hasEagerState = !0, i.eagerState = h, bl(h, s))
            return yi(t, l, i, 0), jt === null && hi(), !1;
        } catch {
        } finally {
        }
      if (e = _o(t, l, i, n), e !== null)
        return ml(e, t, n), sd(e, l, n), !0;
    }
    return !1;
  }
  function rf(t, l, e, n) {
    if (n = {
      lane: 2,
      revertLane: Qf(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ui(t)) {
      if (l) throw Error(f(479));
    } else
      l = _o(
        t,
        e,
        n,
        2
      ), l !== null && ml(l, t, 2);
  }
  function Ui(t) {
    var l = t.alternate;
    return t === st || l !== null && l === st;
  }
  function fd(t, l) {
    sa = _i = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function sd(t, l, e) {
    if ((e & 4194048) !== 0) {
      var n = l.lanes;
      n &= t.pendingLanes, e |= n, l.lanes = e, mr(t, e);
    }
  }
  var fu = {
    readContext: tl,
    use: Di,
    useCallback: Bt,
    useContext: Bt,
    useEffect: Bt,
    useImperativeHandle: Bt,
    useLayoutEffect: Bt,
    useInsertionEffect: Bt,
    useMemo: Bt,
    useReducer: Bt,
    useRef: Bt,
    useState: Bt,
    useDebugValue: Bt,
    useDeferredValue: Bt,
    useTransition: Bt,
    useSyncExternalStore: Bt,
    useId: Bt,
    useHostTransitionStatus: Bt,
    useFormState: Bt,
    useActionState: Bt,
    useOptimistic: Bt,
    useMemoCache: Bt,
    useCacheRefresh: Bt
  };
  fu.useEffectEvent = Bt;
  var rd = {
    readContext: tl,
    use: Di,
    useCallback: function(t, l) {
      return ol().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: tl,
    useEffect: k0,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, ji(
        4194308,
        4,
        I0.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return ji(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      ji(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = ol();
      l = l === void 0 ? null : l;
      var n = t();
      if (xn) {
        Ae(!0);
        try {
          t();
        } finally {
          Ae(!1);
        }
      }
      return e.memoizedState = [n, l], n;
    },
    useReducer: function(t, l, e) {
      var n = ol();
      if (e !== void 0) {
        var i = e(l);
        if (xn) {
          Ae(!0);
          try {
            e(l);
          } finally {
            Ae(!1);
          }
        }
      } else i = l;
      return n.memoizedState = n.baseState = i, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: i
      }, n.queue = t, t = t.dispatch = Jg.bind(
        null,
        st,
        t
      ), [n.memoizedState, t];
    },
    useRef: function(t) {
      var l = ol();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = nf(t);
      var l = t.queue, e = od.bind(null, st, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: cf,
    useDeferredValue: function(t, l) {
      var e = ol();
      return of(e, t, l);
    },
    useTransition: function() {
      var t = nf(!1);
      return t = nd.bind(
        null,
        st,
        t.queue,
        !0,
        !1
      ), ol().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var n = st, i = ol();
      if (vt) {
        if (e === void 0)
          throw Error(f(407));
        e = e();
      } else {
        if (e = l(), jt === null)
          throw Error(f(349));
        (mt & 127) !== 0 || j0(n, l, e);
      }
      i.memoizedState = e;
      var o = { value: e, getSnapshot: l };
      return i.queue = o, k0(U0.bind(null, n, o, t), [
        t
      ]), n.flags |= 2048, da(
        9,
        { destroy: void 0 },
        N0.bind(
          null,
          n,
          o,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = ol(), l = jt.identifierPrefix;
      if (vt) {
        var e = Wl, n = Jl;
        e = (n & ~(1 << 32 - Sl(n) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = Oi++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = Xg++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: sf,
    useFormState: Q0,
    useActionState: Q0,
    useOptimistic: function(t) {
      var l = ol();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = rf.bind(
        null,
        st,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: tf,
    useCacheRefresh: function() {
      return ol().memoizedState = kg.bind(
        null,
        st
      );
    },
    useEffectEvent: function(t) {
      var l = ol(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((At & 2) !== 0)
          throw Error(f(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, df = {
    readContext: tl,
    use: Di,
    useCallback: td,
    useContext: tl,
    useEffect: uf,
    useImperativeHandle: P0,
    useInsertionEffect: W0,
    useLayoutEffect: F0,
    useMemo: ld,
    useReducer: Ri,
    useRef: $0,
    useState: function() {
      return Ri(re);
    },
    useDebugValue: cf,
    useDeferredValue: function(t, l) {
      var e = Gt();
      return ed(
        e,
        Ct.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Ri(re)[0], l = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : cu(t),
        l
      ];
    },
    useSyncExternalStore: R0,
    useId: id,
    useHostTransitionStatus: sf,
    useFormState: Z0,
    useActionState: Z0,
    useOptimistic: function(t, l) {
      var e = Gt();
      return L0(e, Ct, t, l);
    },
    useMemoCache: tf,
    useCacheRefresh: cd
  };
  df.useEffectEvent = J0;
  var dd = {
    readContext: tl,
    use: Di,
    useCallback: td,
    useContext: tl,
    useEffect: uf,
    useImperativeHandle: P0,
    useInsertionEffect: W0,
    useLayoutEffect: F0,
    useMemo: ld,
    useReducer: ef,
    useRef: $0,
    useState: function() {
      return ef(re);
    },
    useDebugValue: cf,
    useDeferredValue: function(t, l) {
      var e = Gt();
      return Ct === null ? of(e, t, l) : ed(
        e,
        Ct.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = ef(re)[0], l = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : cu(t),
        l
      ];
    },
    useSyncExternalStore: R0,
    useId: id,
    useHostTransitionStatus: sf,
    useFormState: K0,
    useActionState: K0,
    useOptimistic: function(t, l) {
      var e = Gt();
      return Ct !== null ? L0(e, Ct, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: tf,
    useCacheRefresh: cd
  };
  dd.useEffectEvent = J0;
  function hf(t, l, e, n) {
    l = t.memoizedState, e = e(n, l), e = e == null ? l : b({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var yf = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var n = zl(), i = Ne(n);
      i.payload = l, e != null && (i.callback = e), l = Ue(t, i, n), l !== null && (ml(l, t, n), nu(l, t, n));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var n = zl(), i = Ne(n);
      i.tag = 1, i.payload = l, e != null && (i.callback = e), l = Ue(t, i, n), l !== null && (ml(l, t, n), nu(l, t, n));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = zl(), n = Ne(e);
      n.tag = 2, l != null && (n.callback = l), l = Ue(t, n, e), l !== null && (ml(l, t, e), nu(l, t, e));
    }
  };
  function hd(t, l, e, n, i, o, s) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, o, s) : l.prototype && l.prototype.isPureReactComponent ? !Ja(e, n) || !Ja(i, o) : !0;
  }
  function yd(t, l, e, n) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, n), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, n), l.state !== t && yf.enqueueReplaceState(l, l.state, null);
  }
  function Tn(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var n in l)
        n !== "ref" && (e[n] = l[n]);
    }
    if (t = t.defaultProps) {
      e === l && (e = b({}, e));
      for (var i in t)
        e[i] === void 0 && (e[i] = t[i]);
    }
    return e;
  }
  function md(t) {
    di(t);
  }
  function gd(t) {
    console.error(t);
  }
  function pd(t) {
    di(t);
  }
  function Hi(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function vd(t, l, e) {
    try {
      var n = t.onCaughtError;
      n(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function mf(t, l, e) {
    return e = Ne(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Hi(t, l);
    }, e;
  }
  function Sd(t) {
    return t = Ne(t), t.tag = 3, t;
  }
  function bd(t, l, e, n) {
    var i = e.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var o = n.value;
      t.payload = function() {
        return i(o);
      }, t.callback = function() {
        vd(l, e, n);
      };
    }
    var s = e.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (t.callback = function() {
      vd(l, e, n), typeof i != "function" && (Ge === null ? Ge = /* @__PURE__ */ new Set([this]) : Ge.add(this));
      var h = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: h !== null ? h : ""
      });
    });
  }
  function Wg(t, l, e, n, i) {
    if (e.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (l = e.alternate, l !== null && aa(
        l,
        e,
        i,
        !0
      ), e = El.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Bl === null ? $i() : e.alternate === null && Lt === 0 && (Lt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = i, n === Ei ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([n]) : l.add(n), Gf(t, n, i)), !1;
          case 22:
            return e.flags |= 65536, n === Ei ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([n]) : e.add(n)), Gf(t, n, i)), !1;
        }
        throw Error(f(435, e.tag));
      }
      return Gf(t, n, i), $i(), !1;
    }
    if (vt)
      return l = El.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = i, n !== No && (t = Error(f(422), { cause: n }), Ia(jl(t, e)))) : (n !== No && (l = Error(f(423), {
        cause: n
      }), Ia(
        jl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, i &= -i, t.lanes |= i, n = jl(n, e), i = mf(
        t.stateNode,
        n,
        i
      ), Zo(t, i), Lt !== 4 && (Lt = 2)), !1;
    var o = Error(f(520), { cause: n });
    if (o = jl(o, e), pu === null ? pu = [o] : pu.push(o), Lt !== 4 && (Lt = 2), l === null) return !0;
    n = jl(n, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = i & -i, e.lanes |= t, t = mf(e.stateNode, n, t), Zo(e, t), !1;
        case 1:
          if (l = e.type, o = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (Ge === null || !Ge.has(o))))
            return e.flags |= 65536, i &= -i, e.lanes |= i, i = Sd(i), bd(
              i,
              t,
              e,
              n
            ), Zo(e, i), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var gf = Error(f(461)), Zt = !1;
  function ll(t, l, e, n) {
    l.child = t === null ? T0(l, null, e, n) : En(
      l,
      t.child,
      e,
      n
    );
  }
  function Md(t, l, e, n, i) {
    e = e.render;
    var o = l.ref;
    if ("ref" in n) {
      var s = {};
      for (var h in n)
        h !== "ref" && (s[h] = n[h]);
    } else s = n;
    return vn(l), n = Wo(
      t,
      l,
      e,
      s,
      o,
      i
    ), h = Fo(), t !== null && !Zt ? (Io(t, l, i), de(t, l, i)) : (vt && h && Ro(l), l.flags |= 1, ll(t, l, n, i), l.child);
  }
  function Ed(t, l, e, n, i) {
    if (t === null) {
      var o = e.type;
      return typeof o == "function" && !Oo(o) && o.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = o, xd(
        t,
        l,
        o,
        n,
        i
      )) : (t = gi(
        e.type,
        null,
        n,
        l,
        l.mode,
        i
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (o = t.child, !Tf(t, i)) {
      var s = o.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Ja, e(s, n) && t.ref === l.ref)
        return de(t, l, i);
    }
    return l.flags |= 1, t = ie(o, n), t.ref = l.ref, t.return = l, l.child = t;
  }
  function xd(t, l, e, n, i) {
    if (t !== null) {
      var o = t.memoizedProps;
      if (Ja(o, n) && t.ref === l.ref)
        if (Zt = !1, l.pendingProps = n = o, Tf(t, i))
          (t.flags & 131072) !== 0 && (Zt = !0);
        else
          return l.lanes = t.lanes, de(t, l, i);
    }
    return pf(
      t,
      l,
      e,
      n,
      i
    );
  }
  function Td(t, l, e, n) {
    var i = n.children, o = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (o = o !== null ? o.baseLanes | e : e, t !== null) {
          for (n = l.child = t.child, i = 0; n !== null; )
            i = i | n.lanes | n.childLanes, n = n.sibling;
          n = i & ~o;
        } else n = 0, l.child = null;
        return Ad(
          t,
          l,
          o,
          e,
          n
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && bi(
          l,
          o !== null ? o.cachePool : null
        ), o !== null ? _0(l, o) : Ko(), O0(l);
      else
        return n = l.lanes = 536870912, Ad(
          t,
          l,
          o !== null ? o.baseLanes | e : e,
          e,
          n
        );
    } else
      o !== null ? (bi(l, o.cachePool), _0(l, o), Be(), l.memoizedState = null) : (t !== null && bi(l, null), Ko(), Be());
    return ll(t, l, i, e), l.child;
  }
  function su(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function Ad(t, l, e, n, i) {
    var o = Go();
    return o = o === null ? null : { parent: Xt._currentValue, pool: o }, l.memoizedState = {
      baseLanes: e,
      cachePool: o
    }, t !== null && bi(l, null), Ko(), O0(l), t !== null && aa(t, l, n, !0), l.childLanes = i, null;
  }
  function Bi(t, l) {
    return l = Yi(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function zd(t, l, e) {
    return En(l, t.child, null, e), t = Bi(l, l.pendingProps), t.flags |= 2, xl(l), l.memoizedState = null, t;
  }
  function Fg(t, l, e) {
    var n = l.pendingProps, i = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (vt) {
        if (n.mode === "hidden")
          return t = Bi(l, n), l.lanes = 536870912, su(null, t);
        if (ko(l), (t = Nt) ? (t = Y1(
          t,
          Hl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Oe !== null ? { id: Jl, overflow: Wl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = f0(t), e.return = l, l.child = e, Pt = l, Nt = null)) : t = null, t === null) throw De(l);
        return l.lanes = 536870912, null;
      }
      return Bi(l, n);
    }
    var o = t.memoizedState;
    if (o !== null) {
      var s = o.dehydrated;
      if (ko(l), i)
        if (l.flags & 256)
          l.flags &= -257, l = zd(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(f(558));
      else if (Zt || aa(t, l, e, !1), i = (e & t.childLanes) !== 0, Zt || i) {
        if (n = jt, n !== null && (s = gr(n, e), s !== 0 && s !== o.retryLane))
          throw o.retryLane = s, yn(t, s), ml(n, t, s), gf;
        $i(), l = zd(
          t,
          l,
          e
        );
      } else
        t = o.treeContext, Nt = Ll(s.nextSibling), Pt = l, vt = !0, Ce = null, Hl = !1, t !== null && d0(l, t), l = Bi(l, n), l.flags |= 4096;
      return l;
    }
    return t = ie(t.child, {
      mode: n.mode,
      children: n.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Li(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(f(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function pf(t, l, e, n, i) {
    return vn(l), e = Wo(
      t,
      l,
      e,
      n,
      void 0,
      i
    ), n = Fo(), t !== null && !Zt ? (Io(t, l, i), de(t, l, i)) : (vt && n && Ro(l), l.flags |= 1, ll(t, l, e, i), l.child);
  }
  function _d(t, l, e, n, i, o) {
    return vn(l), l.updateQueue = null, e = D0(
      l,
      n,
      e,
      i
    ), C0(t), n = Fo(), t !== null && !Zt ? (Io(t, l, o), de(t, l, o)) : (vt && n && Ro(l), l.flags |= 1, ll(t, l, e, o), l.child);
  }
  function Od(t, l, e, n, i) {
    if (vn(l), l.stateNode === null) {
      var o = ta, s = e.contextType;
      typeof s == "object" && s !== null && (o = tl(s)), o = new e(n, o), l.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, o.updater = yf, l.stateNode = o, o._reactInternals = l, o = l.stateNode, o.props = n, o.state = l.memoizedState, o.refs = {}, Xo(l), s = e.contextType, o.context = typeof s == "object" && s !== null ? tl(s) : ta, o.state = l.memoizedState, s = e.getDerivedStateFromProps, typeof s == "function" && (hf(
        l,
        e,
        s,
        n
      ), o.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (s = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), s !== o.state && yf.enqueueReplaceState(o, o.state, null), uu(l, n, o, i), au(), o.state = l.memoizedState), typeof o.componentDidMount == "function" && (l.flags |= 4194308), n = !0;
    } else if (t === null) {
      o = l.stateNode;
      var h = l.memoizedProps, S = Tn(e, h);
      o.props = S;
      var O = o.context, H = e.contextType;
      s = ta, typeof H == "object" && H !== null && (s = tl(H));
      var L = e.getDerivedStateFromProps;
      H = typeof L == "function" || typeof o.getSnapshotBeforeUpdate == "function", h = l.pendingProps !== h, H || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (h || O !== s) && yd(
        l,
        o,
        n,
        s
      ), je = !1;
      var C = l.memoizedState;
      o.state = C, uu(l, n, o, i), au(), O = l.memoizedState, h || C !== O || je ? (typeof L == "function" && (hf(
        l,
        e,
        L,
        n
      ), O = l.memoizedState), (S = je || hd(
        l,
        e,
        S,
        n,
        C,
        O,
        s
      )) ? (H || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = n, l.memoizedState = O), o.props = n, o.state = O, o.context = s, n = S) : (typeof o.componentDidMount == "function" && (l.flags |= 4194308), n = !1);
    } else {
      o = l.stateNode, Qo(t, l), s = l.memoizedProps, H = Tn(e, s), o.props = H, L = l.pendingProps, C = o.context, O = e.contextType, S = ta, typeof O == "object" && O !== null && (S = tl(O)), h = e.getDerivedStateFromProps, (O = typeof h == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== L || C !== S) && yd(
        l,
        o,
        n,
        S
      ), je = !1, C = l.memoizedState, o.state = C, uu(l, n, o, i), au();
      var D = l.memoizedState;
      s !== L || C !== D || je || t !== null && t.dependencies !== null && vi(t.dependencies) ? (typeof h == "function" && (hf(
        l,
        e,
        h,
        n
      ), D = l.memoizedState), (H = je || hd(
        l,
        e,
        H,
        n,
        C,
        D,
        S
      ) || t !== null && t.dependencies !== null && vi(t.dependencies)) ? (O || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(n, D, S), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(
        n,
        D,
        S
      )), typeof o.componentDidUpdate == "function" && (l.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === t.memoizedProps && C === t.memoizedState || (l.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && C === t.memoizedState || (l.flags |= 1024), l.memoizedProps = n, l.memoizedState = D), o.props = n, o.state = D, o.context = S, n = H) : (typeof o.componentDidUpdate != "function" || s === t.memoizedProps && C === t.memoizedState || (l.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && C === t.memoizedState || (l.flags |= 1024), n = !1);
    }
    return o = n, Li(t, l), n = (l.flags & 128) !== 0, o || n ? (o = l.stateNode, e = n && typeof e.getDerivedStateFromError != "function" ? null : o.render(), l.flags |= 1, t !== null && n ? (l.child = En(
      l,
      t.child,
      null,
      i
    ), l.child = En(
      l,
      null,
      e,
      i
    )) : ll(t, l, e, i), l.memoizedState = o.state, t = l.child) : t = de(
      t,
      l,
      i
    ), t;
  }
  function Cd(t, l, e, n) {
    return gn(), l.flags |= 256, ll(t, l, e, n), l.child;
  }
  var vf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Sf(t) {
    return { baseLanes: t, cachePool: v0() };
  }
  function bf(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Al), t;
  }
  function Dd(t, l, e) {
    var n = l.pendingProps, i = !1, o = (l.flags & 128) !== 0, s;
    if ((s = o) || (s = t !== null && t.memoizedState === null ? !1 : (wt.current & 2) !== 0), s && (i = !0, l.flags &= -129), s = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (vt) {
        if (i ? He(l) : Be(), (t = Nt) ? (t = Y1(
          t,
          Hl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Oe !== null ? { id: Jl, overflow: Wl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = f0(t), e.return = l, l.child = e, Pt = l, Nt = null)) : t = null, t === null) throw De(l);
        return es(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var h = n.children;
      return n = n.fallback, i ? (Be(), i = l.mode, h = Yi(
        { mode: "hidden", children: h },
        i
      ), n = mn(
        n,
        i,
        e,
        null
      ), h.return = l, n.return = l, h.sibling = n, l.child = h, n = l.child, n.memoizedState = Sf(e), n.childLanes = bf(
        t,
        s,
        e
      ), l.memoizedState = vf, su(null, n)) : (He(l), Mf(l, h));
    }
    var S = t.memoizedState;
    if (S !== null && (h = S.dehydrated, h !== null)) {
      if (o)
        l.flags & 256 ? (He(l), l.flags &= -257, l = Ef(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (Be(), l.child = t.child, l.flags |= 128, l = null) : (Be(), h = n.fallback, i = l.mode, n = Yi(
          { mode: "visible", children: n.children },
          i
        ), h = mn(
          h,
          i,
          e,
          null
        ), h.flags |= 2, n.return = l, h.return = l, n.sibling = h, l.child = n, En(
          l,
          t.child,
          null,
          e
        ), n = l.child, n.memoizedState = Sf(e), n.childLanes = bf(
          t,
          s,
          e
        ), l.memoizedState = vf, l = su(null, n));
      else if (He(l), es(h)) {
        if (s = h.nextSibling && h.nextSibling.dataset, s) var O = s.dgst;
        s = O, n = Error(f(419)), n.stack = "", n.digest = s, Ia({ value: n, source: null, stack: null }), l = Ef(
          t,
          l,
          e
        );
      } else if (Zt || aa(t, l, e, !1), s = (e & t.childLanes) !== 0, Zt || s) {
        if (s = jt, s !== null && (n = gr(s, e), n !== 0 && n !== S.retryLane))
          throw S.retryLane = n, yn(t, n), ml(s, t, n), gf;
        ls(h) || $i(), l = Ef(
          t,
          l,
          e
        );
      } else
        ls(h) ? (l.flags |= 192, l.child = t.child, l = null) : (t = S.treeContext, Nt = Ll(
          h.nextSibling
        ), Pt = l, vt = !0, Ce = null, Hl = !1, t !== null && d0(l, t), l = Mf(
          l,
          n.children
        ), l.flags |= 4096);
      return l;
    }
    return i ? (Be(), h = n.fallback, i = l.mode, S = t.child, O = S.sibling, n = ie(S, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = S.subtreeFlags & 65011712, O !== null ? h = ie(
      O,
      h
    ) : (h = mn(
      h,
      i,
      e,
      null
    ), h.flags |= 2), h.return = l, n.return = l, n.sibling = h, l.child = n, su(null, n), n = l.child, h = t.child.memoizedState, h === null ? h = Sf(e) : (i = h.cachePool, i !== null ? (S = Xt._currentValue, i = i.parent !== S ? { parent: S, pool: S } : i) : i = v0(), h = {
      baseLanes: h.baseLanes | e,
      cachePool: i
    }), n.memoizedState = h, n.childLanes = bf(
      t,
      s,
      e
    ), l.memoizedState = vf, su(t.child, n)) : (He(l), e = t.child, t = e.sibling, e = ie(e, {
      mode: "visible",
      children: n.children
    }), e.return = l, e.sibling = null, t !== null && (s = l.deletions, s === null ? (l.deletions = [t], l.flags |= 16) : s.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function Mf(t, l) {
    return l = Yi(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function Yi(t, l) {
    return t = Ml(22, t, null, l), t.lanes = 0, t;
  }
  function Ef(t, l, e) {
    return En(l, t.child, null, e), t = Mf(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Rd(t, l, e) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l), Bo(t.return, l, e);
  }
  function xf(t, l, e, n, i, o) {
    var s = t.memoizedState;
    s === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: e,
      tailMode: i,
      treeForkCount: o
    } : (s.isBackwards = l, s.rendering = null, s.renderingStartTime = 0, s.last = n, s.tail = e, s.tailMode = i, s.treeForkCount = o);
  }
  function jd(t, l, e) {
    var n = l.pendingProps, i = n.revealOrder, o = n.tail;
    n = n.children;
    var s = wt.current, h = (s & 2) !== 0;
    if (h ? (s = s & 1 | 2, l.flags |= 128) : s &= 1, J(wt, s), ll(t, l, n, e), n = vt ? Fa : 0, !h && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Rd(t, e, l);
        else if (t.tag === 19)
          Rd(t, e, l);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (i) {
      case "forwards":
        for (e = l.child, i = null; e !== null; )
          t = e.alternate, t !== null && zi(t) === null && (i = e), e = e.sibling;
        e = i, e === null ? (i = l.child, l.child = null) : (i = e.sibling, e.sibling = null), xf(
          l,
          !1,
          i,
          e,
          o,
          n
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, i = l.child, l.child = null; i !== null; ) {
          if (t = i.alternate, t !== null && zi(t) === null) {
            l.child = i;
            break;
          }
          t = i.sibling, i.sibling = e, e = i, i = t;
        }
        xf(
          l,
          !0,
          e,
          null,
          o,
          n
        );
        break;
      case "together":
        xf(
          l,
          !1,
          null,
          null,
          void 0,
          n
        );
        break;
      default:
        l.memoizedState = null;
    }
    return l.child;
  }
  function de(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), we |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (aa(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(f(153));
    if (l.child !== null) {
      for (t = l.child, e = ie(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = ie(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function Tf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && vi(t)));
  }
  function Ig(t, l, e) {
    switch (l.tag) {
      case 3:
        cl(l, l.stateNode.containerInfo), Re(l, Xt, t.memoizedState.cache), gn();
        break;
      case 27:
      case 5:
        Ba(l);
        break;
      case 4:
        cl(l, l.stateNode.containerInfo);
        break;
      case 10:
        Re(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, ko(l), null;
        break;
      case 13:
        var n = l.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (He(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? Dd(t, l, e) : (He(l), t = de(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        He(l);
        break;
      case 19:
        var i = (t.flags & 128) !== 0;
        if (n = (e & l.childLanes) !== 0, n || (aa(
          t,
          l,
          e,
          !1
        ), n = (e & l.childLanes) !== 0), i) {
          if (n)
            return jd(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (i = l.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), J(wt, wt.current), n) break;
        return null;
      case 22:
        return l.lanes = 0, Td(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        Re(l, Xt, t.memoizedState.cache);
    }
    return de(t, l, e);
  }
  function Nd(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Zt = !0;
      else {
        if (!Tf(t, e) && (l.flags & 128) === 0)
          return Zt = !1, Ig(
            t,
            l,
            e
          );
        Zt = (t.flags & 131072) !== 0;
      }
    else
      Zt = !1, vt && (l.flags & 1048576) !== 0 && r0(l, Fa, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var n = l.pendingProps;
          if (t = bn(l.elementType), l.type = t, typeof t == "function")
            Oo(t) ? (n = Tn(t, n), l.tag = 1, l = Od(
              null,
              l,
              t,
              n,
              e
            )) : (l.tag = 0, l = pf(
              null,
              l,
              t,
              n,
              e
            ));
          else {
            if (t != null) {
              var i = t.$$typeof;
              if (i === j) {
                l.tag = 11, l = Md(
                  null,
                  l,
                  t,
                  n,
                  e
                );
                break t;
              } else if (i === G) {
                l.tag = 14, l = Ed(
                  null,
                  l,
                  t,
                  n,
                  e
                );
                break t;
              }
            }
            throw l = bt(t) || t, Error(f(306, l, ""));
          }
        }
        return l;
      case 0:
        return pf(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return n = l.type, i = Tn(
          n,
          l.pendingProps
        ), Od(
          t,
          l,
          n,
          i,
          e
        );
      case 3:
        t: {
          if (cl(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(f(387));
          n = l.pendingProps;
          var o = l.memoizedState;
          i = o.element, Qo(t, l), uu(l, n, null, e);
          var s = l.memoizedState;
          if (n = s.cache, Re(l, Xt, n), n !== o.cache && Lo(
            l,
            [Xt],
            e,
            !0
          ), au(), n = s.element, o.isDehydrated)
            if (o = {
              element: n,
              isDehydrated: !1,
              cache: s.cache
            }, l.updateQueue.baseState = o, l.memoizedState = o, l.flags & 256) {
              l = Cd(
                t,
                l,
                n,
                e
              );
              break t;
            } else if (n !== i) {
              i = jl(
                Error(f(424)),
                l
              ), Ia(i), l = Cd(
                t,
                l,
                n,
                e
              );
              break t;
            } else {
              switch (t = l.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Nt = Ll(t.firstChild), Pt = l, vt = !0, Ce = null, Hl = !0, e = T0(
                l,
                null,
                n,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (gn(), n === i) {
              l = de(
                t,
                l,
                e
              );
              break t;
            }
            ll(t, l, n, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return Li(t, l), t === null ? (e = Z1(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : vt || (e = l.type, t = l.pendingProps, n = tc(
          dt.current
        ).createElement(e), n[It] = l, n[fl] = t, el(n, e, t), Jt(n), l.stateNode = n) : l.memoizedState = Z1(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ba(l), t === null && vt && (n = l.stateNode = q1(
          l.type,
          l.pendingProps,
          dt.current
        ), Pt = l, Hl = !0, i = Nt, Ze(l.type) ? (ns = i, Nt = Ll(n.firstChild)) : Nt = i), ll(
          t,
          l,
          l.pendingProps.children,
          e
        ), Li(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && vt && ((i = n = Nt) && (n = Op(
          n,
          l.type,
          l.pendingProps,
          Hl
        ), n !== null ? (l.stateNode = n, Pt = l, Nt = Ll(n.firstChild), Hl = !1, i = !0) : i = !1), i || De(l)), Ba(l), i = l.type, o = l.pendingProps, s = t !== null ? t.memoizedProps : null, n = o.children, If(i, o) ? n = null : s !== null && If(i, s) && (l.flags |= 32), l.memoizedState !== null && (i = Wo(
          t,
          l,
          Qg,
          null,
          null,
          e
        ), Au._currentValue = i), Li(t, l), ll(t, l, n, e), l.child;
      case 6:
        return t === null && vt && ((t = e = Nt) && (e = Cp(
          e,
          l.pendingProps,
          Hl
        ), e !== null ? (l.stateNode = e, Pt = l, Nt = null, t = !0) : t = !1), t || De(l)), null;
      case 13:
        return Dd(t, l, e);
      case 4:
        return cl(
          l,
          l.stateNode.containerInfo
        ), n = l.pendingProps, t === null ? l.child = En(
          l,
          null,
          n,
          e
        ) : ll(t, l, n, e), l.child;
      case 11:
        return Md(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return ll(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return ll(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return ll(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return n = l.pendingProps, Re(l, l.type, n.value), ll(t, l, n.children, e), l.child;
      case 9:
        return i = l.type._context, n = l.pendingProps.children, vn(l), i = tl(i), n = n(i), l.flags |= 1, ll(t, l, n, e), l.child;
      case 14:
        return Ed(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return xd(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return jd(t, l, e);
      case 31:
        return Fg(t, l, e);
      case 22:
        return Td(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return vn(l), n = tl(Xt), t === null ? (i = Go(), i === null && (i = jt, o = Yo(), i.pooledCache = o, o.refCount++, o !== null && (i.pooledCacheLanes |= e), i = o), l.memoizedState = { parent: n, cache: i }, Xo(l), Re(l, Xt, i)) : ((t.lanes & e) !== 0 && (Qo(t, l), uu(l, null, null, e), au()), i = t.memoizedState, o = l.memoizedState, i.parent !== n ? (i = { parent: n, cache: n }, l.memoizedState = i, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = i), Re(l, Xt, n)) : (n = o.cache, Re(l, Xt, n), n !== i.cache && Lo(
          l,
          [Xt],
          e,
          !0
        ))), ll(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(f(156, l.tag));
  }
  function he(t) {
    t.flags |= 4;
  }
  function Af(t, l, e, n, i) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (i & 335544128) === i)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (i1()) t.flags |= 8192;
        else
          throw Mn = Ei, qo;
    } else t.flags &= -16777217;
  }
  function Ud(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !J1(l))
      if (i1()) t.flags |= 8192;
      else
        throw Mn = Ei, qo;
  }
  function wi(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? hr() : 536870912, t.lanes |= l, ga |= l);
  }
  function ru(t, l) {
    if (!vt)
      switch (t.tailMode) {
        case "hidden":
          l = t.tail;
          for (var e = null; l !== null; )
            l.alternate !== null && (e = l), l = l.sibling;
          e === null ? t.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = t.tail;
          for (var n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : n.sibling = null;
      }
  }
  function Ut(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, n = 0;
    if (l)
      for (var i = t.child; i !== null; )
        e |= i.lanes | i.childLanes, n |= i.subtreeFlags & 65011712, n |= i.flags & 65011712, i.return = t, i = i.sibling;
    else
      for (i = t.child; i !== null; )
        e |= i.lanes | i.childLanes, n |= i.subtreeFlags, n |= i.flags, i.return = t, i = i.sibling;
    return t.subtreeFlags |= n, t.childLanes = e, l;
  }
  function Pg(t, l, e) {
    var n = l.pendingProps;
    switch (jo(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ut(l), null;
      case 1:
        return Ut(l), null;
      case 3:
        return e = l.stateNode, n = null, t !== null && (n = t.memoizedState.cache), l.memoizedState.cache !== n && (l.flags |= 2048), fe(Xt), Yt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (na(l) ? he(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Uo())), Ut(l), null;
      case 26:
        var i = l.type, o = l.memoizedState;
        return t === null ? (he(l), o !== null ? (Ut(l), Ud(l, o)) : (Ut(l), Af(
          l,
          i,
          null,
          n,
          e
        ))) : o ? o !== t.memoizedState ? (he(l), Ut(l), Ud(l, o)) : (Ut(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== n && he(l), Ut(l), Af(
          l,
          i,
          t,
          n,
          e
        )), null;
      case 27:
        if (Wu(l), e = dt.current, i = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== n && he(l);
        else {
          if (!n) {
            if (l.stateNode === null)
              throw Error(f(166));
            return Ut(l), null;
          }
          t = tt.current, na(l) ? h0(l) : (t = q1(i, n, e), l.stateNode = t, he(l));
        }
        return Ut(l), null;
      case 5:
        if (Wu(l), i = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== n && he(l);
        else {
          if (!n) {
            if (l.stateNode === null)
              throw Error(f(166));
            return Ut(l), null;
          }
          if (o = tt.current, na(l))
            h0(l);
          else {
            var s = tc(
              dt.current
            );
            switch (o) {
              case 1:
                o = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  i
                );
                break;
              case 2:
                o = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  i
                );
                break;
              default:
                switch (i) {
                  case "svg":
                    o = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      i
                    );
                    break;
                  case "math":
                    o = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      i
                    );
                    break;
                  case "script":
                    o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(
                      o.firstChild
                    );
                    break;
                  case "select":
                    o = typeof n.is == "string" ? s.createElement("select", {
                      is: n.is
                    }) : s.createElement("select"), n.multiple ? o.multiple = !0 : n.size && (o.size = n.size);
                    break;
                  default:
                    o = typeof n.is == "string" ? s.createElement(i, { is: n.is }) : s.createElement(i);
                }
            }
            o[It] = l, o[fl] = n;
            t: for (s = l.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                o.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === l) break t;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === l)
                  break t;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            l.stateNode = o;
            t: switch (el(o, i, n), i) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break t;
              case "img":
                n = !0;
                break t;
              default:
                n = !1;
            }
            n && he(l);
          }
        }
        return Ut(l), Af(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== n && he(l);
        else {
          if (typeof n != "string" && l.stateNode === null)
            throw Error(f(166));
          if (t = dt.current, na(l)) {
            if (t = l.stateNode, e = l.memoizedProps, n = null, i = Pt, i !== null)
              switch (i.tag) {
                case 27:
                case 5:
                  n = i.memoizedProps;
              }
            t[It] = l, t = !!(t.nodeValue === e || n !== null && n.suppressHydrationWarning === !0 || D1(t.nodeValue, e)), t || De(l, !0);
          } else
            t = tc(t).createTextNode(
              n
            ), t[It] = l, l.stateNode = t;
        }
        return Ut(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (n = na(l), e !== null) {
            if (t === null) {
              if (!n) throw Error(f(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(557));
              t[It] = l;
            } else
              gn(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ut(l), t = !1;
          } else
            e = Uo(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (xl(l), l) : (xl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(f(558));
        }
        return Ut(l), null;
      case 13:
        if (n = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (i = na(l), n !== null && n.dehydrated !== null) {
            if (t === null) {
              if (!i) throw Error(f(318));
              if (i = l.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(f(317));
              i[It] = l;
            } else
              gn(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ut(l), i = !1;
          } else
            i = Uo(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), i = !0;
          if (!i)
            return l.flags & 256 ? (xl(l), l) : (xl(l), null);
        }
        return xl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = n !== null, t = t !== null && t.memoizedState !== null, e && (n = l.child, i = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (i = n.alternate.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), wi(l, l.updateQueue), Ut(l), null);
      case 4:
        return Yt(), t === null && $f(l.stateNode.containerInfo), Ut(l), null;
      case 10:
        return fe(l.type), Ut(l), null;
      case 19:
        if (Y(wt), n = l.memoizedState, n === null) return Ut(l), null;
        if (i = (l.flags & 128) !== 0, o = n.rendering, o === null)
          if (i) ru(n, !1);
          else {
            if (Lt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (o = zi(t), o !== null) {
                  for (l.flags |= 128, ru(n, !1), t = o.updateQueue, l.updateQueue = t, wi(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    o0(e, t), e = e.sibling;
                  return J(
                    wt,
                    wt.current & 1 | 2
                  ), vt && ce(l, n.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            n.tail !== null && pl() > Zi && (l.flags |= 128, i = !0, ru(n, !1), l.lanes = 4194304);
          }
        else {
          if (!i)
            if (t = zi(o), t !== null) {
              if (l.flags |= 128, i = !0, t = t.updateQueue, l.updateQueue = t, wi(l, t), ru(n, !0), n.tail === null && n.tailMode === "hidden" && !o.alternate && !vt)
                return Ut(l), null;
            } else
              2 * pl() - n.renderingStartTime > Zi && e !== 536870912 && (l.flags |= 128, i = !0, ru(n, !1), l.lanes = 4194304);
          n.isBackwards ? (o.sibling = l.child, l.child = o) : (t = n.last, t !== null ? t.sibling = o : l.child = o, n.last = o);
        }
        return n.tail !== null ? (t = n.tail, n.rendering = t, n.tail = t.sibling, n.renderingStartTime = pl(), t.sibling = null, e = wt.current, J(
          wt,
          i ? e & 1 | 2 : e & 1
        ), vt && ce(l, n.treeForkCount), t) : (Ut(l), null);
      case 22:
      case 23:
        return xl(l), $o(), n = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (l.flags |= 8192) : n && (l.flags |= 8192), n ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Ut(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Ut(l), e = l.updateQueue, e !== null && wi(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), n = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (n = l.memoizedState.cachePool.pool), n !== e && (l.flags |= 2048), t !== null && Y(Sn), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), fe(Xt), Ut(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(f(156, l.tag));
  }
  function tp(t, l) {
    switch (jo(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return fe(Xt), Yt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return Wu(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (xl(l), l.alternate === null)
            throw Error(f(340));
          gn();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (xl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(f(340));
          gn();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return Y(wt), null;
      case 4:
        return Yt(), null;
      case 10:
        return fe(l.type), null;
      case 22:
      case 23:
        return xl(l), $o(), t !== null && Y(Sn), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return fe(Xt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Hd(t, l) {
    switch (jo(l), l.tag) {
      case 3:
        fe(Xt), Yt();
        break;
      case 26:
      case 27:
      case 5:
        Wu(l);
        break;
      case 4:
        Yt();
        break;
      case 31:
        l.memoizedState !== null && xl(l);
        break;
      case 13:
        xl(l);
        break;
      case 19:
        Y(wt);
        break;
      case 10:
        fe(l.type);
        break;
      case 22:
      case 23:
        xl(l), $o(), t !== null && Y(Sn);
        break;
      case 24:
        fe(Xt);
    }
  }
  function du(t, l) {
    try {
      var e = l.updateQueue, n = e !== null ? e.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        e = i;
        do {
          if ((e.tag & t) === t) {
            n = void 0;
            var o = e.create, s = e.inst;
            n = o(), s.destroy = n;
          }
          e = e.next;
        } while (e !== i);
      }
    } catch (h) {
      Ot(l, l.return, h);
    }
  }
  function Le(t, l, e) {
    try {
      var n = l.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var o = i.next;
        n = o;
        do {
          if ((n.tag & t) === t) {
            var s = n.inst, h = s.destroy;
            if (h !== void 0) {
              s.destroy = void 0, i = l;
              var S = e, O = h;
              try {
                O();
              } catch (H) {
                Ot(
                  i,
                  S,
                  H
                );
              }
            }
          }
          n = n.next;
        } while (n !== o);
      }
    } catch (H) {
      Ot(l, l.return, H);
    }
  }
  function Bd(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        z0(l, e);
      } catch (n) {
        Ot(t, t.return, n);
      }
    }
  }
  function Ld(t, l, e) {
    e.props = Tn(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (n) {
      Ot(t, l, n);
    }
  }
  function hu(t, l) {
    try {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var n = t.stateNode;
            break;
          case 30:
            n = t.stateNode;
            break;
          default:
            n = t.stateNode;
        }
        typeof e == "function" ? t.refCleanup = e(n) : e.current = n;
      }
    } catch (i) {
      Ot(t, l, i);
    }
  }
  function Fl(t, l) {
    var e = t.ref, n = t.refCleanup;
    if (e !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (i) {
          Ot(t, l, i);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (i) {
          Ot(t, l, i);
        }
      else e.current = null;
  }
  function Yd(t) {
    var l = t.type, e = t.memoizedProps, n = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && n.focus();
          break t;
        case "img":
          e.src ? n.src = e.src : e.srcSet && (n.srcset = e.srcSet);
      }
    } catch (i) {
      Ot(t, t.return, i);
    }
  }
  function zf(t, l, e) {
    try {
      var n = t.stateNode;
      Ep(n, t.type, e, l), n[fl] = l;
    } catch (i) {
      Ot(t, t.return, i);
    }
  }
  function wd(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ze(t.type) || t.tag === 4;
  }
  function _f(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || wd(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ze(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Of(t, l, e) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = ae));
    else if (n !== 4 && (n === 27 && Ze(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (Of(t, l, e), t = t.sibling; t !== null; )
        Of(t, l, e), t = t.sibling;
  }
  function Gi(t, l, e) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (n !== 4 && (n === 27 && Ze(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (Gi(t, l, e), t = t.sibling; t !== null; )
        Gi(t, l, e), t = t.sibling;
  }
  function Gd(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var n = t.type, i = l.attributes; i.length; )
        l.removeAttributeNode(i[0]);
      el(l, n, e), l[It] = t, l[fl] = e;
    } catch (o) {
      Ot(t, t.return, o);
    }
  }
  var ye = !1, Vt = !1, Cf = !1, qd = typeof WeakSet == "function" ? WeakSet : Set, Wt = null;
  function lp(t, l) {
    if (t = t.containerInfo, Wf = cc, t = Pr(t), Mo(t)) {
      if ("selectionStart" in t)
        var e = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          e = (e = t.ownerDocument) && e.defaultView || window;
          var n = e.getSelection && e.getSelection();
          if (n && n.rangeCount !== 0) {
            e = n.anchorNode;
            var i = n.anchorOffset, o = n.focusNode;
            n = n.focusOffset;
            try {
              e.nodeType, o.nodeType;
            } catch {
              e = null;
              break t;
            }
            var s = 0, h = -1, S = -1, O = 0, H = 0, L = t, C = null;
            l: for (; ; ) {
              for (var D; L !== e || i !== 0 && L.nodeType !== 3 || (h = s + i), L !== o || n !== 0 && L.nodeType !== 3 || (S = s + n), L.nodeType === 3 && (s += L.nodeValue.length), (D = L.firstChild) !== null; )
                C = L, L = D;
              for (; ; ) {
                if (L === t) break l;
                if (C === e && ++O === i && (h = s), C === o && ++H === n && (S = s), (D = L.nextSibling) !== null) break;
                L = C, C = L.parentNode;
              }
              L = D;
            }
            e = h === -1 || S === -1 ? null : { start: h, end: S };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Ff = { focusedElem: t, selectionRange: e }, cc = !1, Wt = l; Wt !== null; )
      if (l = Wt, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, Wt = t;
      else
        for (; Wt !== null; ) {
          switch (l = Wt, o = l.alternate, t = l.flags, l.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = l.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (e = 0; e < t.length; e++)
                  i = t[e], i.ref.impl = i.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && o !== null) {
                t = void 0, e = l, i = o.memoizedProps, o = o.memoizedState, n = e.stateNode;
                try {
                  var P = Tn(
                    e.type,
                    i
                  );
                  t = n.getSnapshotBeforeUpdate(
                    P,
                    o
                  ), n.__reactInternalSnapshotBeforeUpdate = t;
                } catch (ut) {
                  Ot(
                    e,
                    e.return,
                    ut
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  ts(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ts(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(f(163));
          }
          if (t = l.sibling, t !== null) {
            t.return = l.return, Wt = t;
            break;
          }
          Wt = l.return;
        }
  }
  function Xd(t, l, e) {
    var n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ge(t, e), n & 4 && du(5, e);
        break;
      case 1:
        if (ge(t, e), n & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (s) {
              Ot(e, e.return, s);
            }
          else {
            var i = Tn(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                i,
                l,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (s) {
              Ot(
                e,
                e.return,
                s
              );
            }
          }
        n & 64 && Bd(e), n & 512 && hu(e, e.return);
        break;
      case 3:
        if (ge(t, e), n & 64 && (t = e.updateQueue, t !== null)) {
          if (l = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                l = e.child.stateNode;
                break;
              case 1:
                l = e.child.stateNode;
            }
          try {
            z0(t, l);
          } catch (s) {
            Ot(e, e.return, s);
          }
        }
        break;
      case 27:
        l === null && n & 4 && Gd(e);
      case 26:
      case 5:
        ge(t, e), l === null && n & 4 && Yd(e), n & 512 && hu(e, e.return);
        break;
      case 12:
        ge(t, e);
        break;
      case 31:
        ge(t, e), n & 4 && Vd(t, e);
        break;
      case 13:
        ge(t, e), n & 4 && Kd(t, e), n & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = sp.bind(
          null,
          e
        ), Dp(t, e))));
        break;
      case 22:
        if (n = e.memoizedState !== null || ye, !n) {
          l = l !== null && l.memoizedState !== null || Vt, i = ye;
          var o = Vt;
          ye = n, (Vt = l) && !o ? pe(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : ge(t, e), ye = i, Vt = o;
        }
        break;
      case 30:
        break;
      default:
        ge(t, e);
    }
  }
  function Qd(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Qd(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && no(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ht = null, rl = !1;
  function me(t, l, e) {
    for (e = e.child; e !== null; )
      Zd(t, l, e), e = e.sibling;
  }
  function Zd(t, l, e) {
    if (vl && typeof vl.onCommitFiberUnmount == "function")
      try {
        vl.onCommitFiberUnmount(La, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Vt || Fl(e, l), me(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Vt || Fl(e, l);
        var n = Ht, i = rl;
        Ze(e.type) && (Ht = e.stateNode, rl = !1), me(
          t,
          l,
          e
        ), Eu(e.stateNode), Ht = n, rl = i;
        break;
      case 5:
        Vt || Fl(e, l);
      case 6:
        if (n = Ht, i = rl, Ht = null, me(
          t,
          l,
          e
        ), Ht = n, rl = i, Ht !== null)
          if (rl)
            try {
              (Ht.nodeType === 9 ? Ht.body : Ht.nodeName === "HTML" ? Ht.ownerDocument.body : Ht).removeChild(e.stateNode);
            } catch (o) {
              Ot(
                e,
                l,
                o
              );
            }
          else
            try {
              Ht.removeChild(e.stateNode);
            } catch (o) {
              Ot(
                e,
                l,
                o
              );
            }
        break;
      case 18:
        Ht !== null && (rl ? (t = Ht, B1(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Ta(t)) : B1(Ht, e.stateNode));
        break;
      case 4:
        n = Ht, i = rl, Ht = e.stateNode.containerInfo, rl = !0, me(
          t,
          l,
          e
        ), Ht = n, rl = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Le(2, e, l), Vt || Le(4, e, l), me(
          t,
          l,
          e
        );
        break;
      case 1:
        Vt || (Fl(e, l), n = e.stateNode, typeof n.componentWillUnmount == "function" && Ld(
          e,
          l,
          n
        )), me(
          t,
          l,
          e
        );
        break;
      case 21:
        me(
          t,
          l,
          e
        );
        break;
      case 22:
        Vt = (n = Vt) || e.memoizedState !== null, me(
          t,
          l,
          e
        ), Vt = n;
        break;
      default:
        me(
          t,
          l,
          e
        );
    }
  }
  function Vd(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Ta(t);
      } catch (e) {
        Ot(l, l.return, e);
      }
    }
  }
  function Kd(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Ta(t);
      } catch (e) {
        Ot(l, l.return, e);
      }
  }
  function ep(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new qd()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new qd()), l;
      default:
        throw Error(f(435, t.tag));
    }
  }
  function qi(t, l) {
    var e = ep(t);
    l.forEach(function(n) {
      if (!e.has(n)) {
        e.add(n);
        var i = rp.bind(null, t, n);
        n.then(i, i);
      }
    });
  }
  function dl(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var n = 0; n < e.length; n++) {
        var i = e[n], o = t, s = l, h = s;
        t: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (Ze(h.type)) {
                Ht = h.stateNode, rl = !1;
                break t;
              }
              break;
            case 5:
              Ht = h.stateNode, rl = !1;
              break t;
            case 3:
            case 4:
              Ht = h.stateNode.containerInfo, rl = !0;
              break t;
          }
          h = h.return;
        }
        if (Ht === null) throw Error(f(160));
        Zd(o, s, i), Ht = null, rl = !1, o = i.alternate, o !== null && (o.return = null), i.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        $d(l, t), l = l.sibling;
  }
  var Ql = null;
  function $d(t, l) {
    var e = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        dl(l, t), hl(t), n & 4 && (Le(3, t, t.return), du(3, t), Le(5, t, t.return));
        break;
      case 1:
        dl(l, t), hl(t), n & 512 && (Vt || e === null || Fl(e, e.return)), n & 64 && ye && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? n : e.concat(n))));
        break;
      case 26:
        var i = Ql;
        if (dl(l, t), hl(t), n & 512 && (Vt || e === null || Fl(e, e.return)), n & 4) {
          var o = e !== null ? e.memoizedState : null;
          if (n = t.memoizedState, e === null)
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  n = t.type, e = t.memoizedProps, i = i.ownerDocument || i;
                  l: switch (n) {
                    case "title":
                      o = i.getElementsByTagName("title")[0], (!o || o[Ga] || o[It] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = i.createElement(n), i.head.insertBefore(
                        o,
                        i.querySelector("head > title")
                      )), el(o, n, e), o[It] = t, Jt(o), n = o;
                      break t;
                    case "link":
                      var s = $1(
                        "link",
                        "href",
                        i
                      ).get(n + (e.href || ""));
                      if (s) {
                        for (var h = 0; h < s.length; h++)
                          if (o = s[h], o.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && o.getAttribute("rel") === (e.rel == null ? null : e.rel) && o.getAttribute("title") === (e.title == null ? null : e.title) && o.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            s.splice(h, 1);
                            break l;
                          }
                      }
                      o = i.createElement(n), el(o, n, e), i.head.appendChild(o);
                      break;
                    case "meta":
                      if (s = $1(
                        "meta",
                        "content",
                        i
                      ).get(n + (e.content || ""))) {
                        for (h = 0; h < s.length; h++)
                          if (o = s[h], o.getAttribute("content") === (e.content == null ? null : "" + e.content) && o.getAttribute("name") === (e.name == null ? null : e.name) && o.getAttribute("property") === (e.property == null ? null : e.property) && o.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && o.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            s.splice(h, 1);
                            break l;
                          }
                      }
                      o = i.createElement(n), el(o, n, e), i.head.appendChild(o);
                      break;
                    default:
                      throw Error(f(468, n));
                  }
                  o[It] = t, Jt(o), n = o;
                }
                t.stateNode = n;
              } else
                k1(
                  i,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = K1(
                i,
                n,
                t.memoizedProps
              );
          else
            o !== n ? (o === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : o.count--, n === null ? k1(
              i,
              t.type,
              t.stateNode
            ) : K1(
              i,
              n,
              t.memoizedProps
            )) : n === null && t.stateNode !== null && zf(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        dl(l, t), hl(t), n & 512 && (Vt || e === null || Fl(e, e.return)), e !== null && n & 4 && zf(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (dl(l, t), hl(t), n & 512 && (Vt || e === null || Fl(e, e.return)), t.flags & 32) {
          i = t.stateNode;
          try {
            $n(i, "");
          } catch (P) {
            Ot(t, t.return, P);
          }
        }
        n & 4 && t.stateNode != null && (i = t.memoizedProps, zf(
          t,
          i,
          e !== null ? e.memoizedProps : i
        )), n & 1024 && (Cf = !0);
        break;
      case 6:
        if (dl(l, t), hl(t), n & 4) {
          if (t.stateNode === null)
            throw Error(f(162));
          n = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = n;
          } catch (P) {
            Ot(t, t.return, P);
          }
        }
        break;
      case 3:
        if (nc = null, i = Ql, Ql = lc(l.containerInfo), dl(l, t), Ql = i, hl(t), n & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Ta(l.containerInfo);
          } catch (P) {
            Ot(t, t.return, P);
          }
        Cf && (Cf = !1, kd(t));
        break;
      case 4:
        n = Ql, Ql = lc(
          t.stateNode.containerInfo
        ), dl(l, t), hl(t), Ql = n;
        break;
      case 12:
        dl(l, t), hl(t);
        break;
      case 31:
        dl(l, t), hl(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, qi(t, n)));
        break;
      case 13:
        dl(l, t), hl(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Qi = pl()), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, qi(t, n)));
        break;
      case 22:
        i = t.memoizedState !== null;
        var S = e !== null && e.memoizedState !== null, O = ye, H = Vt;
        if (ye = O || i, Vt = H || S, dl(l, t), Vt = H, ye = O, hl(t), n & 8192)
          t: for (l = t.stateNode, l._visibility = i ? l._visibility & -2 : l._visibility | 1, i && (e === null || S || ye || Vt || An(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                S = e = l;
                try {
                  if (o = S.stateNode, i)
                    s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
                  else {
                    h = S.stateNode;
                    var L = S.memoizedProps.style, C = L != null && L.hasOwnProperty("display") ? L.display : null;
                    h.style.display = C == null || typeof C == "boolean" ? "" : ("" + C).trim();
                  }
                } catch (P) {
                  Ot(S, S.return, P);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                S = l;
                try {
                  S.stateNode.nodeValue = i ? "" : S.memoizedProps;
                } catch (P) {
                  Ot(S, S.return, P);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                S = l;
                try {
                  var D = S.stateNode;
                  i ? L1(D, !0) : L1(S.stateNode, !1);
                } catch (P) {
                  Ot(S, S.return, P);
                }
              }
            } else if ((l.tag !== 22 && l.tag !== 23 || l.memoizedState === null || l === t) && l.child !== null) {
              l.child.return = l, l = l.child;
              continue;
            }
            if (l === t) break t;
            for (; l.sibling === null; ) {
              if (l.return === null || l.return === t) break t;
              e === l && (e = null), l = l.return;
            }
            e === l && (e = null), l.sibling.return = l.return, l = l.sibling;
          }
        n & 4 && (n = t.updateQueue, n !== null && (e = n.retryQueue, e !== null && (n.retryQueue = null, qi(t, e))));
        break;
      case 19:
        dl(l, t), hl(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, qi(t, n)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        dl(l, t), hl(t);
    }
  }
  function hl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, n = t.return; n !== null; ) {
          if (wd(n)) {
            e = n;
            break;
          }
          n = n.return;
        }
        if (e == null) throw Error(f(160));
        switch (e.tag) {
          case 27:
            var i = e.stateNode, o = _f(t);
            Gi(t, o, i);
            break;
          case 5:
            var s = e.stateNode;
            e.flags & 32 && ($n(s, ""), e.flags &= -33);
            var h = _f(t);
            Gi(t, h, s);
            break;
          case 3:
          case 4:
            var S = e.stateNode.containerInfo, O = _f(t);
            Of(
              t,
              O,
              S
            );
            break;
          default:
            throw Error(f(161));
        }
      } catch (H) {
        Ot(t, t.return, H);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function kd(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        kd(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function ge(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Xd(t, l.alternate, l), l = l.sibling;
  }
  function An(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Le(4, l, l.return), An(l);
          break;
        case 1:
          Fl(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && Ld(
            l,
            l.return,
            e
          ), An(l);
          break;
        case 27:
          Eu(l.stateNode);
        case 26:
        case 5:
          Fl(l, l.return), An(l);
          break;
        case 22:
          l.memoizedState === null && An(l);
          break;
        case 30:
          An(l);
          break;
        default:
          An(l);
      }
      t = t.sibling;
    }
  }
  function pe(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var n = l.alternate, i = t, o = l, s = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          pe(
            i,
            o,
            e
          ), du(4, o);
          break;
        case 1:
          if (pe(
            i,
            o,
            e
          ), n = o, i = n.stateNode, typeof i.componentDidMount == "function")
            try {
              i.componentDidMount();
            } catch (O) {
              Ot(n, n.return, O);
            }
          if (n = o, i = n.updateQueue, i !== null) {
            var h = n.stateNode;
            try {
              var S = i.shared.hiddenCallbacks;
              if (S !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < S.length; i++)
                  A0(S[i], h);
            } catch (O) {
              Ot(n, n.return, O);
            }
          }
          e && s & 64 && Bd(o), hu(o, o.return);
          break;
        case 27:
          Gd(o);
        case 26:
        case 5:
          pe(
            i,
            o,
            e
          ), e && n === null && s & 4 && Yd(o), hu(o, o.return);
          break;
        case 12:
          pe(
            i,
            o,
            e
          );
          break;
        case 31:
          pe(
            i,
            o,
            e
          ), e && s & 4 && Vd(i, o);
          break;
        case 13:
          pe(
            i,
            o,
            e
          ), e && s & 4 && Kd(i, o);
          break;
        case 22:
          o.memoizedState === null && pe(
            i,
            o,
            e
          ), hu(o, o.return);
          break;
        case 30:
          break;
        default:
          pe(
            i,
            o,
            e
          );
      }
      l = l.sibling;
    }
  }
  function Df(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && Pa(e));
  }
  function Rf(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Pa(t));
  }
  function Zl(t, l, e, n) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Jd(
          t,
          l,
          e,
          n
        ), l = l.sibling;
  }
  function Jd(t, l, e, n) {
    var i = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Zl(
          t,
          l,
          e,
          n
        ), i & 2048 && du(9, l);
        break;
      case 1:
        Zl(
          t,
          l,
          e,
          n
        );
        break;
      case 3:
        Zl(
          t,
          l,
          e,
          n
        ), i & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Pa(t)));
        break;
      case 12:
        if (i & 2048) {
          Zl(
            t,
            l,
            e,
            n
          ), t = l.stateNode;
          try {
            var o = l.memoizedProps, s = o.id, h = o.onPostCommit;
            typeof h == "function" && h(
              s,
              l.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (S) {
            Ot(l, l.return, S);
          }
        } else
          Zl(
            t,
            l,
            e,
            n
          );
        break;
      case 31:
        Zl(
          t,
          l,
          e,
          n
        );
        break;
      case 13:
        Zl(
          t,
          l,
          e,
          n
        );
        break;
      case 23:
        break;
      case 22:
        o = l.stateNode, s = l.alternate, l.memoizedState !== null ? o._visibility & 2 ? Zl(
          t,
          l,
          e,
          n
        ) : yu(t, l) : o._visibility & 2 ? Zl(
          t,
          l,
          e,
          n
        ) : (o._visibility |= 2, ha(
          t,
          l,
          e,
          n,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), i & 2048 && Df(s, l);
        break;
      case 24:
        Zl(
          t,
          l,
          e,
          n
        ), i & 2048 && Rf(l.alternate, l);
        break;
      default:
        Zl(
          t,
          l,
          e,
          n
        );
    }
  }
  function ha(t, l, e, n, i) {
    for (i = i && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var o = t, s = l, h = e, S = n, O = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          ha(
            o,
            s,
            h,
            S,
            i
          ), du(8, s);
          break;
        case 23:
          break;
        case 22:
          var H = s.stateNode;
          s.memoizedState !== null ? H._visibility & 2 ? ha(
            o,
            s,
            h,
            S,
            i
          ) : yu(
            o,
            s
          ) : (H._visibility |= 2, ha(
            o,
            s,
            h,
            S,
            i
          )), i && O & 2048 && Df(
            s.alternate,
            s
          );
          break;
        case 24:
          ha(
            o,
            s,
            h,
            S,
            i
          ), i && O & 2048 && Rf(s.alternate, s);
          break;
        default:
          ha(
            o,
            s,
            h,
            S,
            i
          );
      }
      l = l.sibling;
    }
  }
  function yu(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, n = l, i = n.flags;
        switch (n.tag) {
          case 22:
            yu(e, n), i & 2048 && Df(
              n.alternate,
              n
            );
            break;
          case 24:
            yu(e, n), i & 2048 && Rf(n.alternate, n);
            break;
          default:
            yu(e, n);
        }
        l = l.sibling;
      }
  }
  var mu = 8192;
  function ya(t, l, e) {
    if (t.subtreeFlags & mu)
      for (t = t.child; t !== null; )
        Wd(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function Wd(t, l, e) {
    switch (t.tag) {
      case 26:
        ya(
          t,
          l,
          e
        ), t.flags & mu && t.memoizedState !== null && Xp(
          e,
          Ql,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        ya(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var n = Ql;
        Ql = lc(t.stateNode.containerInfo), ya(
          t,
          l,
          e
        ), Ql = n;
        break;
      case 22:
        t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = mu, mu = 16777216, ya(
          t,
          l,
          e
        ), mu = n) : ya(
          t,
          l,
          e
        ));
        break;
      default:
        ya(
          t,
          l,
          e
        );
    }
  }
  function Fd(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function gu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var n = l[e];
          Wt = n, Pd(
            n,
            t
          );
        }
      Fd(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Id(t), t = t.sibling;
  }
  function Id(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        gu(t), t.flags & 2048 && Le(9, t, t.return);
        break;
      case 3:
        gu(t);
        break;
      case 12:
        gu(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, Xi(t)) : gu(t);
        break;
      default:
        gu(t);
    }
  }
  function Xi(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var n = l[e];
          Wt = n, Pd(
            n,
            t
          );
        }
      Fd(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          Le(8, l, l.return), Xi(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, Xi(l));
          break;
        default:
          Xi(l);
      }
      t = t.sibling;
    }
  }
  function Pd(t, l) {
    for (; Wt !== null; ) {
      var e = Wt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Le(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var n = e.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Pa(e.memoizedState.cache);
      }
      if (n = e.child, n !== null) n.return = e, Wt = n;
      else
        t: for (e = t; Wt !== null; ) {
          n = Wt;
          var i = n.sibling, o = n.return;
          if (Qd(n), n === e) {
            Wt = null;
            break t;
          }
          if (i !== null) {
            i.return = o, Wt = i;
            break t;
          }
          Wt = o;
        }
    }
  }
  var np = {
    getCacheForType: function(t) {
      var l = tl(Xt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return tl(Xt).controller.signal;
    }
  }, ap = typeof WeakMap == "function" ? WeakMap : Map, At = 0, jt = null, ht = null, mt = 0, _t = 0, Tl = null, Ye = !1, ma = !1, jf = !1, ve = 0, Lt = 0, we = 0, zn = 0, Nf = 0, Al = 0, ga = 0, pu = null, yl = null, Uf = !1, Qi = 0, t1 = 0, Zi = 1 / 0, Vi = null, Ge = null, $t = 0, qe = null, pa = null, Se = 0, Hf = 0, Bf = null, l1 = null, vu = 0, Lf = null;
  function zl() {
    return (At & 2) !== 0 && mt !== 0 ? mt & -mt : U.T !== null ? Qf() : pr();
  }
  function e1() {
    if (Al === 0)
      if ((mt & 536870912) === 0 || vt) {
        var t = Pu;
        Pu <<= 1, (Pu & 3932160) === 0 && (Pu = 262144), Al = t;
      } else Al = 536870912;
    return t = El.current, t !== null && (t.flags |= 32), Al;
  }
  function ml(t, l, e) {
    (t === jt && (_t === 2 || _t === 9) || t.cancelPendingCommit !== null) && (va(t, 0), Xe(
      t,
      mt,
      Al,
      !1
    )), wa(t, e), ((At & 2) === 0 || t !== jt) && (t === jt && ((At & 2) === 0 && (zn |= e), Lt === 4 && Xe(
      t,
      mt,
      Al,
      !1
    )), Il(t));
  }
  function n1(t, l, e) {
    if ((At & 6) !== 0) throw Error(f(327));
    var n = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || Ya(t, l), i = n ? cp(t, l) : wf(t, l, !0), o = n;
    do {
      if (i === 0) {
        ma && !n && Xe(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, o && !up(e)) {
          i = wf(t, l, !1), o = !1;
          continue;
        }
        if (i === 2) {
          if (o = l, t.errorRecoveryDisabledLanes & o)
            var s = 0;
          else
            s = t.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
          if (s !== 0) {
            l = s;
            t: {
              var h = t;
              i = pu;
              var S = h.current.memoizedState.isDehydrated;
              if (S && (va(h, s).flags |= 256), s = wf(
                h,
                s,
                !1
              ), s !== 2) {
                if (jf && !S) {
                  h.errorRecoveryDisabledLanes |= o, zn |= o, i = 4;
                  break t;
                }
                o = yl, yl = i, o !== null && (yl === null ? yl = o : yl.push.apply(
                  yl,
                  o
                ));
              }
              i = s;
            }
            if (o = !1, i !== 2) continue;
          }
        }
        if (i === 1) {
          va(t, 0), Xe(t, l, 0, !0);
          break;
        }
        t: {
          switch (n = t, o = i, o) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((l & 4194048) !== l) break;
            case 6:
              Xe(
                n,
                l,
                Al,
                !Ye
              );
              break t;
            case 2:
              yl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((l & 62914560) === l && (i = Qi + 300 - pl(), 10 < i)) {
            if (Xe(
              n,
              l,
              Al,
              !Ye
            ), li(n, 0, !0) !== 0) break t;
            Se = l, n.timeoutHandle = U1(
              a1.bind(
                null,
                n,
                e,
                yl,
                Vi,
                Uf,
                l,
                Al,
                zn,
                ga,
                Ye,
                o,
                "Throttled",
                -0,
                0
              ),
              i
            );
            break t;
          }
          a1(
            n,
            e,
            yl,
            Vi,
            Uf,
            l,
            Al,
            zn,
            ga,
            Ye,
            o,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Il(t);
  }
  function a1(t, l, e, n, i, o, s, h, S, O, H, L, C, D) {
    if (t.timeoutHandle = -1, L = l.subtreeFlags, L & 8192 || (L & 16785408) === 16785408) {
      L = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ae
      }, Wd(
        l,
        o,
        L
      );
      var P = (o & 62914560) === o ? Qi - pl() : (o & 4194048) === o ? t1 - pl() : 0;
      if (P = Qp(
        L,
        P
      ), P !== null) {
        Se = o, t.cancelPendingCommit = P(
          d1.bind(
            null,
            t,
            l,
            o,
            e,
            n,
            i,
            s,
            h,
            S,
            H,
            L,
            null,
            C,
            D
          )
        ), Xe(t, o, s, !O);
        return;
      }
    }
    d1(
      t,
      l,
      o,
      e,
      n,
      i,
      s,
      h,
      S
    );
  }
  function up(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var n = 0; n < e.length; n++) {
          var i = e[n], o = i.getSnapshot;
          i = i.value;
          try {
            if (!bl(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = l.child, l.subtreeFlags & 16384 && e !== null)
        e.return = l, l = e;
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }
    return !0;
  }
  function Xe(t, l, e, n) {
    l &= ~Nf, l &= ~zn, t.suspendedLanes |= l, t.pingedLanes &= ~l, n && (t.warmLanes |= l), n = t.expirationTimes;
    for (var i = l; 0 < i; ) {
      var o = 31 - Sl(i), s = 1 << o;
      n[o] = -1, i &= ~s;
    }
    e !== 0 && yr(t, e, l);
  }
  function Ki() {
    return (At & 6) === 0 ? (Su(0), !1) : !0;
  }
  function Yf() {
    if (ht !== null) {
      if (_t === 0)
        var t = ht.return;
      else
        t = ht, oe = pn = null, Po(t), oa = null, lu = 0, t = ht;
      for (; t !== null; )
        Hd(t.alternate, t), t = t.return;
      ht = null;
    }
  }
  function va(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, Ap(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), Se = 0, Yf(), jt = t, ht = e = ie(t.current, null), mt = l, _t = 0, Tl = null, Ye = !1, ma = Ya(t, l), jf = !1, ga = Al = Nf = zn = we = Lt = 0, yl = pu = null, Uf = !1, (l & 8) !== 0 && (l |= l & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= l; 0 < n; ) {
        var i = 31 - Sl(n), o = 1 << i;
        l |= t[i], n &= ~o;
      }
    return ve = l, hi(), e;
  }
  function u1(t, l) {
    st = null, U.H = fu, l === ca || l === Mi ? (l = M0(), _t = 3) : l === qo ? (l = M0(), _t = 4) : _t = l === gf ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Tl = l, ht === null && (Lt = 1, Hi(
      t,
      jl(l, t.current)
    ));
  }
  function i1() {
    var t = El.current;
    return t === null ? !0 : (mt & 4194048) === mt ? Bl === null : (mt & 62914560) === mt || (mt & 536870912) !== 0 ? t === Bl : !1;
  }
  function c1() {
    var t = U.H;
    return U.H = fu, t === null ? fu : t;
  }
  function o1() {
    var t = U.A;
    return U.A = np, t;
  }
  function $i() {
    Lt = 4, Ye || (mt & 4194048) !== mt && El.current !== null || (ma = !0), (we & 134217727) === 0 && (zn & 134217727) === 0 || jt === null || Xe(
      jt,
      mt,
      Al,
      !1
    );
  }
  function wf(t, l, e) {
    var n = At;
    At |= 2;
    var i = c1(), o = o1();
    (jt !== t || mt !== l) && (Vi = null, va(t, l)), l = !1;
    var s = Lt;
    t: do
      try {
        if (_t !== 0 && ht !== null) {
          var h = ht, S = Tl;
          switch (_t) {
            case 8:
              Yf(), s = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              El.current === null && (l = !0);
              var O = _t;
              if (_t = 0, Tl = null, Sa(t, h, S, O), e && ma) {
                s = 0;
                break t;
              }
              break;
            default:
              O = _t, _t = 0, Tl = null, Sa(t, h, S, O);
          }
        }
        ip(), s = Lt;
        break;
      } catch (H) {
        u1(t, H);
      }
    while (!0);
    return l && t.shellSuspendCounter++, oe = pn = null, At = n, U.H = i, U.A = o, ht === null && (jt = null, mt = 0, hi()), s;
  }
  function ip() {
    for (; ht !== null; ) f1(ht);
  }
  function cp(t, l) {
    var e = At;
    At |= 2;
    var n = c1(), i = o1();
    jt !== t || mt !== l ? (Vi = null, Zi = pl() + 500, va(t, l)) : ma = Ya(
      t,
      l
    );
    t: do
      try {
        if (_t !== 0 && ht !== null) {
          l = ht;
          var o = Tl;
          l: switch (_t) {
            case 1:
              _t = 0, Tl = null, Sa(t, l, o, 1);
              break;
            case 2:
            case 9:
              if (S0(o)) {
                _t = 0, Tl = null, s1(l);
                break;
              }
              l = function() {
                _t !== 2 && _t !== 9 || jt !== t || (_t = 7), Il(t);
              }, o.then(l, l);
              break t;
            case 3:
              _t = 7;
              break t;
            case 4:
              _t = 5;
              break t;
            case 7:
              S0(o) ? (_t = 0, Tl = null, s1(l)) : (_t = 0, Tl = null, Sa(t, l, o, 7));
              break;
            case 5:
              var s = null;
              switch (ht.tag) {
                case 26:
                  s = ht.memoizedState;
                case 5:
                case 27:
                  var h = ht;
                  if (s ? J1(s) : h.stateNode.complete) {
                    _t = 0, Tl = null;
                    var S = h.sibling;
                    if (S !== null) ht = S;
                    else {
                      var O = h.return;
                      O !== null ? (ht = O, ki(O)) : ht = null;
                    }
                    break l;
                  }
              }
              _t = 0, Tl = null, Sa(t, l, o, 5);
              break;
            case 6:
              _t = 0, Tl = null, Sa(t, l, o, 6);
              break;
            case 8:
              Yf(), Lt = 6;
              break t;
            default:
              throw Error(f(462));
          }
        }
        op();
        break;
      } catch (H) {
        u1(t, H);
      }
    while (!0);
    return oe = pn = null, U.H = n, U.A = i, At = e, ht !== null ? 0 : (jt = null, mt = 0, hi(), Lt);
  }
  function op() {
    for (; ht !== null && !Rm(); )
      f1(ht);
  }
  function f1(t) {
    var l = Nd(t.alternate, t, ve);
    t.memoizedProps = t.pendingProps, l === null ? ki(t) : ht = l;
  }
  function s1(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = _d(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          mt
        );
        break;
      case 11:
        l = _d(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          mt
        );
        break;
      case 5:
        Po(l);
      default:
        Hd(e, l), l = ht = o0(l, ve), l = Nd(e, l, ve);
    }
    t.memoizedProps = t.pendingProps, l === null ? ki(t) : ht = l;
  }
  function Sa(t, l, e, n) {
    oe = pn = null, Po(l), oa = null, lu = 0;
    var i = l.return;
    try {
      if (Wg(
        t,
        i,
        l,
        e,
        mt
      )) {
        Lt = 1, Hi(
          t,
          jl(e, t.current)
        ), ht = null;
        return;
      }
    } catch (o) {
      if (i !== null) throw ht = i, o;
      Lt = 1, Hi(
        t,
        jl(e, t.current)
      ), ht = null;
      return;
    }
    l.flags & 32768 ? (vt || n === 1 ? t = !0 : ma || (mt & 536870912) !== 0 ? t = !1 : (Ye = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = El.current, n !== null && n.tag === 13 && (n.flags |= 16384))), r1(l, t)) : ki(l);
  }
  function ki(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        r1(
          l,
          Ye
        );
        return;
      }
      t = l.return;
      var e = Pg(
        l.alternate,
        l,
        ve
      );
      if (e !== null) {
        ht = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        ht = l;
        return;
      }
      ht = l = t;
    } while (l !== null);
    Lt === 0 && (Lt = 5);
  }
  function r1(t, l) {
    do {
      var e = tp(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, ht = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        ht = t;
        return;
      }
      ht = t = e;
    } while (t !== null);
    Lt = 6, ht = null;
  }
  function d1(t, l, e, n, i, o, s, h, S) {
    t.cancelPendingCommit = null;
    do
      Ji();
    while ($t !== 0);
    if ((At & 6) !== 0) throw Error(f(327));
    if (l !== null) {
      if (l === t.current) throw Error(f(177));
      if (o = l.lanes | l.childLanes, o |= zo, qm(
        t,
        e,
        o,
        s,
        h,
        S
      ), t === jt && (ht = jt = null, mt = 0), pa = l, qe = t, Se = e, Hf = o, Bf = i, l1 = n, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, dp(Fu, function() {
        return p1(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), n = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || n) {
        n = U.T, U.T = null, i = $.p, $.p = 2, s = At, At |= 4;
        try {
          lp(t, l, e);
        } finally {
          At = s, $.p = i, U.T = n;
        }
      }
      $t = 1, h1(), y1(), m1();
    }
  }
  function h1() {
    if ($t === 1) {
      $t = 0;
      var t = qe, l = pa, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = U.T, U.T = null;
        var n = $.p;
        $.p = 2;
        var i = At;
        At |= 4;
        try {
          $d(l, t);
          var o = Ff, s = Pr(t.containerInfo), h = o.focusedElem, S = o.selectionRange;
          if (s !== h && h && h.ownerDocument && Ir(
            h.ownerDocument.documentElement,
            h
          )) {
            if (S !== null && Mo(h)) {
              var O = S.start, H = S.end;
              if (H === void 0 && (H = O), "selectionStart" in h)
                h.selectionStart = O, h.selectionEnd = Math.min(
                  H,
                  h.value.length
                );
              else {
                var L = h.ownerDocument || document, C = L && L.defaultView || window;
                if (C.getSelection) {
                  var D = C.getSelection(), P = h.textContent.length, ut = Math.min(S.start, P), Rt = S.end === void 0 ? ut : Math.min(S.end, P);
                  !D.extend && ut > Rt && (s = Rt, Rt = ut, ut = s);
                  var A = Fr(
                    h,
                    ut
                  ), M = Fr(
                    h,
                    Rt
                  );
                  if (A && M && (D.rangeCount !== 1 || D.anchorNode !== A.node || D.anchorOffset !== A.offset || D.focusNode !== M.node || D.focusOffset !== M.offset)) {
                    var _ = L.createRange();
                    _.setStart(A.node, A.offset), D.removeAllRanges(), ut > Rt ? (D.addRange(_), D.extend(M.node, M.offset)) : (_.setEnd(M.node, M.offset), D.addRange(_));
                  }
                }
              }
            }
            for (L = [], D = h; D = D.parentNode; )
              D.nodeType === 1 && L.push({
                element: D,
                left: D.scrollLeft,
                top: D.scrollTop
              });
            for (typeof h.focus == "function" && h.focus(), h = 0; h < L.length; h++) {
              var B = L[h];
              B.element.scrollLeft = B.left, B.element.scrollTop = B.top;
            }
          }
          cc = !!Wf, Ff = Wf = null;
        } finally {
          At = i, $.p = n, U.T = e;
        }
      }
      t.current = l, $t = 2;
    }
  }
  function y1() {
    if ($t === 2) {
      $t = 0;
      var t = qe, l = pa, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = U.T, U.T = null;
        var n = $.p;
        $.p = 2;
        var i = At;
        At |= 4;
        try {
          Xd(t, l.alternate, l);
        } finally {
          At = i, $.p = n, U.T = e;
        }
      }
      $t = 3;
    }
  }
  function m1() {
    if ($t === 4 || $t === 3) {
      $t = 0, jm();
      var t = qe, l = pa, e = Se, n = l1;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? $t = 5 : ($t = 0, pa = qe = null, g1(t, t.pendingLanes));
      var i = t.pendingLanes;
      if (i === 0 && (Ge = null), lo(e), l = l.stateNode, vl && typeof vl.onCommitFiberRoot == "function")
        try {
          vl.onCommitFiberRoot(
            La,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        l = U.T, i = $.p, $.p = 2, U.T = null;
        try {
          for (var o = t.onRecoverableError, s = 0; s < n.length; s++) {
            var h = n[s];
            o(h.value, {
              componentStack: h.stack
            });
          }
        } finally {
          U.T = l, $.p = i;
        }
      }
      (Se & 3) !== 0 && Ji(), Il(t), i = t.pendingLanes, (e & 261930) !== 0 && (i & 42) !== 0 ? t === Lf ? vu++ : (vu = 0, Lf = t) : vu = 0, Su(0);
    }
  }
  function g1(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Pa(l)));
  }
  function Ji() {
    return h1(), y1(), m1(), p1();
  }
  function p1() {
    if ($t !== 5) return !1;
    var t = qe, l = Hf;
    Hf = 0;
    var e = lo(Se), n = U.T, i = $.p;
    try {
      $.p = 32 > e ? 32 : e, U.T = null, e = Bf, Bf = null;
      var o = qe, s = Se;
      if ($t = 0, pa = qe = null, Se = 0, (At & 6) !== 0) throw Error(f(331));
      var h = At;
      if (At |= 4, Id(o.current), Jd(
        o,
        o.current,
        s,
        e
      ), At = h, Su(0, !1), vl && typeof vl.onPostCommitFiberRoot == "function")
        try {
          vl.onPostCommitFiberRoot(La, o);
        } catch {
        }
      return !0;
    } finally {
      $.p = i, U.T = n, g1(t, l);
    }
  }
  function v1(t, l, e) {
    l = jl(e, l), l = mf(t.stateNode, l, 2), t = Ue(t, l, 2), t !== null && (wa(t, 2), Il(t));
  }
  function Ot(t, l, e) {
    if (t.tag === 3)
      v1(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          v1(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var n = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Ge === null || !Ge.has(n))) {
            t = jl(e, t), e = Sd(2), n = Ue(l, e, 2), n !== null && (bd(
              e,
              n,
              l,
              t
            ), wa(n, 2), Il(n));
            break;
          }
        }
        l = l.return;
      }
  }
  function Gf(t, l, e) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new ap();
      var i = /* @__PURE__ */ new Set();
      n.set(l, i);
    } else
      i = n.get(l), i === void 0 && (i = /* @__PURE__ */ new Set(), n.set(l, i));
    i.has(e) || (jf = !0, i.add(e), t = fp.bind(null, t, l, e), l.then(t, t));
  }
  function fp(t, l, e) {
    var n = t.pingCache;
    n !== null && n.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, jt === t && (mt & e) === e && (Lt === 4 || Lt === 3 && (mt & 62914560) === mt && 300 > pl() - Qi ? (At & 2) === 0 && va(t, 0) : Nf |= e, ga === mt && (ga = 0)), Il(t);
  }
  function S1(t, l) {
    l === 0 && (l = hr()), t = yn(t, l), t !== null && (wa(t, l), Il(t));
  }
  function sp(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), S1(t, e);
  }
  function rp(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode, i = t.memoizedState;
        i !== null && (e = i.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(f(314));
    }
    n !== null && n.delete(l), S1(t, e);
  }
  function dp(t, l) {
    return Fc(t, l);
  }
  var Wi = null, ba = null, qf = !1, Fi = !1, Xf = !1, Qe = 0;
  function Il(t) {
    t !== ba && t.next === null && (ba === null ? Wi = ba = t : ba = ba.next = t), Fi = !0, qf || (qf = !0, yp());
  }
  function Su(t, l) {
    if (!Xf && Fi) {
      Xf = !0;
      do
        for (var e = !1, n = Wi; n !== null; ) {
          if (t !== 0) {
            var i = n.pendingLanes;
            if (i === 0) var o = 0;
            else {
              var s = n.suspendedLanes, h = n.pingedLanes;
              o = (1 << 31 - Sl(42 | t) + 1) - 1, o &= i & ~(s & ~h), o = o & 201326741 ? o & 201326741 | 1 : o ? o | 2 : 0;
            }
            o !== 0 && (e = !0, x1(n, o));
          } else
            o = mt, o = li(
              n,
              n === jt ? o : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (o & 3) === 0 || Ya(n, o) || (e = !0, x1(n, o));
          n = n.next;
        }
      while (e);
      Xf = !1;
    }
  }
  function hp() {
    b1();
  }
  function b1() {
    Fi = qf = !1;
    var t = 0;
    Qe !== 0 && Tp() && (t = Qe);
    for (var l = pl(), e = null, n = Wi; n !== null; ) {
      var i = n.next, o = M1(n, l);
      o === 0 ? (n.next = null, e === null ? Wi = i : e.next = i, i === null && (ba = e)) : (e = n, (t !== 0 || (o & 3) !== 0) && (Fi = !0)), n = i;
    }
    $t !== 0 && $t !== 5 || Su(t), Qe !== 0 && (Qe = 0);
  }
  function M1(t, l) {
    for (var e = t.suspendedLanes, n = t.pingedLanes, i = t.expirationTimes, o = t.pendingLanes & -62914561; 0 < o; ) {
      var s = 31 - Sl(o), h = 1 << s, S = i[s];
      S === -1 ? ((h & e) === 0 || (h & n) !== 0) && (i[s] = Gm(h, l)) : S <= l && (t.expiredLanes |= h), o &= ~h;
    }
    if (l = jt, e = mt, e = li(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, e === 0 || t === l && (_t === 2 || _t === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && Ic(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || Ya(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (n !== null && Ic(n), lo(e)) {
        case 2:
        case 8:
          e = rr;
          break;
        case 32:
          e = Fu;
          break;
        case 268435456:
          e = dr;
          break;
        default:
          e = Fu;
      }
      return n = E1.bind(null, t), e = Fc(e, n), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return n !== null && n !== null && Ic(n), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function E1(t, l) {
    if ($t !== 0 && $t !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (Ji() && t.callbackNode !== e)
      return null;
    var n = mt;
    return n = li(
      t,
      t === jt ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n === 0 ? null : (n1(t, n, l), M1(t, pl()), t.callbackNode != null && t.callbackNode === e ? E1.bind(null, t) : null);
  }
  function x1(t, l) {
    if (Ji()) return null;
    n1(t, l, !0);
  }
  function yp() {
    zp(function() {
      (At & 6) !== 0 ? Fc(
        sr,
        hp
      ) : b1();
    });
  }
  function Qf() {
    if (Qe === 0) {
      var t = ua;
      t === 0 && (t = Iu, Iu <<= 1, (Iu & 261888) === 0 && (Iu = 256)), Qe = t;
    }
    return Qe;
  }
  function T1(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ui("" + t);
  }
  function A1(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function mp(t, l, e, n, i) {
    if (l === "submit" && e && e.stateNode === i) {
      var o = T1(
        (i[fl] || null).action
      ), s = n.submitter;
      s && (l = (l = s[fl] || null) ? T1(l.formAction) : s.getAttribute("formAction"), l !== null && (o = l, s = null));
      var h = new fi(
        "action",
        "action",
        null,
        n,
        i
      );
      t.push({
        event: h,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (n.defaultPrevented) {
                if (Qe !== 0) {
                  var S = s ? A1(i, s) : new FormData(i);
                  ff(
                    e,
                    {
                      pending: !0,
                      data: S,
                      method: i.method,
                      action: o
                    },
                    null,
                    S
                  );
                }
              } else
                typeof o == "function" && (h.preventDefault(), S = s ? A1(i, s) : new FormData(i), ff(
                  e,
                  {
                    pending: !0,
                    data: S,
                    method: i.method,
                    action: o
                  },
                  o,
                  S
                ));
            },
            currentTarget: i
          }
        ]
      });
    }
  }
  for (var Zf = 0; Zf < Ao.length; Zf++) {
    var Vf = Ao[Zf], gp = Vf.toLowerCase(), pp = Vf[0].toUpperCase() + Vf.slice(1);
    Xl(
      gp,
      "on" + pp
    );
  }
  Xl(e0, "onAnimationEnd"), Xl(n0, "onAnimationIteration"), Xl(a0, "onAnimationStart"), Xl("dblclick", "onDoubleClick"), Xl("focusin", "onFocus"), Xl("focusout", "onBlur"), Xl(Ng, "onTransitionRun"), Xl(Ug, "onTransitionStart"), Xl(Hg, "onTransitionCancel"), Xl(u0, "onTransitionEnd"), Vn("onMouseEnter", ["mouseout", "mouseover"]), Vn("onMouseLeave", ["mouseout", "mouseover"]), Vn("onPointerEnter", ["pointerout", "pointerover"]), Vn("onPointerLeave", ["pointerout", "pointerover"]), sn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), sn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), sn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), sn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), sn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), sn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var bu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), vp = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(bu)
  );
  function z1(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var n = t[e], i = n.event;
      n = n.listeners;
      t: {
        var o = void 0;
        if (l)
          for (var s = n.length - 1; 0 <= s; s--) {
            var h = n[s], S = h.instance, O = h.currentTarget;
            if (h = h.listener, S !== o && i.isPropagationStopped())
              break t;
            o = h, i.currentTarget = O;
            try {
              o(i);
            } catch (H) {
              di(H);
            }
            i.currentTarget = null, o = S;
          }
        else
          for (s = 0; s < n.length; s++) {
            if (h = n[s], S = h.instance, O = h.currentTarget, h = h.listener, S !== o && i.isPropagationStopped())
              break t;
            o = h, i.currentTarget = O;
            try {
              o(i);
            } catch (H) {
              di(H);
            }
            i.currentTarget = null, o = S;
          }
      }
    }
  }
  function yt(t, l) {
    var e = l[eo];
    e === void 0 && (e = l[eo] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    e.has(n) || (_1(l, t, 2, !1), e.add(n));
  }
  function Kf(t, l, e) {
    var n = 0;
    l && (n |= 4), _1(
      e,
      t,
      n,
      l
    );
  }
  var Ii = "_reactListening" + Math.random().toString(36).slice(2);
  function $f(t) {
    if (!t[Ii]) {
      t[Ii] = !0, br.forEach(function(e) {
        e !== "selectionchange" && (vp.has(e) || Kf(e, !1, t), Kf(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[Ii] || (l[Ii] = !0, Kf("selectionchange", !1, l));
    }
  }
  function _1(t, l, e, n) {
    switch (eh(l)) {
      case 2:
        var i = Kp;
        break;
      case 8:
        i = $p;
        break;
      default:
        i = os;
    }
    e = i.bind(
      null,
      l,
      e,
      t
    ), i = void 0, !ro || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (i = !0), n ? i !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: i
    }) : t.addEventListener(l, e, !0) : i !== void 0 ? t.addEventListener(l, e, {
      passive: i
    }) : t.addEventListener(l, e, !1);
  }
  function kf(t, l, e, n, i) {
    var o = n;
    if ((l & 1) === 0 && (l & 2) === 0 && n !== null)
      t: for (; ; ) {
        if (n === null) return;
        var s = n.tag;
        if (s === 3 || s === 4) {
          var h = n.stateNode.containerInfo;
          if (h === i) break;
          if (s === 4)
            for (s = n.return; s !== null; ) {
              var S = s.tag;
              if ((S === 3 || S === 4) && s.stateNode.containerInfo === i)
                return;
              s = s.return;
            }
          for (; h !== null; ) {
            if (s = Xn(h), s === null) return;
            if (S = s.tag, S === 5 || S === 6 || S === 26 || S === 27) {
              n = o = s;
              continue t;
            }
            h = h.parentNode;
          }
        }
        n = n.return;
      }
    jr(function() {
      var O = o, H = fo(e), L = [];
      t: {
        var C = i0.get(t);
        if (C !== void 0) {
          var D = fi, P = t;
          switch (t) {
            case "keypress":
              if (ci(e) === 0) break t;
            case "keydown":
            case "keyup":
              D = rg;
              break;
            case "focusin":
              P = "focus", D = go;
              break;
            case "focusout":
              P = "blur", D = go;
              break;
            case "beforeblur":
            case "afterblur":
              D = go;
              break;
            case "click":
              if (e.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              D = Hr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              D = Pm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              D = yg;
              break;
            case e0:
            case n0:
            case a0:
              D = eg;
              break;
            case u0:
              D = gg;
              break;
            case "scroll":
            case "scrollend":
              D = Fm;
              break;
            case "wheel":
              D = vg;
              break;
            case "copy":
            case "cut":
            case "paste":
              D = ag;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              D = Lr;
              break;
            case "toggle":
            case "beforetoggle":
              D = bg;
          }
          var ut = (l & 4) !== 0, Rt = !ut && (t === "scroll" || t === "scrollend"), A = ut ? C !== null ? C + "Capture" : null : C;
          ut = [];
          for (var M = O, _; M !== null; ) {
            var B = M;
            if (_ = B.stateNode, B = B.tag, B !== 5 && B !== 26 && B !== 27 || _ === null || A === null || (B = Xa(M, A), B != null && ut.push(
              Mu(M, B, _)
            )), Rt) break;
            M = M.return;
          }
          0 < ut.length && (C = new D(
            C,
            P,
            null,
            e,
            H
          ), L.push({ event: C, listeners: ut }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (C = t === "mouseover" || t === "pointerover", D = t === "mouseout" || t === "pointerout", C && e !== oo && (P = e.relatedTarget || e.fromElement) && (Xn(P) || P[qn]))
            break t;
          if ((D || C) && (C = H.window === H ? H : (C = H.ownerDocument) ? C.defaultView || C.parentWindow : window, D ? (P = e.relatedTarget || e.toElement, D = O, P = P ? Xn(P) : null, P !== null && (Rt = d(P), ut = P.tag, P !== Rt || ut !== 5 && ut !== 27 && ut !== 6) && (P = null)) : (D = null, P = O), D !== P)) {
            if (ut = Hr, B = "onMouseLeave", A = "onMouseEnter", M = "mouse", (t === "pointerout" || t === "pointerover") && (ut = Lr, B = "onPointerLeave", A = "onPointerEnter", M = "pointer"), Rt = D == null ? C : qa(D), _ = P == null ? C : qa(P), C = new ut(
              B,
              M + "leave",
              D,
              e,
              H
            ), C.target = Rt, C.relatedTarget = _, B = null, Xn(H) === O && (ut = new ut(
              A,
              M + "enter",
              P,
              e,
              H
            ), ut.target = _, ut.relatedTarget = Rt, B = ut), Rt = B, D && P)
              l: {
                for (ut = Sp, A = D, M = P, _ = 0, B = A; B; B = ut(B))
                  _++;
                B = 0;
                for (var nt = M; nt; nt = ut(nt))
                  B++;
                for (; 0 < _ - B; )
                  A = ut(A), _--;
                for (; 0 < B - _; )
                  M = ut(M), B--;
                for (; _--; ) {
                  if (A === M || M !== null && A === M.alternate) {
                    ut = A;
                    break l;
                  }
                  A = ut(A), M = ut(M);
                }
                ut = null;
              }
            else ut = null;
            D !== null && O1(
              L,
              C,
              D,
              ut,
              !1
            ), P !== null && Rt !== null && O1(
              L,
              Rt,
              P,
              ut,
              !0
            );
          }
        }
        t: {
          if (C = O ? qa(O) : window, D = C.nodeName && C.nodeName.toLowerCase(), D === "select" || D === "input" && C.type === "file")
            var Et = Vr;
          else if (Qr(C))
            if (Kr)
              Et = Dg;
            else {
              Et = Og;
              var lt = _g;
            }
          else
            D = C.nodeName, !D || D.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? O && co(O.elementType) && (Et = Vr) : Et = Cg;
          if (Et && (Et = Et(t, O))) {
            Zr(
              L,
              Et,
              e,
              H
            );
            break t;
          }
          lt && lt(t, C, O), t === "focusout" && O && C.type === "number" && O.memoizedProps.value != null && io(C, "number", C.value);
        }
        switch (lt = O ? qa(O) : window, t) {
          case "focusin":
            (Qr(lt) || lt.contentEditable === "true") && (Fn = lt, Eo = O, Wa = null);
            break;
          case "focusout":
            Wa = Eo = Fn = null;
            break;
          case "mousedown":
            xo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            xo = !1, t0(L, e, H);
            break;
          case "selectionchange":
            if (jg) break;
          case "keydown":
          case "keyup":
            t0(L, e, H);
        }
        var rt;
        if (vo)
          t: {
            switch (t) {
              case "compositionstart":
                var gt = "onCompositionStart";
                break t;
              case "compositionend":
                gt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                gt = "onCompositionUpdate";
                break t;
            }
            gt = void 0;
          }
        else
          Wn ? qr(t, e) && (gt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (gt = "onCompositionStart");
        gt && (Yr && e.locale !== "ko" && (Wn || gt !== "onCompositionStart" ? gt === "onCompositionEnd" && Wn && (rt = Nr()) : (_e = H, ho = "value" in _e ? _e.value : _e.textContent, Wn = !0)), lt = Pi(O, gt), 0 < lt.length && (gt = new Br(
          gt,
          t,
          null,
          e,
          H
        ), L.push({ event: gt, listeners: lt }), rt ? gt.data = rt : (rt = Xr(e), rt !== null && (gt.data = rt)))), (rt = Eg ? xg(t, e) : Tg(t, e)) && (gt = Pi(O, "onBeforeInput"), 0 < gt.length && (lt = new Br(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          H
        ), L.push({
          event: lt,
          listeners: gt
        }), lt.data = rt)), mp(
          L,
          t,
          O,
          e,
          H
        );
      }
      z1(L, l);
    });
  }
  function Mu(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function Pi(t, l) {
    for (var e = l + "Capture", n = []; t !== null; ) {
      var i = t, o = i.stateNode;
      if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || o === null || (i = Xa(t, e), i != null && n.unshift(
        Mu(t, i, o)
      ), i = Xa(t, l), i != null && n.push(
        Mu(t, i, o)
      )), t.tag === 3) return n;
      t = t.return;
    }
    return [];
  }
  function Sp(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function O1(t, l, e, n, i) {
    for (var o = l._reactName, s = []; e !== null && e !== n; ) {
      var h = e, S = h.alternate, O = h.stateNode;
      if (h = h.tag, S !== null && S === n) break;
      h !== 5 && h !== 26 && h !== 27 || O === null || (S = O, i ? (O = Xa(e, o), O != null && s.unshift(
        Mu(e, O, S)
      )) : i || (O = Xa(e, o), O != null && s.push(
        Mu(e, O, S)
      ))), e = e.return;
    }
    s.length !== 0 && t.push({ event: l, listeners: s });
  }
  var bp = /\r\n?/g, Mp = /\u0000|\uFFFD/g;
  function C1(t) {
    return (typeof t == "string" ? t : "" + t).replace(bp, `
`).replace(Mp, "");
  }
  function D1(t, l) {
    return l = C1(l), C1(t) === l;
  }
  function Dt(t, l, e, n, i, o) {
    switch (e) {
      case "children":
        typeof n == "string" ? l === "body" || l === "textarea" && n === "" || $n(t, n) : (typeof n == "number" || typeof n == "bigint") && l !== "body" && $n(t, "" + n);
        break;
      case "className":
        ni(t, "class", n);
        break;
      case "tabIndex":
        ni(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ni(t, e, n);
        break;
      case "style":
        Dr(t, n, o);
        break;
      case "data":
        if (l !== "object") {
          ni(t, "data", n);
          break;
        }
      case "src":
      case "href":
        if (n === "" && (l !== "a" || e !== "href")) {
          t.removeAttribute(e);
          break;
        }
        if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(e);
          break;
        }
        n = ui("" + n), t.setAttribute(e, n);
        break;
      case "action":
      case "formAction":
        if (typeof n == "function") {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof o == "function" && (e === "formAction" ? (l !== "input" && Dt(t, l, "name", i.name, i, null), Dt(
            t,
            l,
            "formEncType",
            i.formEncType,
            i,
            null
          ), Dt(
            t,
            l,
            "formMethod",
            i.formMethod,
            i,
            null
          ), Dt(
            t,
            l,
            "formTarget",
            i.formTarget,
            i,
            null
          )) : (Dt(t, l, "encType", i.encType, i, null), Dt(t, l, "method", i.method, i, null), Dt(t, l, "target", i.target, i, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(e);
          break;
        }
        n = ui("" + n), t.setAttribute(e, n);
        break;
      case "onClick":
        n != null && (t.onclick = ae);
        break;
      case "onScroll":
        n != null && yt("scroll", t);
        break;
      case "onScrollEnd":
        n != null && yt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(f(61));
          if (e = n.__html, e != null) {
            if (i.children != null) throw Error(f(60));
            t.innerHTML = e;
          }
        }
        break;
      case "multiple":
        t.multiple = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "muted":
        t.muted = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        e = ui("" + n), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(e, "" + n) : t.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        n && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
        break;
      case "capture":
      case "download":
        n === !0 ? t.setAttribute(e, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(e, n) : t.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? t.setAttribute(e, n) : t.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? t.removeAttribute(e) : t.setAttribute(e, n);
        break;
      case "popover":
        yt("beforetoggle", t), yt("toggle", t), ei(t, "popover", n);
        break;
      case "xlinkActuate":
        ne(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        ne(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        ne(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        ne(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        ne(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        ne(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        ne(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        ne(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        ne(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        ei(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Jm.get(e) || e, ei(t, e, n));
    }
  }
  function Jf(t, l, e, n, i, o) {
    switch (e) {
      case "style":
        Dr(t, n, o);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(f(61));
          if (e = n.__html, e != null) {
            if (i.children != null) throw Error(f(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof n == "string" ? $n(t, n) : (typeof n == "number" || typeof n == "bigint") && $n(t, "" + n);
        break;
      case "onScroll":
        n != null && yt("scroll", t);
        break;
      case "onScrollEnd":
        n != null && yt("scrollend", t);
        break;
      case "onClick":
        n != null && (t.onclick = ae);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Mr.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (i = e.endsWith("Capture"), l = e.slice(2, i ? e.length - 7 : void 0), o = t[fl] || null, o = o != null ? o[e] : null, typeof o == "function" && t.removeEventListener(l, o, i), typeof n == "function")) {
              typeof o != "function" && o !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, n, i);
              break t;
            }
            e in t ? t[e] = n : n === !0 ? t.setAttribute(e, "") : ei(t, e, n);
          }
    }
  }
  function el(t, l, e) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        yt("error", t), yt("load", t);
        var n = !1, i = !1, o;
        for (o in e)
          if (e.hasOwnProperty(o)) {
            var s = e[o];
            if (s != null)
              switch (o) {
                case "src":
                  n = !0;
                  break;
                case "srcSet":
                  i = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(f(137, l));
                default:
                  Dt(t, l, o, s, e, null);
              }
          }
        i && Dt(t, l, "srcSet", e.srcSet, e, null), n && Dt(t, l, "src", e.src, e, null);
        return;
      case "input":
        yt("invalid", t);
        var h = o = s = i = null, S = null, O = null;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var H = e[n];
            if (H != null)
              switch (n) {
                case "name":
                  i = H;
                  break;
                case "type":
                  s = H;
                  break;
                case "checked":
                  S = H;
                  break;
                case "defaultChecked":
                  O = H;
                  break;
                case "value":
                  o = H;
                  break;
                case "defaultValue":
                  h = H;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (H != null)
                    throw Error(f(137, l));
                  break;
                default:
                  Dt(t, l, n, H, e, null);
              }
          }
        zr(
          t,
          o,
          h,
          S,
          O,
          s,
          i,
          !1
        );
        return;
      case "select":
        yt("invalid", t), n = s = o = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (h = e[i], h != null))
            switch (i) {
              case "value":
                o = h;
                break;
              case "defaultValue":
                s = h;
                break;
              case "multiple":
                n = h;
              default:
                Dt(t, l, i, h, e, null);
            }
        l = o, e = s, t.multiple = !!n, l != null ? Kn(t, !!n, l, !1) : e != null && Kn(t, !!n, e, !0);
        return;
      case "textarea":
        yt("invalid", t), o = i = n = null;
        for (s in e)
          if (e.hasOwnProperty(s) && (h = e[s], h != null))
            switch (s) {
              case "value":
                n = h;
                break;
              case "defaultValue":
                i = h;
                break;
              case "children":
                o = h;
                break;
              case "dangerouslySetInnerHTML":
                if (h != null) throw Error(f(91));
                break;
              default:
                Dt(t, l, s, h, e, null);
            }
        Or(t, n, i, o);
        return;
      case "option":
        for (S in e)
          if (e.hasOwnProperty(S) && (n = e[S], n != null))
            switch (S) {
              case "selected":
                t.selected = n && typeof n != "function" && typeof n != "symbol";
                break;
              default:
                Dt(t, l, S, n, e, null);
            }
        return;
      case "dialog":
        yt("beforetoggle", t), yt("toggle", t), yt("cancel", t), yt("close", t);
        break;
      case "iframe":
      case "object":
        yt("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < bu.length; n++)
          yt(bu[n], t);
        break;
      case "image":
        yt("error", t), yt("load", t);
        break;
      case "details":
        yt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        yt("error", t), yt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (O in e)
          if (e.hasOwnProperty(O) && (n = e[O], n != null))
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(f(137, l));
              default:
                Dt(t, l, O, n, e, null);
            }
        return;
      default:
        if (co(l)) {
          for (H in e)
            e.hasOwnProperty(H) && (n = e[H], n !== void 0 && Jf(
              t,
              l,
              H,
              n,
              e,
              void 0
            ));
          return;
        }
    }
    for (h in e)
      e.hasOwnProperty(h) && (n = e[h], n != null && Dt(t, l, h, n, e, null));
  }
  function Ep(t, l, e, n) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var i = null, o = null, s = null, h = null, S = null, O = null, H = null;
        for (D in e) {
          var L = e[D];
          if (e.hasOwnProperty(D) && L != null)
            switch (D) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                S = L;
              default:
                n.hasOwnProperty(D) || Dt(t, l, D, null, n, L);
            }
        }
        for (var C in n) {
          var D = n[C];
          if (L = e[C], n.hasOwnProperty(C) && (D != null || L != null))
            switch (C) {
              case "type":
                o = D;
                break;
              case "name":
                i = D;
                break;
              case "checked":
                O = D;
                break;
              case "defaultChecked":
                H = D;
                break;
              case "value":
                s = D;
                break;
              case "defaultValue":
                h = D;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (D != null)
                  throw Error(f(137, l));
                break;
              default:
                D !== L && Dt(
                  t,
                  l,
                  C,
                  D,
                  n,
                  L
                );
            }
        }
        uo(
          t,
          s,
          h,
          S,
          O,
          H,
          o,
          i
        );
        return;
      case "select":
        D = s = h = C = null;
        for (o in e)
          if (S = e[o], e.hasOwnProperty(o) && S != null)
            switch (o) {
              case "value":
                break;
              case "multiple":
                D = S;
              default:
                n.hasOwnProperty(o) || Dt(
                  t,
                  l,
                  o,
                  null,
                  n,
                  S
                );
            }
        for (i in n)
          if (o = n[i], S = e[i], n.hasOwnProperty(i) && (o != null || S != null))
            switch (i) {
              case "value":
                C = o;
                break;
              case "defaultValue":
                h = o;
                break;
              case "multiple":
                s = o;
              default:
                o !== S && Dt(
                  t,
                  l,
                  i,
                  o,
                  n,
                  S
                );
            }
        l = h, e = s, n = D, C != null ? Kn(t, !!e, C, !1) : !!n != !!e && (l != null ? Kn(t, !!e, l, !0) : Kn(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        D = C = null;
        for (h in e)
          if (i = e[h], e.hasOwnProperty(h) && i != null && !n.hasOwnProperty(h))
            switch (h) {
              case "value":
                break;
              case "children":
                break;
              default:
                Dt(t, l, h, null, n, i);
            }
        for (s in n)
          if (i = n[s], o = e[s], n.hasOwnProperty(s) && (i != null || o != null))
            switch (s) {
              case "value":
                C = i;
                break;
              case "defaultValue":
                D = i;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(f(91));
                break;
              default:
                i !== o && Dt(t, l, s, i, n, o);
            }
        _r(t, C, D);
        return;
      case "option":
        for (var P in e)
          if (C = e[P], e.hasOwnProperty(P) && C != null && !n.hasOwnProperty(P))
            switch (P) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Dt(
                  t,
                  l,
                  P,
                  null,
                  n,
                  C
                );
            }
        for (S in n)
          if (C = n[S], D = e[S], n.hasOwnProperty(S) && C !== D && (C != null || D != null))
            switch (S) {
              case "selected":
                t.selected = C && typeof C != "function" && typeof C != "symbol";
                break;
              default:
                Dt(
                  t,
                  l,
                  S,
                  C,
                  n,
                  D
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ut in e)
          C = e[ut], e.hasOwnProperty(ut) && C != null && !n.hasOwnProperty(ut) && Dt(t, l, ut, null, n, C);
        for (O in n)
          if (C = n[O], D = e[O], n.hasOwnProperty(O) && C !== D && (C != null || D != null))
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null)
                  throw Error(f(137, l));
                break;
              default:
                Dt(
                  t,
                  l,
                  O,
                  C,
                  n,
                  D
                );
            }
        return;
      default:
        if (co(l)) {
          for (var Rt in e)
            C = e[Rt], e.hasOwnProperty(Rt) && C !== void 0 && !n.hasOwnProperty(Rt) && Jf(
              t,
              l,
              Rt,
              void 0,
              n,
              C
            );
          for (H in n)
            C = n[H], D = e[H], !n.hasOwnProperty(H) || C === D || C === void 0 && D === void 0 || Jf(
              t,
              l,
              H,
              C,
              n,
              D
            );
          return;
        }
    }
    for (var A in e)
      C = e[A], e.hasOwnProperty(A) && C != null && !n.hasOwnProperty(A) && Dt(t, l, A, null, n, C);
    for (L in n)
      C = n[L], D = e[L], !n.hasOwnProperty(L) || C === D || C == null && D == null || Dt(t, l, L, C, n, D);
  }
  function R1(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function xp() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), n = 0; n < e.length; n++) {
        var i = e[n], o = i.transferSize, s = i.initiatorType, h = i.duration;
        if (o && h && R1(s)) {
          for (s = 0, h = i.responseEnd, n += 1; n < e.length; n++) {
            var S = e[n], O = S.startTime;
            if (O > h) break;
            var H = S.transferSize, L = S.initiatorType;
            H && R1(L) && (S = S.responseEnd, s += H * (S < h ? 1 : (h - O) / (S - O)));
          }
          if (--n, l += 8 * (o + s) / (i.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Wf = null, Ff = null;
  function tc(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function j1(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function N1(t, l) {
    if (t === 0)
      switch (l) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === "foreignObject" ? 0 : t;
  }
  function If(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var Pf = null;
  function Tp() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Pf ? !1 : (Pf = t, !0) : (Pf = null, !1);
  }
  var U1 = typeof setTimeout == "function" ? setTimeout : void 0, Ap = typeof clearTimeout == "function" ? clearTimeout : void 0, H1 = typeof Promise == "function" ? Promise : void 0, zp = typeof queueMicrotask == "function" ? queueMicrotask : typeof H1 < "u" ? function(t) {
    return H1.resolve(null).then(t).catch(_p);
  } : U1;
  function _p(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ze(t) {
    return t === "head";
  }
  function B1(t, l) {
    var e = l, n = 0;
    do {
      var i = e.nextSibling;
      if (t.removeChild(e), i && i.nodeType === 8)
        if (e = i.data, e === "/$" || e === "/&") {
          if (n === 0) {
            t.removeChild(i), Ta(l);
            return;
          }
          n--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          n++;
        else if (e === "html")
          Eu(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, Eu(e);
          for (var o = e.firstChild; o; ) {
            var s = o.nextSibling, h = o.nodeName;
            o[Ga] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && o.rel.toLowerCase() === "stylesheet" || e.removeChild(o), o = s;
          }
        } else
          e === "body" && Eu(t.ownerDocument.body);
      e = i;
    } while (e);
    Ta(l);
  }
  function L1(t, l) {
    var e = t;
    t = 0;
    do {
      var n = e.nextSibling;
      if (e.nodeType === 1 ? l ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (l ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), n && n.nodeType === 8)
        if (e = n.data, e === "/$") {
          if (t === 0) break;
          t--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || t++;
      e = n;
    } while (e);
  }
  function ts(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ts(e), no(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(e);
    }
  }
  function Op(t, l, e, n) {
    for (; t.nodeType === 1; ) {
      var i = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (n) {
        if (!t[Ga])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (o = t.getAttribute("rel"), o === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (o !== i.rel || t.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || t.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || t.getAttribute("title") !== (i.title == null ? null : i.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (o = t.getAttribute("src"), (o !== (i.src == null ? null : i.src) || t.getAttribute("type") !== (i.type == null ? null : i.type) || t.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && o && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var o = i.name == null ? null : "" + i.name;
        if (i.type === "hidden" && t.getAttribute("name") === o)
          return t;
      } else return t;
      if (t = Ll(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Cp(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Ll(t.nextSibling), t === null)) return null;
    return t;
  }
  function Y1(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Ll(t.nextSibling), t === null)) return null;
    return t;
  }
  function ls(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function es(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Dp(t, l) {
    var e = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || e.readyState !== "loading")
      l();
    else {
      var n = function() {
        l(), e.removeEventListener("DOMContentLoaded", n);
      };
      e.addEventListener("DOMContentLoaded", n), t._reactRetry = n;
    }
  }
  function Ll(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&" || l === "F!" || l === "F")
          break;
        if (l === "/$" || l === "/&") return null;
      }
    }
    return t;
  }
  var ns = null;
  function w1(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return Ll(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function G1(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (l === 0) return t;
          l--;
        } else e !== "/$" && e !== "/&" || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function q1(t, l, e) {
    switch (l = tc(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(f(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(f(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(f(454));
        return t;
      default:
        throw Error(f(451));
    }
  }
  function Eu(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    no(t);
  }
  var Yl = /* @__PURE__ */ new Map(), X1 = /* @__PURE__ */ new Set();
  function lc(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var be = $.d;
  $.d = {
    f: Rp,
    r: jp,
    D: Np,
    C: Up,
    L: Hp,
    m: Bp,
    X: Yp,
    S: Lp,
    M: wp
  };
  function Rp() {
    var t = be.f(), l = Ki();
    return t || l;
  }
  function jp(t) {
    var l = Qn(t);
    l !== null && l.tag === 5 && l.type === "form" ? ud(l) : be.r(t);
  }
  var Ma = typeof document > "u" ? null : document;
  function Q1(t, l, e) {
    var n = Ma;
    if (n && typeof l == "string" && l) {
      var i = Dl(l);
      i = 'link[rel="' + t + '"][href="' + i + '"]', typeof e == "string" && (i += '[crossorigin="' + e + '"]'), X1.has(i) || (X1.add(i), t = { rel: t, crossOrigin: e, href: l }, n.querySelector(i) === null && (l = n.createElement("link"), el(l, "link", t), Jt(l), n.head.appendChild(l)));
    }
  }
  function Np(t) {
    be.D(t), Q1("dns-prefetch", t, null);
  }
  function Up(t, l) {
    be.C(t, l), Q1("preconnect", t, l);
  }
  function Hp(t, l, e) {
    be.L(t, l, e);
    var n = Ma;
    if (n && t && l) {
      var i = 'link[rel="preload"][as="' + Dl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (i += '[imagesrcset="' + Dl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (i += '[imagesizes="' + Dl(
        e.imageSizes
      ) + '"]')) : i += '[href="' + Dl(t) + '"]';
      var o = i;
      switch (l) {
        case "style":
          o = Ea(t);
          break;
        case "script":
          o = xa(t);
      }
      Yl.has(o) || (t = b(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Yl.set(o, t), n.querySelector(i) !== null || l === "style" && n.querySelector(xu(o)) || l === "script" && n.querySelector(Tu(o)) || (l = n.createElement("link"), el(l, "link", t), Jt(l), n.head.appendChild(l)));
    }
  }
  function Bp(t, l) {
    be.m(t, l);
    var e = Ma;
    if (e && t) {
      var n = l && typeof l.as == "string" ? l.as : "script", i = 'link[rel="modulepreload"][as="' + Dl(n) + '"][href="' + Dl(t) + '"]', o = i;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          o = xa(t);
      }
      if (!Yl.has(o) && (t = b({ rel: "modulepreload", href: t }, l), Yl.set(o, t), e.querySelector(i) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Tu(o)))
              return;
        }
        n = e.createElement("link"), el(n, "link", t), Jt(n), e.head.appendChild(n);
      }
    }
  }
  function Lp(t, l, e) {
    be.S(t, l, e);
    var n = Ma;
    if (n && t) {
      var i = Zn(n).hoistableStyles, o = Ea(t);
      l = l || "default";
      var s = i.get(o);
      if (!s) {
        var h = { loading: 0, preload: null };
        if (s = n.querySelector(
          xu(o)
        ))
          h.loading = 5;
        else {
          t = b(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Yl.get(o)) && as(t, e);
          var S = s = n.createElement("link");
          Jt(S), el(S, "link", t), S._p = new Promise(function(O, H) {
            S.onload = O, S.onerror = H;
          }), S.addEventListener("load", function() {
            h.loading |= 1;
          }), S.addEventListener("error", function() {
            h.loading |= 2;
          }), h.loading |= 4, ec(s, l, n);
        }
        s = {
          type: "stylesheet",
          instance: s,
          count: 1,
          state: h
        }, i.set(o, s);
      }
    }
  }
  function Yp(t, l) {
    be.X(t, l);
    var e = Ma;
    if (e && t) {
      var n = Zn(e).hoistableScripts, i = xa(t), o = n.get(i);
      o || (o = e.querySelector(Tu(i)), o || (t = b({ src: t, async: !0 }, l), (l = Yl.get(i)) && us(t, l), o = e.createElement("script"), Jt(o), el(o, "link", t), e.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, n.set(i, o));
    }
  }
  function wp(t, l) {
    be.M(t, l);
    var e = Ma;
    if (e && t) {
      var n = Zn(e).hoistableScripts, i = xa(t), o = n.get(i);
      o || (o = e.querySelector(Tu(i)), o || (t = b({ src: t, async: !0, type: "module" }, l), (l = Yl.get(i)) && us(t, l), o = e.createElement("script"), Jt(o), el(o, "link", t), e.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, n.set(i, o));
    }
  }
  function Z1(t, l, e, n) {
    var i = (i = dt.current) ? lc(i) : null;
    if (!i) throw Error(f(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = Ea(e.href), e = Zn(
          i
        ).hoistableStyles, n = e.get(l), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = Ea(e.href);
          var o = Zn(
            i
          ).hoistableStyles, s = o.get(t);
          if (s || (i = i.ownerDocument || i, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, o.set(t, s), (o = i.querySelector(
            xu(t)
          )) && !o._p && (s.instance = o, s.state.loading = 5), Yl.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Yl.set(t, e), o || Gp(
            i,
            t,
            e,
            s.state
          ))), l && n === null)
            throw Error(f(528, ""));
          return s;
        }
        if (l && n !== null)
          throw Error(f(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = xa(e), e = Zn(
          i
        ).hoistableScripts, n = e.get(l), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, n)), n) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(f(444, t));
    }
  }
  function Ea(t) {
    return 'href="' + Dl(t) + '"';
  }
  function xu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function V1(t) {
    return b({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Gp(t, l, e, n) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? n.loading = 1 : (l = t.createElement("link"), n.preload = l, l.addEventListener("load", function() {
      return n.loading |= 1;
    }), l.addEventListener("error", function() {
      return n.loading |= 2;
    }), el(l, "link", e), Jt(l), t.head.appendChild(l));
  }
  function xa(t) {
    return '[src="' + Dl(t) + '"]';
  }
  function Tu(t) {
    return "script[async]" + t;
  }
  function K1(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var n = t.querySelector(
            'style[data-href~="' + Dl(e.href) + '"]'
          );
          if (n)
            return l.instance = n, Jt(n), n;
          var i = b({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return n = (t.ownerDocument || t).createElement(
            "style"
          ), Jt(n), el(n, "style", i), ec(n, e.precedence, t), l.instance = n;
        case "stylesheet":
          i = Ea(e.href);
          var o = t.querySelector(
            xu(i)
          );
          if (o)
            return l.state.loading |= 4, l.instance = o, Jt(o), o;
          n = V1(e), (i = Yl.get(i)) && as(n, i), o = (t.ownerDocument || t).createElement("link"), Jt(o);
          var s = o;
          return s._p = new Promise(function(h, S) {
            s.onload = h, s.onerror = S;
          }), el(o, "link", n), l.state.loading |= 4, ec(o, e.precedence, t), l.instance = o;
        case "script":
          return o = xa(e.src), (i = t.querySelector(
            Tu(o)
          )) ? (l.instance = i, Jt(i), i) : (n = e, (i = Yl.get(o)) && (n = b({}, e), us(n, i)), t = t.ownerDocument || t, i = t.createElement("script"), Jt(i), el(i, "link", n), t.head.appendChild(i), l.instance = i);
        case "void":
          return null;
        default:
          throw Error(f(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (n = l.instance, l.state.loading |= 4, ec(n, e.precedence, t));
    return l.instance;
  }
  function ec(t, l, e) {
    for (var n = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), i = n.length ? n[n.length - 1] : null, o = i, s = 0; s < n.length; s++) {
      var h = n[s];
      if (h.dataset.precedence === l) o = h;
      else if (o !== i) break;
    }
    o ? o.parentNode.insertBefore(t, o.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function as(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function us(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var nc = null;
  function $1(t, l, e) {
    if (nc === null) {
      var n = /* @__PURE__ */ new Map(), i = nc = /* @__PURE__ */ new Map();
      i.set(e, n);
    } else
      i = nc, n = i.get(e), n || (n = /* @__PURE__ */ new Map(), i.set(e, n));
    if (n.has(t)) return n;
    for (n.set(t, null), e = e.getElementsByTagName(t), i = 0; i < e.length; i++) {
      var o = e[i];
      if (!(o[Ga] || o[It] || t === "link" && o.getAttribute("rel") === "stylesheet") && o.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = o.getAttribute(l) || "";
        s = t + s;
        var h = n.get(s);
        h ? h.push(o) : n.set(s, [o]);
      }
    }
    return n;
  }
  function k1(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function qp(t, l, e) {
    if (e === 1 || l.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "")
          break;
        return !0;
      case "link":
        if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError)
          break;
        switch (l.rel) {
          case "stylesheet":
            return t = l.disabled, typeof l.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string")
          return !0;
    }
    return !1;
  }
  function J1(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Xp(t, l, e, n) {
    if (e.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var i = Ea(n.href), o = l.querySelector(
          xu(i)
        );
        if (o) {
          l = o._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = ac.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = o, Jt(o);
          return;
        }
        o = l.ownerDocument || l, n = V1(n), (i = Yl.get(i)) && as(n, i), o = o.createElement("link"), Jt(o);
        var s = o;
        s._p = new Promise(function(h, S) {
          s.onload = h, s.onerror = S;
        }), el(o, "link", n), e.instance = o;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = ac.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var is = 0;
  function Qp(t, l) {
    return t.stylesheets && t.count === 0 && ic(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var n = setTimeout(function() {
        if (t.stylesheets && ic(t, t.stylesheets), t.unsuspend) {
          var o = t.unsuspend;
          t.unsuspend = null, o();
        }
      }, 6e4 + l);
      0 < t.imgBytes && is === 0 && (is = 62500 * xp());
      var i = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && ic(t, t.stylesheets), t.unsuspend)) {
            var o = t.unsuspend;
            t.unsuspend = null, o();
          }
        },
        (t.imgBytes > is ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(i);
      };
    } : null;
  }
  function ac() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ic(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var uc = null;
  function ic(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, uc = /* @__PURE__ */ new Map(), l.forEach(Zp, t), uc = null, ac.call(t));
  }
  function Zp(t, l) {
    if (!(l.state.loading & 4)) {
      var e = uc.get(t);
      if (e) var n = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), uc.set(t, e);
        for (var i = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), o = 0; o < i.length; o++) {
          var s = i[o];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (e.set(s.dataset.precedence, s), n = s);
        }
        n && e.set(null, n);
      }
      i = l.instance, s = i.getAttribute("data-precedence"), o = e.get(s) || n, o === n && e.set(null, i), e.set(s, i), this.count++, n = ac.bind(this), i.addEventListener("load", n), i.addEventListener("error", n), o ? o.parentNode.insertBefore(i, o.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(i, t.firstChild)), l.state.loading |= 4;
    }
  }
  var Au = {
    $$typeof: V,
    Provider: null,
    Consumer: null,
    _currentValue: et,
    _currentValue2: et,
    _threadCount: 0
  };
  function Vp(t, l, e, n, i, o, s, h, S) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Pc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Pc(0), this.hiddenUpdates = Pc(null), this.identifierPrefix = n, this.onUncaughtError = i, this.onCaughtError = o, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = S, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function W1(t, l, e, n, i, o, s, h, S, O, H, L) {
    return t = new Vp(
      t,
      l,
      e,
      s,
      S,
      O,
      H,
      L,
      h
    ), l = 1, o === !0 && (l |= 24), o = Ml(3, null, null, l), t.current = o, o.stateNode = t, l = Yo(), l.refCount++, t.pooledCache = l, l.refCount++, o.memoizedState = {
      element: n,
      isDehydrated: e,
      cache: l
    }, Xo(o), t;
  }
  function F1(t) {
    return t ? (t = ta, t) : ta;
  }
  function I1(t, l, e, n, i, o) {
    i = F1(i), n.context === null ? n.context = i : n.pendingContext = i, n = Ne(l), n.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (n.callback = o), e = Ue(t, n, l), e !== null && (ml(e, t, l), nu(e, t, l));
  }
  function P1(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function cs(t, l) {
    P1(t, l), (t = t.alternate) && P1(t, l);
  }
  function th(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = yn(t, 67108864);
      l !== null && ml(l, t, 67108864), cs(t, 67108864);
    }
  }
  function lh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = zl();
      l = to(l);
      var e = yn(t, l);
      e !== null && ml(e, t, l), cs(t, l);
    }
  }
  var cc = !0;
  function Kp(t, l, e, n) {
    var i = U.T;
    U.T = null;
    var o = $.p;
    try {
      $.p = 2, os(t, l, e, n);
    } finally {
      $.p = o, U.T = i;
    }
  }
  function $p(t, l, e, n) {
    var i = U.T;
    U.T = null;
    var o = $.p;
    try {
      $.p = 8, os(t, l, e, n);
    } finally {
      $.p = o, U.T = i;
    }
  }
  function os(t, l, e, n) {
    if (cc) {
      var i = fs(n);
      if (i === null)
        kf(
          t,
          l,
          n,
          oc,
          e
        ), nh(t, n);
      else if (Jp(
        i,
        t,
        l,
        e,
        n
      ))
        n.stopPropagation();
      else if (nh(t, n), l & 4 && -1 < kp.indexOf(t)) {
        for (; i !== null; ) {
          var o = Qn(i);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (o = o.stateNode, o.current.memoizedState.isDehydrated) {
                  var s = fn(o.pendingLanes);
                  if (s !== 0) {
                    var h = o;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; s; ) {
                      var S = 1 << 31 - Sl(s);
                      h.entanglements[1] |= S, s &= ~S;
                    }
                    Il(o), (At & 6) === 0 && (Zi = pl() + 500, Su(0));
                  }
                }
                break;
              case 31:
              case 13:
                h = yn(o, 2), h !== null && ml(h, o, 2), Ki(), cs(o, 2);
            }
          if (o = fs(n), o === null && kf(
            t,
            l,
            n,
            oc,
            e
          ), o === i) break;
          i = o;
        }
        i !== null && n.stopPropagation();
      } else
        kf(
          t,
          l,
          n,
          null,
          e
        );
    }
  }
  function fs(t) {
    return t = fo(t), ss(t);
  }
  var oc = null;
  function ss(t) {
    if (oc = null, t = Xn(t), t !== null) {
      var l = d(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = m(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = p(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return oc = t, null;
  }
  function eh(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Nm()) {
          case sr:
            return 2;
          case rr:
            return 8;
          case Fu:
          case Um:
            return 32;
          case dr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var rs = !1, Ve = null, Ke = null, $e = null, zu = /* @__PURE__ */ new Map(), _u = /* @__PURE__ */ new Map(), ke = [], kp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function nh(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ve = null;
        break;
      case "dragenter":
      case "dragleave":
        Ke = null;
        break;
      case "mouseover":
      case "mouseout":
        $e = null;
        break;
      case "pointerover":
      case "pointerout":
        zu.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        _u.delete(l.pointerId);
    }
  }
  function Ou(t, l, e, n, i, o) {
    return t === null || t.nativeEvent !== o ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: n,
      nativeEvent: o,
      targetContainers: [i]
    }, l !== null && (l = Qn(l), l !== null && th(l)), t) : (t.eventSystemFlags |= n, l = t.targetContainers, i !== null && l.indexOf(i) === -1 && l.push(i), t);
  }
  function Jp(t, l, e, n, i) {
    switch (l) {
      case "focusin":
        return Ve = Ou(
          Ve,
          t,
          l,
          e,
          n,
          i
        ), !0;
      case "dragenter":
        return Ke = Ou(
          Ke,
          t,
          l,
          e,
          n,
          i
        ), !0;
      case "mouseover":
        return $e = Ou(
          $e,
          t,
          l,
          e,
          n,
          i
        ), !0;
      case "pointerover":
        var o = i.pointerId;
        return zu.set(
          o,
          Ou(
            zu.get(o) || null,
            t,
            l,
            e,
            n,
            i
          )
        ), !0;
      case "gotpointercapture":
        return o = i.pointerId, _u.set(
          o,
          Ou(
            _u.get(o) || null,
            t,
            l,
            e,
            n,
            i
          )
        ), !0;
    }
    return !1;
  }
  function ah(t) {
    var l = Xn(t.target);
    if (l !== null) {
      var e = d(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = m(e), l !== null) {
            t.blockedOn = l, vr(t.priority, function() {
              lh(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = p(e), l !== null) {
            t.blockedOn = l, vr(t.priority, function() {
              lh(e);
            });
            return;
          }
        } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function fc(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = fs(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var n = new e.constructor(
          e.type,
          e
        );
        oo = n, e.target.dispatchEvent(n), oo = null;
      } else
        return l = Qn(e), l !== null && th(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function uh(t, l, e) {
    fc(t) && e.delete(l);
  }
  function Wp() {
    rs = !1, Ve !== null && fc(Ve) && (Ve = null), Ke !== null && fc(Ke) && (Ke = null), $e !== null && fc($e) && ($e = null), zu.forEach(uh), _u.forEach(uh);
  }
  function sc(t, l) {
    t.blockedOn === l && (t.blockedOn = null, rs || (rs = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      Wp
    )));
  }
  var rc = null;
  function ih(t) {
    rc !== t && (rc = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        rc === t && (rc = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], n = t[l + 1], i = t[l + 2];
          if (typeof n != "function") {
            if (ss(n || e) === null)
              continue;
            break;
          }
          var o = Qn(e);
          o !== null && (t.splice(l, 3), l -= 3, ff(
            o,
            {
              pending: !0,
              data: i,
              method: e.method,
              action: n
            },
            n,
            i
          ));
        }
      }
    ));
  }
  function Ta(t) {
    function l(S) {
      return sc(S, t);
    }
    Ve !== null && sc(Ve, t), Ke !== null && sc(Ke, t), $e !== null && sc($e, t), zu.forEach(l), _u.forEach(l);
    for (var e = 0; e < ke.length; e++) {
      var n = ke[e];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < ke.length && (e = ke[0], e.blockedOn === null); )
      ah(e), e.blockedOn === null && ke.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (n = 0; n < e.length; n += 3) {
        var i = e[n], o = e[n + 1], s = i[fl] || null;
        if (typeof o == "function")
          s || ih(e);
        else if (s) {
          var h = null;
          if (o && o.hasAttribute("formAction")) {
            if (i = o, s = o[fl] || null)
              h = s.formAction;
            else if (ss(i) !== null) continue;
          } else h = s.action;
          typeof h == "function" ? e[n + 1] = h : (e.splice(n, 3), n -= 3), ih(e);
        }
      }
  }
  function ch() {
    function t(o) {
      o.canIntercept && o.info === "react-transition" && o.intercept({
        handler: function() {
          return new Promise(function(s) {
            return i = s;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function l() {
      i !== null && (i(), i = null), n || setTimeout(e, 20);
    }
    function e() {
      if (!n && !navigation.transition) {
        var o = navigation.currentEntry;
        o && o.url != null && navigation.navigate(o.url, {
          state: o.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var n = !1, i = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        n = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), i !== null && (i(), i = null);
      };
    }
  }
  function ds(t) {
    this._internalRoot = t;
  }
  dc.prototype.render = ds.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(f(409));
    var e = l.current, n = zl();
    I1(e, n, t, l, null, null);
  }, dc.prototype.unmount = ds.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      I1(t.current, 2, null, t, null, null), Ki(), l[qn] = null;
    }
  };
  function dc(t) {
    this._internalRoot = t;
  }
  dc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = pr();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < ke.length && l !== 0 && l < ke[e].priority; e++) ;
      ke.splice(e, 0, t), e === 0 && ah(t);
    }
  };
  var oh = u.version;
  if (oh !== "19.2.0")
    throw Error(
      f(
        527,
        oh,
        "19.2.0"
      )
    );
  $.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(f(188)) : (t = Object.keys(t).join(","), Error(f(268, t)));
    return t = y(l), t = t !== null ? v(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Fp = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.2.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var hc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hc.isDisabled && hc.supportsFiber)
      try {
        La = hc.inject(
          Fp
        ), vl = hc;
      } catch {
      }
  }
  return Bu.createRoot = function(t, l) {
    if (!r(t)) throw Error(f(299));
    var e = !1, n = "", i = md, o = gd, s = pd;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (i = l.onUncaughtError), l.onCaughtError !== void 0 && (o = l.onCaughtError), l.onRecoverableError !== void 0 && (s = l.onRecoverableError)), l = W1(
      t,
      1,
      !1,
      null,
      null,
      e,
      n,
      null,
      i,
      o,
      s,
      ch
    ), t[qn] = l.current, $f(t), new ds(l);
  }, Bu.hydrateRoot = function(t, l, e) {
    if (!r(t)) throw Error(f(299));
    var n = !1, i = "", o = md, s = gd, h = pd, S = null;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (i = e.identifierPrefix), e.onUncaughtError !== void 0 && (o = e.onUncaughtError), e.onCaughtError !== void 0 && (s = e.onCaughtError), e.onRecoverableError !== void 0 && (h = e.onRecoverableError), e.formState !== void 0 && (S = e.formState)), l = W1(
      t,
      1,
      !0,
      l,
      e ?? null,
      n,
      i,
      S,
      o,
      s,
      h,
      ch
    ), l.context = F1(null), e = l.current, n = zl(), n = to(n), i = Ne(n), i.callback = null, Ue(e, i, n), e = n, l.current.lanes = e, wa(l, e), Il(l), t[qn] = l.current, $f(t), new dc(l);
  }, Bu.version = "19.2.0", Bu;
}
var my;
function Gb() {
  if (my) return As.exports;
  my = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (u) {
        console.error(u);
      }
  }
  return a(), As.exports = wb(), As.exports;
}
var qb = Gb();
let Ua = null;
function cn(a) {
  return document.getElementById(a);
}
function _m(a) {
  const u = cn("emptyMsg");
  u && (u.style.display = a ? "block" : "none");
}
function Ks() {
  Ua && (Ua.unmount(), Ua = null);
  const a = cn("replay-root");
  a && (a.style.display = "none"), _m(!0);
}
function Om(a) {
  const u = cn("replay-root");
  if (!u) return;
  const c = a.trim();
  if (!c) {
    Ks();
    return;
  }
  u.style.display = "block", _m(!1), Ua || (Ua = qb.createRoot(u)), Ua.render(/* @__PURE__ */ z.jsx(Ub, { encoded: c, onExit: Ks })), u.scrollIntoView?.({ behavior: "smooth", block: "center" });
}
function Cm() {
  const a = location.hash.match(/replay=([^&]+)/);
  if (!a) return;
  const u = decodeURIComponent(a[1]), c = cn("codeInput");
  c && (c.value = u), Om(u);
}
cn("viewBtn")?.addEventListener("click", () => {
  Om(cn("codeInput")?.value ?? "");
});
cn("clearBtn")?.addEventListener("click", () => {
  const a = cn("codeInput");
  a && (a.value = ""), location.hash && history.replaceState(null, "", location.pathname), Ks();
});
window.addEventListener("hashchange", Cm);
Cm();
