# Loom Video - Visual Shot List & Storyboard
## What to show on screen at each timestamp

---

## VISUAL REFERENCE - SCREENSHOT NOTES

This tells you EXACTLY what should be visible on screen at each point in the video.

---

### **SECTION 1: INTRODUCTION (0:00-1:00)**

| Timestamp | Screen | What to Do |
|-----------|--------|-----------|
| 0:00-0:10 | VS Code - Project Root | Open folder in explorer, show full tree (server/, client/, implementation_plan.md) |
| 0:10-0:20 | VS Code - implementation_plan.md | Scroll to the mermaid diagram showing 3-layer architecture |
| 0:20-0:45 | Narrate with architecture diagram visible | Point to Frontend box, Backend box, Database box with cursor |
| 0:45-1:00 | Browser - Homepage (college list) | Switch tab to show the running app working |

**Narration Cue:** "Hi! Today I'm walking you through..." (see main script)

---

### **SECTION 2A: AUTH CONTEXT (1:00-1:45)**

| Timestamp | Screen | What to Do |
|-----------|--------|-----------|
| 1:00-1:05 | VS Code - client/lib/auth-context.tsx | Open the file (Ctrl+P, search for "auth-context") |
| 1:05-1:15 | auth-context.tsx | Highlight the useEffect hook that loads from localStorage (lines ~20-27) |
| 1:15-1:25 | auth-context.tsx | Highlight login() function (lines ~28-33) |
| 1:25-1:35 | auth-context.tsx | Highlight logout() function (lines ~34-39) |
| 1:35-1:45 | auth-context.tsx | Show the AuthProvider return JSX with value prop (lines ~40-45) |

**Visual Cue:** Use Shift+Click to highlight the lines you're discussing.

**Narration Cue:** "For state management, I used React Context API..." (see main script 1:00-1:45)

---

### **SECTION 2B: COMPARE CONTEXT (1:45-2:15)**

| Timestamp | Screen | What to Do |
|-----------|--------|-----------|
| 1:45-1:50 | VS Code - client/lib/compare-context.tsx | Open this file |
| 1:50-2:00 | compare-context.tsx | Scroll to show the localStorage key generation (line ~30: `storageKey = user ? ...`) |
| 2:00-2:10 | compare-context.tsx | Highlight the useEffect that loads from localStorage (lines ~32-45) |
| 2:10-2:15 | compare-context.tsx | Highlight how it filters for user-specific keys |

**Narration Cue:** "Second, CompareContext manages which colleges..." (see main script 1:45-2:15)

---

### **SECTION 2C: API LAYER (2:15-2:45)**

| Timestamp | Screen | What to Do |
|-----------|--------|-----------|
| 2:15-2:20 | VS Code - client/lib/api.ts | Open the file |
| 2:20-2:30 | api.ts | Highlight getAuthHeaders() function at the top |
| 2:30-2:37 | api.ts | Highlight fetchAPI() wrapper function (including error handling) |
| 2:37-2:45 | api.ts | Scroll down to show authAPI, collegesAPI, savedAPI namespaced exports |

**Visual Cue:** Scroll slowly so viewers can read the code.

**Narration Cue:** "Next, let's look at the API layer..." (see main script 2:15-2:45)

---

### **SECTION 2D: FRONTEND PAGES (2:45-3:30)**

| Timestamp | Screen | What to Do |
|-----------|--------|-----------|
| 2:45-2:55 | VS Code - app/page.tsx | Open the college listing page |
| 2:55-3:05 | app/page.tsx | Show the JSX structure (search bar, filter inputs) |
| 3:05-3:10 | Browser - http://localhost:3000 | Switch to browser, show the college listing UI |
| 3:10-3:15 | Browser | Perform a search (e.g., search "MIT") to show it works |
| 3:15-3:20 | VS Code - app/college/[id]/page.tsx | Open the detail page |
| 3:20-3:25 | Browser | Click on a college to navigate to detail page (/college/1) |
| 3:25-3:30 | VS Code - app/compare/page.tsx | Show the compare page structure; then switch to browser |
| 3:25-3:30 | Browser - /compare | Switch to the compare page in browser |

**Visual Cue:** Alternate between code and running app to show structure → implementation.

**Narration Cue:** "The main page shows a list of colleges..." (see main script 2:45-3:30)

---

### **SECTION 3A: SERVER SETUP (3:30-4:15)**

| Timestamp | Screen | What to Do |
|-----------|--------|-----------|
| 3:30-3:40 | VS Code - server/src/index.ts | Open the file (Ctrl+P, search "index.ts") |
| 3:40-3:50 | index.ts | Show the imports and CORS config (lines 1-10) |
| 3:50-4:00 | index.ts | Highlight the start() async function (line ~20) |
| 4:00-4:10 | index.ts | Highlight the auto-seed logic (lines ~25-30) |
| 4:10-4:15 | Terminal | Show the server running (should have "🚀 Server running on http://localhost:5000") |

**Visual Cue:** Keep both code and terminal visible if possible (split VS Code).

**Narration Cue:** "The backend is an Express server..." (see main script 3:30-4:15)

---

### **SECTION 3B: MIDDLEWARE (4:15-5:00)**

| Timestamp | Screen | What to Do |
|-----------|--------|-----------|
| 4:15-4:25 | VS Code - server/src/middleware/auth.ts | Open the file |
| 4:25-4:35 | auth.ts | Highlight authMiddleware function |
| 4:35-4:50 | auth.ts | Highlight optionalAuth function |
| 4:50-5:00 | auth.ts | Highlight the JWT verification logic (jwt.verify call) |

**Narration Cue:** "Here's the authentication middleware..." (see main script 4:15-5:00)

---

### **SECTION 3C: COLLEGES ROUTE (5:00-5:45)**

| Timestamp | Screen | What to Do |
|-----------|--------|-----------|
| 5:00-5:10 | VS Code - server/src/routes/colleges.ts | Open the file |
| 5:10-5:20 | colleges.ts | Show the route handler start (the GET / endpoint) |
| 5:20-5:30 | colleges.ts | Highlight the dynamic WHERE clause building (lines ~15-30) |
| 5:30-5:40 | colleges.ts | Highlight parameterized query usage ($${paramIndex}) |
| 5:40-5:50 | colleges.ts | Show the ORDER BY with sortOptions |
| 5:50-6:00 | colleges.ts (last part visible) | Show the final query with pagination (LIMIT, OFFSET) |

**Visual Cue:** Use keyboard shortcut Ctrl+G to jump to specific line numbers if needed.

**Narration Cue:** "The colleges endpoint supports search, filtering, sorting, and pagination..." (see main script 5:00-5:45)

---

### **SECTION 3D: AUTH ROUTES (5:45-6:15)**

| Timestamp | Screen | What to Do |
|-----------|--------|-----------|
| 5:45-5:55 | VS Code - server/src/routes/auth.ts | Open the file |
| 5:55-6:05 | auth.ts | Show the registration POST endpoint |
| 6:05-6:15 | auth.ts | Show the login POST endpoint, highlight bcryptjs comparison |

**Narration Cue:** "Auth routes handle registration and login..." (see main script 5:45-6:15)

---

### **SECTION 4: EDGE CASES & TRADEOFFS (6:15-8:30)**

| Timestamp | Screen | What to Do |
|-----------|--------|-----------|
| 6:15-8:30 | **NARRATOR FOCUSED** | You can show code snippets, diagrams, or keep VS Code visible while narrating |
| Optional: 7:00-7:15 | Diagram or table | Create a visual showing the tradeoff table (Context API vs Redux, etc.) |
| Optional: 7:30-7:45 | Browser | Show the app UI and point out accessibility issues (lack of ARIA labels) |

**Narration Cue:** "Let me walk through the edge cases I handled..." (see main script 6:15-8:30)

---

### **SECTION 5: CONCLUSION & DEMO (8:30-10:00)**

| Timestamp | Screen | What to Do |
|-----------|--------|-----------|
| 8:30-8:40 | Browser - http://localhost:3000 | Show the homepage (college listing) |
| 8:40-8:50 | Browser | Perform a search (e.g., "Harvard") |
| 8:50-9:00 | Browser | Click on a college result to view details |
| 9:00-9:10 | Browser | Click back or go to home, then navigate to /compare |
| 9:10-9:20 | Browser - /compare | Select 2-3 colleges from the dropdown/list |
| 9:20-9:30 | Browser - /compare | Show the comparison side-by-side |
| 9:30-9:40 | Browser - /login | Navigate to login page, show the form |
| 9:40-9:50 | Browser | Narrate while showing key takeaways |
| 9:50-10:00 | VS Code (or screen fade) | End with VS Code showing the project structure or narrate improvements |

**Narration Cue:** "So to recap, here's what this architecture achieves..." (see main script 8:30-10:00)

---

## QUICK CHECKLIST: WHAT TO HAVE OPEN DURING RECORDING

Before you hit record, have these ready:

### **Tab 1: VS Code**
- [ ] File explorer visible (Show server/ and client/ folders)
- [ ] Have these files open in tabs:
  - [ ] implementation_plan.md
  - [ ] client/lib/auth-context.tsx
  - [ ] client/lib/compare-context.tsx
  - [ ] client/lib/api.ts
  - [ ] server/src/index.ts
  - [ ] server/src/middleware/auth.ts
  - [ ] server/src/routes/colleges.ts
  - [ ] server/src/routes/auth.ts

### **Tab 2: Terminal**
- [ ] Show the backend running (`npm run dev` in server/)
- [ ] Should display: "🚀 Server running on http://localhost:5000"

### **Tab 3: Browser**
- [ ] http://localhost:3000 loaded and working
- [ ] Homepage showing college list
- [ ] Ready to navigate to search, detail, login, compare, saved pages

### **Tab 4: Loom (Recording)**
- [ ] Loom window ready to record
- [ ] Cursor highlight enabled (settings)
- [ ] Microphone tested
- [ ] Recording quality set to HD

---

## TIMING NOTES FOR PACING

If you're running over time:
- **Cut 30 seconds from:** Section 4A (Auth edge cases)
- **Cut 30 seconds from:** Section 4B (Data integrity edge cases)
- **Keep:** Sections 1, 2, 3, 5 (essential architecture)
- **Result:** ~7 minute video instead of 10 minutes

If you're under time:
- **Add 1-2 minutes:** Deep dive into database schema in Section 3B
- **Add 1-2 minutes:** Show more API endpoints (saved routes, compare endpoint)
- **Add 1-2 minutes:** Perform more actions in the app during conclusion

---

## LOOM RECORDING SETTINGS CHECKLIST

- [ ] Set camera/input to main monitor (not second monitor)
- [ ] Mic level is good (test first 10 seconds, adjust if needed)
- [ ] System sound is OFF (only voice should record)
- [ ] Recording quality set to 1440p or 1080p HD
- [ ] Frame rate: 30 fps (standard, works with all browsers)
- [ ] Zoom/Pan: Disabled (you'll add effects in post if needed)

---

## POST-RECORDING EDITING CHECKLIST

In Loom's editor:
- [ ] Trim intro (if you had false starts)
- [ ] Trim outro (if you said "ok, that's it!" but paused)
- [ ] Auto-captions: Review and correct technical terms
  - Fix: "JWT" (not "J double-you T")
  - Fix: "PostgreSQL" (not "Postgres SQL")
  - Fix: "Context API" (not "context A P I")
- [ ] Add text overlays for key terms (14-16 pt font, 2-3 seconds each):
  - "Context API - State management library"
  - "REST API - Standard way for apps to talk"
  - "JWT Token - Secure authentication token"
  - "Parameterized Query - Protection against SQL injection"
  - "Idempotent - Safe to call multiple times"
- [ ] Zoom/pan effects: Slow down when showing dense code (maybe 1.2x-1.5x zoom)
- [ ] Add video description with:
  - Project name: "College Finder Platform - Architecture & Design"
  - GitHub link (if you have one)
  - Timestamps:
    - 0:00 - Intro
    - 1:00 - Frontend: Context API
    - 2:15 - Frontend: API Layer
    - 2:45 - Frontend: Pages
    - 3:30 - Backend: Server Setup
    - 4:15 - Backend: Middleware
    - 5:00 - Backend: Colleges API
    - 6:00 - Edge Cases & Tradeoffs
    - 8:30 - Conclusion & Demo
  - Hashtags: #architecture #webdev #fullstack #nextjs #nodejs #postgresql

---

## RECORDING TIPS: IN THE MOMENT

**If you lose your place:** 
- Pause recording, take a breath, note the timestamp
- Resume and restart that section
- You can edit it out in post

**If you're speaking too fast:**
- Deliberately slow down—read like you're explaining to a 10-year-old
- Pause between sentences—silence is okay

**If the app crashes or you can't reach the backend:**
- Stop recording, fix the issue, restart the section from a clear point
- Loom will let you stitch it together later

**If you notice a typo in code on screen:**
- Keep recording and narrate over it: "Note there's a typo here, but it works because..."
- You can add a text overlay in post to call it out

**If you're looking at your script:**
- That's fine! Look at the monitor, not your paper/phone
- Keep a printed/second-monitor copy of the script visible

---

This shot list ensures you know EXACTLY what should be on screen at each moment. Good luck recording!
