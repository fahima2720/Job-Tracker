let activeTab = "all";

let jobs = [
  {id:1, company:"Mobile First Corp", position:"React Native Developer", meta:"Remote · Full-time · $130,000 - $175,000", desc:"Build cross-platform mobile applications using React Native.", status:"all"},
  {id:2, company:"WebFlow Agency", position:"Web Designer & Developer", meta:"Los Angeles · Part-time · $80,000 - $120,000", desc:"Create stunning web experiences for high-profile clients.", status:"all"},
  {id:3, company:"DataViz Solutions", position:"Data Visualization Specialist", meta:"Boston · Full-time · $125,000 - $165,000", desc:"Transform complex data into insightful visualizations.", status:"all"},
  {id:4, company:"CloudFirst Inc", position:"Backend Developer", meta:"Remote · Full-time · $110,000 - $150,000", desc:"Build scalable backend systems with Node.js.", status:"all"},
  {id:5, company:"Innovate Labs", position:"UI/UX Designer", meta:"Austin · Contract · $90,000 - $130,000", desc:"Design user-friendly interfaces for SaaS products.", status:"all"},
  {id:6, company:"TechNova", position:"Frontend Engineer", meta:"Remote · Full-time · $100,000 - $140,000", desc:"Implement modern frontend architectures.", status:"all"},
  {id:7, company:"FinEdge", position:"QA Engineer", meta:"Berlin · Full-time · $70,000 - $100,000", desc:"Ensure product quality through testing.", status:"all"},
  {id:8, company:"StartupX", position:"Product Manager", meta:"Remote · Full-time · $120,000 - $160,000", desc:"Lead product strategy and execution.", status:"all"}
];

function setTab(tab){
  activeTab = tab;
  renderJobs();
}

function setStatus(id, status){
  for(let job of jobs){
    if(job.id === id){
      job.status = status;
    }
  }
  activeTab = status;
  renderJobs();
}

function deleteJob(id){
  jobs = jobs.filter(job => job.id !== id);
  renderJobs();
}

function renderJobs(){
  const container = document.getElementById("jobContainer");
  container.innerHTML = "";

  let filtered = activeTab === "all" ? jobs : jobs.filter(j => j.status === activeTab);

  document.getElementById("totalCount").innerText = jobs.length;
  document.getElementById("interviewCount").innerText = jobs.filter(j => j.status==="interview").length;
  document.getElementById("rejectedCount").innerText = jobs.filter(j => j.status==="rejected").length;
  document.getElementById("tabCount").innerText = filtered.length + " jobs";

  if(filtered.length === 0){
    document.getElementById("emptyState").classList.remove("hidden");
    return;
  }
  document.getElementById("emptyState").classList.add("hidden");

  for(let job of filtered){
    container.innerHTML += `
      <div class="bg-white border rounded-lg p-4 mb-4">
        <div class="flex justify-between">
          <h3 class="font-semibold">${job.company}</h3>
          <button onclick="deleteJob(${job.id})" class="text-gray-400">✕</button>
        </div>
        <p class="text-sm text-gray-600">${job.position}</p>
        <p class="text-sm text-gray-500">${job.meta}</p>
        <span class="inline-block mt-2 px-2 py-0.5 text-xs bg-gray-100 rounded">NOT APPLIED</span>
        <p class="text-sm text-gray-600 mt-3">${job.desc}</p>
        <div class="flex gap-2 mt-4">
          <button onclick="setStatus(${job.id}, 'interview')" class="border border-green-500 text-green-600 text-xs px-3 py-1 rounded">INTERVIEW</button>
          <button onclick="setStatus(${job.id}, 'rejected')" class="border border-red-500 text-red-500 text-xs px-3 py-1 rounded">REJECTED</button>
        </div>
      </div>
    `;
  }
}

renderJobs();