# Metadata Database
resource "aws_db_instance" "metadata_db" {
  allocated_storage    = 20
  identifier           = "${var.project_name}-db"
  db_name              = "overlord_metadata"
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t4g.medium"
  username             = "overlord_admin"
  password             = "REPLACE_WITH_SECRET_MANAGER"
  skip_final_snapshot  = true
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name = module.vpc.database_subnet_group_name
}

# Job Queue (Redis)
resource "aws_elasticache_cluster" "job_queue" {
  cluster_id           = "${var.project_name}-redis"
  engine               = "redis"
  node_type            = "cache.t4g.small"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
  security_group_ids   = [aws_security_group.redis_sg.id]
  subnet_group_name    = aws_elasticache_subnet_group.redis_subnets.name
}

resource "aws_security_group" "db_sg" {
  name   = "overlord-db-sg"
  vpc_id = module.vpc.vpc_id
  ingress {
    from_port = 5432
    to_port   = 5432
    protocol  = "tcp"
    cidr_blocks = module.vpc.private_subnets_cidr_blocks
  }
}

resource "aws_security_group" "redis_sg" {
  name   = "overlord-redis-sg"
  vpc_id = module.vpc.vpc_id
  ingress {
    from_port = 6379
    to_port   = 6379
    protocol  = "tcp"
    cidr_blocks = module.vpc.private_subnets_cidr_blocks
  }
}