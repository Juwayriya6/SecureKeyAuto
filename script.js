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

  const emailSubject =
    encodeURIComponent("Secure Key Auto Chat Request");

  const emailBody =
    encodeURIComponent(
      `New chat request from website:\n\n${text}\n\nPlease reply to this customer as soon as possible.`
    );

  setTimeout(() => {
    const botMsg = document.createElement("p");

    botMsg.className = "bot";
    botMsg.textContent =
      "Thanks. Your email app will open so this request can be sent to Secure Key Auto.";

    chatMessages?.appendChild(botMsg);

    if(chatMessages){
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    window.location.href =
      `mailto:skautosolutions26@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  }, 450);

  if(chatMessages){
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

const counters = document.querySelectorAll(".counter");

const runCounter = counter => {
  const target = parseFloat(counter.dataset.target);
  const isDecimal = target % 1 !== 0;

  let current = 0;
  const speed = 45;
  const increment = target / speed;

  const update = () => {
    current += increment;

    if(current < target){
      counter.textContent = isDecimal
        ? current.toFixed(1)
        : Math.floor(current);

      requestAnimationFrame(update);
    } else {
      counter.textContent = isDecimal
        ? target.toFixed(1)
        : target;
    }
  };

  update();
};

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      runCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, {
  threshold:.6
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});