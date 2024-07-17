
Sometimes after installing GCC using MinGW and adding it to path in Environment Variables it still cannot be accessible, so simply using this command will help:
``` shell
set Path=C:\MinGW\bin;%PATH%
```

And then typing:
```shell
gcc -v
```