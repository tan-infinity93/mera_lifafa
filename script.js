
window.onload = function() {
    const myModal = document.getElementById('welcomeModal');
    const bootstrapModal = new bootstrap.Modal(myModal);
    // bootstrapModal.show();
};

function closeModal() {
    const myModal = document.getElementById('welcomeModalBtn');
    // myModal.style.display = 'none';
    myModal.click();
}

// Call closeModal after 5 seconds (5000 milliseconds)
setTimeout(closeModal, 5000);

document.addEventListener("DOMContentLoaded", function () {
// Track clicks on draggable elements
document.querySelectorAll(".design-item").forEach(function (item) {
  item.addEventListener("click", function () {
    let type = item.getAttribute("data-type") || "unknown";
    let label = item.innerText.trim();
    gtag("event", "design_item_click", {
      event_category: "engagement",
      event_label: label,
      item_type: type
    });
  });
});

// Track clicks on all buttons
document.querySelectorAll("button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    let label = btn.innerText.trim() || btn.id || "unnamed_button";
    gtag("event", "button_click", {
      event_category: "engagement",
      event_label: label
    });
  });
});
});



let selectedElement = null;
let elementCounter = 0;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };

// Initialize drag and drop
document.addEventListener('DOMContentLoaded', function() {
    initializeDragAndDrop();
    initializeControls();
    initializeTheme();
});

function initializeTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark';
    }
}

function initializeDragAndDrop() {
    const designItems = document.querySelectorAll('.design-item');
    const canvas = document.getElementById('envelopeCanvas');

    designItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        item.setAttribute('draggable', true);
    });

    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', '');
    e.dataTransfer.effectAllowed = 'copy';
    this.style.opacity = '0.5';
}

function handleDragEnd(e) {
    this.style.opacity = '1';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function handleDrop(e) {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const draggedElement = document.querySelector('.design-item[style*="opacity: 0.5"]');
    if (draggedElement) {
        createElement(draggedElement, x, y);
        draggedElement.style.opacity = '1';
    }
}

function createElement(sourceElement, x, y) {
    const canvas = document.getElementById('envelopeCanvas');
    const elementId = `element_${++elementCounter}`;
    let element;

    const type = sourceElement.dataset.type;
    
    if (type === 'text') {
        element = document.createElement('div');
        element.className = 'envelope-element text-element';
        element.textContent = sourceElement.dataset.content;
        element.style.fontSize = '16px';
        element.style.fontFamily = 'Arial';
    } 
    else if (type === 'shape') {
        element = document.createElement('div');
        element.className = 'envelope-element shape-element';
        const shape = sourceElement.dataset.shape;
        element.style.width = '50px';
        element.style.height = '50px';
        
        if (shape === 'square') {
            element.style.borderRadius = '0';
        } 
        else if (shape === 'heart') {
            element.innerHTML = '❤️';
            element.style.fontSize = '30px';
            element.style.background = 'transparent';
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
        } 
        else if (shape === 'star') {
            element.innerHTML = '⭐';
            element.style.fontSize = '30px';
            element.style.background = 'transparent';
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
        }
    } 
    else if (type === 'pattern') {
        element = document.createElement('div');
        element.className = 'envelope-element pattern-element';
        element.style.width = '100px';
        element.style.height = '100px';
        
        const pattern = sourceElement.dataset.pattern;
        if (pattern === 'floral') {
            element.innerHTML = '🌸';
            element.style.fontSize = '100px';
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
        } 
        else if (pattern === 'geometric') {
            element.style.background = 'repeating-linear-gradient(45deg, #667eea 0px, #667eea 10px, #764ba2 10px, #764ba2 20px)';
            element.style.fontSize = '100px';
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
        } 
        else if (pattern === 'compass-star') {
            element.style.background = '#f4f1de';
            element.style.border = '3px double #8b4513';
            // element.innerHTML = '<div style="padding: 5px; text-align: center; font-size: 12px;">✦ ✧ ✦</div>';
            // element.innerHTML = '✦ ✧ ✦';
            element.innerHTML = '✦';
            element.style.fontSize = '100px';
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
        } 
        else if (pattern === 'snowflake') {
            element.innerHTML = '❄';
            element.style.fontSize = '100px';
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
        }
        else if (pattern === 'ganesha') {
            let ganeshaArt = `
                            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠟⢁⣤⡙⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡏⠀⡾⣻⢿⣦⠘⣿⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⡁⢸⣇⠿⡇⣿⢀⡼⢸⣿⣿⣦⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠿⠛⠿⣧⣀⣛⣷⣧⣷⣚⣥⠞⣹⡿⠿⠿⢿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⣼⠁⠀⣠⣶⠿⠛⢛⣛⣋⣭⣭⣴⠿⢫⡷⣦⡀⠈⠻⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠘⡿⠿⠿⣷⣄⡀⠀⣿⣤⡾⣫⣶⡿⠿⠿⠟⠛⠉⠉⠀⠙⢿⣧⡙⣷⡀⢀⣿⡇⠀⣀⣤⣶⣶⣶⣶⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⡿⠿⣿⣶⣍⠳⣄⢻⣿⢞⡵⠀⠀⠀⢠⠀⠀⣤⠀⠀⣀⠀⠙⢷⣜⣿⣛⡽⣡⡾⣟⣋⣭⣭⣿⠃⠀⠀⠀⠀⠀⠀
            ⢠⣴⡤⡄⠀⠀⠀⡇⠀⠀⠈⠙⢧⠙⣿⣷⠏⠀⠀⠀⢠⣫⣓⡦⣤⣴⣺⢞⡇⠀⠀⠉⢻⣿⣱⣿⠾⠛⠉⠈⢩⡏⠀⠀⠀⢀⡀⣀⠀
            ⠸⢯⣿⠿⢷⣄⠀⢿⠀⠀⠀⠀⠘⣧⠸⣿⠀⠀⠀⢀⠀⠙⠛⠿⠽⠟⠓⣉⣠⣄⣀⠀⢸⣿⠿⠋⠀⠀⠀⠀⣾⠀⢀⠴⠚⣯⡟⡿⠀
            ⠀⠸⣿⡀⣷⡹⣇⠸⣧⡀⠀⠀⠀⠘⠂⣿⠀⠒⠉⣩⡛⠳⣶⠀⠀⢰⣾⣋⣩⣄⣉⡅⢻⣿⠀⠀⠀⠀⢀⣼⠇⣰⠉⠀⠀⣿⣧⣷⡆
            ⠀⠀⠈⠳⣝⢧⢻⠀⢹⡇⠀⠀⠀⠀⢀⣿⠀⠈⢿⣻⢿⣿⡆⠀⠀⠀⠸⣿⣿⡿⠋⠀⢸⣿⠀⠀⠀⠰⣿⠋⠀⣯⠀⢀⡼⠟⣩⡟⠀
            ⠀⠀⠀⣀⡈⢯⢹⠀⠘⣿⡀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠉⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⢸⡿⠀⠀⠀⠀⣿⠀⠀⣿⠞⠛⠛⠛⠉⠀⠀
            ⠀⠀⢰⣏⠙⠿⣿⣦⡀⢻⣧⠀⠀⠀⣸⣿⣇⠀⠀⠀⠀⠀⠀⠀⠛⠃⠀⠀⠀⠀⠀⢀⣿⠃⠀⠀⠀⢰⣿⠀⣀⣽⠶⢾⣷⣀⠀⠀⠀
            ⠀⢠⡿⠻⣷⡤⠀⠉⠻⣦⡟⠷⣤⣶⠏⢘⣿⣆⠀⠀⠀⠀⠀⠀⣿⡆⠀⠀⠀⠀⢠⡿⠛⣧⡀⢀⣴⣿⣿⡾⠋⢀⣠⡞⠋⢻⣷⡀⠀
            ⠀⣿⠀⠀⢿⣇⠀⠀⠀⢸⣷⡶⠛⢁⣴⠟⠙⡿⣿⣦⠀⠀⠀⠀⣿⡇⠀⠀⠀⢠⢿⣶⢶⣿⠛⢿⣿⠋⢽⡇⠀⠀⠙⣿⠀⠀⣿⡇⠀
            ⠀⢿⣧⣠⡴⢿⣅⠀⠀⣸⡟⠀⠀⣾⡇⠀⠀⣿⣷⢿⣧⠀⠀⠀⠸⣧⡀⠀⠀⣿⡜⢿⣦⣙⣷⡄⢻⣷⠘⡇⠀⠀⠴⠏⠀⢠⡿⠀⠀
            ⠀⠘⣿⠏⠀⠀⠹⣷⣜⠋⡀⠀⠀⣿⣧⣀⠀⠀⠀⠈⣿⡆⠀⠀⠀⢻⣧⠀⠀⠹⣿⣤⣀⣉⣁⣀⣬⡿⠷⢶⣶⣤⣀⢀⡴⢿⣿⡆⠀
            ⠀⢰⡟⠀⠀⠀⢀⣿⣿⢿⣧⠀⢀⣼⠟⠁⠀⠀⠀⠀⠸⣿⡀⠀⠀⠀⠙⢷⣄⡀⠈⠛⠛⠛⢛⣉⣤⠤⠀⢀⠀⠙⣿⣧⣀⣼⠟⠀⠀
            ⠀⢸⣇⢠⡴⠚⢛⣽⡇⠸⣿⠀⣼⠁⠀⠀⠀⠀⠀⠀⠀⠹⣿⣄⠀⠀⠀⠀⠈⠙⠓⠒⠒⠛⠉⠁⢀⣴⠟⠛⢷⣆⠈⣿⠉⠀⠀⠀⠀
            ⠀⠘⣿⡏⠀⣴⠟⠋⠁⢀⣿⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⣰⠏⣿⣷⣤⣀⠀⠀⠀⠀⠀⠀⣀⣤⡴⣿⣿⣄⠀⠘⢋⣼⣧⣄⠀⠀⠀⠀
            ⠀⠀⢹⡇⢸⠿⠂⠀⠀⣸⡟⢸⡇⠀⠀⠀⠀⠀⠀⣠⠞⠁⣴⠃⠈⠙⠛⠿⠿⠶⠾⠟⠛⠉⠁⢸⣿⡈⣛⣿⡟⠋⠉⠉⠛⣧⣀⣀⡀
            ⠀⠀⢘⣿⣦⣀⡀⣀⡴⣿⣷⣌⣿⣦⣄⣀⣤⠴⠛⠁⣠⡞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡿⢹⣿⠛⠛⠛⠻⠟⠛⠋⢁⡼⠃
            ⠀⢠⡿⠋⠙⠛⠛⠉⠀⠀⠙⠿⣿⣿⣭⣉⣀⣠⣴⠞⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡟⠁⠘⢿⣦⡀⠀⠀⠀⠀⣰⠟⠁⠀
            ⠀⣾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢿⣭⡉⠉⠀⠀⠀⠀⠀⠀⣴⠆⠀⠀⠀⠀⠀⢀⣤⣾⡏⠀⠀⠀⠀⠙⠻⢶⣶⣶⠛⠁⠀⠀⠀
            ⠀⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣷⣤⣀⠀⠀⠀⠀⠀⠀⢀⣀⣠⡴⢞⣫⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀
            ⠀⠸⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣙⠻⢿⣿⣿⣭⣭⣭⣭⡷⠾⣟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡟⠀⠀⠀⠀⠀
            ⠀⠀⠻⣿⣦⡀⠀⣀⠀⠀⠀⠀⠀⠀⢀⣀⢾⣎⠽⠚⢉⣠⡤⠬⠿⠿⣿⣿⣦⣛⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⡿⠁⠀⠀⠀⠀⠀
            ⠀⠀⠀⠈⠛⠻⣶⣭⣓⣶⣴⢰⣖⣻⣮⠽⠛⢁⣤⠶⠋⠁⠀⠀⣤⣀⣸⡏⠙⢿⣵⠶⣀⡀⠀⠀⠀⣀⡴⣤⡾⠋⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠹⣯⣛⠛⠛⠛⠛⢉⣡⣤⣾⡟⠁⠀⠀⠀⠀⢀⣿⠛⢿⣿⣦⣀⠙⠳⣯⣑⣓⣾⣞⣯⣿⡿⢤⡴⠒⢢⣄⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠿⠿⠛⠛⠉⠁⠙⢿⣶⣤⣄⣠⣴⣾⣏⣀⣀⣹⠟⠻⠿⠷⠶⠶⠟⠋⢉⣴⣏⢽⣾⢶⠂⠂⢸⣄⡤⣤⡀
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠛⠋⠉⠛⠛⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠉⠉⠉⠋⠙⢛⣁⣀⣀⠼⠇
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠒⠒⠚⠋⠀⠀⠀⠀⠀
            `;
            element.innerHTML = ganeshaArt;
            element.style.fontSize = '5px';
            
            element.style.lineHeight = "0.9";  // remove extra spacing
            element.style.overflow = "auto"; // allow scroll if too big

            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
        }
    }
    else if (type === 'floral-pattern') {
        element = document.createElement('div');
        element.className = 'envelope-element pattern-element';
        element.style.width = '100px';
        element.style.height = '100px';

        const pattern = sourceElement.dataset.pattern;
        if (pattern === 'floral') {
            element.innerHTML = '🌸';
            element.style.fontSize = '100px';
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
        } 
        else if (pattern === 'sunflower') {
            element.style.background = 'transparent';
            element.style.backgroundImage = "url('/images/ganesha_art/noun-sunflower-7988813.svg')";
            element.style.backgroundSize = "cover";
            element.style.backgroundPosition = "center";
            // element.style.color = 'black';
            // element.style.filter = "invert(0%) sepia(100%) saturate(5000%) hue-rotate(0deg)";
        }
        else if (pattern === 'lotus') {
            element.style.backgroundImage = "url('/images/ganesha_art/noun-lotus-4374508.svg')";
            element.style.backgroundSize = "cover";
            element.style.backgroundPosition = "center";
        }
    }
    else if (type === 'ganesha-art') {
        element = document.createElement('div');
        element.className = 'envelope-element pattern-element';
        element.style.width = '100px';
        element.style.height = '100px';

        const pattern = sourceElement.dataset.pattern;
        console.log('line 257');
        if (pattern == 'ganesha-mukha') {
            element.style.backgroundImage = "url('/images/ganesha_art/noun-ganesh-7298203.svg')";
            element.style.backgroundSize = "cover";
            element.style.backgroundPosition = "center";
        }
        else if (pattern == 'ganesha-mukha2') {
            element.style.backgroundImage = "url('/images/ganesha_art/noun-ganesha-111504.svg')";
            element.style.backgroundSize = "cover";
            element.style.backgroundPosition = "center";
        }
        else if (pattern == 'ganesha-modak') {
            element.style.backgroundImage = "url('/images/ganesha_art/noun-modak-4932207.svg')";
            element.style.backgroundSize = "cover";
            element.style.backgroundPosition = "center";
        }
        else if (pattern == 'spiral-shell') {
            element.innerHTML = '🐚';
            element.style.fontSize = '200px';
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
        }
    }

    element.id = elementId;
    element.style.left = Math.max(0, Math.min(x - 25, canvas.clientWidth - 100)) + 'px';
    element.style.top = Math.max(0, Math.min(y - 25, canvas.clientHeight - 50)) + 'px';
    
    element.addEventListener('click', selectElement);
    element.addEventListener('mousedown', startDrag);
    
    canvas.appendChild(element);
    selectElement({ target: element });
}

let targetElement = null;
let menu = document.getElementById('customMenu');

function addContextMenu(e) {
    // let targetElement = null;
    // const menu = document.getElementById('customMenu');

    document.addEventListener('contextmenu', function(e) {
      if (e.target.classList.contains('envelope-element')) {
        e.preventDefault();
        targetElement = e.target;
        menu.style.top = e.pageY + 'px';
        menu.style.left = e.pageX + 'px';
        menu.style.display = 'block';
      } 
      else {
        menu.style.display = 'none';
      }
    });
}

// Create Sexy Context Menu:
addContextMenu();

let removeBtn = document.getElementById('removeBtn');

function removeElement() {

    removeBtn.addEventListener('click', function() {
      if (targetElement) {
        // alert('removing targetElement');
        targetElement.remove();
        selectedElement = null;
        menu.style.display = 'none';
      }
    });
}

removeElement();

function hideContextMenu() {
    document.addEventListener('click', function() {
      menu.style.display = 'none';
    });
}

function selectElement(e) {
    if (selectedElement) {
        selectedElement.classList.remove('selected');
    }
    selectedElement = e.target;
    selectedElement.classList.add('selected');
    updateControls();
}

function startDrag(e) {
    if (e.target !== selectedElement) return;
    
    isDragging = true;
    const rect = selectedElement.getBoundingClientRect();
    const canvasRect = document.getElementById('envelopeCanvas').getBoundingClientRect();
    
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    
    e.preventDefault();
}

function drag(e) {
    if (!isDragging || !selectedElement) return;
    
    const canvas = document.getElementById('envelopeCanvas');
    const canvasRect = canvas.getBoundingClientRect();
    
    let x = e.clientX - canvasRect.left - dragOffset.x;
    let y = e.clientY - canvasRect.top - dragOffset.y;
    
    x = Math.max(0, Math.min(x, canvas.clientWidth - selectedElement.offsetWidth));
    y = Math.max(0, Math.min(y, canvas.clientHeight - selectedElement.offsetHeight));
    
    selectedElement.style.left = x + 'px';
    selectedElement.style.top = y + 'px';
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

function initializeControls() {
    const fontSizeRange = document.getElementById('fontSizeRange');
    const elementSizeRange = document.getElementById('elementSizeRange');
    const rotationRange = document.getElementById('rotationRange');
    const opacityRange = document.getElementById('opacityRange');
    const textEditor = document.getElementById('textEditor');
    const fontFamily = document.getElementById('fontFamily');

    fontSizeRange.addEventListener('input', updateFontSize);
    elementSizeRange.addEventListener('input', updateElementSize);
    rotationRange.addEventListener('input', updateRotation);
    opacityRange.addEventListener('input', updateOpacity);
    textEditor.addEventListener('input', updateText);
    fontFamily.addEventListener('change', updateFontFamily);

    // Color picker functionality
    document.querySelectorAll('.color-picker').forEach(picker => {
        picker.addEventListener('click', function() {
            if (selectedElement) {
                const color = this.dataset.color;
                if (selectedElement.classList.contains('text-element')) {
                    selectedElement.style.color = color;
                } else {
                    selectedElement.style.backgroundColor = color;
                }
            }
        });
    });
}

function updateControls() {
    if (!selectedElement) return;

    const textEditor = document.getElementById('textEditor');
    if (selectedElement.classList.contains('text-element')) {
        textEditor.value = selectedElement.textContent;
        textEditor.style.display = 'block';
    } else {
        textEditor.style.display = 'none';
    }
}

function updateFontSize() {
    const size = this.value;
    this.nextElementSibling.textContent = size + 'px';
    if (selectedElement && selectedElement.classList.contains('text-element')) {
        selectedElement.style.fontSize = size + 'px';
    }
}

function updateElementSize() {
    const size = this.value;
    this.nextElementSibling.textContent = size + 'px';
    if (selectedElement) {
        if (selectedElement.classList.contains('shape-element') || selectedElement.classList.contains('pattern-element')) {
            selectedElement.style.width = size + 'px';
            selectedElement.style.height = size + 'px';
        }
    }
}

function updateRotation() {
    const rotation = this.value;
    this.nextElementSibling.textContent = rotation + '°';
    if (selectedElement) {
        selectedElement.style.transform = `rotate(${rotation}deg)`;
    }
}

function updateOpacity() {
    const opacity = this.value;
    this.nextElementSibling.textContent = Math.round(opacity * 100) + '%';
    if (selectedElement) {
        selectedElement.style.opacity = opacity;
    }
}

function updateText() {
    if (selectedElement && selectedElement.classList.contains('text-element')) {
        selectedElement.textContent = this.value;
    }
}

function updateFontFamily() {
    if (selectedElement && selectedElement.classList.contains('text-element')) {
        selectedElement.style.fontFamily = this.value;
    }
}

function clearCanvas() {
    const canvas = document.getElementById('envelopeCanvas');
    const elements = canvas.querySelectorAll('.envelope-element');
    elements.forEach(element => element.remove());
    selectedElement = null;
}

function exportDesign() {
    const canvas = document.getElementById('envelopeCanvas');
    
    // Hide selection borders temporarily
    const selected = canvas.querySelector('.selected');
    if (selected) {
        selected.classList.remove('selected');
    }
    
    html2canvas(canvas, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
    }).then(canvasElement => {
        // Restore selection
        if (selected) {
            selected.classList.add('selected');
        }
        
        // Create download link
        const link = document.createElement('a');
        link.download = 'custom-envelope-design.png';
        link.href = canvasElement.toDataURL();
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        const toast = document.createElement('div');
        toast.className = 'toast show position-fixed top-0 end-0 m-3';
        toast.innerHTML = `
            <div class="toast-header bg-success text-white">
                <i class="fas fa-check-circle me-2"></i>
                <strong>Success!</strong>
            </div>
            <div class="toast-body">
                Your envelope design has been exported successfully!
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    });
}

function printDesign() {
    const canvas = document.getElementById('envelopeCanvas');

    // Hide selection borders temporarily
    const selected = canvas.querySelector('.selected');
    if (selected) selected.classList.remove('selected');

    html2canvas(canvas, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
    }).then(canvasElement => {
        if (selected) selected.classList.add('selected');

        const dataUrl = canvasElement.toDataURL();

        // Create hidden iframe
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(`
            <html>
            <head>
                <title>Print Envelope</title>
                <style>
                    body {
                        margin: 0;
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                        height: 100vh;
                    }
                    img {
                        margin-top: 20px;
                        max-width: 100%;
                        height: auto;
                    }
                </style>
            </head>
            <body>
                <img src="${dataUrl}" />
            </body>
            </html>
        `);
        doc.close();

        // Print the iframe content
        iframe.contentWindow.focus();
        iframe.contentWindow.print();

        // Remove iframe after printing
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    });
}



// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Delete' && selectedElement) {
        selectedElement.remove();
        selectedElement = null;
    }
    
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        exportDesign();
    }
    
    if (e.ctrlKey && e.key === 'c' && selectedElement) {
        e.preventDefault();
        clearCanvas();
    }
});

document.getElementById("give-feedback").addEventListener("click", function (event) {
  
  event.preventDefault();

  let link = "https://forms.gle/EkcfLnTTXUfxAP1q7";
  document.getElementById("linkFrame").src = link;

  // Show the modal (Bootstrap 5)
  let myModal = new bootstrap.Modal(document.getElementById("linkModal"));
  myModal.show();
});

function showfeedbackModal() {
    const helpModal = new bootstrap.Modal(document.getElementById('linkModal'));
    
    let link = "https://forms.gle/EkcfLnTTXUfxAP1q7";
    document.getElementById("linkFrame").src = link;
    helpModal.show();
}

function showHelpModal() {
    const helpModal = new bootstrap.Modal(document.getElementById('helpModal'));
    
    let link = 'https://youtube.com/embed/58VpB21BP7s?si=KjCcGUWPD8WXUpKI'
    document.getElementById("helpFrame").src = link;
    helpModal.show();
}




