# Loom Video Project - Complete Package
## Your 5-10 Minute Architecture Explainer

---

## 📋 WHAT YOU'VE RECEIVED

I've created a complete video production package with 3 documents:

### **1. LOOM_VIDEO_SCRIPT.md** (Main Script)
   - Full narration for 5-10 minute video
   - Organized in 5 parts with detailed talking points
   - Explains architecture, decisions, edge cases, tradeoffs
   - Includes code snippets to highlight while narrating
   - Divided into sections with timestamps (~1-2 min each)
   - **How to use:** Read this while recording; follow the narration cues and [Show: ...] instructions

### **2. LOOM_RECORDING_GUIDE.md** (Quick Reference)
   - Timeline breakdown of what to do at each minute
   - File locations for easy navigation
   - Running the app before recording (setup steps)
   - Post-recording checklist
   - Test accounts to create beforehand
   - **How to use:** Keep this visible on a second monitor while recording; glance at it to stay on track

### **3. LOOM_SHOT_LIST.md** (Visual Storyboard)
   - Minute-by-minute breakdown of what should be on screen
   - Specific files to open, code lines to highlight
   - Exact actions to perform in the app (search, click, navigate)
   - Visual reference table for each section
   - Checklist of VS Code tabs and terminal windows to have ready
   - **How to use:** Refer to this for exact visuals; it tells you what viewers should see at each moment

---

## 🎬 HOW TO RECORD YOUR VIDEO

### **STEP 1: PREP (15 minutes before recording)**
1. Read through LOOM_VIDEO_SCRIPT.md to familiarize yourself with the content
2. Open LOOM_RECORDING_GUIDE.md on a second monitor (or print it)
3. Follow "RUNNING THE APP BEFORE RECORDING" section:
   - Start PostgreSQL service
   - Start backend server (`npm run dev` in server/)
   - Start frontend dev server (`npm run dev` in client/)
   - Verify app runs on http://localhost:3000
4. Create test user accounts:
   - Register: alice@example.com / Password123!
   - Register: bob@example.com / Password123!
5. Have these open in VS Code:
   - All the files listed in "QUICK CHECKLIST" section of LOOM_RECORDING_GUIDE.md
6. Open Loom and set up recording:
   - Set quality to 1440x900 or 1920x1080 (HD)
   - Test microphone levels
   - Position windows so VS Code, terminal, and browser are all visible

### **STEP 2: RECORD (10 minutes)**
1. Start Loom recording
2. Follow LOOM_SHOT_LIST.md for visual reference (what to show at each timestamp)
3. Read LOOM_VIDEO_SCRIPT.md for narration (what to say)
4. Coordinate script + visuals:
   - When script says [Show: ...], switch to that window/file
   - Read the narration cues in quotation marks
   - Let viewers see the code/app while you speak
5. **Recording tips:**
   - Speak slowly (~140 words/min)
   - Use Shift+Click to highlight cursor
   - Don't click too fast
   - If you mess up, pause for a few seconds and restart that section
   - You can edit mistakes out later

### **STEP 3: EDIT (10-15 minutes)**
1. In Loom's editor:
   - Trim any false starts or pauses
   - Auto-generate captions, then edit for accuracy
   - Add text overlays for key terms (Context API, JWT, SQL injection, etc.)
   - Optionally add zoom effects on dense code sections
2. Write video description:
   - Title: "College Finder Platform - Architecture & Design Decisions"
   - Include GitHub link (if applicable)
   - Add timestamps (see example in LOOM_SHOT_LIST.md)
   - Add hashtags: #architecture #webdev #fullstack #nextjs #nodejs #postgresql
3. Set video to "Public" and share the link

---

## 📝 WHICH DOCUMENT SERVES WHICH ROLE?

| Situation | Use This Document |
|-----------|-------------------|
| "What should I say?" | **LOOM_VIDEO_SCRIPT.md** (Narration & talking points) |
| "What should I show on screen?" | **LOOM_SHOT_LIST.md** (Visual breakdown by timestamp) |
| "Where is the api.ts file?" | **LOOM_RECORDING_GUIDE.md** (Quick file reference) |
| "How do I start the backend?" | **LOOM_RECORDING_GUIDE.md** (App setup steps) |
| "How long should I spend on frontend?" | **LOOM_VIDEO_SCRIPT.md** (Time breakdown at top) |
| "Am I on track with timing?" | **LOOM_SHOT_LIST.md** (Timestamps for pacing) |
| "What test data should I use?" | **LOOM_RECORDING_GUIDE.md** (Test accounts) |
| "How do I make it to 10 minutes instead of 5?" | **LOOM_VIDEO_SCRIPT.md** (Section lengths and optional depth) |

---

## ⏱ TIMING BREAKDOWN

The script is structured for a **~10 minute video**:

- **Part 1** (1 min): Intro + Architecture overview
- **Part 2** (2.5 min): Frontend architecture (contexts, API, pages)
- **Part 3** (2.5 min): Backend architecture (server, middleware, routes)
- **Part 4** (2.5 min): Edge cases & tradeoffs
- **Part 5** (1.5 min): Conclusion + demo

**To adjust duration:**
- **Want 5 minutes?** Skip Part 4 (edge cases) or compress it to 30 seconds
- **Want 7 minutes?** Keep all parts but speed up slightly (read faster)
- **Want 12 minutes?** Expand Part 3 with more API route examples

---

## 🎯 WHAT EACH PART COVERS

### **Part 1: Introduction (0:00-1:00)**
Architecture diagram, tech stack, 3-layer design (Frontend → Backend → Database)

### **Part 2: Frontend (1:00-3:30)**
- Context API for state (auth + compare selection)
- API abstraction layer (getAuthHeaders, fetchAPI)
- Page structure (listing, detail, compare, auth, saved)

### **Part 3: Backend (3:30-6:00)**
- Express setup, auto-seeding, CORS
- Auth middleware (required vs optional JWT)
- Database schema (7 tables, relationships)
- REST API routes (search/filter, pagination, auth flow)

### **Part 4: Edge Cases & Tradeoffs (6:00-8:30)**
- Token expiration, stale data, password reset not implemented
- Duplicate emails (race condition), SQL injection prevention
- Slow network (no loading state), guest comparison limits
- Design tradeoffs table (Context vs Redux, localStorage vs cookies, etc.)

### **Part 5: Conclusion (8:30-10:00)**
Summary of architecture, live demo of the app, improvements for the future

---

## 💡 KEY TALKING POINTS (Summary)

If you only have 5 minutes, hit these points:
1. **Clean architecture:** Separation of concerns (frontend, backend, database)
2. **Simple state management:** Context API instead of Redux
3. **Centralized API layer:** Single source of truth for backend endpoints
4. **Parameterized queries:** Protection against SQL injection
5. **Optional authentication:** Guests see data; logged-in users see extra (is_saved)
6. **Tradeoff mindset:** Every choice trades off one concern for another (simplicity vs robustness)

---

## ✅ PRE-RECORDING CHECKLIST

Before you hit record, verify:

- [ ] Backend is running (`npm run dev` in server/) → Shows "🚀 Server running on http://localhost:5000"
- [ ] Frontend is running (`npm run dev` in client/) → Shows "▲ Next.js ... ready"
- [ ] App loads on http://localhost:3000 → Displays college listing
- [ ] Database is seeded → See 50+ colleges listed
- [ ] Test accounts are created → Can log in
- [ ] VS Code has 8+ tabs open (all files from LOOM_RECORDING_GUIDE.md)
- [ ] Terminal window shows server running
- [ ] Browser window shows the app
- [ ] Loom settings: HD quality, mic tested, system sound OFF
- [ ] LOOM_VIDEO_SCRIPT.md printed or on a second screen
- [ ] LOOM_SHOT_LIST.md visible for reference

---

## 🚀 RECORDING DAY TIMELINE

**T-15 min:** Start backend, frontend, verify they work
**T-10 min:** Create test accounts, open VS Code tabs
**T-5 min:** Open Loom, position windows, test mic
**T-0 min:** Hit record, start with intro narration
**T+10 min:** Finished! You did it!
**T+20 min:** Edit in Loom (captions, text overlays, trim)
**T+30 min:** Add description and share

---

## 🎥 FILMING TECHNIQUES THAT WORK WELL

1. **Slow down:** Speak at 140 words/minute (slower than normal conversation)
2. **Pause between thoughts:** Let ideas land before moving to next point
3. **Use cursor highlights:** Shift+Click in Loom to draw attention to code
4. **Point and read:** When showing code, read it aloud as you point to it
5. **Transition clearly:** Say "Let me show you..." before switching windows
6. **Live demo:** Perform actions slowly in the app (search, click, navigate)
7. **Avoid wall-of-text:** Don't narrate while dense code is on screen; show code, explain it
8. **Use silence strategically:** Let viewers read code/UI for 3-5 seconds before explaining

---

## 📞 TROUBLESHOOTING WHILE RECORDING

| Problem | Solution |
|---------|----------|
| Backend not starting | Check PostgreSQL is running; verify DATABASE_URL in .env |
| Frontend not connecting to backend | Verify CORS_ORIGIN in backend .env matches http://localhost:3000 |
| Code looks too small | Use Ctrl+Plus to zoom VS Code (200% is usually good for video) |
| Speaking too fast | Deliberately slow down; read each sentence twice as slowly as normal |
| Can't remember what to say | Pause recording, check LOOM_VIDEO_SCRIPT.md, restart section |
| Cursor is hard to see | Use Shift+Click for Loom's built-in cursor highlight (easier to follow) |
| Ran out of time | Skip deep dives into Part 4 (edge cases); focus on architecture |
| Want to redo a section | Stop, note the timestamp, resume from a natural break, edit later |

---

## 🎬 EXAMPLE RECORDING SESSION

Here's what a smooth recording might look like:

```
0:00-0:30   | [Hit record] "Hi! Today I'm walking you through..." 
            | [Show VS Code with project structure]

0:30-1:00   | [Open implementation_plan.md, show diagram]
            | "The app is built with a client-server architecture..."
            | [Switch to running app in browser]

1:00-1:45   | [Open auth-context.tsx]
            | "For state management, I used React Context API..."
            | [Highlight useEffect, login(), logout()]

1:45-2:30   | [Open api.ts]
            | "Next, let's look at the API layer..."
            | [Highlight getAuthHeaders(), fetchAPI(), exports]

2:30-3:30   | [Show various app pages in browser]
            | "The main page shows a list of colleges..."
            | [Perform search, click on a college, navigate pages]

3:30-4:15   | [Open server/src/index.ts]
            | "The backend is an Express server..."
            | [Show terminal with server running]

4:15-6:00   | [Show middleware, routes, explain logic]
            | "Here's the authentication middleware..."

6:00-8:30   | [Narrate edge cases while showing code/diagrams]
            | "Let me walk through the edge cases I handled..."

8:30-10:00  | [Demo the app: search, login, save, compare]
            | "So to recap, here's what this architecture achieves..."
            | [End with VS Code showing project]

[Stop recording, do basic editing in Loom]
```

---

## 📚 QUICK REFERENCE: ALL DOCUMENTS AT A GLANCE

**LOOM_VIDEO_SCRIPT.md** → What to SAY (5 parts, ~10 min)
**LOOM_RECORDING_GUIDE.md** → How to SET UP (before recording)
**LOOM_SHOT_LIST.md** → What to SHOW (minute-by-minute visuals)

Read all three before recording, then keep them visible during:
- Main monitor: The app/code you're showing
- Second monitor (or printed): LOOM_RECORDING_GUIDE.md + LOOM_SHOT_LIST.md
- Third reference (or memory): Key points from LOOM_VIDEO_SCRIPT.md

---

## 🎉 YOU'VE GOT THIS!

The script is written, the guide is detailed, and you have everything you need.
Just follow the timeline, speak clearly, show the right screens at the right times, and you'll have a polished 5-10 minute architectural explainer that clearly conveys:

✅ **Architecture:** 3-layer design with clean separation
✅ **Decisions:** Why Context API, JWT tokens, parameterized queries
✅ **Edge cases:** Token expiration, race conditions, slow networks
✅ **Tradeoffs:** Simplicity vs robustness, security vs ease-of-use

Good luck! 🚀
