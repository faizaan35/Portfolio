export const PORTFOLIO_DATA = {
  profile: {
    name: "MOHD FAIZAAN",
    title: "Computer Science & Software Engineer",
    tagline: "I build systems, applications and software from the ground up.",
    systemId: "MF-SYS-CORE // v2026.09",
    status: "DISPATCH OK // READY"
  },
  engineering: [
    {
      category: "Languages",
      specId: "SPEC_01",
      desc: "Low-level memory management, systems programming, and high-performance typed engines.",
      items: ["C++17/20", "Java", "Python", "JavaScript / TS", "Dart", "SQL", "C"]
    },
    {
      category: "Systems & Internals",
      specId: "SPEC_02",
      desc: "Designing disk layouts, page buffer pools, crash journals, and synchronization primitives.",
      items: ["Database Internals", "B+ Tree Indexing", "Buffer Pool Mgmt", "Write-Ahead Logging (WAL)", "Concurrency & Mutexes"]
    },
    {
      category: "Backend & Distributed",
      specId: "SPEC_03",
      desc: "Resilient distributed backends handling atomic ledger balance mutations and idempotent APIs.",
      items: ["Spring Boot", "Node.js", "ACID Transactions", "REST Protocols", "Idempotency", "Microservices"]
    },
    {
      category: "Databases & Storage",
      specId: "SPEC_04",
      desc: "Relational modeling, composite indexing strategies, buffer cache sizing, and binary disk serialization.",
      items: ["MySQL", "MongoDB", "Custom Slotted Storage", "Redis", "Disk Serialization"]
    }
  ],
  projects: [
    {
      id: "emberdb",
      numStr: "01 / 04",
      type: "SYSTEMS / RELATIONAL STORAGE ENGINE",
      title: "EMBERDB",
      desc: "A relational database engine built from scratch in C++17. Features disk-backed slotted page architecture, a page buffer pool with Clock/LRU eviction, persistent B+ Tree indices, and transactional recovery via Write-Ahead Logging (WAL).",
      specs: [
        "C++17 Native Engine",
        "LRU Buffer Pool",
        "B+ Tree Disk Index",
        "WAL ARIES Recovery"
      ],
      architecture: "Recursive-descent SQL parser, Volcano iterator execution model, 4096-byte hardware block alignment, and strict write-ahead transaction durability.",
      tags: ["C++17", "Systems Architecture", "B+ Tree", "Buffer Pool", "WAL", "Disk I/O"],
      github: "https://github.com",
      demo: null
    },
    {
      id: "mini-upi",
      numStr: "02 / 04",
      type: "FINTECH / DISTRIBUTED BACKEND",
      title: "MINI UPI PAYMENT ECOSYSTEM",
      desc: "A distributed simulated UPI payment gateway and inter-bank routing engine with strict transactional consistency. Enforces atomic balance mutations with two-phase locking, double-entry ledger bookkeeping, and idempotent request handling under high concurrency.",
      specs: [
        "Double-Entry Accounting",
        "Idempotency Keys",
        "Spring Boot API",
        "MySQL ACID Engine"
      ],
      architecture: "Payment request dispatch -> Inter-bank routing -> Two-phase balance lock -> Immutable ledger audit journal.",
      tags: ["Java", "Spring Boot", "MySQL", "Distributed Systems", "REST API", "ACID"],
      github: "https://github.com",
      demo: "https://example.com"
    },
    {
      id: "fitness-tracker",
      numStr: "03 / 04",
      type: "MOBILE / SENSOR TELEMETRY",
      title: "FITNESS TRACKER",
      desc: "Cross-platform mobile application written in Flutter and SQLite. Streams real-time pedometer and accelerometer telemetry, runs client-side moving average smoothing, and computes offline health forecasts with zero network latency.",
      specs: [
        "Flutter Native Framework",
        "Local SQLite Persistence",
        "Sensor Telemetry",
        "Zero-Latency Charts"
      ],
      architecture: "High-frequency accelerometer capture -> Sliding-window smoothing -> Offline SQLite local write -> AI predictive trend forecast.",
      tags: ["Flutter", "Dart", "SQLite", "Biometric Sensors", "State Management", "AI"],
      github: "https://github.com",
      demo: null
    },
    {
      id: "sign-translator",
      numStr: "04 / 04",
      type: "COMPUTER VISION / MACHINE LEARNING",
      title: "INDIAN SIGN LANGUAGE TRANSLATOR",
      desc: "Real-time computer vision and deep learning pipeline mapping continuous spatial hand gestures to semantic language tokens. Extracts 21-point 3D landmark coordinates using Google MediaPipe and evaluates temporal sequence frames in real time.",
      specs: [
        "MediaPipe 21-Point Tracking",
        "TensorFlow Pipeline",
        "Real-Time OpenCV",
        "Temporal Tokenizer"
      ],
      architecture: "Live camera ingestion -> MediaPipe coordinate vectorization -> Multi-frame sequence buffer -> TensorFlow inference -> Text output.",
      tags: ["Python", "TensorFlow", "MediaPipe", "OpenCV", "Computer Vision", "Deep Learning"],
      github: "https://github.com",
      demo: "https://example.com"
    }
  ],
  journey: [
    {
      period: "2023 — PRESENT",
      stage: "SYSTEMS & ARCHITECTURE",
      role: "Low-Level Database Internals & C++ Storage Engine Architecture",
      summary: "Authored EmberDB from scratch in C++17. Designed custom disk serializers, LRU memory frame buffers, multi-level B+ Tree access paths, and crash-resilient write-ahead logging.",
      badges: ["Slotted Pages", "Buffer Caching", "ARIES Recovery"]
    },
    {
      period: "2022 — 2024",
      stage: "DISTRIBUTED BACKENDS & TELEMETRY",
      role: "Distributed Payment Clearance & Mobile Sensor Pipelines",
      summary: "Architected a simulated UPI double-entry accounting ledger in Spring Boot and MySQL with idempotent operations. Engineered zero-latency sensor telemetry pipelines with SQLite local persistence in Flutter.",
      badges: ["Spring Boot", "ACID Ledgers", "Flutter Telemetry"]
    },
    {
      period: "2021 — 2023",
      stage: "ACADEMICS & ALGORITHMIC ROOTS",
      role: "Computer Science Foundations & Machine Learning Vision",
      summary: "Rigorous focus on advanced Data Structures, Algorithmic Analysis, Computer Vision, and Operating System principles. Trained temporal gesture models using MediaPipe spatial keypoints.",
      badges: ["Data Structures", "Computer Vision", "Operating Systems"]
    }
  ]
};
