// Profile Information - Easy to Edit
// Edit the values below to update your profile information

const profileInfo = {
    personal: {
        name: "Ersel Metz Magbanua",
        age: 20, // This will be auto-calculated, but you can set a base year
        birthYear: 2004,
        location: "Rizal, Philippines",
        email: "magbanuaersel@gmail.com",
        profession: "Web Developer"
    },

    social: {
        facebook: "https://facebook.com/ersel.magbanua",
        github: "https://github.com/erselmetz",
        linkedin: "https://linkedin.com/in/erselmetz"
    },

    about: {
        paragraph1: "I am a passionate Web Developer dedicated to creating engaging and functional web experiences. With expertise in both frontend and backend technologies, I build responsive websites and web applications that combine aesthetic design with robust functionality.",
        paragraph2: "My journey in web development has equipped me with skills in modern frameworks and technologies. I enjoy turning complex problems into simple, beautiful, and intuitive solutions. When I'm not coding, I'm constantly learning new technologies and exploring innovative approaches to web development."
    },

    skills: {
        frontend: [
            { name: "Bootstrap", level: "Advanced", progress: "85%" },
            { name: "JavaScript", level: "Advanced", progress: "80%" },
            { name: "jQuery", level: "Intermediate", progress: "70%" }
        ],
        backend: [
            { name: "PHP", level: "Advanced", progress: "75%" },
            { name: "Laravel", level: "Intermediate", progress: "65%" }
        ],
        database: [
            { name: "MySQL", level: "Advanced", progress: "80%" }
        ]
    }
};

// Function to update profile information on the page
function updateProfileInfo() {
    // Update personal information
    const personal = profileInfo.personal;

    // Update name
    document.querySelectorAll('.profile-name').forEach(el => {
        el.textContent = personal.name;
    });

    // Update location
    document.querySelectorAll('.profile-location').forEach(el => {
        el.textContent = personal.location;
    });

    // Update email
    document.querySelectorAll('.email-text').forEach(el => {
        el.textContent = personal.email;
    });

    // Update profession
    document.querySelectorAll('.profile-profession').forEach(el => {
        el.textContent = personal.profession;
    });

    // Calculate and update age
    const today = new Date();
    let age = today.getFullYear() - personal.birthYear;
    const monthDiff = today.getMonth() - 0; // January (0-based)
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < 1)) {
        age--;
    }

    document.querySelectorAll('#age, #about-age').forEach(el => {
        if (el) el.textContent = age;
    });

    // Update social links
    const social = profileInfo.social;
    document.querySelectorAll('a.social-link[data-platform]').forEach(link => {
        const platform = link.getAttribute('data-platform');
        if (social[platform]) {
            link.href = social[platform];
        }
    });

    // Update about me content
    const aboutContainer = document.getElementById('about-me-content');
    if (aboutContainer) {
        aboutContainer.innerHTML = `
            <p class="w3-large">${profileInfo.about.paragraph1}</p>
            <p>${profileInfo.about.paragraph2}</p>
        `;
    }

    // Update skills
    updateSkillsDisplay();
}

// Function to update skills display
function updateSkillsDisplay() {
    // Frontend skills
    const frontendContainer = document.querySelector('.skills-container[data-category="frontend"]');
    if (frontendContainer) {
        frontendContainer.innerHTML = profileInfo.skills.frontend.map(skill => `
            <div class="w3-col l4 m6 s12 w3-margin-bottom">
                <div class="skill-card w3-card-4 w3-round-xlarge skill-hover">
                    <div class="skill-image-container w3-center w3-padding">
                        <img src="https://via.placeholder.com/100x100/009688/ffffff?text=${skill.name}" alt="${skill.name}" class="skill-image w3-round-xlarge">
                    </div>
                    <div class="w3-container w3-padding-16">
                        <h4 class="w3-text-teal"><b>${skill.name}</b></h4>
                        <p class="skill-description">Professional ${skill.name} development skills.</p>
                        <div class="skill-level-container">
                            <small><strong>Level:</strong> <span class="w3-badge ${skill.level === 'Advanced' ? 'w3-green' : 'w3-yellow'}">${skill.level}</span></small>
                            <div class="w3-light-grey w3-round-xlarge w3-margin-top" style="height:8px;">
                                <div class="skill-progress w3-teal w3-round-xlarge" data-width="${skill.progress}" style="height:8px;width:0%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Backend skills
    const backendContainer = document.querySelector('.skills-container[data-category="backend"]');
    if (backendContainer) {
        backendContainer.innerHTML = profileInfo.skills.backend.map(skill => `
            <div class="w3-col l4 m6 s12 w3-margin-bottom">
                <div class="skill-card w3-card-4 w3-round-xlarge skill-hover">
                    <div class="skill-image-container w3-center w3-padding">
                        <img src="https://via.placeholder.com/100x100/009688/ffffff?text=${skill.name}" alt="${skill.name}" class="skill-image w3-round-xlarge">
                    </div>
                    <div class="w3-container w3-padding-16">
                        <h4 class="w3-text-teal"><b>${skill.name}</b></h4>
                        <p class="skill-description">Professional ${skill.name} development skills.</p>
                        <div class="skill-level-container">
                            <small><strong>Level:</strong> <span class="w3-badge ${skill.level === 'Advanced' ? 'w3-green' : 'w3-yellow'}">${skill.level}</span></small>
                            <div class="w3-light-grey w3-round-xlarge w3-margin-top" style="height:8px;">
                                <div class="skill-progress w3-teal w3-round-xlarge" data-width="${skill.progress}" style="height:8px;width:0%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Database skills
    const databaseContainer = document.querySelector('.skills-container[data-category="database"]');
    if (databaseContainer) {
        databaseContainer.innerHTML = profileInfo.skills.database.map(skill => `
            <div class="w3-col l4 m6 s12 w3-margin-bottom">
                <div class="skill-card w3-card-4 w3-round-xlarge skill-hover">
                    <div class="skill-image-container w3-center w3-padding">
                        <img src="https://via.placeholder.com/100x100/009688/ffffff?text=${skill.name}" alt="${skill.name}" class="skill-image w3-round-xlarge">
                    </div>
                    <div class="w3-container w3-padding-16">
                        <h4 class="w3-text-teal"><b>${skill.name}</b></h4>
                        <p class="skill-description">Professional ${skill.name} database management skills.</p>
                        <div class="skill-level-container">
                            <small><strong>Level:</strong> <span class="w3-badge ${skill.level === 'Advanced' ? 'w3-green' : 'w3-yellow'}">${skill.level}</span></small>
                            <div class="w3-light-grey w3-round-xlarge w3-margin-top" style="height:8px;">
                                <div class="skill-progress w3-teal w3-round-xlarge" data-width="${skill.progress}" style="height:8px;width:0%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateProfileInfo();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = profileInfo;
}
