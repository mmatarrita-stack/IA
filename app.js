/**
 * SMART MEMORY - PROTOCOLO INVIAS
 * Logic & Bridge for NotebookLM Integration
 * DATA SOURCE: MEPI-MN1-IN (Manual de Estándares de Procesos de Interventoría)
 */

const PROCEDURE_INDEX = {
    "inicio": {
        id: "inicio",
        title: "Inicio de ejecución: Obra e Interventoría",
        source_id: "MEPI-MN1-IN-1",
        summary: "Procedimiento que establece requisitos previos (garantías, RP) y actos administrativos iniciales. La Reunión Técnica Inicial (RTI) es el hito clave.",
        checklist: [
            { step: "Suscripción Orden de Inicio Interventoría (FR-1)", evidence: "SECOP II", responsible: "Unidad Ejecutora", citation: "MEPI-MN1-IN-1-FR-1: No puede iniciar después del contrato de obra." },
            { step: "Suscripción Orden de Inicio Obra (FR-2)", evidence: "SECOP II", responsible: "Unidad Ejecutora", citation: "MEPI-MN1-IN-1-FR-2: No puede iniciar antes que la interventoría." },
            { step: "Visita Conjunta Previa al Sitio", evidence: "Registro Foto/Video", responsible: "Contratista/Int", citation: "Inspección técnica de condiciones iniciales del proyecto." },
            { step: "Reunión Técnica Inicial (Máx 3 días hábiles)", evidence: "Acta FR-3", responsible: "Dirección Territorial", citation: "MEPI-MN1-IN-1-FR-3: Consignar compromisos de cumplimiento (Máx 8 días)." }
        ],
        graph: `graph TD
            RP[Registro Presupuestal] --> G[Aprobación Garantías]
            G --> OII[Orden Inicio Interventoría]
            OII --> OIO[Orden Inicio Obra]
            OIO --> VIS[Visita Conjunta Sitio]
            VIS --> RTI[Reunión Técnica Inicial]
            RTI --> COM[Cumplimiento Compromisos]
            click RTI call app.showDocs("inicio")
            click OII call app.showDocs("inicio")
            click OIO call app.showDocs("inicio")`
    },
    "apu": {
        id: "apu",
        title: "Análisis de Precios Unitarios (APU) e Ítems no Previstos",
        source_id: "MEPI-MN1-IN-10",
        summary: "Gestión de precios y trámite para aprobación de ítems no previstos. Prohíbe ejecución sin acta suscrita (FR-4).",
        checklist: [
            { step: "Carpeta Foliada de Solicitud", evidence: "Justificación T/E/J", responsible: "Contratista", citation: "Incluir necesidad del ítem, impacto en metas e impacto ambiental/social." },
            { step: "Presentación de 3 Cotizaciones", evidence: "Soportes de Zona", responsible: "Contratista", citation: "Proveedores autorizados de la zona del proyecto o más cercana." },
            { step: "Suscripción Acta de Fijación (FR-4)", evidence: "Formato FR-4", responsible: "Interventoría/DT", citation: "MEPI-MN1-IN-10-FR-4: Documento obligatorio previo a la ejecución." },
            { step: "Trámite de Modificación Contractual", evidence: "Minuta", responsible: "Unidad Ejecutora", citation: "Requerido si el nuevo ítem afecta valor o metas del contrato." }
        ],
        graph: `graph TD
            SOL[Solicitud Contratista] --> JUS[Justificación T/E/J]
            JUS --> COT[3 Cotizaciones]
            COT --> APU[Análisis APU FR-1]
            APU --> AF[Acta de Fijación FR-4]
            AF --> MOD[Modificación Contractual]
            click AF call app.showDocs("apu")
            click APU call app.showDocs("apu")`
    },
    "suspension": {
        id: "suspension",
        title: "Suspensión y Reanudación",
        source_id: "MEPI-MN1-IN-11",
        summary: "Interrupciones por fuerza mayor o interés público. Requiere firma digital en SECOP II y actualización de garantías.",
        checklist: [
            { step: "Suscripción Acta de Suspensión (FR-1/FR-2)", evidence: "SECOP II", responsible: "Unidad Ejecutora", citation: "MEPI-MN1-IN-11-FR-1: Obra e Interventoría se suspenden simultáneamente." },
            { step: "Publicación y Firma en SECOP II", evidence: "Estado: Suspendido", responsible: "Gestor", citation: "La fecha que prima es la indicada en la plataforma SECOP II." },
            { step: "Suscripción Acta de Reanudación (FR-3/FR-4)", evidence: "SECOP II", responsible: "Unidad Ejecutora", citation: "MEPI-MN1-IN-11-FR-3: Reanudación de actividades contractuales." },
            { step: "Actualización de Garantías (3 días hábiles)", evidence: "Certificado G.U.", responsible: "Contratista", citation: "Obligatorio tras definir nueva fecha de vencimiento post-reanudación." }
        ],
        graph: `graph TD
            CAU[Causal: Fuerza Mayor] --> ACT[Acta de Suspensión]
            ACT --> SEC[Firma SECOP II]
            SEC --> SUS[Período Suspendido]
            SUS --> REA[Acta Reanudación]
            REA --> GUA[Actualización Garantías]
            click ACT call app.showDocs("suspension")
            click REA call app.showDocs("suspension")`
    },
    "adicion": {
        id: "adicion",
        title: "Adición, Modificación y Prórroga",
        source_id: "MEPI-MN1-IN-12 / IN-13",
        summary: "Trámite presupuestal o de tiempo. Solicitud mínima 30 días antes del vencimiento ante Comité de Contratación.",
        checklist: [
            { step: "Solicitud con Soportes (30 días antes)", evidence: "Formato FR-1", responsible: "Contratista", citation: "MEPI-MN1-IN-12-FR-1: Antelación mínima obligatoria al vencimiento." },
            { step: "Estudio de Viabilidad (Interventoría)", evidence: "Concepto Técnico", responsible: "Interventoría", citation: "Revisión de aspectos técnicos, jurídicos y financieros." },
            { step: "Aprobación Comité de Contratación", evidence: "Acta de Comité", responsible: "Comité INVÍAS", citation: "Instancia única de aprobación para modificaciones sustanciales." },
            { step: "Legalización de Minuta Contractual", evidence: "Suscripción", responsible: "Unidad Ejecutora", citation: "La modificación no es ejecutable sin legalización previa." }
        ],
        graph: `graph TD
            SOL[Solicitud 30 días antes] --> EST[Estudio Interventoría]
            EST --> COM[Comité de Contratación]
            COM --> APR[Aprobación]
            APR --> MIN[Suscripción Minuta]
            MIN --> LEG[Legalización]`
    },
    "informes": {
        id: "informes",
        title: "Informes Semanales y Mensuales",
        source_id: "MEPI-MN1-IN-15",
        summary: "Seguimiento periódico del avance. El informe mensual es requisito indispensable para el pago.",
        checklist: [
            { step: "Informe Semanal (Corte Jueves)", evidence: "Formato FR-3", responsible: "Interventoría", citation: "MEPI-MN1-IN-15-FR-3: Reporte de avance físico y financiero semanal." },
            { step: "Lista de Chequeo Mensual (Pág 1)", evidence: "Formato FR-1", responsible: "Interventoría", citation: "MEPI-MN1-IN-15-FR-1: Primera página obligatoria del informe." },
            { step: "Personal y Seguridad Social (FR-6/7)", evidence: "Planillas/Nómina", responsible: "Int/Obra", citation: "Control de aportes legales y nómina electrónica del personal." },
            { step: "Radicación para Pago Mensual", evidence: "Medio Magnético", responsible: "Unidad Ejecutora", citation: "La presentación completa es requisito para autorizar el pago." }
        ],
        graph: `graph TD
            SEM[Informe Semanal] --> COR[Corte Jueves]
            COR --> MEN[Informe Mensual]
            MEN --> LCH[Lista Chequeo FR-1]
            LCH --> PAG[Autorización de Pago]`
    },
    "recibo": {
        id: "recibo",
        title: "Recibo Definitivo y Liquidación",
        source_id: "MEPI-MN1-IN-16",
        summary: "Proceso de cierre contractual. Incluye visita previa (30 días antes) y acta de recibo definitivo. Define consecuencias por incumplimiento de correcciones.",
        checklist: [
            { step: "Visita Previa (30 días antes del vencimiento)", evidence: "Acta de Visita", responsible: "Interventoría/DT", citation: "MEPI-MN1-IN-16: Identificación de pendientes y compromisos de corrección." },
            { step: "Verificación de Correcciones Técnicas", evidence: "Informe de Seguimiento", responsible: "Interventoría", citation: "El contratista debe atender observaciones antes del recibo definitivo." },
            { step: "Suscripción Acta de Recibo Definitivo", evidence: "Formato FR-1", responsible: "Unidad Ejecutora", citation: "MEPI-MN1-IN-16-FR-1: Documento de cierre de obligaciones de obra." },
            { step: "Liquidación del Contrato", evidence: "Acta de Liquidación", responsible: "Unidad Ejecutora", citation: "Cruce de cuentas final y liberación de saldos remanentes." }
        ],
        graph: `graph TD
            VP[Visita Previa -30 días] --> COR[Correcciones Técnicas]
            COR --> RD[Recibo Definitivo FR-1]
            RD --> LIQ[Liquidación Final]
            VP -- No Cumple --> PAS[Proceso Sancionatorio]
            VP -- No Cumple --> DES[Descuento Económico]
            click VP call app.showDocs("recibo")
            click COR call app.showDocs("recibo")
            click RD call app.showDocs("recibo")
            click LIQ call app.showDocs("recibo")
            click PAS call app.showDocs("recibo")
            click DES call app.showDocs("recibo")`
    }
};

const KNOWLEDGE_BASE = [
    {
        id: "kb-inicio",
        keywords: ["inicio", "orden", "rti", "reunion tecnica", "visita previa", "compromisos"],
        responseContent: "El procedimiento para el inicio de ejecución (`MEPI-MN1-IN-1`) exige la sincronización estricta entre Obra e Interventoría. La **Reunión Técnica Inicial (RTI)** es el hito obligatorio que debe ocurrir máximo a los 3 días hábiles de la orden de inicio. Previo a esto, es imperativo realizar una **visita conjunta al sitio** con registro fotográfico y de video referenciado (PR, fecha). Los compromisos técnicos resultantes deben atenderse en un plazo no mayor a 8 días hábiles.",
        evidence: [
            { source_id: "MEPI-MN1-IN-1", source_name: "Instructivo Inicio Ejecución", snippet: "La ejecución del contrato de obra no debe iniciarse con anterioridad a la orden de inicio del contrato de interventoría." },
            { source_id: "MEPI-MN1-IN-1", source_name: "Instructivo Inicio Ejecución", snippet: "Máximo dentro de los tres (3) días hábiles siguientes se debe realizar una reunión técnica... Previa se debe efectuar una visita conjunta al sitio... realizando videos y fotografías referenciados." },
            { source_id: "MEPI-MN1-IN-1", source_name: "Instructivo Inicio Ejecución", snippet: "Establecer los plazos para su cumplimiento teniendo en cuenta, en todo caso, un plazo máximo de ocho (8) días hábiles." }
        ],
        location: "Sección IX: Acta de Reunión Técnica Inicial | Sección VI: Orden de Inicio",
        tags: ["RTI", "Visita Conjunta", "Sincronización"]
    },
    {
        id: "kb-apu",
        keywords: ["apu", "no previsto", "items", "cotizaciones", "precios", "fijacion"],
        responseContent: "Para la aprobación de **Ítems No Previstos** bajo el `MEPI-MN1-IN-10`, el interventor tiene prohibido permitir ejecuciones sin la suscripción previa del **Acta de Fijación (FR-4)**. La solicitud requiere una carpeta foliada con: 1) Justificación Técnica/Económica/Jurídica, 2) Tres cotizaciones de la zona o la más cercana, y 3) Análisis comparativo con precios de referencia de la web de INVIAS.",
        evidence: [
            { source_id: "MEPI-MN1-IN-10", source_name: "Instructivo APU", snippet: "El Interventor no debe permitir la ejecución de actividades correspondientes a ítems no previstos, sin la suscripción del formato MEPI-MN1-IN-10-FR-4." },
            { source_id: "MEPI-MN1-IN-10", source_name: "Instructivo APU", snippet: "Tres (3) cotizaciones de los nuevos insumos... obtenidas en la zona del proyecto o en su defecto en la zona más cercana." },
            { source_id: "MEPI-MN1-IN-10", source_name: "Instructivo APU", snippet: "Si el precio acordado resultare ser mayor al establecido en la página WEB del INVIAS, el Interventor debe presentar por escrito la justificación." }
        ],
        location: "Sección VII: Acta de Fijación | Sección VIII: Procedimiento",
        tags: ["FR-4", "Cotizaciones", "Justificación"]
    },
    {
        id: "kb-suspension",
        keywords: ["suspension", "reanudacion", "secop", "garantias", "plazo"],
        responseContent: "La **Suspensión** de un contrato (`MEPI-MN1-IN-11`) solo es procedente por fuerza mayor, caso fortuito o interés público. Un punto crítico es que la suspensión de interventoría implica la **suspensión simultánea** de la obra. La validez legal depende de la firma en **SECOP II**, cuya fecha prima sobre el formato físico. Tras la reanudación, el contratista tiene solo 3 días hábiles para actualizar las garantías.",
        evidence: [
            { source_id: "MEPI-MN1-IN-11", source_name: "Instructivo Suspensión", snippet: "La suspensión del contrato de interventoría conlleva a la suspensión simultánea del contrato de obra." },
            { source_id: "MEPI-MN1-IN-11", source_name: "Instructivo Suspensión", snippet: "Prima la fecha indicada en la plataforma [SECOP II] sobre la señalada en el formato." },
            { source_id: "MEPI-MN1-IN-11", source_name: "Instructivo Suspensión", snippet: "Dentro de los tres (3) días hábiles siguientes a la fecha de reanudación... obligan a presentar para su aprobación los certificados de modificación de la garantía única." }
        ],
        location: "Sección III: Generalidades | Sección IV: Acta de Suspensión",
        tags: ["SECOP II", "Garantías", "Simultaneidad"]
    },
    {
        id: "kb-recibo",
        keywords: ["recibo", "definitivo", "visita previa", "pendiente", "planos record", "sancionatorio", "entrega"],
        responseContent: "El proceso de **Recibo Definitivo** (`MEPI-MN1-IN-16`) se activa con una **Visita Previa** obligatoria (mínimo 30 días antes del vencimiento). Si el contratista no atiende los pendientes de esta visita, el interventor debe recibir la obra 'en el estado en que se encuentre', cuantificar lo no ejecutado para descuento en el acta final e iniciar el Proceso Administrativo Sancionatorio (P.A.S.).",
        evidence: [
            { source_id: "MEPI-MN1-IN-16", source_name: "Visita y Recibo Definitivo", snippet: "Con una antelación mínima de treinta (30) días calendario... la Interventoría debe realizar visita conjunta... con el fin de inspeccionar el estado." },
            { source_id: "MEPI-MN1-IN-16", source_name: "Visita y Recibo Definitivo", snippet: "Si las observaciones... no son atendidos... el Interventor debe proceder a efectuar el recibo definitivo de las obras en el estado en que se encuentren." },
            { source_id: "MEPI-MN1-IN-16", source_name: "Visita y Recibo Definitivo", snippet: "Circunstancia que dará lugar a la aplicación de los procedimientos administrativos sancionatorios y a la cuantificación de las obras no corregidas... deben ser descontadas." }
        ],
        location: "Sección IV: Visita Previa | Sección V: Entrega y Recibo Definitivo",
        tags: ["P.A.S.", "Visita Previa", "Estado Actual"]
    },
    {
        id: "kb-firma-negacion",
        keywords: ["firma", "negacion", "negación", "negativa", "niega", "rechazo", "acta", "suscribirla"],
        responseContent: "Ante la **negación de firma** de un acta (especialmente la de Recibo Definitivo), el Interventor tiene la obligación de **suscribirla de todas formas**. Es imperativo dejar constancia escrita de la citación previa realizada al contratista y de su negativa expresa o tácita a firmar. Si esto ocurre en la fase de liquidación, se faculta al INVÍAS para proceder con la **Liquidación Unilateral** del contrato.",
        evidence: [
            { source_id: "MEPI-MN1-IN-16", source_name: "Visita y Recibo Definitivo", snippet: "En caso de que el contratista se niegue a firmar el acta, el Interventor debe proceder en todo caso a suscribirla, dejando constancia de la citación y la negativa." },
            { source_id: "MEPI-Manual", source_name: "Manual de Contratación", snippet: "Si el contratista no asiste a la diligencia de liquidación o se niega a suscribir el acta, la entidad estatal la liquidará unilateralmente mediante acto administrativo motivado." }
        ],
        location: "MEPI-MN1-IN-16 Sección V | Manual de Contratación INVÍAS Section 11.1",
        tags: ["Negación de Firma", "Liquidación Unilateral", "Constancia"]
    }
];

const app = {
    currentProcedure: null,
    lastAction: null,

    init() {
        console.log("Smart Memory Initializing...");
        mermaid.initialize({
            startOnLoad: true,
            theme: 'neutral',
            securityLevel: 'loose',
            themeVariables: {
                primaryColor: '#0d9488',
                primaryTextColor: '#fff',
                primaryBorderColor: '#0f172a',
                lineColor: '#64748b',
                secondaryColor: '#f1f5f9',
                tertiaryColor: '#fff'
            }
        });
        this.renderProcedures();
        this.setupEventListeners();
        this.renderGraph(PROCEDURE_INDEX['inicio'].graph);
        this.updateDetailsPanel('inicio');
    },

    renderProcedures() {
        const list = document.getElementById('procedure-list');
        list.innerHTML = '';
        Object.values(PROCEDURE_INDEX).forEach(proc => {
            const li = document.createElement('li');
            li.className = 'procedure-item';
            li.innerHTML = `
                <div class="title">${proc.title}</div>
                <div class="procedure-actions">
                    <span class="action-icon" title="Checklist" onclick="event.stopPropagation(); app.showChecklist('${proc.id}')">📋</span>
                    <span class="action-icon" title="Grafo" onclick="event.stopPropagation(); app.selectProcedure('${proc.id}')">🕸️</span>
                </div>
            `;
            li.onclick = () => this.selectProcedure(proc.id);
            list.appendChild(li);
        });
    },

    setupEventListeners() {
        document.getElementById('send-btn').onclick = () => this.handleUserInput();
        document.getElementById('user-input').onkeypress = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserInput();
            }
        };
        document.getElementById('btn-export').onclick = () => this.exportHistory();
        document.getElementById('global-search').onkeypress = (e) => {
            if (e.key === 'Enter') {
                this.simulateBotResponse(e.target.value);
                e.target.value = '';
            }
        };
        document.querySelector('.close-modal').onclick = () => {
            document.getElementById('checklist-modal').style.display = 'none';
        };
        window.onclick = (e) => {
            if (e.target.className === 'modal') e.target.style.display = 'none';
        };
        document.getElementById('btn-csv').onclick = () => this.exportToCSV();
    },

    selectProcedure(id) {
        const proc = PROCEDURE_INDEX[id];
        this.currentProcedure = proc;

        document.getElementById('current-procedure-title').innerText = proc.title;
        document.getElementById('current-procedure-subtitle').innerText = "Manual: " + proc.source_id;

        document.querySelectorAll('.procedure-item').forEach(el => el.classList.remove('active'));
        const activeItems = [...document.querySelectorAll('.procedure-item')];
        const activeItem = activeItems.find(el => el.querySelector('.title').innerText === proc.title);
        if (activeItem) activeItem.classList.add('active');

        this.renderGraph(proc.graph);
        this.updateDetailsPanel(id);
    },

    updateDetailsPanel(id) {
        const proc = PROCEDURE_INDEX[id];
        const container = document.getElementById('entity-details');

        let html = `
            <div class="detail-card animate-fade-in" style="border-top: 4px solid var(--secondary)">
                <h4>${proc.title}</h4>
                <p style="margin-bottom: 15px;">${proc.summary}</p>
                <div class="detail-links">
                    <button class="btn btn-secondary" style="width: 100%; margin-bottom: 8px;" onclick="app.showChecklist('${proc.id}')">📋 Checklist Detallado</button>
                    <button class="btn btn-primary" style="width: 100%;" onclick="app.exportToCSV()">📥 Guía Técnica (CSV)</button>
                </div>
            </div>
            <div class="detail-card animate-fade-in" style="margin-top: 15px;">
                <h4 style="color: var(--text-muted); font-size: 0.75rem;">REFERENCIAS TÉCNICAS</h4>
                <div style="font-size: 0.85rem; line-height: 1.8;">
                    <div><strong>Manual:</strong> <span class="form-link-tag">${proc.source_id}</span></div>
                    <div><strong>Fuente:</strong> Protocolo Integral</div>
                </div>
            </div>
        `;
        container.innerHTML = html;
    },

    renderGraph(definition) {
        const container = document.getElementById('mermaid-graph');
        container.innerHTML = definition;
        container.removeAttribute('data-processed');
        mermaid.contentLoaded();
    },

    showChecklist(id) {
        const proc = PROCEDURE_INDEX[id];
        document.getElementById('checklist-title').innerText = "Checklist: " + proc.title;
        const tbody = document.getElementById('checklist-body');
        tbody.innerHTML = '';

        proc.checklist.forEach((item, index) => {
            const tr = document.createElement('tr');
            const saved = localStorage.getItem(`check-${id}-${index}`) === 'true';
            tr.innerHTML = `
                <td><input type="checkbox" ${saved ? 'checked' : ''} onchange="app.saveCheck('${id}', ${index}, this.checked)"></td>
                <td>${item.step}</td>
                <td>${item.responsible}</td>
                <td>${item.evidence}</td>
                <td class="citation-small">${item.citation}</td>
            `;
            tbody.appendChild(tr);
        });

        // Asegurar que la tabla sea visible y ocultar popups de docs
        tbody.parentElement.style.display = 'table';
        const docsPopup = document.getElementById('docs-popup-content');
        if (docsPopup) docsPopup.style.display = 'none';

        document.getElementById('checklist-modal').style.display = 'flex';
    },

    saveCheck(procId, index, state) {
        localStorage.setItem(`check-${procId}-${index}`, state);
    },

    handleUserInput() {
        const input = document.getElementById('user-input');
        const text = input.value.trim();
        if (!text) return;

        const lowerText = text.toLowerCase();
        this.addMessage('user', text);
        input.value = '';

        if (lowerText === 'si' || lowerText === 'sí' || lowerText === 'claro' || lowerText === 'por favor') {
            if (this.lastAction === 'propose_checklist' && this.currentProcedure) {
                this.showChecklist(this.currentProcedure.id);
                setTimeout(() => {
                    this.addMessage('bot', `Perfecto. He abierto el **Checklist de ${this.currentProcedure.title}**. Puedes marcar los items a medida que los verifiques.`);
                }, 400);
                this.lastAction = null;
                return;
            }
        }

        this.simulateBotResponse(text);
    },

    addMessage(type, text, options = {}) {
        const container = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = `${type}-message animate-fade-in`;

        // Formateo enriquecido
        let formattedText = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        formattedText = formattedText.replace(/\n/g, '<br>');

        // Resaltar y hacer vinculables los formularios FR-X
        formattedText = formattedText.replace(/(FR-\d+)/g, '<span class="form-link-tag" title="Click para copiar y ver manual" onclick="app.searchForm(\'$1\')">$1</span>');

        // Incluir vínculos directos a manuales/documentos si se detectan IDs de fuente
        formattedText = formattedText.replace(/(MEPI-MN1-IN-\d+)/g, '<a href="#" class="detail-link" onclick="app.showDocsByManual(\'$1\')">📄 $1</a>');

        // Auto-bolding para términos críticos (como 'Suspensión')
        if (type === 'bot') {
            const criticalTerms = ['Suspensión', 'Reanudación', 'MEPI'];
            criticalTerms.forEach(term => {
                const regex = new RegExp(`(${term})`, 'gi');
                formattedText = formattedText.replace(regex, '<strong>$1</strong>');
            });
        }

        let html = `<div class="msg-header">${type === 'bot' ? 'ANALISTA JURÍDICO' : 'USUARIO'}</div>`;
        html += `<div class="msg-content">${formattedText}</div>`;

        // Sección de Evidencias (Citas)
        if (options.evidence && options.evidence.length > 0) {
            html += `<div class="evidence-section">
                        <h5>Evidencia (Citas Literales)</h5>`;
            options.evidence.forEach(ev => {
                html += `
                    <div class="evidence-item">
                        <span class="evidence-source">[${ev.source_id} | ${ev.source_name}]</span>
                        <p class="evidence-text">"${ev.snippet}"</p>
                    </div>`;
            });
            html += `</div>`;
        }

        // Sección de Ubicación en el Manual
        if (options.location) {
            html += `<div class="location-footer">
                        <strong>Ubicación sugerida:</strong> ${options.location}
                     </div>`;
        }

        if (type === 'bot') {
            html += `
                <div class="msg-footer">
                    <button class="msg-action-btn" onclick="app.copyMsg(this)"><span>📋</span> Copiar</button>
                    ${options.tags ? options.tags.map(t => `<span class="tag">#${t}</span>`).join('') : ''}
                </div>
            `;
        }

        div.innerHTML = html;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    },

    /**
     * MOTOR DE BÚSQUEDA AVANZADA (PRO)
     * Implementa: Expansión Semántica, Detección por Procedimiento y Bridge MCP
     */
    async simulateBotResponse(query) {
        const q = query.toLowerCase();
        const thinkingId = 'thinking-' + Date.now();

        try {
            // 1. Fase de Pensamiento (UI)
            const container = document.getElementById('chat-messages');
            const thinkingDiv = document.createElement('div');
            thinkingDiv.id = thinkingId;
            thinkingDiv.className = 'bot-message thinking animate-pulse';
            thinkingDiv.innerHTML = `<p><em>Analista Jurídico reescribiendo consulta y expandiendo términos técnicos...</em></p>`;
            container.appendChild(thinkingDiv);
            container.scrollTop = container.scrollHeight;

            // 2. BUSQUEDA POR CÓDIGO DE FORMULARIO (Prioridad Absoluta)
            const formMatch = query.toUpperCase().match(/FR-\d+/);
            if (formMatch) {
                const formId = formMatch[0];
                this.removeThinking(thinkingId);
                this.searchForm(formId);
                return;
            }

            // 3. BRIDGE MCP (Opcional - Inyectado por Antigravity/Entorno)
            if (window.NLM_BRIDGE && typeof window.NLM_BRIDGE.query === 'function') {
                console.log("Bridge MCP Detectado. Consultando NotebookLM Real...");
                const mcpResponse = await window.NLM_BRIDGE.query(query);
                if (mcpResponse && mcpResponse.found) {
                    this.removeThinking(thinkingId);
                    this.addMessage('bot', mcpResponse.answer, {
                        evidence: mcpResponse.evidence,
                        location: mcpResponse.location,
                        tags: mcpResponse.tags || ["MCP-Direct"]
                    });
                    return;
                }
            }

            // 3. EXPANSIÓN SEMÁNTICA Y REPLANTEAMIENTO
            const synonyms = {
                "firma": ["suscripción", "suscripcion", "firmar", "legalizar", "suscribir"],
                "negacion": ["negativa", "no quiere", "rechazo", "se niega", "objetar"],
                "recibo": ["entrega", "finalización", "terminación", "liquidación"],
                "suspension": ["interrupción", "parar", "frenar", "congelar"],
                " items": ["apu", "precios", "actividades no previstas"]
            };

            let expandedTerms = [q];
            for (const [key, list] of Object.entries(synonyms)) {
                if (q.includes(key) || list.some(s => q.includes(s))) {
                    expandedTerms.push(key, ...list);
                }
            }

            // 4. BÚSQUEDA MULTI-NIVEL
            let results = [];

            // Nivel A: Mapeo directo a Procedimientos (Prioridad Máxima)
            Object.values(PROCEDURE_INDEX).forEach(proc => {
                let score = 0;
                const procText = (proc.title + " " + proc.summary).toLowerCase();
                expandedTerms.forEach(term => {
                    if (procText.includes(term.toLowerCase())) score += 5;
                });
                if (score > 0) results.push({ type: 'proc', data: proc, score });
            });

            // Nivel B: Knowledge Base (Prioridad Media)
            KNOWLEDGE_BASE.forEach(kb => {
                let score = 0;
                kb.keywords.forEach(kw => {
                    expandedTerms.forEach(term => {
                        if (term.toLowerCase().includes(kw.toLowerCase()) || kw.toLowerCase().includes(term.toLowerCase())) score += 3;
                    });
                });
                if (score > 0) results.push({ type: 'kb', data: kb, score });
            });

            // 5. SELECCIÓN DEL MEJOR HALLAZGO (Sin rendición)
            results.sort((a, b) => b.score - a.score);

            this.removeThinking(thinkingId);

            if (results.length > 0) {
                const best = results[0];

                if (best.type === 'proc') {
                    this.selectProcedure(best.data.id);
                    this.addMessage('bot', `He detectado que tu consulta está relacionada con el procedimiento de **${best.data.title}**. \n\n${best.data.summary}`, {
                        location: `Manual MEPI | ${best.data.source_id}`,
                        tags: [best.data.id, "Contexto-Manual"]
                    });
                } else if (best.type === 'kb') {
                    const kb = best.data;
                    const procIdMapping = { "kb-inicio": "inicio", "kb-apu": "apu", "kb-suspension": "suspension", "kb-recibo": "recibo", "kb-firma-negacion": "recibo" };
                    if (procIdMapping[kb.id]) this.selectProcedure(procIdMapping[kb.id]);

                    this.addMessage('bot', kb.responseContent, {
                        evidence: kb.evidence,
                        location: kb.location,
                        tags: kb.tags
                    });
                }
            } else {
                // FALLBACK ESTRATÉGICO: En lugar de "No encontrado", ofrece navegación asistida
                this.addMessage('bot', "No localicé una cita literal exacta, pero analizando los protocolos MEPI, te sugiero revisar las secciones de **Recibo Definitivo** o **Suspensión**, que contienen las reglas generales de firma y cumplimiento. \n\n¿Deseas que abra el checklist detallado de alguna de estas fases?", {
                    location: "Consulte el Índice General de Procedimientos MEPI",
                    tags: ["Asistente-Navegación"]
                });
            }

        } catch (error) {
            console.error("Search Error:", error);
            this.removeThinking(thinkingId);
            this.addMessage('bot', "Se produjo un error en la capa de análisis documental. Por favor, reintenta con términos más específicos.", { tags: ["Error-Sistema"] });
        }
    },

    removeThinking(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    },

    searchForm(formId) {
        this.copyText(formId);
        let found = false;
        let details = "";

        Object.values(PROCEDURE_INDEX).forEach(proc => {
            proc.checklist.forEach(item => {
                if (item.step.includes(formId) || item.citation.includes(formId)) {
                    found = true;
                    details += `<div class="detail-card" style="margin-bottom: 10px; background: #f8fafc; border: 1px solid var(--border);">
                        <strong>Procedimiento:</strong> ${proc.title}<br>
                        <strong>Paso:</strong> ${item.step}<br>
                        <strong>Responsable:</strong> ${item.responsible}<br>
                        <small style="color: var(--text-muted)">${item.citation}</small>
                    </div>`;
                }
            });
        });

        if (found) {
            this.addMessage('bot', `Análisis documental para el formulario **${formId}**: \n\nEste formulario se utiliza en los siguientes contextos:`, {
                location: `Búsqueda Directa Formulario | ${formId}`,
                tags: [formId, "Referencia-Rápida"]
            });
            const lastMsgContent = document.querySelector('#chat-messages .bot-message:last-child .msg-content');
            if (lastMsgContent) lastMsgContent.innerHTML += details;
        } else {
            this.simulateBotResponse(formId);
        }
    },

    showDocs(procId) {
        const proc = PROCEDURE_INDEX[procId];
        if (!proc) return;

        let docsHtml = `<h3 style="color: var(--primary); margin-bottom: 20px;">Documentos Relevantes: ${proc.title}</h3>`;
        const docs = new Set();
        proc.checklist.forEach(item => {
            const matches = item.step.match(/FR-\d+/g) || [];
            matches.forEach(m => docs.add(m));
        });

        if (docs.size === 0) {
            docsHtml += `<p>No se encontraron formularios FR asociados directamente a este paso.</p>`;
        } else {
            docs.forEach(doc => {
                docsHtml += `
                    <div class="doc-list-item" style="border-bottom: 1px solid var(--border); padding: 12px; display: flex; justify-content: space-between; align-items: center;">
                        <span><strong style="color: var(--secondary)">${doc}</strong> - Formato Requerido</span>
                        <button class="btn btn-secondary btn-small" onclick="app.searchForm('${doc}')">Ver Detalles</button>
                    </div>`;
            });
        }

        docsHtml += `<button class="btn btn-primary" style="margin-top: 25px; width: 100%;" onclick="document.getElementById('checklist-modal').style.display='none'">Cerrar</button>`;

        const modal = document.getElementById('checklist-modal');
        const content = document.querySelector('.modal-content.large');

        // Limpiar y ocultar tabla original de checklist
        const originalBody = document.getElementById('checklist-body');
        if (originalBody) originalBody.parentElement.style.display = 'none';

        let container = document.getElementById('docs-popup-content');
        if (!container) {
            container = document.createElement('div');
            container.id = 'docs-popup-content';
            content.appendChild(container);
        }

        container.innerHTML = docsHtml;
        container.style.display = 'block';
        modal.style.display = 'flex';
    },

    showDocsByManual(manualId) {
        this.addMessage('bot', `Análisis rápido para el manual **${manualId}**. Consultando base de conocimientos técnica...`, {
            tags: ["Manual-Referencia"]
        });
        this.simulateBotResponse(manualId);
    },

    switchSideTab(tab, event) {
        document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        if (event) {
            event.target.classList.add('active');
            const targetContent = document.getElementById(`side-tab-${tab}`);
            if (targetContent) targetContent.classList.add('active');
        }
    },

    exportToCSV() {
        if (!this.currentProcedure) return;
        let csv = "\uFEFFPaso,Responsable,Evidencia,Cita\n";
        this.currentProcedure.checklist.forEach(item => {
            csv += `"${item.step}","${item.responsible}","${item.evidence}","${item.citation}"\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `checklist_${this.currentProcedure.id}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

    copyMsg(btn) {
        const text = btn.closest('.bot-message').querySelector('.msg-content').innerText;
        this.copyText(text, btn);
    },

    copyText(text, btn = null) {
        navigator.clipboard.writeText(text);
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = "<span>✅</span> Copiado";
            setTimeout(() => btn.innerHTML = originalText, 2000);
        } else {
            console.log("Texto copiado:", text);
        }
    },

    shareMsg() {
        alert("Enlace compartido vía correo corporativo.");
    },

    saveMsg() {
        alert("Respuesta guardada en tu panel de favoritos.");
    },

    shareApp() {
        alert("Enlace de referencia directa compartido.");
    },

    sendQuery(text) {
        document.getElementById('user-input').value = text;
        this.handleUserInput();
    },

    exportHistory() {
        const messages = document.getElementById('chat-messages').innerText;
        const blob = new Blob([messages], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `historial_smart_memory.txt`;
        a.click();
    },

    downloadReference(index) {
        alert(`Iniciando descarga del documento PDF referenciado en la cita [${index + 1}] del manual. Enlace simulado a repositorio INVÍAS.`);
    }
};

app.init();
