document.addEventListener('DOMContentLoaded', function () {


    // Mouse-pointer animation
    const $circleElement = document.querySelector(".circle");

    const mouse = { x: 0, y: 0 },
        circle = { x: 0, y: 0 };

    window.addEventListener("mousemove", e => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    const speed = 0.15;

    const tick = () => {
        circle.x += (mouse.x - circle.x) * speed;
        circle.y += (mouse.y - circle.y) * speed;

        $circleElement.style.transform =
            `translate(${circle.x}px, ${circle.y}px)`;
        window.requestAnimationFrame(tick);
    }

    tick();

    // Image click "enlarger"
    const $slideshowImage = document.getElementById("image");
    const $slideshowCaption = document.getElementById("caption");
    const $slideshowIntro = document.querySelector("#slideshow p:first-child");

    if ($slideshowImage && $slideshowCaption && $slideshowIntro) {
        $slideshowImage.addEventListener("click", function () {
            this.classList.toggle("enlarged");
            $slideshowCaption.classList.toggle("enlarged");
            $slideshowIntro.classList.toggle("enlarged");
        });

        // Image click "shrinkisizer"
        document.addEventListener("click", function (e) {
            if (e.target !== $slideshowImage && $slideshowImage.classList.contains("enlarged")) {
                $slideshowImage.classList.remove("enlarged");
                $slideshowCaption.classList.remove("enlarged");
                $slideshowIntro.classList.remove("enlarged");
            }
        });
    }

    function isMobile() {
        return window.innerWidth <= 800;
    }



    // Click-me text "show-or-not"
    const $clickMeImage = document.getElementById("image");
    const $clickMe = document.getElementById("click-me");

    if ($clickMeImage && $clickMe) {
        $clickMe.style.display = "none";
        $clickMe.style.position = "absolute";
        $clickMe.style.right = "-200px";
        $clickMe.style.top = "50%";
        $clickMe.style.transform = "translateY(-50%)";
        $clickMe.style.backgroundColor = "#000000cc";
        $clickMe.style.color = "white";
        $clickMe.style.padding = "8px 12px";
        $clickMe.style.borderRadius = "8px";
        $clickMe.style.fontSize = "20px";
        $clickMe.style.whiteSpace = "nowrap";
        $clickMe.style.zIndex = "10";
        $clickMe.style.transition = "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        $clickMe.style.opacity = "0";

        function showClickMe() {
            $clickMe.style.display = "block";
            $clickMe.style.transform = "translateY(-50%) translateX(100px) scale(0.5)";
            $clickMe.style.opacity = "0";
            
            setTimeout(() => {
                $clickMe.style.transform = "translateY(-50%) translateX(0) scale(1)";
                $clickMe.style.opacity = "1";
                
                setTimeout(() => {
                    $clickMe.style.animation = "clickMePulse 2s ease-in-out infinite";
                }, 600);
            }, 10);
        }

        function hideClickMe() {
            $clickMe.style.animation = "clickMeSlideOut 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
            
            setTimeout(() => {
                $clickMe.style.display = "none";
                $clickMe.style.animation = "";
                $clickMe.style.transform = "translateY(-50%) translateX(0) scale(1)";
                $clickMe.style.opacity = "1";
            }, 500);
        }

        if (!isMobile()) {
            $clickMeImage.addEventListener("mouseenter", showClickMe);
            $clickMeImage.addEventListener("mouseleave", hideClickMe);
        }

        window.addEventListener("resize", () => {
            if (isMobile()) {
                $clickMe.style.display = "none";
            }
        });
    }








    // Slideshow
    const slides = [
        { img: "/images/jamie/jamie1.png", caption: "I am getting myself a sports car to drive around New York" },
        { img: "/images/jamie/jamie2.png", caption: "I will inspire millions of people, listening to every word of mine" },
        { img: "/images/jamie/jamie3.png", caption: "I will spend alot of time and money adventuring the world" }
    ];

    let currentIndex = 0;
    const $imgEl = document.getElementById("image");
    const $captionEl = document.getElementById("caption");

    function updateSlideshow() {
        $imgEl.src = slides[currentIndex].img;
        $captionEl.textContent = slides[currentIndex].caption;
    }



    updateSlideshow();


    document.getElementById("next").addEventListener("click", (e) => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlideshow();
        e.target.blur();
    });

    document.getElementById("previous").addEventListener("click", (e) => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlideshow();
        e.target.blur();
    });




    // Project showcase
    let projects = [];
    let filterLetter = "";
    let filterName = "";

    const $filterLetterSelect = document.getElementById("filterLetter");
    const $filterNameInput = document.getElementById("filterName");
    const $projectContainer = document.getElementById("project-container");
    const $projectCountDisplay = document.getElementById("project-count-display");

    function getFilteredProjects() {
        let filtered = projects;

        if (!filterLetter && !filterName) {
            return [];
        }

        if (filterLetter && !filterName) {
            filtered = filtered.filter(p => {
                if (!p.name) return false;
                return p.name[0] && p.name[0].toUpperCase() === filterLetter;
            });
        }

        if (filterName && !filterLetter) {
            const search = filterName.trim().toLowerCase();
            filtered = filtered.filter(p => {
                const name = p.name ? p.name.toLowerCase() : '';
                return name.includes(search);
            });
        }

        return filtered;
    }

    function getAvailableLetters() {
        const arr = projects
            .map(p => {
                if (!p.name) return '';
                return p.name[0] ? p.name[0].toUpperCase() : '';
            })
            .filter(l => l);
        const unique = Array.from(new Set(arr));
        return unique.sort((a, b) => a.localeCompare(b));
    }

    function updateLetterOptions() {
        const letters = getAvailableLetters();
        $filterLetterSelect.innerHTML = '<option value="">All</option>';

        letters.forEach(letter => {
            const option = document.createElement('option');
            option.value = letter;
            option.textContent = letter;
            $filterLetterSelect.appendChild(option);
        });
    }

    function updateProjectCount() {
        if (projects.length > 0) {
            const projectNames = projects.map(p => p.name).join(', ');
            $projectCountDisplay.innerHTML = `<strong>Available projects (${projects.length}):</strong> <span>${projectNames}</span>`;
        } else {
            $projectCountDisplay.textContent = 'No projects available.';
        }
    }

    function renderProjects() {
        const filteredProjects = getFilteredProjects();

        $projectContainer.innerHTML = '';
        $projectContainer.className = filteredProjects.length > 1 ? 'project-row row-layout' : 'project-row';

        filteredProjects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project';

            projectDiv.innerHTML = `
            <p>Project: ${project.name}</p>
            <img src="${project.image}" alt="${project.name}">
            <p>${project.description}</p>
        `;

            $projectContainer.appendChild(projectDiv);
        });
    }

    function handleLetterFilterChange() {
        filterLetter = $filterLetterSelect.value;
        if (filterLetter) {
            filterName = "";
            $filterNameInput.value = "";
        }
        renderProjects();
    }

    function handleNameFilterChange() {
        filterName = $filterNameInput.value;
        if (filterName.trim()) {
            filterLetter = "";
            $filterLetterSelect.value = "";
        }
        renderProjects();
    }

    if ($filterLetterSelect && $filterNameInput) {
        $filterLetterSelect.addEventListener('change', handleLetterFilterChange);
        $filterNameInput.addEventListener('input', handleNameFilterChange);

        axios.get("/json/jamie.json").then((response) => {
            projects = response.data;
            updateLetterOptions();
            updateProjectCount();
            renderProjects();
        });
    }

    const $sortAZBtn = document.getElementById("sort-az");
    const $sortZABtn = document.getElementById("sort-za");

    function sortProjectsAZ() {
        if (projects.length === 0) return;

        filterLetter = "";
        filterName = "";
        $filterLetterSelect.value = "";
        $filterNameInput.value = "";

        const sortedProjects = [...projects].sort((a, b) => a.name.localeCompare(b.name));

        $projectContainer.innerHTML = '';
        $projectContainer.className = sortedProjects.length > 1 ? 'project-row row-layout' : 'project-row';

        sortedProjects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project';
            projectDiv.innerHTML = `
            <p>Project: ${project.name}</p>
            <img src="${project.image}" alt="${project.name}">
            <p>${project.description}</p>
        `;
            $projectContainer.appendChild(projectDiv);
        });
    }

    function sortProjectsZA() {
        if (projects.length === 0) return;

        filterLetter = "";
        filterName = "";
        $filterLetterSelect.value = "";
        $filterNameInput.value = "";

        const sortedProjects = [...projects].sort((a, b) => b.name.localeCompare(a.name));

        $projectContainer.innerHTML = '';
        $projectContainer.className = sortedProjects.length > 1 ? 'project-row row-layout' : 'project-row';

        sortedProjects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project';
            projectDiv.innerHTML = `
            <p>Project: ${project.name}</p>
            <img src="${project.image}" alt="${project.name}">
            <p>${project.description}</p>
        `;
            $projectContainer.appendChild(projectDiv);
        });
    }

    if ($sortAZBtn && $sortZABtn) {
        $sortAZBtn.addEventListener('click', (e) => {
            sortProjectsAZ();
            e.target.blur();
        });

        $sortZABtn.addEventListener('click', (e) => {
            sortProjectsZA();
            e.target.blur();
        });
    }

});