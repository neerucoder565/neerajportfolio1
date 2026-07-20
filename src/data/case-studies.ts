// Case study catalog — populate placeholders with real assets later.
import pidBreadboard from "@/assets/pid-breadboard.jpeg";
import pidStepResponse from "@/assets/pid-step-response.png";
import pidBlockDiagram from "@/assets/pid-block-diagram.png";
import pidDemo from "@/assets/pid-demo.mp4";

import r2rBreadboard from "@/assets/r2r-breadboard.png";
import r2rScope from "@/assets/r2r-scope.png";
import r2rSchematic from "@/assets/r2r-schematic.png";
import r2rLiveSweep from "@/assets/r2r-live-sweep.mp4";
export type CaseStudySlug =
  | "bootloader"
  | "r2r-dac"
  | "pid-control"
  | "rtos";


export type GalleryItem = {
  src?: string;
  caption: string;
  kind?: "image" | "diagram" | "scope" | "pcb" | "flowchart";
};

export type VideoItem = {
  src?: string;
  poster?: string;
  title: string;
};

export type DownloadItem = {
  label: string;
  href?: string;
  kind: "report" | "slides" | "paper" | "repo" | "datasheet";
};

export type CaseStudy = {
  slug: CaseStudySlug;
  index: string; // PRJ_01 etc, or "RTOS"
  title: string;
  subtitle: string;
  status: "completed" | "ongoing";
  progress?: number; // 0..100 for ongoing
  duration: string;
  tech: string[];
  hero?: string; // hero image path

  overview: string;
  problem: string;
  objectives: string[];

  architecture: string;
  workingPrinciple: string;

  hardware: string[];
  software: string[];

  journey: string;
  decisions: { title: string; body: string }[];
  challenges: { title: string; solution: string }[];
  results: { label: string; value: string }[];

  gallery: GalleryItem[];
  videos: VideoItem[];
  downloads: DownloadItem[];
  repo?: string;

  improvements: string[];
  lessons: string[];
};

export const CASE_STUDIES: Record<CaseStudySlug, CaseStudy> = {
  bootloader: {
    slug: "bootloader",
    index: "PRJ_01",
    title: "Bare-Metal Bootloader",
    subtitle: "Custom firmware architecture on STM32F407VGT6",
    status: "completed",
    duration: "6 weeks · 2025 Q1",
    tech: ["STM32", "Bare-Metal", "Flash Memory", "Firmware", "Embedded C"],
    hero: "/bootloader-v2.png",

    overview:
      "A ground-up bare-metal bootloader for the STM32F407VGT6 that partitions internal flash, relocates the vector table, configures the main stack pointer and hands off cleanly to a secondary application image via the Reset Handler.",
    problem:
      "Off-the-shelf HAL bootloaders hide the memory model, vector table setup and stack pointer handoff behind abstraction layers, which makes it hard to reason about failure modes during firmware updates.",
    objectives: [
      "Partition internal flash manually into bootloader and application regions",
      "Perform explicit vector table relocation via SCB->VTOR",
      "Set the Main Stack Pointer (MSP) from the application vector table",
      "Jump to the application's Reset Handler with peripherals in a known state",
      "Keep the entire pipeline understandable in under a few hundred lines of C",
    ],

    architecture:
      "Flash is split into a Bootloader region (0x0800 0000) and an Application region at a fixed offset. On reset, the bootloader validates the application image, disables interrupts, relocates VTOR, loads MSP and branches to the app Reset Handler.",
    workingPrinciple:
      "Power-on → MCU boots the bootloader from 0x0800 0000 → performs sanity checks on the application region → clears peripheral state → SCB->VTOR = APP_BASE → __set_MSP(*(uint32_t*)APP_BASE) → jump to *(uint32_t*)(APP_BASE + 4).",

    hardware: [
      "STM32F407VGT6 Discovery board",
      "ST-Link V2 in-circuit programmer",
      "USB-UART bridge for logging",
    ],
    software: [
      "GCC ARM (arm-none-eabi)",
      "OpenOCD + ST-Link",
      "Custom linker script (bootloader + app regions)",
      "Startup file with vector table",
    ],

    journey:
      "Started by studying the Cortex-M4 boot sequence and memory map, then built the linker script to reserve the two regions. Iterated on VTOR/MSP handoff until the application ran independently of the bootloader.",
    decisions: [
      {
        title: "Bare-metal over HAL",
        body: "Direct register access made the boot sequence auditable and eliminated hidden HAL initialisation from the hot path.",
      },
      {
        title: "Fixed application base address",
        body: "A fixed offset keeps the app linker simple and lets both images be flashed independently.",
      },
    ],
    challenges: [
      {
        title: "Application ran under the debugger but not standalone",
        solution:
          "Root cause was missing vector table relocation. Setting SCB->VTOR before the jump restored correct interrupt handling.",
      },
      {
        title: "Hard fault immediately after jump",
        solution:
          "Application stack pointer was uninitialised. Loading MSP from the application vector table's first word fixed the fault.",
      },
    ],
    results: [
      { label: "Boot time", value: "< 50 ms" },
      { label: "Flash footprint", value: "~4 KB bootloader" },
      { label: "Handoff", value: "Stable across resets" },
    ],

    gallery: [
      { caption: "Flash memory map — bootloader / application partition", kind: "diagram" },
      { caption: "Boot sequence flowchart", kind: "flowchart" },
      { caption: "Vector table layout with VTOR offset", kind: "diagram" },
      { caption: "Live serial log of successful handoff", kind: "image" },
    ],
    videos: [{ title: "Live demo — bootloader → application handoff" }],
    downloads: [
      { label: "GitHub Repository", href: "https://github.com/Neeraj0410/BootLoader", kind: "repo" },
      { label: "Project Report (PDF)", kind: "report" },
      { label: "Presentation Deck", kind: "slides" },
    ],
    repo: "https://github.com/Neeraj0410/BootLoader",

    improvements: [
      "Add CRC verification of the application image before jump",
      "Support dual-bank A/B firmware slots with rollback",
      "Add UART-based firmware update protocol (XMODEM / custom)",
    ],
    lessons: [
      "The boundary between bootloader and application is fundamentally about vector table + stack pointer, nothing more.",
      "A minimal linker script is easier to reason about than a generated one.",
    ],
  },

  "r2r-dac": {
    slug: "r2r-dac",
    index: "PRJ_02",
    title: "4-bit R-2R Ladder DAC",
    subtitle: "Analog output from digital GPIO",
    status: "completed",
    duration: "3 weeks · 2025 Q2",
    tech: ["Arduino", "R-2R Ladder", "Altium", "Breadboard", "Analog"],
    hero: "/project-r2r.jpg",

    overview:
      "A 4-bit digital-to-analog converter built from an R-2R resistor ladder driven by an Arduino. Sweeps through all 16 binary combinations and produces evenly spaced analog voltage steps that were verified with a multimeter and scope.",
    problem:
      "Understand DAC fundamentals — resolution, monotonicity, linearity — by building one from discrete components rather than using an on-chip peripheral.",
    objectives: [
      "Design an R-2R ladder network with matched resistors",
      "Drive the ladder from four GPIO pins in sequence",
      "Verify 16 discrete output levels with lab instrumentation",
      "Document non-idealities: source impedance, GPIO voltage drop",
    ],

    architecture:
      "Four GPIO outputs feed an R-2R ladder whose Thevenin equivalent produces V_out = V_ref × N / 16. A small buffer stage isolates the ladder from downstream load.",
    workingPrinciple:
      "Each GPIO contributes a weighted current into the ladder node. Summed via superposition, the node voltage encodes the 4-bit input as a fraction of V_ref.",

    hardware: [
      "Arduino Uno",
      "Precision 1% resistors (R and 2R pairs)",
      "Breadboard + jumper wires",
      "Digital multimeter, oscilloscope",
    ],
    software: ["Arduino IDE sketch cycling 0..15 on 4 GPIOs"],

    journey:
      "Built the ladder on breadboard, characterised the output against theory, then documented deviations caused by GPIO drive strength and resistor tolerance.",
    decisions: [
      { title: "R-2R over binary-weighted", body: "R-2R uses only two resistor values → far easier to match and scales cleanly with resolution." },
    ],
    challenges: [
      {
        title: "Non-linear steps at low codes",
        solution: "Traced to GPIO logic-low not being a true 0 V. Documented as a source-impedance effect rather than a design bug.",
      },
    ],
    results: [
      { label: "Resolution", value: "4-bit / 16 levels" },
      { label: "Step size", value: "≈ V_ref / 16" },
      { label: "Linearity", value: "Monotonic across full sweep" },
    ],

    gallery: [
      {
        src: r2rBreadboard,
        caption: "Breadboard R-2R DAC implementation",
        kind: "image",
      },
      {
        src: r2rScope,
        caption: "Oscilloscope capture of staircase output",
        kind: "scope",
      },
      {
        src: r2rSchematic,
        caption: "R-2R ladder circuit schematic",
        kind: "diagram",
      },
    ],
    videos: [
      {
        title: "Live sweep through all 16 codes",
        src: r2rLiveSweep,
      },
    ],
    downloads: [
      {
        label: "GitHub Repository",
        href: "https://github.com/Neeraj0410/Digital-To-Analog-Converter-Using-R-2R-Resistor-Ladder",
        kind: "repo",
      },
      { label: "Project Report (PDF)", kind: "report" },
    ],
    repo: "https://github.com/Neeraj0410/Digital-To-Analog-Converter-Using-R-2R-Resistor-Ladder",

    improvements: [
      "Extend to 8-bit ladder for smoother output",
      "Add an op-amp output buffer with low output impedance",
      "Migrate the ladder to a proper PCB in Altium",
    ],
    lessons: [
      "GPIO voltage is not an ideal 0/3.3 V — real-world DACs must account for source impedance.",
      "Component tolerance directly limits DAC linearity.",
    ],
  },

  "pid-control": {
    slug: "pid-control",
    index: "PRJ_03",
    title: "Encoder-Based PID Motor Control",
    subtitle: "Stability, overshoot and response tuning",
    status: "completed",
    duration: "4 weeks · 2024 Q4",
    tech: ["Control Theory", "Arduino", "Embedded C", "PID", "Encoders"],
    hero: "/project-pid.jpg",

    overview:
      "A closed-loop motor control system using quadrature encoder feedback and a classic PID controller. Gains were tuned empirically to trade off overshoot, settling time and steady-state error.",
    problem:
      "An open-loop PWM drive cannot hold position or velocity under load. A feedback controller is required to reject disturbances and track a reference reliably.",
    objectives: [
      "Read a quadrature encoder in interrupts without missing counts",
      "Implement proportional, integral and derivative terms in embedded C",
      "Tune Kp, Ki, Kd for a stable response with minimal overshoot",
      "Log response data for step-input analysis",
    ],

    architecture:
      "Encoder → interrupt-driven counter → PID loop at fixed sample rate → PWM to H-bridge → motor → back to encoder. A UART link streams reference/measured values for offline plotting.",
    workingPrinciple:
      "Error = reference − measured. PID output = Kp·e + Ki·∫e dt + Kd·de/dt, saturated and mapped to a PWM duty cycle.",

    hardware: [
      "DC motor with quadrature encoder",
      "H-bridge driver",
      "Arduino Uno",
      "Bench PSU + USB-serial link",
    ],
    software: [
      "Custom PID loop in embedded C",
      "Interrupt-driven encoder decoding",
      "Serial logger for step-response capture",
    ],

    journey:
      "Started with P-only to build intuition, added I to eliminate steady-state error, then D to damp overshoot. Retuned after mechanical load changes.",
    decisions: [
      { title: "Fixed sample rate", body: "A fixed loop period keeps the discrete PID equations valid and simplifies gain tuning." },
      { title: "Anti-windup clamp", body: "The integral term is clamped when the PWM output saturates to prevent windup." },
    ],
    challenges: [
      { title: "Missed encoder counts at high speed", solution: "Moved decoding into a hardware-interrupt ISR and used a compact state-machine decoder." },
      { title: "Integral windup on large step inputs", solution: "Added output-saturation-aware integral clamping." },
    ],
    results: [
      { label: "Steady-state error", value: "≈ 0 counts" },
      { label: "Overshoot", value: "< 10%" },
      { label: "Loop rate", value: "1 kHz" },
    ],

    gallery: [
  {
    src: pidBreadboard,
    caption: "Breadboard build — Arduino, H-bridge and encoder motor",
    kind: "image",
  },
  {
    src: pidStepResponse,
    caption: "Step response — Target vs RPM vs PWM on serial plotter",
    kind: "scope",
  },
  {
    src: pidBlockDiagram,
    caption: "PID controller block diagram",
    kind: "diagram",
  },
    ],
    videos: [
      {
        title: "Live disturbance rejection under load",
        src: pidDemo,
      },
    ],
    downloads: [
      { label: "GitHub Repository", href: "https://github.com/Neeraj0410/Encoder-Based-PID-Motor-Control", kind: "repo" },
      { label: "Project Report (PDF)", kind: "report" },
    ],
    repo: "https://github.com/Neeraj0410/Encoder-Based-PID-Motor-Control",

    improvements: [
      "Auto-tuning via relay feedback (Åström–Hägglund)",
      "Cascade position + velocity loops",
      "Move implementation to STM32 with hardware timer encoder mode",
    ],
    lessons: [
      "PID gains are coupled — tune one term at a time and log responses.",
      "Anti-windup matters as much as the gains themselves.",
    ],
  },




  rtos: {
    slug: "rtos",
    index: "RTOS",
    title: "RTOS Traffic Controller Monitor",
    subtitle: "Real-time task scheduling on embedded target",
    status: "ongoing",
    progress: 40,
    duration: "In development · 2026",
    tech: ["FreeRTOS", "STM32", "Scheduling", "IPC", "Embedded C"],
    hero: undefined,

    overview:
      "A traffic-light controller and monitoring system built on an RTOS. Uses cooperative tasks for signal timing, sensor sampling, fault monitoring and a serial telemetry interface.",
    problem:
      "A super-loop implementation cannot guarantee timing across concurrent responsibilities. A preemptive scheduler with prioritised tasks and IPC primitives is a better fit for real-time behaviour.",
    objectives: [
      "Model each responsibility as an independent task with a clear period",
      "Use queues and semaphores for inter-task communication",
      "Add a monitor task that detects timing violations and faults",
      "Expose telemetry over UART for live inspection",
    ],

    architecture:
      "Signal-timing task, sensor-sampling task, monitor task and telemetry task cooperate via queues and semaphores under an RTOS scheduler on an STM32 target.",
    workingPrinciple:
      "The scheduler runs each task at its declared priority and period; tasks communicate exclusively through RTOS primitives so timing can be reasoned about per-task.",

    hardware: [
      "STM32 target board",
      "Traffic-light indicator hardware (LEDs)",
      "Optional vehicle-detection sensors",
      "USB-UART bridge",
    ],
    software: [
      "FreeRTOS kernel",
      "Task modules (signal, sensor, monitor, telemetry)",
      "Queue/semaphore-based IPC",
    ],

    journey:
      "Currently designing task decomposition and priority assignment. Next milestone is a working signal-timing task plus telemetry, followed by the monitor task.",
    decisions: [
      { title: "Preemptive scheduling", body: "Preemption keeps the monitor task responsive even when lower-priority work is heavy." },
    ],
    challenges: [
      { title: "Priority inversion risk on shared resources", solution: "Planned: use mutexes with priority inheritance for all shared state." },
    ],
    results: [
      { label: "Status", value: "Architecture + scheduling design complete" },
      { label: "Next", value: "Signal-timing + telemetry tasks" },
    ],

    gallery: [
      { caption: "Task decomposition diagram", kind: "diagram" },
      { caption: "Priority + period table", kind: "diagram" },
      { caption: "IPC graph (queues + semaphores)", kind: "diagram" },
    ],
    videos: [{ title: "Demo — pending" }],
    downloads: [
      { label: "Design Notes (PDF)", kind: "report" },
    ],

    improvements: [
      "Add pedestrian request handling",
      "Add fault-injection test harness",
      "Migrate telemetry to a small binary protocol",
    ],
    lessons: [
      "Task decomposition is the highest-leverage decision in an RTOS design.",
      "Priority assignment must be revisited whenever a new shared resource appears.",
    ],
  },
};

export const CASE_STUDY_ORDER: CaseStudySlug[] = [
  "bootloader",
  "r2r-dac",
  "pid-control",
  "rtos",
];

