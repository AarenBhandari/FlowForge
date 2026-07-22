(function() {
    // Module definitions
    const modules = [
        { id: 0, title: 'Discover the Problem' },
        { id: 1, title: 'Build Your Irrigation System' },
        { id: 2, title: 'Engineering Decisions' },
        { id: 3, title: 'Simulation' },
        { id: 4, title: 'Engineering Challenges' },
        { id: 5, title: 'Optimization' },
        { id: 6, title: 'Community Proposal' }
    ];

    // Load progress from localStorage
    let progress = JSON.parse(localStorage.getItem('flowforge_progress')) || {};
    modules.forEach(m => {
        if (progress[m.id] === undefined) progress[m.id] = false;
    });

    // Save progress function
    function saveProgress() {
        localStorage.setItem('flowforge_progress', JSON.stringify(progress));
        renderModules();
        updateBadge();
    }

    // Update badge
    function updateBadge() {
        const total = modules.filter(m => progress[m.id]).length;
        const badge = document.getElementById('progressBadge');
        if (badge) badge.innerHTML = `🏆 ${total}/${modules.length}`;
    }

    // Check if module is unlocked
    function isUnlocked(idx) {
        if (idx === 0) return true;
        for (let i = 0; i < idx; i++) {
            if (!progress[i]) return false;
        }
        return true;
    }

    // Render module list
    function renderModules() {
        const container = document.getElementById('moduleContainer');
        if (!container) return;
        container.innerHTML = '';
        modules.forEach((mod, idx) => {
            const unlocked = isUnlocked(idx);
            const done = progress[idx];
            const div = document.createElement('div');
            div.className = `module-item ${!unlocked ? 'locked' : ''}`;
            div.innerHTML = `
                <span style="font-weight:600;">${idx+1}.</span>
                <span style="flex:1;">${mod.title}</span>
                <span class="badge">${done ? '✅' : (unlocked ? '🔓' : '🔒')}</span>
                <span class="progress">${done ? '100%' : (unlocked ? '0%' : 'Locked')}</span>
            `;
            if (unlocked) {
                div.addEventListener('click', function() {
                    openModule(idx);
                });
            }
            container.appendChild(div);
        });
        updateBadge();
    }

    // Open a module
    function openModule(idx) {
        const detail = document.getElementById('moduleDetail');
        const title = document.getElementById('detailTitle');
        const content = document.getElementById('detailContent');
        if (!detail || !title || !content) return;
        
        detail.style.display = 'block';
        title.innerText = `Module ${idx+1}: ${modules[idx].title}`;

        // Generate module content
        let html = '';
        switch (idx) {
            case 0:
                html = getModule0();
                break;
            case 1:
                html = getModule1();
                break;
            case 2:
                html = getModule2();
                break;
            case 3:
                html = getModule3();
                break;
            case 4:
                html = getModule4();
                break;
            case 5:
                html = getModule5();
                break;
            case 6:
                html = getModule6();
                break;
        }
        content.innerHTML = html;

        // Add complete button if not done
        if (!progress[idx]) {
            const btn = document.createElement('button');
            btn.className = 'btn-primary';
            btn.style.marginTop = '20px';
            btn.innerHTML = '✅ Mark as complete';
            btn.addEventListener('click', function() {
                progress[idx] = true;
                saveProgress();
                launchConfetti();
                openModule(idx);
            });
            content.appendChild(btn);
        } else {
            const doneMsg = document.createElement('p');
            doneMsg.style.marginTop = '20px';
            doneMsg.style.color = '#1a5cff';
            doneMsg.style.fontWeight = '600';
            doneMsg.innerHTML = '✅ Module completed! Great work!';
            content.appendChild(doneMsg);
        }

        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Module content generators
    function getModule0() {
        return `
            <p><strong>Choose a scenario:</strong></p>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0;">
                <button class="btn-outline scenario-btn" style="padding:6px 16px;">🏡 Home Garden</button>
                <button class="btn-outline scenario-btn" style="padding:6px 16px;">🏫 School Garden</button>
                <button class="btn-outline scenario-btn" style="padding:6px 16px;">🏢 Rooftop Garden</button>
                <button class="btn-outline scenario-btn" style="padding:6px 16px;">🌾 Community Farm</button>
                <button class="btn-outline scenario-btn" style="padding:6px 16px;">🌿 Greenhouse</button>
                <button class="btn-outline scenario-btn" style="padding:6px 16px;">🏜️ Drought-Prone Village</button>
            </div>
            <div id="scenarioDisplay" style="background:rgba(26,92,255,0.05);padding:16px;border-radius:20px;margin:12px 0;">
                <p><strong>Selected: Community Farm</strong></p>
                <p>💧 Available water: 200L/day · 💰 Budget: $150 · 📏 Land: 50m²</p>
                <p>⚙️ Constraints: Low water pressure, limited electricity</p>
            </div>
            <p><strong>Reflection questions:</strong></p>
            <div style="margin:12px 0;">
                <p>1. What is the most critical constraint in this scenario?</p>
                <input type="text" placeholder="Your answer..." style="width:100%;padding:10px;border-radius:20px;border:1px solid #ccc;margin:8px 0;">
                <p>2. How would you prioritize water usage?</p>
                <input type="text" placeholder="Your answer..." style="width:100%;padding:10px;border-radius:20px;border:1px solid #ccc;margin:8px 0;">
            </div>
        `;
    }

    function getModule1() {
        return `
            <p><strong>Drag & drop components onto the canvas to build your system:</strong></p>
            <div class="builder-area">
                <div class="parts-pool">
                    <span class="part" draggable="true">Reservoir</span>
                    <span class="part" draggable="true">PVC Tubing</span>
                    <span class="part" draggable="true">Valve</span>
                    <span class="part" draggable="true">Moisture Sensor</span>
                    <span class="part" draggable="true">Controller</span>
                    <span class="part" draggable="true">Plant</span>
                    <span class="part" draggable="true">Water Tank</span>
                </div>
                <div class="canvas" id="dropCanvas">
                    <span style="opacity:0.4;width:100%;text-align:center;">Drop components here</span>
                </div>
            </div>
            <p style="background:rgba(26,92,255,0.08);padding:12px;border-radius:16px;">
                💡 <strong>Hint:</strong> Reservoir → PVC Tubing → Valve → Controller → Plant
            </p>
            <p id="connectionStatus" style="margin-top:12px;font-weight:500;">Components placed: 0/5</p>
        `;
    }

    function getModule2() {
        return `
            <p><strong>Adjust sliders to optimize your system's performance:</strong></p>
            <div class="slider-group" style="display:flex; flex-direction:column; gap:20px;">
                
                <div class="slider-item">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <label style="font-weight:600;">📐 Reservoir Height (Elevation)</label>
                        <span style="font-weight:700; color:#1a5cff;">1.0m</span>
                    </div>
                    <input type="range" min="0.5" max="1.5" step="0.1" value="1.0" oninput="this.previousElementSibling.querySelector('span').textContent = this.value + 'm'">
                    <p style="font-size:0.85rem; margin-top:4px; color:#555;">
                        <strong>💡 How it works:</strong> How high the water tank is off the ground.<br>
                        <strong>🎯 Goal:</strong> <span style="color:#1a5cff; font-weight:600;">Aim High / Maximum</span> — Higher height creates stronger gravity pressure, so water flows down faster without pumps!
                    </p>
                </div>

                <div class="slider-item">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <label style="font-weight:600;">🥤 Tubing Diameter (Pipe Width)</label>
                        <span style="font-weight:700; color:#1a5cff;">6mm</span>
                    </div>
                    <input type="range" min="4" max="8" step="1" value="6" oninput="this.previousElementSibling.querySelector('span').textContent = this.value + 'mm'">
                    <p style="font-size:0.85rem; margin-top:4px; color:#555;">
                        <strong>💡 How it works:</strong> How wide or thick the inside of the pipe is.<br>
                        <strong>🎯 Goal:</strong> <span style="color:#1a5cff; font-weight:600;">Aim Wide / Larger</span> — Wider pipes let water flow easily with less friction (like drinking through a wide boba straw!).
                    </p>
                </div>

                <div class="slider-item">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <label style="font-weight:600;">🌱 Moisture Threshold (Soil Sensor Target)</label>
                        <span style="font-weight:700; color:#1a5cff;">Medium</span>
                    </div>
                    <input type="range" min="0" max="2" step="1" value="1" oninput="const v=['Low','Medium','High'];this.previousElementSibling.querySelector('span').textContent=v[this.value]">
                    <p style="font-size:0.85rem; margin-top:4px; color:#555;">
                        <strong>💡 How it works:</strong> How wet the soil must be before the valve turns off.<br>
                        <strong>🎯 Goal:</strong> <span style="color:#1a5cff; font-weight:600;">Keep Balanced (Medium)</span> — Low starves the plants; High wastes water and floods roots.
                    </p>
                </div>

                <div class="slider-item">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <label style="font-weight:600;">🚰 Tank Size (Water Capacity)</label>
                        <span style="font-weight:700; color:#1a5cff;">Medium</span>
                    </div>
                    <input type="range" min="0" max="2" step="1" value="1" oninput="const v=['Small','Medium','Large'];this.previousElementSibling.querySelector('span').textContent=v[this.value]">
                    <p style="font-size:0.85rem; margin-top:4px; color:#555;">
                        <strong>💡 How it works:</strong> Total water stored in the reservoir.<br>
                        <strong>🎯 Goal:</strong> <span style="color:#1a5cff; font-weight:600;">Match Farm Size</span> — Bigger tanks store water longer during dry spells, but cost more and take up space.
                    </p>
                </div>

            </div>

            <div style="background:rgba(26,92,255,0.05);padding:16px;border-radius:20px;margin-top:16px;">
                <p><strong>📊 Predicted Performance:</strong></p>
                <p>💧 Water Efficiency: <span style="color:#1a5cff;font-weight:700;">82%</span> <small style="color:#666;">(Percentage of water actually used by plants vs wasted)</small></p>
                <p>⚡ Flow Rate: <span style="color:#1a5cff;font-weight:700;">2.4 L/min</span> <small style="color:#666;">(How much water reaches crops per minute)</small></p>
                <p>⏲️ Pressure: <span style="color:#1a5cff;font-weight:700;">1.8 bar</span> <small style="color:#666;">(Water force created by gravity pushing down)</small></p>
            </div>
        `;
    }

    function getModule3() {
        return `
            <p><button class="btn-primary" id="runSimBtn"><i class="fas fa-play"></i> Run Simulation</button></p>
            <div id="simResults" style="display:none;">
                <div class="sim-result">
                    <div class="stat-card"><span class="number">48</span> L Water Used</div>
                    <div class="stat-card"><span class="number">32</span> L Saved</div>
                    <div class="stat-card"><span class="number">94</span> % Growth</div>
                    <div class="stat-card"><span class="number">0.88</span> Reliability</div>
                </div>
                <div class="chart-container"><canvas id="simChart"></canvas></div>
                <p style="background:rgba(26,92,255,0.08);padding:12px;border-radius:16px;margin-top:12px;">
                    <strong>🔍 Analysis:</strong> The gravity-fed system achieved 48% water savings compared to traditional irrigation. The moisture sensor optimization reduced water waste by 32%.
                </p>
            </div>
        `;
    }

    function getModule4() {
        return `
            <p><strong>Redesign your system for different objectives:</strong></p>
            <div style="display:flex;flex-wrap:wrap;gap:12px;margin:16px 0;">
                <button class="btn-outline challenge-btn" style="padding:8px 20px;">💰 Lowest Cost</button>
                <button class="btn-outline challenge-btn" style="padding:8px 20px;">💧 Highest Efficiency</button>
                <button class="btn-outline challenge-btn" style="padding:8px 20px;">🔧 Low Maintenance</button>
                <button class="btn-outline challenge-btn" style="padding:8px 20px;">⚡ No Electricity</button>
                <button class="btn-outline challenge-btn" style="padding:8px 20px;">🌱 Urban Gardening</button>
            </div>
            <div id="challengeDisplay" style="background:rgba(26,92,255,0.05);padding:16px;border-radius:20px;">
                <p><strong>Current Challenge: Lowest Cost</strong></p>
                <p>Constraints: Budget < $100, must serve 20m²</p>
                <p>Your score: <span style="color:#1a5cff;font-weight:700;font-size:1.5rem;">85</span>/100</p>
                <p style="margin-top:8px;">💡 Trade-off: Reducing cost by 20% decreases efficiency by 15%</p>
            </div>
        `;
    }

    function getModule5() {
        return `
            <p><strong>Compare your design versions:</strong></p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin:16px 0;">
                <div style="background:rgba(26,92,255,0.05);padding:16px;border-radius:16px;">
                    <h4>Version 1</h4>
                    <p>💧 Efficiency: 72%</p>
                    <p>💰 Cost: $120</p>
                    <p>⚙️ Complexity: Medium</p>
                </div>
                <div style="background:rgba(26,92,255,0.1);padding:16px;border-radius:16px;border:2px solid #1a5cff;">
                    <h4>Version 2 ⭐</h4>
                    <p>💧 Efficiency: 91%</p>
                    <p>💰 Cost: $180</p>
                    <p>⚙️ Complexity: High</p>
                </div>
                <div style="background:rgba(26,92,255,0.05);padding:16px;border-radius:16px;">
                    <h4>Version 3</h4>
                    <p>💧 Efficiency: 78%</p>
                    <p>💰 Cost: $90</p>
                    <p>⚙️ Complexity: Low</p>
                </div>
            </div>
            <div style="background:rgba(26,92,255,0.05);padding:16px;border-radius:20px;">
                <p><strong>⚖️ Trade-off Analysis:</strong></p>
                <p>Version 2 offers the best efficiency but costs 50% more than Version 3. Version 3 is ideal for budget-constrained projects.</p>
            </div>
        `;
    }

    function getModule6() {
        return `
            <div class="proposal-form">
                <label>📝 What water problem did you identify?</label>
                <input type="text" placeholder="e.g., water scarcity in community farm during dry season" id="proposal1">
                <label>🌍 Why does it matter?</label>
                <textarea placeholder="Explain the environmental, social, or economic impact..." id="proposal2"></textarea>
                <label>🔧 Describe your engineering solution.</label>
                <textarea placeholder="Detail your gravity-fed irrigation system with sensors..." id="proposal3"></textarea>
                <label>⚖️ What trade-offs did you consider?</label>
                <textarea placeholder="Cost vs. efficiency, maintenance vs. reliability..." id="proposal4"></textarea>
                <label>🚀 How would you improve it?</label>
                <textarea placeholder="Future enhancements like solar pumping or AI monitoring..." id="proposal5"></textarea>
                <button class="btn-primary" style="width:100%;margin-top:8px;" id="exportPDF"><i class="fas fa-file-pdf"></i> Export as PDF</button>
            </div>
        `;
    }

    // Confetti effect
    function launchConfetti() {
        const colors = ['#1a5cff', '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bff'];
        for (let i = 0; i < 100; i++) {
            const el = document.createElement('div');
            el.style.cssText = `
                position:fixed;pointer-events:none;z-index:9999;
                width:${Math.random()*8+4}px;height:${Math.random()*8+4}px;
                background:${colors[Math.floor(Math.random()*colors.length)]};
                border-radius:${Math.random()>0.5 ? '50%' : '2px'};
                left:${Math.random()*100}vw;top:-10px;
                transition:all ${Math.random()*2+1.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            `;
            document.body.appendChild(el);
            setTimeout(() => {
                el.style.transform = `translateY(${window.innerHeight+20}px) rotate(${Math.random()*720}deg)`;
                el.style.opacity = '0';
            }, 20);
            setTimeout(() => el.remove(), 3500);
        }
    }

    // --- Event Listeners ---

    // Theme toggle
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark');
            });
        }

        // Start Learning button
        const startBtn = document.getElementById('startLearning');
        if (startBtn) {
            startBtn.addEventListener('click', function() {
                document.getElementById('moduleContainer').scrollIntoView({ behavior: 'smooth' });
                const firstIncomplete = modules.findIndex(m => !progress[m.id]);
                const idx = firstIncomplete >= 0 ? firstIncomplete : 0;
                if (isUnlocked(idx)) {
                    openModule(idx);
                } else {
                    openModule(0);
                }
            });
        }

        // Drag and Drop for Module 1
        document.addEventListener('dragstart', function(e) {
            if (e.target.classList.contains('part') && e.target.closest('.parts-pool')) {
                e.dataTransfer.setData('text/plain', e.target.innerText);
            }
        });

        document.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        document.addEventListener('drop', function(e) {
            const canvas = document.getElementById('dropCanvas');
            if (canvas && canvas.contains(e.target)) {
                e.preventDefault();
                const text = e.dataTransfer.getData('text/plain');
                if (text) {
                    const existing = canvas.querySelectorAll('.part');
                    if (existing.length < 5) {
                        const span = document.createElement('span');
                        span.className = 'part';
                        span.innerText = text;
                        canvas.appendChild(span);

                        const parts = canvas.querySelectorAll('.part').length;
                        const status = document.getElementById('connectionStatus');
                        if (status) {
                            status.textContent = `Components placed: ${parts}/5`;
                            if (parts >= 5) {
                                status.innerHTML = '✅ Complete! All components placed correctly!';
                                status.style.color = '#1a5cff';
                            }
                        }
                    } else {
                        alert('You already placed all 5 components!');
                    }
                }
            }
        });

        // Run Simulation button (Module 3)
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('#runSimBtn');
            if (btn) {
                const results = document.getElementById('simResults');
                if (results) {
                    results.style.display = 'block';
                    setTimeout(function() {
                        const ctx = document.getElementById('simChart');
                        if (ctx) {
                            new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ['Water Used', 'Water Saved', 'Growth', 'Reliability'],
                                    datasets: [{
                                        label: 'Performance Metrics',
                                        data: [48, 32, 94, 88],
                                        backgroundColor: ['#1a5cff', '#4d8aff', '#7aadff', '#b0c8f0'],
                                        borderRadius: 8
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    plugins: {
                                        legend: { display: false }
                                    },
                                    scales: {
                                        y: { beginAtZero: true, max: 100 }
                                    }
                                }
                            });
                        }
                    }, 100);
                }
            }
        });

        // Scenario buttons (Module 0)
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.scenario-btn');
            if (btn) {
                const display = document.getElementById('scenarioDisplay');
                if (display) {
                    const name = btn.textContent.trim();
                    const scenarios = {
                        '🏡 Home Garden': { water: 150, budget: 100, land: 30, constraint: 'Limited space' },
                        '🏫 School Garden': { water: 200, budget: 120, land: 40, constraint: 'Student access' },
                        '🏢 Rooftop Garden': { water: 100, budget: 80, land: 20, constraint: 'Weight limits' },
                        '🌾 Community Farm': { water: 300, budget: 200, land: 80, constraint: 'Shared resources' },
                        '🌿 Greenhouse': { water: 250, budget: 180, land: 60, constraint: 'Temperature control' },
                        '🏜️ Drought-Prone Village': { water: 80, budget: 60, land: 25, constraint: 'Water scarcity' }
                    };
                    const data = scenarios[name] || scenarios['🌾 Community Farm'];
                    display.innerHTML = `
                        <p><strong>Selected: ${name}</strong></p>
                        <p>💧 Available water: ${data.water}L/day · 💰 Budget: $${data.budget} · 📏 Land: ${data.land}m²</p>
                        <p>⚙️ Constraints: ${data.constraint}</p>
                    `;
                }
            }
        });

        // Challenge buttons (Module 4)
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.challenge-btn');
            if (btn) {
                const display = document.getElementById('challengeDisplay');
                if (display) {
                    const name = btn.textContent.trim();
                    const scores = {
                        '💰 Lowest Cost': 85,
                        '💧 Highest Efficiency': 92,
                        '🔧 Low Maintenance': 78,
                        '⚡ No Electricity': 70,
                        '🌱 Urban Gardening': 88
                    };
                    const score = scores[name] || 80;
                    const tradeoffs = [
                        'Cost vs. efficiency',
                        'Maintenance vs. reliability',
                        'Complexity vs. performance',
                        'Size vs. capacity',
                        'Power vs. sustainability'
                    ];
                    display.innerHTML = `
                        <p><strong>Current Challenge: ${name}</strong></p>
                        <p>Constraints: ${['Budget < $100', 'Efficiency > 85%', 'Maintenance < 2hrs/month', 'No grid power', 'Space < 30m²'][Math.floor(Math.random()*5)]}</p>
                        <p>Your score: <span style="color:#1a5cff;font-weight:700;font-size:1.5rem;">${score}</span>/100</p>
                        <p style="margin-top:8px;">💡 Trade-off: ${tradeoffs[Math.floor(Math.random()*tradeoffs.length)]}</p>
                    `;
                }
            }
        });

        // PDF Export (Module 6)
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('#exportPDF');
            if (btn) {
                const p1 = document.getElementById('proposal1')?.value || 'Not specified';
                const p2 = document.getElementById('proposal2')?.value || 'Not specified';
                const p3 = document.getElementById('proposal3')?.value || 'Not specified';
                const p4 = document.getElementById('proposal4')?.value || 'Not specified';
                const p5 = document.getElementById('proposal5')?.value || 'Not specified';

                const proposal = `
        ================================================
        FLOWFORGE - COMMUNITY ENGINEERING PROPOSAL
        ================================================

        1. Water Problem Identified:
        ${p1}

        2. Why It Matters:
        ${p2}

        3. Engineering Solution:
        ${p3}

        4. Trade-offs Considered:
        ${p4}

        5. Future Improvements:
        ${p5}

        ================================================
        Generated by FlowForge · STEM for Indonesia
        ================================================
                `;

                const blob = new Blob([proposal], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'FlowForge_Proposal.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                alert('✅ Your proposal has been downloaded as a text file!');
            }
        });

        // Initialize
        renderModules();
    });
})();
