https://github.com/Zcentury/Venom/releases/latest 点击进入下载

**可能遇到的问题**

1. 如果 **MacOS** 提示`"Venom"已损坏，无法打开。你应该将它移到废纸篓`。

![image-20251203223002147](/image-20251203223002147.png)

**解决方法**：

```bash
sudo xattr -dr com.apple.quarantine /Applications/Venom.app
```
