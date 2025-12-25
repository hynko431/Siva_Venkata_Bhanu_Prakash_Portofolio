const portfolioContext = {
    personalInfo: {
        name: "Irakam Siva Venkata Bhanu Prakash",
        role: "AI/ML Engineer & Full-Stack Developer",
        location: "Gudur, Tirupathi, A.P., India - 524101",
        email: "irakamsivabhanuprakash@gmail.com",
        phone: "+91 8977899897",
        resumeLink: "/Images/SivaVenkataBhanuPrakash_Resume.pdf"
    },
    socialLinks: {
        github: "https://github.com/hynko431",
        linkedin: "https://www.linkedin.com/in/siva-venkata-bhanu-prakash/"
    },
    summary: "I’m an AI & Machine Learning Engineer passionate about building intelligent, data-driven applications that bridge research and real-world impact. I specialize in Computer Vision, NLP, and LLM-based systems using TensorFlow, Keras, and Hugging Face. My work focuses on clean architecture, efficient model deployment, and seamless user interfaces powered by Flask, FastAPI, and Streamlit.",
    skills: [
        { name: "Machine Learning", level: "92%" },
        { name: "Deep Learning (Keras/TensorFlow)", level: "90%" },
        { name: "Computer Vision", level: "88%" },
        { name: "NLP / Transformers", level: "86%" },
        { name: "Python / FastAPI / Flask", level: "90%" },
        { name: "SQL / MongoDB", level: "84%" },
        { name: "Data Analysis / EDA", level: "87%" },
        { name: "Model Deployment / Streamlit", level: "83%" },
        { name: "LangChain / RAG", level: "80%" },
        { name: "Model Optimization / AutoML", level: "78%" },
        { name: "Git / GitHub", level: "91%" }
    ],
    projects: [
        {
            title: "Agentic MedicalReport Analysis",
            description: "AI-powered system that uses multi-agent LLMs and RAG to analyze medical reports, generate diagnostic insights, and support context-aware Q&A through a streamlined Streamlit interface.",
            techStack: ["Python 3.x", "RAG", "Streamlit", "LangChain / LangGraph", "FAISS", "Pydantic", "Pathlib & Dotenv", "HuggingFace Embeddings"],
            liveUrl: "https://ai-agentic-medicalreport-analysis.streamlit.app/",
            githubUrl: "https://github.com/hynko431/Agentic-MedicalReport-Analysis"
        },
        {
            title: "Tele Medicine Pro",
            description: "End-to-end Tele-Medicine platform supporting video/phone consults, secure messaging, triage & scheduling, and remote vitals. Implemented RBAC, encryption, and audit logging to protect patient data.",
            techStack: ["React", "Flask / FastAPI", "WebRTC", "JWT / RBAC", "MongoDB", "PostgreSQL"],
            liveUrl: "",
            githubUrl: "https://github.com/hynko431/TeleMedicine-Pro"
        },
        {
            title: "HematoVision — Blood Cell Classification",
            description: "Transfer-learning pipeline (MobileNetV2) for blood-cell classification on ~12.5k augmented images. Packaged model and served via a Flask inference API.",
            techStack: ["TensorFlow", "Keras", "Flask API", "Data Augmentation"],
            liveUrl: "",
            githubUrl: "https://github.com/hynko431/HematoVision-Advanced-Blood-Cell-Classification-Using-Transfer-Learning"
        }
    ]
};

module.exports = portfolioContext;
