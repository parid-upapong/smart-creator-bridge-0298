module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "19.15.0"

  cluster_name    = var.project_name
  cluster_version = "1.27"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    # General purpose nodes for API & Orchestrator
    general = {
      instance_types = ["t3.medium"]
      min_size     = 1
      max_size     = 3
      desired_size = 2
    }

    # GPU Worker Nodes for AI Rendering/Processing
    gpu_workers = {
      name = "gpu-worker-pool"
      
      # G4dn instances feature NVIDIA T4 GPUs
      instance_types = ["g4dn.xlarge"]
      
      ami_type = "AL2_x86_64_GPU" # Optimized for NVIDIA drivers
      
      min_size     = 0 # Allow scaling to zero when no jobs exist
      max_size     = 10
      desired_size = 1

      labels = {
        workload = "ai-processing"
        gpu      = "nvidia-t4"
      }

      taints = [
        {
          key    = "nvidia.com/gpu"
          value  = "true"
          effect = "NO_SCHEDULE"
        }
      ]
    }
  }
}