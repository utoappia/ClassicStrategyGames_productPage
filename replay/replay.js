var av = Object.defineProperty;
var uv = (a, u, c) => u in a ? av(a, u, { enumerable: !0, configurable: !0, writable: !0, value: c }) : a[u] = c;
var ms = (a, u, c) => uv(a, typeof u != "symbol" ? u + "" : u, c);
var gs = { exports: {} }, Ru = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rh;
function iv() {
  if (rh) return Ru;
  rh = 1;
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
  return Ru.Fragment = u, Ru.jsx = c, Ru.jsxs = c, Ru;
}
var dh;
function cv() {
  return dh || (dh = 1, gs.exports = iv()), gs.exports;
}
var z = cv();
const Ws = "ggr-piece-fade", Sy = "ggr-piece-pop", by = "ggr-piece-drop", La = "ggr-board-cell", My = "ggr-piece-flip", Fs = "ggr-piece-hop", hh = "ggr-board-animations", ov = `
@keyframes ${Ws} {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes ${Sy} {
  0%   { transform: scale(0); }
  72%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}
@keyframes ${by} {
  0%   { transform: translateY(var(--ggr-drop, 0)); animation-timing-function: cubic-bezier(0.5, 0, 1, 1); }
  62%  { transform: translateY(0); animation-timing-function: ease-out; }
  79%  { transform: translateY(-9%); animation-timing-function: ease-in; }
  100% { transform: translateY(0); }
}
@keyframes ${La} {
  from { opacity: 0; transform: scale(0.6); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes ${My} {
  from { transform: rotateY(0deg); }
  to   { transform: rotateY(180deg); }
}
@keyframes ${Fs} {
  0%   { transform: translate(var(--hop-x, 0px), var(--hop-y, 0px)); }
  50%  { transform: translate(var(--hop-mx, 0px), var(--hop-my, 0px)); }
  100% { transform: translate(0px, 0px); }
}
`;
function fv() {
  if (typeof document > "u" || document.getElementById(hh)) return;
  const a = document.createElement("style");
  a.id = hh, a.textContent = ov, document.head.appendChild(a);
}
const Ey = /* @__PURE__ */ new Map();
function ql(a, u) {
  Ey.set(a, u);
}
function sv(a) {
  return Ey.get(a);
}
function rv(a) {
  let u = a >>> 0;
  return () => {
    u = u + 1831565813 | 0;
    let c = Math.imul(u ^ u >>> 15, 1 | u);
    return c = c + Math.imul(c ^ c >>> 7, 61 | c) ^ c, ((c ^ c >>> 14) >>> 0) / 4294967296;
  };
}
function Bn(a, u) {
  if (a.length === 0) throw new Error("pickRandom: empty array");
  return a[Math.floor(u() * a.length)];
}
function dv(a, u) {
  const c = [...a];
  for (let f = c.length - 1; f > 0; f--) {
    const r = Math.floor(u() * (f + 1));
    [c[f], c[r]] = [c[r], c[f]];
  }
  return c;
}
class hv {
  constructor() {
    ms(this, "games", /* @__PURE__ */ new Map());
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
const ku = new hv(), yv = [
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
], mv = 1, yh = 4, gv = Object.freeze({});
function pv(a) {
  return a <= 1 ? 0 : 32 - Math.clz32(a - 1);
}
class vv {
  constructor(u, c) {
    ms(this, "pos");
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
function Sv(a, u) {
  let c = 2166136261;
  for (let f = 0; f < u; f++)
    c ^= a[f] ?? 0, c = Math.imul(c, 16777619);
  return c >>> 0;
}
const mh = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
function bv(a) {
  const u = new Int16Array(128).fill(-1);
  for (let d = 0; d < mh.length; d++) u[mh.charCodeAt(d)] = d;
  const c = [];
  let f = 0, r = 0;
  for (let d = 0; d < a.length; d++) {
    const m = u[a.charCodeAt(d)] ?? -1;
    m < 0 || (f = f << 6 | m, r += 6, r >= 8 && (r -= 8, c.push(f >> r & 255)));
  }
  return Uint8Array.from(c);
}
function xy(a) {
  let u = "";
  for (let c = 0; c < a.length; ) {
    const f = a[c++] ?? 0;
    let r;
    f < 128 ? r = f : f < 224 ? r = (f & 31) << 6 | (a[c++] ?? 0) & 63 : f < 240 ? r = (f & 15) << 12 | ((a[c++] ?? 0) & 63) << 6 | (a[c++] ?? 0) & 63 : r = (f & 7) << 18 | ((a[c++] ?? 0) & 63) << 12 | ((a[c++] ?? 0) & 63) << 6 | (a[c++] ?? 0) & 63, r > 65535 ? (r -= 65536, u += String.fromCharCode(55296 + (r >> 10), 56320 + (r & 1023))) : u += String.fromCharCode(r);
  }
  return u;
}
function Mv(a, u, c) {
  return `#${(1 << 24 | a << 16 | u << 8 | c).toString(16).slice(1)}`;
}
function Rs(a) {
  if (a === null || typeof a != "object") return JSON.stringify(a) ?? "null";
  if (Array.isArray(a)) return `[${a.map(Rs).join(",")}]`;
  const u = a;
  return `{${Object.keys(u).sort().map((c) => `${c}:${Rs(u[c])}`).join(",")}}`;
}
function Ev(a) {
  return a.map((u) => ({ move: u, key: Rs(u) })).sort((u, c) => u.key < c.key ? -1 : u.key > c.key ? 1 : 0).map((u) => u.move);
}
function xv(a) {
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
function Tv(a, u, c) {
  const f = [];
  for (let m = 0; m < u; m++)
    f.push({ id: `p${m}`, name: `P${m + 1}`, kind: "human", seat: m });
  const r = typeof c?.seed == "number" ? c.seed : 0, d = { gameId: a, players: f, seed: r };
  return c && Object.keys(c).length > 0 && (d.options = { ...c }), d;
}
function Av(a, u, c) {
  let f = u;
  const r = [];
  for (let d = 0; d < c; d++) {
    const m = Mv(a[f] ?? 0, a[f + 1] ?? 0, a[f + 2] ?? 0), p = a[f + 3] ?? 0;
    f += 4, r.push({ name: xy(a.subarray(f, f + p)), color: m }), f += p;
  }
  return { players: r, pos: f };
}
function ju(a, u, c) {
  let f = 0;
  for (let r = 0; r < c; r++) f = f * 256 + (a[u + r] ?? 0);
  return f;
}
function zv(a) {
  const u = ju(a, 0, 2);
  if (u !== mv) throw new Error(`Unsupported replay version ${u}`);
  const c = yv[ju(a, 2, 2)];
  if (!c) throw new Error("Replay names an unknown game");
  const f = ju(a, 4, 2), r = ju(a, 6, 4), d = ju(a, 10, 4), m = 14, p = xv(xy(a.subarray(m, m + d))), { players: g, pos: y } = Av(a, m + d, f), v = Object.keys(p).length > 0 ? p : gv;
  return { meta: { gameId: c, playerCount: f, players: g, options: v }, moveCount: r, bodyAt: y };
}
function _v(a) {
  if (a.length <= yh) throw new Error("Replay is truncated");
  const u = a.length - yh, c = ((a[u] ?? 0) << 24 | (a[u + 1] ?? 0) << 16 | (a[u + 2] ?? 0) << 8 | (a[u + 3] ?? 0)) >>> 0;
  if (Sv(a, u) !== c)
    throw new Error("Replay failed its integrity check — the link is corrupted or incomplete");
}
function Ov(a) {
  const u = bv(a);
  _v(u);
  const { meta: c, moveCount: f, bodyAt: r } = zv(u), d = ku.get(c.gameId);
  if (!d) throw new Error(`Game not registered: ${c.gameId}`);
  const m = new vv(u, r), p = [];
  let g = d.createInitialState(
    Tv(c.gameId, c.playerCount, c.options)
  );
  for (let y = 0; y < f; y++) {
    const v = Ev(d.getLegalMoves(g)), b = v[m.read(pv(v.length))];
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
const Cv = {
  id: "random",
  label: "Random",
  async selectMove(a) {
    return Bn(a.legalMoves, a.rng);
  }
}, Ju = 1e6, un = Ju - 1e4, Ty = 40, Ay = () => new Promise((a) => setTimeout(a, 0)), Dv = 8;
class zy extends Error {
}
function Rv(a, u) {
  return a > un ? a + u : a < -un ? a - u : a;
}
function jv(a, u) {
  return a > un ? a - u : a < -un ? a + u : a;
}
const Nv = 4095;
async function _y(a) {
  if (a.nodes++, (a.nodes & Nv) === 0) {
    const u = Date.now();
    if (u > a.deadline) throw new zy();
    u - a.lastYield >= Ty && (await Ay(), a.deadline += Date.now() - u, a.lastYield = Date.now());
  }
}
function Oy(a, u) {
  const c = a.getCandidateMoves?.(u);
  return c && c.length > 0 ? c : a.getLegalMoves(u);
}
function Cy(a, u, c, f, r) {
  if (!a.ordered && f == null) return c;
  const { def: d } = a, m = f != null && d.moveKey != null ? d.moveKey(f) : null, p = a.killers[r], g = c.map((y) => {
    const v = d.moveKey != null ? d.moveKey(y) : null;
    let b = 0;
    return m != null && v === m ? b = 1e12 : (d.scoreMoveForOrdering != null && (b += d.scoreMoveForOrdering(u, y) * 1e3), p != null && v != null && (p[0] === v || p[1] === v) && (b += 900), a.history != null && v != null && (b += a.history.get(v) ?? 0)), { move: y, s: b };
  });
  return g.sort((y, v) => v.s - y.s), g.map((y) => y.move);
}
function Uv(a, u, c, f) {
  var m;
  if (a.def.moveKey == null) return;
  const r = a.def.moveKey(u), d = (m = a.killers)[c] ?? (m[c] = [null, null]);
  d[0] !== r && (d[1] = d[0], d[0] = r), a.history != null && a.history.set(r, (a.history.get(r) ?? 0) + f * f);
}
async function Dy(a, u, c, f, r, d) {
  await _y(a);
  const m = a.def.getStatus(u);
  if (m.state === "win")
    return m.winners.includes(a.me) ? Ju - c : c - Ju;
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
  for (const j of Cy(a, u, b, null, c)) {
    const N = await Dy(a, a.def.applyMove(u, j), c + 1, f, r, d - 1);
    if (y ? (N > v && (v = N), v > f && (f = v)) : (N < v && (v = N), v < r && (r = v)), f >= r) break;
  }
  return v;
}
async function Ry(a, u, c, f, r, d) {
  await _y(a);
  const m = a.def.getStatus(u);
  if (m.state === "win")
    return m.winners.includes(a.me) ? Ju - f : f - Ju;
  if (m.state === "draw") return 0;
  if (c <= 0)
    return a.hitDepthLimit = !0, a.def.getTacticalMoves != null && a.def.evaluate != null ? Dy(a, u, f, r, d, Dv) : a.def.evaluate ? a.def.evaluate(u, a.me) : 0;
  const p = a.tt != null && a.def.hash != null ? a.def.hash(u) : null, g = r, y = d;
  let v = null;
  if (p != null && a.tt != null) {
    const G = a.tt.get(p);
    if (G != null && (v = G.bestMove, G.depth >= c)) {
      const Z = jv(G.score, f);
      if (G.flag === "exact" || (G.flag === "lower" && Z > r ? r = Z : G.flag === "upper" && Z < d && (d = Z), r >= d)) return Z;
    }
  }
  const b = a.def.getCurrentSeat(u);
  if (b == null) return 0;
  const j = b === a.me;
  let N = j ? -1 / 0 : 1 / 0, X = null;
  const $ = Cy(a, u, Oy(a.def, u), v, f);
  for (const G of $) {
    const Z = await Ry(a, a.def.applyMove(u, G), c - 1, f + 1, r, d);
    if (j ? (Z > N && (N = Z, X = G), N > r && (r = N)) : (Z < N && (N = Z, X = G), N < d && (d = N)), r >= d) {
      Uv(a, G, f, c);
      break;
    }
  }
  if (p != null && a.tt != null) {
    let G;
    j ? G = N >= y ? "lower" : N <= g ? "upper" : "exact" : G = N <= g ? "upper" : N >= y ? "lower" : "exact", a.tt.set(p, { score: Rv(N, f), depth: c, flag: G, bestMove: X });
  }
  return N;
}
function Hv(a, u, c) {
  let f = -1 / 0;
  for (const v of a) v.value > f && (f = v.value);
  if (f >= un) {
    const v = a.filter((b) => b.value >= un).map((b) => b.move);
    return Bn(v, c);
  }
  let r = a.filter((v) => v.value > -un);
  if (r.length === 0 && (r = [...a]), u <= 0) {
    const v = r.filter((b) => b.value === f).map((b) => b.move);
    return Bn(v, c);
  }
  let d = 1 / 0, m = -1 / 0;
  for (const v of r)
    v.value < d && (d = v.value), v.value > m && (m = v.value);
  const p = m - d;
  if (p === 0) return Bn(r.map((v) => v.move), c);
  let g = r[0].move, y = -1 / 0;
  for (const v of r) {
    const b = v.value + (c() * 2 - 1) * u * p;
    b > y && (y = b, g = v.move);
  }
  return g;
}
function jy(a) {
  return {
    id: a.id,
    label: a.label,
    async selectMove(u) {
      const { definition: c, state: f, seat: r, rng: d } = u, m = Oy(c, f);
      if (m.length === 1) return m[0];
      if (a.blunderChance > 0 && d() < a.blunderChance)
        return Bn(m, d);
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
        if (Date.now() - g.lastYield < Ty) return;
        const b = Date.now();
        await Ay(), g.deadline += Date.now() - b, g.lastYield = Date.now();
      };
      let v = m.map((b) => ({ move: b, value: 0 }));
      for (let b = 1; b <= a.maxDepth; b++) {
        g.hitDepthLimit = !1;
        let j = -1 / 0;
        const N = [];
        let X = !1;
        const $ = [...v].sort((G, Z) => Z.value - G.value).map((G) => G.move);
        try {
          for (const G of $) {
            const Z = await Ry(g, c.applyMove(f, G), b - 1, 1, -1 / 0, 1 / 0);
            N.push({ move: G, value: Z }), Z > j && (j = Z), await y();
          }
        } catch (G) {
          if (G instanceof zy) X = !0;
          else throw G;
        }
        if (X || (v = N, !g.hitDepthLimit) || Math.abs(j) >= un) break;
      }
      return Hv(v, a.variety, d);
    }
  };
}
jy({
  id: "minimax",
  label: "Minimax",
  timeBudgetMs: 1e3,
  maxDepth: 64,
  blunderChance: 0,
  // Subtle: only varies between genuinely close moves, so tactics are intact.
  variety: 0.12
});
const Bv = jy({
  id: "minimax-imperfect",
  label: "Minimax (imperfect)",
  timeBudgetMs: 150,
  maxDepth: 64,
  blunderChance: 0.3,
  // More willing to take a near-best alternative — livelier, still sensible.
  variety: 0.3
});
Array.from({ length: 64 }, (a, u) => 1n << BigInt(u));
const gh = [
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
  (a, u) => gh[u] - gh[a]
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
const Ny = 9, Uy = 10, Ba = Ny, za = Uy, Lv = 120, Ca = (a) => Math.floor(a / Ba), zc = (a) => a % Ba, kt = (a, u) => a * Ba + u, Nu = (a, u) => a >= 0 && a < za && u >= 0 && u < Ba, Lc = (a) => a === 0 ? 1 : 0, Yv = (a) => a === 0 ? -1 : 1;
function ph(a, u, c) {
  return c < 3 || c > 5 ? !1 : a === 0 ? u >= 7 && u <= 9 : u >= 0 && u <= 2;
}
function js(a, u) {
  return a === 0 ? u >= 5 : u <= 4;
}
const ps = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
], vh = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1]
], wv = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1]
];
function Hy(a, u) {
  const c = a[u];
  if (!c) return [];
  const f = c.seat, r = Ca(u), d = zc(u), m = [], p = (g, y) => {
    if (!Nu(g, y)) return;
    const v = a[kt(g, y)];
    (!v || v.seat !== f) && m.push({ from: u, to: kt(g, y) });
  };
  switch (c.type) {
    case "g":
      for (const [g, y] of ps)
        ph(f, r + g, d + y) && p(r + g, d + y);
      break;
    case "a":
      for (const [g, y] of vh)
        ph(f, r + g, d + y) && p(r + g, d + y);
      break;
    case "e":
      for (const [g, y] of vh)
        !(Nu(r + g, d + y) ? a[kt(r + g, d + y)] : c) && js(f, r + 2 * g) && p(r + 2 * g, d + 2 * y);
      break;
    case "h":
      for (const [g, y] of wv) {
        const v = r + (Math.abs(g) === 2 ? g / 2 : 0), b = d + (Math.abs(y) === 2 ? y / 2 : 0);
        Nu(v, b) && a[kt(v, b)] == null && p(r + g, d + y);
      }
      break;
    case "r":
      for (const [g, y] of ps) {
        let v = r + g, b = d + y;
        for (; Nu(v, b); ) {
          const j = a[kt(v, b)];
          if (!j) m.push({ from: u, to: kt(v, b) });
          else {
            j.seat !== f && m.push({ from: u, to: kt(v, b) });
            break;
          }
          v += g, b += y;
        }
      }
      break;
    case "c":
      for (const [g, y] of ps) {
        let v = r + g, b = d + y, j = !1;
        for (; Nu(v, b); ) {
          const N = a[kt(v, b)];
          if (!j)
            N ? j = !0 : m.push({ from: u, to: kt(v, b) });
          else if (N) {
            N.seat !== f && m.push({ from: u, to: kt(v, b) });
            break;
          }
          v += g, b += y;
        }
      }
      break;
    case "s": {
      p(r + Yv(f), d), js(f, r) || (p(r, d - 1), p(r, d + 1));
      break;
    }
  }
  return m;
}
function Sh(a, u) {
  for (let c = 0; c < a.length; c++) {
    const f = a[c];
    if (f && f.seat === u && f.type === "g") return c;
  }
  return -1;
}
function Gv(a, u) {
  const c = Sh(a, u);
  if (c < 0) return !0;
  const f = Sh(a, Lc(u));
  if (f >= 0 && zc(c) === zc(f)) {
    const r = Math.min(Ca(c), Ca(f)), d = Math.max(Ca(c), Ca(f));
    let m = !1;
    for (let p = r + 1; p < d; p++)
      if (a[kt(p, zc(c))] != null) {
        m = !0;
        break;
      }
    if (!m) return !0;
  }
  for (let r = 0; r < a.length; r++)
    if (a[r]?.seat === Lc(u)) {
      for (const d of Hy(a, r))
        if (d.to === c) return !0;
    }
  return !1;
}
function Is(a) {
  const u = [];
  for (let c = 0; c < a.board.length; c++)
    if (a.board[c]?.seat === a.currentSeat)
      for (const f of Hy(a.board, c)) {
        const r = [...a.board];
        r[f.to] = r[f.from], r[f.from] = null, Gv(r, a.currentSeat) || u.push(f);
      }
  return u;
}
function _c(a) {
  return a.idlePlies >= Lv ? { state: "draw" } : Is(a).length === 0 ? { state: "win", winners: [Lc(a.currentSeat)] } : { state: "playing" };
}
function bh(a, u) {
  return _c(a).state !== "playing" ? !1 : Is(a).some((c) => c.from === u.from && c.to === u.to);
}
const Mh = ["r", "h", "e", "a", "g", "a", "e", "h", "r"], qv = {
  g: 0,
  a: 2,
  e: 2,
  h: 4,
  r: 9,
  c: 4.5,
  s: 1
}, Xv = {
  id: "xiangqi",
  name: "Chinese Chess",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    const u = Array(Ba * za).fill(null);
    for (let c = 0; c < Ba; c++)
      u[kt(0, c)] = { seat: 1, type: Mh[c] }, u[kt(za - 1, c)] = { seat: 0, type: Mh[c] };
    u[kt(2, 1)] = { seat: 1, type: "c" }, u[kt(2, 7)] = { seat: 1, type: "c" }, u[kt(za - 3, 1)] = { seat: 0, type: "c" }, u[kt(za - 3, 7)] = { seat: 0, type: "c" };
    for (const c of [0, 2, 4, 6, 8])
      u[kt(3, c)] = { seat: 1, type: "s" }, u[kt(za - 4, c)] = { seat: 0, type: "s" };
    return { board: u, currentSeat: 0, idlePlies: 0, lastMove: null };
  },
  getStatus: _c,
  getCurrentSeat(a) {
    return _c(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return _c(a).state === "playing" ? Is(a) : [];
  },
  isLegalMove: bh,
  applyMove(a, u) {
    if (!bh(a, u))
      throw new Error(`Illegal Xiangqi move: ${u.from} -> ${u.to}`);
    const c = a.board[u.to] != null, f = [...a.board];
    return f[u.to] = f[u.from], f[u.from] = null, {
      board: f,
      currentSeat: Lc(a.currentSeat),
      idlePlies: c ? 0 : a.idlePlies + 1,
      lastMove: { from: u.from, to: u.to }
    };
  },
  evaluate(a, u) {
    let c = 0;
    for (let f = 0; f < a.board.length; f++) {
      const r = a.board[f];
      if (!r) continue;
      let d = qv[r.type];
      r.type === "s" && !js(r.seat, Ca(f)) && (d += 1), c += r.seat === u ? d : -d;
    }
    return c;
  }
}, Zv = 9, Qv = 10, Vv = ["g", "a", "e", "h", "r", "c", "s"], Ps = Zv * Qv * 2 * Vv.length, Kv = new Int32Array(Ps), $v = new Int32Array(Ps);
(() => {
  let a = 2654435769;
  const u = () => {
    a = a + 1831565813 | 0;
    let c = Math.imul(a ^ a >>> 15, 1 | a);
    return c = c + Math.imul(c ^ c >>> 7, 61 | c) ^ c, c ^ c >>> 14 | 0;
  };
  for (let c = 0; c < Ps; c++)
    Kv[c] = u(), $v[c] = u();
  u(), u();
})();
function By(a) {
  return {
    id: a.id,
    label: a.label,
    async selectMove(u) {
      u.state;
      const c = u.legalMoves;
      return c.length <= 1 ? c[0] ?? { from: -1, to: -1 } : u.rng() < a.blunder ? Bn(c, u.rng) : a.fallback(u);
    }
  };
}
By({
  id: "xiangqi-medium",
  label: "Xiangqi engine (medium)",
  maxDepth: 6,
  budgetMs: 1200,
  blunder: 0.1,
  fallback: (a) => Bv.selectMove(a)
});
By({
  id: "xiangqi-easy",
  label: "Xiangqi engine (easy)",
  maxDepth: 4,
  budgetMs: 600,
  blunder: 0.25,
  fallback: (a) => Cv.selectMove(a)
});
const Ly = 8, Kt = Ly, te = (a) => Math.floor(a / Kt), xe = (a) => a % Kt, it = (a, u) => a * Kt + u, Me = (a, u) => a >= 0 && a < Kt && u >= 0 && u < Kt, Ee = (a) => a === 0 ? 1 : 0, Yy = (a) => a === 0 ? -1 : 1, wy = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1]
], tr = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1]
], lr = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
], Ns = [...tr, ...lr], Eh = ["r", "n", "b", "q", "k", "b", "n", "r"];
function jn(a, u, c) {
  const f = te(u), r = xe(u), d = f - Yy(c);
  for (const p of [-1, 1])
    if (Me(d, r + p)) {
      const g = a[it(d, r + p)];
      if (g && g.seat === c && g.type === "p") return !0;
    }
  for (const [p, g] of wy)
    if (Me(f + p, r + g)) {
      const y = a[it(f + p, r + g)];
      if (y && y.seat === c && y.type === "n") return !0;
    }
  for (const [p, g] of Ns)
    if (Me(f + p, r + g)) {
      const y = a[it(f + p, r + g)];
      if (y && y.seat === c && y.type === "k") return !0;
    }
  const m = [
    [tr, "b"],
    [lr, "r"]
  ];
  for (const [p, g] of m)
    for (const [y, v] of p) {
      let b = f + y, j = r + v;
      for (; Me(b, j); ) {
        const N = a[it(b, j)];
        if (N) {
          if (N.seat === c && (N.type === g || N.type === "q")) return !0;
          break;
        }
        b += y, j += v;
      }
    }
  return !1;
}
function Gy(a, u) {
  for (let c = 0; c < a.length; c++) {
    const f = a[c];
    if (f && f.seat === u && f.type === "k") return c;
  }
  return -1;
}
function kv(a, u) {
  const c = a.board, f = c[u];
  if (!f) return [];
  const r = f.seat, d = te(u), m = xe(u), p = [], g = (y) => {
    p.push({ from: u, to: y });
  };
  if (f.type === "p") {
    const y = Yy(r), v = r === 0 ? Kt - 2 : 1, b = r === 0 ? 0 : Kt - 1, j = it(d + y, m);
    Me(d + y, m) && c[j] == null && (d + y === b ? p.push({ from: u, to: j, promotion: "q" }) : p.push({ from: u, to: j }), d === v && c[it(d + 2 * y, m)] == null && g(it(d + 2 * y, m)));
    for (const N of [-1, 1]) {
      if (!Me(d + y, m + N)) continue;
      const X = it(d + y, m + N), $ = c[X];
      ($ && $.seat !== r || X === a.enPassant) && (d + y === b ? p.push({ from: u, to: X, promotion: "q" }) : p.push({ from: u, to: X }));
    }
  } else if (f.type === "n")
    for (const [y, v] of wy) {
      if (!Me(d + y, m + v)) continue;
      const b = c[it(d + y, m + v)];
      (!b || b.seat !== r) && g(it(d + y, m + v));
    }
  else if (f.type === "k") {
    for (const [v, b] of Ns) {
      if (!Me(d + v, m + b)) continue;
      const j = c[it(d + v, m + b)];
      (!j || j.seat !== r) && g(it(d + v, m + b));
    }
    const y = r === 0 ? Kt - 1 : 0;
    if (d === y && m === 4 && !jn(c, u, Ee(r))) {
      const v = r === 0 ? a.castling.s0k : a.castling.s1k, b = r === 0 ? a.castling.s0q : a.castling.s1q;
      v && c[it(y, 5)] == null && c[it(y, 6)] == null && c[it(y, 7)]?.type === "r" && !jn(c, it(y, 5), Ee(r)) && !jn(c, it(y, 6), Ee(r)) && g(it(y, 6)), b && c[it(y, 1)] == null && c[it(y, 2)] == null && c[it(y, 3)] == null && c[it(y, 0)]?.type === "r" && !jn(c, it(y, 3), Ee(r)) && !jn(c, it(y, 2), Ee(r)) && g(it(y, 2));
    }
  } else {
    const y = f.type === "b" ? tr : f.type === "r" ? lr : Ns;
    for (const [v, b] of y) {
      let j = d + v, N = m + b;
      for (; Me(j, N); ) {
        const X = c[it(j, N)];
        if (!X) g(it(j, N));
        else {
          X.seat !== r && g(it(j, N));
          break;
        }
        j += v, N += b;
      }
    }
  }
  return p;
}
function qy(a, u) {
  const c = [...a.board], f = c[u.from];
  if (c[u.from] = null, f.type === "p" && u.to === a.enPassant && c[u.to] == null && (c[it(te(u.from), xe(u.to))] = null), c[u.to] = u.promotion ? { seat: f.seat, type: "q" } : f, f.type === "k" && Math.abs(xe(u.to) - xe(u.from)) === 2) {
    const r = te(u.from);
    xe(u.to) === 6 ? (c[it(r, 5)] = c[it(r, 7)], c[it(r, 7)] = null) : (c[it(r, 3)] = c[it(r, 0)], c[it(r, 0)] = null);
  }
  return c;
}
function Yc(a) {
  const u = a.currentSeat, c = [];
  for (let f = 0; f < a.board.length; f++)
    if (a.board[f]?.seat === u)
      for (const r of kv(a, f)) {
        const d = qy(a, r);
        jn(d, Gy(d, u), Ee(u)) || c.push(r);
      }
  return c;
}
function Gu(a) {
  if (a.halfmove >= 100) return { state: "draw" };
  if (Yc(a).length > 0) return { state: "playing" };
  const u = Gy(a.board, a.currentSeat);
  return jn(a.board, u, Ee(a.currentSeat)) ? { state: "win", winners: [Ee(a.currentSeat)] } : { state: "draw" };
}
function xh(a, u) {
  return Gu(a).state !== "playing" ? !1 : Yc(a).some(
    (c) => c.from === u.from && c.to === u.to && c.promotion === u.promotion
  );
}
const Jv = { p: 1, n: 3, b: 3.2, r: 5, q: 9, k: 0 }, Th = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 100 }, Kc = ["p", "n", "b", "r", "q", "k"], Us = new Int32Array(Kt * Kt * 2 * Kc.length), Xy = new Int32Array(Kt * Kt * 2 * Kc.length);
let Zy = 0, Qy = 0;
(() => {
  let a = 2654435769;
  const u = () => {
    a = a + 1831565813 | 0;
    let c = Math.imul(a ^ a >>> 15, 1 | a);
    return c = c + Math.imul(c ^ c >>> 7, 61 | c) ^ c, c ^ c >>> 14 | 0;
  };
  for (let c = 0; c < Us.length; c++)
    Us[c] = u(), Xy[c] = u();
  Zy = u(), Qy = u();
})();
const Wv = (a, u, c) => (a * 2 + u) * Kc.length + c;
function Fv(a) {
  return (a.s0k ? 1 : 0) | (a.s0q ? 2 : 0) | (a.s1k ? 4 : 0) | (a.s1q ? 8 : 0);
}
const Iv = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5, 5, 10, 25, 25, 10, 5, 5],
  [0, 0, 0, 20, 20, 0, 0, 0],
  [5, -5, -10, 0, 0, -10, -5, 5],
  [5, 10, 10, -20, -20, 10, 10, 5],
  [0, 0, 0, 0, 0, 0, 0, 0]
], Pv = [
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20, 0, 0, 0, 0, -20, -40],
  [-30, 0, 10, 15, 15, 10, 0, -30],
  [-30, 5, 15, 20, 20, 15, 5, -30],
  [-30, 0, 15, 20, 20, 15, 0, -30],
  [-30, 5, 10, 15, 15, 10, 5, -30],
  [-40, -20, 0, 5, 5, 0, -20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50]
], t2 = [
  [-20, -10, -10, -10, -10, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 10, 10, 5, 0, -10],
  [-10, 5, 5, 10, 10, 5, 5, -10],
  [-10, 0, 10, 10, 10, 10, 0, -10],
  [-10, 10, 10, 10, 10, 10, 10, -10],
  [-10, 5, 0, 0, 0, 0, 5, -10],
  [-20, -10, -10, -10, -10, -10, -10, -20]
], l2 = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [5, 10, 10, 10, 10, 10, 10, 5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [0, 0, 0, 5, 5, 0, 0, 0]
], e2 = [
  [-20, -10, -10, -5, -5, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 5, 5, 5, 0, -10],
  [-5, 0, 5, 5, 5, 5, 0, -5],
  [0, 0, 5, 5, 5, 5, 0, -5],
  [-10, 5, 5, 5, 5, 5, 0, -10],
  [-10, 0, 5, 0, 0, 0, 0, -10],
  [-20, -10, -10, -5, -5, -10, -10, -20]
], n2 = [
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-20, -30, -30, -40, -40, -30, -30, -20],
  [-10, -20, -20, -20, -20, -20, -20, -10],
  [20, 20, 0, 0, 0, 0, 20, 20],
  [20, 30, 10, 0, 0, 10, 30, 20]
], a2 = {
  p: Iv,
  n: Pv,
  b: t2,
  r: l2,
  q: e2,
  k: n2
};
function u2(a, u, c, f) {
  const r = u === 0 ? c : Kt - 1 - c;
  return a2[a][r][f] / 100;
}
function i2(a, u) {
  return a.board[u.to] != null || u.promotion != null ? !0 : a.board[u.from]?.type === "p" && u.to === a.enPassant;
}
function c2(a, u, c, f) {
  let { s0k: r, s0q: d, s1k: m, s1q: p } = a;
  f.type === "k" && (f.seat === 0 ? (r = !1, d = !1) : (m = !1, p = !1));
  for (const g of [u, c])
    g === it(Kt - 1, 7) && (r = !1), g === it(Kt - 1, 0) && (d = !1), g === it(0, 7) && (m = !1), g === it(0, 0) && (p = !1);
  return { s0k: r, s0q: d, s1k: m, s1q: p };
}
const o2 = {
  id: "chess",
  name: "Chess",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    const u = Array(Kt * Kt).fill(null);
    for (let c = 0; c < Kt; c++)
      u[it(0, c)] = { seat: 1, type: Eh[c] }, u[it(1, c)] = { seat: 1, type: "p" }, u[it(Kt - 2, c)] = { seat: 0, type: "p" }, u[it(Kt - 1, c)] = { seat: 0, type: Eh[c] };
    return {
      board: u,
      currentSeat: 0,
      castling: { s0k: !0, s0q: !0, s1k: !0, s1q: !0 },
      enPassant: null,
      halfmove: 0,
      lastMove: null
    };
  },
  getStatus: Gu,
  getCurrentSeat(a) {
    return Gu(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return Gu(a).state === "playing" ? Yc(a) : [];
  },
  isLegalMove: xh,
  applyMove(a, u) {
    if (!xh(a, u))
      throw new Error(`Illegal Chess move: ${u.from} -> ${u.to}`);
    const c = a.board[u.from], f = a.board[u.to] != null, r = c.type === "p", d = qy(a, u), m = r && Math.abs(te(u.to) - te(u.from)) === 2 ? it((te(u.from) + te(u.to)) / 2, xe(u.from)) : null;
    return {
      board: d,
      currentSeat: Ee(a.currentSeat),
      castling: c2(a.castling, u.from, u.to, c),
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
      const d = Jv[r.type] + u2(r.type, r.seat, te(f), xe(f));
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
      const d = Wv(f, r.seat, Kc.indexOf(r.type));
      u ^= Us[d], c ^= Xy[d];
    }
    return a.currentSeat === 1 && (u ^= Zy, c ^= Qy), `${(u >>> 0).toString(36)}:${(c >>> 0).toString(36)}:${Fv(
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
    return !f && c?.type === "p" && u.to === a.enPassant && (f = a.board[it(te(u.from), xe(u.to))]), f ? 10 * Th[f.type] - (c ? Th[c.type] : 0) : 0;
  },
  /**
   * Quiescence moves: captures (incl. en passant) and promotions. Captures
   * remove a piece and promotions exhaust a pawn's last rank, so the set shrinks
   * toward quiet and the search terminates. Excludes checks to keep it bounded.
   */
  getTacticalMoves(a) {
    return Gu(a).state !== "playing" ? [] : Yc(a).filter((u) => i2(a, u));
  },
  moveKey(a) {
    return `${a.from}-${a.to}-${a.promotion ?? ""}`;
  }
}, f2 = 1.414, s2 = 200, r2 = 16, d2 = 40, h2 = () => new Promise((a) => setTimeout(a, 0));
function wc(a, u) {
  const c = a.getCandidateMoves?.(u);
  return c && c.length > 0 ? c : a.getLegalMoves(u);
}
function Ah(a, u, c) {
  const f = a.getStatus(u).state !== "playing";
  return {
    state: u,
    seat: a.getCurrentSeat(u),
    move: c,
    untried: f ? [] : wc(a, u),
    children: [],
    visits: 0,
    value: 0,
    terminal: f
  };
}
function Vy(a, u, c) {
  const f = a.getStatus(u);
  return f.state === "win" ? f.winners.includes(c) ? 1 : 0 : 0.5;
}
function y2(a, u, c, f) {
  let r = u;
  for (let m = 0; m < s2; m++) {
    if (a.getStatus(r).state !== "playing") return Vy(a, r, c);
    const p = wc(a, r);
    if (p.length === 0) return 0.5;
    r = a.applyMove(r, p[Math.floor(f() * p.length)]);
  }
  if (!a.evaluate) return 0.5;
  const d = a.evaluate(r, c);
  return d > 0 ? 1 : d < 0 ? 0 : 0.5;
}
function Ky(a) {
  return {
    id: a.id,
    label: a.label,
    async selectMove(u) {
      const { definition: c, state: f, seat: r, rng: d } = u;
      if (wc(c, f).length === 1) return wc(c, f)[0];
      const m = Ah(c, f, null);
      let p = a.timeBudgetMs, g = Date.now(), y = g;
      for (; p > 0 && !(Date.now() - g >= p); ) {
        for (let j = 0; j < r2; j++) {
          const N = [m];
          let X = m;
          for (; !X.terminal && X.untried.length === 0 && X.children.length > 0; ) {
            const G = Math.log(X.visits);
            let Z = X.children[0], V = -1 / 0;
            for (const Q of X.children) {
              const C = Q.value / Q.visits, T = (X.seat === r ? C : 1 - C) + f2 * Math.sqrt(G / Q.visits);
              T > V && (V = T, Z = Q);
            }
            X = Z, N.push(X);
          }
          if (!X.terminal && X.untried.length > 0) {
            const G = X.untried.splice(Math.floor(d() * X.untried.length), 1)[0], Z = Ah(c, c.applyMove(X.state, G), G);
            X.children.push(Z), N.push(Z), X = Z;
          }
          const $ = X.terminal ? Vy(c, X.state, r) : y2(c, X.state, r, d);
          for (const G of N)
            G.visits++, G.value += $;
        }
        const b = Date.now();
        b - y >= d2 && (p -= b - g, await h2(), g = Date.now(), y = g);
      }
      let v = null;
      for (const b of m.children)
        (v == null || b.visits > v.visits) && (v = b);
      return v != null && v.move != null ? v.move : Bn(u.legalMoves, d);
    }
  };
}
Ky({ id: "mcts", label: "MCTS", timeBudgetMs: 1e4 });
Ky({
  id: "mcts-lite",
  label: "MCTS (quick)",
  timeBudgetMs: 900
});
const m2 = 4, g2 = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"], p2 = ["♦", "♣", "♥", "♠"], Pe = (a) => a >> 2, Hs = (a) => a & 3;
function v2(a, u) {
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
function Gc(a) {
  const u = a.length;
  if (u === 1) return { cards: a, size: 1, type: "single", power: a[0] };
  if (u === 2)
    return Pe(a[0]) === Pe(a[1]) ? { cards: a, size: 2, type: "pair", power: a[1] } : null;
  if (u === 3)
    return Pe(a[0]) === Pe(a[1]) && Pe(a[1]) === Pe(a[2]) ? { cards: a, size: 3, type: "triple", power: a[2] } : null;
  if (u !== 5) return null;
  const c = a.map(Pe), f = /* @__PURE__ */ new Map();
  for (const p of c) f.set(p, (f.get(p) ?? 0) + 1);
  for (const [p, g] of f)
    if (g === 4) return { cards: a, size: 5, type: "quads", power: 192 + p };
  if (f.size === 2) {
    let p = -1;
    for (const [g, y] of f) y === 3 && (p = g);
    return p >= 0 ? { cards: a, size: 5, type: "fullhouse", power: 128 + p } : null;
  }
  if (f.size !== 5) return null;
  const r = a[4], d = a.every((p) => Hs(p) === Hs(a[0])), m = c[4] - c[0] === 4;
  return m && d ? { cards: a, size: 5, type: "straightflush", power: 256 + r } : d ? { cards: a, size: 5, type: "flush", power: 64 + r } : m ? { cards: a, size: 5, type: "straight", power: 0 + r } : null;
}
function S2(a) {
  const u = [];
  for (const c of a) u.push(Gc([c]));
  for (const c of [2, 3, 5])
    for (const f of v2(a, c)) {
      const r = Gc(f);
      r && u.push(r);
    }
  return u;
}
const b2 = (a, u) => a.length === u.length && a.every((c, f) => c === u[f]);
function $y(a) {
  const u = a.hands[a.currentSeat] ?? [], c = S2(u);
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
function Oc(a) {
  for (let u = 0; u < a.hands.length; u++)
    if (a.hands[u].length === 0) return { state: "win", winners: [u] };
  return { state: "playing" };
}
function zh(a, u) {
  if (Oc(a).state !== "playing") return !1;
  const c = [...u.cards].sort((f, r) => f - r);
  return $y(a).some((f) => b2(f.cards, c));
}
const M2 = {
  id: "big-two",
  name: "Big Two",
  minPlayers: 2,
  maxPlayers: m2,
  createInitialState(a) {
    const u = rv(a.seed ?? 0), c = dv(
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
  getStatus: Oc,
  getCurrentSeat(a) {
    return Oc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return Oc(a).state === "playing" ? $y(a) : [];
  },
  isLegalMove: zh,
  applyMove(a, u) {
    if (!zh(a, u))
      throw new Error(`Illegal Big Two move: ${JSON.stringify(u)}`);
    const c = a.currentSeat, f = a.hands.length;
    if (u.cards.length === 0) {
      let m = a.passes + 1, p = a.table, g = (c + 1) % f;
      return p != null && m >= f - 1 && (g = p.seat, p = null, m = 0), { ...a, currentSeat: g, passes: m, table: p };
    }
    const r = [...u.cards].sort((m, p) => m - p), d = Gc(r);
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
}, ky = 8, nl = ky, E2 = 100, Jy = [
  [-1, -1],
  [-1, 1]
], Wy = [
  [1, -1],
  [1, 1]
], x2 = [...Jy, ...Wy], tn = (a) => Math.floor(a / nl), Bs = (a) => a % nl;
function Ls(a, u, c) {
  const f = tn(a) + u[0] * c, r = Bs(a) + u[1] * c;
  return f >= 0 && f < nl && r >= 0 && r < nl ? f * nl + r : -1;
}
function Fy(a, u) {
  return u ? x2 : a === 0 ? Jy : Wy;
}
function Ys(a) {
  return a === 0 ? 0 : nl - 1;
}
function T2(a, u) {
  const c = a[u];
  if (!c) return [];
  const f = [], r = (d, m, p) => {
    let g = !1;
    for (const y of Fy(c.seat, m)) {
      const v = Ls(d, y, 1), b = Ls(d, y, 2);
      if (v < 0 || b < 0) continue;
      const j = a[v];
      if (!j || j.seat === c.seat || p.includes(v) || a[b] && b !== u && !p.includes(b)) continue;
      g = !0;
      const X = [...p, v];
      !m && tn(b) === Ys(c.seat) ? f.push({ from: u, to: b, captures: X }) : r(b, m, X);
    }
    !g && p.length > 0 && f.push({ from: u, to: d, captures: p });
  };
  return r(u, c.king, []), f;
}
function A2(a, u) {
  const c = a[u];
  if (!c) return [];
  const f = [];
  for (const r of Fy(c.seat, c.king)) {
    const d = Ls(u, r, 1);
    d >= 0 && a[d] == null && f.push({ from: u, to: d, captures: [] });
  }
  return f;
}
function qc(a) {
  const u = [];
  for (let f = 0; f < a.board.length; f++)
    a.board[f]?.seat === a.currentSeat && u.push(...T2(a.board, f));
  if (u.length > 0) return u;
  const c = [];
  for (let f = 0; f < a.board.length; f++)
    a.board[f]?.seat === a.currentSeat && c.push(...A2(a.board, f));
  return c;
}
function qu(a) {
  if (a.idlePlies >= E2) return { state: "draw" };
  const u = a.currentSeat, c = u === 0 ? 1 : 0;
  return a.board.some((f) => f?.seat === u) ? qc(a).length === 0 ? { state: "win", winners: [c] } : { state: "playing" } : { state: "win", winners: [c] };
}
function z2(a, u) {
  return a.from === u.from && a.to === u.to && a.captures.length === u.captures.length && a.captures.every((c) => u.captures.includes(c));
}
function _h(a, u) {
  return qu(a).state === "playing" && qc(a).some((c) => z2(c, u));
}
const ws = new Int32Array(nl * nl * 2 * 2), Iy = new Int32Array(nl * nl * 2 * 2);
let Py = 0, tm = 0;
(() => {
  let a = 458671353;
  const u = () => {
    a = a + 1831565813 | 0;
    let c = Math.imul(a ^ a >>> 15, 1 | a);
    return c = c + Math.imul(c ^ c >>> 7, 61 | c) ^ c, c ^ c >>> 14 | 0;
  };
  for (let c = 0; c < ws.length; c++)
    ws[c] = u(), Iy[c] = u();
  Py = u(), tm = u();
})();
const _2 = (a, u, c) => (a * 2 + u) * 2 + (c ? 1 : 0), O2 = (a) => a ? 3 : 1, C2 = (a, u) => a === 0 ? u === nl - 1 : u === 0, D2 = {
  id: "checkers",
  name: "Checkers",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    const u = Array(nl * nl).fill(null);
    for (let c = 0; c < nl * nl; c++)
      (tn(c) + Bs(c)) % 2 === 1 && (tn(c) <= 2 ? u[c] = { seat: 1, king: !1 } : tn(c) >= nl - 3 && (u[c] = { seat: 0, king: !1 }));
    return { board: u, currentSeat: 0, idlePlies: 0, lastMove: null };
  },
  getStatus: qu,
  getCurrentSeat(a) {
    return qu(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return qu(a).state === "playing" ? qc(a) : [];
  },
  isLegalMove: _h,
  applyMove(a, u) {
    if (!_h(a, u))
      throw new Error(`Illegal Checkers move: ${u.from} -> ${u.to}`);
    const c = [...a.board], f = c[u.from];
    c[u.from] = null;
    for (const d of u.captures) c[d] = null;
    const r = f.king || tn(u.to) === Ys(f.seat);
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
      const d = tn(f), m = Bs(f);
      let p;
      r.king ? p = 2.4 + 0.04 * (3.5 - Math.abs(3.5 - d) + (3.5 - Math.abs(3.5 - m))) : p = 1 + 0.1 * (r.seat === 0 ? nl - 1 - d : d) + (C2(r.seat, d) ? 0.3 : 0), c += r.seat === u ? p : -p;
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
      const d = _2(f, r.seat, r.king);
      u ^= ws[d], c ^= Iy[d];
    }
    return a.currentSeat === 1 && (u ^= Py, c ^= tm), `${(u >>> 0).toString(36)}:${(c >>> 0).toString(36)}`;
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
      d && (c += 10 * O2(d.king));
    }
    const f = a.board[u.from];
    return f && !f.king && tn(u.to) === Ys(f.seat) && (c += 5), c;
  },
  /**
   * Quiescence moves: the capture sequences. Each jump removes material, so the
   * set strictly shrinks toward quiet and the search terminates. Because
   * captures are compulsory, whenever any exist `getLegalMoves` already returns
   * only captures — so this resolves exactly the pending exchanges that would
   * otherwise fool the material evaluation at the depth limit (horizon effect).
   */
  getTacticalMoves(a) {
    return qu(a).state !== "playing" ? [] : qc(a).filter((u) => u.captures.length > 0);
  },
  /** Stable, collision-free key for killer/history ordering heuristics. */
  moveKey(a) {
    return `${a.from}-${a.to}-${[...a.captures].sort((u, c) => u - c).join(",")}`;
  }
}, Aa = 4, lm = [
  { x: 1, y: -1, z: 0 },
  { x: 1, y: 0, z: -1 },
  { x: -1, y: 1, z: 0 },
  { x: -1, y: 0, z: 1 },
  { x: 0, y: 1, z: -1 },
  { x: 0, y: -1, z: 1 }
];
function R2(a, u, c) {
  return a >= -Aa && u >= -Aa && c >= -Aa || a <= Aa && u <= Aa && c <= Aa;
}
function j2() {
  const a = [];
  for (let u = -8; u <= 8; u++)
    for (let c = -8; c <= 8; c++) {
      const f = -u - c;
      f < -8 || f > 8 || R2(u, c, f) && a.push({ x: u, y: c, z: f });
    }
  return a.sort((u, c) => c.y - c.z - (u.y - u.z) || u.x - c.x), a;
}
const Gn = j2(), Cc = Gn.length, em = /* @__PURE__ */ new Map();
Gn.forEach((a, u) => em.set(`${a.x},${a.y},${a.z}`, u));
function Gs(a, u, c) {
  return em.get(`${a},${u},${c}`) ?? -1;
}
function N2(a) {
  return a.x >= 5 ? 0 : a.z <= -5 ? 1 : a.y >= 5 ? 2 : a.x <= -5 ? 3 : a.z >= 5 ? 4 : a.y <= -5 ? 5 : -1;
}
const nm = (() => {
  const a = [[], [], [], [], [], []];
  return Gn.forEach((u, c) => {
    const f = N2(u);
    f >= 0 && a[f].push(c);
  }), a;
})();
function U2(a) {
  return (a + 3) % 6;
}
const H2 = Gn.map((a) => {
  const u = [];
  for (const c of lm) {
    const f = Gs(a.x + c.x, a.y + c.y, a.z + c.z);
    f >= 0 && u.push(f);
  }
  return u;
}), B2 = Gn.map((a) => {
  const u = [];
  for (const c of lm) {
    const f = Gs(a.x + c.x, a.y + c.y, a.z + c.z), r = Gs(a.x + 2 * c.x, a.y + 2 * c.y, a.z + 2 * c.z);
    f >= 0 && r >= 0 && u.push({ over: f, land: r });
  }
  return u;
});
function am(a, u) {
  const c = /* @__PURE__ */ new Set();
  for (const d of H2[u])
    a[d] == null && c.add(d);
  const f = /* @__PURE__ */ new Set([u]), r = [u];
  for (; r.length > 0; ) {
    const d = r.pop();
    for (const { over: m, land: p } of B2[d])
      m !== u && a[m] != null && a[p] == null && !f.has(p) && (f.add(p), c.add(p), r.push(p));
  }
  return c.delete(u), [...c];
}
function qs(a) {
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
const L2 = [
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
], Y2 = 3;
function Dc(a) {
  const u = qs(a.playerCount);
  for (let c = 0; c < a.playerCount; c++)
    if (nm[U2(u[c])].every((r) => a.board[r] === c))
      return { state: "win", winners: [c] };
  return { state: "playing" };
}
function Oh(a, u) {
  return Dc(a).state !== "playing" || a.board[u.from] !== a.currentSeat || u.to < 0 || u.to >= Cc || a.board[u.to] != null ? !1 : am(a.board, u.from).includes(u.to);
}
const w2 = {
  id: "chinese-checkers",
  name: "Chinese Checkers",
  minPlayers: 2,
  maxPlayers: 6,
  createInitialState(a) {
    const u = a.players.length, c = qs(u), f = Array(Cc).fill(null);
    for (let r = 0; r < u; r++)
      for (const d of nm[c[r]]) f[d] = r;
    return { board: f, currentSeat: 0, playerCount: u, lastMove: null };
  },
  getStatus: Dc,
  getCurrentSeat(a) {
    return Dc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    if (Dc(a).state !== "playing") return [];
    const u = [];
    for (let c = 0; c < Cc; c++)
      if (a.board[c] === a.currentSeat)
        for (const f of am(a.board, c))
          u.push({ from: c, to: f });
    return u;
  },
  isLegalMove: Oh,
  applyMove(a, u) {
    if (!Oh(a, u))
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
    const c = qs(a.playerCount)[u] ?? 0, f = L2[c];
    let r = 0, d = 0;
    for (let m = 0; m < Cc; m++) {
      if (a.board[m] !== u) continue;
      const p = f(Gn[m]) + 8;
      r += p, p > d && (d = p);
    }
    return -(r + Y2 * d);
  }
}, um = 7, im = 6, cn = um, Un = im, Ch = cn * Un, G2 = Math.floor(cn / 2);
function qt(a, u) {
  return a * cn + u;
}
function q2() {
  const a = [];
  for (let u = 0; u < Un; u++)
    for (let c = 0; c < cn; c++)
      c + 3 < cn && a.push([qt(u, c), qt(u, c + 1), qt(u, c + 2), qt(u, c + 3)]), u + 3 < Un && a.push([qt(u, c), qt(u + 1, c), qt(u + 2, c), qt(u + 3, c)]), u + 3 < Un && c + 3 < cn && a.push([
        qt(u, c),
        qt(u + 1, c + 1),
        qt(u + 2, c + 2),
        qt(u + 3, c + 3)
      ]), u + 3 < Un && c - 3 >= 0 && a.push([
        qt(u, c),
        qt(u + 1, c - 1),
        qt(u + 2, c - 2),
        qt(u + 3, c - 3)
      ]);
  return a;
}
const cm = q2();
function X2(a, u) {
  for (let c = Un - 1; c >= 0; c--)
    if (a[qt(c, u)] == null) return c;
  return -1;
}
function Z2(a) {
  for (const [u, c, f, r] of cm) {
    const d = a[u];
    if (d != null && d === a[c] && d === a[f] && d === a[r]) return d;
  }
  return null;
}
function Rc(a) {
  const u = Z2(a.board);
  return u != null ? { state: "win", winners: [u] } : a.board.every((c) => c != null) ? { state: "draw" } : { state: "playing" };
}
function Dh(a, u) {
  return Number.isInteger(u.column) && u.column >= 0 && u.column < cn && a.board[qt(0, u.column)] == null && // top cell free ⇒ column not full
  Rc(a).state === "playing";
}
const Rh = [0, 2, 8, 40], Q2 = {
  id: "connect-four",
  name: "Four in a Row",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    return { board: Array(Ch).fill(null), currentSeat: 0 };
  },
  getStatus: Rc,
  getCurrentSeat(a) {
    return Rc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    if (Rc(a).state !== "playing") return [];
    const u = [];
    for (let c = 0; c < cn; c++)
      a.board[qt(0, c)] == null && u.push({ column: c });
    return u;
  },
  isLegalMove: Dh,
  applyMove(a, u) {
    if (!Dh(a, u))
      throw new Error(`Illegal Connect Four move: column ${u.column}`);
    const c = X2(a.board, u.column), f = [...a.board];
    return f[qt(c, u.column)] = a.currentSeat, { board: f, currentSeat: a.currentSeat === 0 ? 1 : 0 };
  },
  hash(a) {
    let u = "";
    for (let c = 0; c < Ch; c++) {
      const f = a.board[c];
      u += f == null ? "." : f === 0 ? "0" : "1";
    }
    return u + a.currentSeat;
  },
  evaluate(a, u) {
    const c = a.board, f = u === 0 ? 1 : 0;
    let r = 0;
    for (const d of cm) {
      let m = 0, p = 0;
      for (const g of d) {
        const y = c[g];
        y === u ? m++ : y === f && p++;
      }
      m > 0 && p > 0 || (m > 0 ? r += Rh[m] ?? 0 : p > 0 && (r -= Rh[p] ?? 0));
    }
    for (let d = 0; d < Un; d++) {
      const m = c[qt(d, G2)];
      m === u ? r += 3 : m === f && (r -= 3);
    }
    return r;
  }
}, V2 = [9, 13, 19], K2 = 19, $2 = 7.5, Xc = (a) => a === 0 ? 1 : 0;
function k2(a) {
  const u = a.options?.boardSize;
  return typeof u == "number" && V2.includes(u) ? u : K2;
}
function $c(a, u) {
  const c = Math.floor(a / u), f = a % u, r = [];
  return c > 0 && r.push(a - u), c < u - 1 && r.push(a + u), f > 0 && r.push(a - 1), f < u - 1 && r.push(a + 1), r;
}
function er(a, u, c) {
  const f = a[u], r = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
  if (f == null) return { stones: r, liberties: d };
  const m = [u];
  for (r.add(u); m.length > 0; ) {
    const p = m.pop();
    for (const g of $c(p, c))
      a[g] == null ? d.add(g) : a[g] === f && !r.has(g) && (r.add(g), m.push(g));
  }
  return { stones: r, liberties: d };
}
function om(a, u, c, f) {
  const r = [...a];
  r[u] = c;
  const d = Xc(c), m = [];
  for (const p of $c(u, f)) {
    if (r[p] !== d) continue;
    const g = er(r, p, f);
    if (g.liberties.size === 0)
      for (const y of g.stones)
        r[y] = null, m.push(y);
  }
  return { board: r, captured: m };
}
function nr(a, u) {
  if (u < 0 || u >= a.size * a.size || a.board[u] != null || u === a.ko) return !1;
  const { board: c } = om(a.board, u, a.currentSeat, a.size);
  return er(c, u, a.size).liberties.size > 0;
}
function fm(a, u) {
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
      for (const v of $c(y, u)) {
        const b = a[v];
        b == null ? r[v] || (r[v] = !0, g.push(v)) : p.add(b);
      }
    }
    p.size === 1 && (p.has(0) ? c += m.length : f += m.length);
  }
  return { black: c, white: f + $2 };
}
function J2(a) {
  const u = [];
  for (let c = 0; c < a.size * a.size; c++)
    nr(a, c) && u.push({ point: c });
  return u.push({ point: null }), u;
}
function Xu(a) {
  if (a.passes < 2) return { state: "playing" };
  const { black: u, white: c } = fm(a.board, a.size);
  return { state: "win", winners: [u > c ? 0 : 1] };
}
function jh(a, u) {
  return Xu(a).state !== "playing" ? !1 : u.point == null ? !0 : nr(a, u.point);
}
function W2(a, u, c, f) {
  for (const v of $c(u, f))
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
    const j = r + v, N = d + b;
    j < 0 || j >= f || N < 0 || N >= f || (m++, a[j * f + N] === Xc(c) && p++);
  }
  return m < 4 ? p === 0 : p <= 1;
}
function F2(a) {
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
        const b = p + y, j = g + v;
        if (b < 0 || b >= u || j < 0 || j >= u) continue;
        const N = b * u + j;
        a.board[N] == null && r.add(N);
      }
  }
  const d = [];
  for (const m of r)
    nr(a, m) && (W2(a.board, m, a.currentSeat, u) || d.push({ point: m }));
  return d.push({ point: null }), d;
}
const I2 = {
  id: "go",
  name: "Go",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    const u = k2(a);
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
  getStatus: Xu,
  getCurrentSeat(a) {
    return Xu(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return Xu(a).state === "playing" ? J2(a) : [];
  },
  isLegalMove: jh,
  applyMove(a, u) {
    if (!jh(a, u))
      throw new Error(`Illegal Go move: ${JSON.stringify(u)}`);
    const c = a.currentSeat;
    if (u.point == null)
      return {
        size: a.size,
        board: a.board,
        currentSeat: Xc(c),
        ko: null,
        passes: a.passes + 1,
        captures: a.captures,
        lastMove: null
      };
    const { board: f, captured: r } = om(a.board, u.point, c, a.size);
    let d = null;
    if (r.length === 1) {
      const p = er(f, u.point, a.size);
      p.stones.size === 1 && p.liberties.size === 1 && (d = r[0]);
    }
    const m = [...a.captures];
    return m[c] = m[c] + r.length, {
      size: a.size,
      board: f,
      currentSeat: Xc(c),
      ko: d,
      passes: 0,
      captures: m,
      lastMove: u.point
    };
  },
  evaluate(a, u) {
    const { black: c, white: f } = fm(a.board, a.size), r = c - f;
    return u === 0 ? r : -r;
  },
  /** AI hint: a focused move set — see {@link candidateMoves}. */
  getCandidateMoves(a) {
    return Xu(a).state === "playing" ? F2(a) : [];
  }
}, sm = 15, P2 = 5, Ft = sm, jc = P2, Ku = Ft * Ft, tS = Math.floor(Ft / 2) * Ft + Math.floor(Ft / 2), vc = 2, rm = [
  [0, 1],
  // horizontal
  [1, 0],
  // vertical
  [1, 1],
  // diagonal ↘
  [1, -1]
  // diagonal ↙
], dm = (a) => Math.floor(a / Ft), hm = (a) => a % Ft;
function lS(a, u, c, f, r) {
  let d = 1;
  const m = dm(u), p = hm(u);
  for (const g of [1, -1]) {
    let y = m + f * g, v = p + r * g;
    for (; y >= 0 && y < Ft && v >= 0 && v < Ft && a[y * Ft + v] === c; )
      d++, y += f * g, v += r * g;
  }
  return d;
}
function ym(a, u) {
  const c = a[u];
  if (c == null) return null;
  for (const [f, r] of rm)
    if (lS(a, u, c, f, r) >= jc) return c;
  return null;
}
function eS(a) {
  for (let u = 0; u < Ku; u++) {
    if (a[u] == null) continue;
    const c = ym(a, u);
    if (c != null) return c;
  }
  return null;
}
function Zu(a) {
  const u = a.lastCell >= 0 ? ym(a.board, a.lastCell) : eS(a.board);
  return u != null ? { state: "win", winners: [u] } : a.board.every((c) => c != null) ? { state: "draw" } : { state: "playing" };
}
function Nh(a, u) {
  return Number.isInteger(u.cell) && u.cell >= 0 && u.cell < Ku && a.board[u.cell] == null && Zu(a).state === "playing";
}
function nS() {
  const a = [];
  for (let u = 0; u < Ft; u++)
    for (let c = 0; c < Ft; c++)
      for (const [f, r] of rm) {
        const d = u + f * (jc - 1), m = c + r * (jc - 1);
        if (d < 0 || d >= Ft || m < 0 || m >= Ft) continue;
        const p = [];
        for (let g = 0; g < jc; g++) p.push((u + f * g) * Ft + (c + r * g));
        a.push(p);
      }
  return a;
}
const aS = nS(), Uh = [0, 1, 10, 60, 350], uS = {
  id: "gomoku",
  name: "Five in a Row (Gomoku)",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    return { board: Array(Ku).fill(null), currentSeat: 0, lastCell: -1 };
  },
  getStatus: Zu,
  getCurrentSeat(a) {
    return Zu(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    if (Zu(a).state !== "playing") return [];
    const u = [];
    for (let c = 0; c < Ku; c++)
      a.board[c] == null && u.push({ cell: c });
    return u;
  },
  isLegalMove: Nh,
  applyMove(a, u) {
    if (!Nh(a, u))
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
    for (const d of aS) {
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
      g || (m > 0 ? r += Uh[m] ?? 0 : p > 0 && (r -= Uh[p] ?? 0));
    }
    return r;
  },
  /**
   * AI hint: only empty cells within {@link CANDIDATE_RADIUS} of an existing
   * stone (the opening move goes to the centre). Searching all 225 cells would
   * make minimax unusably slow; relevant Gomoku moves are always near play.
   */
  getCandidateMoves(a) {
    if (Zu(a).state !== "playing") return [];
    const u = /* @__PURE__ */ new Set();
    let c = !1;
    for (let f = 0; f < Ku; f++) {
      if (a.board[f] == null) continue;
      c = !0;
      const r = dm(f), d = hm(f);
      for (let m = -vc; m <= vc; m++)
        for (let p = -vc; p <= vc; p++) {
          const g = r + m, y = d + p;
          if (g < 0 || g >= Ft || y < 0 || y >= Ft) continue;
          const v = g * Ft + y;
          a.board[v] == null && u.add(v);
        }
    }
    return c ? [...u].map((f) => ({ cell: f })) : [{ cell: tS }];
  }
}, $u = 24, Hh = 9, iS = [
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
], mm = [
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
], cS = 60, Ua = (a) => a === 0 ? 1 : 0;
function gm(a, u, c) {
  return mm.some((f) => f.includes(u) && f.every((r) => a[r] === c));
}
function oS(a, u) {
  const c = [];
  for (let r = 0; r < $u; r++) a[r] === u && c.push(r);
  const f = c.filter((r) => !gm(a, r, u));
  return f.length > 0 ? f : c;
}
function vs(a, u, c, f) {
  const r = [...a];
  if (c != null && (r[c] = null), r[f] = u, !gm(r, f, u)) return [{ from: c, to: f, remove: null }];
  const d = oS(r, Ua(u));
  return d.length === 0 ? [{ from: c, to: f, remove: null }] : d.map((m) => ({ from: c, to: f, remove: m }));
}
function ar(a) {
  const u = a.currentSeat, c = a.board, f = [];
  if (a.toPlace[u] > 0) {
    for (let d = 0; d < $u; d++)
      c[d] == null && f.push(...vs(c, u, null, d));
    return f;
  }
  const r = a.onBoard[u] === 3;
  for (let d = 0; d < $u; d++)
    if (c[d] === u)
      if (r)
        for (let m = 0; m < $u; m++)
          c[m] == null && f.push(...vs(c, u, d, m));
      else
        for (const m of iS[d])
          c[m] == null && f.push(...vs(c, u, d, m));
  return f;
}
function Nc(a) {
  for (const u of [0, 1])
    if (a.toPlace[u] === 0 && a.onBoard[u] < 3)
      return { state: "win", winners: [Ua(u)] };
  return a.sinceCapture >= cS ? { state: "draw" } : ar(a).length === 0 ? { state: "win", winners: [Ua(a.currentSeat)] } : { state: "playing" };
}
function Bh(a, u) {
  return Nc(a).state !== "playing" ? !1 : ar(a).some(
    (c) => c.from === u.from && c.to === u.to && c.remove === u.remove
  );
}
const fS = {
  id: "nine-mens-morris",
  name: "Nine Men's Morris",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    return {
      board: Array($u).fill(null),
      currentSeat: 0,
      toPlace: [Hh, Hh],
      onBoard: [0, 0],
      sinceCapture: 0,
      lastMove: null
    };
  },
  getStatus: Nc,
  getCurrentSeat(a) {
    return Nc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return Nc(a).state === "playing" ? ar(a) : [];
  },
  isLegalMove: Bh,
  applyMove(a, u) {
    if (!Bh(a, u))
      throw new Error(`Illegal Nine Men's Morris move: ${JSON.stringify(u)}`);
    const c = a.currentSeat, f = [...a.board], r = [...a.toPlace], d = [...a.onBoard];
    if (u.from != null ? f[u.from] = null : (r[c] = r[c] - 1, d[c] = d[c] + 1), f[u.to] = c, u.remove != null) {
      f[u.remove] = null;
      const m = Ua(c);
      d[m] = d[m] - 1;
    }
    return {
      board: f,
      currentSeat: Ua(c),
      toPlace: r,
      onBoard: d,
      sinceCapture: u.remove != null ? 0 : a.sinceCapture + 1,
      lastMove: { from: u.from, to: u.to, remove: u.remove }
    };
  },
  evaluate(a, u) {
    const c = Ua(u), f = (d) => a.onBoard[d] + a.toPlace[d];
    let r = (f(u) - f(c)) * 8;
    for (const d of mm)
      d.every((m) => a.board[m] === u) ? r += 3 : d.every((m) => a.board[m] === c) && (r -= 3);
    return r;
  }
}, pm = 8, ul = pm, sS = (a) => Math.floor(a / ul), rS = (a) => a % ul, Xs = (a) => a === 0 ? 1 : 0, dS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
], Lh = [
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
function Zs(a, u, c) {
  if (a[u] != null) return [];
  const f = Xs(c), r = [];
  for (const [d, m] of dS) {
    const p = [];
    let g = sS(u) + d, y = rS(u) + m;
    for (; g >= 0 && g < ul && y >= 0 && y < ul && a[g * ul + y] === f; )
      p.push(g * ul + y), g += d, y += m;
    p.length > 0 && g >= 0 && g < ul && y >= 0 && y < ul && a[g * ul + y] === c && r.push(...p);
  }
  return r;
}
function _a(a, u) {
  const c = [];
  for (let f = 0; f < a.length; f++)
    a[f] == null && Zs(a, f, u).length > 0 && c.push({ cell: f });
  return c;
}
function Sc(a) {
  if (_a(a.board, a.currentSeat).length > 0) return { state: "playing" };
  let u = 0, c = 0;
  for (const f of a.board)
    f === 0 ? u++ : f === 1 && c++;
  return u === c ? { state: "draw" } : { state: "win", winners: [u > c ? 0 : 1] };
}
const hS = {
  id: "reversi",
  name: "Reversi",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    const u = Array(ul * ul).fill(null), c = ul / 2;
    return u[(c - 1) * ul + (c - 1)] = 1, u[c * ul + c] = 1, u[(c - 1) * ul + c] = 0, u[c * ul + (c - 1)] = 0, { board: u, currentSeat: 0, lastMove: null };
  },
  getStatus: Sc,
  getCurrentSeat(a) {
    return Sc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return Sc(a).state === "playing" ? _a(a.board, a.currentSeat) : [];
  },
  isLegalMove(a, u) {
    return Sc(a).state === "playing" && a.board[u.cell] == null && Zs(a.board, u.cell, a.currentSeat).length > 0;
  },
  applyMove(a, u) {
    const c = Zs(a.board, u.cell, a.currentSeat);
    if (a.board[u.cell] != null || c.length === 0)
      throw new Error(`Illegal Reversi move: cell ${u.cell}`);
    const f = [...a.board];
    f[u.cell] = a.currentSeat;
    for (const m of c) f[m] = a.currentSeat;
    const r = Xs(a.currentSeat), d = _a(f, r).length > 0 ? r : _a(f, a.currentSeat).length > 0 ? a.currentSeat : r;
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
    const c = Xs(u);
    let f = 0;
    for (let d = 0; d < a.board.length; d++) {
      const m = a.board[d];
      m === u ? f += Lh[d] : m === c && (f -= Lh[d]);
    }
    const r = _a(a.board, u).length - _a(a.board, c).length;
    return f + r * 3;
  }
}, vm = 9, il = vm, yS = 400, Zc = ["r", "b", "g", "s", "n", "l", "p"], Wu = (a) => Math.floor(a / il), Sm = (a) => a % il, gl = (a, u) => a * il + u, Yh = (a, u) => a >= 0 && a < il && u >= 0 && u < il, ur = (a) => a === 0 ? 1 : 0, mS = (a) => a === 0 ? -1 : 1, wh = () => ({ r: 0, b: 0, g: 0, s: 0, n: 0, l: 0, p: 0 });
function gS(a) {
  const u = mS(a.seat), c = [[u, 0], [-u, 0], [0, -1], [0, 1]], f = [[u, -1], [u, 1], [-u, -1], [-u, 1]], r = [[u, 0], [u, -1], [u, 1], [0, -1], [0, 1], [-u, 0]], d = a.type;
  return d === "k" ? { steps: [...c, ...f], slides: [], jumps: [] } : d === "g" ? { steps: r, slides: [], jumps: [] } : d === "r" ? { steps: a.promoted ? f : [], slides: c, jumps: [] } : d === "b" ? { steps: a.promoted ? c : [], slides: f, jumps: [] } : a.promoted ? { steps: r, slides: [], jumps: [] } : d === "s" ? { steps: [[u, 0], ...f], slides: [], jumps: [] } : d === "n" ? { steps: [], slides: [], jumps: [[2 * u, -1], [2 * u, 1]] } : d === "l" ? { steps: [], slides: [[u, 0]], jumps: [] } : { steps: [[u, 0]], slides: [], jumps: [] };
}
function bm(a, u) {
  const c = a[u];
  if (!c) return [];
  const { steps: f, slides: r, jumps: d } = gS(c), m = Wu(u), p = Sm(u), g = [];
  for (const [y, v] of [...f, ...d]) {
    if (!Yh(m + y, p + v)) continue;
    const b = a[gl(m + y, p + v)];
    (!b || b.seat !== c.seat) && g.push(gl(m + y, p + v));
  }
  for (const [y, v] of r) {
    let b = m + y, j = p + v;
    for (; Yh(b, j); ) {
      const N = a[gl(b, j)];
      if (!N) g.push(gl(b, j));
      else {
        N.seat !== c.seat && g.push(gl(b, j));
        break;
      }
      b += y, j += v;
    }
  }
  return g;
}
function pS(a, u) {
  for (let c = 0; c < a.length; c++) {
    const f = a[c];
    if (f && f.seat === u && f.type === "k") return c;
  }
  return -1;
}
function vS(a, u, c) {
  for (let f = 0; f < a.length; f++) {
    const r = a[f];
    if (!(!r || r.seat !== c) && bm(a, f).includes(u))
      return !0;
  }
  return !1;
}
const Gh = (a, u) => a === 0 ? u <= 2 : u >= il - 3, Qs = (a, u) => a === 0 ? u === 0 : u === il - 1, Mm = (a, u) => a === 0 ? u <= 1 : u >= il - 2, SS = ["r", "b", "s", "n", "l", "p"];
function bS(a, u, c) {
  return a.promoted || !SS.includes(a.type) ? !1 : Gh(a.seat, Wu(u)) || Gh(a.seat, Wu(c));
}
function MS(a, u) {
  const c = Wu(u);
  return a.type === "p" || a.type === "l" ? Qs(a.seat, c) : a.type === "n" ? Mm(a.seat, c) : !1;
}
function ES(a, u, c, f) {
  const r = Wu(c);
  if (a === "l") return !Qs(u, r);
  if (a === "n") return !Mm(u, r);
  if (a === "p") {
    if (Qs(u, r)) return !1;
    const d = Sm(c);
    for (let m = 0; m < il; m++) {
      const p = f[gl(m, d)];
      if (p && p.seat === u && p.type === "p" && !p.promoted) return !1;
    }
    return !0;
  }
  return !0;
}
function xS(a, u, c) {
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
function ir(a) {
  const u = a.currentSeat, c = [], f = (r) => {
    const d = xS(a.board, u, r);
    return !vS(d, pS(d, u), ur(u));
  };
  for (let r = 0; r < a.board.length; r++) {
    const d = a.board[r];
    if (!(!d || d.seat !== u))
      for (const m of bm(a.board, r)) {
        const p = bS(d, r, m) ? MS(d, m) ? [!0] : [!1, !0] : [!1];
        for (const g of p) {
          const y = { from: r, to: m, drop: null, promote: g };
          f(y) && c.push(y);
        }
      }
  }
  for (const r of Zc)
    if (!(a.hands[u][r] <= 0))
      for (let d = 0; d < a.board.length; d++) {
        if (a.board[d] != null || !ES(r, u, d, a.board)) continue;
        const m = { from: null, to: d, drop: r, promote: !1 };
        f(m) && c.push(m);
      }
  return c;
}
function Uc(a) {
  return a.ply >= yS ? { state: "draw" } : ir(a).length === 0 ? { state: "win", winners: [ur(a.currentSeat)] } : { state: "playing" };
}
function qh(a, u) {
  return Uc(a).state !== "playing" ? !1 : ir(a).some(
    (c) => c.from === u.from && c.to === u.to && c.drop === u.drop && c.promote === u.promote
  );
}
const Xh = { p: 1, l: 3, n: 4, s: 5, g: 6, b: 8, r: 11, k: 0 }, TS = {
  p: 6,
  l: 6,
  n: 6,
  s: 6,
  b: 10,
  r: 13,
  g: 6,
  k: 0
}, Zh = ["l", "n", "s", "g", "k", "g", "s", "n", "l"], AS = {
  id: "shogi",
  name: "Shogi",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    const u = Array(il * il).fill(null);
    for (let c = 0; c < il; c++)
      u[gl(0, c)] = { seat: 1, type: Zh[c], promoted: !1 }, u[gl(il - 1, c)] = { seat: 0, type: Zh[c], promoted: !1 }, u[gl(2, c)] = { seat: 1, type: "p", promoted: !1 }, u[gl(il - 3, c)] = { seat: 0, type: "p", promoted: !1 };
    return u[gl(1, 1)] = { seat: 1, type: "r", promoted: !1 }, u[gl(1, 7)] = { seat: 1, type: "b", promoted: !1 }, u[gl(il - 2, 1)] = { seat: 0, type: "b", promoted: !1 }, u[gl(il - 2, 7)] = { seat: 0, type: "r", promoted: !1 }, {
      board: u,
      currentSeat: 0,
      hands: [wh(), wh()],
      ply: 0,
      lastMove: null
    };
  },
  getStatus: Uc,
  getCurrentSeat(a) {
    return Uc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    return Uc(a).state === "playing" ? ir(a) : [];
  },
  isLegalMove: qh,
  applyMove(a, u) {
    if (!qh(a, u))
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
      currentSeat: ur(c),
      hands: r,
      ply: a.ply + 1,
      lastMove: { from: u.from, to: u.to }
    };
  },
  evaluate(a, u) {
    let c = 0;
    for (const f of a.board) {
      if (!f) continue;
      const r = f.promoted ? TS[f.type] : Xh[f.type];
      c += f.seat === u ? r : -r;
    }
    for (const f of [0, 1])
      for (const r of Zc) {
        const d = a.hands[f][r] * Xh[r];
        c += f === u ? d : -d;
      }
    return c;
  }
}, zS = [
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
function _S(a) {
  for (const [u, c, f] of zS) {
    const r = a[u];
    if (r != null && r === a[c] && r === a[f]) return r;
  }
  return null;
}
function Hc(a) {
  const u = _S(a.board);
  return u != null ? { state: "win", winners: [u] } : a.board.every((c) => c != null) ? { state: "draw" } : { state: "playing" };
}
function Qh(a, u) {
  return Number.isInteger(u.cell) && u.cell >= 0 && u.cell < 9 && a.board[u.cell] == null && Hc(a).state === "playing";
}
const OS = {
  id: "tic-tac-toe",
  name: "Tic-Tac-Toe",
  minPlayers: 2,
  maxPlayers: 2,
  createInitialState(a) {
    return { board: Array(9).fill(null), currentSeat: 0 };
  },
  getStatus: Hc,
  getCurrentSeat(a) {
    return Hc(a).state === "playing" ? a.currentSeat : null;
  },
  getLegalMoves(a) {
    if (Hc(a).state !== "playing") return [];
    const u = [];
    return a.board.forEach((c, f) => {
      c == null && u.push({ cell: f });
    }), u;
  },
  isLegalMove: Qh,
  applyMove(a, u) {
    if (!Qh(a, u))
      throw new Error(`Illegal Tic-Tac-Toe move: cell ${u.cell}`);
    const c = [...a.board];
    return c[u.cell] = a.currentSeat, { board: c, currentSeat: a.currentSeat === 0 ? 1 : 0 };
  }
}, CS = [
  OS,
  Q2,
  uS,
  hS,
  w2,
  D2,
  o2,
  Xv,
  fS,
  AS,
  I2,
  M2
];
for (const a of CS)
  ku.has(a.id) || ku.register(a);
var Ss = { exports: {} }, ot = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vh;
function DS() {
  if (Vh) return ot;
  Vh = 1;
  var a = Symbol.for("react.transitional.element"), u = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), m = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), j = Symbol.iterator;
  function N(x) {
    return x === null || typeof x != "object" ? null : (x = j && x[j] || x["@@iterator"], typeof x == "function" ? x : null);
  }
  var X = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, $ = Object.assign, G = {};
  function Z(x, w, F) {
    this.props = x, this.context = w, this.refs = G, this.updater = F || X;
  }
  Z.prototype.isReactComponent = {}, Z.prototype.setState = function(x, w) {
    if (typeof x != "object" && typeof x != "function" && x != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, x, w, "setState");
  }, Z.prototype.forceUpdate = function(x) {
    this.updater.enqueueForceUpdate(this, x, "forceUpdate");
  };
  function V() {
  }
  V.prototype = Z.prototype;
  function Q(x, w, F) {
    this.props = x, this.context = w, this.refs = G, this.updater = F || X;
  }
  var C = Q.prototype = new V();
  C.constructor = Q, $(C, Z.prototype), C.isPureReactComponent = !0;
  var M = Array.isArray;
  function T() {
  }
  var Y = { H: null, A: null, T: null, S: null }, W = Object.prototype.hasOwnProperty;
  function k(x, w, F) {
    var tt = F.ref;
    return {
      $$typeof: a,
      type: x,
      key: w,
      ref: tt !== void 0 ? tt : null,
      props: F
    };
  }
  function q(x, w) {
    return k(x.type, w, x.props);
  }
  function K(x) {
    return typeof x == "object" && x !== null && x.$$typeof === a;
  }
  function at(x) {
    var w = { "=": "=0", ":": "=2" };
    return "$" + x.replace(/[=:]/g, function(F) {
      return w[F];
    });
  }
  var St = /\/+/g;
  function bt(x, w) {
    return typeof x == "object" && x !== null && x.key != null ? at("" + x.key) : w.toString(36);
  }
  function Mt(x) {
    switch (x.status) {
      case "fulfilled":
        return x.value;
      case "rejected":
        throw x.reason;
      default:
        switch (typeof x.status == "string" ? x.then(T, T) : (x.status = "pending", x.then(
          function(w) {
            x.status === "pending" && (x.status = "fulfilled", x.value = w);
          },
          function(w) {
            x.status === "pending" && (x.status = "rejected", x.reason = w);
          }
        )), x.status) {
          case "fulfilled":
            return x.value;
          case "rejected":
            throw x.reason;
        }
    }
    throw x;
  }
  function U(x, w, F, tt, ft) {
    var dt = typeof x;
    (dt === "undefined" || dt === "boolean") && (x = null);
    var zt = !1;
    if (x === null) zt = !0;
    else
      switch (dt) {
        case "bigint":
        case "string":
        case "number":
          zt = !0;
          break;
        case "object":
          switch (x.$$typeof) {
            case a:
            case u:
              zt = !0;
              break;
            case v:
              return zt = x._init, U(
                zt(x._payload),
                w,
                F,
                tt,
                ft
              );
          }
      }
    if (zt)
      return ft = ft(x), zt = tt === "" ? "." + bt(x, 0) : tt, M(ft) ? (F = "", zt != null && (F = zt.replace(St, "$&/") + "/"), U(ft, w, F, "", function(Ya) {
        return Ya;
      })) : ft != null && (K(ft) && (ft = q(
        ft,
        F + (ft.key == null || x && x.key === ft.key ? "" : ("" + ft.key).replace(
          St,
          "$&/"
        ) + "/") + zt
      )), w.push(ft)), 1;
    zt = 0;
    var cl = tt === "" ? "." : tt + ":";
    if (M(x))
      for (var Yt = 0; Yt < x.length; Yt++)
        tt = x[Yt], dt = cl + bt(tt, Yt), zt += U(
          tt,
          w,
          F,
          dt,
          ft
        );
    else if (Yt = N(x), typeof Yt == "function")
      for (x = Yt.call(x), Yt = 0; !(tt = x.next()).done; )
        tt = tt.value, dt = cl + bt(tt, Yt++), zt += U(
          tt,
          w,
          F,
          dt,
          ft
        );
    else if (dt === "object") {
      if (typeof x.then == "function")
        return U(
          Mt(x),
          w,
          F,
          tt,
          ft
        );
      throw w = String(x), Error(
        "Objects are not valid as a React child (found: " + (w === "[object Object]" ? "object with keys {" + Object.keys(x).join(", ") + "}" : w) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return zt;
  }
  function J(x, w, F) {
    if (x == null) return x;
    var tt = [], ft = 0;
    return U(x, tt, "", "", function(dt) {
      return w.call(F, dt, ft++);
    }), tt;
  }
  function et(x) {
    if (x._status === -1) {
      var w = x._result;
      w = w(), w.then(
        function(F) {
          (x._status === 0 || x._status === -1) && (x._status = 1, x._result = F);
        },
        function(F) {
          (x._status === 0 || x._status === -1) && (x._status = 2, x._result = F);
        }
      ), x._status === -1 && (x._status = 0, x._result = w);
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var pt = typeof reportError == "function" ? reportError : function(x) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var w = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof x == "object" && x !== null && typeof x.message == "string" ? String(x.message) : String(x),
        error: x
      });
      if (!window.dispatchEvent(w)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", x);
      return;
    }
    console.error(x);
  }, Tt = {
    map: J,
    forEach: function(x, w, F) {
      J(
        x,
        function() {
          w.apply(this, arguments);
        },
        F
      );
    },
    count: function(x) {
      var w = 0;
      return J(x, function() {
        w++;
      }), w;
    },
    toArray: function(x) {
      return J(x, function(w) {
        return w;
      }) || [];
    },
    only: function(x) {
      if (!K(x))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return x;
    }
  };
  return ot.Activity = b, ot.Children = Tt, ot.Component = Z, ot.Fragment = c, ot.Profiler = r, ot.PureComponent = Q, ot.StrictMode = f, ot.Suspense = g, ot.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Y, ot.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(x) {
      return Y.H.useMemoCache(x);
    }
  }, ot.cache = function(x) {
    return function() {
      return x.apply(null, arguments);
    };
  }, ot.cacheSignal = function() {
    return null;
  }, ot.cloneElement = function(x, w, F) {
    if (x == null)
      throw Error(
        "The argument must be a React element, but you passed " + x + "."
      );
    var tt = $({}, x.props), ft = x.key;
    if (w != null)
      for (dt in w.key !== void 0 && (ft = "" + w.key), w)
        !W.call(w, dt) || dt === "key" || dt === "__self" || dt === "__source" || dt === "ref" && w.ref === void 0 || (tt[dt] = w[dt]);
    var dt = arguments.length - 2;
    if (dt === 1) tt.children = F;
    else if (1 < dt) {
      for (var zt = Array(dt), cl = 0; cl < dt; cl++)
        zt[cl] = arguments[cl + 2];
      tt.children = zt;
    }
    return k(x.type, ft, tt);
  }, ot.createContext = function(x) {
    return x = {
      $$typeof: m,
      _currentValue: x,
      _currentValue2: x,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, x.Provider = x, x.Consumer = {
      $$typeof: d,
      _context: x
    }, x;
  }, ot.createElement = function(x, w, F) {
    var tt, ft = {}, dt = null;
    if (w != null)
      for (tt in w.key !== void 0 && (dt = "" + w.key), w)
        W.call(w, tt) && tt !== "key" && tt !== "__self" && tt !== "__source" && (ft[tt] = w[tt]);
    var zt = arguments.length - 2;
    if (zt === 1) ft.children = F;
    else if (1 < zt) {
      for (var cl = Array(zt), Yt = 0; Yt < zt; Yt++)
        cl[Yt] = arguments[Yt + 2];
      ft.children = cl;
    }
    if (x && x.defaultProps)
      for (tt in zt = x.defaultProps, zt)
        ft[tt] === void 0 && (ft[tt] = zt[tt]);
    return k(x, dt, ft);
  }, ot.createRef = function() {
    return { current: null };
  }, ot.forwardRef = function(x) {
    return { $$typeof: p, render: x };
  }, ot.isValidElement = K, ot.lazy = function(x) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: x },
      _init: et
    };
  }, ot.memo = function(x, w) {
    return {
      $$typeof: y,
      type: x,
      compare: w === void 0 ? null : w
    };
  }, ot.startTransition = function(x) {
    var w = Y.T, F = {};
    Y.T = F;
    try {
      var tt = x(), ft = Y.S;
      ft !== null && ft(F, tt), typeof tt == "object" && tt !== null && typeof tt.then == "function" && tt.then(T, pt);
    } catch (dt) {
      pt(dt);
    } finally {
      w !== null && F.types !== null && (w.types = F.types), Y.T = w;
    }
  }, ot.unstable_useCacheRefresh = function() {
    return Y.H.useCacheRefresh();
  }, ot.use = function(x) {
    return Y.H.use(x);
  }, ot.useActionState = function(x, w, F) {
    return Y.H.useActionState(x, w, F);
  }, ot.useCallback = function(x, w) {
    return Y.H.useCallback(x, w);
  }, ot.useContext = function(x) {
    return Y.H.useContext(x);
  }, ot.useDebugValue = function() {
  }, ot.useDeferredValue = function(x, w) {
    return Y.H.useDeferredValue(x, w);
  }, ot.useEffect = function(x, w) {
    return Y.H.useEffect(x, w);
  }, ot.useEffectEvent = function(x) {
    return Y.H.useEffectEvent(x);
  }, ot.useId = function() {
    return Y.H.useId();
  }, ot.useImperativeHandle = function(x, w, F) {
    return Y.H.useImperativeHandle(x, w, F);
  }, ot.useInsertionEffect = function(x, w) {
    return Y.H.useInsertionEffect(x, w);
  }, ot.useLayoutEffect = function(x, w) {
    return Y.H.useLayoutEffect(x, w);
  }, ot.useMemo = function(x, w) {
    return Y.H.useMemo(x, w);
  }, ot.useOptimistic = function(x, w) {
    return Y.H.useOptimistic(x, w);
  }, ot.useReducer = function(x, w, F) {
    return Y.H.useReducer(x, w, F);
  }, ot.useRef = function(x) {
    return Y.H.useRef(x);
  }, ot.useState = function(x) {
    return Y.H.useState(x);
  }, ot.useSyncExternalStore = function(x, w, F) {
    return Y.H.useSyncExternalStore(
      x,
      w,
      F
    );
  }, ot.useTransition = function() {
    return Y.H.useTransition();
  }, ot.version = "19.2.0", ot;
}
var Kh;
function cr() {
  return Kh || (Kh = 1, Ss.exports = DS()), Ss.exports;
}
var ct = cr();
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
}, RS = [
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
}, Qc = {
  ...kl,
  background: I.surfaceAlt,
  color: I.text
}, $h = {
  background: I.surface,
  border: `1px solid ${I.border}`,
  borderRadius: 12,
  padding: 20
}, jS = 44, Vs = 62, bs = {
  single: "Single",
  pair: "Pair",
  triple: "Triple",
  straight: "Straight",
  flush: "Flush",
  fullhouse: "Full house",
  quads: "Four of a kind",
  straightflush: "Straight flush"
}, NS = (a, u) => a.length === u.length && a.every((c, f) => c === u[f]);
function kh({ card: a }) {
  const u = Hs(a), c = u === 0 || u === 2;
  return /* @__PURE__ */ z.jsxs(
    "div",
    {
      style: {
        width: jS,
        height: Vs,
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
        /* @__PURE__ */ z.jsx("span", { style: { fontSize: 17, fontWeight: 800, lineHeight: 1 }, children: g2[Pe(a)] ?? "?" }),
        /* @__PURE__ */ z.jsx("span", { style: { fontSize: 21, lineHeight: 1.1 }, children: p2[u] ?? "" })
      ]
    }
  );
}
function US({ w: a, h: u }) {
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
function HS(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, [m, p] = ct.useState(/* @__PURE__ */ new Set()), g = u.hand, y = [...m].filter((V) => g.includes(V)).sort((V, Q) => V - Q), v = r && c.some((V) => V.cards.length === 0), b = r && y.length > 0 && c.some((V) => V.cards.length > 0 && NS(V.cards, y)), j = y.length > 0 ? Gc(y) : null;
  function N(V) {
    r && p((Q) => {
      const C = new Set(Q);
      return C.has(V) ? C.delete(V) : C.add(V), C;
    });
  }
  function X() {
    b && (d({ cards: y }), p(/* @__PURE__ */ new Set()));
  }
  function $() {
    v && (d({ cards: [] }), p(/* @__PURE__ */ new Set()));
  }
  const G = Array.from({ length: u.handSizes.length }, (V, Q) => Q).filter(
    (V) => V !== u.seat
  );
  let Z = "Select cards to play";
  return y.length > 0 && (b && j ? Z = `${bs[j.type]} ✓` : j ? Z = `${bs[j.type]} — can't be played now` : Z = "Not a valid combination"), /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: 480 }, children: [
    /* @__PURE__ */ z.jsx("div", { style: { display: "flex", gap: 26, justifyContent: "center" }, children: G.map((V) => {
      const Q = f === V;
      return /* @__PURE__ */ z.jsxs(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            opacity: Q ? 1 : 0.6
          },
          children: [
            /* @__PURE__ */ z.jsx("div", { style: { position: "relative", width: 46, height: 34 }, children: [0, 1, 2].map((C) => /* @__PURE__ */ z.jsx("div", { style: { position: "absolute", left: C * 8 }, children: /* @__PURE__ */ z.jsx(US, { w: 30, h: 34 }) }, C)) }),
            /* @__PURE__ */ z.jsxs(
              "span",
              {
                style: {
                  fontSize: 12.5,
                  fontWeight: Q ? 700 : 500,
                  color: Q ? I.accent : I.textDim
                },
                children: [
                  "Player ",
                  V + 1,
                  " · ",
                  u.handSizes[V] ?? 0
                ]
              }
            )
          ]
        },
        V
      );
    }) }),
    /* @__PURE__ */ z.jsx(
      "div",
      {
        style: {
          minHeight: Vs + 28,
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
          /* @__PURE__ */ z.jsx("div", { style: { display: "flex", gap: 6 }, children: u.table.cards.map((V) => /* @__PURE__ */ z.jsx(kh, { card: V }, V)) }),
          /* @__PURE__ */ z.jsxs("span", { style: { fontSize: 13, color: I.textDim }, children: [
            "Player ",
            u.table.seat + 1,
            " played a ",
            bs[u.table.type].toLowerCase()
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
          minHeight: Vs + 20,
          paddingLeft: 12
        },
        children: [
          g.length === 0 && /* @__PURE__ */ z.jsx("span", { style: { color: I.textDim, fontSize: 14 }, children: "— no cards —" }),
          g.map((V, Q) => {
            const C = y.includes(V);
            return /* @__PURE__ */ z.jsx(
              "div",
              {
                onClick: () => N(V),
                style: {
                  marginLeft: Q === 0 ? 0 : -12,
                  position: "relative",
                  zIndex: C ? 100 + Q : Q,
                  cursor: r ? "pointer" : "default",
                  transform: C ? "translateY(-16px)" : "none",
                  transition: "transform 110ms ease",
                  borderRadius: 6,
                  outline: C ? `2px solid ${I.accent}` : "none"
                },
                children: /* @__PURE__ */ z.jsx(kh, { card: V })
              },
              V
            );
          })
        ]
      }
    ),
    /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ z.jsx("span", { style: { fontSize: 13, color: b ? I.accent : I.textDim, minHeight: 16 }, children: r ? Z : "" }),
      /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ z.jsx(
          "button",
          {
            onClick: X,
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
            onClick: $,
            disabled: !v,
            style: {
              ...Qc,
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
const BS = "miniboard.settings";
function LS() {
  return { confirmMove: !1, seatColors: [...RS] };
}
function YS() {
  const a = LS();
  if (typeof localStorage > "u") return a;
  try {
    const u = localStorage.getItem(BS);
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
let wS = YS();
const Jh = /* @__PURE__ */ new Set();
function GS() {
  return wS;
}
function Ae() {
  return ct.useSyncExternalStore(
    (a) => (Jh.add(a), () => Jh.delete(a)),
    GS
  );
}
const Hn = ky, Vl = 52, Fe = Vl * 0.72, Da = (a) => Math.floor(a / Hn), Ra = (a) => a % Hn;
function qS(a) {
  const u = [a.from];
  let c = a.from;
  for (const f of a.captures)
    c = (2 * Da(f) - Da(c)) * Hn + (2 * Ra(f) - Ra(c)), u.push(c);
  return u[u.length - 1] !== a.to && u.push(a.to), u;
}
function XS(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m, seatColors: p } = Ae(), [g, y] = ct.useState(null), [v, b] = ct.useState(null), [j, N] = ct.useState(null), X = ct.useRef(null), $ = ct.useRef(null);
  ct.useEffect(() => {
    const k = u.lastMove;
    if (k != null && k !== $.current) {
      $.current = k;
      const q = u.board[k.to];
      q && N({ move: k, piece: q });
    }
  }, [u.lastMove, u.board]), ct.useEffect(() => {
    if (!j) return;
    const k = X.current;
    if (!k) return;
    const q = qS(j.move), K = j.move.to, at = q.map((Mt) => ({
      transform: `translate(${(Ra(Mt) - Ra(K)) * Vl}px, ${(Da(Mt) - Da(K)) * Vl}px)`
    })), St = Math.max(1, q.length - 1), bt = k.animate(at, {
      duration: 160 + St * 150,
      easing: "ease-in-out",
      fill: "backwards"
    });
    return bt.onfinish = () => N(null), () => bt.cancel();
  }, [j]);
  const G = ct.useMemo(() => {
    const k = /* @__PURE__ */ new Map();
    for (const q of c) {
      const K = k.get(q.from);
      K ? K.push(q) : k.set(q.from, [q]);
    }
    return k;
  }, [c]), Z = r && g != null && u.board[g]?.seat === f ? g : null, V = Z != null ? G.get(Z) ?? [] : [], Q = new Set(V.map((k) => k.to)), C = (k) => c.some((q) => q.from === k.from && q.to === k.to), M = m && r && v != null && C(v) ? v : null, T = M != null ? u.board[M.from] : null;
  function Y(k) {
    if (r) {
      if (M != null && k === M.to) {
        b(null);
        return;
      }
      if (Z != null && Q.has(k)) {
        const q = V.find((K) => K.to === k);
        if (!q) return;
        m ? b(q) : (d(q), y(null));
      } else u.board[k]?.seat === f && G.has(k) ? (y((q) => q === k ? null : k), b(null)) : (y(null), b(null));
    }
  }
  function W() {
    M != null && (d(M), y(null), b(null));
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsxs(
      "div",
      {
        style: {
          position: "relative",
          display: "grid",
          gridTemplateColumns: `repeat(${Hn}, ${Vl}px)`,
          gridTemplateRows: `repeat(${Hn}, ${Vl}px)`,
          border: `3px solid ${I.border}`,
          borderRadius: 8,
          overflow: "hidden"
        },
        children: [
          Array.from({ length: Hn * Hn }, (k, q) => {
            const K = Da(q), at = Ra(q), St = (K + at) % 2 === 1, bt = u.board[q], Mt = Z === q, U = Q.has(q), J = M != null && M.from === q, et = M != null && M.to === q, pt = j != null && j.move.to === q, Tt = u.lastMove != null && (u.lastMove.from === q || u.lastMove.to === q), x = r && (U || bt?.seat === f && G.has(q));
            return /* @__PURE__ */ z.jsxs(
              "div",
              {
                onClick: () => Y(q),
                style: {
                  width: Vl,
                  height: Vl,
                  background: St ? "#3c3547" : "#5b5468",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: x ? "pointer" : "default",
                  boxShadow: J || et || Tt ? `inset 0 0 0 3px ${I.accent}` : "none",
                  animation: `${La} 220ms ease-out ${(K + at) * 26}ms backwards`
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
                        width: Fe,
                        height: Fe,
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
                        width: Fe,
                        height: Fe,
                        borderRadius: "50%",
                        background: p[bt.seat],
                        boxShadow: Mt ? `0 0 0 3px ${I.text}` : "inset 0 -3px 7px rgba(0,0,0,0.4)",
                        // The staged piece dims while it waits on its from-square.
                        opacity: J ? 0.4 : 1,
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
          j && /* @__PURE__ */ z.jsx(
            "div",
            {
              ref: X,
              style: {
                position: "absolute",
                left: Ra(j.move.to) * Vl + (Vl - Fe) / 2,
                top: Da(j.move.to) * Vl + (Vl - Fe) / 2,
                width: Fe,
                height: Fe,
                borderRadius: "50%",
                background: p[j.piece.seat],
                boxShadow: "inset 0 -3px 7px rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(0,0,0,0.55)",
                fontSize: 22,
                pointerEvents: "none",
                zIndex: 5
              },
              children: j.piece.king ? "♔" : ""
            }
          )
        ]
      }
    ),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: W,
        disabled: M == null,
        style: {
          ...kl,
          // Stays in the layout (hidden) off-turn so the board never shifts.
          visibility: r ? "visible" : "hidden",
          opacity: M != null ? 1 : 0.4,
          cursor: M != null ? "pointer" : "default"
        },
        children: M != null ? "Confirm move" : Z != null ? "Pick a square" : "Select a piece"
      }
    )
  ] });
}
const Pl = Ly, wl = 52, Uu = (a) => Math.floor(a / Pl), _n = (a) => a % Pl, Ms = {
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟"
}, Es = ["#f3ecdc", "#2c2b34"], xs = ["#2c2b34", "#d8d2c0"];
function ZS(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m } = Ae(), [p, g] = ct.useState(null), [y, v] = ct.useState(null), [b, j] = ct.useState(null), N = ct.useRef(null), X = ct.useRef(null), $ = ct.useRef(null);
  ct.useEffect(() => {
    const q = u.lastMove;
    if (q == null || q === $.current) return;
    $.current = q;
    const K = u.board[q.to];
    if (!K) return;
    let at;
    if (K.type === "k" && Math.abs(_n(q.to) - _n(q.from)) === 2) {
      const St = Uu(q.from), [bt, Mt] = _n(q.to) === 6 ? [St * Pl + 7, St * Pl + 5] : [St * Pl, St * Pl + 3], U = u.board[Mt];
      U && (at = { from: bt, to: Mt, piece: U });
    }
    j({ move: q, piece: K, rook: at });
  }, [u.lastMove, u.board]), ct.useEffect(() => {
    if (!b) return;
    const q = (at, St, bt) => at.animate(
      [
        {
          transform: `translate(${(_n(St) - _n(bt)) * wl}px, ${(Uu(St) - Uu(bt)) * wl}px)`
        },
        { transform: "translate(0px, 0px)" }
      ],
      { duration: 280, easing: "ease-in-out", fill: "backwards" }
    ), K = [];
    if (N.current) {
      const at = q(N.current, b.move.from, b.move.to);
      at.onfinish = () => j(null), K.push(at);
    }
    return b.rook && X.current && K.push(q(X.current, b.rook.from, b.rook.to)), () => K.forEach((at) => at.cancel());
  }, [b]);
  const G = ct.useMemo(() => {
    const q = /* @__PURE__ */ new Map();
    for (const K of c) {
      const at = q.get(K.from);
      at ? at.push(K) : q.set(K.from, [K]);
    }
    return q;
  }, [c]), Z = r && p != null && u.board[p]?.seat === f ? p : null, V = Z != null ? G.get(Z) ?? [] : [], Q = new Set(V.map((q) => q.to)), C = (q) => c.some((K) => K.from === q.from && K.to === q.to), M = m && r && y != null && C(y) ? y : null, T = M != null ? u.board[M.from] : null;
  function Y(q) {
    if (r) {
      if (M != null && q === M.to) {
        v(null);
        return;
      }
      if (Z != null && Q.has(q)) {
        const K = V.find((at) => at.to === q);
        if (!K) return;
        m ? v(K) : (d(K), g(null));
      } else u.board[q]?.seat === f && G.has(q) ? (g((K) => K === q ? null : q), v(null)) : (g(null), v(null));
    }
  }
  function W() {
    M != null && (d(M), g(null), v(null));
  }
  const k = (q, K, at) => /* @__PURE__ */ z.jsx(
    "div",
    {
      ref: q,
      style: {
        position: "absolute",
        left: _n(K) * wl,
        top: Uu(K) * wl,
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
            color: Es[at.seat],
            WebkitTextStroke: `1.4px ${xs[at.seat]}`
          },
          children: Ms[at.type]
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
            const at = Uu(K), St = _n(K), bt = (at + St) % 2 === 1, Mt = u.board[K], U = Z === K, J = Q.has(K), et = M != null && M.from === K, pt = M != null && M.to === K, Tt = b != null && (b.move.to === K || b.rook != null && b.rook.to === K), x = u.lastMove != null && (u.lastMove.from === K || u.lastMove.to === K), w = r && (J || Mt?.seat === f && G.has(K));
            return /* @__PURE__ */ z.jsxs(
              "div",
              {
                onClick: () => Y(K),
                style: {
                  width: wl,
                  height: wl,
                  background: bt ? "#6f6048" : "#b6a079",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  cursor: w ? "pointer" : "default",
                  boxShadow: et || pt ? `inset 0 0 0 3px ${I.accent}` : U ? `inset 0 0 0 3px ${I.text}` : x ? `inset 0 0 0 3px ${I.accent}` : "none",
                  animation: `${La} 220ms ease-out ${(at + St) * 26}ms backwards`
                },
                children: [
                  J && !pt && /* @__PURE__ */ z.jsx(
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
                        color: Es[T.seat],
                        WebkitTextStroke: `1.4px ${xs[T.seat]}`,
                        opacity: 0.45
                      },
                      children: Ms[T.type]
                    }
                  ),
                  Mt && !pt && !Tt && /* @__PURE__ */ z.jsx(
                    "span",
                    {
                      style: {
                        fontSize: 38,
                        lineHeight: 1,
                        color: Es[Mt.seat],
                        WebkitTextStroke: `1.4px ${xs[Mt.seat]}`,
                        // The staged piece dims while it waits on its from-square.
                        opacity: et ? 0.4 : 1
                      },
                      children: Ms[Mt.type]
                    }
                  )
                ]
              },
              K
            );
          }),
          b && k(N, b.move.to, b.piece),
          b?.rook && k(X, b.rook.to, b.rook.piece)
        ]
      }
    ),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: W,
        disabled: M == null,
        style: {
          ...kl,
          // Stays in the layout (hidden) off-turn so the board never shifts.
          visibility: r ? "visible" : "hidden",
          opacity: M != null ? 1 : 0.4,
          cursor: M != null ? "pointer" : "default"
        },
        children: M != null ? "Confirm move" : Z != null ? "Pick a square" : "Select a piece"
      }
    )
  ] });
}
const Qu = Gn, Wh = 16, QS = Math.sqrt(3) / 2, Fh = 8.5, Bc = 10.5, bc = Bc + 5, VS = ["#46303c", "#30463f", "#46432f", "#324a33", "#313a4e", "#4a3a2c"];
function KS(a) {
  return a.x >= 5 ? 0 : a.z <= -5 ? 1 : a.y >= 5 ? 2 : a.x <= -5 ? 3 : a.z >= 5 ? 4 : a.y <= -5 ? 5 : -1;
}
const Rn = (() => {
  const a = Qu.map((g) => 1.5 * g.x * Wh), u = Qu.map((g) => QS * (g.y - g.z) * Wh), c = Math.min(...a), f = Math.min(...u), r = Math.max(...a) - c + 2 * bc, d = Math.max(...u) - f + 2 * bc, m = Qu.map((g, y) => ({ cx: a[y] - c + bc, cy: u[y] - f + bc })), p = Qu.map((g) => Math.max(Math.abs(g.x), Math.abs(g.y), Math.abs(g.z)) * 26);
  return { width: r, height: d, centers: m, delays: p };
})();
function $S(a, u) {
  const c = Rn.centers[a], f = c.cx - u.cx, r = c.cy - u.cy, d = Math.hypot(f, r), m = 10 + Math.min(d, 220) * 0.07;
  return {
    animation: `${Fs} ${Math.min(560, 260 + d * 0.9)}ms ease-in-out both`,
    "--hop-x": `${f}px`,
    "--hop-y": `${r}px`,
    "--hop-mx": `${f / 2}px`,
    "--hop-my": `${r / 2 - m}px`
  };
}
function kS(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m, seatColors: p } = Ae(), [g, y] = ct.useState(null), [v, b] = ct.useState(null), j = ct.useMemo(() => {
    const C = /* @__PURE__ */ new Map();
    for (const M of c) {
      let T = C.get(M.from);
      T || C.set(M.from, T = /* @__PURE__ */ new Set()), T.add(M.to);
    }
    return C;
  }, [c]), N = r && g != null && u.board[g] === f ? g : null, X = N != null ? j.get(N) : void 0, $ = (C) => c.some((M) => M.from === C.from && M.to === C.to), G = m && r && v != null && $(v) ? v : null, Z = G != null ? u.board[G.from] : null;
  function V(C) {
    if (r) {
      if (G != null && C === G.to) {
        b(null);
        return;
      }
      if (N != null && X?.has(C)) {
        const M = { from: N, to: C };
        m ? b(M) : (d(M), y(null));
      } else u.board[C] === f && j.has(C) ? (y((M) => M === C ? null : C), b(null)) : (y(null), b(null));
    }
  }
  function Q() {
    G != null && (d(G), y(null), b(null));
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsx(
      "svg",
      {
        width: Rn.width,
        height: Rn.height,
        viewBox: `0 0 ${Rn.width} ${Rn.height}`,
        style: { display: "block" },
        children: Qu.map((C, M) => {
          const T = Rn.centers[M], Y = u.board[M], W = KS(C), k = N === M, q = X?.has(M) ?? !1, K = G != null && G.from === M, at = G != null && G.to === M, St = u.lastMove != null && (u.lastMove.from === M || u.lastMove.to === M), bt = u.lastMove != null && u.lastMove.to === M ? u.lastMove.from : null, Mt = K || at || St, U = r && (Y === f && j.has(M) || q);
          return /* @__PURE__ */ z.jsxs(
            "g",
            {
              onClick: () => V(M),
              style: {
                cursor: U ? "pointer" : "default",
                animation: `${Ws} 240ms ease-out ${Rn.delays[M]}ms backwards`
              },
              children: [
                /* @__PURE__ */ z.jsx(
                  "circle",
                  {
                    cx: T.cx,
                    cy: T.cy,
                    r: Fh,
                    fill: W >= 0 ? VS[W] : I.surfaceAlt,
                    stroke: Mt ? I.accent : I.border,
                    strokeWidth: Mt ? 2 : 1
                  }
                ),
                q && Y == null && !at && /* @__PURE__ */ z.jsx("circle", { cx: T.cx, cy: T.cy, r: Fh - 2, fill: I.accent, opacity: 0.55 }),
                at && Z != null && // A faint peg previews where the staged move lands.
                /* @__PURE__ */ z.jsx("circle", { cx: T.cx, cy: T.cy, r: Bc, fill: p[Z], opacity: 0.45 }),
                Y != null && !at && (bt != null ? (
                  // The peg that just moved slides and hops in from its old hole.
                  /* @__PURE__ */ z.jsx("g", { style: $S(bt, T), children: /* @__PURE__ */ z.jsx(
                    "circle",
                    {
                      cx: T.cx,
                      cy: T.cy,
                      r: Bc,
                      fill: p[Y],
                      stroke: k ? I.text : "rgba(0,0,0,0.35)",
                      strokeWidth: k ? 3 : 1.5
                    }
                  ) })
                ) : /* @__PURE__ */ z.jsx(
                  "circle",
                  {
                    cx: T.cx,
                    cy: T.cy,
                    r: Bc,
                    fill: p[Y],
                    stroke: k ? I.text : "rgba(0,0,0,0.35)",
                    strokeWidth: k ? 3 : 1.5,
                    opacity: K ? 0.4 : 1
                  }
                ))
              ]
            },
            M
          );
        })
      }
    ),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: Q,
        disabled: G == null,
        style: {
          ...kl,
          // Stays in the layout (hidden) off-turn so the board never shifts.
          visibility: r ? "visible" : "hidden",
          opacity: G != null ? 1 : 0.4,
          cursor: G != null ? "pointer" : "default"
        },
        children: G != null ? "Confirm move" : N != null ? "Pick a destination" : "Select a peg"
      }
    )
  ] });
}
const Ks = um, Em = im, Ts = 54, Mc = 8, JS = "#6a4e9c";
function Ih(a, u) {
  for (let c = Em - 1; c >= 0; c--)
    if (a[c * Ks + u] == null) return c;
  return -1;
}
function WS(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m, seatColors: p } = Ae(), [g, y] = ct.useState(null), [v, b] = ct.useState(null), j = new Set(c.map((Z) => Z.column)), N = m && r && v != null && j.has(v) ? v : null, X = p[f ?? 0] ?? I.accent;
  function $(Z) {
    m ? b((V) => V === Z ? null : Z) : d({ column: Z });
  }
  function G() {
    N != null && (d({ column: N }), b(null));
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsx(
      "div",
      {
        style: {
          display: "flex",
          gap: 0,
          padding: Mc,
          background: JS,
          borderRadius: 16
        },
        children: Array.from({ length: Ks }, (Z, V) => {
          const Q = r && j.has(V), C = N === V, M = Q && g === V ? Ih(u.board, V) : -1, T = C ? Ih(u.board, V) : -1;
          return /* @__PURE__ */ z.jsx(
            "button",
            {
              disabled: !Q,
              onClick: () => {
                Q && $(V);
              },
              onMouseEnter: () => y(V),
              onMouseLeave: () => y((Y) => Y === V ? null : Y),
              style: {
                display: "flex",
                flexDirection: "column",
                gap: Mc,
                // Padding lets the column tint reach into the gaps between
                // columns; the board gap is 0 to keep cell spacing unchanged.
                padding: Mc / 2,
                border: "none",
                borderRadius: 8,
                // The picked column is tinted faintly in the player's colour.
                background: C ? `${X}33` : "transparent",
                cursor: Q ? "pointer" : "default"
              },
              children: Array.from({ length: Em }, (Y, W) => {
                const k = u.board[W * Ks + V], q = k == null && W === T, K = k == null && W === M && !q;
                return /* @__PURE__ */ z.jsx(
                  "span",
                  {
                    style: {
                      width: Ts,
                      height: Ts,
                      borderRadius: "50%",
                      background: q || K ? X : I.bg,
                      // A faint disc marks where a confirmed drop would land.
                      opacity: q ? 0.6 : K ? 0.3 : 1,
                      animation: `${La} 240ms ease-out ${(W + V) * 24}ms backwards`
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
                          animation: `${by} 440ms both`,
                          "--ggr-drop": `${-(W + 1) * (Ts + Mc)}px`
                        }
                      }
                    )
                  },
                  W
                );
              })
            },
            V
          );
        })
      }
    ),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: G,
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
const Ph = ["#1c1c1c", "#f3efe2"], FS = ["#000000", "#b8b09a"], IS = "#dcb86a", Hu = "#3d2f17";
function PS(a) {
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
function tb(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, [m, p] = ct.useState(null), g = u.size, y = 500 / (g - 1), v = Math.min(y, 26), b = y * (g - 1) + v * 2, j = y * 0.46, N = new Set(c.map((Q) => Q.point).filter((Q) => Q != null)), X = r && c.some((Q) => Q.point == null), $ = (Q) => v + Q * y, G = (Q) => $(Q % g), Z = (Q) => $(Math.floor(Q / g));
  function V(Q) {
    r && N.has(Q) && d({ point: Q });
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }, children: [
    /* @__PURE__ */ z.jsxs(
      "svg",
      {
        width: b,
        height: b,
        onMouseLeave: () => p(null),
        style: { background: IS, borderRadius: 8, border: `1px solid ${Hu}` },
        children: [
          Array.from({ length: g }, (Q, C) => /* @__PURE__ */ z.jsxs("g", { children: [
            /* @__PURE__ */ z.jsx("line", { x1: $(0), y1: $(C), x2: $(g - 1), y2: $(C), stroke: Hu, strokeWidth: 1.3 }),
            /* @__PURE__ */ z.jsx("line", { x1: $(C), y1: $(0), x2: $(C), y2: $(g - 1), stroke: Hu, strokeWidth: 1.3 })
          ] }, C)),
          PS(g).map(([Q, C], M) => /* @__PURE__ */ z.jsx("circle", { cx: $(C), cy: $(Q), r: Math.max(2.6, j * 0.22), fill: Hu }, `s${M}`)),
          Array.from({ length: g * g }, (Q, C) => {
            const M = G(C), T = Z(C), Y = u.board[C], W = r && N.has(C), k = m === C && W && Y == null, q = u.lastMove === C, K = u.ko === C;
            return /* @__PURE__ */ z.jsxs(
              "g",
              {
                onClick: () => V(C),
                onMouseEnter: () => p(C),
                style: { cursor: W ? "pointer" : "default" },
                children: [
                  Y != null && /* @__PURE__ */ z.jsx(
                    "circle",
                    {
                      cx: M,
                      cy: T,
                      r: j,
                      fill: Ph[Y] ?? "#888",
                      stroke: FS[Y] ?? "#444",
                      strokeWidth: 1
                    }
                  ),
                  Y != null && q && /* @__PURE__ */ z.jsx(
                    "circle",
                    {
                      cx: M,
                      cy: T,
                      r: j * 0.36,
                      fill: "none",
                      stroke: Y === 0 ? "#fff" : "#000",
                      strokeWidth: 2
                    }
                  ),
                  K && Y == null && /* @__PURE__ */ z.jsx(
                    "rect",
                    {
                      x: M - j * 0.4,
                      y: T - j * 0.4,
                      width: j * 0.8,
                      height: j * 0.8,
                      fill: "none",
                      stroke: Hu,
                      strokeWidth: 1.6
                    }
                  ),
                  k && /* @__PURE__ */ z.jsx("circle", { cx: M, cy: T, r: j, fill: Ph[f ?? 0], opacity: 0.4 }),
                  /* @__PURE__ */ z.jsx("rect", { x: M - y / 2, y: T - y / 2, width: y, height: y, fill: "transparent" })
                ]
              },
              C
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
        disabled: !X,
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
const Oa = sm, Nn = 34, xm = 24, ty = Nn * (Oa - 1) + xm * 2, Bu = Nn * 0.46, lb = "#dcb86a", Ec = "#3d2f17", eb = [
  [3, 3],
  [3, 11],
  [11, 3],
  [11, 11],
  [7, 7]
];
function nb(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m, seatColors: p } = Ae(), [g, y] = ct.useState(null), [v, b] = ct.useState(null), j = new Set(c.map((C) => C.cell)), N = m && r && v != null && j.has(v) ? v : null, X = p[f ?? 0] ?? I.accent, $ = (C) => xm + C * Nn, G = (C) => $(C % Oa), Z = (C) => $(Math.floor(C / Oa));
  function V(C) {
    m ? b((M) => M === C ? null : C) : d({ cell: C });
  }
  function Q() {
    N != null && (d({ cell: N }), b(null));
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsxs(
      "svg",
      {
        width: ty,
        height: ty,
        onMouseLeave: () => y(null),
        style: { background: lb, borderRadius: 8, border: `1px solid ${Ec}` },
        children: [
          Array.from({ length: Oa }, (C, M) => /* @__PURE__ */ z.jsxs("g", { children: [
            /* @__PURE__ */ z.jsx("line", { x1: $(0), y1: $(M), x2: $(Oa - 1), y2: $(M), stroke: Ec, strokeWidth: 1.2 }),
            /* @__PURE__ */ z.jsx("line", { x1: $(M), y1: $(0), x2: $(M), y2: $(Oa - 1), stroke: Ec, strokeWidth: 1.2 })
          ] }, M)),
          eb.map(([C, M], T) => /* @__PURE__ */ z.jsx("circle", { cx: $(M), cy: $(C), r: Math.max(2.4, Bu * 0.18), fill: Ec }, `s${T}`)),
          u.board.map((C, M) => {
            const T = G(M), Y = Z(M), W = r && C == null && j.has(M), k = N === M, q = W && g === M && !k, K = M === u.lastCell;
            return /* @__PURE__ */ z.jsxs(
              "g",
              {
                onClick: () => {
                  W && V(M);
                },
                onMouseEnter: () => y(M),
                style: { cursor: W ? "pointer" : "default" },
                children: [
                  C != null && /* @__PURE__ */ z.jsx(
                    "circle",
                    {
                      cx: T,
                      cy: Y,
                      r: Bu,
                      fill: p[C],
                      stroke: "rgba(0,0,0,0.28)",
                      strokeWidth: 1
                    }
                  ),
                  C != null && K && /* @__PURE__ */ z.jsx(
                    "circle",
                    {
                      cx: T,
                      cy: Y,
                      r: Bu * 0.4,
                      fill: "none",
                      stroke: I.text,
                      strokeWidth: 2
                    }
                  ),
                  C == null && k && /* @__PURE__ */ z.jsx("circle", { cx: T, cy: Y, r: Bu, fill: "none", stroke: X, strokeWidth: 2 }),
                  C == null && (k || q) && /* @__PURE__ */ z.jsx("circle", { cx: T, cy: Y, r: Bu, fill: X, opacity: k ? 0.6 : 0.32 }),
                  /* @__PURE__ */ z.jsx("rect", { x: T - Nn / 2, y: Y - Nn / 2, width: Nn, height: Nn, fill: "transparent" })
                ]
              },
              M
            );
          })
        ]
      }
    ),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: Q,
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
const or = 44, Tm = 36, ly = or * 6 + Tm * 2, ab = 15, fr = [
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
], Am = (a) => Tm + a * or, On = (a) => Am(fr[a][0]), Cn = (a) => Am(fr[a][1]), ub = [
  [0, 2, 23, 21],
  [3, 5, 20, 18],
  [6, 8, 17, 15]
], ib = [
  [1, 7],
  [16, 22],
  [9, 11],
  [12, 14]
], cb = "#c89b6a", Lu = "#6f5436";
function ob(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { seatColors: m } = Ae(), [p, g] = ct.useState(null), [y, v] = ct.useState(null), b = f ?? 0, j = u.toPlace[b] > 0, N = p != null && c.some((C) => C.from === p) ? p : null, X = y != null && c.some((C) => C.from === y.from && C.to === y.to && C.remove != null) ? y : null, $ = new Set(
    X ? c.filter((C) => C.from === X.from && C.to === X.to && C.remove != null).map((C) => C.remove) : []
  );
  let G;
  X ? G = $ : j ? G = new Set(c.filter((C) => C.from === null).map((C) => C.to)) : N != null ? G = new Set(c.filter((C) => C.from === N).map((C) => C.to)) : G = /* @__PURE__ */ new Set();
  const Z = !j && N == null && X == null ? new Set(c.map((C) => C.from).filter((C) => C != null)) : /* @__PURE__ */ new Set();
  function V(C) {
    d(C), g(null), v(null);
  }
  function Q(C) {
    if (r) {
      if (X) {
        const M = c.find(
          (T) => T.from === X.from && T.to === X.to && T.remove === C
        );
        M ? V(M) : v(null);
        return;
      }
      if (j) {
        const M = c.filter((T) => T.from === null && T.to === C);
        if (M.length === 0) return;
        M.length === 1 && M[0].remove == null ? V(M[0]) : v({ from: null, to: C });
        return;
      }
      if (N != null) {
        if (C === N) {
          g(null);
          return;
        }
        const M = c.filter((T) => T.from === N && T.to === C);
        M.length === 1 && M[0].remove == null ? V(M[0]) : M.length > 0 ? v({ from: N, to: C }) : c.some((T) => T.from === C) ? g(C) : g(null);
      } else c.some((M) => M.from === C) && g(C);
    }
  }
  return /* @__PURE__ */ z.jsx("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: /* @__PURE__ */ z.jsxs(
    "svg",
    {
      width: ly,
      height: ly,
      style: { background: cb, borderRadius: 10, border: `1px solid ${Lu}` },
      children: [
        ub.map((C, M) => /* @__PURE__ */ z.jsx(
          "polygon",
          {
            points: C.map((T) => `${On(T)},${Cn(T)}`).join(" "),
            fill: "none",
            stroke: Lu,
            strokeWidth: 2.5
          },
          `sq${M}`
        )),
        ib.map(([C, M], T) => /* @__PURE__ */ z.jsx(
          "line",
          {
            x1: On(C),
            y1: Cn(C),
            x2: On(M),
            y2: Cn(M),
            stroke: Lu,
            strokeWidth: 2.5
          },
          `c${T}`
        )),
        fr.map((C, M) => {
          const T = u.board[M], Y = r && G.has(M), W = r && Z.has(M), k = M === N, q = $.has(M), K = u.lastMove != null && (u.lastMove.to === M || u.lastMove.from === M);
          return /* @__PURE__ */ z.jsxs(
            "g",
            {
              onClick: () => Q(M),
              style: {
                cursor: r && (Y || W || k) ? "pointer" : "default"
              },
              children: [
                /* @__PURE__ */ z.jsx("circle", { cx: On(M), cy: Cn(M), r: 4, fill: Lu }),
                T == null && Y && /* @__PURE__ */ z.jsx("circle", { cx: On(M), cy: Cn(M), r: 7, fill: I.accent, opacity: 0.8 }),
                T != null && /* @__PURE__ */ z.jsx(
                  "circle",
                  {
                    cx: On(M),
                    cy: Cn(M),
                    r: ab,
                    fill: m[T] ?? "#888",
                    stroke: k ? I.text : q ? I.danger : K ? I.accent : Lu,
                    strokeWidth: k || q || K ? 3.5 : 1.5
                  }
                ),
                /* @__PURE__ */ z.jsx("circle", { cx: On(M), cy: Cn(M), r: or / 2 - 2, fill: "transparent" })
              ]
            },
            M
          );
        })
      ]
    }
  ) });
}
const Kl = pm, ja = 52, Na = ja * 0.78, fb = Kl * ja + 6, Dn = ["#1b1b22", "#efe8d6"], zm = "inset 0 -3px 6px rgba(0,0,0,0.4)";
function sb(a, u) {
  return Math.max(
    Math.abs(a % Kl - u % Kl),
    Math.abs(Math.floor(a / Kl) - Math.floor(u / Kl))
  );
}
function rb({ from: a, to: u, delay: c }) {
  const f = {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    backfaceVisibility: "hidden",
    boxShadow: zm
  };
  return /* @__PURE__ */ z.jsx("div", { style: { width: Na, height: Na, perspective: 700 }, children: /* @__PURE__ */ z.jsxs(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        transformStyle: "preserve-3d",
        animation: `${My} 460ms ease-in-out ${c}ms both`
      },
      children: [
        /* @__PURE__ */ z.jsx("div", { style: { ...f, background: a } }),
        /* @__PURE__ */ z.jsx("div", { style: { ...f, background: u, transform: "rotateY(180deg)" } })
      ]
    }
  ) });
}
function db(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m } = Ae(), [p, g] = ct.useState(null), y = ct.useRef(null), v = ct.useRef(null), b = ct.useRef(0);
  if (y.current !== u.board) {
    const M = y.current;
    if (y.current = u.board, M != null) {
      const T = /* @__PURE__ */ new Set();
      let Y = -1;
      for (let W = 0; W < u.board.length; W++) {
        const k = M[W], q = u.board[W];
        k == null && q != null ? Y = W : k != null && q != null && k !== q && T.add(W);
      }
      (T.size > 0 || Y >= 0) && (b.current += 1, v.current = { flipped: T, placed: Y, seed: b.current });
    }
  }
  const j = v.current, N = new Set(c.map((M) => M.cell));
  let X = 0, $ = 0;
  for (const M of u.board)
    M === 0 ? X++ : M === 1 && $++;
  const G = [X, $], Z = m && r && p != null && N.has(p) ? p : null, V = Dn[f ?? 0];
  function Q(M) {
    m ? g((T) => T === M ? null : M) : d({ cell: M });
  }
  function C() {
    Z != null && (d({ cell: Z }), g(null));
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsx("div", { style: { display: "flex", gap: 10, width: fb }, children: [0, 1].map((M) => {
      const T = f === M;
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
                  background: Dn[M],
                  boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.35)"
                }
              }
            ),
            /* @__PURE__ */ z.jsx("span", { style: { fontSize: 21, fontWeight: 800, lineHeight: 1 }, children: G[M] ?? 0 })
          ]
        },
        M
      );
    }) }),
    /* @__PURE__ */ z.jsx(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: `repeat(${Kl}, ${ja}px)`,
          gridTemplateRows: `repeat(${Kl}, ${ja}px)`,
          background: "#1f6b44",
          border: "3px solid #143f29",
          borderRadius: 8,
          overflow: "hidden"
        },
        children: Array.from({ length: Kl * Kl }, (M, T) => {
          const Y = Math.floor(T / Kl), W = T % Kl, k = u.board[T], q = r && N.has(T), K = Z === T, at = T === u.lastMove;
          let St = `${T}:s`, bt = "none";
          return j != null && (j.flipped.has(T) ? (St = `${T}:f${j.seed}`, bt = "flip") : j.placed === T && (St = `${T}:p${j.seed}`, bt = "pop")), /* @__PURE__ */ z.jsxs(
            "div",
            {
              onClick: () => {
                q && Q(T);
              },
              style: {
                width: ja,
                height: ja,
                boxSizing: "border-box",
                background: "#2a8159",
                border: "1px solid #1f6b44",
                // The picked square is ringed to mark the pending move.
                boxShadow: K ? `inset 0 0 0 3px ${I.accent}` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: q ? "pointer" : "default",
                animation: `${La} 220ms ease-out ${(Y + W) * 26}ms backwards`
              },
              children: [
                k != null && (bt === "flip" ? /* @__PURE__ */ z.jsx(
                  rb,
                  {
                    from: k === 0 ? Dn[1] : Dn[0],
                    to: k === 0 ? Dn[0] : Dn[1],
                    delay: u.lastMove != null ? sb(T, u.lastMove) * 70 : 0
                  },
                  St
                ) : /* @__PURE__ */ z.jsx(
                  "span",
                  {
                    style: {
                      width: Na,
                      height: Na,
                      borderRadius: "50%",
                      background: Dn[k],
                      boxShadow: at ? `0 0 0 3px ${I.accent}` : zm,
                      // A freshly placed disc pops in; settled discs are static.
                      animation: bt === "pop" ? `${Sy} 220ms ease-out both` : "none"
                    }
                  },
                  St
                )),
                k == null && K && // A faint full-size disc previews where a confirmed move lands.
                /* @__PURE__ */ z.jsx(
                  "span",
                  {
                    style: {
                      width: Na,
                      height: Na,
                      borderRadius: "50%",
                      background: V,
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
                      background: V,
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
        onClick: C,
        disabled: Z == null,
        style: {
          ...kl,
          // Stays in the layout (hidden) off-turn so the board never shifts.
          visibility: r ? "visible" : "hidden",
          opacity: Z != null ? 1 : 0.4,
          cursor: Z != null ? "pointer" : "default"
        },
        children: Z != null ? "Confirm move" : "Pick a square"
      }
    )
  ] });
}
const xc = vm, ln = 46, ey = {
  k: "玉",
  r: "飛",
  b: "角",
  g: "金",
  s: "銀",
  n: "桂",
  l: "香",
  p: "歩"
}, hb = { r: "龍", b: "馬", s: "全", n: "圭", l: "杏", p: "と" }, yb = (a) => a.promoted ? hb[a.type] ?? ey[a.type] : ey[a.type], mb = "#e7c884", ny = "#806029", gb = "#f3dca6", pb = "#b5853a", vb = "#b23b3b";
function ay({ piece: a, dim: u }) {
  return /* @__PURE__ */ z.jsx(
    "div",
    {
      style: {
        width: ln - 8,
        height: ln - 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px 5px 3px 3px",
        background: gb,
        border: `1.5px solid ${pb}`,
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
            color: a.promoted ? vb : "#2a1e0c"
          },
          children: yb(a)
        }
      )
    }
  );
}
function Sb(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, [m, p] = ct.useState(null), [g, y] = ct.useState(null), [v, b] = ct.useState(null), j = () => {
    p(null), y(null), b(null);
  }, N = m != null && c.some((T) => T.from === m) ? m : null, X = g != null && c.some((T) => T.from === null && T.drop === g) ? g : null, $ = new Set(
    N != null ? c.filter((T) => T.from === N).map((T) => T.to) : X != null ? c.filter((T) => T.from === null && T.drop === X).map((T) => T.to) : []
  ), G = new Set(
    c.map((T) => T.from).filter((T) => T != null)
  );
  function Z(T) {
    d(T), j();
  }
  function V(T) {
    if (r) {
      if (v) {
        b(null);
        return;
      }
      if (X != null) {
        $.has(T) ? Z({ from: null, to: T, drop: X, promote: !1 }) : y(null);
        return;
      }
      if (N != null) {
        if (T === N) {
          p(null);
          return;
        }
        if ($.has(T)) {
          const Y = c.filter((W) => W.from === N && W.to === T);
          Y.length === 1 ? Z(Y[0]) : b({ from: N, to: T });
          return;
        }
        G.has(T) ? p(T) : p(null);
        return;
      }
      G.has(T) && (p(T), y(null));
    }
  }
  function Q(T, Y) {
    !r || T !== f || c.some((W) => W.from === null && W.drop === Y) && (p(null), b(null), y((W) => W === Y ? null : Y));
  }
  const C = (T) => /* @__PURE__ */ z.jsxs(
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
        Zc.filter((Y) => u.hands[T][Y] > 0).map((Y) => {
          const W = X === Y && T === f, k = r && T === f && c.some((q) => q.drop === Y);
          return /* @__PURE__ */ z.jsxs(
            "button",
            {
              onClick: () => Q(T, Y),
              disabled: !k,
              style: {
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "3px 7px 3px 3px",
                borderRadius: 6,
                border: `2px solid ${W ? I.accent : "transparent"}`,
                background: "transparent",
                cursor: k ? "pointer" : "default"
              },
              children: [
                /* @__PURE__ */ z.jsx(ay, { piece: { seat: T, type: Y, promoted: !1 } }),
                /* @__PURE__ */ z.jsxs("span", { style: { fontSize: 14, fontWeight: 700, color: I.text }, children: [
                  "×",
                  u.hands[T][Y]
                ] })
              ]
            },
            Y
          );
        }),
        Zc.every((Y) => u.hands[T][Y] === 0) && /* @__PURE__ */ z.jsx("span", { style: { fontSize: 12, color: I.textDim }, children: "— empty hand —" })
      ]
    }
  ), M = u.lastMove;
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    C(1),
    /* @__PURE__ */ z.jsx(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: `repeat(${xc}, ${ln}px)`,
          gridTemplateRows: `repeat(${xc}, ${ln}px)`,
          // The line colour shows through the 1px gaps as the board grid.
          background: ny,
          border: `3px solid ${ny}`,
          gap: 1,
          padding: 1
        },
        children: Array.from({ length: xc * xc }, (T, Y) => {
          const W = u.board[Y], k = Y === N, q = r && $.has(Y), K = M != null && (M.from === Y || M.to === Y), at = v != null && v.from === Y, St = v != null && v.to === Y, bt = r && (q || k || W != null && G.has(Y));
          return /* @__PURE__ */ z.jsxs(
            "div",
            {
              onClick: () => V(Y),
              style: {
                width: ln,
                height: ln,
                background: mb,
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
                      width: W ? ln - 6 : 15,
                      height: W ? ln - 6 : 15,
                      borderRadius: W ? 7 : "50%",
                      background: W ? "transparent" : I.accent,
                      border: W ? `3px solid ${I.accent}` : "none",
                      opacity: 0.7
                    }
                  }
                ),
                W && /* @__PURE__ */ z.jsx(ay, { piece: W, dim: at })
              ]
            },
            Y
          );
        })
      }
    ),
    C(0),
    v != null && r && /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
      /* @__PURE__ */ z.jsx("span", { style: { fontSize: 14, color: I.textDim }, children: "Promote?" }),
      /* @__PURE__ */ z.jsx(
        "button",
        {
          style: { ...kl, padding: "7px 16px" },
          onClick: () => Z({ from: v.from, to: v.to, drop: null, promote: !0 }),
          children: "Promote"
        }
      ),
      /* @__PURE__ */ z.jsx(
        "button",
        {
          style: { ...Qc, padding: "7px 16px" },
          onClick: () => Z({ from: v.from, to: v.to, drop: null, promote: !1 }),
          children: "Keep"
        }
      )
    ] })
  ] });
}
const bb = ["✕", "◯"];
function Mb(a) {
  const { state: u, legalMoves: c, interactive: f, onMove: r } = a, { seatColors: d } = Ae(), m = new Set(c.map((p) => p.cell));
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
              animation: `${La} 240ms ease-out ${v}ms backwards`
            },
            children: p != null && // The glyph span mounts when the cell is claimed, so the
            // fade-in plays exactly once — on the move that placed it.
            /* @__PURE__ */ z.jsx(
              "span",
              {
                style: {
                  color: d[p],
                  animation: `${Ws} 260ms ease-out both`
                },
                children: bb[p] ?? "?"
              }
            )
          },
          g
        );
      })
    }
  );
}
const Fu = Ny, $s = Uy, Ln = 44, As = 18, kc = 24, Tc = (Fu - 1) * Ln + 2 * kc, Ac = ($s - 1) * Ln + 2 * kc, Yu = "#5b3d1f", Eb = "#f0d9a8", xb = [
  { g: "帥", a: "仕", e: "相", h: "馬", r: "車", c: "炮", s: "兵" },
  { g: "將", a: "士", e: "象", h: "馬", r: "車", c: "砲", s: "卒" }
], uy = ["#c0402c", "#2c2e36"], Tb = (a) => a % Fu, Ab = (a) => Math.floor(a / Fu), _l = (a) => kc + a * Ln, Ol = (a) => kc + a * Ln, en = (a) => _l(Tb(a)), nn = (a) => Ol(Ab(a));
function zb(a, u) {
  const c = en(a) - en(u), f = nn(a) - nn(u);
  return {
    animation: `${Fs} 300ms ease-in-out both`,
    "--hop-x": `${c}px`,
    "--hop-y": `${f}px`,
    "--hop-mx": `${c / 2}px`,
    "--hop-my": `${f / 2}px`
  };
}
function _b(a) {
  const { state: u, legalMoves: c, currentSeat: f, interactive: r, onMove: d } = a, { confirmMove: m } = Ae(), [p, g] = ct.useState(null), [y, v] = ct.useState(null), b = ct.useMemo(() => {
    const M = /* @__PURE__ */ new Map();
    for (const T of c) {
      const Y = M.get(T.from);
      Y ? Y.push(T) : M.set(T.from, [T]);
    }
    return M;
  }, [c]), j = r && p != null && u.board[p]?.seat === f ? p : null, N = j != null ? b.get(j) ?? [] : [], X = new Set(N.map((M) => M.to)), $ = (M) => c.some((T) => T.from === M.from && T.to === M.to), G = m && r && y != null && $(y) ? y : null, Z = G != null ? u.board[G.from] : null;
  function V(M) {
    if (r) {
      if (G != null && M === G.to) {
        v(null);
        return;
      }
      if (j != null && X.has(M)) {
        const T = N.find((Y) => Y.to === M);
        if (!T) return;
        m ? v(T) : (d(T), g(null));
      } else u.board[M]?.seat === f && b.has(M) ? (g((T) => T === M ? null : M), v(null)) : (g(null), v(null));
    }
  }
  function Q() {
    G != null && (d(G), g(null), v(null));
  }
  function C(M, T, Y, W) {
    const k = j === M, q = G != null && G.from === M, K = X.has(M), at = u.lastMove != null && (u.lastMove.from === M || u.lastMove.to === M), St = k ? I.text : q ? I.accent : K ? I.danger : at ? I.accent : null;
    return /* @__PURE__ */ z.jsxs("g", { opacity: W ? 0.5 : q ? 0.4 : 1, children: [
      St != null && /* @__PURE__ */ z.jsx("circle", { cx: en(M), cy: nn(M), r: As + 3, fill: "none", stroke: St, strokeWidth: 3 }),
      /* @__PURE__ */ z.jsx(
        "circle",
        {
          cx: en(M),
          cy: nn(M),
          r: As,
          fill: Eb,
          stroke: uy[T],
          strokeWidth: 2.5
        }
      ),
      /* @__PURE__ */ z.jsx(
        "text",
        {
          x: en(M),
          y: nn(M),
          textAnchor: "middle",
          dominantBaseline: "central",
          fontSize: 21,
          fontWeight: 700,
          fill: uy[T],
          children: xb[T]?.[Y] ?? "?"
        }
      )
    ] });
  }
  return /* @__PURE__ */ z.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }, children: [
    /* @__PURE__ */ z.jsxs("svg", { width: Tc, height: Ac, viewBox: `0 0 ${Tc} ${Ac}`, style: { display: "block" }, children: [
      /* @__PURE__ */ z.jsx("rect", { x: 0, y: 0, width: Tc, height: Ac, rx: 8, fill: "#d9b277" }),
      /* @__PURE__ */ z.jsx(
        "rect",
        {
          x: 2,
          y: 2,
          width: Tc - 4,
          height: Ac - 4,
          rx: 6,
          fill: "none",
          stroke: "#8a5a2e",
          strokeWidth: 3
        }
      ),
      Array.from({ length: $s }, (M, T) => /* @__PURE__ */ z.jsx("line", { x1: _l(0), y1: Ol(T), x2: _l(8), y2: Ol(T), stroke: Yu, strokeWidth: 1 }, `h${T}`)),
      Array.from(
        { length: Fu },
        (M, T) => T === 0 || T === 8 ? /* @__PURE__ */ z.jsx("line", { x1: _l(T), y1: Ol(0), x2: _l(T), y2: Ol(9), stroke: Yu, strokeWidth: 1 }, `v${T}`) : /* @__PURE__ */ z.jsxs("g", { children: [
          /* @__PURE__ */ z.jsx("line", { x1: _l(T), y1: Ol(0), x2: _l(T), y2: Ol(4), stroke: Yu, strokeWidth: 1 }),
          /* @__PURE__ */ z.jsx("line", { x1: _l(T), y1: Ol(5), x2: _l(T), y2: Ol(9), stroke: Yu, strokeWidth: 1 })
        ] }, `v${T}`)
      ),
      [
        { x1: 3, y1: 0, x2: 5, y2: 2 },
        { x1: 5, y1: 0, x2: 3, y2: 2 },
        { x1: 3, y1: 7, x2: 5, y2: 9 },
        { x1: 5, y1: 7, x2: 3, y2: 9 }
      ].map((M, T) => /* @__PURE__ */ z.jsx("line", { x1: _l(M.x1), y1: Ol(M.y1), x2: _l(M.x2), y2: Ol(M.y2), stroke: Yu, strokeWidth: 1 }, `p${T}`)),
      /* @__PURE__ */ z.jsx(
        "text",
        {
          x: _l(2),
          y: Ol(4) + Ln / 2,
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
          y: Ol(4) + Ln / 2,
          textAnchor: "middle",
          dominantBaseline: "central",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 8,
          fill: "rgba(91,61,31,0.72)",
          children: "漢界"
        }
      ),
      [...X].map(
        (M) => u.board[M] == null && !(G != null && G.to === M) ? /* @__PURE__ */ z.jsx("circle", { cx: en(M), cy: nn(M), r: 7, fill: I.accent, opacity: 0.7 }, `d${M}`) : null
      ),
      u.board.map((M, T) => {
        if (M == null || G != null && G.to === T) return null;
        const Y = C(T, M.seat, M.type, !1), W = u.lastMove;
        return W != null && W.to === T ? /* @__PURE__ */ z.jsx("g", { style: zb(W.from, T), children: Y }, `pc${T}`) : /* @__PURE__ */ z.jsx("g", { children: Y }, `pc${T}`);
      }),
      G != null && Z != null && /* @__PURE__ */ z.jsxs("g", { children: [
        /* @__PURE__ */ z.jsx(
          "circle",
          {
            cx: en(G.to),
            cy: nn(G.to),
            r: As + 3,
            fill: "none",
            stroke: I.accent,
            strokeWidth: 3
          }
        ),
        C(G.to, Z.seat, Z.type, !0)
      ] }),
      Array.from({ length: Fu * $s }, (M, T) => {
        const Y = u.board[T], W = r && (X.has(T) || Y?.seat === f && b.has(T));
        return /* @__PURE__ */ z.jsx(
          "circle",
          {
            cx: en(T),
            cy: nn(T),
            r: Ln * 0.46,
            fill: "transparent",
            pointerEvents: "all",
            style: { cursor: W ? "pointer" : "default" },
            onClick: () => V(T)
          },
          `hit${T}`
        );
      })
    ] }),
    f != null && m && /* @__PURE__ */ z.jsx(
      "button",
      {
        onClick: Q,
        disabled: G == null,
        style: {
          ...kl,
          // Stays in the layout (hidden) off-turn so the board never shifts.
          visibility: r ? "visible" : "hidden",
          opacity: G != null ? 1 : 0.4,
          cursor: G != null ? "pointer" : "default"
        },
        children: G != null ? "Confirm move" : j != null ? "Pick a point" : "Select a piece"
      }
    )
  ] });
}
fv();
ql("tic-tac-toe", Mb);
ql("connect-four", WS);
ql("gomoku", nb);
ql("reversi", db);
ql("chinese-checkers", kS);
ql("checkers", XS);
ql("chess", ZS);
ql("xiangqi", _b);
ql("nine-mens-morris", ob);
ql("shogi", Sb);
ql("go", tb);
ql("big-two", HS);
const iy = "htp-demo-keyframes";
function Ob() {
  if (typeof document > "u" || document.getElementById(iy)) return;
  const a = document.createElement("style");
  a.id = iy, a.textContent = "@keyframes htpDraw{from{opacity:0;transform:scale(.55)}to{opacity:1;transform:scale(1)}}@keyframes htpStrike{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes htpPulse{0%,100%{opacity:.2;transform:scale(.9)}50%{opacity:.7;transform:scale(1.05)}}@keyframes htpGlow{0%,100%{opacity:.12}50%{opacity:.34}}@keyframes htpDrop{from{transform:translateY(var(--htp-drop,-200px))}to{transform:translateY(0)}}@keyframes htpGrow{from{transform:scale(.12)}to{transform:scale(1)}}@keyframes htpFlip{from{transform:rotateY(0deg)}to{transform:rotateY(180deg)}}@keyframes htpSlide{from{transform:translate(var(--sx,0px),var(--sy,0px))}to{transform:translate(0px,0px)}}@keyframes htpHop{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}", document.head.appendChild(a);
}
Ob();
function $l(a, u = []) {
  const c = Array(9).fill(null);
  for (const f of a) c[f] = 0;
  for (const f of u) c[f] = 1;
  return c;
}
$l([0, 1, 2]), $l([2, 4, 6]), $l([1, 4, 7]);
$l([]), $l([4]), $l([4], [2]), $l([4, 0], [2]), $l([4, 0], [2, 5]), $l([4, 0, 8], [2, 5]);
$l([0, 1, 2], [3, 4]), $l([0, 2, 3, 7, 8], [1, 4, 5, 6]);
const cy = 7, oy = 6;
function le(a) {
  const u = Array(cy * oy).fill(null);
  return a.forEach((c, f) => {
    c.forEach((r, d) => {
      u[(oy - 1 - d) * cy + f] = r;
    });
  }), u;
}
le([[1], [0], [0], [0], [0], [1], []]), le([[1], [0], [1], [0, 0, 0, 0], [1], [0], [1]]), le([[1], [0], [1, 0], [1, 1, 0], [1, 1, 1, 0], [1], [1]]);
le([[], [], [], [], [], [], []]), le([[], [], [], [0], [], [], []]), le([[], [], [], [0, 1], [], [], []]), le([[], [0], [], [0, 1], [], [], []]), le([[], [0], [], [0, 1, 1], [], [], []]);
le([[], [0, 1], [0, 1], [0, 1], [], [], []]), le([[], [0, 1], [0, 1], [0, 1], [0], [], []]);
const fy = 9;
function ee(a, u = []) {
  const c = Array(fy * fy).fill(null);
  for (const f of a) c[f] = 0;
  for (const f of u) c[f] = 1;
  return c;
}
ee([38, 39, 40, 41, 42], [30, 50, 25]), ee([22, 31, 40, 49, 58], [33, 47, 60]), ee([20, 30, 40, 50, 60], [24, 56, 42]);
ee([]), ee([40]), ee([40], [31]), ee([40, 41], [31]), ee([40, 41], [31, 49]);
ee([38, 39, 40, 41], [30, 49, 23, 47]), ee([38, 39, 40, 41, 42], [30, 49, 23, 47]);
const Vc = 8;
function Yn(a, u) {
  const c = Array(Vc * Vc).fill(null);
  for (const f of a) c[f] = 0;
  for (const f of u) c[f] = 1;
  return c;
}
function Cb(a) {
  const u = Array(Vc * Vc).fill(0);
  for (const c of a) u[c] = 1;
  return u;
}
Yn([], []), Cb([0, 1, 2, 8, 9, 10, 16, 17, 18, 11, 19, 27, 28, 35, 36, 43]);
Yn([], []), Yn([25], [26, 27, 28]), Yn([25, 26, 27, 28, 29], []);
Yn([], []), Yn([30, 24, 3, 51], [28, 29, 26, 25, 19, 11, 35, 43]), Yn([3, 11, 19, 24, 25, 26, 27, 28, 29, 30, 35, 43, 51], []);
const an = (a, u, c) => ({ x: a, y: u, z: c });
function Db() {
  const u = [];
  for (let c = -4; c <= 4; c++)
    for (let f = -4; f <= 4; f++) {
      const r = -c - f;
      Math.abs(r) > 4 || (c >= -2 && f >= -2 && r >= -2 || c <= 2 && f <= 2 && r <= 2) && u.push({ x: c, y: f, z: r });
    }
  return u;
}
const _m = Db(), Om = (a, u) => a.x - u.x || a.z - u.z, sy = _m.filter((a) => a.y >= 3).sort(Om), ry = _m.filter((a) => a.y <= -3).sort(Om);
sy.map((a) => ({ at: a, seat: 0 })), ry.map((a, u) => ({ at: a, seat: 0, from: sy[u] }));
const zs = [
  { at: an(2, -2, 0), seat: 1 },
  { at: an(-2, 2, 0), seat: 2 }
];
(() => {
  const a = [an(1, -1, 0), an(-1, 0, 1), an(0, 1, -1)], u = [];
  let c = an(0, 0, 0);
  for (const f of a)
    u.push({
      pegs: [{ at: c, seat: 0 }, ...zs],
      rings: [f],
      caption: "Move a peg to any touching empty hole",
      hold: 1e3
    }), u.push({
      pegs: [{ at: f, seat: 0, from: c }, ...zs],
      caption: "Move a peg to any touching empty hole",
      hold: 950
    }), u.push({
      pegs: [{ at: an(0, 0, 0), seat: 0, from: f }, ...zs],
      caption: "Move a peg to any touching empty hole",
      hold: 700
    }), c = an(0, 0, 0);
  return u;
})();
const wn = 8, Cm = (a) => Math.floor(a / wn), Dm = (a) => a % wn, Rm = (a, u) => a * wn + u;
function Ie(a, u, c) {
  const f = [];
  let r = Cm(a) + u, d = Dm(a) + c;
  for (; r >= 0 && r < wn && d >= 0 && d < wn; )
    f.push(Rm(r, d)), r += u, d += c;
  return f;
}
const Rb = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1]
], jb = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];
function dy(a, u) {
  const c = [];
  for (const [f, r] of u) {
    const d = Cm(a) + f, m = Dm(a) + r;
    d >= 0 && d < wn && m >= 0 && m < wn && c.push(Rm(d, m));
  }
  return c;
}
function Nb(a, u) {
  if (a === "n") return dy(u, Rb);
  if (a === "k") return dy(u, jb);
  const c = [
    ...Ie(u, -1, -1),
    ...Ie(u, -1, 1),
    ...Ie(u, 1, -1),
    ...Ie(u, 1, 1)
  ], f = [
    ...Ie(u, -1, 0),
    ...Ie(u, 1, 0),
    ...Ie(u, 0, -1),
    ...Ie(u, 0, 1)
  ];
  return a === "b" ? c : a === "r" ? f : [...f, ...c];
}
function Iu(a, u, c, f) {
  const r = Nb(a === "♞" ? "n" : a === "♚" ? "k" : a === "♝" ? "b" : a === "♜" ? "r" : "q", u), d = (p, g) => ({
    pieces: [{ cell: p, glyph: a, seat: 0, from: g }],
    dots: r,
    caption: f
  }), m = [{ ...d(u), hold: 1600 }];
  for (const p of c)
    m.push({ ...d(p, u), hold: 950 }), m.push({ ...d(u, p), hold: 800 });
  return m;
}
Iu(
  "♞",
  35,
  [18, 45, 29],
  "The knight leaps in an L — the only piece that jumps over others"
);
Iu(
  "♝",
  35,
  [7, 56, 8],
  "The bishop slides any distance along a diagonal"
);
Iu(
  "♜",
  35,
  [3, 39, 32],
  "The rook slides any distance in a straight line"
);
Iu(
  "♛",
  35,
  [7, 32, 3],
  "The queen moves any distance, straight or diagonal — rook and bishop in one"
);
Iu(
  "♚",
  35,
  [27, 36, 43],
  "The king moves one square in any direction"
);
function Pu(a, u, c, f, r) {
  const d = (p, g) => ({
    pieces: [{ cell: p, char: a, seat: 0, from: g }],
    dots: c,
    caption: r
  }), m = [{ ...d(u), hold: 1600 }];
  for (const p of f)
    m.push({ ...d(p, u), hold: 950 }), m.push({ ...d(u, p), hold: 800 });
  return m;
}
Pu(
  "帥",
  76,
  [67, 75, 77, 85],
  [67, 75, 77],
  "The General moves one point up, down or sideways — never leaving the palace"
);
Pu(
  "仕",
  76,
  [66, 68, 84, 86],
  [66, 68, 84],
  "The Advisor moves one point diagonally, guarding the palace"
);
Pu(
  "相",
  65,
  [45, 49, 81, 85],
  [45, 49, 81],
  "The Elephant jumps two points diagonally — and never crosses the river"
);
Pu(
  "馬",
  58,
  [39, 41, 47, 51, 65, 69, 75, 77],
  [39, 51, 77],
  "The Horse moves in an L — a piece beside it can block the way"
);
Pu(
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
const Ub = "miniboard.history";
function Hb() {
  if (typeof localStorage > "u") return [];
  try {
    const a = localStorage.getItem(Ub), u = a ? JSON.parse(a) : null;
    return Array.isArray(u) ? u : [];
  } catch {
    return [];
  }
}
Hb();
const Bb = 1100;
function Lb(a, u, c) {
  const f = [];
  for (let m = 0; m < u; m++)
    f.push({ id: `p${m}`, name: `P${m + 1}`, kind: "human", seat: m });
  const r = typeof c.seed == "number" ? c.seed : 0, d = { gameId: a, players: f, seed: r };
  return Object.keys(c).length > 0 && (d.options = { ...c }), d;
}
function Yb(a) {
  try {
    const u = Ov(a), c = ku.require(u.gameId), f = [
      c.createInitialState(Lb(u.gameId, u.playerCount, u.options))
    ];
    for (const r of u.moves)
      f.push(c.applyMove(f[f.length - 1], r));
    return { ...u, states: f };
  } catch {
    return null;
  }
}
function wb({ encoded: a, onExit: u }) {
  const c = ct.useMemo(() => Yb(a), [a]), [f, r] = ct.useState(0), [d, m] = ct.useState(!1), p = ct.useRef(0), g = ct.useRef(0), y = c ? c.states.length - 1 : 0;
  f !== p.current && (f !== p.current + 1 && (g.current += 1), p.current = f), ct.useEffect(() => {
    if (!d || f >= y) {
      d && f >= y && m(!1);
      return;
    }
    const Q = window.setTimeout(() => r((C) => Math.min(C + 1, y)), Bb);
    return () => window.clearTimeout(Q);
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
            style: { ...Qc, padding: "6px 13px", fontSize: 18, lineHeight: 1 },
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
      /* @__PURE__ */ z.jsx("div", { style: { ...$h, margin: 24, color: I.danger }, children: "This replay could not be read — the link may be incomplete or corrupted." })
    ] });
  const b = ku.require(c.gameId), j = b.name, N = c.states[f], X = b.getCurrentSeat(N), $ = b.getStatus(N), G = sv(c.gameId), Z = b.observe ? b.observe(N, X ?? 0) : N, V = (Q, C, M, T = !1) => /* @__PURE__ */ z.jsx(
    "button",
    {
      onClick: M,
      disabled: !C,
      style: {
        ...Qc,
        padding: T ? "8px 18px" : "8px 13px",
        fontSize: 16,
        opacity: C ? 1 : 0.35,
        cursor: C ? "pointer" : "default"
      },
      children: Q
    }
  );
  return /* @__PURE__ */ z.jsxs("div", { style: { maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column" }, children: [
    v,
    /* @__PURE__ */ z.jsx("div", { style: { textAlign: "center", padding: "14px 16px 2px", fontSize: 18, fontWeight: 700 }, children: j }),
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
        children: c.players.map((Q, C) => {
          const M = $.state === "win" && $.winners.includes(C);
          return /* @__PURE__ */ z.jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 13px",
                borderRadius: 999,
                border: `1px solid ${M ? I.accent : I.border}`
              },
              children: [
                /* @__PURE__ */ z.jsx(
                  "span",
                  {
                    style: { width: 12, height: 12, borderRadius: "50%", background: Q.color }
                  }
                ),
                /* @__PURE__ */ z.jsx("span", { style: { fontSize: 14, fontWeight: M ? 700 : 500 }, children: Q.name || `Player ${C + 1}` })
              ]
            },
            C
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
        children: f === y && $.state === "win" ? `${c.players[$.winners[0] ?? 0]?.name || "A player"} wins` : f === y && $.state === "draw" ? "It's a draw" : `Move ${f} of ${y}`
      }
    ),
    /* @__PURE__ */ z.jsx("div", { style: { display: "flex", justifyContent: "center", padding: "8px 16px" }, children: G ? /* @__PURE__ */ z.jsx(
      G,
      {
        state: Z,
        legalMoves: [],
        currentSeat: X,
        interactive: !1,
        onMove: () => {
        }
      },
      g.current
    ) : /* @__PURE__ */ z.jsxs("div", { style: { ...$h, color: I.textDim }, children: [
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
          V("⏮", f > 0, () => {
            m(!1), r(0);
          }),
          V("‹", f > 0, () => {
            m(!1), r((Q) => Math.max(0, Q - 1));
          }),
          V(d ? "⏸ Pause" : "▶ Play", f < y || d, () => m((Q) => !Q), !0),
          V("›", f < y, () => {
            m(!1), r((Q) => Math.min(y, Q + 1));
          }),
          V("⏭", f < y, () => {
            m(!1), r(y);
          })
        ]
      }
    )
  ] });
}
var _s = { exports: {} }, wu = {}, Os = { exports: {} }, Cs = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hy;
function Gb() {
  return hy || (hy = 1, (function(a) {
    function u(U, J) {
      var et = U.length;
      U.push(J);
      t: for (; 0 < et; ) {
        var pt = et - 1 >>> 1, Tt = U[pt];
        if (0 < r(Tt, J))
          U[pt] = J, U[et] = Tt, et = pt;
        else break t;
      }
    }
    function c(U) {
      return U.length === 0 ? null : U[0];
    }
    function f(U) {
      if (U.length === 0) return null;
      var J = U[0], et = U.pop();
      if (et !== J) {
        U[0] = et;
        t: for (var pt = 0, Tt = U.length, x = Tt >>> 1; pt < x; ) {
          var w = 2 * (pt + 1) - 1, F = U[w], tt = w + 1, ft = U[tt];
          if (0 > r(F, et))
            tt < Tt && 0 > r(ft, F) ? (U[pt] = ft, U[tt] = et, pt = tt) : (U[pt] = F, U[w] = et, pt = w);
          else if (tt < Tt && 0 > r(ft, et))
            U[pt] = ft, U[tt] = et, pt = tt;
          else break t;
        }
      }
      return J;
    }
    function r(U, J) {
      var et = U.sortIndex - J.sortIndex;
      return et !== 0 ? et : U.id - J.id;
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
    var g = [], y = [], v = 1, b = null, j = 3, N = !1, X = !1, $ = !1, G = !1, Z = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, Q = typeof setImmediate < "u" ? setImmediate : null;
    function C(U) {
      for (var J = c(y); J !== null; ) {
        if (J.callback === null) f(y);
        else if (J.startTime <= U)
          f(y), J.sortIndex = J.expirationTime, u(g, J);
        else break;
        J = c(y);
      }
    }
    function M(U) {
      if ($ = !1, C(U), !X)
        if (c(g) !== null)
          X = !0, T || (T = !0, at());
        else {
          var J = c(y);
          J !== null && Mt(M, J.startTime - U);
        }
    }
    var T = !1, Y = -1, W = 5, k = -1;
    function q() {
      return G ? !0 : !(a.unstable_now() - k < W);
    }
    function K() {
      if (G = !1, T) {
        var U = a.unstable_now();
        k = U;
        var J = !0;
        try {
          t: {
            X = !1, $ && ($ = !1, V(Y), Y = -1), N = !0;
            var et = j;
            try {
              l: {
                for (C(U), b = c(g); b !== null && !(b.expirationTime > U && q()); ) {
                  var pt = b.callback;
                  if (typeof pt == "function") {
                    b.callback = null, j = b.priorityLevel;
                    var Tt = pt(
                      b.expirationTime <= U
                    );
                    if (U = a.unstable_now(), typeof Tt == "function") {
                      b.callback = Tt, C(U), J = !0;
                      break l;
                    }
                    b === c(g) && f(g), C(U);
                  } else f(g);
                  b = c(g);
                }
                if (b !== null) J = !0;
                else {
                  var x = c(y);
                  x !== null && Mt(
                    M,
                    x.startTime - U
                  ), J = !1;
                }
              }
              break t;
            } finally {
              b = null, j = et, N = !1;
            }
            J = void 0;
          }
        } finally {
          J ? at() : T = !1;
        }
      }
    }
    var at;
    if (typeof Q == "function")
      at = function() {
        Q(K);
      };
    else if (typeof MessageChannel < "u") {
      var St = new MessageChannel(), bt = St.port2;
      St.port1.onmessage = K, at = function() {
        bt.postMessage(null);
      };
    } else
      at = function() {
        Z(K, 0);
      };
    function Mt(U, J) {
      Y = Z(function() {
        U(a.unstable_now());
      }, J);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, a.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : W = 0 < U ? Math.floor(1e3 / U) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return j;
    }, a.unstable_next = function(U) {
      switch (j) {
        case 1:
        case 2:
        case 3:
          var J = 3;
          break;
        default:
          J = j;
      }
      var et = j;
      j = J;
      try {
        return U();
      } finally {
        j = et;
      }
    }, a.unstable_requestPaint = function() {
      G = !0;
    }, a.unstable_runWithPriority = function(U, J) {
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
      var et = j;
      j = U;
      try {
        return J();
      } finally {
        j = et;
      }
    }, a.unstable_scheduleCallback = function(U, J, et) {
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
        callback: J,
        priorityLevel: U,
        startTime: et,
        expirationTime: Tt,
        sortIndex: -1
      }, et > pt ? (U.sortIndex = et, u(y, U), c(g) === null && U === c(y) && ($ ? (V(Y), Y = -1) : $ = !0, Mt(M, et - pt))) : (U.sortIndex = Tt, u(g, U), X || N || (X = !0, T || (T = !0, at()))), U;
    }, a.unstable_shouldYield = q, a.unstable_wrapCallback = function(U) {
      var J = j;
      return function() {
        var et = j;
        j = J;
        try {
          return U.apply(this, arguments);
        } finally {
          j = et;
        }
      };
    };
  })(Cs)), Cs;
}
var yy;
function qb() {
  return yy || (yy = 1, Os.exports = Gb()), Os.exports;
}
var Ds = { exports: {} }, al = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var my;
function Xb() {
  if (my) return al;
  my = 1;
  var a = cr();
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
      var v = y.as, b = p(v, y.crossOrigin), j = typeof y.integrity == "string" ? y.integrity : void 0, N = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      v === "style" ? f.d.S(
        g,
        typeof y.precedence == "string" ? y.precedence : void 0,
        {
          crossOrigin: b,
          integrity: j,
          fetchPriority: N
        }
      ) : v === "script" && f.d.X(g, {
        crossOrigin: b,
        integrity: j,
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
var gy;
function Zb() {
  if (gy) return Ds.exports;
  gy = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (u) {
        console.error(u);
      }
  }
  return a(), Ds.exports = Xb(), Ds.exports;
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
var py;
function Qb() {
  if (py) return wu;
  py = 1;
  var a = qb(), u = cr(), c = Zb();
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
  var b = Object.assign, j = Symbol.for("react.element"), N = Symbol.for("react.transitional.element"), X = Symbol.for("react.portal"), $ = Symbol.for("react.fragment"), G = Symbol.for("react.strict_mode"), Z = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), Q = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), Y = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), k = Symbol.for("react.activity"), q = Symbol.for("react.memo_cache_sentinel"), K = Symbol.iterator;
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
      case $:
        return "Fragment";
      case Z:
        return "Profiler";
      case G:
        return "StrictMode";
      case M:
        return "Suspense";
      case T:
        return "SuspenseList";
      case k:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case X:
          return "Portal";
        case Q:
          return t.displayName || "Context";
        case V:
          return (t._context.displayName || "Context") + ".Consumer";
        case C:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case Y:
          return l = t.displayName || null, l !== null ? l : bt(t.type) || "Memo";
        case W:
          l = t._payload, t = t._init;
          try {
            return bt(t(l));
          } catch {
          }
      }
    return null;
  }
  var Mt = Array.isArray, U = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, et = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, pt = [], Tt = -1;
  function x(t) {
    return { current: t };
  }
  function w(t) {
    0 > Tt || (t.current = pt[Tt], pt[Tt] = null, Tt--);
  }
  function F(t, l) {
    Tt++, pt[Tt] = t.current, t.current = l;
  }
  var tt = x(null), ft = x(null), dt = x(null), zt = x(null);
  function cl(t, l) {
    switch (F(dt, l), F(ft, t), F(tt, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? U1(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = U1(l), t = H1(l, t);
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
    w(tt), F(tt, t);
  }
  function Yt() {
    w(tt), w(ft), w(dt);
  }
  function Ya(t) {
    t.memoizedState !== null && F(zt, t);
    var l = tt.current, e = H1(l, t.type);
    l !== e && (F(ft, t), F(tt, e));
  }
  function ti(t) {
    ft.current === t && (w(tt), w(ft)), zt.current === t && (w(zt), _u._currentValue = et);
  }
  var Jc, sr;
  function on(t) {
    if (Jc === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        Jc = l && l[1] || "", sr = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Jc + t + sr;
  }
  var Wc = !1;
  function Fc(t, l) {
    if (!t || Wc) return "";
    Wc = !0;
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
                } catch (R) {
                  var D = R;
                }
                Reflect.construct(t, [], L);
              } else {
                try {
                  L.call();
                } catch (R) {
                  D = R;
                }
                t.call(L.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                D = R;
              }
              (L = t()) && typeof L.catch == "function" && L.catch(function() {
              });
            }
          } catch (R) {
            if (R && D && typeof R.stack == "string")
              return [R.stack, D.stack];
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
      Wc = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? on(e) : "";
  }
  function Hm(t, l) {
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
        return Fc(t.type, !1);
      case 11:
        return Fc(t.type.render, !1);
      case 1:
        return Fc(t.type, !0);
      case 31:
        return on("Activity");
      default:
        return "";
    }
  }
  function rr(t) {
    try {
      var l = "", e = null;
      do
        l += Hm(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var Ic = Object.prototype.hasOwnProperty, Pc = a.unstable_scheduleCallback, to = a.unstable_cancelCallback, Bm = a.unstable_shouldYield, Lm = a.unstable_requestPaint, pl = a.unstable_now, Ym = a.unstable_getCurrentPriorityLevel, dr = a.unstable_ImmediatePriority, hr = a.unstable_UserBlockingPriority, li = a.unstable_NormalPriority, wm = a.unstable_LowPriority, yr = a.unstable_IdlePriority, Gm = a.log, qm = a.unstable_setDisableYieldValue, wa = null, vl = null;
  function ze(t) {
    if (typeof Gm == "function" && qm(t), vl && typeof vl.setStrictMode == "function")
      try {
        vl.setStrictMode(wa, t);
      } catch {
      }
  }
  var Sl = Math.clz32 ? Math.clz32 : Qm, Xm = Math.log, Zm = Math.LN2;
  function Qm(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Xm(t) / Zm | 0) | 0;
  }
  var ei = 256, ni = 262144, ai = 4194304;
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
  function ui(t, l, e) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var i = 0, o = t.suspendedLanes, s = t.pingedLanes;
    t = t.warmLanes;
    var h = n & 134217727;
    return h !== 0 ? (n = h & ~o, n !== 0 ? i = fn(n) : (s &= h, s !== 0 ? i = fn(s) : e || (e = h & ~t, e !== 0 && (i = fn(e))))) : (h = n & ~o, h !== 0 ? i = fn(h) : s !== 0 ? i = fn(s) : e || (e = n & ~t, e !== 0 && (i = fn(e)))), i === 0 ? 0 : l !== 0 && l !== i && (l & o) === 0 && (o = i & -i, e = l & -l, o >= e || o === 32 && (e & 4194048) !== 0) ? l : i;
  }
  function Ga(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function Vm(t, l) {
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
  function mr() {
    var t = ai;
    return ai <<= 1, (ai & 62914560) === 0 && (ai = 4194304), t;
  }
  function lo(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function qa(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Km(t, l, e, n, i, o) {
    var s = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var h = t.entanglements, S = t.expirationTimes, O = t.hiddenUpdates;
    for (e = s & ~e; 0 < e; ) {
      var H = 31 - Sl(e), L = 1 << H;
      h[H] = 0, S[H] = -1;
      var D = O[H];
      if (D !== null)
        for (O[H] = null, H = 0; H < D.length; H++) {
          var R = D[H];
          R !== null && (R.lane &= -536870913);
        }
      e &= ~L;
    }
    n !== 0 && gr(t, n, 0), o !== 0 && i === 0 && t.tag !== 0 && (t.suspendedLanes |= o & ~(s & ~l));
  }
  function gr(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var n = 31 - Sl(l);
    t.entangledLanes |= l, t.entanglements[n] = t.entanglements[n] | 1073741824 | e & 261930;
  }
  function pr(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var n = 31 - Sl(e), i = 1 << n;
      i & l | t[n] & l && (t[n] |= l), e &= ~i;
    }
  }
  function vr(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : eo(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function eo(t) {
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
  function no(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Sr() {
    var t = J.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : ah(t.type));
  }
  function br(t, l) {
    var e = J.p;
    try {
      return J.p = t, l();
    } finally {
      J.p = e;
    }
  }
  var _e = Math.random().toString(36).slice(2), It = "__reactFiber$" + _e, fl = "__reactProps$" + _e, qn = "__reactContainer$" + _e, ao = "__reactEvents$" + _e, $m = "__reactListeners$" + _e, km = "__reactHandles$" + _e, Mr = "__reactResources$" + _e, Xa = "__reactMarker$" + _e;
  function uo(t) {
    delete t[It], delete t[fl], delete t[ao], delete t[$m], delete t[km];
  }
  function Xn(t) {
    var l = t[It];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[qn] || e[It]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = X1(t); t !== null; ) {
            if (e = t[It]) return e;
            t = X1(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Zn(t) {
    if (t = t[It] || t[qn]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function Za(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(f(33));
  }
  function Qn(t) {
    var l = t[Mr];
    return l || (l = t[Mr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Jt(t) {
    t[Xa] = !0;
  }
  var Er = /* @__PURE__ */ new Set(), xr = {};
  function sn(t, l) {
    Vn(t, l), Vn(t + "Capture", l);
  }
  function Vn(t, l) {
    for (xr[t] = l, t = 0; t < l.length; t++)
      Er.add(l[t]);
  }
  var Jm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Tr = {}, Ar = {};
  function Wm(t) {
    return Ic.call(Ar, t) ? !0 : Ic.call(Tr, t) ? !1 : Jm.test(t) ? Ar[t] = !0 : (Tr[t] = !0, !1);
  }
  function ii(t, l, e) {
    if (Wm(l))
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
  function ci(t, l, e) {
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
  function zr(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Fm(t, l, e) {
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
  function io(t) {
    if (!t._valueTracker) {
      var l = zr(t) ? "checked" : "value";
      t._valueTracker = Fm(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function _r(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), n = "";
    return t && (n = zr(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== e ? (l.setValue(t), !0) : !1;
  }
  function oi(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Im = /[\n"\\]/g;
  function Dl(t) {
    return t.replace(
      Im,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function co(t, l, e, n, i, o, s, h) {
    t.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.type = s : t.removeAttribute("type"), l != null ? s === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + Cl(l)) : t.value !== "" + Cl(l) && (t.value = "" + Cl(l)) : s !== "submit" && s !== "reset" || t.removeAttribute("value"), l != null ? oo(t, s, Cl(l)) : e != null ? oo(t, s, Cl(e)) : n != null && t.removeAttribute("value"), i == null && o != null && (t.defaultChecked = !!o), i != null && (t.checked = i && typeof i != "function" && typeof i != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? t.name = "" + Cl(h) : t.removeAttribute("name");
  }
  function Or(t, l, e, n, i, o, s, h) {
    if (o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (t.type = o), l != null || e != null) {
      if (!(o !== "submit" && o !== "reset" || l != null)) {
        io(t);
        return;
      }
      e = e != null ? "" + Cl(e) : "", l = l != null ? "" + Cl(l) : e, h || l === t.value || (t.value = l), t.defaultValue = l;
    }
    n = n ?? i, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = h ? t.checked : !!n, t.defaultChecked = !!n, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.name = s), io(t);
  }
  function oo(t, l, e) {
    l === "number" && oi(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
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
  function Cr(t, l, e) {
    if (l != null && (l = "" + Cl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + Cl(e) : "";
  }
  function Dr(t, l, e, n) {
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
    e = Cl(l), t.defaultValue = e, n = t.textContent, n === e && n !== "" && n !== null && (t.value = n), io(t);
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
  var Pm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Rr(t, l, e) {
    var n = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? n ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : n ? t.setProperty(l, e) : typeof e != "number" || e === 0 || Pm.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function jr(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(f(62));
    if (t = t.style, e != null) {
      for (var n in e)
        !e.hasOwnProperty(n) || l != null && l.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "");
      for (var i in l)
        n = l[i], l.hasOwnProperty(i) && e[i] !== n && Rr(t, i, n);
    } else
      for (var o in l)
        l.hasOwnProperty(o) && Rr(t, o, l[o]);
  }
  function fo(t) {
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
  var tg = /* @__PURE__ */ new Map([
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
  ]), lg = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function fi(t) {
    return lg.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function ae() {
  }
  var so = null;
  function ro(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var kn = null, Jn = null;
  function Nr(t) {
    var l = Zn(t);
    if (l && (t = l.stateNode)) {
      var e = t[fl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (co(
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
                co(
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
              n = e[l], n.form === t.form && _r(n);
          }
          break t;
        case "textarea":
          Cr(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && Kn(t, !!e.multiple, l, !1);
      }
    }
  }
  var ho = !1;
  function Ur(t, l, e) {
    if (ho) return t(l, e);
    ho = !0;
    try {
      var n = t(l);
      return n;
    } finally {
      if (ho = !1, (kn !== null || Jn !== null) && (Wi(), kn && (l = kn, t = Jn, Jn = kn = null, Nr(l), t)))
        for (l = 0; l < t.length; l++) Nr(t[l]);
    }
  }
  function Qa(t, l) {
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
  var ue = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), yo = !1;
  if (ue)
    try {
      var Va = {};
      Object.defineProperty(Va, "passive", {
        get: function() {
          yo = !0;
        }
      }), window.addEventListener("test", Va, Va), window.removeEventListener("test", Va, Va);
    } catch {
      yo = !1;
    }
  var Oe = null, mo = null, si = null;
  function Hr() {
    if (si) return si;
    var t, l = mo, e = l.length, n, i = "value" in Oe ? Oe.value : Oe.textContent, o = i.length;
    for (t = 0; t < e && l[t] === i[t]; t++) ;
    var s = e - t;
    for (n = 1; n <= s && l[e - n] === i[o - n]; n++) ;
    return si = i.slice(t, 1 < n ? 1 - n : void 0);
  }
  function ri(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function di() {
    return !0;
  }
  function Br() {
    return !1;
  }
  function sl(t) {
    function l(e, n, i, o, s) {
      this._reactName = e, this._targetInst = i, this.type = n, this.nativeEvent = o, this.target = s, this.currentTarget = null;
      for (var h in t)
        t.hasOwnProperty(h) && (e = t[h], this[h] = e ? e(o) : o[h]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? di : Br, this.isPropagationStopped = Br, this;
    }
    return b(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = di);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = di);
      },
      persist: function() {
      },
      isPersistent: di
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
  }, hi = sl(rn), Ka = b({}, rn, { view: 0, detail: 0 }), eg = sl(Ka), go, po, $a, yi = b({}, Ka, {
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
    getModifierState: So,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== $a && ($a && t.type === "mousemove" ? (go = t.screenX - $a.screenX, po = t.screenY - $a.screenY) : po = go = 0, $a = t), go);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : po;
    }
  }), Lr = sl(yi), ng = b({}, yi, { dataTransfer: 0 }), ag = sl(ng), ug = b({}, Ka, { relatedTarget: 0 }), vo = sl(ug), ig = b({}, rn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), cg = sl(ig), og = b({}, rn, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), fg = sl(og), sg = b({}, rn, { data: 0 }), Yr = sl(sg), rg = {
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
  }, dg = {
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
  }, hg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function yg(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = hg[t]) ? !!l[t] : !1;
  }
  function So() {
    return yg;
  }
  var mg = b({}, Ka, {
    key: function(t) {
      if (t.key) {
        var l = rg[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = ri(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? dg[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: So,
    charCode: function(t) {
      return t.type === "keypress" ? ri(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ri(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), gg = sl(mg), pg = b({}, yi, {
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
  }), wr = sl(pg), vg = b({}, Ka, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: So
  }), Sg = sl(vg), bg = b({}, rn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Mg = sl(bg), Eg = b({}, yi, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), xg = sl(Eg), Tg = b({}, rn, {
    newState: 0,
    oldState: 0
  }), Ag = sl(Tg), zg = [9, 13, 27, 32], bo = ue && "CompositionEvent" in window, ka = null;
  ue && "documentMode" in document && (ka = document.documentMode);
  var _g = ue && "TextEvent" in window && !ka, Gr = ue && (!bo || ka && 8 < ka && 11 >= ka), qr = " ", Xr = !1;
  function Zr(t, l) {
    switch (t) {
      case "keyup":
        return zg.indexOf(l.keyCode) !== -1;
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
  function Qr(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Wn = !1;
  function Og(t, l) {
    switch (t) {
      case "compositionend":
        return Qr(l);
      case "keypress":
        return l.which !== 32 ? null : (Xr = !0, qr);
      case "textInput":
        return t = l.data, t === qr && Xr ? null : t;
      default:
        return null;
    }
  }
  function Cg(t, l) {
    if (Wn)
      return t === "compositionend" || !bo && Zr(t, l) ? (t = Hr(), si = mo = Oe = null, Wn = !1, t) : null;
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
        return Gr && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var Dg = {
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
  function Vr(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!Dg[t.type] : l === "textarea";
  }
  function Kr(t, l, e, n) {
    kn ? Jn ? Jn.push(n) : Jn = [n] : kn = n, l = nc(l, "onChange"), 0 < l.length && (e = new hi(
      "onChange",
      "change",
      null,
      e,
      n
    ), t.push({ event: e, listeners: l }));
  }
  var Ja = null, Wa = null;
  function Rg(t) {
    O1(t, 0);
  }
  function mi(t) {
    var l = Za(t);
    if (_r(l)) return t;
  }
  function $r(t, l) {
    if (t === "change") return l;
  }
  var kr = !1;
  if (ue) {
    var Mo;
    if (ue) {
      var Eo = "oninput" in document;
      if (!Eo) {
        var Jr = document.createElement("div");
        Jr.setAttribute("oninput", "return;"), Eo = typeof Jr.oninput == "function";
      }
      Mo = Eo;
    } else Mo = !1;
    kr = Mo && (!document.documentMode || 9 < document.documentMode);
  }
  function Wr() {
    Ja && (Ja.detachEvent("onpropertychange", Fr), Wa = Ja = null);
  }
  function Fr(t) {
    if (t.propertyName === "value" && mi(Wa)) {
      var l = [];
      Kr(
        l,
        Wa,
        t,
        ro(t)
      ), Ur(Rg, l);
    }
  }
  function jg(t, l, e) {
    t === "focusin" ? (Wr(), Ja = l, Wa = e, Ja.attachEvent("onpropertychange", Fr)) : t === "focusout" && Wr();
  }
  function Ng(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return mi(Wa);
  }
  function Ug(t, l) {
    if (t === "click") return mi(l);
  }
  function Hg(t, l) {
    if (t === "input" || t === "change")
      return mi(l);
  }
  function Bg(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var bl = typeof Object.is == "function" ? Object.is : Bg;
  function Fa(t, l) {
    if (bl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), n = Object.keys(l);
    if (e.length !== n.length) return !1;
    for (n = 0; n < e.length; n++) {
      var i = e[n];
      if (!Ic.call(l, i) || !bl(t[i], l[i]))
        return !1;
    }
    return !0;
  }
  function Ir(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Pr(t, l) {
    var e = Ir(t);
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
      e = Ir(e);
    }
  }
  function t0(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? t0(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function l0(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = oi(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = oi(t.document);
    }
    return l;
  }
  function xo(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var Lg = ue && "documentMode" in document && 11 >= document.documentMode, Fn = null, To = null, Ia = null, Ao = !1;
  function e0(t, l, e) {
    var n = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Ao || Fn == null || Fn !== oi(n) || (n = Fn, "selectionStart" in n && xo(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), Ia && Fa(Ia, n) || (Ia = n, n = nc(To, "onSelect"), 0 < n.length && (l = new hi(
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
  }, zo = {}, n0 = {};
  ue && (n0 = document.createElement("div").style, "AnimationEvent" in window || (delete In.animationend.animation, delete In.animationiteration.animation, delete In.animationstart.animation), "TransitionEvent" in window || delete In.transitionend.transition);
  function hn(t) {
    if (zo[t]) return zo[t];
    if (!In[t]) return t;
    var l = In[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in n0)
        return zo[t] = l[e];
    return t;
  }
  var a0 = hn("animationend"), u0 = hn("animationiteration"), i0 = hn("animationstart"), Yg = hn("transitionrun"), wg = hn("transitionstart"), Gg = hn("transitioncancel"), c0 = hn("transitionend"), o0 = /* @__PURE__ */ new Map(), _o = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  _o.push("scrollEnd");
  function Xl(t, l) {
    o0.set(t, l), sn(l, [t]);
  }
  var gi = typeof reportError == "function" ? reportError : function(t) {
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
  }, Rl = [], Pn = 0, Oo = 0;
  function pi() {
    for (var t = Pn, l = Oo = Pn = 0; l < t; ) {
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
      o !== 0 && f0(e, i, o);
    }
  }
  function vi(t, l, e, n) {
    Rl[Pn++] = t, Rl[Pn++] = l, Rl[Pn++] = e, Rl[Pn++] = n, Oo |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function Co(t, l, e, n) {
    return vi(t, l, e, n), Si(t);
  }
  function yn(t, l) {
    return vi(t, null, null, l), Si(t);
  }
  function f0(t, l, e) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e);
    for (var i = !1, o = t.return; o !== null; )
      o.childLanes |= e, n = o.alternate, n !== null && (n.childLanes |= e), o.tag === 22 && (t = o.stateNode, t === null || t._visibility & 1 || (i = !0)), t = o, o = o.return;
    return t.tag === 3 ? (o = t.stateNode, i && l !== null && (i = 31 - Sl(e), t = o.hiddenUpdates, n = t[i], n === null ? t[i] = [l] : n.push(l), l.lane = e | 536870912), o) : null;
  }
  function Si(t) {
    if (50 < bu)
      throw bu = 0, wf = null, Error(f(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var ta = {};
  function qg(t, l, e, n) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ml(t, l, e, n) {
    return new qg(t, l, e, n);
  }
  function Do(t) {
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
  function s0(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function bi(t, l, e, n, i, o) {
    var s = 0;
    if (n = t, typeof t == "function") Do(t) && (s = 1);
    else if (typeof t == "string")
      s = Kp(
        t,
        e,
        tt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case k:
          return t = Ml(31, e, l, i), t.elementType = k, t.lanes = o, t;
        case $:
          return mn(e.children, i, o, l);
        case G:
          s = 8, i |= 24;
          break;
        case Z:
          return t = Ml(12, e, l, i | 2), t.elementType = Z, t.lanes = o, t;
        case M:
          return t = Ml(13, e, l, i), t.elementType = M, t.lanes = o, t;
        case T:
          return t = Ml(19, e, l, i), t.elementType = T, t.lanes = o, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case Q:
                s = 10;
                break t;
              case V:
                s = 9;
                break t;
              case C:
                s = 11;
                break t;
              case Y:
                s = 14;
                break t;
              case W:
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
  function Ro(t, l, e) {
    return t = Ml(6, t, null, l), t.lanes = e, t;
  }
  function r0(t) {
    var l = Ml(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function jo(t, l, e) {
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
  var d0 = /* @__PURE__ */ new WeakMap();
  function jl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = d0.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: rr(l)
      }, d0.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: rr(l)
    };
  }
  var la = [], ea = 0, Mi = null, Pa = 0, Nl = [], Ul = 0, Ce = null, Jl = 1, Wl = "";
  function ce(t, l) {
    la[ea++] = Pa, la[ea++] = Mi, Mi = t, Pa = l;
  }
  function h0(t, l, e) {
    Nl[Ul++] = Jl, Nl[Ul++] = Wl, Nl[Ul++] = Ce, Ce = t;
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
  function No(t) {
    t.return !== null && (ce(t, 1), h0(t, 1, 0));
  }
  function Uo(t) {
    for (; t === Mi; )
      Mi = la[--ea], la[ea] = null, Pa = la[--ea], la[ea] = null;
    for (; t === Ce; )
      Ce = Nl[--Ul], Nl[Ul] = null, Wl = Nl[--Ul], Nl[Ul] = null, Jl = Nl[--Ul], Nl[Ul] = null;
  }
  function y0(t, l) {
    Nl[Ul++] = Jl, Nl[Ul++] = Wl, Nl[Ul++] = Ce, Jl = l.id, Wl = l.overflow, Ce = t;
  }
  var Pt = null, Nt = null, vt = !1, De = null, Hl = !1, Ho = Error(f(519));
  function Re(t) {
    var l = Error(
      f(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw tu(jl(l, t)), Ho;
  }
  function m0(t) {
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
        for (e = 0; e < Eu.length; e++)
          yt(Eu[e], l);
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
        yt("invalid", l), Or(
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
        yt("invalid", l), Dr(l, n.value, n.defaultValue, n.children);
    }
    e = n.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || n.suppressHydrationWarning === !0 || j1(l.textContent, e) ? (n.popover != null && (yt("beforetoggle", l), yt("toggle", l)), n.onScroll != null && yt("scroll", l), n.onScrollEnd != null && yt("scrollend", l), n.onClick != null && (l.onclick = ae), l = !0) : l = !1, l || Re(t, !0);
  }
  function g0(t) {
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
    if (!vt) return g0(t), vt = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || ts(t.type, t.memoizedProps)), e = !e), e && Nt && Re(t), g0(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      Nt = q1(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      Nt = q1(t);
    } else
      l === 27 ? (l = Nt, Ve(t.type) ? (t = us, us = null, Nt = t) : Nt = l) : Nt = Pt ? Ll(t.stateNode.nextSibling) : null;
    return !0;
  }
  function gn() {
    Nt = Pt = null, vt = !1;
  }
  function Bo() {
    var t = De;
    return t !== null && (yl === null ? yl = t : yl.push.apply(
      yl,
      t
    ), De = null), t;
  }
  function tu(t) {
    De === null ? De = [t] : De.push(t);
  }
  var Lo = x(null), pn = null, oe = null;
  function je(t, l, e) {
    F(Lo, l._currentValue), l._currentValue = e;
  }
  function fe(t) {
    t._currentValue = Lo.current, w(Lo);
  }
  function Yo(t, l, e) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, n !== null && (n.childLanes |= l)) : n !== null && (n.childLanes & l) !== l && (n.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function wo(t, l, e, n) {
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
              o.lanes |= e, h = o.alternate, h !== null && (h.lanes |= e), Yo(
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
        s.lanes |= e, o = s.alternate, o !== null && (o.lanes |= e), Yo(s, e, t), s = null;
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
        s.memoizedState.memoizedState !== i.memoizedState.memoizedState && (t !== null ? t.push(_u) : t = [_u]);
      }
      i = i.return;
    }
    t !== null && wo(
      l,
      t,
      e,
      n
    ), l.flags |= 262144;
  }
  function Ei(t) {
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
    return p0(pn, t);
  }
  function xi(t, l) {
    return pn === null && vn(t), p0(t, l);
  }
  function p0(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, oe === null) {
      if (t === null) throw Error(f(308));
      oe = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else oe = oe.next = l;
    return e;
  }
  var Xg = typeof AbortController < "u" ? AbortController : function() {
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
  }, Zg = a.unstable_scheduleCallback, Qg = a.unstable_NormalPriority, Xt = {
    $$typeof: Q,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Go() {
    return {
      controller: new Xg(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function lu(t) {
    t.refCount--, t.refCount === 0 && Zg(Qg, function() {
      t.controller.abort();
    });
  }
  var eu = null, qo = 0, ua = 0, ia = null;
  function Vg(t, l) {
    if (eu === null) {
      var e = eu = [];
      qo = 0, ua = Vf(), ia = {
        status: "pending",
        value: void 0,
        then: function(n) {
          e.push(n);
        }
      };
    }
    return qo++, l.then(v0, v0), l;
  }
  function v0() {
    if (--qo === 0 && eu !== null) {
      ia !== null && (ia.status = "fulfilled");
      var t = eu;
      eu = null, ua = 0, ia = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function Kg(t, l) {
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
  var S0 = U.S;
  U.S = function(t, l) {
    e1 = pl(), typeof l == "object" && l !== null && typeof l.then == "function" && Vg(t, l), S0 !== null && S0(t, l);
  };
  var Sn = x(null);
  function Xo() {
    var t = Sn.current;
    return t !== null ? t : jt.pooledCache;
  }
  function Ti(t, l) {
    l === null ? F(Sn, Sn.current) : F(Sn, l.pool);
  }
  function b0() {
    var t = Xo();
    return t === null ? null : { parent: Xt._currentValue, pool: t };
  }
  var ca = Error(f(460)), Zo = Error(f(474)), Ai = Error(f(542)), zi = { then: function() {
  } };
  function M0(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function E0(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(ae, ae), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, T0(t), t;
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
            throw t = l.reason, T0(t), t;
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
  function x0() {
    if (Mn === null) throw Error(f(459));
    var t = Mn;
    return Mn = null, t;
  }
  function T0(t) {
    if (t === ca || t === Ai)
      throw Error(f(483));
  }
  var oa = null, nu = 0;
  function _i(t) {
    var l = nu;
    return nu += 1, oa === null && (oa = []), E0(oa, t, l);
  }
  function au(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function Oi(t, l) {
    throw l.$$typeof === j ? Error(f(525)) : (t = Object.prototype.toString.call(l), Error(
      f(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function A0(t) {
    function l(A, E) {
      if (t) {
        var _ = A.deletions;
        _ === null ? (A.deletions = [E], A.flags |= 16) : _.push(E);
      }
    }
    function e(A, E) {
      if (!t) return null;
      for (; E !== null; )
        l(A, E), E = E.sibling;
      return null;
    }
    function n(A) {
      for (var E = /* @__PURE__ */ new Map(); A !== null; )
        A.key !== null ? E.set(A.key, A) : E.set(A.index, A), A = A.sibling;
      return E;
    }
    function i(A, E) {
      return A = ie(A, E), A.index = 0, A.sibling = null, A;
    }
    function o(A, E, _) {
      return A.index = _, t ? (_ = A.alternate, _ !== null ? (_ = _.index, _ < E ? (A.flags |= 67108866, E) : _) : (A.flags |= 67108866, E)) : (A.flags |= 1048576, E);
    }
    function s(A) {
      return t && A.alternate === null && (A.flags |= 67108866), A;
    }
    function h(A, E, _, B) {
      return E === null || E.tag !== 6 ? (E = Ro(_, A.mode, B), E.return = A, E) : (E = i(E, _), E.return = A, E);
    }
    function S(A, E, _, B) {
      var nt = _.type;
      return nt === $ ? H(
        A,
        E,
        _.props.children,
        B,
        _.key
      ) : E !== null && (E.elementType === nt || typeof nt == "object" && nt !== null && nt.$$typeof === W && bn(nt) === E.type) ? (E = i(E, _.props), au(E, _), E.return = A, E) : (E = bi(
        _.type,
        _.key,
        _.props,
        null,
        A.mode,
        B
      ), au(E, _), E.return = A, E);
    }
    function O(A, E, _, B) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== _.containerInfo || E.stateNode.implementation !== _.implementation ? (E = jo(_, A.mode, B), E.return = A, E) : (E = i(E, _.children || []), E.return = A, E);
    }
    function H(A, E, _, B, nt) {
      return E === null || E.tag !== 7 ? (E = mn(
        _,
        A.mode,
        B,
        nt
      ), E.return = A, E) : (E = i(E, _), E.return = A, E);
    }
    function L(A, E, _) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return E = Ro(
          "" + E,
          A.mode,
          _
        ), E.return = A, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case N:
            return _ = bi(
              E.type,
              E.key,
              E.props,
              null,
              A.mode,
              _
            ), au(_, E), _.return = A, _;
          case X:
            return E = jo(
              E,
              A.mode,
              _
            ), E.return = A, E;
          case W:
            return E = bn(E), L(A, E, _);
        }
        if (Mt(E) || at(E))
          return E = mn(
            E,
            A.mode,
            _,
            null
          ), E.return = A, E;
        if (typeof E.then == "function")
          return L(A, _i(E), _);
        if (E.$$typeof === Q)
          return L(
            A,
            xi(A, E),
            _
          );
        Oi(A, E);
      }
      return null;
    }
    function D(A, E, _, B) {
      var nt = E !== null ? E.key : null;
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint")
        return nt !== null ? null : h(A, E, "" + _, B);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case N:
            return _.key === nt ? S(A, E, _, B) : null;
          case X:
            return _.key === nt ? O(A, E, _, B) : null;
          case W:
            return _ = bn(_), D(A, E, _, B);
        }
        if (Mt(_) || at(_))
          return nt !== null ? null : H(A, E, _, B, null);
        if (typeof _.then == "function")
          return D(
            A,
            E,
            _i(_),
            B
          );
        if (_.$$typeof === Q)
          return D(
            A,
            E,
            xi(A, _),
            B
          );
        Oi(A, _);
      }
      return null;
    }
    function R(A, E, _, B, nt) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return A = A.get(_) || null, h(E, A, "" + B, nt);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case N:
            return A = A.get(
              B.key === null ? _ : B.key
            ) || null, S(E, A, B, nt);
          case X:
            return A = A.get(
              B.key === null ? _ : B.key
            ) || null, O(E, A, B, nt);
          case W:
            return B = bn(B), R(
              A,
              E,
              _,
              B,
              nt
            );
        }
        if (Mt(B) || at(B))
          return A = A.get(_) || null, H(E, A, B, nt, null);
        if (typeof B.then == "function")
          return R(
            A,
            E,
            _,
            _i(B),
            nt
          );
        if (B.$$typeof === Q)
          return R(
            A,
            E,
            _,
            xi(E, B),
            nt
          );
        Oi(E, B);
      }
      return null;
    }
    function P(A, E, _, B) {
      for (var nt = null, Et = null, lt = E, rt = E = 0, gt = null; lt !== null && rt < _.length; rt++) {
        lt.index > rt ? (gt = lt, lt = null) : gt = lt.sibling;
        var xt = D(
          A,
          lt,
          _[rt],
          B
        );
        if (xt === null) {
          lt === null && (lt = gt);
          break;
        }
        t && lt && xt.alternate === null && l(A, lt), E = o(xt, E, rt), Et === null ? nt = xt : Et.sibling = xt, Et = xt, lt = gt;
      }
      if (rt === _.length)
        return e(A, lt), vt && ce(A, rt), nt;
      if (lt === null) {
        for (; rt < _.length; rt++)
          lt = L(A, _[rt], B), lt !== null && (E = o(
            lt,
            E,
            rt
          ), Et === null ? nt = lt : Et.sibling = lt, Et = lt);
        return vt && ce(A, rt), nt;
      }
      for (lt = n(lt); rt < _.length; rt++)
        gt = R(
          lt,
          A,
          rt,
          _[rt],
          B
        ), gt !== null && (t && gt.alternate !== null && lt.delete(
          gt.key === null ? rt : gt.key
        ), E = o(
          gt,
          E,
          rt
        ), Et === null ? nt = gt : Et.sibling = gt, Et = gt);
      return t && lt.forEach(function(We) {
        return l(A, We);
      }), vt && ce(A, rt), nt;
    }
    function ut(A, E, _, B) {
      if (_ == null) throw Error(f(151));
      for (var nt = null, Et = null, lt = E, rt = E = 0, gt = null, xt = _.next(); lt !== null && !xt.done; rt++, xt = _.next()) {
        lt.index > rt ? (gt = lt, lt = null) : gt = lt.sibling;
        var We = D(A, lt, xt.value, B);
        if (We === null) {
          lt === null && (lt = gt);
          break;
        }
        t && lt && We.alternate === null && l(A, lt), E = o(We, E, rt), Et === null ? nt = We : Et.sibling = We, Et = We, lt = gt;
      }
      if (xt.done)
        return e(A, lt), vt && ce(A, rt), nt;
      if (lt === null) {
        for (; !xt.done; rt++, xt = _.next())
          xt = L(A, xt.value, B), xt !== null && (E = o(xt, E, rt), Et === null ? nt = xt : Et.sibling = xt, Et = xt);
        return vt && ce(A, rt), nt;
      }
      for (lt = n(lt); !xt.done; rt++, xt = _.next())
        xt = R(lt, A, rt, xt.value, B), xt !== null && (t && xt.alternate !== null && lt.delete(xt.key === null ? rt : xt.key), E = o(xt, E, rt), Et === null ? nt = xt : Et.sibling = xt, Et = xt);
      return t && lt.forEach(function(nv) {
        return l(A, nv);
      }), vt && ce(A, rt), nt;
    }
    function Rt(A, E, _, B) {
      if (typeof _ == "object" && _ !== null && _.type === $ && _.key === null && (_ = _.props.children), typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case N:
            t: {
              for (var nt = _.key; E !== null; ) {
                if (E.key === nt) {
                  if (nt = _.type, nt === $) {
                    if (E.tag === 7) {
                      e(
                        A,
                        E.sibling
                      ), B = i(
                        E,
                        _.props.children
                      ), B.return = A, A = B;
                      break t;
                    }
                  } else if (E.elementType === nt || typeof nt == "object" && nt !== null && nt.$$typeof === W && bn(nt) === E.type) {
                    e(
                      A,
                      E.sibling
                    ), B = i(E, _.props), au(B, _), B.return = A, A = B;
                    break t;
                  }
                  e(A, E);
                  break;
                } else l(A, E);
                E = E.sibling;
              }
              _.type === $ ? (B = mn(
                _.props.children,
                A.mode,
                B,
                _.key
              ), B.return = A, A = B) : (B = bi(
                _.type,
                _.key,
                _.props,
                null,
                A.mode,
                B
              ), au(B, _), B.return = A, A = B);
            }
            return s(A);
          case X:
            t: {
              for (nt = _.key; E !== null; ) {
                if (E.key === nt)
                  if (E.tag === 4 && E.stateNode.containerInfo === _.containerInfo && E.stateNode.implementation === _.implementation) {
                    e(
                      A,
                      E.sibling
                    ), B = i(E, _.children || []), B.return = A, A = B;
                    break t;
                  } else {
                    e(A, E);
                    break;
                  }
                else l(A, E);
                E = E.sibling;
              }
              B = jo(_, A.mode, B), B.return = A, A = B;
            }
            return s(A);
          case W:
            return _ = bn(_), Rt(
              A,
              E,
              _,
              B
            );
        }
        if (Mt(_))
          return P(
            A,
            E,
            _,
            B
          );
        if (at(_)) {
          if (nt = at(_), typeof nt != "function") throw Error(f(150));
          return _ = nt.call(_), ut(
            A,
            E,
            _,
            B
          );
        }
        if (typeof _.then == "function")
          return Rt(
            A,
            E,
            _i(_),
            B
          );
        if (_.$$typeof === Q)
          return Rt(
            A,
            E,
            xi(A, _),
            B
          );
        Oi(A, _);
      }
      return typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint" ? (_ = "" + _, E !== null && E.tag === 6 ? (e(A, E.sibling), B = i(E, _), B.return = A, A = B) : (e(A, E), B = Ro(_, A.mode, B), B.return = A, A = B), s(A)) : e(A, E);
    }
    return function(A, E, _, B) {
      try {
        nu = 0;
        var nt = Rt(
          A,
          E,
          _,
          B
        );
        return oa = null, nt;
      } catch (lt) {
        if (lt === ca || lt === Ai) throw lt;
        var Et = Ml(29, lt, null, A.mode);
        return Et.lanes = B, Et.return = A, Et;
      } finally {
      }
    };
  }
  var En = A0(!0), z0 = A0(!1), Ne = !1;
  function Qo(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Vo(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ue(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function He(t, l, e) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (At & 2) !== 0) {
      var i = n.pending;
      return i === null ? l.next = l : (l.next = i.next, i.next = l), n.pending = l, l = Si(t), f0(t, null, e), l;
    }
    return vi(t, n, l, e), Si(t);
  }
  function uu(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var n = l.lanes;
      n &= t.pendingLanes, e |= n, l.lanes = e, pr(t, e);
    }
  }
  function Ko(t, l) {
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
  var $o = !1;
  function iu() {
    if ($o) {
      var t = ia;
      if (t !== null) throw t;
    }
  }
  function cu(t, l, e, n) {
    $o = !1;
    var i = t.updateQueue;
    Ne = !1;
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
        var D = h.lane & -536870913, R = D !== h.lane;
        if (R ? (mt & D) === D : (n & D) === D) {
          D !== 0 && D === ua && ($o = !0), H !== null && (H = H.next = {
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: null,
            next: null
          });
          t: {
            var P = t, ut = h;
            D = l;
            var Rt = e;
            switch (ut.tag) {
              case 1:
                if (P = ut.payload, typeof P == "function") {
                  L = P.call(Rt, L, D);
                  break t;
                }
                L = P;
                break t;
              case 3:
                P.flags = P.flags & -65537 | 128;
              case 0:
                if (P = ut.payload, D = typeof P == "function" ? P.call(Rt, L, D) : P, D == null) break t;
                L = b({}, L, D);
                break t;
              case 2:
                Ne = !0;
            }
          }
          D = h.callback, D !== null && (t.flags |= 64, R && (t.flags |= 8192), R = i.callbacks, R === null ? i.callbacks = [D] : R.push(D));
        } else
          R = {
            lane: D,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          }, H === null ? (O = H = R, S = L) : H = H.next = R, s |= D;
        if (h = h.next, h === null) {
          if (h = i.shared.pending, h === null)
            break;
          R = h, h = R.next, R.next = null, i.lastBaseUpdate = R, i.shared.pending = null;
        }
      } while (!0);
      H === null && (S = L), i.baseState = S, i.firstBaseUpdate = O, i.lastBaseUpdate = H, o === null && (i.shared.lanes = 0), Ge |= s, t.lanes = s, t.memoizedState = L;
    }
  }
  function _0(t, l) {
    if (typeof t != "function")
      throw Error(f(191, t));
    t.call(l);
  }
  function O0(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        _0(e[t], l);
  }
  var fa = x(null), Ci = x(0);
  function C0(t, l) {
    t = ve, F(Ci, t), F(fa, l), ve = t | l.baseLanes;
  }
  function ko() {
    F(Ci, ve), F(fa, fa.current);
  }
  function Jo() {
    ve = Ci.current, w(fa), w(Ci);
  }
  var El = x(null), Bl = null;
  function Be(t) {
    var l = t.alternate;
    F(wt, wt.current & 1), F(El, t), Bl === null && (l === null || fa.current !== null || l.memoizedState !== null) && (Bl = t);
  }
  function Wo(t) {
    F(wt, wt.current), F(El, t), Bl === null && (Bl = t);
  }
  function D0(t) {
    t.tag === 22 ? (F(wt, wt.current), F(El, t), Bl === null && (Bl = t)) : Le();
  }
  function Le() {
    F(wt, wt.current), F(El, El.current);
  }
  function xl(t) {
    w(El), Bl === t && (Bl = null), w(wt);
  }
  var wt = x(0);
  function Di(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || ns(e) || as(e)))
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
  var se = 0, st = null, Ct = null, Zt = null, Ri = !1, sa = !1, xn = !1, ji = 0, ou = 0, ra = null, $g = 0;
  function Bt() {
    throw Error(f(321));
  }
  function Fo(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!bl(t[e], l[e])) return !1;
    return !0;
  }
  function Io(t, l, e, n, i, o) {
    return se = o, st = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, U.H = t === null || t.memoizedState === null ? hd : yf, xn = !1, o = e(n, i), xn = !1, sa && (o = j0(
      l,
      e,
      n,
      i
    )), R0(t), o;
  }
  function R0(t) {
    U.H = ru;
    var l = Ct !== null && Ct.next !== null;
    if (se = 0, Zt = Ct = st = null, Ri = !1, ou = 0, ra = null, l) throw Error(f(300));
    t === null || Qt || (t = t.dependencies, t !== null && Ei(t) && (Qt = !0));
  }
  function j0(t, l, e, n) {
    st = t;
    var i = 0;
    do {
      if (sa && (ra = null), ou = 0, sa = !1, 25 <= i) throw Error(f(301));
      if (i += 1, Zt = Ct = null, t.updateQueue != null) {
        var o = t.updateQueue;
        o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
      }
      U.H = yd, o = l(e, n);
    } while (sa);
    return o;
  }
  function kg() {
    var t = U.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? fu(l) : l, t = t.useState()[0], (Ct !== null ? Ct.memoizedState : null) !== t && (st.flags |= 1024), l;
  }
  function Po() {
    var t = ji !== 0;
    return ji = 0, t;
  }
  function tf(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function lf(t) {
    if (Ri) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      Ri = !1;
    }
    se = 0, Zt = Ct = st = null, sa = !1, ou = ji = 0, ra = null;
  }
  function ol() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Zt === null ? st.memoizedState = Zt = t : Zt = Zt.next = t, Zt;
  }
  function Gt() {
    if (Ct === null) {
      var t = st.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ct.next;
    var l = Zt === null ? st.memoizedState : Zt.next;
    if (l !== null)
      Zt = l, Ct = t;
    else {
      if (t === null)
        throw st.alternate === null ? Error(f(467)) : Error(f(310));
      Ct = t, t = {
        memoizedState: Ct.memoizedState,
        baseState: Ct.baseState,
        baseQueue: Ct.baseQueue,
        queue: Ct.queue,
        next: null
      }, Zt === null ? st.memoizedState = Zt = t : Zt = Zt.next = t;
    }
    return Zt;
  }
  function Ni() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function fu(t) {
    var l = ou;
    return ou += 1, ra === null && (ra = []), t = E0(ra, t, l), l = st, (Zt === null ? l.memoizedState : Zt.next) === null && (l = l.alternate, U.H = l === null || l.memoizedState === null ? hd : yf), t;
  }
  function Ui(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return fu(t);
      if (t.$$typeof === Q) return tl(t);
    }
    throw Error(f(438, String(t)));
  }
  function ef(t) {
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
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = Ni(), st.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), n = 0; n < t; n++)
        e[n] = q;
    return l.index++, e;
  }
  function re(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function Hi(t) {
    var l = Gt();
    return nf(l, Ct, t);
  }
  function nf(t, l, e) {
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
          var D = O.revertLane;
          if (D === 0)
            S !== null && (S = S.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }), L === ua && (H = !0);
          else if ((se & D) === D) {
            O = O.next, D === ua && (H = !0);
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
            }, S === null ? (h = S = L, s = o) : S = S.next = L, st.lanes |= D, Ge |= D;
          L = O.action, xn && e(o, L), o = O.hasEagerState ? O.eagerState : e(o, L);
        } else
          D = {
            lane: L,
            revertLane: O.revertLane,
            gesture: O.gesture,
            action: O.action,
            hasEagerState: O.hasEagerState,
            eagerState: O.eagerState,
            next: null
          }, S === null ? (h = S = D, s = o) : S = S.next = D, st.lanes |= L, Ge |= L;
        O = O.next;
      } while (O !== null && O !== l);
      if (S === null ? s = o : S.next = h, !bl(o, t.memoizedState) && (Qt = !0, H && (e = ia, e !== null)))
        throw e;
      t.memoizedState = o, t.baseState = s, t.baseQueue = S, n.lastRenderedState = o;
    }
    return i === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function af(t) {
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
      bl(o, l.memoizedState) || (Qt = !0), l.memoizedState = o, l.baseQueue === null && (l.baseState = o), e.lastRenderedState = o;
    }
    return [o, n];
  }
  function N0(t, l, e) {
    var n = st, i = Gt(), o = vt;
    if (o) {
      if (e === void 0) throw Error(f(407));
      e = e();
    } else e = l();
    var s = !bl(
      (Ct || i).memoizedState,
      e
    );
    if (s && (i.memoizedState = e, Qt = !0), i = i.queue, of(B0.bind(null, n, i, t), [
      t
    ]), i.getSnapshot !== l || s || Zt !== null && Zt.memoizedState.tag & 1) {
      if (n.flags |= 2048, da(
        9,
        { destroy: void 0 },
        H0.bind(
          null,
          n,
          i,
          e,
          l
        ),
        null
      ), jt === null) throw Error(f(349));
      o || (se & 127) !== 0 || U0(n, l, e);
    }
    return e;
  }
  function U0(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = st.updateQueue, l === null ? (l = Ni(), st.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function H0(t, l, e, n) {
    l.value = e, l.getSnapshot = n, L0(l) && Y0(t);
  }
  function B0(t, l, e) {
    return e(function() {
      L0(l) && Y0(t);
    });
  }
  function L0(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !bl(t, e);
    } catch {
      return !0;
    }
  }
  function Y0(t) {
    var l = yn(t, 2);
    l !== null && ml(l, t, 2);
  }
  function uf(t) {
    var l = ol();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), xn) {
        ze(!0);
        try {
          e();
        } finally {
          ze(!1);
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
  function w0(t, l, e, n) {
    return t.baseState = e, nf(
      t,
      Ct,
      typeof n == "function" ? n : re
    );
  }
  function Jg(t, l, e, n, i) {
    if (Yi(t)) throw Error(f(485));
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
      U.T !== null ? e(!0) : o.isTransition = !1, n(o), e = l.pending, e === null ? (o.next = l.pending = o, G0(l, o)) : (o.next = e.next, l.pending = e.next = o);
    }
  }
  function G0(t, l) {
    var e = l.action, n = l.payload, i = t.state;
    if (l.isTransition) {
      var o = U.T, s = {};
      U.T = s;
      try {
        var h = e(i, n), S = U.S;
        S !== null && S(s, h), q0(t, l, h);
      } catch (O) {
        cf(t, l, O);
      } finally {
        o !== null && s.types !== null && (o.types = s.types), U.T = o;
      }
    } else
      try {
        o = e(i, n), q0(t, l, o);
      } catch (O) {
        cf(t, l, O);
      }
  }
  function q0(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(n) {
        X0(t, l, n);
      },
      function(n) {
        return cf(t, l, n);
      }
    ) : X0(t, l, e);
  }
  function X0(t, l, e) {
    l.status = "fulfilled", l.value = e, Z0(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, G0(t, e)));
  }
  function cf(t, l, e) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do
        l.status = "rejected", l.reason = e, Z0(l), l = l.next;
      while (l !== n);
    }
    t.action = null;
  }
  function Z0(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Q0(t, l) {
    return l;
  }
  function V0(t, l) {
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
            Re(n);
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
      lastRenderedReducer: Q0,
      lastRenderedState: l
    }, e.queue = n, e = sd.bind(
      null,
      st,
      n
    ), n.dispatch = e, n = uf(!1), o = hf.bind(
      null,
      st,
      !1,
      n.queue
    ), n = ol(), i = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = i, e = Jg.bind(
      null,
      st,
      i,
      o,
      e
    ), i.dispatch = e, n.memoizedState = t, [l, e, !1];
  }
  function K0(t) {
    var l = Gt();
    return $0(l, Ct, t);
  }
  function $0(t, l, e) {
    if (l = nf(
      t,
      l,
      Q0
    )[0], t = Hi(re)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var n = fu(l);
      } catch (s) {
        throw s === ca ? Ai : s;
      }
    else n = l;
    l = Gt();
    var i = l.queue, o = i.dispatch;
    return e !== l.memoizedState && (st.flags |= 2048, da(
      9,
      { destroy: void 0 },
      Wg.bind(null, i, e),
      null
    )), [n, o, t];
  }
  function Wg(t, l) {
    t.action = l;
  }
  function k0(t) {
    var l = Gt(), e = Ct;
    if (e !== null)
      return $0(l, e, t);
    Gt(), l = l.memoizedState, e = Gt();
    var n = e.queue.dispatch;
    return e.memoizedState = t, [l, n, !1];
  }
  function da(t, l, e, n) {
    return t = { tag: t, create: e, deps: n, inst: l, next: null }, l = st.updateQueue, l === null && (l = Ni(), st.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (n = e.next, e.next = t, t.next = n, l.lastEffect = t), t;
  }
  function J0() {
    return Gt().memoizedState;
  }
  function Bi(t, l, e, n) {
    var i = ol();
    st.flags |= t, i.memoizedState = da(
      1 | l,
      { destroy: void 0 },
      e,
      n === void 0 ? null : n
    );
  }
  function Li(t, l, e, n) {
    var i = Gt();
    n = n === void 0 ? null : n;
    var o = i.memoizedState.inst;
    Ct !== null && n !== null && Fo(n, Ct.memoizedState.deps) ? i.memoizedState = da(l, o, e, n) : (st.flags |= t, i.memoizedState = da(
      1 | l,
      o,
      e,
      n
    ));
  }
  function W0(t, l) {
    Bi(8390656, 8, t, l);
  }
  function of(t, l) {
    Li(2048, 8, t, l);
  }
  function Fg(t) {
    st.flags |= 4;
    var l = st.updateQueue;
    if (l === null)
      l = Ni(), st.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function F0(t) {
    var l = Gt().memoizedState;
    return Fg({ ref: l, nextImpl: t }), function() {
      if ((At & 2) !== 0) throw Error(f(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function I0(t, l) {
    return Li(4, 2, t, l);
  }
  function P0(t, l) {
    return Li(4, 4, t, l);
  }
  function td(t, l) {
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
  function ld(t, l, e) {
    e = e != null ? e.concat([t]) : null, Li(4, 4, td.bind(null, l, t), e);
  }
  function ff() {
  }
  function ed(t, l) {
    var e = Gt();
    l = l === void 0 ? null : l;
    var n = e.memoizedState;
    return l !== null && Fo(l, n[1]) ? n[0] : (e.memoizedState = [t, l], t);
  }
  function nd(t, l) {
    var e = Gt();
    l = l === void 0 ? null : l;
    var n = e.memoizedState;
    if (l !== null && Fo(l, n[1]))
      return n[0];
    if (n = t(), xn) {
      ze(!0);
      try {
        t();
      } finally {
        ze(!1);
      }
    }
    return e.memoizedState = [n, l], n;
  }
  function sf(t, l, e) {
    return e === void 0 || (se & 1073741824) !== 0 && (mt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = a1(), st.lanes |= t, Ge |= t, e);
  }
  function ad(t, l, e, n) {
    return bl(e, l) ? e : fa.current !== null ? (t = sf(t, e, n), bl(t, l) || (Qt = !0), t) : (se & 42) === 0 || (se & 1073741824) !== 0 && (mt & 261930) === 0 ? (Qt = !0, t.memoizedState = e) : (t = a1(), st.lanes |= t, Ge |= t, l);
  }
  function ud(t, l, e, n, i) {
    var o = J.p;
    J.p = o !== 0 && 8 > o ? o : 8;
    var s = U.T, h = {};
    U.T = h, hf(t, !1, l, e);
    try {
      var S = i(), O = U.S;
      if (O !== null && O(h, S), S !== null && typeof S == "object" && typeof S.then == "function") {
        var H = Kg(
          S,
          n
        );
        su(
          t,
          l,
          H,
          zl(t)
        );
      } else
        su(
          t,
          l,
          n,
          zl(t)
        );
    } catch (L) {
      su(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: L },
        zl()
      );
    } finally {
      J.p = o, s !== null && h.types !== null && (s.types = h.types), U.T = s;
    }
  }
  function Ig() {
  }
  function rf(t, l, e, n) {
    if (t.tag !== 5) throw Error(f(476));
    var i = id(t).queue;
    ud(
      t,
      i,
      l,
      et,
      e === null ? Ig : function() {
        return cd(t), e(n);
      }
    );
  }
  function id(t) {
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
  function cd(t) {
    var l = id(t);
    l.next === null && (l = t.alternate.memoizedState), su(
      t,
      l.next.queue,
      {},
      zl()
    );
  }
  function df() {
    return tl(_u);
  }
  function od() {
    return Gt().memoizedState;
  }
  function fd() {
    return Gt().memoizedState;
  }
  function Pg(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = zl();
          t = Ue(e);
          var n = He(l, t, e);
          n !== null && (ml(n, l, e), uu(n, l, e)), l = { cache: Go() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function tp(t, l, e) {
    var n = zl();
    e = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Yi(t) ? rd(l, e) : (e = Co(t, l, e, n), e !== null && (ml(e, t, n), dd(e, l, n)));
  }
  function sd(t, l, e) {
    var n = zl();
    su(t, l, e, n);
  }
  function su(t, l, e, n) {
    var i = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Yi(t)) rd(l, i);
    else {
      var o = t.alternate;
      if (t.lanes === 0 && (o === null || o.lanes === 0) && (o = l.lastRenderedReducer, o !== null))
        try {
          var s = l.lastRenderedState, h = o(s, e);
          if (i.hasEagerState = !0, i.eagerState = h, bl(h, s))
            return vi(t, l, i, 0), jt === null && pi(), !1;
        } catch {
        } finally {
        }
      if (e = Co(t, l, i, n), e !== null)
        return ml(e, t, n), dd(e, l, n), !0;
    }
    return !1;
  }
  function hf(t, l, e, n) {
    if (n = {
      lane: 2,
      revertLane: Vf(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Yi(t)) {
      if (l) throw Error(f(479));
    } else
      l = Co(
        t,
        e,
        n,
        2
      ), l !== null && ml(l, t, 2);
  }
  function Yi(t) {
    var l = t.alternate;
    return t === st || l !== null && l === st;
  }
  function rd(t, l) {
    sa = Ri = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function dd(t, l, e) {
    if ((e & 4194048) !== 0) {
      var n = l.lanes;
      n &= t.pendingLanes, e |= n, l.lanes = e, pr(t, e);
    }
  }
  var ru = {
    readContext: tl,
    use: Ui,
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
  ru.useEffectEvent = Bt;
  var hd = {
    readContext: tl,
    use: Ui,
    useCallback: function(t, l) {
      return ol().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: tl,
    useEffect: W0,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, Bi(
        4194308,
        4,
        td.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return Bi(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      Bi(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = ol();
      l = l === void 0 ? null : l;
      var n = t();
      if (xn) {
        ze(!0);
        try {
          t();
        } finally {
          ze(!1);
        }
      }
      return e.memoizedState = [n, l], n;
    },
    useReducer: function(t, l, e) {
      var n = ol();
      if (e !== void 0) {
        var i = e(l);
        if (xn) {
          ze(!0);
          try {
            e(l);
          } finally {
            ze(!1);
          }
        }
      } else i = l;
      return n.memoizedState = n.baseState = i, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: i
      }, n.queue = t, t = t.dispatch = tp.bind(
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
      t = uf(t);
      var l = t.queue, e = sd.bind(null, st, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: ff,
    useDeferredValue: function(t, l) {
      var e = ol();
      return sf(e, t, l);
    },
    useTransition: function() {
      var t = uf(!1);
      return t = ud.bind(
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
        (mt & 127) !== 0 || U0(n, l, e);
      }
      i.memoizedState = e;
      var o = { value: e, getSnapshot: l };
      return i.queue = o, W0(B0.bind(null, n, o, t), [
        t
      ]), n.flags |= 2048, da(
        9,
        { destroy: void 0 },
        H0.bind(
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
        e = (n & ~(1 << 32 - Sl(n) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = ji++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = $g++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: df,
    useFormState: V0,
    useActionState: V0,
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
      return l.queue = e, l = hf.bind(
        null,
        st,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: ef,
    useCacheRefresh: function() {
      return ol().memoizedState = Pg.bind(
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
  }, yf = {
    readContext: tl,
    use: Ui,
    useCallback: ed,
    useContext: tl,
    useEffect: of,
    useImperativeHandle: ld,
    useInsertionEffect: I0,
    useLayoutEffect: P0,
    useMemo: nd,
    useReducer: Hi,
    useRef: J0,
    useState: function() {
      return Hi(re);
    },
    useDebugValue: ff,
    useDeferredValue: function(t, l) {
      var e = Gt();
      return ad(
        e,
        Ct.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Hi(re)[0], l = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : fu(t),
        l
      ];
    },
    useSyncExternalStore: N0,
    useId: od,
    useHostTransitionStatus: df,
    useFormState: K0,
    useActionState: K0,
    useOptimistic: function(t, l) {
      var e = Gt();
      return w0(e, Ct, t, l);
    },
    useMemoCache: ef,
    useCacheRefresh: fd
  };
  yf.useEffectEvent = F0;
  var yd = {
    readContext: tl,
    use: Ui,
    useCallback: ed,
    useContext: tl,
    useEffect: of,
    useImperativeHandle: ld,
    useInsertionEffect: I0,
    useLayoutEffect: P0,
    useMemo: nd,
    useReducer: af,
    useRef: J0,
    useState: function() {
      return af(re);
    },
    useDebugValue: ff,
    useDeferredValue: function(t, l) {
      var e = Gt();
      return Ct === null ? sf(e, t, l) : ad(
        e,
        Ct.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = af(re)[0], l = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : fu(t),
        l
      ];
    },
    useSyncExternalStore: N0,
    useId: od,
    useHostTransitionStatus: df,
    useFormState: k0,
    useActionState: k0,
    useOptimistic: function(t, l) {
      var e = Gt();
      return Ct !== null ? w0(e, Ct, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: ef,
    useCacheRefresh: fd
  };
  yd.useEffectEvent = F0;
  function mf(t, l, e, n) {
    l = t.memoizedState, e = e(n, l), e = e == null ? l : b({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var gf = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var n = zl(), i = Ue(n);
      i.payload = l, e != null && (i.callback = e), l = He(t, i, n), l !== null && (ml(l, t, n), uu(l, t, n));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var n = zl(), i = Ue(n);
      i.tag = 1, i.payload = l, e != null && (i.callback = e), l = He(t, i, n), l !== null && (ml(l, t, n), uu(l, t, n));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = zl(), n = Ue(e);
      n.tag = 2, l != null && (n.callback = l), l = He(t, n, e), l !== null && (ml(l, t, e), uu(l, t, e));
    }
  };
  function md(t, l, e, n, i, o, s) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, o, s) : l.prototype && l.prototype.isPureReactComponent ? !Fa(e, n) || !Fa(i, o) : !0;
  }
  function gd(t, l, e, n) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, n), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, n), l.state !== t && gf.enqueueReplaceState(l, l.state, null);
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
  function pd(t) {
    gi(t);
  }
  function vd(t) {
    console.error(t);
  }
  function Sd(t) {
    gi(t);
  }
  function wi(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function bd(t, l, e) {
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
  function pf(t, l, e) {
    return e = Ue(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      wi(t, l);
    }, e;
  }
  function Md(t) {
    return t = Ue(t), t.tag = 3, t;
  }
  function Ed(t, l, e, n) {
    var i = e.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var o = n.value;
      t.payload = function() {
        return i(o);
      }, t.callback = function() {
        bd(l, e, n);
      };
    }
    var s = e.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (t.callback = function() {
      bd(l, e, n), typeof i != "function" && (qe === null ? qe = /* @__PURE__ */ new Set([this]) : qe.add(this));
      var h = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: h !== null ? h : ""
      });
    });
  }
  function lp(t, l, e, n, i) {
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
            return Bl === null ? Fi() : e.alternate === null && Lt === 0 && (Lt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = i, n === zi ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([n]) : l.add(n), Xf(t, n, i)), !1;
          case 22:
            return e.flags |= 65536, n === zi ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([n]) : e.add(n)), Xf(t, n, i)), !1;
        }
        throw Error(f(435, e.tag));
      }
      return Xf(t, n, i), Fi(), !1;
    }
    if (vt)
      return l = El.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = i, n !== Ho && (t = Error(f(422), { cause: n }), tu(jl(t, e)))) : (n !== Ho && (l = Error(f(423), {
        cause: n
      }), tu(
        jl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, i &= -i, t.lanes |= i, n = jl(n, e), i = pf(
        t.stateNode,
        n,
        i
      ), Ko(t, i), Lt !== 4 && (Lt = 2)), !1;
    var o = Error(f(520), { cause: n });
    if (o = jl(o, e), Su === null ? Su = [o] : Su.push(o), Lt !== 4 && (Lt = 2), l === null) return !0;
    n = jl(n, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = i & -i, e.lanes |= t, t = pf(e.stateNode, n, t), Ko(e, t), !1;
        case 1:
          if (l = e.type, o = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (qe === null || !qe.has(o))))
            return e.flags |= 65536, i &= -i, e.lanes |= i, i = Md(i), Ed(
              i,
              t,
              e,
              n
            ), Ko(e, i), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var vf = Error(f(461)), Qt = !1;
  function ll(t, l, e, n) {
    l.child = t === null ? z0(l, null, e, n) : En(
      l,
      t.child,
      e,
      n
    );
  }
  function xd(t, l, e, n, i) {
    e = e.render;
    var o = l.ref;
    if ("ref" in n) {
      var s = {};
      for (var h in n)
        h !== "ref" && (s[h] = n[h]);
    } else s = n;
    return vn(l), n = Io(
      t,
      l,
      e,
      s,
      o,
      i
    ), h = Po(), t !== null && !Qt ? (tf(t, l, i), de(t, l, i)) : (vt && h && No(l), l.flags |= 1, ll(t, l, n, i), l.child);
  }
  function Td(t, l, e, n, i) {
    if (t === null) {
      var o = e.type;
      return typeof o == "function" && !Do(o) && o.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = o, Ad(
        t,
        l,
        o,
        n,
        i
      )) : (t = bi(
        e.type,
        null,
        n,
        l,
        l.mode,
        i
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (o = t.child, !zf(t, i)) {
      var s = o.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Fa, e(s, n) && t.ref === l.ref)
        return de(t, l, i);
    }
    return l.flags |= 1, t = ie(o, n), t.ref = l.ref, t.return = l, l.child = t;
  }
  function Ad(t, l, e, n, i) {
    if (t !== null) {
      var o = t.memoizedProps;
      if (Fa(o, n) && t.ref === l.ref)
        if (Qt = !1, l.pendingProps = n = o, zf(t, i))
          (t.flags & 131072) !== 0 && (Qt = !0);
        else
          return l.lanes = t.lanes, de(t, l, i);
    }
    return Sf(
      t,
      l,
      e,
      n,
      i
    );
  }
  function zd(t, l, e, n) {
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
        return _d(
          t,
          l,
          o,
          e,
          n
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ti(
          l,
          o !== null ? o.cachePool : null
        ), o !== null ? C0(l, o) : ko(), D0(l);
      else
        return n = l.lanes = 536870912, _d(
          t,
          l,
          o !== null ? o.baseLanes | e : e,
          e,
          n
        );
    } else
      o !== null ? (Ti(l, o.cachePool), C0(l, o), Le(), l.memoizedState = null) : (t !== null && Ti(l, null), ko(), Le());
    return ll(t, l, i, e), l.child;
  }
  function du(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function _d(t, l, e, n, i) {
    var o = Xo();
    return o = o === null ? null : { parent: Xt._currentValue, pool: o }, l.memoizedState = {
      baseLanes: e,
      cachePool: o
    }, t !== null && Ti(l, null), ko(), D0(l), t !== null && aa(t, l, n, !0), l.childLanes = i, null;
  }
  function Gi(t, l) {
    return l = Xi(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Od(t, l, e) {
    return En(l, t.child, null, e), t = Gi(l, l.pendingProps), t.flags |= 2, xl(l), l.memoizedState = null, t;
  }
  function ep(t, l, e) {
    var n = l.pendingProps, i = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (vt) {
        if (n.mode === "hidden")
          return t = Gi(l, n), l.lanes = 536870912, du(null, t);
        if (Wo(l), (t = Nt) ? (t = G1(
          t,
          Hl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ce !== null ? { id: Jl, overflow: Wl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = r0(t), e.return = l, l.child = e, Pt = l, Nt = null)) : t = null, t === null) throw Re(l);
        return l.lanes = 536870912, null;
      }
      return Gi(l, n);
    }
    var o = t.memoizedState;
    if (o !== null) {
      var s = o.dehydrated;
      if (Wo(l), i)
        if (l.flags & 256)
          l.flags &= -257, l = Od(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(f(558));
      else if (Qt || aa(t, l, e, !1), i = (e & t.childLanes) !== 0, Qt || i) {
        if (n = jt, n !== null && (s = vr(n, e), s !== 0 && s !== o.retryLane))
          throw o.retryLane = s, yn(t, s), ml(n, t, s), vf;
        Fi(), l = Od(
          t,
          l,
          e
        );
      } else
        t = o.treeContext, Nt = Ll(s.nextSibling), Pt = l, vt = !0, De = null, Hl = !1, t !== null && y0(l, t), l = Gi(l, n), l.flags |= 4096;
      return l;
    }
    return t = ie(t.child, {
      mode: n.mode,
      children: n.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function qi(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(f(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function Sf(t, l, e, n, i) {
    return vn(l), e = Io(
      t,
      l,
      e,
      n,
      void 0,
      i
    ), n = Po(), t !== null && !Qt ? (tf(t, l, i), de(t, l, i)) : (vt && n && No(l), l.flags |= 1, ll(t, l, e, i), l.child);
  }
  function Cd(t, l, e, n, i, o) {
    return vn(l), l.updateQueue = null, e = j0(
      l,
      n,
      e,
      i
    ), R0(t), n = Po(), t !== null && !Qt ? (tf(t, l, o), de(t, l, o)) : (vt && n && No(l), l.flags |= 1, ll(t, l, e, o), l.child);
  }
  function Dd(t, l, e, n, i) {
    if (vn(l), l.stateNode === null) {
      var o = ta, s = e.contextType;
      typeof s == "object" && s !== null && (o = tl(s)), o = new e(n, o), l.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, o.updater = gf, l.stateNode = o, o._reactInternals = l, o = l.stateNode, o.props = n, o.state = l.memoizedState, o.refs = {}, Qo(l), s = e.contextType, o.context = typeof s == "object" && s !== null ? tl(s) : ta, o.state = l.memoizedState, s = e.getDerivedStateFromProps, typeof s == "function" && (mf(
        l,
        e,
        s,
        n
      ), o.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (s = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), s !== o.state && gf.enqueueReplaceState(o, o.state, null), cu(l, n, o, i), iu(), o.state = l.memoizedState), typeof o.componentDidMount == "function" && (l.flags |= 4194308), n = !0;
    } else if (t === null) {
      o = l.stateNode;
      var h = l.memoizedProps, S = Tn(e, h);
      o.props = S;
      var O = o.context, H = e.contextType;
      s = ta, typeof H == "object" && H !== null && (s = tl(H));
      var L = e.getDerivedStateFromProps;
      H = typeof L == "function" || typeof o.getSnapshotBeforeUpdate == "function", h = l.pendingProps !== h, H || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (h || O !== s) && gd(
        l,
        o,
        n,
        s
      ), Ne = !1;
      var D = l.memoizedState;
      o.state = D, cu(l, n, o, i), iu(), O = l.memoizedState, h || D !== O || Ne ? (typeof L == "function" && (mf(
        l,
        e,
        L,
        n
      ), O = l.memoizedState), (S = Ne || md(
        l,
        e,
        S,
        n,
        D,
        O,
        s
      )) ? (H || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = n, l.memoizedState = O), o.props = n, o.state = O, o.context = s, n = S) : (typeof o.componentDidMount == "function" && (l.flags |= 4194308), n = !1);
    } else {
      o = l.stateNode, Vo(t, l), s = l.memoizedProps, H = Tn(e, s), o.props = H, L = l.pendingProps, D = o.context, O = e.contextType, S = ta, typeof O == "object" && O !== null && (S = tl(O)), h = e.getDerivedStateFromProps, (O = typeof h == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== L || D !== S) && gd(
        l,
        o,
        n,
        S
      ), Ne = !1, D = l.memoizedState, o.state = D, cu(l, n, o, i), iu();
      var R = l.memoizedState;
      s !== L || D !== R || Ne || t !== null && t.dependencies !== null && Ei(t.dependencies) ? (typeof h == "function" && (mf(
        l,
        e,
        h,
        n
      ), R = l.memoizedState), (H = Ne || md(
        l,
        e,
        H,
        n,
        D,
        R,
        S
      ) || t !== null && t.dependencies !== null && Ei(t.dependencies)) ? (O || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(n, R, S), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(
        n,
        R,
        S
      )), typeof o.componentDidUpdate == "function" && (l.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === t.memoizedProps && D === t.memoizedState || (l.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && D === t.memoizedState || (l.flags |= 1024), l.memoizedProps = n, l.memoizedState = R), o.props = n, o.state = R, o.context = S, n = H) : (typeof o.componentDidUpdate != "function" || s === t.memoizedProps && D === t.memoizedState || (l.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && D === t.memoizedState || (l.flags |= 1024), n = !1);
    }
    return o = n, qi(t, l), n = (l.flags & 128) !== 0, o || n ? (o = l.stateNode, e = n && typeof e.getDerivedStateFromError != "function" ? null : o.render(), l.flags |= 1, t !== null && n ? (l.child = En(
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
  function Rd(t, l, e, n) {
    return gn(), l.flags |= 256, ll(t, l, e, n), l.child;
  }
  var bf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Mf(t) {
    return { baseLanes: t, cachePool: b0() };
  }
  function Ef(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Al), t;
  }
  function jd(t, l, e) {
    var n = l.pendingProps, i = !1, o = (l.flags & 128) !== 0, s;
    if ((s = o) || (s = t !== null && t.memoizedState === null ? !1 : (wt.current & 2) !== 0), s && (i = !0, l.flags &= -129), s = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (vt) {
        if (i ? Be(l) : Le(), (t = Nt) ? (t = G1(
          t,
          Hl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ce !== null ? { id: Jl, overflow: Wl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = r0(t), e.return = l, l.child = e, Pt = l, Nt = null)) : t = null, t === null) throw Re(l);
        return as(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var h = n.children;
      return n = n.fallback, i ? (Le(), i = l.mode, h = Xi(
        { mode: "hidden", children: h },
        i
      ), n = mn(
        n,
        i,
        e,
        null
      ), h.return = l, n.return = l, h.sibling = n, l.child = h, n = l.child, n.memoizedState = Mf(e), n.childLanes = Ef(
        t,
        s,
        e
      ), l.memoizedState = bf, du(null, n)) : (Be(l), xf(l, h));
    }
    var S = t.memoizedState;
    if (S !== null && (h = S.dehydrated, h !== null)) {
      if (o)
        l.flags & 256 ? (Be(l), l.flags &= -257, l = Tf(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (Le(), l.child = t.child, l.flags |= 128, l = null) : (Le(), h = n.fallback, i = l.mode, n = Xi(
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
        ), n = l.child, n.memoizedState = Mf(e), n.childLanes = Ef(
          t,
          s,
          e
        ), l.memoizedState = bf, l = du(null, n));
      else if (Be(l), as(h)) {
        if (s = h.nextSibling && h.nextSibling.dataset, s) var O = s.dgst;
        s = O, n = Error(f(419)), n.stack = "", n.digest = s, tu({ value: n, source: null, stack: null }), l = Tf(
          t,
          l,
          e
        );
      } else if (Qt || aa(t, l, e, !1), s = (e & t.childLanes) !== 0, Qt || s) {
        if (s = jt, s !== null && (n = vr(s, e), n !== 0 && n !== S.retryLane))
          throw S.retryLane = n, yn(t, n), ml(s, t, n), vf;
        ns(h) || Fi(), l = Tf(
          t,
          l,
          e
        );
      } else
        ns(h) ? (l.flags |= 192, l.child = t.child, l = null) : (t = S.treeContext, Nt = Ll(
          h.nextSibling
        ), Pt = l, vt = !0, De = null, Hl = !1, t !== null && y0(l, t), l = xf(
          l,
          n.children
        ), l.flags |= 4096);
      return l;
    }
    return i ? (Le(), h = n.fallback, i = l.mode, S = t.child, O = S.sibling, n = ie(S, {
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
    ), h.flags |= 2), h.return = l, n.return = l, n.sibling = h, l.child = n, du(null, n), n = l.child, h = t.child.memoizedState, h === null ? h = Mf(e) : (i = h.cachePool, i !== null ? (S = Xt._currentValue, i = i.parent !== S ? { parent: S, pool: S } : i) : i = b0(), h = {
      baseLanes: h.baseLanes | e,
      cachePool: i
    }), n.memoizedState = h, n.childLanes = Ef(
      t,
      s,
      e
    ), l.memoizedState = bf, du(t.child, n)) : (Be(l), e = t.child, t = e.sibling, e = ie(e, {
      mode: "visible",
      children: n.children
    }), e.return = l, e.sibling = null, t !== null && (s = l.deletions, s === null ? (l.deletions = [t], l.flags |= 16) : s.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function xf(t, l) {
    return l = Xi(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function Xi(t, l) {
    return t = Ml(22, t, null, l), t.lanes = 0, t;
  }
  function Tf(t, l, e) {
    return En(l, t.child, null, e), t = xf(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Nd(t, l, e) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l), Yo(t.return, l, e);
  }
  function Af(t, l, e, n, i, o) {
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
  function Ud(t, l, e) {
    var n = l.pendingProps, i = n.revealOrder, o = n.tail;
    n = n.children;
    var s = wt.current, h = (s & 2) !== 0;
    if (h ? (s = s & 1 | 2, l.flags |= 128) : s &= 1, F(wt, s), ll(t, l, n, e), n = vt ? Pa : 0, !h && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Nd(t, e, l);
        else if (t.tag === 19)
          Nd(t, e, l);
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
          t = e.alternate, t !== null && Di(t) === null && (i = e), e = e.sibling;
        e = i, e === null ? (i = l.child, l.child = null) : (i = e.sibling, e.sibling = null), Af(
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
          if (t = i.alternate, t !== null && Di(t) === null) {
            l.child = i;
            break;
          }
          t = i.sibling, i.sibling = e, e = i, i = t;
        }
        Af(
          l,
          !0,
          e,
          null,
          o,
          n
        );
        break;
      case "together":
        Af(
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
    if (t !== null && (l.dependencies = t.dependencies), Ge |= l.lanes, (e & l.childLanes) === 0)
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
  function zf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Ei(t)));
  }
  function np(t, l, e) {
    switch (l.tag) {
      case 3:
        cl(l, l.stateNode.containerInfo), je(l, Xt, t.memoizedState.cache), gn();
        break;
      case 27:
      case 5:
        Ya(l);
        break;
      case 4:
        cl(l, l.stateNode.containerInfo);
        break;
      case 10:
        je(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, Wo(l), null;
        break;
      case 13:
        var n = l.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (Be(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? jd(t, l, e) : (Be(l), t = de(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        Be(l);
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
            return Ud(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (i = l.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), F(wt, wt.current), n) break;
        return null;
      case 22:
        return l.lanes = 0, zd(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        je(l, Xt, t.memoizedState.cache);
    }
    return de(t, l, e);
  }
  function Hd(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Qt = !0;
      else {
        if (!zf(t, e) && (l.flags & 128) === 0)
          return Qt = !1, np(
            t,
            l,
            e
          );
        Qt = (t.flags & 131072) !== 0;
      }
    else
      Qt = !1, vt && (l.flags & 1048576) !== 0 && h0(l, Pa, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var n = l.pendingProps;
          if (t = bn(l.elementType), l.type = t, typeof t == "function")
            Do(t) ? (n = Tn(t, n), l.tag = 1, l = Dd(
              null,
              l,
              t,
              n,
              e
            )) : (l.tag = 0, l = Sf(
              null,
              l,
              t,
              n,
              e
            ));
          else {
            if (t != null) {
              var i = t.$$typeof;
              if (i === C) {
                l.tag = 11, l = xd(
                  null,
                  l,
                  t,
                  n,
                  e
                );
                break t;
              } else if (i === Y) {
                l.tag = 14, l = Td(
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
        return Sf(
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
        ), Dd(
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
          i = o.element, Vo(t, l), cu(l, n, null, e);
          var s = l.memoizedState;
          if (n = s.cache, je(l, Xt, n), n !== o.cache && wo(
            l,
            [Xt],
            e,
            !0
          ), iu(), n = s.element, o.isDehydrated)
            if (o = {
              element: n,
              isDehydrated: !1,
              cache: s.cache
            }, l.updateQueue.baseState = o, l.memoizedState = o, l.flags & 256) {
              l = Rd(
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
              ), tu(i), l = Rd(
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
              for (Nt = Ll(t.firstChild), Pt = l, vt = !0, De = null, Hl = !0, e = z0(
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
        return qi(t, l), t === null ? (e = K1(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : vt || (e = l.type, t = l.pendingProps, n = ac(
          dt.current
        ).createElement(e), n[It] = l, n[fl] = t, el(n, e, t), Jt(n), l.stateNode = n) : l.memoizedState = K1(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ya(l), t === null && vt && (n = l.stateNode = Z1(
          l.type,
          l.pendingProps,
          dt.current
        ), Pt = l, Hl = !0, i = Nt, Ve(l.type) ? (us = i, Nt = Ll(n.firstChild)) : Nt = i), ll(
          t,
          l,
          l.pendingProps.children,
          e
        ), qi(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && vt && ((i = n = Nt) && (n = Np(
          n,
          l.type,
          l.pendingProps,
          Hl
        ), n !== null ? (l.stateNode = n, Pt = l, Nt = Ll(n.firstChild), Hl = !1, i = !0) : i = !1), i || Re(l)), Ya(l), i = l.type, o = l.pendingProps, s = t !== null ? t.memoizedProps : null, n = o.children, ts(i, o) ? n = null : s !== null && ts(i, s) && (l.flags |= 32), l.memoizedState !== null && (i = Io(
          t,
          l,
          kg,
          null,
          null,
          e
        ), _u._currentValue = i), qi(t, l), ll(t, l, n, e), l.child;
      case 6:
        return t === null && vt && ((t = e = Nt) && (e = Up(
          e,
          l.pendingProps,
          Hl
        ), e !== null ? (l.stateNode = e, Pt = l, Nt = null, t = !0) : t = !1), t || Re(l)), null;
      case 13:
        return jd(t, l, e);
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
        return xd(
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
        return n = l.pendingProps, je(l, l.type, n.value), ll(t, l, n.children, e), l.child;
      case 9:
        return i = l.type._context, n = l.pendingProps.children, vn(l), i = tl(i), n = n(i), l.flags |= 1, ll(t, l, n, e), l.child;
      case 14:
        return Td(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return Ad(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Ud(t, l, e);
      case 31:
        return ep(t, l, e);
      case 22:
        return zd(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return vn(l), n = tl(Xt), t === null ? (i = Xo(), i === null && (i = jt, o = Go(), i.pooledCache = o, o.refCount++, o !== null && (i.pooledCacheLanes |= e), i = o), l.memoizedState = { parent: n, cache: i }, Qo(l), je(l, Xt, i)) : ((t.lanes & e) !== 0 && (Vo(t, l), cu(l, null, null, e), iu()), i = t.memoizedState, o = l.memoizedState, i.parent !== n ? (i = { parent: n, cache: n }, l.memoizedState = i, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = i), je(l, Xt, n)) : (n = o.cache, je(l, Xt, n), n !== i.cache && wo(
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
  function _f(t, l, e, n, i) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (i & 335544128) === i)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (o1()) t.flags |= 8192;
        else
          throw Mn = zi, Zo;
    } else t.flags &= -16777217;
  }
  function Bd(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !F1(l))
      if (o1()) t.flags |= 8192;
      else
        throw Mn = zi, Zo;
  }
  function Zi(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? mr() : 536870912, t.lanes |= l, ga |= l);
  }
  function hu(t, l) {
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
  function ap(t, l, e) {
    var n = l.pendingProps;
    switch (Uo(l), l.tag) {
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
        return e = l.stateNode, n = null, t !== null && (n = t.memoizedState.cache), l.memoizedState.cache !== n && (l.flags |= 2048), fe(Xt), Yt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (na(l) ? he(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Bo())), Ut(l), null;
      case 26:
        var i = l.type, o = l.memoizedState;
        return t === null ? (he(l), o !== null ? (Ut(l), Bd(l, o)) : (Ut(l), _f(
          l,
          i,
          null,
          n,
          e
        ))) : o ? o !== t.memoizedState ? (he(l), Ut(l), Bd(l, o)) : (Ut(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== n && he(l), Ut(l), _f(
          l,
          i,
          t,
          n,
          e
        )), null;
      case 27:
        if (ti(l), e = dt.current, i = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== n && he(l);
        else {
          if (!n) {
            if (l.stateNode === null)
              throw Error(f(166));
            return Ut(l), null;
          }
          t = tt.current, na(l) ? m0(l) : (t = Z1(i, n, e), l.stateNode = t, he(l));
        }
        return Ut(l), null;
      case 5:
        if (ti(l), i = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== n && he(l);
        else {
          if (!n) {
            if (l.stateNode === null)
              throw Error(f(166));
            return Ut(l), null;
          }
          if (o = tt.current, na(l))
            m0(l);
          else {
            var s = ac(
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
        return Ut(l), _f(
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
            t[It] = l, t = !!(t.nodeValue === e || n !== null && n.suppressHydrationWarning === !0 || j1(t.nodeValue, e)), t || Re(l, !0);
          } else
            t = ac(t).createTextNode(
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
            e = Bo(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
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
            i = Bo(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), i = !0;
          if (!i)
            return l.flags & 256 ? (xl(l), l) : (xl(l), null);
        }
        return xl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = n !== null, t = t !== null && t.memoizedState !== null, e && (n = l.child, i = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (i = n.alternate.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), Zi(l, l.updateQueue), Ut(l), null);
      case 4:
        return Yt(), t === null && Jf(l.stateNode.containerInfo), Ut(l), null;
      case 10:
        return fe(l.type), Ut(l), null;
      case 19:
        if (w(wt), n = l.memoizedState, n === null) return Ut(l), null;
        if (i = (l.flags & 128) !== 0, o = n.rendering, o === null)
          if (i) hu(n, !1);
          else {
            if (Lt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (o = Di(t), o !== null) {
                  for (l.flags |= 128, hu(n, !1), t = o.updateQueue, l.updateQueue = t, Zi(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    s0(e, t), e = e.sibling;
                  return F(
                    wt,
                    wt.current & 1 | 2
                  ), vt && ce(l, n.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            n.tail !== null && pl() > ki && (l.flags |= 128, i = !0, hu(n, !1), l.lanes = 4194304);
          }
        else {
          if (!i)
            if (t = Di(o), t !== null) {
              if (l.flags |= 128, i = !0, t = t.updateQueue, l.updateQueue = t, Zi(l, t), hu(n, !0), n.tail === null && n.tailMode === "hidden" && !o.alternate && !vt)
                return Ut(l), null;
            } else
              2 * pl() - n.renderingStartTime > ki && e !== 536870912 && (l.flags |= 128, i = !0, hu(n, !1), l.lanes = 4194304);
          n.isBackwards ? (o.sibling = l.child, l.child = o) : (t = n.last, t !== null ? t.sibling = o : l.child = o, n.last = o);
        }
        return n.tail !== null ? (t = n.tail, n.rendering = t, n.tail = t.sibling, n.renderingStartTime = pl(), t.sibling = null, e = wt.current, F(
          wt,
          i ? e & 1 | 2 : e & 1
        ), vt && ce(l, n.treeForkCount), t) : (Ut(l), null);
      case 22:
      case 23:
        return xl(l), Jo(), n = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (l.flags |= 8192) : n && (l.flags |= 8192), n ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Ut(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Ut(l), e = l.updateQueue, e !== null && Zi(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), n = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (n = l.memoizedState.cachePool.pool), n !== e && (l.flags |= 2048), t !== null && w(Sn), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), fe(Xt), Ut(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(f(156, l.tag));
  }
  function up(t, l) {
    switch (Uo(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return fe(Xt), Yt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return ti(l), null;
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
        return w(wt), null;
      case 4:
        return Yt(), null;
      case 10:
        return fe(l.type), null;
      case 22:
      case 23:
        return xl(l), Jo(), t !== null && w(Sn), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return fe(Xt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ld(t, l) {
    switch (Uo(l), l.tag) {
      case 3:
        fe(Xt), Yt();
        break;
      case 26:
      case 27:
      case 5:
        ti(l);
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
        w(wt);
        break;
      case 10:
        fe(l.type);
        break;
      case 22:
      case 23:
        xl(l), Jo(), t !== null && w(Sn);
        break;
      case 24:
        fe(Xt);
    }
  }
  function yu(t, l) {
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
  function Ye(t, l, e) {
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
  function Yd(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        O0(l, e);
      } catch (n) {
        Ot(t, t.return, n);
      }
    }
  }
  function wd(t, l, e) {
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
  function mu(t, l) {
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
  function Gd(t) {
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
  function Of(t, l, e) {
    try {
      var n = t.stateNode;
      _p(n, t.type, e, l), n[fl] = l;
    } catch (i) {
      Ot(t, t.return, i);
    }
  }
  function qd(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ve(t.type) || t.tag === 4;
  }
  function Cf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || qd(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ve(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Df(t, l, e) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = ae));
    else if (n !== 4 && (n === 27 && Ve(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (Df(t, l, e), t = t.sibling; t !== null; )
        Df(t, l, e), t = t.sibling;
  }
  function Qi(t, l, e) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (n !== 4 && (n === 27 && Ve(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (Qi(t, l, e), t = t.sibling; t !== null; )
        Qi(t, l, e), t = t.sibling;
  }
  function Xd(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var n = t.type, i = l.attributes; i.length; )
        l.removeAttributeNode(i[0]);
      el(l, n, e), l[It] = t, l[fl] = e;
    } catch (o) {
      Ot(t, t.return, o);
    }
  }
  var ye = !1, Vt = !1, Rf = !1, Zd = typeof WeakSet == "function" ? WeakSet : Set, Wt = null;
  function ip(t, l) {
    if (t = t.containerInfo, If = rc, t = l0(t), xo(t)) {
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
            var s = 0, h = -1, S = -1, O = 0, H = 0, L = t, D = null;
            l: for (; ; ) {
              for (var R; L !== e || i !== 0 && L.nodeType !== 3 || (h = s + i), L !== o || n !== 0 && L.nodeType !== 3 || (S = s + n), L.nodeType === 3 && (s += L.nodeValue.length), (R = L.firstChild) !== null; )
                D = L, L = R;
              for (; ; ) {
                if (L === t) break l;
                if (D === e && ++O === i && (h = s), D === o && ++H === n && (S = s), (R = L.nextSibling) !== null) break;
                L = D, D = L.parentNode;
              }
              L = R;
            }
            e = h === -1 || S === -1 ? null : { start: h, end: S };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Pf = { focusedElem: t, selectionRange: e }, rc = !1, Wt = l; Wt !== null; )
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
                  es(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      es(t);
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
  function Qd(t, l, e) {
    var n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ge(t, e), n & 4 && yu(5, e);
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
        n & 64 && Yd(e), n & 512 && mu(e, e.return);
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
            O0(t, l);
          } catch (s) {
            Ot(e, e.return, s);
          }
        }
        break;
      case 27:
        l === null && n & 4 && Xd(e);
      case 26:
      case 5:
        ge(t, e), l === null && n & 4 && Gd(e), n & 512 && mu(e, e.return);
        break;
      case 12:
        ge(t, e);
        break;
      case 31:
        ge(t, e), n & 4 && $d(t, e);
        break;
      case 13:
        ge(t, e), n & 4 && kd(t, e), n & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = mp.bind(
          null,
          e
        ), Hp(t, e))));
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
  function Vd(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Vd(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && uo(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ht = null, rl = !1;
  function me(t, l, e) {
    for (e = e.child; e !== null; )
      Kd(t, l, e), e = e.sibling;
  }
  function Kd(t, l, e) {
    if (vl && typeof vl.onCommitFiberUnmount == "function")
      try {
        vl.onCommitFiberUnmount(wa, e);
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
        Ve(e.type) && (Ht = e.stateNode, rl = !1), me(
          t,
          l,
          e
        ), Tu(e.stateNode), Ht = n, rl = i;
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
        Ht !== null && (rl ? (t = Ht, Y1(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Ta(t)) : Y1(Ht, e.stateNode));
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
        Ye(2, e, l), Vt || Ye(4, e, l), me(
          t,
          l,
          e
        );
        break;
      case 1:
        Vt || (Fl(e, l), n = e.stateNode, typeof n.componentWillUnmount == "function" && wd(
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
  function $d(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Ta(t);
      } catch (e) {
        Ot(l, l.return, e);
      }
    }
  }
  function kd(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Ta(t);
      } catch (e) {
        Ot(l, l.return, e);
      }
  }
  function cp(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new Zd()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Zd()), l;
      default:
        throw Error(f(435, t.tag));
    }
  }
  function Vi(t, l) {
    var e = cp(t);
    l.forEach(function(n) {
      if (!e.has(n)) {
        e.add(n);
        var i = gp.bind(null, t, n);
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
              if (Ve(h.type)) {
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
        Kd(o, s, i), Ht = null, rl = !1, o = i.alternate, o !== null && (o.return = null), i.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        Jd(l, t), l = l.sibling;
  }
  var Zl = null;
  function Jd(t, l) {
    var e = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        dl(l, t), hl(t), n & 4 && (Ye(3, t, t.return), yu(3, t), Ye(5, t, t.return));
        break;
      case 1:
        dl(l, t), hl(t), n & 512 && (Vt || e === null || Fl(e, e.return)), n & 64 && ye && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? n : e.concat(n))));
        break;
      case 26:
        var i = Zl;
        if (dl(l, t), hl(t), n & 512 && (Vt || e === null || Fl(e, e.return)), n & 4) {
          var o = e !== null ? e.memoizedState : null;
          if (n = t.memoizedState, e === null)
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  n = t.type, e = t.memoizedProps, i = i.ownerDocument || i;
                  l: switch (n) {
                    case "title":
                      o = i.getElementsByTagName("title")[0], (!o || o[Xa] || o[It] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = i.createElement(n), i.head.insertBefore(
                        o,
                        i.querySelector("head > title")
                      )), el(o, n, e), o[It] = t, Jt(o), n = o;
                      break t;
                    case "link":
                      var s = J1(
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
                      if (s = J1(
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
                W1(
                  i,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = k1(
                i,
                n,
                t.memoizedProps
              );
          else
            o !== n ? (o === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : o.count--, n === null ? W1(
              i,
              t.type,
              t.stateNode
            ) : k1(
              i,
              n,
              t.memoizedProps
            )) : n === null && t.stateNode !== null && Of(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        dl(l, t), hl(t), n & 512 && (Vt || e === null || Fl(e, e.return)), e !== null && n & 4 && Of(
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
        n & 4 && t.stateNode != null && (i = t.memoizedProps, Of(
          t,
          i,
          e !== null ? e.memoizedProps : i
        )), n & 1024 && (Rf = !0);
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
        if (cc = null, i = Zl, Zl = uc(l.containerInfo), dl(l, t), Zl = i, hl(t), n & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Ta(l.containerInfo);
          } catch (P) {
            Ot(t, t.return, P);
          }
        Rf && (Rf = !1, Wd(t));
        break;
      case 4:
        n = Zl, Zl = uc(
          t.stateNode.containerInfo
        ), dl(l, t), hl(t), Zl = n;
        break;
      case 12:
        dl(l, t), hl(t);
        break;
      case 31:
        dl(l, t), hl(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, Vi(t, n)));
        break;
      case 13:
        dl(l, t), hl(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && ($i = pl()), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, Vi(t, n)));
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
                    var L = S.memoizedProps.style, D = L != null && L.hasOwnProperty("display") ? L.display : null;
                    h.style.display = D == null || typeof D == "boolean" ? "" : ("" + D).trim();
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
                  var R = S.stateNode;
                  i ? w1(R, !0) : w1(S.stateNode, !1);
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
        n & 4 && (n = t.updateQueue, n !== null && (e = n.retryQueue, e !== null && (n.retryQueue = null, Vi(t, e))));
        break;
      case 19:
        dl(l, t), hl(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, Vi(t, n)));
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
          if (qd(n)) {
            e = n;
            break;
          }
          n = n.return;
        }
        if (e == null) throw Error(f(160));
        switch (e.tag) {
          case 27:
            var i = e.stateNode, o = Cf(t);
            Qi(t, o, i);
            break;
          case 5:
            var s = e.stateNode;
            e.flags & 32 && ($n(s, ""), e.flags &= -33);
            var h = Cf(t);
            Qi(t, h, s);
            break;
          case 3:
          case 4:
            var S = e.stateNode.containerInfo, O = Cf(t);
            Df(
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
  function Wd(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        Wd(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function ge(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Qd(t, l.alternate, l), l = l.sibling;
  }
  function An(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ye(4, l, l.return), An(l);
          break;
        case 1:
          Fl(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && wd(
            l,
            l.return,
            e
          ), An(l);
          break;
        case 27:
          Tu(l.stateNode);
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
          ), yu(4, o);
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
                  _0(S[i], h);
            } catch (O) {
              Ot(n, n.return, O);
            }
          }
          e && s & 64 && Yd(o), mu(o, o.return);
          break;
        case 27:
          Xd(o);
        case 26:
        case 5:
          pe(
            i,
            o,
            e
          ), e && n === null && s & 4 && Gd(o), mu(o, o.return);
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
          ), e && s & 4 && $d(i, o);
          break;
        case 13:
          pe(
            i,
            o,
            e
          ), e && s & 4 && kd(i, o);
          break;
        case 22:
          o.memoizedState === null && pe(
            i,
            o,
            e
          ), mu(o, o.return);
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
  function jf(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && lu(e));
  }
  function Nf(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && lu(t));
  }
  function Ql(t, l, e, n) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Fd(
          t,
          l,
          e,
          n
        ), l = l.sibling;
  }
  function Fd(t, l, e, n) {
    var i = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Ql(
          t,
          l,
          e,
          n
        ), i & 2048 && yu(9, l);
        break;
      case 1:
        Ql(
          t,
          l,
          e,
          n
        );
        break;
      case 3:
        Ql(
          t,
          l,
          e,
          n
        ), i & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && lu(t)));
        break;
      case 12:
        if (i & 2048) {
          Ql(
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
          Ql(
            t,
            l,
            e,
            n
          );
        break;
      case 31:
        Ql(
          t,
          l,
          e,
          n
        );
        break;
      case 13:
        Ql(
          t,
          l,
          e,
          n
        );
        break;
      case 23:
        break;
      case 22:
        o = l.stateNode, s = l.alternate, l.memoizedState !== null ? o._visibility & 2 ? Ql(
          t,
          l,
          e,
          n
        ) : gu(t, l) : o._visibility & 2 ? Ql(
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
        )), i & 2048 && jf(s, l);
        break;
      case 24:
        Ql(
          t,
          l,
          e,
          n
        ), i & 2048 && Nf(l.alternate, l);
        break;
      default:
        Ql(
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
          ), yu(8, s);
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
          ) : gu(
            o,
            s
          ) : (H._visibility |= 2, ha(
            o,
            s,
            h,
            S,
            i
          )), i && O & 2048 && jf(
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
          ), i && O & 2048 && Nf(s.alternate, s);
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
  function gu(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, n = l, i = n.flags;
        switch (n.tag) {
          case 22:
            gu(e, n), i & 2048 && jf(
              n.alternate,
              n
            );
            break;
          case 24:
            gu(e, n), i & 2048 && Nf(n.alternate, n);
            break;
          default:
            gu(e, n);
        }
        l = l.sibling;
      }
  }
  var pu = 8192;
  function ya(t, l, e) {
    if (t.subtreeFlags & pu)
      for (t = t.child; t !== null; )
        Id(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function Id(t, l, e) {
    switch (t.tag) {
      case 26:
        ya(
          t,
          l,
          e
        ), t.flags & pu && t.memoizedState !== null && $p(
          e,
          Zl,
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
        var n = Zl;
        Zl = uc(t.stateNode.containerInfo), ya(
          t,
          l,
          e
        ), Zl = n;
        break;
      case 22:
        t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = pu, pu = 16777216, ya(
          t,
          l,
          e
        ), pu = n) : ya(
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
  function Pd(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function vu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var n = l[e];
          Wt = n, l1(
            n,
            t
          );
        }
      Pd(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        t1(t), t = t.sibling;
  }
  function t1(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        vu(t), t.flags & 2048 && Ye(9, t, t.return);
        break;
      case 3:
        vu(t);
        break;
      case 12:
        vu(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, Ki(t)) : vu(t);
        break;
      default:
        vu(t);
    }
  }
  function Ki(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var n = l[e];
          Wt = n, l1(
            n,
            t
          );
        }
      Pd(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          Ye(8, l, l.return), Ki(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, Ki(l));
          break;
        default:
          Ki(l);
      }
      t = t.sibling;
    }
  }
  function l1(t, l) {
    for (; Wt !== null; ) {
      var e = Wt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Ye(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var n = e.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          lu(e.memoizedState.cache);
      }
      if (n = e.child, n !== null) n.return = e, Wt = n;
      else
        t: for (e = t; Wt !== null; ) {
          n = Wt;
          var i = n.sibling, o = n.return;
          if (Vd(n), n === e) {
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
  var op = {
    getCacheForType: function(t) {
      var l = tl(Xt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return tl(Xt).controller.signal;
    }
  }, fp = typeof WeakMap == "function" ? WeakMap : Map, At = 0, jt = null, ht = null, mt = 0, _t = 0, Tl = null, we = !1, ma = !1, Uf = !1, ve = 0, Lt = 0, Ge = 0, zn = 0, Hf = 0, Al = 0, ga = 0, Su = null, yl = null, Bf = !1, $i = 0, e1 = 0, ki = 1 / 0, Ji = null, qe = null, $t = 0, Xe = null, pa = null, Se = 0, Lf = 0, Yf = null, n1 = null, bu = 0, wf = null;
  function zl() {
    return (At & 2) !== 0 && mt !== 0 ? mt & -mt : U.T !== null ? Vf() : Sr();
  }
  function a1() {
    if (Al === 0)
      if ((mt & 536870912) === 0 || vt) {
        var t = ni;
        ni <<= 1, (ni & 3932160) === 0 && (ni = 262144), Al = t;
      } else Al = 536870912;
    return t = El.current, t !== null && (t.flags |= 32), Al;
  }
  function ml(t, l, e) {
    (t === jt && (_t === 2 || _t === 9) || t.cancelPendingCommit !== null) && (va(t, 0), Ze(
      t,
      mt,
      Al,
      !1
    )), qa(t, e), ((At & 2) === 0 || t !== jt) && (t === jt && ((At & 2) === 0 && (zn |= e), Lt === 4 && Ze(
      t,
      mt,
      Al,
      !1
    )), Il(t));
  }
  function u1(t, l, e) {
    if ((At & 6) !== 0) throw Error(f(327));
    var n = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || Ga(t, l), i = n ? dp(t, l) : qf(t, l, !0), o = n;
    do {
      if (i === 0) {
        ma && !n && Ze(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, o && !sp(e)) {
          i = qf(t, l, !1), o = !1;
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
              i = Su;
              var S = h.current.memoizedState.isDehydrated;
              if (S && (va(h, s).flags |= 256), s = qf(
                h,
                s,
                !1
              ), s !== 2) {
                if (Uf && !S) {
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
          va(t, 0), Ze(t, l, 0, !0);
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
              Ze(
                n,
                l,
                Al,
                !we
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
          if ((l & 62914560) === l && (i = $i + 300 - pl(), 10 < i)) {
            if (Ze(
              n,
              l,
              Al,
              !we
            ), ui(n, 0, !0) !== 0) break t;
            Se = l, n.timeoutHandle = B1(
              i1.bind(
                null,
                n,
                e,
                yl,
                Ji,
                Bf,
                l,
                Al,
                zn,
                ga,
                we,
                o,
                "Throttled",
                -0,
                0
              ),
              i
            );
            break t;
          }
          i1(
            n,
            e,
            yl,
            Ji,
            Bf,
            l,
            Al,
            zn,
            ga,
            we,
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
  function i1(t, l, e, n, i, o, s, h, S, O, H, L, D, R) {
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
      }, Id(
        l,
        o,
        L
      );
      var P = (o & 62914560) === o ? $i - pl() : (o & 4194048) === o ? e1 - pl() : 0;
      if (P = kp(
        L,
        P
      ), P !== null) {
        Se = o, t.cancelPendingCommit = P(
          y1.bind(
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
            D,
            R
          )
        ), Ze(t, o, s, !O);
        return;
      }
    }
    y1(
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
  function sp(t) {
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
  function Ze(t, l, e, n) {
    l &= ~Hf, l &= ~zn, t.suspendedLanes |= l, t.pingedLanes &= ~l, n && (t.warmLanes |= l), n = t.expirationTimes;
    for (var i = l; 0 < i; ) {
      var o = 31 - Sl(i), s = 1 << o;
      n[o] = -1, i &= ~s;
    }
    e !== 0 && gr(t, e, l);
  }
  function Wi() {
    return (At & 6) === 0 ? (Mu(0), !1) : !0;
  }
  function Gf() {
    if (ht !== null) {
      if (_t === 0)
        var t = ht.return;
      else
        t = ht, oe = pn = null, lf(t), oa = null, nu = 0, t = ht;
      for (; t !== null; )
        Ld(t.alternate, t), t = t.return;
      ht = null;
    }
  }
  function va(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, Dp(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), Se = 0, Gf(), jt = t, ht = e = ie(t.current, null), mt = l, _t = 0, Tl = null, we = !1, ma = Ga(t, l), Uf = !1, ga = Al = Hf = zn = Ge = Lt = 0, yl = Su = null, Bf = !1, (l & 8) !== 0 && (l |= l & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= l; 0 < n; ) {
        var i = 31 - Sl(n), o = 1 << i;
        l |= t[i], n &= ~o;
      }
    return ve = l, pi(), e;
  }
  function c1(t, l) {
    st = null, U.H = ru, l === ca || l === Ai ? (l = x0(), _t = 3) : l === Zo ? (l = x0(), _t = 4) : _t = l === vf ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Tl = l, ht === null && (Lt = 1, wi(
      t,
      jl(l, t.current)
    ));
  }
  function o1() {
    var t = El.current;
    return t === null ? !0 : (mt & 4194048) === mt ? Bl === null : (mt & 62914560) === mt || (mt & 536870912) !== 0 ? t === Bl : !1;
  }
  function f1() {
    var t = U.H;
    return U.H = ru, t === null ? ru : t;
  }
  function s1() {
    var t = U.A;
    return U.A = op, t;
  }
  function Fi() {
    Lt = 4, we || (mt & 4194048) !== mt && El.current !== null || (ma = !0), (Ge & 134217727) === 0 && (zn & 134217727) === 0 || jt === null || Ze(
      jt,
      mt,
      Al,
      !1
    );
  }
  function qf(t, l, e) {
    var n = At;
    At |= 2;
    var i = f1(), o = s1();
    (jt !== t || mt !== l) && (Ji = null, va(t, l)), l = !1;
    var s = Lt;
    t: do
      try {
        if (_t !== 0 && ht !== null) {
          var h = ht, S = Tl;
          switch (_t) {
            case 8:
              Gf(), s = 6;
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
        rp(), s = Lt;
        break;
      } catch (H) {
        c1(t, H);
      }
    while (!0);
    return l && t.shellSuspendCounter++, oe = pn = null, At = n, U.H = i, U.A = o, ht === null && (jt = null, mt = 0, pi()), s;
  }
  function rp() {
    for (; ht !== null; ) r1(ht);
  }
  function dp(t, l) {
    var e = At;
    At |= 2;
    var n = f1(), i = s1();
    jt !== t || mt !== l ? (Ji = null, ki = pl() + 500, va(t, l)) : ma = Ga(
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
              if (M0(o)) {
                _t = 0, Tl = null, d1(l);
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
              M0(o) ? (_t = 0, Tl = null, d1(l)) : (_t = 0, Tl = null, Sa(t, l, o, 7));
              break;
            case 5:
              var s = null;
              switch (ht.tag) {
                case 26:
                  s = ht.memoizedState;
                case 5:
                case 27:
                  var h = ht;
                  if (s ? F1(s) : h.stateNode.complete) {
                    _t = 0, Tl = null;
                    var S = h.sibling;
                    if (S !== null) ht = S;
                    else {
                      var O = h.return;
                      O !== null ? (ht = O, Ii(O)) : ht = null;
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
              Gf(), Lt = 6;
              break t;
            default:
              throw Error(f(462));
          }
        }
        hp();
        break;
      } catch (H) {
        c1(t, H);
      }
    while (!0);
    return oe = pn = null, U.H = n, U.A = i, At = e, ht !== null ? 0 : (jt = null, mt = 0, pi(), Lt);
  }
  function hp() {
    for (; ht !== null && !Bm(); )
      r1(ht);
  }
  function r1(t) {
    var l = Hd(t.alternate, t, ve);
    t.memoizedProps = t.pendingProps, l === null ? Ii(t) : ht = l;
  }
  function d1(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Cd(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          mt
        );
        break;
      case 11:
        l = Cd(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          mt
        );
        break;
      case 5:
        lf(l);
      default:
        Ld(e, l), l = ht = s0(l, ve), l = Hd(e, l, ve);
    }
    t.memoizedProps = t.pendingProps, l === null ? Ii(t) : ht = l;
  }
  function Sa(t, l, e, n) {
    oe = pn = null, lf(l), oa = null, nu = 0;
    var i = l.return;
    try {
      if (lp(
        t,
        i,
        l,
        e,
        mt
      )) {
        Lt = 1, wi(
          t,
          jl(e, t.current)
        ), ht = null;
        return;
      }
    } catch (o) {
      if (i !== null) throw ht = i, o;
      Lt = 1, wi(
        t,
        jl(e, t.current)
      ), ht = null;
      return;
    }
    l.flags & 32768 ? (vt || n === 1 ? t = !0 : ma || (mt & 536870912) !== 0 ? t = !1 : (we = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = El.current, n !== null && n.tag === 13 && (n.flags |= 16384))), h1(l, t)) : Ii(l);
  }
  function Ii(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        h1(
          l,
          we
        );
        return;
      }
      t = l.return;
      var e = ap(
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
  function h1(t, l) {
    do {
      var e = up(t.alternate, t);
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
  function y1(t, l, e, n, i, o, s, h, S) {
    t.cancelPendingCommit = null;
    do
      Pi();
    while ($t !== 0);
    if ((At & 6) !== 0) throw Error(f(327));
    if (l !== null) {
      if (l === t.current) throw Error(f(177));
      if (o = l.lanes | l.childLanes, o |= Oo, Km(
        t,
        e,
        o,
        s,
        h,
        S
      ), t === jt && (ht = jt = null, mt = 0), pa = l, Xe = t, Se = e, Lf = o, Yf = i, n1 = n, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, pp(li, function() {
        return S1(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), n = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || n) {
        n = U.T, U.T = null, i = J.p, J.p = 2, s = At, At |= 4;
        try {
          ip(t, l, e);
        } finally {
          At = s, J.p = i, U.T = n;
        }
      }
      $t = 1, m1(), g1(), p1();
    }
  }
  function m1() {
    if ($t === 1) {
      $t = 0;
      var t = Xe, l = pa, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = U.T, U.T = null;
        var n = J.p;
        J.p = 2;
        var i = At;
        At |= 4;
        try {
          Jd(l, t);
          var o = Pf, s = l0(t.containerInfo), h = o.focusedElem, S = o.selectionRange;
          if (s !== h && h && h.ownerDocument && t0(
            h.ownerDocument.documentElement,
            h
          )) {
            if (S !== null && xo(h)) {
              var O = S.start, H = S.end;
              if (H === void 0 && (H = O), "selectionStart" in h)
                h.selectionStart = O, h.selectionEnd = Math.min(
                  H,
                  h.value.length
                );
              else {
                var L = h.ownerDocument || document, D = L && L.defaultView || window;
                if (D.getSelection) {
                  var R = D.getSelection(), P = h.textContent.length, ut = Math.min(S.start, P), Rt = S.end === void 0 ? ut : Math.min(S.end, P);
                  !R.extend && ut > Rt && (s = Rt, Rt = ut, ut = s);
                  var A = Pr(
                    h,
                    ut
                  ), E = Pr(
                    h,
                    Rt
                  );
                  if (A && E && (R.rangeCount !== 1 || R.anchorNode !== A.node || R.anchorOffset !== A.offset || R.focusNode !== E.node || R.focusOffset !== E.offset)) {
                    var _ = L.createRange();
                    _.setStart(A.node, A.offset), R.removeAllRanges(), ut > Rt ? (R.addRange(_), R.extend(E.node, E.offset)) : (_.setEnd(E.node, E.offset), R.addRange(_));
                  }
                }
              }
            }
            for (L = [], R = h; R = R.parentNode; )
              R.nodeType === 1 && L.push({
                element: R,
                left: R.scrollLeft,
                top: R.scrollTop
              });
            for (typeof h.focus == "function" && h.focus(), h = 0; h < L.length; h++) {
              var B = L[h];
              B.element.scrollLeft = B.left, B.element.scrollTop = B.top;
            }
          }
          rc = !!If, Pf = If = null;
        } finally {
          At = i, J.p = n, U.T = e;
        }
      }
      t.current = l, $t = 2;
    }
  }
  function g1() {
    if ($t === 2) {
      $t = 0;
      var t = Xe, l = pa, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = U.T, U.T = null;
        var n = J.p;
        J.p = 2;
        var i = At;
        At |= 4;
        try {
          Qd(t, l.alternate, l);
        } finally {
          At = i, J.p = n, U.T = e;
        }
      }
      $t = 3;
    }
  }
  function p1() {
    if ($t === 4 || $t === 3) {
      $t = 0, Lm();
      var t = Xe, l = pa, e = Se, n = n1;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? $t = 5 : ($t = 0, pa = Xe = null, v1(t, t.pendingLanes));
      var i = t.pendingLanes;
      if (i === 0 && (qe = null), no(e), l = l.stateNode, vl && typeof vl.onCommitFiberRoot == "function")
        try {
          vl.onCommitFiberRoot(
            wa,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        l = U.T, i = J.p, J.p = 2, U.T = null;
        try {
          for (var o = t.onRecoverableError, s = 0; s < n.length; s++) {
            var h = n[s];
            o(h.value, {
              componentStack: h.stack
            });
          }
        } finally {
          U.T = l, J.p = i;
        }
      }
      (Se & 3) !== 0 && Pi(), Il(t), i = t.pendingLanes, (e & 261930) !== 0 && (i & 42) !== 0 ? t === wf ? bu++ : (bu = 0, wf = t) : bu = 0, Mu(0);
    }
  }
  function v1(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, lu(l)));
  }
  function Pi() {
    return m1(), g1(), p1(), S1();
  }
  function S1() {
    if ($t !== 5) return !1;
    var t = Xe, l = Lf;
    Lf = 0;
    var e = no(Se), n = U.T, i = J.p;
    try {
      J.p = 32 > e ? 32 : e, U.T = null, e = Yf, Yf = null;
      var o = Xe, s = Se;
      if ($t = 0, pa = Xe = null, Se = 0, (At & 6) !== 0) throw Error(f(331));
      var h = At;
      if (At |= 4, t1(o.current), Fd(
        o,
        o.current,
        s,
        e
      ), At = h, Mu(0, !1), vl && typeof vl.onPostCommitFiberRoot == "function")
        try {
          vl.onPostCommitFiberRoot(wa, o);
        } catch {
        }
      return !0;
    } finally {
      J.p = i, U.T = n, v1(t, l);
    }
  }
  function b1(t, l, e) {
    l = jl(e, l), l = pf(t.stateNode, l, 2), t = He(t, l, 2), t !== null && (qa(t, 2), Il(t));
  }
  function Ot(t, l, e) {
    if (t.tag === 3)
      b1(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          b1(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var n = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (qe === null || !qe.has(n))) {
            t = jl(e, t), e = Md(2), n = He(l, e, 2), n !== null && (Ed(
              e,
              n,
              l,
              t
            ), qa(n, 2), Il(n));
            break;
          }
        }
        l = l.return;
      }
  }
  function Xf(t, l, e) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new fp();
      var i = /* @__PURE__ */ new Set();
      n.set(l, i);
    } else
      i = n.get(l), i === void 0 && (i = /* @__PURE__ */ new Set(), n.set(l, i));
    i.has(e) || (Uf = !0, i.add(e), t = yp.bind(null, t, l, e), l.then(t, t));
  }
  function yp(t, l, e) {
    var n = t.pingCache;
    n !== null && n.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, jt === t && (mt & e) === e && (Lt === 4 || Lt === 3 && (mt & 62914560) === mt && 300 > pl() - $i ? (At & 2) === 0 && va(t, 0) : Hf |= e, ga === mt && (ga = 0)), Il(t);
  }
  function M1(t, l) {
    l === 0 && (l = mr()), t = yn(t, l), t !== null && (qa(t, l), Il(t));
  }
  function mp(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), M1(t, e);
  }
  function gp(t, l) {
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
    n !== null && n.delete(l), M1(t, e);
  }
  function pp(t, l) {
    return Pc(t, l);
  }
  var tc = null, ba = null, Zf = !1, lc = !1, Qf = !1, Qe = 0;
  function Il(t) {
    t !== ba && t.next === null && (ba === null ? tc = ba = t : ba = ba.next = t), lc = !0, Zf || (Zf = !0, Sp());
  }
  function Mu(t, l) {
    if (!Qf && lc) {
      Qf = !0;
      do
        for (var e = !1, n = tc; n !== null; ) {
          if (t !== 0) {
            var i = n.pendingLanes;
            if (i === 0) var o = 0;
            else {
              var s = n.suspendedLanes, h = n.pingedLanes;
              o = (1 << 31 - Sl(42 | t) + 1) - 1, o &= i & ~(s & ~h), o = o & 201326741 ? o & 201326741 | 1 : o ? o | 2 : 0;
            }
            o !== 0 && (e = !0, A1(n, o));
          } else
            o = mt, o = ui(
              n,
              n === jt ? o : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (o & 3) === 0 || Ga(n, o) || (e = !0, A1(n, o));
          n = n.next;
        }
      while (e);
      Qf = !1;
    }
  }
  function vp() {
    E1();
  }
  function E1() {
    lc = Zf = !1;
    var t = 0;
    Qe !== 0 && Cp() && (t = Qe);
    for (var l = pl(), e = null, n = tc; n !== null; ) {
      var i = n.next, o = x1(n, l);
      o === 0 ? (n.next = null, e === null ? tc = i : e.next = i, i === null && (ba = e)) : (e = n, (t !== 0 || (o & 3) !== 0) && (lc = !0)), n = i;
    }
    $t !== 0 && $t !== 5 || Mu(t), Qe !== 0 && (Qe = 0);
  }
  function x1(t, l) {
    for (var e = t.suspendedLanes, n = t.pingedLanes, i = t.expirationTimes, o = t.pendingLanes & -62914561; 0 < o; ) {
      var s = 31 - Sl(o), h = 1 << s, S = i[s];
      S === -1 ? ((h & e) === 0 || (h & n) !== 0) && (i[s] = Vm(h, l)) : S <= l && (t.expiredLanes |= h), o &= ~h;
    }
    if (l = jt, e = mt, e = ui(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, e === 0 || t === l && (_t === 2 || _t === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && to(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || Ga(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (n !== null && to(n), no(e)) {
        case 2:
        case 8:
          e = hr;
          break;
        case 32:
          e = li;
          break;
        case 268435456:
          e = yr;
          break;
        default:
          e = li;
      }
      return n = T1.bind(null, t), e = Pc(e, n), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return n !== null && n !== null && to(n), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function T1(t, l) {
    if ($t !== 0 && $t !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (Pi() && t.callbackNode !== e)
      return null;
    var n = mt;
    return n = ui(
      t,
      t === jt ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n === 0 ? null : (u1(t, n, l), x1(t, pl()), t.callbackNode != null && t.callbackNode === e ? T1.bind(null, t) : null);
  }
  function A1(t, l) {
    if (Pi()) return null;
    u1(t, l, !0);
  }
  function Sp() {
    Rp(function() {
      (At & 6) !== 0 ? Pc(
        dr,
        vp
      ) : E1();
    });
  }
  function Vf() {
    if (Qe === 0) {
      var t = ua;
      t === 0 && (t = ei, ei <<= 1, (ei & 261888) === 0 && (ei = 256)), Qe = t;
    }
    return Qe;
  }
  function z1(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : fi("" + t);
  }
  function _1(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function bp(t, l, e, n, i) {
    if (l === "submit" && e && e.stateNode === i) {
      var o = z1(
        (i[fl] || null).action
      ), s = n.submitter;
      s && (l = (l = s[fl] || null) ? z1(l.formAction) : s.getAttribute("formAction"), l !== null && (o = l, s = null));
      var h = new hi(
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
                  var S = s ? _1(i, s) : new FormData(i);
                  rf(
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
                typeof o == "function" && (h.preventDefault(), S = s ? _1(i, s) : new FormData(i), rf(
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
  for (var Kf = 0; Kf < _o.length; Kf++) {
    var $f = _o[Kf], Mp = $f.toLowerCase(), Ep = $f[0].toUpperCase() + $f.slice(1);
    Xl(
      Mp,
      "on" + Ep
    );
  }
  Xl(a0, "onAnimationEnd"), Xl(u0, "onAnimationIteration"), Xl(i0, "onAnimationStart"), Xl("dblclick", "onDoubleClick"), Xl("focusin", "onFocus"), Xl("focusout", "onBlur"), Xl(Yg, "onTransitionRun"), Xl(wg, "onTransitionStart"), Xl(Gg, "onTransitionCancel"), Xl(c0, "onTransitionEnd"), Vn("onMouseEnter", ["mouseout", "mouseover"]), Vn("onMouseLeave", ["mouseout", "mouseover"]), Vn("onPointerEnter", ["pointerout", "pointerover"]), Vn("onPointerLeave", ["pointerout", "pointerover"]), sn(
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
  var Eu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), xp = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Eu)
  );
  function O1(t, l) {
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
              gi(H);
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
              gi(H);
            }
            i.currentTarget = null, o = S;
          }
      }
    }
  }
  function yt(t, l) {
    var e = l[ao];
    e === void 0 && (e = l[ao] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    e.has(n) || (C1(l, t, 2, !1), e.add(n));
  }
  function kf(t, l, e) {
    var n = 0;
    l && (n |= 4), C1(
      e,
      t,
      n,
      l
    );
  }
  var ec = "_reactListening" + Math.random().toString(36).slice(2);
  function Jf(t) {
    if (!t[ec]) {
      t[ec] = !0, Er.forEach(function(e) {
        e !== "selectionchange" && (xp.has(e) || kf(e, !1, t), kf(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[ec] || (l[ec] = !0, kf("selectionchange", !1, l));
    }
  }
  function C1(t, l, e, n) {
    switch (ah(l)) {
      case 2:
        var i = Fp;
        break;
      case 8:
        i = Ip;
        break;
      default:
        i = ss;
    }
    e = i.bind(
      null,
      l,
      e,
      t
    ), i = void 0, !yo || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (i = !0), n ? i !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: i
    }) : t.addEventListener(l, e, !0) : i !== void 0 ? t.addEventListener(l, e, {
      passive: i
    }) : t.addEventListener(l, e, !1);
  }
  function Wf(t, l, e, n, i) {
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
    Ur(function() {
      var O = o, H = ro(e), L = [];
      t: {
        var D = o0.get(t);
        if (D !== void 0) {
          var R = hi, P = t;
          switch (t) {
            case "keypress":
              if (ri(e) === 0) break t;
            case "keydown":
            case "keyup":
              R = gg;
              break;
            case "focusin":
              P = "focus", R = vo;
              break;
            case "focusout":
              P = "blur", R = vo;
              break;
            case "beforeblur":
            case "afterblur":
              R = vo;
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
              R = Lr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              R = ag;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              R = Sg;
              break;
            case a0:
            case u0:
            case i0:
              R = cg;
              break;
            case c0:
              R = Mg;
              break;
            case "scroll":
            case "scrollend":
              R = eg;
              break;
            case "wheel":
              R = xg;
              break;
            case "copy":
            case "cut":
            case "paste":
              R = fg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              R = wr;
              break;
            case "toggle":
            case "beforetoggle":
              R = Ag;
          }
          var ut = (l & 4) !== 0, Rt = !ut && (t === "scroll" || t === "scrollend"), A = ut ? D !== null ? D + "Capture" : null : D;
          ut = [];
          for (var E = O, _; E !== null; ) {
            var B = E;
            if (_ = B.stateNode, B = B.tag, B !== 5 && B !== 26 && B !== 27 || _ === null || A === null || (B = Qa(E, A), B != null && ut.push(
              xu(E, B, _)
            )), Rt) break;
            E = E.return;
          }
          0 < ut.length && (D = new R(
            D,
            P,
            null,
            e,
            H
          ), L.push({ event: D, listeners: ut }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (D = t === "mouseover" || t === "pointerover", R = t === "mouseout" || t === "pointerout", D && e !== so && (P = e.relatedTarget || e.fromElement) && (Xn(P) || P[qn]))
            break t;
          if ((R || D) && (D = H.window === H ? H : (D = H.ownerDocument) ? D.defaultView || D.parentWindow : window, R ? (P = e.relatedTarget || e.toElement, R = O, P = P ? Xn(P) : null, P !== null && (Rt = d(P), ut = P.tag, P !== Rt || ut !== 5 && ut !== 27 && ut !== 6) && (P = null)) : (R = null, P = O), R !== P)) {
            if (ut = Lr, B = "onMouseLeave", A = "onMouseEnter", E = "mouse", (t === "pointerout" || t === "pointerover") && (ut = wr, B = "onPointerLeave", A = "onPointerEnter", E = "pointer"), Rt = R == null ? D : Za(R), _ = P == null ? D : Za(P), D = new ut(
              B,
              E + "leave",
              R,
              e,
              H
            ), D.target = Rt, D.relatedTarget = _, B = null, Xn(H) === O && (ut = new ut(
              A,
              E + "enter",
              P,
              e,
              H
            ), ut.target = _, ut.relatedTarget = Rt, B = ut), Rt = B, R && P)
              l: {
                for (ut = Tp, A = R, E = P, _ = 0, B = A; B; B = ut(B))
                  _++;
                B = 0;
                for (var nt = E; nt; nt = ut(nt))
                  B++;
                for (; 0 < _ - B; )
                  A = ut(A), _--;
                for (; 0 < B - _; )
                  E = ut(E), B--;
                for (; _--; ) {
                  if (A === E || E !== null && A === E.alternate) {
                    ut = A;
                    break l;
                  }
                  A = ut(A), E = ut(E);
                }
                ut = null;
              }
            else ut = null;
            R !== null && D1(
              L,
              D,
              R,
              ut,
              !1
            ), P !== null && Rt !== null && D1(
              L,
              Rt,
              P,
              ut,
              !0
            );
          }
        }
        t: {
          if (D = O ? Za(O) : window, R = D.nodeName && D.nodeName.toLowerCase(), R === "select" || R === "input" && D.type === "file")
            var Et = $r;
          else if (Vr(D))
            if (kr)
              Et = Hg;
            else {
              Et = Ng;
              var lt = jg;
            }
          else
            R = D.nodeName, !R || R.toLowerCase() !== "input" || D.type !== "checkbox" && D.type !== "radio" ? O && fo(O.elementType) && (Et = $r) : Et = Ug;
          if (Et && (Et = Et(t, O))) {
            Kr(
              L,
              Et,
              e,
              H
            );
            break t;
          }
          lt && lt(t, D, O), t === "focusout" && O && D.type === "number" && O.memoizedProps.value != null && oo(D, "number", D.value);
        }
        switch (lt = O ? Za(O) : window, t) {
          case "focusin":
            (Vr(lt) || lt.contentEditable === "true") && (Fn = lt, To = O, Ia = null);
            break;
          case "focusout":
            Ia = To = Fn = null;
            break;
          case "mousedown":
            Ao = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ao = !1, e0(L, e, H);
            break;
          case "selectionchange":
            if (Lg) break;
          case "keydown":
          case "keyup":
            e0(L, e, H);
        }
        var rt;
        if (bo)
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
          Wn ? Zr(t, e) && (gt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (gt = "onCompositionStart");
        gt && (Gr && e.locale !== "ko" && (Wn || gt !== "onCompositionStart" ? gt === "onCompositionEnd" && Wn && (rt = Hr()) : (Oe = H, mo = "value" in Oe ? Oe.value : Oe.textContent, Wn = !0)), lt = nc(O, gt), 0 < lt.length && (gt = new Yr(
          gt,
          t,
          null,
          e,
          H
        ), L.push({ event: gt, listeners: lt }), rt ? gt.data = rt : (rt = Qr(e), rt !== null && (gt.data = rt)))), (rt = _g ? Og(t, e) : Cg(t, e)) && (gt = nc(O, "onBeforeInput"), 0 < gt.length && (lt = new Yr(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          H
        ), L.push({
          event: lt,
          listeners: gt
        }), lt.data = rt)), bp(
          L,
          t,
          O,
          e,
          H
        );
      }
      O1(L, l);
    });
  }
  function xu(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function nc(t, l) {
    for (var e = l + "Capture", n = []; t !== null; ) {
      var i = t, o = i.stateNode;
      if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || o === null || (i = Qa(t, e), i != null && n.unshift(
        xu(t, i, o)
      ), i = Qa(t, l), i != null && n.push(
        xu(t, i, o)
      )), t.tag === 3) return n;
      t = t.return;
    }
    return [];
  }
  function Tp(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function D1(t, l, e, n, i) {
    for (var o = l._reactName, s = []; e !== null && e !== n; ) {
      var h = e, S = h.alternate, O = h.stateNode;
      if (h = h.tag, S !== null && S === n) break;
      h !== 5 && h !== 26 && h !== 27 || O === null || (S = O, i ? (O = Qa(e, o), O != null && s.unshift(
        xu(e, O, S)
      )) : i || (O = Qa(e, o), O != null && s.push(
        xu(e, O, S)
      ))), e = e.return;
    }
    s.length !== 0 && t.push({ event: l, listeners: s });
  }
  var Ap = /\r\n?/g, zp = /\u0000|\uFFFD/g;
  function R1(t) {
    return (typeof t == "string" ? t : "" + t).replace(Ap, `
`).replace(zp, "");
  }
  function j1(t, l) {
    return l = R1(l), R1(t) === l;
  }
  function Dt(t, l, e, n, i, o) {
    switch (e) {
      case "children":
        typeof n == "string" ? l === "body" || l === "textarea" && n === "" || $n(t, n) : (typeof n == "number" || typeof n == "bigint") && l !== "body" && $n(t, "" + n);
        break;
      case "className":
        ci(t, "class", n);
        break;
      case "tabIndex":
        ci(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ci(t, e, n);
        break;
      case "style":
        jr(t, n, o);
        break;
      case "data":
        if (l !== "object") {
          ci(t, "data", n);
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
        n = fi("" + n), t.setAttribute(e, n);
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
        n = fi("" + n), t.setAttribute(e, n);
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
        e = fi("" + n), t.setAttributeNS(
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
        yt("beforetoggle", t), yt("toggle", t), ii(t, "popover", n);
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
        ii(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = tg.get(e) || e, ii(t, e, n));
    }
  }
  function Ff(t, l, e, n, i, o) {
    switch (e) {
      case "style":
        jr(t, n, o);
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
        if (!xr.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (i = e.endsWith("Capture"), l = e.slice(2, i ? e.length - 7 : void 0), o = t[fl] || null, o = o != null ? o[e] : null, typeof o == "function" && t.removeEventListener(l, o, i), typeof n == "function")) {
              typeof o != "function" && o !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, n, i);
              break t;
            }
            e in t ? t[e] = n : n === !0 ? t.setAttribute(e, "") : ii(t, e, n);
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
        Or(
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
        Dr(t, n, i, o);
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
        for (n = 0; n < Eu.length; n++)
          yt(Eu[n], t);
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
        if (fo(l)) {
          for (H in e)
            e.hasOwnProperty(H) && (n = e[H], n !== void 0 && Ff(
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
  function _p(t, l, e, n) {
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
        for (R in e) {
          var L = e[R];
          if (e.hasOwnProperty(R) && L != null)
            switch (R) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                S = L;
              default:
                n.hasOwnProperty(R) || Dt(t, l, R, null, n, L);
            }
        }
        for (var D in n) {
          var R = n[D];
          if (L = e[D], n.hasOwnProperty(D) && (R != null || L != null))
            switch (D) {
              case "type":
                o = R;
                break;
              case "name":
                i = R;
                break;
              case "checked":
                O = R;
                break;
              case "defaultChecked":
                H = R;
                break;
              case "value":
                s = R;
                break;
              case "defaultValue":
                h = R;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (R != null)
                  throw Error(f(137, l));
                break;
              default:
                R !== L && Dt(
                  t,
                  l,
                  D,
                  R,
                  n,
                  L
                );
            }
        }
        co(
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
        R = s = h = D = null;
        for (o in e)
          if (S = e[o], e.hasOwnProperty(o) && S != null)
            switch (o) {
              case "value":
                break;
              case "multiple":
                R = S;
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
                D = o;
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
        l = h, e = s, n = R, D != null ? Kn(t, !!e, D, !1) : !!n != !!e && (l != null ? Kn(t, !!e, l, !0) : Kn(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        R = D = null;
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
                D = i;
                break;
              case "defaultValue":
                R = i;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(f(91));
                break;
              default:
                i !== o && Dt(t, l, s, i, n, o);
            }
        Cr(t, D, R);
        return;
      case "option":
        for (var P in e)
          if (D = e[P], e.hasOwnProperty(P) && D != null && !n.hasOwnProperty(P))
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
                  D
                );
            }
        for (S in n)
          if (D = n[S], R = e[S], n.hasOwnProperty(S) && D !== R && (D != null || R != null))
            switch (S) {
              case "selected":
                t.selected = D && typeof D != "function" && typeof D != "symbol";
                break;
              default:
                Dt(
                  t,
                  l,
                  S,
                  D,
                  n,
                  R
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
          D = e[ut], e.hasOwnProperty(ut) && D != null && !n.hasOwnProperty(ut) && Dt(t, l, ut, null, n, D);
        for (O in n)
          if (D = n[O], R = e[O], n.hasOwnProperty(O) && D !== R && (D != null || R != null))
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (D != null)
                  throw Error(f(137, l));
                break;
              default:
                Dt(
                  t,
                  l,
                  O,
                  D,
                  n,
                  R
                );
            }
        return;
      default:
        if (fo(l)) {
          for (var Rt in e)
            D = e[Rt], e.hasOwnProperty(Rt) && D !== void 0 && !n.hasOwnProperty(Rt) && Ff(
              t,
              l,
              Rt,
              void 0,
              n,
              D
            );
          for (H in n)
            D = n[H], R = e[H], !n.hasOwnProperty(H) || D === R || D === void 0 && R === void 0 || Ff(
              t,
              l,
              H,
              D,
              n,
              R
            );
          return;
        }
    }
    for (var A in e)
      D = e[A], e.hasOwnProperty(A) && D != null && !n.hasOwnProperty(A) && Dt(t, l, A, null, n, D);
    for (L in n)
      D = n[L], R = e[L], !n.hasOwnProperty(L) || D === R || D == null && R == null || Dt(t, l, L, D, n, R);
  }
  function N1(t) {
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
  function Op() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), n = 0; n < e.length; n++) {
        var i = e[n], o = i.transferSize, s = i.initiatorType, h = i.duration;
        if (o && h && N1(s)) {
          for (s = 0, h = i.responseEnd, n += 1; n < e.length; n++) {
            var S = e[n], O = S.startTime;
            if (O > h) break;
            var H = S.transferSize, L = S.initiatorType;
            H && N1(L) && (S = S.responseEnd, s += H * (S < h ? 1 : (h - O) / (S - O)));
          }
          if (--n, l += 8 * (o + s) / (i.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var If = null, Pf = null;
  function ac(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function U1(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function H1(t, l) {
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
  function ts(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var ls = null;
  function Cp() {
    var t = window.event;
    return t && t.type === "popstate" ? t === ls ? !1 : (ls = t, !0) : (ls = null, !1);
  }
  var B1 = typeof setTimeout == "function" ? setTimeout : void 0, Dp = typeof clearTimeout == "function" ? clearTimeout : void 0, L1 = typeof Promise == "function" ? Promise : void 0, Rp = typeof queueMicrotask == "function" ? queueMicrotask : typeof L1 < "u" ? function(t) {
    return L1.resolve(null).then(t).catch(jp);
  } : B1;
  function jp(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ve(t) {
    return t === "head";
  }
  function Y1(t, l) {
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
          Tu(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, Tu(e);
          for (var o = e.firstChild; o; ) {
            var s = o.nextSibling, h = o.nodeName;
            o[Xa] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && o.rel.toLowerCase() === "stylesheet" || e.removeChild(o), o = s;
          }
        } else
          e === "body" && Tu(t.ownerDocument.body);
      e = i;
    } while (e);
    Ta(l);
  }
  function w1(t, l) {
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
  function es(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          es(e), uo(e);
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
  function Np(t, l, e, n) {
    for (; t.nodeType === 1; ) {
      var i = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (n) {
        if (!t[Xa])
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
  function Up(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Ll(t.nextSibling), t === null)) return null;
    return t;
  }
  function G1(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Ll(t.nextSibling), t === null)) return null;
    return t;
  }
  function ns(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function as(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Hp(t, l) {
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
  var us = null;
  function q1(t) {
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
  function X1(t) {
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
  function Z1(t, l, e) {
    switch (l = ac(e), t) {
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
  function Tu(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    uo(t);
  }
  var Yl = /* @__PURE__ */ new Map(), Q1 = /* @__PURE__ */ new Set();
  function uc(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var be = J.d;
  J.d = {
    f: Bp,
    r: Lp,
    D: Yp,
    C: wp,
    L: Gp,
    m: qp,
    X: Zp,
    S: Xp,
    M: Qp
  };
  function Bp() {
    var t = be.f(), l = Wi();
    return t || l;
  }
  function Lp(t) {
    var l = Zn(t);
    l !== null && l.tag === 5 && l.type === "form" ? cd(l) : be.r(t);
  }
  var Ma = typeof document > "u" ? null : document;
  function V1(t, l, e) {
    var n = Ma;
    if (n && typeof l == "string" && l) {
      var i = Dl(l);
      i = 'link[rel="' + t + '"][href="' + i + '"]', typeof e == "string" && (i += '[crossorigin="' + e + '"]'), Q1.has(i) || (Q1.add(i), t = { rel: t, crossOrigin: e, href: l }, n.querySelector(i) === null && (l = n.createElement("link"), el(l, "link", t), Jt(l), n.head.appendChild(l)));
    }
  }
  function Yp(t) {
    be.D(t), V1("dns-prefetch", t, null);
  }
  function wp(t, l) {
    be.C(t, l), V1("preconnect", t, l);
  }
  function Gp(t, l, e) {
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
      ), Yl.set(o, t), n.querySelector(i) !== null || l === "style" && n.querySelector(Au(o)) || l === "script" && n.querySelector(zu(o)) || (l = n.createElement("link"), el(l, "link", t), Jt(l), n.head.appendChild(l)));
    }
  }
  function qp(t, l) {
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
            if (e.querySelector(zu(o)))
              return;
        }
        n = e.createElement("link"), el(n, "link", t), Jt(n), e.head.appendChild(n);
      }
    }
  }
  function Xp(t, l, e) {
    be.S(t, l, e);
    var n = Ma;
    if (n && t) {
      var i = Qn(n).hoistableStyles, o = Ea(t);
      l = l || "default";
      var s = i.get(o);
      if (!s) {
        var h = { loading: 0, preload: null };
        if (s = n.querySelector(
          Au(o)
        ))
          h.loading = 5;
        else {
          t = b(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Yl.get(o)) && is(t, e);
          var S = s = n.createElement("link");
          Jt(S), el(S, "link", t), S._p = new Promise(function(O, H) {
            S.onload = O, S.onerror = H;
          }), S.addEventListener("load", function() {
            h.loading |= 1;
          }), S.addEventListener("error", function() {
            h.loading |= 2;
          }), h.loading |= 4, ic(s, l, n);
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
  function Zp(t, l) {
    be.X(t, l);
    var e = Ma;
    if (e && t) {
      var n = Qn(e).hoistableScripts, i = xa(t), o = n.get(i);
      o || (o = e.querySelector(zu(i)), o || (t = b({ src: t, async: !0 }, l), (l = Yl.get(i)) && cs(t, l), o = e.createElement("script"), Jt(o), el(o, "link", t), e.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, n.set(i, o));
    }
  }
  function Qp(t, l) {
    be.M(t, l);
    var e = Ma;
    if (e && t) {
      var n = Qn(e).hoistableScripts, i = xa(t), o = n.get(i);
      o || (o = e.querySelector(zu(i)), o || (t = b({ src: t, async: !0, type: "module" }, l), (l = Yl.get(i)) && cs(t, l), o = e.createElement("script"), Jt(o), el(o, "link", t), e.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, n.set(i, o));
    }
  }
  function K1(t, l, e, n) {
    var i = (i = dt.current) ? uc(i) : null;
    if (!i) throw Error(f(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = Ea(e.href), e = Qn(
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
          var o = Qn(
            i
          ).hoistableStyles, s = o.get(t);
          if (s || (i = i.ownerDocument || i, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, o.set(t, s), (o = i.querySelector(
            Au(t)
          )) && !o._p && (s.instance = o, s.state.loading = 5), Yl.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Yl.set(t, e), o || Vp(
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
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = xa(e), e = Qn(
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
  function Au(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function $1(t) {
    return b({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Vp(t, l, e, n) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? n.loading = 1 : (l = t.createElement("link"), n.preload = l, l.addEventListener("load", function() {
      return n.loading |= 1;
    }), l.addEventListener("error", function() {
      return n.loading |= 2;
    }), el(l, "link", e), Jt(l), t.head.appendChild(l));
  }
  function xa(t) {
    return '[src="' + Dl(t) + '"]';
  }
  function zu(t) {
    return "script[async]" + t;
  }
  function k1(t, l, e) {
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
          ), Jt(n), el(n, "style", i), ic(n, e.precedence, t), l.instance = n;
        case "stylesheet":
          i = Ea(e.href);
          var o = t.querySelector(
            Au(i)
          );
          if (o)
            return l.state.loading |= 4, l.instance = o, Jt(o), o;
          n = $1(e), (i = Yl.get(i)) && is(n, i), o = (t.ownerDocument || t).createElement("link"), Jt(o);
          var s = o;
          return s._p = new Promise(function(h, S) {
            s.onload = h, s.onerror = S;
          }), el(o, "link", n), l.state.loading |= 4, ic(o, e.precedence, t), l.instance = o;
        case "script":
          return o = xa(e.src), (i = t.querySelector(
            zu(o)
          )) ? (l.instance = i, Jt(i), i) : (n = e, (i = Yl.get(o)) && (n = b({}, e), cs(n, i)), t = t.ownerDocument || t, i = t.createElement("script"), Jt(i), el(i, "link", n), t.head.appendChild(i), l.instance = i);
        case "void":
          return null;
        default:
          throw Error(f(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (n = l.instance, l.state.loading |= 4, ic(n, e.precedence, t));
    return l.instance;
  }
  function ic(t, l, e) {
    for (var n = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), i = n.length ? n[n.length - 1] : null, o = i, s = 0; s < n.length; s++) {
      var h = n[s];
      if (h.dataset.precedence === l) o = h;
      else if (o !== i) break;
    }
    o ? o.parentNode.insertBefore(t, o.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function is(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function cs(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var cc = null;
  function J1(t, l, e) {
    if (cc === null) {
      var n = /* @__PURE__ */ new Map(), i = cc = /* @__PURE__ */ new Map();
      i.set(e, n);
    } else
      i = cc, n = i.get(e), n || (n = /* @__PURE__ */ new Map(), i.set(e, n));
    if (n.has(t)) return n;
    for (n.set(t, null), e = e.getElementsByTagName(t), i = 0; i < e.length; i++) {
      var o = e[i];
      if (!(o[Xa] || o[It] || t === "link" && o.getAttribute("rel") === "stylesheet") && o.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = o.getAttribute(l) || "";
        s = t + s;
        var h = n.get(s);
        h ? h.push(o) : n.set(s, [o]);
      }
    }
    return n;
  }
  function W1(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function Kp(t, l, e) {
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
  function F1(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function $p(t, l, e, n) {
    if (e.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var i = Ea(n.href), o = l.querySelector(
          Au(i)
        );
        if (o) {
          l = o._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = oc.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = o, Jt(o);
          return;
        }
        o = l.ownerDocument || l, n = $1(n), (i = Yl.get(i)) && is(n, i), o = o.createElement("link"), Jt(o);
        var s = o;
        s._p = new Promise(function(h, S) {
          s.onload = h, s.onerror = S;
        }), el(o, "link", n), e.instance = o;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = oc.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var os = 0;
  function kp(t, l) {
    return t.stylesheets && t.count === 0 && sc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var n = setTimeout(function() {
        if (t.stylesheets && sc(t, t.stylesheets), t.unsuspend) {
          var o = t.unsuspend;
          t.unsuspend = null, o();
        }
      }, 6e4 + l);
      0 < t.imgBytes && os === 0 && (os = 62500 * Op());
      var i = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && sc(t, t.stylesheets), t.unsuspend)) {
            var o = t.unsuspend;
            t.unsuspend = null, o();
          }
        },
        (t.imgBytes > os ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(i);
      };
    } : null;
  }
  function oc() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) sc(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var fc = null;
  function sc(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, fc = /* @__PURE__ */ new Map(), l.forEach(Jp, t), fc = null, oc.call(t));
  }
  function Jp(t, l) {
    if (!(l.state.loading & 4)) {
      var e = fc.get(t);
      if (e) var n = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), fc.set(t, e);
        for (var i = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), o = 0; o < i.length; o++) {
          var s = i[o];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (e.set(s.dataset.precedence, s), n = s);
        }
        n && e.set(null, n);
      }
      i = l.instance, s = i.getAttribute("data-precedence"), o = e.get(s) || n, o === n && e.set(null, i), e.set(s, i), this.count++, n = oc.bind(this), i.addEventListener("load", n), i.addEventListener("error", n), o ? o.parentNode.insertBefore(i, o.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(i, t.firstChild)), l.state.loading |= 4;
    }
  }
  var _u = {
    $$typeof: Q,
    Provider: null,
    Consumer: null,
    _currentValue: et,
    _currentValue2: et,
    _threadCount: 0
  };
  function Wp(t, l, e, n, i, o, s, h, S) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = lo(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = lo(0), this.hiddenUpdates = lo(null), this.identifierPrefix = n, this.onUncaughtError = i, this.onCaughtError = o, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = S, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function I1(t, l, e, n, i, o, s, h, S, O, H, L) {
    return t = new Wp(
      t,
      l,
      e,
      s,
      S,
      O,
      H,
      L,
      h
    ), l = 1, o === !0 && (l |= 24), o = Ml(3, null, null, l), t.current = o, o.stateNode = t, l = Go(), l.refCount++, t.pooledCache = l, l.refCount++, o.memoizedState = {
      element: n,
      isDehydrated: e,
      cache: l
    }, Qo(o), t;
  }
  function P1(t) {
    return t ? (t = ta, t) : ta;
  }
  function th(t, l, e, n, i, o) {
    i = P1(i), n.context === null ? n.context = i : n.pendingContext = i, n = Ue(l), n.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (n.callback = o), e = He(t, n, l), e !== null && (ml(e, t, l), uu(e, t, l));
  }
  function lh(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function fs(t, l) {
    lh(t, l), (t = t.alternate) && lh(t, l);
  }
  function eh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = yn(t, 67108864);
      l !== null && ml(l, t, 67108864), fs(t, 67108864);
    }
  }
  function nh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = zl();
      l = eo(l);
      var e = yn(t, l);
      e !== null && ml(e, t, l), fs(t, l);
    }
  }
  var rc = !0;
  function Fp(t, l, e, n) {
    var i = U.T;
    U.T = null;
    var o = J.p;
    try {
      J.p = 2, ss(t, l, e, n);
    } finally {
      J.p = o, U.T = i;
    }
  }
  function Ip(t, l, e, n) {
    var i = U.T;
    U.T = null;
    var o = J.p;
    try {
      J.p = 8, ss(t, l, e, n);
    } finally {
      J.p = o, U.T = i;
    }
  }
  function ss(t, l, e, n) {
    if (rc) {
      var i = rs(n);
      if (i === null)
        Wf(
          t,
          l,
          n,
          dc,
          e
        ), uh(t, n);
      else if (tv(
        i,
        t,
        l,
        e,
        n
      ))
        n.stopPropagation();
      else if (uh(t, n), l & 4 && -1 < Pp.indexOf(t)) {
        for (; i !== null; ) {
          var o = Zn(i);
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
                    Il(o), (At & 6) === 0 && (ki = pl() + 500, Mu(0));
                  }
                }
                break;
              case 31:
              case 13:
                h = yn(o, 2), h !== null && ml(h, o, 2), Wi(), fs(o, 2);
            }
          if (o = rs(n), o === null && Wf(
            t,
            l,
            n,
            dc,
            e
          ), o === i) break;
          i = o;
        }
        i !== null && n.stopPropagation();
      } else
        Wf(
          t,
          l,
          n,
          null,
          e
        );
    }
  }
  function rs(t) {
    return t = ro(t), ds(t);
  }
  var dc = null;
  function ds(t) {
    if (dc = null, t = Xn(t), t !== null) {
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
    return dc = t, null;
  }
  function ah(t) {
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
        switch (Ym()) {
          case dr:
            return 2;
          case hr:
            return 8;
          case li:
          case wm:
            return 32;
          case yr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hs = !1, Ke = null, $e = null, ke = null, Ou = /* @__PURE__ */ new Map(), Cu = /* @__PURE__ */ new Map(), Je = [], Pp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function uh(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ke = null;
        break;
      case "dragenter":
      case "dragleave":
        $e = null;
        break;
      case "mouseover":
      case "mouseout":
        ke = null;
        break;
      case "pointerover":
      case "pointerout":
        Ou.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Cu.delete(l.pointerId);
    }
  }
  function Du(t, l, e, n, i, o) {
    return t === null || t.nativeEvent !== o ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: n,
      nativeEvent: o,
      targetContainers: [i]
    }, l !== null && (l = Zn(l), l !== null && eh(l)), t) : (t.eventSystemFlags |= n, l = t.targetContainers, i !== null && l.indexOf(i) === -1 && l.push(i), t);
  }
  function tv(t, l, e, n, i) {
    switch (l) {
      case "focusin":
        return Ke = Du(
          Ke,
          t,
          l,
          e,
          n,
          i
        ), !0;
      case "dragenter":
        return $e = Du(
          $e,
          t,
          l,
          e,
          n,
          i
        ), !0;
      case "mouseover":
        return ke = Du(
          ke,
          t,
          l,
          e,
          n,
          i
        ), !0;
      case "pointerover":
        var o = i.pointerId;
        return Ou.set(
          o,
          Du(
            Ou.get(o) || null,
            t,
            l,
            e,
            n,
            i
          )
        ), !0;
      case "gotpointercapture":
        return o = i.pointerId, Cu.set(
          o,
          Du(
            Cu.get(o) || null,
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
  function ih(t) {
    var l = Xn(t.target);
    if (l !== null) {
      var e = d(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = m(e), l !== null) {
            t.blockedOn = l, br(t.priority, function() {
              nh(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = p(e), l !== null) {
            t.blockedOn = l, br(t.priority, function() {
              nh(e);
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
  function hc(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = rs(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var n = new e.constructor(
          e.type,
          e
        );
        so = n, e.target.dispatchEvent(n), so = null;
      } else
        return l = Zn(e), l !== null && eh(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function ch(t, l, e) {
    hc(t) && e.delete(l);
  }
  function lv() {
    hs = !1, Ke !== null && hc(Ke) && (Ke = null), $e !== null && hc($e) && ($e = null), ke !== null && hc(ke) && (ke = null), Ou.forEach(ch), Cu.forEach(ch);
  }
  function yc(t, l) {
    t.blockedOn === l && (t.blockedOn = null, hs || (hs = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      lv
    )));
  }
  var mc = null;
  function oh(t) {
    mc !== t && (mc = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        mc === t && (mc = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], n = t[l + 1], i = t[l + 2];
          if (typeof n != "function") {
            if (ds(n || e) === null)
              continue;
            break;
          }
          var o = Zn(e);
          o !== null && (t.splice(l, 3), l -= 3, rf(
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
      return yc(S, t);
    }
    Ke !== null && yc(Ke, t), $e !== null && yc($e, t), ke !== null && yc(ke, t), Ou.forEach(l), Cu.forEach(l);
    for (var e = 0; e < Je.length; e++) {
      var n = Je[e];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < Je.length && (e = Je[0], e.blockedOn === null); )
      ih(e), e.blockedOn === null && Je.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (n = 0; n < e.length; n += 3) {
        var i = e[n], o = e[n + 1], s = i[fl] || null;
        if (typeof o == "function")
          s || oh(e);
        else if (s) {
          var h = null;
          if (o && o.hasAttribute("formAction")) {
            if (i = o, s = o[fl] || null)
              h = s.formAction;
            else if (ds(i) !== null) continue;
          } else h = s.action;
          typeof h == "function" ? e[n + 1] = h : (e.splice(n, 3), n -= 3), oh(e);
        }
      }
  }
  function fh() {
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
  function ys(t) {
    this._internalRoot = t;
  }
  gc.prototype.render = ys.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(f(409));
    var e = l.current, n = zl();
    th(e, n, t, l, null, null);
  }, gc.prototype.unmount = ys.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      th(t.current, 2, null, t, null, null), Wi(), l[qn] = null;
    }
  };
  function gc(t) {
    this._internalRoot = t;
  }
  gc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = Sr();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < Je.length && l !== 0 && l < Je[e].priority; e++) ;
      Je.splice(e, 0, t), e === 0 && ih(t);
    }
  };
  var sh = u.version;
  if (sh !== "19.2.0")
    throw Error(
      f(
        527,
        sh,
        "19.2.0"
      )
    );
  J.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(f(188)) : (t = Object.keys(t).join(","), Error(f(268, t)));
    return t = y(l), t = t !== null ? v(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var ev = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.2.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var pc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!pc.isDisabled && pc.supportsFiber)
      try {
        wa = pc.inject(
          ev
        ), vl = pc;
      } catch {
      }
  }
  return wu.createRoot = function(t, l) {
    if (!r(t)) throw Error(f(299));
    var e = !1, n = "", i = pd, o = vd, s = Sd;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (i = l.onUncaughtError), l.onCaughtError !== void 0 && (o = l.onCaughtError), l.onRecoverableError !== void 0 && (s = l.onRecoverableError)), l = I1(
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
      fh
    ), t[qn] = l.current, Jf(t), new ys(l);
  }, wu.hydrateRoot = function(t, l, e) {
    if (!r(t)) throw Error(f(299));
    var n = !1, i = "", o = pd, s = vd, h = Sd, S = null;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (i = e.identifierPrefix), e.onUncaughtError !== void 0 && (o = e.onUncaughtError), e.onCaughtError !== void 0 && (s = e.onCaughtError), e.onRecoverableError !== void 0 && (h = e.onRecoverableError), e.formState !== void 0 && (S = e.formState)), l = I1(
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
      fh
    ), l.context = P1(null), e = l.current, n = zl(), n = eo(n), i = Ue(n), i.callback = null, He(e, i, n), e = n, l.current.lanes = e, qa(l, e), Il(l), t[qn] = l.current, Jf(t), new gc(l);
  }, wu.version = "19.2.0", wu;
}
var vy;
function Vb() {
  if (vy) return _s.exports;
  vy = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (u) {
        console.error(u);
      }
  }
  return a(), _s.exports = Qb(), _s.exports;
}
var Kb = Vb();
let Ha = null;
function Te(a) {
  return document.getElementById(a);
}
function jm(a) {
  const u = Te("intro");
  u && (u.style.display = a ? "block" : "none");
}
let Vu = null;
function ks() {
  const a = Te("replay-root"), u = a?.firstElementChild;
  if (!a || !u || a.style.display === "none") return;
  u.style.transform = "none", u.style.transformOrigin = "top center";
  let c = u.getBoundingClientRect().width;
  u.querySelectorAll("*").forEach((d) => {
    const m = d.getBoundingClientRect().width;
    m > c && (c = m);
  });
  const f = u.getBoundingClientRect().height;
  if (!c || !f) return;
  const r = Math.min(1, a.clientWidth / c);
  u.style.transform = r < 1 ? `scale(${r})` : "none", a.style.height = r < 1 ? `${f * r}px` : "";
}
function Js() {
  Vu?.disconnect(), Ha && (Ha.unmount(), Ha = null);
  const a = Te("replay-root");
  a && (a.style.display = "none", a.style.height = ""), jm(!0);
}
function Nm(a) {
  const u = Te("replay-root");
  if (!u) return;
  const c = a.trim();
  if (!c) {
    Js();
    return;
  }
  jm(!1), u.style.display = "block", Ha || (Ha = Kb.createRoot(u)), Ha.render(/* @__PURE__ */ z.jsx(wb, { encoded: c, onExit: Js })), window.scrollTo({ top: 0, behavior: "auto" }), requestAnimationFrame(() => {
    const f = u.firstElementChild;
    f && typeof ResizeObserver < "u" && (Vu || (Vu = new ResizeObserver(() => ks())), Vu.disconnect(), Vu.observe(f)), ks();
  });
}
window.addEventListener("resize", ks);
function Um() {
  const a = location.hash.match(/replay=([^&]+)/);
  if (!a) return;
  const u = decodeURIComponent(a[1]), c = Te("codeInput");
  c && (c.value = u), Nm(u);
}
Te("viewBtn")?.addEventListener("click", () => {
  Nm(Te("codeInput")?.value ?? "");
});
Te("clearBtn")?.addEventListener("click", () => {
  const a = Te("codeInput");
  a && (a.value = ""), location.hash && history.replaceState(null, "", location.pathname), Js();
});
window.addEventListener("hashchange", Um);
Um();
