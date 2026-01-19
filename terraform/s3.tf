resource "aws_s3_bucket" "media_vault" {
  bucket = "${var.project_name}-media-vault"
}

resource "aws_s3_bucket_lifecycle_configuration" "media_vault_lifecycle" {
  bucket = aws_s3_bucket.media_vault.id

  rule {
    id      = "cleanup-temp-assets"
    status  = "Enabled"
    filter {
      prefix = "temp/"
    }
    expiration {
      days = 7
    }
  }
}

resource "aws_s3_bucket_cors_configuration" "media_vault_cors" {
  bucket = aws_s3_bucket.media_vault.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST"]
    allowed_origins = ["*"] # Narrow this down in production
    max_age_seconds = 3000
  }
}