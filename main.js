const obsidian = require('obsidian');

// ============================================
// DayFlow Plugin for Obsidian - v2.1 Milestone Edition
// 项目追踪面板采用里程碑视图的曲线连接+布局切换+全览模式
// ============================================

// ============ ICONS ============
const ICONS = {
  capture: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
  schedule: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  checkin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  journal: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  ai: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 10.5"/><path d="M12 12v10"/><path d="M12 12 7 21.9"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  expand: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  circle: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  coffee: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  history: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  message: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  folder: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  activity: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
  project: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  maximize: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`,
  minimize: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>`,
  lightbulb: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  wind: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`,
  feather: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="6.5"/></svg>`,
  pin: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>`,
  pinOff: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1"/><path d="M17 8l1 1"/><path d="M13 12l1 1"/></svg>`,
  stats: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  hash: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
  fileText: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  target: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  trendingUp: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  orbIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  layoutVert: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2" ry="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg>`,
  layoutHoriz: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2" ry="2"/><line x1="3" y1="12" x2="21" y2="12"/></svg>`,
};

const DEFAULT_SETTINGS = {
  capturesFolder: "DayFlow/Captures",
  schedulesFolder: "DayFlow/Schedules",
  journalsFolder: "DayFlow/Journals",
  feedbackTrigger: "immediate",
  aiProvider: "none",
  deepseekApiKey: "",
  deepseekModel: "deepseek-chat",
  customBaseUrl: "https://api.openai.com/v1",
  customApiKey: "",
  customModel: "gpt-4o",
  temperature: 0.3,
  knowledgeBaseFolder: "",
  habits:["喝水 2L", "阅读 15 分钟", "运动 30 分钟"],
  habitTemplates: {},
  projects: ["#开发独立产品", "#阅读计划"],
  floatingButtonEnabled: true,
  floatingButtonPosition: "status-bar",
  autoOpenYesterdaySchedule: false,
  skipAutoOpenDate: "",
  orbEnabled: true,
  orbPosition: null,
  orbPinned: false,
  projectCacheTTL: 30000,
  timelineDefaultDays: 10
};

// ============================================
// PROMPTS
// ============================================
const TASK_BREAKDOWN_PROMPT = {
  id: "task_breakdown",
  name: "Task Breakdown Assistant",
  version: "1.0.0",
  editable: false,
  systemPrompt: `你是一个专业的"项目/任务拆解专家"。\n\n【拆解原则】\n1. 识别主要组件: 将大目标分为 5-10 个核心模块。\n2. 任务颗粒度: 每个任务必须能在 30分钟 到 4小时 内完成。\n3. 时间预估: 使用合理预估并添加15%-25%的缓冲时间。\n4. 依赖关系与并行: 明确强依赖(Hard)任务，并指出哪些可以并行(Parallel)。\n5. 最优排序: 按初始化、核心开发、打磨、验证的阶段排序。\n\n【输出格式模板】\n请直接输出 Markdown（不要说废话），严格按照以下结构：\n### 1. 拆解分析\n(简要分析目标和组件)\n\n### 2. 任务清单 (按执行阶段排序)\n(必须包含：任务名称、预估时间、依赖。如果能并行用 ║ 标出)\n- 任务名称 - 依赖：无\n\n### 3. 优化建议\n(说明关键路径和总预估时长)`,
  userPromptTemplate: `【需拆解的任务/项目】：\n{{userTask}}`,
  variables: ["userTask"]
};

// ============================================
// DYNAMIC ISLAND
// ============================================
class DynamicIsland {
  constructor() {
    this.container = null;
    this.hideTimeout = null;
    this.isExpanded = false;
  }

  show(options) {
    const { title, subtitle, details, actions, iconSvg = ICONS.circle, duration = 5000, type = "info" } = options;
    this.hide();
    this.isExpanded = false;

    this.container = document.createElement("div");
    this.container.className = "dayflow-island";
    const colors = { info: "var(--interactive-accent)", success: "var(--color-green)", warning: "var(--color-yellow)", error: "var(--color-red)" };
    this.container.style.setProperty("--island-accent", colors[type] || colors.info);

    const hasDetails = !!details;
    const hasActions = !!actions && actions.length > 0;
    let actionsHtml = "";
    if (hasActions) {
      actionsHtml = `<div class="dayflow-island-actions">${actions.map((a,i)=>`<button class="dayflow-island-action-btn ${a.type||'default'}" data-ai="${i}">${a.label}</button>`).join('')}</div>`;
    }

    this.container.innerHTML = `
      <div class="dayflow-island-inner ${hasActions?'has-actions':''}">
        <div class="dayflow-island-header">
          <div class="dayflow-island-icon">${iconSvg}</div>
          <div class="dayflow-island-content">
            <div class="dayflow-island-title">${title}</div>
            ${subtitle?`<div class="dayflow-island-subtitle">${subtitle}</div>`:""}
          </div>
          <div class="dayflow-island-close">${ICONS.close}</div>
        </div>
        ${hasDetails?`<div class="dayflow-island-details">${details}</div>`:""}
        ${actionsHtml}
      </div>`;

    this.container.querySelector(".dayflow-island-close").onclick = (e)=>{ e.stopPropagation(); this.hide(); };
    if (hasActions) {
      this.container.querySelectorAll(".dayflow-island-action-btn").forEach((btn,i)=>{
        btn.onclick = (e)=>{ e.stopPropagation(); if(actions[i].onClick) actions[i].onClick(); this.hide(); };
      });
    }
    if (duration > 0) this.startTimer(duration);
    (this.app.workspace.containerEl || document.body).appendChild(this.container);
    requestAnimationFrame(()=>this.container.classList.add("show"));
  }

  startTimer(d) { this.clearTimer(); this.hideTimeout = setTimeout(()=>this.hide(), d); }
  clearTimer() { if(this.hideTimeout){clearTimeout(this.hideTimeout);this.hideTimeout=null;} }

  hide() {
    this.clearTimer();
    if(this.container){
      const old=this.container; this.container=null;
      old.classList.remove("show"); old.classList.remove("is-expanded");
      setTimeout(()=>{if(old&&old.isConnected)old.remove()},300);
    }
  }
}
const globalIsland = new DynamicIsland();

// ============================================
// VAULT MANAGER (v2.1: 带缓存)
// ============================================
class VaultManager {
  constructor(app) { this.app=app; this.vault=app.vault; this._fileCache=new Map(); }
  async readContent(file) {
    const cached=this._fileCache.get(file.path);
    try { const stat=await this.vault.adapter.stat(file.path); 
      if(cached&&cached.mtime===stat.mtime) return cached.content;
      const content=await this.vault.read(file);
      this._fileCache.set(file.path,{content,mtime:stat.mtime});
      return content;
    } catch(e) { return await this.vault.read(file); }
  }
  invalidateCache(path) { this._fileCache.delete(path); }
  clearCache() { this._fileCache.clear(); }

  async ensureFolder(path) {
    const parts=path.split('/').filter(Boolean); let cur='';
    for(const f of parts){ cur=cur===''?f:`${cur}/${f}`; 
      if(!this.vault.getAbstractFileByPath(cur)) await this.vault.createFolder(cur); }
  }
  async createOrOpenNote(folder,name,template="") {
    await this.ensureFolder(folder); const fp=`${folder}/${name}.md`;
    let file=this.vault.getAbstractFileByPath(fp);
    if(!file) file=await this.vault.create(fp,template); return file;
  }
  async updateContent(file,content) {
    await this.vault.modify(file,content);
    try { const s=await this.vault.adapter.stat(file.path); this._fileCache.set(file.path,{content,mtime:s.mtime}); }
    catch(e){}
  }
  async openFile(file) { await this.app.workspace.getLeaf(false).openFile(file); }
  getActiveFile() { return this.app.workspace.getActiveFile(); }
  getTodayString() { const n=new Date(); return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`; }
  getTodayWeekday() { return ['周日','周一','周二','周三','周四','周五','周六'][new Date().getDay()]; }
}

// ============================================
// AI PROVIDER
// ============================================
class DeepSeekProvider {
  constructor() { this.name="DeepSeek"; this.config={}; this.abortController=null; }
  get isConfigured() { return !!this.config.apiKey; }
  get isAvailable() { return this.isConfigured; }
  configure(c) { this.config={...this.config,...c,baseUrl:c.baseUrl||"https://api.deepseek.com",model:c.model||"deepseek-chat",timeout:c.timeout||180000}; }
  async complete(req) {
    if(!this.isAvailable) throw new Error("AI未配置");
    this.abortController=new AbortController();
    const tid=setTimeout(()=>this.cancel(),this.config.timeout);
    try {
      const r=await fetch(`${this.config.baseUrl}/chat/completions`,{
        method:"POST", headers:{"Authorization":`Bearer ${this.config.apiKey}`,"Content-Type":"application/json"},
        body:JSON.stringify({model:this.config.model,messages:[{role:"system",content:req.systemPrompt},{role:"user",content:req.userPrompt}],temperature:req.temperature??0.3,max_tokens:req.maxTokens??2000}),
        signal:this.abortController.signal
      });
      clearTimeout(tid);
      if(!r.ok) { let d=""; try{const j=await r.json();d=j.error?.message||JSON.stringify(j);}catch(e){d="无详细信息";} throw new Error(`API ${r.status}: ${d}`); }
      const data=await r.json();
      return {content:data.choices[0].message.content,usage:data.usage,finishReason:data.choices[0].finish_reason};
    } catch(e){ if(e.name==="AbortError") throw new Error("请求超时"); throw e; }
    finally { this.abortController=null; }
  }
  cancel() { this.abortController?.abort(); }
}

class PromptManager {
  constructor() { this.builtin=new Map(); this.builtin.set(TASK_BREAKDOWN_PROMPT.id,TASK_BREAKDOWN_PROMPT); }
  get(id){return this.builtin.get(id);}
  renderTemplate(p,vars){let r=p.userPromptTemplate; for(const[k,v]of Object.entries(vars))r=r.replace(new RegExp(`{{${k}}}`,"g"),v); return r;}
}

class DayFlowAgent {
  constructor(provider,pm,app,settings){this.provider=provider;this.pm=pm;this.app=app;this.settings=settings;}
  async assist(input){const r=await this.provider.complete({systemPrompt:"你是一个得力的AI助手。请简洁清晰回答。",userPrompt:input,temperature:this.settings.temperature??0.3}); return r.content;}
}

// ============================================
// CORE FEATURES
// ============================================
class DayFlowCore {
  constructor(app,vm,settings){this.app=app;this.vm=vm;this.settings=settings;}
  async captureThought(content, type='capture') {
    const today=this.vm.getTodayString(),folder=this.settings.capturesFolder;
    const template=`# ${today} 闪念\n\n`;
    const file=await this.vm.createOrOpenNote(folder,today,template);
    const existing=await this.vm.readContent(file);
    const ts=new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'});
    const tag=type==='idea'?'#Idea ':type==='mood'?'#Mood ':'';
    await this.vm.updateContent(file,existing+`- [${ts}] ${tag}${content}\n`);
    const labels={idea:{title:"闪念已捕捉",icon:ICONS.lightbulb},mood:{title:"心绪已安放",icon:ICONS.wind}};
    const l=labels[type]||labels.idea;
    globalIsland.show({title:l.title,subtitle:`已记录到 ${today}`,type:"success",iconSvg:l.icon,duration:3000});
  }
  async openSchedule() {
    const today=this.vm.getTodayString(),wd=this.vm.getTodayWeekday(),folder=this.settings.schedulesFolder;
    const hl=this.settings.habits.map(h=>`- [ ] ${h}`).join('\n');
    const template=`# ${today} ${wd} 日程\n\n> 在这里自由规划你的一天...\n\n## 主线推进\n- [ ] 添加主线任务 #你的项目标签\n\n## 每日习惯\n${hl||'- [ ] 添加你的第一个习惯'}\n`;
    const file=await this.vm.createOrOpenNote(folder,today,template);
    await this.vm.openFile(file);
    globalIsland.show({title:"日程画布已打开",subtitle:`${today} ${wd}`,type:"success",iconSvg:ICONS.schedule,duration:2000});
  }
  async openCheckIn() {
    const today=this.vm.getTodayString();
    const fp=`${this.settings.schedulesFolder}/${today}.md`;
    const file=this.vm.vault.getAbstractFileByPath(fp);
    if(!file){globalIsland.show({title:"今日日程不存在",subtitle:"请先创建今日日程",type:"warning",iconSvg:ICONS.schedule,duration:3000});return;}
    await this.vm.openFile(file);
    globalIsland.show({title:"打开日程进行打卡",subtitle:"完成任务后勾选即可",type:"info",iconSvg:ICONS.checkin,duration:3000});
  }
  async openJournal() {
    const today=this.vm.getTodayString(),folder=this.settings.journalsFolder;
    const template=`# ${today} 心绪与闪念\n\n`;
    const file=await this.vm.createOrOpenNote(folder,today,template);
    await this.vm.openFile(file);
    globalIsland.show({title:"心绪画布已打开",subtitle:today,type:"success",iconSvg:ICONS.wind,duration:2000});
  }
  async captureJournalSnippet(type,content) {
    const today=this.vm.getTodayString(),folder=this.settings.schedulesFolder;
    const template=`# ${today} 心绪与闪念\n\n`;
    const file=await this.vm.createOrOpenNote(folder,today,template);
    const existing=await this.vm.readContent(file);
    const ts=new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'});
    const tag=type==='idea'?'#Idea':'#Mood';
    await this.vm.updateContent(file,existing+`- [${ts}] ${tag} ${content}\n`);
    globalIsland.show({title:type==='idea'?"闪念已捕捉":"心绪已安放",subtitle:`记录于 ${ts}`,type:"success",iconSvg:type==='idea'?ICONS.lightbulb:ICONS.wind,duration:3000});
  }
  async createDeepThought(title) {
    const today=this.vm.getTodayString(),folder=this.settings.journalsFolder;
    const safe=title.replace(/[\\/:*?"<>|]/g,'-');
    const template=`# ${title}\n\n> 记录日期：${today}\n> 标签：#深度思考 \n\n---\n\n`;
    const file=await this.vm.createOrOpenNote(folder,`${today}-${safe}`,template);
    await this.vm.openFile(file);
    globalIsland.show({title:"已开启专注画布",subtitle:title,type:"success",iconSvg:ICONS.feather,duration:3000});
  }
  async openHistory(ds) {
    const cp=`${this.settings.capturesFolder}/${ds}.md`;
    const sp=`${this.settings.schedulesFolder}/${ds}.md`;
    const jp=`${this.settings.journalsFolder}/${ds}.md`;
    const cf=this.vm.vault.getAbstractFileByPath(cp);
    const sf=this.vm.vault.getAbstractFileByPath(sp);
    const jf=this.vm.vault.getAbstractFileByPath(jp);
    if(!cf&&!sf&&!jf){globalIsland.show({title:"该日期无记录",subtitle:`${ds} 没有任何记录`,type:"info",iconSvg:ICONS.history,duration:3000});return null;}
    return{capturesFile:cf,schedulesFile:sf,journalsFile:jf};
  }
}


// ============================================
// CONSOLE MODAL - v2.1 里程碑样式项目追踪
// ============================================
class DayFlowConsoleModal extends obsidian.Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
    this.activeTab = "capture";
    this.isFullscreen = false;
    // 项目追踪状态
    this._projectCache = new Map();
    this._cacheExpiry = plugin.settings.projectCacheTTL || 30000;
    // 里程碑视图状态
    this.projLayout = "vertical"; // 'vertical' | 'horizontal'
    this.projMode = "card";       // 'card' | 'svg'
    this.projYear = "all";
    this.projMonth = "all";
    // tooltip
    this._tooltipEl = null;
    // 全部任务看板
    this.allTasksMode = false;
    this.allTasksTimeFilter = "all";
    this.captureTypeFilter = "all";
    // 闪念面板时间轴状态
    this.captureLayout = "vertical"; // 'vertical' | 'horizontal'
    this.captureMode = "card";       // 'card' | 'svg'
    this.captureYear = "all";
    this.captureMonth = "all";
    // 日程日历状态
    this.scheduleYear = new Date().getFullYear();
    this.scheduleMonth = new Date().getMonth();
    this.calendarCollapsed = false;

    // ===== 多选迁移任务相关状态 =====
    this.selectedTasks = new Set();
    this._migrateBtn = null;
    this._completeBtn = null;
    this._allTasksContainer = null;
    // 一键完成撤销状态
    this._lastCompletedTasks = null;
    this._lastCompletedTimeout = null;
  }

  onOpen() {
    this.modalEl.addClass("dayflow-modal-container");
    this.contentEl.addClass("dayflow-modal-content");
    this._initTooltip();
    this.render();
    requestAnimationFrame(() => requestAnimationFrame(() => this.modalEl.addClass("df-is-open")));
  }

  onClose() {
    this._removeTooltip();
    this.contentEl.empty();
  }

  _initTooltip() {
    if(this._tooltipEl) return;
    this._tooltipEl = document.createElement("div");
    this._tooltipEl.className = "df-tooltip";
    this._tooltipEl.innerHTML = '<div class="df-tooltip-inner"><div class="df-tooltip-date"></div><div class="df-tooltip-text"></div></div>';
    document.body.appendChild(this._tooltipEl);
  }

  _removeTooltip() {
    if(this._tooltipEl) { this._tooltipEl.remove(); this._tooltipEl = null; }
  }

  _showTooltip(e, date, text) {
    if(!this._tooltipEl) return;
    this._tooltipEl.querySelector(".df-tooltip-date").textContent = date;
    this._tooltipEl.querySelector(".df-tooltip-text").textContent = text;
    this._tooltipEl.classList.add("show");
    this._moveTooltip(e);
  }

  _moveTooltip(e) {
    if(!this._tooltipEl) return;
    const offset = 15, rect = this._tooltipEl.getBoundingClientRect();
    let left = e.clientX + offset, top = e.clientY + offset;
    if(left + rect.width > window.innerWidth) left = e.clientX - rect.width - offset;
    if(top + rect.height > window.innerHeight) top = e.clientY - rect.height - offset;
    this._tooltipEl.style.left = left + "px";
    this._tooltipEl.style.top = top + "px";
  }

  _hideTooltip() {
    if(this._tooltipEl) this._tooltipEl.classList.remove("show");
  }

  render() {
    this.contentEl.empty();
    const header = this.contentEl.createDiv({ cls: "dayflow-header" });
    header.createEl("h3", { cls: "dayflow-title", text: "DayFlow" });

    const switcher = header.createDiv({ cls: "dayflow-mode-switch" });
    const tabs = [
      { id: "capture", label: "闪念", icon: ICONS.capture },
      { id: "schedule", label: "日程", icon: ICONS.schedule },
      { id: "checkin", label: "打卡", icon: ICONS.checkin },
      { id: "projects", label: "项目", icon: ICONS.project }
    ];
    for(const tab of tabs) {
      const btn = switcher.createEl("button", { cls: `dayflow-mode-btn ${tab.id===this.activeTab?"active":""}` });
      btn.innerHTML = `${tab.icon}<span>${tab.label}</span>`;
      btn.onclick = () => { this.activeTab = tab.id; this.render(); };
    }

    const right = header.createDiv({ cls: "dayflow-header-controls", attr: { style: "display:flex;gap:8px;" } });
    const maxBtn = right.createEl("button", { cls: "dayflow-icon-btn", attr: { title: "全屏/还原" } });
    maxBtn.innerHTML = this.isFullscreen ? ICONS.minimize : ICONS.maximize;
    maxBtn.onclick = () => {
      this.isFullscreen = !this.isFullscreen;
      this.modalEl.classList.toggle("is-fullscreen", this.isFullscreen);
      maxBtn.innerHTML = this.isFullscreen ? ICONS.minimize : ICONS.maximize;
    };

    const main = this.contentEl.createDiv({ cls: "dayflow-main" });
    const sidebar = main.createDiv({ cls: "dayflow-sidebar" });
    this.renderSidebar(sidebar);
    const contentArea = main.createDiv({ cls: "dayflow-content" });
    this.renderContent(contentArea);
    this.renderFooter();
  }

  renderSidebar(container) {
    container.empty();
    const today = this.plugin.vaultManager.getTodayString();
    const weekday = this.plugin.vaultManager.getTodayWeekday();
    const dateBox = container.createDiv({ cls: "dayflow-date-box" });
    dateBox.createEl("div", { cls: "dayflow-date-day", text: today.split('-')[2] });
    dateBox.createEl("div", { cls: "dayflow-date-month", text: `${today.split('-')[1]}月 ${weekday}` });

    container.createEl("div", { cls: "dayflow-sidebar-title", text: "快捷入口" });
    const items = [
      { icon: ICONS.capture, label: "闪念胶囊", action: ()=>{this.close();this.plugin.quickCapture();} },
      { icon: ICONS.schedule, label: "今日日程", action: ()=>{this.close();this.plugin.openSchedule();} },
      { icon: ICONS.checkin, label: "行动打卡", action: ()=>{this.close();this.plugin.openCheckIn();} }
    ];
    for(const item of items) {
      const el = container.createDiv({ cls: "dayflow-quick-item" });
      el.innerHTML = `${item.icon}<span>${item.label}</span>`;
      el.onclick = item.action;
    }

    container.createEl("div", { cls: "dayflow-sidebar-title", attr: { style: "margin-top:20px" }, text: "最近记录" });
    this.renderRecentHistory(container);
  }

  async renderRecentHistory(container) {
    const today = new Date();
    const recent = [];
    for(let i=0;i<7;i++) {
      const d = new Date(today); d.setDate(d.getDate()-i);
      const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      const hc = !!this.app.vault.getAbstractFileByPath(`${this.plugin.settings.capturesFolder}/${ds}.md`);
      const hs = !!this.app.vault.getAbstractFileByPath(`${this.plugin.settings.schedulesFolder}/${ds}.md`);
      const hj = !!this.app.vault.getAbstractFileByPath(`${this.plugin.settings.journalsFolder}/${ds}.md`);
      if(hc||hs||hj) recent.push({ date: ds, hc, hs, hj });
    }
    if(recent.length===0){ container.createEl("div",{cls:"dayflow-placeholder",text:"暂无记录"}); return; }
    for(const day of recent.slice(0,5)) {
      const el = container.createDiv({ cls: "dayflow-history-item" });
      el.createSpan({ text: day.date });
      const badges = el.createDiv({ cls: "dayflow-history-badges" });
      if(day.hc) badges.innerHTML += ICONS.capture; if(day.hs) badges.innerHTML += ICONS.schedule; if(day.hj) badges.innerHTML += ICONS.journal;
      el.onclick = ()=>{ this.plugin.openHistory(day.date); this.close(); };
    }
  }

  renderContent(container) {
    container.empty();
    switch(this.activeTab) {
      case "capture": this.renderCaptureTab(container); break;
      case "schedule": this.renderScheduleTab(container); break;
      case "checkin": this.renderCheckInTab(container); break;
      case "projects": this.renderProjectsTab(container); break;
    }
  }

  // ========== 闪念面板（统一） ==========
  renderCaptureTab(container) {
    container.empty();
    container.createEl("h4",{text:"闪念",cls:"dayflow-tab-title"});
    container.createEl("p",{text:"捕捉一闪而过的想法，记录心绪与闪念。",cls:"dayflow-tab-desc"});

    // 类型筛选 + 新建标签
    const typeBar = container.createDiv({ cls: "df-tag-cloud sub", attr: { style: "padding:8px 0;" } });
    const types = [
      { id: "all", label: "全部" },
      { id: "idea", label: "闪念" },
      { id: "mood", label: "心绪" }
    ];
    for (const t of types) {
      const pill = typeBar.createDiv({ cls: `df-tag-pill sub ${t.id === this.captureTypeFilter ? 'active' : ''}` });
      pill.createSpan({ text: t.label });
      pill.onclick = () => {
        this.captureTypeFilter = t.id;
        typeBar.querySelectorAll('.df-tag-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.renderUnifiedTimeline(timelineContainer, this.captureTypeFilter);
      };
    }

    // 输入区
    const inputArea = container.createDiv({ cls: "dayflow-input-area" });
    const textarea = inputArea.createEl("textarea",{cls:"dayflow-textarea",attr:{placeholder:"此刻你在想什么？",rows:2}});
    const btnRow = container.createDiv({ cls: "dayflow-btn-row" });
    const saveBtn = btnRow.createEl("button",{cls:"dayflow-btn primary",text:"封存"});
    saveBtn.onclick = async ()=>{
      const content = textarea.value.trim(); if(!content) return;
      const type = this.captureTypeFilter === 'all' ? 'idea' : this.captureTypeFilter;
      await this.plugin.core.captureThought(content, type); textarea.value="";
      this.renderUnifiedTimeline(timelineContainer, this.captureTypeFilter);
    };
    const deepRow = container.createDiv({ attr: { style: "margin-top:8px;" } });
    const deepBtn = deepRow.createEl("button",{cls:"dayflow-btn",attr:{style:"width:100%;justify-content:center;padding:12px;"}});
    deepBtn.innerHTML=`${ICONS.feather}<span>开启深度思考</span>`;
    deepBtn.onclick = ()=>new DeepThoughtPromptModal(this.app,this.plugin,this).open();

    // 近期记录（里程碑时间轴）
    const timelineTitle = container.createEl("div",{cls:"dayflow-section-title dayflow-flex-title",attr:{style:"margin-top:24px;flex-shrink:0;"}});
    timelineTitle.innerHTML = `${ICONS.history}<span>近期记录</span>`;
    const timelineContainer = container.createDiv({ attr: { style: "flex:1;overflow:hidden;display:flex;flex-direction:column;min-height:0;" } });
    this.renderUnifiedTimeline(timelineContainer, this.captureTypeFilter);
  }

  async renderUnifiedTimeline(container, typeFilter) {
    container.empty();

    // === 工具栏 ===
    const toolbar = container.createDiv({ cls: "df-toolbar" });

    // 先收集数据，再构建年份下拉
    const items = await this._collectTimelineItems(typeFilter);
    const years = [...new Set(items.map(item => {
      const m = item.rawDate.match(/(\d{4})/);
      return m ? parseInt(m[1]) : null;
    }).filter(Boolean))].sort((a, b) => b - a);

    const yearSel = toolbar.createEl("select", { cls: "df-select" });
    yearSel.createEl("option", { text: "全部年份", value: "all" });
    years.forEach(y => yearSel.createEl("option", { text: `${y}年`, value: String(y) }));
    if (this.captureYear !== "all") yearSel.value = String(this.captureYear);

    const monthSel = toolbar.createEl("select", { cls: "df-select" });
    monthSel.createEl("option", { text: "全部月份", value: "all" });
    for (let i = 0; i < 12; i++) monthSel.createEl("option", { text: `${i + 1}月`, value: String(i) });
    if (this.captureMonth !== "all") monthSel.value = String(this.captureMonth);

    toolbar.createDiv({ cls: "df-spacer" });

    // 布局切换按钮
    const vertIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="3" width="12" height="18" rx="2" ry="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>`;
    const horizIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="3" y1="12" x2="21" y2="12"></line></svg>`;
    const layoutIcon = this.captureLayout === 'horizontal' ? vertIcon : horizIcon;
    const layoutTitle = this.captureLayout === 'horizontal' ? "切换为竖向" : "切换为横向";
    const layoutBtn = toolbar.createDiv({ cls: "df-tool-btn", attr: { title: layoutTitle } });
    layoutBtn.innerHTML = layoutIcon;
    if (this.captureMode === 'svg') layoutBtn.style.display = 'none';

    // 全览模式按钮
    const modeBtn = toolbar.createDiv({ cls: `df-tool-btn ${this.captureMode === 'svg' ? 'active' : ''}`, attr: { title: "全览视图" } });
    modeBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;

    // 内容区
    const contentBox = container.createDiv({ cls: "df-container", attr: { style: "padding-top:0;" } });

    const applyFilter = () => {
      this.captureYear = yearSel.value === "all" ? "all" : parseInt(yearSel.value);
      this.captureMonth = monthSel.value === "all" ? "all" : parseInt(monthSel.value);
      doRender();
    };
    yearSel.onchange = applyFilter;
    monthSel.onchange = applyFilter;
    layoutBtn.onclick = () => { this.captureLayout = this.captureLayout === 'vertical' ? 'horizontal' : 'vertical'; this.renderUnifiedTimeline(container, typeFilter); };
    modeBtn.onclick = () => { this.captureMode = this.captureMode === 'card' ? 'svg' : 'card'; this.renderUnifiedTimeline(container, typeFilter); };

    const doRender = () => {
      contentBox.empty();
      let filtered = items;
      if (this.captureYear !== "all") {
        filtered = filtered.filter(item => {
          const m = item.rawDate.match(/(\d{4})/);
          return m && parseInt(m[1]) === this.captureYear;
        });
      }
      if (this.captureMonth !== "all") {
        filtered = filtered.filter(item => {
          const m = item.rawDate.match(/(\d{4})-(\d{2})/);
          return m && parseInt(m[2]) - 1 === this.captureMonth;
        });
      }

      if (filtered.length === 0) {
        contentBox.createDiv({ cls: "dayflow-placeholder", text: `📭 此期间无记录` });
        return;
      }

      if (this.captureMode === 'svg') {
        this.renderSVGView(contentBox, filtered, "");
      } else {
        this.renderCardTimeline(contentBox, filtered, "", this.captureLayout);
      }
    };

    await doRender();
  }

  async _collectTimelineItems(typeFilter) {
    const items = [];
    const today = new Date();
    const days = this.plugin.settings.timelineDefaultDays || 10;

    // 扫描 Captures 和 Schedules
    const dailyFolders = [this.plugin.settings.capturesFolder, this.plugin.settings.schedulesFolder];
    for(let i=0; i<days; i++) {
      const d = new Date(today); d.setDate(d.getDate()-i);
      const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

      for(const folder of dailyFolders) {
        const file = this.app.vault.getAbstractFileByPath(`${folder}/${ds}.md`);
        if(file) {
          const content = await this.plugin.vaultManager.readContent(file);
          const lines = content.split('\n');
          for(const line of lines) {
            const m = line.match(/^\s*- \[(\d{2}:\d{2})\]\s+(?:#(Idea|Mood)\s+)?(.*)$/i);
            if(m) {
              const tag = m[2] ? m[2].toLowerCase() : '';
              let typeLabel="闪念", typeClass="idea";
              if(tag==='mood'){typeLabel="心绪";typeClass="mood";}
              if(typeFilter!=='all' && typeClass!==typeFilter) continue;
              items.push({id:`${file.path}_${items.length}`,date:ds.substring(5),rawDate:ds,time:m[1],text:m[3],file,typeLabel,typeClass});
            }
          }
        }
      }
    }

    // 扫描 Journals
    const jFiles = this.app.vault.getMarkdownFiles().filter(f=>f.path.startsWith(this.plugin.settings.journalsFolder));
    for(const file of jFiles) {
      const dm = file.basename.match(/(\d{4}-\d{2}-\d{2})/);
      if(!dm) continue;
      const fileDate = new Date(dm[1]+"T00:00:00");
      const diffDays = Math.floor((today-fileDate)/(1000*60*60*24));
      if(diffDays>days) continue;

      const content = await this.plugin.vaultManager.readContent(file);
      const lines = content.split('\n');

      for(const line of lines) {
        const m = line.match(/^\s*- \[(\d{2}:\d{2})\]\s+(?:#(Idea|Mood)\s+)?(.*)$/i);
        if(m) {
          const tag = m[2] ? m[2].toLowerCase() : '';
          let typeLabel="闪念", typeClass="idea";
          if(tag==='mood'){typeLabel="心绪";typeClass="mood";}
          if(typeFilter!=='all' && typeClass!==typeFilter) continue;
          items.push({id:`${file.path}_${items.length}`,date:dm[1].substring(5),rawDate:dm[1],time:m[1],text:m[3],file,typeLabel,typeClass});
        }
      }

      if(typeFilter==='all') {
        const title = file.basename.replace(/^\d{4}-\d{2}-\d{2}-?\s*/,'');
        if(title) {
          items.push({id:file.path,date:dm[1].substring(5),rawDate:dm[1],time:'',text:title,file,typeLabel:"深度思考",typeClass:"journal"});
        }
      }
    }

    items.sort((a,b)=>b.rawDate.localeCompare(a.rawDate)||b.time.localeCompare(a.time));
    return items;
  }

  // ========== 日程面板（日历） ==========
  renderScheduleTab(container) {
    container.empty();
    container.setAttribute('style', 'flex:1;overflow-y:auto;min-height:0;display:flex;flex-direction:column;');

    // 工具栏：月份导航
    const toolbar = container.createDiv({ cls: "df-toolbar" });
    toolbar.createEl("span",{attr:{style:"font-size:13px;font-weight:700;"},text:"日程日历"});
    toolbar.createDiv({ cls: "df-spacer" });
    const prevBtn = toolbar.createEl("button",{cls:"df-tool-btn",attr:{title:"上一月"}});
    prevBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>`;
    const monthLabel = toolbar.createEl("span",{attr:{style:"font-size:12px;font-weight:600;color:var(--text-muted);"}});
    const nextBtn = toolbar.createEl("button",{cls:"df-tool-btn",attr:{title:"下一月"}});
    nextBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
    const monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    const updateLabel = ()=>{ monthLabel.textContent = `${this.scheduleYear}年 ${monthNames[this.scheduleMonth]}`; };
    updateLabel();
    prevBtn.onclick = ()=>{
      this.scheduleMonth--; if(this.scheduleMonth<0){this.scheduleMonth=11;this.scheduleYear--;}
      updateLabel(); this._renderCalendarGrid(); this._schedulePreview.empty();
    };
    nextBtn.onclick = ()=>{
      this.scheduleMonth++; if(this.scheduleMonth>11){this.scheduleMonth=0;this.scheduleYear++;}
      updateLabel(); this._renderCalendarGrid(); this._schedulePreview.empty();
    };

    // 日历区域（点击后自动向上收缩，格子从正方形变扁）
    this._scheduleGrid = container.createDiv({ attr: { style: "padding:8px 0 16px;transition:padding 0.35s ease;" } });

    // 选中日期预览（默认收起，点击后通过 grid 动画滑出，极丝滑）
    this._schedulePreview = container.createDiv({ attr: { style: "display:grid;grid-template-rows:0fr;transition:grid-template-rows 0.45s cubic-bezier(0.34,1.56,0.64,1);" } });

    this._renderCalendarGrid();

    // 如果有 post-render 回调（如 Orb 今日日程自动展开当天详情），延迟执行
    if (this._postRenderCallback) {
      requestAnimationFrame(() => {
        this._postRenderCallback(this);
        this._postRenderCallback = null;
      });
    }
  }

  _renderCalendarGrid() {
    const container = this._scheduleGrid;
    container.empty();
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    const year = this.scheduleYear, month = this.scheduleMonth;
    const grid = container.createDiv({ cls: "df-calendar-grid" });

    // 星期标题
    for(const wd of ['日','一','二','三','四','五','六']) {
      grid.createDiv({ cls: "df-calendar-weekday", text: wd });
    }

    // 月首星期几 & 天数
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    // 上月补位
    for(let i = 0; i < firstDay; i++) {
      const cell = grid.createDiv({ cls: "df-calendar-cell other-month" });
      cell.createSpan({ text: String(prevMonthDays - firstDay + 1 + i) });
    }

    // 本月日期
    for(let day = 1; day <= daysInMonth; day++) {
      const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const isToday = ds === todayStr;
      const file = this.app.vault.getAbstractFileByPath(`${this.plugin.settings.schedulesFolder}/${ds}.md`);
      const captureFile = this.app.vault.getAbstractFileByPath(`${this.plugin.settings.capturesFolder}/${ds}.md`);
      const journalFile = this.app.vault.getAbstractFileByPath(`${this.plugin.settings.journalsFolder}/${ds}.md`);
      const hasSchedule = !!file;

      const cell = grid.createDiv({ cls: `df-calendar-cell${isToday?' today':''}${hasSchedule?' has-schedule':''}` });
      cell.createSpan({ text: String(day) });

      // 画小圆点
      const dots = cell.createDiv({ cls: "cell-indicators" });
      if (file) dots.createDiv({ cls: "dot schedule" });
      if (captureFile) dots.createDiv({ cls: "dot capture" });
      if (journalFile) dots.createDiv({ cls: "dot journal" });

      // 画底部的绿色细线进度条
      const progress = cell.createDiv({ cls: "cell-progress" });
      progress.style.width = file ? "50%" : "0%";

      // 单击：切换折叠/展开
      cell.onclick = () => {
        grid.querySelectorAll('.df-calendar-cell.selected').forEach(c => c.classList.remove('selected'));
        cell.classList.add('selected');
        if (this.calendarCollapsed) {
          // 已折叠 → 展开日历，收起预览
          this.calendarCollapsed = false;
          grid.classList.remove('is-collapsed');
          this._scheduleGrid.style.padding = '8px 0 16px';
          this._schedulePreview.style.gridTemplateRows = '0fr';
        } else {
          // 未折叠 → 折叠日历，展开预览
          this.calendarCollapsed = true;
          grid.classList.add('is-collapsed');
          this._scheduleGrid.style.padding = '4px 0 8px';
          this._renderSchedulePreview(ds, file);
          this._schedulePreview.style.gridTemplateRows = '1fr';
        }
      };
      // 双击：打开文件
      cell.ondblclick = async () => {
        if(file) { await this.plugin.vaultManager.openFile(file); }
        else { await this.plugin.openSchedule(); }
        this.close();
      };
    }

    // 下月补位
    const totalCells = firstDay + daysInMonth;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for(let i = 1; i <= remaining; i++) {
      const cell = grid.createDiv({ cls: "df-calendar-cell other-month" });
      cell.createSpan({ text: String(i) });
    }
  }

  async _renderSchedulePreview(ds, file) {
    const container = this._schedulePreview;
    container.empty();
    // grid 动画的内层包裹，overflow:hidden 是核心
    const wrapper = container.createDiv({ attr: { style: "overflow:hidden;min-height:0;" } });

    const d = new Date(ds + "T00:00:00");
    const weekdays = ['周日','周一','周二','周三','周四','周五','周六'];
    const preview = wrapper.createDiv({ cls: "df-schedule-preview" });
    const header = preview.createDiv({ cls: "df-schedule-preview-header" });
    header.createEl("span",{cls:"df-schedule-preview-date",text:`${d.getMonth()+1}月${d.getDate()}日 ${weekdays[d.getDay()]}`});
    const openBtn = header.createEl("button",{cls:"dayflow-btn",attr:{style:"font-size:11px;padding:4px 10px;"}});
    openBtn.innerHTML = `${ICONS.edit}<span>打开</span>`;
    openBtn.onclick = async () => {
      if(file) { await this.plugin.vaultManager.openFile(file); } else { await this.plugin.openSchedule(); }
      this.close();
    };
    const layout = preview.createDiv({ cls: "preview-layout" });
    requestAnimationFrame(() => preview.addClass("df-is-visible"));

    // --- 建造左边的房间（放日程） ---
    const leftCard = layout.createDiv({ cls: "preview-card" });
    leftCard.innerHTML = `<div class="preview-card-title">主线与习惯</div>`;
    if(file) {
      // 让系统去读日程里的内容
      this.plugin.vaultManager.readContent(file).then(content => {
        const TEMPLATE_TEXT = '添加主线任务 #你的项目标签';
        const lines = content.split('\n').filter(l => l.match(/^\s*- \[[ xX]\]/) && !l.includes(TEMPLATE_TEXT));
        if(lines.length === 0) { leftCard.createDiv({text: "今日日程空白", cls: "dayflow-preview-line"}); }
        else {
          for(const line of lines.slice(0, 5)) {
            const done = line.match(/^\s*- \[x\]/i);
            const cleanText = line.replace(/^\s*- \[[ xX]\]\s*/, '• ');
            const { plainText, tags } = this._extractTags(cleanText);
            const el = leftCard.createEl("div", { cls: done ? "dayflow-preview-line done" : "dayflow-preview-line" });
            // 文字和标签自然排列，标签紧跟文字
            let html = this.escapeHtml(plainText);
            if (tags.length > 0) {
              html += ' ' + tags.map(t => `<span class="df-highlight-tag" style="font-size:10px;">${this.escapeHtml(t)}</span>`).join(' ');
            }
            el.innerHTML = html;
          }
        }
      });
    } else {
      leftCard.createDiv({ text: "尚未创建日程", cls: "dayflow-preview-line" });
    }

    // --- 建造右边的房间（放闪念） ---
    const rightCard = layout.createDiv({ cls: "preview-card" });
    rightCard.innerHTML = `<div class="preview-card-title">闪念与心绪</div>`;
    const capFile = this.app.vault.getAbstractFileByPath(`${this.plugin.settings.capturesFolder}/${ds}.md`);
    if(capFile) {
      // 让系统去读闪念里的内容
      this.plugin.vaultManager.readContent(capFile).then(content => {
        const lines = content.split('\n').filter(l => l.includes('-['));
        if(lines.length === 0) { rightCard.createDiv({text: "今日没有闪念", cls: "dayflow-preview-line"}); }
        else {
          for(const line of lines.slice(0, 3)) { // 最多展示3条
            const textDiv = rightCard.createDiv();
            textDiv.innerHTML = `<span class="capture-tag">#闪念</span><p class="capture-text">${line.replace(/^\s*- \[\d{2}:\d{2}\]\s*(?:#\w+\s*)?/, '')}</p>`;
          }
        }
      });
    } else {
      rightCard.createDiv({ text: "今日没有闪念记录", cls: "dayflow-preview-line" });
    }
  }

  // ========== 打卡面板 ==========
  async renderCheckInTab(container) {
    container.empty();
    const scrollArea = container.createDiv({ cls: "df-container", attr: { style: "padding-top:0;" } });
    scrollArea.createEl("h4",{text:"行动打卡",cls:"dayflow-tab-title"});
    const heatmapTitle = scrollArea.createEl("div",{cls:"dayflow-section-title dayflow-flex-title"});
    heatmapTitle.innerHTML = `${ICONS.activity}<span>过去 30 天打卡热力图</span>`;
    const heatmapBox = scrollArea.createDiv({ cls: "dayflow-heatmap-container" });
    await this.renderHeatmap(heatmapBox);
    const habitsTitle = scrollArea.createEl("div",{cls:"dayflow-section-title dayflow-flex-title",attr:{style:"margin-top:24px;"}});
    habitsTitle.innerHTML = `${ICONS.checkin}<span>今日习惯</span>`;
    const habitsList = scrollArea.createDiv({ cls: "dayflow-habits-list" });
    await this.renderHabitsList(habitsList);
    const managerTitle = scrollArea.createEl("div",{cls:"dayflow-section-title dayflow-flex-title",attr:{style:"margin-top:24px;"}});
    managerTitle.innerHTML = `${ICONS.settings}<span>习惯管理</span>`;
    const managerBox = scrollArea.createDiv({ cls: "dayflow-habit-manager" });
    const addInput = managerBox.createEl("input",{attr:{placeholder:"输入新习惯名称..."},cls:"dayflow-input"});
    const addBtn = managerBox.createEl("button",{text:"添加",cls:"dayflow-btn primary"});
    const addHabit = async ()=>{ if(addInput.value.trim()){ this.plugin.settings.habits.push(addInput.value.trim()); await this.plugin.saveSettings(); this.renderCheckInTab(container); } };
    addBtn.onclick = addHabit;
    addInput.onkeydown = (e)=>{ if(e.key==="Enter"){e.preventDefault();addHabit();} };
  }

  async renderHeatmap(container) {
    const today = new Date(); const daysData = [];
    for(let i=29;i>=0;i--) {
      const d = new Date(today); d.setDate(d.getDate()-i);
      const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      const file = this.app.vault.getAbstractFileByPath(`${this.plugin.settings.schedulesFolder}/${ds}.md`);
      let count = 0; if(file) { const content=await this.plugin.vaultManager.readContent(file); const m=content.match(/- \[x\] /gi); count=m?m.length:0; }
      daysData.push({date:ds,count});
    }
    const grid = container.createDiv({ cls: "df-heatmap-grid" });
    daysData.forEach(day=>{ let level=0; if(day.count>0)level=1; if(day.count>=2)level=2; if(day.count>=4)level=3; grid.createDiv({cls:`df-heatmap-cell l${level}`,attr:{title:`${day.date}: 完成 ${day.count} 项`}}); });
  }

  async renderHabitsList(container) {
    container.empty();
    const today = this.plugin.vaultManager.getTodayString();
    const fp = `${this.plugin.settings.schedulesFolder}/${today}.md`;
    const file = this.app.vault.getAbstractFileByPath(fp);
    if(!file){ container.createEl("div",{cls:"dayflow-placeholder",text:"今日日程尚未创建，请先在快捷入口生成日程画布。"}); return; }
    const content = await this.plugin.vaultManager.readContent(file);
    if(!this.plugin.settings.habits||this.plugin.settings.habits.length===0){ container.createEl("div",{cls:"dayflow-placeholder",text:"尚未添加每日习惯，请在下方添加。"}); return; }
    this.plugin.settings.habits.forEach(habit=>{
      const escaped = habit.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      const isChecked = new RegExp(`^\\s*- \\[x\\]\\s+${escaped}.*$`,'im').test(content);
      const item = container.createDiv({ cls: `dayflow-habit-item ${isChecked?'is-checked':''}` });
      const left = item.createDiv({ cls: "dayflow-habit-left" });
      const checkbox = left.createEl("input",{type:"checkbox",cls:"dayflow-habit-checkbox"}); checkbox.checked=isChecked;
      left.createSpan({ text: habit, cls: "dayflow-habit-name" });
      const right = item.createDiv({ cls: "dayflow-habit-right" });
      const noteBtn = right.createEl("button",{cls:"dayflow-habit-note-btn",attr:{title:"记录感想"}}); noteBtn.innerHTML=ICONS.edit;
      const delBtn = right.createEl("button",{cls:"dayflow-habit-del-btn",attr:{title:"删除此习惯"}}); delBtn.innerHTML=ICONS.trash;
      checkbox.onchange = async ()=>{
        let latest = await this.app.vault.read(file);
        const targetState = checkbox.checked;
        const existRegex = new RegExp(`^(\\s*- \\[[^\\]])(\\]\\s+${escaped}.*)$`,'im');
        if(existRegex.test(latest)) latest = latest.replace(existRegex, targetState?'$1x$2':'$1 $2');
        else { const sr = /## 每日习惯\s*\n/; const nl = `- [${targetState?'x':' '}] ${habit}\n`; if(sr.test(latest)) latest=latest.replace(sr,`## 每日习惯\n${nl}`); else latest+=`\n## 每日习惯\n${nl}`; }
        await this.app.vault.modify(file,latest); this.renderCheckInTab(this.contentEl.querySelector('.dayflow-content'));
      };
      noteBtn.onclick = ()=>new HabitNoteModal(this.app,this.plugin,habit).open();
      delBtn.onclick = async ()=>{ this.plugin.settings.habits=this.plugin.settings.habits.filter(h=>h!==habit); await this.plugin.saveSettings(); this.renderCheckInTab(this.contentEl.querySelector('.dayflow-content')); };
    });
  }


  // ============================================
  // 项目追踪面板 - 里程碑样式 v2.1
  // ============================================
  renderProjectsTab(container) {
    container.empty();
    container.addClass("dayflow-flex-col-container");

    // ===== 顶部切换栏: 项目追踪 / 全部任务 =====
    const switchBar = container.createDiv({ attr: { style: "display:flex;align-items:center;gap:6px;padding:8px 0;border-bottom:1px solid var(--background-modifier-border-hover);flex-shrink:0;" } });
    const projectSwitchBtn = switchBar.createEl("button", {
      cls: "dayflow-mode-btn " + (this.allTasksMode ? "" : "active"),
      attr: { style: "padding:6px 12px;font-size:12px;" }
    });
    projectSwitchBtn.innerHTML = `${ICONS.project}<span>项目追踪</span>`;
    projectSwitchBtn.onclick = () => { this.allTasksMode = false; this.renderProjectsTab(container); };

    const allTasksSwitchBtn = switchBar.createEl("button", {
      cls: "dayflow-mode-btn " + (this.allTasksMode ? "active" : ""),
      attr: { style: "padding:6px 12px;font-size:12px;" }
    });
    allTasksSwitchBtn.innerHTML = `${ICONS.checkin}<span>全部任务</span>`;
    allTasksSwitchBtn.onclick = () => { this.allTasksMode = true; this.renderProjectsTab(container); };

    // ===== 全部任务看板 =====
    if (this.allTasksMode) {
      this.renderAllTasksBoard(container);
      return;
    }

    // ===== 项目追踪模式 (原有逻辑) =====
    // 添加项目输入
    const managerBox = container.createDiv({ cls: "dayflow-habit-manager", attr: { style: "margin:12px 0 12px;" } });
    const addInput = managerBox.createEl("input", { attr: { placeholder: "输入一级项目标签，例如 #考研" }, cls: "dayflow-input" });
    const addBtn = managerBox.createEl("button", { text: "添加主线", cls: "dayflow-btn primary" });
    const addProject = async () => {
      let tag = addInput.value.trim();
      if (tag) {
        if (!tag.startsWith("#")) tag = "#" + tag;
        if (!this.plugin.settings.projects) this.plugin.settings.projects = [];
        if (!this.plugin.settings.projects.includes(tag)) {
          this.plugin.settings.projects.push(tag);
          await this.plugin.saveSettings();
          this._projectCache.delete(tag);
          this.renderProjectsTab(container);
        }
      }
    };
    addBtn.onclick = addProject;
    addInput.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); addProject(); } };

    if (!this.plugin.settings.projects || this.plugin.settings.projects.length === 0) {
      container.createEl("div", { cls: "dayflow-placeholder", text: "暂无主线，请在上方添加你的主线 Tag" });
      return;
    }

    // 状态变量 (闭包内)
    let activeProject = this.plugin.settings.projects[0];
    let activeSubFilter = null;

    // 标签云容器
    const tagArea = container.createDiv({ attr: { style: "margin-bottom:8px;" } });
    const primaryTagCloud = tagArea.createDiv({ cls: "df-tag-cloud primary" });
    const subTagCloud = tagArea.createDiv({ cls: "df-tag-cloud sub" });

    // 统计卡片
    const statsContainer = container.createDiv({ cls: "df-stats-row" });

    // 子标签进度条
    const subTagBarContainer = container.createDiv({ cls: "df-subtag-bar", attr: { style: "display:none;" } });

    // 里程碑视图容器
    const milestoneContainer = container.createDiv({ attr: { style: "flex:1;overflow:hidden;display:flex;flex-direction:column;min-height:0;" } });

    const renderTagUI = () => {
      primaryTagCloud.empty();
      subTagCloud.empty();

      // 一级标签
      this.plugin.settings.projects.forEach(tag => {
        const pill = primaryTagCloud.createDiv({ cls: `df-tag-pill ${tag === activeProject ? 'active' : ''}` });
        pill.createSpan({ text: tag });
        const delBtn = pill.createSpan({ cls: "del-btn", text: "×" });
        delBtn.onclick = async (e) => {
          e.stopPropagation();
          this.plugin.settings.projects = this.plugin.settings.projects.filter(t => t !== tag);
          await this.plugin.saveSettings();
          this._projectCache.delete(tag);
          if (activeProject === tag) activeProject = this.plugin.settings.projects[0] || null;
          renderTagUI();
          if (activeProject) refreshAll();
          else { statsContainer.empty(); subTagBarContainer.empty(); subTagBarContainer.style.display = "none"; milestoneContainer.empty(); }
        };
        pill.onclick = () => { activeProject = tag; activeSubFilter = null; renderTagUI(); refreshAll(); };
      });

      // 子标签自动发现
      if (activeProject) {
        const subTags = new Set();
        const targetPrefix = activeProject.toLowerCase() + "/";
        const files = this.app.vault.getMarkdownFiles().filter(f =>
          f.path.startsWith(this.plugin.settings.schedulesFolder) ||
          f.path.startsWith(this.plugin.settings.journalsFolder) ||
          f.path.startsWith(this.plugin.settings.capturesFolder)
        );
        files.forEach(f => {
          const cache = this.app.metadataCache.getFileCache(f);
          if (cache && cache.tags) cache.tags.forEach(t => { if (t.tag.toLowerCase().startsWith(targetPrefix)) subTags.add(t.tag); });
        });

        if (subTags.size > 0) {
          const allPill = subTagCloud.createDiv({ cls: `df-tag-pill sub ${activeSubFilter === null ? 'active' : ''}` });
          allPill.createSpan({ text: "全部进度" });
          allPill.onclick = () => { activeSubFilter = null; renderTagUI(); refreshAll(); };
          Array.from(subTags).sort().forEach(subTag => {
            const isActive = activeSubFilter === subTag;
            const subPill = subTagCloud.createDiv({ cls: `df-tag-pill sub ${isActive ? 'active' : ''}` });
            const displayName = subTag.substring(activeProject.length + 1);
            subPill.createSpan({ text: displayName });
            subPill.onclick = () => { activeSubFilter = subTag; renderTagUI(); refreshAll(); };
          });
        }
      }
    };

    const refreshAll = () => {
      this.renderProjectStats(activeProject, activeSubFilter, statsContainer);
      this.renderSubTagBar(activeProject, activeSubFilter, subTagBarContainer);
      this.renderProjectMilestone(activeProject, activeSubFilter, milestoneContainer);
    };

    renderTagUI();
    refreshAll();
  }

  // 统计卡片
  async renderProjectStats(projectTag, subFilter, container) {
    container.empty();
    const queryTag = subFilter || projectTag;
    const cacheKey = `stats_${queryTag}`;
    const cached = this._projectCache.get(cacheKey);
    const now = Date.now();
    let stats;
    if (cached && (now - cached.timestamp < this._cacheExpiry)) {
      stats = cached.data;
    } else {
      stats = await this.computeProjectStats(queryTag);
      this._projectCache.set(cacheKey, { data: stats, timestamp: now });
    }

    const fileCard = container.createDiv({ cls: "df-stat-card" });
    fileCard.innerHTML = `${ICONS.fileText}<div class="df-stat-num">${stats.fileCount}</div><div class="df-stat-label">相关文件</div>`;
    const rateColor = stats.completionRate >= 80 ? 'var(--color-green)' : stats.completionRate >= 50 ? 'var(--color-yellow)' : 'var(--color-red)';
    const rateCard = container.createDiv({ cls: "df-stat-card" });
    rateCard.innerHTML = `${ICONS.target}<div class="df-stat-num" style="color:${rateColor}">${stats.completionRate}%</div><div class="df-stat-label">完成率</div>`;
    const taskCard = container.createDiv({ cls: "df-stat-card" });
    taskCard.innerHTML = `${ICONS.check}<div class="df-stat-num">${stats.completedTasks}/${stats.totalTasks}</div><div class="df-stat-label">已完成</div>`;
    const activeCard = container.createDiv({ cls: "df-stat-card" });
    const laText = stats.lastActive ? stats.lastActive.substring(5) : '无记录';
    activeCard.innerHTML = `${ICONS.clock}<div class="df-stat-num" style="font-size:13px">${laText}</div><div class="df-stat-label">最近活跃</div>`;
  }

  // 子标签进度条
  async renderSubTagBar(projectTag, subFilter, container) {
    container.empty();
    const queryTag = subFilter || projectTag;
    const stats = await this.computeProjectStats(queryTag);
    if (!stats.subTagDistribution || stats.subTagDistribution.length === 0) {
      container.style.display = "none"; return;
    }
    container.style.display = "flex";
    stats.subTagDistribution.forEach(({ name, count, total }) => {
      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
      const item = container.createDiv({ cls: "df-subtag-item" });
      item.innerHTML = `<span class="df-subtag-name">${name}</span><div class="df-subtag-track"><div class="df-subtag-fill" style="width:${pct}%"></div></div><span class="df-subtag-pct">${pct}%</span>`;
    });
  }

  async computeProjectStats(queryTag) {
    const files = await this.queryProjectNotes(queryTag);
    let totalTasks = 0, completedTasks = 0, lastActive = null;
    const subTagCounts = new Map();
    const prefix = queryTag.toLowerCase() + '/';
    for (const file of files) {
      const dm = file.basename.match(/(\d{4}-\d{2}-\d{2})/);
      if (dm && (!lastActive || dm[1] > lastActive)) lastActive = dm[1];
      try {
        const content = await this.plugin.vaultManager.readContent(file);
        const lines = content.split('\n');
        for (const line of lines) {
          const ll = line.toLowerCase();
          const tagMatch = ll.includes(queryTag.toLowerCase()) || (ll + ' ').includes(prefix);
          if (tagMatch) {
            const tm = line.match(/^\s*- \[([ xX])\]\s*/);
            if (tm) { totalTasks++; if (tm[1].toLowerCase() === 'x') completedTasks++; }
            const tr = /#[^\s#\/]+\/[^\s#]+/g; let m;
            while ((m = tr.exec(line)) !== null) { const ft = m[0]; if (ft.toLowerCase().startsWith(prefix)) { const sn = ft.substring(queryTag.length + 1).split('/')[0]; subTagCounts.set(sn, (subTagCounts.get(sn) || 0) + 1); } }
          }
        }
      } catch (e) { }
    }
    return {
      fileCount: files.length, totalTasks, completedTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      lastActive,
      subTagDistribution: Array.from(subTagCounts.entries()).map(([name, count]) => ({ name, count, total: totalTasks })).sort((a, b) => b.count - a.count).slice(0, 5)
    };
  }

  async queryProjectNotes(queryTag) {
    const tl = queryTag.toLowerCase();
    const now = Date.now();
    const cached = this._projectCache.get(tl);
    if (cached && (now - cached.timestamp < this._cacheExpiry)) return cached.files;
    const files = this.app.vault.getMarkdownFiles().filter(f => {
      if (!f.path.startsWith(this.plugin.settings.schedulesFolder) && !f.path.startsWith(this.plugin.settings.journalsFolder) && !f.path.startsWith(this.plugin.settings.capturesFolder)) return false;
      const cache = this.app.metadataCache.getFileCache(f);
      if (!cache || !cache.tags) return false;
      return cache.tags.some(t => { const ct = t.tag.toLowerCase(); return ct === tl || ct.startsWith(tl + "/"); });
    });
    files.sort((a, b) => b.basename.localeCompare(a.basename));
    this._projectCache.set(tl, { files, timestamp: now });
    return files;
  }

  // ============================================
  // 里程碑时间轴渲染 (核心 - 来自用户代码)
  // ============================================
  async renderProjectMilestone(parentTag, subTagFilter, container) {
    container.empty();
    const queryTag = subTagFilter || parentTag;

    // 工具栏
    const toolbar = container.createDiv({ cls: "df-toolbar" });

    // 年份下拉
    const years = [...new Set((await this.queryProjectNotes(queryTag)).map(f => {
      const m = f.basename.match(/(\d{4})/); return m ? parseInt(m[1]) : null;
    }).filter(Boolean))].sort((a, b) => b - a);
    const yearSel = toolbar.createEl("select", { cls: "df-select" });
    yearSel.createEl("option", { text: "全部年份", value: "all" });
    years.forEach(y => yearSel.createEl("option", { text: `${y}年`, value: String(y) }));
    if (this.projYear !== "all") yearSel.value = String(this.projYear);

    // 月份下拉
    const monthSel = toolbar.createEl("select", { cls: "df-select" });
    monthSel.createEl("option", { text: "全部月份", value: "all" });
    for (let i = 0; i < 12; i++) monthSel.createEl("option", { text: `${i + 1}月`, value: String(i) });
    if (this.projMonth !== "all") monthSel.value = String(this.projMonth);

    toolbar.createDiv({ cls: "df-spacer" });

    // 布局切换按钮
    const vertIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="3" width="12" height="18" rx="2" ry="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>`;
    const horizIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="3" y1="12" x2="21" y2="12"></line></svg>`;
    const layoutIcon = this.projLayout === 'horizontal' ? vertIcon : horizIcon;
    const layoutTitle = this.projLayout === 'horizontal' ? "切换为竖向" : "切换为横向";
    const layoutBtn = toolbar.createDiv({ cls: "df-tool-btn", attr: { title: layoutTitle } });
    layoutBtn.innerHTML = layoutIcon;
    if (this.projMode === 'svg') layoutBtn.style.display = 'none';

    // 模式切换按钮
    const modeBtn = toolbar.createDiv({ cls: `df-tool-btn ${this.projMode === 'svg' ? 'active' : ''}`, attr: { title: "全览视图" } });
    modeBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;

    // 内容区
    const contentBox = container.createDiv({ cls: "df-container" });

    // 筛选逻辑
    const applyFilter = () => {
      this.projYear = yearSel.value === "all" ? "all" : parseInt(yearSel.value);
      this.projMonth = monthSel.value === "all" ? "all" : parseInt(monthSel.value);
      doRender();
    };
    yearSel.onchange = applyFilter;
    monthSel.onchange = applyFilter;
    layoutBtn.onclick = () => { this.projLayout = this.projLayout === 'vertical' ? 'horizontal' : 'vertical'; this.renderProjectMilestone(parentTag, subTagFilter, container); };
    modeBtn.onclick = () => { this.projMode = this.projMode === 'card' ? 'svg' : 'card'; this.renderProjectMilestone(parentTag, subTagFilter, container); };

    const doRender = async () => {
      contentBox.empty();
      const relevantFiles = await this.queryProjectNotes(queryTag);
      const items = [];

      for (const file of relevantFiles.slice(0, 20)) {
        try {
          const content = await this.plugin.vaultManager.readContent(file);
          const cleanContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
          const lines = cleanContent.split('\n');
          const escapedTag = queryTag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const blockFilterRegex = new RegExp(`${escapedTag}(?=[\\s/#]|$)`, "i");

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (blockFilterRegex.test(line)) {
              const blockLines = [line];
              let j = i + 1;
              while (j < lines.length) {
                const nextLine = lines[j];
                if (nextLine.trim() === '' || (nextLine.match(/^\s{2,}/) && !nextLine.match(/^\s*- /))) { blockLines.push(nextLine); j++; }
                else break;
              }
              // 筛选年月
              const dm = file.basename.match(/(\d{4})-(\d{2})/);
              if (dm) {
                if (this.projYear !== "all" && parseInt(dm[1]) !== this.projYear) continue;
                if (this.projMonth !== "all" && parseInt(dm[2]) - 1 !== this.projMonth) continue;
              }

              let typeLabel = "记录", typeClass = "";
              if (file.path.startsWith(this.plugin.settings.schedulesFolder)) { typeLabel = "日程"; typeClass = "schedule"; }
              else if (file.path.startsWith(this.plugin.settings.journalsFolder)) { typeLabel = "日记"; typeClass = "journal"; }
              else if (file.path.startsWith(this.plugin.settings.capturesFolder)) { typeLabel = "闪念"; typeClass = "idea"; }

              items.push({
                id: `${file.path}_${i}`,
                date: dm ? `${dm[1]}-${dm[2]}` : file.basename,
                rawDate: dm ? `${dm[1]}-${dm[2]}` : file.basename,
                text: blockLines.join('\n'),
                file,
                typeLabel,
                typeClass
              });
              i = j - 1;
            }
          }
        } catch (e) { }
      }

      if (items.length === 0) {
        contentBox.createDiv({ cls: "dayflow-placeholder", text: `📭 此期间无记录` });
        return;
      }

      if (this.projMode === 'svg') {
        this.renderSVGView(contentBox, items, queryTag);
      } else {
        this.renderCardTimeline(contentBox, items, queryTag);
      }
    };

    await doRender();
  }

  // 卡片时间轴 (竖向/横向 + 曲线)
  renderCardTimeline(container, items, queryTag, layout = this.projLayout) {
    const flow = container.createDiv({ cls: `df-flow ${layout}` });
    const highlightRegex = queryTag ? new RegExp(`(${queryTag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:/[^\\s#]+)*)`, "gi") : null;

    items.forEach((item, i) => {
      const side = layout === 'vertical' ? (i % 2 === 0 ? 'left' : 'right') : (i % 2 === 0 ? 'top' : 'bottom');
      const styleObj = layout === 'vertical'
        ? `margin-bottom:${Math.floor(Math.random() * 20)}px;`
        : `margin-top:${Math.floor(Math.random() * 60)}px;`;

      const row = flow.createDiv({ cls: `df-row ${side}`, attr: { style: styleObj } });

      // 锚点 - 放在 row 下作为直接子元素，定位到中心线
      row.createDiv({ cls: "df-anchor" });

      const wrap = row.createDiv({ cls: "df-card-wrap" });

      // 卡片
      const card = wrap.createDiv({ cls: "df-card" });

      // 类型 badge
      const badge = card.createDiv({ cls: `df-type-badge dayflow-badge-${item.typeClass}` });
      badge.textContent = item.typeLabel;

      // 日期
      card.createSpan({ cls: "df-date", text: item.rawDate });

      // 内容：分离复选框/文字/标签，渲染加粗，标签高亮
      const textDiv = card.createDiv({ cls: "df-text" });
      let rawText = item.text.trim();
      // 提取复选框状态（支持 [ ], [x], [/] 进行中）
      const checkboxMatch = rawText.match(/^(\s*- \[)([ xX/])(\]\s*)/);
      const checkboxState = checkboxMatch ? checkboxMatch[2] : '';
      const isDone = checkboxState.toLowerCase() === 'x';
      const isProgress = checkboxState === '/';
      let checkboxSvg;
      if (isDone) {
        checkboxSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="2.5" style="flex-shrink:0;margin-right:6px;vertical-align:middle;"><polyline points="20 6 9 17 4 12"/></svg>`;
      } else if (isProgress) {
        checkboxSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--interactive-accent)" stroke-width="2" style="flex-shrink:0;margin-right:6px;vertical-align:middle;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
      } else {
        checkboxSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" style="flex-shrink:0;margin-right:6px;vertical-align:middle;"><circle cx="12" cy="12" r="10"/></svg>`;
      }
      // 去掉复选框前缀
      let cleanedText = rawText.replace(/^\s*- \[[ xX/]\]\s*/, '');
      // 保留 **加粗** 渲染
      cleanedText = cleanedText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // 分离文字和标签
      const { plainText, tags } = this._extractTags(cleanedText);
      // 拼接：复选框 + 文字(含加粗) + 标签 pill
      let html = checkboxSvg + plainText;
      if (tags.length > 0) {
        html += ' ' + tags.map(t => `<span class="df-highlight-tag" style="font-size:11px;">${t}</span>`).join(' ');
      }
      textDiv.innerHTML = html;

      // 点击打开文件
      card.onclick = async () => {
        await this.plugin.vaultManager.openFile(item.file);
        this.close();
      };
    });

    // 绘制曲线
    requestAnimationFrame(() => this.drawCurves(flow, layout));
  }

  // SVG 全览模式
  renderSVGView(container, items, queryTag) {
    const svgBox = container.createDiv({ cls: "df-svg-box" });
    const paddingX = 40, gap = 60;
    const contentWidth = Math.max(items.length * gap + paddingX * 2, 400);
    const height = 200, midY = height / 2;
    const svgNs = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNs, "svg");
    svg.classList.add("df-svg-full");
    svg.setAttribute("viewBox", `0 0 ${contentWidth} ${height}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    // 基线
    const baseLine = document.createElementNS(svgNs, "line");
    baseLine.setAttribute("x1", String(paddingX));
    baseLine.setAttribute("y1", String(midY));
    baseLine.setAttribute("x2", String(contentWidth - paddingX));
    baseLine.setAttribute("y2", String(midY));
    baseLine.classList.add("df-svg-baseline");
    svg.appendChild(baseLine);

    items.forEach((item, i) => {
      const x = paddingX + i * gap;
      const isUp = i % 2 === 0;
      const ty = isUp ? midY - 25 : midY + 35;
      const parts = item.rawDate.split('-');
      const label = parts.length >= 2 ? `${parts[1]}.${parts[2] || '01'}` : item.rawDate;

      // 节点
      const circle = document.createElementNS(svgNs, "circle");
      circle.setAttribute("cx", String(x));
      circle.setAttribute("cy", String(midY));
      circle.setAttribute("r", "5");
      circle.classList.add("df-svg-node");
      circle.dataset.date = item.rawDate;
      circle.dataset.text = item.text.substring(0, 100);
      circle.dataset.file = item.file.basename;

      // 标签
      const text = document.createElementNS(svgNs, "text");
      text.setAttribute("x", String(x));
      text.setAttribute("y", String(ty));
      text.classList.add("df-svg-label");
      text.textContent = label;

      svg.appendChild(circle);
      svg.appendChild(text);

      // Tooltip 事件
      circle.addEventListener('mouseenter', (e) => {
        this._showTooltip(e, item.rawDate, `${item.typeLabel}: ${item.text.substring(0, 80)}...`);
      });
      circle.addEventListener('mousemove', (e) => this._moveTooltip(e));
      circle.addEventListener('mouseleave', () => this._hideTooltip());
      circle.addEventListener('click', async () => {
        await this.plugin.vaultManager.openFile(item.file);
        this.close();
      });
    });

    svgBox.appendChild(svg);
  }

  // 绘制 SVG 贝塞尔曲线
  drawCurves(flowEl, layout = this.projLayout) {
    requestAnimationFrame(() => {
      const anchors = flowEl.querySelectorAll(".df-anchor");
      if (anchors.length < 2) return;
      let svg = flowEl.querySelector(".df-curve-layer");
      if (!svg) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add("df-curve-layer");
        flowEl.appendChild(svg);
      }
      svg.setAttribute("width", String(flowEl.scrollWidth));
      svg.setAttribute("height", String(flowEl.scrollHeight));

      const points = [];
      anchors.forEach(a => {
        const rect = a.getBoundingClientRect();
        const flowRect = flowEl.getBoundingClientRect();
        points.push({
          x: rect.left - flowRect.left + flowEl.scrollLeft + a.offsetWidth / 2,
          y: rect.top - flowRect.top + flowEl.scrollTop + a.offsetHeight / 2
        });
      });

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i], p2 = points[i + 1];
        if (layout === 'vertical') {
          const cpY = (p1.y + p2.y) / 2;
          d += ` C ${p1.x} ${cpY}, ${p2.x} ${cpY}, ${p2.x} ${p2.y}`;
        } else {
          const cpX = (p1.x + p2.x) / 2;
          d += ` C ${cpX} ${p1.y}, ${cpX} ${p2.y}, ${p2.x} ${p2.y}`;
        }
      }
      svg.innerHTML = `<path d="${d}" class="df-connector-path" />`;
    });
  }



  // ===== 多选迁移任务辅助方法 =====
  _extractTags(text) {
    const tags = [];
    const plainText = text.replace(/(#\S+)/g, (match) => {
      tags.push(match);
      return '';
    }).replace(/\s+/g, ' ').trim();
    return { plainText, tags };
  }

  _isTaskSelected(item) {
    for (const t of this.selectedTasks) {
      if (t.file.path === item.file.path && t.line === item.line) return true;
    }
    return false;
  }

  _updateMigrateBtnVisibility() {
    if (!this._migrateBtn || !this._completeBtn) return;
    const hasSelection = this.selectedTasks.size > 0;
    this._migrateBtn.style.opacity = hasSelection ? '1' : '0';
    this._migrateBtn.style.pointerEvents = hasSelection ? 'auto' : 'none';
    this._migrateBtn.classList.toggle('is-active', hasSelection);
    this._completeBtn.style.opacity = hasSelection ? '1' : '0';
    this._completeBtn.style.pointerEvents = hasSelection ? 'auto' : 'none';
    this._completeBtn.classList.toggle('is-active', hasSelection);
  }


  // ===== 一键全部完成 + 撤销弹窗 =====
  async _completeSelectedTasks() {
    if (this.selectedTasks.size === 0) return;

    const vaultManager = this.plugin.vaultManager;

    // 备份原始任务行（用于撤销）
    this._lastCompletedTasks = [];

    // 按 file.path 分组
    const fileGroups = new Map();
    for (const task of this.selectedTasks) {
      if (!fileGroups.has(task.file.path)) {
        fileGroups.set(task.file.path, { file: task.file, lines: [] });
      }
      fileGroups.get(task.file.path).lines.push(task.line);
      this._lastCompletedTasks.push({ file: task.file, originalLine: task.line });
    }

    // 将选中的任务行从 - [ ] 改为 - [x]
    for (const { file, lines } of fileGroups.values()) {
      const content = await vaultManager.readContent(file);
      const contentLines = content.split('\n');
      const modifiedLines = contentLines.map(l => {
        if (lines.includes(l) && l.match(/^\s*- \[ \]\s/)) {
          return l.replace(/^\s*- \[ \]\s/, (match) => match.replace('[ ]', '[x]'));
        }
        return l;
      });
      await vaultManager.updateContent(file, modifiedLines.join('\n'));
    }

    // 弹出带撤销按钮的 Dynamic Island 通知
    const completedCount = this._lastCompletedTasks.length;

    globalIsland.show({
      title: "已完成",
      subtitle: `${completedCount} 个任务已标记完成`,
      type: "success",
      iconSvg: ICONS.check,
      duration: 4000,
      hasActions: true,
      actions: [
        {
          label: "撤销",
          onClick: async () => {
            await this._undoComplete();
          }
        }
      ]
    });

    // 4秒后自动清理（如果用户没有点击撤销）
    if (this._lastCompletedTimeout) clearTimeout(this._lastCompletedTimeout);
    this._lastCompletedTimeout = setTimeout(() => {
      this._lastCompletedTasks = null;
      this.selectedTasks.clear();
      if (this._allTasksContainer) {
        this.renderAllTasksBoard(this._allTasksContainer);
      }
    }, 4000);
  }

  async _undoComplete() {
    if (!this._lastCompletedTasks || this._lastCompletedTasks.length === 0) return;

    // 取消自动清理倒计时
    if (this._lastCompletedTimeout) {
      clearTimeout(this._lastCompletedTimeout);
      this._lastCompletedTimeout = null;
    }

    const vaultManager = this.plugin.vaultManager;

    // 按 file 分组
    const fileGroups = new Map();
    for (const backup of this._lastCompletedTasks) {
      if (!fileGroups.has(backup.file.path)) {
        fileGroups.set(backup.file.path, { file: backup.file, originals: [] });
      }
      fileGroups.get(backup.file.path).originals.push(backup.originalLine);
    }

    // 将已完成的行恢复为未完成（- [x] → - [ ]）
    for (const { file, originals } of fileGroups.values()) {
      const content = await vaultManager.readContent(file);
      const contentLines = content.split('\n');
      const restoredLines = contentLines.map(l => {
        for (const orig of originals) {
          const completedVersion = orig.replace(/^\s*- \[ \]\s/, (match) => match.replace('[ ]', '[x]'));
          if (l === completedVersion) {
            return orig;
          }
        }
        return l;
      });
      await vaultManager.updateContent(file, restoredLines.join('\n'));
    }

    // 清理状态并刷新
    this._lastCompletedTasks = null;
    this.selectedTasks.clear();
    if (this._allTasksContainer) {
      await this.renderAllTasksBoard(this._allTasksContainer);
    }

    globalIsland.show({
      title: "已撤销",
      subtitle: "任务已恢复为未完成状态",
      type: "info",
      iconSvg: ICONS.circle,
      duration: 2000
    });
  }

    async _migrateSelectedTasks() {
    if (this.selectedTasks.size === 0) return;

    const vaultManager = this.plugin.vaultManager;
    const today = vaultManager.getTodayString();
    const scheduleFolder = this.plugin.settings.schedulesFolder;

    // 第一步【处理旧文件】：按 file.path 分组，从原文件中彻底删除选中行
    const fileGroups = new Map();
    for (const task of this.selectedTasks) {
      if (!fileGroups.has(task.file.path)) {
        fileGroups.set(task.file.path, { file: task.file, lines: new Set() });
      }
      fileGroups.get(task.file.path).lines.add(task.line);
    }

    for (const { file, lines } of fileGroups.values()) {
      const content = await vaultManager.readContent(file);
      const originalLines = content.split('\n');
      const remainingLines = originalLines.filter(l => !lines.has(l));
      if (remainingLines.length < originalLines.length) {
        await vaultManager.updateContent(file, remainingLines.join('\n'));
      }
    }

    // 第三步【写入今日文件】
    const todayFile = await vaultManager.createOrOpenNote(scheduleFolder, today, `# ${today} 日程\n\n`);
    let todayContent = await vaultManager.readContent(todayFile);
    const migrateHeader = '## 迁移任务';
    if (!todayContent.includes(migrateHeader)) {
      if (!todayContent.endsWith('\n')) todayContent += '\n';
      todayContent += `${migrateHeader}\n`;
    }
    // 第二步【原样保留】：文本保持原封不动，逐行追加
    for (const task of this.selectedTasks) {
      todayContent += task.line + '\n';
    }
    await vaultManager.updateContent(todayFile, todayContent);

    // 第五步【收尾工作】
    this.selectedTasks.clear();
    this._updateMigrateBtnVisibility();
    if (this._allTasksContainer) {
      await this.renderAllTasksBoard(this._allTasksContainer);
    }
    globalIsland.show({
      title: "迁移成功",
      subtitle: "已将任务迁移至今日日程",
      type: "success",
      iconSvg: ICONS.check,
      duration: 3000
    });
  }

  // ============================================
  // 全部任务看板 - 统一为插件原有风格
  // ============================================
  async renderAllTasksBoard(container) {
    this._allTasksContainer = container;
    const oldWrapper = container.querySelector('.df-all-tasks-wrapper');
    if (oldWrapper) oldWrapper.remove();
    const wrapper = container.createDiv({ cls: "df-all-tasks-wrapper", attr: { style: "flex:1;overflow:hidden;display:flex;flex-direction:column;min-height:0;" } });

    // Header
    const header = wrapper.createDiv({ cls: "df-toolbar" });
    header.innerHTML = `<span style="font-size:13px;font-weight:700;display:flex;align-items:center;gap:6px;">${ICONS.checkin} 全部任务看板</span>`;
    const countSpan = header.createEl("span", { attr: { style: "font-size:11px;color:var(--text-muted);margin-left:auto;" } });

    // 动态挂载“迁移到今日”Icon 按钮
    const migrateBtn = header.createEl("button", {
      cls: "df-tool-btn",
      attr: { title: "迁移选中任务到今日日程", style: "opacity:0;pointer-events:none;transition:opacity 0.2s;margin-left:4px;" }
    });
    migrateBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 015.5 5.5v0a5.5 5.5 0 01-5.5 5.5H11"/></svg>`;
    migrateBtn.onclick = () => this._migrateSelectedTasks();
    this._migrateBtn = migrateBtn;

    // 动态挂载"一键全部完成"Icon 按钮
    const completeBtn = header.createEl("button", {
      cls: "df-tool-btn",
      attr: { title: "一键全部完成", style: "opacity:0;pointer-events:none;transition:opacity 0.2s;margin-left:4px;" }
    });
    completeBtn.innerHTML = ICONS.check;
    completeBtn.onclick = () => this._completeSelectedTasks();
    this._completeBtn = completeBtn;

    // 时间过滤器
    const filterBar = wrapper.createDiv({ cls: "df-board-filter" });
    const filters = [
      { key: "all", label: "全部" },
      { key: "today", label: "今天" },
      { key: "week", label: "本周" },
      { key: "month", label: "本月" },
      { key: "7days", label: "近7天" },
      { key: "30days", label: "近30天" },
    ];
    for (const f of filters) {
      const pill = filterBar.createEl("button", { cls: `df-filter-pill ${f.key === this.allTasksTimeFilter ? "active" : ""}` });
      pill.textContent = f.label;
      pill.dataset.filterKey = f.key;
      pill.onclick = () => {
        if (this.allTasksTimeFilter === f.key) return;
        this.allTasksTimeFilter = f.key;
        // 更新 pill 激活状态
        filterBar.querySelectorAll(".df-filter-pill").forEach(p => {
          p.classList.toggle("active", p.dataset.filterKey === f.key);
        });
        // 局部重绘看板列（不闪烁）
        this._refreshBoardColumns(boardView, countSpan);
      };
    }

    // 收集所有任务（带日期）— 只执行一次，排除 habits
    const completed = [];
    const incomplete = [];
    const habitSet = new Set(this.plugin.settings.habits || []);
    const folders = [this.plugin.settings.schedulesFolder, this.plugin.settings.journalsFolder, this.plugin.settings.capturesFolder];

    for (const folder of folders) {
      const folderFiles = this.app.vault.getMarkdownFiles().filter(f => f.path.startsWith(folder));
      for (const file of folderFiles.slice(0, 80)) {
        try {
          const content = await this.plugin.vaultManager.readContent(file);
          const lines = content.split('\n');
          let fileDate = null;
          const dm = file.basename.match(/(\d{4}-\d{2}-\d{2})/);
          if (dm) fileDate = new Date(dm[1] + "T00:00:00");
          for (const line of lines) {
            const match = line.match(/^\s*- \[([ xX])\]\s+(.*)$/);
            if (match) {
              const isDone = match[1].toLowerCase() === 'x';
              const text = match[2].trim();
              if (!text) continue;
              // 排除 habits：text 以设置中的任一 habit 名称开头
              const isHabit = [...habitSet].some(h => text.startsWith(h));
              if (isHabit) continue;
              const item = { text, file, isDone, line, fileDate };
              if (isDone) completed.push(item);
              else incomplete.push(item);
            }
          }
        } catch (e) {}
      }
    }

    // 缓存原始数据
    this._allTasksRaw = { completed, incomplete };

    // 看板容器（空的，由 _refreshBoardColumns 填充）
    const boardView = wrapper.createDiv({ cls: "df-board-view" });

    // 首次渲染
    await this._refreshBoardColumns(boardView, countSpan);
  }

  // 局部刷新看板列 — 只更新卡片，不动 header/filter
  async _refreshBoardColumns(boardView, countSpan) {
    boardView.empty();
    if (!this._allTasksRaw) return;

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    let filteredIncomplete = this._applyTimeFilter(this._allTasksRaw.incomplete, this.allTasksTimeFilter, now);
    let filteredCompleted = this._applyTimeFilter(this._allTasksRaw.completed, this.allTasksTimeFilter, now);

    // 过滤掉引导性模板任务
    const TEMPLATE_TASK_TEXT = '添加主线任务 #你的项目标签';
    filteredIncomplete = filteredIncomplete.filter(item => item.text !== TEMPLATE_TASK_TEXT);
    filteredCompleted = filteredCompleted.filter(item => item.text !== TEMPLATE_TASK_TEXT);

    // 更新计数
    if (countSpan) {
      countSpan.textContent = `共 ${filteredIncomplete.length + filteredCompleted.length} 项 · 已完成 ${filteredCompleted.length} 项`;
    }

    const columns = [
      { id: 'incomplete', title: '未完成', icon: ICONS.circle, color: 'var(--interactive-accent)', items: filteredIncomplete },
      { id: 'completed', title: '已完成', icon: ICONS.check, color: 'var(--color-green)', items: filteredCompleted }
    ];

    for (const col of columns) {
      const boardCol = boardView.createDiv({ cls: "df-board-col" });

      // Column header
      const colHeader = boardCol.createDiv({ cls: "df-board-header" });
      colHeader.innerHTML = `${col.icon}<span style="color:${col.color};">${col.title}</span><span class="count">${col.items.length}</span>`;

      // Cards
      const cardsArea = boardCol.createDiv({ attr: { style: "flex:1;overflow-y:auto;padding:8px;" } });

      if (col.items.length === 0) {
        cardsArea.createEl("div", { cls: "dayflow-placeholder", attr: { style: "font-size:12px;padding:30px 0;" }, text: col.id === 'incomplete' ? "暂无未完成任务" : "暂无已完成任务" });
        continue;
      }

      for (const item of col.items.slice(0, 50)) {
        const card = cardsArea.createDiv({ cls: "df-board-card" });

        // 恢复未完成任务的多选状态
        if (col.id === 'incomplete' && this._isTaskSelected(item)) {
          card.classList.add('is-selected');
        }

        // 分离文字和标签
        const { plainText, tags } = this._extractTags(item.text);
        const textStyle = item.isDone ? 'text-decoration:line-through;opacity:0.55;' : '';

        // Task text with checkbox icon
        const textDiv = card.createDiv({ attr: { style: "display:flex;align-items:flex-start;gap:6px;" } });
        const checkIcon = item.isDone
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" style="flex-shrink:0;margin-top:2px;"><circle cx="12" cy="12" r="10"/></svg>`;
        textDiv.setAttribute('style', 'display:flex;align-items:flex-start;gap:6px;background:transparent;border:none;');
        textDiv.innerHTML = `${checkIcon}<span class="df-board-content-text" style="${textStyle}">${this.escapeHtml(plainText)}</span>`;

        // Source badge + date + tags（tag 放在日期同一行后面）
        const metaDiv = card.createDiv({ attr: { style: "display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin-top:6px;padding-left:20px;" } });
        let typeLabel = "记录", typeClass = "record";
        if (item.file.path.startsWith(this.plugin.settings.schedulesFolder)) { typeLabel = "日程"; typeClass = "schedule"; }
        else if (item.file.path.startsWith(this.plugin.settings.journalsFolder)) { typeLabel = "日记"; typeClass = "journal"; }
        else if (item.file.path.startsWith(this.plugin.settings.capturesFolder)) { typeLabel = "闪念"; typeClass = "idea"; }

        const dateText = item.fileDate ? `<span style="font-size:10px;color:var(--text-faint);">${item.fileDate.toISOString().slice(0, 10)}</span>` : "";
        const tagPills = tags.map(t => `<span class="df-highlight-tag" style="font-size:10px;">${this.escapeHtml(t)}</span>`).join('');
        metaDiv.innerHTML = `<span class="dayflow-badge dayflow-badge-${typeClass}">${typeLabel}</span>${dateText}${tagPills}`;

        // 交互逻辑：Ctrl / Cmd + 左键 多选；否则保持原打开文件逻辑
        card.onclick = async (e) => {
          if (col.id === 'incomplete' && (e.ctrlKey || e.metaKey)) {
            e.stopPropagation();
            if (this._isTaskSelected(item)) {
              const toRemove = [...this.selectedTasks].find(t => t.file.path === item.file.path && t.line === item.line);
              if (toRemove) this.selectedTasks.delete(toRemove);
              card.classList.remove('is-selected');
            } else {
              this.selectedTasks.add(item);
              card.classList.add('is-selected');
            }
            this._updateMigrateBtnVisibility();
            return;
          }
          await this.plugin.vaultManager.openFile(item.file);
          this.close();
        };
      }
    }
  }

  _applyTimeFilter(items, filter, now) {
    if (filter === "all") return items;
    return items.filter(item => {
      if (!item.fileDate) return false;
      const d = new Date(item.fileDate);
      d.setHours(0, 0, 0, 0);
      switch (filter) {
        case "today": return d.getTime() === now.getTime();
        case "week": {
          const dayOfWeek = now.getDay();
          const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
          const weekStart = new Date(now); weekStart.setDate(now.getDate() + mondayOffset);
          return d >= weekStart && d <= now;
        }
        case "month": {
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          return d >= monthStart && d <= now;
        }
        case "7days": {
          const d7 = new Date(now); d7.setDate(now.getDate() - 6);
          return d >= d7 && d <= now;
        }
        case "30days": {
          const d30 = new Date(now); d30.setDate(now.getDate() - 29);
          return d >= d30 && d <= now;
        }
        default: return true;
      }
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ========== 底部 ==========
  renderFooter() {
    const footer = this.contentEl.createDiv({ cls: "dayflow-footer" });
    footer.createEl("span", { cls: "dayflow-status-text", text: "> DayFlow 就绪" });
    const btnContainer = footer.createDiv();
    const aiBtn = btnContainer.createEl("button", { cls: "dayflow-btn" });
    aiBtn.innerHTML = `${ICONS.ai}<span>AI 助手</span>`;
    const closeBtn = btnContainer.createEl("button", { cls: "dayflow-btn" });
    closeBtn.innerHTML = `${ICONS.close}<span>关闭</span>`;
    aiBtn.onclick = () => { this.close(); new DayFlowAIModal(this.app, this.plugin).open(); };
    closeBtn.onclick = () => this.close();
  }
}

// ============================================
// FEEDBACK MODAL
// ============================================
class FeedbackModal extends obsidian.Modal {
  constructor(app, plugin, taskName) { super(app); this.plugin = plugin; this.taskName = taskName; }
  onOpen() {
    this.contentEl.empty(); this.contentEl.addClass("dayflow-feedback-modal");
    this.contentEl.createEl("h4", { text: "记录反馈" });
    this.contentEl.createEl("p", { cls: "dayflow-task-name", text: this.taskName });
    const textarea = this.contentEl.createEl("textarea", { cls: "dayflow-feedback-textarea", attr: { placeholder: "完成这个任务的感受如何？（可选，按 ESC 跳过）", rows: 4 } });
    textarea.focus();
    const btnRow = this.contentEl.createDiv({ cls: "dayflow-btn-row" });
    const skipBtn = btnRow.createEl("button", { cls: "dayflow-btn", text: "跳过" });
    const saveBtn = btnRow.createEl("button", { cls: "dayflow-btn primary", text: "保存反馈" });
    skipBtn.onclick = () => this.close();
    saveBtn.onclick = async () => { const fb = textarea.value.trim(); if (fb) await this.plugin.saveFeedback(this.taskName, fb); this.close(); };
  }
  onClose() { this.contentEl.empty(); }
}

// ============================================
// AI CHAT MODAL
// ============================================
class DayFlowAIModal extends obsidian.Modal {
  constructor(app, plugin) { super(app); this.plugin = plugin; this.messages = []; }
  onOpen() {
    this.modalEl.addClass("dayflow-modal-container");
    this.contentEl.addClass("dayflow-modal-content");
    this.renderChat();
    requestAnimationFrame(() => requestAnimationFrame(() => this.modalEl.addClass("df-is-open")));
  }
  onClose() { this.contentEl.empty(); }
  renderChat() {
    this.contentEl.empty();
    const header = this.contentEl.createDiv({ cls: "dayflow-header" });
    header.createEl("h3", { cls: "dayflow-title", text: "DayFlow AI 助手" });
    const right = header.createDiv();
    const closeBtn = right.createEl("button", { cls: "dayflow-icon-btn" });
    closeBtn.innerHTML = ICONS.close; closeBtn.onclick = () => this.close();

    const main = this.contentEl.createDiv({ cls: "dayflow-chat-main" });
    const chatArea = main.createDiv({ cls: "dayflow-chat-area" });
    if (this.messages.length === 0) {
      chatArea.createDiv({ cls: "dayflow-chat-empty" }).createEl("p", { text: "随时可以问我任何问题。" });
    } else {
      for (const msg of this.messages) {
        const bubble = chatArea.createDiv({ cls: `dayflow-chat-bubble ${msg.role}` });
        if (msg.role === "ai") obsidian.MarkdownRenderer.renderMarkdown(msg.content, bubble, "", this).catch(() => { bubble.textContent = msg.content; });
        else bubble.textContent = msg.content;
      }
    }
    const inputArea = main.createDiv({ cls: "dayflow-chat-input-area" });
    const textInput = inputArea.createEl("textarea", { cls: "dayflow-chat-input", attr: { placeholder: "问我任何问题..." } });
    const sendBtn = inputArea.createEl("button", { cls: "dayflow-chat-send-btn", text: "发送" });
    const sendMsg = async () => {
      const content = textInput.value.trim();
      if (!content || !this.plugin.agent || !this.plugin.agent.provider.isAvailable) return;
      textInput.value = ""; this.messages.push({ role: "user", content }); this.renderChat();
      try { const response = await this.plugin.agent.assist(content); this.messages.push({ role: "ai", content: response }); }
      catch (error) { this.messages.push({ role: "ai", content: `请求失败: ${error.message}` }); }
      this.renderChat();
    };
    sendBtn.onclick = sendMsg;
    textInput.onkeydown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(); } };
  }
}

// ============================================
// HABIT NOTE MODAL
// ============================================
class HabitNoteModal extends obsidian.Modal {
  constructor(app, plugin, habitName) { super(app); this.plugin = plugin; this.habitName = habitName; }
  onOpen() {
    this.contentEl.empty(); this.contentEl.addClass("dayflow-habit-note-modal");
    this.contentEl.createEl("h4", { text: `记录感想: ${this.habitName}` });
    const textarea = this.contentEl.createEl("textarea", { cls: "dayflow-textarea", attr: { placeholder: "今天的状态如何？", rows: 4 } });
    textarea.focus();
    const btnRow = this.contentEl.createDiv({ cls: "dayflow-btn-row" });
    const cancelBtn = btnRow.createEl("button", { cls: "dayflow-btn", text: "取消" });
    const saveBtn = btnRow.createEl("button", { cls: "dayflow-btn primary", text: "保存" });
    cancelBtn.onclick = () => this.close();
    saveBtn.onclick = async () => {
      const note = textarea.value.trim();
      if (note) {
        const today = this.plugin.vaultManager.getTodayString();
        const fp = `${this.plugin.settings.schedulesFolder}/${today}.md`;
        const file = this.app.vault.getAbstractFileByPath(fp);
        if (file) { const content = await this.plugin.vaultManager.readContent(file); await this.plugin.vaultManager.updateContent(file, content + `\n> [${this.habitName} 感想] ${note}\n`); }
      }
      this.close();
    };
  }
  onClose() { this.contentEl.empty(); }
}

// ============================================
// DEEP THOUGHT PROMPT MODAL
// ============================================
class DeepThoughtPromptModal extends obsidian.Modal {
  constructor(app, plugin, parentModal) { super(app); this.plugin = plugin; this.parentModal = parentModal; }
  onOpen() {
    this.contentEl.empty(); this.contentEl.addClass("dayflow-feedback-modal");
    this.contentEl.createEl("h4", { text: "开启深度思考" });
    this.contentEl.createEl("p", { cls: "dayflow-tab-desc", text: "为你的长文起个标题，我们将为你创建一张专注的画布。" });
    const input = this.contentEl.createEl("input", { cls: "dayflow-input", attr: { placeholder: "例如：关于独立产品开发的深度复盘", style: "margin:12px 0 16px;" } });
    input.focus();
    const btnRow = this.contentEl.createDiv({ cls: "dayflow-btn-row", attr: { style: "display:flex;justify-content:flex-end;gap:8px;" } });
    const cancelBtn = btnRow.createEl("button", { cls: "dayflow-btn", text: "取消" });
    const openBtn = btnRow.createEl("button", { cls: "dayflow-btn primary", text: "开启画布" });
    cancelBtn.onclick = () => this.close();
    openBtn.onclick = async () => { const title = input.value.trim(); if (title) { await this.plugin.core.createDeepThought(title); this.close(); if (this.parentModal) this.parentModal.close(); } };
    input.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); openBtn.click(); } };
  }
  onClose() { this.contentEl.empty(); }
}

// ============================================
// QUICK CAPTURE MODAL
// ============================================
class QuickCaptureModal extends obsidian.Modal {
  constructor(app, plugin) { super(app); this.plugin = plugin; }
  onOpen() {
    this.contentEl.empty(); this.contentEl.addClass("dayflow-feedback-modal");
    this.contentEl.createEl("h4", { text: "闪念胶囊" });
    this.contentEl.createEl("p", { cls: "dayflow-tab-desc", text: "捕捉脑海中一闪而过的想法。" });
    const textarea = this.contentEl.createEl("textarea", { cls: "dayflow-textarea", attr: { placeholder: "此刻你在想什么？", rows: 3 } });
    textarea.focus();
    const btnRow = this.contentEl.createDiv({ cls: "dayflow-btn-row" });
    const cancelBtn = btnRow.createEl("button", { cls: "dayflow-btn", text: "取消" });
    const saveBtn = btnRow.createEl("button", { cls: "dayflow-btn primary", text: "封存" });
    cancelBtn.onclick = () => this.close();
    saveBtn.onclick = async () => { const c = textarea.value.trim(); if (c) { await this.plugin.core.captureThought(c); this.close(); } };
    textarea.onkeydown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); saveBtn.click(); } };
  }
  onClose() { this.contentEl.empty(); }
}

// ============================================
// SETTING TAB
// ============================================
class DayFlowSettingTab extends obsidian.PluginSettingTab {
  constructor(app, plugin) { super(app, plugin); }
  display() {
    const { containerEl } = this; containerEl.empty(); containerEl.addClass("dayflow-settings-tab");
    containerEl.createEl("h3", { text: "DayFlow 设置" });

    new obsidian.Setting(containerEl).setName("闪念存放文件夹").setDesc("记录闪念的 Markdown 文件存放路径。").addText(t => {
      t.setValue(this.plugin.settings.capturesFolder);
      t.onChange(async v => { this.plugin.settings.capturesFolder = v; await this.plugin.saveSettings(); });
    });
    new obsidian.Setting(containerEl).setName("日程存放文件夹").setDesc("日程画布的 Markdown 文件存放路径。").addText(t => {
      t.setValue(this.plugin.settings.schedulesFolder);
      t.onChange(async v => { this.plugin.settings.schedulesFolder = v; await this.plugin.saveSettings(); });
    });
    new obsidian.Setting(containerEl).setName("日记存放文件夹").setDesc("日记/心情存放路径。").addText(t => {
      t.setValue(this.plugin.settings.journalsFolder);
      t.onChange(async v => { this.plugin.settings.journalsFolder = v; await this.plugin.saveSettings(); });
    });
    new obsidian.Setting(containerEl).setName("默认习惯列表").setDesc("以逗号分隔，用于每日日程模板生成。").addText(t => {
      t.setValue(this.plugin.settings.habits.join(", "));
      t.onChange(async v => { this.plugin.settings.habits = v.split(",").map(s => s.trim()).filter(Boolean); await this.plugin.saveSettings(); });
    });
    new obsidian.Setting(containerEl).setName("追踪的项目标签").setDesc("控制台项目追踪面板上显示的主线标签(以#开头,逗号分隔)。").addText(t => {
      t.setValue(this.plugin.settings.projects.join(", "));
      t.onChange(async v => { this.plugin.settings.projects = v.split(",").map(s => s.trim()).filter(Boolean); await this.plugin.saveSettings(); });
    });

    containerEl.createEl("div", { cls: "dayflow-section-title", text: "界面设置", attr: { style: "margin-top:28px;" } });
    new obsidian.Setting(containerEl).setName("启用悬浮按钮").setDesc("在右下角显示快捷操作悬浮球。").addToggle(t => {
      t.setValue(this.plugin.settings.floatingButtonEnabled);
      t.onChange(async v => { this.plugin.settings.floatingButtonEnabled = v; await this.plugin.saveSettings(); this.plugin.updateFloatingButton(); });
    });

    containerEl.createEl("div", { cls: "dayflow-section-title", text: "AI 设置", attr: { style: "margin-top:28px;" } });
    new obsidian.Setting(containerEl).setName("AI 提供商").setDesc("选择要使用的 AI 服务。").addDropdown(d => {
      d.addOption("none", "关闭"); d.addOption("deepseek", "DeepSeek");
      d.setValue(this.plugin.settings.aiProvider);
      d.onChange(async v => { this.plugin.settings.aiProvider = v; await this.plugin.saveSettings(); this.display(); });
    });
    if (this.plugin.settings.aiProvider === "deepseek") {
      new obsidian.Setting(containerEl).setName("DeepSeek API Key").setDesc("你的 DeepSeek API 密钥。").addText(t => {
        t.setValue(this.plugin.settings.deepseekApiKey); t.inputEl.type = "password";
        t.onChange(async v => { this.plugin.settings.deepseekApiKey = v; await this.plugin.saveSettings(); });
      });
    }

    containerEl.createEl("div", { cls: "dayflow-section-title", text: "性能设置", attr: { style: "margin-top:28px;" } });
    new obsidian.Setting(containerEl).setName("项目缓存时间 (毫秒)").setDesc("项目追踪面板的缓存过期时间，默认 30 秒。设为 0 则禁用缓存。").addSlider(s => {
      s.setLimits(0, 300000, 5000); s.setValue(this.plugin.settings.projectCacheTTL); s.setDynamicTooltip();
      s.onChange(async v => { this.plugin.settings.projectCacheTTL = v; await this.plugin.saveSettings(); });
    });
    new obsidian.Setting(containerEl).setName("时间轴默认显示天数").setDesc("日程和闪念时间轴默认回顾多少天的记录。").addSlider(s => {
      s.setLimits(3, 30, 1); s.setValue(this.plugin.settings.timelineDefaultDays); s.setDynamicTooltip();
      s.onChange(async v => { this.plugin.settings.timelineDefaultDays = v; await this.plugin.saveSettings(); });
    });
  }
}

// ============================================
// FLOATING BUTTON
// ============================================
// ============================================
// FLOATING ORB - v3.0 (参考实现方式重写)
// document.body + position:fixed + 拖拽吸附
// ============================================
const ORB_SIZE = 48;
const ORB_MARGIN = 16;
const SNAP_DIST = 80;

class FloatingButton {
  constructor(app, plugin) {
    this.app = app;
    this.plugin = plugin;
    this.orbEl = null;
    this.panelEl = null;
    this.isDragging = false;
    this.isPanelOpen = false;
    this.isPinned = plugin.settings.orbPinned || false;
    this.orbPos = { x: 0, y: 0, edge: 'right' };
    this.hideTimer = null;
    this.hoverTimer = null;
    this.openMode = null; // 'click' | 'hover'
    // drag state
    this._dragCandidate = false;
    this._dragStartX = 0;
    this._dragStartY = 0;
    this._dragMoved = false;
    this._justDragged = false;
    this.dragOffset = { x: 0, y: 0 };

    this.loadPosition();
  }

  loadPosition() {
    const saved = this.plugin.settings.orbPosition;
    if (saved) { this.orbPos = { ...saved }; }
    else { this.orbPos = { x: window.innerWidth - ORB_SIZE - ORB_MARGIN, y: window.innerHeight / 2, edge: 'right' }; }
    this.isPinned = this.plugin.settings.orbPinned || false;
  }

  async savePosition() {
    this.plugin.settings.orbPosition = { ...this.orbPos };
    this.plugin.settings.orbPinned = this.isPinned;
    await this.plugin.saveSettings();
  }

  mount() {
    if (this.orbEl) return;
    this.createOrb();
    this.createPanel();
    this.attachEvents();
  }

  createOrb() {
    this.orbEl = document.body.createDiv({ cls: 'dayflow-orb' });
    this.orbEl.innerHTML = ICONS.orbIcon;
    this.orbEl.title = 'DayFlow (双击打开今日日程)';
    this.positionOrb();
  }

  createPanel() {
    this.panelEl = document.body.createDiv({ cls: 'dayflow-orb-panel' });
    this.panelEl.innerHTML = `
      <div class="dayflow-orb-panel-inner">
        <div class="dayflow-orb-panel-header">
          <div class="dayflow-orb-panel-title"><span>DayFlow</span></div>
          <div class="dayflow-orb-panel-controls">
            <button class="dayflow-orb-panel-btn pin-btn" title="钉住面板">${ICONS.pin}</button>
            <button class="dayflow-orb-panel-btn open-btn" title="打开控制台">${ICONS.settings}</button>
          </div>
        </div>
        <div class="dayflow-orb-panel-actions">
          <div class="dayflow-orb-panel-item" data-action="console"><span class="item-icon">${ICONS.project}</span><span>项目追踪</span></div>
          <div class="dayflow-orb-panel-item" data-action="schedule"><span class="item-icon">${ICONS.schedule}</span><span>今日日程</span></div>
          <div class="dayflow-orb-panel-item" data-action="checkin"><span class="item-icon">${ICONS.checkin}</span><span>习惯打卡</span></div>
          <div class="dayflow-orb-panel-item" data-action="tasks"><span class="item-icon">${ICONS.folder}</span><span>任务看板</span></div>
        </div>
        <div class="dayflow-orb-panel-footer">DayFlow v2.2</div>
      </div>`;

    // Pin button
    const pinBtn = this.panelEl.querySelector('.pin-btn');
    pinBtn.innerHTML = this.isPinned ? ICONS.pin : ICONS.pinOff;
    pinBtn.classList.toggle('is-active', this.isPinned);
    pinBtn.title = this.isPinned ? '取消钉住' : '钉住面板';
    pinBtn.onclick = (e) => { e.stopPropagation(); this.togglePin(); };

    // Open console button
    this.panelEl.querySelector('.open-btn').onclick = (e) => {
      e.stopPropagation(); this.closePanel(); this.plugin.openConsole();
    };

    // Action items
    this.panelEl.querySelectorAll('.dayflow-orb-panel-item').forEach(item => {
      item.onclick = (e) => { e.stopPropagation(); this.handleAction(item.dataset.action); };
    });
  }

  handleAction(action) {
    this.closePanel();
    switch (action) {
      case 'console': this.plugin.openConsole('projects'); break;
      case 'schedule': {
        const today = new Date();
        const todayDs = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
        this.plugin.openConsole('schedule', (modal) => {
          modal.scheduleYear = today.getFullYear();
          modal.scheduleMonth = today.getMonth();
          modal.calendarCollapsed = true;
          modal._renderCalendarGrid();
          const file = modal.app.vault.getAbstractFileByPath(`${modal.plugin.settings.schedulesFolder}/${todayDs}.md`);
          modal._renderSchedulePreview(todayDs, file);
          if (modal._schedulePreview) modal._schedulePreview.style.gridTemplateRows = '1fr';
          if (modal._scheduleGrid) modal._scheduleGrid.style.padding = '4px 0 8px';
          const grid = modal._scheduleGrid?.querySelector('.df-calendar-grid');
          if (grid) grid.classList.add('is-collapsed');
        });
        break;
      }
      case 'checkin': this.plugin.openConsole('checkin'); break;
      case 'tasks': this.plugin.openTaskBoard(); break;
    }
  }

  positionOrb() {
    if (!this.orbEl) return;
    this.orbEl.style.left = `${this.orbPos.x}px`;
    this.orbEl.style.top = `${this.orbPos.y}px`;
  }

  positionPanel() {
    if (!this.orbEl || !this.panelEl) return;
    const orbRect = this.orbEl.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    const gap = 8;
    const pw = 220, ph = 280;
    const orbCenterX = orbRect.left + ORB_SIZE / 2;
    const isRightSide = orbCenterX > vw / 2;
    let left, top;

    if (isRightSide) {
      left = orbRect.left - pw - gap;
    } else {
      left = orbRect.right + gap;
    }
    top = Math.max(8, Math.min(vh - ph - 8, orbRect.top - 40));

    this.panelEl.style.left = `${left}px`;
    this.panelEl.style.top = `${top}px`;
    this.panelEl.classList.toggle('is-right', isRightSide);
    this.panelEl.classList.toggle('is-left', !isRightSide);
  }

  attachEvents() {
    if (!this.orbEl) return;
    this.orbEl.addEventListener('click', (e) => this.onOrbClick(e));
    this.orbEl.addEventListener('mousedown', (e) => this.onDragStart(e));
    this.orbEl.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      this.closePanel();
      this.plugin.openSchedule();
    });
    this.orbEl.onmouseenter = () => this.onOrbHover();
    this.orbEl.onmouseleave = () => this.onOrbLeave();
    this.panelEl.onmouseenter = () => this.clearHideTimer();
    this.panelEl.onmouseleave = () => { if (!this.isPinned) this.startHideTimer(); };
    document.addEventListener('mousemove', (e) => this.onDragMove(e));
    document.addEventListener('mouseup', () => this.onDragEnd());
  }

  // === Click ===
  onOrbClick(e) {
    if (this._justDragged) { this._justDragged = false; return; }
    if (e.ctrlKey || e.metaKey) { e.preventDefault(); this.clearHoverTimer(); this.closePanel(); this.plugin.openConsole(); return; }
    this.openMode = 'click';
    this.toggle();
  }

  // === Hover (150ms auto-open) ===
  onOrbHover() {
    if (this._dragCandidate) return;
    this.hoverTimer = setTimeout(() => {
      if (!this.isPanelOpen && !this._dragCandidate) {
        this.openMode = 'hover';
        this.openPanel();
      }
    }, 150);
  }

  onOrbLeave() {
    this.clearHoverTimer();
    if (this.isPanelOpen && this.openMode === 'hover' && !this.isPinned) this.startHideTimer();
  }

  // === Drag ===
  onDragStart(e) {
    if (e.button !== 0) return;
    this._dragCandidate = true;
    this._dragStartX = e.clientX;
    this._dragStartY = e.clientY;
    this._dragMoved = false;
    const rect = this.orbEl.getBoundingClientRect();
    this.dragOffset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  onDragMove(e) {
    if (!this._dragCandidate) return;
    const dx = e.clientX - this._dragStartX;
    const dy = e.clientY - this._dragStartY;
    if (!this._dragMoved && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      this._dragMoved = true;
      this.isDragging = true;
      this.closePanel();
      this.orbEl.classList.add('is-dragging');
    }
    if (this.isDragging) {
      const x = e.clientX - this.dragOffset.x;
      const y = e.clientY - this.dragOffset.y;
      const maxX = window.innerWidth - ORB_SIZE;
      const maxY = window.innerHeight - ORB_SIZE;
      this.orbEl.style.left = `${Math.max(0, Math.min(maxX, x))}px`;
      this.orbEl.style.top = `${Math.max(0, Math.min(maxY, y))}px`;
    }
  }

  async onDragEnd() {
    if (!this._dragCandidate) return;
    this._dragCandidate = false;
    if (this.isDragging) {
      this.isDragging = false;
      this._justDragged = true;
      this.orbEl.classList.remove('is-dragging');
      const rect = this.orbEl.getBoundingClientRect();
      this.orbPos = this.snapToEdge(rect.left + ORB_SIZE / 2, rect.top + ORB_SIZE / 2);
      this.positionOrb();
      await this.savePosition();
      setTimeout(() => { this._justDragged = false; }, 100);
    }
  }

  snapToEdge(cx, cy) {
    const vw = window.innerWidth, vh = window.innerHeight;
    const dLeft = cx, dRight = vw - cx, dTop = cy, dBottom = vh - cy;
    const minD = Math.min(dLeft, dRight, dTop, dBottom);
    if (minD > SNAP_DIST) return { x: cx - ORB_SIZE / 2, y: cy - ORB_SIZE / 2, edge: 'none' };
    if (minD === dLeft) return { x: ORB_MARGIN, y: cy - ORB_SIZE / 2, edge: 'left' };
    if (minD === dRight) return { x: vw - ORB_SIZE - ORB_MARGIN, y: cy - ORB_SIZE / 2, edge: 'right' };
    if (minD === dTop) return { x: cx - ORB_SIZE / 2, y: ORB_MARGIN, edge: 'top' };
    return { x: cx - ORB_SIZE / 2, y: vh - ORB_SIZE - ORB_MARGIN, edge: 'bottom' };
  }

  // === Panel open/close ===
  toggle() { if (this.isPanelOpen) this.closePanel(); else this.openPanel(); }

  openPanel() {
    if (this.isPanelOpen) return;
    this.isPanelOpen = true;
    this.positionPanel();
    this.panelEl.classList.add('is-open');
    this.orbEl.classList.add('is-expanded');
    requestAnimationFrame(() => {
      this.panelEl.style.opacity = '1';
    });
  }

  closePanel() {
    if (!this.isPanelOpen) return;
    this.isPanelOpen = false;
    this.openMode = null;
    this.panelEl.style.opacity = '0';
    this.orbEl.classList.remove('is-expanded');
    this.clearHideTimer();
    setTimeout(() => {
      this.panelEl.classList.remove('is-open');
      this.panelEl.classList.remove('is-right');
      this.panelEl.classList.remove('is-left');
    }, 250);
  }

  // === Pin ===
  togglePin() {
    this.isPinned = !this.isPinned;
    const pinBtn = this.panelEl.querySelector('.pin-btn');
    pinBtn.innerHTML = this.isPinned ? ICONS.pin : ICONS.pinOff;
    pinBtn.classList.toggle('is-active', this.isPinned);
    pinBtn.title = this.isPinned ? '取消钉住' : '钉住面板';
    this.savePosition();
    globalIsland.show({ title: this.isPinned ? '已钉住快捷入口' : '已取消钉住', type: 'success', iconSvg: ICONS.pin, duration: 2000 });
  }

  // === Timers ===
  startHideTimer() { this.clearHideTimer(); this.hideTimer = setTimeout(() => this.closePanel(), 300); }
  clearHideTimer() { if (this.hideTimer) { clearTimeout(this.hideTimer); this.hideTimer = null; } }
  clearHoverTimer() { if (this.hoverTimer) { clearTimeout(this.hoverTimer); this.hoverTimer = null; } }
  clearTimers() { this.clearHideTimer(); this.clearHoverTimer(); }

  // === Unmount ===
  unmount() {
    this.clearTimers();
    if (this.orbEl) { this.orbEl.remove(); this.orbEl = null; }
    if (this.panelEl) { this.panelEl.remove(); this.panelEl = null; }
  }
}

// ============================================
// ORB WIDGET (Status Bar)
// ============================================
class OrbWidget extends obsidian.ItemView {
  constructor(leaf, plugin) { super(leaf); this.plugin = plugin; }
  getViewType() { return "dayflow-orb"; }
  getDisplayText() { return "DayFlow"; }
  getIcon() { return "zap"; }
  async onOpen() {
    this.containerEl.empty();
    const btn = this.containerEl.createEl("button", { cls: "dayflow-orb-btn" });
    btn.innerHTML = `${ICONS.zap}`; btn.onclick = () => this.plugin.openConsole(); btn.title = "DayFlow 控制台 (点击打开)";
  }
}

// ============================================
// MAIN PLUGIN CLASS
// ============================================
class DayFlowPlugin extends obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    this.vaultManager = new VaultManager(this.app);
    this.core = new DayFlowCore(this.app, this.vaultManager, this.settings);
    this.promptManager = new PromptManager();

    if (this.settings.aiProvider === "deepseek") {
      const provider = new DeepSeekProvider();
      provider.configure({ apiKey: this.settings.deepseekApiKey, model: this.settings.deepseekModel });
      this.agent = new DayFlowAgent(provider, this.promptManager, this.app, this.settings);
    }

    // Commands
    this.addCommand({ id: "open-dayflow-console", name: "打开 DayFlow 控制台", callback: () => this.openConsole() });
    this.addCommand({ id: "capture-thought", name: "快速闪念", callback: () => this.quickCapture() });
    this.addCommand({ id: "open-schedule", name: "打开今日日程", callback: () => this.openSchedule() });
    this.addCommand({ id: "action-checkin", name: "行动打卡", callback: () => this.openCheckIn() });
    this.addCommand({ id: "open-journal", name: "开启深度思考", callback: () => new DeepThoughtPromptModal(this.app, this, null).open() });

    this.addSettingTab(new DayFlowSettingTab(this.app, this));

    // Floating button
    this.floatingButton = new FloatingButton(this.app, this);
    this.updateFloatingButton();

    // Status bar orb
    if (this.settings.orbEnabled) {
      this.registerView("dayflow-orb", leaf => new OrbWidget(leaf, this));
      this.app.workspace.onLayoutReady(() => {
        if (!this.app.workspace.getLeavesOfType("dayflow-orb").length) {
          this.app.workspace.getRightLeaf(false).setViewState({ type: "dayflow-orb" });
        }
      });
    }

    // Cache invalidation
    this.registerEvent(this.app.metadataCache.on("changed", file => { this.vaultManager.invalidateCache(file.path); }));
    this.registerEvent(this.app.vault.on("delete", file => { this.vaultManager.invalidateCache(file.path); }));

    // Ribbon icon
    this.addRibbonIcon("zap", "DayFlow", () => this.openConsole());
  }

  async loadSettings() { this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData()); }
  async saveSettings() { await this.saveData(this.settings); }

  async saveFeedback(taskName, feedback) {
    const today = this.vaultManager.getTodayString();
    const folder = this.settings.capturesFolder;
    const template = `# ${today} 闪念\n\n`;
    const file = await this.vaultManager.createOrOpenNote(folder, today, template);
    const content = await this.vaultManager.readContent(file);
    const ts = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    await this.vaultManager.updateContent(file, content + `- [${ts}] ✅ ${taskName}\n> ${feedback}\n`);
  }

  openConsole(targetTab, postRenderCallback) {
    const modal = new DayFlowConsoleModal(this.app, this);
    if (targetTab) modal.activeTab = targetTab;
    if (postRenderCallback) modal._postRenderCallback = postRenderCallback;
    modal.open();
  }
  openTaskBoard() { const modal = new DayFlowConsoleModal(this.app, this); modal.activeTab = "projects"; modal.allTasksMode = true; modal.open(); }
  quickCapture() { new QuickCaptureModal(this.app, this).open(); }
  async openSchedule() { await this.core.openSchedule(); }
  async openCheckIn() { await this.core.openCheckIn(); }
  async openJournal() { this.openConsole(); }
  async openHistory(ds) {
    const result = await this.core.openHistory(ds); if (!result) return;
    const { capturesFile, schedulesFile, journalsFile } = result;
    if (schedulesFile) await this.vaultManager.openFile(schedulesFile);
    else if (capturesFile) await this.vaultManager.openFile(capturesFile);
    else if (journalsFile) await this.vaultManager.openFile(journalsFile);
  }
  updateFloatingButton() {
    if (this.settings.floatingButtonEnabled) this.floatingButton.mount();
    else this.floatingButton.unmount();
  }
}

module.exports = DayFlowPlugin;
