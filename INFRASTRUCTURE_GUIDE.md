# OVERLORD Infrastructure Guide

## GPU Scaling Strategy
1. **Node Groups:** We use `g4dn.xlarge` instances which offer the best price/performance for inference and light video transcoding.
2. **Auto-Scaling:** The `gpu_workers` node group is configured with a minimum of 0. When a job is submitted to Celery, the Kubernetes Horizontal Pod Autoscaler (HPA) triggers pod creation. If no resources are available, the AWS Cluster Autoscaler provisions a new GPU node.
3. **Taints and Tolerations:** GPU nodes are tainted to prevent standard API pods (CPU-only) from consuming expensive GPU resources.

## Deployment Steps
1. `terraform plan` to preview infrastructure.
2. `terraform apply` to provision.
3. Use `aws eks update-kubeconfig --name overlord-ai` to gain cluster access.
4. Apply the NVIDIA device plugin (see `k8s/gpu-autoscaler.yaml`).
5. Deploy the Worker pods with the correct toleration for `nvidia.com/gpu`.