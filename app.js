"use strict";

const DATA_FILES = {
  summary: "data/summary.json",
  sourceInventory: "data/source_inventory.json",
  activityMetrics: "data/activity_metrics.json",
  componentSummary: "data/component_summary.json",
  overlap: "data/overlap.json",
  supplementQueue: "data/supplement_queue.json",
  recordsPreview: "data/records_preview.json",
  contextSummary: "data/context_summary.json"
};

const state = {
  data: {},
  tabs: "overview",
  sources: { search: "", collection: "", sortKey: "records", sortAsc: false },
  overlap: { search: "", risk: "", sortKey: "shared_smiles", sortAsc: false },
  activity: { search: "", sortKey: "numeric_rows", sortAsc: false },
  queue: { search: "", priority: "" },
  records: { search: "", collection: "", page: 1, perPage: 100 }
};

const LANG = document.documentElement.lang.toLowerCase().startsWith("zh") ? "zh" : "en";
const nf = new Intl.NumberFormat(LANG === "zh" ? "zh-CN" : "en-US");

const I18N = {
  en: {
    activityValue: "Activity Value",
    activityMetric: "Activity Metric",
    cellContext: "Cell Context",
    collection: "Collection",
    componentSmiles: "Component SMILES",
    coreOpen: "Core open",
    coreHigh: "{core} core, {high} high-throughput",
    datasetDoi: "Dataset DOI",
    deliveryTarget: "Delivery Target",
    detailTitle: "{collection} / {source}",
    generated: "generated {time}",
    helperSmiles: "Helper SMILES",
    high: "High",
    highThroughput: "High-throughput",
    insightOverlap: "{count} strong overlap pairs",
    insightQueue: "{count} supplement items queued",
    insightScope: "{sources} source collections across {records} records",
    lipidName: "Lipid Name",
    lipidRatio: "Lipid Ratio",
    loadingError: "Unable to load static data assets. Serve this directory over HTTP and retry. Details: {message}",
    low: "Low",
    medium: "Medium",
    metricGroups: "{count} metric groups",
    noData: "No data",
    pageInfo: "Page {page} of {total}",
    payload: "Payload",
    pegSmiles: "PEG SMILES",
    previewId: "Preview ID",
    previewRows: "{count} preview rows",
    publicationDoi: "Publication DOI",
    queueItems: "{count} queue items",
    records: "records",
    role: "Role",
    rows: "{count} rows",
    pairs: "{count} pairs",
    riskDuplicateSubset: "duplicate subset",
    riskLowOverlap: "low overlap",
    riskMaterialOverlap: "material overlap",
    riskModerateOverlap: "moderate overlap",
    route: "Route",
    source: "Source",
    sourceCollections: "{count} source collections",
    sourceRecordId: "Source Record ID",
    sterolSmiles: "Sterol SMILES",
    title: "Title",
    numeric: "numeric",
    unknown: "unknown"
  },
  zh: {
    activityValue: "活性值",
    activityMetric: "活性指标",
    cellContext: "细胞/实验背景",
    collection: "数据层",
    componentSmiles: "组分 SMILES",
    coreOpen: "核心开源",
    coreHigh: "{core} 条核心开源，{high} 条高通量",
    datasetDoi: "数据集 DOI",
    deliveryTarget: "递送靶向",
    detailTitle: "{collection} / {source}",
    generated: "生成时间 {time}",
    helperSmiles: "辅助脂质 SMILES",
    high: "高",
    highThroughput: "高通量",
    insightOverlap: "{count} 对强重叠来源",
    insightQueue: "{count} 个补充材料待提取",
    insightScope: "{sources} 个来源集合，{records} 条记录",
    lipidName: "脂质名称",
    lipidRatio: "脂质比例",
    loadingError: "无法加载静态数据资产。请通过 HTTP 服务打开本目录后重试。错误详情：{message}",
    low: "低",
    medium: "中",
    metricGroups: "{count} 个指标分组",
    noData: "暂无数据",
    pageInfo: "第 {page} / {total} 页",
    payload: "载荷",
    pegSmiles: "PEG 脂质 SMILES",
    previewId: "预览编号",
    previewRows: "{count} 条预览记录",
    publicationDoi: "论文 DOI",
    queueItems: "{count} 个待提取条目",
    records: "条记录",
    role: "角色",
    rows: "{count} 行",
    pairs: "{count} 对",
    riskDuplicateSubset: "重复子集",
    riskLowOverlap: "低重叠",
    riskMaterialOverlap: "实质重叠",
    riskModerateOverlap: "中等重叠",
    route: "给药途径",
    source: "来源",
    sourceCollections: "{count} 个来源集合",
    sourceRecordId: "来源记录 ID",
    sterolSmiles: "甾醇 SMILES",
    title: "标题",
    numeric: "数值",
    unknown: "未知"
  }
};

function t(key, values = {}) {
  let template = I18N[LANG][key] || I18N.en[key] || key;
  Object.entries(values).forEach(([name, value]) => {
    template = template.replaceAll(`{${name}}`, value);
  });
  return template;
}

function $(id) {
  return document.getElementById(id);
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}

function text(value, fallback = "-") {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

function number(value, digits = null) {
  if (value === null || value === undefined || value === "") return "-";
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return text(value);
  if (digits !== null) return parsed.toFixed(digits);
  return nf.format(parsed);
}

function bytes(value) {
  const n = Number(value || 0);
  if (n >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${n} B`;
}

function pct(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  return `${(n * 100).toFixed(1)}%`;
}

function normalize(value) {
  return text(value, "").toLowerCase();
}

function rowContains(row, query, fields) {
  if (!query) return true;
  const q = normalize(query);
  return fields.some((field) => normalize(row[field]).includes(q));
}

function compareRows(a, b, key, asc) {
  const av = a[key];
  const bv = b[key];
  const an = Number(av);
  const bn = Number(bv);
  let result;
  if (Number.isFinite(an) && Number.isFinite(bn)) {
    result = an - bn;
  } else {
    result = text(av, "").localeCompare(text(bv, ""), undefined, { numeric: true, sensitivity: "base" });
  }
  return asc ? result : -result;
}

async function fetchJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`${path}: ${response.status}`);
  return response.json();
}

async function loadData() {
  try {
    const entries = await Promise.all(
      Object.entries(DATA_FILES).map(async ([key, path]) => [key, await fetchJson(path)])
    );
    state.data = Object.fromEntries(entries);
    $("loadingPanel").hidden = true;
    $("mainContent").hidden = false;
    bindEvents();
    renderAll();
  } catch (error) {
    $("loadingPanel").hidden = true;
    const panel = $("errorPanel");
    panel.hidden = false;
    panel.textContent = t("loadingError", { message: error.message });
  }
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => setTab(button.dataset.tab));
  });

  $("downloadSummaryBtn").addEventListener("click", () => downloadJson("lnp_pages_summary.json", state.data.summary));

  $("sourceSearch").addEventListener("input", (event) => {
    state.sources.search = event.target.value;
    renderSources();
  });
  $("sourceCollectionFilter").addEventListener("change", (event) => {
    state.sources.collection = event.target.value;
    renderSources();
  });
  $("clearSourceFilters").addEventListener("click", () => {
    state.sources.search = "";
    state.sources.collection = "";
    $("sourceSearch").value = "";
    $("sourceCollectionFilter").value = "";
    renderSources();
  });
  $("downloadSourcesBtn").addEventListener("click", () => downloadCsv("lnp_source_inventory_filtered.csv", filteredSources()));
  document.querySelectorAll("[data-source-sort]").forEach((th) => {
    th.addEventListener("click", () => updateSort(state.sources, th.dataset.sourceSort, renderSources));
  });

  $("overlapSearch").addEventListener("input", (event) => {
    state.overlap.search = event.target.value;
    renderOverlap();
  });
  $("overlapRiskFilter").addEventListener("change", (event) => {
    state.overlap.risk = event.target.value;
    renderOverlap();
  });
  $("clearOverlapFilters").addEventListener("click", () => {
    state.overlap.search = "";
    state.overlap.risk = "";
    $("overlapSearch").value = "";
    $("overlapRiskFilter").value = "";
    renderOverlap();
  });
  $("downloadOverlapBtn").addEventListener("click", () => downloadCsv("lnp_overlap_filtered.csv", filteredOverlap()));
  document.querySelectorAll("[data-overlap-sort]").forEach((th) => {
    th.addEventListener("click", () => updateSort(state.overlap, th.dataset.overlapSort, renderOverlap));
  });

  $("activitySearch").addEventListener("input", (event) => {
    state.activity.search = event.target.value;
    renderActivity();
  });
  $("clearActivityFilters").addEventListener("click", () => {
    state.activity.search = "";
    $("activitySearch").value = "";
    renderActivity();
  });
  $("downloadActivityBtn").addEventListener("click", () => downloadCsv("lnp_activity_metrics_filtered.csv", filteredActivity()));
  document.querySelectorAll("[data-activity-sort]").forEach((th) => {
    th.addEventListener("click", () => updateSort(state.activity, th.dataset.activitySort, renderActivity));
  });

  $("queueSearch").addEventListener("input", (event) => {
    state.queue.search = event.target.value;
    renderQueue();
  });
  $("queuePriorityFilter").addEventListener("change", (event) => {
    state.queue.priority = event.target.value;
    renderQueue();
  });
  $("clearQueueFilters").addEventListener("click", () => {
    state.queue.search = "";
    state.queue.priority = "";
    $("queueSearch").value = "";
    $("queuePriorityFilter").value = "";
    renderQueue();
  });
  $("downloadQueueBtn").addEventListener("click", () => downloadCsv("lnp_literature_queue_filtered.csv", filteredQueue()));

  $("recordSearch").addEventListener("input", (event) => {
    state.records.search = event.target.value;
    state.records.page = 1;
    renderRecords();
  });
  $("recordCollectionFilter").addEventListener("change", (event) => {
    state.records.collection = event.target.value;
    state.records.page = 1;
    renderRecords();
  });
  $("clearRecordFilters").addEventListener("click", () => {
    state.records.search = "";
    state.records.collection = "";
    state.records.page = 1;
    $("recordSearch").value = "";
    $("recordCollectionFilter").value = "";
    renderRecords();
  });
  $("downloadRecordsBtn").addEventListener("click", () => downloadCsv("lnp_records_preview_filtered.csv", filteredRecords()));
  $("recordPrevBtn").addEventListener("click", () => {
    state.records.page = Math.max(1, state.records.page - 1);
    renderRecords();
  });
  $("recordNextBtn").addEventListener("click", () => {
    const totalPages = Math.max(1, Math.ceil(filteredRecords().length / state.records.perPage));
    state.records.page = Math.min(totalPages, state.records.page + 1);
    renderRecords();
  });

  $("detailModal").addEventListener("click", (event) => {
    if (event.target === $("detailModal")) closeDetail();
  });
  $("closeDetailBtn").addEventListener("click", closeDetail);
}

function updateSort(sortState, key, renderFn) {
  if (sortState.sortKey === key) {
    sortState.sortAsc = !sortState.sortAsc;
  } else {
    sortState.sortKey = key;
    sortState.sortAsc = false;
  }
  renderFn();
}

function setTab(tab) {
  state.tabs = tab;
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `tab-${tab}`);
  });
}

function renderAll() {
  renderStats();
  renderOverview();
  renderSources();
  renderOverlap();
  renderActivity();
  renderQueue();
  renderRecords();
  renderReports();
}

function renderStats() {
  const summary = state.data.summary;
  const counts = summary.counts;
  $("statCombined").textContent = number(counts.combined_records);
  $("statCoreHigh").textContent = t("coreHigh", {
    core: number(counts.core_open_records),
    high: number(counts.high_throughput_records)
  });
  $("statSmiles").textContent = number(counts.unique_ionizable_smiles_combined_exact);
  $("statActivity").textContent = number(counts.activity_values);
  $("statMetrics").textContent = t("metricGroups", { count: number(state.data.activityMetrics.items.length) });
  $("statComponents").textContent = number(counts.component_rows);
  $("statSources").textContent = t("sourceCollections", { count: number(counts.source_collections) });
  $("statOverlaps").textContent = number(counts.strong_overlap_rows);
  $("statQueue").textContent = t("queueItems", { count: number(counts.supplement_queue_items) });
  $("insightScope").textContent = t("insightScope", {
    sources: number(counts.source_collections),
    records: number(counts.combined_records)
  });
  $("insightOverlap").textContent = t("insightOverlap", { count: number(counts.strong_overlap_rows) });
  $("insightQueue").textContent = t("insightQueue", { count: number(counts.supplement_queue_items) });
  $("overviewGenerated").textContent = t("generated", { time: summary.generated_at });
  $("footerUpdated").textContent = t("generated", { time: summary.generated_at });
}

function renderOverview() {
  const sourceTotals = aggregateBy(
    state.data.sourceInventory.items,
    (row) => row.source_dataset,
    (row) => Number(row.records || 0)
  ).slice(0, 12);
  renderBars("sourceBars", sourceTotals, t("records"));

  const payloadCounts = (state.data.contextSummary.payload_type_counts || [])
    .filter((row) => row.payload_type !== "unknown")
    .slice(0, 12)
    .map((row) => ({ label: row.payload_type, value: row.records }));
  renderBars("payloadBars", payloadCounts, t("records"));

  const activityTotals = aggregateBy(
    state.data.activityMetrics.items,
    (row) => row.source_dataset,
    (row) => Number(row.numeric_rows || 0)
  ).slice(0, 12);
  renderBars("activityBars", activityTotals, t("numeric"));

  const routes = (state.data.contextSummary.route_counts || [])
    .filter((row) => row.route_of_administration !== "unknown")
    .slice(0, 6)
    .map((row) => ({ label: row.route_of_administration, value: row.records }));
  renderBars("routeBars", routes, t("records"));

  const targets = (state.data.contextSummary.delivery_target_counts || [])
    .filter((row) => row.delivery_target !== "unknown")
    .slice(0, 6)
    .map((row) => ({ label: row.delivery_target, value: row.records }));
  renderBars("targetBars", targets, t("records"));
}

function aggregateBy(items, labelFn, valueFn) {
  const map = new Map();
  items.forEach((item) => {
    const label = text(labelFn(item), "unknown");
    map.set(label, (map.get(label) || 0) + Number(valueFn(item) || 0));
  });
  return Array.from(map.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function renderBars(targetId, items, valueLabel) {
  const target = $(targetId);
  if (!items.length) {
    target.innerHTML = `<div class="bar-row"><span class="bar-label">${escapeHtml(t("noData"))}</span></div>`;
    return;
  }
  const max = Math.max(...items.map((item) => Number(item.value || 0)), 1);
  target.innerHTML = items
    .map((item) => {
      const width = Math.max(1, Math.round((Number(item.value || 0) / max) * 100));
      return `
        <div class="bar-row" title="${escapeHtml(item.label)}">
          <span class="bar-label">${escapeHtml(item.label)}</span>
          <span class="bar-track"><span class="bar-fill" style="width:${width}%"></span></span>
          <span class="bar-value">${number(item.value)} ${escapeHtml(valueLabel)}</span>
        </div>
      `;
    })
    .join("");
}

function filteredSources() {
  return state.data.sourceInventory.items
    .filter((row) => !state.sources.collection || row.collection === state.sources.collection)
    .filter((row) => rowContains(row, state.sources.search, ["collection", "source_key", "source_dataset", "record_role"]))
    .sort((a, b) => compareRows(a, b, state.sources.sortKey, state.sources.sortAsc));
}

function renderSources() {
  const items = filteredSources();
  $("sourceInfo").textContent = t("rows", { count: number(items.length) });
  $("sourceTable").innerHTML = items
    .map((row) => `
      <tr>
        <td><span class="pill ${escapeHtml(row.collection)}">${escapeHtml(labelCollection(row.collection))}</span></td>
        <td title="${escapeHtml(row.source_url)}">${escapeHtml(row.source_dataset)}</td>
        <td>${escapeHtml(text(row.record_role))}</td>
        <td class="num">${number(row.records)}</td>
        <td class="num">${number(row.unique_ionizable_smiles)}</td>
        <td class="num">${number(row.numeric_activity_values)}</td>
        <td class="num">${number(row.activity_metrics)}</td>
        <td class="num">${number(row.unique_component_smiles)}</td>
        <td class="num">${number(row.source_files)}</td>
      </tr>
    `)
    .join("");
}

function filteredOverlap() {
  return state.data.overlap.items
    .filter((row) => !state.overlap.risk || row.risk_level === state.overlap.risk)
    .filter((row) => rowContains(row, state.overlap.search, [
      "left_source_key",
      "left_source_dataset",
      "right_source_key",
      "right_source_dataset",
      "risk_level"
    ]))
    .sort((a, b) => compareRows(a, b, state.overlap.sortKey, state.overlap.sortAsc));
}

function renderOverlap() {
  const items = filteredOverlap();
  $("overlapInfo").textContent = t("pairs", { count: number(items.length) });
  $("overlapTable").innerHTML = items
    .map((row) => `
      <tr>
        <td>${escapeHtml(row.left_source_dataset)}<br><span class="table-info">${number(row.left_unique_smiles)} SMILES</span></td>
        <td>${escapeHtml(row.right_source_dataset)}<br><span class="table-info">${number(row.right_unique_smiles)} SMILES</span></td>
        <td class="num">${number(row.shared_smiles)}</td>
        <td class="num">${pct(row.overlap_of_smaller)}</td>
        <td class="num">${pct(row.jaccard)}</td>
        <td><span class="pill ${escapeHtml(row.risk_level)}">${escapeHtml(formatRisk(row.risk_level))}</span></td>
      </tr>
    `)
    .join("");
}

function filteredActivity() {
  return state.data.activityMetrics.items
    .filter((row) => rowContains(row, state.activity.search, ["source_key", "source_dataset", "record_role", "metric"]))
    .sort((a, b) => compareRows(a, b, state.activity.sortKey, state.activity.sortAsc));
}

function renderActivity() {
  const items = filteredActivity();
  $("activityInfo").textContent = t("metricGroups", { count: number(items.length) });
  $("activityTable").innerHTML = items
    .map((row) => `
      <tr>
        <td>${escapeHtml(row.source_dataset)}</td>
        <td>${escapeHtml(text(row.record_role))}</td>
        <td>${escapeHtml(row.metric)}</td>
        <td class="num">${number(row.rows)}</td>
        <td class="num">${number(row.numeric_rows)}</td>
        <td class="num">${number(row.avg_value, 4)}</td>
        <td class="num">${number(row.min_value, 4)}</td>
        <td class="num">${number(row.max_value, 4)}</td>
      </tr>
    `)
    .join("");
  renderComponents();
}

function renderComponents() {
  const grouped = aggregateBy(
    state.data.componentSummary.items,
    (row) => `${row.source_dataset} / ${row.component_type}`,
    (row) => Number(row.unique_smiles || 0)
  ).slice(0, 24);
  $("componentList").innerHTML = grouped
    .map((row) => `
      <div class="component-row">
        <span title="${escapeHtml(row.label)}">${escapeHtml(row.label)}</span>
        <span class="num">${number(row.value)}</span>
        <span class="table-info">SMILES</span>
        <span></span>
      </div>
    `)
    .join("");
}

function filteredQueue() {
  return state.data.supplementQueue.items
    .filter((row) => !state.queue.priority || row.priority === state.queue.priority)
    .filter((row) => rowContains(row, state.queue.search, [
      "source_key",
      "title",
      "paper_doi",
      "dataset_doi",
      "source_url",
      "file_name",
      "reason",
      "extraction_status"
    ]));
}

function renderQueue() {
  const items = filteredQueue();
  $("queueInfo").textContent = t("queueItems", { count: number(items.length) });
  $("queueTable").innerHTML = items
    .map((row) => `
      <tr>
        <td><span class="pill ${escapeHtml(row.priority)}">${escapeHtml(labelPriority(row.priority))}</span></td>
        <td>${escapeHtml(row.source_key)}</td>
        <td>${linkOrText(row.source_url, row.title)}</td>
        <td class="mono">${doiLink(row.paper_doi)}</td>
        <td class="mono">${doiLink(row.dataset_doi)}</td>
        <td>${escapeHtml(text(row.extraction_status || row.status))}</td>
        <td>${escapeHtml(text(row.reason))}</td>
      </tr>
    `)
    .join("");
}

function filteredRecords() {
  return state.data.recordsPreview.items
    .filter((row) => !state.records.collection || row.collection === state.records.collection)
    .filter((row) => rowContains(row, state.records.search, [
      "collection",
      "source_key",
      "source_dataset",
      "record_role",
      "publication_doi",
      "dataset_doi",
      "paper_title",
      "lipid_name",
      "ionizable_lipid_smiles",
      "helper_lipid_smiles",
      "sterol_lipid_smiles",
      "peg_lipid_smiles",
      "payload_type",
      "cell_context",
      "delivery_target",
      "activity_metric"
    ]));
}

function renderRecords() {
  const items = filteredRecords();
  const totalPages = Math.max(1, Math.ceil(items.length / state.records.perPage));
  state.records.page = Math.min(state.records.page, totalPages);
  const start = (state.records.page - 1) * state.records.perPage;
  const pageItems = items.slice(start, start + state.records.perPage);
  $("recordInfo").textContent = t("previewRows", { count: number(items.length) });
  $("recordPageInfo").textContent = t("pageInfo", { page: state.records.page, total: totalPages });
  $("recordPrevBtn").disabled = state.records.page <= 1;
  $("recordNextBtn").disabled = state.records.page >= totalPages;
  $("recordTable").innerHTML = pageItems
    .map((row) => `
      <tr data-preview-id="${row.preview_id}">
        <td><span class="pill ${escapeHtml(row.collection)}">${escapeHtml(labelCollection(row.collection))}</span></td>
        <td>${escapeHtml(row.source_dataset)}</td>
        <td>${escapeHtml(text(row.record_role))}</td>
        <td class="mono">${doiLink(row.publication_doi || row.dataset_doi)}</td>
        <td>${escapeHtml(text(row.lipid_name))}</td>
        <td class="mono" title="${escapeHtml(text(row.ionizable_lipid_smiles))}">${escapeHtml(text(row.ionizable_lipid_smiles))}</td>
        <td>${escapeHtml(text(row.payload_type))}</td>
        <td>${escapeHtml(text(row.cell_context || row.delivery_target || row.route_of_administration))}</td>
        <td>${escapeHtml(text(row.activity_metric))}</td>
        <td class="num">${escapeHtml(text(row.activity_value ?? row.activity_value_text))}</td>
      </tr>
    `)
    .join("");
  $("recordTable").querySelectorAll("tr[data-preview-id]").forEach((tr) => {
    tr.addEventListener("click", () => {
      const row = pageItems.find((item) => String(item.preview_id) === tr.dataset.previewId);
      if (row) openDetail(row);
    });
  });
}

function renderReports() {
  const reports = state.data.summary.reports || [];
  $("reportGrid").innerHTML = reports
    .map((report) => `
      <article class="report-card">
        <a href="${escapeHtml(report.path)}">${escapeHtml(report.label)}</a>
        <span class="report-meta">${bytes(report.bytes)}</span>
      </article>
    `)
    .join("");
}

function openDetail(row) {
  $("detailTitle").textContent = t("detailTitle", {
    collection: labelCollection(row.collection),
    source: text(row.source_dataset)
  });
  const fields = [
    [t("previewId"), row.preview_id],
    [t("collection"), labelCollection(row.collection)],
    [t("source"), row.source_dataset],
    [t("role"), row.record_role],
    [t("sourceRecordId"), row.source_record_id],
    [t("publicationDoi"), row.publication_doi],
    [t("datasetDoi"), row.dataset_doi],
    [t("title"), row.paper_title],
    [t("lipidName"), row.lipid_name],
    ["Ionizable SMILES", row.ionizable_lipid_smiles],
    [t("helperSmiles"), row.helper_lipid_smiles],
    [t("sterolSmiles"), row.sterol_lipid_smiles],
    [t("pegSmiles"), row.peg_lipid_smiles],
    [t("payload"), row.payload_type],
    [t("cellContext"), row.cell_context],
    [t("route"), row.route_of_administration],
    [t("deliveryTarget"), row.delivery_target],
    [t("lipidRatio"), row.lipid_ratio],
    [t("activityMetric"), row.activity_metric],
    [t("activityValue"), row.activity_value ?? row.activity_value_text]
  ];
  $("detailBody").innerHTML = `
    <dl class="detail-grid">
      ${fields.map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(text(value))}</dd>`).join("")}
    </dl>
  `;
  $("detailModal").hidden = false;
}

function closeDetail() {
  $("detailModal").hidden = true;
}

function labelCollection(value) {
  if (value === "core_open") return t("coreOpen");
  if (value === "high_throughput") return t("highThroughput");
  return text(value);
}

function formatRisk(value) {
  if (value === "duplicate_subset") return t("riskDuplicateSubset");
  if (value === "material_overlap") return t("riskMaterialOverlap");
  if (value === "moderate_overlap") return t("riskModerateOverlap");
  if (value === "low_overlap") return t("riskLowOverlap");
  return text(value).replaceAll("_", " ");
}

function labelPriority(value) {
  if (value === "high") return t("high");
  if (value === "medium") return t("medium");
  if (value === "low") return t("low");
  return text(value);
}

function linkOrText(url, label) {
  const safeLabel = escapeHtml(text(label));
  if (!url) return safeLabel;
  return `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${safeLabel}</a>`;
}

function doiLink(doi) {
  if (!doi) return "-";
  const clean = String(doi).replace(/^https?:\/\/doi.org\//i, "");
  return `<a href="https://doi.org/${escapeHtml(clean)}" target="_blank" rel="noreferrer">${escapeHtml(clean)}</a>`;
}

function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  downloadBlob(filename, blob);
}

function downloadCsv(filename, rows) {
  const columns = [];
  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!columns.includes(key)) columns.push(key);
    });
  });
  const csv = [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(","))
  ].join("\n");
  downloadBlob(filename, new Blob([csv], { type: "text/csv;charset=utf-8" }));
}

function csvCell(value) {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

document.addEventListener("DOMContentLoaded", loadData);
