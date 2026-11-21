const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

const threatContent = {
  plastic: {
    number: "01 — THE EVERYDAY THREAT",
    title: "Plastic pollution",
    description: "Plastic waste travels through rivers and coastlines into the sea. It can entangle marine animals, be mistaken for food, and break down into tiny particles that remain in the environment.",
    action: "Choose reusable items, avoid unnecessary packaging, dispose of waste responsibly, and support local clean-up efforts."
  },
  climate: {
    number: "02 — A CHANGING OCEAN",
    title: "Climate change",
    description: "The ocean absorbs much of the excess heat trapped by greenhouse gases. Warming waters, acidification, and rising sea levels put coral reefs and coastal communities under pressure.",
    action: "Reduce energy waste, choose lower-carbon travel where possible, and support climate action based on credible science."
  },
  overfishing: {
    number: "03 — PRESSURE ON SPECIES",
    title: "Overfishing",
    description: "When fish are caught faster than populations can reproduce, food webs become disrupted. Unsustainable fishing can also damage habitats and affect communities that depend on healthy seas.",
    action: "Look for responsibly sourced seafood, learn where it comes from, and support sustainable fisheries."
  },
  habitat: {
    number: "04 — LOSING NATURAL DEFENCES",
    title: "Habitat destruction",
    description: "Coastal development, destructive practices, and pollution can damage mangroves, seagrass meadows, and coral reefs. These habitats shelter wildlife and help protect shorelines.",
    action: "Respect protected coastal areas, reduce pollution, and support restoration projects led by local communities."
  }
};

document.querySelectorAll(".threat-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".threat-tab").forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    const content = threatContent[tab.dataset.threat];
    document.querySelector("#threat-number").textContent = content.number;
    document.querySelector("#threat-title").textContent = content.title;
    document.querySelector("#threat-description").textContent = content.description;
    document.querySelector("#threat-action").textContent = content.action;
  });
});

const pledgeForm = document.querySelector("#pledge-form");
const pledgeMessage = document.querySelector("#pledge-message");
pledgeForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#pledge-name").value.trim();
  const pledge = document.querySelector("#pledge-choice").value;
  if (!name || !pledge) return;
  const pledges = JSON.parse(localStorage.getItem("seavari-pledges") || "[]");
  pledges.push({ name, pledge, date: new Date().toISOString() });
  localStorage.setItem("seavari-pledges", JSON.stringify(pledges));
  pledgeMessage.textContent = `Thank you, ${name}. Your pledge to “${pledge}” has been saved on this device.`;
  pledgeForm.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
