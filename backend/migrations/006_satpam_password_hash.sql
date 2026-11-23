-- Development seed account only. Never apply this seed migration to production staff data.
UPDATE staff
SET password_hash = '$2a$10$RfyTNoAxt30hNqr/HHZhMOXTMLjdJRkgFGDZltk1b.dir2kzBqvSK',
    failed_attempts = 0,
    locked_until = NULL
WHERE username = 'satpam_pos1'
  AND role = 'satpam'
  AND password_hash NOT LIKE '$2a$%'
  AND password_hash NOT LIKE '$2b$%'
  AND password_hash NOT LIKE '$2y$%';
