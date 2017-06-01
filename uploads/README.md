# Tips
The owner and group of the uploads directory needs to be the same as the process owner of the Apache service. For Ubuntu/Debian server, the default process owner is "www-data".

```
sudo chown www-data uploads && sudo chgrp www-data uploads
```
