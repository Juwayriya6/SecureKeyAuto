const loader = document.querySelector("#loader");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader?.classList.add("hide");
  }, 450);
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
  });
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold:0.14
});

reveals.forEach(el => observer.observe(el));

document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();

    if(form.classList.contains("chat-form")) return;

    const data = new FormData(form);

    const lines = [...data.entries()]
      .map(([key,value]) => `${key}: ${value}`)
      .join("%0D%0A");

    const subject =
    encodeURIComponent("Secure Key Auto Service Request");

    window.location.href =
    `mailto:service@securekeyauto.com?subject=${subject}&body=${lines || "New service request"}`;
  });
});

const launcher = document.querySelector(".chat-launcher");
const chatbot = document.querySelector(".chatbot");
const closeChat = document.querySelector(".chat-close");
const chatForm = document.querySelector(".chat-form");
const chatInput = document.querySelector(".chat-form input");
const chatMessages = document.querySelector(".chat-messages");

launcher?.addEventListener("click", () => {
  chatbot?.classList.toggle("open");
});

closeChat?.addEventListener("click", () => {
  chatbot?.classList.remove("open");
});

const responses = [
  "For immediate help, call 780-908-7332.",
  "We help with lockouts, lost keys, smart keys and ignition issues.",
  "Send your vehicle make, model, year and location for a quote.",
  "Secure Key Auto provides mobile locksmith service across Edmonton."
];

chatForm?.addEventListener("submit", event => {
  event.preventDefault();

  const text = chatInput?.value.trim();

  if(!text) return;

  const userMsg = document.createElement("p");

  userMsg.className = "user";
  userMsg.textContent = text;

  chatMessages?.appendChild(userMsg);

  if(chatInput){
    chatInput.value = "";
  }

  setTimeout(() => {
    const botMsg = document.createElement("p");

    botMsg.className = "bot";
    botMsg.textContent =
    responses[Math.floor(Math.random() * responses.length)];

    chatMessages?.appendChild(botMsg);

    if(chatMessages){
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }, 450);

  if(chatMessages){
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});