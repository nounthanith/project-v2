const myTeam = [
  {
    name: "Ny Chenda",
    github: "https://github.com/",
    role: "Leader"
  },
  {
    image: "./images/TeamImages/Me.jpg",
    name: "Nuon Thanith",
    github: "https://github.com/nounthanith",
    // bio: "Passionate about creating efficient and user-friendly applications.",
  },
  {
    name: "Ngin Vinnet",
    github: "https://github.com/",  
  },
  {
    name: "Khoeurn Sothea", 
    github: "https://github.com/",
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
                        <div class="social-links">
                            <a href="${item.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                `;

    showMyTeam.appendChild(memberElement);
  });
};

aboutMyTeam();
