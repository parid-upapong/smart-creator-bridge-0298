output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "s3_bucket_name" {
  value = aws_s3_bucket.media_vault.id
}

output "rds_endpoint" {
  value = aws_db_instance.metadata_db.endpoint
}

output "redis_endpoint" {
  value = aws_elasticache_cluster.job_queue.cache_nodes[0].address
}