/**
 * RebornSimulator - 抽卡邏輯與 DOM 控制模組
 */
class RebornSimulator {
    constructor() {
        this.selectedEraKey = "modern";
        this.selectedCountryKey = "all";
        this.selectedClassLevel = "all";
    }

    init() {
        const select = document.getElementById('reborn-era-select');
        select.innerHTML = '';
        Object.keys(rebornDatabase).forEach(eKey => {
            const opt = document.createElement('option');
            opt.value = eKey;
            opt.textContent = rebornDatabase[eKey].name;
            select.appendChild(opt);
        });
        this.onEraChange();
    }

    onEraChange() {
        this.selectedEraKey = document.getElementById('reborn-era-select').value;
        const currentEra = rebornDatabase[this.selectedEraKey];
        
        document.getElementById('reborn-era-desc').innerText = currentEra.desc;
        document.getElementById('reborn-placeholder-icon').innerText = currentEra.icon;

        this.renderCountrySelect();
    }

    renderCountrySelect() {
        const select = document.getElementById('reborn-country-select');
        select.innerHTML = '<option value="all">🌐 該時代全區域隨機 (All Regions)</option>';
        
        const currentEra = rebornDatabase[this.selectedEraKey];
        Object.keys(currentEra.countries).forEach(cCode => {
            const opt = document.createElement('option');
            opt.value = cCode;
            opt.textContent = `${currentEra.countries[cCode].flag} ${currentEra.countries[cCode].name}`;
            select.appendChild(opt);
        });

        this.selectedCountryKey = "all";
        this.selectedClassLevel = "all";
        this.renderDynamicClassButtons();
        this.resetCardView();
    }

    onCountryChange() {
        this.selectedCountryKey = document.getElementById('reborn-country-select').value;
        this.selectedClassLevel = "all";
        this.renderDynamicClassButtons();
        this.resetCardView();
    }

    renderDynamicClassButtons() {
        const container = document.getElementById('reborn-class-selector');
        container.innerHTML = '';

        const currentEra = rebornDatabase[this.selectedEraKey];

        const allBtn = document.createElement('button');
        allBtn.onclick = () => rebornSim.setClassLevel('all');
        allBtn.id = 'reborn-btn-class-all';
        allBtn.className = this.getBtnClass(this.selectedClassLevel === 'all');
        allBtn.textContent = '全部階級';
        container.appendChild(allBtn);

        if (this.selectedCountryKey === 'all') {
            ['極高階/統治', '高階/中產', '平民/低階'].forEach((label, idx) => {
                const btn = document.createElement('button');
                btn.onclick = () => rebornSim.setClassLevel(idx);
                btn.id = `reborn-btn-class-${idx}`;
                btn.className = this.getBtnClass(this.selectedClassLevel === idx);
                btn.textContent = label;
                container.appendChild(btn);
            });
        } else {
            const levels = currentEra.countries[this.selectedCountryKey].hierarchyLevels;
            levels.forEach((levelName, idx) => {
                const btn = document.createElement('button');
                btn.onclick = () => rebornSim.setClassLevel(idx);
                btn.id = `reborn-btn-class-${idx}`;
                btn.className = this.getBtnClass(this.selectedClassLevel === idx);
                btn.textContent = levelName;
                container.appendChild(btn);
            });
        }
    }

    getBtnClass(isActive) {
        return isActive 
            ? "py-2 px-1 rounded-lg font-bold bg-purple-600 text-white transition text-[11px] truncate"
            : "py-2 px-1 rounded-lg font-bold text-slate-400 hover:text-white transition text-[11px] truncate";
    }

    setClassLevel(lvl) {
        this.selectedClassLevel = lvl;
        this.renderDynamicClassButtons();
        this.resetCardView();
    }

    resetCardView() {
        document.getElementById('reborn-placeholder-view').classList.remove('hidden');
        document.getElementById('reborn-result-view').classList.add('hidden');
        document.getElementById('reborn-card-container').className = "w-full max-w-sm bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 min-h-[440px] flex flex-col justify-between";
    }

    getRandomIdentity() {
        const currentEra = rebornDatabase[this.selectedEraKey];
        let candidatePool = [];

        if (this.selectedCountryKey === 'all') {
            Object.keys(currentEra.countries).forEach(cCode => {
                const country = currentEra.countries[cCode];
                country.pool.forEach(item => {
                    candidatePool.push({
                        ...item,
                        eraName: currentEra.name,
                        countryCode: cCode,
                        countryName: country.name,
                        flag: country.flag
                    });
                });
            });
        } else {
            const country = currentEra.countries[this.selectedCountryKey];
            candidatePool = country.pool.map(item => ({
                ...item,
                eraName: currentEra.name,
                countryCode: this.selectedCountryKey,
                countryName: country.name,
                flag: country.flag
            }));
        }

        if (this.selectedClassLevel !== 'all') {
            candidatePool = candidatePool.filter(item => item.classLevel === this.selectedClassLevel);
        }

        if (candidatePool.length === 0) {
            alert("在此條件組合下無可投胎的身分！請放寬階級條件。");
            return null;
        }

        const totalWeight = candidatePool.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;

        for (const item of candidatePool) {
            if (random < item.weight) {
                return {
                    ...item,
                    actualProb: ((item.weight / totalWeight) * 100).toFixed(2)
                };
            }
            random -= item.weight;
        }
        return candidatePool[0];
    }

    drawLife() {
        const btn = document.getElementById('reborn-gacha-btn');
        const placeholder = document.getElementById('reborn-placeholder-view');
        const result = document.getElementById('reborn-result-view');
        const cardContainer = document.getElementById('reborn-card-container');

        const drawn = this.getRandomIdentity();
        if (!drawn) return;

        btn.disabled = true;
        btn.innerText = "穿越投胎中...";
        btn.classList.add('opacity-75');

        setTimeout(() => {
            placeholder.classList.add('hidden');
            result.classList.remove('hidden');
            
            result.classList.remove('animate-pop-in');
            void result.offsetWidth;
            result.classList.add('animate-pop-in');

            document.getElementById('reborn-card-title').innerText = drawn.title;
            document.getElementById('reborn-card-flag').innerText = drawn.flag;
            document.getElementById('reborn-card-era-badge').innerText = drawn.eraName.split(' ')[0];
            document.getElementById('reborn-card-country-name').innerText = drawn.countryName;
            document.getElementById('reborn-card-classname').innerText = drawn.className;
            document.getElementById('reborn-card-hierarchy-path').innerText = `${drawn.eraName.split(' ')[0]} ➔ ${drawn.countryName} ➔ ${drawn.className}`;
            document.getElementById('reborn-card-prob').innerText = `條件機率: ${drawn.actualProb}%`;
            document.getElementById('reborn-card-comment').innerText = drawn.comment;
            
            document.getElementById('reborn-attr-healthcare').innerText = drawn.healthcare;
            document.getElementById('reborn-attr-safety').innerText = drawn.safety;
            document.getElementById('reborn-attr-economy').innerText = drawn.economy;

            const tierEl = document.getElementById('reborn-card-tier');
            tierEl.innerText = drawn.tier;
            tierEl.className = `px-3 py-1 rounded-full text-xs tracking-wider uppercase border ${rebornTierStyles[drawn.tier]}`;
            
            cardContainer.className = `w-full max-w-sm bg-slate-800 border-2 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 min-h-[440px] flex flex-col justify-between ${rebornCardStyles[drawn.tier]}`;

            btn.disabled = false;
            btn.innerText = "再次投胎 (重新抽卡)";
            btn.classList.remove('opacity-75');
        }, 300);
    }
}

// 實例化全域模擬器物件
const rebornSim = new RebornSimulator();