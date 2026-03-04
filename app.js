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
        responseContent: `
#### Procedimiento de Inicio de Ejecución (MEPI-MN1-IN-1)

El instructivo establece el marco para la transición entre la adjudicación y el arranque material de las labores.

**Requisitos Previos y Orden de Inicio:**
*   **Base Administrativa:** Es obligatorio contar con el **Registro Presupuestal (RP)** y la aprobación de garantías/seguros.
*   **Sincronización:** La ejecución de obra **NO** debe iniciarse antes de la orden de inicio de la interventoría.
*   **SECOP II:** El cambio de estado a "en ejecución" en la plataforma surte efectos de notificación oficial.

**Hitos Iniciales:**
1.  **Visita Conjunta (Obligatoria):** Inspección de terreno con levantamiento multimedia (videos y fotos referenciadas con PR y fecha).
2.  **Reunión Técnica Inicial (RTI):** Debe ocurrir máximo a los **3 días hábiles** de la orden de inicio.
3.  **Apertura de Bitácora:** Debe realizarse el mismo día de la RTI con páginas foliadas y bajo custodia de la Interventoría.

**Plazos de Compromisos:**
Los compromisos pactados en el acta RTI tienen un plazo máximo de cumplimiento de **8 días hábiles**.`,
        evidence: [
            { source_id: "MEPI-MN1-IN-1", source_name: "Instructivo Inicio Ejecución", snippet: "La ejecución del contrato de obra no debe iniciarse con anterioridad a la orden de inicio del contrato de interventoría." },
            { source_id: "MEPI-MN1-IN-1", source_name: "Instructivo Inicio Ejecución", snippet: "Máximo dentro de los tres (3) días hábiles siguientes se debe realizar una reunión técnica... Previa se debe efectuar una visita conjunta al sitio." },
            { source_id: "MEPI-MN1-IN-1", source_name: "Instructivo Inicio Ejecución", snippet: "Los compromisos pactados deben tener un plazo máximo de cumplimiento de ocho (8) días hábiles." }
        ],
        location: "MEPI-MN1-IN-1 Sección VI | Sección IX",
        tags: ["RTI", "Visita Conjunta", "Sincronización"]
    },
    {
        id: "kb-apu-detallado",
        keywords: ["apu", "no previsto", "items", "cotizaciones", "precios", "fijación", "fijacion"],
        responseContent: `
#### Procedimiento de APU e Ítems no Previstos (MEPI-MN1-IN-10)

La aprobación de nuevas actividades exige una justificación técnica, económica y jurídica rigurosa.

**Requisitos de la Carpeta:**
*   **Solicitud formal:** Firmada por el Representante Legal con justificación de impacto en metas físicas.
*   **Consulta de precios oficial:** Copia de consulta en web de INVIAS y análisis comparativo.
*   **Formato APU (FR-1):** Diligenciado con memorias técnicas de cantidades y rendimientos.

**Gestión de Cotizaciones:**
*   **Mínimo 3 cotizaciones:** Obligatorias para insumos nuevos.
*   **Procedencia:** Deben ser de la zona del proyecto o la más cercana.
*   **Vigencia:** Deben estar vigentes y provenir de distribuidores autorizados.

**Prohibición de Ejecución:**
Es **OBLIGATORIO** contar con el **Acta de Fijación (FR-4)** firmada antes de iniciar cualquier labor. El Interventor tiene prohibido permitir ejecuciones sin este documento suscrito.`,
        evidence: [
            { source_id: "MEPI-MN1-IN-10", source_name: "Instructivo APU", snippet: "El Interventor no debe permitir la ejecución de actividades correspondientes a ítems no previstos, sin la suscripción del formato MEPI-MN1-IN-10-FR-4." },
            { source_id: "MEPI-MN1-IN-10", source_name: "Instructivo APU", snippet: "Tres (3) cotizaciones de los nuevos insumos... obtenidas en la zona del proyecto." }
        ],
        location: "MEPI-MN1-IN-10 Sección VII | Sección IX",
        tags: ["APU", "FR-4", "No Previstos"]
    },
    {
        id: "kb-fcs",
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
        id: "kb-suspension-detallada",
        keywords: ["suspensión", "reanudación", "secop", "garantías"],
        responseContent: `
#### Procedimiento de Suspensión y Reanudación (MEPI-MN1-IN-11)

Según el manual MEPI, el proceso de suspensión es crítico para la seguridad jurídica del contrato.

**Causales y Condiciones:**
*   Procede por **fuerza mayor, caso fortuito o interés público**.
*   **Simultaneidad:** La suspensión de interventoría implica obligatoriamente la de obra.

**Formalidades en SECOP II:**
*   **Primacía Digital:** La fecha que prima es la registrada en la plataforma **SECOP II**, no la del acta física.
*   **Validez:** No se entiende suspendido sin la firma electrónica del funcionario competente.

**Actualización de Garantías:**
*   Es obligación del contratista actualizar las pólizas ampliando la vigencia por el tiempo de suspensión.
*   **Plazo Fatal:** Máximo **3 días hábiles** tras la reanudación para presentar los certificados de modificación ante el Instituto, so pena de acciones legales.`,
        evidence: [
            { source_id: "MEPI-MN1-IN-11", source_name: "Instructivo Suspensión", snippet: "Prima la fecha indicada en la plataforma [SECOP II] sobre la señalada en el formato." },
            { source_id: "MEPI-MN1-IN-11", source_name: "Instructivo Suspensión", snippet: "Dentro de los tres (3) días hábiles siguientes a la fecha de reanudación... obligan a presentar... certificados de modificación." }
        ],
        location: "MEPI-MN1-IN-11 Sección IV | Gestión SECOP II",
        tags: ["Suspensión", "SECOP II", "Garantías"]
    },
    {
        id: "kb-adicion",
        keywords: ["adición", "adicion", "prórroga", "prorroga", "modificación", "modificacion", "30 días", "comité"],
        responseContent: `
#### Adición, Modificación y Prórroga (MEPI-MN1-IN-12 / IN-13)

Cualquier alteración en tiempo, alcance o presupuesto debe estar plenamente justificada y legalizada.

**La Regla de los 30 Días:**
Toda solicitud formal, con soportes originales suscritos, debe presentarse a la Unidad Ejecutora con una **antelación mínima de 30 días calendario** al vencimiento del contrato.

**Requisitos de Viabilidad:**
*   **Concepto de Sostenibilidad:** Si afecta recursos ambientales, sociales o prediales, requiere concepto previo favorable de la Subdirección de Sostenibilidad.
*   **Vigencias Futuras:** Obligatorias si la prórroga trasciende la vigencia fiscal en curso.
*   **Comité de Contratación:** Máximo filtro de control. Su aprobación por sí sola no autoriza la ejecución; se requiere la suscripción de la **Minuta**.

**Legalización:**
Es requisito ineludible la **actualización de garantías** antes de la firma de la minuta. Tras la suscripción, se deben ajustar los Programas de Obra e Inversión.`,
        evidence: [
            { source_id: "MEPI-MN1-IN-12", source_name: "Instructivo Adición", snippet: "Presentar a la Unidad Ejecutora la solicitud formal... con una antelación mínima de treinta (30) días calendario." },
            { source_id: "MEPI-MN1-IN-12", source_name: "Instructivo Adición", snippet: "Se requiere obligatoriamente de la suscripción y legalización de la minuta contractual." }
        ],
        location: "MEPI-MN1-IN-12 Sección IV | Sección VII",
        tags: ["Adición", "Prórroga", "Comité de Contratación"]
    },
    {
        id: "kb-informes",
        keywords: ["informe semanal", "informe mensual", "jueves", "fr-1", "fr-3", "seguridad social", "pago"],
        responseContent: `
#### Informes Semanales y Mensuales (MEPI-MN1-IN-15)

Sistema de seguimiento estandarizado para documentar el avance físico y financiero del proyecto.

**Informe Semanal (FR-3):**
*   **Corte de Tiempo:** La fecha de corte es estrictamente todos los **días JUEVES**.
*   **Contenido:** Gráfico de avance, indicador I/C y registro fotográfico comparativo (antes, durante y después).

**Informe Mensual (FR-1):**
*   **Obligatoriedad:** El formato **FR-1 (Lista de Chequeo)** debe ser obligatoriamente la **PÁGINA UNO (1)** del informe.
*   **Orden:** Los documentos deben seguir exactamente el orden de la lista de chequeo con folios coincidentes.

**Seguridad Social y Pago:**
*   **Control Laboral (FR-6/7):** El Interventor debe verificar el pago de aportes de ley y parafiscales, cruzándolos con la **nómina electrónica**.
*   **Condición de Pago:** La radicación completa del Informe Mensual es requisito indispensable para autorizar el pago de la interventoría.`,
        evidence: [
            { source_id: "MEPI-MN1-IN-15", source_name: "Instructivo Informes", snippet: "Su fecha de corte es siempre el día jueves." },
            { source_id: "MEPI-MN1-IN-15", source_name: "Instructivo Informes", snippet: "Este formato [FR-1] debe ser obligatoriamente la página uno (1) del informe." },
            { source_id: "MEPI-MN1-IN-15", source_name: "Instructivo Informes", snippet: "La presentación completa del Informe Mensual... es un requisito indispensable para la autorización del pago." }
        ],
        location: "MEPI-MN1-IN-15 Sección IV | Control Laboral",
        tags: ["Informes", "FR-1", "Corte Jueves", "Seguridad Social"]
    },
    {
        id: "kb-recibo",
        keywords: ["recibo", "definitivo", "visita previa", "pendiente", "planos record", "sancionatorio", "entrega", "liquidación"],
        responseContent: `
#### Recibo Definitivo y Liquidación (MEPI-MN1-IN-16 / IN-18)

Cierre estructurado para salvaguardar recursos y garantizar la calidad de la infraestructura.

**Fase 1: Visita Previa (La Regla de los 30 Días):**
*   **Temporalidad:** Realizar visita conjunta **30 días calendario** antes del vencimiento (15 días si el contrato < 6 meses).
*   **Objetivo:** Inspeccionar y documentar con el formato **FR-1** todas las correcciones obligatorias.
*   **Verificación SIG:** Se deben validar los **planos récord (As-built)** y su compatibilidad con el sistema SIG del INVÍAS.

**Fase 2: Entrega y Recibo Definitivo (FR-2):**
*   **Hito Técnico:** Se materializa al vencimiento del plazo. Si hay pendientes no corregidos, se recibe la obra "en el estado en que se encuentre" SIN pagar lo defectuoso.
*   **Consecuencias:** Detona el **Proceso Administrativo Sancionatorio** y descuentos económicos inmediatos.

**Fase 3: Liquidación Contractual:**
*   **Bilateral:** De mutuo acuerdo; balance jurídico y contable final. El contratista puede dejar **salvedades** expresas.
*   **Unilateral:** Facultad excepcional del INVÍAS si el contratista no comparece o no hay acuerdo (dentro de los 2 meses siguientes).
*   **Saldos:** Se cruza lo ejecutado contra lo pagado, resultando en saldos a favor o en contra según los formatos FR-3/4.`,
        evidence: [
            { source_id: "MEPI-MN1-IN-16", source_name: "Visita y Recibo Definitivo", snippet: "Antelación mínima de treinta (30) días calendario... la Interventoría debe realizar visita conjunta." },
            { source_id: "MEPI-MN1-IN-16", source_name: "Visita y Recibo Definitivo", snippet: "Recibir las obras 'en el estado en que se encuentren'... lo que dará lugar a la aplicación de procedimientos sancionatorios." },
            { source_id: "MEPI-MN1-IN-18", source_name: "Instructivo Liquidación", snippet: "El INVIAS tiene la facultad de liquidar unilateralmente dentro de los dos (2) meses siguientes." }
        ],
        location: "MEPI-MN1-IN-16 Sección IV | MEPI-MN1-IN-18 Sección V",
        tags: ["Recibo Definitivo", "Liquidación", "FR-2", "Unilateral"]
    },
    {
        id: "kb-firma-negacion",
        keywords: ["firma", "negacion", "negación", "negativa", "niega", "rechazo", "acta", "suscribirla"],
        responseContent: `
#### Protocolo ante Negación de Firma de Actas

Ante la negativa del Contratista para suscribir documentos oficiales, el Interventor debe seguir un protocolo de Blindaje Jurídico.

**Acciones Inmediatas:**
*   **Suscripción Obligatoria:** El Interventor debe suscribir el acta en todo caso, incluso sin la firma de la contraparte.
*   **Constancia de Citación:** Es imperativo dejar registro escrito de la citación previa y la negativa expresa o tácita.

**Efectos en Liquidación:**
*   La falta de comparecencia faculta al INVÍAS para proceder con la **Liquidación Unilateral** mediante acto administrativo motivado.`,
        evidence: [
            { source_id: "MEPI-MN1-IN-16", source_name: "Visita y Recibo Definitivo", snippet: "En caso de que el contratista se niegue a firmar el acta, el Interventor debe proceder en todo caso a suscribirla." }
        ],
        location: "MEPI-MN1-IN-16 Sección V | Manual de Contratación Section 11.1",
        tags: ["Firma", "Blindaje Jurídico", "Liquidación"]
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
        formattedText = formattedText.replace(/(MEPI-MN1-IN-\d+)/g, '<a href="#" class="detail-link" onclick="app.showDocsByManual(\'$1\')">📄 $1</a>');

        // Auto-bolding para términos críticos (como 'Suspensión')
        if (type === 'bot') {
            const criticalTerms = ['REQUISITO', 'OBLIGATORIO', 'PLAZO', 'SECOP II'];
            criticalTerms.forEach(term => {
                const regex = new RegExp(`\\b(${term})\\b`, 'g');
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
