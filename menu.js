// Menu System
class MenuSystem {
  constructor() {
    this.visible = false;
    this.currentCategory = 1;
    this.currentTab = 0;
    this.currentItem = 0;
    this.selectedTheme = 'purple';
    this.isLoading = true;
    this.loadingProgress = 0;
    this.selectedKey = '1';
    this.itemsPerPage = 9;
    this.scrollOffset = 0;
    
    this.categories = [
      {
        name: 'Gameplay',
        tabs: [
          {
            name: 'Combat',
            items: [
              { name: 'God Mode', type: 'toggle', value: false },
              { name: 'One Hit Kill', type: 'toggle', value: false },
              { name: 'Damage Multiplier', type: 'slider', value: 1, min: 0.5, max: 5 },
              { name: 'Weapon Type', type: 'selector', options: ['Default', 'Melee', 'Ranged'], selected: 0 },
            ]
          },
          {
            name: 'Player',
            items: [
              { name: 'Speed Boost', type: 'toggle', value: false },
              { name: 'Movement Speed', type: 'slider', value: 1, min: 0.5, max: 3 },
              { name: 'Jump Height', type: 'slider', value: 1, min: 0.5, max: 5 },
            ]
          }
        ]
      },
      {
        name: 'Visual',
        tabs: [
          {
            name: 'Effects',
            items: [
              { name: 'Neon Mode', type: 'toggle', value: false },
              { name: 'Glow Intensity', type: 'slider', value: 50, min: 0, max: 100 },
              { name: 'Weather', type: 'selector', options: ['Clear', 'Rain', 'Snow'], selected: 0 },
            ]
          },
          {
            name: 'Particles',
            items: [
              { name: 'Particle Effects', type: 'toggle', value: true },
              { name: 'Particle Count', type: 'slider', value: 50, min: 0, max: 100 },
            ]
          }
        ]
      },
      {
        name: 'Settings',
        tabs: [
          {
            name: 'Menu',
            items: [
              { name: 'Menu Theme', type: 'selector', options: ['Purple', 'Red', 'Blue', 'Green'], selected: 0 },
              { name: 'Menu Scale', type: 'slider', value: 100, min: 50, max: 150 },
              { name: 'Smooth Animation', type: 'toggle', value: true },
            ]
          }
        ]
      }
    ];
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.startLoadingAnimation();
    this.renderMenu();
  }
  
  setupEventListeners() {
    document.getElementById('toggleBtn').addEventListener('click', () => this.toggleMenu());
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }
  
  toggleMenu() {
    this.visible = !this.visible;
    const menu = document.getElementById('menu');
    if (this.visible) {
      menu.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
    }
  }
  
  startLoadingAnimation() {
    const duration = 3000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      this.loadingProgress = Math.min(100, (elapsed / duration) * 100);
      
      document.querySelector('.loading-percent').textContent = Math.floor(this.loadingProgress) + '%';
      
      if (this.loadingProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          document.getElementById('loadingOverlay').classList.add('hidden');
          this.visible = true;
          document.getElementById('menu').classList.remove('hidden');
        }, 500);
      }
    };
    
    animate();
  }
  
  renderMenu() {
    this.renderHeader();
    this.renderTabs();
    this.renderItems();
    this.renderFooter();
  }
  
  renderHeader() {
    const banner = document.getElementById('banner');
    banner.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 100"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%239400d3;stop-opacity:1" /><stop offset="100%" style="stop-color:%237a0099;stop-opacity:1" /></linearGradient></defs><rect width="360" height="100" fill="url(%23grad)"/><text x="180" y="65" font-size="48" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">P</text></svg>')`;
  }
  
  renderTabs() {
    const tabsContainer = document.getElementById('topTabs');
    tabsContainer.innerHTML = '';
    
    this.categories.forEach((cat, idx) => {
      const tab = document.createElement('div');
      tab.className = `top-tab ${idx === this.currentCategory ? 'active' : ''}`;
      tab.textContent = cat.name;
      tab.addEventListener('click', () => this.selectCategory(idx));
      tabsContainer.appendChild(tab);
    });
    
    const category = this.categories[this.currentCategory];
    if (category) {
      const tabsSection = document.getElementById('tabsSection');
      tabsSection.innerHTML = '';
      
      category.tabs.forEach((tab, idx) => {
        const tabEl = document.createElement('button');
        tabEl.className = `tab-item ${idx === this.currentTab ? 'active' : ''}`;
        tabEl.textContent = tab.name;
        tabEl.addEventListener('click', () => this.selectTab(idx));
        tabsSection.appendChild(tabEl);
      });
    }
  }
  
  renderItems() {
    const itemsSection = document.getElementById('itemsSection');
    itemsSection.innerHTML = '';
    
    const category = this.categories[this.currentCategory];
    if (category && category.tabs[this.currentTab]) {
      const items = category.tabs[this.currentTab].items;
      
      items.forEach((item, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = `menu-item ${idx === this.currentItem ? 'active' : ''}`;
        itemEl.addEventListener('click', () => this.selectItem(idx));
        
        const label = document.createElement('span');
        label.className = 'menu-item-label';
        label.textContent = item.name;
        itemEl.appendChild(label);
        
        if (item.type === 'toggle') {
          const toggle = document.createElement('div');
          toggle.className = `toggle-switch ${item.value ? 'active' : ''}`;
          const circle = document.createElement('div');
          circle.className = 'toggle-switch-circle';
          toggle.appendChild(circle);
          toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            item.value = !item.value;
            this.renderItems();
          });
          itemEl.appendChild(toggle);
        } else if (item.type === 'slider') {
          const container = document.createElement('div');
          container.className = 'slider-container';
          const slider = document.createElement('input');
          slider.type = 'range';
          slider.className = 'slider';
          slider.min = item.min || 0;
          slider.max = item.max || 100;
          slider.value = item.value || 50;
          slider.addEventListener('input', (e) => {
            item.value = parseFloat(e.target.value);
            value.textContent = item.value.toFixed(1);
          });
          const value = document.createElement('span');
          value.className = 'slider-value';
          value.textContent = (item.value || 50).toFixed(1);
          container.appendChild(slider);
          container.appendChild(value);
          itemEl.appendChild(container);
        } else if (item.type === 'selector') {
          const container = document.createElement('div');
          container.className = 'selector-container';
          const left = document.createElement('span');
          left.className = 'selector-arrow';
          left.textContent = '<';
          left.addEventListener('click', (e) => {
            e.stopPropagation();
            item.selected = (item.selected - 1 + item.options.length) % item.options.length;
            this.renderItems();
          });
          const value = document.createElement('span');
          value.className = 'selector-value';
          value.textContent = item.options[item.selected];
          const right = document.createElement('span');
          right.className = 'selector-arrow';
          right.textContent = '>';
          right.addEventListener('click', (e) => {
            e.stopPropagation();
            item.selected = (item.selected + 1) % item.options.length;
            this.renderItems();
          });
          container.appendChild(left);
          container.appendChild(value);
          container.appendChild(right);
          itemEl.appendChild(container);
        }
        
        itemsSection.appendChild(itemEl);
      });
    }
  }
  
  renderFooter() {
    const category = this.categories[this.currentCategory];
    const totalItems = category ? category.tabs[this.currentTab]?.items.length : 0;
    const current = this.currentItem + 1;
    
    document.getElementById('footerRight').textContent = `${current}/${totalItems}`;
  }
  
  selectCategory(idx) {
    this.currentCategory = idx;
    this.currentTab = 0;
    this.currentItem = 0;
    this.renderMenu();
  }
  
  selectTab(idx) {
    this.currentTab = idx;
    this.currentItem = 0;
    this.renderMenu();
  }
  
  selectItem(idx) {
    this.currentItem = idx;
    this.renderMenu();
  }
  
  handleKeyPress(e) {
    if (!this.visible) return;
    
    const category = this.categories[this.currentCategory];
    const tab = category?.tabs[this.currentTab];
    const items = tab?.items;
    
    switch(e.key.toLowerCase()) {
      case 'arrowup':
        if (this.currentItem > 0) {
          this.currentItem--;
          this.renderMenu();
        }
        break;
      case 'arrowdown':
        if (items && this.currentItem < items.length - 1) {
          this.currentItem++;
          this.renderMenu();
        }
        break;
      case 'arrowleft':
        if (this.currentTab > 0) {
          this.currentTab--;
          this.currentItem = 0;
          this.renderMenu();
        }
        break;
      case 'arrowright':
        if (category && this.currentTab < category.tabs.length - 1) {
          this.currentTab++;
          this.currentItem = 0;
          this.renderMenu();
        }
        break;
      case 'enter':
        if (items && items[this.currentItem]) {
          const item = items[this.currentItem];
          if (item.type === 'toggle') {
            item.value = !item.value;
            this.renderMenu();
          }
        }
        break;
      case '1':
        this.toggleMenu();
        break;
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new MenuSystem();
});
