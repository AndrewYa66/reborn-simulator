/**
 * 抽卡引擎與 UI 控制邏輯
 */
let selectedEraKey = "modern";
let selectedCountryKey = "all";
let selectedClassLevel = "all";

// 初始化時代下拉選單
function initEraSelect() {
    const select = document.getElementById('era-select');
    select.innerHTML = '';
    Object.keys(eraDatabase).forEach(eKey => {
        const opt = document.createElement('option');
        opt.value = eKey;
        opt.textContent = eraDatabase[eKey].name;
        select.appendChild(opt);
    });
    onEraChange();
}

// 切換時代
function onEraChange() {
    selectedEraKey = document.getElementById('era-select').value;
    const currentEra = eraDatabase[selectedEraKey];
    
    document.getElementById('era-desc').innerText = currentEra.desc;
    document.getElementById('placeholder-icon').innerText = currentEra.icon;

    renderCountrySelect();
}

// 重新繪製國家下拉選單
function renderCountrySelect() {
    const select = document.getElementById('country-select');
    select.innerHTML = '<option value="all">🌐 該時代全區域隨機 (All Regions)</option>';
    
    const currentEra = eraDatabase[selectedEraKey];
    Object.keys(currentEra.countries).forEach(cCode => {
        const opt = document.createElement('option');
        opt.value = cCode;
        opt.textContent = `${currentEra.countries[cCode].flag} ${currentEra.countries[cCode].name}`;
        select.appendChild(opt);
    });

    selectedCountryKey = "all";
    selectedClassLevel = "all";
    renderDynamicClassButtons();
    resetCardView();
}

// 切換國家
function onCountryChange() {
    selectedCountryKey = document.getElementById('country-select').value;
    selectedClassLevel = "all";
    renderDynamicClassButtons();
    resetCardView();
}

// 動態繪製動態階級按鈕
function renderDynamicClassButtons() {
    const container = document.getElementById('dynamic-class-selector');
    container.innerHTML = '';

    const currentEra = eraDatabase[selectedEraKey];

    const allBtn = document.createElement('button');
    allBtn.onclick = () => setClassLevel('all');
    allBtn.id = 'btn-class-all';
    allBtn.className = getBtnClass(selectedClassLevel === 'all');
    allBtn.textContent = '全部階級';
    container.appendChild(allBtn);

    if (selectedCountryKey === 'all') {
        ['極高階/統治', '高階/中產', '平民/低階'].forEach((label, idx) => {
            const btn = document.createElement('button');
            btn.onclick = () => setClassLevel(idx);
            btn.id = `btn-class-${idx}`;
            btn.className = getBtnClass(selectedClassLevel === idx);
            btn.textContent = label;
            container.appendChild(btn);
        });
    } else {
        const levels = currentEra.countries[selectedCountryKey].hierarchyLevels;
        levels.forEach((levelName, idx) => {
            const btn = document.createElement('button');
            btn.onclick = () => setClassLevel(idx);
            btn.id = `btn-class-${idx}`;
            btn.className = getBtnClass(selectedClassLevel === idx);
            btn.textContent = levelName;
            container.appendChild(btn);
        });
    }
}

function getBtnClass(isActive) {
    return isActive 
        ? "py-2 px-1 rounded-lg font-bold bg-purple-600 text-white transition text-[11px] truncate"
        : "py-2 px-1 rounded-lg font-bold text-slate-400 hover:text-white transition text-[11px] truncate";
}

function setClassLevel(lvl) {
    selectedClassLevel = lvl;
    renderDynamicClassButtons();
    resetCardView();
}

function resetCardView() {
    document.getElementById('placeholder-view').classList.remove('hidden');
    document.getElementById('result-view').classList.add('hidden');
    document.getElementById('card-container').className = "w-full max-w-sm bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 min-h-[440px] flex flex-col justify-between";
}

// 抽取身分計算
function getRandomIdentity() {
    const currentEra = eraDatabase[selectedEraKey];
    let candidatePool = [];

    if (selectedCountryKey === 'all') {
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
        const country = currentEra.countries[selectedCountryKey];
        candidatePool = country.pool.map(item => ({
            ...item,
            eraName: currentEra.name,
            countryCode: selectedCountryKey,
            countryName: country.name,
            flag: country.flag
        }));
    }

    if (selectedClassLevel !== 'all') {
        candidatePool = candidatePool.filter(item => item.classLevel === selectedClassLevel);
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

// 執行投胎抽卡
function drawLife() {
    const btn = document.getElementById('gacha-btn');
    const placeholder = document.getElementById('placeholder-view');
    const result = document.getElementById('result-view');
    const cardContainer = document.getElementById('card-container');

    const drawn = getRandomIdentity();
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

        document.getElementById('card-title').innerText = drawn.title;
        document.getElementById('card-flag').innerText = drawn.flag;
        document.getElementById('card-era-badge').innerText = drawn.eraName.split(' ')[0];
        document.getElementById('card-country-name').innerText = drawn.countryName;
        document.getElementById('card-classname').innerText = drawn.className;
        document.getElementById('card-hierarchy-path').innerText = `${drawn.eraName.split(' ')[0]} ➔ ${drawn.countryName} ➔ ${drawn.className}`;
        document.getElementById('card-prob').innerText = `條件機率: ${drawn.actualProb}%`;
        document.getElementById('card-comment').innerText = drawn.comment;
        
        document.getElementById('attr-healthcare').innerText = drawn.healthcare;
        document.getElementById('attr-safety').innerText = drawn.safety;
        document.getElementById('attr-economy').innerText = drawn.economy;

        const tierEl = document.getElementById('card-tier');
        tierEl.innerText = drawn.tier;
        tierEl.className = `px-3 py-1 rounded-full text-xs tracking-wider uppercase border ${tierStyles[drawn.tier]}`;
        
        cardContainer.className = `w-full max-w-sm bg-slate-800 border-2 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 min-h-[440px] flex flex-col justify-between ${cardContainerStyle[drawn.tier]}`;

        btn.disabled = false;
        btn.innerText = "再次投胎 (重新抽卡)";
        btn.classList.remove('opacity-75');
    }, 300);
}