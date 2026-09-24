export const PORTFOLIO_DATA = {
  profile: {
    name: "MOHD FAIZAAN",
    title: "Computer Science & Software Engineer",
    tagline: "I build systems, applications and software from the ground up."
  },
  engineering: [
    {
      category: "Languages",
      desc: "Low-level memory management, systems programming, and high-performance typed engines.",
      items: ["C++17/20", "Java", "Python", "JavaScript / TS", "Dart", "SQL", "C"]
    },
    {
      category: "Systems & Internals",
      desc: "Designing disk layouts, page buffer pools, crash journals, and synchronization primitives.",
      items: ["Database Internals", "B+ Tree Indexing", "Buffer Pool Mgmt", "Write-Ahead Logging (WAL)", "Concurrency & Mutexes"]
    },
    {
      category: "Backend & Distributed",
      desc: "Resilient distributed backends handling atomic ledger balance mutations and idempotent APIs.",
      items: ["Spring Boot", "Node.js", "ACID Transactions", "REST Protocols", "Idempotency", "Microservices"]
    },
    {
      category: "Databases & Storage",
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
      github: "https://github.com/faizaan35/EmberDB",
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
      architecture: "Payment request -> Inter-bank routing -> Two-phase balance lock -> Immutable ledger audit journal.",
      tags: ["Java", "Spring Boot", "MySQL", "Distributed Systems", "REST API", "ACID"],
      github: "https://github.com/faizaan35/upi-payment-ecosystem",
      demo: null
    },
    {
      id: "fitness-tracker",
      numStr: "03 / 04",
      type: "MOBILE / HEALTH & FITNESS",
      title: "FITNESS TRACKER",
      desc: "Cross-platform mobile application written in Flutter and Hive DB. Features real-time step and activity tracking, client-side moving average smoothing, and fast local persistence with an offline-first architecture.",
      specs: [
        "Flutter Native Framework",
        "Local Hive DB Persistence",
        "Step & Motion Tracking",
        "Offline-First Architecture"
      ],
      architecture: "Accelerometer sensor capture -> Sliding-window smoothing -> Offline Hive DB local write -> Activity trend analysis.",
      tags: ["Flutter", "Dart", "Hive DB", "Sensors", "State Management", "Mobile Development"],
      github: "https://github.com/faizaan35/fit__io",
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
      github: "https://github.com/faizaan35/indianSignLanguage-Transaltor",
      demo: null
    }
  ],
  journey: [
    {
      period: "2026 — PRESENT",
      stage: "SYSTEMS & ARCHITECTURE",
      role: "Database Internals & C++ Storage Engine Architecture",
      summary: "Authored EmberDB from scratch in C++17. Designed custom disk serializers, LRU memory frame buffers, multi-level B+ Tree access paths, and crash-resilient write-ahead logging.",
      badges: ["Slotted Pages", "Buffer Caching", "ARIES Recovery"]
    },
    {
      period: "2024 — 2026",
      stage: "DISTRIBUTED BACKENDS & APPLICATIONS",
      role: "Distributed Payment Systems & Mobile Applications ",
      summary: "Architected a simulated UPI double-entry accounting ledger in Spring Boot and MySQL with idempotent operations. Built an offline-first fitness tracking mobile application in Flutter with local Hive DB persistence.",
      badges: ["Spring Boot", "ACID Ledgers", "Flutter & Hive DB"]
    },
    {
      period: "2022 — 2024",
      stage: "ACADEMICS & ALGORITHMIC ROOTS",
      role: "Computer Science Foundations & Machine Learning",
      summary: "Rigorous focus on advanced Data Structures, Algorithmic Analysis, Computer Vision, and Operating System principles. Trained temporal gesture models using MediaPipe spatial keypoints.",
      badges: ["Data Structures", "Computer Vision", "Operating Systems"]
    }
  ]
};
