const myTeam = [
  {
    name: "Ny Chenda",
    role: "Leader",
    github: "",
    portfolio: "",
  },
  {
    name: "Nuon Thanith",
    // image: "./images/TeamImages/Me.jpg",
    github: "<a target='_blank' href='https://github.com/nounthanith'><i class='fa-brands fa-github'></i></a>",
    portfolio: "<a target='_blank' href='https://modern-portfolio-pi-two.vercel.app/'><i class='fa-solid fa-circle-user'></i></i></a>",
    // role:"Frontend"
  },
  {
    name: "Ngin Vinnet",
    github: "",
    portfolio: "",

  },
  {
    name: "Khoeurn Sothea", 
    github: "",
    portfolio: "",
  },
];

const aboutMyTeam = () => {
  const showMyTeam = document.getElementById("showMyTeam");

  myTeam.forEach((item) => {
    console.log(myTeam)
    const memberElement = document.createElement("div");
    memberElement.className = "team-member";
    const imageElement = item.image
      ? `<img src="${item.image}" alt="${item.name}" class="member-image">`
      : `<div class="member-icon"><i class="fa-solid fa-user"></i></div>`;

    memberElement.innerHTML = `
                    ${imageElement}
                    <div class="member-info">
                        <h3 style="font-size: 15px;" class="member-name">${item.name}</h3>
                        <p class="member-role">${item.role || "Team Member"}</p>
                        <p class="member-bio">${item.bio || ""}</p>
                        <div class="social-links" style="display: flex;gap: 5px;>
                          <p class="social-links" >${item.github ? item.github : ""}</p>
                          <p class="social-links">${item.portfolio}</p>
                        </div>
                    </div>
                `;

    showMyTeam.appendChild(memberElement);
  });
};

aboutMyTeam();
