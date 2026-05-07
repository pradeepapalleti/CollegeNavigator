# Loom Recording Quick Reference Guide
## Use this while recording to stay on track

---

## TIMELINE & ACTION ITEMS

### **0:00-1:00 | INTRO & ARCHITECTURE OVERVIEW**
- **Start with:** VS Code showing the project folder structure
- **Show:** `implementation_plan.md` (especially the mermaid diagram)
- **Narrate:** Architecture overview (client/server/DB), tech stack
- **Key visual:** The three-layer architecture diagram

### **1:00-3:30 | FRONTEND ARCHITECTURE**

#### **1:00-1:45 | Context-Based State Management**
- Open: `client/lib/auth-context.tsx`
- Highlight: The useEffect hook that loads from localStorage
- Highlight: login() and logout() functions
- Open: `client/lib/compare-context.tsx`
- Highlight: How localStorage keys are scoped by user.id
- Narrate about localStorage vs httpOnly cookie tradeoff

#### **1:45-2:30 | API Layer**
- Open: `client/lib/api.ts`
- Highlight: getAuthHeaders() function
- Highlight: fetchAPI() wrapper
- Highlight: Namespaced exports (authAPI, collegesAPI, savedAPI)
- Show how endpoints are organized by feature

#### **2:30-3:30 | Pages & Features**
- Show: `app/page.tsx` - college listing (search, filter, sort, pagination)
- Show: `app/college/[id]/page.tsx` - detail page
- Show: `app/compare/page.tsx` - compare view
- Show: `app/login/page.tsx` and `app/register/page.tsx`
- Show: `app/saved/page.tsx` - saved colleges
- For each: Point out key features

### **3:30-6:00 | BACKEND ARCHITECTURE**

#### **3:30-4:15 | Server Setup & Middleware**
- Open: `server/src/index.ts`
- Highlight: Express app setup, CORS config
- Highlight: Auto table creation and seeding logic
- Narrate: Why auto-seeding is good for dev
- Open: `server/src/middleware/auth.ts`
- Highlight: authMiddleware vs optionalAuth difference
- Highlight: JWT verification logic

#### **4:15-5:00 | Database Design**
- Open: `server/src/db/migrate.ts` (in your mind or from memory)
- Don't code-dive—just talk about the schema:
  - colleges, courses, placements, reviews
  - users, saved_colleges, saved_comparisons
- Talk about the JSON array choice for saved_comparisons
- Mention the tradeoff: simple but hard to query

#### **5:00-6:00 | REST API Routes**
- Open: `server/src/routes/colleges.ts`
- Highlight: Dynamic WHERE clause building for search/filter
- Highlight: Parameterized queries ($1, $2) for SQL injection prevention
- Highlight: Pagination logic (offset calculation)
- Highlight: Sorting options
- Highlight: is_saved flag logic (optional auth)
- Open: `server/src/routes/auth.ts`
- Talk about password hashing with bcryptjs
- Mention JWT expiration (7 days)
- Open: `server/src/routes/saved.ts`
- Explain toggle behavior (idempotent)

### **6:00-8:30 | EDGE CASES & TRADEOFFS**

#### **6:00-6:45 | Auth & Authorization Edge Cases**
- Token expiration handling
- Stale data (no real-time sync)
- Password reset not implemented
- No rate limiting on login
- CORS misconfiguration errors
- **Don't need to show code—just talk through scenarios**

#### **6:45-7:30 | Data Integrity Edge Cases**
- Deleting colleges (no cascade)
- Duplicate emails (race condition)
- Special characters in search
- Pagination beyond range
- **Optional:** Show DB schema diagram or mention specific tables

#### **7:30-8:15 | Frontend UX Edge Cases**
- Slow network (no loading state)
- Guest comparison limit bug
- Unsaved drafts lost on refresh
- Accessibility gaps (no ARIA labels)
- **Optional:** Maybe show the app and simulate these

#### **8:15-8:30 | System Design Tradeoffs**
- Show or narrate the tradeoff table
- Context API vs Redux
- localStorage vs httpOnly cookies
- PostgreSQL vs MongoDB
- 7-day tokens vs 1-hour
- No real-time vs WebSockets

### **8:30-10:00 | CONCLUSION & APP DEMO**
- Switch to running the app
- Click through 2-3 colleges
- Demonstrate search/filter
- Log in with test account
- Save a college (show the heart icon change)
- Go to saved page (show bookmark)
- Select colleges for comparison
- Show the comparison view
- Navigate back to home
- Narrate: Key takeaways, what you'd improve next

---

## TIPS WHILE RECORDING

### **Pacing:**
- Read the script slowly—pauses are okay
- Aim for ~140 words/minute (gives viewers time to read)
- Let slides breathe—don't rush through code

### **Mouse/Keyboard:**
- Use Shift+Click in Loom to highlight cursor
- Move slowly and deliberately when pointing
- Use keyboard shortcuts when possible (Ctrl+F to search, Ctrl+L to go to line)
- Zoom in on VS Code text if it's hard to read (Ctrl + Plus)

### **Code Highlighting:**
- Use VS Code's "Highlight" feature or just click relevant lines
- Read the code out loud as you point to it
- Explain WHY, not just WHAT

### **When showing the app:**
- Wait for network requests to complete
- Don't click too fast
- Point out UI elements as you interact with them

### **If you mess up:**
- Keep recording—Loom lets you edit later
- You can cut out mistakes in post
- Pause for a few seconds, then restart the section

---

## FILE LOCATIONS QUICK REFERENCE

```
Frontend Files:
├─ client/lib/auth-context.tsx          (Auth state management)
├─ client/lib/compare-context.tsx       (Comparison selection state)
├─ client/lib/api.ts                    (API client)
├─ client/app/page.tsx                  (Colleges listing)
├─ client/app/college/[id]/page.tsx     (College detail)
├─ client/app/compare/page.tsx          (Comparison view)
├─ client/app/login/page.tsx            (Login page)
├─ client/app/register/page.tsx         (Registration page)
└─ client/app/saved/page.tsx            (Saved items page)

Backend Files:
├─ server/src/index.ts                  (Server setup)
├─ server/src/middleware/auth.ts        (Auth middleware)
├─ server/src/routes/colleges.ts        (Colleges API)
├─ server/src/routes/auth.ts            (Auth API)
├─ server/src/routes/saved.ts           (Saved items API)
├─ server/src/db/migrate.ts             (Schema)
└─ server/src/db/seed.ts                (Sample data)

Documentation:
├─ implementation_plan.md               (Architecture overview)
└─ LOOM_VIDEO_SCRIPT.md                 (Full script with timestamps)
```

---

## RUNNING THE APP BEFORE RECORDING

1. **Start PostgreSQL** (if not running)
   ```powershell
   # Check if PostgreSQL service is running
   Get-Service PostgreSQL
   ```

2. **Start the backend:**
   ```powershell
   cd "c:\Users\prade\programming\practice\college finder\server"
   npm run dev
   ```
   Wait for: `🚀 Server running on http://localhost:5000`

3. **Start the frontend (in a new terminal):**
   ```powershell
   cd "c:\Users\prade\programming\practice\college finder\client"
   npm run dev
   ```
   Wait for: `▲ Next.js ... ready`

4. **Open the app:**
   - Navigate to `http://localhost:3000` in your browser

5. **Test endpoints before recording:**
   - List colleges: `http://localhost:3000`
   - Search/filter: Add `?search=MIT` to URL
   - Detail page: Click any college
   - Login: Go to `/login`, use test credentials (or register first)

---

## TEST ACCOUNTS (Create these before recording)

Register these test accounts so you can demo login/save:

1. **Test User 1:**
   - Email: `alice@example.com`
   - Password: `Password123!`

2. **Test User 2:**
   - Email: `bob@example.com`
   - Password: `Password123!`

Use these to show the auth flow and saved items.

---

## OPTIONAL VISUALS TO PREPARE

Create or prepare these before recording (you can add them as overlays or B-roll):
1. Database schema diagram (draw in draw.io or Excalidraw)
2. Request/response flow diagram
3. State flow diagram for auth
4. Comparison screenshot (showing 3 colleges side-by-side)

If you're comfortable, add these as overlays in Loom's editor after recording.

---

## POST-RECORDING CHECKLIST

After recording in Loom:
- [ ] Trim any intro/outro fluff
- [ ] Add captions (Loom auto-generates; edit for accuracy)
- [ ] Add text overlay for key terms:
  - "Context API"
  - "JWT Token"
  - "REST API"
  - "SQL Injection Prevention"
- [ ] Add zoom/pan effects on code sections (slow down playback)
- [ ] Add video description with:
  - Link to GitHub repo
  - Timestamps for each section
  - Key takeaways
- [ ] Set video to "Public" if sharing widely
- [ ] Share link with your audience

---

## SCRIPT MARKERS IN MAIN SCRIPT

Look for these markers in LOOM_VIDEO_SCRIPT.md:
- **[Show: ...]** = Show something on screen
- **"..."** = What to narrate (read aloud)
- **[Show & narrate together]** = Sync video and voice

Follow these cues to stay in sync with the script.

---

## APPROXIMATE SECTION LENGTHS

If you want to adjust to fit a specific duration:

- **5-minute version:** Skip Part 4A & 4B (cut edge cases short)
- **7-minute version:** Normal flow, but speed up slightly
- **10-minute version:** Include all sections, take your time

Aim for ~140 words per minute = comfortable watching pace.
