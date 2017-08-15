-- up
CREATE TABLE IF NOT EXISTS streamers (
  id         serial,
  user_id    integer,
  twitch_id  integer
);
---

-- down
DROP TABLE IF EXISTS streamers;
