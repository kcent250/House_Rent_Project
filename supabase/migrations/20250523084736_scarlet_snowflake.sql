/*
  # Create authentication and role management tables

  1. New Tables
    - `roles`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `roles` table
    - Add policies for role management
*/

CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Only allow authenticated users to read roles
CREATE POLICY "Allow authenticated users to read roles"
  ON roles
  FOR SELECT
  TO authenticated
  USING (true);

-- Only allow admins to manage roles
CREATE POLICY "Allow admins to manage roles"
  ON roles
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Insert default roles
INSERT INTO roles (name) VALUES ('admin'), ('landlord'), ('tenant')
ON CONFLICT (name) DO NOTHING;