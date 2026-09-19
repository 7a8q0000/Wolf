
document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  const welcomeMessage = document.getElementById('welcomeMessage');
  const mainWebsite = document.getElementById('mainWebsite');
  const loadingFill = document.getElementById('loadingFill');
  const loadingPercentage = document.getElementById('loadingPercentage');

  
  let progress = 0;
  const totalDuration = 2000; 
  const updateInterval = 20; 
  const steps = totalDuration / updateInterval;
  const progressPerStep = 100 / steps;

  
  function fastLoading() {
    const interval = setInterval(() => {
      progress += progressPerStep;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        
        setTimeout(() => {
          loadingFill.style.width = '100%';
          loadingPercentage.textContent = '100%';
          
          setTimeout(() => {
            
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
              loadingScreen.style.display = 'none';
              
              
              welcomeMessage.classList.remove('hidden');
              welcomeMessage.style.opacity = '1';
              
              setTimeout(() => {
                
                welcomeMessage.style.opacity = '0';
                setTimeout(() => {
                  welcomeMessage.classList.add('hidden');
                  mainWebsite.classList.remove('hidden');
                  mainWebsite.style.opacity = '1';
                  
                  
                  initializeButtons();
                
                  animateStats();
                }, 300);
              }, 3000); 
            }, 300);
          }, 200);
        }, 100);
      } else {
        loadingFill.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
      }
    }, updateInterval);
  }

 
  fastLoading();

  
  function initializeButtons() {

    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        const sectionId = button.getAttribute('data-section');
        
        
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        
        contentSections.forEach(section => {
          section.classList.add('hidden');
          section.style.display = 'none';
        });
        
        
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
          selectedSection.classList.remove('hidden');
          selectedSection.style.display = 'block';
        }
      });
    });

    
    const ruleButtons = document.querySelectorAll('.rule-btn');
    const ruleBoxes = document.querySelectorAll('.rule-box');

    ruleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const ruleId = button.getAttribute('data-rule');
        
        
        ruleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
       
        ruleBoxes.forEach(box => {
          box.classList.add('hidden');
          box.style.display = 'none';
        });
        
        
        const selectedRule = document.getElementById(ruleId);
        if (selectedRule) {
          selectedRule.classList.remove('hidden');
          selectedRule.style.display = 'block';
        }
      });
    });

    
    const joinButtons = document.querySelectorAll('.join-btn');
    joinButtons.forEach(button => {
      button.addEventListener('click', () => {
        const link = button.getAttribute('data-link');
        if (link) {
          window.open(link, '_blank');
        }
      });
    });

    
    const defaultNav = document.querySelector('.nav-btn[data-section="definition"]');
    if (defaultNav) {
      defaultNav.click();
    }
    
    initClickDots();
  } 
  
  function animateStats() {
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      let count = 0;
      const increment = Math.ceil(target / 100);
      const update = () => {
        count += increment;
        if (count >= target) {
          el.textContent = '+' + target;
        } else {
          el.textContent = '+' + count;
          requestAnimationFrame(update);
        }
      };
      update();
    });
  }

  const imagesToPreload = [
    'https://i.postimg.cc/RCkfnqHM/wolf.png',
    'https://i.postimg.cc/jq4KyFWd/cf1b381da6fd1931433cbf97d6e0e754.png',
    'https://i.postimg.cc/VsW1XVS6/f0bded3384116b596e8b41fa209ca034.png',
    'https://i.postimg.cc/NGkYRzy0/29d117d779afa0d29c1f6a10ababa71f.png'
  ];


  function initClickDots() {
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('button');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const dot = document.createElement('span');
      dot.className = 'click-dot';
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
      btn.appendChild(dot);
      setTimeout(() => dot.remove(), 600);
    });
  }

  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
});