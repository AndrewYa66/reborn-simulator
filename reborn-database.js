/**
 * reborn-simulator 資料庫模組
 */
const rebornDatabase = {
    "modern": {
        name: "🌍 當代 (2020s)",
        desc: "科技高度發達，全球化與高齡化並存的時代。",
        icon: "🌏",
        countries: {
            "TWN": {
                name: "台灣", flag: "🇹🇼",
                hierarchyLevels: ["頂層富豪", "中產階級", "基層勞工"],
                pool: [
                    { title: "科技巨頭創辦人家族", classLevel: 0, className: "頂層富豪", weight: 0.2, tier: "SSR", healthcare: "EX", safety: "EX", economy: "EX", comment: "繼承數百億市值股票，出生即在終點站！" },
                    { title: "資深軟體架構師", classLevel: 1, className: "中產階級", weight: 15.0, tier: "SR", healthcare: "S", safety: "A+", economy: "A", comment: "享有健全的全民健保與優質的生活品質。" },
                    { title: "夜市擺攤業者/外送員", classLevel: 2, className: "基層勞工", weight: 84.8, tier: "R", healthcare: "A", safety: "A", economy: "B", comment: "生活節奏快，為生活打拼，但享有良好的治安環境。" }
                ]
            },
            "USA": {
                name: "美國", flag: "🇺🇸",
                hierarchyLevels: ["Corporate Elite", "Upper Middle", "Working Class"],
                pool: [
                    { title: "矽谷獨角獸創辦人", classLevel: 0, className: "Corporate Elite", weight: 0.1, tier: "SSR", healthcare: "EX", safety: "S", economy: "EX", comment: "掌握風險資本與前沿科技，影響全球產業。" },
                    { title: "華爾街金融分析師", classLevel: 1, className: "Upper Middle", weight: 10.0, tier: "SR", healthcare: "A+", safety: "A-", economy: "S", comment: "高薪高壓生活，享有頂級私人商業醫療保險。" },
                    { title: "連鎖速食店時薪勞工", classLevel: 2, className: "Working Class", weight: 89.9, tier: "R", healthcare: "C", safety: "C+", economy: "B-", comment: "面臨通膨壓力與高昂醫療費用負擔。" }
                ]
            },
            "JPN": {
                name: "日本", flag: "🇯🇵",
                hierarchyLevels: ["華族/政財界", "社畜/正社員", "飛特族 (Freeter)"],
                pool: [
                    { title: "百年老店世家繼承人", classLevel: 0, className: "華族/政財界", weight: 0.5, tier: "SSR", healthcare: "S", safety: "EX", economy: "A+", comment: "傳統國會政治家族或財閥後代，政商資源豐沛。" },
                    { title: "大手企業中堅幹部", classLevel: 1, className: "社畜/正社員", weight: 35.0, tier: "SR", healthcare: "S", safety: "EX", economy: "A", comment: "擁有完善的年功序列保障與福利，但加班文化繁重。" },
                    { title: "便利商店打工族", classLevel: 2, className: "飛特族 (Freeter)", weight: 64.5, tier: "R", healthcare: "B+", safety: "S", economy: "C", comment: "自由度高但缺乏長期職業保障，生活節儉。" }
                ]
            }
        }
    },
    "age_of_discovery": {
        name: "⛵ 大航海時代 (15-17世紀)",
        desc: "新航路開闢，香料貿易、海權爭霸與地理大發現的冒險時代。",
        icon: "⛵",
        countries: {
            "ESP": {
                name: "西班牙帝國", flag: "🇪🇸",
                hierarchyLevels: ["Grandee (大貴族)", "Conquistador (征服者)", "Peasant (農民)"],
                pool: [
                    { title: "新西班牙總督", classLevel: 0, className: "Grandee (大貴族)", weight: 0.2, tier: "SSR", healthcare: "B", safety: "A", economy: "EX", comment: "掌控美洲銀礦與香料船隊，享有無上權力與財富。" },
                    { title: "大西洋貿易船長", classLevel: 1, className: "Conquistador (征服者)", weight: 8.0, tier: "SR", healthcare: "C-", safety: "D+", economy: "S", comment: "帶領船隊橫跨大西洋，雖然面臨風暴與壞血病，但回報極高。" },
                    { title: "卡斯提亞自耕農", classLevel: 2, className: "Peasant (農民)", weight: 91.8, tier: "R", healthcare: "D", safety: "C", economy: "D", comment: "負擔沉重皇室稅負，生活貧困。" }
                ]
            },
            "MNG": {
                name: "大明帝國", flag: "🏮",
                hierarchyLevels: ["皇親/士大夫", "徽商/晉商", "平民自耕農"],
                pool: [
                    { title: "江南內閣首輔門生", classLevel: 0, className: "皇親/士大夫", weight: 0.3, tier: "SSR", healthcare: "B+", safety: "A-", economy: "EX", comment: "科舉及第，掌管運河鹽鐵與朝廷大權。" },
                    { title: "東南沿海海商大戶", classLevel: 1, className: "徽商/晉商", weight: 12.0, tier: "SR", healthcare: "C+", safety: "B-", economy: "S", comment: "與葡萄牙、日本進行絲綢白銀走私貿易，累積鉅富。" },
                    { title: "長江中下游佃農", classLevel: 2, className: "平民自耕農", weight: 87.7, tier: "R", healthcare: "D", safety: "C", economy: "C-", comment: "靠天吃飯，租耕地主土地，負擔徭役。" }
                ]
            }
        }
    },
    "medieval": {
        name: "⚔️ 亞歐中世紀 (5-15世紀)",
        desc: "城堡、采邑、騎士精神與宗教信仰深厚的時代。",
        icon: "⚔️",
        countries: {
            "FRA_MED": {
                name: "法蘭西王國", flag: "⚜️",
                hierarchyLevels: ["Monarch/Bishop (王公/高階聖職)", "Knight (騎士/小領主)", "Serf (采邑農奴)"],
                pool: [
                    { title: "香檳伯爵/阿維尼翁樞機", classLevel: 0, className: "Monarch/Bishop (王公/高階聖職)", weight: 0.3, tier: "SSR", healthcare: "C+", safety: "A-", economy: "EX", comment: "采邑金字塔頂端，掌控廣袤土地與什一稅。" },
                    { title: "封建采邑騎士", classLevel: 1, className: "Knight (騎士/小領主)", weight: 5.0, tier: "SR", healthcare: "C", safety: "B-", economy: "A", comment: "身披重甲，擁有獨立莊園，隨時準備響應國王號召。" },
                    { title: "莊園采邑農奴", classLevel: 2, className: "Serf (采邑農奴)", weight: 94.7, tier: "R", healthcare: "F", safety: "F", economy: "D-", comment: "終身束縛於領主土地，日出而作，負擔黑死病與饑荒風險。" }
                ]
            },
            "SONG": {
                name: "大宋帝國", flag: "🏮",
                hierarchyLevels: ["宗室/進士官僚", "市井富商/坊主", "莊客/佃戶"],
                pool: [
                    { title: "翰林學士/宰輔", classLevel: 0, className: "宗室/進士官僚", weight: 0.4, tier: "SSR", healthcare: "B", safety: "A", economy: "EX", comment: "右文抑武政策下的極致受益者，享受優渥俸祿與文化盛世。" },
                    { title: "東京汴梁瓦舍老闆", classLevel: 1, className: "市井富商/坊主", weight: 15.0, tier: "SR", healthcare: "C+", safety: "B+", economy: "S", comment: "經營夜市娛樂業，利用交子紙幣進行大額商業往來。" },
                    { title: "華北平原耕農", classLevel: 2, className: "莊客/佃戶", weight: 84.6, tier: "R", healthcare: "D", safety: "C-", economy: "C-", comment: "負擔夏秋兩稅，面臨北方邊境動盪威脅。" }
                ]
            }
        }
    },
    "ancient_rome": {
        name: "🏛️ 古典帝國時代 (117 AD)",
        desc: "條條大路通羅馬，軍團征伐與古典文明輝煌的年代。",
        icon: "🏛️",
        countries: {
            "ROM": {
                name: "羅馬帝國", flag: "🏛️",
                hierarchyLevels: ["Patrician (元老院貴族)", "Citizen (羅馬公民)", "Servus (奴隸)"],
                pool: [
                    { title: "執政官家族元老", classLevel: 0, className: "Patrician (元老院貴族)", weight: 0.2, tier: "SSR", healthcare: "B", safety: "B+", economy: "EX", comment: "享受公眾浴場與貴賓席，掌握百人會議投票權。" },
                    { title: "羅馬軍團百夫長", classLevel: 1, className: "Citizen (羅馬公民)", weight: 15.0, tier: "SR", healthcare: "C", safety: "B", economy: "A", comment: "退伍後可獲得土地分配，享有羅馬和平的庇護。" },
                    { title: "大莊園/鬥獸場奴隸", classLevel: 2, className: "Servus (奴隸)", weight: 84.8, tier: "R", healthcare: "F", safety: "F", economy: "F", comment: "開局即為主人財產，沒有自由與法律權利。" }
                ]
            },
            "HAN": {
                name: "大漢帝國", flag: "🏯",
                hierarchyLevels: ["皇族/郡守豪強", "太學士/鄉紳", "編戶齊民"],
                pool: [
                    { title: "關內侯/地方郡守", classLevel: 0, className: "皇族/郡守豪強", weight: 0.3, tier: "SSR", healthcare: "B", safety: "A-", economy: "EX", comment: "擁地方莊園與鄉勇，察舉制下的核心階層。" },
                    { title: "太學生/塢堡主人", classLevel: 1, className: "太學士/鄉紳", weight: 10.0, tier: "SR", healthcare: "C", safety: "B+", economy: "A", comment: "精通儒家經典，在地方上擁有相當話語權。" },
                    { title: "中原編戶齊民", classLevel: 2, className: "編戶齊民", weight: 89.7, tier: "R", healthcare: "D", safety: "C", economy: "C-", comment: "強盛東方帝國的基石，負擔口賦與兵役徭役。" }
                ]
            }
        }
    }
};

const rebornTierStyles = {
    "R": "bg-slate-700 text-slate-300 border-slate-600",
    "SR": "bg-blue-900/80 text-blue-200 border-blue-600",
    "SSR": "bg-gradient-to-r from-amber-500 to-yellow-300 text-slate-900 border-amber-300 font-extrabold"
};

const rebornCardStyles = {
    "R": "border-slate-700 shadow-slate-900/50",
    "SR": "border-blue-500/50 shadow-blue-500/20",
    "SSR": "border-amber-400 shadow-amber-500/30"
};