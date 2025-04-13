
---

## **DigitalOcean Birthday Reminder App – Setup & QBR Narrative**

### **Setup Guide Overview**

This project implements a phased architecture for deploying a cloud-native Birthday Reminder App hosted on DigitalOcean. Each phase adds new functionality, with a focus on scalability, persistence, and AI integration.

---

### **Phase 1 – MVP Deployment**

- **Tools Used:**
  - DigitalOcean LoadBalancer
  - DigitalOcean Kubernetes Service (DOKS)
  - DigitalOcean Container Registry

- **Components:**
  - A simple user-facing pod that delivers birthday reminders
  - Fully containerized and deployed to DOKS

- **Objective:**
  - Rapid validation of the core application
  - Basic deployment and external access via load balancing

---

### **Phase 2 – Persistence Layer**

- **Enhancement:**
  - Integration of DigitalOcean Managed PostgreSQL for persistent data storage

- **Backend Improvements:**
  - Support for creating, storing, and querying user birthday records
  - Addition of APIs for updates and data retrieval

- **Version Control:**
  - Continued use of DigitalOcean Container Registry for storing image versions and managing rollouts

---

### **Phase 3 – Agentic AI Integration**

- **Goal:**
  - Enhance the system with intelligence using LangChain for natural interaction and automation of reminders

- **Stack Additions:**
  - DigitalOcean App Platform used to host the LangChain-powered agent

- **Architecture Result:**
  - Hybrid design:
    - Kubernetes pods manage UI and API
    - LangChain agent handles decision-making and interaction logic

---

## **Quarterly Business Review (QBR) Summary**

- **Project Scope:**
  - Deliver a fully functional, cloud-native birthday reminder service enhanced with AI features by the end of Q2

- **Milestones Achieved:**
  - MVP deployed with a containerized app in Week 2
  - Persistent PostgreSQL backend integrated by Week 4
  - LangChain agent live and operational by Week 6

- **Team Velocity:**
  - Averaged 5 story points per sprint across 3 sprints

- **Risks Addressed:**
  - Resolved resource over-provisioning in the initial Kubernetes cluster
  - Reduced PostgreSQL latency using connection pooling mechanisms

---

## **Performance and Cost Summary**

### **Performance Highlights**

- **App Response Time (Post-Persistence Phase):**
  - Average: 120 ms
  - P95: 250 ms
  - LangChain integration adds approximately 100 ms latency per request

- **Uptime (last 30 days):**
  - 99.96%
  - One minor incident due to a pod eviction

---

### **Cost Snapshot (Last 30 Days)**

- DOKS Cluster (2 nodes): $40/month  
- Managed PostgreSQL (1GB RAM, 1vCPU): $15/month  
- App Platform (LangChain): $20/month  
- Container Registry and Networking: ~$5/month  
- **Total Monthly Estimate:** ~$80/month

---

