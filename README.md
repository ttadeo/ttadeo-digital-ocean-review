
# Birthday Reminder App on DigitalOcean

This project is a lightweight Node.js application deployed on DigitalOcean Kubernetes (DOKS) to manage birthday reminders. It evolves through three implementation phases, progressing from MVP to an AI-enhanced system.

---

## Project Phases

### Phase 1: MVP

- Stateless Node.js REST API
- Deployed on DOKS with Horizontal Pod Autoscaler (HPA)
- Public access via DigitalOcean LoadBalancer
- Docker image hosted in DigitalOcean Container Registry (DOCR)

### Phase 2: Persistent Storage

- Add DigitalOcean Managed PostgreSQL
- Enable persistent storage for birthday data
- Configure secure secrets and service-level networking

### Phase 3: Agentic AI Integration

- Integrate LangChain or OpenAI on DigitalOcean App Platform or DOKS
- Implement smart suggestions, notifications, and webhook-based automation
- Extend AI logic into the app backend for proactive behavior

---

## Stack Overview

- Application: Node.js with Express
- Platform: DigitalOcean Kubernetes (DOKS)
- Image Management: DigitalOcean Container Registry (DOCR)
- Database: DigitalOcean Managed PostgreSQL
- AI Agents: LangChain / OpenAI (future integration)

---

## Deployment Instructions

1. Create a container registry:
   ```bash
   doctl registry create birthday-registry
   ```

2. Build and push Docker image:
   ```bash
   docker build -t registry.digitalocean.com/ttadeo/birthday-reminder-app:vX .
   docker push registry.digitalocean.com/ttadeo/birthday-reminder-app:vX
   ```

3. Apply Kubernetes manifests:
   ```bash
   kubectl apply -f service.yaml
   kubectl apply -f deployment.yaml
   kubectl apply -f hpa.yaml
   ```

4. Retrieve service external IP:
   ```bash
   kubectl get svc
   ```

---

## Architecture Documentation

Refer to the `DigitalOcean_App_Architecture.pdf` file for a visual breakdown of all three project phases.

---

## Roadmap

- MVP implementation with Docker and DOKS
- Kubernetes HPA and public LoadBalancer
- PostgreSQL persistence integration (Phase 2)
- Agentic AI logic using LangChain or OpenAI (Phase 3)

---

## Author

Tim Tadeo – 2025  
DigitalOcean Deployment and Cloud Architecture
