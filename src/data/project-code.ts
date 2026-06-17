// Raw source code embedded for in-portfolio viewing.
// Each project may expose one or more code files.

export type CodeFile = { name: string; language: string; code: string };

export const EDGE_VISION_CODE: CodeFile[] = [
  {
    name: "inference.py",
    language: "python",
    code: `"""
Edge Vision Detection — Inference Module
----------------------------------------
Image Quality Assessment (IQA) + task-driven object detection
using a YOLO backbone. Designed to pair with an FPGA preprocessing
stage that handles denoise / deblur / contrast correction when
the IQA module flags low-quality input.

DVCon India 2026 — Team ARCH NOVA
"""

from __future__ import annotations

import cv2
import numpy as np
from PIL import Image, ImageDraw
from ultralytics import YOLO

# ---------------------------------------------------------------------------
# Task definitions (COCO-Tasks dataset)
# ---------------------------------------------------------------------------
TASK_OBJECTS: dict[int, list[str]] = {
    1:  ["chair", "bench", "bed", "suitcase"],
    2:  ["bed", "couch", "chair", "bench"],
    3:  ["vase", "bowl", "cup", "bottle"],
    4:  ["fork", "spoon", "knife"],
    5:  ["bottle", "cup", "bowl", "vase"],
    6:  ["spoon", "fork", "knife", "cup"],
    7:  ["fork", "knife", "spoon"],
    8:  ["bottle", "knife", "scissors", "fork"],
    9:  ["scissors", "knife", "fork", "bottle"],
    10: ["wine glass", "cup", "bowl", "bottle"],
    11: ["bowl", "cup", "spoon", "bottle"],
    12: ["knife", "spoon", "fork"],
    13: ["fire hydrant", "bottle", "bowl"],
    14: ["baseball bat", "bottle", "umbrella", "tennis racket"],
}

TASK_NAMES: dict[int, str] = {
    1:  "Step on something to reach shelf",
    2:  "Sit comfortably",
    3:  "Place flowers",
    4:  "Get potatoes out of fire",
    5:  "Water plant",
    6:  "Get lemon out of tea",
    7:  "Dig hole",
    8:  "Open bottle of beer",
    9:  "Open parcel",
    10: "Serve wine",
    11: "Pour sugar",
    12: "Smear butter",
    13: "Extinguish fire",
    14: "Pound carpet",
}

# ---------------------------------------------------------------------------
# IQA thresholds (tuned empirically on validation set)
# ---------------------------------------------------------------------------
T_BLUR     = 100.0   # Laplacian variance — below = blurry
T_NOISE    = 500.0   # Pixel variance     — above = noisy
T_CONTRAST = 40.0    # Histogram std-dev  — below = low contrast

# Lazy-loaded model handle
_MODEL: YOLO | None = None


def load_model(weights: str = "yolo11n.pt") -> YOLO:
    """Load (and cache) the YOLO detector."""
    global _MODEL
    if _MODEL is None:
        _MODEL = YOLO(weights)
    return _MODEL


# ---------------------------------------------------------------------------
# Image Quality Assessment
# ---------------------------------------------------------------------------
def assess_quality(image_path: str) -> dict:
    """Return blur / noise / contrast scores and an overall verdict."""
    img  = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    blur_score  = round(cv2.Laplacian(gray, cv2.CV_64F).var(), 2)
    noise_score = round(float(np.var(gray)), 2)

    hist = cv2.calcHist([gray], [0], None, [256], [0, 256]).flatten()
    hist = hist / hist.sum()
    k    = np.arange(256)
    mu   = float(np.sum(k * hist))
    contrast_score = round(float(np.sqrt(np.sum(((k - mu) ** 2) * hist))), 2)

    is_blurry       = blur_score  < T_BLUR
    is_noisy        = noise_score > T_NOISE
    is_low_contrast = contrast_score < T_CONTRAST

    return {
        "blur_score":      blur_score,
        "noise_score":     noise_score,
        "contrast_score":  contrast_score,
        "is_blurry":       is_blurry,
        "is_noisy":        is_noisy,
        "is_low_contrast": is_low_contrast,
        "quality": "Low" if (is_blurry or is_noisy or is_low_contrast) else "High",
    }


# ---------------------------------------------------------------------------
# Task-driven object detection
# ---------------------------------------------------------------------------
def detect_best_object(image_path: str, task_id: int):
    """
    Run detection and select the highest-priority object for the given task.
    Returns: (annotated_image, best_class_name | None, best_confidence | -1)
    """
    model      = load_model()
    preferred  = TASK_OBJECTS[task_id]
    detections = model(image_path, verbose=False)[0]

    image = Image.open(image_path).convert("RGB")
    draw  = ImageDraw.Draw(image)

    best_box, best_class, best_conf, best_score = None, None, -1.0, -1.0

    for box in detections.boxes:
        class_name = model.names[int(box.cls)]
        confidence = float(box.conf)
        x1, y1, x2, y2 = box.xyxy[0].tolist()

        # Draw every detection in red
        draw.rectangle([x1, y1, x2, y2], outline="red", width=2)

        if class_name in preferred:
            priority = preferred.index(class_name)
            score    = (len(preferred) - priority) * 10 + confidence
            if score > best_score:
                best_score = score
                best_box   = [x1, y1, x2, y2]
                best_class = class_name
                best_conf  = confidence

    # Highlight the winner in lime green
    if best_box is not None:
        x1, y1, x2, y2 = best_box
        draw.rectangle([x1, y1, x2, y2], outline="lime", width=5)
        draw.rectangle([x1, y1 - 25, x2, y1], fill="lime")
        draw.text(
            (x1 + 5, y1 - 20),
            f"BEST: {best_class} ({best_conf:.0%})",
            fill="black",
        )

    return image, best_class, best_conf
`,
  },
  {
    name: "app.py",
    language: "python",
    code: `"""
Edge Vision Detection — Streamlit Frontend
------------------------------------------
Interactive demo: upload an image, run IQA, then run task-driven
object detection. The IQA stage mirrors the FPGA preprocessing
pipeline used in the hardware deployment.

Run:
    streamlit run app.py
"""

import os
import tempfile

import streamlit as st
from PIL import Image

from inference import (
    TASK_NAMES,
    TASK_OBJECTS,
    T_BLUR,
    T_CONTRAST,
    T_NOISE,
    assess_quality,
    detect_best_object,
)

# ---------------------------------------------------------------------------
# Page config
# ---------------------------------------------------------------------------
st.set_page_config(
    page_title="Task Driven Object Detection",
    page_icon="🎯",
    layout="wide",
)

st.title("🎯 Task Driven Object Detection")
st.write("DVCon India 2026 — Design Contest | Team ARCH NOVA")
st.divider()

# ---------------------------------------------------------------------------
# Sidebar — task selection
# ---------------------------------------------------------------------------
st.sidebar.title("⚙️  Settings")
task_id = st.sidebar.selectbox(
    "Select Task:",
    options=list(TASK_NAMES.keys()),
    format_func=lambda x: f"Task {x}: {TASK_NAMES[x]}",
)
st.sidebar.info(
    f"**Task {task_id}:** {TASK_NAMES[task_id]}\\n\\n"
    "**Looking for:**\\n"
    + "\\n".join(f"- {obj}" for obj in TASK_OBJECTS[task_id])
)

# ---------------------------------------------------------------------------
# Main panel
# ---------------------------------------------------------------------------
uploaded = st.file_uploader("Upload Image", type=["jpg", "jpeg", "png"])

if not uploaded:
    st.info("Upload an image to start.")
    st.stop()

image  = Image.open(uploaded).convert("RGB")
suffix = ".jpg" if uploaded.name.lower().endswith(("jpg", "jpeg")) else ".png"

with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as f:
    image.save(f.name)
    temp_path = f.name

col1, col2 = st.columns(2)
with col1:
    st.subheader("Original Image")
    st.image(image, use_container_width=True)

# ---------------------------------------------------------------------------
# IQA stage
# ---------------------------------------------------------------------------
st.divider()
st.subheader("Image Quality Assessment")

qr = assess_quality(temp_path)
m1, m2, m3 = st.columns(3)

with m1:
    st.metric("Blur Score (Laplacian Variance)", qr["blur_score"],
              delta=f"Threshold: {T_BLUR}", delta_color="off")
    (st.error if qr["is_blurry"] else st.success)(
        f"{'🔴 BLURRY' if qr['is_blurry'] else '🟢 Sharp'} (threshold {T_BLUR})"
    )

with m2:
    st.metric("Noise Score (Pixel Variance)", qr["noise_score"],
              delta=f"Threshold: {T_NOISE}", delta_color="off")
    (st.error if qr["is_noisy"] else st.success)(
        f"{'🔴 NOISY' if qr['is_noisy'] else '🟢 Clean'} (threshold {T_NOISE})"
    )

with m3:
    st.metric("Contrast Score (Histogram σ)", qr["contrast_score"],
              delta=f"Threshold: {T_CONTRAST}", delta_color="off")
    (st.error if qr["is_low_contrast"] else st.success)(
        f"{'🔴 LOW CONTRAST' if qr['is_low_contrast'] else '🟢 Good Contrast'} "
        f"(threshold {T_CONTRAST})"
    )

st.divider()
if qr["quality"] == "High":
    st.success("Overall Quality: HIGH — no preprocessing needed.")
else:
    st.warning("Overall Quality: LOW — preprocessing required "
               "(handled by FPGA in hardware).")

# ---------------------------------------------------------------------------
# Detection stage
# ---------------------------------------------------------------------------
st.divider()
if st.button("▶ Detect Best Object", type="primary", use_container_width=True):
    with st.spinner("Detecting..."):
        result_img, best_class, best_conf = detect_best_object(temp_path, task_id)

    with col2:
        st.subheader("Detection Result")
        st.image(result_img, use_container_width=True)
        if best_class:
            st.success(
                f"Best Object: **{best_class}**  |  "
                f"Confidence: **{best_conf:.0%}**"
            )
        else:
            st.warning("No suitable object found for this task.")

os.unlink(temp_path)

st.divider()
st.caption(
    "DVCon India 2026  |  Task Driven Object Detection  |  "
    "COCO-Tasks Dataset  |  Team ARCH NOVA"
)
`,
  },
];


export const R2R_CODE: CodeFile[] = [
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
}`,
  },
];

export const PID_CODE: CodeFile[] = [
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
}`,
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
}`,
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
}`,
  },
];

export const BOOTLOADER_CODE: CodeFile[] = [
  {
    name: "main_bootloader.c",
    language: "c",
    code: `/**
 ******************************************************************************
 * @file           : main.c
 * @author         : Auto-generated by STM32CubeIDE
 * @brief          : Main program body
 ******************************************************************************
 * @attention
 *
 * Copyright (c) 2026 STMicroelectronics.
 * All rights reserved.
 *
 * This software is licensed under terms that can be found in the LICENSE file
 * in the root directory of this software component.
 * If no LICENSE file comes with this software, it is provided AS-IS.
 *
 ******************************************************************************
 */
#include <stdint.h>

#define RCC_AHB1ENR (*(volatile uint32_t*)0x40023830)
#define GPIOC_MODER (*(volatile uint32_t*)0x40020800)
#define GPIOC_ODR   (*(volatile uint32_t*)0x40020814)

void delay(void)
{
    for(volatile uint32_t i = 0; i < 100000; i++);
}

int main(void)
{
    RCC_AHB1ENR |= (1 << 2);

    GPIOC_MODER &= ~(3 << (13 * 2));
    GPIOC_MODER |=  (1 << (13 * 2));

    while(1)
    {
        GPIOC_ODR ^= (1 << 13);
        delay();
    }
}`,
  },
  {
    name: "main_application.c",
    language: "c",
    code: `/**
 ******************************************************************************
 * @file           : main.c
 * @author         : Auto-generated by STM32CubeIDE
 * @brief          : Main program body
 ******************************************************************************
 * @attention
 *
 * Copyright (c) 2026 STMicroelectronics.
 * All rights reserved.
 *
 * This software is licensed under terms that can be found in the LICENSE file
 * in the root directory of this software component.
 * If no LICENSE file comes with this software, it is provided AS-IS.
 *
 ******************************************************************************
 */
#include <stdint.h>

#define RCC_AHB1ENR (*(volatile uint32_t*)0x40023830)
#define GPIOC_MODER (*(volatile uint32_t*)0x40020800)
#define GPIOC_ODR   (*(volatile uint32_t*)0x40020814)

void delay(void)
{
    for(volatile uint32_t i = 0; i < 2000000; i++);
}

int main(void)
{
    RCC_AHB1ENR |= (1 << 2);

    GPIOC_MODER &= ~(3 << (13 * 2));
    GPIOC_MODER |=  (1 << (13 * 2));

    while(1)
    {
        GPIOC_ODR ^= (1 << 13);
        delay();
    }
}`,
  },
];
