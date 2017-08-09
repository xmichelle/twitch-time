-- up
CREATE TABLE streamers (
  id         serial,
  user_id    integer,
  twitch_id  integer
);
---

-- down
DROP TABLE IF EXISTS streamers;
