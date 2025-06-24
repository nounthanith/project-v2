const navItems = [
    {
        name: "Home",
        href: "product.html",
        // icon: "fa-solid fa-house",
    },
    {
        name: "Admin",
        href: "adminDashboard.html",
        // icon: "fa-solid fa-user-shield",
    },
    {
        name: "Login",
        href: "index.html",
        // icon: "fa-solid fa-right-to-bracket",
    }
];

const navbar = document.getElementById("navbar");

if (navbar) {
    navItems.forEach(item => {
        const navItem = document.createElement("li");
        navItem.className = "nav-item";

        const navLink = document.createElement("a");
        navLink.className = "nav-link";
        navLink.href = item.href;
        navLink.innerHTML = `<i class=" ${item.icon} me-1"></i> ${item.name}`;

        navItem.appendChild(navLink);
        navbar.appendChild(navItem);
    });
}
