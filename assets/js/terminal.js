/**
 * Pulkit Tiwari Portfolio - Interactive CLI Terminal (PulkitOS)
 * Allows engineers and recruiters to interact with Pulkit's background via shell commands.
 */

(function () {
  const terminalContent = document.getElementById('terminal-content');
  const termInput = document.getElementById('term-input');
  if (!terminalContent || !termInput) return;

  const commands = {
    help: `Available commands:
  - about          : Quick biography and engineering profile
  - skills         : List tech stack and proficiencies
  - projects       : Overview of flagship systems (OpsPilot & Redis)
  - rag <query>    : Query simulated hybrid vector knowledge base
  - redis          : Show Redis caching benchmark specs
  - experience     : Internships at Code Alpha, Deloitte, and Tata
  - education      : B.Tech CSE details & coursework
  - certs          : Achievements and certifications
  - contact        : Direct phone, email, and social links
  - theme <name>   : Switch theme (cyber, matrix, light)
  - clear          : Clear terminal screen`,

    about: `Pulkit Tiwari - Full Stack & Applied AI Engineer
- Currently building production-grade LLM systems (Hybrid RAG, Claude Tool-calling, MCP).
- High-performance caching layers with Redis, Pub/Sub, and Java Spring Boot.
- B.Tech CSE (2023-2027) @ Chandigarh Group of Colleges, Jhanjeri (CGPA: 7.4).
- Hands-on internships in Applied AI (Code Alpha), Cybersecurity (Deloitte), and Data Viz (Tata).`,

    skills: `Technical Skills Matrix:
- Languages   : Java, Python, JavaScript, TypeScript, SQL, HTML5, CSS3
- AI & LLMs   : Claude API, RAG, pgvector, Reciprocal Rank Fusion, MCP, Tool-calling Agents
- Frameworks  : FastAPI, Node.js, Express.js, Spring Boot, React.js, Next.js
- Databases   : PostgreSQL + pgvector, Redis, MongoDB, MongoDB Atlas
- Core CS     : DSA, OOP, DBMS, OS, Computer Networks, Cybersecurity`,

    projects: `Featured Flagship Projects:
1. OpsPilot - AI Support & Triage Agent Platform
   Hybrid RAG (pgvector + BM25 RRF), Claude API tool-calling triage, MCP server, Slack Bolt bot, LLM-as-judge evals.
2. Real-Time Caching & Session Management System
   Redis caching layer over 5+ services, 91% hit-ratio, Pub/Sub leaderboards, Java Spring Boot dashboard.`,

    experience: `Internships & Industry Simulations:
1. Code Alpha - Artificial Intelligence Virtual Intern (Jun - Jul 2025, MSME Certified)
   Worked on applied machine learning pipelines; recognized by CEO (ID: CA/JU1/5941).
2. Deloitte - Cybersecurity Job Simulation (Feb 2026 via Forage)
   Simulated threat detection, security assessments, and data protection strategies.
3. Tata Group - Data Visualisation Experience (Feb 2026 via Forage)
   Power BI / Tableau business scenarios and data storytelling.`,

    education: `Education:
- B.Tech in Computer Science & Engineering (2023 - 2027)
  Chandigarh Group of Colleges, Jhanjeri | CGPA: 7.4
  Coursework: DSA, OOP, DBMS, OS, Computer Networks, Computer Organization
- Class XII (CBSE): St. Xavier's Sr. Sec. School, Kannauj | 70% (2022)
- Class X (CBSE): Jagran Public School, Kannauj | 81% (2020)`,

    certs: `Certifications & Milestones:
• Top 10 Rank in CodeChef Coding Competition
• Code Alpha AI Virtual Internship (MSME-certified)
• Deloitte Cybersecurity Job Simulation
• Tata Group Data Visualisation
• AWS Academy - Generative AI Foundations
• MongoDB University - Relational to Document Model & Atlas
• CISCO Networking Academy - Java Essentials 1 & Cybersecurity`,

    contact: `Contact Pulkit Tiwari:
• Email    : Pulkittiwari7007@gmail.com
• Phone    : +91-7007107270
• LinkedIn : linkedin.com/in/pulkit-tiwari-734a1a387
• GitHub   : github.com/Impulkit77`
  };

  function appendLine(html, className = 'term-line') {
    const line = document.createElement('div');
    line.className = className;
    line.innerHTML = html;
    terminalContent.appendChild(line);
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }

  function handleCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    appendLine(`<span class="term-prompt">pulkit@portfolio:~$</span> <span class="term-cmd">${trimmed}</span>`);

    const parts = trimmed.split(' ');
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    if (baseCmd === 'clear') {
      terminalContent.innerHTML = '';
      return;
    }

    if (baseCmd === 'rag') {
      if (!args) {
        appendLine(`Usage: rag <query text>\nExample: rag explain reciprocal rank fusion`, 'term-output text-rose');
        return;
      }
      appendLine(`[RAG Query]: Vectorizing "${args}"...`, 'term-output cyan');
      setTimeout(() => {
        appendLine(`[pgvector]: Match found (score: 0.94) in section 'Architecture & System Design'.`, 'term-output success');
        appendLine(`OpsPilot RAG response: Hybrid retrieval combined dense cosine similarity with BM25 sparse weights via RRF algorithm.`, 'term-output');
      }, 400);
      return;
    }

    if (baseCmd === 'theme') {
      const themeName = args.toLowerCase();
      if (['cyber', 'matrix', 'light'].includes(themeName)) {
        const themeMap = { cyber: 'cyber', matrix: 'matrix', light: 'light' };
        document.documentElement.setAttribute('data-theme', themeMap[themeName]);
        appendLine(`Theme updated to: ${themeName}`, 'term-output success');
      } else {
        appendLine(`Available themes: cyber, matrix, light`, 'term-output text-rose');
      }
      return;
    }

    if (commands[baseCmd]) {
      appendLine(commands[baseCmd].replace(/\n/g, '<br>'), 'term-output');
      if (window.audioFx) window.audioFx.playBeep(580, 0.05);
    } else {
      appendLine(`command not found: ${baseCmd}. Type 'help' for available commands.`, 'term-output text-rose');
      if (window.audioFx) window.audioFx.playBeep(220, 0.08, 'sawtooth');
    }
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = termInput.value;
      termInput.value = '';
      handleCommand(cmd);
    }
  });
})();
