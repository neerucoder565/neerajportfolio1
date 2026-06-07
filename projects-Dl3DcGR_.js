import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { motion } from "motion/react";
import { X, ExternalLink, Code2 } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { S as Section } from "./router-DVzYtrYH.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import "@tanstack/react-query";
import "@tanstack/react-router";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const pidImg = "/assets/project-pid-BE9vxNMh.jpg";
const r2rImg = "/assets/project-r2r-CgOoAm7u.jpg";
const edgeVisionImg = "/assets/project-edge-vision-CyOd70hk.png";
const R2R_CODE = [
  {
    name: "r2r_dac.ino",
    language: "cpp",
    code: `void setup() {
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  for (int i = 0; i < 16; i++) {
    digitalWrite(2, (i >> 3) & 1); // MSB
    digitalWrite(3, (i >> 2) & 1);
    digitalWrite(4, (i >> 1) & 1);
    digitalWrite(5, i & 1);        // LSB

    int value = analogRead(A3);
    Serial.println(value);
    delay(200);
  }
}`
  }
];
const PID_CODE = [
  {
    name: "PID_1_motor_encoder_test.ino",
    language: "cpp",
    code: `// ============================================
// STAGE 1: Motor + Encoder Test
// Verify both motor and encoder work correctly
// Before attempting PID
// ============================================

#define RPWM 9        // PWM pin to BTS7960
#define R_EN 10       // Enable pin (if not hardwired to 5V)

#define ENCODER_A 2   // Encoder Channel A → Interrupt pin
#define ENCODER_B 3   // Encoder Channel B → Interrupt pin

volatile long encoderCount = 0;  // Counts encoder pulses
long lastCount = 0;
float rpm = 0;

// ── Interrupt Service Routine ──
// Called every time encoder A rises
void IRAM_ATTR encoderISR() {
  if (digitalRead(ENCODER_B) == HIGH) {
    encoderCount++;   // Forward
  } else {
    encoderCount--;   // Backward
  }
}

void setup() {
  Serial.begin(9600);

  // Motor pins
  pinMode(RPWM, OUTPUT);

  // Encoder pins
  pinMode(ENCODER_A, INPUT_PULLUP);
  pinMode(ENCODER_B, INPUT_PULLUP);

  // Attach interrupt on Encoder A
  attachInterrupt(digitalPinToInterrupt(ENCODER_A), encoderISR, RISING);

  Serial.println("=== Stage 1: Motor + Encoder Test ===");
  Serial.println("Motor spinning at 50% speed...");

  // Spin motor at 50%
  analogWrite(RPWM, 128);
}

void loop() {
  // Calculate RPM every 500ms
  delay(500);

  long currentCount = encoderCount;
  long pulses = currentCount - lastCount;
  lastCount = currentCount;

  // RPM formula:
  // pulses in 500ms → multiply by 2 for per second → divide by PPR → multiply by 60
  // We use 360 as estimated PPR — will calibrate in Stage 2
  float estimatedPPR = 360.0;
  rpm = (pulses / estimatedPPR) * 2.0 * 60.0;

  Serial.print("Encoder Count: ");
  Serial.print(currentCount);
  Serial.print("  |  RPM: ");
  Serial.println(rpm);
}`
  },
  {
    name: "PID_2_ppr_calibration.ino",
    language: "cpp",
    code: `// ============================================
// STAGE 2: PPR Calibration
// Rotate motor exactly 1 full revolution
// Count pulses → that is your real PPR
// ============================================

#define RPWM 9
#define ENCODER_A 2
#define ENCODER_B 3

volatile long encoderCount = 0;
bool motorRunning = false;
bool calibrationDone = false;

void encoderISR() {
  if (digitalRead(ENCODER_B) == HIGH) {
    encoderCount++;
  } else {
    encoderCount--;
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(RPWM, OUTPUT);
  pinMode(ENCODER_A, INPUT_PULLUP);
  pinMode(ENCODER_B, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(ENCODER_A), encoderISR, RISING);

  Serial.println("=== Stage 2: PPR Calibration ===");
  Serial.println("Instructions:");
  Serial.println("1. Mark a point on your motor shaft with a pen");
  Serial.println("2. Send 'S' in Serial Monitor to START motor");
  Serial.println("3. When shaft completes ONE full rotation, send 'X' to STOP");
  Serial.println("4. Read the PPR value shown");
}

void loop() {
  if (Serial.available()) {
    char cmd = Serial.read();

    // Start motor
    if (cmd == 'S' || cmd == 's') {
      encoderCount = 0;
      motorRunning = true;
      analogWrite(RPWM, 80); // Slow speed for accurate calibration
      Serial.println("Motor started! Watch the shaft...");
      Serial.println("Send 'X' when exactly ONE full rotation completes.");
    }

    // Stop motor and show PPR
    if (cmd == 'X' || cmd == 'x') {
      analogWrite(RPWM, 0);
      motorRunning = false;

      Serial.println("==============================");
      Serial.print("Your PPR = ");
      Serial.println(abs(encoderCount));
      Serial.println("Note this value for Stage 3 PID code!");
      Serial.println("==============================");
    }
  }
}`
  },
  {
    name: "PID_3_full_pid_control.ino",
    language: "cpp",
    code: `// ============================================
// STAGE 3: Full PID Speed + Position Control
// Speed PID  → maintains target RPM
// Position PID → rotates exact degrees
// ============================================

#define RPWM 9
#define ENCODER_A 2
#define ENCODER_B 3

// ── Replace with your PPR from Stage 2 ──
#define PPR 1420

// ── PID Gains — tune these ──
float Kp_speed = 1.0;
float Ki_speed = 0.8;
float Kd_speed = 0.0;

float Kp_pos = 3.0;
float Ki_pos = 0.0;
float Kd_pos = 0.2;

// ── Encoder ──
volatile long encoderCount = 0;

// ── PID variables ──
float speedError = 0, speedPrevError = 0, speedIntegral = 0;
float posError = 0,   posPrevError = 0,   posIntegral = 0;

// ── Timing ──
unsigned long lastTime = 0;
long lastEncoderCount = 0;

// ── Mode ──
// 0 = Speed Control
// 1 = Position Control
int mode = 0;

// ── Targets ──
float targetRPM = 50.0;          // Target speed in RPM
long targetPosition = 0;         // Target position in encoder pulses

void encoderISR() {
  if (digitalRead(ENCODER_B) == HIGH) {
    encoderCount++;
  } else {
    encoderCount--;
  }
}

// ── Apply PWM safely ──
void setMotorPWM(int pwm) {
  pwm = constrain(pwm, 0, 255);
  analogWrite(RPWM, pwm);
}

// ── Degrees to pulses ──
long degreesToPulses(float degrees) {
  return (long)((degrees / 360.0) * PPR);
}

void setup() {
  Serial.begin(9600);
  pinMode(RPWM, OUTPUT);
  pinMode(ENCODER_A, INPUT_PULLUP);
  pinMode(ENCODER_B, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(ENCODER_A), encoderISR, RISING);

  Serial.println("=== Stage 3: PID Motor Control ===");
  Serial.println("Commands:");
  Serial.println("  S<value>  → Set speed RPM    (e.g. S50)");
  Serial.println("  P<value>  → Set position deg (e.g. P360)");
  Serial.println("  X         → Stop motor");
  Serial.println("  R         → Reset encoder count");
  Serial.println("===================================");

  lastTime = millis();
}

void loop() {
  // ── Read Serial Commands ──
  if (Serial.available()) {
    String input = Serial.readStringUntil('\\n');
    input.trim();
    char cmd = input.charAt(0);
    float value = input.substring(1).toFloat();

    if (cmd == 'S' || cmd == 's') {
      mode = 0;
      targetRPM = value;
      speedIntegral = 0;
      Serial.print("Speed mode → Target RPM: ");
      Serial.println(targetRPM);
    }

    if (cmd == 'P' || cmd == 'p') {
      mode = 1;
      encoderCount = 0;   // Reset position
      targetPosition = degreesToPulses(value);
      posIntegral = 0;
      Serial.print("Position mode → Target degrees: ");
      Serial.print(value);
      Serial.print(" = ");
      Serial.print(targetPosition);
      Serial.println(" pulses");
    }

    if (cmd == 'X' || cmd == 'x') {
      setMotorPWM(0);
      Serial.println("Motor stopped.");
    }

    if (cmd == 'R' || cmd == 'r') {
      encoderCount = 0;
      Serial.println("Encoder reset to 0.");
    }
  }

  // ── PID Loop runs every 100ms ──
  unsigned long now = millis();
  if (now - lastTime >= 100) {
    float dt = (now - lastTime) / 1000.0; // seconds
    lastTime = now;

    // ── Speed PID ──
    if (mode == 0) {
      long currentCount = encoderCount;
      long pulses = currentCount - lastEncoderCount;
      lastEncoderCount = currentCount;

      float currentRPM = (pulses / (float)PPR) * (60.0 / dt);

      speedError    = targetRPM - currentRPM;
      speedIntegral += speedError * dt;
      float speedDerivative = (speedError - speedPrevError) / dt;
      speedPrevError = speedError;

      float output = (Kp_speed * speedError)
                   + (Ki_speed * speedIntegral)
                   + (Kd_speed * speedDerivative);

      setMotorPWM((int)output);

      // ── Serial Plotter output ──
      Serial.print("Target:");
      Serial.print(targetRPM);
      Serial.print(" RPM:");
      Serial.print(currentRPM);
      Serial.print(" PWM:");
      Serial.println((int)constrain(output, 0, 255));
    }

    // ── Position PID ──
    if (mode == 1) {
      long currentPos = encoderCount;

      posError    = targetPosition - currentPos;
      posIntegral += posError * dt;
      float posDerivative = (posError - posPrevError) / dt;
      posPrevError = posError;

      float output = (Kp_pos * posError)
                   + (Ki_pos * posIntegral)
                   + (Kd_pos * posDerivative);

      // Stop if close enough (within 5 pulses)
      if (abs(posError) <= 5) {
        setMotorPWM(0);
        Serial.println("Position reached!");
      } else {
        setMotorPWM((int)output);
      }

      // ── Serial Plotter output ──
      Serial.print("Target:");
      Serial.print(targetPosition);
      Serial.print(" Position:");
      Serial.print(currentPos);
      Serial.print(" Error:");
      Serial.println(posError);
    }
  }
}`
  }
];
const PROJECTS = [{
  id: "01",
  date: "2025-Q3",
  title: "Edge Vision Detection System",
  sub: "On-Device Vision on Resource-Constrained Hardware",
  image: edgeVisionImg,
  overview: "Real-time object detection and image preprocessing pipeline running on an FPGA-based preprocessing stage with the VEGA RISC-V processor. Designed for efficient feature extraction, noise reduction, and low-latency detection in hardware-constrained environments.",
  tech: ["FPGA", "VEGA RISC-V", "Image Processing", "Object Detection", "Edge AI"],
  outcomes: "Streamlined vision pipeline delivering low-latency detection on resource-constrained hardware."
}, {
  id: "02",
  date: "2025-Q2",
  title: "4-bit R-2R Ladder DAC",
  sub: "Arduino-driven Analog Output",
  image: r2rImg,
  overview: "Built and tested a 4-bit digital-to-analog converter using resistor ladder architecture and Arduino control logic. Verified voltage outputs across all 16 binary combinations.",
  tech: ["Arduino", "R-2R Ladder", "Breadboard", "Multimeter"],
  outcomes: "Stable linear voltage steps; demonstrated DAC fundamentals on bare hardware.",
  code: R2R_CODE
}, {
  id: "03",
  date: "2025-Q1",
  title: "Sensor Fusion Prototype",
  sub: "Embedded Motion Sensing",
  overview: "Integrated motion sensors and fusion algorithms on breadboard hardware. Explored complementary and Kalman-style filtering for orientation tracking.",
  tech: ["IMU", "Arduino", "Sensor Fusion", "Signal Processing"],
  outcomes: "Reliable orientation data from low-cost sensors via fused signal pipeline."
}, {
  id: "04",
  date: "2024-Q4",
  title: "PID Control System",
  sub: "Stability & Overshoot Reduction",
  image: pidImg,
  overview: "Studied and implemented proportional, integral and derivative control. Tuned parameters for stability, overshoot reduction and faster system response.",
  tech: ["Control Theory", "Arduino", "Simulation", "Tuning"],
  outcomes: "Hands-on intuition for PID tuning trade-offs across plant dynamics.",
  code: PID_CODE
}];
function CodeViewer({
  project
}) {
  const [open, setOpen] = useState(false);
  if (!project.code?.length) return null;
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { type: "button", className: "inline-flex items-center gap-1.5 text-[9px] tracking-[0.25em] uppercase border border-neon/40 text-neon px-2 py-1 hover:bg-neon/10 transition-colors", "aria-label": `View source code for ${project.title}`, children: [
      /* @__PURE__ */ jsx(Code2, { size: 11 }),
      "// View Code"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-4xl border-border bg-background/95 backdrop-blur", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, { className: "font-display uppercase tracking-wider text-xl", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-neon", children: [
          "PRJ_",
          project.id
        ] }),
        " ",
        project.title,
        " — Source"
      ] }) }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: project.code[0].name, className: "mt-2", children: [
        /* @__PURE__ */ jsx(TabsList, { className: "flex flex-wrap h-auto bg-card/40 border border-border", children: project.code.map((f) => /* @__PURE__ */ jsx(TabsTrigger, { value: f.name, className: "text-[10px] tracking-widest uppercase data-[state=active]:text-neon data-[state=active]:bg-background/60", children: f.name }, f.name)) }),
        project.code.map((f) => /* @__PURE__ */ jsx(TabsContent, { value: f.name, className: "mt-3", children: /* @__PURE__ */ jsx("pre", { className: "text-[11px] leading-relaxed font-mono text-foreground/90 bg-background/70 border border-border p-4 overflow-auto max-h-[60vh]", children: /* @__PURE__ */ jsx("code", { children: f.code }) }) }, f.name))
      ] })
    ] })
  ] });
}
function Projects() {
  return /* @__PURE__ */ jsx(Section, { eyebrow: "PROJECT INDEX", title: "Featured Work", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: PROJECTS.map((p, i) => /* @__PURE__ */ jsxs(motion.article, { initial: {
    opacity: 0,
    y: 20
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    margin: "-80px"
  }, transition: {
    duration: 0.5,
    delay: i * 0.08
  }, className: "corners relative border border-border bg-card/40 p-6 glow-border-hover group", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-neon tracking-[0.3em]", children: [
          "PRJ_",
          p.id
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-muted-foreground tracking-[0.25em]", children: [
          "// ",
          p.date
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
        p.code?.length ? /* @__PURE__ */ jsx(CodeViewer, { project: p }) : /* @__PURE__ */ jsx("span", { className: "text-[9px] tracking-[0.25em] uppercase border border-neon/40 text-neon/80 px-2 py-1", children: "// Code coming soon" }),
        /* @__PURE__ */ jsx(ExternalLink, { size: 16, className: "text-muted-foreground opacity-60" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative mb-4 aspect-[16/9] border border-border bg-background/40 overflow-hidden grid place-items-center", style: !p.image ? {
      backgroundImage: "linear-gradient(rgba(0,255,170,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.06) 1px, transparent 1px)",
      backgroundSize: "20px 20px"
    } : void 0, children: p.image ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("img", { src: p.image, alt: `${p.title} hardware build`, loading: "lazy", className: "absolute inset-0 w-full h-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px)"
      } }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 left-2 text-[9px] text-neon tracking-[0.3em] bg-background/70 px-2 py-1 border border-neon/30", children: "// LIVE BUILD" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)"
      } }),
      /* @__PURE__ */ jsx("div", { className: "text-[10px] text-neon tracking-[0.3em] relative", children: "// PHOTO COMING SOON" })
    ] }) }),
    /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl uppercase leading-tight", children: p.title }),
    /* @__PURE__ */ jsx("div", { className: "text-xs text-neon mt-1 tracking-widest", children: p.sub }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-muted-foreground leading-relaxed", children: p.overview }),
    /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap gap-1.5", children: p.tech.map((t) => /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-widest uppercase border border-border px-2 py-1 text-muted-foreground", children: t }, t)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-4 border-t border-border/60", children: [
      /* @__PURE__ */ jsx("div", { className: "text-[10px] text-neon tracking-[0.25em] mb-1", children: "// OUTCOME" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: p.outcomes })
    ] })
  ] }, p.id)) }) });
}
export {
  Projects as component
};
