-- Removes ONLY the sample artists and releases from sample-data.sql.
-- Every sample row has a slug starting with "sample-"; real data is untouched
-- as long as your own slugs don't start with "sample-".

delete from releases where slug like 'sample-%';
delete from artists where slug like 'sample-%';
