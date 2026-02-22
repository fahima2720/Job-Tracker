let activeTab = "all";

let jobs = [
  {id:1, company:"Mobile First Corp", position:"React Native Developer", meta:"Remote · Full-time · $130,000 - $175,000", desc:"Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status:"all"},

  {id:2, company:"WebFlow Agency", position:"Web Designer & Developer", meta:"Los Angeles · Part-time · $80,000 - $120,000", desc:"Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status:"all"},

  {id:3, company:"DataViz Solutions", position:"Data Visualization Specialist", meta:"Boston,MA · Full-time · $125,000 - $165,000", desc:"Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status:"all"},

  {id:4, company:"CloudFirst Inc", position:"Backend Developer", meta:"Seattle, W/A · Full-time · $110,000 - $150,000", desc:"Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.", status:"all"},

  {id:5, company:"Innovate Labs", position:"UI/UX Engineer", meta:"Austin,TX · Full-time · $110,000 - $150,000", desc:"Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.", status:"all"},

  {id:6, company:"MegaCorp Solutions", position:"JavaScript Developer", meta:"New York, NY · Full-time · $130,000 - $170,000", desc:"Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.", status:"all"},

  {id:7, company:"StartupXYZ", position:"Full Stack Engineer", meta:"Remote · Full-time · $120,000 - $160,000", desc:"Ensure product quality through testing.", status:"all"},

  {id:8, company:"TechCorp Industries", position:"Senior Frontend Developer", meta:"San Francisco, CA· Full-time · $130,000 - $175,000", desc:"We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.", status:"all"}
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