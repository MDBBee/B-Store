#!/bin/bash
set -a
source .env 2>/dev/null
set +a

# Create temp files for secrets (Windows compatible)
TEMP_DIR=$(mktemp -d)
echo "$DATABASE_URL" > "$TEMP_DIR/database_url"
echo "$RESEND_API_KEY" > "$TEMP_DIR/resend_api_key"
echo "$STRIPE_SECRET_KEY" > "$TEMP_DIR/stripe_secret_key"

DOCKER_BUILDKIT=1 docker build \
  --secret id=database_url,src="$TEMP_DIR/database_url" \
  --secret id=resend_api_key,src="$TEMP_DIR/resend_api_key" \
  --secret id=stripe_secret_key,src="$TEMP_DIR/stripe_secret_key" \
  -t b-store .

# Cleanup temp files
rm -rf "$TEMP_DIR"

docker tag b-store bobbyugbebor/b-store:1.0.0
docker login -u bobbyugbebor
docker push bobbyugbebor/b-store:1.0.0