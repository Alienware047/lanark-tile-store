"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail, Lock, Eye, EyeOff, User, ArrowRight,
  ArrowLeft, Check, ShieldCheck, KeyRound, RefreshCw,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const VIEWS = {
  LOGIN:  "login",
  SIGNUP: "signup",
  VERIFY: "verify",
  FORGOT: "forgot",
  RESET:  "reset",
} as const;

type View = (typeof VIEWS)[keyof typeof VIEWS];

const PERKS = [
  "Save favourite products & inspiration boards",
  "Track your project quotes in real time",
  "Exclusive member pricing & early access",
  "Dedicated aftercare support portal",
];

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function passwordStrength(p: string): number {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

interface InputFieldProps {
  id: string;
  label?: string;
  type?: string;
  icon?: React.ElementType;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  required?: boolean;
  rightSlot?: React.ReactNode;
  error?: string;
  hint?: string;
}

function InputField({
  id, label, type = "text", icon: Icon, placeholder, value, onChange,
  autoComplete, required = true, rightSlot, error, hint,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold mb-1.5 tracking-wide"
          style={{ color: "var(--color-foreground)" }}>
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            style={{ color: focused ? "var(--color-primary)" : "var(--text-muted)", transition: "color .2s" }} />
        )}
        <input
          id={id} type={type} autoComplete={autoComplete} required={required}
          value={value} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="w-full py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
          style={{
            paddingLeft: Icon ? "2.75rem" : "1rem",
            paddingRight: rightSlot ? "3rem" : "1rem",
            background: "var(--color-card)",
            border: `1px solid ${error ? "#ef4444" : focused ? "var(--color-primary)" : "var(--color-border)"}`,
            color: "var(--color-foreground)",
            boxShadow: focused ? "0 0 0 3px rgba(192,103,30,0.08)" : "none",
          }}
        />
        {rightSlot && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>
      {error && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{error}</p>}
      {hint && !error && <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{hint}</p>}
    </div>
  );
}

function GoogleButton({ onClick, label = "Continue with Google" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick}
      className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border font-semibold text-sm transition-all duration-200 hover:opacity-80 active:scale-[0.98]"
      style={{ borderColor: "var(--color-border)", background: "var(--color-card)", color: "var(--color-foreground)" }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615Z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
      </svg>
      {label}
    </button>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} />
      <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} />
    </div>
  );
}

function SubmitButton({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
      style={{ background: "var(--color-primary)" }}>
      {loading
        ? <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3"
              strokeDasharray="60" strokeDashoffset="20" strokeLinecap="round" />
          </svg>
        : children}
    </button>
  );
}

function BackLink({ onClick, label = "Back" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 transition-opacity hover:opacity-60"
      style={{ color: "var(--text-muted)" }}>
      <ArrowLeft className="w-3.5 h-3.5" /> {label}
    </button>
  );
}

function ViewHeading({ eyebrow, title, subtitle }: {
  eyebrow: string; title: string; subtitle?: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-px" style={{ background: "var(--color-primary)" }} />
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase"
          style={{ color: "var(--color-primary)" }}>{eyebrow}</span>
      </div>
      <h1 className="text-3xl font-extrabold mb-1" style={{ color: "var(--color-foreground)" }}>{title}</h1>
      {subtitle && <p className="text-sm" style={{ color: "var(--text-muted)" }}>{subtitle}</p>}
    </div>
  );
}

// ─── Left Panel ───────────────────────────────────────────────────────────────

function LeftPanel({ view }: { view: View }) {
  const isSignup = view === VIEWS.SIGNUP;
  return (
    <div className="hidden lg:flex lg:w-full h-full relative flex-col justify-between p-14 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/assets/images/bg/serviceCardBg2_1.jpg" alt="" fill
          className="object-cover object-right" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-y-0 left-0 w-1" style={{ background: "var(--color-primary)" }} />

      <div className="relative z-10">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
            style={{ background: "var(--color-primary)" }}>LF</div>
          <span className="text-white font-extrabold text-lg leading-tight">
            Lanark Fine<br />
            <span className="font-light text-white/60 text-sm">Tiles & Stone</span>
          </span>
        </Link>
      </div>

      <div className="relative z-10">
        <div className="w-12 h-0.5 mb-6" style={{ background: "var(--color-primary)" }} />
        {isSignup ? (
          <>
            <h2 className="text-2xl font-extrabold text-white mb-2">Why create an account?</h2>
            <p className="text-white/50 text-sm mb-8">
              Join hundreds of homeowners and contractors who manage their projects with us.
            </p>
            <ul className="flex flex-col gap-4">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(192,103,30,0.2)", border: "1px solid rgba(192,103,30,0.4)" }}>
                    <Check className="w-3 h-3" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <span className="text-white/75 text-sm leading-relaxed">{perk}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <blockquote className="text-3xl font-extrabold text-white leading-tight mb-4 max-w-sm">
              "Craftsmanship that<br />stands the test of time."
            </blockquote>
            <p className="text-white/50 text-sm">Premium tiles & natural stone, expertly installed.</p>
            <div className="flex items-center gap-6 mt-10">
              {["25+ Years", "5★ Rated", "Free Quotes"].map((b) => (
                <div key={b} className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: "var(--color-primary)" }}>{b}</div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="relative z-10">
        <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} Lanark Fine Tiles & Stone</p>
      </div>
    </div>
  );
}

// ─── View Components ──────────────────────────────────────────────────────────

function LoginView({ goTo }: { goTo: (v: View) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // TODO: real auth
    setLoading(false);
  };

  return (
    <>
      <ViewHeading eyebrow="Welcome Back" title="Sign in to your account"
        subtitle={<>Don't have an account?{" "}
          <button type="button" onClick={() => goTo(VIEWS.SIGNUP)}
            className="font-semibold hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-primary)" }}>Create one free</button></>}
      />
      <GoogleButton onClick={() => { /* TODO: Google OAuth */ }} />
      <div className="my-5"><Divider label="or sign in with email" /></div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField id="login-email" label="Email address" type="email" icon={Mail}
          placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
          autoComplete="email" />
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-pw" className="text-xs font-semibold tracking-wide"
              style={{ color: "var(--color-foreground)" }}>Password</label>
            <button type="button" onClick={() => goTo(VIEWS.FORGOT)}
              className="text-xs font-medium hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-primary)" }}>Forgot password?</button>
          </div>
          <InputField id="login-pw" type={showPw ? "text" : "password"} icon={Lock}
            placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            rightSlot={
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="hover:opacity-60 transition-opacity" style={{ color: "var(--text-muted)" }}>
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            } />
        </div>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input type="checkbox" className="accent-[var(--color-primary)]" />
          <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Keep me signed in</span>
        </label>
        <SubmitButton loading={loading}>Sign in <ArrowRight className="w-4 h-4" /></SubmitButton>
      </form>
    </>
  );
}

function SignUpView({ goTo }: { goTo: (v: View) => void }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [f]: e.target.value }));
  const strength = passwordStrength(form.password);
  const mismatch = form.confirm && form.confirm !== form.password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mismatch) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // TODO: real auth
    setLoading(false);
    goTo(VIEWS.VERIFY);
  };

  return (
    <>
      <ViewHeading eyebrow="New Account" title="Create your account"
        subtitle={<>Already have one?{" "}
          <button type="button" onClick={() => goTo(VIEWS.LOGIN)}
            className="font-semibold hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-primary)" }}>Sign in instead</button></>}
      />
      <GoogleButton onClick={() => { /* TODO: Google OAuth */ }} />
      <div className="my-5"><Divider label="or register with email" /></div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField id="su-name" label="Full name" icon={User} placeholder="Jane Smith"
          value={form.name} onChange={set("name")} autoComplete="name" />
        <InputField id="su-email" label="Email address" type="email" icon={Mail}
          placeholder="you@example.com" value={form.email} onChange={set("email")} autoComplete="email" />
        <div>
          <InputField id="su-pw" label="Password" type={showPw ? "text" : "password"} icon={Lock}
            placeholder="Min. 8 characters" value={form.password} onChange={set("password")}
            autoComplete="new-password"
            rightSlot={
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="hover:opacity-60 transition-opacity" style={{ color: "var(--text-muted)" }}>
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            } />
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1,2,3,4].map((n) => (
                  <div key={n} className="flex-1 h-1 rounded-full transition-all duration-300"
                    style={{ background: n <= strength ? STRENGTH_COLORS[strength] : "var(--color-border)" }} />
                ))}
              </div>
              <p className="text-xs" style={{ color: STRENGTH_COLORS[strength] }}>{STRENGTH_LABELS[strength]}</p>
            </div>
          )}
        </div>
        <InputField id="su-confirm" label="Confirm password" type={showConfirm ? "text" : "password"}
          icon={Lock} placeholder="Repeat your password" value={form.confirm} onChange={set("confirm")}
          autoComplete="new-password" error={mismatch ? "Passwords don't match" : ""}
          rightSlot={
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="hover:opacity-60 transition-opacity" style={{ color: "var(--text-muted)" }}>
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          } />
        <label className="flex items-start gap-3 cursor-pointer select-none mt-1">
          <input type="checkbox" required className="mt-0.5 accent-[var(--color-primary)]" />
          <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            I agree to the{" "}
            <Link href="/terms" className="underline underline-offset-2" style={{ color: "var(--color-primary)" }}>
              Terms of Service</Link> and{" "}
            <Link href="/privacy" className="underline underline-offset-2" style={{ color: "var(--color-primary)" }}>
              Privacy Policy</Link>
          </span>
        </label>
        <SubmitButton loading={loading}>Create account <ArrowRight className="w-4 h-4" /></SubmitButton>
      </form>
    </>
  );
}

function VerifyView({ goTo }: { goTo: (v: View) => void }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKey = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...code]; next[i] = val; setCode(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };
  const handleBackspace = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[i] && i > 0) inputs.current[i - 1]?.focus();
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) { setCode(pasted.split("")); inputs.current[5]?.focus(); }
  };
  const handleResend = async () => {
    setResent(true);
    await new Promise((r) => setTimeout(r, 500));
    setTimeout(() => setResent(false), 4000);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.join("").length < 6) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // TODO: verify OTP
    setLoading(false);
  };
  const filled = code.join("").length === 6;

  return (
    <>
      <BackLink onClick={() => goTo(VIEWS.SIGNUP)} label="Back to sign up" />
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "rgba(192,103,30,0.12)", border: "1px solid rgba(192,103,30,0.25)" }}>
        <ShieldCheck className="w-7 h-7" style={{ color: "var(--color-primary)" }} />
      </div>
      <ViewHeading eyebrow="Email Verification" title="Check your inbox"
        subtitle="We sent a 6-digit code to your email address. It expires in 10 minutes." />
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-xs font-semibold mb-3 tracking-wide"
            style={{ color: "var(--color-foreground)" }}>Verification code</label>
          <div className="flex gap-2.5" onPaste={handlePaste}>
            {code.map((digit, i) => (
              <input key={i} ref={(el) => { inputs.current[i] = el; }}
                type="text" inputMode="numeric" maxLength={1}
                value={digit} onChange={(e) => handleKey(i, e)}
                onKeyDown={(e) => handleBackspace(i, e)}
                className="flex-1 h-14 w-4 rounded-xl text-center text-xl font-bold outline-none transition-all duration-200"
                style={{
                  background: "var(--color-card)",
                  border: `2px solid ${digit ? "var(--color-primary)" : "var(--color-border)"}`,
                  color: "var(--color-foreground)",
                  boxShadow: digit ? "0 0 0 3px rgba(192,103,30,0.1)" : "none",
                }} />
            ))}
          </div>
        </div>
        <SubmitButton loading={loading}>
          {filled ? <><Check className="w-4 h-4" /> Verify & continue</> : <>Enter code above</>}
        </SubmitButton>
        <div className="text-center">
          <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
            Didn't receive it? Check your spam folder, or
          </p>
          <button type="button" onClick={handleResend}
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
            style={{ color: "var(--color-primary)" }}>
            <RefreshCw className={`w-3.5 h-3.5 ${resent ? "animate-spin" : ""}`} />
            {resent ? "Code sent!" : "Resend code"}
          </button>
        </div>
      </form>
      <div className="mt-6 p-4 rounded-xl flex items-start gap-3"
        style={{ background: "rgba(192,103,30,0.06)", border: "1px solid rgba(192,103,30,0.15)" }}>
        <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-primary)" }} />
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Make sure to check your spam or junk folder. The code is valid for 10 minutes.
        </p>
      </div>
    </>
  );
}

function ForgotView({ goTo }: { goTo: (v: View) => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // TODO: send reset email
    setLoading(false);
    setSent(true);
  };

  if (sent) return (
    <>
      <BackLink onClick={() => goTo(VIEWS.LOGIN)} label="Back to sign in" />
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}>
        <Check className="w-7 h-7" style={{ color: "#22c55e" }} />
      </div>
      <ViewHeading eyebrow="Email Sent" title="Check your inbox"
        subtitle={`We've sent a reset link to ${email}. It expires in 15 minutes.`} />
      <div className="p-4 rounded-xl flex items-start gap-3"
        style={{ background: "rgba(192,103,30,0.06)", border: "1px solid rgba(192,103,30,0.15)" }}>
        <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-primary)" }} />
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Check your spam folder if it doesn't arrive. The link expires in 15 minutes.
        </p>
      </div>
      <button type="button" onClick={() => { setSent(false); setEmail(""); }}
        className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
        style={{ color: "var(--color-primary)" }}>
        <RefreshCw className="w-3.5 h-3.5" /> Resend email
      </button>
    </>
  );

  return (
    <>
      <BackLink onClick={() => goTo(VIEWS.LOGIN)} label="Back to sign in" />
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "rgba(192,103,30,0.12)", border: "1px solid rgba(192,103,30,0.25)" }}>
        <KeyRound className="w-7 h-7" style={{ color: "var(--color-primary)" }} />
      </div>
      <ViewHeading eyebrow="Password Reset" title="Forgot your password?"
        subtitle="No problem. Enter your email and we'll send you a reset link right away." />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <InputField id="forgot-email" label="Email address" type="email" icon={Mail}
          placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
          autoComplete="email" />
        <SubmitButton loading={loading}>Send reset link <ArrowRight className="w-4 h-4" /></SubmitButton>
      </form>
    </>
  );
}

function ResetView({ goTo }: { goTo: (v: View) => void }) {
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [f]: e.target.value }));
  const strength = passwordStrength(form.password);
  const mismatch = form.confirm && form.confirm !== form.password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mismatch) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // TODO: update password via token
    setLoading(false);
    setDone(true);
  };

  if (done) return (
    <>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}>
        <Check className="w-7 h-7" style={{ color: "#22c55e" }} />
      </div>
      <ViewHeading eyebrow="All Done" title="Password updated!"
        subtitle="Your password has been reset. You can now sign in with your new password." />
      <button type="button" onClick={() => goTo(VIEWS.LOGIN)}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
        style={{ background: "var(--color-primary)" }}>
        Back to sign in <ArrowRight className="w-4 h-4" />
      </button>
    </>
  );

  return (
    <>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "rgba(192,103,30,0.12)", border: "1px solid rgba(192,103,30,0.25)" }}>
        <Lock className="w-7 h-7" style={{ color: "var(--color-primary)" }} />
      </div>
      <ViewHeading eyebrow="New Password" title="Reset your password"
        subtitle="Choose a strong password. You'll use this to sign in going forward." />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <InputField id="reset-pw" label="New password" type={showPw ? "text" : "password"} icon={Lock}
            placeholder="Min. 8 characters" value={form.password} onChange={set("password")}
            autoComplete="new-password"
            rightSlot={
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="hover:opacity-60 transition-opacity" style={{ color: "var(--text-muted)" }}>
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            } />
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1,2,3,4].map((n) => (
                  <div key={n} className="flex-1 h-1 rounded-full transition-all duration-300"
                    style={{ background: n <= strength ? STRENGTH_COLORS[strength] : "var(--color-border)" }} />
                ))}
              </div>
              <p className="text-xs" style={{ color: STRENGTH_COLORS[strength] }}>{STRENGTH_LABELS[strength]}</p>
            </div>
          )}
        </div>
        <InputField id="reset-confirm" label="Confirm new password"
          type={showConfirm ? "text" : "password"} icon={Lock}
          placeholder="Repeat your new password" value={form.confirm} onChange={set("confirm")}
          autoComplete="new-password" error={mismatch ? "Passwords don't match" : ""}
          rightSlot={
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="hover:opacity-60 transition-opacity" style={{ color: "var(--text-muted)" }}>
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          } />
        <SubmitButton loading={loading}>Set new password <ArrowRight className="w-4 h-4" /></SubmitButton>
      </form>
    </>
  );
}

// ─── Animated Panel ───────────────────────────────────────────────────────────

function AnimatedPanel({ children, viewKey }: { children: React.ReactNode; viewKey: string }) {
  const [displayed, setDisplayed] = useState(children);
  const [animClass, setAnimClass] = useState("auth-enter-active");

  useEffect(() => {
    setAnimClass("auth-exit-active");
    const t = setTimeout(() => {
      setDisplayed(children);
      setAnimClass("auth-enter-active");
    }, 180);
    return () => clearTimeout(t);
  }, [viewKey]); // eslint-disable-line

  return (
    <>
      <style>{`
        @keyframes authFadeUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes authFadeOut {
          from { opacity:1; transform:translateY(0); }
          to   { opacity:0; transform:translateY(-8px); }
        }
        .auth-enter-active { animation: authFadeUp 0.28s cubic-bezier(.22,1,.36,1) both; }
        .auth-exit-active  { animation: authFadeOut 0.18s ease both; }
      `}</style>
      <div className={animClass}>{displayed}</div>
    </>
  );
}

// ─── Root Client Component ────────────────────────────────────────────────────

interface AuthClientProps {
  initialView?: string;
}

export default function AuthClient({ initialView }: AuthClientProps) {
  const initial = (Object.values(VIEWS) as string[]).includes(initialView ?? "")
    ? (initialView as View)
    : VIEWS.LOGIN;

  const [view, setView] = useState<View>(initial);
  const showLeft = view === VIEWS.LOGIN || view === VIEWS.SIGNUP;

  const renderView = () => {
    switch (view) {
      case VIEWS.LOGIN:   return <LoginView  goTo={setView} />;
      case VIEWS.SIGNUP:  return <SignUpView  goTo={setView} />;
      case VIEWS.VERIFY:  return <VerifyView  goTo={setView} />;
      case VIEWS.FORGOT:  return <ForgotView  goTo={setView} />;
      case VIEWS.RESET:   return <ResetView   goTo={setView} />;
      default:            return <LoginView  goTo={setView} />;
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] flex overflow-hidden">
      {/* Left panel — collapses on utility views */}
      <div className="hidden lg:block overflow-hidden transition-all duration-500 ease-in-out"
        style={{ width: showLeft ? "48%" : "0%", opacity: showLeft ? 1 : 0 }}>
        <LeftPanel view={view} />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-14 overflow-y-auto transition-all duration-500"
        style={{ background: "var(--surface)" }}>
        <div className="w-full max-w-[440px] py-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs shrink-0"
              style={{ background: "var(--color-primary)" }}>LF</div>
            <span className="font-extrabold" style={{ color: "var(--color-foreground)" }}>
              Lanark Fine Tiles & Stone
            </span>
          </div>

          <AnimatedPanel viewKey={view}>{renderView()}</AnimatedPanel>

          <p className="text-center text-xs mt-8" style={{ color: "var(--text-muted)" }}>
            By continuing you agree to our{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:opacity-70">Privacy Policy</Link>{" "}
            &{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:opacity-70">Terms</Link>.
          </p>

          {/* Dev jump bar — auto-hidden in production */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 p-3 rounded-xl border flex flex-wrap gap-2 justify-center"
              style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}>
              <span className="w-full text-center text-[10px] font-bold uppercase tracking-widest mb-1"
                style={{ color: "var(--text-muted)" }}>Dev: jump to view</span>
              {(Object.values(VIEWS) as View[]).map((v) => (
                <button key={v} type="button" onClick={() => setView(v)}
                  className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: view === v ? "var(--color-primary)" : "var(--surface)",
                    color: view === v ? "#fff" : "var(--text-muted)",
                    border: "1px solid var(--color-border)",
                  }}>{v}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}