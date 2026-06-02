# Vnx

是 `Venom` 中 `Web Tools` 功能的服务组件，有短链接，文件上传，Dnslog等功能



## 注意事项

**选购服务器时候，请了解供应商是否开放了`53` 端口，如不开放，则无法使用 `Dnslog` 功能，请更换**


## 域名绑定步骤

1、随意域名注册商随便注册一个域名

例如：`example.com`

2、在域名解析控制台做以下解析

| 主机记录 / 域名前缀 | 记录类型 | 记录值                    |
| ------------------- | -------- | ------------------------- |
| ns                  | A        | 要部署 `VNX` 的服务器的IP |
| dnslog              | NS       | ns.example.com.           |

> 注意 **记录类型为NS** 的记录值末尾有一个 **点（`.`）**这个是必须带上的，不是我打错的

请在下一步将 **记录类型为 NS** 的子域名（`dnslog.example.com`），添加到配置中



## Docker Compose（推荐）

1、下载项目

```bash
git clone https://github.com/Zcentury/Venom-Vnx.git
```

2、进入项目

```bash
cd Venom-Vnx
```

3、修改配置

```bash
vim docker-compose.yaml
```

```yaml
services:
  vnx:
    image: ghcr.io/zcentury/vnx:latest
    container_name: vnx
    restart: always
    ports:
      # 不可更改端口，DNSlog 功能必须要 53 端口
      - "53:53/tcp"
      - "53:53/udp"
      # web管理功能，用来填写到 Web Tools 中的地址端口
      # 此处为 PORT 的值，如果environment或者config.yaml修改了此值，请对应更改
      - "8080:8080"

    volumes:
      # 此处为 UPLOAD_SAVE_PATH 的值，如果environment或者config.yaml修改了此值，请对应更改
      - ./uploads:/app/uploads
      # 如果需要使用文件配置请解开以下注释，并注释 environment
      - ./config.yaml:/app/config.yaml
    environment:
      - HOST=0.0.0.0 # 默认0.0.0.0
      - PORT=8080 # 默认8080
      - UPLOAD_SAVE_PATH=./uploads # 默认./uploads
      - DNSLOG_DOMAIN=dnslog.example.com # 请务必填写为自己的域名
```

4、启动容器

```bash
docker compose up -d
```

5、查看是否部署成功

```bash
docker ps
```

如果看到了本服务即部署完成

否则请执行

```bash
docker logs vnx
```

查看错误日志解决，或提交日志到`Issues`



## Docker

```bash
docker run -d \
  --name vnx \
  --restart always \
  -p 53:53 -p 53:53/udp \
  -p 8080:8080 \
  -v "$(pwd)/uploads:/app/uploads" \
  -v "$(pwd)/config.yaml:/app/config.yaml" \
  -e HOST=0.0.0.0 \
  -e PORT=8080 \
  -e UPLOAD_SAVE_PATH=./uploads \
  -e DNSLOG_DOMAIN=dnslog.example.com \
  ghcr.io/zcentury/vnx:latest
```



## 直接部署

前往 https://github.com/Zcentury/Venom-Vnx/releases/latest 下载对应操作系统程序

编写配置文件 `config.yaml`

```yaml
# 配置文件
# 将此内容复制下来，在 Vnx 同级目录下创建 config.yaml
# 写入以下内容

server:
  # 如果是远程访问就写 0.0.0.0，否则就写 127.0.0.1
  host: 0.0.0.0
  port: 8080

  web:
    upload:
      # 文件保存位置
      save_path: ./upload

dnslog:
  # DNSlog 绑定的域名
  domain: dnslog.example.com
```

