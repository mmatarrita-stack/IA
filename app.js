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
            VP[Visita Previa -30 días] --> CT[Correcciones Técnicas]
            CT --> RD[Recibo Definitivo FR-1]
            RD --> LIQ[Liquidación Final]
            VP -- No Cumple --> PAS[Proceso Sancionatorio]
            VP -- No Cumple --> DES[Descuento Económico]`
    }
};

const KNOWLEDGE_BASE = [
    {
        id: "kb-inicio",
        procedureId: "inicio",
        keywords: ["inicio", "orden", "rti", "reunion tecnica", "visita previa", "compromisos"],
        responseContent: `
#### Análisis Integral: Inicio de Ejecución (MEPI-MN1-IN-1)

El inicio de un proyecto bajo la normativa INVÍAS no es un acto meramente administrativo, sino un hito logístico y jurídico que sincroniza dos contratos independientes (Obra e Interventoría).

**1. Sincronización de Órdenes (FR-1 y FR-2):**
*   **Regla de Oro:** La interventoría **debe** estar activa antes o simultáneamente con la obra. No se permite obra sin supervisión.
*   **Efecto Legal:** La Orden de Inicio activa el plazo contractual y la obligación de disponibilidad del personal mínimo.

**2. La Reunión Técnica Inicial (RTI):**
*   **Plazo:** Máximo 3 días hábiles post-orden.
*   **Documento Clave:** Acta FR-3. Es el "mapa de ruta" inicial donde se consignan los compromisos técnicos.
*   **Participantes:** Director Territorial, Gestor, Interventor y Contratista.

**3. Visita Conjunta y Estado Cero:**
*   Se realiza previa a la RTI. Es obligatoria para documentar el estado físico inicial.
*   **Evidencia:** Registro fílmico y fotográfico georreferenciado (fundamental para reclamaciones futuras por condiciones preexistentes).`,
        evidence: [
            { source_id: "MEPI-MN1-IN-1", source_name: "Instructivo Inicio Ejecución", snippet: "La ejecución del contrato de obra no debe iniciarse con anterioridad a la orden de inicio del contrato de interventoría." },
            { source_id: "MEPI-MN1-IN-1", source_name: "Instructivo Inicio Ejecución", snippet: "Máximo dentro de los tres (3) días hábiles siguientes se debe realizar una reunión técnica... Previa se debe efectuar una visita conjunta al sitio." }
        ],
        location: "MEPI-MN1-IN-1 Sección VI | Hitos de Inicio",
        tags: ["RTI", "Visita Conjunta", "Sincronización"]
    },
    {
        id: "kb-apu-detallado",
        procedureId: "apu",
        keywords: ["apu", "no previsto", "items", "cotizaciones", "precios", "fijación", "fijacion"],
        responseContent: `
#### Procedimiento de APU e Ítems no Previstos (MEPI-MN1-IN-10)

La gestión de nuevas actividades es uno de los puntos de mayor riesgo jurídico. El manual MEPI establece un protocolo de blindaje para evitar sobrecostos y hallazgos administrativos.

**Requisitos de Aprobación:**
*   **Carpeta de Justificación:** Debe contener el análisis técnico (por qué es necesario), económico (por qué ese precio) y jurídico (está dentro del objeto).
*   **Mínimo 3 Cotizaciones:** Deben ser reales, de la zona y de proveedores que puedan facturar legalmente.
*   **Formato FR-4 (Acta de Fijación):** Es el documento habilitante. **PROHIBICIÓN EXPRESA:** El interventor no puede autorizar la ejecución física si el FR-4 no está firmado por todas las partes (incluyendo la DT).

**Metas Físicas:**
Cualquier nuevo ítem debe analizarse frente al impacto en las metas contractuales originales. Si el ítem altera el valor total o las metas significativamente, requiere un **Otrosí** al contrato principal.`,
        evidence: [
            { source_id: "MEPI-MN1-IN-10", source_name: "Instructivo APU", snippet: "El Interventor no debe permitir la ejecución de actividades correspondientes a ítems no previstos, sin la suscripción del formato MEPI-MN1-IN-10-FR-4." }
        ],
        location: "MEPI-MN1-IN-10 Sección VII | Control de Precios",
        tags: ["APU", "FR-4", "No Previstos"]
    },
    {
        id: "kb-informes-detallado",
        procedureId: "informes",
        keywords: ["informe", "informes", "semanal", "mensual", "jueves", "fr-3", "fr-1"],
        responseContent: `
#### Régimen de Informes: Semanales y Mensuales (MEPI-MN1-IN-15)

El sistema de informes es el mecanismo de rendición de cuentas del Interventor ante el Instituto. No es solo un documento de avance, es el soporte del pago.

**1. El Informe Semanal (Check-point Técnico):**
*   **Corte:** Estrictamente todos los **JUEVES**.
*   **Propósito:** Detectar desviaciones en el Programas de Obra de manera temprana.
*   **Contenido:** Avance físico real vs programado, novedades de personal y maquinaria.

**2. El Informe Mensual (Soporte Jurídico de Pago):**
*   **Estructura:** Debe seguir estrictamente el orden del **Formato FR-1 (Lista de Chequeo)**.
*   **Documentación Crítica:** Planillas de seguridad social (cruzadas con personal en sitio), bitácora del mes, actas de recibo parcial y registro fotográfico.
*   **Consecuencia de Incumplimiento:** La no entrega o entrega incompleta bloquea el trámite de pago de la cuenta de interventoría.`,
        evidence: [
            { source_id: "MEPI-MN1-IN-15", source_name: "Instructivo Informes", snippet: "Su fecha de corte es siempre el día jueves." },
            { source_id: "MEPI-MN1-IN-15", source_name: "Instructivo Informes", snippet: "Este formato [FR-1] debe ser obligatoriamente la página uno (1) del informe." }
        ],
        location: "MEPI-MN1-IN-15 Sección IV | Control Documental",
        tags: ["Informes", "Corte Jueves", "Pago"]
    },
    {
        id: "kb-suspension-detallada",
        procedureId: "suspension",
        keywords: ["suspensión", "reanudación", "secop", "garantías"],
        responseContent: `
#### Protocolo de Suspensión y Reanudación (MEPI-MN1-IN-11)

La suspensión pausa las obligaciones de ejecución pero no libera al contratista de la custodia y mantenimiento del sitio.

**Formalización en SECOP II:**
*   La validez de la suspensión ante órganos de control depende de su registro en **SECOP II**. 
*   **Dato Crítico:** La fecha de suspensión en plataforma prima sobre la del acta física.

**Obligaciones Post-Reanudación:**
*   Al reanudar, se cuenta con un plazo fatal de **3 días hábiles** para presentar la actualización de garantías.
*   Se debe suscribir inmediatamente el Acta de Reanudación (FR-3 o FR-4) para reactivar el flujo de caja y los términos legales.`,
        evidence: [
            { source_id: "MEPI-MN1-IN-11", source_name: "Instructivo Suspensión", snippet: "Prima la fecha indicada en la plataforma [SECOP II] sobre la señalada en el formato." }
        ],
        location: "MEPI-MN1-IN-11 Sección IV | Gestión Digital",
        tags: ["Suspensión", "SECOP II", "Garantías"]
    },
    {
        id: "kb-fcs",
        procedureId: "recibo",
        keywords: ["fcs", "factor de compensacion social", "compensación social", "social factors"],
        responseContent: `
#### Análisis Jurídico de los Factores de Compensación Social (FCS)

De acuerdo con la documentación del **Instituto Nacional de Vías (INVIAS)** y la **Resolución 7310 de 2015**, los Factores de Compensación Social se consideran herramientas fundamentales para prevenir y mitigar los impactos socioeconómicos en procesos de adquisición predial.

**Condiciones generales para su cálculo:**
*   **Enajenación voluntaria:** Solo procede si la adquisición se realiza de forma concertada. La expropiación anula este beneficio.
*   **Diagnóstico de vulnerabilidad:** Requiere una **Ficha Socioeconómica** pormenorizada que analice ingresos, escolaridad, carga de dependencia y discapacidad.
*   **Base de cálculo:** Referenciada en el Salario Mínimo Legal Vigente (**SMLV**) y el avalúo comercial.

**Tipología y Metodología de Aplicación:**
1.  **Factor de Unidad Mínima de Vivienda (UMV):** Compensa si el avalúo de mejoras es inferior al valor de una vivienda VIP (Vivienda de Interés Prioritario).
2.  **Factor por Unidad Mínima Económica (UME):** Reconocimiento por suspensión de actividades económicas que sean único medio de subsistencia (arraigo > 1 año).
3.  **Factor por Traslado (TDO):** Cubre gastos de mudanza para unidades vulnerables.
4.  **Factor por Hacinamiento (HTO):** Se activa cuando la vivienda es habitada por 6 o más personas.
5.  **Factor de Arrendamiento Provisional:** Cubre costos de alquiler ante desplazamiento involuntario.

Este proceso requiere concepto de aprobación de la **Interventoría** y no objeción de la Subdirección de Sostenibilidad de INVIAS.`,
        evidence: [
            { source_id: "MEPI-Manual", source_name: "Resolución 7310", snippet: "Los FCS se calculan y reconocen como una medida para prevenir, mitigar y compensar los impactos socioeconómicos" },
            { source_id: "MEPI-Manual", source_name: "Resolución 7310", snippet: "El reconocimiento de los FCS solo es viable si la adquisición del predio se realiza por enajenación voluntaria." }
        ],
        location: "Resolución 7310 de 2015 | Ficha Socioeconómica",
        tags: ["FCS", "Compensación", "Social"]
    },
    {
        id: "kb-bitacora",
        keywords: ["bitacora", "libro", "folios", "registros"],
        responseContent: `
#### Gestión de la Bitácora de Obra
La bitácora es el diario técnico del proyecto. Sus registros tienen valor probatorio en controversias contractuales.

**Requisitos Técnicos:**
*   **Foliación:** Debe estar foliada en todas sus páginas.
*   **Custodia:** La custodia permanente recae sobre la **Interventoría**.
*   **Contenido:** Hechos relevantes, clima, órdenes del interventor y respuesta del contratista. No se permiten espacios en blanco ni tachaduras.`,
        location: "MEPI-MN1-IN-1 Sección IX | Control de Campo",
        tags: ["Bitácora", "Control Técnico", "Evidencia"]
    }
];

// Base del repositorio para visualización directa (Servidor de Contenido Crudo)
const BASE_RAW_URL = "https://raw.githubusercontent.com/mmatarrita-stack/IA/main/pdfs";
const REPO_FOLDER = "https://github.com/mmatarrita-stack/IA/tree/main/pdfs";

// 5 secciones obligatorias del Manual Interventoría sincronizadas con GitHub
const MANUAL_STRUCTURE = {
    "tecnica": {
        title: "Gestión Técnica",
        docs: [
            { id: "MEPI-13", name: "Solicitud Adición, Prórroga, Modificación", code: "MEPI-MN1-IN-13", url: `${BASE_RAW_URL}/MEPI-MN1-IN-13%20SOLICITUD%20ADICION,%20PRO,%20MOD%20INT.pdf` },
            { id: "MEPI-14", name: "Acta de Comité y de Reunión", code: "MEPI-MN1-IN-14", url: `${BASE_RAW_URL}/MEPI-MN1-IN-14%20ACTA%20DE%20COMITE%20Y%20DE%20REUNION.pdf` },
            { id: "MEPI-15", name: "Informe Semanal y Mensual", code: "MEPI-MN1-IN-15", url: `${BASE_RAW_URL}/MEPI-MN1-IN-15%20INFORME%20SEM%20Y%20MENSUAL%20INT.pdf` },
            { id: "MEPI-16", name: "Visita Previa y Recibo Definitivo Obra", code: "MEPI-MN1-IN-16", url: `${BASE_RAW_URL}/MEPI-MN1-IN-16%20VISITA%20PREVIA%20Y%20RECIBO%20DEF%20OBRA.pdf` },
            { id: "MEPI-17", name: "Recibo Definitivo Interventoría Informe Final", code: "MEPI-MN1-IN-17", url: `${BASE_RAW_URL}/MEPI-MN1-IN-17%20RECIBO%20DEF%20INT%20INFORME%20FINAL.pdf` },
            { id: "MEPI-18", name: "Acta de Liquidación", code: "MEPI-MN1-IN-18", url: `${BASE_RAW_URL}/MEPI-MN1-IN-18%20ACTA%20DE%20LIQUIDACION.pdf` }
        ]
    },
    "ambiental": {
        title: "Gestión Ambiental",
        docs: [
            { id: "MASPS-01", name: "Seguimiento Gestión Ambiental", code: "MASPS-MN1-IN-1", url: `${BASE_RAW_URL}/MASPS-MN1-IN-1%20INSTRUCTIVO%20SEGUIMIENTO%20GESTION%20AMBIENTAL.pdf` },
            { id: "MASPS-02", name: "Balance Ambiental Terminación Obra", code: "MASPS-MN1-IN-2", url: `${BASE_RAW_URL}/MASPS-MN1-IN-2%20INSTRUCTIVO%20BALANCE%20AMBIENTAL%20A%20LA%20TERMINACION%20CTO%20OBRA.pdf` }
        ]
    },
    "social": {
        title: "Gestión Social",
        docs: [
            { id: "MASPS-03", name: "Seguimiento y Balance Gestión Social", code: "MASPS-MN1-IN-3", url: `${BASE_RAW_URL}/MASPS-MN1-IN-3%20INSTRUCTIVO%20SEGUIMIENTO%20Y%20BALANCE%20GESTION%20SOCIAL%20CTO%20OBRA.pdf` },
            { id: "MASPS-04", name: "Gestión Sociopredial", code: "MASPS-MN1-IN-4", url: `${BASE_RAW_URL}/MASPS-MN1-IN-4%20INSTRUCTIVO%20PARA%20LA%20GESTION%20SOCIOPREDIAL.pdf` }
        ]
    },
    "predial": {
        title: "Gestión Predial",
        docs: [
            { id: "MASPS-05", name: "Gestión y Adquisición Predial", code: "MASPS-MN1-IN-5", url: `${BASE_RAW_URL}/MASPS-MN1-IN-5%20INSTRUCTIVO%20GESTION%20Y%20ADQUISICION%20PREDIAL.pdf` }
        ]
    },
    "sostenibilidad": {
        title: "Sostenibilidad",
        docs: [
            { id: "MASPS-06", name: "Seguimiento y Evaluación Sostenibilidad", code: "MASPS-MN1-IN-6", url: `${BASE_RAW_URL}/MASPS-MN1-IN-6%20INSTRUCTIVO%20SEGUIMIENTO%20Y%20EVALUACION%20SOSTENIBILIDAD.pdf` }
        ]
    }
};

const RELATION_ENTITIES = {
    // Inicio
    "RP": { title: "Registro Presupuestal (RP)", description: "Certificación de disponibilidad de fondos para el contrato. Sin este, no hay sustento económico legal." },
    "G": { title: "Aprobación de Garantías", description: "Revisión técnica de pólizas (cumplimiento, salarios, RCG). Se verifica vigencia y suficiencia." },
    "OII": { title: "Orden de Inicio Interventoría", description: "Documento oficial que habilita el inicio de la supervisión técnica." },
    "OIO": { title: "Orden de Inicio Obra", description: "Acto administrativo que autoriza el comienzo de actividades físicas." },
    "VIS": { title: "Visita Conjunta Sitio", description: "Inspección de campo para verificar condiciones iniciales y georreferenciación obligatoria." },
    "COM": { title: "Compromisos RTI", description: "Plan de acción derivado de la Reunión Técnica Inicial para los primeros días del proyecto." },
    "RTI": {
        title: "Reunión Técnica Inicial (RTI)",
        description: "Hito administrativo obligatorio dentro de los 3 días posteriores a la orden de inicio. Define compromisos técnicos y administrativos.",
        rich: `
            <p>La RTI es la instancia de coordinación presencial donde se formalizan las reglas de juego del proyecto.</p>
            <ul>
                <li><strong>Plazo:</strong> 3 días hábiles post-orden.</li>
                <li><strong>Acta:</strong> Formato FR-3 obligatoria.</li>
                <li><strong>Participantes:</strong> Director Territorial, Gestor, Interventoría y Contratistas.</li>
            </ul>
        `
    },
    // APU
    "SOL": { title: "Solicitud del Contratista", description: "Petición formal para la creación de un ítem no previsto con sustento técnico." },
    "JUS": { title: "Justificación Técnica", description: "Análisis T/E/J sobre la necesidad de actividades adicionales fuera del objeto original." },
    "COT": { title: "3 Cotizaciones Reales", description: "Soportes de precios de mercado de la zona firmados por proveedores locales." },
    "AF": { title: "Acta de Fijación (FR-4)", description: "Documento legal donde se pactan los nuevos precios unitarios aprobados." },
    // Suspensión (Nuevas)
    "CAU": {
        title: "Causal: Fuerza Mayor / Interés Público",
        description: "Justificación jurídica y técnica que motiva la interrupción del plazo contractual.",
        rich: `
            <p>La causal debe estar plenamente sustentada con hechos externos, imprevisibles e irresistibles.</p>
            <ul>
                <li><strong>Fuerza Mayor:</strong> Desastres naturales, condiciones climáticas extremas.</li>
                <li><strong>Interés Público:</strong> Decisiones administrativas por seguridad nacional o salud.</li>
            </ul>
        `
    },
    "ACT": {
        title: "Acta de Suspensión (FR-1/2)",
        description: "Documento suscrito por las partes que pausa el tiempo de ejecución de obra e interventoría.",
        rich: "Requiere sustento técnico previo y aprobación del Gestor. El acta FR-1/2 es el documento oficial de pausa."
    },
    "SEC": {
        title: "Firma y Publicación SECOP II",
        description: "Registro obligatorio en plataforma que otorga validez legal a la suspensión ante el INVÍAS.",
        rich: "Sin el registro en SECOP II, la suspensión no tiene validez jurídica frente a terceros ni entes de control."
    },
    "SUS": {
        title: "Período Suspendido",
        description: "Tiempo durante el cual no operan los plazos pero el contratista mantiene custodia del sitio.",
        rich: "El contratista debe garantizar la seguridad y mantenimiento mínimo del sitio de obra durante este periodo."
    },
    "REA": {
        title: "Acta de Reanudación (FR-3/4)",
        description: "Documento de retorno a actividades normales indicando la nueva fecha de terminación.",
        rich: "Se suscribe una vez superada la causal. Debe recalcular la fecha de terminación final del contrato."
    },
    "GUA": {
        title: "Actualización de Garantías",
        description: "Trámite obligatorio post-reanudación (máx 3 días) para ajustar la vigencia de las pólizas.",
        rich: "Es responsabilidad del contratista presentar el anexo modificatorio de las pólizas ante el INVÍAS."
    },
    // Informes
    "SEM": { title: "Informe Semanal", description: "Reporte de avance físico y financiero con corte a los días jueves." },
    "COR": { title: "Corte Jueves", description: "Sincronización de datos técnicos y financieros para el reporte semanal obligatorio." },
    "MEN": { title: "Informe Mensual", description: "Documento maestro y requisito de pago que consolida la gestión del mes." },
    "LCH": { title: "Lista de Chequeo (FR-1)", description: "Control obligatorio que debe ser la página 1 de todo informe mensual." },
    "PAG": { title: "Autorización de Pago", description: "Validación final de cumplimiento documental para el trámite de honorarios ante INVÍAS." },
    // Recibo y Liquidación
    "VP": { title: "Visita Previa (-30 días)", description: "Inspección antes del vencimiento para identificar pendientes y correcciones técnicas." },
    "CT": { title: "Correcciones Técnicas", description: "Atención de observaciones del interventor previo al acta de recibo definitivo." },
    "RD": {
        title: "Recibo Definitivo (FR-1)",
        description: "Acto formal donde el Instituto recibe la obra de conformidad total.",
        rich: `
            <p>Es el hito que cierra la fase de ejecución. Para su suscripción se requiere:</p>
            <ul>
                <li><strong>Cero Pendientes:</strong> Verificación de que todas las correcciones técnicas fueron atendidas.</li>
                <li><strong>Planos Récord:</strong> Entrega total de la planimetría final de obra.</li>
                <li><strong>Ensayos de Laboratorio:</strong> Certificación de calidad de todos los materiales.</li>
            </ul>
        `
    },
    "LIQ": {
        title: "Liquidación Final",
        description: "Cruce de cuentas definitivo y liberación de saldos remanentes contractuales.",
        rich: "Fase jurídica donde se extinguen las obligaciones y se define el balance financiero final del proyecto."
    },
    "PAS": { title: "Proceso Sancionatorio", description: "Trámite legal ante el incumplimiento grave de obligaciones técnicas o plazos." },
    "DES": { title: "Descuento Económico", description: "Penalización financiera aplicada por deficiencias técnicas no subsanadas en el tiempo previsto." },
    // APU Adicionales
    "APU": {
        title: "Análisis APU FR-1",
        description: "Desglose de costos unitarios (materiales, equipo, mano de obra) para el nuevo ítem.",
        rich: "Documento técnico-financiero que sustenta un ítem no previsto. Debe incluir análisis de mercado y rendimiento certificado."
    },
    "MOD": { title: "Modificación Contractual", description: "Trámite legal (Adición o Otrosí) requerido si el ítem afecta el valor o metas del contrato." },
    // Otros
    "SECOP-II": {
        title: "Plataforma SECOP II",
        description: "Sistema oficial de contratación donde se registran hitos, suspensiones y firmas electrónicas de validez jurídica.",
        rich: `
            <p>En el modelo MEPI, el SECOP II es la fuente de verdad jurídica.</p>
            <ul>
                <li><strong>Firmas:</strong> Deben ser electrónicas para validez oficial.</li>
                <li><strong>Fechas:</strong> La fecha de registro en SECOP II prima sobre el acta física.</li>
            </ul>
        `
    },
    "LEG": { title: "Legalización", description: "Trámite de registro presupuestal y perfeccionamiento del Otrosí." },
    "RP": { title: "Registro Presupuestal (RP)", description: "Garantiza reserva de fondos." },
    "G": { title: "Aprobación de Garantías", description: "Revisión técnica de pólizas." },
    "OII": { title: "Orden Inicio Interventoría", description: "Activación del contrato de supervisión." },
    "OIO": { title: "Orden Inicio Obra", description: "Activación del contrato de ejecución." },
    "VIS": { title: "Visita Conjunta Sitio", description: "Validación de condiciones de campo." },
    "RTI": { title: "Reunión Técnica Inicial (RTI)", description: "Definición de cronogramas y compromisos." },
    "COM": { title: "Cumplimiento Compromisos", description: "Seguimiento a pactos de RTI." },
    "SOL": { title: "Solicitud Contratista", description: "Petición formal de prórroga o adición." },
    "EST": { title: "Estudio Interventoría", description: "Viabilidad técnica de la solicitud." },
    "APR": { title: "Aprobación", description: "Vía libre del Comité de Contratación." },
    "MIN": { title: "Suscripción Minuta", description: "Formalización legal del cambio contractual." }
};

window.app = {
    currentProcedure: null,
    lastAction: null,
    errorCount: 0,
    isHealthy: true,

    // UI Responsive Helpers
    toggleSidebar(show) {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (show) {
            sidebar.classList.add('open');
            overlay.classList.add('open');
        } else {
            sidebar.classList.remove('open');
            if (!document.querySelector('.details-panel.open')) {
                overlay.classList.remove('open');
            }
        }
    },

    toggleDetails(show) {
        const panel = document.querySelector('.details-panel');
        const overlay = document.getElementById('sidebar-overlay');
        if (show) {
            panel.classList.add('open');
            overlay.classList.add('open');
        } else {
            panel.classList.remove('open');
            if (!document.querySelector('.sidebar.open')) {
                overlay.classList.remove('open');
            }
        }
    },

    closeAllPanels() {
        this.toggleSidebar(false);
        this.toggleDetails(false);
    },

    async checkRepositoryHealth() {
        console.log("Checking repository integrity...");
        const badge = document.querySelector('.status-badge');
        try {
            // Ping the base raw URL or a specific small file to verify connectivity
            const response = await fetch(BASE_RAW_URL + "/MEPI-MN1-IN-13%20SOLICITUD%20ADICION,%20PRO,%20MOD%20INT.pdf", { method: 'HEAD', mode: 'no-cors' });
            // Note: no-cors will always return status 0, but if it throws, we have a network issue.
            // For a real check, we'd need a proxy or CORS-enabled endpoint, but HEAD with no-cors tests reachability.

            this.isHealthy = true;
            if (badge) {
                badge.className = 'status-badge connected';
                badge.innerText = 'Repositorio: Operativo';
            }
        } catch (error) {
            console.error("Repository Access Error:", error);
            this.isHealthy = false;
            if (badge) {
                badge.className = 'status-badge error';
                badge.innerText = 'Repositorio: Inaccesible';
            }
            this.addMessage('bot', "⚠️ **Alerta de Integridad:** Se detectó inconsistencia en el acceso al repositorio de documentos. Algunas fuentes originales pueden no estar disponibles temporalmente.", { tags: ["Sistema-Integridad"] });
        }
    },

    calculateConfidence(bestResult, query) {
        let confidence = "baja";
        let score = bestResult.score || 0;
        let evidenceCount = (bestResult.data && bestResult.data.evidence) ? bestResult.data.evidence.length : 0;

        // Criterios de evaluación incremental
        if (score >= 10 && evidenceCount >= 1) confidence = "alta";
        else if (score >= 5 || evidenceCount >= 1) confidence = "media";

        return {
            level: confidence,
            reason: `Basado en ${evidenceCount} fragmentos de soporte y relevancia semántica del ${score * 10}%`
        };
    },

    // Helper para limpiar markdown de respuestas automáticas
    formatRichText(text) {
        if (!text) return "";
        let clean = text
            .replace(/^#### (.*$)/gim, '<strong style="color:var(--secondary); display:block; margin-top:10px;">$1</strong>')
            .replace(/^### (.*$)/gim, '<strong style="color:var(--primary); display:block; margin-top:10px; font-size:1rem;">$1</strong>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^\*(.*$)/gim, '<li style="margin-left:15px; margin-bottom:5px;">$1</li>')
            .replace(/\n/g, '<br>');

        // Autovinculación inteligente de documentos
        clean = clean.replace(/((MEPI|MASPS)-MN1-IN-\d+)/g, (match) => {
            let foundUrl = null;
            Object.values(MANUAL_STRUCTURE).forEach(section => {
                const doc = section.docs.find(d => d.code === match);
                if (doc) foundUrl = doc.url;
            });

            if (foundUrl) {
                return `<a href="${foundUrl}" target="_blank" class="doc-link-rich" title="Ver Documento Original">📄 ${match}</a>`;
            }

            // Fallback: Link directo al repositorio (Metodología preferida)
            return `<a href="${REPO_FOLDER}" target="_blank" class="doc-link-rich" title="Explorar repositorio de documentos">🔍 ${match}</a>`;
        });

        return clean;
    },

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
        this.renderManual();
        this.setupEventListeners();
        this.initTrivia();
        this.checkRepositoryHealth(); // Incremental Health Check
        this.renderGraph(PROCEDURE_INDEX['inicio'].graph, 'inicio');
        this.updateDetailsPanel('inicio');
    },

    renderManual(filter = "") {
        const container = document.getElementById('manual-sections-container');
        if (!container) return;

        container.innerHTML = '';
        Object.entries(MANUAL_STRUCTURE).forEach(([key, section]) => {
            const filteredDocs = section.docs.filter(doc =>
                doc.name.toLowerCase().includes(filter.toLowerCase()) ||
                doc.code.toLowerCase().includes(filter.toLowerCase())
            );

            if (filteredDocs.length === 0 && filter !== "") return;

            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'manual-section' + (filter !== "" ? ' open' : '');

            sectionDiv.innerHTML = `
                <div class="manual-section-header" onclick="app.toggleManualSection(this)">
                    <span>${section.title}</span>
                    <span class="chevron">${filter !== "" ? '▲' : '▼'}</span>
                </div>
                <div class="manual-section-content">
                    ${filteredDocs.map(doc => `
                        <div class="manual-doc-item">
                            <div class="doc-info">
                                <div style="font-weight: 600; font-size: 0.75rem;">${doc.name}</div>
                                <div style="font-size: 0.65rem; color: #64748b;">${doc.code}</div>
                            </div>
                            <a href="${doc.url}" target="_blank" class="pdf-link">PDF</a>
                        </div>
                    `).join('')}
                    ${filteredDocs.length === 0 ? '<p style="padding:10px; font-size:0.7rem;">Sin coincidencias.</p>' : ''}
                </div>
            `;
            container.appendChild(sectionDiv);
        });
    },

    toggleManualSection(header) {
        const section = header.parentElement;
        const isOpen = section.classList.contains('open');

        // Cierra los demás
        document.querySelectorAll('.manual-section').forEach(s => s.classList.remove('open'));

        if (!isOpen) {
            section.classList.add('open');
            header.querySelector('.chevron').innerText = '▲';
        } else {
            header.querySelector('.chevron').innerText = '▼';
        }
    },

    simulatePdfOpen(docName) {
        // Mostrar tab Detalles con info del doc sin ensuciar el chat central
        this.showEntityDetail("Manual", `Vista previa de documento: ${docName}`, `
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px dashed var(--accent); margin-bottom: 20px;">
                <p><strong>Documento:</strong> ${docName}</p>
                <p style="font-size: 0.85rem; color: #64748b;">El visor de NotebookLM cargaría este archivo con las citas y referencias técnicas resaltadas automáticamente.</p>
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="app.exportManualCSV('all')">📥 Descargar Copia para Revisión</button>
        `);
    },

    searchManual(query) {
        if (!query) return;

        // Buscar en la estructura del manual
        const results = [];
        Object.values(MANUAL_STRUCTURE).forEach(section => {
            section.docs.forEach(doc => {
                if (doc.name.toLowerCase().includes(query.toLowerCase()) ||
                    doc.code.toLowerCase().includes(query.toLowerCase())) {
                    results.push(doc);
                }
            });
        });

        if (results.length > 0) {
            let html = `<p style="margin-bottom: 15px;">Se encontraron <strong>${results.length}</strong> documentos relacionados:</p>`;
            results.forEach(doc => {
                html += `
                    <div style="background: white; border: 1px solid var(--border); padding: 12px; border-radius: 6px; margin-bottom: 10px;">
                        <div style="font-weight: 600; color: var(--primary);">${doc.name}</div>
                        <div style="font-size: 0.75rem; color: #475569; margin-bottom: 8px;">Código: ${doc.code}</div>
                        <a href="${doc.url}" target="_blank" class="doc-link-rich" style="text-decoration: none; padding: 5px 12px; border-radius: 6px;">📄 Abrir Documento</a>
                    </div>
                `;
            });

            this.showEntityDetail("Búsqueda en Manual", `Resultados para: "${query}"`, html);
        } else {
            this.showEntityDetail("Sin resultados", `Búsqueda: "${query}"`, `
                <p>No se encontraron documentos específicos en el manual con ese término.</p>
                <p style="font-size: 0.85rem; color: #64748b; margin-top: 10px;">Intenta con códigos FR (ej: FR-1) o palabras clave técnicas.</p>
            `);
        }
    },

    renderProcedures() {
        const list = document.getElementById('procedure-list');
        list.innerHTML = '';
        Object.values(PROCEDURE_INDEX).forEach(proc => {
            const li = document.createElement('li');
            li.className = 'procedure-item';
            li.setAttribute('data-id', proc.id);
            li.innerHTML = `
                <div class="title">${proc.title}</div>
                <div class="procedure-actions">
                    <span class="action-icon" title="Checklist" onclick="event.stopPropagation(); app.showChecklist('${proc.id}')">📋</span>
                    <span class="action-icon" title="Grafo" onclick="event.stopPropagation(); app.selectProcedure('${proc.id}'); app.switchSideTab('graph')">🕸️</span>
                </div>
            `;
            li.onclick = () => {
                this.selectProcedure(proc.id);
                this.switchSideTab('graph');
            };
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
        document.getElementById('global-search').onkeypress = (e) => {
            if (e.key === 'Enter') {
                this.searchManual(e.target.value);
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
        const activeItem = document.querySelector(`.procedure-item[data-id="${id}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        this.renderGraph(proc.graph, id);
        this.updateDetailsPanel(id);

        // On mobile, if choosing from sidebar, we might want to close it to show the content
        if (window.innerWidth <= 1024) {
            this.toggleSidebar(false);
        }
    },

    updateDetailsPanel(id) {
        const proc = PROCEDURE_INDEX[id];
        const container = document.getElementById('entity-details');
        if (!container) return;

        container.innerHTML = '';

        let stepsHtml = proc.checklist.map(step => `
            <div class="step-item" onclick="app.showEntityDetail('${step.step.replace(/'/g, "\\'")}', '${step.responsible.replace(/'/g, "\\'")}', '${step.citation.replace(/'/g, "\\'")}')">
                <div class="step-check"></div>
                <div class="step-info">
                    <div class="step-text">${step.step}</div>
                    <div class="step-meta">Responsable: ${step.responsible}</div>
                </div>
            </div>
        `).join('');

        let html = `
            <div class="detail-card animate-fade-in" style="border-top: 4px solid var(--secondary)">
                <h4 style="color: var(--secondary); margin-bottom: 12px; font-size: 1.1rem; font-weight: 700;">${proc.title}</h4>
                <div style="font-size: 0.92rem; color: #475569; margin-bottom: 25px; line-height: 1.6;">
                    ${proc.summary}
                </div>
                
                <h5 style="font-size: 0.75rem; color: #475569; margin: 25px 0 15px 0; text-transform: uppercase; font-weight: 700; letter-spacing: 0.8px;">PASOS DEL PROCEDIMIENTO</h5>
                <div class="steps-progress">
                    ${stepsHtml}
                </div>

                <div class="detail-links" style="margin-top: 30px; border-top: 1px solid var(--border); padding-top: 20px;">
                    <button class="btn btn-secondary" style="width: 100%; margin-bottom: 10px;" onclick="app.showChecklist('${proc.id}')">📋 Ver Documentación Completa</button>
                    <button class="btn btn-primary" style="width: 100%;" onclick="app.exportToCSV()">📥 Exportar Reporte Técnico</button>
                </div>
            </div>
        `;
        container.innerHTML = html;
    },

    renderGraph(definition, procId) {
        const listContainer = document.getElementById('relations-list-container');
        if (!listContainer) return;
        listContainer.innerHTML = '';

        const nodeMap = new Map();
        const defRegex = /([a-zA-Z0-9-]+)\s*\["?(.*?)"?\]/g;
        let match;
        while ((match = defRegex.exec(definition)) !== null) {
            nodeMap.set(match[1], match[2]);
        }

        // 2. Encontrar conexiones ID1 --> ID2 o ID para asegurar que todos existan
        const flowRegex = /([a-zA-Z0-9-]+)\s*(-->|--)\s*([a-zA-Z0-9-]+)/g;
        const uniqueIds = new Set();
        while ((match = flowRegex.exec(definition)) !== null) {
            uniqueIds.add(match[1]);
            uniqueIds.add(match[3]);
        }

        // Si no hay conexiones pero hay definiciones, usar definiciones
        if (uniqueIds.size === 0) {
            nodeMap.forEach((val, key) => uniqueIds.add(key));
        }

        if (uniqueIds.size === 0) {
            listContainer.innerHTML = `<p class="empty-state">Sin relaciones gráficas.</p>`;
            return;
        }

        const flowContainer = document.createElement('div');
        flowContainer.className = 'flow-container';

        Array.from(uniqueIds).forEach((id, index) => {
            const label = nodeMap.get(id) || id;

            const stepWrapper = document.createElement('div');
            stepWrapper.className = 'flow-step';

            const btn = document.createElement('button');
            btn.className = 'relation-btn animate-fade-in';
            btn.innerHTML = `<span>${index + 1}. ${label}</span>`;
            btn.onclick = (e) => {
                if (e) e.preventDefault();
                document.querySelectorAll('.relation-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Navegación directa: Si el ID es un procedimiento, ir a ese procedimiento.
                // Si es un paso interno, ir directamente a la vista de "Roadmap" (Detalles) del procedimiento actual.
                if (PROCEDURE_INDEX[id]) {
                    app.selectProcedure(id);
                } else {
                    const targetId = procId || (app.currentProcedure ? app.currentProcedure.id : 'inicio');
                    app.updateDetailsPanel(targetId);
                }
                app.switchSideTab('info');
            };

            stepWrapper.appendChild(btn);
            if (index < uniqueIds.size - 1) {
                const arrow = document.createElement('div');
                arrow.className = 'flow-arrow';
                stepWrapper.appendChild(arrow);
            }
            flowContainer.appendChild(stepWrapper);
        });

        listContainer.appendChild(flowContainer);

        // Mermaid hidden sync
        const mermaidContainer = document.getElementById('mermaid-graph');
        if (mermaidContainer) {
            mermaidContainer.innerHTML = definition;
            mermaidContainer.removeAttribute('data-processed');
        }
    },

    exportManualCSV(sectionKey) {
        let rows = [["Seccion", "Documento", "Tipo", "URL", "Codigo", "Version", "Fecha"]];

        const sectionsToExport = sectionKey === 'all'
            ? Object.entries(MANUAL_STRUCTURE)
            : [[sectionKey, MANUAL_STRUCTURE[sectionKey]]];

        sectionsToExport.forEach(([key, section]) => {
            section.docs.forEach(doc => {
                rows.push([
                    section.title,
                    doc.name,
                    "PDF",
                    doc.url,
                    doc.code,
                    doc.version,
                    doc.date
                ]);
            });
        });

        const csvContent = "data:text/csv;charset=utf-8,"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Manual_Interventoria_${sectionKey}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.addMessage('bot', `Se ha generado la exportación CSV de la sección **${sectionKey === 'all' ? 'Completa' : MANUAL_STRUCTURE[sectionKey].title}**.`);
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
                <td><span class="badge-resp">${item.responsible}</span></td>
                <td><small>${item.evidence}</small></td>
                <td class="citation-small">${this.formatRichText(item.citation)}</td>
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

        // Limpiar marcador anterior de scroll
        const oldMarker = document.getElementById('last-question');
        if (oldMarker) oldMarker.id = '';

        const lowerText = text.toLowerCase();
        this.addMessage('user', text, { id: 'last-question' });
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

        // Formateo de Markdown simple (NotebookLM Style)
        let formattedText = text;

        // Headers ####
        formattedText = formattedText.replace(/#### (.*)/g, '<h4>$1</h4>');

        // 1. Bold text **text**
        formattedText = formattedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        // 2. Unordered lists (groups of lines starting with *)
        formattedText = formattedText.replace(/(?:^\* .*(?:\r?\n|$))+/gm, (match) => {
            const items = match.trim().split('\n').map(li => `<li>${li.replace(/^\* /, '')}</li>`).join('');
            return `<ul>${items}</ul>`;
        });

        // 3. Ordered lists (groups of lines starting with 1. 2. etc)
        formattedText = formattedText.replace(/(?:^\d+\. .*(?:\r?\n|$))+/gm, (match) => {
            const items = match.trim().split('\n').map(li => `<li>${li.replace(/^\d+\. /, '')}</li>`).join('');
            return `<ol>${items}</ol>`;
        });

        // 4. Line breaks and paragraphs
        formattedText = formattedText.replace(/\n\n/g, '</p><p>');
        formattedText = formattedText.replace(/\n/g, '<br>');

        // Resaltar y hacer vinculables los formularios FR-X
        formattedText = formattedText.replace(/(FR-\d+)/g, '<span class="form-link-tag" title="Click para copiar y ver manual" onclick="app.searchForm(\'$1\')">$1</span>');

        // Incluir vínculos directos a manuales/documentos si se detectan IDs de fuente
        formattedText = this.formatRichText(formattedText);

        // Auto-bolding para términos críticos (como 'Suspensión')
        if (type === 'bot') {
            const criticalTerms = ['REQUISITO', 'OBLIGATORIO', 'PLAZO', 'SECOP II'];
            criticalTerms.forEach(term => {
                const regex = new RegExp(`\\b(${term})\\b`, 'g');
                formattedText = formattedText.replace(regex, '<strong>$1</strong>');
            });
        }

        let html = `<div class="msg-header">${type === 'bot' ? 'ANALISTA JURÍDICO' : 'USUARIO'}</div>`;

        // Mostrar Evaluación de Confianza para respuestas del bot
        if (type === 'bot' && options.confidence) {
            const confClass = `confidence-${options.confidence.level}`;
            const confLabel = options.confidence.level.toUpperCase();
            html += `<div class="confidence-indicator ${confClass}" title="${options.confidence.reason}">
                        <span>🛡️ Fiabilidad: ${confLabel}</span>
                        <small style="margin-left:auto; opacity:0.8;">${options.confidence.reason}</small>
                    </div>`;
        }

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
        if (options.id) div.id = options.id;
        container.appendChild(div);

        // Si es mensaje de usuario o bot, queremos que se vea la pregunta.
        // Scroll al marcador de la última pregunta.
        const marker = document.getElementById('last-question');
        if (marker) {
            marker.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            container.scrollTop = container.scrollHeight;
        }
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

            // REVISIÓN DE INTEGRIDAD PREVIA
            if (!this.isHealthy) {
                this.removeThinking(thinkingId);
                this.addMessage('bot', "⚠️ **Aviso de Integridad:** No puedo garantizar el acceso a las fuentes originales en este momento. La respuesta se basa en la memoria local indexada, pero la trazabilidad documental completa puede estar comprometida.", { tags: ["Sistema-Aviso"] });
                // Continuamos pero con advertencia
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
                "suspension": ["interrupción", "parar", "frenar", "congelar", "reanudación", "reanudacion"],
                "items": ["apu", "precios", "actividades no previstas", "no previstos"],
                "adición": ["adicion", "prórroga", "prorroga", "ampliación", "modificación", "modificacion"],
                "informes": ["semanal", "mensual", "seguimiento", "jueves", "fr-3", "fr-1", "reporte"]
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
                    const kbEntry = KNOWLEDGE_BASE.find(kb => kb.procedureId === best.data.id);
                    const confidence = this.calculateConfidence(best, query);

                    if (kbEntry) {
                        this.addMessage('bot', kbEntry.responseContent, {
                            evidence: kbEntry.evidence,
                            location: kbEntry.location,
                            tags: kbEntry.tags,
                            confidence: confidence
                        });
                    } else {
                        this.addMessage('bot', `He detectado que tu consulta está relacionada con el procedimiento de **${best.data.title}**. \n\n${best.data.summary}`, {
                            location: `Manual MEPI | ${best.data.source_id}`,
                            tags: [best.data.id, "Contexto-Manual"],
                            confidence: confidence
                        });
                    }
                } else if (best.type === 'kb') {
                    const kb = best.data;
                    if (kb.procedureId) this.selectProcedure(kb.procedureId);
                    const confidence = this.calculateConfidence(best, query);

                    this.addMessage('bot', kb.responseContent, {
                        evidence: kb.evidence,
                        location: kb.location,
                        tags: kb.tags,
                        confidence: confidence
                    });
                }
            } else {
                // FALLBACK ESTRATÉGICO: Búsqueda en entidades de relación
                let entityMatch = null;
                for (const [key, entity] of Object.entries(RELATION_ENTITIES)) {
                    if (q.includes(key.toLowerCase()) || q.includes(entity.title.toLowerCase())) {
                        entityMatch = entity;
                        break;
                    }
                }

                if (entityMatch) {
                    this.addMessage('bot', `#### Detalle Técnico: ${entityMatch.title}\n\n${entityMatch.description}\n\n${entityMatch.rich || ''}`, {
                        tags: ["Diccionario-Técnico"]
                    });
                } else {
                    // Verificación de relevancia de dominio (Construcción/Interventoría/INVÍAS)
                    const domainKeywords = ["obra", "interventoría", "interventoria", "contrato", "invías", "invias", "manual", "procedimiento", "técnico", "tecnico", "legal", "social", "ambiental", "predial", "finanzas", "pago", "plazo", "secop", "acta", "seguimiento", "bitácora", "bitacora", "fcs", "apu", "ítem", "item"];
                    const isDomainRelated = domainKeywords.some(kw => q.includes(kw));

                    if (isDomainRelated) {
                        this.addMessage('bot', "No localicé una cita literal exacta para el término consultado, pero analizando el manual **MEPI-MN1-IN**, te sugiero revisar las secciones generales de **Recibo Definitivo** o **Suspensión**, que contienen las reglas transversales de cumplimiento contractual. \n\n¿Deseas que abra el índice general para localizar la fase específica?", {
                            location: "Consulte el Índice General de Procedimientos MEPI",
                            tags: ["Asistente-Navegación"]
                        });
                    } else {
                        this.addMessage('bot', `Lo siento, como **Analista Jurídico de Smart Memory**, mi base de conocimientos está especializada exclusivamente en el **Protocolo INVIAS (Manual MEPI)**. 

La consulta realizada (**"${query}"**) no se encuentra dentro del alcance técnico o legal de los documentos indexados en este sistema.`, {
                            tags: ["Fuera-de-Alcance"]
                        });
                    }
                }
            }

        } catch (error) {
            console.error("Search Error:", error);
            this.errorCount++;
            this.removeThinking(thinkingId);

            if (this.errorCount >= 3) {
                this.addMessage('bot', "🚨 **Salvaguarda de Cierre Administrativo:** Se han detectado fallos repetitivos en la capa de análisis. El servicio de Smart Memory queda temporalmente suspendido para verificación de integridad del repositorio.", { tags: ["Error-Fatal"] });
            } else {
                this.addMessage('bot', "Se produjo un error en la capa de análisis documental. Por favor, reintenta con términos más específicos.", { tags: ["Error-Sistema"] });
            }
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
            // Buscar si el manual de este procedimiento existe en la estructura oficial
            let manualUrl = null;
            Object.values(MANUAL_STRUCTURE).forEach(section => {
                const found = section.docs.find(d => d.code === proc.source_id);
                if (found) manualUrl = found.url;
            });

            docs.forEach(doc => {
                docsHtml += `
                    <div class="doc-list-item" style="border-bottom: 1px solid var(--border); padding: 12px; display: flex; justify-content: space-between; align-items: center;">
                        <span><strong style="color: var(--secondary)">${doc}</strong> - Formato Requerido</span>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn btn-secondary btn-small" onclick="app.searchForm('${doc}')">Ver Análisis</button>
                            ${manualUrl ? `<a href="${manualUrl}" target="_blank" class="btn btn-primary btn-small" style="text-decoration: none; display: flex; align-items: center; justify-content: center;">📄 PDF</a>` :
                        `<a href="javascript:void(0)" onclick="app.searchForm('${doc}')" class="btn btn-primary btn-small" style="text-decoration: none; display: flex; align-items: center; justify-content: center;">🔍 Info</a>`}
                        </div>
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

    showEntityDetail(id, title, customDesc = "") {
        console.log("Mostrando detalle:", id, title);
        const container = document.getElementById('entity-details');
        if (!container) return;

        let entity = RELATION_ENTITIES[id] || RELATION_ENTITIES[title];

        if (!entity) {
            const kbMatch = KNOWLEDGE_BASE.find(kb =>
                kb.keywords.some(k => title.toLowerCase().includes(k.toLowerCase()))
            );
            if (kbMatch) {
                entity = {
                    title: title,
                    description: kbMatch.responseContent,
                    rich: kbMatch.responseContent
                };
            }
        }

        const content = entity ? (entity.rich || entity.description) : customDesc;
        const formattedContent = this.formatRichText(content);

        let html = `
            <div class="detail-card animate-fade-in" style="border-top: 4px solid var(--secondary)">
                <h4 style="color: var(--secondary); margin-bottom: 12px; font-size: 1.1rem; font-weight: 700;">${title}</h4>
                <div style="font-size: 0.92rem; color: #475569; margin-bottom: 25px; line-height: 1.6;">
                    ${formattedContent || 'Sin descripción detallada disponible en el manual.'}
                </div>
                
                <div class="detail-links" style="margin-top: 30px; border-top: 1px solid var(--border); padding-top: 20px;">
                    <button class="btn btn-secondary" style="width: 100%;" onclick="app.updateDetailsPanel('${this.currentProcedure ? this.currentProcedure.id : 'inicio'}')">⬅️ Volver al Procedimiento</button>
                </div>
            </div>
        `;
        container.innerHTML = html;
        this.switchSideTab('info');
    },

    switchSideTab(tabId, event) {
        if (event) event.preventDefault();
        console.log("Cambiando a pestaña:", tabId);

        // Ensure the panel is visible on mobile when switching tabs
        if (window.innerWidth <= 850) {
            this.toggleDetails(true);
        }

        // Tab links
        document.querySelectorAll('.tab-link').forEach(btn => {
            btn.classList.remove('active');
            const handler = btn.getAttribute('onclick') || "";
            if (handler.includes(`'${tabId}'`)) {
                btn.classList.add('active');
            }
        });

        // Tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        const activeTab = document.getElementById(`side-tab-${tabId}`);
        if (activeTab) {
            activeTab.classList.add('active');
            // Scroll to top
            const scrollArea = activeTab.closest('.tab-content-scroll');
            if (scrollArea) scrollArea.scrollTop = 0;
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


    downloadReference(index) {
        alert(`Iniciando descarga del documento PDF referenciado en la cita [${index + 1}] del manual. Enlace simulado a repositorio INVÍAS.`);
    },

    // --- Módulo de Trivia (Basado en Instructivos Prueba) ---
    trivia: {
        currentIdx: 0,
        score: 0,
        timer: null,
        timeLeft: 5,
        history: [20], // Base line for graph
        questions: [
            {
                q: "¿Cuál es el plazo máximo para realizar la Reunión Técnica Inicial una vez impartida la orden de inicio de los contratos de obra e interventoría?",
                o: ["5 días hábiles", "3 días hábiles", "10 días calendario", "8 días hábiles"],
                a: 1,
                e: "Según MEPI-MN1-IN-1, la RTI debe realizarse máximo dentro de los tres (3) días hábiles siguientes a la orden de inicio."
            },
            {
                q: "¿A qué hace referencia el término 'Proyectos de mínimo impacto' según la gestión ambiental (MASPS-MN1-IN-1)?",
                o: ["Sin inversión presupuestal", "Baja alteración al ambiente natural", "Licencia ANLA exclusiva", "Sin supervisión de interventoría"],
                a: 1,
                e: "Son proyectos en zonas intervenidas con muy baja alteración a los recursos naturales o al paisaje."
            },
            {
                q: "¿Cuál es el objetivo principal de las Actas de Vecindad (MASPS-MN1-IN-3)?",
                o: ["Estado físico previo para prevenir reclamaciones", "Expropiar predios en zona reserva", "Avaluar para compensaciones", "Registrar mano de obra local"],
                a: 0,
                e: "Establecer el estado previo de infraestructura aledaña para identificar averías y prevenir falsas reclamaciones."
            },
            {
                q: "Según MEPI-MN1-IN-2, ¿qué % máximo del anticipo se puede usar para compra de maquinaria sin resolución adicional?",
                o: ["10%", "15%", "20%", "30%"],
                a: 1,
                e: "Sólo se permite hasta el 15%; porcentajes mayores requieren resolución del Director General."
            },
            {
                q: "¿Plazo para liquidación unilateral si no hay mutuo acuerdo (MEPI-MN1-IN-18)?",
                o: ["15 días hábiles", "6 meses", "1 año siguiente", "2 meses siguientes al plazo de mutuo acuerdo"],
                a: 3,
                e: "INVIAS puede liquidar unilateralmente dentro de los 2 meses siguientes al vencimiento del plazo de mutuo acuerdo."
            }
        ]
    },

    initTrivia() {
        this.trivia.currentIdx = Math.floor(Math.random() * this.trivia.questions.length);
        this.drawTriviaGraph();
    },

    toggleTrivia() {
        const box = document.getElementById('trivia-container');
        const content = document.getElementById('trivia-content');
        const icon = document.getElementById('trivia-toggle-icon');

        const isMinimized = box.classList.contains('minimized');
        if (isMinimized) {
            box.classList.remove('minimized');
            content.style.display = 'block';
            icon.innerText = '-';
            this.renderTriviaQuestion();
        } else {
            box.classList.add('minimized');
            content.style.display = 'none';
            icon.innerText = '+';
            clearInterval(this.trivia.timer);
        }
    },

    startTriviaTimer() {
        clearInterval(this.trivia.timer);
        this.trivia.timeLeft = 5;
        this.updateTriviaTimerUI();

        this.trivia.timer = setInterval(() => {
            this.trivia.timeLeft--;
            this.updateTriviaTimerUI();

            if (this.trivia.timeLeft <= 0) {
                this.checkAnswer(-1); // Tiempo agotado
            }
        }, 1000);
    },

    updateTriviaTimerUI() {
        const span = document.getElementById('trivia-timer');
        const fill = document.getElementById('trivia-timer-fill');
        if (span) span.innerText = this.trivia.timeLeft;
        if (fill) fill.style.width = `${(this.trivia.timeLeft / 5) * 100}%`;
    },

    renderTriviaQuestion() {
        const qData = this.trivia.questions[this.trivia.currentIdx];
        document.getElementById('trivia-question').innerText = qData.q;
        const optionsContainer = document.getElementById('trivia-options');
        optionsContainer.innerHTML = '';
        document.getElementById('trivia-feedback').innerText = '';

        qData.o.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'trivia-button';
            btn.innerText = opt;
            btn.onclick = () => this.checkAnswer(idx);
            optionsContainer.appendChild(btn);
        });

        this.startTriviaTimer();
    },

    checkAnswer(idx) {
        clearInterval(this.trivia.timer);
        const qData = this.trivia.questions[this.trivia.currentIdx];
        const buttons = document.querySelectorAll('.trivia-button');
        const feedback = document.getElementById('trivia-feedback');

        buttons.forEach(btn => btn.disabled = true);

        let delta = -5;
        if (idx === qData.a) {
            delta = 5;
            feedback.innerHTML = `<span style="color: #166534">✅ ¡Correcto!</span><br><small>${qData.e}</small>`;
            if (idx !== -1) buttons[idx].classList.add('correct');
        } else {
            feedback.innerHTML = `<span style="color: #991b1b">❌ Incorrecto.</span><br><small>${qData.e}</small>`;
            if (idx !== -1) buttons[idx].classList.add('wrong');
            if (idx === -1) feedback.innerHTML = `<span style="color: #991b1b">⏰ ¡Tiempo agotado!</span><br><small>${qData.e}</small>`;
            buttons[qData.a].classList.add('correct');
        }

        this.trivia.score += delta;
        document.getElementById('trivia-score').innerText = this.trivia.score;
        this.trivia.history.push(Math.max(0, Math.min(40, this.trivia.history[this.trivia.history.length - 1] + (delta))));
        this.drawTriviaGraph();

        setTimeout(() => {
            this.trivia.currentIdx = Math.floor(Math.random() * this.trivia.questions.length);
            this.renderTriviaQuestion();
        }, 3000);
    },

    drawTriviaGraph() {
        const canvas = document.getElementById('trivia-graph');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Draw Baseline
        ctx.strokeStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();

        ctx.lineWidth = 2;
        const history = this.trivia.history;
        const step = w / Math.max(10, history.length - 1);

        for (let i = 1; i < history.length; i++) {
            ctx.beginPath();
            ctx.moveTo((i - 1) * step, h - history[i - 1]);
            ctx.lineTo(i * step, h - history[i]);

            // Color based on increase or decrease
            if (history[i] > history[i - 1]) {
                ctx.strokeStyle = '#3b82f6'; // Blue for success
            } else {
                ctx.strokeStyle = '#ef4444'; // Red for failure
            }
            ctx.stroke();
        }
    }
};

app.init();
