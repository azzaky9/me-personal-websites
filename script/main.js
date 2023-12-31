const headerContainer = document.getElementById("header-container");
const btnAnimate = document.querySelector(".animate-button-this");
const profileEl = document.querySelectorAll("[data-inview-profile]");
const shrtIntroEl = document.querySelectorAll("[data-inview-introduce]");
const navbarMenu = document.querySelectorAll("[data-menu-animate]");
const svgInfiniteLine = document.querySelector("[data-animate-path]");
const aboutElements = document.querySelector(".inner-about-me");
const certificateContainer = document.querySelector(".certification-container");
const btnCertificate = document.querySelectorAll("[data-animate-btn]");
const openingCContainer = document.querySelector(".opening-certification");
const projectPreviewEl = document.querySelector("[data-animate-projects]");
const notifiedEl = document.querySelector(".modal-notified-status");

(function () {
  emailjs.init("WfFBgLOtkh49APsGi");
})();

VANTA.WAVES({
  el: headerContainer,
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x1
});

const elements = document.querySelectorAll(".me-soft-skills-item");

elements.forEach((element) => {
  element.addEventListener("mouseover", () => {
    elements.forEach((el) => {
      el !== element ? el.classList.add("blur") : el.classList.add("scale");
    });
  });

  element.addEventListener("mouseout", () => {
    elements.forEach((el) => {
      return el !== element
        ? el.classList.remove("blur")
        : el.classList.remove("scale");
    });
  });
});

// animte all button on the entire pages
function hoverButtonEl(element) {
  element.addEventListener("mouseover", (e) => {
    anime({
      targets: element.children[1],
      rotate: 90
    });
  });

  element.addEventListener("mouseleave", (e) => {
    anime({
      targets: element.children[1],
      rotate: 0
    });
  });
}

hoverButtonEl(btnAnimate);

// observe and animate

function choosingOptionAnimate(animateModel, el) {
  const defaultOption = {
    targets: el,
    opacity: 1,
    easing: "easeInOutQuad",
    delay: anime.stagger(200)
  };

  const hashAnimateOption = {
    PROFILE_INVIEW: { ...defaultOption, translateX: -20 },
    SHORT_INTRODUCE: { ...defaultOption, translateY: -30 },
    NAVBAR_MENU: {
      ...defaultOption,
      opacity: 1,
      translateY: 10,
      delay: anime.stagger(200)
    },
    SVG_TIMELINE: {
      ...defaultOption,
      targets: ".animate-path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 1000,
      delay: 1000
    }
  };

  const option = hashAnimateOption[animateModel];

  return anime(option);
}

function observreAndAnimateWithClass(elements, animateModel, className) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          choosingOptionAnimate(animateModel, className);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    }
  );

  observer.observe(elements);
}

function observreAndAnimate(elements, animateModel, shouldAnimateChildren) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (elements.length) {
            return choosingOptionAnimate(animateModel, elements);
          }

          if (shouldAnimateChildren) {
            choosingOptionAnimate(animateModel, entry.target.children);
          } else {
            choosingOptionAnimate(animateModel, entry);
          }

          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    }
  );

  if (elements.length) {
    elements.forEach((el) => {
      observer.observe(el);
    });
  } else {
    observer.observe(elements);
  }
}

const x = [
  [svgInfiniteLine, "SVG_TIMELINE", false],
  [aboutElements, "SHORT_INTRODUCE", true],
  [elements, "NAVBAR_MENU", false],
  [openingCContainer, "NAVBAR_MENU", true],
  [certificateContainer, "NAVBAR_MENU", true]
];

x.forEach((k) => {
  observreAndAnimate(k[0], k[1], k[2]);
});

const p = [
  ["PROFILE_INVIEW", profileEl],
  ["SHORT_INTRODUCE", shrtIntroEl],
  ["NAVBAR_MENU", navbarMenu]
];

p.forEach((t) => {
  choosingOptionAnimate(t[0], t[1], t[2]);
});

observreAndAnimateWithClass(projectPreviewEl, "NAVBAR_MENU", ".p");

const formEl = document.getElementById("form-sender");

observreAndAnimateWithClass(formEl, "NAVBAR_MENU", "[data-animate-input]");

const mappingStatus = {
  success: {
    message: "Email completely sent",
    iconClass: "bi bi-check-all"
  },
  failed: {
    message: "Failed to sent",
    iconClass: "bi-x-circle-fill"
  }
};

const createStatusmsg = (status) => {
  const elements = `
    <i class='${mappingStatus[status].iconClass}'></i>
    <h5>${mappingStatus[status].message}</h5>
  `;

  return elements;
};

formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  const serviceId = "service_4a2j5tg";
  const templateId = "template_3epwcup";

  emailjs
    .sendForm(serviceId, templateId, this)
    .then(() => {
      notifiedEl.children[0].innerHTML = createStatusmsg("success");

      anime({
        targets: notifiedEl,
        right: 0,
        endDelay: 1000,
        direction: "alternate"
      });
    })
    .catch((err) => {
      notifiedEl.children[0].innerHTML = createStatusmsg("failed");

      anime({
        targets: notifiedEl,
        right: 0,
        endDelay: 1000,
        direction: "alternate"
      });
    });
});
