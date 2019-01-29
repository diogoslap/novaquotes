#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  ALTER SYSTEM SET
   max_connections = '200';
  ALTER SYSTEM SET
   shared_buffers = '256MB';
  ALTER SYSTEM SET
   effective_cache_size = '768MB';
  ALTER SYSTEM SET
   work_mem = '1310kB';
  ALTER SYSTEM SET
   maintenance_work_mem = '64MB';
  ALTER SYSTEM SET
   min_wal_size = '1GB';
  ALTER SYSTEM SET
   max_wal_size = '2GB';
  ALTER SYSTEM SET
   checkpoint_completion_target = '0.7';
  ALTER SYSTEM SET
   wal_buffers = '7864kB';
  ALTER SYSTEM SET
   default_statistics_target = '100';
EOSQL
