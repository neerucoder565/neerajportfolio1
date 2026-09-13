# Faster Skills Glow and Distinct Page Animations

## Changes
- Shorten the Skill Telemetry startup sequence so every skill finishes illuminating within 0.7 seconds after opening the Skills page.
- Preserve the existing skill layout and text-focused glow while avoiding stronger border glow.
- Add a reusable page entrance wrapper with a different motion style for Home, About, Experience, Projects, Skills, Hackathons, and Contact.
- Keep existing custom animations inside each page and respect reduced-motion preferences.

## Animation directions
- Home: soft rise and focus.
- About: reveal from the left.
- Experience: upward industrial-style reveal.
- Projects: perspective lift.
- Skills: quick energized scale-in.
- Hackathons: subtle angled reveal.
- Contact: signal-like reveal from the right.

## Verification
- Check the Skills sequence timing in the browser.
- Navigate through every main page and confirm each entrance is visible, smooth, and does not disturb layout.
- Confirm the project builds without errors.
