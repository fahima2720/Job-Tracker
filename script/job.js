const jobs = [
  {
    id: 1,
    companyName: "Mobile First Corp",
    position: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$3000 - $5000",
    description: "Build modern user interfaces using React and Tailwind CSS.",
    status: "all"
  },
  {
    id: 2,
    companyName: "WebFlow Agency",
    position: "Web Designer",
    location: "Los Angeles",
    type: "Part-time",
    salary: "$2500 - $4000",
    description: "Design responsive layouts and improve user experience.",
    status: "all"
  },
  {
    id: 3,
    companyName: "DataViz Solutions",
    position: "Data Analyst",
    location: "New York",
    type: "Full-time",
    salary: "$4500 - $6500",
    description: "Analyze business data and create insightful dashboards.",
    status: "all"
  },
  {
    id: 4,
    companyName: "CloudFirst Inc",
    position: "DevOps Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$6000 - $8000",
    description: "Maintain cloud infrastructure using AWS and Docker.",
    status: "all"
  },
  {
    id: 5,
    companyName: "Innovation Labs",
    position: "UI/UX Designer",
    location: "Austin",
    type: "Contract",
    salary: "$3500 - $5000",
    description: "Design intuitive interfaces for SaaS products.",
    status: "all"
  },
  {
    id: 6,
    companyName: "MegaCorp Solutions",
    position: "Backend Developer",
    location: "Chicago",
    type: "Full-time",
    salary: "$5000 - $7000",
    description: "Build scalable APIs using Node.js and MongoDB.",
    status: "all"
  },
  {
    id: 7,
    companyName: "FinTech Hub",
    position: "QA Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$3000 - $4500",
    description: "Ensure software quality through manual and automated testing.",
    status: "all"
  },
  {
    id: 8,
    companyName: "StartupX",
    position: "Product Manager",
    location: "Berlin",
    type: "Full-time",
    salary: "$5500 - $7500",
    description: "Lead product development and coordinate cross-functional teams.",
    status: "all"
  }
];

let activeTab = "all";

const jobContainer = document.getElementById("jobContainer");
const emptyState = document.getElementById("emptyState");
const totalCount = document.getElementById("totalCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const tabJobCount = document.getElementById("tabJobCount");

function updateCounts() {
  totalCount.innerText = jobs.length;
  interviewCount.innerText = jobs.filter(j => j.status === "interview").length;
  rejectedCount.innerText = jobs.filter(j => j.status === "rejected").length;
}

function renderJobs() {
  jobContainer.innerHTML = "";

  const filteredJobs =
    activeTab === "all"
      ? jobs
      : jobs.filter(job => job.status === activeTab);

  tabJobCount.innerText = `${filteredJobs.length} Jobs`;

  if (filteredJobs.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
  }

  filteredJobs.forEach(job => {
    const card = document.createElement("div");
    card.className = "card bg-white shadow";

    card.innerHTML = `
      <div class="card-body">
        <div class="flex justify-between">
          <h3 class="font-bold">${job.companyName}</h3>
          <button onclick="deleteJob(${job.id})" class="text-red-500">✕</button>
        </div>

        <p class="text-sm text-gray-600">${job.position}</p>
        <p class="text-sm">${job.location} • ${job.type}</p>
        <p class="text-sm font-medium">${job.salary}</p>
        <p class="text-sm text-gray-500 mt-2">${job.description}</p>

        <div class="flex gap-2 mt-4">
          <button
            onclick="setStatus(${job.id}, 'interview')"
            class="btn btn-sm ${job.status === "interview" ? "btn-success" : "btn-outline"}">
            Interview
          </button>
          <button
            onclick="setStatus(${job.id}, 'rejected')"
            class="btn btn-sm ${job.status === "rejected" ? "btn-error" : "btn-outline"}">
            Rejected
          </button>
        </div>
      </div>
    `;

    jobContainer.appendChild(card);
  });

  updateCounts();
}

function setStatus(id, status) {
  const job = jobs.find(j => j.id === id);
  job.status = status;
  activeTab = status;
  setActiveTab(status);
  renderJobs();
}

function deleteJob(id) {
  const index = jobs.findIndex(j => j.id === id);
  jobs.splice(index, 1);
  renderJobs();
}

function setActiveTab(tab) {
  activeTab = tab;
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.remove("tab-active");
    if (t.dataset.tab === tab) t.classList.add("tab-active");
  });
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    setActiveTab(tab.dataset.tab);
    renderJobs();
  });
});

renderJobs();