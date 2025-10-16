(function loadBlocklyAndBoot(){
    const VERSION = '12.3.1';
    const PAIRS = [
        [`https://unpkg.com/blockly@${VERSION}/blockly.min.js`,`https://unpkg.com/blockly@${VERSION}/javascript.min.js`],
        [`https://cdn.jsdelivr.net/npm/blockly@${VERSION}/blockly.min.js`,`https://cdn.jsdelivr.net/npm/blockly@${VERSION}/javascript.min.js`],
        [`./vendor/blockly@${VERSION}/blockly.min.js`,`./vendor/blockly@${VERSION}/javascript.min.js`],
        [`./vendor/blockly/blockly.min.js`,`./vendor/blockly/javascript.min.js`],
        [`./lib/blockly/blockly.min.js`,`./lib/blockly/javascript.min.js`],
    ];
    function inject(url){
        return new Promise((resolve,reject)=>{
            const s=document.createElement('script');
            s.src=url; s.async=false; s.type='text/javascript';
            s.onload=()=>resolve(url);
            s.onerror=()=>reject(new Error('load-failed:'+url));
            document.head.appendChild(s);
        });
    }
    async function tryPair(pair){
        await inject(pair[0]);
        if(!window.Blockly) throw new Error('Blockly undefined');
        await inject(pair[1]);
        if(!Blockly.JavaScript) throw new Error('Generator undefined');
    }
    (async ()=>{
        let ok=false;
        for(const p of PAIRS){
            try{ await tryPair(p); ok=true; break; }catch(_e){}
        }
        if(!ok){ alert('Failed to load Blockly (CDN blocked).'); return; }
        bootApp(); // async
    })();
})();

async function bootApp(){
    const challenges = await fetch('challenges.json').then(r=>r.json()).catch(()=>[]);
    if (!challenges.length) {
        alert('Failed to load challenges.json');
    }

    // If we changed starters for some challenges, old saved workspaces in localStorage
    // may include pre-attached blocks that break tests (e.g. FizzBuzz printing n before the loop).
    // Clear saved snapshots for the listed challenge ids so users see the updated starter.
    try{
        const idsToReset = [
            'print_number','echo_text','sum_two','difference_two','product_two','divide_two','countdown','fizzbuzz_upto_n'
        ];
        idsToReset.forEach(id => { try{ LS.del(kWS(id)); }catch(e){} });
    }catch(e){}

    Blockly.JavaScript['text_print'] = function(block){
        const msg=Blockly.JavaScript.valueToCode(block,'TEXT',Blockly.JavaScript.ORDER_NONE)||"''";
        return 'console.log('+msg+');\n';
    };

    function NightNeonTheme(){
        if(Blockly.Theme && Blockly.Theme.defineTheme){
            return Blockly.Theme.defineTheme('NightNeon',{
                base: Blockly.Themes.Classic,
                startHats: true,
                fontStyle:{family:'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial', weight:600},
                blockStyles:{
                    logic_blocks:{colourPrimary:'#2dd4bf', colourSecondary:'#1baaa0', colourTertiary:'#0f766e'},
                    loop_blocks:{colourPrimary:'#a78bfa', colourSecondary:'#7c3aed', colourTertiary:'#5b21b6'},
                    math_blocks:{colourPrimary:'#60a5fa', colourSecondary:'#3b82f6', colourTertiary:'#1d4ed8'},
                    text_blocks:{colourPrimary:'#f472b6', colourSecondary:'#ec4899', colourTertiary:'#be185d'},
                    variable_blocks:{colourPrimary:'#f59e0b', colourSecondary:'#d97706', colourTertiary:'#b45309'},
                    list_blocks:{colourPrimary:'#22c55e', colourSecondary:'#16a34a', colourTertiary:'#166534'},
                    procedure_blocks:{colourPrimary:'#eab308', colourSecondary:'#ca8a04', colourTertiary:'#a16207'}
                },
                categoryStyles:{
                    logic_category:{colour:'#2dd4bf'}, loop_category:{colour:'#a78bfa'},
                    math_category:{colour:'#60a5fa'}, text_category:{colour:'#f472b6'},
                    variable_category:{colour:'#f59e0b'}, list_category:{colour:'#22c55e'},
                    procedure_category:{colour:'#eab308'}
                },
                componentStyles:{
                    workspaceBackgroundColour:'#0b1220',
                    toolboxBackgroundColour:'#0e1628',
                    toolboxForegroundColour:'#e5e7eb',
                    flyoutBackgroundColour:'#0b1220',
                    flyoutForegroundColour:'#e5e7eb',
                    flyoutOpacity:0.98,
                    scrollbarColour:'#2f3b53',
                    insertionMarkerColour:getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#22d3ee',
                    insertionMarkerOpacity:0.6,
                    cursorColour:'#22d3ee',
                    selectedGlowColour:'#22d3ee',
                    selectedGlowOpacity:0.4,
                    markerColour:'#60a5fa',
                    blackBackground:'#000'
                }
            });
        }
        return Blockly.Themes.Dark||Blockly.Themes.Classic;
    }
    function LightCleanTheme(){
        if(Blockly.Theme && Blockly.Theme.defineTheme){
            return Blockly.Theme.defineTheme('LightClean',{
                base: Blockly.Themes.Classic,
                startHats: true,
                fontStyle:{family:'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial', weight:600},
                blockStyles:{
                    logic_blocks:{colourPrimary:'#0ea5e9', colourSecondary:'#0284c7', colourTertiary:'#0369a1'},
                    loop_blocks:{colourPrimary:'#8b5cf6', colourSecondary:'#7c3aed', colourTertiary:'#5b21b6'},
                    math_blocks:{colourPrimary:'#2563eb', colourSecondary:'#1d4ed8', colourTertiary:'#1e3a8a'},
                    text_blocks:{colourPrimary:'#db2777', colourSecondary:'#be185d', colourTertiary:'#9d174d'},
                    variable_blocks:{colourPrimary:'#d97706', colourSecondary:'#b45309', colourTertiary:'#92400e'},
                    list_blocks:{colourPrimary:'#16a34a', colourSecondary:'#15803d', colourTertiary:'#166534'},
                    procedure_blocks:{colourPrimary:'#ca8a04', colourSecondary:'#a16207', colourTertiary:'#854d0e'}
                },
                categoryStyles:{
                    logic_category:{colour:'#0ea5e9'}, loop_category:{colour:'#8b5cf6'},
                    math_category:{colour:'#2563eb'}, text_category:{colour:'#db2777'},
                    variable_category:{colour:'#d97706'}, list_category:{colour:'#16a34a'},
                    procedure_category:{colour:'#ca8a04'}
                },
                componentStyles:{
                    workspaceBackgroundColour:'#f8fafc',
                    toolboxBackgroundColour:'#ffffff',
                    toolboxForegroundColour:'#0f172a',
                    flyoutBackgroundColour:'#f8fafc',
                    flyoutForegroundColour:'#0f172a',
                    flyoutOpacity:0.98,
                    scrollbarColour:'#cbd5e1',
                    insertionMarkerColour:getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#2563eb',
                    insertionMarkerOpacity:0.6,
                    cursorColour:'#2563eb',
                    selectedGlowColour:'#2563eb',
                    selectedGlowOpacity:0.25,
                    markerColour:'#0ea5e9',
                    blackBackground:'#fff'
                }
            });
        }
        return Blockly.Themes.Classic;
    }

    const EMPTY_XML = `<xml xmlns="https://developers.google.com/blockly/xml"></xml>`;
    const LS = {
        get(k){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):null; }catch(e){return null;} },
        set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} },
        del(k){ try{ localStorage.removeItem(k); }catch(e){} }
    };
    const kWS   = (id)=>`blockly.snap.${id}`;
    const kVars = (id)=>`blockly.vars.${id}`;
    const K_SOLVED = 'ch.solved';
    const K_CURRENT = 'ch.current';
    const K_THEME = 'ui.theme';
    const K_ACCENT = 'ui.accent';

    const themeSelect = document.getElementById('themeSelect');
    const accentPicker = document.getElementById('accentPicker');
    const categoryFilter = document.getElementById('categoryFilter');

    let workspace = null;
    let currentIndex = -1;
    let solvedChallenges = new Set(LS.get(K_SOLVED)||[]);
    let currentVars = {};
    const canSerialize = !!(Blockly.serialization && Blockly.serialization.workspaces && Blockly.serialization.workspaces.save && Blockly.serialization.workspaces.load);
    let booting = true;

    function buildToolbox(allowedBlocks){
        const contents=[];
        if (allowedBlocks.some(b=>['controls_if','logic_compare','logic_operation','logic_negate','logic_boolean'].includes(b))){
            contents.push({kind:'category', name:'Logic', categorystyle:'logic_category',
                contents:[
                    {kind:'block', type:'controls_if'},
                    {kind:'block', type:'logic_compare'},
                    {kind:'block', type:'logic_operation'},
                    {kind:'block', type:'logic_negate'},
                    {kind:'block', type:'logic_boolean'}
                ].filter(x=>allowedBlocks.includes(x.type))
            });
        }
        if (allowedBlocks.some(b=>['controls_repeat_ext','controls_whileUntil','controls_for','controls_forEach'].includes(b))){
            contents.push({kind:'category', name:'Loops', categorystyle:'loop_category',
                contents:[
                    {kind:'block', type:'controls_repeat_ext'},
                    {kind:'block', type:'controls_whileUntil'},
                    {kind:'block', type:'controls_for'},
                    {kind:'block', type:'controls_forEach'}
                ].filter(x=>allowedBlocks.includes(x.type))
            });
        }
        if (allowedBlocks.some(b=>['math_number','math_arithmetic','math_modulo'].includes(b))){
            contents.push({kind:'category', name:'Math', categorystyle:'math_category',
                contents:[
                    {kind:'block', type:'math_number'},
                    {kind:'block', type:'math_arithmetic'},
                    {kind:'block', type:'math_modulo'}
                ].filter(x=>allowedBlocks.includes(x.type))
            });
        }
        if (allowedBlocks.some(b=>['text','text_print','text_join'].includes(b))){
            contents.push({kind:'category', name:'Text', categorystyle:'text_category',
                contents:[
                    {kind:'block', type:'text'},
                    {kind:'block', type:'text_print'},
                    {kind:'block', type:'text_join'}
                ].filter(x=>allowedBlocks.includes(x.type))
            });
        }
        if (allowedBlocks.some(b=>['variables_set','variables_get'].includes(b))){
            contents.push({kind:'category', name:'Variables', categorystyle:'variable_category', custom:'VARIABLE'});
        }
        return {kind:'categoryToolbox', contents};
    }

    function activeBlocklyTheme(){
        return document.documentElement.getAttribute('data-theme') === 'light'
            ? LightCleanTheme()
            : NightNeonTheme();
    }

    function initBlockly(allowedBlocks){
        if (workspace) workspace.dispose();
        workspace = Blockly.inject('blocklyDiv', {
            toolbox: buildToolbox(allowedBlocks),
            renderer: 'thrasos',
            trashcan: true,
            move:{scrollbars:true, drag:true, wheel:true},
            zoom:{controls:true, wheel:true, startScale:1.0, maxScale:2.0, minScale:0.5, pinch:true},
            grid:{spacing:24, length:1, colour:'#1f2a3d', snap:true},
            theme: activeBlocklyTheme()
        });
        workspace.addChangeListener(updateCode);
        workspace.addChangeListener(()=>{ if(!booting) autosaveWorkspace(); });
    }

    function autosaveWorkspace(){
        const ch = challenges[currentIndex];
        if(!ch) return;
        let payload;
        if (canSerialize){
            const json = Blockly.serialization.workspaces.save(workspace);
            payload = { fmt:'json', ts: Date.now(), json };
        } else {
            const xmlDom = Blockly.Xml.workspaceToDom(workspace);
            const xmlText = Blockly.Xml.domToText(xmlDom);
            payload = { fmt:'xml', ts: Date.now(), xml: xmlText };
        }
        LS.set(kWS(ch.id), payload);
    }

    function restoreWorkspaceOrStarter(ch){
        const data = LS.get(kWS(ch.id));
        Blockly.Events.disable();
        try{
            if (data && data.fmt==='json' && canSerialize && data.json){
                workspace.clear();
                Blockly.serialization.workspaces.load(data.json, workspace);
            } else if (data && data.xml){
                const dom = (Blockly.utils && Blockly.utils.xml && Blockly.utils.xml.textToDom)
                    ? Blockly.utils.xml.textToDom(data.xml)
                    : Blockly.Xml.textToDom(data.xml);
                Blockly.Xml.clearWorkspaceAndLoadFromXml(dom, workspace);
            } else {
                const dom = (Blockly.utils && Blockly.utils.xml && Blockly.utils.xml.textToDom)
                    ? Blockly.utils.xml.textToDom(ch.starter || EMPTY_XML)
                    : Blockly.Xml.textToDom(ch.starter || EMPTY_XML);
                Blockly.Xml.clearWorkspaceAndLoadFromXml(dom, workspace);
            }
        } catch(_e){
            const dom = (Blockly.utils && Blockly.utils.xml && Blockly.utils.xml.textToDom)
                ? Blockly.utils.xml.textToDom(ch.starter || EMPTY_XML)
                : Blockly.Xml.textToDom(ch.starter || EMPTY_XML);
            Blockly.Xml.clearWorkspaceAndLoadFromXml(dom, workspace);
        } finally {
            Blockly.Events.enable();
        }
        setTimeout(()=>Blockly.svgResize(workspace),0);
        updateCode();
    }

    function deriveVarsFromTestCases(ch) {
        const vars = {};
        (ch.testCases || []).forEach(tc => {
            Object.entries(tc.input || {}).forEach(([k, v]) => { if (!(k in vars)) vars[k] = v; });
        });
        return vars;
    }

    function renderInputs(ch) {
        const saved = LS.get(kVars(ch.id)) || {};
        const base = (ch.vars && Object.keys(ch.vars).length) ? ch.vars : deriveVarsFromTestCases(ch);
        const merged = {...base, ...saved};
        currentVars = JSON.parse(JSON.stringify(merged));

        const box = document.getElementById('inputsBox');
        box.innerHTML = '';
        const keys = Object.keys(merged);
        if (!keys.length) { box.textContent = 'No inputs for this challenge.'; return; }

        keys.forEach((name) => {
            const value = merged[name];
            const row = document.createElement('div'); row.className='row';
            const label = document.createElement('label'); label.textContent = name;
            const input = document.createElement('input');
            input.type = (typeof value === 'number') ? 'number' : 'text';
            input.value = value;
            input.addEventListener('input', (e) => {
                const raw = e.target.value;
                currentVars[name] = (typeof value === 'number') ? Number(raw) : raw;
                LS.set(kVars(ch.id), currentVars);
            });
            row.appendChild(label); row.appendChild(input); box.appendChild(row);
        });
    }

    function updateCode(){
        const code = Blockly.JavaScript.workspaceToCode(workspace);
        document.getElementById('codeBox').textContent = code || '// Code will appear here';
    }

    function updateSidebar() {
        const list = document.getElementById('challengeList');
        list.innerHTML = '';
        // filter by selected category
        const sel = LS.get('ui.category') || 'all';
        const visible = challenges.map((ch, i) => ({ch, i})).filter(({ch}) => sel === 'all' || (ch.category || '').toLowerCase() === sel.toLowerCase());
        if (!visible.length) {
            const empty = document.createElement('div'); empty.className='challenge-item'; empty.textContent = 'No challenges in this category.'; list.appendChild(empty); return;
        }
        visible.forEach(({ch, i}) => {
            const div = document.createElement('div');
            div.className = 'challenge-item';
            if (i === currentIndex) div.classList.add('active');
            if (solvedChallenges.has(ch.id)) div.classList.add('solved');
            div.textContent = ch.title + (ch.category ? ` — ${ch.category}` : '');
            div.onclick = () => loadChallenge(i);
            list.appendChild(div);
        });
    }

    function collectCategories(){
        const set = new Set();
        challenges.forEach(ch => { if (ch.category) set.add(ch.category); });
        return Array.from(set).sort((a,b)=>a.localeCompare(b));
    }

    function populateCategoryFilter(){
        if (!categoryFilter) return;
        const cats = collectCategories();
        // preserve previous selection
        const prev = LS.get('ui.category') || 'all';
        categoryFilter.innerHTML = '<option value="all">All</option>' + cats.map(c=>`<option value="${c}">${c}</option>`).join('');
        categoryFilter.value = prev;
        categoryFilter.addEventListener('change', ()=>{
            LS.set('ui.category', categoryFilter.value);
            updateSidebar();
            // if currentIndex not visible, jump to first visible
            const sel = LS.get('ui.category') || 'all';
            const visibleIdx = challenges.findIndex(ch => sel === 'all' || (ch.category||'').toLowerCase() === sel.toLowerCase());
            if (visibleIdx >= 0) loadChallenge(visibleIdx);
        });
    }

    function setCodeCollapsed(collapsed) {
        const codeSection = document.getElementById('codeSection');
        const localBtn = document.getElementById('toggleCodeBtn');
        const globalBtn = document.getElementById('toggleCodeGlobalBtn');
        codeSection.classList.toggle('collapsed', collapsed);
        if (localBtn) localBtn.textContent = collapsed ? 'Show' : 'Hide';
        if (globalBtn) globalBtn.textContent = collapsed ? 'Show Code' : 'Hide Code';
    }

    function loadChallenge(index) {
        if (index < 0 || index >= challenges.length) return;
        currentIndex = index;
        LS.set(K_CURRENT, currentIndex);

        const ch = challenges[index];
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('workArea').style.display = 'flex';

        document.getElementById('challengeTitle').textContent = ch.title;
        document.getElementById('challengeDesc').textContent = ch.description;
        document.getElementById('challengeDiff').textContent = ch.difficulty;

        initBlockly(ch.blocks || []);
        restoreWorkspaceOrStarter(ch);
        renderInputs(ch);
        updateSidebar();
        setCodeCollapsed(true);
    }

    function openResultsModal(results, cases) {
        const modal = document.getElementById('resultsModal');
        const summary = document.getElementById('resultsSummary');
        const list = document.getElementById('resultsList');

        const total = results.length;
        const passes = results.filter(r => r.pass).length;
        const allPass = passes === total && total > 0;
        summary.innerHTML = `<span class="badge ${allPass ? 'badge-pass' : 'badge-fail'}">${passes}/${total} ${allPass ? 'PASSED' : 'FAILED'}</span>`;

        list.innerHTML = '';
        results.forEach((r, idx) => {
            const item = document.createElement('div');
            item.className = 'test-item';

            const inputKV = safeCode(JSON.stringify(cases[idx]?.input ?? {}));
            const expected = r.error ? '—' : safeCode(JSON.stringify(r.expected));
            const actual = r.error ? safeCode(`error: ${r.error}`) : safeCode(JSON.stringify(r.actual));

            item.innerHTML = `
        <div class="test-cell">
          <div class="test-label">input</div>
          <div class="test-code">${inputKV}</div>
        </div>
        <div class="test-cell">
          <div class="test-label">expected</div>
          <div class="test-code">${expected}</div>
        </div>
        <div class="test-cell">
          <div class="test-label">actual</div>
          <div class="test-code">${actual}</div>
        </div>
        <div class="status ${r.pass ? 'pass' : 'fail'}">${r.pass ? '✓' : '✗'}</div>
      `;
            list.appendChild(item);
        });

        modal.classList.add('open');
        if (results.length && results.every(r => r.pass)) {
            const ch = challenges[currentIndex];
            solvedChallenges.add(ch.id);
            LS.set(K_SOLVED, Array.from(solvedChallenges));
            updateSidebar();
        }
    }

    function safeCode(str){
        return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function closeResultsModal(){ document.getElementById('resultsModal').classList.remove('open'); }

    window.addEventListener('message', (e) => {
        const data = e.data || {};
        if (data.type === 'log') {
            const lines = (data.payload || []).map(v => String(v));
            document.getElementById('outputBox').textContent = lines.join('\n') || 'No output';
        } else if (data.type === 'testResult') {
            openResultsModal(data.results || [], (challenges[currentIndex] || {}).testCases || []);
        }
    });

    document.getElementById('runBtn').addEventListener('click', () => {
        const code = document.getElementById('codeBox').textContent;
        const globals = currentVars;
        document.getElementById('runner').contentWindow.postMessage({ type: 'run', code, globals }, '*');
    });

    function submitCurrent() {
        const ch = challenges[currentIndex]; if (!ch) return;
        const code = document.getElementById('codeBox').textContent;
        const cases = ch.testCases || [];
        const baseGlobals = currentVars;
        document.getElementById('runner').contentWindow.postMessage({ type: 'test', code, baseGlobals, cases }, '*');
    }
    document.getElementById('submitBtn').addEventListener('click', submitCurrent);
    document.getElementById('submitBtnInline').addEventListener('click', submitCurrent);

    document.getElementById('resetBtn').addEventListener('click', () => {
        if (currentIndex < 0) return;
        const ch = challenges[currentIndex];
        LS.del(kWS(ch.id));
        restoreWorkspaceOrStarter(ch);
        setCodeCollapsed(true);
    });

    document.getElementById('solveBtn').addEventListener('click', () => {
        if (currentIndex < 0) return;
        const ch = challenges[currentIndex];
        if (!ch.solution) return;
        Blockly.Events.disable();
        try{
            const dom = Blockly.utils.xml.textToDom(ch.solution);
            Blockly.Xml.clearWorkspaceAndLoadFromXml(dom, workspace);
        } finally {
            Blockly.Events.enable();
        }
        autosaveWorkspace();
        updateCode();
    });

    document.getElementById('closeResultsBtn').addEventListener('click', closeResultsModal);
    document.getElementById('resultsModal').addEventListener('click', (e) => { if (e.target.id === 'resultsModal') closeResultsModal(); });

    // prev/next handlers are registered later to respect category filtering

    document.getElementById('audioBtn').addEventListener('click', () => {
        if (currentIndex < 0) return;
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(challenges[currentIndex].audio || challenges[currentIndex].description);
        utterance.lang = 'en-US'; utterance.rate = 0.9; speechSynthesis.speak(utterance);
    });

    document.getElementById('toggleCodeBtn').addEventListener('click', () => {
        const cs = document.getElementById('codeSection');
        setCodeCollapsed(!cs.classList.contains('collapsed'));
    });
    document.getElementById('toggleCodeGlobalBtn').addEventListener('click', () => {
        const cs = document.getElementById('codeSection'); setCodeCollapsed(!cs.classList.contains('collapsed'));
    });

    document.getElementById('saveBtn').addEventListener('click', ()=>autosaveWorkspace());
    document.getElementById('restoreBtn').addEventListener('click', ()=>{
        const ch = challenges[currentIndex]; if(!ch) return; restoreWorkspaceOrStarter(ch);
    });
    document.getElementById('clearBtn').addEventListener('click', ()=>{
        const ch = challenges[currentIndex]; if(!ch) return; LS.del(kWS(ch.id)); restoreWorkspaceOrStarter(ch);
    });

    themeSelect.addEventListener('change', () => {
        document.documentElement.setAttribute('data-theme', themeSelect.value);
        LS.set(K_THEME, themeSelect.value);
        if (workspace && workspace.setTheme) workspace.setTheme(activeBlocklyTheme());
    });

    accentPicker.addEventListener('input', () => {
        const hex = accentPicker.value;
        const lighter = lightenHex(hex, 0.35);
        setCSS('--accent', hex);
        setCSS('--accent-2', lighter);
        LS.set(K_ACCENT, {hex, lighter});
        if (workspace && workspace.setTheme) workspace.setTheme(activeBlocklyTheme());
    });

    function setCSS(varName, val){ document.documentElement.style.setProperty(varName, val); }
    function lightenHex(hex, amount){
        const {h,s,l} = hexToHsl(hex);
        const nl = Math.min(100, l + amount*100);
        return hslToHex(h,s,nl);
    }
    function hexToHsl(H){
        let r=0,g=0,b=0;
        if(H.length==4){ r="0x"+H[1]+H[1]; g="0x"+H[2]+H[2]; b="0x"+H[3]+H[3]; }
        else{ r="0x"+H[1]+H[2]; g="0x"+H[3]+H[4]; b="0x"+H[5]+H[6]; }
        r/=255; g/=255; b/=255;
        const cmin=Math.min(r,g,b), cmax=Math.max(r,g,b), delta=cmax-cmin;
        let h=0,s=0,l=(cmax+cmin)/2;
        if(delta!=0){
            if(cmax==r) h=((g-b)/delta)%6;
            else if(cmax==g) h=(b-r)/delta+2;
            else h=(r-g)/delta+4;
            h=Math.round(h*60); if(h<0) h+=360;
            s= delta==0?0: delta/(1-Math.abs(2*l-1));
        }
        s=+(s*100).toFixed(1); l=+(l*100).toFixed(1);
        return {h,s,l};
    }
    function hslToHex(h,s,l){
        s/=100; l/=100;
        const k=n=> (n + h/30)%12;
        const a=s*Math.min(l,1-l);
        const f=n=> l - a*Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n),1)));
        const toHex=x=> Math.round(255*x).toString(16).padStart(2,'0');
        return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
    }

    (function bootstrap(){
        // Restore UI theme/accent
        const savedTheme = LS.get(K_THEME);
        if (savedTheme){ document.documentElement.setAttribute('data-theme', savedTheme); themeSelect.value = savedTheme; }
        const savedAccent = LS.get(K_ACCENT);
        if (savedAccent && savedAccent.hex){
            document.documentElement.style.setProperty('--accent', savedAccent.hex);
            document.documentElement.style.setProperty('--accent-2', savedAccent.lighter||savedAccent.hex);
            accentPicker.value = savedAccent.hex;
        }

        populateCategoryFilter();
        updateSidebar();
        const savedIndex = LS.get(K_CURRENT);
        const idx = (typeof savedIndex==='number' && savedIndex>=0 && savedIndex<challenges.length) ? savedIndex : 0;
        booting = true;
        loadChallenge(idx);
        booting = false;
    })();

    // override prev/next to respect filtered list
    document.getElementById('prevBtn').addEventListener('click', () => {
        const sel = LS.get('ui.category') || 'all';
        const visible = challenges.map((ch,i)=>({ch,i})).filter(({ch})=> sel==='all' || (ch.category||'').toLowerCase()===sel.toLowerCase());
        const idxInVisible = visible.findIndex(v=>v.i===currentIndex);
        if (idxInVisible > 0) loadChallenge(visible[idxInVisible-1].i);
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        const sel = LS.get('ui.category') || 'all';
        const visible = challenges.map((ch,i)=>({ch,i})).filter(({ch})=> sel==='all' || (ch.category||'').toLowerCase()===sel.toLowerCase());
        const idxInVisible = visible.findIndex(v=>v.i===currentIndex);
        if (idxInVisible >= 0 && idxInVisible < visible.length - 1) loadChallenge(visible[idxInVisible+1].i);
    });

    // Keep workspace sized
    window.addEventListener('resize', ()=>Blockly.svgResize(workspace));
}
