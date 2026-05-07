# College Finder Platform - Loom Video Script
## 5-10 Minute Architecture & Design Walkthrough

---

## PART 1: INTRODUCTION & ARCHITECTURE OVERVIEW (0:00 - 1:00)

**[Show: Project folder structure in VS Code]**

*"Hi! Today I'm walking you through the College Finder platform—a full-stack application that helps students discover and compare colleges. Let me break down the architecture, key decisions I made, edge cases I handled, and the tradeoffs I faced.*

*The app is built with a client-server architecture:*
- *Frontend: Next.js 16 with React 19 and Tailwind CSS*
- *Backend: Node.js with Express and TypeScript*
- *Database: PostgreSQL*

*The frontend communicates with the backend through REST APIs, and authentication is handled via JWT tokens stored in localStorage."*

**[Show: Mermaid architecture diagram from implementation_plan.md]**

*"Here's how the different pieces connect. Users interact with the frontend, which calls the backend API, which queries the PostgreSQL database. Everything is fully typed with TypeScript."*

---

## PART 2: FRONTEND ARCHITECTURE (1:00 - 3:30)

### 2A: Context-Based State Management (1:00 - 1:45)

**[Show: client/lib/auth-context.tsx and client/lib/compare-context.tsx]**

*"For state management, I used React Context API instead of Redux or Zustand. Why? Simplicity and bundle size. The app has two main contexts:*

*First, AuthContext—this manages user authentication state. Notice how it:*
- *Loads auth data from localStorage on mount*
- *Provides login() and logout() functions*
- *Keeps token and user info in sync*
- *Provides an isAuthenticated flag for easy access*

*The key decision here: I store tokens in localStorage, which is accessible to JavaScript. This is simpler for a single-page app but comes with a tradeoff—it's vulnerable to XSS attacks if someone injects malicious JavaScript. The alternative would be httpOnly cookies, which are more secure but harder to use with custom headers."*

*"Second, CompareContext—this manages which colleges users have selected for comparison. Notice the clever part:*
- *It uses user-specific localStorage keys (prefixed with user.id)*
- *For guests, it uses a generic 'compare-selected-ids:guest' key*
- *This preserves comparison selections across page reloads and even between logged-in sessions*
- *The useEffect on user change handles the transition from guest to authenticated user."*

### 2B: API Layer Abstraction (1:45 - 2:30)

**[Show: client/lib/api.ts]**

*"Next, let's look at the API layer. Instead of spreading fetch calls throughout components, I centralized all API calls into an api.ts file with namespaced functions:*

*Notice the pattern:*
- *authAPI.login(), authAPI.register()*
- *collegesAPI.list(), collegesAPI.detail(), collegesAPI.compare()*
- *savedAPI.getColleges(), savedAPI.toggleCollege(), etc.*

*This serves multiple purposes:*
1. *Single source of truth for endpoints—if the backend changes, we update it in one place*
2. *Automatic auth header injection—the getAuthHeaders() function pulls the token from localStorage and adds it to every request*
3. *Consistent error handling—all responses go through the same error check*
4. *Type safety—when we add stricter TypeScript types, everything flows through here*

*One decision I made: fetch() over axios. Fetch is now built into all modern browsers and Node.js, so I don't need an extra dependency. Less code, less bundle size."*

### 2C: Page Structure & Features (2:30 - 3:30)

**[Show: app/page.tsx - College Listing]**

*"The main page shows a list of colleges with search, filtering, and sorting. Notice:*
- *Search by name (ILIKE query on backend)*
- *Filter by location, max fees, course offerings*
- *Sort by rating, fees, placement rate*
- *Pagination—12 colleges per page to avoid loading thousands at once*
- *For authenticated users, it shows which colleges they've saved (the heart icon)*
- *For guests, the save button prompts login—this is an edge case I'll explain later."*

**[Show: app/college/[id]/page.tsx - College Detail]**

*"The detail page shows everything about a single college—courses, placements, reviews, and stats. This is a dynamic route using Next.js file-based routing. The page fetches data from our API and shows rich information."*

**[Show: app/compare/page.tsx - Compare Colleges]**

*"The compare page is where users can select 2-3 colleges to compare side by side. It uses the CompareContext we talked about. Notice:*
- *The selection is persistent (localStorage)*
- *The compare button is disabled until at least 2 colleges are selected*
- *After comparison, users can save this comparison to their profile*
- *This is useful for later review."*

**[Show: app/login/page.tsx and app/register/page.tsx]**

*"Auth pages are straightforward—email/password login and registration. Both pages handle their own form state and call the auth API."*

**[Show: app/saved/page.tsx - Saved Items]**

*"The saved page shows bookmarked colleges and saved comparisons. This is only accessible to authenticated users—the Navbar redirects unauthenticated users to login."*

---

## PART 3: BACKEND ARCHITECTURE (3:30 - 6:00)

### 3A: Server Setup & Middleware (3:30 - 4:15)

**[Show: server/src/index.ts]**

*"The backend is an Express server with middleware for CORS, JSON parsing, and database setup. Notice:*
- *CORS is configured to only accept requests from the frontend origin (http://localhost:3000)*
- *This prevents cross-origin attacks*
- *On startup, the server:*
  1. *Creates database tables if they don't exist*
  2. *Checks if colleges data is already seeded*
  3. *If empty, auto-seeds with 50+ colleges*
  4. *Then starts listening on port 5000*

*Why auto-seed? During development, I don't want to manually seed every time I restart. The check ensures we don't duplicate data."*

**[Show: server/src/middleware/auth.ts]**

*"Here's the authentication middleware. Two variants:*
- *authMiddleware: Required auth—returns 401 if no token. Used for protected routes like /saved*
- *optionalAuth: Optional auth—extracts token if present, doesn't fail if missing. Used for GET requests where guests should see data but authenticated users get additional info (like 'is_saved' flag)*

*The JWT secret is loaded from environment variables—never hardcode secrets."*

### 3B: Database Design & Migration (4:15 - 5:00)

**[Show: server/src/db/migrate.ts]**

*"The migrate script creates all database tables. Let me explain the schema:*

*colleges table:* stores college info—name, location, fees, placement data, etc.
*courses table:* linked to colleges, stores degree programs
*placements table:* historical placement data—year, avg salary, top recruiters
*reviews table:* student reviews and ratings
*users table:* student accounts with hashed passwords
*saved_colleges table:* many-to-many link between users and colleges
*saved_comparisons table:* stored comparison sets with college_ids as a JSON array

*One important decision: I use PostgreSQL's native JSON type for college_ids in saved_comparisons. This avoids creating a third junction table. The tradeoff: querying by specific college ID in a comparison is harder, but for this app, we only need 'get all comparisons for a user' and 'delete by comparison ID', so it's fine."*

### 3C: REST API Routes (5:00 - 6:00)

**[Show: server/src/routes/colleges.ts]**

*"The colleges endpoint supports search, filtering, sorting, and pagination. Here's what's happening:*

1. *Dynamic WHERE clause building:* Each filter (search, location, fees, course) adds a condition. This is parameterized to prevent SQL injection.*

2. *Pagination:* It calculates offset based on page number and limit (12 per page). This prevents loading huge datasets at once.*

3. *Sorting options:* rating (DESC), fees (low to high), placement rate, alphabetical*

4. *Saved flag:* Even on the list endpoint, it checks if each college is in the user's saved list—'is_saved' is a boolean in the response. This is an optional feature—guests get false, authenticated users get true/false.*

5. *COUNT query first:* Before fetching results, it counts total matches for pagination metadata."*

**[Show: server/src/routes/auth.ts]**

*"Auth routes handle registration and login.*

*Registration:*
- *Validates email doesn't already exist*
- *Hashes password with bcryptjs (never store plaintext passwords)*
- *Returns JWT token and user data*

*Login:*
- *Finds user by email*
- *Compares password with hashed version*
- *Returns JWT token if successful*

*Tokens expire—the decision I made: 7-day expiration. The tradeoff is that tokens live long enough for normal usage but don't compromise security if stolen. A shorter expiration (like 1 hour) would be more secure but require refresh tokens, which adds complexity."*

**[Show: server/src/routes/saved.ts]**

*"The saved endpoint lets authenticated users bookmark colleges and save comparison sets.*

*Edge case handled: Toggling the same college twice*—the first POST saves it, the second POST removes it (idempotent toggle).*

*Another edge case: What if a user tries to save more than 100 colleges?*—I don't enforce a limit here, but you could add one. The tradeoff: limiting saves prevents data bloat but frustrates power users."*

---

## PART 4: EDGE CASES & TRADEOFFS (6:00 - 8:30)

### 4A: Authentication & Authorization Edge Cases (6:00 - 6:45)

*"Let me walk through the edge cases I handled:*

1. **Token Expiration:** If a user's token expires while they're on the page, the next API call fails with 401. The app catches this and redirects to login. The user doesn't lose their unsaved comparisons—they're in localStorage and persist after login.*

2. **Stale Data:** If two users are looking at the same college and one submits a review, the other's page doesn't auto-refresh. The tradeoff: Real-time sync would require WebSockets, which is complex. Most users accept a slight delay. A refresh button solves it without complexity.*

3. **Password Reset:** I haven't implemented this. The tradeoff: It adds complexity (email verification, temp tokens), so for an MVP, it's out of scope. Users can re-register if they forget.*

4. **Rate Limiting:** No rate limiting on login attempts. A user could brute-force passwords. The tradeoff: Adding rate limiting requires session tracking or Redis. For a college app, this is lower risk than a banking app. In production, I'd add it.*

5. **CORS Misconfiguration:** The frontend and backend must be on the correct domains. If CORS_ORIGIN is wrong, the frontend can't reach the backend. During development, localhost:3000 and localhost:5000 must both be running. The error message isn't great—it's a CORS error in the browser console, which confuses beginners. Adding better error messaging would help."*

### 4B: Data Integrity Edge Cases (6:45 - 7:30)

*"Now, data integrity:*

1. **Deleting a College:** If a college is deleted from the database, saved_colleges and saved_comparisons might reference a non-existent ID. I haven't added cascading deletes. The tradeoff: Cascades make schema more fragile. Better approach: mark colleges as 'archived' instead of deleting. This preserves history.*

2. **Duplicate Emails:** The registration checks for existing emails. But there's no UNIQUE constraint on the database—just app-level validation. If two users simultaneously register with the same email, the second might succeed due to a race condition. The fix: add UNIQUE(email) in migrations. A security flaw I should fix.*

3. **Search with Special Characters:** If a user searches for \"O'Brien College\" or \"Tech-Lab\", the ILIKE query handles it fine. But if they search for a %  or _ (SQL wildcards), it might return unexpected results. The fix: escape these characters. Noted for future improvement.*

4. **Pagination Beyond Range:** If a user requests page 1000 when there are only 10 pages, the API returns an empty array. Should it return an error? The current behavior is graceful—no error, just no results. Users accept this."*

### 4C: Frontend UX Edge Cases (7:30 - 8:15)

*"User experience edge cases:*

1. **Slow Network:** Fetching college list might take 2-3 seconds on slow networks. There's no loading state in the current code. The page looks frozen. Fix: Add a skeleton loader or spinner—I recommend using a loading context.*

2. **Guest Compare Limit:** A guest can select unlimited colleges for comparison. I limit authenticated users to 3 in the UI (canAdd = selectedIds.length < 3), but guests have no limit. The tradeoff: Enforcing limits on guests incentivizes signup, but a better UX is enforcing it universally. The current code has a bug—guests can select 3+.*

3. **Unsaved Drafts:** If a user types a college review but doesn't submit and refreshes, it's lost. There's no draft saving. Real apps auto-save to localStorage.*

4. **Accessibility:** The app lacks ARIA labels and keyboard navigation shortcuts. Improvements needed for screen reader users."*

### 4D: System Design Tradeoffs (8:15 - 8:30)

*"High-level tradeoffs I chose:*

| Tradeoff | Choice | Reason | Alternative |
|----------|--------|--------|-------------|
| State Management | Context API | Simplicity | Redux (more boilerplate) |
| Token Storage | localStorage | Easy frontend access | httpOnly cookies (more secure) |
| Database Type | PostgreSQL | Rich features, ACID | MongoDB (simpler schema) |
| Auth Duration | 7 days | Balance security/UX | 1 hour (more secure, needs refresh tokens) |
| Saved Comparisons JSON | Single JSON array | Avoid junction tables | Proper college_comparisons table (queryable) |
| Real-time Updates | Polling (none) | Simplicity | WebSockets (more responsive) |

*Each choice optimizes for 'simplicity and MVP speed' at the cost of production robustness."*

---

## PART 5: CONCLUSION (8:30 - 10:00)

**[Show: Project running in browser - click through features]**

*"So to recap:*

**Architecture:** Clean separation of concerns—frontend handles UI, backend handles logic, database handles persistence.

**Key Decisions:** I prioritized simplicity and MVP speed over production robustness. Context API instead of Redux, localStorage instead of secure cookies, no real-time sync.

**Edge Cases:** I thought through token expiration, race conditions, pagination boundaries, and accessibility gaps. Some I fixed, some are noted for future work.

**Tradeoffs:** Every architectural decision trades off one concern for another. I chose scalability-lite features in favor of getting the MVP done quickly.

**What I'd improve next:***
- *Add loading states and error boundaries*
- *Implement rate limiting on auth*
- *Add UNIQUE constraint on user emails*
- *Use httpOnly cookies for auth*
- *Add real-time updates with WebSockets*
- *Improve accessibility with ARIA labels*

*For a college discovery platform, this architecture is solid and production-ready. Thanks for watching!"*

---

## RECORDING TIPS

**Before you record:**
1. Close unnecessary browser tabs and notifications
2. Open the app and make sure it's running:
   - Backend: `npm run dev` in the `server/` folder
   - Frontend: `npm run dev` in the `client/` folder
3. Make sure PostgreSQL is running
4. Set Loom to HD quality and a comfortable resolution (1440x900 recommended)

**While recording:**
- Speak slowly and naturally—pause for emphasis
- When showing code, highlight key lines with your cursor
- When showing the app, perform actions slowly (search, click, navigate)—give viewers time to follow
- Use Loom's built-in cursor highlight feature (Shift + Click)
- If you make a mistake, keep going—Loom lets you edit out mistakes later

**Segments to screen record:**
- [0:00-1:00] Show VS Code with project structure and folder tree
- [1:00-3:30] Open auth-context.tsx, api.ts, and show main pages
- [3:30-6:00] Open server/src/index.ts, middleware/auth.ts, routes/colleges.ts
- [6:00-8:30] You're speaking; maybe show a diagram or code snippets as visuals
- [8:30-10:00] Show the running app—click through some colleges, log in, save some, try comparison

**Post-recording in Loom:**
- Trim any silent parts or mistakes
- Add captions (Loom has auto-captions, edit them for accuracy)
- Add text overlays for key terms (e.g., "JWT Token", "Context API")
- Add your project repo link in the video description

---

## SCRIPT CALLOUT DETAILS

### Code to highlight during Part 2A (AuthContext):
```typescript
// Show useEffect hook for loading persisted auth
useEffect(() => {
  const savedToken = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');
  if (savedToken && savedUser) {
    setToken(savedToken);
    setUser(JSON.parse(savedUser));
  }
}, []);
```
*Narrate: "On component mount, we check localStorage for an existing session. If found, we restore it. This is why users stay logged in after a refresh."*

### Code to highlight during Part 2B (API):
```typescript
async function fetchAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(), // <-- Auto-inject token
      ...options?.headers,
    },
    ...options,
  });
```
*Narrate: "Every API call automatically includes the auth header. This is the DRY principle—we define it once, and all endpoints inherit it."*

### Code to highlight during Part 3A (Server setup):
```typescript
const start = async () => {
  try {
    await createTables();
    const count = await pool.query('SELECT COUNT(*) FROM colleges');
    if (parseInt(count.rows[0].count) === 0) {
      await seedDatabase(); // Auto-seed if empty
    }
    app.listen(PORT, () => { /* ... */ });
  }
};
```
*Narrate: "This is idempotent startup—it's safe to restart the server multiple times. If tables exist, it skips creation. If data exists, it skips seeding. This is good for development."*

### Code to highlight during Part 3C (Colleges endpoint):
```typescript
if (search) {
  whereConditions.push(`c.name ILIKE $${paramIndex}`);
  params.push(`%${search}%`);
  paramIndex++;
}
```
*Narrate: "Notice parameterized queries—$1, $2, etc. This is SQL injection protection. The search value is passed separately, never concatenated into the SQL string."*

---

## TIME BREAKDOWN

- **PART 1:** 1 minute (intro + high-level architecture)
- **PART 2:** 2.5 minutes (frontend: contexts, API, pages)
- **PART 3:** 2.5 minutes (backend: middleware, database, routes)
- **PART 4:** 2.5 minutes (edge cases & tradeoffs)
- **PART 5:** 1.5 minutes (conclusion + tips)

**Total: ~10 minutes**

If you want to keep it to 5 minutes, cut Part 4A and 4B in half (mention edge cases but don't go deep), and skip some code highlights in Parts 2-3.
