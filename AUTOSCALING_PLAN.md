# Future Plan: Kubernetes Autoscaling Strategy (HPA & VPA)

This document outlines the autoscaling strategy for the **Full Stack Realtime Chat App** on Kubernetes. Proper autoscaling ensures your application handles traffic spikes gracefully while minimizing infrastructure costs during low-traffic periods.

## 1. Horizontal Pod Autoscaler (HPA)

HPA dynamically adjusts the *number of pod replicas* based on observed metrics like CPU or memory utilization. This is ideal for stateless applications.

### Backend HPA
The backend handles Socket.IO connections, REST API requests, and message routing. Because we implemented the Redis Socket.IO adapter, the backend is fully stateless and safe to scale horizontally.

**Proposed Configuration (`k8s/backend-hpa.yml`):**
- **Min Replicas:** 2 (for high availability)
- **Max Replicas:** 10
- **Target Metrics:** 
  - CPU Utilization: 70%
  - Memory Utilization: 80%

### Frontend HPA
The frontend is a lightweight NGINX static file server. It requires very little compute but can scale under massive traffic.

**Proposed Configuration (`k8s/frontend-hpa.yml`):**
- **Min Replicas:** 2
- **Max Replicas:** 5
- **Target Metrics:**
  - CPU Utilization: 70%

---

## 2. Vertical Pod Autoscaler (VPA)

VPA automatically adjusts the *CPU and memory requests/limits* of your pods based on historical and real-time usage. This is ideal for stateful workloads where adding more replicas is complex or unnecessary.

### MongoDB VPA
Our MongoDB instance is running as a single-replica `StatefulSet`. Horizontally scaling MongoDB requires setting up a replica set with primary/secondary elections, which is complex and often overkill. Instead, we scale it *vertically*.

**Proposed Configuration (`k8s/mongodb-vpa.yml`):**
- **Target:** `StatefulSet/mongodb-statefulset`
- **UpdateMode:** `Auto` (VPA will automatically evict the pod and restart it with higher CPU/memory if it detects starvation).
- **Behavior:** As the database size and query volume grow, VPA will seamlessly bump the RAM from 128Mi up to whatever the node can handle, preventing OOM (Out Of Memory) crashes.

---

## 3. What about Redis?

Currently, Redis is deployed as a standard `Deployment` with a single replica. Its sole purpose is ephemeral Pub/Sub coordination for Socket.IO.

**Autoscaling Recommendation for Redis: VPA**
- **Why not HPA?** Horizontally scaling Redis requires deploying a Redis Cluster (sharding) or Redis Sentinel (HA). For simple Socket.IO Pub/Sub, a single Redis instance can easily handle tens of thousands of concurrent connections. HPA would unnecessarily complicate the architecture.
- **Why VPA?** If your chat app goes viral and Redis starts hitting CPU bottlenecks processing Pub/Sub events, VPA will automatically allocate more CPU and Memory to the single Redis pod. 

**Proposed Configuration (`k8s/redis-vpa.yml`):**
- **Target:** `Deployment/redis-deployment`
- **UpdateMode:** `Auto`

## 4. Prerequisites for Autoscaling
To implement this plan in the future, your Kubernetes cluster MUST have the following components installed:
1. **Metrics Server:** Required for HPA to read CPU/Memory metrics.
2. **VPA Controller:** Required to calculate and apply VPA recommendations.
